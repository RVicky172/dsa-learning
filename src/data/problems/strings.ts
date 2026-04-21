import type { Problem } from '../../types/topic';

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
  },
  // ── NEW BATCH (TKT-016) ──────────────────────────────────────────
  {
    id: 'str-reverse-string',
    title: 'Reverse String',
    difficulty: 'Easy',
    description: 'Write a function that reverses a string. The input is given as an array of characters s. You must do it in-place with O(1) extra memory.',
    examples: [
      { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
      { input: 's = ["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]' }
    ],
    solution: {
      approach: 'Two-pointer swap: left and right converge toward the middle.',
      code: `function reverseString(s: string[]): void {
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Place left pointer at index 0 and right at index n-1',
        'Swap s[left] and s[right]',
        'Move left forward and right backward',
        'Repeat until pointers meet'
      ]
    },
    hints: ['Two pointers moving towards each other is the classic in-place reversal pattern.', 'Use destructuring assignment for clean swaps.']
  },
  {
    id: 'str-is-palindrome',
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase and removing all non-alphanumeric characters, it reads the same forward and backward. Given a string s, return true if it is a palindrome, or false otherwise.',
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: 'true' },
      { input: 's = "race a car"', output: 'false' }
    ],
    solution: {
      approach: 'Two pointers: skip non-alphanumeric characters and compare lowercase characters.',
      code: `function isPalindrome(s: string): boolean {
  let left = 0;
  let right = s.length - 1;
  const isAlphanumeric = (c: string) => /[a-z0-9]/.test(c.toLowerCase());
  while (left < right) {
    while (left < right && !isAlphanumeric(s[left])) left++;
    while (left < right && !isAlphanumeric(s[right])) right--;
    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
    left++;
    right--;
  }
  return true;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Use two pointers starting at both ends',
        'Skip non-alphanumeric characters from both ends',
        'Compare lowercase versions of characters at both pointers',
        'If they differ, return false',
        'Return true if pointers meet without mismatch'
      ]
    },
    hints: ['Ignore spaces and punctuation.', 'Two-pointer approach avoids creating a cleaned copy.']
  },
  {
    id: 'str-string-to-integer',
    title: 'String to Integer (atoi)',
    difficulty: 'Medium',
    description: 'Implement the myAtoi(s) function which converts a string to a 32-bit signed integer. The algorithm reads leading whitespace, an optional sign, then digits until the first non-digit character. Clamp the result to [-2^31, 2^31 - 1].',
    examples: [
      { input: 's = "42"', output: '42' },
      { input: 's = "   -042"', output: '-42' },
      { input: 's = "1337c0d3"', output: '1337' }
    ],
    solution: {
      approach: 'Step through: trim leading spaces, read sign, accumulate digits, clamp to 32-bit range.',
      code: `function myAtoi(s: string): number {
  const INT_MAX = 2 ** 31 - 1;
  const INT_MIN = -(2 ** 31);
  let i = 0;
  const n = s.length;
  while (i < n && s[i] === ' ') i++;
  let sign = 1;
  if (i < n && (s[i] === '+' || s[i] === '-')) {
    if (s[i] === '-') sign = -1;
    i++;
  }
  let num = 0;
  while (i < n && s[i] >= '0' && s[i] <= '9') {
    const digit = Number(s[i]);
    if (num > Math.floor((INT_MAX - digit) / 10)) {
      return sign === 1 ? INT_MAX : INT_MIN;
    }
    num = num * 10 + digit;
    i++;
  }
  return sign * num;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Skip all leading whitespace',
        'Check for an optional + or - sign',
        'Read consecutive digit characters and build the integer',
        'Before adding each digit check for overflow against INT_MAX',
        'Apply sign and return'
      ]
    },
    hints: ['Handle leading whitespace and optional sign before digits.', 'Check overflow before multiplying to avoid exceeding safe integer bounds.']
  },
  {
    id: 'str-roman-to-integer',
    title: 'Roman to Integer',
    difficulty: 'Medium',
    description: 'Given a roman numeral string s, convert it to an integer. Roman symbols: I=1, V=5, X=10, L=50, C=100, D=500, M=1000. If a smaller value precedes a larger one, subtract it.',
    examples: [
      { input: 's = "III"', output: '3' },
      { input: 's = "LVIII"', output: '58' },
      { input: 's = "MCMXCIV"', output: '1994' }
    ],
    solution: {
      approach: 'Iterate left-to-right: if the current symbol is less than the next one, subtract it; otherwise add it.',
      code: `function romanToInt(s: string): number {
  const val: Record<string, number> = {
    I: 1, V: 5, X: 10, L: 50,
    C: 100, D: 500, M: 1000
  };
  let result = 0;
  for (let i = 0; i < s.length; i++) {
    const curr = val[s[i]];
    const next = val[s[i + 1]] ?? 0;
    result += curr < next ? -curr : curr;
  }
  return result;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Build a map of Roman symbols to their integer values',
        'Iterate through each character',
        'Compare current value with the next value',
        'Subtract current if it is less than next (e.g. IV = -1 + 5)',
        'Otherwise add it; accumulate the result'
      ]
    },
    hints: ['Left-to-right scan: if smaller value precedes larger, it is a subtraction pair.', 'A hash map makes symbol lookup O(1).']
  },
  {
    id: 'str-count-and-say',
    title: 'Count and Say',
    difficulty: 'Medium',
    description: 'The count-and-say sequence starts at "1". Each subsequent term is the run-length encoding of the previous. Given an integer n, return the nth term.',
    examples: [
      { input: 'n = 1', output: '"1"' },
      { input: 'n = 4', output: '"1211"', explanation: 'Term 3 is "21". Term 4 describes "21": one 2 then one 1 = "1211".' }
    ],
    solution: {
      approach: 'Iteratively build each term by run-length encoding the previous term.',
      code: `function countAndSay(n: number): string {
  let result = '1';
  for (let i = 1; i < n; i++) {
    let next = '';
    let j = 0;
    while (j < result.length) {
      const ch = result[j];
      let count = 0;
      while (j < result.length && result[j] === ch) {
        j++;
        count++;
      }
      next += count.toString() + ch;
    }
    result = next;
  }
  return result;
}`,
      timeComplexity: 'O(n * m) where m is the length of the nth term',
      spaceComplexity: 'O(m)',
      stepByStep: [
        'Start with result = "1"',
        'For each iteration scan the current string grouping consecutive identical digits',
        'Append the count then the digit to the new string',
        'Replace result with the new string',
        'Repeat n-1 times'
      ]
    },
    hints: ['This is run-length encoding applied repeatedly.', 'Use a while loop to count consecutive identical characters.']
  },
  {
    id: 'str-minimum-window-substring',
    title: 'Minimum Window Substring',
    difficulty: 'Hard',
    description: 'Given strings s and t, return the minimum window in s that contains every character of t (including duplicates). If no such window exists, return an empty string.',
    examples: [
      { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"' },
      { input: 's = "a", t = "a"', output: '"a"' },
      { input: 's = "a", t = "aa"', output: '""' }
    ],
    solution: {
      approach: 'Sliding window with two frequency maps. Expand right pointer until all chars of t are covered, then shrink left pointer to minimise the window.',
      code: `function minWindow(s: string, t: string): string {
  if (t.length > s.length) return '';
  const need = new Map<string, number>();
  for (const c of t) need.set(c, (need.get(c) ?? 0) + 1);
  let have = 0;
  const required = need.size;
  const window = new Map<string, number>();
  let left = 0;
  let minLen = Infinity;
  let minStart = 0;
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    window.set(c, (window.get(c) ?? 0) + 1);
    if (need.has(c) && window.get(c) === need.get(c)) have++;
    while (have === required) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        minStart = left;
      }
      const leftChar = s[left];
      window.set(leftChar, window.get(leftChar)! - 1);
      if (need.has(leftChar) && window.get(leftChar)! < need.get(leftChar)!) have--;
      left++;
    }
  }
  return minLen === Infinity ? '' : s.substring(minStart, minStart + minLen);
}`,
      timeComplexity: 'O(|s| + |t|)',
      spaceComplexity: 'O(|s| + |t|)',
      stepByStep: [
        'Build a frequency map of t',
        'Expand the right pointer one character at a time updating window counts',
        'Increment have when a character reaches the required frequency',
        'When have === required the window is valid — record minimum and shrink from left',
        'Repeat until right pointer exhausts s'
      ]
    },
    hints: ['Use two pointers: expand right to include, shrink left to minimise.', 'Track how many unique chars from t are satisfied (have vs required).']
  }
];

