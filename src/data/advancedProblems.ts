import type { Problem } from '../types/topic';

export const stringProblems: Problem[] = [
  {
    id: 'str-valid-anagram',
    title: 'Valid Anagram',
    difficulty: 'Easy',
    description: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise.',
    examples: [{ input: 's = "anagram", t = "nagaram"', output: 'true' }],
    solution: {
      approach: 'Frequency counting using a fixed-size array or hash map.',
      code: `function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  const count = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - 97]++;
    count[t.charCodeAt(i) - 97]--;
  }
  return count.every(c => c === 0);
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1) because array size is at most 26',
      stepByStep: ['Check if lengths are equal', 'Count characters of s', 'Decrement for characters of t', 'Verify all counts are zero']
    },
    hints: ['Count frequency of each letter', 'If lengths differ, it cannot be an anagram']
  },
  {
    id: 'str-longest-palindromic-substring',
    title: 'Longest Palindromic Substring',
    difficulty: 'Medium',
    description: 'Given a string s, return the longest palindromic substring in s.',
    examples: [{ input: 's = "babad"', output: '"bab"' }],
    solution: {
      approach: 'Expand around center for each character and between characters.',
      code: `function longestPalindrome(s: string): string {
  let maxStr = "";
  for (let i = 0; i < s.length; i++) {
    for (const j of [i, i+1]) {
      let l = i, r = j;
      while (l >= 0 && r < s.length && s[l] === s[r]) {
        if (r - l + 1 > maxStr.length) maxStr = s.substring(l, r + 1);
        l--;
        r++;
      }
    }
  }
  return maxStr;
}`,
      timeComplexity: 'O(n^2)',
      spaceComplexity: 'O(1)',
      stepByStep: ['Iterate through each character as a potential center', 'Expand outward as long as characters match', 'Track the maximum substring found']
    },
    hints: ['A palindrome mirrors around its center', 'Consider both odd and even length centers']
  },
  {
    id: 'longest-common-prefix',
    title: 'Longest Common Prefix',
    difficulty: 'Easy',
    description: 'Find the longest common prefix string amongst an array of strings.',
    examples: [
      {
        input: 'strs = ["flower","flow","flight"]',
        output: '"fl"'
      }
    ],
    solution: {
      approach: 'Compare characters vertically across all strings',
      code: `function longestCommonPrefix(strs: string[]): string {
  if (strs.length === 0) return '';

  for (let i = 0; i < strs[0].length; i++) {
    const char = strs[0][i];

    for (let j = 1; j < strs.length; j++) {
      if (i >= strs[j].length || strs[j][i] !== char) {
        return strs[0].substring(0, i);
      }
    }
  }

  return strs[0];
}`,
      timeComplexity: 'O(m * n) - m is min length, n is number of strings',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Take first string as reference',
        'For each character position in reference',
        'Check if all strings have same character at that position',
        'Return prefix up to the mismatch point'
      ]
    },
    hints: [
      'Use first string as the reference',
      'Stop at the first mismatch',
      'Handle empty array case'
    ]
  }
];

export const sortingProblems: Problem[] = [
  {
    id: 'sort-kth-largest',
    title: 'Kth Largest Element in an Array',
    difficulty: 'Medium',
    description: 'Given an integer array nums and an integer k, return the kth largest element in the array.',
    examples: [{ input: 'nums = [3,2,1,5,6,4], k = 2', output: '5' }],
    solution: {
      approach: 'Quickselect algorithm for O(n) average time complexity, or Min-Heap.',
      code: `function findKthLargest(nums: number[], k: number): number {
  return nums.sort((a,b) => b - a)[k-1]; // Built-in sort approach
  // Quickselect implementation is optimal for O(n)
}`,
      timeComplexity: 'O(n log n) with sort, O(n) expected with QuickSelect',
      spaceComplexity: 'O(1)',
      stepByStep: ['A naive approach is to sort the array and pick the element', 'For optimization, use a min-heap of size K or Quickselect algorithm']
    },
    hints: ['Sorting works but takes O(N log N)', 'Can you do it in O(N)? Think Quickselect.']
  },
  {
    id: 'sort-merge-intervals',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    description: 'Given an array of intervals, merge all overlapping intervals.',
    examples: [{ input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]' }],
    solution: {
      approach: 'Sort by start time, then merge overlapping ones by comparing current start with previous end.',
      code: `function merge(intervals: number[][]): number[][] {
  intervals.sort((a, b) => a[0] - b[0]);
  const res = [intervals[0]];
  for (const curr of intervals) {
    const prev = res[res.length - 1];
    if (curr[0] <= prev[1]) {
      prev[1] = Math.max(prev[1], curr[1]);
    } else {
      res.push(curr);
    }
  }
  return res;
}`,
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      stepByStep: ['Sort intervals by start time', 'Iterate and check if current interval overlaps with the last added one', 'If it overlaps, update the end time', 'Else, push to result']
    },
    hints: ['How does sorting the intervals first help?', 'Sort by start time']
  },
  {
    id: 'top-k-frequent',
    title: 'Top K Frequent Elements',
    difficulty: 'Medium',
    description: 'Given an integer array nums and an integer k, return the k most frequent elements.',
    examples: [
      {
        input: 'nums = [1,1,1,2,2,3], k = 2',
        output: '[1,2]'
      }
    ],
    solution: {
      approach: 'Use a hash map to count frequencies, then use a bucket sort or priority queue',
      code: `function topKFrequent(nums: number[], k: number): number[] {
  const freq = new Map<number, number>();
  for (const num of nums) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }

  const buckets: number[][] = Array(nums.length + 1).fill(null).map(() => []);
  for (const [num, count] of freq) {
    buckets[count].push(num);
  }

  const result: number[] = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    for (const num of buckets[i]) {
      result.push(num);
      if (result.length === k) break;
    }
  }

  return result;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      stepByStep: [
        'Count frequency of each number using hash map',
        'Create buckets where index is frequency',
        'Iterate from highest frequency bucket',
        'Collect k most frequent elements'
      ]
    },
    hints: [
      'Bucket sort based on frequency',
      'Use array of arrays for buckets',
      'Iterate from highest frequency'
    ]
  }
];

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
  }
];

export const dpProblems: Problem[] = [
  {
    id: 'dp-climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. How many distinct ways can you climb to the top?',
    examples: [{ input: 'n = 3', output: '3' }],
    solution: {
      approach: 'Fibonacci sequence. Ways(n) = Ways(n-1) + Ways(n-2)',
      code: `function climbStairs(n: number): number {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) {
    let temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: ['Base case: n=1 is 1, n=2 is 2', 'Use two variables to track previous two states', 'Iterate and sum']
    },
    hints: ['To reach step n, you must step from n-1 or n-2']
  },
  {
    id: 'dp-coin-change',
    title: 'Coin Change',
    difficulty: 'Medium',
    description: 'Return the fewest number of coins that you need to make up that amount.',
    examples: [{ input: 'coins = [1,2,5], amount = 11', output: '3' }],
    solution: {
      approach: 'Bottom-up DP. dp[i] = min(dp[i], 1 + dp[i - coin])',
      code: `function coinChange(coins: number[], amount: number): number {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
      timeComplexity: 'O(amount * coins.length)',
      spaceComplexity: 'O(amount)',
      stepByStep: ['Initialize DP array with Infinity', 'Set dp[0] = 0', 'For each amount, check all coins to find minimum required']
    },
    hints: ['Build the solution array from bottom up', 'What is the answer for amount 0?']
  },
  {
    id: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    examples: [
      {
        input: 'n = 2',
        output: '2',
        explanation: '1. 1 step + 1 step 2. 2 steps'
      }
    ],
    solution: {
      approach: 'DP where dp[i] = dp[i-1] + dp[i-2], similar to Fibonacci',
      code: `function climbStairs(n: number): number {
  if (n <= 2) return n;

  let prev1 = 1;
  let prev2 = 2;

  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev1 = prev2;
    prev2 = current;
  }

  return prev2;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Base cases: 1 way for 1 step, 2 ways for 2 steps',
        'For each step, ways = ways(n-1) + ways(n-2)',
        'Use two variables to track previous results'
      ]
    },
    hints: [
      'This is a Fibonacci sequence',
      'Think about the choices at each step',
      'Optimize space by using only two variables'
    ]
  }
];

export const recursionProblems: Problem[] = [
  {
    id: 'recur-subsets',
    title: 'Subsets',
    difficulty: 'Medium',
    description: 'Given an integer array nums of unique elements, return all possible subsets (the power set).',
    examples: [{ input: 'nums = [1,2]', output: '[[],[1],[2],[1,2]]' }],
    solution: {
      approach: 'Backtracking to explore including vs not including each element.',
      code: `function subsets(nums: number[]): number[][] {
  const res: number[][] = [];
  function backtrack(start: number, path: number[]) {
    res.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  }
  backtrack(0, []);
  return res;
}`,
      timeComplexity: 'O(2^n)',
      spaceComplexity: 'O(n) for recursion stack',
      stepByStep: ['Init empty result array', 'Create recursive backtrack function', 'Add current path to result', 'Loop remaining elements and recursively call backtrack']
    },
    hints: ['At each step, you either include the item or not']
  },
  {
    id: 'generate-parentheses',
    title: 'Generate Parentheses',
    difficulty: 'Medium',
    description: 'Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.',
    examples: [
      {
        input: 'n = 3',
        output: '["((()))","(()())","(())()","()(())","()()()"]'
      }
    ],
    solution: {
      approach: 'Use backtracking to build valid parentheses combinations',
      code: `function generateParenthesis(n: number): string[] {
  const result: string[] = [];

  function backtrack(current: string, open: number, close: number) {
    if (current.length === 2 * n) {
      result.push(current);
      return;
    }

    if (open < n) {
      backtrack(current + '(', open + 1, close);
    }

    if (close < open) {
      backtrack(current + ')', open, close + 1);
    }
  }

  backtrack('', 0, 0);
  return result;
}`,
      timeComplexity: 'O(4^n / sqrt(n)) - Catalan number',
      spaceComplexity: 'O(n) for recursion stack',
      stepByStep: [
        'Use backtracking with counts of open and close parentheses',
        'Add open parenthesis if count < n',
        'Add close parenthesis if close count < open count',
        'When length reaches 2n, add to result'
      ]
    },
    hints: [
      'Track number of open and close parentheses used',
      'Only add close if more open than close',
      'Backtrack when invalid state reached'
    ]
  }
];

export const mathProblems: Problem[] = [
  {
    id: 'math-single-number',
    title: 'Single Number',
    difficulty: 'Easy',
    description: 'Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.',
    examples: [{ input: 'nums = [4,1,2,1,2]', output: '4' }],
    solution: {
      approach: 'Use XOR bitwise operator. a XOR a = 0.',
      code: `function singleNumber(nums: number[]): number {
  let res = 0;
  for (const num of nums) {
    res ^= num;
  }
  return res;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: ['Initialize result = 0', 'Iterate through all nums', 'XOR result with current num']
    },
    hints: ['Can you do this with constant extra space?', 'XOR operation has identical property a ^ a = 0']
  },
  {
    id: 'happy-number',
    title: 'Happy Number',
    difficulty: 'Easy',
    description: 'Write an algorithm to determine if a number n is happy. A happy number is a number defined by the following process: Starting with any positive integer, replace the number by the sum of the squares of its digits, and repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.',
    examples: [
      {
        input: 'n = 19',
        output: 'true',
        explanation: '1² + 9² = 1 + 81 = 82, 8² + 2² = 64 + 4 = 68, 6² + 8² = 36 + 64 = 100, 1² + 0² + 0² = 1 + 0 + 0 = 1'
      }
    ],
    solution: {
      approach: 'Use a set to detect cycles in the sum of squares process',
      code: `function isHappy(n: number): boolean {
  const seen = new Set<number>();

  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    n = getSumOfSquares(n);
  }

  return n === 1;
}

function getSumOfSquares(num: number): number {
  let sum = 0;
  while (num > 0) {
    const digit = num % 10;
    sum += digit * digit;
    num = Math.floor(num / 10);
  }
  return sum;
}`,
      timeComplexity: 'O(log n) for each iteration, but few iterations',
      spaceComplexity: 'O(1) since cycle is small',
      stepByStep: [
        'Use a set to track seen numbers',
        'While not 1 and not seen, add to set and compute sum of squares',
        'Extract digits and square them',
        'Return true if reaches 1'
      ]
    },
    hints: [
      'Use a set to detect cycles',
      'The cycle will eventually be detected',
      'Only 1 leads to happiness'
    ]
  }
];

export const heapProblems: Problem[] = [
  {
    id: 'heap-top-k-frequent',
    title: 'Top K Frequent Elements',
    difficulty: 'Medium',
    description: 'Given an integer array nums and an integer k, return the k most frequent elements.',
    examples: [{ input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1,2]' }],
    solution: {
      approach: 'Frequency Map + Bucket Sort (or Min Heap)',
      code: `function topKFrequent(nums: number[], k: number): number[] {
  const map = new Map();
  for (const num of nums) map.set(num, (map.get(num) || 0) + 1);
  const buckets: number[][] = Array.from({length: nums.length + 1}, () => []);
  for (const [num, freq] of map.entries()) {
    buckets[freq].push(num);
  }
  const res = [];
  for (let i = buckets.length - 1; i >= 0 && res.length < k; i--) {
    res.push(...buckets[i]);
  }
  return res.slice(0, k);
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      stepByStep: ['Count frequencies into a Map', 'Create buckets where index is frequency', 'Iterate buckets backwards to get top k elements']
    },
    hints: ['Count frequencies first', 'Use a heap or bucket sort']
  },
  {
    id: 'kth-largest-stream',
    title: 'Kth Largest Element in a Stream',
    difficulty: 'Easy',
    description: 'Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element.',
    examples: [
      {
        input: '["KthLargest", "add", "add", "add", "add"] [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]',
        output: '[null, 4, 5, 5, 8, 8]',
        explanation: 'The kth largest is initialized with [4,5,8,2], so sorted is [2,4,5,8], 3rd is 4. Then add 3 -> [2,3,4,5,8], 3rd is 4. Add 5 -> [2,3,4,5,5,8], 3rd is 5. Add 10 -> [2,3,4,5,5,8,10], 3rd is 5. Add 9 -> [2,3,4,5,5,8,9,10], 3rd is 8. Add 4 -> [2,3,4,4,5,5,8,9,10], 3rd is 8.'
      }
    ],
    solution: {
      approach: 'Use a min-heap of size k to keep track of the k largest elements',
      code: `class KthLargest {
  constructor(k: number, nums: number[]) {
    this.k = k;
    this.heap = new MinHeap();
    for (const num of nums) {
      this.add(num);
    }
  }

  add(val: number): number {
    this.heap.push(val);
    if (this.heap.size() > this.k) {
      this.heap.pop();
    }
    return this.heap.peek();
  }
}`,
      timeComplexity: 'O(n log k) for init, O(log k) for add',
      spaceComplexity: 'O(k)',
      stepByStep: [
        'Initialize min-heap with first k elements',
        'For each new element, add to heap',
        'If heap size > k, remove smallest',
        'The heap top is always the kth largest'
      ]
    },
    hints: [
      'Use a min-heap to keep smallest of the largest k',
      'Heap size should not exceed k',
      'The root is the kth largest'
    ]
  }
];

export const trieProblems: Problem[] = [
  {
    id: 'trie-implement',
    title: 'Implement Trie (Prefix Tree)',
    difficulty: 'Medium',
    description: 'A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings.',
    examples: [{ input: 'Trie(), insert("apple"), search("apple"), startsWith("app")', output: 'null, null, true, true' }],
    solution: {
      approach: 'Create a Node class containing children Map and isWord boolean.',
      code: `class TrieNode {
    children: Map<string, TrieNode> = new Map();
    isWord: boolean = false;
}
class Trie {
    root = new TrieNode();
    insert(word: string): void {
        let curr = this.root;
        for (const c of word) {
            if (!curr.children.has(c)) curr.children.set(c, new TrieNode());
            curr = curr.children.get(c)!;
        }
        curr.isWord = true;
    }
    search(word: string): boolean {
        let curr = this.root;
        for (const c of word) {
            if (!curr.children.has(c)) return false;
            curr = curr.children.get(c)!;
        }
        return curr.isWord;
    }
}`,
      timeComplexity: 'O(M) where M is the key length',
      spaceComplexity: 'O(1) auxiliary, O(N*M) total space',
      stepByStep: ['Store characters in nested objects/maps', 'Flag the end of a valid word', 'Traverse node by node for search operations']
    },
    hints: ['Each node represents a single character', 'You need a flag to mark where a stored word ends']
  },
  {
    id: 'replace-words',
    title: 'Replace Words',
    difficulty: 'Medium',
    description: 'In English, we have a concept called root, which can be followed by some other word to form another longer word - let\'s call this word successor. For example, when the root "an" is followed by the successor word "other", we can form a new word "another". Given a dictionary consisting of many roots and a sentence consisting of words separated by spaces, replace all the successors in the sentence with the root forming it.',
    examples: [
      {
        input: 'dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"',
        output: '"the cat was rat by the bat"'
      }
    ],
    solution: {
      approach: 'Build a trie with the dictionary roots, then for each word in sentence, find the shortest prefix that is a root',
      code: `function replaceWords(dictionary: string[], sentence: string): string {
  const trie = new Trie();
  for (const root of dictionary) {
    trie.insert(root);
  }

  const words = sentence.split(' ');
  for (let i = 0; i < words.length; i++) {
    words[i] = trie.findRoot(words[i]);
  }

  return words.join(' ');
}

class Trie {
  root = new TrieNode();

  insert(word: string) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) node.children[char] = new TrieNode();
      node = node.children[char];
    }
    node.isEnd = true;
  }

  findRoot(word: string): string {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!node.children[char]) return word;
      node = node.children[char];
      if (node.isEnd) return word.substring(0, i + 1);
    }
    return word;
  }
}

class TrieNode {
  children: { [key: string]: TrieNode } = {};
  isEnd = false;
}`,
      timeComplexity: 'O(N + M) where N is total characters in dictionary, M in sentence',
      spaceComplexity: 'O(N)',
      stepByStep: [
        'Build trie with all dictionary roots',
        'Split sentence into words',
        'For each word, traverse trie to find shortest root prefix',
        'Replace word with root if found'
      ]
    },
    hints: [
      'Use a trie to store dictionary roots',
      'For each word, find the shortest prefix that exists in trie',
      'Stop at the first end-of-word marker'
    ]
  }
];

export const designProblems: Problem[] = [
  {
    id: 'design-twitter',
    title: 'Design Twitter',
    difficulty: 'Medium',
    description: 'Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and see the 10 most recent tweets in the users news feed.',
    examples: [{ input: 'postTweet(1, 5), getNewsFeed(1), follow(1, 2), postTweet(2, 6), getNewsFeed(1)', output: 'null, [5], null, null, [6, 5]' }],
    solution: {
      approach: 'Hash maps for follow relations and a global timestamp / list of tweets.',
      code: `// Conceptual pseudo-code for system design
class Twitter {
    tweets = []; // [{userId, tweetId}]
    follows = new Map(); // Follower -> Set(Followees)

    postTweet(userId: number, tweetId: number): void {
        this.tweets.push({ userId, tweetId });
    }

    getNewsFeed(userId: number): number[] {
        const following = this.follows.get(userId) || new Set();
        const res = [];
        for (let i = this.tweets.length - 1; i >= 0 && res.length < 10; i--) {
            const tweet = this.tweets[i];
            if (tweet.userId === userId || following.has(tweet.userId)) {
                res.push(tweet.tweetId);
            }
        }
        return res;
    }
    // follow/unfollow manipulates the Set
}`,
      timeComplexity: 'O(T) where T is total tweets to scan for feed',
      spaceComplexity: 'O(U + T) for Users and Tweets',
      stepByStep: ['Track relationships using Maps of Sets', 'Store tweets linearly', 'Feed generation filters tweets from bottom to top']
    },
    hints: ['Consider how to fetch the latest tweets efficiently', 'A user sees their own tweets and followees tweets']
  },
  {
    id: 'design-hashmap',
    title: 'Design HashMap',
    difficulty: 'Easy',
    description: 'Design a HashMap without using any built-in hash table libraries.',
    examples: [
      {
        input: '["MyHashMap", "put", "put", "get", "get", "put", "get", "remove", "get"] [[], [1, 1], [2, 2], [1], [3], [2, 1], [2], [2], [2]]',
        output: '[null, null, null, 1, -1, null, 1, null, -1]'
      }
    ],
    solution: {
      approach: 'Use an array of linked lists to handle collisions, with a simple hash function',
      code: `class MyHashMap {
  private buckets: LinkedList[];
  private size: number;

  constructor() {
    this.size = 1000;
    this.buckets = new Array(this.size).fill(null).map(() => new LinkedList());
  }

  put(key: number, value: number): void {
    const index = this.hash(key);
    this.buckets[index].put(key, value);
  }

  get(key: number): number {
    const index = this.hash(key);
    return this.buckets[index].get(key);
  }

  remove(key: number): void {
    const index = this.hash(key);
    this.buckets[index].remove(key);
  }

  private hash(key: number): number {
    return key % this.size;
  }
}

class LinkedList {
  head: Node | null = null;

  put(key: number, value: number): void {
    let curr = this.head;
    while (curr) {
      if (curr.key === key) {
        curr.value = value;
        return;
      }
      curr = curr.next;
    }
    const newNode = new Node(key, value);
    newNode.next = this.head;
    this.head = newNode;
  }

  get(key: number): number {
    let curr = this.head;
    while (curr) {
      if (curr.key === key) return curr.value;
      curr = curr.next;
    }
    return -1;
  }

  remove(key: number): void {
    if (!this.head) return;
    if (this.head.key === key) {
      this.head = this.head.next;
      return;
    }
    let curr = this.head;
    while (curr.next) {
      if (curr.next.key === key) {
        curr.next = curr.next.next;
        return;
      }
      curr = curr.next;
    }
  }
}

class Node {
  key: number;
  value: number;
  next: Node | null;

  constructor(key: number, value: number) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}`,
      timeComplexity: 'O(1) average, O(n) worst case',
      spaceComplexity: 'O(n)',
      stepByStep: [
        'Use array of linked lists for separate chaining',
        'Implement put, get, remove operations',
        'Handle collisions by traversing linked list',
        'Use modulo for simple hash function'
      ]
    },
    hints: [
      'Use an array with linked lists for collision resolution',
      'Implement basic linked list operations',
      'Choose a reasonable bucket size'
    ]
  }
];

// Missing models for ProblemsPage
export interface AdvancedProblem {
    id: string;
    title: string;
    difficulty: string;
    category: string[];
    description: string;
    examples: { input: string; output: string; explanation?: string }[];
    constraints: string[];
    hints: string[];
    bruteForce: {
        approach: string;
        code: string;
        timeComplexity: string;
        spaceComplexity: string;
        whyThisComplexity: string;
    };
    optimal: {
        approach: string;
        code: string;
        timeComplexity: string;
        spaceComplexity: string;
        whyThisComplexity: string;
        stepByStep: string[];
    };
    keyTakeaways: string[];
}

export const difficultyColors: Record<string, string> = {
    'Easy': '#10b981',
    'Medium': '#f97316',
    'Hard': '#f59e0b',
    'Expert': '#ef4444'
};

export const advancedProblems: AdvancedProblem[] = [
    {
        id: 'adv-lru-cache',
        title: 'Design LRU Cache (Advanced)',
        difficulty: 'Hard',
        category: ['Design', 'Hash Table', 'Linked List'],
        description: 'Design and implement a data structure for Least Recently Used (LRU) cache.',
        examples: [
            { input: 'LRUCache(2), put(1,1), put(2,2), get(1)', output: '1', explanation: 'Cache is {1=1, 2=2}, get(1) makes 1 most recently used.' }
        ],
        constraints: ['capacity >= 1', '0 <= key <= 10^4', 'O(1) average time complexity required.'],
        hints: ['Use a hash map to look up keys.', 'Use a doubly linked list to order them.'],
        bruteForce: {
            approach: 'Array based timeline',
            code: 'class LRUCache { /* brute force implemented with array push/shift */ }',
            timeComplexity: 'O(n) for update',
            spaceComplexity: 'O(n)',
            whyThisComplexity: 'Shifting elements in an array takes O(n) time.'
        },
        optimal: {
            approach: 'Hash Map + Doubly Linked List',
            code: 'class LRUCache { /* Node pointers and map for instant O(1) access */ }',
            timeComplexity: 'O(1) average',
            spaceComplexity: 'O(n) nodes',
            whyThisComplexity: 'Linked list provides O(1) removals. Map provides O(1) lookups.',
            stepByStep: [
                'Create a generic doubly linked list node',
                'Maintain head and tail dummy nodes',
                'Whenever a node is accessed, move it to the front',
                'When capacity is reached, remove node from tail and map'
            ]
        },
        keyTakeaways: ['Combining data structures often solves time constraints.']
    }
];
