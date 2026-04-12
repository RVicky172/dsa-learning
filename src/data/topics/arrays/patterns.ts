import type { Pattern } from '../../../types/topic';

export const arraysPatterns: Pattern[] = [
    {
      name: 'Two Pointers',
      description: 'Use two pointers moving toward each other or in the same direction to solve problems efficiently without extra space.',
      technique: 'Initialize pointers at strategic positions (start/end, slow/fast) and move them based on conditions to achieve the goal.',
      example: 'Reverse array, find pairs with target sum, remove duplicates',
      whenToUse: [
        'Finding pairs in sorted arrays',
        'Reversing or rearranging elements',
        'Partitioning arrays',
        'Palindrome checking',
        'In-place algorithms with O(1) extra space'
      ]
    },
    {
      name: 'Sliding Window',
      description: 'Maintain a window of elements and slide it across the array to find optimal subarrays or substrings without recalculating.',
      technique: 'Keep track of window bounds and update as you slide, maintaining window properties efficiently by adding/removing elements.',
      example: 'Maximum sum subarray, longest substring, minimum window substring',
      whenToUse: [
        'Finding subarrays/substrings with specific properties',
        'Optimizing brute force subarray solutions',
        'Problems with contiguous elements',
        'Optimization problems involving sequences'
      ]
    },
    {
      name: 'Prefix Sum',
      description: 'Precompute cumulative sums to answer range sum queries in constant time instead of recalculating.',
      technique: 'Create array where prefix[i] = sum of elements from 0 to i. Range sum = prefix[right+1] - prefix[left].',
      example: 'Range sum queries, subarray sum equals K, 2D matrix sum queries',
      whenToUse: [
        'Multiple range sum queries',
        'Finding subarrays with target sum',
        'Optimization of cumulative calculations',
        'Problems requiring repeated range queries'
      ]
    },
    {
      name: 'Fast & Slow Pointers',
      description: 'Use two pointers moving at different speeds to detect patterns or find middle elements efficiently.',
      technique: 'One pointer moves one step, another moves two steps per iteration, creating a mathematical relationship.',
      example: 'Find middle element, detect cycles, find kth element from end',
      whenToUse: [
        'Finding middle of array/list',
        'Detecting cycles or patterns',
        'In-place algorithms with limited space',
        'Partitioning problems'
      ]
    },
    {
      name: 'HashMap for Frequency',
      description: 'Use hash maps to count character/element frequencies for efficient lookups and pattern matching.',
      technique: 'Build frequency map in one pass, use for constant-time existence checks and frequency comparisons.',
      example: 'Anagram checking, first unique character, two sum, character frequency problems',
      whenToUse: [
        'Counting occurrences',
        'Finding duplicates',
        'Anagram/permutation problems',
        'Optimizing search operations',
        'Character/element frequency analysis'
      ]
    },
    {
      name: 'Divide and Conquer',
      description: 'Divide array into smaller parts, solve recursively, and combine results for complex problems.',
      technique: 'Split at midpoint, recursively solve subproblems, merge results based on problem requirements.',
      example: 'Merge sort, majority element, max subarray sum',
      whenToUse: [
        'Sorting problems',
        'Finding optimal subarray',
        'Building tree-like structures',
        'Complex array transformations'
      ]
    }
];
