/**
 * bugInjectionService.js
 * ─────────────────────
 * Takes a correct, working source file and returns a syntactically or
 * semantically mutated "buggy" version based on round difficulty.
 *
 * Round 1: Easy bugs (syntax errors, simple typos)
 * Round 2: Moderate bugs (logic errors, off-by-one, loop breaks)
 * Round 3: Hard bugs (complex logic, precedence, bitwise, multi-bug)
 */

/* ══════════════════════════════════════════════════════════
   HELPER – pick a random element from an array
   ══════════════════════════════════════════════════════════ */
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ══════════════════════════════════════════════════════════
   C  MUTATIONS - EASY (Round 1)
   ══════════════════════════════════════════════════════════ */
const cEasyMutations = [
  {
    name: 'typo: keyword spelling',
    apply(lines) {
      // Critical spelling errors: int->itn, return->reutrn, while->whle
      const swaps = [
        { regex: /\bint\b/, repl: 'itn' },
        { regex: /\breturn\b/, repl: 'reutrn' },
        { regex: /\bwhile\b/, repl: 'whle' },
        { regex: /\bfloat\b/, repl: 'flaot' },
        { regex: /\bdouble\b/, repl: 'doubel' }
      ];
      for (let i = 0; i < lines.length; i++) {
        const swap = swaps[Math.floor(Math.random() * swaps.length)];
        if (swap.regex.test(lines[i]) && !/printf|scanf|"/.test(lines[i])) {
          lines[i] = lines[i].replace(swap.regex, swap.repl);
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'missing semicolon',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (/^\s*(int|float|char|double)\s+\w+\s*=\s*[^;]+;/.test(lines[i])) {
          lines[i] = lines[i].replace(/;$/, '');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'wrong type declaration',
    apply(lines) {
      // int -> float, double -> int
      for (let i = 0; i < lines.length; i++) {
        if (/^\s*int\s+\w+/.test(lines[i])) {
          lines[i] = lines[i].replace('int', 'float');
          return lines;
        }
        if (/^\s*double\s+\w+/.test(lines[i])) {
          lines[i] = lines[i].replace('double', 'int');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'wrong return type',
    apply(lines) {
      // int main -> void main, int solve -> void solve
      for (let i = 0; i < lines.length; i++) {
        if (/^\s*int\s+(\w+)\s*\(/.test(lines[i])) {
          lines[i] = lines[i].replace(/^\s*int/, 'void');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'header typo',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('stdio.h')) {
          lines[i] = lines[i].replace('stdio.h', 'studio.h');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'printf typo',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('printf')) {
          lines[i] = lines[i].replace('printf', 'print');
          return lines;
        }
      }
      return null;
    }
  }
];

/* ══════════════════════════════════════════════════════════
   C  MUTATIONS - MODERATE (Round 2)
   ══════════════════════════════════════════════════════════ */
const cModerateMutations = [
  {
    name: 'off-by-one in for-loop',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (/for\s*\(.*<\s*\w+/.test(lines[i])) {
          lines[i] = lines[i].replace(/(<\s*)(\w+)/, '$1$2 + 1');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'loop break sabotage',
    apply(lines) {
      // Insert a spurious break inside an if condition within a loop
      for (let i = 0; i < lines.length; i++) {
        if (/if\s*\(.*\)\s*{/.test(lines[i]) && /for|while/.test(lines[i - 1] || lines[i - 2] || '')) {
          lines.splice(i + 1, 0, '  break;');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'wrong comparison operator',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (/if\s*\(.*==/.test(lines[i])) {
          lines[i] = lines[i].replace('==', '!=');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'reverse off-by-one',
    apply(lines) {
      // i < n  -->  i <= n
      for (let i = 0; i < lines.length; i++) {
        if (/for\s*\(.*<\s*\w+/.test(lines[i])) {
          lines[i] = lines[i].replace('<', '<=');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'wrong initial value',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (/^\s*(int|float)\s+\w+\s*=\s*0\s*;/.test(lines[i])) {
          lines[i] = lines[i].replace(/=\s*0/, '= 1');
          return lines;
        }
      }
      return null;
    }
  }
];

/* ══════════════════════════════════════════════════════════
   C  MUTATIONS - HARD (Round 3)
   ══════════════════════════════════════════════════════════ */
const cHardMutations = [
  {
    name: 'array index out of bounds',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (/\w+\[i\]/.test(lines[i]) && !/scanf|printf/.test(lines[i]) && /for/.test(lines[i - 1] || '')) {
          lines[i] = lines[i].replace(/(\w+)\[i\]/, '$1[i + 1]');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'bitwise confusion',
    apply(lines) {
      // Change && to & or || to |
      for (let i = 0; i < lines.length; i++) {
        if (/&&/.test(lines[i])) {
          lines[i] = lines[i].replace(/&&/g, '&');
          return lines;
        }
        if (/\|\|/.test(lines[i])) {
          lines[i] = lines[i].replace(/\|\|/g, '|');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'precedence sabotage',
    apply(lines) {
      // Remove parens in math: (a + b) * c --> a + b * c
      for (let i = 0; i < lines.length; i++) {
        if (/\(\w+\s*[+-]\s*\w+\)\s*[\*\/]/.test(lines[i])) {
          lines[i] = lines[i].replace(/\((\w+\s*[+-]\s*\w+)\)/, '$1');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'complex off-by-one with condition',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (/for\s*\(\s*\w+\s*=\s*0\s*;/.test(lines[i])) {
          lines[i] = lines[i].replace(/=\s*0\s*;/, '= 1;');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'logic inversion in nested condition',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (/if\s*\(.*&&/.test(lines[i])) {
          lines[i] = lines[i].replace('&&', '||');
          return lines;
        }
      }
      return null;
    }
  }
];

/* ══════════════════════════════════════════════════════════
   JAVA MUTATIONS - EASY (Round 1)
   ══════════════════════════════════════════════════════════ */
const javaEasyMutations = [
  {
    name: 'missing semicolon',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (/^\s*(int|float|double|String)\s+\w+\s*=\s*[^;]+;/.test(lines[i])) {
          lines[i] = lines[i].replace(/;$/, '');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'swap + and -',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (/[a-zA-Z0-9_]\s*\+\s*[a-zA-Z0-9_]/.test(lines[i]) && !/System\.out/.test(lines[i])) {
          lines[i] = lines[i].replace(/(\w\s*)\+(\s*\w)/, '$1-$2');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'typo in variable name',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        const match = lines[i].match(/^\s*(int|float|double|String)\s+(\w+)\s*=/);
        if (match) {
          const varName = match[2];
          for (let j = i + 1; j < lines.length; j++) {
            if (lines[j].includes(varName) && !lines[j].includes('=')) {
              lines[j] = lines[j].replace(varName, varName + '1');
              return lines;
            }
          }
        }
      }
      return null;
    }
  },
  {
    name: 'wrong bracket type',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (/\w+\[i\]/.test(lines[i]) && !/System\.out/.test(lines[i])) {
          lines[i] = lines[i].replace(/\[i\]/, '(i)');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'System.out typo',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('System.out')) {
          lines[i] = lines[i].replace('System.out', 'Sytem.out');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'main method typo',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('public static void main')) {
          lines[i] = lines[i].replace('main', 'mian');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'string literal unclosed',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        // Find a line with a string literal that ends with ";
        if (/".*";/.test(lines[i])) {
          // Remove the last quote
          lines[i] = lines[i].replace(/";/, ';');
          return lines;
        }
      }
      return null;
    }
  }
];

/* ══════════════════════════════════════════════════════════
   JAVA MUTATIONS - MODERATE (Round 2)
   ══════════════════════════════════════════════════════════ */
const javaModerateMutations = [
  {
    name: 'off-by-one in for-loop',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (/for\s*\(.*<\s*\w+/.test(lines[i])) {
          lines[i] = lines[i].replace(/(<\s*)(\w+)/, '$1$2 + 1');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'loop break sabotage',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (/if\s*\(.*\)\s*{/.test(lines[i]) && /for|while/.test(lines[i - 1] || lines[i - 2] || '')) {
          lines.splice(i + 1, 0, '  break;');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'reverse off-by-one',
    apply(lines) {
      // i < n  -->  i <= n
      for (let i = 0; i < lines.length; i++) {
        if (/for\s*\(.*<\s*\w+/.test(lines[i])) {
          lines[i] = lines[i].replace('<', '<=');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'wrong comparisons',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (/if\s*\(.*==/.test(lines[i])) {
          lines[i] = lines[i].replace('==', '!=');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'wrong array length',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (/\.length/.test(lines[i]) && /for/.test(lines[i])) {
          lines[i] = lines[i].replace('.length', '.length - 1');
          return lines;
        }
      }
      return null;
    }
  }
];

/* ══════════════════════════════════════════════════════════
   JAVA MUTATIONS - HARD (Round 3)
   ══════════════════════════════════════════════════════════ */
const javaHardMutations = [
  {
    name: 'array index out of bounds',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (/\w+\[i\]/.test(lines[i]) && !/System\.out/.test(lines[i]) && /for/.test(lines[i - 1] || '')) {
          lines[i] = lines[i].replace(/(\w+)\[i\]/, '$1[i + 1]');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'string equals vs ==',
    apply(lines) {
      // .equals(str) --> == str
      for (let i = 0; i < lines.length; i++) {
        if (/\.equals\(/.test(lines[i])) {
          lines[i] = lines[i].replace(/\.equals\(([^)]+)\)/, ' == $1');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'bitwise confusion',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (/&&/.test(lines[i])) {
          lines[i] = lines[i].replace(/&&/g, '&');
          return lines;
        }
        if (/\|\|/.test(lines[i])) {
          lines[i] = lines[i].replace(/\|\|/g, '|');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'precedence sabotage',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (/\(\w+\s*[+-]\s*\w+\)\s*[\*\/]/.test(lines[i])) {
          lines[i] = lines[i].replace(/\((\w+\s*[+-]\s*\w+)\)/, '$1');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'complex off-by-one with condition',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (/for\s*\(\s*\w+\s*=\s*0\s*;/.test(lines[i])) {
          lines[i] = lines[i].replace(/=\s*0\s*;/, '= 1;');
          return lines;
        }
      }
      return null;
    }
  }
];

/* ══════════════════════════════════════════════════════════
   PYTHON MUTATIONS - EASY (Round 1)
   ══════════════════════════════════════════════════════════ */
const pythonEasyMutations = [
  {
    name: 'typo: keyword spelling',
    apply(lines) {
      const swaps = [
        { regex: /\bdef\b/, repl: 'dfe' },
        { regex: /\breturn\b/, repl: 'reutrn' },
        { regex: /\bprint\b/, repl: 'prnt' },
        { regex: /\bif\b/, repl: 'fi' },
        { regex: /\belse\b/, repl: 'esle' },
        { regex: /\bwhile\b/, repl: 'whle' },
        { regex: /\bfor\b/, repl: 'fOr' } // Case error
      ];
      for (let i = 0; i < lines.length; i++) {
        const swap = swaps[Math.floor(Math.random() * swaps.length)];
        if (swap.regex.test(lines[i]) && !lines[i].includes('"')) {
          lines[i] = lines[i].replace(swap.regex, swap.repl);
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'indentation sabotage',
    apply(lines) {
      for (let i = 1; i < lines.length; i++) {
        // Remove one space from indented line
        if (/^\s{4,}/.test(lines[i])) {
          lines[i] = lines[i].replace(' ', '');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'invalid syntax',
    apply(lines) {
      // Remove colon
      for (let i = 0; i < lines.length; i++) {
        if (/(if |for |while |def )\w+.*:$/.test(lines[i])) {
          lines[i] = lines[i].replace(/:$/, '');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'wrong range arguments',
    apply(lines) {
      // range(n) -> range(n, n) which is empty
      for (let i = 0; i < lines.length; i++) {
        if (/range\(\w+\)/.test(lines[i])) {
          lines[i] = lines[i].replace(/range\((\w+)\)/, 'range($1, $1)');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'import typo',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (/^import\s+/.test(lines[i])) {
          lines[i] = lines[i].replace('import', 'imprt');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'function call typo',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (/len\(/.test(lines[i])) {
          lines[i] = lines[i].replace('len(', 'length(');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'boolean case error',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('True')) {
          lines[i] = lines[i].replace('True', 'true');
          return lines;
        }
        if (lines[i].includes('False')) {
          lines[i] = lines[i].replace('False', 'false');
          return lines;
        }
      }
      return null;
    }
  }
];

/* ══════════════════════════════════════════════════════════
   PYTHON MUTATIONS - MODERATE (Round 2)
   ══════════════════════════════════════════════════════════ */
const pythonModerateMutations = [
  {
    name: 'off-by-one in range',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        const m = lines[i].match(/range\((\w+)\)/);
        if (m) {
          lines[i] = lines[i].replace(`range(${m[1]})`, `range(${m[1]} + 1)`);
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'wrong comparison operator',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (/if\s+.*==/.test(lines[i])) {
          lines[i] = lines[i].replace('==', '!=');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'wrong initial value',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (/\w+\s*=\s*0\s*$/.test(lines[i].trim())) {
          lines[i] = lines[i].replace(/=\s*0/, '= 1');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'loop break sabotage',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        // Find if inside a loop (heuristic: indented 8 spaces, usually means 2 levels deep)
        if (/^\s{8}if\s+/.test(lines[i])) {
          lines.splice(i + 1, 0, '        break');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'wrong list method',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (/\.append\(/.test(lines[i])) {
          lines[i] = lines[i].replace('.append(', '.extend(');
          return lines;
        }
      }
      return null;
    }
  }
];

/* ══════════════════════════════════════════════════════════
   PYTHON MUTATIONS - HARD (Round 3)
   ══════════════════════════════════════════════════════════ */
const pythonHardMutations = [
  {
    name: 'list index out of bounds',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (/\w+\[i\]/.test(lines[i]) && !/print/.test(lines[i]) && /for/.test(lines[i - 1] || '')) {
          lines[i] = lines[i].replace(/(\w+)\[i\]/, '$1[i + 1]');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'precedence sabotage',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (/\(\w+\s*[+-]\s*\w+\)\s*[\*\/]/.test(lines[i])) {
          lines[i] = lines[i].replace(/\((\w+\s*[+-]\s*\w+)\)/, '$1');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'complex off-by-one with range',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (/range\(0,/.test(lines[i])) {
          lines[i] = lines[i].replace('range(0,', 'range(1,');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'logic inversion in nested condition',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (/if\s+.*and/.test(lines[i])) {
          lines[i] = lines[i].replace(' and ', ' or ');
          return lines;
        }
      }
      return null;
    }
  }
];

/* ══════════════════════════════════════════════════════════
   C  MUTATIONS - CRITICAL (Round 3+)
   ══════════════════════════════════════════════════════════ */
const cCriticalMutations = [
  {
    name: 'scanf missing &',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (/scanf\s*\(\s*".*",\s*&?\w+\s*\)/.test(lines[i])) {
          lines[i] = lines[i].replace(/&(\w+)/, '$1'); // Remove &
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'assignment in if condition',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (/if\s*\(.*==/.test(lines[i])) {
          lines[i] = lines[i].replace('==', '=');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'integer division truncation',
    apply(lines) {
      // (float)a/b -> a/b
      for (let i = 0; i < lines.length; i++) {
        if (/\(float\)\s*\w+/.test(lines[i])) {
          lines[i] = lines[i].replace('(float)', ''); // Remove cast
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'pointer dereference error',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (/\*\w+\s*=\s*\w+/.test(lines[i])) {
          // *ptr = val -> ptr = val (type mismatch warning, logic error)
          lines[i] = lines[i].replace('*', '');
          return lines;
        }
      }
      return null;
    }
  }
];

// ... (Existing Java/Python Easy/Moderate logic remains, adding Hard below)

const javaCriticalMutations = [
  {
    name: 'integer division',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (/\(double\)\s*\w+/.test(lines[i])) {
          lines[i] = lines[i].replace('(double)', '');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'string reference comparison',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (/\.equals\(/.test(lines[i])) {
          lines[i] = lines[i].replace(/\.equals\(([^)]+)\)/, ' == $1');
          return lines;
        }
      }
      return null;
    }
  }
];

const pythonCriticalMutations = [
  {
    name: 'and/or confusion',
    apply(lines) {
      for (let i = 0; i < lines.length; i++) {
        if (/\band\b/.test(lines[i])) {
          lines[i] = lines[i].replace(/\band\b/, 'or');
          return lines;
        }
      }
      return null;
    }
  },
  {
    name: 'shadowing built-in',
    apply(lines) {
      // sum = 0 ...
      for (let i = 0; i < lines.length; i++) {
        if (/^\s*\w+\s*=/.test(lines[i]) && !/^sum/.test(lines[i])) {
          // Replace a variable name with 'list' or 'str' to cause havoc later?
          // Safer: unexpected return None
        }
        if (/return\s+\w+/.test(lines[i])) {
          lines[i] = lines[i].replace(/return\s+\w+/, 'return'); // returns None
          return lines;
        }
      }
      return null;
    }
  }
];


/* ══════════════════════════════════════════════════════════
   MAIN EXPORT
   ══════════════════════════════════════════════════════════ */
const DIFFICULTY_MAP = {
  C: {
    1: cEasyMutations,
    2: cModerateMutations,
    3: [...cHardMutations, ...cCriticalMutations]
  },
  Java: {
    1: javaEasyMutations,
    2: javaModerateMutations,
    3: [...javaHardMutations, ...javaCriticalMutations]
  },
  Python: {
    1: pythonEasyMutations,
    2: pythonModerateMutations,
    3: [...pythonHardMutations, ...pythonCriticalMutations]
  }
};

/**
 * injectBug(correctCode, language, round)
 * Enhanced: Only logic bugs for R3.
 */
function injectBug(correctCode, language, round = 2) {
  // ── 1. Determine Target Bugs ──
  let targetBugs = 6;
  if (round === 2) targetBugs = 8;
  if (round >= 3) targetBugs = 10;

  // ── 2. Build Cumulative Pool ──
  // Round 1: Easy only
  // Round 2: Moderate (80%) + Easy (20%)
  // Round 3: Hard/Critical (100%) - NO EASY BUGS

  const r1 = DIFFICULTY_MAP[language]?.[1] || [];
  const r2 = DIFFICULTY_MAP[language]?.[2] || [];
  const r3 = DIFFICULTY_MAP[language]?.[3] || [];

  let pool = [];
  if (round === 1) {
    pool = [...r1];
  } else if (round === 2) {
    pool = [...r2, ...r2, ...r2, ...r1]; // Weight Moderate higher
  } else {
    // Round 3: Exclude Round 1 entirely. Mix Hard and Moderate.
    pool = [...r3, ...r3, ...r2];
  }

  if (pool.length === 0) {
    console.warn(`No mutations found for ${language}, returning original.`);
    return correctCode;
  }

  // Shuffle mutations
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Helper to apply first successful mutation
  function applyOne(lines, mutationList, avoidNames = []) {
    for (const mutation of mutationList) {
      if (avoidNames.includes(mutation.name)) continue;

      const result = mutation.apply([...lines]);
      if (result !== null) {
        return { modifiedLines: result, applied: mutation.name };
      }
    }
    return null;
  }

  let lines = correctCode.split('\n');
  let appliedBugs = [];

  for (let k = 0; k < targetBugs; k++) {
    const res = applyOne(lines, shuffled, appliedBugs);
    if (res) {
      lines = res.modifiedLines;
      appliedBugs.push(res.applied);
    } // Removed fallback to avoid cluttering if no structured bug found
  }

  console.log(`Injecting Bugs (${language} R${round} - Target ${targetBugs}): ${appliedBugs.join(', ')}`);
  return lines.join('\n');
}

module.exports = { injectBug };
