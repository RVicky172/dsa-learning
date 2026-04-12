import type { Problem } from '../types/topic';

// Sorting & Searching Problems - NEW TOPIC

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
  },
  {
    id: 'sort-colors',
    title: 'Sort Colors',
    difficulty: 'Medium',
    description: 'Sort an array of 0s, 1s, and 2s in-place using the Dutch flag algorithm.',
    examples: [
      {
        input: 'nums = [2,0,2,1,1,0]',
        output: '[0,0,1,1,2,2]'
      }
    ],
    solution: {
      approach: 'Use three pointers to partition the array into three sections',
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
        'Use three pointers: low, mid, high',
        'If mid is 0, swap with low and move both',
        'If mid is 1, just move mid',
        'If mid is 2, swap with high and move high left'
      ]
    },
    hints: [
      'Three-way partitioning',
      'Maintain three sections: 0s, 1s, 2s',
      'Only one pass needed'
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
