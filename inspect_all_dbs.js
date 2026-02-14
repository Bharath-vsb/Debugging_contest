const mongoose = require('mongoose');
const MONGO_URI = 'mongodb://localhost:27017/admin'; // Connect to admin to list dbs

async function run() {
    try {
        await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 2000 });
        const admin = new mongoose.mongo.Admin(mongoose.connection.db);
        const result = await admin.listDatabases();
        console.log('Databases:', JSON.stringify(result.databases, null, 2));
        
        // internal check for 'debug-contest' vs 'debugcontest'
        const dbs = result.databases.map(d => d.name);
        const target = dbs.find(d => d.includes('debug'));
        if (target) {
             console.log(`\nFound target DB: ${target}. Inspecting counts...`);
             const conn2 = mongoose.createConnection(`mongodb://localhost:27017/${target}`);
             const count = await conn2.collection('questions').countDocuments();
             console.log(`Questions in ${target}: ${count}`);
        } else {
             console.log('\nNo debug contest database found.');
        }

        process.exit(0);
    } catch (e) {
        console.error('Connection failed:', e.message);
        process.exit(1);
    }
}
run();
