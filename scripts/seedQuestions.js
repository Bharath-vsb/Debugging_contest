const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../backend/.env') });
const mongoose = require('../backend/node_modules/mongoose');
const Question = require('../backend/models/Question');
const { getTemplate } = require('../backend/services/codeTemplates');
const { injectBug } = require('../backend/services/bugInjectionService');
const { generateTestCases } = require('../backend/services/testCaseGenerationService');

const LANGS = ['C', 'Java', 'Python'];
const ROUNDS = [1, 2, 3];
const TITLES = ['Bubble Sort', 'Factorial', 'Palindrome Check', 'Sum of Array', 'Reverse an Array'];

async function seed() {
    try {
        console.log('Connecting to MongoDB...');
        // Force IPv4 loopback to avoid Node 17+ localhost issues
        const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/debugcontest';
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000, family: 4 });
        console.log('Connected to:', uri);

        // Clear existing questions for all target rounds
        await Question.deleteMany({ round: { $in: ROUNDS } });
        console.log(`Cleared questions for rounds: ${ROUNDS.join(', ')}`);

        for (const round of ROUNDS) {
            console.log(`\n--- Seeding Round ${round} ---`);
            for (const title of TITLES) {
                for (const lang of LANGS) {
                    process.stdout.write(`Generating ${title} (${lang})... `);

                    let template = getTemplate(title, lang);
                    if (!template) {
                        console.log(`Skipping (No template)`);
                        continue;
                    }

                    // Handle object return from getTemplate
                    const correctCode = template.code || template;
                    const description = template.description || `${title} algorithm implementation.`;

                    // Generate bugs & tests
                    // Pass current 'round' to injectBug so it knows how many bugs to inject (3, 5, or 6)
                    const buggyCode = injectBug(correctCode, lang, round);

                    let testCases = [];
                    try {
                        // Attempt to generate test cases via Docker
                        // If Docker is not running or fails, catch and use fallback
                        testCases = await generateTestCases(correctCode, lang, title);
                    } catch (e) {
                        console.warn(`Docker test gen failed, using dummy tests.`);
                        testCases = [{ input: "Sample Input", expectedOutput: "Sample Output" }];
                    }

                    if (!testCases || testCases.length === 0) {
                        testCases = [{ input: "Sample Input", expectedOutput: "Sample Output" }];
                    }

                    await Question.create({
                        title,
                        description,
                        round: round,
                        language: lang,
                        correctCode,
                        buggyCode,
                        testCases
                    });
                }
            }
        }

        console.log('Seeding complete!');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seed();
