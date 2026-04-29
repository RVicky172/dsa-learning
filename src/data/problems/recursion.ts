import type { Problem } from '../../types/topic';

export const recursionProblems: Problem[] = [
  {
    id: 'recur-subsets',
    title: 'Subsets',
    difficulty: 'Medium',
    description: 'Given an integer array nums of unique elements, return all possible subsets (the power set).',
    examples: [{ input: 'nums = [1,2]', output: '[[],[1],[2],[1,2]]' }],
    solution: {
      approach: 'Backtracking to explore including vs not including each element.',
      code: `function subsets(nums: number[]): number[][] {
  const res: number[][] = [];
  function backtrack(start: number, path: number[]) {
    res.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  }
  backtrack(0, []);
  return res;
}`,
      timeComplexity: 'O(2^n)',
      spaceComplexity: 'O(n) for recursion stack',
      stepByStep: ['Init empty result array', 'Create recursive backtrack function', 'Add current path to result', 'Loop remaining elements and recursively call backtrack']
    },
    hints: ['At each step, you either include the item or not']
  },
  {
    id: 'generate-parentheses',
    title: 'Generate Parentheses',
    difficulty: 'Medium',
    description: 'Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.',
    examples: [
      {
        input: 'n = 3',
        output: '["((()))","(()())","(())()","()(())","()()()"]'
      }
    ],
    solution: {
      approach: 'Use backtracking to build valid parentheses combinations',
      code: `function generateParenthesis(n: number): string[] {
  const result: string[] = [];

  function backtrack(current: string, open: number, close: number) {
    if (current.length === 2 * n) {
      result.push(current);
      return;
    }

    if (open < n) {
      backtrack(current + '(', open + 1, close);
    }

    if (close < open) {
      backtrack(current + ')', open, close + 1);
    }
  }

  backtrack('', 0, 0);
  return result;
}`,
      timeComplexity: 'O(4^n / sqrt(n)) - Catalan number',
      spaceComplexity: 'O(n) for recursion stack',
      stepByStep: [
        'Use backtracking with counts of open and close parentheses',
        'Add open parenthesis if count < n',
        'Add close parenthesis if close count < open count',
        'When length reaches 2n, add to result'
      ]
    },
    hints: [
      'Track number of open and close parentheses used',
      'Only add close if more open than close',
      'Backtrack when invalid state reached'
    ]
  },
  // ── NEW BATCH (TKT-016) ──────────────────────────────────────────
  {
    id: 'recur-power-of-two',
    title: 'Power of Two',
    difficulty: 'Easy',
    description: 'Given an integer n, return true if it is a power of two.',
    examples: [
      { input: 'n = 1', output: 'true', explanation: '2^0 = 1.' },
      { input: 'n = 16', output: 'true', explanation: '2^4 = 16.' },
      { input: 'n = 3', output: 'false' }
    ],
    solution: {
      approach: 'Recursive: n is a power of two if n > 0 and isPowerOfTwo(n/2). Bit-trick: n & (n-1) === 0.',
      code: `function isPowerOfTwo(n: number): boolean {
  if (n <= 0) return false;
  if (n === 1) return true;
  if (n % 2 !== 0) return false;
  return isPowerOfTwo(n / 2);
}`,
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(log n) recursion stack',
      stepByStep: [
        'Base case: n <= 0 → false, n = 1 → true',
        'If n is odd and not 1, it cannot be a power of two',
        'Recurse with n / 2',
        'Alternatively use bit trick: n > 0 && (n & (n-1)) === 0'
      ]
    },
    hints: ['Any power of two has exactly one set bit.', 'n & (n-1) clears the lowest set bit.']
  },
  {
    id: 'recur-reverse-string-recur',
    title: 'Reverse String (Recursive)',
    difficulty: 'Easy',
    description: 'Write a function that reverses a string in-place using recursion. The input is given as an array of characters s.',
    examples: [
      { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
      { input: 's = ["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]' }
    ],
    solution: {
      approach: 'Two-pointer recursion: swap the outermost characters then recurse on the inner subarray.',
      code: `function reverseString(s: string[]): void {
  function helper(lo: number, hi: number): void {
    if (lo >= hi) return;
    [s[lo], s[hi]] = [s[hi], s[lo]];
    helper(lo + 1, hi - 1);
  }
  helper(0, s.length - 1);
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n) recursion stack',
      stepByStep: [
        'Base case: lo >= hi, the subarray is empty or a single character',
        'Swap s[lo] and s[hi]',
        'Recurse with lo+1 and hi-1',
        'Mutation is in-place; no return value needed'
      ]
    },
    hints: ['Think two-pointer but recursive.', 'Each call handles one pair of characters.']
  },
  {
    id: 'recur-permutations',
    title: 'Permutations',
    difficulty: 'Medium',
    description: 'Given an array nums of distinct integers, return all possible permutations.',
    examples: [
      { input: 'nums = [1,2,3]', output: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]' },
      { input: 'nums = [0,1]', output: '[[0,1],[1,0]]' }
    ],
    solution: {
      approach: 'Backtracking: at each position, try placing each unused number and recurse.',
      code: `function permute(nums: number[]): number[][] {
  const result: number[][] = [];
  const used = new Array(nums.length).fill(false);
  function bt(current: number[]): void {
    if (current.length === nums.length) {
      result.push([...current]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (!used[i]) {
        used[i] = true;
        current.push(nums[i]);
        bt(current);
        current.pop();
        used[i] = false;
      }
    }
  }
  bt([]);
  return result;
}`,
      timeComplexity: 'O(n! × n)',
      spaceComplexity: 'O(n)',
      stepByStep: [
        'Maintain a used[] boolean array',
        'At each recursive call, iterate all elements',
        'Skip already-used elements',
        'Mark used, push, recurse, pop, unmark (backtrack)'
      ]
    },
    hints: ['Track which indices have been used in the current path.', 'Swap-based in-place permutation is an alternative.']
  },
  {
    id: 'recur-combination-sum',
    title: 'Combination Sum',
    difficulty: 'Medium',
    description: 'Given an array of distinct integers candidates and a target integer target, return all unique combinations of candidates where the chosen numbers sum to target. The same number may be chosen multiple times.',
    examples: [
      { input: 'candidates = [2,3,6,7], target = 7', output: '[[2,2,3],[7]]' },
      { input: 'candidates = [2,3,5], target = 8', output: '[[2,2,2,2],[2,3,3],[3,5]]' }
    ],
    solution: {
      approach: 'Backtracking: at each step decide to include or skip a candidate; allow re-use by not advancing the index.',
      code: `function combinationSum(candidates: number[], target: number): number[][] {
  const result: number[][] = [];
  function bt(start: number, current: number[], remaining: number): void {
    if (remaining === 0) {
      result.push([...current]);
      return;
    }
    for (let i = start; i < candidates.length; i++) {
      if (candidates[i] > remaining) break;
      current.push(candidates[i]);
      bt(i, current, remaining - candidates[i]); // i, not i+1, allows reuse
      current.pop();
    }
  }
  candidates.sort((a, b) => a - b);
  bt(0, [], target);
  return result;
}`,
      timeComplexity: 'O(n^(T/M)) where T = target, M = min candidate',
      spaceComplexity: 'O(T/M)',
      stepByStep: [
        'Sort candidates to enable early pruning',
        'Recurse with the same start index to allow re-use',
        'Prune when candidates[i] > remaining',
        'Add to result when remaining reaches 0'
      ]
    },
    hints: ['Sorting allows early pruning.', 'Pass the same index (not i+1) to allow reusing the same element.']
  },
  {
    id: 'recur-letter-combinations',
    title: 'Letter Combinations of a Phone Number',
    difficulty: 'Medium',
    description: 'Given a string containing digits 2-9, return all possible letter combinations that the number could represent, similar to phone keypad mappings.',
    examples: [
      { input: 'digits = "23"', output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]' },
      { input: 'digits = ""', output: '[]' }
    ],
    solution: {
      approach: 'Backtracking: for each digit, iterate its mapped letters and recurse to the next digit.',
      code: `function letterCombinations(digits: string): string[] {
  if (!digits.length) return [];
  const map: Record<string, string> = {
    '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
    '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
  };
  const result: string[] = [];
  function bt(index: number, current: string): void {
    if (index === digits.length) {
      result.push(current);
      return;
    }
    for (const ch of map[digits[index]]) {
      bt(index + 1, current + ch);
    }
  }
  bt(0, '');
  return result;
}`,
      timeComplexity: 'O(4^n × n)',
      spaceComplexity: 'O(n)',
      stepByStep: [
        'Build a mapping from digit to its letters',
        'Recurse through each digit position',
        'For each letter of the current digit, append and recurse',
        'Add to result when current string length equals digits length'
      ]
    },
    hints: ['Map each digit to its letters upfront.', 'String concatenation is simpler than a char array here.']
  },
  {
    id: 'recur-n-queens',
    title: 'N-Queens',
    difficulty: 'Hard',
    description: 'The n-queens puzzle asks you to place n queens on an n×n chessboard so that no two queens attack each other. Return all distinct solutions.',
    examples: [
      { input: 'n = 4', output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]' },
      { input: 'n = 1', output: '[["Q"]]' }
    ],
    solution: {
      approach: 'Backtracking row by row; use sets for occupied columns and diagonals.',
      code: `function solveNQueens(n: number): string[][] {
  const result: string[][] = [];
  const cols = new Set<number>();
  const diag1 = new Set<number>(); // row - col
  const diag2 = new Set<number>(); // row + col
  const board: string[] = Array(n).fill('');

  function bt(row: number): void {
    if (row === n) {
      result.push([...board]);
      return;
    }
    for (let col = 0; col < n; col++) {
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) continue;
      cols.add(col); diag1.add(row - col); diag2.add(row + col);
      board[row] = '.'.repeat(col) + 'Q' + '.'.repeat(n - col - 1);
      bt(row + 1);
      cols.delete(col); diag1.delete(row - col); diag2.delete(row + col);
    }
  }
  bt(0);
  return result;
}`,
      timeComplexity: 'O(n!)',
      spaceComplexity: 'O(n)',
      stepByStep: [
        'Place one queen per row, checking column and both diagonals',
        'Diagonal check: row-col is constant on /, row+col is constant on \\',
        'Use sets for O(1) conflict detection',
        'Backtrack by removing the queen and clearing sets'
      ]
    },
    hints: ['row-col identifies a "/" diagonal; row+col identifies a "\\" diagonal.', 'Place exactly one queen per row.']
  }
];

