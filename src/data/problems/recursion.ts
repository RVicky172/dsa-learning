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
  }
];

