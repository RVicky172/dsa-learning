import type { Problem } from '../../types/topic';

export const dpProblems: Problem[] = [
  {
    id: 'dp-climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. How many distinct ways can you climb to the top?',
    examples: [{ input: 'n = 3', output: '3' }],
    solution: {
      approach: 'Fibonacci sequence. Ways(n) = Ways(n-1) + Ways(n-2)',
      code: `function climbStairs(n: number): number {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) {
    let temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: ['Base case: n=1 is 1, n=2 is 2', 'Use two variables to track previous two states', 'Iterate and sum']
    },
    hints: ['To reach step n, you must step from n-1 or n-2']
  },
  {
    id: 'dp-coin-change',
    title: 'Coin Change',
    difficulty: 'Medium',
    description: 'Return the fewest number of coins that you need to make up that amount.',
    examples: [{ input: 'coins = [1,2,5], amount = 11', output: '3' }],
    solution: {
      approach: 'Bottom-up DP. dp[i] = min(dp[i], 1 + dp[i - coin])',
      code: `function coinChange(coins: number[], amount: number): number {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
      timeComplexity: 'O(amount * coins.length)',
      spaceComplexity: 'O(amount)',
      stepByStep: ['Initialize DP array with Infinity', 'Set dp[0] = 0', 'For each amount, check all coins to find minimum required']
    },
    hints: ['Build the solution array from bottom up', 'What is the answer for amount 0?']
  },
  {
    id: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    examples: [
      {
        input: 'n = 2',
        output: '2',
        explanation: '1. 1 step + 1 step 2. 2 steps'
      }
    ],
    solution: {
      approach: 'DP where dp[i] = dp[i-1] + dp[i-2], similar to Fibonacci',
      code: `function climbStairs(n: number): number {
  if (n <= 2) return n;

  let prev1 = 1;
  let prev2 = 2;

  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev1 = prev2;
    prev2 = current;
  }

  return prev2;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Base cases: 1 way for 1 step, 2 ways for 2 steps',
        'For each step, ways = ways(n-1) + ways(n-2)',
        'Use two variables to track previous results'
      ]
    },
    hints: [
      'This is a Fibonacci sequence',
      'Think about the choices at each step',
      'Optimize space by using only two variables'
    ]
  },
  // ── NEW BATCH (TKT-016) ──────────────────────────────────────────
  {
    id: 'dp-house-robber',
    title: 'House Robber',
    difficulty: 'Easy',
    description: 'You are a robber planning to rob houses along a street. Adjacent houses have security systems, so you cannot rob two adjacent houses. Given an integer array nums representing the amount of money in each house, return the maximum amount you can rob.',
    examples: [
      { input: 'nums = [1,2,3,1]', output: '4', explanation: 'Rob house 1 (1) + house 3 (3) = 4.' },
      { input: 'nums = [2,7,9,3,1]', output: '12', explanation: 'Rob house 1 (2) + house 3 (9) + house 5 (1) = 12.' }
    ],
    solution: {
      approach: 'DP: dp[i] = max(dp[i-1], dp[i-2] + nums[i]). Space-optimised with two variables.',
      code: `function rob(nums: number[]): number {
  let prev2 = 0;
  let prev1 = 0;
  for (const n of nums) {
    const curr = Math.max(prev1, prev2 + n);
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'For each house, choose: rob it (prev2 + nums[i]) or skip it (prev1)',
        'Take the maximum of both options',
        'Roll the two-variable window forward',
        'Return prev1 after processing all houses'
      ]
    },
    hints: ['You only need the previous two dp values — no full array needed.', 'Decision: rob this house or skip it.']
  },
  {
    id: 'dp-fibonacci',
    title: 'Fibonacci Number',
    difficulty: 'Easy',
    description: 'The Fibonacci numbers form the sequence: F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2). Given n, calculate F(n).',
    examples: [
      { input: 'n = 4', output: '3', explanation: 'F(4) = F(3) + F(2) = 2 + 1 = 3.' },
      { input: 'n = 10', output: '55' }
    ],
    solution: {
      approach: 'Bottom-up DP with two variables.',
      code: `function fib(n: number): number {
  if (n <= 1) return n;
  let a = 0;
  let b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Handle base cases n = 0 and n = 1 directly',
        'Iterate from 2 to n updating two variables',
        'a, b = b, a + b shifts the window',
        'Return b after n iterations'
      ]
    },
    hints: ['Memoisation with recursion works but is O(n) space; two variables are cleaner.', 'Matrix exponentiation can solve in O(log n) if needed.']
  },
  {
    id: 'dp-longest-increasing-subsequence',
    title: 'Longest Increasing Subsequence',
    difficulty: 'Medium',
    description: 'Given an integer array nums, return the length of the longest strictly increasing subsequence.',
    examples: [
      { input: 'nums = [10,9,2,5,3,7,101,18]', output: '4', explanation: '[2,3,7,101] has length 4.' },
      { input: 'nums = [0,1,0,3,2,3]', output: '4' }
    ],
    solution: {
      approach: 'Patience sorting / binary search: maintain a tails array where tails[i] is the smallest tail for all increasing subsequences of length i+1.',
      code: `function lengthOfLIS(nums: number[]): number {
  const tails: number[] = [];
  for (const n of nums) {
    let lo = 0;
    let hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (tails[mid] < n) lo = mid + 1;
      else hi = mid;
    }
    tails[lo] = n;
  }
  return tails.length;
}`,
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      stepByStep: [
        'Maintain a tails array of the best (smallest) ending elements per length',
        'For each number, binary-search for its position in tails',
        'Replace tails[pos] with the number if found, or extend tails',
        'The length of tails is the LIS length'
      ]
    },
    hints: ['The tails array is always sorted, so binary search works.', 'Standard O(n²) DP also works but patience sorting is O(n log n).']
  },
  {
    id: 'dp-word-break',
    title: 'Word Break',
    difficulty: 'Medium',
    description: 'Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.',
    examples: [
      { input: 's = "leetcode", wordDict = ["leet","code"]', output: 'true' },
      { input: 's = "applepenapple", wordDict = ["apple","pen"]', output: 'true' },
      { input: 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]', output: 'false' }
    ],
    solution: {
      approach: 'DP: dp[i] = true if s[0..i-1] can be segmented. For each position check all words.',
      code: `function wordBreak(s: string, wordDict: string[]): boolean {
  const wordSet = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordSet.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
}`,
      timeComplexity: 'O(n² * m) where m is avg word length',
      spaceComplexity: 'O(n)',
      stepByStep: [
        'dp[0] = true (empty prefix is always valid)',
        'For each end index i, try all start indices j',
        'If dp[j] is true and s[j..i] is in the dictionary, set dp[i] = true',
        'Return dp[s.length]'
      ]
    },
    hints: ['Use a Set for O(1) dictionary lookup.', 'dp[i] means the first i characters can be segmented.']
  },
  {
    id: 'dp-unique-paths',
    title: 'Unique Paths',
    difficulty: 'Medium',
    description: 'A robot starts at the top-left corner of an m×n grid and can only move right or down. How many unique paths are there to reach the bottom-right corner?',
    examples: [
      { input: 'm = 3, n = 7', output: '28' },
      { input: 'm = 3, n = 2', output: '3' }
    ],
    solution: {
      approach: 'DP: dp[i][j] = dp[i-1][j] + dp[i][j-1]. Space-optimise to a 1D array.',
      code: `function uniquePaths(m: number, n: number): number {
  const dp = new Array(n).fill(1);
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] += dp[j - 1];
    }
  }
  return dp[n - 1];
}`,
      timeComplexity: 'O(m × n)',
      spaceComplexity: 'O(n)',
      stepByStep: [
        'Initialise a 1D dp array of size n with all 1s (first row)',
        'For each subsequent row, update dp[j] = dp[j] + dp[j-1]',
        'dp[j] represents paths to column j from the top',
        'Return dp[n-1]'
      ]
    },
    hints: ['Combinatorics gives C(m+n-2, m-1) directly, but DP is more general.', 'Space can be reduced to O(n) using a rolling 1D array.']
  },
  {
    id: 'dp-edit-distance',
    title: 'Edit Distance',
    difficulty: 'Hard',
    description: 'Given two strings word1 and word2, return the minimum number of operations (insert, delete, replace) to convert word1 into word2.',
    examples: [
      { input: 'word1 = "horse", word2 = "ros"', output: '3', explanation: 'horse → rorse (replace h→r) → rose (delete r) → ros (delete e).' },
      { input: 'word1 = "intention", word2 = "execution"', output: '5' }
    ],
    solution: {
      approach: 'Classic 2D DP: dp[i][j] = edit distance between word1[0..i-1] and word2[0..j-1].',
      code: `function minDistance(word1: string, word2: string): number {
  const m = word1.length;
  const n = word2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],     // delete
          dp[i][j - 1],     // insert
          dp[i - 1][j - 1]  // replace
        );
      }
    }
  }
  return dp[m][n];
}`,
      timeComplexity: 'O(m × n)',
      spaceComplexity: 'O(m × n)',
      stepByStep: [
        'dp[i][0] = i (delete all chars of word1[0..i-1])',
        'dp[0][j] = j (insert all chars of word2[0..j-1])',
        'If characters match, dp[i][j] = dp[i-1][j-1]',
        'Otherwise dp[i][j] = 1 + min(delete, insert, replace)',
        'Return dp[m][n]'
      ]
    },
    hints: ['Think of each cell as the cost to convert a prefix of word1 to a prefix of word2.', 'Three operations correspond to three adjacent cells in the DP table.']
  }
];

