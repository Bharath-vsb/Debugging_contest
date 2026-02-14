const Docker = require('dockerode');
const fs = require('fs');
const path = require('path');
const os = require('os');

async function debugDocker() {
    const docker = new Docker();
    const tmpDir = path.join(os.tmpdir(), "docker_debug_" + Date.now());

    console.log("1. Creating temp dir:", tmpDir);
    fs.mkdirSync(tmpDir, { recursive: true });
    fs.writeFileSync(path.join(tmpDir, "hello.txt"), "Hello from Host");

    console.log("2. Attempting to mount and read...");
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
        const stream = await container.logs({ stdout: true, stderr: true, follow: true });
        stream.pipe(process.stdout);

        await container.wait();
        console.log("\n3. Success if you saw 'Hello from Host'");
    } catch (e) {
        console.error("ERROR:", e);
    } finally {
        try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) { }
    }
}
debugDocker();
