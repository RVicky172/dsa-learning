import type { Topic } from '../../types/topic';
import { recursionProblems } from '../problems/recursion';
import React from 'react';
import { GitBranch } from 'lucide-react';

export const recursionBacktrackingTopic: Topic = {
  id: 'recursion-backtracking',
  title: 'Recursion & Backtracking',
  description: 'Recursive problem-solving and systematic exploration of solution spaces.',
  complexity: 'O(2ⁿ) / O(n!)',
  icon: React.createElement(GitBranch, { size: 24 }),
  delay: 0.6,

  introduction: `Recursion is a problem-solving technique where a function calls itself with smaller inputs. Backtracking extends recursion by exploring all possible solutions and "backtracking" (undoing choices) when a path doesn't lead to a valid solution.

Think of recursion as defining a problem in terms of smaller versions of itself. Every recursive solution has two parts: a base case (the smallest, directly solvable version) and a recursive case (breaking the problem into smaller parts).

## The Recursion Tree
Every recursive call creates a tree of subproblems. Understanding this tree helps you analyze time/space complexity and identify optimization opportunities (memoization = pruning repeated subtrees).

## Backtracking Framework
Backtracking systematically tries all possibilities: Make a choice → Recurse → Undo choice (backtrack). It's like exploring a maze: go forward, and if you hit a dead end, go back and try another path.`,

  whyImportant: 'Recursion is the foundation of divide-and-conquer, tree/graph traversal, dynamic programming, and many other techniques. Backtracking solves constraint satisfaction problems that have no polynomial-time algorithm. Interview problems frequently require recursive thinking.',

  whenToUse: [
    'Problems that can be defined in terms of smaller subproblems',
    'Tree and graph traversals (DFS)',
    'Generating all permutations, combinations, or subsets',
    'Constraint satisfaction problems (N-Queens, Sudoku)',
    'Divide and conquer algorithms',
    'When you need to explore all possible solutions'
  ],

  advantages: [
    'Elegant, concise solutions for complex problems',
    'Natural fit for tree-structured data',
    'Systematic exploration of solution spaces',
    'Can be combined with memoization for optimization',
    'Handles variable-depth problems naturally'
  ],

  disadvantages: [
    'Stack overflow risk for deep recursion',
    'Often exponential time complexity',
    'Can be harder to debug than iterative solutions',
    'Function call overhead',
    'May explore unnecessary branches without pruning'
  ],

  concepts: [
    {
      name: 'Base Case & Recursive Case',
      description: 'Every recursion needs a base case (stopping condition) and a recursive case (the self-call with smaller input). Missing the base case causes infinite recursion and stack overflow.'
    },
    {
      name: 'Call Stack',
      description: 'Each recursive call adds a frame to the call stack. The stack depth equals the deepest recursion level. Most systems have a stack limit (~10,000 frames). Tail recursion can sometimes be optimized by compilers.'
    },
    {
      name: 'Backtracking Template',
      description: 'The pattern: choose → explore → unchoose. Make a decision, recursively explore, then undo the decision before trying the next option. This systematically explores all valid paths.'
    },
    {
      name: 'Pruning',
      description: 'Cutting off branches early when you can determine they won\'t lead to valid solutions. Dramatically reduces the search space in many backtracking problems.'
    },
    {
      name: 'Memoization',
      description: 'Caching results of recursive calls to avoid recomputation. Transforms exponential recursion into polynomial DP. Example: recursive Fibonacci O(2ⁿ) → O(n) with memo.'
    }
  ],

  examples: [
    {
      title: 'Generate All Subsets (Power Set)',
      language: 'typescript',
      code: `// Generate all subsets of an array
function subsets(nums: number[]): number[][] {
  const result: number[][] = [];

  function backtrack(start: number, current: number[]) {
    result.push([...current]); // Add current subset

    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);        // Choose
      backtrack(i + 1, current);    // Explore
      current.pop();                 // Un-choose (backtrack)
    }
  }

  backtrack(0, []);
  return result;
}

console.log(subsets([1, 2, 3]));
// [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]`,
      explanation: 'At each position, we choose to include or exclude each remaining element. The backtracking template (choose → explore → un-choose) ensures we explore all 2^n subsets. This is the foundation for many backtracking problems.',
      timeComplexity: 'O(n × 2ⁿ) — 2ⁿ subsets, each taking O(n) to copy',
      spaceComplexity: 'O(n) recursion depth + O(n × 2ⁿ) for results'
    },
    {
      title: 'Permutations',
      language: 'typescript',
      code: `// Generate all permutations
function permute(nums: number[]): number[][] {
  const result: number[][] = [];

  function backtrack(current: number[], remaining: number[]) {
    if (remaining.length === 0) {
      result.push([...current]);
      return;
    }

    for (let i = 0; i < remaining.length; i++) {
      current.push(remaining[i]);         // Choose
      const next = [...remaining.slice(0, i), ...remaining.slice(i + 1)];
      backtrack(current, next);           // Explore without chosen element
      current.pop();                       // Un-choose
    }
  }

  backtrack([], nums);
  return result;
}

console.log(permute([1, 2, 3]));
// [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]`,
      explanation: 'Permutations explore all orderings. At each level we pick one element from the remaining, recurse with the rest, then backtrack. There are n! permutations because we have n choices, then n-1, then n-2, etc.',
      timeComplexity: 'O(n × n!) — n! permutations, each O(n) to copy',
      spaceComplexity: 'O(n) recursion depth'
    },
    {
      title: 'N-Queens Problem',
      language: 'typescript',
      code: `// Place N queens on NxN board so none attack each other
function solveNQueens(n: number): string[][] {
  const result: string[][] = [];
  const board: string[][] = Array.from(
    { length: n }, () => new Array(n).fill('.')
  );

  function isValid(row: number, col: number): boolean {
    // Check column
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') return false;
    }
    // Check upper-left diagonal
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 'Q') return false;
    }
    // Check upper-right diagonal
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === 'Q') return false;
    }
    return true;
  }

  function backtrack(row: number) {
    if (row === n) {
      result.push(board.map(r => r.join('')));
      return;
    }
    for (let col = 0; col < n; col++) {
      if (isValid(row, col)) {
        board[row][col] = 'Q';       // Place queen
        backtrack(row + 1);          // Try next row
        board[row][col] = '.';       // Remove queen (backtrack)
      }
    }
  }

  backtrack(0);
  return result;
}

console.log(solveNQueens(4).length); // 2 solutions`,
      explanation: 'N-Queens is the classic backtracking problem. We place one queen per row, trying each column. If placing is valid (no conflicts), we recurse to the next row. If a row has no valid columns, we backtrack. Pruning via the isValid check dramatically reduces the search space.',
      timeComplexity: 'O(n!) — at most n choices per row, decreasing',
      spaceComplexity: 'O(n²) for the board'
    }
  ],

  patterns: [
    {
      name: 'Choose-Explore-Unchoose',
      description: 'The core backtracking template. Make a decision, recursively explore its consequences, then undo the decision to try alternatives.',
      technique: '1) Add element to current state. 2) Recurse with updated state. 3) Remove element from state. This ensures clean exploration of the entire solution space.',
      example: 'Subsets, permutations, combinations, all paths in a graph',
      whenToUse: [
        'Generating all possible solutions',
        'When choices at each step are independent',
        'When you need to undo decisions (backtrack)',
        'Constraint satisfaction problems'
      ]
    },
    {
      name: 'Pruning for Optimization',
      description: 'Skip branches of the recursion tree that cannot lead to valid solutions. Reduces exponential time dramatically.',
      technique: 'Before recursing, check if the current state can possibly lead to a valid/optimal solution. If not, return early (prune).',
      example: 'N-Queens (skip invalid placements), Sudoku (skip invalid digits), word search (visited check)',
      whenToUse: [
        'When many branches are invalid',
        'When you can detect invalidity early',
        'When the full search space is too large',
        'Optimization problems with bounds'
      ]
    },
    {
      name: 'Divide and Conquer',
      description: 'Split the problem into independent subproblems, solve recursively, and combine results. Different from backtracking because subproblems don\'t overlap.',
      technique: 'Split at midpoint or natural boundary, solve each half recursively, merge results.',
      example: 'Merge sort, quick sort, binary search, maximum subarray',
      whenToUse: [
        'When subproblems are independent',
        'Sorting and searching algorithms',
        'When combining solutions is straightforward',
        'Tree-structured problems'
      ]
    }
  ],

  problems: [
    ...recursionProblems,
    {
      id: 'rb-combination-sum',
      title: 'Combination Sum',
      difficulty: 'Medium',
      description: 'Find all unique combinations of candidates that sum to a target. Each number can be used unlimited times.',
      examples: [
        { input: 'candidates = [2,3,6,7], target = 7', output: '[[2,2,3],[7]]' }
      ],
      solution: {
        approach: 'Backtracking with start index. At each step, try adding each candidate (from start index onward) and recurse with reduced target.',
        code: `function combinationSum(candidates: number[], target: number): number[][] {
  const result: number[][] = [];

  function backtrack(start: number, current: number[], remaining: number) {
    if (remaining === 0) { result.push([...current]); return; }
    if (remaining < 0) return;

    for (let i = start; i < candidates.length; i++) {
      current.push(candidates[i]);
      backtrack(i, current, remaining - candidates[i]); // i, not i+1 (reuse)
      current.pop();
    }
  }

  backtrack(0, [], target);
  return result;
}`,
        timeComplexity: 'O(n^(T/M)) where T=target, M=min candidate',
        spaceComplexity: 'O(T/M) recursion depth',
        stepByStep: [
          'Start with empty combination and full target',
          'Try each candidate from start index',
          'Recurse with reduced target (same start index for reuse)',
          'If target reaches 0, add combination to results',
          'If target goes negative, prune the branch'
        ]
      },
      hints: [
        'Use start index to avoid duplicate combinations',
        'Pass i (not i+1) to allow reuse of same number',
        'Prune when remaining target is negative'
      ]
    },
    {
      id: 'rb-word-search',
      title: 'Word Search',
      difficulty: 'Medium',
      description: 'Given an m×n grid of characters and a word, determine if the word exists in the grid. You can move up, down, left, right.',
      examples: [
        { input: 'board = [["A","B","C"],["S","F","C"],["A","D","E"]], word = "ABCCFD"', output: 'true' }
      ],
      solution: {
        approach: 'DFS backtracking from each cell. Mark cells as visited, explore 4 directions, unmark on backtrack.',
        code: `function exist(board: string[][], word: string): boolean {
  const rows = board.length, cols = board[0].length;

  function dfs(r: number, c: number, idx: number): boolean {
    if (idx === word.length) return true;
    if (r < 0 || r >= rows || c < 0 || c >= cols) return false;
    if (board[r][c] !== word[idx]) return false;

    const temp = board[r][c];
    board[r][c] = '#';  // Mark visited

    const found = dfs(r+1, c, idx+1) || dfs(r-1, c, idx+1) ||
                  dfs(r, c+1, idx+1) || dfs(r, c-1, idx+1);

    board[r][c] = temp; // Unmark (backtrack)
    return found;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (dfs(r, c, 0)) return true;
    }
  }
  return false;
}`,
        timeComplexity: 'O(m × n × 4^L) where L = word length',
        spaceComplexity: 'O(L) recursion depth',
        stepByStep: [
          'Try starting DFS from every cell in the grid',
          'At each cell, check if it matches the current word character',
          'Mark as visited, explore all 4 directions',
          'Backtrack by unmarking the cell',
          'Return true if any path completes the word'
        ]
      },
      hints: [
        'Use the grid itself to mark visited cells',
        'Backtrack by restoring the original character',
        'Try starting from every cell'
      ]
    },
    {
      id: 'rb-letter-combinations',
      title: 'Letter Combinations of Phone Number',
      difficulty: 'Medium',
      description: 'Given a string of digits 2-9, return all possible letter combinations that the number could represent (phone keypad mapping).',
      examples: [
        { input: 'digits = "23"', output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]' }
      ],
      solution: {
        approach: 'Map each digit to its letters. Backtrack through digits, trying each letter for the current digit.',
        code: `function letterCombinations(digits: string): string[] {
  if (!digits) return [];

  const map: Record<string, string> = {
    '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
    '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
  };

  const result: string[] = [];

  function backtrack(idx: number, current: string) {
    if (idx === digits.length) {
      result.push(current);
      return;
    }
    for (const letter of map[digits[idx]]) {
      backtrack(idx + 1, current + letter);
    }
  }

  backtrack(0, '');
  return result;
}`,
        timeComplexity: 'O(4^n × n) where n = number of digits',
        spaceComplexity: 'O(n) recursion depth',
        stepByStep: [
          'Map each digit to its corresponding letters',
          'For each digit, try each possible letter',
          'Build the combination string as you recurse',
          'When all digits are processed, add to results'
        ]
      },
      hints: [
        'Create a digit-to-letters mapping',
        'Recurse through each digit position',
        'Try all letters for the current digit'
      ]
    }
  ],

  operations: [
    { name: 'Subsets (2ⁿ)', complexity: 'O(n × 2ⁿ)' },
    { name: 'Permutations (n!)', complexity: 'O(n × n!)' },
    { name: 'N-Queens', complexity: 'O(n!)' },
    { name: 'Combination Sum', complexity: 'O(n^(T/M))' },
    { name: 'Binary Search (D&C)', complexity: 'O(log n)' },
    { name: 'Merge Sort (D&C)', complexity: 'O(n log n)' }
  ],

  applications: [
    {
      name: 'Puzzle Solving',
      description: 'Backtracking solves Sudoku, crosswords, and other constraint puzzles.',
      example: 'Sudoku solver: try digits 1-9 in each empty cell, backtrack on conflict'
    },
    {
      name: 'Compiler Design',
      description: 'Recursive descent parsing uses recursion to process grammar rules.',
      example: 'Parsing mathematical expressions like "3 + (4 × 5)" into an AST'
    },
    {
      name: 'AI Game Trees',
      description: 'Minimax with alpha-beta pruning uses backtracking to find optimal game moves.',
      example: 'Chess engines evaluate millions of positions using recursive game tree search'
    },
    {
      name: 'Constraint Satisfaction',
      description: 'Scheduling, timetabling, and resource allocation often use backtracking with pruning.',
      example: 'Assigning courses to time slots without conflicts'
    }
  ]
};
