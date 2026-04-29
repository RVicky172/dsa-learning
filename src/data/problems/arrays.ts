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
  },
  // ── NEW BATCH (TKT-016) ──────────────────────────────────────────────
  {
    id: 'arr-best-time-stocks',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    description: 'You are given an array prices where prices[i] is the price of a stock on day i. Find the maximum profit you can achieve by choosing a single day to buy and a later single day to sell. Return 0 if no profit is possible.',
    examples: [
      { input: 'prices = [7,1,5,3,6,4]', output: '5', explanation: 'Buy on day 2 (price=1) and sell on day 5 (price=6), profit = 6-1 = 5.' },
      { input: 'prices = [7,6,4,3,1]', output: '0', explanation: 'Prices only decrease, so no transaction gives profit.' }
    ],
    solution: {
      approach: 'Single pass: track the minimum price seen so far and compute profit at each step.',
      code: `function maxProfit(prices: number[]): number {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (const price of prices) {
    if (price < minPrice) {
      minPrice = price;
    } else {
      maxProfit = Math.max(maxProfit, price - minPrice);
    }
  }
  return maxProfit;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Initialise minPrice to Infinity and maxProfit to 0',
        'Iterate through each price',
        'Update minPrice if current price is lower',
        'Otherwise calculate profit = price - minPrice and update maxProfit',
        'Return maxProfit'
      ]
    },
    hints: ['You only need one variable to track the minimum so far.', 'No need for nested loops — a single pass suffices.']
  },
  {
    id: 'arr-contains-duplicate',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    description: 'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.',
    examples: [
      { input: 'nums = [1,2,3,1]', output: 'true' },
      { input: 'nums = [1,2,3,4]', output: 'false' }
    ],
    solution: {
      approach: 'Use a Set to track seen numbers; return true on the first collision.',
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
        'Create an empty Set',
        'For each number check if it is already in the Set',
        'If yes, return true immediately',
        'Otherwise add it to the Set',
        'Return false if iteration completes without collision'
      ]
    },
    hints: ['A HashSet gives O(1) lookup.', 'Early return as soon as a duplicate is found.']
  },
  {
    id: 'arr-product-except-self',
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    description: 'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. Solve without using division in O(n).',
    examples: [
      { input: 'nums = [1,2,3,4]', output: '[24,12,8,6]' },
      { input: 'nums = [-1,1,0,-3,3]', output: '[0,0,9,0,0]' }
    ],
    solution: {
      approach: 'Two-pass prefix/suffix product. First build left products, then multiply by right products in a second pass.',
      code: `function productExceptSelf(nums: number[]): number[] {
  const n = nums.length;
  const result = new Array(n).fill(1);
  // Left prefix products
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    result[i] = prefix;
    prefix *= nums[i];
  }
  // Right suffix products
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= suffix;
    suffix *= nums[i];
  }
  return result;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1) extra (output array not counted)',
      stepByStep: [
        'Initialise result array with 1s',
        'Left pass: result[i] = product of all elements to the left of i',
        'Right pass: multiply result[i] by the product of all elements to the right of i',
        'Return result'
      ]
    },
    hints: ['Think prefix products first, then suffix products.', 'Reuse the output array to avoid extra space.']
  },
  {
    id: 'arr-max-subarray',
    title: 'Maximum Subarray (Kadane\'s Algorithm)',
    difficulty: 'Medium',
    description: 'Given an integer array nums, find the subarray with the largest sum and return its sum.',
    examples: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'Subarray [4,-1,2,1] has the largest sum 6.' },
      { input: 'nums = [1]', output: '1' }
    ],
    solution: {
      approach: 'Kadane\'s algorithm: keep a running sum; reset it to 0 when it goes negative.',
      code: `function maxSubArray(nums: number[]): number {
  let maxSum = nums[0];
  let current = nums[0];
  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    maxSum = Math.max(maxSum, current);
  }
  return maxSum;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Start with current = maxSum = nums[0]',
        'For each subsequent element decide: start a new subarray or extend the current one',
        'current = max(nums[i], current + nums[i])',
        'Update maxSum if current exceeds it',
        'Return maxSum'
      ]
    },
    hints: ['At each position you either extend the previous subarray or start fresh.', 'Initialize with the first element to handle all-negative arrays.']
  },
  {
    id: 'arr-find-min-rotated',
    title: 'Find Minimum in Rotated Sorted Array',
    difficulty: 'Medium',
    description: 'Given a sorted array that has been rotated between 1 and n times, find the minimum element. The array has no duplicates. Solve in O(log n).',
    examples: [
      { input: 'nums = [3,4,5,1,2]', output: '1' },
      { input: 'nums = [4,5,6,7,0,1,2]', output: '0' }
    ],
    solution: {
      approach: 'Binary search: if mid > right, the minimum is in the right half; otherwise it is in the left half (including mid).',
      code: `function findMin(nums: number[]): number {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const mid = (left + right) >> 1;
    if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return nums[left];
}`,
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Use binary search with left and right pointers',
        'Compute mid',
        'If nums[mid] > nums[right], minimum is in right half → left = mid + 1',
        'Otherwise minimum is in left half (inclusive of mid) → right = mid',
        'When left === right, that is the minimum'
      ]
    },
    hints: ['Compare the middle element against the rightmost, not the leftmost.', 'Converge until left equals right.']
  },
  {
    id: 'arr-first-missing-positive',
    title: 'First Missing Positive',
    difficulty: 'Hard',
    description: 'Given an unsorted integer array nums, return the smallest missing positive integer. You must implement an algorithm that runs in O(n) time and uses O(1) auxiliary space.',
    examples: [
      { input: 'nums = [1,2,0]', output: '3' },
      { input: 'nums = [3,4,-1,1]', output: '2' },
      { input: 'nums = [7,8,9,11,12]', output: '1' }
    ],
    solution: {
      approach: 'Use the array itself as a hash table. Place each number n in the index n-1 (if in range), then find the first position where nums[i] !== i+1.',
      code: `function firstMissingPositive(nums: number[]): number {
  const n = nums.length;
  // Place nums[i] at index nums[i]-1
  for (let i = 0; i < n; i++) {
    while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
      const idx = nums[i] - 1;
      [nums[i], nums[idx]] = [nums[idx], nums[i]];
    }
  }
  // Find first position where value is wrong
  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) return i + 1;
  }
  return n + 1;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Iterate and swap each number into its correct index (value - 1) using a while loop',
        'Skip numbers out of range [1, n]',
        'Avoid infinite loop by checking nums[nums[i]-1] !== nums[i]',
        'Second pass: return first i where nums[i] !== i+1',
        'If all positions are correct, return n+1'
      ]
    },
    hints: ['The answer must be in the range [1, n+1].', 'Treat each array cell as a bucket for its corresponding positive integer.']
  }
];

