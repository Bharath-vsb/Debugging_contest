const Docker = require('dockerode');
const fs = require('fs');
const path = require('path');
const os = require('os');

async function debugDockerPath() {
    const docker = new Docker();
    // Use local directory 
    const tmpDir = path.join(__dirname, "temp_posix_" + Date.now());

    console.log("Creating local temp dir:", tmpDir);
    fs.mkdirSync(tmpDir, { recursive: true });
    fs.writeFileSync(path.join(tmpDir, "hello.txt"), "Hello from POSIX Path");

    // Fix: Convert backslashes to forward slashes for Docker
    // Handle drive letter capitalization just in case (e.g. c: -> C:)
    let bindPath = tmpDir.replace(/\\/g, '/');
    // Ensure Uppercase drive letter if present
    if (bindPath.match(/^[a-z]:/)) {
        bindPath = bindPath.charAt(0).toUpperCase() + bindPath.slice(1);
    }

    console.log("Original Path:", tmpDir);
    console.log("Bind Path (Fixed):", bindPath);

    try {
        const container = await docker.createContainer({
            Image: 'python:3.11-alpine',
            Cmd: ['cat', '/tmp/hello.txt'],
            Mounts: [
                { Type: 'bind', Source: bindPath, Target: '/tmp', ReadOnly: true }
            ],
            // Removed AutoRemove to be safe
            AttachStdout: true,
            AttachStderr: true
        });

        console.log("Container created. Starting...");
        await container.start();

        const stream = await container.logs({ stdout: true, stderr: true, follow: true });
        stream.pipe(process.stdout);

        await container.wait();
        console.log("\nSuccess!");

        await container.remove({ force: true });
    } catch (e) {
        console.log("DOCKER ERROR:", e.message);
    } finally {
        try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) { }
    }
}
debugDockerPath();
