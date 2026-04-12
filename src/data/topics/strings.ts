import type { Topic } from '../../types/topic';
import { stringProblems } from '../advancedProblems';
import React from 'react';
import { Lightbulb } from 'lucide-react';

export const stringsTopic: Topic = {
  id: 'strings',
  title: 'Strings',
  description: 'Text processing and pattern matching algorithms.',
  complexity: 'O(n) typical',
  icon: React.createElement(Lightbulb, { size: 24 }),
  delay: 0.7,

  introduction: `Strings are sequences of characters and are one of the most common data types in programming. String problems often combine array techniques with character-specific operations. Understanding string algorithms is crucial for text processing, pattern matching, and many real-world applications.

In most languages, strings are backed by character arrays (or byte arrays for Unicode). However, a key distinction is that strings are immutable in many languages (Java, Python, JavaScript). This means operations like concatenation create entirely new strings — a fact that has significant performance implications.

## String Encoding
Strings at the hardware level are sequences of bytes. ASCII uses 1 byte per character (128 characters), while UTF-8 uses 1-4 bytes to represent the full Unicode range (~150,000 characters). Understanding encoding is critical when working with international text, emoji, and character indexing.

## String Interning
Many languages optimize string comparisons through string interning — storing only one copy of each distinct string value. This makes equality checks O(1) for interned strings instead of O(n).`,

  whyImportant: 'String manipulation appears in nearly every application — from search engines and compilers to DNA sequencing and natural language processing. String algorithms like KMP and Rabin-Karp are foundational to computer science. In interviews, string problems are extremely common and test a wide range of skills: hash maps, two pointers, sliding window, dynamic programming, and more.',

  whenToUse: [
    'Text processing and manipulation',
    'Pattern matching and searching',
    'Compression and encoding',
    'Natural language processing',
    'Data validation and parsing',
    'DNA/RNA sequence analysis',
    'Compiler design (lexing and parsing)'
  ],

  advantages: [
    'Simple, intuitive representation of text',
    'Many optimized library functions available',
    'Immutability provides thread-safety in many languages',
    'Pattern matching enables powerful text processing',
    'Rich ecosystem of algorithms (KMP, Rabin-Karp, Aho-Corasick)'
  ],

  disadvantages: [
    'Immutability in many languages means O(n) concatenation',
    'Naive pattern matching can be O(n × m)',
    'Unicode handling adds complexity',
    'Memory overhead for string storage (encoding, metadata)',
    'String comparison is O(n) in general case'
  ],

  concepts: [
    {
      name: 'String Matching (KMP)',
      description: 'Knuth-Morris-Pratt algorithm finds pattern occurrences in O(n+m) time using a failure function to skip unnecessary comparisons. It preprocesses the pattern to build a partial match table.'
    },
    {
      name: 'Palindrome',
      description: 'Strings that read the same forward and backward. Manacher\'s algorithm finds the longest palindromic substring in O(n). The expand-around-center approach is O(n²) but simpler.'
    },
    {
      name: 'Subsequence vs Substring',
      description: 'A substring is a contiguous sequence of characters. A subsequence maintains relative order but can skip characters. "ace" is a subsequence of "abcde" but not a substring.'
    },
    {
      name: 'Edit Distance (Levenshtein)',
      description: 'The minimum number of single-character edits (insert, delete, replace) to transform one string into another. Solved with DP in O(n×m) time. Used in spell checkers and DNA analysis.'
    },
    {
      name: 'String Hashing (Rabin-Karp)',
      description: 'Rolling hash technique for efficient substring matching. Hash the pattern and slide a window across the text, updating the hash in O(1) per step. Average case O(n+m).'
    },
    {
      name: 'Trie-based String Operations',
      description: 'Tries (prefix trees) enable O(L) lookup where L is string length, and support prefix-based operations like autocomplete and spell checking.'
    }
  ],

  examples: [
    {
      title: 'KMP Pattern Matching',
      language: 'typescript',
      code: `// KMP Algorithm — O(n + m) string matching
function buildLPS(pattern: string): number[] {
  const lps = new Array(pattern.length).fill(0);
  let len = 0;
  let i = 1;

  while (i < pattern.length) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }
  return lps;
}

function kmpSearch(text: string, pattern: string): number[] {
  const lps = buildLPS(pattern);
  const matches: number[] = [];
  let i = 0, j = 0;

  while (i < text.length) {
    if (pattern[j] === text[i]) {
      i++; j++;
    }
    if (j === pattern.length) {
      matches.push(i - j);
      j = lps[j - 1];
    } else if (i < text.length && pattern[j] !== text[i]) {
      if (j !== 0) {
        j = lps[j - 1]; // Skip using LPS
      } else {
        i++;
      }
    }
  }
  return matches;
}

console.log(kmpSearch("ABABDABACDABABCABAB", "ABABCABAB"));
// [9]`,
      explanation: 'KMP preprocesses the pattern to build a Longest Proper Prefix-Suffix (LPS) array. When a mismatch occurs, instead of restarting, it uses the LPS to skip characters already known to match — achieving linear time.',
      timeComplexity: 'O(n + m) where n = text length, m = pattern length',
      spaceComplexity: 'O(m) for the LPS array'
    },
    {
      title: 'Longest Palindromic Substring',
      language: 'typescript',
      code: `// Expand around center — O(n²) but simple
function longestPalindrome(s: string): string {
  if (s.length < 2) return s;
  let start = 0, maxLen = 1;

  function expandAroundCenter(left: number, right: number) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      const len = right - left + 1;
      if (len > maxLen) {
        start = left;
        maxLen = len;
      }
      left--;
      right++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expandAroundCenter(i, i);     // Odd-length palindromes
    expandAroundCenter(i, i + 1); // Even-length palindromes
  }

  return s.substring(start, start + maxLen);
}

console.log(longestPalindrome("babad"));  // "bab" or "aba"
console.log(longestPalindrome("cbbd"));   // "bb"`,
      explanation: 'For each position, we try expanding outward checking for palindromes. We check both odd-length (single center) and even-length (two center characters) palindromes. This is simpler than Manacher\'s but still efficient for most cases.',
      timeComplexity: 'O(n²) — expanding from each center takes O(n)',
      spaceComplexity: 'O(1) — only tracking start and length'
    },
    {
      title: 'Anagram Detection with Sliding Window',
      language: 'typescript',
      code: `// Find all anagram start indices in a string
function findAnagrams(s: string, p: string): number[] {
  const result: number[] = [];
  if (s.length < p.length) return result;

  const pCount = new Array(26).fill(0);
  const sCount = new Array(26).fill(0);
  const aCode = 'a'.charCodeAt(0);

  // Build pattern frequency
  for (const ch of p) {
    pCount[ch.charCodeAt(0) - aCode]++;
  }

  for (let i = 0; i < s.length; i++) {
    // Add current char to window
    sCount[s.charCodeAt(i) - aCode]++;

    // Remove char leaving the window
    if (i >= p.length) {
      sCount[s.charCodeAt(i - p.length) - aCode]--;
    }

    // Compare frequency arrays
    if (i >= p.length - 1) {
      if (pCount.every((val, idx) => val === sCount[idx])) {
        result.push(i - p.length + 1);
      }
    }
  }
  return result;
}

console.log(findAnagrams("cbaebabacd", "abc")); // [0, 6]`,
      explanation: 'We maintain a sliding window of size |p| over the string s, comparing character frequencies. By using fixed-size frequency arrays (26 for lowercase), the comparison is O(1) per window position.',
      timeComplexity: 'O(n) where n = length of s',
      spaceComplexity: 'O(1) — fixed 26-element arrays'
    },
    {
      title: 'Edit Distance (Dynamic Programming)',
      language: 'typescript',
      code: `// Levenshtein Distance — minimum edits to transform
function editDistance(word1: string, word2: string): number {
  const m = word1.length, n = word2.length;
  const dp: number[][] = Array.from(
    { length: m + 1 },
    (_, i) => Array.from({ length: n + 1 }, (_, j) => {
      if (i === 0) return j;  // Insert all of word2
      if (j === 0) return i;  // Delete all of word1
      return 0;
    })
  );

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]; // No edit needed
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],      // Delete
          dp[i][j - 1],      // Insert
          dp[i - 1][j - 1]   // Replace
        );
      }
    }
  }

  return dp[m][n];
}

console.log(editDistance("horse", "ros"));      // 3
console.log(editDistance("intention", "execution")); // 5`,
      explanation: 'Classic DP problem. dp[i][j] represents the minimum edits to convert word1[0..i-1] to word2[0..j-1]. At each cell we choose the minimum cost among insert, delete, or replace operations.',
      timeComplexity: 'O(m × n) where m, n are string lengths',
      spaceComplexity: 'O(m × n) for the DP table (can be optimized to O(min(m,n)))'
    }
  ],

  patterns: [
    {
      name: 'Sliding Window on Strings',
      description: 'Maintain a window of characters and slide it across the string, tracking character frequencies or other properties to find optimal substrings.',
      technique: 'Use two pointers (left, right) with a frequency map. Expand right to explore, shrink left to maintain constraints.',
      example: 'Minimum window substring, longest substring without repeating chars, find all anagrams',
      whenToUse: [
        'Finding substrings with specific character properties',
        'Anagram detection in a text',
        'Longest/shortest substring with constraints',
        'Character frequency problems within a window'
      ]
    },
    {
      name: 'Two Pointers on Strings',
      description: 'Use two pointers converging from opposite ends or moving in the same direction to solve string problems in-place.',
      technique: 'Start pointers at strategic positions and move based on character comparisons or conditions.',
      example: 'Valid palindrome, reverse string, remove duplicates, compare version numbers',
      whenToUse: [
        'Palindrome verification',
        'In-place string reversal',
        'String comparison problems',
        'Removing or rearranging characters'
      ]
    },
    {
      name: 'String Hashing',
      description: 'Use polynomial rolling hash to compare substrings in O(1) after O(n) preprocessing, enabling efficient pattern matching.',
      technique: 'Hash = Σ(char[i] × base^i) mod prime. Roll the hash by removing the front char and adding the new char.',
      example: 'Rabin-Karp matching, detecting duplicate substrings, longest duplicate substring',
      whenToUse: [
        'Multiple pattern matching',
        'Finding repeated substrings',
        'String comparison optimization',
        'Plagiarism detection'
      ]
    },
    {
      name: 'Character Frequency Map',
      description: 'Count character occurrences using a hash map or fixed-size array for O(1) lookups. Foundation for many string problems.',
      technique: 'Build a frequency array of size 26 (lowercase) or 128 (ASCII). Compare, add, or subtract frequencies as needed.',
      example: 'Anagram checking, minimum window substring, first unique character, character rearrangement',
      whenToUse: [
        'Anagram and permutation problems',
        'Character counting and frequency analysis',
        'Validating character constraints',
        'String transformation problems'
      ]
    }
  ],

  problems: [
    ...stringProblems,
    {
      id: 'str-valid-anagram',
      title: 'Valid Anagram',
      difficulty: 'Easy',
      description: 'Given two strings s and t, determine if t is an anagram of s.',
      examples: [
        { input: 's = "anagram", t = "nagaram"', output: 'true' },
        { input: 's = "rat", t = "car"', output: 'false' }
      ],
      solution: {
        approach: 'Count character frequencies and compare. Use a fixed-size array for O(1) space.',
        code: `function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  const count = new Array(26).fill(0);
  const a = 'a'.charCodeAt(0);

  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - a]++;
    count[t.charCodeAt(i) - a]--;
  }

  return count.every(c => c === 0);
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1) — fixed 26-element array',
        stepByStep: [
          'Check if lengths differ — if so, return false immediately',
          'Create a count array of size 26 for lowercase letters',
          'Increment for characters in s, decrement for characters in t',
          'If all counts are zero, the strings are anagrams'
        ]
      },
      hints: [
        'Anagrams have the same character frequencies',
        'You can use a single array instead of two',
        'Increment for one string, decrement for the other'
      ]
    },
    {
      id: 'str-longest-common-prefix',
      title: 'Longest Common Prefix',
      difficulty: 'Easy',
      description: 'Find the longest common prefix string among an array of strings.',
      examples: [
        { input: 'strs = ["flower","flow","flight"]', output: '"fl"' },
        { input: 'strs = ["dog","racecar","car"]', output: '""' }
      ],
      solution: {
        approach: 'Compare characters column by column across all strings.',
        code: `function longestCommonPrefix(strs: string[]): string {
  if (strs.length === 0) return "";

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
        timeComplexity: 'O(S) where S is sum of all characters',
        spaceComplexity: 'O(1)',
        stepByStep: [
          'Use the first string as reference',
          'Check each character position across all strings',
          'Stop when a mismatch is found or a string ends',
          'Return the common prefix found so far'
        ]
      },
      hints: [
        'Compare character by character vertically',
        'Use the first string as a baseline',
        'Stop at the shortest string length'
      ]
    },
    {
      id: 'str-min-window-substring',
      title: 'Minimum Window Substring',
      difficulty: 'Hard',
      description: 'Given strings s and t, find the minimum window in s that contains all characters of t.',
      examples: [
        {
          input: 's = "ADOBECODEBANC", t = "ABC"',
          output: '"BANC"',
          explanation: 'The minimum window containing A, B, C is "BANC"'
        }
      ],
      solution: {
        approach: 'Use sliding window with two pointers and a frequency map to track required characters.',
        code: `function minWindow(s: string, t: string): string {
  const need = new Map<string, number>();
  for (const c of t) need.set(c, (need.get(c) || 0) + 1);

  let have = 0, required = need.size;
  let left = 0, minLen = Infinity, minStart = 0;
  const window = new Map<string, number>();

  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    window.set(c, (window.get(c) || 0) + 1);

    if (need.has(c) && window.get(c) === need.get(c)) {
      have++;
    }

    while (have === required) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        minStart = left;
      }
      const leftChar = s[left];
      window.set(leftChar, window.get(leftChar)! - 1);
      if (need.has(leftChar) && window.get(leftChar)! < need.get(leftChar)!) {
        have--;
      }
      left++;
    }
  }

  return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
}`,
        timeComplexity: 'O(n) where n = length of s',
        spaceComplexity: 'O(m) where m = unique characters in t',
        stepByStep: [
          'Build a frequency map for characters in t',
          'Expand window to the right, tracking character counts',
          'When all required characters are found, shrink from left',
          'Track the minimum valid window size and position',
          'Return the smallest valid window'
        ]
      },
      hints: [
        'Use sliding window with frequency maps',
        'Track how many required characters are satisfied',
        'Shrink window from left when all chars are found'
      ]
    }
  ],

  operations: [
    { name: 'Access Character', complexity: 'O(1)' },
    { name: 'Concatenation', complexity: 'O(n + m)' },
    { name: 'Substring', complexity: 'O(k)' },
    { name: 'Search (naive)', complexity: 'O(n × m)' },
    { name: 'Search (KMP)', complexity: 'O(n + m)' },
    { name: 'Compare', complexity: 'O(n)' },
    { name: 'Reverse', complexity: 'O(n)' },
    { name: 'Replace', complexity: 'O(n)' }
  ],

  applications: [
    {
      name: 'Search Engines',
      description: 'Pattern matching and text indexing power search functionality across billions of documents.',
      example: 'Google uses inverted indexes and string matching to find relevant web pages for queries'
    },
    {
      name: 'Bioinformatics',
      description: 'DNA/RNA sequence analysis relies heavily on string matching algorithms.',
      example: 'Finding gene sequences in genomes using KMP or suffix arrays'
    },
    {
      name: 'Compilers',
      description: 'Lexical analysis (tokenization) and parsing are fundamentally string processing operations.',
      example: 'Breaking source code "int x = 5;" into tokens: [INT, IDENTIFIER, EQUALS, NUMBER, SEMICOLON]'
    },
    {
      name: 'Spell Checkers',
      description: 'Edit distance algorithms suggest corrections for misspelled words.',
      example: 'Autocorrect uses Levenshtein distance to find the closest valid word'
    },
    {
      name: 'Data Compression',
      description: 'Algorithms like LZ77 and Huffman coding find repeated patterns in strings to compress data.',
      example: 'ZIP files use string-based compression to reduce file sizes by 50-90%'
    }
  ]
};
