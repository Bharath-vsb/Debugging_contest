const Docker = require('dockerode');

async function debugList() {
    console.log("Attempting to connect to Docker...");
    // Try explicit Windows pipe if default fails (uncommenting logic)
    // const docker = new Docker({ socketPath: '//./pipe/docker_engine' }); 
    const docker = new Docker();

    try {
        const info = await docker.info();
        console.log("Docker Info:", info.Name, info.ServerVersion);

        const containers = await docker.listContainers();
        console.log("Containers:", containers.length);
        containers.forEach(c => console.log(" - " + c.Image));
    } catch (e) {
        console.error("CONNECTION ERROR:", e);
    }
}
debugList();
