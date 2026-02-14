const Docker = require('dockerode');

async function debugDockerNoMount() {
    const docker = new Docker();
    console.log("Testing Docker execution WITHOUT mounts...");

    try {
        const container = await docker.createContainer({
            Image: 'python:3.11-alpine',
            Cmd: ['echo', 'Docker is working!'],
            HostConfig: { AutoRemove: true },
            AttachStdout: true,
            AttachStderr: true
        });

        await container.start();

        const stream = await container.logs({ stdout: true, stderr: true, follow: true });
        stream.pipe(process.stdout);

        await container.wait();
        console.log("\nSuccess!");
    } catch (e) {
        console.error("DOCKER ERROR:", e);
    }
}
debugDockerNoMount();
