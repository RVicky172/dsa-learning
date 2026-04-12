import type { Topic } from '../types/topic';
import React from 'react';
import { Hash, List, Zap } from 'lucide-react';

export const fundamentalTopics: Topic[] = [
  {
    id: 'arrays',
    title: 'Arrays & Strings',
    description: 'Fundamental building blocks for data storage and manipulation.',
    complexity: 'O(1) Access',
    icon: React.createElement(Hash, { size: 24 }),
    delay: 0.1,

    introduction: `Arrays and strings are the most fundamental data structures in computer science. An array is a collection of elements stored in contiguous memory locations, making it possible to calculate the position of each element by simply adding an offset to a base value. This contiguous memory allocation makes arrays incredibly efficient for random access operations.

At a deeper level, arrays represent how computers store data in physical RAM. When you declare an array of size 10, the operating system allocates a continuous block of memory address space. This "locality of reference" is what makes arrays faster than linked lists for many tasks, as modern CPU caches are optimized for reading contiguous blocks of data (spatial locality).

Strings, in most programming languages, are essentially arrays of characters. They inherit many properties from arrays while adding their own unique characteristics and operations. Understanding arrays and strings is crucial because they form the foundation for more complex data structures and algorithms.

The power of arrays lies in their simplicity and efficiency. With O(1) time complexity for accessing elements by index, arrays provide the fastest way to retrieve data when you know the position. However, this efficiency comes with trade-offs in flexibility, particularly when it comes to insertion and deletion operations.`,

    whyImportant: `Arrays and strings appear in virtually every programming task. From storing user data to processing text, from implementing other data structures to solving complex algorithmic problems, arrays are everywhere. Mastering array manipulation is essential for technical interviews and real-world software development.`,

    whenToUse: [
      'When you need fast random access to elements',
      'When the size of your data is known or doesn\'t change frequently',
      'When you need to store homogeneous data elements',
      'When implementing other data structures like stacks, queues, or hash tables',
      'For text processing and string manipulation tasks'
    ],

    advantages: [
      'O(1) time complexity for accessing elements by index',
      'Cache-friendly due to contiguous memory allocation',
      'Simple and intuitive to use',
      'Efficient memory usage when size is known',
      'Excellent for iteration and traversal'
    ],

    disadvantages: [
      'Fixed size in many languages (static arrays)',
      'Expensive insertion and deletion operations (O(n) in worst case)',
      'Wasted memory if array is not fully utilized',
      'Difficulty in resizing (requires creating new array and copying elements)'
    ],

    concepts: [
      {
        name: 'Index-based Access',
        description: 'Elements are accessed using their position (index), starting from 0. This allows for constant-time retrieval of any element.'
      },
      {
        name: 'Contiguous Memory',
        description: 'Array elements are stored in consecutive memory locations, enabling efficient access and cache performance.'
      },
      {
        name: 'Static vs Dynamic Arrays',
        description: 'Static arrays have fixed size, while dynamic arrays (like JavaScript arrays or Python lists) can grow and shrink automatically.'
      },
      {
        name: 'String Immutability',
        description: 'In many languages, strings are immutable - operations create new strings rather than modifying existing ones.'
      },
      {
        name: 'Multi-dimensional Arrays',
        description: 'Arrays can contain other arrays, creating matrices and higher-dimensional structures for complex data representation.'
      }
    ],

    examples: [
      {
        title: 'Basic Array Operations',
        language: 'typescript',
        code: `// Creating and accessing arrays
const numbers: number[] = [1, 2, 3, 4, 5];
console.log(numbers[0]); // 1 - O(1) access

// Inserting at end - O(1) amortized
numbers.push(6);

// Inserting at beginning - O(n)
numbers.unshift(0);

// Deleting from end - O(1)
numbers.pop();

// Deleting from beginning - O(n)
numbers.shift();

// Finding an element - O(n)
const index = numbers.indexOf(3);

// Iterating through array - O(n)
for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
} `,
        explanation: 'This example demonstrates fundamental array operations. Notice how operations at the end of the array are efficient (O(1)), while operations at the beginning require shifting all elements (O(n)).',
        timeComplexity: 'Varies: O(1) for access/push/pop, O(n) for unshift/shift/indexOf',
        spaceComplexity: 'O(1) for operations, O(n) for storage'
      },
      {
        title: 'Two Pointer Technique',
        language: 'typescript',
        code: `// Reverse an array in-place using two pointers
function reverseArray(arr: number[]): void {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    // Swap elements
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
}

// Example usage
const arr = [1, 2, 3, 4, 5];
reverseArray(arr);
console.log(arr); // [5, 4, 3, 2, 1]`,
        explanation: 'The two-pointer technique is a powerful pattern for array manipulation. By maintaining pointers at different positions, we can solve problems efficiently in a single pass.',
        timeComplexity: 'O(n) - single pass through array',
        spaceComplexity: 'O(1) - in-place modification'
      },
      {
        title: 'Sliding Window Pattern',
        language: 'typescript',
        code: `// Find maximum sum of k consecutive elements
function maxSumSubarray(arr: number[], k: number): number {
  if (arr.length < k) return -1;
  
  // Calculate sum of first window
  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  
  let maxSum = windowSum;
  
  // Slide the window
  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, windowSum);
  }
  
  return maxSum;
}

// Example
console.log(maxSumSubarray([1, 4, 2, 10, 23, 3, 1, 0, 20], 4)); // 39`,
        explanation: 'The sliding window pattern is efficient for problems involving subarrays. Instead of recalculating the sum for each window, we slide by removing one element and adding another.',
        timeComplexity: 'O(n) - linear scan',
        spaceComplexity: 'O(1) - constant extra space'
      },
      {
        title: 'String Manipulation',
        language: 'typescript',
        code: `// Check if string is a palindrome
function isPalindrome(s: string): boolean {
  // Clean string: remove non-alphanumeric, convert to lowercase
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  let left = 0;
  let right = cleaned.length - 1;
  
  while (left < right) {
    if (cleaned[left] !== cleaned[right]) {
      return false;
    }
    left++;
    right--;
  }
  
  return true;
}

// Examples
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false`,
        explanation: 'String problems often combine array techniques with character manipulation. This palindrome checker uses two pointers and string preprocessing.',
        timeComplexity: 'O(n) - linear scan and preprocessing',
        spaceComplexity: 'O(n) - cleaned string storage'
      }
    ],

    patterns: [
      {
        name: 'Two Pointers',
        description: 'Use two pointers moving toward each other or in the same direction to solve problems efficiently.',
        technique: 'Initialize pointers at strategic positions (start/end, slow/fast) and move them based on conditions.',
        example: 'Reverse array, find pairs with target sum, remove duplicates',
        whenToUse: [
          'Finding pairs in sorted arrays',
          'Reversing or rearranging elements',
          'Partitioning arrays',
          'Palindrome checking'
        ]
      },
      {
        name: 'Sliding Window',
        description: 'Maintain a window of elements and slide it across the array to find optimal subarrays.',
        technique: 'Keep track of window bounds and update as you slide, maintaining window properties.',
        example: 'Maximum sum subarray, longest substring, minimum window',
        whenToUse: [
          'Finding subarrays/substrings with specific properties',
          'Optimizing brute force subarray solutions',
          'Problems with contiguous elements'
        ]
      },
      {
        name: 'Prefix Sum',
        description: 'Precompute cumulative sums to answer range sum queries in constant time.',
        technique: 'Create array where prefix[i] = sum of elements from 0 to i.',
        example: 'Range sum queries, subarray sum equals K',
        whenToUse: [
          'Multiple range sum queries',
          'Finding subarrays with target sum',
          'Optimization of cumulative calculations'
        ]
      },
      {
        name: 'Fast & Slow Pointers',
        description: 'Use two pointers moving at different speeds to detect cycles or find middle elements.',
        technique: 'One pointer moves one step, another moves two steps per iteration.',
        example: 'Find middle element, detect duplicates in-place',
        whenToUse: [
          'Finding middle of array/list',
          'Cycle detection',
          'In-place algorithms with limited space'
        ]
      },
      {
        name: 'HashMap for Frequency',
        description: 'Use hash maps to count character/element frequencies for efficient lookups.',
        technique: 'Build frequency map in one pass, use for constant-time existence checks.',
        example: 'Anagram checking, first unique character, two sum',
        whenToUse: [
          'Counting occurrences',
          'Finding duplicates',
          'Anagram/permutation problems',
          'Optimizing search operations'
        ]
      }
    ],

    problems: [
      {
        id: 'two-sum',
        title: 'Two Sum',
        difficulty: 'Easy',
        description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
        examples: [
          {
            input: 'nums = [2,7,11,15], target = 9',
            output: '[0,1]',
            explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
          },
          {
            input: 'nums = [3,2,4], target = 6',
            output: '[1,2]'
          }
        ],
        hints: [
          'A brute force approach would be to check every pair of numbers.',
          'Can you use a hash map to store numbers you\'ve seen?',
          'For each number, check if target - number exists in the map.'
        ],
        solution: {
          approach: 'Use a hash map to store each number and its index. For each element, check if the complement (target - current number) exists in the map. This reduces time complexity from O(n²) to O(n).',
          code: `function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    
    map.set(nums[i], i);
  }
  
  return []; // No solution found
}`,
          timeComplexity: 'O(n) - single pass through array',
          spaceComplexity: 'O(n) - hash map storage',
          stepByStep: [
            'Create an empty hash map to store number -> index mappings',
            'Iterate through each number in the array',
            'For current number, calculate complement = target - current',
            'Check if complement exists in hash map',
            'If yes, return [map[complement], current index]',
            'If no, add current number and index to map',
            'Continue to next number'
          ]
        }
      },
      {
        id: 'valid-palindrome',
        title: 'Valid Palindrome',
        difficulty: 'Easy',
        description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Given a string s, return true if it is a palindrome, or false otherwise.',
        examples: [
          {
            input: 's = "A man, a plan, a canal: Panama"',
            output: 'true',
            explanation: '"amanaplanacanalpanama" is a palindrome.'
          },
          {
            input: 's = "race a car"',
            output: 'false',
            explanation: '"raceacar" is not a palindrome.'
          }
        ],
        hints: [
          'First, clean the string by removing non-alphanumeric characters.',
          'Use two pointers from both ends.',
          'Compare characters while moving pointers toward center.'
        ],
        solution: {
          approach: 'Clean the string first, then use two pointers technique to compare characters from both ends moving toward the center.',
          code: `function isPalindrome(s: string): boolean {
  // Clean: remove non-alphanumeric and convert to lowercase
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  let left = 0;
  let right = cleaned.length - 1;
  
  while (left < right) {
    if (cleaned[left] !== cleaned[right]) {
      return false;
    }
    left++;
    right--;
  }
  
  return true;
}`,
          timeComplexity: 'O(n) - string preprocessing and single pass comparison',
          spaceComplexity: 'O(n) - cleaned string storage',
          stepByStep: [
            'Convert string to lowercase',
            'Remove all non-alphanumeric characters using regex',
            'Initialize two pointers: left at start, right at end',
            'While pointers haven\'t crossed: compare characters',
            'If characters don\'t match, return false',
            'Move left pointer right, right pointer left',
            'If loop completes, string is palindrome, return true'
          ]
        }
      },
      {
        id: 'best-time-stock',
        title: 'Best Time to Buy and Sell Stock',
        difficulty: 'Easy',
        description: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.',
        examples: [
          {
            input: 'prices = [7,1,5,3,6,4]',
            output: '5',
            explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.'
          },
          {
            input: 'prices = [7,6,4,3,1]',
            output: '0',
            explanation: 'No profitable transaction possible.'
          }
        ],
        hints: [
          'You need to buy before you sell.',
          'Keep track of the minimum price seen so far.',
          'At each day, calculate profit if you sell at current price.'
        ],
        solution: {
          approach: 'Track the minimum price seen so far. At each day, calculate the profit if we sell at current price. Keep updating the maximum profit.',
          code: `function maxProfit(prices: number[]): number {
  let minPrice = Infinity;
  let maxProfit = 0;
  
  for (let price of prices) {
    // Update minimum price if current is lower
    minPrice = Math.min(minPrice, price);
    
    // Calculate profit if we sell at current price
    const profit = price - minPrice;
    
    // Update maximum profit
    maxProfit = Math.max(maxProfit, profit);
  }
  
  return maxProfit;
}`,
          timeComplexity: 'O(n) - single pass through prices',
          spaceComplexity: 'O(1) - only tracking two variables',
          stepByStep: [
            'Initialize minPrice to infinity and maxProfit to 0',
            'Iterate through each price',
            'Update minPrice if current price is lower',
            'Calculate profit if selling at current price: price - minPrice',
            'Update maxProfit if current profit is higher',
            'Continue to next price',
            'Return maxProfit after iterating all prices'
          ]
        }
      },
      {
        id: 'product-except-self',
        title: 'Product of Array Except Self',
        difficulty: 'Medium',
        description: 'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. You must write an algorithm that runs in O(n) time and without using the division operation.',
        examples: [
          {
            input: 'nums = [1,2,3,4]',
            output: '[24,12,8,6]'
          },
          {
            input: 'nums = [-1,1,0,-3,3]',
            output: '[0,0,9,0,0]'
          }
        ],
        hints: [
          'Think about the product as: (product of all elements to the left) × (product of all elements to the right)',
          'You can construct the result array in two passes.',
          'First pass: calculate prefix products. Second pass: calculate suffix products.'
        ],
        solution: {
          approach: 'Use prefix and suffix product arrays. For each position, the result is prefix[i-1] * suffix[i+1]. Optimize by building result array directly.',
          code: `function productExceptSelf(nums: number[]): number[] {
  const n = nums.length;
  const result: number[] = new Array(n);
  
  // Build prefix products in result array
  result[0] = 1;
  for (let i = 1; i < n; i++) {
    result[i] = result[i - 1] * nums[i - 1];
  }
  
  // Multiply by suffix products
  let suffixProduct = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= suffixProduct;
    suffixProduct *= nums[i];
  }
  
  return result;
}`,
          timeComplexity: 'O(n) - two passes through array',
          spaceComplexity: 'O(1) - output array doesn\'t count as extra space',
          stepByStep: [
            'Create result array of same length',
            'First pass (left to right): build prefix products',
            'result[i] = product of all elements before index i',
            'Second pass (right to left): multiply by suffix products',
            'Track running suffix product while iterating',
            'For each position: result[i] *= suffixProduct',
            'Update suffixProduct by multiplying current element'
          ]
        }
      },
      {
        id: 'container-most-water',
        title: 'Container With Most Water',
        difficulty: 'Medium',
        description: 'You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.',
        examples: [
          {
            input: 'height = [1,8,6,2,5,4,8,3,7]',
            output: '49',
            explanation: 'The lines at index 1 and 8 form a container with area = min(8,7) * (8-1) = 49'
          }
        ],
        hints: [
          'Start with the widest container (first and last lines).',
          'The area is limited by the shorter line.',
          'Move the pointer at the shorter line inward to potentially find a taller line.'
        ],
        solution: {
          approach: 'Use two pointers starting from both ends. Calculate area, then move the pointer with smaller height inward, as moving the taller one can only decrease area.',
          code: `function maxArea(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;
  
  while (left < right) {
    // Calculate current area
    const width = right - left;
    const h = Math.min(height[left], height[right]);
    const area = width * h;
    
    maxArea = Math.max(maxArea, area);
    
    // Move pointer with smaller height
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  
  return maxArea;
}`,
          timeComplexity: 'O(n) - single pass with two pointers',
          spaceComplexity: 'O(1) - constant extra space',
          stepByStep: [
            'Initialize two pointers: left at start, right at end',
            'Initialize maxArea to 0',
            'While pointers haven\'t crossed:',
            '  - Calculate width = right - left',
            '  - Calculate height = min(height[left], height[right])',
            '  - Calculate area = width * height',
            '  - Update maxArea if current area is larger',
            '  - Move the pointer with smaller height inward',
            'Return maxArea'
          ]
        }
      }
    ],

    operations: [
      { name: 'Access', complexity: 'O(1)' },
      { name: 'Search', complexity: 'O(n)' },
      { name: 'Insert (end)', complexity: 'O(1)' },
      { name: 'Insert (beginning)', complexity: 'O(n)' },
      { name: 'Delete (end)', complexity: 'O(1)' },
      { name: 'Delete (beginning)', complexity: 'O(n)' }
    ],

    applications: [
      {
        name: 'Text Processing',
        description: 'String manipulation is fundamental to text editors, search engines, and compilers.',
        example: 'Syntax highlighting in code editors uses string pattern matching algorithms'
      },
      {
        name: 'Image Processing',
        description: 'Images are represented as 2D arrays of pixels, with each pixel storing color information.',
        example: 'Instagram filters apply transformations on pixel arrays to modify images'
      },
      {
        name: 'Data Buffering',
        description: 'Arrays serve as buffers for temporary data storage in I/O operations.',
        example: 'Video streaming uses circular buffers (arrays) to store frames before playback'
      },
      {
        name: 'Database Indexing',
        description: 'Database systems use arrays for storing index entries for fast data retrieval.',
        example: 'PostgreSQL uses array-based indexes to speed up query execution'
      }
    ]
  },

  {
    id: 'linked-lists',
    title: 'Linked Lists',
    description: 'Dynamic data structures for efficient insertions and deletions.',
    complexity: 'O(n) Search',
    icon: React.createElement(List, { size: 24 }),
    delay: 0.2,

    introduction: `A linked list is a linear data structure where elements are stored in nodes. Unlike arrays, elements are not stored in contiguous memory locations. Instead, each node contains data and a reference (or link) to the next node in the sequence. This fundamental difference gives linked lists unique advantages and tradeoffs compared to arrays.

The beauty of linked lists lies in their dynamic nature. They can easily grow and shrink during runtime by allocating and deallocating memory on demand. This makes them ideal for applications where the size of data is unpredictable or frequently changing.

There are several types of linked lists: singly linked lists (one-directional), doubly linked lists (bidirectional), and circular linked lists. Each type has its own use cases and trade-offs in terms of memory usage and operation efficiency.`,

    whyImportant: `Linked lists are fundamental to understanding how dynamic memory allocation works and form the basis for many other data structures like stacks, queues, and graphs. They're frequently tested in technical interviews and are essential for system-level programming.`,

    whenToUse: [
      'When you need frequent insertions and deletions',
      'When the size of data is unknown or changes frequently',
      'When you don\'t need random access to elements',
      'Implementing stacks, queues, or other abstract data types',
      'When memory fragmentation is a concern'
    ],

    advantages: [
      'O(1) time complexity for insertion/deletion at known positions',
      'Dynamic size - grows and shrinks easily',
      'Efficient memory utilization - no wasted space',
      'Easy insertion/deletion at beginning',
      'No need to specify size in advance'
    ],

    disadvantages: [
      'O(n) time for accessing elements (no random access)',
      'Extra memory for storing pointers/references',
      'Not cache-friendly due to non-contiguous memory',
      'Cannot do binary search efficiently',
      'More complex implementation than arrays'
    ],

    concepts: [
      { name: 'Node Structure', description: 'Each node contains data and a pointer/reference to the next node (and previous node in doubly linked lists).' },
      { name: 'Head Pointer', description: 'A reference to the first node in the list. Essential for accessing the list.' },
      { name: 'Traversal', description: 'Moving through the list by following next pointers from the head to the end (null).' },
      { name: 'Singly vs Doubly', description: 'Singly linked lists have one-way links. Doubly linked lists have bidirectional links allowing backward traversal.' },
      { name: 'Circular Lists', description: 'The last node points back to the first node, creating a circle. Useful for round-robin scheduling.' }
    ],

    examples: [
      {
        title: 'Node and LinkedList Implementation',
        language: 'typescript',
        code: `class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;
  
  constructor(value: T) {
    this.value = value;
  }
}

class LinkedList<T> {
  head: ListNode<T> | null = null;
  size: number = 0;
  
  // Add to beginning - O(1)
  prepend(value: T): void {
    const newNode = new ListNode(value);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }
  
  // Add to end - O(n)
  append(value: T): void {
    const newNode = new ListNode(value);
    
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }
  
  // Delete node with value - O(n)
  delete(value: T): boolean {
    if (!this.head) return false;
    
    if (this.head.value === value) {
      this.head = this.head.next;
      this.size--;
      return true;
    }
    
    let current = this.head;
    while (current.next) {
      if (current.next.value === value) {
        current.next = current.next.next;
        this.size--;
        return true;
      }
      current = current.next;
    }
    return false;
  }
}`,
        explanation: 'Basic linked list implementation showing core operations. Note that prepend is O(1) while append is O(n) since we must traverse to the end.',
        timeComplexity: 'Prepend: O(1), Append: O(n), Delete: O(n)',
        spaceComplexity: 'O(1) for operations, O(n) for storage'
      },
      {
        title: 'Reverse a Linked List',
        language: 'typescript',
        code: `function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let current: ListNode | null = head;
  
  while (current) {
    const next = current.next;  // Save next
    current.next = prev;        // Reverse link
    prev = current;             // Move prev forward
    current = next;             // Move current forward
  }
  
  return prev;  // New head
}

// Recursive approach
function reverseListRecursive(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;
  
  const newHead = reverseListRecursive(head.next);
  head.next.next = head;
  head.next = null;
  
  return newHead;
}`,
        explanation: 'Reversing a linked list is a classic problem. The iterative approach uses three pointers to reverse links one by one. The recursive approach reverses from the end backward.',
        timeComplexity: 'O(n) - must visit each node',
        spaceComplexity: 'Iterative: O(1), Recursive: O(n) call stack'
      },
      {
        title: 'Fast & Slow Pointer (Cycle Detection)',
        language: 'typescript',
        code: `function hasCycle(head: ListNode | null): boolean {
  if (!head || !head.next) return false;
  
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;
  
  while (fast && fast.next) {
    slow = slow!.next;           // Move 1 step
    fast = fast.next.next;       // Move 2 steps
    
    if (slow === fast) {
      return true;  // Cycle detected
    }
  }
  
  return false;  // No cycle
}

// Find cycle start
function detectCycleStart(head: ListNode | null): ListNode | null {
  if (!head) return null;
  
  let slow = head, fast = head;
  
  // Detect cycle
  while (fast && fast.next) {
    slow = slow.next!;
    fast = fast.next.next;
    if (slow === fast) break;
  }
  
  if (!fast || !fast.next) return null;
  
  // Find cycle start
  slow = head;
  while (slow !== fast) {
    slow = slow.next!;
    fast = fast!.next;
  }
  
  return slow;
}`,
        explanation: 'Floyd\'s cycle detection algorithm uses fast and slow pointers. If there\'s a cycle, they will eventually meet. To find cycle start, reset one pointer to head and move both at same speed.',
        timeComplexity: 'O(n) - at most 2n iterations',
        spaceComplexity: 'O(1) - only two pointers'
      }
    ],

    patterns: [
      {
        name: 'Fast & Slow Pointers',
        description: 'Use two pointers moving at different speeds to solve various problems.',
        technique: 'One pointer moves twice as fast as the other. When fast reaches end, slow is at middle.',
        example: 'Find middle node, detect cycles, find nth from end',
        whenToUse: ['Finding middle element', 'Cycle detection', 'Finding kth from end']
      },
      {
        name: 'Dummy Node',
        description: 'Create a dummy node before head to simplify edge cases.',
        technique: 'Add a dummy node pointing to head. Return dummy.next as final result.',
        example: 'Remove nodes, merge lists, partition lists',
        whenToUse: ['Deleting nodes', 'Merging lists', 'When head might change']
      },
      {
        name: 'Two Pointers (Gap)',
        description: 'Maintain two pointers with a gap to solve problems like removing nth from end.',
        technique: 'Move first pointer n steps ahead, then move both until first reaches end.',
        example: 'Remove nth from end, find kth from end',
        whenToUse: ['Finding/removing from end', 'Offset operations']
      },
      {
        name: 'Recursive Reversal',
        description: 'Use recursion to reverse links or process from end to start.',
        technique: 'Recurse to end, then reverse links on way back up call stack.',
        example: 'Reverse list, reverse in groups, palindrome check',
        whenToUse: ['Reversing operations', 'Processing from end', 'Complex link manipulation']
      }
    ],

    problems: [
      {
        id: 'll-reverse',
        title: 'Reverse Linked List',
        difficulty: 'Easy',
        description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
        examples: [{ input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' }],
        hints: ['Use three pointers: prev, current, next', 'Reverse one link at a time', 'Try both iterative and recursive approaches'],
        solution: {
          approach: 'Iteratively reverse each link by maintaining three pointers to track previous, current, and next nodes.',
          code: `function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let current: ListNode | null = head;
  
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  
  return prev;
}`,
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(1)',
          stepByStep: ['Start with prev = null, current = head', 'While current exists:', '  Save next node', '  Reverse current.next to point to prev', '  Move prev to current', '  Move current to next', 'Return prev as new head']
        }
      },
      {
        id: 'll-cycle',
        title: 'Linked List Cycle',
        difficulty: 'Easy',
        description: 'Given head of a linked list, determine if the linked list has a cycle in it.',
        examples: [{ input: 'head = [3,2,0,-4], pos = 1', output: 'true', explanation: 'There is a cycle, tail connects to node index 1' }],
        hints: ['Use two pointers moving at different speeds', 'If there\'s a cycle, they will meet', 'Think about what happens if no cycle exists'],
        solution: {
          approach: 'Floyd\'s cycle detection - use fast and slow pointers. If cycle exists, they will eventually meet.',
          code: `function hasCycle(head: ListNode | null): boolean {
  if (!head) return false;
  
  let slow = head, fast = head;
  
  while (fast && fast.next) {
    slow = slow.next!;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  
  return false;
}`,
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(1)',
          stepByStep: ['Initialize slow and fast pointers at head', 'Move slow one step, fast two steps', 'If they meet, cycle exists', 'If fast reaches null, no cycle']
        }
      },
      {
        id: 'll-merge',
        title: 'Merge Two Sorted Lists',
        difficulty: 'Easy',
        description: 'Merge two sorted linked lists and return it as a sorted list.',
        examples: [{ input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]' }],
        hints: [
          'Use a dummy node to simplify',
          'Compare current nodes from both lists',
          'Attach remaining nodes at the end'
        ],
        solution: {
          approach: 'Use a dummy node and compare nodes from both lists one by one, attaching smaller one to result.',
          code: `function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy = new ListNode(0);
  let current = dummy;
  
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }
  
  current.next = l1 || l2;
  return dummy.next;
}`,
          timeComplexity: 'O(n + m)',
          spaceComplexity: 'O(1)',
          stepByStep: [
            'Create dummy node',
            'While both lists have nodes:',
            '  Attach smaller node to result',
            '  Advance that list',
            'Attach remaining nodes',
            'Return dummy.next'
          ]
        }
      }
    ],

    operations: [
      { name: 'Access', complexity: 'O(n)' },
      { name: 'Search', complexity: 'O(n)' },
      { name: 'Insert (beginning)', complexity: 'O(1)' },
      { name: 'Insert (end)', complexity: 'O(n)' },
      { name: 'Delete', complexity: 'O(n)' }
    ],

    applications: [
      { name: 'Browser History', description: 'Back/forward navigation in web browsers', example: 'Chrome uses linked lists for tab history' },
      { name: 'Music Playlists', description: 'Next/previous song navigation', example: 'Spotify playlist management' },
      { name: 'Undo Functionality', description: 'Undo/redo in text editors', example: 'VS Code undo stack' },
      { name: 'Memory Management', description: 'Free memory block tracking in OS', example: 'Linux kernel memory allocator' }
    ]
  },

  {
    id: 'hash-tables',
    title: 'Hash Tables',
    description: 'Lightning-fast key-value mapping for optimal performance.',
    complexity: 'O(1) Average',
    icon: React.createElement(Zap, { size: 24 }),
    delay: 0.3,

    introduction: `Hash tables (also called hash maps) are one of the most powerful and commonly used data structures in computer science. They provide an average-case constant-time O(1) complexity for search, insert, and delete operations, making them incredibly efficient for many applications.

A hash table works by using a hash function to compute an index (hash code) from a key. This index determines where the corresponding value is stored in an underlying array. The key innovation is that instead of searching through all elements, the hash function directly computes where to look.

The efficiency of a hash table depends heavily on the quality of its hash function and how it handles collisions (when different keys produce the same hash). Common collision resolution techniques include chaining (using linked lists) and open addressing (probing for the next available slot).`,

    whyImportant: `Hash tables are ubiquitous in real-world applications. They power database indexing, caching systems, symbol tables in compilers, and associative arrays in programming languages. Understanding hash tables is essential for writing efficient code and is a favorite topic in technical interviews.`,

    whenToUse: [
      'When you need fast lookups by key',
      'For counting frequencies or occurrences',
      'To detect duplicates efficiently',
      'When implementing caches or memoization',
      'For grouping or categorizing data'
    ],

    advantages: [
      'O(1) average-case for search, insert, and delete',
      'Flexible keys (any hashable type)',
      'Efficient for large datasets',
      'Perfect for implementing sets and maps',
      'Natural for counting and frequency problems'
    ],

    disadvantages: [
      'O(n) worst-case if many collisions occur',
      'No ordering of elements',
      'Extra memory for underlying array',
      'Hash function quality affects performance',
      'Not cache-friendly due to random access pattern'
    ],

    concepts: [
      { name: 'Hash Function', description: 'A function that maps keys to array indices. Should be deterministic, uniform, and fast.' },
      { name: 'Collision', description: 'When two different keys hash to the same index. Must be handled properly.' },
      { name: 'Load Factor', description: 'Ratio of entries to array size. When too high, table is resized (rehashed).' },
      { name: 'Chaining', description: 'Collision resolution using linked lists at each array slot.' },
      { name: 'Open Addressing', description: 'Collision resolution by probing for next empty slot in the array.' }
    ],

    examples: [
      {
        title: 'Basic Hash Map Operations',
        language: 'typescript',
        code: `// Using JavaScript Map (hash table)
const map = new Map<string, number>();

// Insert - O(1) average
map.set('apple', 5);
map.set('banana', 3);
map.set('orange', 7);

// Lookup - O(1) average
console.log(map.get('apple')); // 5

// Check existence - O(1) average
console.log(map.has('banana')); // true

// Delete - O(1) average
map.delete('orange');

// Iterate
for (const [key, value] of map) {
  console.log(\`\${key}: \${value}\`);
}

// Frequency counting pattern
function countFrequencies(arr: string[]): Map<string, number> {
  const freq = new Map<string, number>();
  for (const item of arr) {
    freq.set(item, (freq.get(item) || 0) + 1);
  }
  return freq;
}`,
        explanation: 'Hash maps provide constant-time operations for insert, lookup, and delete. The frequency counting pattern is extremely common.',
        timeComplexity: 'O(1) average for all operations',
        spaceComplexity: 'O(n) for storing n entries'
      },
      {
        title: 'Two Sum with Hash Map',
        language: 'typescript',
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
}

// Example usage
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6)); // [1, 2]`,
        explanation: 'Classic hash map problem. Instead of O(n²) brute force, we use a map to check if complement exists in O(1), reducing overall complexity to O(n).',
        timeComplexity: 'O(n) - single pass',
        spaceComplexity: 'O(n) - hash map storage'
      },
      {
        title: 'Group Anagrams',
        language: 'typescript',
        code: `function groupAnagrams(strs: string[]): string[][] {
  const map = new Map<string, string[]>();
  
  for (const str of strs) {
    // Sort string to create key
    const key = str.split('').sort().join('');
    
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key)!.push(str);
  }
  
  return Array.from(map.values());
}

// Example
console.log(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']));
// Output: [['eat','tea','ate'], ['tan','nat'], ['bat']]`,
        explanation: 'Anagrams have the same sorted characters. We use sorted string as key to group anagrams together.',
        timeComplexity: 'O(n * k log k) where k is max string length',
        spaceComplexity: 'O(n * k) for storing strings'
      }
    ],

    patterns: [
      {
        name: 'Frequency Counter',
        description: 'Count occurrences of elements using a hash map.',
        technique: 'Iterate through data, increment count in map for each element.',
        example: 'Character frequency, find duplicates, most common element',
        whenToUse: ['Counting occurrences', 'Finding mode', 'Detecting duplicates']
      },
      {
        name: 'Seen/Visited Tracking',
        description: 'Use hash set to track elements already encountered.',
        technique: 'Add elements to set as you process them. Check existence before processing.',
        example: 'Detect duplicates, unique elements, cycle detection',
        whenToUse: ['Deduplication', 'Uniqueness checks', 'Visited tracking in graphs']
      },
      {
        name: 'Complement Lookup',
        description: 'Store seen elements and look for complements (Two Sum pattern).',
        technique: 'For each element, check if target - element exists in map.',
        example: 'Two sum, pair with difference, three sum variants',
        whenToUse: ['Finding pairs', 'Sum problems', 'Difference problems']
      },
      {
        name: 'Grouping by Key',
        description: 'Group items by a computed key property.',
        technique: 'Compute key for each item, store items in map using that key.',
        example: 'Group anagrams, categorize transactions, partition by property',
        whenToUse: ['Categorization', 'Grouping similar items', 'Anagram problems']
      }
    ],

    problems: [
      {
        id: 'ht-anagram',
        title: 'Valid Anagram',
        difficulty: 'Easy',
        description: 'Given two strings s and t, return true if t is an anagram of s, false otherwise.',
        examples: [{ input: 's = "anagram", t = "nagaram"', output: 'true' }],
        hints: ['Count character frequencies', 'Compare frequency maps', 'Can optimize by using single pass'],
        solution: {
          approach: 'Count character frequencies in both strings using hash maps and compare.',
          code: `function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  
  const freq = new Map<string, number>();
  
  for (const char of s) {
    freq.set(char, (freq.get(char) || 0) + 1);
  }
  
  for (const char of t) {
    if (!freq.has(char)) return false;
    freq.set(char, freq.get(char)! - 1);
    if (freq.get(char)! < 0) return false;
  }
  
  return true;
}`,
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(1) - at most 26 characters',
          stepByStep: ['Check if lengths match', 'Count frequencies of s', 'Decrement frequencies for t', 'If any char missing or negative, not anagram']
        }
      },
      {
        id: 'ht-two-sum',
        title: 'Two Sum',
        difficulty: 'Easy',
        description: 'Given an array of integers, return indices of two numbers that add up to target.',
        examples: [{ input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' }],
        hints: [
          'Use hash map to store seen numbers',
          'For each number, check if complement exists',
          'Store index as value'
        ],
        solution: {
          approach: 'Use hash map to store numbers and their indices. For each number, check if target - number exists.',
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
          stepByStep: ['Create empty hash map', 'For each number:', '  Calculate complement', '  If complement in map, return indices', '  Otherwise, add number and index to map']
        }
      },
      {
        id: 'ht-longest-consecutive',
        title: 'Longest Consecutive Sequence',
        difficulty: 'Medium',
        description: 'Given unsorted array, find length of longest consecutive elements sequence in O(n).',
        examples: [{ input: '[100,4,200,1,3,2]', output: '4', explanation: 'Longest consecutive sequence is [1, 2, 3, 4]' }],
        hints: [
          'Use hash set for O(1) lookups',
          'Only start counting from sequence starts',
          'Sequence start is when num-1 is not in set'
        ],
        solution: {
          approach: 'Use hash set for O(1) lookups. For each number that starts a sequence (num-1 not in set), count length.',
          code: `function longestConsecutive(nums: number[]): number {
  const numSet = new Set(nums);
  let longest = 0;
  
  for (const num of numSet) {
    // Only start from sequence beginning
    if (!numSet.has(num - 1)) {
      let current = num;
      let streak = 1;
      
      while (numSet.has(current + 1)) {
        current++;
        streak++;
      }
      
      longest = Math.max(longest, streak);
    }
  }
  
  return longest;
}`,
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(n)',
          stepByStep: [
            'Add all numbers to set',
            'For each number:',
            '  If it starts a sequence (num-1 not in set):',
            '    Count consecutive numbers',
            '  Update longest',
            'Return longest'
          ]
        }
      }
    ],

    operations: [
      { name: 'Insert', complexity: 'O(1) average' },
      { name: 'Delete', complexity: 'O(1) average' },
      { name: 'Search', complexity: 'O(1) average' },
      { name: 'Worst case (all)', complexity: 'O(n)' }
    ],

    applications: [
      { name: 'Database Indexing', description: 'Fast record lookup by key', example: 'Redis, PostgreSQL indexes' },
      { name: 'Caching', description: 'Store computed results for quick retrieval', example: 'Browser cache, CDN' },
      { name: 'Symbol Tables', description: 'Compiler variable/function name lookup', example: 'JavaScript engines' },
      { name: 'Spell Checkers', description: 'Dictionary lookup for word validation', example: 'Grammarly, Google Docs' }
    ]
  }
];
