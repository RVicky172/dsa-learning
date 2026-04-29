import type { Topic } from '../../types/topic';
import { sortingProblems, searchingProblems, advancedSortingProblems } from '../problems/sorting';
import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export const sortingTopic: Topic = {
  id: 'sorting-searching',
  title: 'Sorting & Searching',
  description: 'Algorithms for organizing and finding data efficiently.',
  complexity: 'O(n log n) typical',
  icon: React.createElement(ArrowUpDown, { size: 24 }),
  delay: 0.11,

  introduction: `Sorting and searching are fundamental algorithmic problems that appear in virtually every application. Sorting arranges data in a specific order, while searching locates specific elements within organized or unorganized data. These algorithms form the backbone of data organization and retrieval in databases, search engines, and countless other systems.

The importance of sorting extends beyond simply rearranging data. Many complex algorithms require sorted data as a prerequisite. Searching algorithms leverage sorted data to achieve logarithmic time complexity. Understanding sorting and searching teaches us about algorithm design, tradeoffs between time and space complexity, and how to analyze algorithm performance.

Modern computers handle trillions of sort operations daily. Database indexes use B-trees (a sorting-based structure). Search engines rank results using sophisticated algorithms built on sorting principles. File systems organize data using sorted structures. The ubiquity of sorting and searching makes mastering these algorithms essential for any computer scientist or software engineer.

## Sorting Algorithm Categories

1. **Comparison-Based**: Use element comparisons (O(n log n) lower bound)
   - Merge Sort, Quick Sort, Heap Sort, Bubble Sort, Insertion Sort

2. **Non-Comparison**: Don't compare elements directly (can beat O(n log n))
   - Counting Sort, Radix Sort, Bucket Sort

3. **Hybrid**: Combine approaches
   - Tim Sort (Python), Introsort (C++)

## Searching Algorithms

- **Linear Search**: O(n) on unsorted data
- **Binary Search**: O(log n) on sorted data
- **Hash-Based Search**: O(1) average with hash table

Different sorting algorithms have different characteristics: some are fast for large datasets, others are efficient with space, some are stable (preserve relative order of equal elements), and others work well with partially sorted data. Choosing the right algorithm for the right situation is a critical skill.`,

  whyImportant: `Sorting and searching are examined in almost every technical interview. They teach fundamental algorithmic thinking: divide and conquer, optimization techniques, and complexity analysis. Real-world applications depend on efficient sorting and searching - from databases to recommendation systems to data analytics. Understanding these algorithms deeply enables you to make good decisions about which algorithm to use when.`,

  whenToUse: [
    'When you need to organize data for easier retrieval',
    'When you need to find specific elements quickly',
    'When preprocessing data significantly improves performance',
    'When optimizing query performance in databases',
    'When building indexes for fast lookups',
    'When implementing priority-based systems',
    'When you need stable sorting (preserving order of equal elements)'
  ],

  advantages: [
    'Sorting enables logarithmic search time (binary search)',
    'Different algorithms suit different scenarios and data distributions',
    'Many real-world optimizations depend on sorted data',
    'Well-studied with proven performance characteristics',
    'Building block for many other algorithms',
    'Can optimize other algorithms significantly (e.g., merge intervals)',
    'Essential for database design and optimization'
  ],

  disadvantages: [
    'Sorting takes time - O(n log n) lower bound for comparison sorts',
    'Some algorithms require significant extra space',
    'Choosing wrong algorithm leads to poor performance',
    'Not all data structures support efficient sorting',
    'Online algorithms require special approaches',
    'Stability requirements eliminate some algorithms',
    'Space constraints limit algorithm choices'
  ],

  concepts: [
    {
      name: 'Comparison-Based Sorting',
      description: 'Algorithms that work by comparing pairs of elements. Lower bound is O(n log n) for any comparison-based sort due to information theory.'
    },
    {
      name: 'Stable vs Unstable Sorting',
      description: 'Stable sorts preserve relative order of equal elements. Useful when sorting complex objects by one attribute. Merge Sort is stable, Quick Sort is not.'
    },
    {
      name: 'In-Place Sorting',
      description: 'Sorting that uses O(1) or O(log n) extra space. Important for memory-constrained environments. Quick Sort and Heap Sort are in-place.'
    },
    {
      name: 'Divide and Conquer',
      description: 'Strategy used by merge sort and quick sort: divide problem into subproblems, solve recursively, combine results. Enables O(n log n) performance.'
    },
    {
      name: 'Pivot-Based Partitioning',
      description: 'Technique in quick sort where elements are rearranged around a pivot element for efficient sorting. Good pivot selection critical for performance.'
    },
    {
      name: 'Binary Search',
      description: 'Logarithmic search on sorted data by repeatedly dividing search space in half. Requires sorted array but achieves O(log n) complexity.'
    },
    {
      name: 'Radix Sort',
      description: 'Non-comparison sort sorting numbers by digits. Achieves O(n×k) where k is number of digits, beating O(n log n) for integers.'
    }
  ],

  examples: [
    {
      title: 'Merge Sort - Stable O(n log n) Sort',
      language: 'typescript',
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
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}

// Usage
const arr = [64, 34, 25, 12, 22, 11, 90];
console.log(mergeSort(arr)); // [11, 12, 22, 25, 34, 64, 90]`,
      explanation: 'Merge sort divides array in half, recursively sorts both halves, then merges them. Always O(n log n) and stable, but requires O(n) extra space. Excellent for linked lists.',
      timeComplexity: 'O(n log n) - guaranteed',
      spaceComplexity: 'O(n) - for auxiliary arrays'
    },
    {
      title: 'Quick Sort - Fast Average Case In-Place Sort',
      language: 'typescript',
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
}

// Random pivot for better average case
function quickSortRandom(arr: number[], low = 0, high = arr.length - 1): number[] {
  if (low < high) {
    const randomIndex = low + Math.floor(Math.random() * (high - low + 1));
    [arr[randomIndex], arr[high]] = [arr[high], arr[randomIndex]];
    
    const pi = partition(arr, low, high);
    quickSortRandom(arr, low, pi - 1);
    quickSortRandom(arr, pi + 1, high);
  }
  return arr;
}

// Usage
const arr = [64, 34, 25, 12, 22, 11, 90];
console.log(quickSort(arr)); // [11, 12, 22, 25, 34, 64, 90]`,
      explanation: 'Quick sort picks a pivot and partitions array around it, then recursively sorts partitions. Fast average case O(n log n) with O(log n) space, but O(n²) worst case. Random pivot improves average.',
      timeComplexity: 'O(n log n) average, O(n²) worst case',
      spaceComplexity: 'O(log n) - for recursion stack'
    },
    {
      title: 'Heap Sort - Guaranteed O(n log n) In-Place',
      language: 'typescript',
      code: `function heapSort(arr: number[]): number[] {
  const n = arr.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }

  return arr;
}

function heapify(arr: number[], n: number, i: number): void {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}

// Usage
const arr = [64, 34, 25, 12, 22, 11, 90];
console.log(heapSort(arr)); // [11, 12, 22, 25, 34, 64, 90]`,
      explanation: 'Heap sort builds a max heap then repeatedly extracts the maximum. Guaranteed O(n log n) with O(1) extra space, but not stable. Good for consistent performance needs.',
      timeComplexity: 'O(n log n) - guaranteed',
      spaceComplexity: 'O(1) - excluding input array'
    },
    {
      title: 'Binary Search - Logarithmic Search',
      language: 'typescript',
      code: `// Basic binary search
function binarySearch(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1; // Search right half
    } else {
      right = mid - 1; // Search left half
    }
  }

  return -1; // Not found
}

// Find first occurrence of target
function findFirst(nums: number[], target: number): number {
  let left = 0, right = nums.length - 1;
  let result = -1;

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

// Find last occurrence of target
function findLast(nums: number[], target: number): number {
  let left = 0, right = nums.length - 1;
  let result = -1;

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
}

// Usage
const nums = [1, 3, 5, 7, 9, 11, 13];
console.log(binarySearch(nums, 7));  // 3
console.log(binarySearch(nums, 6));  // -1
console.log(findFirst([1, 2, 2, 2, 3], 2)); // 1
console.log(findLast([1, 2, 2, 2, 3], 2));  // 3`,
      explanation: 'Binary search repeatedly divides sorted array in half to find target. Much faster than linear search for large sorted arrays. Finding first/last requires careful boundary handling.',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)'
    },
    {
      title: 'Insertion Sort - Good for Small/Nearly Sorted Arrays',
      language: 'typescript',
      code: `function insertionSort(arr: number[]): number[] {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    // Shift elements greater than key one position right
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = key;
  }

  return arr;
}

// Adaptive insertion sort - O(n) for nearly sorted arrays
function adaptiveInsertionSort(arr: number[]): number[] {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      const key = arr[i];
      let j = i - 1;

      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }

      arr[j + 1] = key;
    }
  }

  return arr;
}

// Usage
const arr = [64, 34, 25, 12, 22, 11, 90];
console.log(insertionSort([...arr])); // [11, 12, 22, 25, 34, 64, 90]

// Nearly sorted array - very fast with adaptive
const nearlySorted = [1, 2, 3, 5, 4, 6, 7];
console.log(adaptiveInsertionSort(nearlySorted)); // [1, 2, 3, 4, 5, 6, 7]`,
      explanation: 'Insertion sort is O(n²) in general but O(n) on nearly sorted arrays. Excellent for small arrays or as part of hybrid sorts like Tim Sort. Stable and adaptive.',
      timeComplexity: 'O(n²) average, O(n) best case (nearly sorted)',
      spaceComplexity: 'O(1) - in-place'
    }
  ],

  patterns: [
    {
      name: 'Divide and Conquer Sorting',
      description: 'Divide problem into subproblems, sort recursively, combine results for efficient sorting.',
      technique: 'Split at midpoint, recursively sort subproblems, merge or partition results.',
      example: 'Merge sort for guaranteed performance, quick sort for average case',
      whenToUse: [
        'When data doesn\'t fit in memory (external sorting)',
        'When stability is required',
        'For guaranteed performance bounds',
        'Linked list sorting'
      ]
    },
    {
      name: 'In-Place Partitioning',
      description: 'Rearrange elements around pivot without extra space.',
      technique: 'Two pointers moving inward, swap elements relative to pivot.',
      example: 'Quick sort partitioning, array partitioning problems',
      whenToUse: [
        'Memory-constrained environments',
        'When O(1) extra space required',
        'Quicksort implementation',
        'Partitioning problems'
      ]
    },
    {
      name: 'Binary Search on Sorted Data',
      description: 'Leverage sorted property for logarithmic search.',
      technique: 'Repeatedly divide search space in half based on comparisons.',
      example: 'Finding elements, boundaries, insertion positions',
      whenToUse: [
        'After sorting for fast lookups',
        'Finding boundaries (first/last occurrence)',
        'Range queries',
        'Optimization of linear searches'
      ]
    },
    {
      name: 'Counting and Radix Sort',
      description: 'Non-comparison sorts for integers and strings.',
      technique: 'Count occurrences or use digit-by-digit sorting.',
      example: 'Sorting integers in known range, sorting by digits',
      whenToUse: [
        'Integers with limited range',
        'When beating O(n log n) is critical',
        'Distributing data into buckets',
        'Linear time sorting'
      ]
    }
  ],

  problems: [
    ...advancedSortingProblems,
    ...sortingProblems,
    ...searchingProblems
  ],

  operations: [
    { name: 'Comparison-Based Sort', complexity: 'O(n log n) lower bound' },
    { name: 'Merge Sort', complexity: 'O(n log n)' },
    { name: 'Quick Sort', complexity: 'O(n log n) avg, O(n²) worst' },
    { name: 'Heap Sort', complexity: 'O(n log n)' },
    { name: 'Insertion Sort', complexity: 'O(n²) avg, O(n) nearly sorted' },
    { name: 'Radix Sort', complexity: 'O(n × k)' },
    { name: 'Binary Search', complexity: 'O(log n)' },
    { name: 'Linear Search', complexity: 'O(n)' }
  ],

  applications: [
    {
      name: 'Database Query Optimization',
      description: 'Sorting and indexing optimize database queries.',
      example: 'SQL ORDER BY uses efficient sorts, indexes enable fast lookups'
    },
    {
      name: 'Search Engines',
      description: 'Rank results by relevance using scoring and sorting.',
      example: 'Google, Bing sort pages by PageRank and relevance scores'
    },
    {
      name: 'Recommendation Systems',
      description: 'Sort items by similarity or predicted rating.',
      example: 'Netflix, Amazon sort recommendations by relevance'
    },
    {
      name: 'Data Compression',
      description: 'Sorting enables better compression algorithms.',
      example: 'Burrows-Wheeler transform uses sorting for compression'
    },
    {
      name: 'File Systems',
      description: 'Directory listings and file organization use sorting.',
      example: 'Windows Explorer, Mac Finder sort files by name/date/size'
    },
    {
      name: 'Machine Learning',
      description: 'Sorting features, distances, and predictions.',
      example: 'K-nearest neighbors requires sorting distances'
    },
    {
      name: 'Graphics and Visualization',
      description: 'Z-sorting for depth in graphics, sorting data for display.',
      example: '3D rendering uses depth sorting, data visualization sorts for clarity'
    }
  ]
};
