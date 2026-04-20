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
  }
];

