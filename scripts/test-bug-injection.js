
const { injectBug } = require('../backend/services/bugInjectionService');

const C_TEMPLATE = `
#include <stdio.h>
int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    int n = 5;
    int sum = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] % 2 == 0) {
            sum = sum + arr[i];
        }
    }
    printf("%d", sum);
    return 0;
}
`;

const JAVA_TEMPLATE = `
public class Main {
    public static void main(String[] args) {
        String s1 = "hello";
        String s2 = "world";
        if (s1.equals(s2)) {
            System.out.println("Equal");
        }
        int sum = 0;
        for (int i = 0; i < 10; i++) {
            sum += i;
        }
    }
}
`;

function test() {
    console.log("--- ROUND 2 (C) -- Expecting Logic Error ---");
    console.log(injectBug(C_TEMPLATE, 'C', 2));

    console.log("\n--- ROUND 3 (C) -- Expecting MULTIPLE/HARD Errors ---");
    console.log(injectBug(C_TEMPLATE, 'C', 3));

    console.log("\n--- ROUND 3 (Java) -- Expecting MULTIPLE/HARD Errors ---");
    console.log(injectBug(JAVA_TEMPLATE, 'Java', 3));
}

test();
