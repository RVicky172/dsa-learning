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
  },
  // ── NEW BATCH (TKT-016) ──────────────────────────────────────────
  {
    id: 'greedy-assign-cookies',
    title: 'Assign Cookies',
    difficulty: 'Easy',
    description: 'Each child has a greed factor g[i] (minimum cookie size they accept). Each cookie has size s[j]. Assign at most one cookie per child to maximise the number of content children.',
    examples: [
      { input: 'g = [1,2,3], s = [1,1]', output: '1' },
      { input: 'g = [1,2], s = [1,2,3]', output: '2' }
    ],
    solution: {
      approach: 'Sort both arrays. Greedily assign the smallest sufficient cookie to the least greedy child.',
      code: `function findContentChildren(g: number[], s: number[]): number {
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);
  let child = 0;
  let cookie = 0;
  while (child < g.length && cookie < s.length) {
    if (s[cookie] >= g[child]) child++;
    cookie++;
  }
  return child;
}`,
      timeComplexity: 'O(n log n + m log m)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Sort greed factors and cookie sizes',
        'Two-pointer: try to satisfy easiest child with smallest cookie',
        'Advance cookie pointer regardless; advance child pointer only on success',
        'Return number of satisfied children'
      ]
    },
    hints: ['Satisfy easiest children first.', 'Always try the smallest cookie that works for the current child.']
  },
  {
    id: 'greedy-lemonade-change',
    title: 'Lemonade Change',
    difficulty: 'Easy',
    description: 'Customers pay $5, $10, or $20 for a $5 lemonade. You start with no change. Return true if you can provide every customer with exact change.',
    examples: [
      { input: 'bills = [5,5,5,10,20]', output: 'true' },
      { input: 'bills = [5,5,10,10,20]', output: 'false' }
    ],
    solution: {
      approach: 'Track $5 and $10 counts. Greedily give change using largest denominations first.',
      code: `function lemonadeChange(bills: number[]): boolean {
  let five = 0;
  let ten = 0;
  for (const bill of bills) {
    if (bill === 5) {
      five++;
    } else if (bill === 10) {
      if (five === 0) return false;
      five--;
      ten++;
    } else {
      // $20: prefer 10+5 over 5+5+5
      if (ten > 0 && five > 0) { ten--; five--; }
      else if (five >= 3) { five -= 3; }
      else return false;
    }
  }
  return true;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Keep counts of $5 and $10 bills',
        '$10 bill: give back one $5',
        '$20 bill: prefer $10+$5 change (preserves $5 for future use)',
        'Fall back to three $5 bills if no $10 available'
      ]
    },
    hints: ['$5 bills are the most versatile — preserve them.', 'For $20 change, prefer $10+$5 over $5+$5+$5.']
  },
  {
    id: 'greedy-partition-labels',
    title: 'Partition Labels',
    difficulty: 'Medium',
    description: 'Given string s, partition it into as many parts as possible so each letter appears in at most one part. Return the size of each part.',
    examples: [
      { input: 's = "ababcbacadefegdehijhklij"', output: '[9,7,8]' },
      { input: 's = "eccbbbbdec"', output: '[10]' }
    ],
    solution: {
      approach: 'Precompute last occurrence of each letter. Greedily extend the current partition to include all letters seen so far.',
      code: `function partitionLabels(s: string): number[] {
  const last = new Array(26).fill(0);
  const base = 'a'.charCodeAt(0);
  for (let i = 0; i < s.length; i++) last[s.charCodeAt(i) - base] = i;
  const result: number[] = [];
  let start = 0;
  let end = 0;
  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, last[s.charCodeAt(i) - base]);
    if (i === end) {
      result.push(end - start + 1);
      start = i + 1;
    }
  }
  return result;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Record last occurrence index of every character',
        'Walk through s, extending end to max last occurrence seen',
        'When current index reaches end, a partition is complete',
        'Record partition size and advance start'
      ]
    },
    hints: ['The partition boundary is when i equals the furthest last occurrence of any character seen so far.', 'Two passes: one for last indices, one for partitions.']
  },
  {
    id: 'greedy-jump-game-ii',
    title: 'Jump Game II',
    difficulty: 'Medium',
    description: 'Given an integer array nums where nums[i] is the max jump length from index i, return the minimum number of jumps to reach the last index.',
    examples: [
      { input: 'nums = [2,3,1,1,4]', output: '2', explanation: 'Jump 1→3 (index 1→4).' },
      { input: 'nums = [2,3,0,1,4]', output: '2' }
    ],
    solution: {
      approach: 'Greedy BFS-like: track current range end and next range end; increment jumps when range is exhausted.',
      code: `function jump(nums: number[]): number {
  let jumps = 0;
  let curEnd = 0;
  let farthest = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    if (i === curEnd) {
      jumps++;
      curEnd = farthest;
    }
  }
  return jumps;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Track farthest reachable index within current jump',
        'When i reaches curEnd, we must jump — increment counter',
        'Set curEnd = farthest for the next jump range',
        'Stop before the last index (no need to jump from there)'
      ]
    },
    hints: ['Think of each jump range as a BFS level.', 'You never need to consider every position — just the farthest reachable.']
  },
  {
    id: 'greedy-minimum-arrows',
    title: 'Minimum Number of Arrows to Burst Balloons',
    difficulty: 'Hard',
    description: 'Balloons are represented by [xstart, xend] horizontal diameters. An arrow shot at x bursts all balloons where xstart <= x <= xend. Return the minimum number of arrows needed.',
    examples: [
      { input: 'points = [[10,16],[2,8],[1,6],[7,12]]', output: '2' },
      { input: 'points = [[1,2],[3,4],[5,6],[7,8]]', output: '4' }
    ],
    solution: {
      approach: 'Greedy interval scheduling: sort by end coordinate; shoot at each balloon\'s end, skipping already-burst balloons.',
      code: `function findMinArrowShots(points: number[][]): number {
  points.sort((a, b) => a[1] - b[1]);
  let arrows = 1;
  let arrowPos = points[0][1];
  for (let i = 1; i < points.length; i++) {
    if (points[i][0] > arrowPos) {
      arrows++;
      arrowPos = points[i][1];
    }
  }
  return arrows;
}`,
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Sort balloons by their right boundary',
        'Shoot first arrow at the right boundary of the first balloon',
        'If the next balloon starts after the arrow position, shoot a new arrow',
        'Each new arrow is placed at the new balloon\'s right boundary'
      ]
    },
    hints: ['Sort by end time — classic greedy interval technique.', 'Shooting at the rightmost end of the current balloon bursts as many overlapping balloons as possible.']
  }
];

