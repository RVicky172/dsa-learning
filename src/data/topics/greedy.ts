import type { Topic } from '../../types/topic';
import { greedyProblems } from '../advancedProblems';
import React from 'react';
import { TrendingUp } from 'lucide-react';

export const greedyTopic: Topic = {
  id: 'greedy',
  title: 'Greedy Algorithms',
  description: 'Make locally optimal choices to find globally optimal solutions.',
  complexity: 'O(n log n) typical',
  icon: React.createElement(TrendingUp, { size: 24 }),
  delay: 0.75,

  introduction: `A greedy algorithm makes the locally optimal choice at each step, hoping to find the global optimum. Unlike dynamic programming which considers all possibilities, greedy algorithms commit to each decision without looking back.

The key question is: does making the best local choice at each step lead to the best overall solution? If yes, greedy works and is typically much simpler and faster than DP. If no, you need DP or backtracking instead.

## Greedy Choice Property
A problem has the greedy choice property if a globally optimal solution can be arrived at by making locally optimal choices. This must be proven (often by exchange argument or contradiction) — you can't just assume greedy works.

## When Greedy Fails
Greedy fails for the 0/1 Knapsack problem, longest path in graphs, and many optimization problems. For these, you need DP. A classic trap is the coin change problem: greedy works for standard denominations (1,5,10,25) but fails for arbitrary denominations (e.g., coins [1,3,4], amount 6: greedy gives 4+1+1=3 coins, but optimal is 3+3=2 coins).`,

  whyImportant: 'Greedy algorithms are efficient and elegant. When they work, they provide the simplest and fastest solutions. Common in interval scheduling, graph algorithms (Dijkstra, Kruskal, Prim), Huffman coding, and real-world optimization. Interviewers test whether you can identify when greedy is sufficient vs when DP is needed.',

  whenToUse: [
    'Interval scheduling and activity selection',
    'Huffman coding and data compression',
    'Minimum spanning tree (Kruskal, Prim)',
    'Shortest path (Dijkstra — with non-negative weights)',
    'Fractional knapsack (but NOT 0/1 knapsack)',
    'Jump game and gas station problems',
    'When the problem has greedy choice property AND optimal substructure'
  ],

  advantages: [
    'Simple and intuitive to implement',
    'Very efficient — typically O(n log n) or O(n)',
    'Low space complexity — usually O(1) extra space',
    'Easy to prove correctness when applicable',
    'Often the optimal approach for scheduling problems'
  ],

  disadvantages: [
    'Doesn\'t always produce the optimal solution',
    'Difficult to prove correctness (exchange argument needed)',
    'Easy to be tricked into thinking greedy works when it doesn\'t',
    'Not applicable to many optimization problems',
    'No general framework — each problem needs specific insight'
  ],

  concepts: [
    {
      name: 'Greedy Choice Property',
      description: 'Making the locally optimal choice at each step leads to a globally optimal solution. This is the fundamental requirement for a greedy solution to be correct.'
    },
    {
      name: 'Optimal Substructure',
      description: 'After making a greedy choice, the remaining subproblem is also optimally solvable by the same greedy strategy. Shared with DP, but greedy doesn\'t explore alternatives.'
    },
    {
      name: 'Exchange Argument',
      description: 'A proof technique: assume an optimal solution that differs from greedy. Show you can "exchange" a non-greedy choice with the greedy choice without worsening the solution. This proves greedy is at least as good.'
    },
    {
      name: 'Sorting as Preprocessing',
      description: 'Many greedy algorithms start by sorting the input. Sorting by start time, end time, ratio, or deadline enables the greedy choice to be made in order.'
    }
  ],

  examples: [
    {
      title: 'Activity Selection (Interval Scheduling)',
      language: 'typescript',
      code: `// Select maximum number of non-overlapping activities
function activitySelection(
  activities: [number, number][] // [start, end]
): [number, number][] {
  // Sort by end time (greedy choice: earliest ending first)
  const sorted = [...activities].sort((a, b) => a[1] - b[1]);
  const selected: [number, number][] = [sorted[0]];
  let lastEnd = sorted[0][1];

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i][0] >= lastEnd) {
      selected.push(sorted[i]);
      lastEnd = sorted[i][1];
    }
  }
  return selected;
}

const activities: [number, number][] = [
  [1,4], [3,5], [0,6], [5,7], [3,9], [5,9], [6,10], [8,11], [8,12], [2,14], [12,16]
];
console.log(activitySelection(activities));
// [[1,4], [5,7], [8,11], [12,16]] — 4 activities`,
      explanation: 'The key insight: always pick the activity that finishes earliest. This leaves the most room for subsequent activities. Sorting by end time and greedily picking non-overlapping activities gives the maximum number of activities. Proved optimal via exchange argument.',
      timeComplexity: 'O(n log n) for sorting + O(n) for selection',
      spaceComplexity: 'O(n) for sorted copy'
    },
    {
      title: 'Jump Game — Can You Reach the End?',
      language: 'typescript',
      code: `// Can you reach the last index?
function canJump(nums: number[]): boolean {
  let maxReach = 0;

  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false; // Can't reach this position
    maxReach = Math.max(maxReach, i + nums[i]);
    if (maxReach >= nums.length - 1) return true;
  }
  return true;
}

// Minimum jumps to reach the end
function jump(nums: number[]): number {
  let jumps = 0, currentEnd = 0, farthest = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);

    if (i === currentEnd) {
      jumps++;
      currentEnd = farthest;
      if (currentEnd >= nums.length - 1) break;
    }
  }
  return jumps;
}

console.log(canJump([2,3,1,1,4]));  // true
console.log(canJump([3,2,1,0,4]));  // false
console.log(jump([2,3,1,1,4]));     // 2`,
      explanation: 'Greedily track the farthest reachable position. For Jump Game I: if we ever can\'t reach position i, return false. For Jump Game II: we make a "jump" when we reach the end of the current jump range, always jumping to the farthest reachable position.',
      timeComplexity: 'O(n) — single pass',
      spaceComplexity: 'O(1)'
    },
    {
      title: 'Fractional Knapsack',
      language: 'typescript',
      code: `// Can take fractions of items (unlike 0/1 knapsack)
function fractionalKnapsack(
  weights: number[],
  values: number[],
  capacity: number
): number {
  const n = weights.length;
  // Calculate value-to-weight ratio
  const items = Array.from({ length: n }, (_, i) => ({
    weight: weights[i],
    value: values[i],
    ratio: values[i] / weights[i],
    index: i
  }));

  // Sort by ratio (descending) — greedy choice
  items.sort((a, b) => b.ratio - a.ratio);

  let totalValue = 0;
  let remaining = capacity;

  for (const item of items) {
    if (remaining <= 0) break;

    if (item.weight <= remaining) {
      // Take entire item
      totalValue += item.value;
      remaining -= item.weight;
    } else {
      // Take fraction of item
      totalValue += item.ratio * remaining;
      remaining = 0;
    }
  }

  return totalValue;
}

console.log(fractionalKnapsack([10, 20, 30], [60, 100, 120], 50));
// 240 (take all of item 1 & 2, fraction of item 3)`,
      explanation: 'Unlike 0/1 knapsack (which needs DP), fractional knapsack is greedy! Sort by value/weight ratio. Take as much as possible of the best ratio item first. When an item doesn\'t fully fit, take a fraction. This is provably optimal because we always add the highest-value material per unit weight.',
      timeComplexity: 'O(n log n) for sorting',
      spaceComplexity: 'O(n)'
    }
  ],

  patterns: [
    {
      name: 'Sort Then Greedy',
      description: 'Sort the input by a strategic criterion, then make greedy choices in order. The sorting enables the greedy property.',
      technique: 'Identify the right sorting criterion (end time, deadline, ratio, size). Process elements in sorted order, making the locally optimal choice at each step.',
      example: 'Activity selection (sort by end time), job scheduling (sort by deadline), meeting rooms',
      whenToUse: [
        'Interval/scheduling problems',
        'Any greedy problem where order matters',
        'When the greedy choice depends on relative ordering',
        'Optimization over sorted sequences'
      ]
    },
    {
      name: 'Greedy with Running Maximum/Minimum',
      description: 'Track a running max/min as you iterate, making decisions based on the current state.',
      technique: 'Maintain a variable tracking the best-so-far. At each step, update and check if the current state is valid/optimal.',
      example: 'Jump game, best time to buy/sell stock, gas station problem',
      whenToUse: [
        'Reachability problems',
        'Stock trading problems',
        'Circular array problems',
        'When decisions depend on accumulated state'
      ]
    },
    {
      name: 'Greedy Interval Merging',
      description: 'Sort intervals and merge/process them in order. Overlapping intervals are handled greedily.',
      technique: 'Sort by start. For each interval, check overlap with previous. Merge if overlapping, start new if not.',
      example: 'Merge intervals, insert interval, minimum arrows to burst balloons',
      whenToUse: [
        'Merging overlapping intervals',
        'Finding gaps in schedules',
        'Minimum resources for overlapping events',
        'Calendar/booking problems'
      ]
    }
  ],

  problems: [
    ...greedyProblems,
    {
      id: 'greedy-best-stock',
      title: 'Best Time to Buy and Sell Stock II',
      difficulty: 'Medium',
      description: 'You can buy and sell a stock multiple times. Find the maximum profit.',
      examples: [
        { input: 'prices = [7,1,5,3,6,4]', output: '7', explanation: 'Buy at 1, sell at 5 (profit 4) + buy at 3, sell at 6 (profit 3) = 7' }
      ],
      solution: {
        approach: 'Greedy: collect every upward price movement. If tomorrow\'s price is higher, "buy today sell tomorrow".',
        code: `function maxProfit(prices: number[]): number {
  let profit = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      profit += prices[i] - prices[i - 1];
    }
  }
  return profit;
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        stepByStep: [
          'Iterate through prices from day 2',
          'If today > yesterday, add the difference to profit',
          'This captures every upward price movement',
          'Equivalent to buying at every valley and selling at every peak'
        ]
      },
      hints: [
        'You want to capture every price increase',
        'Think of it as collecting all positive differences',
        'No need to track actual buy/sell transactions'
      ]
    },
    {
      id: 'greedy-merge-intervals',
      title: 'Merge Intervals',
      difficulty: 'Medium',
      description: 'Given an array of intervals, merge all overlapping intervals.',
      examples: [
        { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]' }
      ],
      solution: {
        approach: 'Sort by start time, then greedily merge overlapping intervals.',
        code: `function merge(intervals: number[][]): number[][] {
  intervals.sort((a, b) => a[0] - b[0]);
  const merged: number[][] = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    if (intervals[i][0] <= last[1]) {
      last[1] = Math.max(last[1], intervals[i][1]);
    } else {
      merged.push(intervals[i]);
    }
  }

  return merged;
}`,
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
        stepByStep: [
          'Sort intervals by start time',
          'Start with the first interval in the result',
          'For each subsequent interval, check overlap with last merged',
          'If overlapping, extend the end; otherwise, add new interval'
        ]
      },
      hints: [
        'Sort by start time first',
        'Compare current interval with the last merged one',
        'Extend the end of the last merged interval if overlapping'
      ]
    },
    {
      id: 'greedy-gas-station',
      title: 'Gas Station',
      difficulty: 'Medium',
      description: 'There are n gas stations in a circle. Find the starting station index to complete the circuit, or return -1.',
      examples: [
        {
          input: 'gas = [1,2,3,4,5], cost = [3,4,5,1,2]',
          output: '3',
          explanation: 'Start at station 3: tank = 4-1+5-2+1-3+2-4+3-5 = 0 (just enough)'
        }
      ],
      solution: {
        approach: 'If total gas >= total cost, a solution exists. Greedily find the starting point by tracking the running tank.',
        code: `function canCompleteCircuit(gas: number[], cost: number[]): number {
  let totalTank = 0, currentTank = 0, start = 0;

  for (let i = 0; i < gas.length; i++) {
    const net = gas[i] - cost[i];
    totalTank += net;
    currentTank += net;

    if (currentTank < 0) {
      start = i + 1;     // Can't start at or before i
      currentTank = 0;   // Reset
    }
  }

  return totalTank >= 0 ? start : -1;
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        stepByStep: [
          'Track total tank (to check if solution exists)',
          'Track current tank from the candidate start',
          'If current tank goes negative, move start to i+1',
          'If total >= 0, the final start is the answer'
        ]
      },
      hints: [
        'If total gas >= total cost, a solution must exist',
        'If you can\'t reach station i+1 from start, try starting at i+1',
        'Only one valid starting point exists (if any)'
      ]
    }
  ],

  operations: [
    { name: 'Activity Selection', complexity: 'O(n log n)' },
    { name: 'Fractional Knapsack', complexity: 'O(n log n)' },
    { name: 'Huffman Coding', complexity: 'O(n log n)' },
    { name: 'Jump Game', complexity: 'O(n)' },
    { name: 'Interval Merging', complexity: 'O(n log n)' },
    { name: 'Gas Station', complexity: 'O(n)' }
  ],

  applications: [
    {
      name: 'Task Scheduling',
      description: 'Operating systems use greedy algorithms to schedule processes and minimize wait time.',
      example: 'Shortest Job First (SJF) scheduling greedily picks the shortest process next'
    },
    {
      name: 'Data Compression',
      description: 'Huffman coding uses a greedy algorithm to build optimal prefix-free codes.',
      example: 'ZIP files use Huffman trees where frequent characters get shorter codes'
    },
    {
      name: 'Network Routing',
      description: 'Dijkstra\'s algorithm greedily selects the nearest unvisited node to find shortest paths.',
      example: 'GPS navigation systems find shortest routes using greedy graph algorithms'
    },
    {
      name: 'Resource Allocation',
      description: 'Minimizing the number of resources (rooms, servers) for overlapping demands.',
      example: 'Meeting room scheduling: find minimum rooms needed for overlapping meetings'
    }
  ]
};
