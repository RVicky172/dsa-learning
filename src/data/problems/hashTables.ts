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
  }
];

