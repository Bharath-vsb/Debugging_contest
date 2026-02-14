const Docker = require('dockerode');
const fs = require('fs');
const path = require('path');

async function debugDocker() {
    const docker = new Docker();
    // Use local directory instead of os.tmpdir
    const tmpDir = path.join(__dirname, "temp_debug_" + Date.now());

    console.log("Creating local temp dir:", tmpDir);
    fs.mkdirSync(tmpDir, { recursive: true });
    fs.writeFileSync(path.join(tmpDir, "hello.txt"), "Hello from Host");

    try {
        console.log("Attempting to run container...");
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

        console.log("Container created. Starting...");
        await container.start();

        const stream = await container.logs({ stdout: true, stderr: true, follow: true });
        stream.pipe(process.stdout);

        await container.wait();
        console.log("\nSuccess!");
    } catch (e) {
        console.error("DOCKER ERROR MESSAGE:", e.message);
        console.error("DOCKER ERROR FULL:", e);
    } finally {
        try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) { }
    }
}
debugDocker();
