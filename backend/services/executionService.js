/**
 * executionService.js
 * ───────────────────
 * Runs student (or correct) code inside an isolated Docker container.
 * Each execution:
 *   1. Writes the source file into a temp directory.
 *   2. Spins up a lightweight container with strict resource limits.
 *   3. Compiles (C/Java) then runs, piping stdin.
 *   4. Returns { success, output, error, executionTimeMs }.
 *
 * Docker images required (pull or build once):
 *   gcc:12-alpine   – for C
 *   openjdk:17-alpine – for Java
 *   python:3.11-alpine – for Python
 *
 * If Docker is not available the service returns a graceful error.
 * 
 * OPTIMIZED FOR HIGH CONCURRENCY:
 *   - Uses execution queue to limit concurrent Docker containers
 *   - Prevents resource exhaustion with 200+ concurrent users
 */

const Docker = require('dockerode');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const os = require('os');
const executionQueue = require('./executionQueue');

const docker = new Docker(); // connects to default unix socket

const TIMEOUT_MS = (process.env.DOCKER_TIMEOUT_SECONDS || 15) * 1000;
const MEM_LIMIT = process.env.DOCKER_MEMORY_LIMIT || '256m';
const CPU_LIMIT = parseFloat(process.env.DOCKER_CPU_LIMIT || '0.5');

/* ══════════════════════════════════════════════════════════
   LANGUAGE → DOCKER IMAGE & COMPILE/RUN COMMANDS
   ══════════════════════════════════════════════════════════ */
const LANG_CONFIG = {
  C: {
    image: 'gcc:latest',
    extension: '.c',
    compileCmd: (file) => `gcc -o /tmp/app /tmp/${file} -lm`,
    runCmd: () => '/tmp/app'
  },
  Java: {
    image: 'eclipse-temurin:17-jdk-alpine',
    extension: '.java',
    // Java requires class name = file name; we always use "Main"
    compileCmd: () => 'javac /tmp/Main.java',
    runCmd: () => 'java -cp /tmp Main'
  },
  Python: {
    image: 'python:3.11-alpine',
    extension: '.py',
    compileCmd: null,   // no compilation step
    runCmd: () => 'python3 /tmp/app.py'
  }
};

/**
 * executeCode(code, language, input)
 * @param {string} code      – source code
 * @param {string} language  – 'C' | 'Java' | 'Python'
 * @param {string} input     – stdin to feed
 * @returns {Promise<{ success: boolean, output: string, error: string|null, executionTimeMs: number }>}
 */
async function executeCode(code, language, input = '') {
  // Add to execution queue to prevent resource exhaustion
  return executionQueue.add(async () => {
    return await _executeCodeInternal(code, language, input);
  });
}

const { execSync } = require('child_process');

// ... (existing imports)

/**
 * Internal execution function (wrapped by queue)
 */
async function _executeCodeInternal(code, language, input = '') {
  const config = LANG_CONFIG[language];
  if (!config) {
    return { success: false, output: '', error: `Unsupported language: ${language}`, executionTimeMs: 0 };
  }

  // ── Write source to a unique temp dir ──
  const uniqueId = uuidv4();
  const tmpDir = path.join(os.tmpdir(), `contest_${uniqueId}`);
  const tarPath = path.join(os.tmpdir(), `archive_${uniqueId}.tar`);

  fs.mkdirSync(tmpDir, { recursive: true });

  let fileName;
  if (language === 'Java') {
    fileName = 'Main.java';  // Java demands filename == class name
  } else {
    fileName = language === 'C' ? 'app.c' : 'app.py';
  }
  const filePath = path.join(tmpDir, fileName);
  fs.writeFileSync(filePath, code);

  const startTime = Date.now();
  let container = null;

  try {
    // ── Build the shell script that compile + run ──
    let shellScript = '#!/bin/sh\nset -e\n';
    if (config.compileCmd) {
      shellScript += config.compileCmd(fileName) + '\n';
    }
    shellScript += `echo "${escapeShell(input)}" | ${config.runCmd()}\n`;

    const scriptPath = path.join(tmpDir, 'run.sh');
    fs.writeFileSync(scriptPath, shellScript);
    // Note: chmod inside tar/container is respected or we rely on sh explicitly

    // ── Create Tar Archive ──
    // Use system tar. Windows 10+ has tar. 
    try {
      execSync(`tar -c -f "${tarPath}" -C "${tmpDir}" .`);
    } catch (tarErr) {
      return { success: false, output: '', error: 'Internal Error: Failed to package code', executionTimeMs: 0 };
    }

    // ── Create container (NO MOUNTS) ──
    container = await docker.createContainer({
      Image: config.image,
      Cmd: ['/bin/sh', '/tmp/run.sh'],
      // Tty: true, // Merges stdout/stderr and removes binary framing headers
      HostConfig: {
        Memory: parseMemory(MEM_LIMIT),
        NanoCPUs: CPU_LIMIT * 1e9,
        NetworkMode: 'none'
      },
      AttachStdout: true,
      AttachStderr: true
    });

    // ── Inject Code ──
    await container.putArchive(tarPath, { path: '/tmp' });

    // ── Start and wait with timeout ──
    await container.start();

    const result = await withTimeout(
      container.wait(),
      TIMEOUT_MS
    );

    // ── Collect logs ──
    const logBuffer = await container.logs({ stdout: true, stderr: true });

    // Custom demux logic: valid Docker multiplexed streams have header [STREAM_TYPE] [0 0 0] [SIZE]
    // If Tty=false, we get these headers.
    let output = cleanDockerLog(logBuffer);

    // Cleanup container
    await container.remove({ force: true });

    const exitCode = result?.StatusCode ?? -1;
    const execTime = Date.now() - startTime;

    if (exitCode !== 0) {
      return {
        success: false,
        output: '',
        error: output || 'Runtime error (non-zero exit code)',
        executionTimeMs: execTime
      };
    }

    return { success: true, output, error: null, executionTimeMs: execTime };

  } catch (err) {
    const execTime = Date.now() - startTime;

    // Cleanup container on error
    if (container) {
      try {
        await container.remove({ force: true });
      } catch (_) { /* ignore */ }
    }

    // Timeout → kill container
    if (err.message === 'TIMEOUT') {
      return { success: false, output: '', error: 'Time Limit Exceeded', executionTimeMs: execTime };
    }

    // Docker not available
    if (err.code === 'ENOENT' || err.message?.includes('connect')) {
      return { success: false, output: '', error: 'Docker is not available. Please install and start Docker.', executionTimeMs: execTime };
    }

    return { success: false, output: '', error: err.message, executionTimeMs: execTime };

  } finally {
    // ── Cleanup temp dirs ──
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
      if (fs.existsSync(tarPath)) fs.unlinkSync(tarPath);
    } catch (_) { /* ignore */ }
  }
}

/* ══════════════════════════════════════════════════════════
   HELPERS
   ══════════════════════════════════════════════════════════ */

/** Escape shell-special characters in input string */
function escapeShell(str) {
  return str.replace(/'/g, "'\\''");
}

/** Parse "256m" → bytes */
function parseMemory(memStr) {
  const match = memStr.match(/^(\d+)([mkgMKG]?)$/);
  if (!match) return 256 * 1024 * 1024; // default 256 MB
  const num = parseInt(match[1], 10);
  const unit = match[2].toLowerCase();
  if (unit === 'k') return num * 1024;
  if (unit === 'm') return num * 1024 * 1024;
  if (unit === 'g') return num * 1024 * 1024 * 1024;
  return num;
}

/**
 * Remove Docker binary framing headers (8 bytes) from log updates.
 * Header format: [1 byte stream type] [3 bytes ignored] [4 bytes payload size]
 */
function cleanDockerLog(buffer) {
  if (!Buffer.isBuffer(buffer)) return buffer.toString();

  let cleaned = '';
  let i = 0;
  while (i < buffer.length) {
    if (i + 8 > buffer.length) break; // Incomplete header
    // const type = buffer[i]; // 1=stdout, 2=stderr
    const size = buffer.readUInt32BE(i + 4);

    if (i + 8 + size > buffer.length) break; // Incomplete payload

    cleaned += buffer.slice(i + 8, i + 8 + size).toString('utf8');
    i += 8 + size;
  }

  // If parsing failed (maybe not multiplexed?), fall back to straight string
  if (cleaned.length === 0 && buffer.length > 0) cleaned = buffer.toString('utf8');

  cleaned = cleaned.trim();

  // ── Sanitize Paths ──
  // Replace /tmp/app.c, /tmp/Main.java, /tmp/app.py with user-friendly names
  cleaned = cleaned.replace(/\/tmp\/app\.c/g, 'solution.c');
  cleaned = cleaned.replace(/\/tmp\/Main\.java/g, 'Main.java');
  cleaned = cleaned.replace(/\/tmp\/app\.py/g, 'solution.py');

  return cleaned;
}

/** Race a promise against a timeout */
function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT')), ms))
  ]);
}

module.exports = { executeCode };
