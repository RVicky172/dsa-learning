import type { Topic } from '../../types/topic';
import React from 'react';
import { Layers } from 'lucide-react';

export const stacksQueuesTopic: Topic = {
  id: 'stacks-queues',
  title: 'Stacks & Queues',
  description: 'LIFO and FIFO data structures for sequential processing and problem solving.',
  complexity: 'O(1) Operations',
  icon: React.createElement(Layers, { size: 24 }),
  delay: 0.6,

  introduction: `Stacks and queues are fundamental abstract data types that restrict how elements are accessed, making them perfect for specific use cases. 

**Stacks (LIFO - Last In First Out):** The most recently added element is removed first. Think of a stack of plates - you add and remove from the top. Essential for: undo/redo functionality, function call management, expression evaluation, and depth-first traversal.

**Queues (FIFO - First In First Out):** Elements are processed in the order they were added, like a line at a grocery store. Essential for: breadth-first search, task scheduling, event handling, and message processing.

**Deques & Priority Queues:** Advanced variants that provide more flexibility - deques allow operations from both ends, while priority queues process elements based on priority rather than insertion order.`,

  whyImportant: `Stacks and queues are among the most important data structures in computer science. They appear in:
- Every programming language's runtime (function call stack)
- Graph algorithms (BFS with queue, DFS with stack)
- Browser history and undo systems
- Job scheduling and task management
- Compiler design and expression parsing
Understanding them is critical for interview preparation and system design.`,

  whenToUse: [
    'Undo/redo functionality in applications (Stack)',
    'Expression evaluation and parsing (Stack)',
    'Function call management in programming languages (Stack)',
    'Breadth-first search in graphs and trees (Queue)',
    'Task scheduling and job queues (Queue)',
    'Event handling and callbacks in event-driven systems (Queue)',
    'Deque: sliding window problems, bidirectional processing',
    'Priority Queue: task scheduling with priorities, Dijkstra\'s algorithm'
  ],

  advantages: [
    'O(1) constant time for push/pop or enqueue/dequeue operations',
    'Simple and intuitive implementations',
    'Perfect for problems with specific ordering requirements',
    'Can implement using arrays or linked lists',
    'Excellent for memory-constrained systems with linked list implementation',
    'Natural fit for recursive algorithms and backtracking',
    'Built-in support in most programming languages'
  ],

  disadvantages: [
    'Limited access pattern (cannot access middle elements efficiently)',
    'No search capability without removing all elements',
    'Not suitable for random access needs',
    'Can waste memory if size varies significantly',
    'LIFO/FIFO restriction eliminates flexibility',
    'Priority queue implementation adds complexity'
  ],

  concepts: [
    {
      name: 'Stack (LIFO)',
      description: 'Last In First Out - the most recently added element is removed first. Like a stack of plates or a browser back button. Perfect for problems requiring reverse order or matching.'
    },
    {
      name: 'Queue (FIFO)',
      description: 'First In First Out - elements are processed in the order they were added. Like a line at a store or print queue. Perfect for maintaining order.'
    },
    {
      name: 'Deque (Double-Ended Queue)',
      description: 'Allows insertion and deletion from both ends. Combines stack and queue properties for more flexibility.'
    },
    {
      name: 'Priority Queue',
      description: 'Elements are processed based on priority, not insertion order. Usually implemented using a heap. Critical for optimized algorithms.'
    },
    {
      name: 'Monotonic Stack',
      description: 'Maintains elements in increasing or decreasing order. Enables O(n) solutions to problems that seem to require O(n²).'
    },
    {
      name: 'Call Stack',
      description: 'Every programming language uses a stack to manage function calls. Understanding this is crucial for grasping recursion.'
    },
    {
      name: 'Stack Overflow',
      description: 'Occurs when recursion goes too deep and exhausts the call stack. Understanding limits helps write correct algorithms.'
    }
  ],

  examples: [
    {
      title: 'Stack Implementation & Operations',
      language: 'typescript',
      code: `class Stack<T> {
  private items: T[] = [];
  
  // Add element to top
  push(item: T): void {
    this.items.push(item);
  }
  
  // Remove and return top element
  pop(): T | undefined {
    return this.items.pop();
  }
  
  // View top element without removing
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }
  
  // Check if empty
  isEmpty(): boolean {
    return this.items.length === 0;
  }
  
  // Get stack size
  size(): number {
    return this.items.length;
  }
  
  // Clear entire stack
  clear(): void {
    this.items = [];
  }
}

// Stack with array implementation
const stack = new Stack<number>();
stack.push(10);
stack.push(20);
stack.push(30);
console.log(stack.peek()); // 30
console.log(stack.pop());  // 30
console.log(stack.size()); // 2`,
      explanation: 'Basic stack implementation. Arrays make it simple because we can use built-in push/pop. In interviews, you often need to implement custom stacks with arrays.',
      timeComplexity: 'All operations O(1)',
      spaceComplexity: 'O(n) for n elements'
    },
    {
      title: 'Valid Parentheses Using Stack',
      language: 'typescript',
      code: `function isValidParentheses(s: string): boolean {
  const stack: string[] = [];
  const map: {[key: string]: string} = {
    '(': ')',
    '{': '}',
    '[': ']'
  };
  
  for (const char of s) {
    if (map[char]) {
      // Opening bracket - push to stack
      stack.push(char);
    } else {
      // Closing bracket - must match top of stack
      if (stack.length === 0 || map[stack.pop()!] !== char) {
        return false;
      }
    }
  }
  
  // Stack must be empty at end
  return stack.length === 0;
}

// Test cases
console.log(isValidParentheses("()[]{}"));        // true
console.log(isValidParentheses("([{}])"));        // true
console.log(isValidParentheses("([)]"));          // false
console.log(isValidParentheses("{[}"));           // false`,
      explanation: 'Stacks are perfect for matching problems. Each opening bracket is pushed. Closing brackets must match the top. If stack isn\'t empty at end, invalid.',
      timeComplexity: 'O(n) single pass',
      spaceComplexity: 'O(n) for stack'
    },
    {
      title: 'Queue Implementation & Operations',
      language: 'typescript',
      code: `class Queue<T> {
  private items: T[] = [];
  
  // Add to end (rear)
  enqueue(item: T): void {
    this.items.push(item);
  }
  
  // Remove from front (head)
  dequeue(): T | undefined {
    return this.items.shift();
  }
  
  // View front element
  peek(): T | undefined {
    return this.items[0];
  }
  
  // Check if empty
  isEmpty(): boolean {
    return this.items.length === 0;
  }
  
  // Get size
  size(): number {
    return this.items.length;
  }
}

// Optimized Queue using circular buffer concept
class OptimizedQueue<T> {
  private items: T[] = [];
  private front = 0;
  
  enqueue(item: T): void {
    this.items.push(item);
  }
  
  dequeue(): T | undefined {
    if (this.front < this.items.length) {
      return this.items[this.front++];
    }
    return undefined;
  }
  
  peek(): T | undefined {
    return this.items[this.front];
  }
}`,
      explanation: 'Queue implementation. Note: using shift() is O(n). Better to use two pointers or linked list for production. Dequeue removes from front, enqueue adds to back.',
      timeComplexity: 'Enqueue O(1), Dequeue O(n) with shift',
      spaceComplexity: 'O(n) for n elements'
    },
    {
      title: 'Monotonic Stack - Next Greater Element',
      language: 'typescript',
      code: `// Find next greater element for each element
function nextGreaterElement(nums: number[]): number[] {
  const result = new Array(nums.length).fill(-1);
  const stack: number[] = []; // Store indices
  
  for (let i = nums.length - 1; i >= 0; i--) {
    // Pop smaller elements from stack
    while (stack.length > 0 && nums[stack[stack.length - 1]] <= nums[i]) {
      stack.pop();
    }
    
    // Top of stack is next greater (or -1 if none)
    if (stack.length > 0) {
      result[i] = nums[stack[stack.length - 1]];
    }
    
    // Push current index to stack
    stack.push(i);
  }
  
  return result;
}

// Example: [1,2,1] -> [2,-1,-1]
// For 1 at index 0: next greater is 2
// For 2 at index 1: no greater element
// For 1 at index 2: no greater element

// Largest Rectangle in Histogram using Monotonic Stack
function largestRectangleArea(heights: number[]): number {
  const stack: number[] = []; // Store indices of heights in increasing order
  let maxArea = 0;
  
  for (let i = 0; i < heights.length; i++) {
    while (stack.length > 0 && heights[stack[stack.length - 1]] > heights[i]) {
      const h = heights[stack.pop()!];
      const w = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, h * w);
    }
    stack.push(i);
  }
  
  while (stack.length > 0) {
    const h = heights[stack.pop()!];
    const w = stack.length === 0 ? heights.length : heights.length - stack[stack.length - 1] - 1;
    maxArea = Math.max(maxArea, h * w);
  }
  
  return maxArea;
}`,
      explanation: 'Monotonic stacks maintain increasing/decreasing order. This enables O(n) solutions. Stack stores indices. When we find a smaller element, we calculate areas using popped height.',
      timeComplexity: 'O(n) despite nested loops - each element pushed/popped once',
      spaceComplexity: 'O(n) for stack'
    },
    {
      title: 'Deque & Sliding Window Maximum',
      language: 'typescript',
      code: `class Deque<T> {
  private items: T[] = [];
  
  addFront(item: T): void {
    this.items.unshift(item);
  }
  
  addBack(item: T): void {
    this.items.push(item);
  }
  
  removeFront(): T | undefined {
    return this.items.shift();
  }
  
  removeBack(): T | undefined {
    return this.items.pop();
  }
  
  front(): T | undefined {
    return this.items[0];
  }
  
  back(): T | undefined {
    return this.items[this.items.length - 1];
  }
  
  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

// Sliding window maximum using deque
function slidingWindowMaximum(nums: number[], k: number): number[] {
  const deque: number[] = []; // Store indices of useful elements
  const result: number[] = [];
  
  for (let i = 0; i < nums.length; i++) {
    // Remove elements outside window
    while (deque.length > 0 && deque[0] < i - k + 1) {
      deque.shift();
    }
    
    // Remove elements smaller than current
    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }
    
    deque.push(i);
    
    // Add to result when window is full
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }
  
  return result;
}

// Example: nums = [1,3,-1,-3,5,3,6,7], k = 3
// Output: [3,3,5,5,6,7]
// [1,3,-1] -> max = 3
// [3,-1,-3] -> max = 3
// [-1,-3,5] -> max = 5, etc.`,
      explanation: 'Deque maintains indices in decreasing order of values. Front always has the maximum for current window. Enables O(n) solution where naive approach would be O(nk).',
      timeComplexity: 'O(n) - each element added/removed once',
      spaceComplexity: 'O(k) for deque in worst case'
    }
  ],

  patterns: [
    {
      name: 'Stack for Matching/Nesting',
      description: 'Use stack when you need to match pairs or handle nesting. Push opening symbols, pop when closing.',
      technique: 'Push opening items, match with closing items, verify stack empty at end',
      example: 'Parentheses matching, nested structures, HTML tag matching',
      whenToUse: ['Parentheses validation', 'Nested structure problems', 'Expression parsing']
    },
    {
      name: 'Monotonic Stack',
      description: 'Maintain stack in increasing or decreasing order to solve problems efficiently.',
      technique: 'Pop elements smaller/larger than current before pushing. Stack stores indices.',
      example: 'Next greater element, largest rectangle, trapping rain water',
      whenToUse: ['Next/Previous greater/smaller element', 'Efficiency problems that seem O(n²)', 'Histogram problems']
    },
    {
      name: 'Queue for BFS/Level-Order',
      description: 'Use queue to explore nodes level by level in graphs/trees.',
      technique: 'Enqueue starting node, dequeue to process, enqueue neighbors',
      example: 'Level-order traversal, shortest path, connected components',
      whenToUse: ['Breadth-first search', 'Level-by-level traversal', 'Shortest path in unweighted graph']
    },
    {
      name: 'Deque for Sliding Window',
      description: 'Use deque to maintain candidates for sliding window problems.',
      technique: 'Deque stores indices in useful order, remove outdated and dominated elements',
      example: 'Maximum/minimum in sliding window, two-ended problems',
      whenToUse: ['Sliding window with min/max queries', 'Bidirectional processing', 'Palindrome checking']
    },
    {
      name: 'Stack for DFS/Recursion',
      description: 'Stack is the underlying mechanism for depth-first search and recursion.',
      technique: 'Push children onto stack, process in LIFO order, naturally handles backtracking',
      example: 'DFS traversal, topological sort, backtracking problems',
      whenToUse: ['When recursion is natural but stack overflow risk', 'Iterative DFS', 'Complex backtracking']
    },
    {
      name: 'Priority Queue',
      description: 'Use for problems where elements must be processed by priority, not insertion order.',
      technique: 'Typically implemented as min-heap or max-heap. Insert/delete elements by priority.',
      example: 'Dijkstra\'s algorithm, heap sort, merge sorted lists',
      whenToUse: ['Shortest path with weights', 'K-largest/smallest elements', 'Task scheduling with priorities']
    }
  ],

  problems: [
    {
      id: 'valid-parentheses',
      title: 'Valid Parentheses',
      difficulty: 'Easy',
      description: 'Given a string containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid. An input string is valid if: 1) Open brackets must be closed by the same type of brackets. 2) Open brackets must be closed in the correct order.',
      solution: {
        approach: 'Use stack to track opening brackets. When closing bracket found, it must match top of stack.',
        stepByStep: [
          'Create empty stack',
          'For each character in string',
          'If opening bracket, push to stack',
          'If closing bracket, check if top matches. If not, return false',
          'Return true only if stack is empty at end'
        ],
        code: `function isValid(s: string): boolean {
  const stack: string[] = [];
  const pairs: {[key: string]: string} = {'(': ')', '{': '}', '[': ']'};
  
  for (const char of s) {
    if (pairs[char]) stack.push(char);
    else if (stack.length === 0 || pairs[stack.pop()!] !== char) return false;
  }
  
  return stack.length === 0;
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)'
      },
      hints: ['Think about matching pairs', 'Stack is perfect for nesting problems'],
      examples: [
        { input: '"()"', output: 'true' },
        { input: '"()[]{}"', output: 'true' },
        { input: '"([)]"', output: 'false' }
      ]
    },
    {
      id: 'queue-using-stacks',
      title: 'Implement Queue using Stacks',
      difficulty: 'Easy',
      description: 'Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, pop, peek, empty).',
      solution: {
        approach: 'Use two stacks - one for enqueue, one for dequeue. Transfer when dequeue stack empty.',
        stepByStep: [
          'Create two stacks: stackPush and stackPop',
          'Enqueue: always push to stackPush',
          'Dequeue: if stackPop empty, move all from stackPush (reverses order)',
          'Pop from stackPop for FIFO behavior'
        ],
        code: `class MyQueue {
  private pushStack: number[] = [];
  private popStack: number[] = [];
  
  push(x: number): void {
    this.pushStack.push(x);
  }
  
  pop(): number {
    if (this.popStack.length === 0) {
      while (this.pushStack.length > 0) {
        this.popStack.push(this.pushStack.pop()!);
      }
    }
    return this.popStack.pop()!;
  }
  
  peek(): number {
    if (this.popStack.length === 0) {
      while (this.pushStack.length > 0) {
        this.popStack.push(this.pushStack.pop()!);
      }
    }
    return this.popStack[this.popStack.length - 1];
  }
  
  empty(): boolean {
    return this.pushStack.length === 0 && this.popStack.length === 0;
  }
}`,
        timeComplexity: 'O(1) amortized',
        spaceComplexity: 'O(n)'
      },
      hints: ['Two stacks can simulate queue behavior', 'Reversing order is key'],
      examples: [
        { input: 'push(1), push(2), pop() -> 1', output: 'true' }
      ]
    },
    {
      id: 'next-greater-element',
      title: 'Next Greater Element',
      difficulty: 'Medium',
      description: 'Given an array, for each element, find the next greater element. The next greater element of element x in array arr is the first element to the right of x that is greater than x. If no such element exists, output -1 for that number.',
      solution: {
        approach: 'Use monotonic stack scanning right to left. Stack maintains indices in decreasing order.',
        stepByStep: [
          'Create result array filled with -1',
          'Create empty stack for indices',
          'Scan array from right to left',
          'Pop all elements smaller than current',
          'Top of stack is next greater (if exists)',
          'Push current index'
        ],
        code: `function nextGreaterElement(nums: number[]): number[] {
  const result = new Array(nums.length).fill(-1);
  const stack: number[] = [];
  
  for (let i = nums.length - 1; i >= 0; i--) {
    while (stack.length > 0 && nums[stack[stack.length - 1]] <= nums[i]) {
      stack.pop();
    }
    if (stack.length > 0) {
      result[i] = nums[stack[stack.length - 1]];
    }
    stack.push(i);
  }
  
  return result;
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)'
      },
      hints: ['Monotonic stack is key for O(n)', 'Scan right to left', 'Store indices, not values'],
      examples: [
        { input: '[1,2,1]', output: '[2,-1,-1]' },
        { input: '[6,7,11]', output: '[7,11,-1]' }
      ]
    },
    {
      id: 'sliding-window-max',
      title: 'Sliding Window Maximum',
      difficulty: 'Hard',
      description: 'You are given an array of integers and a window size k. For each position, find the maximum element in the window of size k sliding from left to right.',
      solution: {
        approach: 'Use deque to maintain useful elements in decreasing order. Front always has maximum.',
        stepByStep: [
          'Create deque for indices',
          'For each element in array',
          'Remove indices outside window',
          'Remove indices of elements smaller than current',
          'Front of deque is maximum for current window',
          'Add current index to deque'
        ],
        code: `function maxSlidingWindow(nums: number[], k: number): number[] {
  const deque: number[] = [];
  const result: number[] = [];
  
  for (let i = 0; i < nums.length; i++) {
    while (deque.length > 0 && deque[0] < i - k + 1) {
      deque.shift();
    }
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
        spaceComplexity: 'O(k)'
      },
      hints: ['Deque maintains decreasing order', 'Remove outdated and smaller elements', 'O(n) solution not O(nk)'],
      examples: [
        { input: 'nums=[1,3,-1,-3,5,3,6,7], k=3', output: '[3,3,5,5,6,7]' }
      ]
    },
    {
      id: 'lru-cache',
      title: 'LRU Cache',
      difficulty: 'Medium',
      description: 'Implement an LRU (Least Recently Used) cache. It should support get(key) and put(key, value) operations, both in O(1) average time complexity. When capacity is exceeded, remove the least recently used item.',
      solution: {
        approach: 'Combine HashMap for O(1) access and Doubly Linked List for O(1) ordering.',
        stepByStep: [
          'Create HashMap to store key->node mapping',
          'Create Doubly Linked List for LRU order',
          'On get: return value, move node to end (most recent)',
          'On put: update if exists (move to end), else create new',
          'Remove least recently used (head) when capacity exceeded'
        ],
        code: `class LRUCache {
  private cache = new Map<number, number>();
  private order: number[] = [];
  
  constructor(private capacity: number) {}
  
  get(key: number): number {
    if (!this.cache.has(key)) return -1;
    
    this.order = this.order.filter(k => k !== key);
    this.order.push(key);
    
    return this.cache.get(key)!;
  }
  
  put(key: number, value: number): void {
    if (this.cache.has(key)) {
      this.order = this.order.filter(k => k !== key);
    } else if (this.order.length >= this.capacity) {
      const lru = this.order.shift()!;
      this.cache.delete(lru);
    }
    
    this.cache.set(key, value);
    this.order.push(key);
  }
}`,
        timeComplexity: 'O(n) for order array filtering (ideally O(1) with doubly linked list)',
        spaceComplexity: 'O(capacity)'
      },
      hints: ['Need both HashMap and LinkedList', 'Track recency to implement LRU'],
      examples: [
        { input: 'capacity=2, put(1,1), put(2,2), get(1)', output: '1' }
      ]
    }
  ],

  operations: [
    { name: 'Stack Push', complexity: 'O(1)' },
    { name: 'Stack Pop', complexity: 'O(1)' },
    { name: 'Stack Peek', complexity: 'O(1)' },
    { name: 'Queue Enqueue', complexity: 'O(1)' },
    { name: 'Queue Dequeue', complexity: 'O(1) with proper impl' },
    { name: 'Deque addFront', complexity: 'O(1)' },
    { name: 'Deque removeFront', complexity: 'O(1)' },
    { name: 'Priority Queue Insert', complexity: 'O(log n)' },
    { name: 'Priority Queue Extract', complexity: 'O(log n)' }
  ],

  applications: [
    {
      name: 'Undo/Redo Functionality',
      description: 'Every text editor, photo app, and IDE implements undo/redo using stacks. Undo stack stores previous states, redo stack stores what was undone.',
      example: 'Google Docs, Photoshop, VS Code - Ctrl+Z uses stack'
    },
    {
      name: 'Function Call Stack',
      description: 'Every programming language runtime uses a call stack to manage function calls, local variables, and return addresses. Stack overflow occurs when recursion goes too deep.',
      example: 'JavaScript call stack, Python stack traces, Java stack overflow'
    },
    {
      name: 'Breadth-First Search (BFS)',
      description: 'Queues are essential for BFS algorithms in graphs and trees. Process nodes level by level.',
      example: 'Finding shortest path in unweighted graph, level-order tree traversal'
    },
    {
      name: 'Message Queue Systems',
      description: 'Production systems use queues for asynchronous processing. RabbitMQ, AWS SQS, Kafka all use queue principles.',
      example: 'Email processing, task scheduling, event streaming'
    },
    {
      name: 'Browser History',
      description: 'Browser uses stack for back button and queue for forward button. Each page visit is pushed onto stack.',
      example: 'Browser back button uses stack of visited URLs'
    },
    {
      name: 'Expression Parsing',
      description: 'Compilers and calculators use stacks to evaluate expressions and handle operator precedence.',
      example: 'Evaluating infix expressions, converting to postfix (RPN)'
    },
    {
      name: 'Printer Queue',
      description: 'Print jobs are queued in order. Multiple users submit jobs, printer processes them FIFO.',
      example: 'Print spooler in operating systems'
    }
  ]
};
