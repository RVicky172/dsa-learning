import type { Problem } from '../../types/topic';

export const greedyProblems: Problem[] = [
  {
    id: 'greedy-jump-game',
    title: 'Jump Game',
    difficulty: 'Medium',
    description: 'Given an integer array nums. You are initially positioned at the arrays first index. Return true if you can reach the last index.',
    examples: [{ input: 'nums = [2,3,1,1,4]', output: 'true' }],
    solution: {
      approach: 'Greedy approach: track the maximum reachable index.',
      code: `function canJump(nums: number[]): boolean {
  let maxReach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
  }
  return true;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: ['Maintain a maxReach variable', 'Iterate array', 'If current index is beyond maxReach, return false', 'Update maxReach with i + nums[i]']
    },
    hints: ['Work backwards', 'Keep track of the furthest you can reach']
  },
  {
    id: 'gas-station',
    title: 'Gas Station',
    difficulty: 'Medium',
    description: 'There are n gas stations along a circular route. Find the starting gas station index if you can travel around the circuit once.',
    examples: [
      {
        input: 'gas = [1,2,3,4,5], cost = [3,4,5,1,2]',
        output: '3',
        explanation: 'Start at station 3 (index 3) and fill up with 4 unit of gas. Your tank = 0 + 4 = 4. Travel to station 4. Your tank = 4 - 1 + 5 = 8. Travel to station 0. Your tank = 8 - 2 + 1 = 7. Travel to station 1. Your tank = 7 - 3 + 2 = 6. Travel to station 2. Your tank = 6 - 4 + 3 = 5. Travel to station 3. Your tank = 5 - 5 + 4 = 4. You can travel around the circuit once.'
      }
    ],
    solution: {
      approach: 'Calculate net gas at each station, find the starting point where cumulative sum never goes negative',
      code: `function canCompleteCircuit(gas: number[], cost: number[]): number {
  const n = gas.length;
  let totalGas = 0;
  let currentGas = 0;
  let start = 0;

  for (let i = 0; i < n; i++) {
    const net = gas[i] - cost[i];
    totalGas += net;
    currentGas += net;

    if (currentGas < 0) {
      start = i + 1;
      currentGas = 0;
    }
  }

  return totalGas >= 0 ? start : -1;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Calculate net gas for each station',
        'Track total gas and current gas from potential start',
        'If current gas becomes negative, reset from next station',
        'If total gas >= 0, return start index, else -1'
      ]
    },
    hints: [
      'The problem reduces to finding where cumulative sum starts being non-negative',
      'Reset start when current gas drops below zero',
      'Check total gas to ensure solution exists'
    ]
  }
];

