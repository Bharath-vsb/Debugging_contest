const { scoreSubmission } = require('../backend/services/scoringService');
const mongoose = require('mongoose');

// Mock inputs
const language = 'Python';
const correctCode = `
import sys
if __name__ == "__main__":
    nums = sys.stdin.read().split()
    # Echo back
    print(" ".join(nums))
`;

// Test case with loose whitespace
const testCases = [
    { input: "1 2 3", expectedOutput: "1 2 3" },
    { input: "10  20", expectedOutput: "10 20" } // Input has extra spaces, output standardized
];

async function run() {
    console.log("Testing Scoring Service...");
    try {
        const result = await scoreSubmission(correctCode, language, testCases);
        console.log("Result:", JSON.stringify(result, null, 2));

        if (result.verdict === 'all_pass') {
            console.log("VICTORY: Validation logic handled whitespace correctly!");
        } else {
            console.log("FAILURE: Something went wrong.");
        }
    } catch (e) {
        console.error("Error:", e);
    }
}

run();
