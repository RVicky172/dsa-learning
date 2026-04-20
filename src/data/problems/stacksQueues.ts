import type { Problem } from '../../types/topic';

export const stackQueueProblems: Problem[] = [
  {
    id: 'sq-daily-temperatures',
    title: 'Daily Temperatures',
    difficulty: 'Medium',
    description: 'Given daily temperatures, return an array where result[i] is days until warmer temperature.',
    examples: [
      {
        input: 'temperatures = [73,74,75,71,69,72,76,73]',
        output: '[1,1,4,2,1,1,0,0]',
        explanation: 'Days until next warmer temp for each day'
      }
    ],
    solution: {
      approach: 'Use monotonic stack to find next greater element',
      code: `function dailyTemperatures(temperatures: number[]): number[] {
  const result = new Array(temperatures.length).fill(0);
  const stack: number[] = [];

  for (let i = 0; i < temperatures.length; i++) {
    while (
      stack.length > 0 &&
      temperatures[i] > temperatures[stack[stack.length - 1]]
    ) {
      const j = stack.pop()!;
      result[j] = i - j;
    }
    stack.push(i);
  }

  return result;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      stepByStep: [
        'Use a stack to store indices',
        'For each temperature, pop elements smaller than current',
        'Calculate the difference in indices',
        'Push current index onto stack'
      ]
    },
    hints: [
      'Use a monotonic stack',
      'Store indices, not values',
      'Process elements and pop smaller ones'
    ]
  },
  {
    id: 'sq-sliding-window-max',
    title: 'Sliding Window Maximum',
    difficulty: 'Hard',
    description: 'Find the maximum value in each sliding window of size k.',
    examples: [
      {
        input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3',
        output: '[3,3,5,5,6,7]',
        explanation: 'Max of each window'
      }
    ],
    solution: {
      approach: 'Use a deque to maintain elements in decreasing order',
      code: `function maxSlidingWindow(nums: number[], k: number): number[] {
  const deque: number[] = [];
  const result: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    // Remove elements outside window
    while (deque.length > 0 && deque[0] < i - k + 1) {
      deque.shift();
    }

    // Remove smaller elements
    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }

    deque.push(i);

    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(k)',
      stepByStep: [
        'Use a deque to maintain decreasing order',
        'Remove indices outside current window',
        'Remove elements smaller than current',
        'Add current index to deque',
        'Maximum is always at front'
      ]
    },
    hints: [
      'Use deque for optimal solution',
      'Store indices in deque',
      'Maintain decreasing order'
    ]
  },
  {
    id: 'sq-min-stack',
    title: 'Min Stack',
    difficulty: 'Medium',
    description: 'Implement a stack that supports push, pop, top, and retrieving minimum in O(1).',
    examples: [
      {
        input: 'push(1), push(0), push(-3), getMin(), pop(), top(), getMin()',
        output: '[-3, 0, -3]',
        explanation: 'Operations return min values and top'
      }
    ],
    solution: {
      approach: 'Use two stacks: one for elements, one for minimums',
      code: `class MinStack {
  stack: number[];
  minStack: number[];

  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(val: number): void {
    this.stack.push(val);
    if (
      this.minStack.length === 0 ||
      val <= this.minStack[this.minStack.length - 1]
    ) {
      this.minStack.push(val);
    }
  }

  pop(): void {
    if (this.stack.pop() === this.minStack[this.minStack.length - 1]) {
      this.minStack.pop();
    }
  }

  top(): number {
    return this.stack[this.stack.length - 1];
  }

  getMin(): number {
    return this.minStack[this.minStack.length - 1];
  }
}`,
      timeComplexity: 'O(1) for all operations',
      spaceComplexity: 'O(n)',
      stepByStep: [
        'Maintain main stack for all elements',
        'Maintain min stack tracking minimum',
        'Push to min stack only if smaller or equal',
        'Pop from min stack when removing min'
      ]
    },
    hints: [
      'Use two stacks',
      'Synchronize pop operations',
      'Track minimum at each step'
    ]
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    description: 'Determine if the input string has valid parentheses.',
    examples: [
      {
        input: 's = "()"',
        output: 'true'
      },
      {
        input: 's = "(]"',
        output: 'false'
      },
      {
        input: 's = "()[]{}"',
        output: 'true'
      },
      {
        input: 's = "(())"',
        output: 'true'
      },
      {
        input: 's = "([)]"',
        output: 'false',
        explanation: 'Opening bracket "[" is closed by ")" but should be closed by "]"'
      }
    ],
    solution: {
      approach: 'Use a stack to track opening brackets and match with closing ones',
      code: `function isValid(s: string): boolean {
  const stack: string[] = [];
  const map = new Map<string, string>([
    [')', '('],
    ['}', '{'],
    [']', '[']
  ]);

  for (const char of s) {
    if (map.has(char)) {
      const top = stack.pop();
      if (top !== map.get(char)) return false;
    } else {
      stack.push(char);
    }
  }

  return stack.length === 0;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      stepByStep: [
        'Create a stack and a map of closing to opening brackets',
        'For each character, if closing bracket, check if matches stack top',
        'If opening bracket, push to stack',
        'At end, stack should be empty'
      ]
    },
    hints: [
      'Stack is perfect for LIFO matching',
      'Use a map for bracket pairs',
      'Check stack emptiness at end'
    ]
  }
];

