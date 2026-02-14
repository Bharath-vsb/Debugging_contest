
const mongoose = require('mongoose');
const Question = require('./backend/models/Question');
require('dotenv').config({ path: './backend/.env' });

async function inspectquestions() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/debug-contest');
        console.log('Connected to DB');

        const questions = await Question.find({});
        console.log(`Found ${questions.length} questions.`);

        questions.forEach(q => {
            console.log(`\nQ: ${q.title} (${q.language})`);
            console.log(`Correct Code Length: ${q.correctCode ? q.correctCode.length : 'MISSING'}`);
            console.log(`Test Cases: ${q.testCases.length}`);
            if (q.testCases.length > 0) {
                console.log('First Test Case:', JSON.stringify(q.testCases[0], null, 2));
            } else {
                console.log('NO TEST CASES');
            }
        });

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

inspectquestions();
