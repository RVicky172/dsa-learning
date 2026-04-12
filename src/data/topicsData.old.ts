import type { Topic } from '../types/topic';
import React from 'react';
import { Hash, List, TreePalm, Zap, Calculator, Layers, Share2, Lightbulb, Network, ArrowUpDown } from 'lucide-react';
import { sortingProblems, searchingProblems } from './sortingAndSearchingProblems';
import { 
  arrayProblems, 
  linkedListProblems, 
  hashTableProblems, 
  stackQueueProblems, 
  treeProblems, 
  graphProblems 
} from './newProblems';

export const topicsData: Topic[] = [
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
      ...arrayProblems
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
      ...linkedListProblems
    ],

    operations: [
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
        hints: ['Use hash map to store seen numbers', 'For each number, check if complement exists', 'Store index as value'],
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
        hints: ['Use hash set for O(1) lookups', 'Only start counting from sequence starts', 'Sequence start is when num-1 is not in set'],
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
          stepByStep: ['Add all numbers to set', 'For each number:', '  If it starts a sequence (num-1 not in set):', '    Count consecutive numbers', '  Update longest', 'Return longest']
        }
      },
      {
        id: 'ht-valid-anagram',
        title: 'Valid Anagram',
        difficulty: 'Easy',
        description: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise.',
        examples: [
          {
            input: 's = "anagram", t = "nagaram"',
            output: 'true'
          },
          {
            input: 's = "rat", t = "car"',
            output: 'false'
          }
        ],
        hints: [
          'Count character frequencies in both strings.',
          'If frequencies match, they are anagrams.',
          'Can you do this with a hash map?'
        ],
        solution: {
          approach: 'Count character frequencies using a hash map. If both strings have identical character frequencies, they are anagrams.',
          code: `function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  
  const charCount = new Map<string, number>();
  
  for (const char of s) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }
  
  for (const char of t) {
    const count = charCount.get(char);
    if (!count) return false;
    charCount.set(char, count - 1);
  }
  
  return true;
}`,
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(1) - at most 26 characters',
          stepByStep: [
            'Check if lengths are different (quick rejection)',
            'Create map to store character frequencies',
            'Count characters in first string',
            'Decrement counts for second string',
            'If any count goes below 0, return false',
            'Return true if all match'
          ]
        }
      },
      {
        id: 'ht-group-anagrams',
        title: 'Group Anagrams',
        difficulty: 'Medium',
        description: 'Given an array of strings strs, group the anagrams together. Return answer in any order.',
        examples: [
          {
            input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
            output: '[["bat"],["nat","tan"],["ate","eat","tea"]]'
          }
        ],
        hints: [
          'Anagrams have same characters when sorted.',
          'Use sorted string as key in hash map.',
          'Group words with same sorted key.'
        ],
        solution: {
          approach: 'Sort characters in each string to get canonical form. Use as key in map to group anagrams.',
          code: `function groupAnagrams(strs: string[]): string[][] {
  const map = new Map<string, string[]>();
  
  for (const str of strs) {
    const sorted = str.split('').sort().join('');
    if (!map.has(sorted)) {
      map.set(sorted, []);
    }
    map.get(sorted)!.push(str);
  }
  
  return Array.from(map.values());
}`,
          timeComplexity: 'O(n * k log k) - n strings, each of length k',
          spaceComplexity: 'O(n * k)',
          stepByStep: [
            'Create map for grouping',
            'For each string: sort its characters',
            'Use sorted string as key',
            'Add original string to group',
            'Return all groups as arrays'
          ]
        }
      },
      {
        id: 'ht-first-unique-char',
        title: 'First Unique Character in a String',
        difficulty: 'Easy',
        description: 'Given a string s, find the first non-repeating character in it and return its index. If all characters repeat, return -1.',
        examples: [
          {
            input: 's = "leetcode"',
            output: '0'
          },
          {
            input: 's = "loveleetcode"',
            output: '2'
          }
        ],
        hints: [
          'Count all character frequencies first.',
          'Then iterate to find first with count of 1.',
          'Two passes needed.'
        ],
        solution: {
          approach: 'Two passes: first count all frequencies, then find first character with frequency 1.',
          code: `function firstUniqChar(s: string): number {
  const charCount = new Map<string, number>();
  
  for (const char of s) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }
  
  for (let i = 0; i < s.length; i++) {
    if (charCount.get(s[i]) === 1) {
      return i;
    }
  }
  
  return -1;
}`,
          timeComplexity: 'O(n) - two passes',
          spaceComplexity: 'O(1) - at most 26 characters',
          stepByStep: [
            'Create map to count character frequencies',
            'First pass: count all characters',
            'Second pass: find first with count 1',
            'Return index if found, -1 otherwise'
          ]
        }
      },
      ...hashTableProblems
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
  },

  {
    id: 'trees',
    title: 'Trees & Heaps',
    description: 'Hierarchical data structures for efficient sorting and searching.',
    complexity: 'O(log n)',
    icon: React.createElement(TreePalm, { size: 24 }),
    delay: 0.4,

    introduction: `Trees are hierarchical data structures consisting of nodes connected by edges. Unlike linear structures like arrays and linked lists, trees represent hierarchical relationships. The top node is called the root, and nodes with no children are called leaves.

Binary trees are the most common type, where each node has at most two children (left and right). Binary Search Trees (BST) maintain the property that left children are smaller and right children are larger, enabling efficient searching. Balanced trees like AVL and Red-Black trees ensure O(log n) operations even in worst case.

Heaps are specialized tree-based structures that satisfy the heap property: in a max heap, parents are larger than children; in a min heap, parents are smaller. Heaps are typically implemented as arrays and are perfect for priority queues, enabling efficient maximum/minimum retrieval.`,

    whyImportant: `Trees are fundamental to computer science. They power databases (B-trees), file systems, DOM in web browsers, decision trees in ML, and more. Understanding trees is essential for system design and algorithm optimization.`,

    whenToUse: [
      'When data has hierarchical relationships',
      'For efficient searching in sorted data (BST)',
      'When you need to find min/max quickly (heap)',
      'For range queries and sorted iteration',
      'Implementing priority queues and schedulers'
    ],

    advantages: [
      'O(log n) search, insert, delete in balanced trees',
      'O(1) access to min/max in heaps',
      'Natural representation of hierarchical data',
      'Efficient range queries',
      'Support sorted iteration (in-order traversal)'
    ],

    disadvantages: [
      'More complex implementation than linear structures',
      'Can degenerate to O(n) if unbalanced',
      'Extra memory for pointers/references',
      'No O(1) access by index',
      'Tree balancing adds complexity'
    ],

    concepts: [
      { name: 'Binary Search Tree', description: 'Binary tree where left < root < right. Enables binary search.' },
      { name: 'Tree Traversals', description: 'In-order (L-Root-R), Pre-order (Root-L-R), Post-order (L-R-Root), Level-order (BFS)' },
      { name: 'Heap Property', description: 'Max heap: parent ≥ children. Min heap: parent ≤ children.' },
      { name: 'Tree Height', description: 'Longest path from root to leaf. Balanced tree has height O(log n).' },
      { name: 'Complete Binary Tree', description: 'All levels filled except possibly last, which is filled left to right. Used for heaps.' }
    ],

    examples: [
      {
        title: 'Binary Search Tree Operations',
        language: 'typescript',
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  
  constructor(val: number) {
    this.val = val;
  }
}

class BST {
  root: TreeNode | null = null;
  
  // Insert - O(log n) average, O(n) worst
  insert(val: number): void {
    this.root = this.insertNode(this.root, val);
  }
  
  private insertNode(node: TreeNode | null, val: number): TreeNode {
    if (!node) return new TreeNode(val);
    
    if (val < node.val) {
      node.left = this.insertNode(node.left, val);
    } else {
      node.right = this.insertNode(node.right, val);
    }
    
    return node;
  }
  
  // Search - O(log n) average, O(n) worst
  search(val: number): boolean {
    return this.searchNode(this.root, val);
  }
  
  private searchNode(node: TreeNode | null, val: number): boolean {
    if (!node) return false;
    if (node.val === val) return true;
    
    return val < node.val 
      ? this.searchNode(node.left, val)
      : this.searchNode(node.right, val);
  }
  
  // In-order traversal (sorted order)
  inOrder(): number[] {
    const result: number[] = [];
    this.inOrderTraversal(this.root, result);
    return result;
  }
  
  private inOrderTraversal(node: TreeNode | null, result: number[]): void {
    if (!node) return;
    this.inOrderTraversal(node.left, result);
    result.push(node.val);
    this.inOrderTraversal(node.right, result);
  }
}`,
        explanation: 'BST maintains sorted property. In-order traversal visits nodes in ascending order. Search and insert follow the BST property to navigate.',
        timeComplexity: 'O(log n) average, O(n) worst if unbalanced',
        spaceComplexity: 'O(n) for tree storage, O(h) recursion stack'
      },
      {
        title: 'Min Heap Implementation',
        language: 'typescript',
        code: `class MinHeap {
  private heap: number[] = [];
  
  parent(i: number): number { return Math.floor((i - 1) / 2); }
  left(i: number): number { return 2 * i + 1; }
  right(i: number): number { return 2 * i + 2; }
  
  // Insert - O(log n)
  insert(val: number): void {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }
  
  private bubbleUp(i: number): void {
    while (i > 0 && this.heap[i] < this.heap[this.parent(i)]) {
      [this.heap[i], this.heap[this.parent(i)]] = 
        [this.heap[this.parent(i)], this.heap[i]];
      i = this.parent(i);
    }
  }
  
  // Extract min - O(log n)
  extractMin(): number | null {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop()!;
    
    const min = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.bubbleDown(0);
    return min;
  }
  
  private bubbleDown(i: number): void {
    while (this.left(i) < this.heap.length) {
      let smaller = this.left(i);
      if (this.right(i) < this.heap.length && 
          this.heap[this.right(i)] < this.heap[smaller]) {
        smaller = this.right(i);
      }
      
      if (this.heap[i] <= this.heap[smaller]) break;
      
      [this.heap[i], this.heap[smaller]] = 
        [this.heap[smaller], this.heap[i]];
      i = smaller;
    }
  }
  
  // Peek min - O(1)
  peek(): number | null {
    return this.heap.length > 0 ? this.heap[0] : null;
  }
}`,
        explanation: 'Min heap maintains parent ≤ children property. Root is always minimum. BubbleUp/BubbleDown maintain heap property after insert/extract.',
        timeComplexity: 'Insert/Extract: O(log n), Peek: O(1)',
        spaceComplexity: 'O(n) for heap storage'
      },
      {
        title: 'Tree Traversals',
        language: 'typescript',
        code: `// DFS Traversals
function inOrder(root: TreeNode | null): number[] {
  if (!root) return [];
  return [...inOrder(root.left), root.val, ...inOrder(root.right)];
}

function preOrder(root: TreeNode | null): number[] {
  if (!root) return [];
  return [root.val, ...preOrder(root.left), ...preOrder(root.right)];
}

function postOrder(root: TreeNode | null): number[] {
  if (!root) return [];
  return [...postOrder(root.left), ...postOrder(root.right), root.val];
}

// BFS (Level Order)
function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  
  const result: number[][] = [];
  const queue: TreeNode[] = [root];
  
  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel: number[] = [];
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      currentLevel.push(node.val);
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    result.push(currentLevel);
  }
  
  return result;
}`,
        explanation: 'Different traversals serve different purposes. In-order gives sorted order for BST. Level-order uses queue for breadth-first traversal.',
        timeComplexity: 'O(n) - visit each node once',
        spaceComplexity: 'O(h) for recursion stack or O(w) for queue width'
      }
    ],

    patterns: [
      {
        name: 'DFS Traversals',
        description: 'Recursively traverse tree in different orders.',
        technique: 'In-order (L-Root-R), Pre-order (Root-L-R), Post-order (L-R-Root)',
        example: 'Validate BST, tree serialization, expression trees',
        whenToUse: ['Processing tree nodes', 'Tree validation', 'Building/copying trees']
      },
      {
        name: 'BFS Level-Order',
        description: 'Traverse tree level by level using queue.',
        technique: 'Use queue. Process all nodes at current level before next level.',
        example: 'Level order traversal, right side view, zigzag traversal',
        whenToUse: ['Level-wise processing', 'Finding depth', 'Nearest neighbor problems']
      },
      {
        name: 'Divide and Conquer',
        description: 'Solve problem by combining solutions from left and right subtrees.',
        technique: 'Recursively solve for both subtrees, then combine results.',
        example: 'Max depth, diameter, lowest common ancestor',
        whenToUse: ['Tree property calculations', 'Path problems', 'Optimization problems']
      },
      {
        name: 'Heap for Top K',
        description: 'Use min/max heap to efficiently track k largest/smallest elements.',
        technique: 'Maintain heap of size k. For k largest, use min heap.',
        example: 'Kth largest element, top k frequent elements',
        whenToUse: ['Finding top/bottom K elements', 'Priority-based problems', 'Streaming data']
      }
    ],

    problems: [
      {
        id: 'tree-max-depth',
        title: 'Maximum Depth of Binary Tree',
        difficulty: 'Easy',
        description: 'Given root of binary tree, return its maximum depth (number of nodes along longest path from root to leaf).',
        examples: [{ input: 'root = [3,9,20,null,null,15,7]', output: '3' }],
        hints: ['Think recursively', 'Depth is 1 + max of left and right depths', 'Base case is null node'],
        solution: {
          approach: 'Recursively calculate max depth of left and right subtrees, return 1 + max of both.',
          code: `function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;
  
  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);
  
  return 1 + Math.max(leftDepth, rightDepth);
}`,
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(h) recursion stack',
          stepByStep: ['If null, return 0', 'Recursively get left depth', 'Recursively get right depth', 'Return 1 + max(left, right)']
        }
      },
      {
        id: 'tree-validate-bst',
        title: 'Validate Binary Search Tree',
        difficulty: 'Medium',
        description: 'Determine if a binary tree is a valid BST.',
        examples: [{ input: '[2,1,3]', output: 'true' }, { input: '[5,1,4,null,null,3,6]', output: 'false' }],
        hints: ['Each node must be in a valid range', 'Left subtree nodes must be < root', 'Right subtree nodes must be > root'],
        solution: {
          approach: 'Recursively validate each node is within valid range (min, max). Update ranges for subtrees.',
          code: `function isValidBST(root: TreeNode | null, 
                       min = -Infinity, max = Infinity): boolean {
  if (!root) return true;
  
  if (root.val <= min || root.val >= max) return false;
  
  return isValidBST(root.left, min, root.val) &&
         isValidBST(root.right, root.val, max);
}`,
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(h)',
          stepByStep: ['If null, return true', 'Check if current value in range', 'Validate left with updated max', 'Validate right with updated min']
        }
      },
      {
        id: 'tree-kth-largest',
        title: 'Kth Largest Element',
        difficulty: 'Medium',
        description: 'Find the kth largest element in an unsorted array.',
        examples: [{ input: '[3,2,1,5,6,4], k = 2', output: '5' }],
        hints: ['Use a min heap of size k', 'Keep only k largest elements in heap', 'Root will be kth largest'],
        solution: {
          approach: 'Maintain min heap of size k. Heap root will be kth largest after processing all elements.',
          code: `function findKthLargest(nums: number[], k: number): number {
  const minHeap = new MinHeap();
  
  for (const num of nums) {
    minHeap.insert(num);
    if (minHeap.size() > k) {
      minHeap.extractMin();
    }
  }
  
  return minHeap.peek()!;
}`,
          timeComplexity: 'O(n log k)',
          spaceComplexity: 'O(k)',
          stepByStep: ['Create min heap', 'For each number:', '  Insert to heap', '  If heap size > k, remove min', 'Return heap root (kth largest)']
        }
      },
      {
        id: 'tree-inorder-traversal',
        title: 'Binary Tree Inorder Traversal',
        difficulty: 'Easy',
        description: 'Given the root of a binary tree, return the inorder traversal of its nodes\' values (Left, Root, Right).',
        examples: [
          {
            input: 'root = [1,null,2,3]',
            output: '[1,3,2]'
          }
        ],
        hints: [
          'Recursive approach: visit left, process node, visit right.',
          'Can you also do it iteratively with a stack?'
        ],
        solution: {
          approach: 'Recursively visit left subtree, process current node, then visit right subtree.',
          code: `function inorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];
  
  const traverse = (node: TreeNode | null) => {
    if (!node) return;
    traverse(node.left);
    result.push(node.val);
    traverse(node.right);
  };
  
  traverse(root);
  return result;
}`,
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(h) recursion stack',
          stepByStep: ['Recursively traverse left subtree', 'Process current node', 'Recursively traverse right subtree']
        }
      },
      {
        id: 'tree-level-order',
        title: 'Binary Tree Level Order Traversal',
        difficulty: 'Medium',
        description: 'Given the root of a binary tree, return the level order traversal of its nodes as a 2D array.',
        examples: [
          {
            input: 'root = [3,9,20,null,null,15,7]',
            output: '[[3],[9,20],[15,7]]'
          }
        ],
        hints: [
          'Use a queue for BFS traversal.',
          'Process all nodes at current level before moving to next.'
        ],
        solution: {
          approach: 'Use BFS with queue. For each level, process all current nodes and add their children.',
          code: `function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  
  const result: number[][] = [];
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
          spaceComplexity: 'O(w) - w is max width',
          stepByStep: ['Use queue for BFS', 'Track level size', 'Process all nodes in current level', 'Add children to queue for next level']
        }
      },
      {
        id: 'tree-is-balanced',
        title: 'Balanced Binary Tree',
        difficulty: 'Easy',
        description: 'Given a binary tree, determine if it is height-balanced. A tree is height-balanced if for every node, the abs difference of left and right heights is <= 1.',
        examples: [
          {
            input: 'root = [3,9,20,null,null,15,7]',
            output: 'true'
          },
          {
            input: 'root = [1,2,2,3,3,null,null,4,4]',
            output: 'false'
          }
        ],
        hints: [
          'Calculate height of each subtree.',
          'Check if difference is <= 1 at every node.',
          'Return both height and balanced status.'
        ],
        solution: {
          approach: 'Recursively check if left and right subtrees are balanced and heights differ by <= 1.',
          code: `function isBalanced(root: TreeNode | null): boolean {
  const checkBalance = (node: TreeNode | null): [number, boolean] => {
    if (!node) return [0, true];
    
    const [leftHeight, leftBalanced] = checkBalance(node.left);
    if (!leftBalanced) return [0, false];
    
    const [rightHeight, rightBalanced] = checkBalance(node.right);
    if (!rightBalanced) return [0, false];
    
    const heightDiff = Math.abs(leftHeight - rightHeight);
    const isCurrentBalanced = heightDiff <= 1;
    
    return [1 + Math.max(leftHeight, rightHeight), isCurrentBalanced];
  };
  
  return checkBalance(root)[1];
}`,
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(h)',
          stepByStep: ['Get height of left subtree and check if balanced', 'Get height of right subtree and check if balanced', 'Check if current node is balanced (height diff <= 1)', 'Return height and balance status']
        }
      },
      ...treeProblems
    ],

    operations: [
      { name: 'BST Search', complexity: 'O(log n) avg, O(n) worst' },
      { name: 'BST Insert', complexity: 'O(log n) avg, O(n) worst' },
      { name: 'BST Delete', complexity: 'O(log n) avg, O(n) worst' },
      { name: 'Heap Insert', complexity: 'O(log n)' },
      { name: 'Heap Extract Min/Max', complexity: 'O(log n)' },
      { name: 'Heap Peek Min/Max', complexity: 'O(1)' }
    ],

    applications: [
      { name: 'File Systems', description: 'Directory hierarchies', example: 'Unix file system tree structure' },
      { name: 'Database Indexing', description: 'B-trees for fast lookup', example: 'MySQL InnoDB indexes' },
      { name: 'Priority Queues', description: 'Task scheduling', example: 'OS process scheduler, Dijkstra\'s algorithm' },
      { name: 'DOM Structure', description: 'HTML element hierarchy', example: 'Browser rendering engine' }
    ]
  },
  {
    id: 'math-bit-logic',
    title: 'Math & Bit Logic',
    description: 'Master the low-level logic that powers computers: Binary, Bitwise, and Logarithms.',
    complexity: 'O(1) Bitwise',
    icon: React.createElement(Calculator, { size: 24 }),
    delay: 0.15,

    introduction: `Underneath all high-level code lies binary: 0s and 1s. Math and Bit Logic are the tools we use to manipulate this data directly at the machine level. This topic covers three critical pillars:
    
1. **Binary Conversion**: Understanding how integers are represented in base-2 and how to translate between decimal and binary.
2. **Bitwise Operations**: Using logical operators like AND, OR, XOR, and NOT to manipulate individual bits efficiently.
3. **Logarithms**: The mathematical foundation of algorithm analysis. If you understand logarithms, you understand why Binary Search is O(log n) and why it's so powerful.

Mastering these concepts allows you to write highly optimized code, understand low-level systems, and solve complex problems that involve permissions, flags, or mathematical optimizations.`,

    whyImportant: `Bitwise operations are significantly faster than arithmetic operations because they are executed directly by the CPU in a single clock cycle. Logarithms are the key to understanding efficiency—they appear whenever a problem space is halved repeatedly. Together, these form the "science" in Computer Science.`,

    whenToUse: [
      'Managing sets of flags or permissions (using bitmasks)',
      'Optimizing mathematical calculations (multiplying/dividing by powers of 2)',
      'Solving problems with limited memory (storing multiple values in one integer)',
      'Analyzing algorithm complexity (logarithmic time)',
      'Implementing low-level protocols or data formats'
    ],

    advantages: [
      'Extremely high performance (single CPU cycle)',
      'Minimal memory footprint (compact data storage)',
      'Enables "magic" optimizations (like XOR swap)',
      'Foundation for understanding Big O (log n)',
      'Direct hardware interaction capability'
    ],

    disadvantages: [
      'Can be difficult to read and maintain (code feels "cryptic")',
      'Easy to introduce off-by-one errors in bit shifts',
      'Platform dependency (endianness concerns in some languages)',
      'Limited to integer types usually'
    ],

    concepts: [
      {
        name: 'The Power of Logarithms',
        description: 'A logarithm is the inverse of exponentiation. log₂(n) tells you how many times you can divide a number n by 2 until you reach 1. This is why halving a search space (Binary Search) results in O(log n) complexity.'
      },
      {
        name: 'Binary Representation',
        description: 'Numbers are stored as sequences of bits. For example, 5 in decimal is 101 in binary (4 + 0 + 1). Understanding positional notation is key.'
      },
      {
        name: 'Bitwise Operators',
        description: 'AND (&), OR (|), XOR (^), NOT (~). These operate on bits at the same position in two numbers. XOR is particularly useful because x ^ x = 0 and x ^ 0 = x.'
      },
      {
        name: 'Bit Shifting',
        description: 'Left shift (<<) multiplies a number by 2 per shift. Right shift (>>) divides by 2. This is the fastest way to perform power-of-2 arithmetic.'
      },
      {
        name: 'Bitmasking',
        description: 'Using a binary pattern to "mask" or filter specific bits in a value. Used extensively for permissions (e.g., Read/Write/Execute bits).'
      }
    ],

    examples: [
      {
        title: 'Binary to Decimal & Back',
        language: 'typescript',
        code: `// Decimal to Binary string
function toBinary(n: number): string {
  return n.toString(2);
}

// Binary string to Decimal
function toDecimal(bin: string): number {
  return parseInt(bin, 2);
}

console.log(toBinary(13)); // "1101" (8+4+0+1)
console.log(toDecimal("1011")); // 11 (8+0+2+1)`,
        explanation: 'In JavaScript/TypeScript, we can easily convert bases using toString and parseInt. Understanding the manual way (repeatedly dividing by 2 or powers of 2) is also important for theory.',
        timeComplexity: 'O(log n) - bits are proportional to log(n)',
        spaceComplexity: 'O(log n) - string length'
      },
      {
        title: 'Bitwise Magic: Power of Two',
        language: 'typescript',
        code: `// Check if a number is a power of 2
// Concept: A power of 2 has only one 1-bit. 
// n-1 will have all 1s where n had 0s and 0 where n had 1.
// 8 (1000) & 7 (0111) = 0000
function isPowerOfTwo(n: number): boolean {
  if (n <= 0) return false;
  return (n & (n - 1)) === 0;
}

console.log(isPowerOfTwo(16)); // true
console.log(isPowerOfTwo(18)); // false`,
        explanation: 'This is a classic bitwise trick. It uses the property that powers of two in binary are a single 1 followed by 0s. Subtracting 1 flips all those bits.',
        timeComplexity: 'O(1) - single instruction',
        spaceComplexity: 'O(1)'
      },
      {
        title: 'XOR Shortcut: Find Unique',
        language: 'typescript',
        code: `// Find the element that appears only once in an array 
// where every other element appears twice.
function findUnique(nums: number[]): number {
  let unique = 0;
  for (let num of nums) {
    unique ^= num; // XOR properties: a^a=0, a^0=a
  }
  return unique;
}

console.log(findUnique([4, 1, 2, 1, 2])); // 4`,
        explanation: 'Because XOR is commutative and associative, and x ^ x = 0, all duplicate pairs cancel each other out, leaving only the unique number. No extra space needed!',
        timeComplexity: 'O(n) - one pass',
        spaceComplexity: 'O(1)'
      }
    ],

    patterns: [
      {
        name: 'Bitmasking for Sets',
        description: 'Encode a set of booleans into a single integer.',
        technique: 'Assign a power of 2 to each property. Use OR to set, AND to check.',
        example: 'Linux file permissions (777 = rwxrwxrwx)',
        whenToUse: ['Storing flags', 'Compact boolean arrays', 'Settings management']
      },
      {
        name: 'The Binary Search Math',
        description: 'Applying log₂(n) to determine search depth.',
        technique: 'If you double the input, you only add ONE step to the search.',
        example: 'Searching 1,000,000 items takes only ~20 steps.',
        whenToUse: ['System design estimation', 'Complexity analysis', 'Scalability planning']
      }
    ],

    problems: [
      {
        id: 'math-number-of-1-bits',
        title: 'Number of 1 Bits',
        difficulty: 'Easy',
        description: 'Write a function that takes an unsigned integer and returns the number of \'1\' bits it has (also known as the Hamming weight).',
        examples: [{ input: 'n = 11 (1011 in binary)', output: '3' }],
        hints: ['You can use bit shifting and AND mask', 'Check n & 1 in each step', 'Alternatively, use n & (n-1) to clear bits'],
        solution: {
          approach: 'Use bit shifting to check each bit one by one, OR use the Brian Kernighan\'s algorithm (n & n-1) to clear the least significant set bit each time.',
          code: `function hammingWeight(n: number): number {
  let count = 0;
  while (n !== 0) {
    n = n & (n - 1); // Clears the lowest set bit
    count++;
  }
  return count;
}`,
          timeComplexity: 'O(number of set bits)',
          spaceComplexity: 'O(1)',
          stepByStep: ['Initialize count to 0', 'While number is not 0:', '  Subtract 1 and Bitwise AND with self (n & n-1)', '  This removes one "1" bit from the number', '  Increment count', 'Return count']
        }
      }
    ],

    operations: [
      { name: 'BIT AND/OR/XOR', complexity: 'O(1)' },
      { name: 'BIT Shift', complexity: 'O(1)' },
      { name: 'Decimal to Binary', complexity: 'O(log n)' },
      { name: 'Int size check', complexity: 'O(1)' }
    ],

    applications: [
      { name: 'Cryptography', description: 'Heavy use of XOR and complex bitwise rotations', example: 'AES, SHA-256 hashing' },
      { name: 'Graphics & Pixels', description: 'Color data is often packed into 32-bit integers (RGBA)', example: 'Canvas API pixel manipulation' },
      { name: 'Networking', description: 'IP addresses and subnet masks are bitwise filters', example: 'Subnetting in IPv4' },
      { name: 'Compression', description: 'Binary trees and bit manipulation for file size reduction', example: 'Huffman Coding' }
    ]
  },

  {
    id: 'stacks-queues',
    title: 'Stacks & Queues',
    description: 'LIFO and FIFO data structures for managing ordered collections.',
    complexity: 'O(1) Push/Pop',
    icon: React.createElement(Layers, { size: 24 }),
    delay: 0.3,

    introduction: `Stacks and queues are fundamental abstract data types that restrict how elements are inserted and removed. While arrays and linked lists allow arbitrary access patterns, stacks (Last-In-First-Out) and queues (First-In-First-Out) enforce specific orderings that make them perfect for solving particular problems efficiently.

A stack works like a stack of plates: you add and remove from the top. This LIFO behavior is natural for problems involving backtracking, undo operations, and expression evaluation. Queues work like a line at a grocery store: you add at the end and remove from the front (FIFO), making them ideal for breadth-first searches and task scheduling.

Both can be implemented using arrays or linked lists, with different trade-offs. Understanding these structures is crucial because they form the foundation for many algorithms including graph traversals (BFS/DFS) and dynamic programming solutions.`,

    whyImportant: `Stacks and queues appear in virtually every programming domain. Web browsers use stacks for the back button, operating systems use queues for process scheduling, and both are essential for tree/graph algorithms. Mastery of these structures is critical for technical interviews.`,

    whenToUse: [
      'Stack: Function call management, undo/redo functionality, expression evaluation',
      'Stack: Depth-first search, parentheses matching, backtracking problems',
      'Queue: Level-order traversal of trees, breadth-first search',
      'Queue: Task scheduling, print queue management, message processing'
    ],

    advantages: [
      'O(1) time for push, pop, and peek operations',
      'Simple and intuitive to understand and implement',
      'Stack: Automatic handling of nested structures',
      'Queue: Fair FIFO ordering for job processing',
      'Both: Can be implemented with arrays or linked lists'
    ],

    disadvantages: [
      'Limited access patterns - can\'t access middle elements efficiently',
      'No random access capability',
      'Stack overflow risk with deep recursion',
      'Queue requires good implementation to avoid waste (circular queues needed for efficiency)'
    ],

    concepts: [
      { name: 'Stack (LIFO)', description: 'Last-In-First-Out data structure. Elements added and removed from the same end (top).' },
      { name: 'Queue (FIFO)', description: 'First-In-First-Out data structure. Elements added at rear, removed from front.' },
      { name: 'Push/Enqueue', description: 'Operations to add elements to stack/queue.' },
      { name: 'Pop/Dequeue', description: 'Operations to remove elements from stack/queue.' },
      { name: 'Monotonic Stack', description: 'A stack where elements are in increasing or decreasing order. Useful for problems like next greater element.' },
      { name: 'Priority Queue', description: 'Queue where elements are processed based on priority rather than order. Often implemented with heaps.' }
    ],

    examples: [
      {
        title: 'Stack Implementation',
        language: 'typescript',
        code: `class Stack<T> {
  private items: T[] = [];

  push(element: T): void {
    this.items.push(element);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}

// Usage
const stack = new Stack<number>();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.pop()); // 3 (LIFO)`,
        explanation: 'Basic stack implementation showing push, pop, and peek operations all running in O(1) time.',
        timeComplexity: 'O(1) for all operations',
        spaceComplexity: 'O(n) for storage'
      },
      {
        title: 'Queue Implementation',
        language: 'typescript',
        code: `class Queue<T> {
  private items: T[] = [];
  private front = 0;

  enqueue(element: T): void {
    this.items.push(element);
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;
    return this.items[this.front++];
  }

  peek(): T | undefined {
    return this.items[this.front];
  }

  isEmpty(): boolean {
    return this.front >= this.items.length;
  }

  size(): number {
    return this.items.length - this.front;
  }
}

// Usage
const queue = new Queue<number>();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log(queue.dequeue()); // 1 (FIFO)`,
        explanation: 'Queue implementation with front pointer to track dequeue position, avoiding expensive array shift operations.',
        timeComplexity: 'O(1) for all operations',
        spaceComplexity: 'O(n) for storage'
      },
      {
        title: 'Monotonic Stack Pattern',
        language: 'typescript',
        code: `// Find next greater element using monotonic stack
function nextGreaterElement(nums: number[]): number[] {
  const result = new Array(nums.length).fill(-1);
  const stack: number[] = [];

  for (let i = nums.length - 1; i >= 0; i--) {
    // Remove elements smaller than current
    while (stack.length > 0 && stack[stack.length - 1] <= nums[i]) {
      stack.pop();
    }

    // Top of stack is next greater (if exists)
    if (stack.length > 0) {
      result[i] = stack[stack.length - 1];
    }

    // Push current for future lookups
    stack.push(nums[i]);
  }

  return result;
}

console.log(nextGreaterElement([1, 2, 1])); // [2, -1, -1]`,
        explanation: 'Monotonic stack efficiently finds next greater element in O(n) instead of O(n²) brute force.',
        timeComplexity: 'O(n) - each element pushed and popped once',
        spaceComplexity: 'O(n) for stack'
      }
    ],

    patterns: [
      {
        name: 'Expression Evaluation',
        description: 'Use stack to evaluate infix expressions or convert to postfix.',
        technique: 'Track operators and operands on stack, pop and apply operations based on precedence.',
        example: 'Evaluate mathematical expressions, calculator implementation',
        whenToUse: ['Parsing expressions', 'Evaluating mathematical formulas', 'Compiler design']
      },
      {
        name: 'BFS Traversal',
        description: 'Use queue to traverse graph/tree level by level.',
        technique: 'Enqueue starting node, then iteratively dequeue and process, enqueueing unvisited neighbors.',
        example: 'Level-order tree traversal, shortest path in unweighted graph',
        whenToUse: ['Finding shortest path', 'Level-order traversal', 'Connected components']
      },
      {
        name: 'DFS with Stack',
        description: 'Use stack to perform iterative depth-first search.',
        technique: 'Use stack instead of recursion to avoid stack overflow on deep trees.',
        example: 'Iterative tree traversal, topological sort',
        whenToUse: ['Avoiding recursion depth limits', 'Graph traversal', 'Backtracking']
      },
      {
        name: 'Parentheses Matching',
        description: 'Use stack to validate and match brackets/parentheses.',
        technique: 'Push opening brackets, pop and match with closing brackets.',
        example: 'Valid parentheses, balanced brackets, expression parsing',
        whenToUse: ['Bracket validation', 'Expression parsing', 'HTML tag matching']
      }
    ],

    problems: [
      {
        id: 'valid-parentheses',
        title: 'Valid Parentheses',
        difficulty: 'Easy',
        description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid. An input string is valid if all brackets are closed in the correct order.',
        examples: [
          { input: 's = "()"', output: 'true' },
          { input: 's = "()[]{}"', output: 'true' },
          { input: 's = "(]"', output: 'false' }
        ],
        hints: [
          'Use a stack to track opening brackets',
          'For each closing bracket, check if it matches the most recent opening',
          'At the end, stack should be empty for valid string'
        ],
        solution: {
          approach: 'Use a stack. Push opening brackets, pop and validate closing brackets match. At end, stack must be empty.',
          code: `function isValid(s: string): boolean {
  const stack: string[] = [];
  const pairs: Record<string, string> = { ')': '(', '}': '{', ']': '[' };

  for (const char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      if (stack.length === 0 || stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}`,
          timeComplexity: 'O(n) - single pass through string',
          spaceComplexity: 'O(n) - stack in worst case',
          stepByStep: [
            'Create empty stack',
            'Create mapping of closing to opening brackets',
            'Iterate through each character',
            'If opening bracket, push to stack',
            'If closing bracket, check if stack is empty (return false if so)',
            'Pop from stack and check if matches closing bracket',
            'After iteration, return true if stack is empty'
          ]
        }
      },
      {
        id: 'daily-temperatures',
        title: 'Daily Temperatures',
        difficulty: 'Medium',
        description: 'Given an array of integers temperatures representing the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.',
        examples: [
          { input: 'temperatures = [73,74,75,71,69,72,76,73]', output: '[1,1,4,2,1,1,0,0]' }
        ],
        hints: [
          'Use a monotonic decreasing stack',
          'Store indices, not values',
          'Pop when current temperature is warmer than stack top'
        ],
        solution: {
          approach: 'Use monotonic stack to store indices of days. For each day, pop days with lower temperatures and calculate difference.',
          code: `function dailyTemperatures(temperatures: number[]): number[] {
  const result = new Array(temperatures.length).fill(0);
  const stack: number[] = []; // Stack of indices

  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const prevIndex = stack.pop()!;
      result[prevIndex] = i - prevIndex;
    }
    stack.push(i);
  }

  return result;
}`,
          timeComplexity: 'O(n) - each element pushed and popped once',
          spaceComplexity: 'O(n) - stack storage',
          stepByStep: [
            'Create result array filled with zeros',
            'Create empty stack to store indices',
            'Iterate through temperatures with index',
            'While stack has elements and current temp > stack top temperature:',
            '  Pop index from stack',
            '  Calculate days = current index - popped index',
            '  Set result[popped index] = days',
            'Push current index onto stack',
            'Return result array'
          ]
        }
      },
      ...stackQueueProblems
    ],

    operations: [
      { name: 'Push/Enqueue', complexity: 'O(1)' },
      { name: 'Pop/Dequeue', complexity: 'O(1)' },
      { name: 'Peek', complexity: 'O(1)' },
      { name: 'Search', complexity: 'O(n)' }
    ],

    applications: [
      { name: 'Browser History', description: 'Back/forward buttons use stack for navigation history', example: 'Chrome browser back button' },
      { name: 'Function Call Stack', description: 'CPU uses stack to manage function calls and returns', example: 'Call stack in debuggers' },
      { name: 'Task Scheduling', description: 'Operating systems use queues for process scheduling', example: 'CPU task queue in OS' },
      { name: 'BFS Algorithms', description: 'Queues enable efficient breadth-first search', example: 'Finding shortest path in maze' }
    ]
  },

  {
    id: 'heaps',
    title: 'Heaps & Priority Queues',
    description: 'Complete binary trees optimized for finding min/max elements.',
    complexity: 'O(log n) Insert/Delete',
    icon: React.createElement(Network, { size: 24 }),
    delay: 0.4,

    introduction: `A heap is a specialized tree-based data structure that satisfies the heap property. In a min heap, every parent node is smaller than its children. In a max heap, every parent is larger than its children. This ordering makes heaps incredibly efficient for finding and removing the minimum (or maximum) element.

Heaps are typically implemented using arrays for memory efficiency, where for a node at index i, its children are at indices 2i+1 and 2i+2. This implicit tree structure eliminates the need for explicit pointers while maintaining the heap property through operations like heapify.

Priority queues are abstract data types where elements have associated priorities. Heaps are the most common and efficient implementation of priority queues, enabling O(log n) insertion and O(1) minimum/maximum retrieval.`,

    whyImportant: `Heaps are essential for many algorithms including Dijkstra's shortest path, Prim's minimum spanning tree, and heap sort. They appear in systems programming (process scheduling), event simulation, and numerous algorithmic problems. Understanding heaps demonstrates knowledge of advanced data structures.`,

    whenToUse: [
      'Finding k largest/smallest elements efficiently',
      'Implementing priority queues',
      'Heap sort for sorting',
      'Dijkstra and Prim algorithms for graphs',
      'Median finding and streaming problems'
    ],

    advantages: [
      'O(1) to find min/max element',
      'O(log n) for insertion and deletion',
      'Efficient array-based implementation with no pointers needed',
      'Supports partial sorting without full sort',
      'Great for online algorithms and streaming data'
    ],

    disadvantages: [
      'O(n) to search for specific element',
      'Only min or max accessible efficiently (not both in simple heap)',
      'Not suitable for range queries',
      'Array implementation can waste space'
    ],

    concepts: [
      { name: 'Min Heap', description: 'Parent nodes are smaller than children. Root is minimum element.' },
      { name: 'Max Heap', description: 'Parent nodes are larger than children. Root is maximum element.' },
      { name: 'Heapify', description: 'Process to restore heap property after insertion/deletion by comparing and swapping with parent.' },
      { name: 'Heap Sort', description: 'Sorting algorithm using heap structure. O(n log n) time complexity.' },
      { name: 'Priority Queue', description: 'Abstract data type where elements have priorities, efficiently implemented using heap.' }
    ],

    examples: [
      {
        title: 'Min Heap Implementation',
        language: 'typescript',
        code: `class MinHeap {
  private heap: number[] = [];

  private parent(i: number): number { return Math.floor((i - 1) / 2); }
  private left(i: number): number { return 2 * i + 1; }
  private right(i: number): number { return 2 * i + 2; }

  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  insert(val: number): void {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  private bubbleUp(i: number): void {
    while (i > 0 && this.heap[i] < this.heap[this.parent(i)]) {
      this.swap(i, this.parent(i));
      i = this.parent(i);
    }
  }

  extractMin(): number | undefined {
    if (this.heap.length === 0) return undefined;
    const min = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();
    this.bubbleDown(0);
    return min;
  }

  private bubbleDown(i: number): void {
    while (this.left(i) < this.heap.length) {
      let smallest = i;
      if (this.heap[this.left(i)] < this.heap[smallest]) {
        smallest = this.left(i);
      }
      if (this.right(i) < this.heap.length && this.heap[this.right(i)] < this.heap[smallest]) {
        smallest = this.right(i);
      }
      if (smallest === i) break;
      this.swap(i, smallest);
      i = smallest;
    }
  }
}`,
        explanation: 'Complete min heap implementation with insert and extractMin operations. Uses array-based representation.',
        timeComplexity: 'O(log n) for insert and extract',
        spaceComplexity: 'O(n) for storage'
      },
      {
        title: 'Find K Largest Elements',
        language: 'typescript',
        code: `function findKLargest(nums: number[], k: number): number[] {
  // Use min heap of size k
  const heap: number[] = [];

  for (let num of nums) {
    heap.push(num);
    // Keep heap size to k by removing minimum
    if (heap.length > k) {
      // Remove the smallest element
      heap.sort((a, b) => a - b);
      heap.shift();
    }
  }

  return heap.sort((a, b) => b - a);
}

console.log(findKLargest([1, 2, 3, 4, 5], 2)); // [5, 4]`,
        explanation: 'Uses a min heap to efficiently track k largest elements with O(n log k) time complexity.',
        timeComplexity: 'O(n log k) - each insertion is O(log k)',
        spaceComplexity: 'O(k) - heap stores only k elements'
      }
    ],

    patterns: [
      {
        name: 'Top K Elements',
        description: 'Use min heap to find k largest or max heap to find k smallest.',
        technique: 'Maintain heap of size k. For k largest, remove minimum when size exceeds k.',
        example: 'K closest points, k frequent elements, k largest numbers',
        whenToUse: ['Finding top K items', 'Frequent elements problems', 'Closest pairs']
      },
      {
        name: 'Merge K Sorted Lists',
        description: 'Use min heap to efficiently merge multiple sorted sequences.',
        technique: 'Put all heads in min heap, repeatedly extract min and add next from same source.',
        example: 'Merge sorted arrays, merge sorted linked lists',
        whenToUse: ['Merging multiple sorted sequences', 'External sorting', 'Database merge operations']
      },
      {
        name: 'Median Finding',
        description: 'Use two heaps (max and min) to track median in data stream.',
        technique: 'Max heap stores smaller half, min heap stores larger half.',
        example: 'Find median in stream, sliding window median',
        whenToUse: ['Streaming data', 'Running median', 'Online statistics']
      }
    ],

    problems: [
      {
        id: 'kth-largest',
        title: 'Kth Largest Element',
        difficulty: 'Medium',
        description: 'Find the kth largest element in an unsorted array. Note that it is the kth largest element in the sorted order, not the kth distinct element.',
        examples: [
          { input: 'nums = [3,2,1,5,6,4], k = 2', output: '5' },
          { input: 'nums = [3,2,3,1,2,4,5,5,6], k = 4', output: '4' }
        ],
        hints: [
          'You could sort the array and return k-th element.',
          'Try using a min heap of size k.',
          'The root of min heap would be kth largest element.'
        ],
        solution: {
          approach: 'Maintain a min heap of size k. Iterate through array, add elements to heap, remove min when size exceeds k.',
          code: `function findKthLargest(nums: number[], k: number): number {
  const minHeap: number[] = [];

  for (let num of nums) {
    if (minHeap.length < k) {
      minHeap.push(num);
      minHeap.sort((a, b) => a - b);
    } else if (num > minHeap[0]) {
      minHeap[0] = num;
      minHeap.sort((a, b) => a - b);
    }
  }

  return minHeap[0];
}`,
          timeComplexity: 'O(n log k) - each insertion/comparison is O(log k)',
          spaceComplexity: 'O(k) - heap stores k elements',
          stepByStep: [
            'Create empty min heap',
            'For each number in array:',
            '  If heap size < k: add number to heap',
            '  Else if number > heap root: replace root with number',
            '  Re-heapify after each change',
            'Return root of heap (kth largest)'
          ]
        }
      }
    ],

    operations: [
      { name: 'Insert', complexity: 'O(log n)' },
      { name: 'Extract Min/Max', complexity: 'O(log n)' },
      { name: 'Peek Min/Max', complexity: 'O(1)' },
      { name: 'Heapify (from array)', complexity: 'O(n)' }
    ],

    applications: [
      { name: 'Priority Queues', description: 'CPU scheduling, disk I/O scheduling in operating systems', example: 'Process scheduler with priority levels' },
      { name: 'Dijkstra\'s Algorithm', description: 'Shortest path in weighted graphs uses min heap', example: 'GPS navigation systems' },
      { name: 'Huffman Coding', description: 'Optimal prefix encoding for data compression', example: 'JPEG, MP3 compression' },
      { name: 'Heap Sort', description: 'In-place sorting algorithm with O(n log n) guarantee', example: 'System sorting when stability not needed' }
    ]
  },

  {
    id: 'graphs',
    title: 'Graphs',
    description: 'Networks of nodes connected by edges for modeling relationships.',
    complexity: 'O(V+E) Traversal',
    icon: React.createElement(Share2, { size: 24 }),
    delay: 0.5,

    introduction: `A graph is a non-linear data structure consisting of vertices (nodes) and edges connecting them. Graphs are incredibly versatile and model real-world networks: social networks, transportation systems, the internet, chemical molecules, and countless other domains.

Graphs can be directed (edges have direction) or undirected (bidirectional), weighted (edges have values) or unweighted. They can be sparse (few edges) or dense (many edges). The choice of representation (adjacency list, adjacency matrix, or edge list) significantly impacts algorithm efficiency.

Graph algorithms form a core area of computer science. From simple traversal (BFS/DFS) to complex problems (shortest paths, minimum spanning trees, flow networks), understanding graphs is essential for advanced problem-solving.`,

    whyImportant: `Graphs appear in virtually every domain of computer science and real-world applications. Social networks, recommendation systems, routing protocols, compilers, and game AI all rely on graph algorithms. Strong graph knowledge is crucial for system design, technical interviews, and competitive programming.`,

    whenToUse: [
      'Representing networks and relationships between entities',
      'Finding paths between nodes (shortest path, any path)',
      'Detecting cycles or topological ordering',
      'Finding connected components',
      'Minimum spanning trees and clustering'
    ],

    advantages: [
      'Versatile representation for complex relationships',
      'Rich set of algorithms with proven efficiency',
      'Natural modeling of networks and hierarchies',
      'Can handle dynamic problems (changing connections)',
      'Foundation for many advanced algorithms'
    ],

    disadvantages: [
      'More complex than linear data structures',
      'Storage requirements scale with edges (can be O(V²))',
      'Some problems are NP-hard on graphs',
      'Traversal complexity depends on graph density',
      'Debugging graph algorithms can be challenging'
    ],

    concepts: [
      { name: 'Directed vs Undirected', description: 'Directed graphs have one-way edges (A→B). Undirected graphs have bidirectional edges.' },
      { name: 'Weighted Graphs', description: 'Edges have associated values (weights). Used for costs, distances, capacities.' },
      { name: 'Adjacency List', description: 'Efficient representation using lists of neighbors for each vertex. Space: O(V+E).' },
      { name: 'Adjacency Matrix', description: 'Matrix representation where matrix[i][j] indicates edge from i to j. Space: O(V²).' },
      { name: 'Connected Components', description: 'Groups of vertices where every vertex is reachable from every other in the group.' },
      { name: 'Cycle', description: 'Path that starts and ends at same vertex. Detecting cycles is important for DAG validation.' }
    ],

    examples: [
      {
        title: 'BFS Traversal',
        language: 'typescript',
        code: `function bfs(graph: Map<string, string[]>, start: string): string[] {
  const visited = new Set<string>();
  const queue: string[] = [start];
  const result: string[] = [];

  visited.add(start);

  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node);

    const neighbors = graph.get(node) || [];
    for (let neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return result;
}

// Graph as adjacency list
const graph = new Map([
  ['A', ['B', 'C']],
  ['B', ['A', 'D']],
  ['C', ['A', 'E']],
  ['D', ['B']],
  ['E', ['C']]
]);

console.log(bfs(graph, 'A')); // ['A', 'B', 'C', 'D', 'E']`,
        explanation: 'Breadth-first search explores all neighbors before going deeper. Uses queue to maintain level-order traversal.',
        timeComplexity: 'O(V + E) - visit each vertex and edge once',
        spaceComplexity: 'O(V) - queue and visited set'
      },
      {
        title: 'DFS Traversal (Iterative)',
        language: 'typescript',
        code: `function dfs(graph: Map<string, string[]>, start: string): string[] {
  const visited = new Set<string>();
  const stack: string[] = [start];
  const result: string[] = [];

  visited.add(start);

  while (stack.length > 0) {
    const node = stack.pop()!;
    result.push(node);

    const neighbors = graph.get(node) || [];
    for (let i = neighbors.length - 1; i >= 0; i--) {
      const neighbor = neighbors[i];
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        stack.push(neighbor);
      }
    }
  }

  return result;
}

const graph = new Map([
  ['A', ['B', 'C']],
  ['B', ['A', 'D']],
  ['C', ['A', 'E']],
  ['D', ['B']],
  ['E', ['C']]
]);

console.log(dfs(graph, 'A')); // ['A', 'C', 'E', 'B', 'D']`,
        explanation: 'Depth-first search explores as far as possible along each branch before backtracking. Stack-based iterative implementation.',
        timeComplexity: 'O(V + E) - visit each vertex and edge once',
        spaceComplexity: 'O(V) - stack and visited set'
      },
      {
        title: 'Dijkstra\'s Shortest Path',
        language: 'typescript',
        code: `function dijkstra(graph: Map<string, [string, number][]>, start: string): Map<string, number> {
  const distances = new Map<string, number>();
  const visited = new Set<string>();

  // Initialize distances
  for (let node of graph.keys()) {
    distances.set(node, Infinity);
  }
  distances.set(start, 0);

  while (visited.size < graph.size) {
    // Find unvisited node with minimum distance
    let minNode = '';
    let minDist = Infinity;
    for (let [node, dist] of distances) {
      if (!visited.has(node) && dist < minDist) {
        minNode = node;
        minDist = dist;
      }
    }

    if (minNode === '' || minDist === Infinity) break;
    visited.add(minNode);

    // Update distances to neighbors
    const neighbors = graph.get(minNode) || [];
    for (let [neighbor, weight] of neighbors) {
      const newDist = distances.get(minNode)! + weight;
      if (newDist < distances.get(neighbor)!) {
        distances.set(neighbor, newDist);
      }
    }
  }

  return distances;
}`,
        explanation: 'Dijkstra finds shortest paths from source to all vertices. Greedy approach picking nearest unvisited node each iteration.',
        timeComplexity: 'O(V²) without heap, O((V+E) log V) with min heap',
        spaceComplexity: 'O(V) - distances and visited tracking'
      }
    ],

    patterns: [
      {
        name: 'BFS for Shortest Path',
        description: 'Use BFS in unweighted graphs to find shortest path between two vertices.',
        technique: 'Start from source, visit all neighbors (distance 1), then their unvisited neighbors (distance 2), etc.',
        example: 'Shortest path in maze, word ladder, minimum steps',
        whenToUse: ['Unweighted graphs', 'Finding shortest path', 'Level-order exploration']
      },
      {
        name: 'DFS for Connected Components',
        description: 'Use DFS/BFS to find and count connected components in graph.',
        technique: 'For each unvisited node, do DFS/BFS to mark entire connected component.',
        example: 'Number of islands, connected components, finding cycles',
        whenToUse: ['Finding clusters', 'Cycle detection', 'Graph partitioning']
      },
      {
        name: 'Topological Sort',
        description: 'Order vertices in DAG such that for every directed edge, source comes before destination.',
        technique: 'Use DFS with post-order processing or Kahn\'s algorithm with indegree.',
        example: 'Course prerequisites, task scheduling, dependency resolution',
        whenToUse: ['Directed acyclic graphs', 'Scheduling', 'Dependency ordering']
      },
      {
        name: 'Union-Find (Disjoint Set)',
        description: 'Efficiently determine if two vertices are in same component and merge components.',
        technique: 'Parent pointers with path compression and union by rank for optimization.',
        example: 'Cycle detection, minimum spanning tree (Kruskal), network connectivity',
        whenToUse: ['Detecting cycles', 'MST algorithms', 'Bipartite checking']
      }
    ],

    problems: [
      {
        id: 'number-of-islands',
        title: 'Number of Islands',
        difficulty: 'Medium',
        description: 'Given an m x n 2D binary grid where 1 represents land and 0 represents water, return the number of islands. An island is surrounded by water and formed by connecting adjacent lands horizontally or vertically.',
        examples: [
          { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: '1' }
        ],
        hints: [
          'Use DFS or BFS to explore each island',
          'Mark visited cells to avoid reprocessing',
          'Increment island count when discovering new island'
        ],
        solution: {
          approach: 'Iterate through grid. When finding land (1), do DFS/BFS to mark entire island as visited and increment counter.',
          code: `function numIslands(grid: string[][]): number {
  if (!grid || grid.length === 0) return 0;
  let count = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '1') {
        dfs(grid, i, j);
        count++;
      }
    }
  }

  return count;

  function dfs(grid: string[][], i: number, j: number): void {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] === '0') {
      return;
    }
    grid[i][j] = '0'; // Mark as visited
    dfs(grid, i + 1, j);
    dfs(grid, i - 1, j);
    dfs(grid, i, j + 1);
    dfs(grid, i, j - 1);
  }
}`,
          timeComplexity: 'O(m × n) - visit each cell once',
          spaceComplexity: 'O(m × n) - recursion depth in worst case',
          stepByStep: [
            'Iterate through each cell in grid',
            'When finding land (1):',
            '  Perform DFS from that cell',
            '  Mark all connected land cells as visited (0)',
            '  Increment island count',
            'Continue until all cells explored',
            'Return total island count'
          ]
        }
      },
      ...graphProblems
    ],

    operations: [
      { name: 'BFS Traversal', complexity: 'O(V + E)' },
      { name: 'DFS Traversal', complexity: 'O(V + E)' },
      { name: 'Shortest Path (Dijkstra)', complexity: 'O((V + E) log V)' },
      { name: 'Topological Sort', complexity: 'O(V + E)' }
    ],

    applications: [
      { name: 'Social Networks', description: 'Graph of users and friendships for recommendations', example: 'Facebook friend suggestions' },
      { name: 'Navigation Systems', description: 'Shortest path algorithms for route finding', example: 'Google Maps directions' },
      { name: 'Web Crawling', description: 'Graph traversal to index web pages', example: 'Search engine indexing' },
      { name: 'Game AI', description: 'Pathfinding and decision trees for game characters', example: 'NPC movement in games' }
    ]
  },

  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming',
    description: 'Optimize recursive problems by storing intermediate results.',
    complexity: 'Problem Dependent',
    icon: React.createElement(Calculator, { size: 24 }),
    delay: 0.7,

    introduction: `Dynamic Programming is an optimization technique for solving complex problems by breaking them down into simpler subproblems and storing the results to avoid recomputation. It applies to problems with optimal substructure (optimal solution built from optimal solutions to subproblems) and overlapping subproblems (same subproblems solved multiple times).

DP combines divide-and-conquer with memoization (top-down) or tabulation (bottom-up) to avoid exponential time complexity. The difference between a recursive solution and a DP solution is storing and reusing results - often reducing time complexity from exponential to polynomial.

DP problems can be solved using either top-down (memoization with recursion) or bottom-up (iterative) approaches. Understanding the state representation and state transitions is key to solving DP problems.`,

    whyImportant: `Dynamic Programming problems appear frequently in interviews and contests. From classic problems (fibonacci, coin change, knapsack) to complex optimizations, DP is essential for solving optimization problems efficiently. Understanding DP transforms seemingly impossible problems into manageable solutions.`,

    whenToUse: [
      'Finding optimal solutions to optimization problems',
      'Solving problems with overlapping subproblems',
      'Problems where greedy approach doesn\'t work',
      'Counting problems with complex dependencies',
      'Game theory and decision-making problems'
    ],

    advantages: [
      'Converts exponential brute force to polynomial complexity',
      'Systematic approach to optimization problems',
      'Both top-down (intuitive) and bottom-up (efficient) implementations available',
      'Highly efficient when subproblems overlap significantly',
      'Can solve previously "impossible" problems'
    ],

    disadvantages: [
      'Requires identifying optimal substructure and overlapping subproblems',
      'State representation and transitions can be tricky',
      'Space complexity can be high (though often optimizable)',
      'Debugging DP solutions can be challenging',
      'Not all problems have DP solutions'
    ],

    concepts: [
      { name: 'Optimal Substructure', description: 'Optimal solution to problem contains optimal solutions to subproblems.' },
      { name: 'Overlapping Subproblems', description: 'Same subproblems are solved multiple times in naive recursive solution.' },
      { name: 'Memoization (Top-Down)', description: 'Use recursion with caching. Solve only needed subproblems.' },
      { name: 'Tabulation (Bottom-Up)', description: 'Build table iteratively from base cases up to final answer.' },
      { name: 'State Representation', description: 'Defining what information uniquely identifies a subproblem.' },
      { name: 'State Transition', description: 'Relation between states - how current state depends on previous states.' }
    ],

    examples: [
      {
        title: 'Fibonacci with Memoization',
        language: 'typescript',
        code: `function fib(n: number): number {
  const memo: Record<number, number> = {};

  function dp(n: number): number {
    if (n <= 1) return n;
    
    if (memo[n] !== undefined) {
      return memo[n];
    }

    memo[n] = dp(n - 1) + dp(n - 2);
    return memo[n];
  }

  return dp(n);
}

// Fibonacci with tabulation (bottom-up)
function fibTab(n: number): number {
  if (n <= 1) return n;
  
  const dp: number[] = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

console.log(fib(10)); // 55
console.log(fibTab(10)); // 55`,
        explanation: 'Two approaches to Fibonacci: top-down memoization (recursive with caching) and bottom-up tabulation (iterative).',
        timeComplexity: 'O(n) - each number computed once',
        spaceComplexity: 'O(n) - memo/DP array'
      },
      {
        title: 'Coin Change Problem',
        language: 'typescript',
        code: `function coinChange(coins: number[], amount: number): number {
  // dp[i] = minimum coins needed for amount i
  const dp: number[] = Array(amount + 1).fill(Infinity);
  dp[0] = 0; // 0 coins for amount 0

  for (let i = 1; i <= amount; i++) {
    for (let coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}

console.log(coinChange([1, 2, 5], 5)); // 1 (one 5-coin)
console.log(coinChange([2], 3)); // -1 (impossible)`,
        explanation: 'Bottom-up DP solution. For each amount, try all coins and take minimum.',
        timeComplexity: 'O(amount × coins.length)',
        spaceComplexity: 'O(amount) - DP array'
      },
      {
        title: 'Longest Common Subsequence',
        language: 'typescript',
        code: `function longestCommonSubsequence(text1: string, text2: string): number {
  const m = text1.length;
  const n = text2.length;

  // dp[i][j] = length of LCS of text1[0..i-1] and text2[0..j-1]
  const dp: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}

console.log(longestCommonSubsequence("abc", "abc")); // 3
console.log(longestCommonSubsequence("ace", "abe")); // 2`,
        explanation: '2D DP for classic string problem. Build table where dp[i][j] represents LCS length.',
        timeComplexity: 'O(m × n) - two string lengths',
        spaceComplexity: 'O(m × n) - 2D DP table'
      }
    ],

    patterns: [
      {
        name: '1D DP - Linear Problems',
        description: 'Single dimension state for sequential decisions.',
        technique: 'State is single index (position in sequence). Compute each state from previous states.',
        example: 'Fibonacci, house robber, climbing stairs, max subarray',
        whenToUse: ['Sequential problems', 'Array/string indexing', 'Simple dependencies']
      },
      {
        name: '2D DP - Matrix/String Problems',
        description: 'Two dimensions for comparing strings or navigating grids.',
        technique: 'State is position in two sequences. Build table comparing prefixes.',
        example: 'LCS, edit distance, distinct paths, knapsack',
        whenToUse: ['String matching', 'Grid navigation', 'Comparing sequences']
      },
      {
        name: 'Knapsack Pattern',
        description: 'Select items with constraints to maximize value.',
        technique: '0/1 Knapsack uses 2D DP: dp[i][w] = max value using items 0..i-1 with weight w.',
        example: '0/1 knapsack, unbounded knapsack, partition equal subset sum',
        whenToUse: ['Resource allocation', 'Item selection', 'Weight-constrained optimization']
      },
      {
        name: 'Interval DP',
        description: 'Solve problems on intervals of increasing length.',
        technique: 'Outer loop on interval length, inner loops define range. Often building from smaller to larger intervals.',
        example: 'Matrix chain multiplication, burst balloons, palindrome problems',
        whenToUse: ['Interval problems', 'Range-based dependencies', 'Optimal splitting']
      }
    ],

    problems: [
      {
        id: 'max-subarray-sum',
        title: 'Maximum Subarray Sum (Kadane\'s Algorithm)',
        difficulty: 'Medium',
        description: 'Find the contiguous subarray within a 1D array which has the largest sum.',
        examples: [
          { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'subarray [4,-1,2,1] has largest sum 6' }
        ],
        hints: [
          'Keep track of maximum sum ending at current position',
          'Decide whether to extend previous subarray or start new',
          'Track overall maximum seen so far'
        ],
        solution: {
          approach: 'Kadane\'s algorithm: track max sum ending at each position. At each step, decide to extend or restart.',
          code: `function maxSubArray(nums: number[]): number {
  let maxEndingHere = nums[0];
  let maxSoFar = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // Either extend current subarray or start new
    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
    
    // Update overall maximum
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }

  return maxSoFar;
}

console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // 6`,
          timeComplexity: 'O(n) - single pass',
          spaceComplexity: 'O(1) - only tracking two values',
          stepByStep: [
            'Initialize maxEndingHere and maxSoFar with first element',
            'For each subsequent element:',
            '  maxEndingHere = max(current, current + maxEndingHere)',
            '  maxSoFar = max(maxSoFar, maxEndingHere)',
            'Return maxSoFar'
          ]
        }
      }
    ],

    operations: [
      { name: 'Subproblem Solve', complexity: 'Problem dependent' },
      { name: 'Memoization Lookup', complexity: 'O(1)' },
      { name: 'Table Build', complexity: 'Usually O(n) to O(n³)' }
    ],

    applications: [
      { name: 'Resource Allocation', description: 'Optimally allocate limited resources to maximize value', example: 'Investment portfolio optimization' },
      { name: 'Sequence Alignment', description: 'Finding similarities between sequences (DNA, text)', example: 'DNA sequence alignment' },
      { name: 'Game Theory', description: 'Computing optimal strategies in two-player games', example: 'Minimax in chess' },
      { name: 'String Processing', description: 'Edit distance, pattern matching, word breaking', example: 'Spell checking algorithms' }
    ]
  },

  {
    id: 'tries',
    title: 'Tries (Prefix Trees)',
    description: 'Tree structures optimized for prefix searching and autocomplete.',
    complexity: 'O(m) Search (m = key length)',
    icon: React.createElement(TreePalm, { size: 24 }),
    delay: 0.8,

    introduction: `A Trie (prefix tree) is a specialized tree used to store strings where each node represents a character. The path from root to a node represents a prefix of a word. Tries enable efficient string searches, prefix matching, and autocomplete functionality.

Unlike hash tables that search by complete key, tries enable prefix-based searching and can output all words with a given prefix efficiently. Each node has pointers to 26 children (for lowercase letters), and searching is O(m) where m is the key length, independent of number of words stored.

Tries are fundamental to text processing systems, dictionaries, IP routing, and autocomplete features. Understanding tries opens doors to advanced string algorithms and practical applications.`,

    whyImportant: `Tries are essential for efficient string search and prefix matching. They power autocomplete systems, spell checkers, and IP routing tables. While sometimes overlooked compared to hash tables, tries provide unique advantages for prefix-based problems and are frequently tested in interviews.`,

    whenToUse: [
      'Autocomplete and search suggestions',
      'Spell checking and dictionary implementation',
      'IP routing and prefix matching',
      'Finding all words with given prefix',
      'Longest common prefix searching'
    ],

    advantages: [
      'O(m) search time regardless of number of words (m = key length)',
      'Prefix sharing saves space for similar strings',
      'Natural for prefix-based queries',
      'Supports efficient autocomplete',
      'Good cache locality for sequential access'
    ],

    disadvantages: [
      'Higher space overhead than hash tables for single word storage',
      'Slower than hash tables for exact match searches',
      'Implementation is more complex than hash tables',
      'Poor for range queries or sorting',
      'Fixed alphabet size (26 for letters, more for Unicode)'
    ],

    concepts: [
      { name: 'Trie Node', description: 'Each node contains references to child nodes (up to 26 for lowercase letters) and a boolean indicating word end.' },
      { name: 'Root Node', description: 'Empty node at top of trie, not representing any character.' },
      { name: 'Word End Marker', description: 'Boolean flag indicating a complete word ends at this node.' },
      { name: 'Prefix Search', description: 'Finding all words sharing a common prefix by traversing to prefix end and exploring all paths.' },
      { name: 'Autocomplete', description: 'Suggesting words as user types by finding words with current input as prefix.' },
      { name: 'Collision-Free', description: 'Unlike hash tables, tries don\'t have collisions - multiple words can coexist without conflict.' }
    ],

    examples: [
      {
        title: 'Trie Implementation',
        language: 'typescript',
        code: `class TrieNode {
  children: Map<string, TrieNode> = new Map();
  isEndOfWord: boolean = false;
}

class Trie {
  private root: TrieNode = new TrieNode();

  insert(word: string): void {
    let node = this.root;
    for (let char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.isEndOfWord = true;
  }

  search(word: string): boolean {
    let node = this.root;
    for (let char of word) {
      if (!node.children.has(char)) {
        return false;
      }
      node = node.children.get(char)!;
    }
    return node.isEndOfWord;
  }

  startsWith(prefix: string): boolean {
    let node = this.root;
    for (let char of prefix) {
      if (!node.children.has(char)) {
        return false;
      }
      node = node.children.get(char)!;
    }
    return true;
  }
}

const trie = new Trie();
trie.insert("apple");
console.log(trie.search("apple")); // true
console.log(trie.search("app")); // false
console.log(trie.startsWith("app")); // true`,
        explanation: 'Basic Trie implementation with insert, search, and prefix operations.',
        timeComplexity: 'O(m) for all operations where m is word/prefix length',
        spaceComplexity: 'O(ALPHABET_SIZE × N × M) for N words of avg length M'
      },
      {
        title: 'Find All Words with Given Prefix',
        language: 'typescript',
        code: `class Trie {
  // ... previous implementation ...
  
  wordsWithPrefix(prefix: string): string[] {
    let node = this.root;
    
    // Navigate to prefix
    for (let char of prefix) {
      if (!node.children.has(char)) {
        return [];
      }
      node = node.children.get(char)!;
    }

    // DFS to find all words from this prefix
    const result: string[] = [];
    const dfs = (node: TrieNode, current: string): void => {
      if (node.isEndOfWord) {
        result.push(current);
      }
      for (let [char, child] of node.children) {
        dfs(child, current + char);
      }
    };

    dfs(node, prefix);
    return result;
  }
}

const trie = new Trie();
["apple", "app", "apricot", "apply"].forEach(w => trie.insert(w));
console.log(trie.wordsWithPrefix("ap")); // ["apple", "app", "apricot", "apply"]`,
        explanation: 'Finding all words with given prefix efficiently by navigating to prefix and doing DFS.',
        timeComplexity: 'O(n) where n is number of nodes under prefix',
        spaceComplexity: 'O(m) for recursion depth in DFS'
      }
    ],

    patterns: [
      {
        name: 'Autocomplete',
        description: 'Suggest words as user types by finding words with input as prefix.',
        technique: 'Navigate to prefix in Trie, return all words from that subtree.',
        example: 'Search engine suggestions, IDE autocomplete, phone keyboards',
        whenToUse: ['Real-time suggestion systems', 'Search features', 'Text input']
      },
      {
        name: 'Word Board Search',
        description: 'Find words in word board (like Boggle) using Trie for validation.',
        technique: 'DFS on board with Trie lookup for early termination.',
        example: 'Boggle, word search with dictionary',
        whenToUse: ['Word games', 'Dictionary lookup during search', 'Validation optimization']
      },
      {
        name: 'Longest Common Prefix',
        description: 'Find longest shared prefix of multiple words.',
        technique: 'Insert all words in Trie, traverse while single child path exists.',
        example: 'Finding common prefix of IP addresses, domain names',
        whenToUse: ['Prefix matching', 'Group analysis', 'Similarity finding']
      },
      {
        name: 'IP Routing',
        description: 'Match IP addresses to routing entries using longest prefix match.',
        technique: 'Trie of IP binary representation for efficient lookup.',
        example: 'Network routing tables, CIDR notation matching',
        whenToUse: ['Network routing', 'Long prefix matching', 'IP-based rules']
      }
    ],

    problems: [
      {
        id: 'word-search-ii',
        title: 'Word Search II',
        difficulty: 'Hard',
        description: 'Given an m x n board of characters and a list of strings words, return all words on the board. Each word must be constructed from letters of sequentially adjacent cells.',
        examples: [
          { input: 'board = [["o","a","a"],["e","t","a"],["t","a","t"]], words = ["oath","pea","eat","rain"]', output: '["eat","oath"]' }
        ],
        hints: [
          'Build a Trie of all words for efficient lookup',
          'Use DFS on board to find words',
          'Prune branches that don\'t match any word prefix'
        ],
        solution: {
          approach: 'Build Trie from words. DFS on board, checking if current path matches a Trie prefix. Early termination when no match.',
          code: `function findWords(board: string[][], words: string[]): string[] {
  class TrieNode {
    children: Map<string, TrieNode> = new Map();
    word: string | null = null;
  }

  const root = new TrieNode();
  for (let word of words) {
    let node = root;
    for (let char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.word = word;
  }

  const result: Set<string> = new Set();
  const visited: Set<string> = new Set();

  const dfs = (i: number, j: number, node: TrieNode): void => {
    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length) return;
    const key = i + "," + j;
    if (visited.has(key)) return;

    const char = board[i][j];
    if (!node.children.has(char)) return;

    visited.add(key);
    const nextNode = node.children.get(char)!;
    
    if (nextNode.word) {
      result.add(nextNode.word);
    }

    dfs(i + 1, j, nextNode);
    dfs(i - 1, j, nextNode);
    dfs(i, j + 1, nextNode);
    dfs(i, j - 1, nextNode);

    visited.delete(key);
  };

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      dfs(i, j, root);
    }
  }

  return Array.from(result);
}`,
          timeComplexity: 'O(m × n × 4^L × L) where L is max word length',
          spaceComplexity: 'O(total chars in words) for Trie',
          stepByStep: [
            'Build Trie from all words',
            'For each cell in board:',
            '  Perform DFS starting from that cell',
            '  At each step, check if character matches Trie child',
            '  If no match, prune this branch',
            '  If word ends here, add to result',
            '  Continue DFS to adjacent cells',
            '  Backtrack by unmarking visited',
            'Return all found words'
          ]
        }
      }
    ],

    operations: [
      { name: 'Insert', complexity: 'O(m) - m = word length' },
      { name: 'Search', complexity: 'O(m) - m = word length' },
      { name: 'Prefix Search', complexity: 'O(n) - n = words with prefix' },
      { name: 'Delete', complexity: 'O(m) - m = word length' }
    ],

    applications: [
      { name: 'Autocomplete Systems', description: 'Search suggestions in real-time as user types', example: 'Google search, IDE autocomplete' },
      { name: 'Spell Checking', description: 'Validate words and suggest corrections', example: 'Grammar checkers, dictionaries' },
      { name: 'IP Routing', description: 'Efficient longest prefix matching for network packets', example: 'Router lookup tables' },
      { name: 'Dictionary Implementations', description: 'Storing and searching large word lists efficiently', example: 'Lexicon in word games' }
    ]
  },

  {
    id: 'recursion-backtracking',
    title: 'Recursion & Backtracking',
    description: 'Solving problems by exploring multiple paths and undoing choices.',
    complexity: 'Depends on Tree Structure',
    icon: React.createElement(Lightbulb, { size: 24 }),
    delay: 0.6,

    introduction: `Recursion is a problem-solving approach where a function calls itself to solve smaller instances of the same problem. The key is a base case that stops recursion and recursive case that progresses toward the base case. Recursion is natural for tree/graph problems, mathematical sequences, and divide-and-conquer algorithms.

Backtracking is an algorithmic technique that considers searching every possible combination in a sequence. It incrementally builds candidates for solutions and abandons a candidate as soon as it determines the candidate cannot be completed to a valid solution (pruning). This dramatically reduces the search space compared to brute force.

Together, recursion and backtracking enable solving problems like permutations, combinations, N-Queens, Sudoku solvers, and subset generation efficiently by exploring promising paths while pruning dead ends.`,

    whyImportant: `Recursive thinking is fundamental to computer science. Many algorithms (merge sort, quicksort, tree traversal) naturally use recursion. Backtracking solves numerous combinatorial problems efficiently. These concepts appear frequently in interviews and are essential for advanced algorithm design.`,

    whenToUse: [
      'Tree and graph traversals',
      'Divide-and-conquer problems (merge sort, quicksort)',
      'Generating permutations, combinations, subsets',
      'Constraint satisfaction problems (Sudoku, N-Queens)',
      'Pathfinding in mazes or game boards'
    ],

    advantages: [
      'Natural expression for hierarchical problems',
      'Code is often cleaner and more readable',
      'Backtracking enables efficient constraint solving',
      'Automatic state management with call stack',
      'Enables pruning to avoid exploring bad paths'
    ],

    disadvantages: [
      'Stack overflow risk with deep recursion',
      'Can be slower than iteration due to function call overhead',
      'Harder to debug than iterative solutions',
      'Exponential time complexity possible without pruning',
      'Memory usage grows with recursion depth'
    ],

    concepts: [
      { name: 'Base Case', description: 'Condition that stops recursion. Essential to prevent infinite loops.' },
      { name: 'Recursive Case', description: 'Function calling itself with simpler/smaller input to progress toward base case.' },
      { name: 'Call Stack', description: 'Stack of active function calls. Each recursion level adds a frame to the stack.' },
      { name: 'Backtracking', description: 'Undoing choices to explore alternative paths when current path cannot lead to solution.' },
      { name: 'Pruning', description: 'Early termination of exploring a path when it\'s determined to be invalid.' },
      { name: 'Memoization', description: 'Caching results of subproblems to avoid recalculation in overlapping subproblems.' }
    ],

    examples: [
      {
        title: 'Permutations with Backtracking',
        language: 'typescript',
        code: `function permute(nums: number[]): number[][] {
  const result: number[][] = [];

  function backtrack(current: number[], remaining: number[]): void {
    // Base case: all numbers used
    if (remaining.length === 0) {
      result.push([...current]);
      return;
    }

    // Try each remaining number
    for (let i = 0; i < remaining.length; i++) {
      const num = remaining[i];
      
      // Choose
      current.push(num);
      
      // Explore
      const newRemaining = remaining.slice(0, i).concat(remaining.slice(i + 1));
      backtrack(current, newRemaining);
      
      // Unchoose (backtrack)
      current.pop();
    }
  }

  backtrack([], nums);
  return result;
}

console.log(permute([1, 2, 3])); // All 6 permutations`,
        explanation: 'Generates all permutations using backtracking. For each position, tries each remaining element.',
        timeComplexity: 'O(n! × n) - n! permutations, each takes O(n) to copy',
        spaceComplexity: 'O(n) - recursion depth'
      },
      {
        title: 'N-Queens Problem',
        language: 'typescript',
        code: `function solveNQueens(n: number): string[][] {
  const result: string[][] = [];
  const board: string[][] = Array(n).fill(null).map(() => Array(n).fill('.'));

  function isSafe(row: number, col: number): boolean {
    // Check column
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') return false;
    }
    // Check diagonal up-left
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 'Q') return false;
    }
    // Check diagonal up-right
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === 'Q') return false;
    }
    return true;
  }

  function backtrack(row: number): void {
    if (row === n) {
      result.push(board.map(r => r.join('')));
      return;
    }

    for (let col = 0; col < n; col++) {
      if (isSafe(row, col)) {
        board[row][col] = 'Q';
        backtrack(row + 1);
        board[row][col] = '.';
      }
    }
  }

  backtrack(0);
  return result;
}`,
        explanation: 'Solves N-Queens by placing queens row by row with backtracking. Prunes invalid placements early.',
        timeComplexity: 'O(N!) - exponential but with pruning much faster',
        spaceComplexity: 'O(N) - board size and recursion depth'
      }
    ],

    patterns: [
      {
        name: 'Permutation/Combination Generation',
        description: 'Systematically generate all permutations or combinations of elements.',
        technique: 'Use recursion to build up sequences, with backtracking to explore alternatives.',
        example: 'All permutations, combinations, subsets, letter combinations',
        whenToUse: ['Generating all possibilities', 'Brute force enumeration', 'Search space exploration']
      },
      {
        name: 'Constraint Satisfaction',
        description: 'Find solutions that satisfy all constraints by exploring and pruning.',
        technique: 'Build solution incrementally, check constraints, backtrack when violated.',
        example: 'Sudoku solver, N-Queens, graph coloring, crossword puzzles',
        whenToUse: ['CSP problems', 'Puzzle solving', 'Scheduling with constraints']
      },
      {
        name: 'Divide and Conquer',
        description: 'Divide problem into subproblems, solve recursively, combine results.',
        technique: 'Recursively break down problem into similar smaller problems.',
        example: 'Merge sort, quicksort, binary search, majority element',
        whenToUse: ['Sorting', 'Searching', 'Optimal substructure problems']
      },
      {
        name: 'Tree/Graph Traversal',
        description: 'Traverse tree or graph structure recursively.',
        technique: 'Visit current node, recursively visit children/neighbors, backtrack to parent.',
        example: 'Inorder/preorder/postorder traversal, path finding, DFS',
        whenToUse: ['Tree problems', 'Graph exploration', 'Hierarchical data']
      }
    ],

    problems: [
      {
        id: 'letter-combinations',
        title: 'Letter Combinations of a Phone Number',
        difficulty: 'Medium',
        description: 'Given a string containing digits from 2-9, return all possible letter combinations that the number could represent.',
        examples: [
          { input: 'digits = "23"', output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]' }
        ],
        hints: [
          'Use a map of digits to letters like phone keypad',
          'Use recursion/backtracking to explore all combinations',
          'For each digit, try all possible letters'
        ],
        solution: {
          approach: 'Map digits to letters, use backtracking to generate all combinations by trying each letter of current digit.',
          code: `function letterCombinations(digits: string): string[] {
  if (!digits || digits.length === 0) return [];

  const map: Record<string, string> = {
    '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
    '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
  };

  const result: string[] = [];

  function backtrack(index: number, current: string): void {
    if (index === digits.length) {
      result.push(current);
      return;
    }

    const letters = map[digits[index]];
    for (let letter of letters) {
      backtrack(index + 1, current + letter);
    }
  }

  backtrack(0, '');
  return result;
}`,
          timeComplexity: 'O(4^n) - worst case when all digits map to 4 letters',
          spaceComplexity: 'O(4^n) - result array',
          stepByStep: [
            'Create mapping of digits to letters (phone keypad)',
            'Start backtracking from first digit',
            'For each digit, try all corresponding letters',
            'Recursively process next digit with current combination',
            'When all digits processed, add combination to result',
            'Return all combinations'
          ]
        }
      }
    ],

    operations: [
      { name: 'Recursion Depth', complexity: 'O(depth of tree)' },
      { name: 'Number of Solutions', complexity: 'O(solution count)' },
      { name: 'Pruning Effectiveness', complexity: 'Variable - depends on constraints' }
    ],

    applications: [
      { name: 'Game Solving', description: 'Finding winning moves in chess, Sudoku, puzzle games', example: 'Chess engine move exploration' },
      { name: 'Compiler Design', description: 'Parsing expressions and building abstract syntax trees', example: 'Syntax tree generation' },
      { name: 'Artificial Intelligence', description: 'Minimax algorithm for game playing, constraint satisfaction', example: 'AI player in games' },
      { name: 'Combinatorial Optimization', description: 'Finding best solution among many possibilities', example: 'Traveling salesman problem' }
    ]
  },

  // ============ SORTING & SEARCHING ============
  {
    id: 'sorting-searching',
    title: 'Sorting & Searching',
    description: 'Algorithms for organizing and finding data efficiently.',
    complexity: 'O(n log n) typical',
    icon: React.createElement(ArrowUpDown, { size: 24 }),
    delay: 0.12,

    introduction: `Sorting and searching are fundamental algorithmic problems that appear in virtually every application. Sorting arranges data in a specific order, while searching locates specific elements within organized or unorganized data. These algorithms form the backbone of data organization and retrieval in databases, search engines, and countless other systems.

The importance of sorting extends beyond simply rearranging data. Many complex algorithms require sorted data as a prerequisite. Searching algorithms leverage sorted data to achieve logarithmic time complexity. Understanding sorting and searching teaches us about algorithm design, tradeoffs between time and space complexity, and how to analyze algorithm performance.

Modern computers handle trillions of sort operations daily. Database indexes use B-trees (a sorting-based structure). Search engines rank results using sophisticated algorithms built on sorting principles. File systems organize data using sorted structures. The ubiquity of sorting and searching makes mastering these algorithms essential for any computer scientist or software engineer.

Different sorting algorithms have different characteristics: some are fast for large datasets, others are efficient with space, some are stable (preserve relative order of equal elements), and others work well with partially sorted data. Choosing the right algorithm for the right situation is a critical skill.`,

    whyImportant: `Sorting and searching are examined in almost every technical interview. They teach fundamental algorithmic thinking: divide and conquer, optimization techniques, and complexity analysis. Real-world applications depend on efficient sorting and searching - from databases to recommendation systems to data analytics.`,

    whenToUse: [
      'When you need to organize data for easier retrieval',
      'When you need to find specific elements quickly',
      'When preprocessing data significantly improves performance',
      'When optimizing query performance in databases',
      'When building indexes for fast lookups'
    ],

    advantages: [
      'Sorting enables logarithmic search time (binary search)',
      'Different algorithms suit different scenarios and data distributions',
      'Many real-world optimizations depend on sorted data',
      'Well-studied with proven performance characteristics',
      'Building block for many other algorithms'
    ],

    disadvantages: [
      'Sorting takes time - O(n log n) lower bound for comparison sorts',
      'Some algorithms require significant extra space',
      'Choosing wrong algorithm leads to poor performance',
      'Not all data structures support efficient sorting',
      'Online algorithms require special approaches'
    ],

    concepts: [
      {
        name: 'Comparison-Based Sorting',
        description: 'Algorithms that work by comparing pairs of elements. Lower bound is O(n log n) for any comparison-based sort.'
      },
      {
        name: 'Stable vs Unstable Sorting',
        description: 'Stable sorts preserve relative order of equal elements. Useful when sorting complex objects by one attribute.'
      },
      {
        name: 'In-Place Sorting',
        description: 'Sorting that uses O(1) or O(log n) extra space. Important for memory-constrained environments.'
      },
      {
        name: 'Divide and Conquer',
        description: 'Strategy used by merge sort and quick sort: divide problem into subproblems, solve recursively, combine results.'
      },
      {
        name: 'Pivot-Based Partitioning',
        description: 'Technique in quick sort where elements are rearranged around a pivot element for efficient sorting.'
      },
      {
        name: 'Binary Search',
        description: 'Logarithmic search on sorted data by repeatedly dividing search space in half.'
      }
    ],

    examples: [
      {
        title: 'Merge Sort - Stable O(n log n) Sort',
        language: 'typescript',
        code: `function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}

// Usage
const arr = [64, 34, 25, 12, 22, 11, 90];
console.log(mergeSort(arr)); // [11, 12, 22, 25, 34, 64, 90]`,
        explanation: 'Merge sort divides array in half, recursively sorts both halves, then merges them. Always O(n log n) and stable, but requires O(n) extra space.',
        timeComplexity: 'O(n log n) - guaranteed',
        spaceComplexity: 'O(n) - for auxiliary arrays'
      },
      {
        title: 'Quick Sort - Fast Average Case In-Place Sort',
        language: 'typescript',
        code: `function quickSort(arr: number[], low = 0, high = arr.length - 1): number[] {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr: number[], low: number, high: number): number {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

// Usage
const arr = [64, 34, 25, 12, 22, 11, 90];
console.log(quickSort(arr)); // [11, 12, 22, 25, 34, 64, 90]`,
        explanation: 'Quick sort picks a pivot and partitions array around it, then recursively sorts partitions. Fast average case O(n log n) with O(log n) space, but O(n²) worst case.',
        timeComplexity: 'O(n log n) average, O(n²) worst case',
        spaceComplexity: 'O(log n) - for recursion stack'
      },
      {
        title: 'Binary Search - Logarithmic Search',
        language: 'typescript',
        code: `function binarySearch(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1; // Search right half
    } else {
      right = mid - 1; // Search left half
    }
  }

  return -1; // Not found
}

// Usage
const nums = [1, 3, 5, 7, 9, 11, 13];
console.log(binarySearch(nums, 7));  // 3
console.log(binarySearch(nums, 6));  // -1`,
        explanation: 'Binary search repeatedly divides sorted array in half to find target. Much faster than linear search for large sorted arrays.',
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1)'
      },
      {
        title: 'Heap Sort - Guaranteed O(n log n) In-Place',
        language: 'typescript',
        code: `function heapSort(arr: number[]): number[] {
  const n = arr.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }

  return arr;
}

function heapify(arr: number[], n: number, i: number): void {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}

// Usage
const arr = [64, 34, 25, 12, 22, 11, 90];
console.log(heapSort(arr)); // [11, 12, 22, 25, 34, 64, 90]`,
        explanation: 'Heap sort builds a max heap then repeatedly extracts the maximum. Guaranteed O(n log n) with O(1) extra space, but not stable.',
        timeComplexity: 'O(n log n) - guaranteed',
        spaceComplexity: 'O(1) - excluding input array'
      }
    ],

    patterns: [
      {
        name: 'Divide and Conquer Sorting',
        description: 'Divide problem into subproblems, sort recursively, combine results',
        technique: 'Used in merge sort and quick sort for efficient sorting',
        example: 'Merge sort for large datasets, quick sort for general purpose',
        whenToUse: ['When data doesn\'t fit in memory (external sorting)', 'When stability is required', 'For guaranteed performance bounds']
      },
      {
        name: 'Comparison-Based Sorting',
        description: 'Algorithms that compare pairs of elements to determine order',
        technique: 'Bubble sort, insertion sort, merge sort, quick sort, heap sort',
        example: 'Most general-purpose sorting algorithms',
        whenToUse: ['For general-purpose sorting', 'When stability is needed (merge sort)', 'For small arrays (insertion sort)']
      },
      {
        name: 'Non-Comparison Sorting',
        description: 'Algorithms that don\'t compare elements directly',
        technique: 'Counting sort, radix sort, bucket sort',
        example: 'Sorting integers in known range, sorting strings by digits',
        whenToUse: ['For integers or fixed-range values', 'When linear time sorting is needed', 'For distributed or parallel sorting']
      },
      {
        name: 'Binary Search on Sorted Data',
        description: 'Leverage sorted property for logarithmic search',
        technique: 'Repeatedly divide search space in half',
        example: 'Finding elements, finding boundaries, range queries',
        whenToUse: ['After sorting data for fast lookups', 'For finding boundaries (first/last occurrence)', 'In problem solutions requiring binary search']
      },
      {
        name: 'Interval Sorting and Merging',
        description: 'Sort intervals by start time and merge overlaps',
        technique: 'Common pattern for scheduling and conflict detection',
        example: 'Meeting room scheduling, merging overlapping intervals',
        whenToUse: ['Meeting room scheduling', 'Merging overlapping intervals', 'Event scheduling with conflicts']
      }
    ],

    operations: [
      { name: 'Sort', complexity: 'O(n log n) typical' },
      { name: 'Search', complexity: 'O(log n) on sorted data' },
      { name: 'Insert', complexity: 'O(n)' },
      { name: 'Delete', complexity: 'O(n)' }
    ],

    applications: [
      {
        name: 'Database Indexing',
        description: 'Sorted data structures enable fast query performance in databases.',
        example: 'B-tree indexes in SQL databases use sorting principles'
      },
      {
        name: 'Search Engines',
        description: 'Sorting and ranking algorithms determine search result order.',
        example: 'Google uses PageRank algorithm based on sorting principles'
      },
      {
        name: 'Recommendation Systems',
        description: 'Sort items by relevance or rating to show best matches.',
        example: 'Netflix sorts movies by predicted user rating'
      },
      {
        name: 'File Systems',
        description: 'Organize files and directories efficiently for navigation.',
        example: 'File explorers display files sorted by name, date, or size'
      },
      {
        name: 'Graphics and Animation',
        description: 'Sort objects by depth for correct rendering order.',
        example: 'Z-ordering in computer graphics uses sorting'
      }
    ],

    problems: [...sortingProblems, ...searchingProblems]
  }
];
