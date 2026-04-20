import type { Problem } from '../../types/topic';

export const arrayProblems: Problem[] = [
  {
    id: 'merge-sorted-arrays',
    title: 'Merge Sorted Arrays',
    difficulty: 'Easy',
    description: 'Merge two sorted arrays into one sorted array without using extra space (modify in place).',
    examples: [
      {
        input: 'nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3',
        output: '[1,2,2,3,5,6]'
      }
    ],
    solution: {
      approach: 'Use two pointers from the end of both arrays and fill nums1 from back to front',
      code: `function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  let p1 = m - 1;
  let p2 = n - 1;
  let p = m + n - 1;

  while (p1 >= 0 && p2 >= 0) {
    if (nums1[p1] > nums2[p2]) {
      nums1[p] = nums1[p1];
      p1--;
    } else {
      nums1[p] = nums2[p2];
      p2--;
    }
    p--;
  }

  while (p2 >= 0) {
    nums1[p] = nums2[p2];
    p2--;
    p--;
  }
}`,
      timeComplexity: 'O(m + n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Start from the end of both arrays',
        'Compare elements and place larger one at the end of nums1',
        'Move the pointer of the array from which we took the element',
        'Continue until one array is exhausted',
        'If nums2 has remaining elements, copy them'
      ]
    },
    hints: [
      'Work backwards from the end of the arrays',
      'Compare elements at the end of each array',
      'Place the larger element at the end of nums1'
    ]
  },
  {
    id: 'remove-duplicates',
    title: 'Remove Duplicates from Sorted Array',
    difficulty: 'Easy',
    description: 'Remove duplicates from a sorted array in-place and return the number of unique elements.',
    examples: [
      {
        input: 'nums = [1,1,2]',
        output: 'k = 2, nums = [1,2,_]',
        explanation: 'Return 2 with the first two elements being 1 and 2'
      }
    ],
    solution: {
      approach: 'Use two pointers: one for iteration, one for unique element position',
      code: `function removeDuplicates(nums: number[]): number {
  if (nums.length === 0) return 0;

  let writePointer = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[writePointer] = nums[i];
      writePointer++;
    }
  }

  return writePointer;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Start with writePointer at index 1',
        'Compare each element with the previous one',
        'If different, place it at writePointer position and increment',
        'Return the count of unique elements'
      ]
    },
    hints: [
      'Use two pointers technique',
      'Compare consecutive elements',
      'Track the position for the next unique element'
    ]
  },
  {
    id: 'search-rotated-array',
    title: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    description: 'Search for a target value in a rotated sorted array. Array was originally sorted then rotated.',
    examples: [
      {
        input: 'nums = [4,5,6,7,0,1,2], target = 0',
        output: '4',
        explanation: 'Target 0 is at index 4'
      }
    ],
    solution: {
      approach: 'Use binary search, determine which half is sorted and narrow down the search space',
      code: `function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) return mid;

    // Determine which half is sorted
    if (nums[left] <= nums[mid]) {
      // Left half is sorted
      if (target >= nums[left] && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // Right half is sorted
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
}`,
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Use binary search with modified logic',
        'Determine which half of the array is sorted',
        'Check if target is in the sorted half',
        'Narrow search space accordingly',
        'Repeat until target found or array exhausted'
      ]
    },
    hints: [
      'Use binary search',
      'One of the two halves is always sorted',
      'Check if target exists in the sorted half'
    ]
  },
  {
    id: 'trapping-rain-water',
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    description: 'Given an elevation map represented by array, compute how much water it can trap after raining.',
    examples: [
      {
        input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
        output: '6',
        explanation: 'Total trapped water is 6 units'
      }
    ],
    solution: {
      approach: 'Use two pointers to track max heights from left and right, calculate trapped water',
      code: `function trap(height: number[]): number {
  if (height.length < 3) return 0;

  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        water += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        water += rightMax - height[right];
      }
      right--;
    }
  }

  return water;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Use two pointers from ends moving inward',
        'Track maximum height seen so far from left and right',
        'Water trapped at position = min(leftMax, rightMax) - height[i]',
        'Move the pointer with smaller height'
      ]
    },
    hints: [
      'Water trapped depends on surrounding heights',
      'Track maximum heights from both sides',
      'Use two pointers to optimize space'
    ]
  },
  {
    id: 'rotate-array',
    title: 'Rotate Array',
    difficulty: 'Medium',
    description: 'Rotate an array to the right by k steps, where k is non-negative.',
    examples: [
      {
        input: 'nums = [1,2,3,4,5,6,7], k = 3',
        output: '[5,6,7,1,2,3,4]',
        explanation: 'Rotate 1 step to the right: [7,1,2,3,4,5,6], rotate 2 steps: [6,7,1,2,3,4,5], rotate 3 steps: [5,6,7,1,2,3,4]'
      }
    ],
    solution: {
      approach: 'Reverse the entire array, then reverse first k elements, then reverse remaining elements',
      code: `function rotate(nums: number[], k: number): void {
  k %= nums.length;
  reverse(nums, 0, nums.length - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, nums.length - 1);
}

function reverse(nums: number[], start: number, end: number): void {
  while (start < end) {
    [nums[start], nums[end]] = [nums[end], nums[start]];
    start++;
    end--;
  }
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Reverse the entire array',
        'Reverse the first k elements',
        'Reverse the remaining elements',
        'This achieves the rotation effect'
      ]
    },
    hints: [
      'Reversing parts of the array can achieve rotation',
      'Handle k > length by taking modulo',
      'Three reversals: whole, first k, rest'
    ]
  }
];

