import type { Problem } from '../types/topic';

// New problems to add to each topic

export const arrayProblems: Problem[] = [
  {
    id: 'merge-sorted-arrays',
    title: 'Merge Sorted Arrays',
    difficulty: 'Easy',
    description: 'Merge two sorted arrays into one sorted array without using extra space (modify in place).',
    examples: [
      {
        input: 'nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3',
        output: '[1,2,2,3,5,6]'
      }
    ],
    solution: {
      approach: 'Use two pointers from the end of both arrays and fill nums1 from back to front',
      code: `function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  let p1 = m - 1;
  let p2 = n - 1;
  let p = m + n - 1;

  while (p1 >= 0 && p2 >= 0) {
    if (nums1[p1] > nums2[p2]) {
      nums1[p] = nums1[p1];
      p1--;
    } else {
      nums1[p] = nums2[p2];
      p2--;
    }
    p--;
  }

  while (p2 >= 0) {
    nums1[p] = nums2[p2];
    p2--;
    p--;
  }
}`,
      timeComplexity: 'O(m + n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Start from the end of both arrays',
        'Compare elements and place larger one at the end of nums1',
        'Move the pointer of the array from which we took the element',
        'Continue until one array is exhausted',
        'If nums2 has remaining elements, copy them'
      ]
    },
    hints: [
      'Work backwards from the end of the arrays',
      'Compare elements at the end of each array',
      'Place the larger element at the end of nums1'
    ]
  },
  {
    id: 'remove-duplicates',
    title: 'Remove Duplicates from Sorted Array',
    difficulty: 'Easy',
    description: 'Remove duplicates from a sorted array in-place and return the number of unique elements.',
    examples: [
      {
        input: 'nums = [1,1,2]',
        output: 'k = 2, nums = [1,2,_]',
        explanation: 'Return 2 with the first two elements being 1 and 2'
      }
    ],
    solution: {
      approach: 'Use two pointers: one for iteration, one for unique element position',
      code: `function removeDuplicates(nums: number[]): number {
  if (nums.length === 0) return 0;

  let writePointer = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[writePointer] = nums[i];
      writePointer++;
    }
  }

  return writePointer;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Start with writePointer at index 1',
        'Compare each element with the previous one',
        'If different, place it at writePointer position and increment',
        'Return the count of unique elements'
      ]
    },
    hints: [
      'Use two pointers technique',
      'Compare consecutive elements',
      'Track the position for the next unique element'
    ]
  },
  {
    id: 'search-rotated-array',
    title: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    description: 'Search for a target value in a rotated sorted array. Array was originally sorted then rotated.',
    examples: [
      {
        input: 'nums = [4,5,6,7,0,1,2], target = 0',
        output: '4',
        explanation: 'Target 0 is at index 4'
      }
    ],
    solution: {
      approach: 'Use binary search, determine which half is sorted and narrow down the search space',
      code: `function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) return mid;

    // Determine which half is sorted
    if (nums[left] <= nums[mid]) {
      // Left half is sorted
      if (target >= nums[left] && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // Right half is sorted
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
}`,
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Use binary search with modified logic',
        'Determine which half of the array is sorted',
        'Check if target is in the sorted half',
        'Narrow search space accordingly',
        'Repeat until target found or array exhausted'
      ]
    },
    hints: [
      'Use binary search',
      'One of the two halves is always sorted',
      'Check if target exists in the sorted half'
    ]
  },
  {
    id: 'trapping-rain-water',
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    description: 'Given an elevation map represented by array, compute how much water it can trap after raining.',
    examples: [
      {
        input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
        output: '6',
        explanation: 'Total trapped water is 6 units'
      }
    ],
    solution: {
      approach: 'Use two pointers to track max heights from left and right, calculate trapped water',
      code: `function trap(height: number[]): number {
  if (height.length < 3) return 0;

  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        water += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        water += rightMax - height[right];
      }
      right--;
    }
  }

  return water;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Use two pointers from ends moving inward',
        'Track maximum height seen so far from left and right',
        'Water trapped at position = min(leftMax, rightMax) - height[i]',
        'Move the pointer with smaller height'
      ]
    },
    hints: [
      'Water trapped depends on surrounding heights',
      'Track maximum heights from both sides',
      'Use two pointers to optimize space'
    ]
  },
  {
    id: 'rotate-array',
    title: 'Rotate Array',
    difficulty: 'Medium',
    description: 'Rotate an array to the right by k steps, where k is non-negative.',
    examples: [
      {
        input: 'nums = [1,2,3,4,5,6,7], k = 3',
        output: '[5,6,7,1,2,3,4]',
        explanation: 'Rotate 1 step to the right: [7,1,2,3,4,5,6], rotate 2 steps: [6,7,1,2,3,4,5], rotate 3 steps: [5,6,7,1,2,3,4]'
      }
    ],
    solution: {
      approach: 'Reverse the entire array, then reverse first k elements, then reverse remaining elements',
      code: `function rotate(nums: number[], k: number): void {
  k %= nums.length;
  reverse(nums, 0, nums.length - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, nums.length - 1);
}

function reverse(nums: number[], start: number, end: number): void {
  while (start < end) {
    [nums[start], nums[end]] = [nums[end], nums[start]];
    start++;
    end--;
  }
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Reverse the entire array',
        'Reverse the first k elements',
        'Reverse the remaining elements',
        'This achieves the rotation effect'
      ]
    },
    hints: [
      'Reversing parts of the array can achieve rotation',
      'Handle k > length by taking modulo',
      'Three reversals: whole, first k, rest'
    ]
  }
];

export const linkedListProblems: Problem[] = [
  {
    id: 'll-reorder',
    title: 'Reorder List',
    difficulty: 'Medium',
    description: 'Reorder a linked list: L0 → L1 → ... → Ln becomes L0 → Ln → L1 → Ln-1 → ...',
    examples: [
      {
        input: 'head = [1,2,3,4]',
        output: '[1,4,2,3]',
        explanation: 'Reordered as 1→4→2→3'
      }
    ],
    solution: {
      approach: 'Find middle, reverse second half, then merge two halves alternately',
      code: `function reorderList(head: ListNode | null): void {
  if (!head || !head.next) return;

  // Find middle using slow/fast pointers
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Reverse second half
  let prev = null;
  let curr = slow;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  // Merge two halves
  let first = head;
  let second = prev;
  while (second.next) {
    const tmp1 = first.next;
    const tmp2 = second.next;
    first.next = second;
    second.next = tmp1;
    first = tmp1;
    second = tmp2;
  }
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Use slow/fast pointers to find middle',
        'Reverse the second half of the list',
        'Merge the two halves alternately',
        'Update pointers during merge'
      ]
    },
    hints: [
      'Use slow and fast pointers to find middle',
      'Reverse the second half',
      'Interleave nodes from both halves'
    ]
  },
  {
    id: 'll-copy-random',
    title: 'Copy List with Random Pointer',
    difficulty: 'Medium',
    description: 'Deep copy a linked list where each node has a random pointer to any node in the list.',
    examples: [
      {
        input: 'head = [[7,null],[13,0],[11,4],[10,2],[1,0]]',
        output: '[[7,null],[13,0],[11,4],[10,2],[1,0]]',
        explanation: 'A deep copy is returned'
      }
    ],
    solution: {
      approach: 'Use a hash map to store mapping between original and copied nodes',
      code: `function copyRandomList(head: Node | null): Node | null {
  if (!head) return null;

  const map = new Map<Node, Node>();

  // First pass: create all nodes
  let curr = head;
  while (curr) {
    map.set(curr, new Node(curr.val));
    curr = curr.next;
  }

  // Second pass: set next and random pointers
  curr = head;
  while (curr) {
    const copy = map.get(curr);
    if (copy) {
      copy.next = curr.next ? map.get(curr.next) || null : null;
      copy.random = curr.random ? map.get(curr.random) || null : null;
    }
    curr = curr.next;
  }

  return map.get(head) || null;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      stepByStep: [
        'Create a hash map for node mapping',
        'First pass: create copy of each node',
        'Second pass: set next and random pointers for copies',
        'Return the copy of head'
      ]
    },
    hints: [
      'Use a hash map to track copied nodes',
      'Two passes: first to create nodes, second to set pointers',
      'Map original nodes to their copies'
    ]
  },
  {
    id: 'll-flatten',
    title: 'Flatten a Multilevel Doubly Linked List',
    difficulty: 'Medium',
    description: 'Flatten a multilevel doubly linked list with a child pointer.',
    examples: [
      {
        input: '1→2→3 with 2 having child [7→8→9]',
        output: '1→2→7→8→9→3',
        explanation: 'Child is flattened into the main list'
      }
    ],
    solution: {
      approach: 'Use DFS to traverse and flatten child nodes recursively',
      code: `function flatten(head: Node | null): Node | null {
  if (!head) return head;

  let curr = head;

  while (curr) {
    if (curr.child) {
      const next = curr.next;

      // Recursively flatten the child
      const flatChild = flatten(curr.child);
      curr.next = flatChild;
      flatChild.prev = curr;
      curr.child = null;

      // Find the tail of the flattened child
      while (curr.next) {
        curr = curr.next;
      }

      // Connect to the original next
      if (next) {
        curr.next = next;
        next.prev = curr;
      }
    }
    curr = curr.next;
  }

  return head;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h) - height of recursion',
      stepByStep: [
        'Traverse the main list',
        'When a child is found, flatten it recursively',
        'Connect flattened child to main list',
        'Update previous pointers for doubly linked list',
        'Clear child pointer after flattening'
      ]
    },
    hints: [
      'Use recursive DFS to flatten children',
      'Find the tail of flattened child',
      'Properly reconnect nodes'
    ]
  },
  {
    id: 'merge-two-sorted-lists',
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    description: 'Merge two sorted linked lists and return it as a sorted list.',
    examples: [
      {
        input: 'list1 = [1,2,4], list2 = [1,3,4]',
        output: '[1,1,2,3,4,4]'
      }
    ],
    solution: {
      approach: 'Use recursion to merge by comparing heads and recursing on the rest',
      code: `function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  if (!list1) return list2;
  if (!list2) return list1;

  if (list1.val < list2.val) {
    list1.next = mergeTwoLists(list1.next, list2);
    return list1;
  } else {
    list2.next = mergeTwoLists(list1, list2.next);
    return list2;
  }
}`,
      timeComplexity: 'O(n + m)',
      spaceComplexity: 'O(n + m) - recursion stack',
      stepByStep: [
        'Compare the heads of both lists',
        'Recurse on the remaining lists after the smaller head',
        'Attach the result to the smaller head',
        'Base case: if one list is empty, return the other'
      ]
    },
    hints: [
      'Recursive approach works well for linked lists',
      'Compare values at current nodes',
      'Merge the rest recursively'
    ]
  }
];

export const hashTableProblems: Problem[] = [
  {
    id: 'ht-lru-cache',
    title: 'LRU Cache',
    difficulty: 'Hard',
    description: 'Implement an LRU (Least Recently Used) cache with get and put operations.',
    examples: [
      {
        input: 'Operations: set(1,1), set(2,2), get(1), set(3,3), get(2)',
        output: '[1, -1]',
        explanation: '2 is evicted as it was least recently used'
      }
    ],
    solution: {
      approach: 'Combine HashMap and Doubly Linked List for O(1) operations',
      code: `class LRUCache {
  capacity: number;
  cache: Map<number, number>;
  order: number[];

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
    this.order = [];
  }

  get(key: number): number {
    if (!this.cache.has(key)) return -1;

    // Update order
    this.order = this.order.filter(k => k !== key);
    this.order.push(key);

    return this.cache.get(key) || -1;
  }

  put(key: number, value: number): void {
    if (this.cache.has(key)) {
      this.order = this.order.filter(k => k !== key);
    } else if (this.order.length >= this.capacity) {
      const lru = this.order.shift();
      if (lru !== undefined) {
        this.cache.delete(lru);
      }
    }

    this.cache.set(key, value);
    this.order.push(key);
  }
}`,
      timeComplexity: 'O(n) for operations (O(1) with doubly linked list)',
      spaceComplexity: 'O(capacity)',
      stepByStep: [
        'Maintain order of elements based on access time',
        'On get: return value and mark as recently used',
        'On put: add/update value and mark as recently used',
        'If capacity exceeded, remove least recently used'
      ]
    },
    hints: [
      'Combine hash map with linked list for optimal performance',
      'Track access order',
      'Remove least recently used when capacity exceeded'
    ]
  },
  {
    id: 'ht-group-anagrams',
    title: 'Group Anagrams',
    difficulty: 'Medium',
    description: 'Given an array of strings, group anagrams together.',
    examples: [
      {
        input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        output: '[["eat","tea","ate"],["tan","nat"],["bat"]]'
      }
    ],
    solution: {
      approach: 'Use sorted string as key to group anagrams',
      code: `function groupAnagrams(strs: string[]): string[][] {
  const map = new Map<string, string[]>();

  for (const str of strs) {
    // Sort characters to get a canonical form
    const sorted = str.split('').sort().join('');

    if (!map.has(sorted)) {
      map.set(sorted, []);
    }
    map.get(sorted)!.push(str);
  }

  return Array.from(map.values());
}`,
      timeComplexity: 'O(n * k log k) where n is number of strings, k is max length',
      spaceComplexity: 'O(n * k)',
      stepByStep: [
        'Create a hash map to group anagrams',
        'For each string, sort its characters',
        'Use sorted form as key',
        'Group strings with same sorted form',
        'Return all groups as array'
      ]
    },
    hints: [
      'Anagrams have the same characters when sorted',
      'Use sorted string as grouping key',
      'Build map of groups and return values'
    ]
  },
  {
    id: 'ht-word-pattern',
    title: 'Word Pattern',
    difficulty: 'Easy',
    description: 'Determine if a string follows a given pattern with one-to-one mapping.',
    examples: [
      {
        input: 'pattern = "abba", s = "redbluebluered"',
        output: 'true',
        explanation: 'a→red, b→blue creates valid mapping'
      }
    ],
    solution: {
      approach: 'Use two maps to ensure bijective mapping between pattern and words',
      code: `function wordPattern(pattern: string, s: string): boolean {
  const words = s.split(' ');

  if (pattern.length !== words.length) return false;

  const charToWord = new Map<string, string>();
  const wordToChar = new Map<string, string>();

  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    const word = words[i];

    if (charToWord.has(char)) {
      if (charToWord.get(char) !== word) return false;
    } else {
      charToWord.set(char, word);
    }

    if (wordToChar.has(word)) {
      if (wordToChar.get(word) !== char) return false;
    } else {
      wordToChar.set(word, char);
    }
  }

  return true;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      stepByStep: [
        'Check if lengths match',
        'Create bidirectional mappings',
        'Verify one-to-one correspondence',
        'Ensure no conflicts in either direction'
      ]
    },
    hints: [
      'Use two maps for bidirectional checking',
      'Ensure one-to-one mapping',
      'Check both pattern→word and word→pattern'
    ]
  },
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    description: 'Find two numbers in an array that add up to a target sum.',
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'Because nums[1] + nums[2] == 6'
      },
      {
        input: 'nums = [3,3], target = 6',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 6'
      }
    ],
    solution: {
      approach: 'Use a hash map to store complement values and their indices',
      code: `function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    map.set(nums[i], i);
  }

  return [];
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      stepByStep: [
        'Create a hash map to store seen numbers and indices',
        'For each number, calculate complement (target - num)',
        'Check if complement exists in map',
        'If yes, return indices; else add current number to map'
      ]
    },
    hints: [
      'Hash map allows O(1) lookups',
      'Store complement instead of the number itself',
      'Return indices, not values'
    ]
  }
];

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

export const treeProblems: Problem[] = [
  {
    id: 'tree-level-order',
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    description: 'Return the level-order (BFS) traversal of a binary tree.',
    examples: [
      {
        input: 'root = [3,9,20,null,null,15,7]',
        output: '[[3],[9,20],[15,7]]',
        explanation: 'Each inner array represents one level'
      }
    ],
    solution: {
      approach: 'Use BFS with a queue to traverse level by level',
      code: `function levelOrder(root: TreeNode | null): number[][] {
  const result: number[][] = [];
  if (!root) return result;

  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const level: number[] = [];
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      level.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(level);
  }

  return result;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(w) - width of tree',
      stepByStep: [
        'Initialize queue with root',
        'For each level, process all nodes currently in queue',
        'Add values to current level array',
        'Enqueue children for next level'
      ]
    },
    hints: [
      'Use BFS with queue',
      'Process one level at a time',
      'Track level size to know when level ends'
    ]
  },
  {
    id: 'tree-validate-bst',
    title: 'Validate Binary Search Tree',
    difficulty: 'Medium',
    description: 'Validate if a binary tree is a valid BST.',
    examples: [
      {
        input: 'root = [2,1,3]',
        output: 'true',
        explanation: 'Valid BST'
      }
    ],
    solution: {
      approach: 'Use DFS with min/max constraints',
      code: `function isValidBST(root: TreeNode | null): boolean {
  function validate(node: TreeNode | null, min: number, max: number): boolean {
    if (!node) return true;

    if (node.val <= min || node.val >= max) return false;

    return (
      validate(node.left, min, node.val) &&
      validate(node.right, node.val, max)
    );
  }

  return validate(root, -Infinity, Infinity);
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
      stepByStep: [
        'Use DFS with min and max bounds',
        'Check if current node is within bounds',
        'Recursively validate left and right subtrees',
        'Update bounds as we traverse'
      ]
    },
    hints: [
      'Pass min/max constraints to recursive calls',
      'Each node must be greater than left subtree nodes',
      'Each node must be less than right subtree nodes'
    ]
  },
  {
    id: 'tree-lowest-ancestor',
    title: 'Lowest Common Ancestor of BST',
    difficulty: 'Easy',
    description: 'Find the lowest common ancestor of two nodes in a BST.',
    examples: [
      {
        input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8',
        output: '6',
        explanation: '6 is LCA of 2 and 8'
      }
    ],
    solution: {
      approach: 'Use BST property to navigate toward LCA',
      code: `function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode,
  q: TreeNode
): TreeNode {
  while (root) {
    if (p.val < root.val && q.val < root.val) {
      // Both in left subtree
      root = root.left!;
    } else if (p.val > root.val && q.val > root.val) {
      // Both in right subtree
      root = root.right!;
    } else {
      // LCA found
      return root;
    }
  }

  return root!;
}`,
      timeComplexity: 'O(h)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'If both values are less than current, go left',
        'If both values are greater than current, go right',
        'Otherwise, current node is the LCA',
        'Return the LCA'
      ]
    },
    hints: [
      'Use BST property for navigation',
      'LCA is found when nodes are on different sides',
      'No recursion needed for BST'
    ]
  },
  {
    id: 'maximum-depth-binary-tree',
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    description: 'Find the maximum depth of a binary tree.',
    examples: [
      {
        input: 'root = [3,9,20,null,null,15,7]',
        output: '3'
      }
    ],
    solution: {
      approach: 'Use recursive DFS to find the maximum depth',
      code: `function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return Math.max(leftDepth, rightDepth) + 1;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h) - height of tree',
      stepByStep: [
        'Base case: null node has depth 0',
        'Recursively find depth of left and right subtrees',
        'Return the maximum of the two plus one'
      ]
    },
    hints: [
      'Depth is the number of nodes along the longest path',
      'Recursive approach works well for trees',
      'Add 1 for each level'
    ]
  }
];

export const graphProblems: Problem[] = [
  {
    id: 'graph-clone',
    title: 'Clone Graph',
    difficulty: 'Medium',
    description: 'Create a deep copy of an undirected graph.',
    examples: [
      {
        input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]',
        output: 'Deep copy of the graph'
      }
    ],
    solution: {
      approach: 'Use DFS with a map to track visited nodes and their copies',
      code: `function cloneGraph(node: Node | null): Node | null {
  if (!node) return null;

  const visited = new Map<Node, Node>();

  function dfs(node: Node): Node {
    if (visited.has(node)) {
      return visited.get(node)!;
    }

    const copy = new Node(node.val);
    visited.set(node, copy);

    for (const neighbor of node.neighbors) {
      copy.neighbors.push(dfs(neighbor));
    }

    return copy;
  }

  return dfs(node);
}`,
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      stepByStep: [
        'Create a copy of current node',
        'Mark as visited with mapping',
        'Recursively clone all neighbors',
        'Connect cloned neighbors to copy',
        'Return the cloned graph'
      ]
    },
    hints: [
      'Use DFS to traverse graph',
      'Map original nodes to copies',
      'Handle cycles with visited map'
    ]
  },
  {
    id: 'number-of-islands',
    title: 'Number of Islands',
    difficulty: 'Medium',
    description: 'Given a 2D grid of 1s (land) and 0s (water), count the number of islands.',
    examples: [
      {
        input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
        output: '1'
      }
    ],
    solution: {
      approach: 'Use DFS to mark all connected land cells as visited',
      code: `function numIslands(grid: string[][]): number {
  if (!grid || grid.length === 0) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  const dfs = (i: number, j: number) => {
    if (i < 0 || i >= rows || j < 0 || j >= cols || grid[i][j] === '0') return;
    grid[i][j] = '0'; // mark as visited
    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  };

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === '1') {
        count++;
        dfs(i, j);
      }
    }
  }

  return count;
}`,
      timeComplexity: 'O(m * n)',
      spaceComplexity: 'O(m * n) - worst case recursion',
      stepByStep: [
        'Iterate through each cell in the grid',
        'When land (1) is found, increment count and DFS',
        'DFS marks all connected land as visited (0)',
        'Continue until all cells are processed'
      ]
    },
    hints: [
      'DFS or BFS can be used to explore islands',
      'Mark visited cells to avoid recounting',
      'Count each new land cell that starts a new island'
    ]
  }
];
