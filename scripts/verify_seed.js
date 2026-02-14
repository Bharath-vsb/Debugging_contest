const mongoose = require('mongoose');
const MONGO_URI = 'mongodb://localhost:27017/debugcontest';
async function run() {
    try {
        await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 });
        const count = await mongoose.connection.db.collection('questions').countDocuments();
        console.log('Total Questions:', count);
        const r1 = await mongoose.connection.db.collection('questions').countDocuments({ round: 1 });
        const r2 = await mongoose.connection.db.collection('questions').countDocuments({ round: 2 });
        const r3 = await mongoose.connection.db.collection('questions').countDocuments({ round: 3 });
        console.log(`R1: ${r1}, R2: ${r2}, R3: ${r3}`);
        process.exit(0);
    } catch (e) { console.error(e); process.exit(1); }
}
run();
