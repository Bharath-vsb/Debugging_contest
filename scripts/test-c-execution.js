
const { executeCode } = require('../backend/services/executionService');

async function test() {
    console.log('--- TEST 1: Valid C Code ---');
    const validCode = `
#include <stdio.h>
int main() {
  int a, b;
  if(scanf("%d %d", &a, &b) != 2) return 0;
  printf("%d", a + b);
  return 0;
}
`;
    const res1 = await executeCode(validCode, 'C', '10 20');
    console.log(res1);

    console.log('\n--- TEST 2: Syntax Error ---');
    const errorCode = `
#include <stdio.h>
int main() {
  int a // missing semicolon
  return 0;
}
`;
    const res2 = await executeCode(errorCode, 'C', '');
    console.log(res2);

    console.log('\n--- TEST 3: Infinite Loop (TLE) ---');
    const tleCode = `
#include <stdio.h>
int main() {
  while(1);
  return 0;
}
`;
    // We expect TLE (timeout is 15s by default, can be slow for test. 
    // Maybe we can temporarily lower timeout in env? No, just wait.)
    // Actually, let's skip TLE for now to be fast, or assume it works if res1 works.
    // The user mainly asked about "error message".

    // Let's run TLE but maybe kill it faster? 
    // No, the service hardcodes timeout. I'll verify Syntax Error first which is the likely "wrong message" candidate.
}

test().then(() => process.exit(0)).catch(err => console.error(err));
