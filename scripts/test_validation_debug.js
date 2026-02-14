const { scoreSubmission } = require('../backend/services/scoringService');

// Mock inputs
const language = 'Python';
const correctCode = `
import sys
if __name__ == "__main__":
    # Read all stdin, split by whitespace, rejoin with single space
    # This normalizes the output to match our expected format
    nums = sys.stdin.read().split()
    print(" ".join(nums))
`;

// Test cases
const testCases = [
    { input: "1 2 3", expectedOutput: "1 2 3" },
    { input: "10  20", expectedOutput: "10 20" }
];

async function run() {
    console.log("--- START TEST ---");
    try {
        const result = await scoreSubmission(correctCode, language, testCases);

        console.log("Verdict:", result.verdict);
        if (result.error) console.log("Global Error:", result.error);
        if (result.compileError) console.log("Compile Error:", result.compileError);
        if (result.runtimeError) console.log("Runtime Error:", result.runtimeError);

        console.log("Test Results:");
        result.testResults.forEach(r => {
            console.log(`  [${r.passed ? 'PASS' : 'FAIL'}] Expected: '${r.expectedOutput}', Actual: '${r.actualOutput}'`);
        });

        if (result.verdict === 'all_pass') {
            console.log("--- SUCCESS ---");
            process.exit(0);
        } else {
            console.log("--- FAILURE ---");
            process.exit(1);
        }
    } catch (e) {
        console.error("EXCEPTION:", e);
        process.exit(1);
    }
}

run();
