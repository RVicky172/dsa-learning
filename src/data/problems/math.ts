import type { Problem } from '../../types/topic';

export const mathProblems: Problem[] = [
  {
    id: 'math-single-number',
    title: 'Single Number',
    difficulty: 'Easy',
    description: 'Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.',
    examples: [{ input: 'nums = [4,1,2,1,2]', output: '4' }],
    solution: {
      approach: 'Use XOR bitwise operator. a XOR a = 0.',
      code: `function singleNumber(nums: number[]): number {
  let res = 0;
  for (const num of nums) {
    res ^= num;
  }
  return res;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: ['Initialize result = 0', 'Iterate through all nums', 'XOR result with current num']
    },
    hints: ['Can you do this with constant extra space?', 'XOR operation has identical property a ^ a = 0']
  },
  {
    id: 'happy-number',
    title: 'Happy Number',
    difficulty: 'Easy',
    description: 'Write an algorithm to determine if a number n is happy. A happy number is a number defined by the following process: Starting with any positive integer, replace the number by the sum of the squares of its digits, and repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.',
    examples: [
      {
        input: 'n = 19',
        output: 'true',
        explanation: '1² + 9² = 1 + 81 = 82, 8² + 2² = 64 + 4 = 68, 6² + 8² = 36 + 64 = 100, 1² + 0² + 0² = 1 + 0 + 0 = 1'
      }
    ],
    solution: {
      approach: 'Use a set to detect cycles in the sum of squares process',
      code: `function isHappy(n: number): boolean {
  const seen = new Set<number>();

  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    n = getSumOfSquares(n);
  }

  return n === 1;
}

function getSumOfSquares(num: number): number {
  let sum = 0;
  while (num > 0) {
    const digit = num % 10;
    sum += digit * digit;
    num = Math.floor(num / 10);
  }
  return sum;
}`,
      timeComplexity: 'O(log n) for each iteration, but few iterations',
      spaceComplexity: 'O(1) since cycle is small',
      stepByStep: [
        'Use a set to track seen numbers',
        'While not 1 and not seen, add to set and compute sum of squares',
        'Extract digits and square them',
        'Return true if reaches 1'
      ]
    },
    hints: [
      'Use a set to detect cycles',
      'The cycle will eventually be detected',
      'Only 1 leads to happiness'
    ]
  },
  // ── NEW BATCH (TKT-016) ──────────────────────────────────────────
  {
    id: 'math-reverse-integer',
    title: 'Reverse Integer',
    difficulty: 'Easy',
    description: 'Given a signed 32-bit integer x, return x with its digits reversed. If the reversed integer overflows (outside [-2^31, 2^31-1]), return 0.',
    examples: [
      { input: 'x = 123', output: '321' },
      { input: 'x = -123', output: '-321' },
      { input: 'x = 120', output: '21' }
    ],
    solution: {
      approach: 'Extract digits via mod 10; build reversed number; check bounds before returning.',
      code: `function reverse(x: number): number {
  const MAX = 2 ** 31 - 1;
  const MIN = -(2 ** 31);
  let rev = 0;
  while (x !== 0) {
    const digit = x % 10; // handles negative correctly in JS
    x = Math.trunc(x / 10);
    rev = rev * 10 + digit;
    if (rev > MAX || rev < MIN) return 0;
  }
  return rev;
}`,
      timeComplexity: 'O(log x)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Extract last digit with x % 10',
        'Append to rev: rev = rev*10 + digit',
        'Truncate x toward zero with Math.trunc(x/10)',
        'Check overflow after each step; return 0 if exceeded'
      ]
    },
    hints: ['Check overflow after each digit append, not just at the end.', 'Math.trunc is needed in JS to truncate toward zero for negatives.']
  },
  {
    id: 'math-palindrome-number',
    title: 'Palindrome Number',
    difficulty: 'Easy',
    description: 'Given an integer x, return true if x is a palindrome. An integer is a palindrome when it reads the same backward as forward.',
    examples: [
      { input: 'x = 121', output: 'true' },
      { input: 'x = -121', output: 'false' },
      { input: 'x = 10', output: 'false' }
    ],
    solution: {
      approach: 'Reverse only the second half of the number and compare with the first half. No string conversion needed.',
      code: `function isPalindrome(x: number): boolean {
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;
  let rev = 0;
  while (x > rev) {
    rev = rev * 10 + (x % 10);
    x = Math.floor(x / 10);
  }
  return x === rev || x === Math.floor(rev / 10);
}`,
      timeComplexity: 'O(log x)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Negative numbers and numbers ending in 0 (except 0) are not palindromes',
        'Reverse digits until rev >= x (reached the midpoint)',
        'For even length: x === rev; for odd length: x === Math.floor(rev/10)',
        'No string conversion required'
      ]
    },
    hints: ['Reverse only half the number to avoid overflow concerns.', 'Odd-length palindromes: the middle digit can be discarded.']
  },
  {
    id: 'math-power-x-n',
    title: 'Pow(x, n)',
    difficulty: 'Medium',
    description: 'Implement pow(x, n) which calculates x raised to the power n (i.e., x^n). n can be negative.',
    examples: [
      { input: 'x = 2.00000, n = 10', output: '1024.00000' },
      { input: 'x = 2.10000, n = 3', output: '9.26100' },
      { input: 'x = 2.00000, n = -2', output: '0.25000' }
    ],
    solution: {
      approach: 'Fast exponentiation (exponentiation by squaring): recursively halve n.',
      code: `function myPow(x: number, n: number): number {
  if (n < 0) { x = 1 / x; n = -n; }
  function fastPow(base: number, exp: number): number {
    if (exp === 0) return 1;
    if (exp % 2 === 0) {
      const half = fastPow(base, exp / 2);
      return half * half;
    }
    return base * fastPow(base, exp - 1);
  }
  return fastPow(x, n);
}`,
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(log n) recursion stack',
      stepByStep: [
        'Handle negative n by inverting x and negating n',
        'Base case: exp = 0 → return 1',
        'Even exp: square the result of exp/2',
        'Odd exp: multiply by one extra x'
      ]
    },
    hints: ['Avoid recalculating fastPow(base, exp/2) twice — store in a variable.', 'Iterative version avoids stack overhead.']
  },
  {
    id: 'math-count-primes',
    title: 'Count Primes',
    difficulty: 'Medium',
    description: 'Given an integer n, return the number of prime numbers strictly less than n.',
    examples: [
      { input: 'n = 10', output: '4', explanation: '2, 3, 5, 7 are primes less than 10.' },
      { input: 'n = 0', output: '0' }
    ],
    solution: {
      approach: 'Sieve of Eratosthenes: mark multiples of each prime as composite.',
      code: `function countPrimes(n: number): number {
  if (n < 2) return 0;
  const isComposite = new Uint8Array(n);
  let count = 0;
  for (let i = 2; i < n; i++) {
    if (!isComposite[i]) {
      count++;
      for (let j = i * i; j < n; j += i) {
        isComposite[j] = 1;
      }
    }
  }
  return count;
}`,
      timeComplexity: 'O(n log log n)',
      spaceComplexity: 'O(n)',
      stepByStep: [
        'Allocate a boolean array of size n',
        'For each unmarked number i starting at 2, mark multiples i², i²+i, … as composite',
        'Start at i² because smaller multiples were already marked by earlier primes',
        'Count all unmarked indices'
      ]
    },
    hints: ['Start marking from i² — all smaller multiples are already covered.', 'Uint8Array is faster than a boolean array in JS engines.']
  },
  {
    id: 'math-excel-column-number',
    title: 'Excel Sheet Column Number',
    difficulty: 'Medium',
    description: 'Given a string columnTitle as it appears in an Excel sheet, return its corresponding column number. A→1, B→2, …, Z→26, AA→27.',
    examples: [
      { input: 'columnTitle = "A"', output: '1' },
      { input: 'columnTitle = "AB"', output: '28' },
      { input: 'columnTitle = "ZY"', output: '701' }
    ],
    solution: {
      approach: 'Process left to right treating it as base-26 numeral (1-indexed).',
      code: `function titleToNumber(columnTitle: string): number {
  let result = 0;
  for (const ch of columnTitle) {
    result = result * 26 + (ch.charCodeAt(0) - 64);
  }
  return result;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Initialize result = 0',
        'For each character: result = result * 26 + (charCode - 64)',
        'charCode("A") - 64 = 1, "B" - 64 = 2, …',
        'Same as converting a base-26 string to decimal'
      ]
    },
    hints: ['This is a base-26 to base-10 conversion.', '"A" maps to 1 not 0 — it\'s 1-indexed.']
  },
  {
    id: 'math-max-points-on-line',
    title: 'Max Points on a Line',
    difficulty: 'Hard',
    description: 'Given an array of points, return the maximum number of points that lie on the same straight line.',
    examples: [
      { input: 'points = [[1,1],[2,2],[3,3]]', output: '3' },
      { input: 'points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]', output: '4' }
    ],
    solution: {
      approach: 'For each point, compute slope to all other points using (dy/gcd, dx/gcd) as a reduced fraction key. Track max count.',
      code: `function maxPoints(points: number[][]): number {
  function gcd(a: number, b: number): number {
    return b === 0 ? Math.abs(a) : gcd(b, a % b);
  }
  let result = 1;
  for (let i = 0; i < points.length; i++) {
    const slopeMap = new Map<string, number>();
    for (let j = i + 1; j < points.length; j++) {
      let dy = points[j][1] - points[i][1];
      let dx = points[j][0] - points[i][0];
      const g = gcd(Math.abs(dy), Math.abs(dx));
      if (g !== 0) { dy /= g; dx /= g; }
      if (dx < 0) { dy = -dy; dx = -dx; }
      if (dx === 0) dy = 1; // vertical
      const key = \`\${dy}/\${dx}\`;
      slopeMap.set(key, (slopeMap.get(key) ?? 1) + 1);
      result = Math.max(result, slopeMap.get(key)!);
    }
  }
  return result;
}`,
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(n)',
      stepByStep: [
        'For each anchor point i, compute slopes to all j > i',
        'Normalise slope as reduced fraction (dy/g, dx/g)',
        'Canonicalise sign so positive dx (or dx=0, dy=1 for vertical)',
        'Max slope count + 1 (for anchor) gives points on that line'
      ]
    },
    hints: ['Use GCD to reduce slope fractions to avoid floating-point errors.', 'Canonicalise the sign of the fraction to avoid duplicate keys.']
  }
];

