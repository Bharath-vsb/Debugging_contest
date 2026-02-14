const { generateTestCases, generateStaticTestCases } = require('../backend/services/testCaseGenerationService');

// Mock inputs
const titles = [
    "Sum of Array",
    "Palindrome Check",
    "Reverse an Array",
    "Bubble Sort",
    "Factorial",
    "Check Prime"
];

// We need to inspect the internal 'getInputsForTitle' but it's not exported.
// So we will rely on observing 'generateStaticTestCases' behavior 
// OR we can copy the logic here to test it.

const INPUT_SETS = {
    ARRAYS: 'ARRAYS (5\\n1 2 3...)',
    NUMBERS: 'NUMBERS (0, 1, 2...)',
    STRINGS: 'STRINGS (hello, racecar...)',
    GENERIC: 'GENERIC'
};

function getInputsForTitle(title) {
    const t = (title || '').toLowerCase();
    if (t.includes('sort') || t.includes('array') || t.includes('search')) {
        return INPUT_SETS.ARRAYS;
    }
    if (t.includes('factorial') || t.includes('fibonacci') || t.includes('prime') || t.includes('sum of digits')) {
        return INPUT_SETS.NUMBERS;
    }
    if (t.includes('palindrome') || t.includes('string') || t.includes('reverse')) {
        return INPUT_SETS.STRINGS;
    }
    return INPUT_SETS.GENERIC;
}

console.log('--- Testing Heuristic Logic ---');
titles.forEach(t => {
    const set = getInputsForTitle(t);
    console.log(`"${t}" -> ${set}`);
});
