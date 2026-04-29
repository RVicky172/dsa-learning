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
  },
  // ── NEW BATCH (TKT-016) ──────────────────────────────────────────
  {
    id: 'sq-implement-queue-stacks',
    title: 'Implement Queue using Stacks',
    difficulty: 'Easy',
    description: 'Implement a first-in first-out (FIFO) queue using only two stacks. The queue should support push, pop, peek, and empty operations.',
    examples: [
      { input: '["MyQueue","push","push","peek","pop","empty"] [[],[1],[2],[],[],[]]', output: '[null,null,null,1,1,false]' }
    ],
    solution: {
      approach: 'Two stacks: pushStack for enqueue, popStack for dequeue. Transfer all from pushStack to popStack lazily when popStack is empty.',
      code: `class MyQueue {
  private pushStack: number[] = [];
  private popStack: number[] = [];

  push(x: number): void {
    this.pushStack.push(x);
  }

  private transfer(): void {
    if (this.popStack.length === 0) {
      while (this.pushStack.length > 0) {
        this.popStack.push(this.pushStack.pop()!);
      }
    }
  }

  pop(): number {
    this.transfer();
    return this.popStack.pop()!;
  }

  peek(): number {
    this.transfer();
    return this.popStack[this.popStack.length - 1];
  }

  empty(): boolean {
    return this.pushStack.length === 0 && this.popStack.length === 0;
  }
}`,
      timeComplexity: 'Amortized O(1) per operation',
      spaceComplexity: 'O(n)',
      stepByStep: [
        'Push always goes to pushStack',
        'Pop/peek: if popStack is empty, move everything from pushStack to popStack',
        'This reversal turns LIFO into FIFO',
        'Each element is transferred at most once',
        'empty returns true only when both stacks are empty'
      ]
    },
    hints: ['Transfer lazily: only move elements when popStack is empty.', 'Each element crosses stacks exactly once, giving amortized O(1).']
  },
  {
    id: 'sq-backspace-compare',
    title: 'Backspace String Compare',
    difficulty: 'Easy',
    description: 'Given two strings s and t where # means a backspace, return true if they are equal after processing all backspaces.',
    examples: [
      { input: 's = "ab#c", t = "ad#c"', output: 'true', explanation: 'Both become "ac".' },
      { input: 's = "ab##", t = "c#d#"', output: 'true', explanation: 'Both become "".' }
    ],
    solution: {
      approach: 'Two-pointer from the end of both strings: skip characters as needed using a backspace counter.',
      code: `function backspaceCompare(s: string, t: string): boolean {
  let i = s.length - 1;
  let j = t.length - 1;
  let skipS = 0;
  let skipT = 0;
  while (i >= 0 || j >= 0) {
    while (i >= 0) {
      if (s[i] === '#') { skipS++; i--; }
      else if (skipS > 0) { skipS--; i--; }
      else break;
    }
    while (j >= 0) {
      if (t[j] === '#') { skipT++; j--; }
      else if (skipT > 0) { skipT--; j--; }
      else break;
    }
    if (i >= 0 && j >= 0 && s[i] !== t[j]) return false;
    if ((i >= 0) !== (j >= 0)) return false;
    i--;
    j--;
  }
  return true;
}`,
      timeComplexity: 'O(n + m)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Use two pointers starting from the end of both strings',
        'For each pointer, count # characters to skip real characters',
        'Advance past skipped characters',
        'Compare the current real characters from both strings',
        'Mismatch in characters or length means not equal'
      ]
    },
    hints: ['Work backwards to process backspaces without extra space.', 'Track a skip counter for each string.']
  },
  {
    id: 'sq-decode-string',
    title: 'Decode String',
    difficulty: 'Medium',
    description: 'Given an encoded string, return its decoded string. Encoding rule: k[encoded_string] means the encoded_string is repeated k times. k is always positive.',
    examples: [
      { input: 's = "3[a]2[bc]"', output: '"aaabcbc"' },
      { input: 's = "3[a2[c]]"', output: '"accaccacc"' }
    ],
    solution: {
      approach: 'Stack-based: push current string and current count when encountering [, pop and repeat when encountering ].',
      code: `function decodeString(s: string): string {
  const countStack: number[] = [];
  const strStack: string[] = [];
  let current = '';
  let k = 0;
  for (const ch of s) {
    if (ch >= '0' && ch <= '9') {
      k = k * 10 + Number(ch);
    } else if (ch === '[') {
      countStack.push(k);
      strStack.push(current);
      current = '';
      k = 0;
    } else if (ch === ']') {
      const repeat = countStack.pop()!;
      const prev = strStack.pop()!;
      current = prev + current.repeat(repeat);
    } else {
      current += ch;
    }
  }
  return current;
}`,
      timeComplexity: 'O(n * k_max)',
      spaceComplexity: 'O(n)',
      stepByStep: [
        'Maintain a current string and a current number k',
        'On [: push k and current onto stacks, reset both',
        'On ]: pop repeat count and previous string, build current = prev + current.repeat(count)',
        'On digit: accumulate k (handle multi-digit)',
        'On letter: append to current'
      ]
    },
    hints: ['Think of each [ as a save point and each ] as a restore-and-repeat.', 'Multi-digit numbers: k = k * 10 + digit.']
  },
  {
    id: 'sq-asteroid-collision',
    title: 'Asteroid Collision',
    difficulty: 'Medium',
    description: 'An array represents asteroids in a row. Each value is its size; sign indicates direction (positive = right, negative = left). When two asteroids collide, the smaller explodes. If equal, both explode. Return the state after all collisions.',
    examples: [
      { input: 'asteroids = [5,10,-5]', output: '[5,10]', explanation: '-5 and 10 collide; 10 survives.' },
      { input: 'asteroids = [8,-8]', output: '[]', explanation: 'Equal size, both explode.' },
      { input: 'asteroids = [10,2,-5]', output: '[10]', explanation: '2 and -5 collide, -5 wins; then -5 and 10 collide, 10 wins.' }
    ],
    solution: {
      approach: 'Stack: push each asteroid. On each negative asteroid, compare with the top of the stack (a positive-going asteroid) and resolve.',
      code: `function asteroidCollision(asteroids: number[]): number[] {
  const stack: number[] = [];
  for (const a of asteroids) {
    let survived = true;
    while (survived && a < 0 && stack.length > 0 && stack[stack.length - 1] > 0) {
      const top = stack[stack.length - 1];
      if (top < -a) {
        stack.pop(); // top explodes
      } else if (top === -a) {
        stack.pop(); // both explode
        survived = false;
      } else {
        survived = false; // current asteroid explodes
      }
    }
    if (survived) stack.push(a);
  }
  return stack;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      stepByStep: [
        'Process each asteroid left to right',
        'Collision only when stack top is positive and current is negative',
        'If top < |current|, top explodes — pop and continue',
        'If equal, both explode — pop and mark current as not survived',
        'If top > |current|, current explodes — mark not survived'
      ]
    },
    hints: ['Collisions only happen when a right-moving asteroid (top of stack) meets a left-moving one.', 'Loop to handle chain explosions.']
  },
  {
    id: 'sq-next-greater-element',
    title: 'Next Greater Element I',
    difficulty: 'Medium',
    description: 'Given two arrays nums1 and nums2 where nums1 is a subset of nums2, for each element in nums1 find the next greater element in nums2. Return -1 if none exists.',
    examples: [
      { input: 'nums1 = [4,1,2], nums2 = [1,3,4,2]', output: '[-1,3,-1]' },
      { input: 'nums1 = [2,4], nums2 = [1,2,3,4]', output: '[3,-1]' }
    ],
    solution: {
      approach: 'Monotonic stack on nums2: build a map from value to next greater element, then look up each nums1 value.',
      code: `function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
  const nextGreater = new Map<number, number>();
  const stack: number[] = [];
  for (const num of nums2) {
    while (stack.length > 0 && stack[stack.length - 1] < num) {
      nextGreater.set(stack.pop()!, num);
    }
    stack.push(num);
  }
  return nums1.map(n => nextGreater.get(n) ?? -1);
}`,
      timeComplexity: 'O(n + m)',
      spaceComplexity: 'O(n)',
      stepByStep: [
        'Use a monotonic decreasing stack for nums2',
        'When a larger number is found, pop smaller numbers from stack and record them in the map',
        'Remaining numbers in stack have no next greater element',
        'Look up each nums1 element in the map',
        'Return -1 if not found'
      ]
    },
    hints: ['Monotonic stack processes each element at most twice.', 'Build the map from nums2 first, then answer nums1 queries.']
  },
  {
    id: 'sq-largest-rectangle-histogram',
    title: 'Largest Rectangle in Histogram',
    difficulty: 'Hard',
    description: 'Given an array of integers heights representing the histogram bar heights, return the area of the largest rectangle in the histogram.',
    examples: [
      { input: 'heights = [2,1,5,6,2,3]', output: '10', explanation: 'Largest rectangle has height 5 and spans indices 2-3.' },
      { input: 'heights = [2,4]', output: '4' }
    ],
    solution: {
      approach: 'Monotonic increasing stack: for each bar, pop shorter bars and compute the maximum rectangle they could form.',
      code: `function largestRectangleArea(heights: number[]): number {
  const stack: number[] = []; // indices
  let maxArea = 0;
  const n = heights.length;
  for (let i = 0; i <= n; i++) {
    const h = i === n ? 0 : heights[i];
    while (stack.length > 0 && h < heights[stack[stack.length - 1]]) {
      const height = heights[stack.pop()!];
      const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, height * width);
    }
    stack.push(i);
  }
  return maxArea;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      stepByStep: [
        'Maintain a monotonic increasing stack of bar indices',
        'When a shorter bar is encountered, pop taller bars',
        'For each popped bar, compute its max rectangle width using the stack top as left boundary',
        'Append a sentinel bar of height 0 to flush remaining bars',
        'Track and return the maximum area'
      ]
    },
    hints: ['Append a 0-height bar at the end to trigger processing all remaining stack elements.', 'Width extends from the new stack top + 1 to the current index - 1.']
  }
];

