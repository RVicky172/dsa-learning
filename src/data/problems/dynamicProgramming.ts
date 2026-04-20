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
  }
];

