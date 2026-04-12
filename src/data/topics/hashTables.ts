import type { Topic } from '../../types/topic';
import React from 'react';
import { Zap } from 'lucide-react';
import { hashTableProblems } from '../newProblems';

export const hashTablesTopic: Topic = {
  id: 'hash-tables',
  title: 'Hash Tables',
  description: 'Lightning-fast key-value mapping for optimal performance.',
  complexity: 'O(1) Average',
  icon: React.createElement(Zap, { size: 24 }),
  delay: 0.3,

  introduction: `Hash tables (also called hash maps) are one of the most powerful and commonly used data structures in computer science. They provide an average-case constant-time O(1) complexity for search, insert, and delete operations, making them incredibly efficient for many applications.

A hash table works by using a hash function to compute an index (hash code) from a key. This index determines where the corresponding value is stored in an underlying array. The key innovation is that instead of searching through all elements, the hash function directly computes where to look.

The efficiency of a hash table depends heavily on the quality of its hash function and how it handles collisions (when different keys produce the same hash). Common collision resolution techniques include chaining (using linked lists) and open addressing (probing for the next available slot).

## How Hash Tables Work

1. **Hash Function**: Maps key to array index. Must be:
   - **Deterministic**: Same key always produces same hash
   - **Uniform**: Distributes keys evenly across array
   - **Fast**: Should compute in O(1) time

2. **Collision Resolution**:
   - **Chaining**: Store colliding elements in linked list at that index
   - **Open Addressing**: Find next empty slot (linear, quadratic, or double hashing)
   - **Cuckoo Hashing**: More complex but worst-case O(1)

3. **Load Factor**: Ratio of entries to capacity
   - When load factor exceeds threshold, table rehashes
   - Larger table reduces collisions, improving performance

## Real-World Implementation

Modern hash tables (Java HashMap, Python dict, JavaScript Map) use optimized implementations:
- Good hash functions reduce collisions
- Dynamic resizing maintains load factor
- Some use trees instead of linked lists for chaining (Java 8+)`,

  whyImportant: `Hash tables are ubiquitous in real-world applications. They power database indexing, caching systems, symbol tables in compilers, and associative arrays in programming languages. Understanding hash tables is essential for writing efficient code and is a favorite topic in technical interviews. They're also critical for implementing many other algorithms.`,

  whenToUse: [
    'When you need fast lookups by key',
    'For counting frequencies or occurrences',
    'To detect duplicates efficiently',
    'When implementing caches or memoization',
    'For grouping or categorizing data',
    'When you need dynamic data structure that grows',
    'For implementing sets and mathematical sets'
  ],

  advantages: [
    'O(1) average-case for search, insert, and delete',
    'Flexible keys (any hashable type)',
    'Efficient for large datasets',
    'Perfect for implementing sets and maps',
    'Natural for counting and frequency problems',
    'Can implement all set operations efficiently',
    'No ordering overhead (faster than balanced trees)'
  ],

  disadvantages: [
    'O(n) worst-case if many collisions occur',
    'No ordering of elements',
    'Extra memory for underlying array',
    'Hash function quality affects performance',
    'Not cache-friendly due to random access pattern',
    'Worst case occurs with adversarial inputs',
    'Resizing/rehashing can be expensive'
  ],

  concepts: [
    {
      name: 'Hash Function',
      description: 'A function that maps keys to array indices. Should be deterministic, uniform, and fast. Quality of hash function determines collision rate.'
    },
    {
      name: 'Collision',
      description: 'When two different keys hash to the same index. Must be handled properly to maintain O(1) performance. More collisions = worse performance.'
    },
    {
      name: 'Load Factor',
      description: 'Ratio of entries to array size. When too high (typically > 0.75), table is resized (rehashed) to reduce collisions and maintain O(1) operations.'
    },
    {
      name: 'Chaining',
      description: 'Collision resolution using linked lists at each array slot. Simple to implement but uses extra memory for pointers.'
    },
    {
      name: 'Open Addressing',
      description: 'Collision resolution by probing for next empty slot in the array. Uses less memory than chaining but more complex to implement.'
    },
    {
      name: 'Rehashing',
      description: 'Creating a new, larger hash table and reinserting all elements. Necessary as table fills to maintain O(1) operations.'
    },
    {
      name: 'HashSet vs HashMap',
      description: 'HashSet stores unique values, HashMap stores key-value pairs. Both provide O(1) operations on average.'
    }
  ],

  examples: [
    {
      title: 'Basic Hash Map Implementation',
      language: 'typescript',
      code: `// Simple hash map implementation using chaining
class SimpleHashMap<K, V> {
  private capacity: number = 16;
  private size: number = 0;
  private buckets: Array<Array<[K, V]>> = Array(this.capacity).fill(null).map(() => []);
  
  // Hash function - simple but effective
  private hash(key: K): number {
    let hashCode = 0;
    const keyStr = String(key);
    
    for (let i = 0; i < keyStr.length; i++) {
      hashCode = ((hashCode << 5) - hashCode) + keyStr.charCodeAt(i);
      hashCode = hashCode & hashCode; // Convert to 32-bit integer
    }
    
    return Math.abs(hashCode) % this.capacity;
  }
  
  // Insert or update - O(1) average
  set(key: K, value: V): void {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    
    // Check if key exists
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }
    
    // New key
    bucket.push([key, value]);
    this.size++;
    
    // Rehash if load factor exceeded
    if (this.size / this.capacity > 0.75) {
      this.rehash();
    }
  }
  
  // Lookup - O(1) average
  get(key: K): V | null {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    
    for (const [k, v] of bucket) {
      if (k === key) return v;
    }
    
    return null;
  }
  
  // Delete - O(1) average
  delete(key: K): boolean {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    
    return false;
  }
  
  // Rehash when load factor exceeded
  private rehash(): void {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
    
    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }
}

// Using JavaScript's built-in Map
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
}`,
      explanation: 'Hash maps provide constant-time operations for insert, lookup, and delete. Chaining handles collisions by storing multiple entries at same index. Rehashing maintains performance as table fills.',
      timeComplexity: 'O(1) average for all operations, O(n) worst case',
      spaceComplexity: 'O(n) for storing n entries plus overhead'
    },
    {
      title: 'Frequency Counter Pattern',
      language: 'typescript',
      code: `// Count character frequencies - common pattern
function countFrequencies(str: string): Map<string, number> {
  const freq = new Map<string, number>();
  
  for (const char of str) {
    freq.set(char, (freq.get(char) || 0) + 1);
  }
  
  return freq;
}

// Find most common element
function mostCommonElement<T>(arr: T[]): T {
  const freq = new Map<T, number>();
  
  for (const item of arr) {
    freq.set(item, (freq.get(item) || 0) + 1);
  }
  
  let maxCount = 0;
  let mostCommon: T = arr[0];
  
  for (const [item, count] of freq) {
    if (count > maxCount) {
      maxCount = count;
      mostCommon = item;
    }
  }
  
  return mostCommon;
}

// First unique character in string
function firstUniqueChar(s: string): number {
  const freq = new Map<string, number>();
  
  // Count frequencies
  for (const char of s) {
    freq.set(char, (freq.get(char) || 0) + 1);
  }
  
  // Find first with frequency 1
  for (let i = 0; i < s.length; i++) {
    if (freq.get(s[i]) === 1) {
      return i;
    }
  }
  
  return -1;
}

// Examples
console.log(countFrequencies('hello')); // { h: 1, e: 1, l: 2, o: 1 }
console.log(mostCommonElement([1, 1, 2, 2, 2, 3])); // 2
console.log(firstUniqueChar('leetcode')); // 0 (l)`,
      explanation: 'Frequency counting is extremely common in coding problems. Hash maps make this O(n) instead of O(n²). This pattern solves many interview problems efficiently.',
      timeComplexity: 'O(n) - single pass to count, single pass to find',
      spaceComplexity: 'O(k) where k is number of unique elements'
    },
    {
      title: 'Two Sum with Hash Map',
      language: 'typescript',
      code: `// Two sum - complement lookup pattern
function twoSum(nums: number[], target: number): number[] {
  const seen = new Map<number, number>();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    // Check if complement already seen
    if (seen.has(complement)) {
      return [seen.get(complement)!, i];
    }
    
    // Store current number for future lookups
    seen.set(nums[i], i);
  }
  
  return []; // No solution
}

// Group anagrams - using sorted string as key
function groupAnagrams(strs: string[]): string[][] {
  const groups = new Map<string, string[]>();
  
  for (const str of strs) {
    // Sort characters to create canonical form
    const sorted = str.split('').sort().join('');
    
    if (!groups.has(sorted)) {
      groups.set(sorted, []);
    }
    
    groups.get(sorted)!.push(str);
  }
  
  return Array.from(groups.values());
}

// Ransom note - check if magazine has enough letters
function canConstruct(ransomNote: string, magazine: string): boolean {
  const freq = new Map<string, number>();
  
  // Count letters in magazine
  for (const char of magazine) {
    freq.set(char, (freq.get(char) || 0) + 1);
  }
  
  // Check if we have all letters
  for (const char of ransomNote) {
    if (!freq.has(char) || freq.get(char)! === 0) {
      return false;
    }
    freq.set(char, freq.get(char)! - 1);
  }
  
  return true;
}

// Examples
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']));
// [['eat','tea','ate'], ['tan','nat'], ['bat']]
console.log(canConstruct('a', 'b')); // false
console.log(canConstruct('aa', 'ab')); // false
console.log(canConstruct('aa', 'aab')); // true`,
      explanation: 'Hash maps enable many optimization patterns: complement lookup converts O(n²) to O(n), grouping by canonical form solves anagram problems, frequency counting enables resource checking.',
      timeComplexity: 'O(n) for all examples',
      spaceComplexity: 'O(n) for hash maps'
    },
    {
      title: 'Hash Set for Deduplication',
      language: 'typescript',
      code: `// Remove duplicates - preserve insertion order
function removeDuplicates(arr: number[]): number[] {
  const seen = new Set<number>();
  const result: number[] = [];
  
  for (const num of arr) {
    if (!seen.has(num)) {
      seen.add(num);
      result.push(num);
    }
  }
  
  return result;
}

// Intersection of two arrays
function intersection(nums1: number[], nums2: number[]): number[] {
  const set1 = new Set(nums1);
  const result = new Set<number>();
  
  for (const num of nums2) {
    if (set1.has(num)) {
      result.add(num);
    }
  }
  
  return Array.from(result);
}

// Happy number - detect cycle using set
function isHappy(n: number): boolean {
  const seen = new Set<number>();
  
  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    
    // Sum of squares of digits
    let sum = 0;
    while (n > 0) {
      const digit = n % 10;
      sum += digit * digit;
      n = Math.floor(n / 10);
    }
    
    n = sum;
  }
  
  return n === 1;
}

// Longest consecutive sequence - using set for O(1) lookup
function longestConsecutive(nums: number[]): number {
  const numSet = new Set(nums);
  let longest = 0;
  
  for (const num of numSet) {
    // Only start counting from sequence start
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
}

// Examples
console.log(removeDuplicates([1, 2, 2, 3, 3, 3])); // [1, 2, 3]
console.log(intersection([1, 2, 2, 1], [2, 2])); // [2]
console.log(isHappy(7)); // true (1 -> 1)
console.log(longestConsecutive([100, 4, 200, 1, 3, 2])); // 4 (1,2,3,4)`,
      explanation: 'Hash sets efficiently track membership and detect duplicates. They enable O(1) cycle detection. Combined with smart iteration order, they solve many problems optimally.',
      timeComplexity: 'All O(n) linear time',
      spaceComplexity: 'O(n) for sets'
    }
  ],

  patterns: [
    {
      name: 'Frequency Counter',
      description: 'Count occurrences of elements using a hash map for O(1) lookups.',
      technique: 'Iterate through data, increment count in map for each element. Use for comparisons, finding modes, or checking requirements.',
      example: 'Character frequency, find duplicates, most common element, anagrams',
      whenToUse: [
        'Counting occurrences',
        'Finding mode (most frequent)',
        'Detecting duplicates',
        'Anagram and permutation problems'
      ]
    },
    {
      name: 'Complement Lookup',
      description: 'Store seen elements and look for complements (two sum pattern).',
      technique: 'For each element, check if target - element exists in map. Store element for future queries.',
      example: 'Two sum, pair with difference, three sum variants',
      whenToUse: [
        'Finding pairs with target sum',
        'Sum problems',
        'Difference problems',
        'Optimization of O(n²) nested loops'
      ]
    },
    {
      name: 'Grouping by Key',
      description: 'Group items by a computed key property for categorization.',
      technique: 'Compute key for each item, store items in map using that key.',
      example: 'Group anagrams, categorize transactions, partition by property',
      whenToUse: [
        'Categorization and grouping',
        'Grouping similar items',
        'Anagram problems',
        'Organizing data by attributes'
      ]
    },
    {
      name: 'Set Deduplication',
      description: 'Use hash set to remove duplicates and track unique elements.',
      technique: 'Add elements to set as you encounter them. Check membership before processing.',
      example: 'Remove duplicates, unique elements, intersection/union',
      whenToUse: [
        'Deduplication',
        'Uniqueness checks',
        'Set operations',
        'Cycle detection in sequences'
      ]
    },
    {
      name: 'Sliding Window with Hash Map',
      description: 'Maintain hash map of elements in current window for efficient updates.',
      technique: 'Add element to window, remove element when sliding, update map accordingly.',
      example: 'Longest substring with unique chars, all anagrams in string',
      whenToUse: [
        'Window-based problems needing element counts',
        'Substring/subarray with constraints',
        'Frequency-based sliding window'
      ]
    }
  ],

  problems: [
    ...hashTableProblems
  ],

  operations: [
    { name: 'Insert', complexity: 'O(1) average' },
    { name: 'Search', complexity: 'O(1) average' },
    { name: 'Delete', complexity: 'O(1) average' },
    { name: 'Rehash', complexity: 'O(n)' },
    { name: 'Iterate', complexity: 'O(n)' }
  ],

  applications: [
    {
      name: 'Database Indexing',
      description: 'Databases use hash indexes for fast key lookups without sorting.',
      example: 'Primary key lookups in SQL databases use hash tables internally'
    },
    {
      name: 'Caching Systems',
      description: 'Hash tables implement caches for fast data retrieval.',
      example: 'CPU caches, browser caches, Memcached/Redis use hash structures'
    },
    {
      name: 'Symbol Tables in Compilers',
      description: 'Track variable declarations and scope during compilation.',
      example: 'Every compiler uses symbol tables implemented with hash maps'
    },
    {
      name: 'Sets and Dictionaries',
      description: 'Programming language data types built on hash tables.',
      example: 'Python dict, JavaScript objects, Java HashMap, C++ unordered_map'
    },
    {
      name: 'Duplicate Detection',
      description: 'Quickly identify duplicate entries in datasets.',
      example: 'Spam detection, plagiarism checking, duplicate file detection'
    },
    {
      name: 'Implementing LRU Caches',
      description: 'Hash map + doubly linked list for efficient cache operations.',
      example: 'Operating system page caches, database buffer pools'
    },
    {
      name: 'Password Storage',
      description: 'Hash tables store hashed passwords for quick authentication.',
      example: 'User authentication systems hash passwords for security and speed'
    }
  ]
};
