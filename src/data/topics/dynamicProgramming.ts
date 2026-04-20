import type { Topic } from '../../types/topic';
import { dpProblems } from '../problems/dynamicProgramming';
import React from 'react';
import { Trophy } from 'lucide-react';

export const dynamicProgrammingTopic: Topic = {
  id: 'dynamic-programming',
  title: 'Dynamic Programming',
  description: 'Solve optimization problems by breaking them into overlapping subproblems.',
  complexity: 'O(n²) typical',
  icon: React.createElement(Trophy, { size: 24 }),
  delay: 0.5,

  introduction: `Dynamic Programming (DP) is a method for solving complex problems by breaking them into simpler overlapping subproblems. It is applicable when a problem has two key properties: optimal substructure (an optimal solution can be constructed from optimal solutions of subproblems) and overlapping subproblems (the same subproblems are solved multiple times).

DP avoids redundant computation by storing results of subproblems — either in a table (tabulation / bottom-up) or through caching recursive calls (memoization / top-down). This transforms exponential brute-force solutions into polynomial-time algorithms.

## Memoization vs Tabulation
**Top-down (Memoization):** Write the natural recursive solution, then cache results. Easier to think about, only solves needed subproblems, but has recursion stack overhead.

**Bottom-up (Tabulation):** Fill a table iteratively from the smallest subproblems up. No recursion overhead, but you must determine the order of computation and may solve unnecessary subproblems.

## The DP Framework
1. Define the state: What does dp[i] represent?
2. Find the recurrence: How does dp[i] relate to previous states?
3. Set base cases: What are the trivial answers?
4. Determine order: Bottom-up or top-down?
5. Optimize space if possible (often from O(n²) to O(n) or O(1)).`,

  whyImportant: 'DP is one of the most tested topics in interviews at top tech companies. It appears in 20-30% of LeetCode problems and is the primary technique for optimization problems. Many real-world problems (resource allocation, scheduling, bioinformatics) are solved with DP.',

  whenToUse: [
    'When the problem asks for the optimal (min/max) solution',
    'When the problem can be broken into overlapping subproblems',
    'When you can define a clear state and recurrence relation',
    'When brute force involves repeated computation',
    'Counting problems (number of ways to reach a state)',
    'Decision problems (is something possible?)'
  ],

  advantages: [
    'Transforms exponential time to polynomial time',
    'Guaranteed optimal solution for problems with optimal substructure',
    'Systematic approach applicable to many problem types',
    'Space optimization techniques (rolling array) reduce memory',
    'Can handle complex constraints through state definition'
  ],

  disadvantages: [
    'Difficult to identify the correct state and recurrence',
    'Can use significant memory for large state spaces',
    'Not always easy to optimize space',
    'Harder to debug than greedy or brute force',
    'Overkill for problems solvable with greedy algorithms'
  ],

  concepts: [
    {
      name: 'Optimal Substructure',
      description: 'A problem has optimal substructure if an optimal solution can be constructed from optimal solutions of its subproblems. Example: shortest path — shortest A→C through B uses shortest A→B + shortest B→C.'
    },
    {
      name: 'Overlapping Subproblems',
      description: 'The same subproblems are solved multiple times. Fibonacci is the classic example: fib(5) computes fib(3) twice, fib(2) three times. DP caches these results.'
    },
    {
      name: 'State Transition',
      description: 'The recurrence relation that defines how to compute dp[i] from previously computed states. Finding the right transition is the hardest part of DP problems.'
    },
    {
      name: '1D vs 2D DP',
      description: '1D DP: state depends on a single variable (index). 2D DP: state depends on two variables (two indices, index + capacity). Higher dimensions are possible but less common.'
    },
    {
      name: 'Space Optimization',
      description: 'If dp[i] only depends on dp[i-1] (or a constant number of previous states), you can reduce space from O(n) to O(1) using rolling variables.'
    }
  ],

  examples: [
    {
      title: 'Fibonacci — Memoization vs Tabulation',
      language: 'typescript',
      code: `// ❌ Naive recursion — O(2^n)
function fibNaive(n: number): number {
  if (n <= 1) return n;
  return fibNaive(n - 1) + fibNaive(n - 2);
}

// ✅ Top-down with memoization — O(n)
function fibMemo(n: number, memo: Map<number, number> = new Map()): number {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n)!;
  const result = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  memo.set(n, result);
  return result;
}

// ✅ Bottom-up tabulation — O(n) time, O(n) space
function fibTab(n: number): number {
  if (n <= 1) return n;
  const dp = new Array(n + 1);
  dp[0] = 0; dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

// ✅ Space-optimized — O(n) time, O(1) space
function fibOpt(n: number): number {
  if (n <= 1) return n;
  let prev2 = 0, prev1 = 1;
  for (let i = 2; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}

console.log(fibOpt(10)); // 55`,
      explanation: 'Fibonacci demonstrates all DP approaches. Naive recursion is O(2^n) because it recomputes the same values. Memoization caches results for O(n). Tabulation fills a table bottom-up. Space optimization reduces to O(1) by keeping only the last two values.',
      timeComplexity: 'O(n) for all DP approaches',
      spaceComplexity: 'O(n) memo/tab, O(1) optimized'
    },
    {
      title: '0/1 Knapsack Problem',
      language: 'typescript',
      code: `// Given items with weights and values, maximize value within capacity
function knapsack(weights: number[], values: number[], capacity: number): number {
  const n = weights.length;
  // dp[i][w] = max value using first i items with capacity w
  const dp: number[][] = Array.from(
    { length: n + 1 },
    () => new Array(capacity + 1).fill(0)
  );

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      // Don't take item i
      dp[i][w] = dp[i - 1][w];
      // Take item i (if it fits)
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(
          dp[i][w],
          dp[i - 1][w - weights[i - 1]] + values[i - 1]
        );
      }
    }
  }

  return dp[n][capacity];
}

// Space-optimized (1D array)
function knapsackOpt(weights: number[], values: number[], capacity: number): number {
  const dp = new Array(capacity + 1).fill(0);

  for (let i = 0; i < weights.length; i++) {
    // Traverse RIGHT to LEFT to avoid using item twice
    for (let w = capacity; w >= weights[i]; w--) {
      dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
    }
  }
  return dp[capacity];
}

console.log(knapsack([2, 3, 4, 5], [3, 4, 5, 6], 8)); // 10`,
      explanation: 'The 0/1 Knapsack is the quintessential 2D DP problem. For each item, we decide to take it or leave it. The space-optimized version iterates weight backwards to ensure each item is used at most once. This pattern applies to many optimization problems.',
      timeComplexity: 'O(n × capacity)',
      spaceComplexity: 'O(n × capacity) or O(capacity) optimized'
    },
    {
      title: 'Longest Common Subsequence (LCS)',
      language: 'typescript',
      code: `// Find length of longest common subsequence
function longestCommonSubsequence(text1: string, text2: string): number {
  const m = text1.length, n = text2.length;
  const dp: number[][] = Array.from(
    { length: m + 1 },
    () => new Array(n + 1).fill(0)
  );

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1; // Match!
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]); // Skip one
      }
    }
  }

  return dp[m][n];
}

console.log(longestCommonSubsequence("abcde", "ace"));    // 3 ("ace")
console.log(longestCommonSubsequence("abc", "def"));      // 0`,
      explanation: 'LCS is a classic 2D DP problem. If characters match, extend the LCS. If not, take the best of skipping either character. The table builds up from empty strings. This approach is used in diff tools, DNA analysis, and version control.',
      timeComplexity: 'O(m × n)',
      spaceComplexity: 'O(m × n), can be optimized to O(min(m,n))'
    },
    {
      title: 'Coin Change — Minimum Coins',
      language: 'typescript',
      code: `// Minimum coins to make amount
function coinChange(coins: number[], amount: number): number {
  // dp[i] = minimum coins to make amount i
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0; // Base case: 0 coins for amount 0

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i && dp[i - coin] !== Infinity) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}

// Count number of ways (order doesn't matter)
function coinChangeWays(coins: number[], amount: number): number {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;

  for (const coin of coins) {      // Coins in outer loop
    for (let i = coin; i <= amount; i++) {
      dp[i] += dp[i - coin];
    }
  }

  return dp[amount];
}

console.log(coinChange([1, 5, 10, 25], 36));    // 3 (25+10+1)
console.log(coinChangeWays([1, 5, 10, 25], 36)); // 23 ways`,
      explanation: 'Coin change shows two common DP patterns: minimization and counting. For minimum coins, try each coin at each amount. For counting ways, iterate coins in the outer loop to avoid counting permutations (only combinations). Note the loop order difference!',
      timeComplexity: 'O(amount × coins.length)',
      spaceComplexity: 'O(amount)'
    }
  ],

  patterns: [
    {
      name: '1D Linear DP',
      description: 'State depends on previous elements in a single array. dp[i] is computed from dp[i-1], dp[i-2], etc.',
      technique: 'Define dp[i] as the answer for the first i elements. Find how dp[i] relates to previous states. Often optimizable to O(1) space.',
      example: 'Fibonacci, climbing stairs, house robber, maximum subarray',
      whenToUse: [
        'Sequential decision problems',
        'Problems with linear state progression',
        'When current state depends on fixed number of previous states',
        'Optimization over a 1D array'
      ]
    },
    {
      name: '2D DP (Two Variables)',
      description: 'State depends on two indices or variables. Common for string problems, grid problems, and knapsack variants.',
      technique: 'Define dp[i][j] based on two parameters. Fill the table row by row. Often the second dimension is a constraint (capacity, budget).',
      example: 'LCS, edit distance, knapsack, grid paths, matrix chain multiplication',
      whenToUse: [
        'String comparison problems (two strings)',
        'Grid/matrix traversal with constraints',
        'Optimization with a capacity/budget constraint',
        'When state requires two independent variables'
      ]
    },
    {
      name: 'Interval DP',
      description: 'Solve problems over intervals [i, j] by trying all possible split points. Combines solutions of smaller intervals to solve larger ones.',
      technique: 'dp[i][j] = optimal answer for interval [i, j]. Try all split points k: dp[i][j] = min/max(dp[i][k] + dp[k+1][j] + cost).',
      example: 'Matrix chain multiplication, burst balloons, palindrome partitioning, merge stones',
      whenToUse: [
        'When problem involves merging or splitting intervals',
        'Optimal parenthesization problems',
        'When you need to try all ways to split a range',
        'Problems on contiguous subarrays'
      ]
    }
  ],

  problems: [
    ...dpProblems,
    {
      id: 'dp-climbing-stairs',
      title: 'Climbing Stairs',
      difficulty: 'Easy',
      description: 'You can climb 1 or 2 steps at a time. How many distinct ways can you climb to the top of n stairs?',
      examples: [
        { input: 'n = 3', output: '3', explanation: '1+1+1, 1+2, 2+1' },
        { input: 'n = 5', output: '8' }
      ],
      solution: {
        approach: 'This is Fibonacci! dp[i] = dp[i-1] + dp[i-2]. You can reach step i from step i-1 (1 step) or step i-2 (2 steps).',
        code: `function climbStairs(n: number): number {
  if (n <= 2) return n;
  let prev2 = 1, prev1 = 2;
  for (let i = 3; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        stepByStep: [
          'Recognize this is Fibonacci: ways(n) = ways(n-1) + ways(n-2)',
          'Base cases: 1 way for 1 step, 2 ways for 2 steps',
          'Use two variables instead of array for O(1) space',
          'Build up from bottom'
        ]
      },
      hints: [
        'How many ways to reach step i from previous steps?',
        'This is exactly like Fibonacci',
        'You only need the last two values'
      ]
    },
    {
      id: 'dp-house-robber',
      title: 'House Robber',
      difficulty: 'Medium',
      description: 'You cannot rob two adjacent houses. Given an array of house values, find the maximum amount you can rob.',
      examples: [
        { input: 'nums = [2, 7, 9, 3, 1]', output: '12', explanation: 'Rob houses 1, 3, 5: 2+9+1=12' }
      ],
      solution: {
        approach: 'At each house, choose to rob it (add value + dp[i-2]) or skip it (dp[i-1]). Take the maximum.',
        code: `function rob(nums: number[]): number {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  let prev2 = 0, prev1 = 0;
  for (const num of nums) {
    const curr = Math.max(prev1, prev2 + num);
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        stepByStep: [
          'dp[i] = max(dp[i-1], dp[i-2] + nums[i])',
          'Skip current house: take dp[i-1]',
          'Rob current house: take dp[i-2] + current value',
          'Optimize to O(1) space using two variables'
        ]
      },
      hints: [
        'At each house you have two choices: rob or skip',
        'If you rob, you can\'t rob the previous house',
        'Think about the recurrence relation'
      ]
    },
    {
      id: 'dp-longest-increasing-subseq',
      title: 'Longest Increasing Subsequence',
      difficulty: 'Medium',
      description: 'Find the length of the longest strictly increasing subsequence in an array.',
      examples: [
        { input: 'nums = [10, 9, 2, 5, 3, 7, 101, 18]', output: '4', explanation: '[2, 3, 7, 101]' }
      ],
      solution: {
        approach: 'dp[i] = length of LIS ending at index i. For each element, check all previous elements and extend the longest valid subsequence.',
        code: `function lengthOfLIS(nums: number[]): number {
  const n = nums.length;
  const dp = new Array(n).fill(1);

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  return Math.max(...dp);
}

// O(n log n) with binary search + patience sorting
function lengthOfLIS_Optimal(nums: number[]): number {
  const tails: number[] = [];
  for (const num of nums) {
    let lo = 0, hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (tails[mid] < num) lo = mid + 1;
      else hi = mid;
    }
    tails[lo] = num;
  }
  return tails.length;
}`,
        timeComplexity: 'O(n²) DP, O(n log n) optimal',
        spaceComplexity: 'O(n)',
        stepByStep: [
          'dp[i] starts at 1 (each element is a subsequence of length 1)',
          'For each i, check all j < i where nums[j] < nums[i]',
          'dp[i] = max(dp[j] + 1) for all valid j',
          'Answer is the maximum value in dp array',
          'Optimal: maintain a tails array and use binary search'
        ]
      },
      hints: [
        'dp[i] = length of LIS ending at index i',
        'For each element, try extending all shorter subsequences',
        'Can you improve with binary search?'
      ]
    }
  ],

  operations: [
    { name: '1D DP (linear)', complexity: 'O(n)' },
    { name: '2D DP (strings/grid)', complexity: 'O(n × m)' },
    { name: 'Knapsack', complexity: 'O(n × W)' },
    { name: 'LIS (optimal)', complexity: 'O(n log n)' },
    { name: 'Matrix Chain', complexity: 'O(n³)' },
    { name: 'Bitmask DP', complexity: 'O(2ⁿ × n)' }
  ],

  applications: [
    {
      name: 'Bioinformatics',
      description: 'Sequence alignment (DNA, protein) uses DP variants of edit distance and LCS.',
      example: 'The Needleman-Wunsch algorithm aligns DNA sequences using a DP scoring matrix'
    },
    {
      name: 'Natural Language Processing',
      description: 'DP powers parsing algorithms (CYK), spell correction, and text segmentation.',
      example: 'Word segmentation: finding valid word splits in "ilovecoding" using a dictionary'
    },
    {
      name: 'Finance & Resource Allocation',
      description: 'Portfolio optimization, inventory management, and resource scheduling use knapsack-style DP.',
      example: 'Budget allocation across marketing channels to maximize ROI'
    },
    {
      name: 'Computer Graphics',
      description: 'Seam carving for content-aware image resizing uses DP to find minimum-energy paths.',
      example: 'Reducing image width by removing the lowest-energy vertical seam'
    }
  ]
};
