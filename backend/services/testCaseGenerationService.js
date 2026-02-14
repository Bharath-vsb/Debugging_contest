/**
 * testCaseGenerationService.js
 * ──────────────────────────────
 * Generates test cases for a given correct solution.
 * Strategy:
 *   1. We define a set of standard inputs per language-type heuristic.
 *   2. Run the correct code inside the Docker sandbox with each input.
 *   3. Capture stdout as expectedOutput.
 *   4. Return array of { input, expectedOutput }.
 *
 * If Docker is unavailable (e.g. local dev without Docker), we fall back
 * to a set of STATIC synthetic test cases so the platform still works.
 */

const executionService = require('./executionService');

/* ══════════════════════════════════════════════════════════
   INPUT STRATEGIES
   We define different input sets based on the problem type.
   ══════════════════════════════════════════════════════════ */

const INPUT_SETS = {
  // For sorting, searching, array manipulation
  ARRAYS: [
    '5\n1 2 3 4 5',          // sorted
    '5\n5 4 3 2 1',          // reverse sorted
    '5\n3 1 4 5 2',          // random
    '1\n42',                 // single element
    '3\n-1 0 1',             // negatives
    '0',                     // empty
    '10\n10 9 8 7 6 5 4 3 2 1',
    '7\n3 1 4 1 5 9 2'       // duplicates
  ],

  // For factorial, fibonacci, prime checks (single number inputs)
  NUMBERS: [
    '0', '1', '2', '5', '10', '13', '20'
  ],

  // For string manipulation (Palindrome, Reverse String)
  STRINGS: [
    'hello',
    'racecar',
    'madam',
    '12321',
    'A',
    'AB',
    'Hello World',
    'NoLemoNNoMeloN'
  ],

  // For simple math (Sum of two numbers) or generic line inputs
  GENERIC: [
    '5\n1 2 3 4 5',
    '10 20',
    '100',
    'Hello'
  ]
};

/**
 * Determine which input set to use based on the title.
 */
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

/**
 * generateTestCases(correctCode, language, title)
 * @returns {Promise<Array<{input: string, expectedOutput: string}>>}
 */
async function generateTestCases(correctCode, language, title) {
  const testCases = [];
  // Select inputs based on title heuristic
  const inputs = getInputsForTitle(title).slice(0, 5); // take up to 5 inputs

  console.log(`[TestCaseGen] Generating for "${title}" using ${inputs.length} inputs.`);

  for (const input of inputs) {
    try {
      const result = await executionService.executeCode(correctCode, language, input);

      // Only add if execution was successful and produced output
      if (result.success && typeof result.output === 'string') {
        const out = result.output.trim();
        // Ignore empty outputs or error messages resembling execution failure
        if (out.length > 0 && !out.includes('Error') && !out.includes('Exception')) {
          testCases.push({
            input: input.trim(),
            expectedOutput: out
          });
        }
      }
    } catch (err) {
      console.warn(`[TestCaseGen] Skipping input due to error: ${err.message}`);
    }
  }

  // If Docker is completely unavailable OR generation yielded nothing, fall back to static
  if (testCases.length === 0) {
    console.warn('[TestCaseGen] Docker unavailable or no valid outputs – using static fallback.');
    return generateStaticTestCases(language, title);
  }

  return testCases;
}

/**
 * generateStaticTestCases(language, title)
 * Fallback when Docker is not available.
 */
function generateStaticTestCases(language, title) {
  const t = (title || '').toLowerCase();

  if (t.includes('sort') || t.includes('array')) {
    return [
      { input: '5\n5 1 4 2 8', expectedOutput: '1 2 4 5 8' },
      { input: '3\n3 2 1', expectedOutput: '1 2 3' }
    ];
  }
  if (t.includes('factorial')) {
    return [
      { input: '5', expectedOutput: '120' },
      { input: '0', expectedOutput: '1' },
      { input: '3', expectedOutput: '6' }
    ];
  }
  if (t.includes('palindrome')) {
    // Note: Output depends on problem spec (True/False or Yes/No), but this is fallback
    return [
      { input: 'racecar', expectedOutput: 'true' },
      { input: 'hello', expectedOutput: 'false' }
    ];
  }

  // Generic fallback
  return [
    { input: '10', expectedOutput: '10' },
    { input: '0', expectedOutput: '0' }
  ];
}

module.exports = { generateTestCases, generateStaticTestCases };
