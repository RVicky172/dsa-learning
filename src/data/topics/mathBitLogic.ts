import type { Topic } from '../../types/topic';
import { mathProblems } from '../advancedProblems';
import React from 'react';
import { Calculator } from 'lucide-react';

export const mathTopic: Topic = {
  id: 'math-bit-logic',
  title: 'Math & Bit Logic',
  description: 'Mathematical operations and bitwise manipulations.',
  complexity: 'O(1) Bitwise',
  icon: React.createElement(Calculator, { size: 24 }),
  delay: 0.9,

  introduction: `Understanding numbers and bit operations enables efficient solutions to many problems. Bitwise operations are extremely fast at the CPU level and enable clever optimizations that reduce time and space complexity.

At the hardware level, all data is stored and processed as binary. Bitwise operations (AND, OR, XOR, NOT, shifts) operate directly on individual bits, making them the fastest possible operations — typically completing in a single CPU clock cycle.

## Why Bit Manipulation Matters
Many interview problems have elegant bit manipulation solutions that are O(1) space and O(n) or even O(1) time. Understanding binary representations helps you think about data at a fundamental level and unlocks optimizations that aren't obvious with higher-level thinking.

## Number Theory in Algorithms
Mathematical properties like the GCD, modular arithmetic, prime factorization, and combinatorics appear frequently in competitive programming and algorithm design. Understanding these concepts enables efficient solutions to counting, optimization, and cryptography problems.`,

  whyImportant: 'Bit manipulation appears in interviews and enables elegant solutions that are impossible with standard arithmetic. Understanding number properties is fundamental to cryptography, hashing, computer graphics, and low-level systems programming. Companies like Google and Meta frequently test these skills.',

  whenToUse: [
    'Finding single/missing/duplicate numbers in O(1) space',
    'Power of two checks and flag manipulation',
    'Counting set bits (population count)',
    'Toggling, setting, or clearing specific bits',
    'Efficient multiplication and division by powers of 2',
    'GCD/LCM calculations for optimization',
    'Modular arithmetic for large number computations'
  ],

  advantages: [
    'Bitwise operations are the fastest operations on a CPU',
    'Elegant solutions to complex problems (e.g., single number)',
    'O(1) space solutions for problems that seem to require O(n)',
    'Direct hardware-level operations',
    'Memory efficient representations (bit flags, bitsets)'
  ],

  disadvantages: [
    'Can be hard to understand and debug',
    'Not always the most readable code',
    'Platform-dependent behavior (32-bit vs 64-bit, signed vs unsigned)',
    'Integer overflow risks require careful handling',
    'Limited to problems where binary representation is meaningful'
  ],

  concepts: [
    {
      name: 'Bitwise AND, OR, XOR',
      description: 'AND (&): both bits must be 1. OR (|): at least one bit is 1. XOR (^): exactly one bit is 1. XOR is self-inverse: a ^ b ^ b = a. This property is the key to many elegant solutions.'
    },
    {
      name: 'Left & Right Shift',
      description: 'Left shift (<<) multiplies by 2^n. Right shift (>>) divides by 2^n. Arithmetic right shift preserves the sign bit; logical right shift (>>>) fills with 0.'
    },
    {
      name: 'Two\'s Complement',
      description: 'Representation of negative numbers in binary. -x = ~x + 1 (flip all bits and add 1). This makes hardware addition work for both positive and negative numbers with the same circuit.'
    },
    {
      name: 'Bit Manipulation Tricks',
      description: 'n & (n-1) clears the lowest set bit (used for counting bits and power-of-2 check). n & (-n) isolates the lowest set bit. XOR finds the missing/single number.'
    },
    {
      name: 'GCD & LCM',
      description: 'Euclidean algorithm computes GCD in O(log(min(a,b))). LCM(a,b) = a * b / GCD(a,b). Used in fraction simplification, cycle detection, and scheduling problems.'
    },
    {
      name: 'Modular Arithmetic',
      description: '(a + b) mod m = ((a mod m) + (b mod m)) mod m. Essential for large number computations in DP, combinatorics, and cryptography (RSA, Diffie-Hellman).'
    }
  ],

  examples: [
    {
      title: 'Essential Bit Manipulation Operations',
      language: 'typescript',
      code: `// --- Core bit operations ---

// Check if n is power of 2
function isPowerOfTwo(n: number): boolean {
  return n > 0 && (n & (n - 1)) === 0;
}
// 8 (1000) & 7 (0111) = 0 → true
// 6 (0110) & 5 (0101) = 4 → false

// Count set bits (Kernighan's algorithm)
function countBits(n: number): number {
  let count = 0;
  while (n > 0) {
    n &= (n - 1);  // Clear lowest set bit
    count++;
  }
  return count;
}
// 13 (1101): 1101→1100→1000→0000 = 3 bits

// Get, set, clear specific bit
function getBit(n: number, pos: number): number {
  return (n >> pos) & 1;
}
function setBit(n: number, pos: number): number {
  return n | (1 << pos);
}
function clearBit(n: number, pos: number): number {
  return n & ~(1 << pos);
}
function toggleBit(n: number, pos: number): number {
  return n ^ (1 << pos);
}

console.log(isPowerOfTwo(16));  // true
console.log(countBits(13));     // 3
console.log(getBit(13, 2));     // 1 (bit at pos 2 of 1101)`,
      explanation: 'These are the building blocks of bit manipulation. The key insight is that n & (n-1) clears the lowest set bit — this single trick enables power-of-2 checks and efficient bit counting.',
      timeComplexity: 'O(1) for most operations, O(k) for countBits where k = number of set bits',
      spaceComplexity: 'O(1)'
    },
    {
      title: 'Single Number — XOR Magic',
      language: 'typescript',
      code: `// Find the single element (all others appear twice)
// XOR property: a ^ a = 0, a ^ 0 = a
function singleNumber(nums: number[]): number {
  let result = 0;
  for (const num of nums) {
    result ^= num;
  }
  return result;
}
// [4,1,2,1,2] → 4^1^2^1^2 = 4^(1^1)^(2^2) = 4^0^0 = 4

// Find TWO single numbers (all others appear twice)
function singleNumberIII(nums: number[]): [number, number] {
  // XOR all = a ^ b (diff of the two singles)
  let xor = 0;
  for (const num of nums) xor ^= num;

  // Find rightmost set bit (where a and b differ)
  const diffBit = xor & (-xor);

  let a = 0, b = 0;
  for (const num of nums) {
    if (num & diffBit) {
      a ^= num;  // Group where this bit is set
    } else {
      b ^= num;  // Group where this bit is clear
    }
  }
  return [a, b];
}

console.log(singleNumber([4, 1, 2, 1, 2]));       // 4
console.log(singleNumberIII([1, 2, 1, 3, 2, 5])); // [3, 5]`,
      explanation: 'XOR is the star of bit manipulation. Since a ^ a = 0, XORing all numbers cancels out pairs, leaving the single number. For two singles, we find a differentiating bit and partition into two groups, then XOR each group separately.',
      timeComplexity: 'O(n) — single pass through array',
      spaceComplexity: 'O(1) — just a few variables'
    },
    {
      title: 'GCD, LCM, and Modular Exponentiation',
      language: 'typescript',
      code: `// Euclidean GCD — O(log(min(a,b)))
function gcd(a: number, b: number): number {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

// LCM using GCD
function lcm(a: number, b: number): number {
  return (a / gcd(a, b)) * b;
}

// Fast modular exponentiation — O(log exp)
// Computes (base^exp) % mod without overflow
function modPow(base: number, exp: number, mod: number): number {
  let result = 1;
  base = base % mod;

  while (exp > 0) {
    if (exp % 2 === 1) {
      result = (result * base) % mod;
    }
    exp = Math.floor(exp / 2);
    base = (base * base) % mod;
  }
  return result;
}

// Sieve of Eratosthenes — O(n log log n)
function sieve(n: number): number[] {
  const isPrime = new Array(n + 1).fill(true);
  isPrime[0] = isPrime[1] = false;

  for (let i = 2; i * i <= n; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= n; j += i) {
        isPrime[j] = false;
      }
    }
  }

  return isPrime.reduce((primes, val, idx) => {
    if (val) primes.push(idx);
    return primes;
  }, [] as number[]);
}

console.log(gcd(48, 18));        // 6
console.log(lcm(12, 18));        // 36
console.log(modPow(2, 10, 1000)); // 24 (1024 % 1000)
console.log(sieve(30));          // [2,3,5,7,11,13,17,19,23,29]`,
      explanation: 'The Euclidean algorithm is elegant: gcd(a, b) = gcd(b, a % b). Modular exponentiation uses the binary representation of the exponent to compute large powers efficiently. The Sieve of Eratosthenes finds all primes up to n by eliminating multiples.',
      timeComplexity: 'GCD: O(log min(a,b)), ModPow: O(log exp), Sieve: O(n log log n)',
      spaceComplexity: 'GCD: O(1), Sieve: O(n)'
    }
  ],

  patterns: [
    {
      name: 'XOR for Finding Unique Elements',
      description: 'XOR cancels out duplicate elements (a ^ a = 0). This makes it perfect for finding single/missing numbers without extra space.',
      technique: 'XOR all elements together. Pairs cancel out, leaving the unique element. For two unique elements, use a differentiating bit to partition.',
      example: 'Single number, missing number, two single numbers among pairs',
      whenToUse: [
        'Finding elements that appear odd number of times',
        'Finding missing numbers in a sequence',
        'Swapping values without temp variable (a ^= b; b ^= a; a ^= b)',
        'Detecting differences between arrays'
      ]
    },
    {
      name: 'Bit Masking for Subsets',
      description: 'Represent each subset of n elements as an n-bit number. Bit i is 1 if element i is included. Enumerate all 2^n subsets by iterating from 0 to 2^n - 1.',
      technique: 'For each number 0 to 2^n - 1, check which bits are set to determine which elements are in the subset.',
      example: 'Generate all subsets, travelling salesman DP, set cover problem',
      whenToUse: [
        'Generating all subsets of a set',
        'DP with bitmask state (TSP, assignment)',
        'Permission systems (rwx flags)',
        'Feature flag management'
      ]
    },
    {
      name: 'n & (n-1) Trick',
      description: 'Clears the lowest set bit. Fundamental trick for counting bits, checking powers of 2, and finding bit patterns.',
      technique: 'n & (n-1) removes the rightmost 1-bit. Loop until n becomes 0 to count set bits. If n & (n-1) == 0, n is a power of 2.',
      example: 'Power of 2 check, count set bits, is a number a sum of powers of 2',
      whenToUse: [
        'Checking if number is power of 2',
        'Counting number of 1-bits efficiently',
        'Finding highest/lowest set bit',
        'Iterating over set bits'
      ]
    }
  ],

  problems: [
    ...mathProblems,
    {
      id: 'math-single-number',
      title: 'Single Number',
      difficulty: 'Easy',
      description: 'Given a non-empty array where every element appears twice except one, find that single one. Do it in O(1) space.',
      examples: [
        { input: 'nums = [2, 2, 1]', output: '1' },
        { input: 'nums = [4, 1, 2, 1, 2]', output: '4' }
      ],
      solution: {
        approach: 'XOR all elements. Since a ^ a = 0, duplicates cancel out, leaving the single number.',
        code: `function singleNumber(nums: number[]): number {
  let result = 0;
  for (const num of nums) {
    result ^= num;
  }
  return result;
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        stepByStep: [
          'Initialize result = 0',
          'XOR each element with result',
          'Pairs cancel out: a ^ a = 0',
          'Final result is the single element: 0 ^ single = single'
        ]
      },
      hints: [
        'XOR has the property: a ^ a = 0 and a ^ 0 = a',
        'What happens when you XOR all elements?',
        'No extra data structure needed!'
      ]
    },
    {
      id: 'math-counting-bits',
      title: 'Counting Bits',
      difficulty: 'Easy',
      description: 'Given an integer n, return an array where ans[i] is the number of 1-bits in the binary representation of i, for 0 <= i <= n.',
      examples: [
        {
          input: 'n = 5',
          output: '[0, 1, 1, 2, 1, 2]',
          explanation: '0→0, 1→1, 10→1, 11→2, 100→1, 101→2'
        }
      ],
      solution: {
        approach: 'Use DP: ans[i] = ans[i >> 1] + (i & 1). The number of bits in i equals the bits in i/2 plus whether the last bit is set.',
        code: `function countBits(n: number): number[] {
  const ans = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    ans[i] = ans[i >> 1] + (i & 1);
  }
  return ans;
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n) for the result array',
        stepByStep: [
          'Base case: ans[0] = 0',
          'For each i, right-shift to get i/2 (whose answer we already know)',
          'Add 1 if the last bit of i is set (i & 1)',
          'ans[i] = ans[i >> 1] + (i & 1)'
        ]
      },
      hints: [
        'Think about the relationship between i and i/2 in binary',
        'Right shift removes the last bit',
        'Build on previously computed values (DP)'
      ]
    },
    {
      id: 'math-reverse-bits',
      title: 'Reverse Bits',
      difficulty: 'Medium',
      description: 'Reverse the bits of a given 32-bit unsigned integer.',
      examples: [
        {
          input: 'n = 43261596 (00000010100101000001111010011100)',
          output: '964176192 (00111001011110000010100101000000)',
          explanation: 'Input reversed gives a different 32-bit number'
        }
      ],
      solution: {
        approach: 'Extract each bit from right, place it in the reversed position using shift operations.',
        code: `function reverseBits(n: number): number {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    result = (result << 1) | (n & 1);
    n = n >>> 1;  // Unsigned right shift
  }
  return result >>> 0;  // Convert to unsigned
}`,
        timeComplexity: 'O(1) — always 32 iterations',
        spaceComplexity: 'O(1)',
        stepByStep: [
          'Initialize result = 0',
          'For 32 iterations: shift result left, add lowest bit of n',
          'Right-shift n (unsigned) to process next bit',
          'Use >>> 0 to ensure unsigned interpretation'
        ]
      },
      hints: [
        'Process one bit at a time from right to left',
        'Use left shift to build the reversed number',
        'Use unsigned right shift (>>>) for the input'
      ]
    }
  ],

  operations: [
    { name: 'AND, OR, XOR, NOT', complexity: 'O(1)' },
    { name: 'Left/Right Shift', complexity: 'O(1)' },
    { name: 'Count Set Bits', complexity: 'O(k) k=set bits' },
    { name: 'Power of 2 Check', complexity: 'O(1)' },
    { name: 'GCD (Euclidean)', complexity: 'O(log min(a,b))' },
    { name: 'Modular Exponentiation', complexity: 'O(log exp)' },
    { name: 'Sieve of Eratosthenes', complexity: 'O(n log log n)' }
  ],

  applications: [
    {
      name: 'Cryptography',
      description: 'XOR, modular arithmetic, and prime numbers are the foundation of encryption.',
      example: 'RSA encryption uses modular exponentiation with large primes'
    },
    {
      name: 'Graphics & Game Dev',
      description: 'Bit manipulation is used for color encoding, pixel operations, and collision detection.',
      example: 'RGB colors stored as 0xRRGGBB, extracted with shifts and masks'
    },
    {
      name: 'Networking',
      description: 'IP addressing, subnet masking, and checksum calculations use bitwise operations.',
      example: 'Subnet mask 255.255.255.0 ANDed with IP gives the network address'
    },
    {
      name: 'Permissions & Flags',
      description: 'Unix file permissions and feature flags use bit fields for compact boolean storage.',
      example: 'chmod 755: rwxr-xr-x, where each digit is a 3-bit field (read|write|execute)'
    },
    {
      name: 'Compression',
      description: 'Huffman coding and other compression algorithms work at the bit level.',
      example: 'Variable-length bit codes represent frequent characters with fewer bits'
    }
  ]
};
