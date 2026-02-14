const mongoose = require('mongoose');

// Hardcode URI
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/debugcontest';

async function main() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB.');

        const Student = require('../backend/models/Student');
        const Submission = require('../backend/models/Submission');

        // Check args
        const targetRoll = process.argv[2];

        if (targetRoll) {
            console.log(`Deleting student with Roll Number: ${targetRoll}...`);
            const s = await Student.findOne({ rollNumber: targetRoll });
            if (s) {
                await Submission.deleteMany({ studentId: s._id });
                await Student.deleteOne({ _id: s._id });
                console.log(`Deleted student ${s.fullName} (${s.rollNumber}) and their submissions.`);
            } else {
                console.log('Student not found.');
            }
        } else {
            console.log('Deleting ALL students and submissions...');
            await Student.deleteMany({});
            await Submission.deleteMany({});
            console.log('All student data wiped.');
        }

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

main();
