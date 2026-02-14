const mongoose = require('mongoose');

// Hardcode for debug
const MONGO_URI = 'mongodb://localhost:27017/debugcontest';

async function main() {
    try {
        console.log('Connecting to', MONGO_URI);
        await mongoose.connect(MONGO_URI);
        console.log('Connected.');

        // Define minimal schema to avoid model issues
        const QuestionSchema = new mongoose.Schema({
            title: String,
            testCases: Array
        });

        // Use "Question" model (mongoose pluralizes to 'questions')
        const Question = mongoose.models.Question || mongoose.model('Question', QuestionSchema);

        console.log('Searching for Palindrome...');
        const q = await Question.findOne({ title: { $regex: 'Palindrome', $options: 'i' } });

        if (q) {
            console.log('FOUND Question:', q.title);
            console.log('TestCases:', JSON.stringify(q.testCases, null, 2));
        } else {
            console.log('NOT FOUND');
            // List all titles
            const all = await Question.find({}, 'title');
            console.log('All titles:', all.map(x => x.title));
        }
    } catch (e) {
        console.error('ERROR:', e);
    } finally {
        await mongoose.disconnect();
    }
}

main();
