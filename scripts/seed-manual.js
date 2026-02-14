const mongoose = require('mongoose');
const { getTemplate } = require('../backend/services/codeTemplates');
const Question = require('../backend/models/Question'); // Use the centralized model

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/debugcontest';

const ROUNDS = {
    1: ['Bubble Sort', 'Factorial', 'Palindrome Check', 'Sum of Array', 'Reverse an Array', 'Fibonacci Series', 'Prime Number Check', 'Count Vowels', 'Find Maximum Element', 'Linear Search', 'Check Leap Year', 'Swap Two Numbers', 'Simple Pyramid Pattern', 'Armstrong Number', 'Convert Celsius to Fahrenheit'],
    2: ['Binary Search', 'Selection Sort', 'Insertion Sort', 'Matrix Addition', 'Matrix Multiplication', 'Transpose Matrix', 'Check Anagram', 'Remove Duplicates from Array', 'Second Largest Element', 'GCD and LCM', 'Count Frequency of Characters', 'Decimal to Binary Conversion', 'Merge Two Sorted Arrays', 'Caesar Cipher Encryption', 'Check Substring Presence'],
    3: ['Quick Sort', 'Merge Sort', 'Reverse Linked List', 'Detect Cycle in Linked List', 'Valid Parentheses', 'Find Missing Number', 'Longest Common Prefix', 'Spiral Matrix Traversal', 'Tower of Hanoi', 'Nth Fibonacci', 'Generate All Subsets', 'Knapsack Problem', 'Longest Palindromic Substring', 'Sudoku Validator', 'Graph Activity']
};

const LANGS = ['C', 'Java', 'Python'];

const TEST_CASES = {
    // Round 1
    'Bubble Sort': [{ input: '5\n5 1 4 2 8', expectedOutput: '1 2 4 5 8' }],
    'Factorial': [{ input: '5', expectedOutput: '120' }],
    'Palindrome Check': [{ input: '121', expectedOutput: 'Possible' }],
    'Sum of Array': [{ input: '5\n1 2 3 4 5', expectedOutput: '15' }],
    'Reverse an Array': [{ input: '3\n1 2 3', expectedOutput: '3 2 1' }],
    'Fibonacci Series': [{ input: '5', expectedOutput: '0 1 1 2 3' }],
    'Prime Number Check': [{ input: '7', expectedOutput: 'Prime' }, { input: '4', expectedOutput: 'Not Prime' }],
    'Count Vowels': [{ input: 'Hello World', expectedOutput: '3' }],
    'Find Maximum Element': [{ input: '5\n1 9 2 8 3', expectedOutput: '9' }],
    'Linear Search': [{ input: '5\n10 20 30 40 50\n30', expectedOutput: '2' }, { input: '5\n1 2 3 4 5\n99', expectedOutput: '-1' }],
    'Check Leap Year': [{ input: '2000', expectedOutput: 'Leap Year' }, { input: '2023', expectedOutput: 'Not a Leap Year' }],
    'Swap Two Numbers': [{ input: '10 20', expectedOutput: '20 10' }],
    'Simple Pyramid Pattern': [{ input: '3', expectedOutput: '* \n* * \n* * *' }], // Note: formatting might be tricky
    'Armstrong Number': [{ input: '153', expectedOutput: 'Armstrong' }, { input: '123', expectedOutput: 'Not Armstrong' }],
    'Convert Celsius to Fahrenheit': [{ input: '0', expectedOutput: '32.00' }, { input: '100', expectedOutput: '212.00' }],

    // Round 2
    'Binary Search': [{ input: '5\n10 20 30 40 50\n40', expectedOutput: '3' }],
    'Selection Sort': [{ input: '5\n64 25 12 22 11', expectedOutput: '11 12 22 25 64' }],
    'Insertion Sort': [{ input: '5\n12 11 13 5 6', expectedOutput: '5 6 11 12 13' }],
    'Matrix Addition': [{ input: '2 2\n1 2 3 4\n5 6 7 8', expectedOutput: '6 8 \n10 12' }],
    'Matrix Multiplication': [{ input: '2 2\n1 2 3 4\n2 2\n1 0 0 1', expectedOutput: '1 2 \n3 4' }],
    'Transpose Matrix': [{ input: '2 2\n1 2 3 4', expectedOutput: '1 3 \n2 4' }],
    'Check Anagram': [{ input: 'listen silent', expectedOutput: 'Anagram' }, { input: 'hello world', expectedOutput: 'Not Anagram' }],
    'Remove Duplicates from Array': [{ input: '6\n1 2 2 3 4 4', expectedOutput: '1 2 3 4' }],
    'Second Largest Element': [{ input: '5\n10 20 5 30 15', expectedOutput: '20' }],
    'GCD and LCM': [{ input: '12 15', expectedOutput: 'GCD:3 LCM:60' }],
    'Count Frequency of Characters': [{ input: 'hello', expectedOutput: 'e1 h1 l2 o1' }], // Expected format sorted
    'Decimal to Binary Conversion': [{ input: '10', expectedOutput: '1010' }],
    'Merge Two Sorted Arrays': [{ input: '3\n1 3 5\n3\n2 4 6', expectedOutput: '1 2 3 4 5 6' }],
    'Caesar Cipher Encryption': [{ input: 'abc 1', expectedOutput: 'bcd' }],
    'Check Substring Presence': [{ input: 'Helloell ell', expectedOutput: 'Present' }],

    // Round 3
    'Quick Sort': [{ input: '5\n10 7 8 9 1 5', expectedOutput: '1 5 7 8 9 10' }],
    'Merge Sort': [{ input: '5\n38 27 43 3 9 82 10', expectedOutput: '3 9 10 27 38 43 82' }],
    'Reverse Linked List': [{ input: '5\n1 2 3 4 5', expectedOutput: '5 4 3 2 1' }],
    'Detect Cycle in Linked List': [{ input: '4\n1 2 3 4\n1', expectedOutput: 'Cycle Detected' }, { input: '3\n1 2 3\n-1', expectedOutput: 'No Cycle' }],
    'Valid Parentheses': [{ input: '()[]{}', expectedOutput: 'Valid' }, { input: '(]', expectedOutput: 'Invalid' }],
    'Find Missing Number': [{ input: '5\n1 2 4 5', expectedOutput: '3' }],
    'Longest Common Prefix': [{ input: '3\nflower flow flight', expectedOutput: 'fl' }],
    'Spiral Matrix Traversal': [{ input: '3 3\n1 2 3 4 5 6 7 8 9', expectedOutput: '1 2 3 6 9 8 7 4 5' }],
    'Tower of Hanoi': [{ input: '2', expectedOutput: 'Move disk 1 from A to C\nMove disk 2 from A to B\nMove disk 1 from C to B' }],
    'Nth Fibonacci': [{ input: '10', expectedOutput: '55' }],
    'Generate All Subsets': [{ input: '2\n1 2', expectedOutput: '{ }\n{ 1 }\n{ 2 }\n{ 1 2 }' }],
    'Knapsack Problem': [{ input: '3 50\n60 100 120\n10 20 30', expectedOutput: '220' }],
    'Longest Palindromic Substring': [{ input: 'babad', expectedOutput: 'bab' }],
    'Sudoku Validator': [{ input: '5 3 4 6 7 8 9 1 2 6 7 2 1 9 5 3 4 8 1 9 8 3 4 2 5 6 7 8 5 9 7 6 1 4 2 3 4 2 6 8 5 3 7 9 1 7 1 3 9 2 4 8 5 6 9 6 1 5 3 7 2 8 4 2 8 7 4 1 9 6 3 5 3 4 5 2 8 6 1 7 9', expectedOutput: 'Valid' }],
    'Graph Activity': [{ input: '5 6\n1 2\n1 3\n2 3\n2 4\n3 4\n4 5\n1', expectedOutput: '1 2 3 4 5' }]
};

function simpleInjectBug(code, lang) {
    if (lang === 'Java' || lang === 'C') {
        if (code.includes('i++')) return code.replace('i++', 'i--');
        if (code.includes('+')) return code.replace('+', '-');
        if (code.includes('return 0')) return code.replace('return 0', 'return 1');
        return code + "\n// Bug injected: Syntax error potentially";
    }
    if (lang === 'Python') {
        if (code.includes('+')) return code.replace('+', '-');
        if (code.includes('print')) return code.replace('print', '# print');
        return code + "\n# Bug injected";
    }
    return code;
}

/**
 * seedQuestions
 * @param {boolean} force - If true, clears the database then seeds. If false, seeds only if no questions exist.
 */
async function seedQuestions(force = false) {
    try {
        const count = await Question.countDocuments();

        if (!force && count > 0) {
            console.log('✅ Database already seeded with questions. Skipping seed.');
            return;
        }

        if (force) {
            console.log('🔄 Force seed requested. Clearing old questions...');
            await Question.deleteMany({});
            console.log('🗑️  Old questions cleared.');
        } else if (count === 0) {
            console.log('🌱 Database empty. Seeding questions...');
        }

        let totalCreated = 0;

        for (const [round, titles] of Object.entries(ROUNDS)) {
            console.log(`Creating questions for Round ${round}...`);
            for (const title of titles) {
                // console.log(`  - Processing ${title}...`); // Verbose log
                for (const lang of LANGS) {
                    const template = getTemplate(title, lang);
                    if (!template) {
                        console.warn(`[WARN] No template for ${title} (${lang})`);
                        continue;
                    }

                    const correctCode = template.code;
                    const description = template.description || `${title} algorithm implementation.`;

                    let testCases = TEST_CASES[title];
                    if (!testCases) {
                        testCases = [{ input: '10', expectedOutput: '10' }];
                    }

                    const buggyCode = simpleInjectBug(correctCode, lang);

                    await Question.create({
                        title,
                        description,
                        round: parseInt(round),
                        language: lang,
                        correctCode,
                        buggyCode,
                        testCases,
                        difficulty: 'Medium' // Added default if needed by model
                    });
                    totalCreated++;
                }
            }
        }

        console.log(`✅ Seeding Complete. Created ${totalCreated} questions.`);

    } catch (e) {
        console.error('❌ ERROR seeding questions:', e);
        // Do not process.exit(1) here if called from server, throw or handle
        throw e;
    }
}

// Standalone execution wrapper
if (require.main === module) {
    const { connectDB } = require('../backend/config/database');
    (async () => {
        try {
            await connectDB();

            // Force seed when run manually to ensure fresh start
            await seedQuestions(true);

            process.exit(0);
        } catch (e) {
            console.error(e);
            process.exit(1);
        }
    })();
}

module.exports = { seedQuestions };
