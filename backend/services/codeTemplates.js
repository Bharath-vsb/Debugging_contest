/**
 * codeTemplates.js
 * Library of standard algorithms for Rounds 1, 2, and 3.
 */

const TEMPLATES = {
    // Round 1: Easy/Moderate
    'Bubble Sort': {
        C: `#include <stdio.h>
void bubbleSort(int arr[], int n) {
    int i, j, temp;
    for (i = 0; i < n - 1; i++) {
        for (j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}
int main() {
    int n, i;
    if (scanf("%d", &n) != 1) return 0;
    int arr[100];
    for (i = 0; i < n; i++) scanf("%d", &arr[i]);
    bubbleSort(arr, n);
    for (i = 0; i < n; i++) printf("%d ", arr[i]);
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        bubbleSort(arr);
        for (int i = 0; i < n; i++) System.out.print(arr[i] + " ");
    }
}`,
        Python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
if __name__ == "__main__":
    import sys
    input = sys.stdin.read
    data = input().split()
    if data:
        n = int(data[0])
        arr = [int(x) for x in data[1:]]
        bubble_sort(arr)
        print(*(arr))`
    },
    'Factorial': {
        C: `#include <stdio.h>
long long factorial(int n) {
    if (n == 0 || n == 1) return 1;
    long long fact = 1;
    for (int i = 2; i <= n; i++) fact *= i;
    return fact;
}
int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    printf("%lld", factorial(n));
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    static long factorial(int n) {
        if (n == 0 || n == 1) return 1;
        long fact = 1;
        for (int i = 2; i <= n; i++) fact *= i;
        return fact;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) System.out.print(factorial(sc.nextInt()));
    }
}`,
        Python: `def factorial(n):
    if n == 0 or n == 1: return 1
    fact = 1
    for i in range(2, n + 1): fact *= i
    return fact
if __name__ == "__main__":
    try:
        n = int(input())
        print(factorial(n))
    except: pass`
    },
    'Palindrome Check': {
        C: `#include <stdio.h>
int isPalindrome(int n) {
    int reversed = 0, original = n, remainder;
    while (n != 0) {
        remainder = n % 10;
        reversed = reversed * 10 + remainder;
        n /= 10;
    }
    return original == reversed;
}
int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    if (isPalindrome(n)) printf("Possible");
    else printf("Not Possible");
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    static boolean isPalindrome(int n) {
        int reversed = 0, original = n, remainder;
        while (n != 0) {
            remainder = n % 10;
            reversed = reversed * 10 + remainder;
            n /= 10;
        }
        return original == reversed;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int n = sc.nextInt();
            System.out.print(isPalindrome(n) ? "Possible" : "Not Possible");
        }
    }
}`,
        Python: `def is_palindrome(n):
    return str(n) == str(n)[::-1]
if __name__ == "__main__":
    try:
        n = int(input())
        print("Possible" if is_palindrome(n) else "Not Possible")
    except: pass`
    },
    'Sum of Array': {
        C: `#include <stdio.h>
int main() {
    int n, i, sum = 0, val;
    if (scanf("%d", &n) != 1) return 0;
    for (i = 0; i < n; i++) {
        scanf("%d", &val);
        sum += val;
    }
    printf("%d", sum);
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int sum = 0;
        for (i = 0; i < n; i++) sum += sc.nextInt();
        System.out.print(sum);
    }
}`,
        Python: `if __name__ == "__main__":
    import sys
    input = sys.stdin.read
    data = input().split()
    if data:
        arr = [int(x) for x in data[1:]]
        print(sum(arr))`
    },
    'Reverse an Array': {
        C: `#include <stdio.h>
void reverseArray(int arr[], int n) {
    int start = 0, end = n - 1, temp;
    while (start < end) {
        temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++;
        end--;
    }
}
int main() {
    int n, i;
    if (scanf("%d", &n) != 1) return 0;
    int arr[100];
    for (i = 0; i < n; i++) scanf("%d", &arr[i]);
    reverseArray(arr, n);
    for (i = 0; i < n; i++) printf("%d ", arr[i]);
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    static void reverseArray(int[] arr) {
        int start = 0, end = arr.length - 1;
        while (start < end) {
            int temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;
            start++;
            end--;
        }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        reverseArray(arr);
        for (int i = 0; i < n; i++) System.out.print(arr[i] + " ");
    }
}`,
        Python: `def reverse_array(arr):
    return arr[::-1]
if __name__ == "__main__":
    import sys
    input = sys.stdin.read
    data = input().split()
    if data:
        arr = [int(x) for x in data[1:]]
        print(*(reverse_array(arr)))`
    },
    'Fibonacci Series': {
        C: `#include <stdio.h>
int main() {
    int n, t1 = 0, t2 = 1, nextTerm;
    if (scanf("%d", &n) != 1) return 0;
    for (int i = 1; i <= n; ++i) {
        printf("%d ", t1);
        nextTerm = t1 + t2;
        t1 = t2;
        t2 = nextTerm;
    }
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int t1 = 0, t2 = 1;
        for (int i = 1; i <= n; ++i) {
            System.out.print(t1 + " ");
            int sum = t1 + t2;
            t1 = t2;
            t2 = sum;
        }
    }
}`,
        Python: `if __name__ == "__main__":
    try:
        n = int(input())
        t1, t2 = 0, 1
        for i in range(n):
            print(t1, end=' ')
            t1, t2 = t2, t1 + t2
    except: pass`
    },
    'Prime Number Check': {
        C: `#include <stdio.h>
int main() {
    int n, i, flag = 0;
    if (scanf("%d", &n) != 1) return 0;
    if (n == 0 || n == 1) flag = 1;
    for (i = 2; i <= n / 2; ++i) {
        if (n % i == 0) {
            flag = 1;
            break;
        }
    }
    if (flag == 0) printf("Prime");
    else printf("Not Prime");
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        boolean flag = false;
        if (n == 0 || n == 1) flag = true;
        for (int i = 2; i <= n / 2; ++i) {
            if (n % i == 0) {
                flag = true;
                break;
            }
        }
        System.out.print(!flag ? "Prime" : "Not Prime");
    }
}`,
        Python: `if __name__ == "__main__":
    try:
        n = int(input())
        if n > 1:
            for i in range(2, int(n**0.5) + 1):
                if (n % i) == 0:
                    print("Not Prime")
                    break
            else:
                print("Prime")
        else:
            print("Not Prime")
    except: pass`
    },
    'Count Vowels': {
        C: `#include <stdio.h>
#include <ctype.h>
int main() {
    char s[100];
    int count = 0, i = 0;
    fgets(s, sizeof(s), stdin);
    while (s[i] != '\\0') {
        char ch = tolower(s[i]);
        if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') count++;
        i++;
    }
    printf("%d", count);
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine().toLowerCase();
        int count = 0;
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') count++;
        }
        System.out.print(count);
    }
}`,
        Python: `if __name__ == "__main__":
    s = input().lower()
    count = 0
    for char in s:
        if char in "aeiou":
            count += 1
    print(count)`
    },
    'Find Maximum Element': {
        C: `#include <stdio.h>
int main() {
    int n, i, max;
    if (scanf("%d", &n) != 1) return 0;
    int arr[100];
    for (i = 0; i < n; i++) scanf("%d", &arr[i]);
    max = arr[0];
    for (i = 1; i < n; i++) {
        if (arr[i] > max) max = arr[i];
    }
    printf("%d", max);
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        int max = arr[0];
        for (int i = 1; i < n; i++) {
            if (arr[i] > max) max = arr[i];
        }
        System.out.print(max);
    }
}`,
        Python: `if __name__ == "__main__":
    import sys
    input = sys.stdin.read
    data = input().split()
    if data:
        arr = [int(x) for x in data[1:]]
        print(max(arr))`
    },
    'Linear Search': {
        C: `#include <stdio.h>
int main() {
    int n, key, i, found = -1;
    scanf("%d", &n);
    int arr[100];
    for (i = 0; i < n; i++) scanf("%d", &arr[i]);
    scanf("%d", &key);
    for (i = 0; i < n; i++) {
        if (arr[i] == key) {
            found = i;
            break;
        }
    }
    printf("%d", found); 
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        int key = sc.nextInt();
        int found = -1;
        for (int i = 0; i < n; i++) {
            if (arr[i] == key) {
                found = i;
                break;
            }
        }
        System.out.print(found);
    }
}`,
        Python: `if __name__ == "__main__":
    import sys
    input = sys.stdin.read
    data = input().split()
    n = int(data[0])
    arr = [int(x) for x in data[1:n+1]]
    key = int(data[n+1])
    try:
        print(arr.index(key))
    except ValueError:
        print("-1")`
    },
    'Check Leap Year': {
        C: `#include <stdio.h>
int main() {
    int year;
    scanf("%d", &year);
    if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0))
        printf("Leap Year");
    else
        printf("Not a Leap Year");
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int year = sc.nextInt();
        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0))
            System.out.print("Leap Year");
        else
            System.out.print("Not a Leap Year");
    }
}`,
        Python: `if __name__ == "__main__":
    year = int(input())
    if (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0):
        print("Leap Year")
    else:
        print("Not a Leap Year")`
    },
    'Swap Two Numbers': {
        C: `#include <stdio.h>
int main() {
    int a, b;
    scanf("%d %d", &a, &b);
    a = a + b;
    b = a - b;
    a = a - b;
    printf("%d %d", a, b);
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        a = a + b;
        b = a - b;
        a = a - b;
        System.out.print(a + " " + b);
    }
}`,
        Python: `if __name__ == "__main__":
    a = int(input())
    b = int(input())
    a, b = b, a
    print(a, b)`
    },
    'Simple Pyramid Pattern': {
        C: `#include <stdio.h>
int main() {
    int n, i, j;
    scanf("%d", &n);
    for (i = 1; i <= n; i++) {
        for (j = 1; j <= i; j++) printf("* ");
        printf("\\n");
    }
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) System.out.print("* ");
            System.out.println();
        }
    }
}`,
        Python: `if __name__ == "__main__":
    n = int(input())
    for i in range(1, n + 1):
        print("* " * i)`
    },
    'Armstrong Number': {
        C: `#include <stdio.h>
#include <math.h>
int main() {
    int n, original, remainder, result = 0, digits = 0;
    scanf("%d", &n);
    original = n;
    int temp = n;
    while (temp != 0) {
        temp /= 10;
        digits++;
    }
    original = n;
    while (original != 0) {
        remainder = original % 10;
        result += pow(remainder, digits);
        original /= 10;
    }
    if (result == n) printf("Armstrong");
    else printf("Not Armstrong");
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int original = n, remainder, result = 0, digits = 0;
        int temp = n;
        while (temp != 0) {
            temp /= 10;
            digits++;
        }
        original = n;
        while (original != 0) {
            remainder = original % 10;
            result += Math.pow(remainder, digits);
            original /= 10;
        }
        System.out.print(result == n ? "Armstrong" : "Not Armstrong");
    }
}`,
        Python: `if __name__ == "__main__":
    n = int(input())
    order = len(str(n))
    sum_val = 0
    temp = n
    while temp > 0:
        digit = temp % 10
        sum_val += digit ** order
        temp //= 10
    if n == sum_val: print("Armstrong")
    else: print("Not Armstrong")`
    },
    'Convert Celsius to Fahrenheit': {
        C: `#include <stdio.h>
int main() {
    float c, f;
    scanf("%f", &c);
    f = (c * 9 / 5) + 32;
    printf("%.2f", f);
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        float c = sc.nextFloat();
        float f = (c * 9 / 5) + 32;
        System.out.printf("%.2f", f);
    }
}`,
        Python: `if __name__ == "__main__":
    c = float(input())
    f = (c * 9 / 5) + 32
    print(f"{f:.2f}")`
    },
    // Round 2: Moderate/High
    'Binary Search': {
        C: `#include <stdio.h>
int main() {
    int n, key, i, low, high, mid, found = -1;
    if (scanf("%d", &n) != 1) return 0;
    int arr[100];
    for (i = 0; i < n; i++) scanf("%d", &arr[i]);
    scanf("%d", &key);
    low = 0; high = n - 1;
    while (low <= high) {
        mid = (low + high) / 2;
        if (arr[mid] == key) {
            found = mid;
            break;
        } else if (arr[mid] < key) low = mid + 1;
        else high = mid - 1;
    }
    printf("%d", found);
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        int key = sc.nextInt();
        int low = 0, high = n - 1, found = -1;
        while (low <= high) {
            int mid = (low + high) / 2;
            if (arr[mid] == key) {
                found = mid;
                break;
            } else if (arr[mid] < key) low = mid + 1;
            else high = mid - 1;
        }
        System.out.print(found);
    }
}`,
        Python: `if __name__ == "__main__":
    import sys
    input = sys.stdin.read
    data = input().split()
    if data:
        n = int(data[0])
        arr = [int(x) for x in data[1:n+1]]
        key = int(data[n+1])
        low, high = 0, n - 1
        found = -1
        while low <= high:
            mid = (low + high) // 2
            if arr[mid] == key:
                found = mid
                break
            elif arr[mid] < key:
                low = mid + 1
            else:
                high = mid - 1
        print(found)`
    },
    'Selection Sort': {
        C: `#include <stdio.h>
int main() {
    int n, i, j, min_idx, temp;
    if (scanf("%d", &n) != 1) return 0;
    int arr[100];
    for (i = 0; i < n; i++) scanf("%d", &arr[i]);
    for (i = 0; i < n-1; i++) {
        min_idx = i;
        for (j = i+1; j < n; j++)
            if (arr[j] < arr[min_idx]) min_idx = j;
        temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
    }
    for (i = 0; i < n; i++) printf("%d ", arr[i]);
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        for (int i = 0; i < n-1; i++) {
            int min_idx = i;
            for (int j = i+1; j < n; j++)
                if (arr[j] < arr[min_idx]) min_idx = j;
            int temp = arr[min_idx];
            arr[min_idx] = arr[i];
            arr[i] = temp;
        }
        for (int i = 0; i < n; i++) System.out.print(arr[i] + " ");
    }
}`,
        Python: `if __name__ == "__main__":
    import sys
    input = sys.stdin.read
    data = input().split()
    if data:
        arr = [int(x) for x in data[1:]]
        n = len(arr)
        for i in range(n):
            min_idx = i
            for j in range(i+1, n):
                if arr[j] < arr[min_idx]:
                    min_idx = j
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
        print(*(arr))`
    },
    'Insertion Sort': {
        C: `#include <stdio.h>
int main() {
    int n, i, key, j;
    if (scanf("%d", &n) != 1) return 0;
    int arr[100];
    for (i = 0; i < n; i++) scanf("%d", &arr[i]);
    for (i = 1; i < n; i++) {
        key = arr[i];
        j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
    for (i = 0; i < n; i++) printf("%d ", arr[i]);
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        for (int i = 1; i < n; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
        for (int i = 0; i < n; i++) System.out.print(arr[i] + " ");
    }
}`,
        Python: `if __name__ == "__main__":
    import sys
    input = sys.stdin.read
    data = input().split()
    if data:
        arr = [int(x) for x in data[1:]]
        for i in range(1, len(arr)):
            key = arr[i]
            j = i - 1
            while j >= 0 and key < arr[j]:
                arr[j + 1] = arr[j]
                j -= 1
            arr[j + 1] = key
        print(*(arr))`
    },
    'Matrix Addition': {
        C: `#include <stdio.h>
int main() {
    int r, c, i, j; 
    scanf("%d %d", &r, &c);
    int a[10][10], b[10][10], sum[10][10];
    for (i = 0; i < r; ++i) for (j = 0; j < c; ++j) scanf("%d", &a[i][j]);
    for (i = 0; i < r; ++i) for (j = 0; j < c; ++j) scanf("%d", &b[i][j]);
    for (i = 0; i < r; ++i) {
        for (j = 0; j < c; ++j) {
            sum[i][j] = a[i][j] + b[i][j];
            printf("%d ", sum[i][j]);
        }
        printf("\\n");
    }
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int r = sc.nextInt();
        int c = sc.nextInt();
        int[][] a = new int[r][c];
        int[][] b = new int[r][c];
        for(int i=0;i<r;i++) for(int j=0;j<c;j++) a[i][j]=sc.nextInt();
        for(int i=0;i<r;i++) for(int j=0;j<c;j++) b[i][j]=sc.nextInt();
        for(int i=0;i<r;i++) {
            for(int j=0;j<c;j++) {
                System.out.print((a[i][j] + b[i][j]) + " ");
            }
            System.out.println();
        }
    }
}`,
        Python: `if __name__ == "__main__":
    import sys
    input = sys.stdin.read
    data = input().split()
    if data:
        r, c = int(data[0]), int(data[1])
        it = iter(data[2:])
        a = [[int(next(it)) for _ in range(c)] for _ in range(r)]
        b = [[int(next(it)) for _ in range(c)] for _ in range(r)]
        for i in range(r):
            print(*[x + y for x, y in zip(a[i], b[i])])`
    },
    'Matrix Multiplication': {
        C: `#include <stdio.h>
int main() {
    int r1, c1, r2, c2, i, j, k;
    scanf("%d %d", &r1, &c1);
    int a[10][10];
    for(i=0; i<r1; i++) for(j=0; j<c1; j++) scanf("%d", &a[i][j]);
    scanf("%d %d", &r2, &c2);
    int b[10][10], res[10][10] = {0};
    for(i=0; i<r2; i++) for(j=0; j<c2; j++) scanf("%d", &b[i][j]);
    if (c1 != r2) return 0;
    for (i = 0; i < r1; ++i) {
        for (j = 0; j < c2; ++j) {
            for (k = 0; k < c1; ++k) res[i][j] += a[i][k] * b[k][j];
            printf("%d ", res[i][j]);
        }
        printf("\\n");
    }
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int r1=sc.nextInt(), c1=sc.nextInt();
        int[][] a = new int[r1][c1];
        for(int i=0;i<r1;i++) for(int j=0;j<c1;j++) a[i][j]=sc.nextInt();
        int r2=sc.nextInt(), c2=sc.nextInt();
        int[][] b = new int[r2][c2];
        for(int i=0;i<r2;i++) for(int j=0;j<c2;j++) b[i][j]=sc.nextInt();
        if(c1!=r2) return;
        for(int i=0;i<r1;i++) {
            for(int j=0;j<c2;j++) {
                int sum=0;
                for(int k=0;k<c1;k++) sum += a[i][k]*b[k][j];
                System.out.print(sum + " ");
            }
            System.out.println();
        }
    }
}`,
        Python: `if __name__ == "__main__":
    import sys
    input = sys.stdin.read
    data = input().split()
    if data:
        it = iter(data)
        r1, c1 = int(next(it)), int(next(it))
        a = [[int(next(it)) for _ in range(c1)] for _ in range(r1)]
        r2, c2 = int(next(it)), int(next(it))
        b = [[int(next(it)) for _ in range(c2)] for _ in range(r2)]
        if c1 == r2:
            res = [[sum(a*b for a,b in zip(X_row,Y_col)) for Y_col in zip(*b)] for X_row in a]
            for row in res: print(*row)`
    },
    'Transpose Matrix': {
        C: `#include <stdio.h>
int main() {
    int r, c, i, j;
    scanf("%d %d", &r, &c);
    int a[10][10];
    for (i = 0; i < r; ++i) for (j = 0; j < c; ++j) scanf("%d", &a[i][j]);
    for (i = 0; i < c; ++i) {
        for (j = 0; j < r; ++j) printf("%d ", a[j][i]);
        printf("\\n");
    }
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int r=sc.nextInt(), c=sc.nextInt();
        int[][] a = new int[r][c];
        for(int i=0;i<r;i++) for(int j=0;j<c;j++) a[i][j]=sc.nextInt();
        for(int i=0;i<c;i++) {
            for(int j=0;j<r;j++) System.out.print(a[j][i] + " ");
            System.out.println();
        }
    }
}`,
        Python: `if __name__ == "__main__":
    import sys
    input = sys.stdin.read
    data = input().split()
    if data:
        it = iter(data)
        r, c = int(next(it)), int(next(it))
        a = [[int(next(it)) for _ in range(c)] for _ in range(r)]
        for j in range(c):
            print(*(a[i][j] for i in range(r)))`
    },
    'Check Anagram': {
        C: `#include <stdio.h>
#include <string.h>
#include <stdlib.h>
int compare(const void *a, const void *b) { return (*(char *)a - *(char *)b); }
int main() {
    char s1[100], s2[100];
    scanf("%s %s", s1, s2);
    int n1 = strlen(s1), n2 = strlen(s2);
    if (n1 != n2) { printf("Not Anagram"); return 0; }
    qsort(s1, n1, sizeof(char), compare);
    qsort(s2, n2, sizeof(char), compare);
    if (strcmp(s1, s2) == 0) printf("Anagram");
    else printf("Not Anagram");
    return 0;
}`,
        Java: `import java.util.Arrays;
import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s1 = sc.next();
        String s2 = sc.next();
        char[] c1 = s1.toCharArray();
        char[] c2 = s2.toCharArray();
        Arrays.sort(c1);
        Arrays.sort(c2);
        if (Arrays.equals(c1, c2)) System.out.print("Anagram");
        else System.out.print("Not Anagram");
    }
}`,
        Python: `if __name__ == "__main__":
    s1, s2 = input().split()
    if sorted(s1) == sorted(s2): print("Anagram")
    else: print("Not Anagram")`
    },
    'Remove Duplicates from Array': {
        C: `#include <stdio.h>
int main() {
    int n, i, j, k;
    if (scanf("%d", &n) != 1) return 0;
    int arr[100];
    for (i = 0; i < n; i++) scanf("%d", &arr[i]);
    for (i = 0; i < n; i++) {
        for (j = i + 1; j < n;) {
            if (arr[j] == arr[i]) {
                for (k = j; k < n; k++) arr[k] = arr[k + 1];
                n--;
            } else j++;
        }
    }
    for (i = 0; i < n; i++) printf("%d ", arr[i]);
    return 0;
}`,
        Java: `import java.util.Scanner;
import java.util.Arrays;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for(int i=0;i<n;i++) arr[i]=sc.nextInt();
        int end = n;
        for (int i = 0; i < end; i++) {
            for (int j = i + 1; j < end; j++) {
                if (arr[i] == arr[j]) {
                    int shiftLeft = j;
                    for (int k = j+1; k < end; k++, shiftLeft++) {
                        arr[shiftLeft] = arr[k];
                    }
                    end--;
                    j--;
                }
            }
        }
        for(int i=0;i<end;i++) System.out.print(arr[i] + " ");
    }
}`,
        Python: `if __name__ == "__main__":
    import sys
    input = sys.stdin.read
    data = input().split()
    if data:
        arr = [int(x) for x in data[1:]]
        res = []
        [res.append(x) for x in arr if x not in res]
        print(*(res))`
    },
    'Second Largest Element': {
        C: `#include <stdio.h>
#include <limits.h>
int main() {
    int n, i;
    if (scanf("%d", &n) != 1) return 0;
    int arr[100];
    for (i = 0; i < n; i++) scanf("%d", &arr[i]);
    if (n < 2) return 0;
    int first = INT_MIN, second = INT_MIN;
    for (i = 0; i < n; i++) {
        if (arr[i] > first) {
            second = first;
            first = arr[i];
        } else if (arr[i] > second && arr[i] != first) {
            second = arr[i];
        }
    }
    if (second == INT_MIN) printf("None");
    else printf("%d", second);
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        if (n < 2) return;
        int[] arr = new int[n];
        for(int i=0;i<n;i++) arr[i]=sc.nextInt();
        int first = Integer.MIN_VALUE, second = Integer.MIN_VALUE;
        for (int i = 0; i < n; i++) {
            if (arr[i] > first) {
                second = first;
                first = arr[i];
            } else if (arr[i] > second && arr[i] != first) {
                second = arr[i];
            }
        }
        if (second == Integer.MIN_VALUE && first != Integer.MIN_VALUE) System.out.print("None");
        else System.out.print(second);
    }
}`,
        Python: `if __name__ == "__main__":
    import sys
    input = sys.stdin.read
    data = input().split()
    if data:
        arr = list(set([int(x) for x in data[1:]]))
        if len(arr) < 2: print("None")
        else:
            arr.sort()
            print(arr[-2])`
    },
    'GCD and LCM': {
        C: `#include <stdio.h>
int gcd(int a, int b) { return b == 0 ? a : gcd(b, a % b); }
int main() {
    int a, b;
    scanf("%d %d", &a, &b);
    int g = gcd(a, b);
    int l = (a * b) / g;
    printf("GCD:%d LCM:%d", g, l);
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    static int gcd(int a, int b) { return b == 0 ? a : gcd(b, a % b); }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        int g = gcd(a, b);
        int l = (a * b) / g;
        System.out.printf("GCD:%d LCM:%d", g, l);
    }
}`,
        Python: `def gcd(a, b):
    while b: a, b = b, a % b
    return a
if __name__ == "__main__":
    a, b = map(int, input().split())
    g = gcd(a, b)
    l = (a * b) // g
    print(f"GCD:{g} LCM:{l}")`
    },
    'Count Frequency of Characters': {
        C: `#include <stdio.h>
#include <string.h>
int main() {
    char s[100];
    int freq[256] = {0}, i;
    scanf("%s", s);
    for(i = 0; s[i] != '\\0'; i++) freq[(int)s[i]]++;
    for(i = 0; i < 256; i++) {
        if(freq[i] != 0) printf("%c%d ", i, freq[i]);
    }
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        int[] freq = new int[256];
        for(char c : s.toCharArray()) freq[c]++;
        for(int i=0; i<256; i++) {
            if(freq[i] > 0) System.out.print((char)i + "" + freq[i] + " ");
        }
    }
}`,
        Python: `if __name__ == "__main__":
    s = input()
    freq = {}
    for c in s: freq[c] = freq.get(c, 0) + 1
    for k in sorted(freq.keys()): print(f"{k}{freq[k]}", end=" ")`
    },
    'Decimal to Binary Conversion': {
        C: `#include <stdio.h>
int main() {
    int n, binary[32], i = 0;
    if (scanf("%d", &n) != 1) return 0;
    if (n == 0) { printf("0"); return 0; }
    while (n > 0) {
        binary[i] = n % 2;
        n = n / 2;
        i++;
    }
    for (int j = i - 1; j >= 0; j--) printf("%d", binary[j]);
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int n = sc.nextInt();
            System.out.print(Integer.toBinaryString(n));
        }
    }
}`,
        Python: `if __name__ == "__main__":
    try:
        n = int(input())
        print(bin(n)[2:])
    except: pass`
    },
    'Merge Two Sorted Arrays': {
        C: `#include <stdio.h>
int main() {
    int n1, n2, i = 0, j = 0;
    int a[100], b[100];
    scanf("%d", &n1);
    for(int k=0; k<n1; k++) scanf("%d", &a[k]);
    scanf("%d", &n2);
    for(int k=0; k<n2; k++) scanf("%d", &b[k]);
    while (i < n1 && j < n2) {
        if (a[i] < b[j]) printf("%d ", a[i++]);
        else printf("%d ", b[j++]);
    }
    while (i < n1) printf("%d ", a[i++]);
    while (j < n2) printf("%d ", b[j++]);
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n1 = sc.nextInt();
        int[] a = new int[n1];
        for(int k=0; k<n1; k++) a[k]=sc.nextInt();
        int n2 = sc.nextInt();
        int[] b = new int[n2];
        for(int k=0; k<n2; k++) b[k]=sc.nextInt();
        int i=0, j=0;
        while(i<n1 && j<n2) {
            if(a[i]<b[j]) System.out.print(a[i++] + " ");
            else System.out.print(b[j++] + " ");
        }
        while(i<n1) System.out.print(a[i++] + " ");
        while(j<n2) System.out.print(b[j++] + " ");
    }
}`,
        Python: `if __name__ == "__main__":
    import sys
    input = sys.stdin.read
    data = input().split()
    if data:
        it = iter(data)
        n1 = int(next(it))
        a = [int(next(it)) for _ in range(n1)]
        n2 = int(next(it))
        b = [int(next(it)) for _ in range(n2)]
        print(*(sorted(a + b)))`
    },
    'Caesar Cipher Encryption': {
        C: `#include <stdio.h>
int main() {
    char text[100];
    int s;
    scanf("%s", text);
    scanf("%d", &s);
    for (int i = 0; text[i] != '\\0'; ++i) {
        char ch = text[i];
        if (ch >= 'a' && ch <= 'z') ch = (ch - 'a' + s) % 26 + 'a';
        else if (ch >= 'A' && ch <= 'Z') ch = (ch - 'A' + s) % 26 + 'A';
        text[i] = ch;
    }
    printf("%s", text);
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String text = sc.next();
        int s = sc.nextInt();
        StringBuilder result = new StringBuilder();
        for (char ch : text.toCharArray()) {
            if (Character.isUpperCase(ch)) {
                char c = (char)(((int)ch + s - 65) % 26 + 65);
                result.append(c);
            } else {
                char c = (char)(((int)ch + s - 97) % 26 + 97);
                result.append(c);
            }
        }
        System.out.print(result);
    }
}`,
        Python: `if __name__ == "__main__":
    text = input()
    s = int(input())
    res = ""
    for char in text:
        if char.isupper(): res += chr((ord(char) + s - 65) % 26 + 65)
        else: res += chr((ord(char) + s - 97) % 26 + 97)
    print(res)`
    },
    'Check Substring Presence': {
        C: `#include <stdio.h>
#include <string.h>
int main() {
    char s1[100], s2[100];
    scanf("%s %s", s1, s2);
    if (strstr(s1, s2) != NULL) printf("Present");
    else printf("Not Present");
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s1 = sc.next();
        String s2 = sc.next();
        if (s1.contains(s2)) System.out.print("Present");
        else System.out.print("Not Present");
    }
}`,
        Python: `if __name__ == "__main__":
    s1, s2 = input().split()
    if s2 in s1: print("Present")
    else: print("Not Present")`
    },
    // Round 3: High/Extreme
    'Quick Sort': {
        C: `#include <stdio.h>
void swap(int* a, int* b) { int t = *a; *a = *b; *b = t; }
int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return (i + 1);
}
void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}
int main() {
    int n, i;
    if (scanf("%d", &n) != 1) return 0;
    int arr[100];
    for (i = 0; i < n; i++) scanf("%d", &arr[i]);
    quickSort(arr, 0, n - 1);
    for (i = 0; i < n; i++) printf("%d ", arr[i]);
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    static int partition(int arr[], int low, int high) {
        int pivot = arr[high];
        int i = (low - 1);
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }
    static void sort(int arr[], int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            sort(arr, low, pi - 1);
            sort(arr, pi + 1, high);
        }
    }
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int arr[] = new int[n];
        for (int i = 0; i < n; ++i) arr[i] = sc.nextInt();
        sort(arr, 0, n - 1);
        for (int i = 0; i < n; ++i) System.out.print(arr[i] + " ");
    }
}`,
        Python: `def partition(arr, low, high):
    i = (low - 1)
    pivot = arr[high]
    for j in range(low, high):
        if arr[j] < pivot:
            i = i + 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return (i + 1)
def quickSort(arr, low, high):
    if len(arr) == 1: return arr
    if low < high:
        pi = partition(arr, low, high)
        quickSort(arr, low, pi - 1)
        quickSort(arr, pi + 1, high)
if __name__ == "__main__":
    import sys
    input = sys.stdin.read
    data = input().split()
    if data:
        arr = [int(x) for x in data[1:]]
        n = len(arr)
        quickSort(arr, 0, n - 1)
        print(*(arr))`
    },
    'Merge Sort': {
        C: `#include <stdio.h>
void merge(int arr[], int l, int m, int r) {
    int i, j, k;
    int n1 = m - l + 1;
    int n2 = r - m;
    int L[n1], R[n2];
    for (i = 0; i < n1; i++) L[i] = arr[l + i];
    for (j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    i = 0; j = 0; k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}
void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}
int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[100];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    mergeSort(arr, 0, n - 1);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    void merge(int arr[], int l, int m, int r) {
        int n1 = m - l + 1;
        int n2 = r - m;
        int L[] = new int[n1];
        int R[] = new int[n2];
        for (int i = 0; i < n1; ++i) L[i] = arr[l + i];
        for (int j = 0; j < n2; ++j) R[j] = arr[m + 1 + j];
        int i = 0, j = 0;
        int k = l;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) arr[k++] = L[i++];
            else arr[k++] = R[j++];
        }
        while (i < n1) arr[k++] = L[i++];
        while (j < n2) arr[k++] = R[j++];
    }
    void sort(int arr[], int l, int r) {
        if (l < r) {
            int m = l + (r - l) / 2;
            sort(arr, l, m);
            sort(arr, m + 1, r);
            merge(arr, l, m, r);
        }
    }
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int arr[] = new int[n];
        for (int i = 0; i < n; ++i) arr[i] = sc.nextInt();
        Main ob = new Main();
        ob.sort(arr, 0, n - 1);
        for (int i = 0; i < n; ++i) System.out.print(arr[i] + " ");
    }
}`,
        Python: `def mergeSort(arr):
    if len(arr) > 1:
        mid = len(arr)//2
        L = arr[:mid]
        R = arr[mid:]
        mergeSort(L)
        mergeSort(R)
        i = j = k = 0
        while i < len(L) and j < len(R):
            if L[i] < R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1
        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1
        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1
if __name__ == "__main__":
    import sys
    input = sys.stdin.read
    data = input().split()
    if data:
        arr = [int(x) for x in data[1:]]
        mergeSort(arr)
        print(*(arr))`
    },
    'Reverse Linked List': {
        C: `#include <stdio.h>
#include <stdlib.h>
struct Node { int data; struct Node* next; };
struct Node* reverse(struct Node* head) {
    struct Node* prev = NULL;
    struct Node* current = head;
    struct Node* next = NULL;
    while (current != NULL) {
        next = current->next;
        current->next = prev;
        prev = current;
        current = next;
    }
    return prev;
}
int main() {
    int n, val;
    scanf("%d", &n);
    struct Node *head = NULL, *temp = NULL;
    for(int i=0; i<n; i++) {
        scanf("%d", &val);
        struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
        newNode->data = val; newNode->next = NULL;
        if(head == NULL) head = temp = newNode;
        else { temp->next = newNode; temp = newNode; }
    }
    head = reverse(head);
    temp = head;
    while(temp != NULL) { printf("%d ", temp->data); temp = temp->next; }
    return 0;
}`,
        Java: `import java.util.Scanner;
class Node { int data; Node next; Node(int d) { data = d; next = null; } }
public class Main {
    static Node reverse(Node head) {
        Node prev = null;
        Node current = head;
        Node next = null;
        while (current != null) {
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        return prev;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        if(n==0) return;
        Node head = new Node(sc.nextInt());
        Node temp = head;
        for(int i=1; i<n; i++) {
            temp.next = new Node(sc.nextInt());
            temp = temp.next;
        }
        head = reverse(head);
        temp = head;
        while(temp != null) { System.out.print(temp.data + " "); temp = temp.next; }
    }
}`,
        Python: `if __name__ == "__main__":
    import sys
    input = sys.stdin.read
    data = input().split()
    if data:
        arr = [int(x) for x in data[1:]]
        print(*(arr[::-1]))`
    },
    'Detect Cycle in Linked List': {
        C: `#include <stdio.h>
#include <stdlib.h>
struct Node { int data; struct Node* next; };
int hasCycle(struct Node* head) {
    if (!head) return 0;
    struct Node *slow = head, *fast = head;
    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return 1;
    }
    return 0;
}
int main() {
    // Simulated input: N nodes, then index of tail connection
    int n, val, pos;
    scanf("%d", &n);
    struct Node *head = NULL, *temp = NULL, *cycleNode = NULL;
    struct Node **nodes = (struct Node**)malloc(n * sizeof(struct Node*));
    for(int i=0; i<n; i++) {
        scanf("%d", &val);
        struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
        newNode->data = val; newNode->next = NULL;
        nodes[i] = newNode;
        if(head == NULL) head = temp = newNode;
        else { temp->next = newNode; temp = newNode; }
    }
    scanf("%d", &pos);
    if (pos >= 0 && pos < n) temp->next = nodes[pos];
    if (hasCycle(head)) printf("Cycle Detected");
    else printf("No Cycle");
    return 0;
}`,
        Java: `import java.util.Scanner;
import java.util.ArrayList;
class Node { int data; Node next; Node(int d) { data = d; next = null; } }
public class Main {
    static boolean hasCycle(Node head) {
        if (head == null) return false;
        Node slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        if(n==0) return;
        ArrayList<Node> nodes = new ArrayList<>();
        Node head = new Node(sc.nextInt());
        nodes.add(head);
        Node temp = head;
        for(int i=1; i<n; i++) {
            Node newNode = new Node(sc.nextInt());
            temp.next = newNode;
            temp = newNode;
            nodes.add(newNode);
        }
        int pos = sc.nextInt();
        if(pos >= 0 && pos < n) temp.next = nodes.get(pos);
        System.out.print(hasCycle(head) ? "Cycle Detected" : "No Cycle");
    }
}`,
        Python: `class Node:
    def __init__(self, data): self.data = data; self.next = None
def has_cycle(head):
    slow, fast = head, head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast: return True
    return False
if __name__ == "__main__":
    import sys
    # Simulation: Read list and pos
    input = sys.stdin.read
    data = input().split()
    if data:
        n = int(data[0])
        vals = [int(x) for x in data[1:n+1]]
        pos = int(data[n+1])
        if n > 0:
            nodes = [Node(v) for v in vals]
            for i in range(n-1): nodes[i].next = nodes[i+1]
            if 0 <= pos < n: nodes[-1].next = nodes[pos]
            print("Cycle Detected" if has_cycle(nodes[0]) else "No Cycle")`
    },
    'Valid Parentheses': {
        C: `#include <stdio.h>
#include <string.h>
int isValid(char *s) {
    char stack[1000];
    int top = -1;
    for(int i=0; s[i]!='\\0'; i++) {
        char c = s[i];
        if (c == '(' || c == '{' || c == '[') stack[++top] = c;
        else {
            if (top == -1) return 0;
            char topChar = stack[top--];
            if ((c == ')' && topChar != '(') || 
                (c == '}' && topChar != '{') || 
                (c == ']' && topChar != '[')) return 0;
        }
    }
    return top == -1;
}
int main() {
    char s[100];
    scanf("%s", s);
    if(isValid(s)) printf("Valid");
    else printf("Invalid");
    return 0;
}`,
        Java: `import java.util.Scanner;
import java.util.Stack;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        Stack<Character> stack = new Stack<>();
        boolean valid = true;
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '{' || c == '[') stack.push(c);
            else {
                if (stack.isEmpty()) { valid = false; break; }
                char top = stack.pop();
                if ((c == ')' && top != '(') || 
                    (c == '}' && top != '{') || 
                    (c == ']' && top != '[')) { valid = false; break; }
            }
        }
        if (valid && stack.isEmpty()) System.out.print("Valid");
        else System.out.print("Invalid");
    }
}`,
        Python: `if __name__ == "__main__":
    s = input()
    stack = []
    map = {")": "(", "}": "{", "]": "["}
    valid = True
    for char in s:
        if char in map:
            top = stack.pop() if stack else '#'
            if map[char] != top:
                valid = False
                break
        else:
            stack.append(char)
    print("Valid" if valid and not stack else "Invalid")`
    },
    'Find Missing Number': {
        C: `#include <stdio.h>
int main() {
    long long n, sum = 0, actualSum;
    if (scanf("%lld", &n) != 1) return 0;
    actualSum = (n * (n + 1)) / 2;
    for(int i=0; i<n-1; i++) {
        int val; scanf("%d", &val);
        sum += val;
    }
    printf("%lld", actualSum - sum);
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long n = sc.nextLong();
        long actualSum = (n * (n + 1)) / 2;
        long sum = 0;
        for(int i=0; i<n-1; i++) sum += sc.nextInt();
        System.out.print(actualSum - sum);
    }
}`,
        Python: `if __name__ == "__main__":
    import sys
    input = sys.stdin.read
    data = input().split()
    n = int(data[0])
    arr = [int(x) for x in data[1:]]
    print((n * (n + 1)) // 2 - sum(arr))`
    },
    'Longest Common Prefix': {
        C: `#include <stdio.h>
#include <string.h>
int main() {
    int n, i, j;
    scanf("%d", &n);
    char arr[100][100];
    for(i=0; i<n; i++) scanf("%s", arr[i]);
    if (n == 0) return 0;
    char *prefix = arr[0];
    for (i = 1; i < n; i++) {
        j = 0;
        while (prefix[j] && arr[i][j] && prefix[j] == arr[i][j]) j++;
        prefix[j] = '\\0';
    }
    if (strlen(prefix) == 0) printf("None");
    else printf("%s", prefix);
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        if (n == 0) return;
        String prefix = sc.next();
        for (int i = 1; i < n; i++) {
            String s = sc.next();
            while (s.indexOf(prefix) != 0) {
                prefix = prefix.substring(0, prefix.length() - 1);
            }
        }
        System.out.print(prefix.isEmpty() ? "None" : prefix);
    }
}`,
        Python: `if __name__ == "__main__":
    import sys
    input = sys.stdin.read
    data = input().split()
    n = int(data[0])
    strs = data[1:]
    if not strs: print("None"); exit()
    prefix = strs[0]
    for s in strs[1:]:
        while not s.startswith(prefix):
            prefix = prefix[:-1]
            if not prefix: break
    print(prefix if prefix else "None")`
    },
    'Spiral Matrix Traversal': {
        C: `#include <stdio.h>
int main() {
    int r, c;
    scanf("%d %d", &r, &c);
    int matrix[r][c];
    for(int i=0; i<r; i++) for(int j=0; j<c; j++) scanf("%d", &matrix[i][j]);
    int top = 0, bottom = r - 1, left = 0, right = c - 1;
    while (top <= bottom && left <= right) {
        for (int i = left; i <= right; i++) printf("%d ", matrix[top][i]);
        top++;
        for (int i = top; i <= bottom; i++) printf("%d ", matrix[i][right]);
        right--;
        if (top <= bottom) {
            for (int i = right; i >= left; i--) printf("%d ", matrix[bottom][i]);
            bottom--;
        }
        if (left <= right) {
            for (int i = bottom; i >= top; i--) printf("%d ", matrix[i][left]);
            left++;
        }
    }
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int r = sc.nextInt(), c = sc.nextInt();
        int[][] matrix = new int[r][c];
        for(int i=0;i<r;i++) for(int j=0;j<c;j++) matrix[i][j]=sc.nextInt();
        int top = 0, bottom = r - 1, left = 0, right = c - 1;
        while (top <= bottom && left <= right) {
            for (int i = left; i <= right; i++) System.out.print(matrix[top][i] + " ");
            top++;
            for (int i = top; i <= bottom; i++) System.out.print(matrix[i][right] + " ");
            right--;
            if (top <= bottom) {
                for (int i = right; i >= left; i--) System.out.print(matrix[bottom][i] + " ");
                bottom--;
            }
            if (left <= right) {
                for (int i = bottom; i >= top; i--) System.out.print(matrix[i][left] + " ");
                left++;
            }
        }
    }
}`,
        Python: `if __name__ == "__main__":
    import sys
    input = sys.stdin.read
    data = input().split()
    r, c = int(data[0]), int(data[1])
    it = iter(data[2:])
    matrix = [[int(next(it)) for _ in range(c)] for _ in range(r)]
    res = []
    while matrix:
        res += matrix.pop(0)
        if matrix and matrix[0]:
            for row in matrix: res.append(row.pop())
        if matrix:
            res += matrix.pop()[::-1]
        if matrix and matrix[0]:
            for row in matrix[::-1]: res.append(row.pop(0))
    print(*(res))`
    },
    'Tower of Hanoi': {
        C: `#include <stdio.h>
void towerOfHanoi(int n, char from_rod, char to_rod, char aux_rod) {
    if (n == 0) return;
    towerOfHanoi(n - 1, from_rod, aux_rod, to_rod);
    printf("Move disk %d from %c to %c\\n", n, from_rod, to_rod);
    towerOfHanoi(n - 1, aux_rod, to_rod, from_rod);
}
int main() {
    int n;
    scanf("%d", &n);
    towerOfHanoi(n, 'A', 'C', 'B');
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    static void towerOfHanoi(int n, char from_rod, char to_rod, char aux_rod) {
        if (n == 0) return;
        towerOfHanoi(n - 1, from_rod, aux_rod, to_rod);
        System.out.println("Move disk " + n + " from " + from_rod + " to " + to_rod);
        towerOfHanoi(n - 1, aux_rod, to_rod, from_rod);
    }
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        if(sc.hasNextInt()) towerOfHanoi(sc.nextInt(), 'A', 'C', 'B');
    }
}`,
        Python: `def tower_of_hanoi(n, from_rod, to_rod, aux_rod):
    if n == 0: return
    tower_of_hanoi(n - 1, from_rod, aux_rod, to_rod)
    print(f"Move disk {n} from {from_rod} to {to_rod}")
    tower_of_hanoi(n - 1, aux_rod, to_rod, from_rod)
if __name__ == "__main__":
    try: tower_of_hanoi(int(input()), 'A', 'C', 'B')
    except: pass`
    },
    'Nth Fibonacci': {
        C: `#include <stdio.h>
long long memo[100];
long long fib(int n) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    return memo[n] = fib(n - 1) + fib(n - 2);
}
int main() {
    int n;
    scanf("%d", &n);
    for(int i=0; i<100; i++) memo[i] = -1;
    printf("%lld", fib(n));
    return 0;
}`,
        Java: `import java.util.Scanner;
import java.util.Arrays;
public class Main {
    static long[] memo = new long[100];
    static long fib(int n) {
        if (n <= 1) return n;
        if (memo[n] != -1) return memo[n];
        return memo[n] = fib(n - 1) + fib(n - 2);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Arrays.fill(memo, -1);
        if(sc.hasNextInt()) System.out.print(fib(sc.nextInt()));
    }
}`,
        Python: `memo = {}
def fib(n):
    if n in memo: return memo[n]
    if n <= 1: return n
    memo[n] = fib(n - 1) + fib(n - 2)
    return memo[n]
if __name__ == "__main__":
    try: print(fib(int(input())))
    except: pass`
    },
    'Generate All Subsets': {
        C: `#include <stdio.h>
#include <math.h>
int main() {
    int n;
    scanf("%d", &n);
    int arr[10]; 
    for(int i=0;i<n;i++) scanf("%d", &arr[i]);
    int count = pow(2, n);
    for (int i = 0; i < count; i++) {
        printf("{ ");
        for (int j = 0; j < n; j++) {
            if ((i & (1 << j)) > 0) printf("%d ", arr[j]);
        }
        printf("}\\n");
    }
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for(int i=0;i<n;i++) arr[i]=sc.nextInt();
        int count = (int) Math.pow(2, n);
        for (int i = 0; i < count; i++) {
            System.out.print("{ ");
            for (int j = 0; j < n; j++) {
                if ((i & (1 << j)) > 0) System.out.print(arr[j] + " ");
            }
            System.out.println("}");
        }
    }
}`,
        Python: `if __name__ == "__main__":
    import sys
    input = sys.stdin.read
    data = input().split()
    n = int(data[0])
    arr = [int(x) for x in data[1:]]
    count = 1 << n
    for i in range(count):
        subset = []
        for j in range(n):
            if (i & (1 << j)) > 0: subset.append(arr[j])
        print("{ " + " ".join(map(str, subset)) + " }")`
    },
    'Knapsack Problem': {
        C: `#include <stdio.h>
int max(int a, int b) { return (a > b) ? a : b; }
int knapSack(int W, int wt[], int val[], int n) {
    if (n == 0 || W == 0) return 0;
    if (wt[n - 1] > W) return knapSack(W, wt, val, n - 1);
    else return max(val[n - 1] + knapSack(W - wt[n - 1], wt, val, n - 1),
                    knapSack(W, wt, val, n - 1));
}
int main() {
    int n, W;
    scanf("%d %d", &n, &W);
    int val[100], wt[100];
    for(int i=0; i<n; i++) scanf("%d", &val[i]);
    for(int i=0; i<n; i++) scanf("%d", &wt[i]);
    printf("%d", knapSack(W, wt, val, n));
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    static int max(int a, int b) { return (a > b) ? a : b; }
    static int knapSack(int W, int wt[], int val[], int n) {
        if (n == 0 || W == 0) return 0;
        if (wt[n - 1] > W) return knapSack(W, wt, val, n - 1);
        else return max(val[n - 1] + knapSack(W - wt[n - 1], wt, val, n - 1),
                        knapSack(W, wt, val, n - 1));
    }
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int W = sc.nextInt();
        int[] val = new int[n];
        int[] wt = new int[n];
        for(int i=0; i<n; i++) val[i] = sc.nextInt();
        for(int i=0; i<n; i++) wt[i] = sc.nextInt();
        System.out.print(knapSack(W, wt, val, n));
    }
}`,
        Python: `def knapSack(W, wt, val, n):
    if n == 0 or W == 0: return 0
    if (wt[n-1] > W): return knapSack(W, wt, val, n-1)
    else: return max(val[n-1] + knapSack(W-wt[n-1], wt, val, n-1),
                   knapSack(W, wt, val, n-1))
if __name__ == "__main__":
    import sys
    input = sys.stdin.read
    data = input().split()
    n = int(data[0])
    W = int(data[1])
    val = [int(x) for x in data[2:2+n]]
    wt = [int(x) for x in data[2+n:]]
    print(knapSack(W, wt, val, n))`
    },
    'Longest Palindromic Substring': {
        C: `#include <stdio.h>
#include <string.h>
void printSubStr(char* str, int low, int high) {
    for (int i = low; i <= high; ++i) printf("%c", str[i]);
}
int main() {
    char str[100];
    scanf("%s", str);
    int n = strlen(str);
    int maxLength = 1, start = 0;
    for (int i = 0; i < n; i++) {
        for (int j = i; j < n; j++) {
            int flag = 1;
            for (int k = 0; k < (j - i + 1) / 2; k++)
                if (str[i + k] != str[j - k]) flag = 0;
            if (flag && (j - i + 1) > maxLength) {
                start = i;
                maxLength = j - i + 1;
            }
        }
    }
    printSubStr(str, start, start + maxLength - 1);
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String str = sc.next();
        int n = str.length();
        int maxLength = 1, start = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                boolean flag = true;
                for (int k = 0; k < (j - i + 1) / 2; k++)
                    if (str.charAt(i + k) != str.charAt(j - k)) flag = false;
                if (flag && (j - i + 1) > maxLength) {
                    start = i;
                    maxLength = j - i + 1;
                }
            }
        }
        System.out.print(str.substring(start, start + maxLength));
    }
}`,
        Python: `if __name__ == "__main__":
    s = input()
    n = len(s)
    res = ""
    for i in range(n):
        for j in range(i, n):
            sub = s[i:j+1]
            if sub == sub[::-1] and len(sub) > len(res):
                res = sub
    print(res)`
    },
    'Sudoku Validator': {
        C: `#include <stdio.h>
int isValidSudoku(int board[9][9]) {
    // Simplified: check only rows and cols sum (checksum method weak but easy code)
    // Better: use hash sets. Here we check unique 1-9 in row/col.
    for(int i=0; i<9; i++) {
        int r[10]={0}, c[10]={0};
        for(int j=0; j<9; j++) {
            if(r[board[i][j]]++) return 0;
            if(c[board[j][i]]++) return 0;
        }
    }
    return 1;
}
int main() {
    int board[9][9];
    for(int i=0; i<9; i++) for(int j=0; j<9; j++) scanf("%d", &board[i][j]);
    if(isValidSudoku(board)) printf("Valid");
    else printf("Invalid");
    return 0;
}`,
        Java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[][] board = new int[9][9];
        for(int i=0; i<9; i++) for(int j=0; j<9; j++) board[i][j] = sc.nextInt();
        boolean valid = true;
        for(int i=0; i<9; i++) {
            boolean[] r = new boolean[10];
            boolean[] c = new boolean[10];
            for(int j=0; j<9; j++) {
                if(r[board[i][j]]) valid = false; r[board[i][j]]=true;
                if(c[board[j][i]]) valid = false; c[board[j][i]]=true;
            }
        }
        System.out.print(valid ? "Valid" : "Invalid");
    }
}`,
        Python: `if __name__ == "__main__":
    import sys
    input = sys.stdin.read
    data = input().split()
    board = []
    idx = 0
    for i in range(9):
        board.append([int(x) for x in data[idx:idx+9]])
        idx += 9
    valid = True
    for i in range(9):
        if len(set(board[i])) != 9: valid = False
        col = [board[j][i] for j in range(9)]
        if len(set(col)) != 9: valid = False
    print("Valid" if valid else "Invalid")`
    },
    'Graph Activity': {
        C: `#include <stdio.h>
int main() {
    int v, e, start;
    int adj[20][20] = {0}, visited[20] = {0}, queue[20], front=0, rear=0;
    scanf("%d %d", &v, &e);
    for(int i=0; i<e; i++) {
        int s, d; scanf("%d %d", &s, &d);
        adj[s][d] = 1; adj[d][s] = 1;
    }
    scanf("%d", &start); // Start BFS
    printf("%d ", start);
    visited[start] = 1;
    queue[rear++] = start;
    while(front < rear) {
        int current = queue[front++];
        for(int i=1; i<=v; i++) {
            if(adj[current][i] && !visited[i]) {
                printf("%d ", i);
                visited[i] = 1;
                queue[rear++] = i;
            }
        }
    }
    return 0;
}`,
        Java: `import java.util.Scanner;
import java.util.LinkedList;
import java.util.Queue;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int v = sc.nextInt();
        int e = sc.nextInt();
        int[][] adj = new int[v+1][v+1];
        for(int i=0; i<e; i++) {
            int s = sc.nextInt();
            int d = sc.nextInt();
            adj[s][d] = 1; adj[d][s] = 1;
        }
        int start = sc.nextInt();
        boolean[] visited = new boolean[v+1];
        Queue<Integer> q = new LinkedList<>();
        visited[start] = true;
        q.add(start);
        System.out.print(start + " ");
        while(!q.isEmpty()) {
            int current = q.poll();
            for(int i=1; i<=v; i++) {
                if(adj[current][i] == 1 && !visited[i]) {
                    System.out.print(i + " ");
                    visited[i] = true;
                    q.add(i);
                }
            }
        }
    }
}`,
        Python: `if __name__ == "__main__":
    import sys
    from collections import deque
    input = sys.stdin.read
    data = input().split()
    if data:
        it = iter(data)
        v, e = int(next(it)), int(next(it))
        adj = {i: [] for i in range(1, v+1)}
        for _ in range(e):
            s, d = int(next(it)), int(next(it))
            adj[s].append(d)
            adj[d].append(s) # Undirected
        start = int(next(it))
        visited = set([start])
        queue = deque([start])
        res = []
        while queue:
            node = queue.popleft()
            res.append(node)
            for neighbor in sorted(adj[node]):
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        print(*(res))`
    }
};

function getTemplate(name, language) {
    if (TEMPLATES[name] && TEMPLATES[name][language]) {
        return { code: TEMPLATES[name][language], description: TEMPLATES[name].description || '' };
    }
    return null;
}
module.exports = { getTemplate };
