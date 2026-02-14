const Docker = require('dockerode');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function debugDockerArchive() {
    const docker = new Docker();
    const tmpDir = path.join(__dirname, "temp_archive_" + Date.now());
    const tarName = path.join(__dirname, `archive_${Date.now()}.tar`);

    console.log("Prep: Creating files...");
    fs.mkdirSync(tmpDir, { recursive: true });
    // IMPORTANT: Docker expects /tmp to exist or we write to it
    fs.writeFileSync(path.join(tmpDir, "hello.txt"), "Hello from Archive!");

    // Create tarball (bsdtar syntax: -c -f archive.tar -C dir .)
    console.log("Prep: Tarring...");
    try {
        execSync(`tar -c -f "${tarName}" -C "${tmpDir}" .`);
    } catch (e) {
        console.error("Tar failed:", e);
        return;
    }

    try {
        console.log("Docker: Creating container...");
        const container = await docker.createContainer({
            Image: 'python:3.11-alpine',
            Cmd: ['cat', '/tmp/hello.txt'],
            // No Mounts!
            HostConfig: { AutoRemove: false }, // Manual remove
            AttachStdout: true,
            AttachStderr: true
        });

        console.log("Docker: Uploading archive...");
        await container.putArchive(tarName, { path: '/tmp' });

        console.log("Docker: Starting...");
        await container.start();

        const stream = await container.logs({ stdout: true, stderr: true, follow: true });
        stream.pipe(process.stdout);

        await container.wait();
        console.log("\nSuccess!");

        await container.remove({ force: true });
    } catch (e) {
        console.error("DOCKER ERROR:", e);
    } finally {
        try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) { }
        try { fs.unlinkSync(tarName); } catch (_) { }
    }
}
debugDockerArchive();
