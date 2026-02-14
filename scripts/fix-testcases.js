/**
 * fix-testcases.js
 * ────────────────
 * script to re-generate test cases for all existing questions using the improved heuristic.
 * Usage: node scripts/fix-testcases.js
 */

const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../backend/.env') });

const Question = require('../backend/models/Question');
const { generateTestCases } = require('../backend/services/testCaseGenerationService');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/debugcontest';

async function main() {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected.');

    const questions = await Question.find({ title: /Palindrome/i });
    console.log(`Found ${questions.length} questions to process (filtered for Palindrome).`);

    for (const q of questions) {
        console.log(`\nProcessing: "${q.title}" (${q.language})...`);

        try {
            // Regenerate test cases
            const newTestCases = await generateTestCases(q.correctCode, q.language, q.title);

            if (newTestCases.length > 0) {
                q.testCases = newTestCases;
                await q.save();
                console.log(`   ✅ Updated with ${newTestCases.length} test cases.`);
            } else {
                console.warn(`   ⚠️ No test cases generated. Skipping update.`);
            }
        } catch (err) {
            console.error(`   ❌ Error: ${err.message}`);
        }
    }

    console.log('\nDone.');
    await mongoose.disconnect();
}

main().catch(console.error);
