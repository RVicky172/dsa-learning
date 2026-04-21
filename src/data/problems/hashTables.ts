import type { Problem } from '../../types/topic';

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
  },
  // ── NEW BATCH (TKT-016) ──────────────────────────────────────────
  {
    id: 'ht-contains-duplicate',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    description: 'Given an integer array nums, return true if any value appears at least twice, false if every element is distinct.',
    examples: [
      { input: 'nums = [1,2,3,1]', output: 'true' },
      { input: 'nums = [1,2,3,4]', output: 'false' }
    ],
    solution: {
      approach: 'Use a Set; return true as soon as a repeated element is seen.',
      code: `function containsDuplicate(nums: number[]): boolean {
  const seen = new Set<number>();
  for (const n of nums) {
    if (seen.has(n)) return true;
    seen.add(n);
  }
  return false;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      stepByStep: [
        'Iterate through nums',
        'For each number check if already in Set',
        'If yes, return true immediately',
        'Otherwise add to Set and continue'
      ]
    },
    hints: ['A Set gives O(1) average lookup.', 'Early return as soon as a duplicate is found.']
  },
  {
    id: 'ht-ransom-note',
    title: 'Ransom Note',
    difficulty: 'Easy',
    description: 'Given two strings ransomNote and magazine, return true if ransomNote can be constructed using the letters from magazine. Each letter in magazine can only be used once.',
    examples: [
      { input: 'ransomNote = "a", magazine = "b"', output: 'false' },
      { input: 'ransomNote = "aa", magazine = "aab"', output: 'true' }
    ],
    solution: {
      approach: 'Count character frequencies in magazine; verify ransomNote demands are met.',
      code: `function canConstruct(ransomNote: string, magazine: string): boolean {
  const count = new Map<string, number>();
  for (const ch of magazine) count.set(ch, (count.get(ch) ?? 0) + 1);
  for (const ch of ransomNote) {
    if (!count.get(ch)) return false;
    count.set(ch, count.get(ch)! - 1);
  }
  return true;
}`,
      timeComplexity: 'O(m + n)',
      spaceComplexity: 'O(1) (at most 26 keys)',
      stepByStep: [
        'Build frequency map from magazine',
        'For each character in ransomNote, decrement count',
        'If count is 0 or missing, return false',
        'Return true if all characters satisfied'
      ]
    },
    hints: ['A 26-element array (letter counts) is more memory-efficient than a Map.', 'One pass for magazine, one pass for ransom note.']
  },
  {
    id: 'ht-longest-consecutive-sequence',
    title: 'Longest Consecutive Sequence',
    difficulty: 'Medium',
    description: 'Given an unsorted array of integers, find the length of the longest consecutive elements sequence. Must run in O(n).',
    examples: [
      { input: 'nums = [100,4,200,1,3,2]', output: '4', explanation: '[1,2,3,4]' },
      { input: 'nums = [0,3,7,2,5,8,4,6,0,1]', output: '9' }
    ],
    solution: {
      approach: 'Put all numbers in a Set. For each number that has no left neighbour (n-1 not in set), count the consecutive run starting there.',
      code: `function longestConsecutive(nums: number[]): number {
  const set = new Set(nums);
  let best = 0;
  for (const n of set) {
    if (!set.has(n - 1)) {
      let len = 1;
      while (set.has(n + len)) len++;
      best = Math.max(best, len);
    }
  }
  return best;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      stepByStep: [
        'Insert all elements into a Set for O(1) lookup',
        'Only start counting when n-1 is NOT in the set (sequence start)',
        'Extend the sequence as long as consecutive elements exist',
        'Track the maximum length found'
      ]
    },
    hints: ['Only count runs that start at a sequence boundary (n-1 not in set).', 'Each element is visited at most twice → O(n).']
  },
  {
    id: 'ht-subarray-sum-equals-k',
    title: 'Subarray Sum Equals K',
    difficulty: 'Medium',
    description: 'Given an integer array nums and an integer k, return the total number of subarrays whose sum equals k.',
    examples: [
      { input: 'nums = [1,1,1], k = 2', output: '2' },
      { input: 'nums = [1,2,3], k = 3', output: '2' }
    ],
    solution: {
      approach: 'Prefix sum + hash map: count occurrences of each prefix sum. A subarray [j+1..i] sums to k if prefix[i] - prefix[j] = k.',
      code: `function subarraySum(nums: number[], k: number): number {
  const prefixCount = new Map<number, number>([[0, 1]]);
  let sum = 0;
  let count = 0;
  for (const n of nums) {
    sum += n;
    count += prefixCount.get(sum - k) ?? 0;
    prefixCount.set(sum, (prefixCount.get(sum) ?? 0) + 1);
  }
  return count;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      stepByStep: [
        'Initialise map with {0: 1} (empty prefix has sum 0)',
        'Maintain running prefix sum',
        'For each element, add count of (sum - k) in map to result',
        'Then record current sum in map'
      ]
    },
    hints: ['Prefix sum difference trick: sum[i] - sum[j] = k means subarray j+1..i sums to k.', 'Map[0]=1 handles subarrays starting from index 0.']
  },
  {
    id: 'ht-4sum-count',
    title: '4Sum II',
    difficulty: 'Medium',
    description: 'Given four integer arrays A, B, C, D each of length n, return the number of tuples (i,j,k,l) such that A[i]+B[j]+C[k]+D[l] = 0.',
    examples: [
      { input: 'A=[1,2],B=[-2,-1],C=[-1,2],D=[0,2]', output: '2' }
    ],
    solution: {
      approach: 'Split into two pairs. Store all A[i]+B[j] sums in a map; for each C[k]+D[l], look up -(C[k]+D[l]).',
      code: `function fourSumCount(
  nums1: number[], nums2: number[],
  nums3: number[], nums4: number[]
): number {
  const abCount = new Map<number, number>();
  for (const a of nums1) {
    for (const b of nums2) {
      abCount.set(a + b, (abCount.get(a + b) ?? 0) + 1);
    }
  }
  let count = 0;
  for (const c of nums3) {
    for (const d of nums4) {
      count += abCount.get(-(c + d)) ?? 0;
    }
  }
  return count;
}`,
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(n²)',
      stepByStep: [
        'Enumerate all pairwise sums from A and B; store counts in map',
        'Enumerate all pairwise sums from C and D',
        'For each CD sum, look up its negation in map',
        'Add the count to result'
      ]
    },
    hints: ['Split 4-sum into two 2-sum halves.', 'Map stores (sum → count) not just presence.']
  },
  {
    id: 'ht-all-anagrams-in-string',
    title: 'Find All Anagrams in a String',
    difficulty: 'Hard',
    description: 'Given strings s and p, return all start indices of anagrams of p in s.',
    examples: [
      { input: 's = "cbaebabacd", p = "abc"', output: '[0,6]' },
      { input: 's = "abab", p = "ab"', output: '[0,1,2]' }
    ],
    solution: {
      approach: 'Sliding window of length |p|; maintain two frequency arrays and compare in O(1) using a mismatch counter.',
      code: `function findAnagrams(s: string, p: string): number[] {
  const result: number[] = [];
  if (s.length < p.length) return result;
  const pCount = new Array(26).fill(0);
  const wCount = new Array(26).fill(0);
  const base = 'a'.charCodeAt(0);
  for (let i = 0; i < p.length; i++) {
    pCount[p.charCodeAt(i) - base]++;
    wCount[s.charCodeAt(i) - base]++;
  }
  let mismatches = 0;
  for (let i = 0; i < 26; i++) if (pCount[i] !== wCount[i]) mismatches++;
  if (mismatches === 0) result.push(0);
  for (let r = p.length; r < s.length; r++) {
    const add = s.charCodeAt(r) - base;
    const rem = s.charCodeAt(r - p.length) - base;
    // add new character
    if (wCount[add] === pCount[add]) mismatches++;
    wCount[add]++;
    if (wCount[add] === pCount[add]) mismatches--;
    // remove old character
    if (wCount[rem] === pCount[rem]) mismatches++;
    wCount[rem]--;
    if (wCount[rem] === pCount[rem]) mismatches--;
    if (mismatches === 0) result.push(r - p.length + 1);
  }
  return result;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Initialise frequency arrays for p and the first window of s',
        'Count initial mismatches between the two arrays',
        'Slide the window: add new right char, remove old left char',
        'Update mismatch count; push start index when mismatches = 0'
      ]
    },
    hints: ['Tracking mismatches avoids O(26) comparison on each slide.', 'Update mismatch count before and after each freq change.']
  }
];

