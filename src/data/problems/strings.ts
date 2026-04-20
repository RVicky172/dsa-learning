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
  }
];

