import type { Problem } from '../../types/topic';

export const sortingProblems: Problem[] = [
  {
    id: 'merge-sort-implementation',
    title: 'Implement Merge Sort',
    difficulty: 'Medium',
    description: 'Implement the merge sort algorithm and return a sorted array. Also analyze its time and space complexity.',
    examples: [
      {
        input: 'arr = [64, 34, 25, 12, 22, 11, 90]',
        output: '[11, 12, 22, 25, 34, 64, 90]',
        explanation: 'Array sorted in ascending order'
      },
      {
        input: 'arr = [5, 2, 8, 1, 9]',
        output: '[1, 2, 5, 8, 9]'
      }
    ],
    solution: {
      approach: 'Divide and conquer: split array in half, recursively sort, then merge sorted halves',
      code: `function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
      timeComplexity: 'O(n log n) - always',
      spaceComplexity: 'O(n) - for auxiliary arrays',
      stepByStep: [
        'Divide array into two halves recursively',
        'Continue until subarrays of size 1',
        'Merge subarrays back together in sorted order',
        'Compare elements from left and right, add smaller to result',
        'Return fully merged sorted array'
      ]
    },
    hints: [
      'Use divide and conquer approach',
      'Implement a merge function to combine sorted arrays',
      'Recursively sort both halves'
    ]
  },
  {
    id: 'quick-sort-implementation',
    title: 'Implement Quick Sort',
    difficulty: 'Medium',
    description: 'Implement the quick sort algorithm using a pivot-based approach.',
    examples: [
      {
        input: 'arr = [64, 34, 25, 12, 22, 11, 90]',
        output: '[11, 12, 22, 25, 34, 64, 90]'
      }
    ],
    solution: {
      approach: 'Choose pivot, partition around it, recursively sort partitions',
      code: `function quickSort(arr: number[], low = 0, high = arr.length - 1): number[] {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr: number[], low: number, high: number): number {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
      timeComplexity: 'O(n log n) average, O(n²) worst case',
      spaceComplexity: 'O(log n) - for recursion stack',
      stepByStep: [
        'Choose last element as pivot',
        'Partition: move smaller elements to left',
        'Recursively sort left partition',
        'Recursively sort right partition'
      ]
    },
    hints: [
      'Select a pivot element',
      'Partition array around pivot',
      'Use two pointers for partitioning'
    ]
  },
  {
    id: 'sort-colors',
    title: 'Sort Colors (Dutch National Flag)',
    difficulty: 'Medium',
    description: 'Given array with 0s, 1s, and 2s, sort in-place without using sort function.',
    examples: [
      {
        input: 'nums = [2, 0, 2, 1, 1, 0]',
        output: '[0, 0, 1, 1, 2, 2]',
        explanation: 'All 0s first, then 1s, then 2s'
      }
    ],
    solution: {
      approach: 'Use three pointers to partition array into three sections',
      code: `function sortColors(nums: number[]): void {
  let low = 0;
  let mid = 0;
  let high = nums.length - 1;

  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
    }
  }
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Initialize three pointers: low (0s), mid (scanning), high (2s)',
        'If current is 0, swap with low and increment both',
        'If current is 1, just move mid forward',
        'If current is 2, swap with high and decrement high'
      ]
    },
    hints: [
      'Use three pointers approach',
      'Do not use sort library',
      'Single pass through array'
    ]
  },
  {
    id: 'kth-largest-element',
    title: 'Find Kth Largest Element',
    difficulty: 'Medium',
    description: 'Find the kth largest element in an unsorted array without sorting.',
    examples: [
      {
        input: 'nums = [3, 2, 1, 5, 6, 4], k = 2',
        output: '5',
        explanation: '5 is the 2nd largest'
      }
    ],
    solution: {
      approach: 'Use min heap or quick select algorithm',
      code: `function findKthLargest(nums: number[], k: number): number {
  const minHeap = new MinPriorityQueue<number>();

  for (const num of nums) {
    minHeap.enqueue(num);
    if (minHeap.size() > k) {
      minHeap.dequeue();
    }
  }

  return minHeap.front().element;
}

// Or using Quick Select:
function findKthLargestQuickSelect(nums: number[], k: number): number {
  return quickSelect(nums, 0, nums.length - 1, nums.length - k);
}

function quickSelect(arr: number[], low: number, high: number, k: number): number {
  if (low === high) return arr[low];

  const pi = partition(arr, low, high);

  if (k === pi) return arr[k];
  else if (k < pi) return quickSelect(arr, low, pi - 1, k);
  else return quickSelect(arr, pi + 1, high, k);
}

function partition(arr: number[], low: number, high: number): number {
  const pivot = arr[high];
  let i = low;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }

  [arr[i], arr[high]] = [arr[high], arr[i]];
  return i;
}`,
      timeComplexity: 'O(n) average with quick select, O(n log k) with heap',
      spaceComplexity: 'O(k) for heap',
      stepByStep: [
        'Maintain a min heap of size k',
        'Iterate through all elements',
        'Keep k largest elements in heap',
        'Return the minimum of k largest'
      ]
    },
    hints: [
      'Use a min heap of size k',
      'Or use quick select algorithm',
      'Avoid full sorting'
    ]
  },
  {
    id: 'meeting-rooms',
    title: 'Meeting Rooms',
    difficulty: 'Easy',
    description: 'Given array of meeting intervals, determine if person can attend all meetings.',
    examples: [
      {
        input: 'intervals = [[0,30],[5,10],[15,20]]',
        output: 'false',
        explanation: 'Meetings overlap'
      },
      {
        input: 'intervals = [[7,10],[2,4]]',
        output: 'true'
      }
    ],
    solution: {
      approach: 'Sort by start time and check for overlaps',
      code: `function canAttendMeetings(intervals: number[][]): boolean {
  // Sort by start time
  intervals.sort((a, b) => a[0] - b[0]);

  for (let i = 1; i < intervals.length; i++) {
    // Check if previous meeting ends after current starts
    if (intervals[i - 1][1] > intervals[i][0]) {
      return false; // Overlap detected
    }
  }

  return true;
}`,
      timeComplexity: 'O(n log n) due to sorting',
      spaceComplexity: 'O(1) excluding sorting space',
      stepByStep: [
        'Sort intervals by start time',
        'Iterate through sorted intervals',
        'Check if each interval overlaps with next',
        'Return false if any overlap found'
      ]
    },
    hints: [
      'Sort intervals by start time',
      'Check consecutive intervals for overlap',
      'Overlap occurs when previous end > current start'
    ]
  },
  {
    id: 'merge-intervals',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    description: 'Given array of intervals, merge overlapping intervals.',
    examples: [
      {
        input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]',
        output: '[[1,6],[8,10],[15,18]]'
      }
    ],
    solution: {
      approach: 'Sort by start time, then merge overlapping intervals',
      code: `function merge(intervals: number[][]): number[][] {
  if (intervals.length <= 1) return intervals;

  // Sort by start time
  intervals.sort((a, b) => a[0] - b[0]);

  const merged: number[][] = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const last = merged[merged.length - 1];

    // Check if current overlaps with last
    if (current[0] <= last[1]) {
      // Merge: extend end time
      last[1] = Math.max(last[1], current[1]);
    } else {
      // No overlap: add as new interval
      merged.push(current);
    }
  }

  return merged;
}`,
      timeComplexity: 'O(n log n) due to sorting',
      spaceComplexity: 'O(n) for output',
      stepByStep: [
        'Sort intervals by start time',
        'Initialize result with first interval',
        'For each subsequent interval:',
        '  If overlaps with last, merge by extending end',
        '  Otherwise, add as new interval to result'
      ]
    },
    hints: [
      'Sort by start time first',
      'Track the last merged interval',
      'Merge if current start <= last end'
    ]
  }
];


export const searchingProblems: Problem[] = [
  {
    id: 'binary-search-basic',
    title: 'Binary Search',
    difficulty: 'Easy',
    description: 'Implement binary search to find target in sorted array. Return index or -1.',
    examples: [
      {
        input: 'nums = [-1,0,3,5,9,12], target = 9',
        output: '4'
      },
      {
        input: 'nums = [-1,0,3,5,9,12], target = 13',
        output: '-1'
      }
    ],
    solution: {
      approach: 'Repeatedly divide search space in half',
      code: `function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) {
      left = mid + 1; // Search right half
    } else {
      right = mid - 1; // Search left half
    }
  }

  return -1;
}`,
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Initialize left and right pointers',
        'While search space is valid:',
        '  Calculate middle index',
        '  Compare with target',
        '  Eliminate half of search space',
        'Return index or -1'
      ]
    },
    hints: [
      'Use two pointers: left and right',
      'Calculate mid and compare with target',
      'Adjust pointers based on comparison'
    ]
  },
  {
    id: 'first-and-last-position',
    title: 'Find First and Last Position',
    difficulty: 'Medium',
    description: 'Find first and last position of target in sorted array in O(log n).',
    examples: [
      {
        input: 'nums = [5,7,7,8,8,10], target = 8',
        output: '[3,4]'
      },
      {
        input: 'nums = [5,7,7,8,8,10], target = 6',
        output: '[-1,-1]'
      }
    ],
    solution: {
      approach: 'Use binary search twice: for first and last occurrence',
      code: `function searchRange(nums: number[], target: number): number[] {
  const first = findFirst(nums, target);
  if (first === -1) return [-1, -1];
  const last = findLast(nums, target);
  return [first, last];
}

function findFirst(nums: number[], target: number): number {
  let left = 0, right = nums.length - 1, result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      result = mid;
      right = mid - 1; // Continue searching left
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
}

function findLast(nums: number[], target: number): number {
  let left = 0, right = nums.length - 1, result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      result = mid;
      left = mid + 1; // Continue searching right
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
}`,
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Find first occurrence by continuing left when found',
        'Find last occurrence by continuing right when found',
        'Both use modified binary search'
      ]
    },
    hints: [
      'Run binary search twice',
      'For first: continue searching left when target found',
      'For last: continue searching right when target found'
    ]
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    difficulty: 'Easy',
    description: 'Implement binary search to find a target in a sorted array.',
    examples: [
      {
        input: 'nums = [-1,0,3,5,9,12], target = 9',
        output: '4',
        explanation: '9 exists in nums and its index is 4'
      }
    ],
    solution: {
      approach: 'Use two pointers to narrow down the search space by half each time',
      code: `function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}`,
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Initialize left and right pointers',
        'Calculate mid index',
        'If mid equals target, return mid',
        'If mid less than target, search right half',
        'If mid greater than target, search left half',
        'Return -1 if not found'
      ]
    },
    hints: [
      'Array must be sorted',
      'Use integer division for mid calculation',
      'Update pointers based on comparison'
    ]
  }
];

export const advancedSortingProblems: Problem[] = [
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
  },
  // ── NEW BATCH (TKT-016) ──────────────────────────────────────────
  {
    id: 'sort-missing-number',
    title: 'Missing Number',
    difficulty: 'Easy',
    description: 'Given an array nums containing n distinct numbers in the range [0, n], return the one that is missing.',
    examples: [
      { input: 'nums = [3,0,1]', output: '2' },
      { input: 'nums = [9,6,4,2,3,5,7,0,1]', output: '8' }
    ],
    solution: {
      approach: 'Expected sum n*(n+1)/2 minus actual sum gives the missing number.',
      code: `function missingNumber(nums: number[]): number {
  const n = nums.length;
  return (n * (n + 1)) / 2 - nums.reduce((a, b) => a + b, 0);
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'The sum of 0..n is n*(n+1)/2',
        'Subtract the actual array sum',
        'The difference is the missing number'
      ]
    },
    hints: ['Gauss sum formula gives expected sum instantly.', 'XOR trick also works without arithmetic overflow risk.']
  },
  {
    id: 'sort-count-negative-matrix',
    title: 'Count Negative Numbers in a Sorted Matrix',
    difficulty: 'Easy',
    description: 'Given an m×n matrix grid sorted in non-increasing order (each row and column), return the number of negative numbers.',
    examples: [
      { input: 'grid = [[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]]', output: '8' },
      { input: 'grid = [[3,2],[1,0]]', output: '0' }
    ],
    solution: {
      approach: 'Binary search in each row to find the first negative, or staircase scan from bottom-left.',
      code: `function countNegatives(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  let count = 0;
  let col = n - 1;
  for (let row = 0; row < m; row++) {
    while (col >= 0 && grid[row][col] < 0) col--;
    count += n - 1 - col;
  }
  return count;
}`,
      timeComplexity: 'O(m + n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Start at top-right corner',
        'Move left while current cell is negative',
        'All cells to the right of col are negative in this row',
        'col only moves left — total moves bounded by m + n'
      ]
    },
    hints: ['Sorted order allows a staircase traversal in O(m+n).', 'Binary search per row is O(m log n) — also valid.']
  },
  {
    id: 'sort-find-peak-element',
    title: 'Find Peak Element',
    difficulty: 'Medium',
    description: 'A peak element is strictly greater than its neighbours. Given nums, return the index of any peak. Solve in O(log n).',
    examples: [
      { input: 'nums = [1,2,3,1]', output: '2' },
      { input: 'nums = [1,2,1,3,5,6,4]', output: '5', explanation: 'Index 5 (value 6) is also valid.' }
    ],
    solution: {
      approach: 'Binary search: if nums[mid] < nums[mid+1] then a peak must exist to the right; otherwise to the left.',
      code: `function findPeakElement(nums: number[]): number {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] < nums[mid + 1]) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}`,
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Binary search on index range',
        'If nums[mid] < nums[mid+1], peak is in right half (lo = mid+1)',
        'Otherwise peak is in left half including mid (hi = mid)',
        'When lo == hi, that index is a peak'
      ]
    },
    hints: ['The slope direction tells you which half contains a peak.', 'Boundaries are treated as -∞ (nums[-1] = nums[n] = -∞).']
  },
  {
    id: 'sort-sort-array-parity',
    title: 'Sort Array by Parity',
    difficulty: 'Medium',
    description: 'Given an integer array nums, move all even integers to the beginning and odd integers to the end. Return any valid arrangement.',
    examples: [
      { input: 'nums = [3,1,2,4]', output: '[2,4,3,1]' },
      { input: 'nums = [0]', output: '[0]' }
    ],
    solution: {
      approach: 'Two-pointer: left pointer advances over evens, right pointer retreats over odds; swap when both out of place.',
      code: `function sortArrayByParity(nums: number[]): number[] {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo < hi) {
    while (lo < hi && nums[lo] % 2 === 0) lo++;
    while (lo < hi && nums[hi] % 2 === 1) hi--;
    if (lo < hi) {
      [nums[lo], nums[hi]] = [nums[hi], nums[lo]];
      lo++; hi--;
    }
  }
  return nums;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'lo starts at 0, hi starts at end',
        'Advance lo while nums[lo] is even',
        'Retreat hi while nums[hi] is odd',
        'Swap and continue until lo >= hi'
      ]
    },
    hints: ['Two-pointer partition is the classic in-place approach.', 'No need to maintain relative order — any valid split is accepted.']
  },
  {
    id: 'sort-find-duplicate',
    title: 'Find the Duplicate Number',
    difficulty: 'Medium',
    description: 'Given an array nums containing n+1 integers where each integer is in the range [1, n], there is exactly one repeated number. Find it without modifying the array and using O(1) extra space.',
    examples: [
      { input: 'nums = [1,3,4,2,2]', output: '2' },
      { input: 'nums = [3,1,3,4,2]', output: '3' }
    ],
    solution: {
      approach: 'Floyd\'s cycle detection: treat array as a linked list where nums[i] is the next node. Find the cycle entry.',
      code: `function findDuplicate(nums: number[]): number {
  let slow = nums[0];
  let fast = nums[0];
  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);
  slow = nums[0];
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }
  return slow;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Phase 1: find intersection of slow (1 step) and fast (2 steps)',
        'Phase 2: reset slow to start; both move 1 step',
        'They meet at the cycle entry = duplicate value',
        'Works because duplicate creates two edges into the same node'
      ]
    },
    hints: ['Map to a linked-list cycle problem using index as node and value as next pointer.', 'Phase 2 of Floyd\'s finds the cycle entry.']
  },
  {
    id: 'sort-wiggle-sort-ii',
    title: 'Wiggle Sort II',
    difficulty: 'Hard',
    description: 'Given an integer array nums, reorder it such that nums[0] < nums[1] > nums[2] < nums[3].... Ensure no two adjacent elements are equal.',
    examples: [
      { input: 'nums = [1,5,1,1,6,4]', output: '[1,6,1,5,1,4]' },
      { input: 'nums = [1,3,2,2,3,1]', output: '[2,3,1,3,1,2]' }
    ],
    solution: {
      approach: 'Sort, split into smaller-half and larger-half, then interleave in reverse to avoid equal adjacents.',
      code: `function wiggleSort(nums: number[]): void {
  const sorted = [...nums].sort((a, b) => a - b);
  const n = nums.length;
  const mid = Math.floor((n - 1) / 2);
  let lo = mid; // end of small half
  let hi = n - 1; // end of large half
  for (let i = 0; i < n; i++) {
    nums[i] = i % 2 === 0 ? sorted[lo--] : sorted[hi--];
  }
}`,
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      stepByStep: [
        'Sort a copy of nums',
        'Even positions (0,2,4…) take from the smaller half in reverse',
        'Odd positions (1,3,5…) take from the larger half in reverse',
        'Reverse interleaving prevents equal elements from being adjacent'
      ]
    },
    hints: ['Simple sort + interleave fails when many duplicates exist — reverse interleave fixes this.', 'Three-way partition (Dutch flag) achieves O(n) time.']
  }
];

