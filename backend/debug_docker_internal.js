const Docker = require('dockerode');
const fs = require('fs');
const path = require('path');
const os = require('os');

async function debugDocker() {
    const docker = new Docker();
    // Force usage of C:/Users/CSE/... format if needed, but let's see what os.tmpdir gives
    const tmpDir = path.join(os.tmpdir(), "docker_debug_" + Date.now());

    console.log("Host OS:", os.platform());
    console.log("Tmp Dir Raw:", tmpDir);

    fs.mkdirSync(tmpDir, { recursive: true });
    fs.writeFileSync(path.join(tmpDir, "hello.txt"), "Hello from Host");

    console.log("Mounting:", tmpDir);

    try {
        const container = await docker.createContainer({
            Image: 'python:3.11-alpine',
            Cmd: ['cat', '/tmp/hello.txt'],
            Mounts: [
                { Type: 'bind', Source: tmpDir, Target: '/tmp', ReadOnly: true }
            ],
            HostConfig: { AutoRemove: true },
            AttachStdout: true,
            AttachStderr: true
        });

        await container.start();

        // Wait for container to finish
        const stream = await container.logs({ stdout: true, stderr: true, follow: true });
        stream.pipe(process.stdout);

        await container.wait();
    } catch (e) {
        console.error("DOCKER ERROR:", e);
    } finally {
        try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) { }
    }
}
debugDocker();
