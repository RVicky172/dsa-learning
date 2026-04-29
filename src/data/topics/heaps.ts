import type { Topic } from '../../types/topic';
import { heapProblems } from '../problems/heaps';
import React from 'react';
import { Layers } from 'lucide-react';

export const heapsTopic: Topic = {
  id: 'heaps',
  title: 'Heaps & Priority Queues',
  description: 'Efficient access to minimum/maximum elements with heap-ordered trees.',
  complexity: 'O(log n) insert/delete',
  icon: React.createElement(Layers, { size: 24 }),
  delay: 0.55,

  introduction: `A heap is a complete binary tree where each node satisfies the heap property: in a min-heap, every parent is smaller than its children; in a max-heap, every parent is larger. This guarantees O(1) access to the min/max element and O(log n) insertions and deletions.

Heaps are typically implemented as arrays. For a node at index i: left child is at 2i+1, right child is at 2i+2, and parent is at floor((i-1)/2). This array representation is cache-friendly and space-efficient — no pointers needed.

## Priority Queue
A priority queue is an abstract data type where each element has a priority. Elements with higher priority are dequeued first. Heaps are the standard implementation, providing O(log n) enqueue and dequeue operations.

## Heap Sort
Building a heap takes O(n) time (not O(n log n)!). Repeatedly extracting the min/max gives a sorted array in O(n log n). Heap sort is in-place and has guaranteed O(n log n) time, unlike quicksort which can degrade to O(n²).`,

  whyImportant: 'Heaps appear in many fundamental algorithms: Dijkstra\'s shortest path, Prim\'s MST, Huffman coding, median maintenance, and more. "Find the K largest/smallest" is one of the most common interview patterns, and heaps provide the optimal solution.',

  whenToUse: [
    'Finding K largest/smallest elements',
    'Median of a data stream',
    'Merging K sorted lists/arrays',
    'Priority-based scheduling',
    'Dijkstra\'s shortest path algorithm',
    'Huffman coding for compression',
    'Event-driven simulations'
  ],

  advantages: [
    'O(1) access to min/max element',
    'O(log n) insertion and deletion',
    'O(n) heap construction (bottom-up)',
    'Space efficient array representation',
    'Cache-friendly memory layout',
    'In-place heap sort possible'
  ],

  disadvantages: [
    'O(n) search for arbitrary elements',
    'Not suitable for finding elements by value',
    'No efficient merge operation (use Fibonacci heaps for that)',
    'Only provides access to min OR max (not both efficiently)'
  ],

  concepts: [
    {
      name: 'Heap Property',
      description: 'Min-heap: parent ≤ children. Max-heap: parent ≥ children. This property is maintained after every insertion and deletion through "bubbling up" and "sinking down" operations.'
    },
    {
      name: 'Heapify (Sift Down)',
      description: 'Restore heap property by moving a node down to its correct position. Compare with children and swap with the smaller (min-heap) or larger (max-heap) child. O(log n).'
    },
    {
      name: 'Build Heap (Bottom-Up)',
      description: 'Convert an arbitrary array into a heap in O(n) time by heapifying from the last non-leaf node upward. This is faster than inserting elements one by one (which would be O(n log n)).'
    },
    {
      name: 'Two-Heap Pattern',
      description: 'Use a max-heap for the lower half and a min-heap for the upper half to maintain a running median. The median is always at the top of one of the heaps.'
    },
    {
      name: 'Top-K Pattern',
      description: 'To find the K largest elements, maintain a min-heap of size K. Elements smaller than the heap top are skipped. This is O(n log K) — much better than sorting O(n log n) when K << n.'
    }
  ],

  examples: [
    {
      title: 'Min-Heap Implementation',
      language: 'typescript',
      code: `class MinHeap {
  private heap: number[] = [];

  private parent(i: number) { return Math.floor((i - 1) / 2); }
  private left(i: number) { return 2 * i + 1; }
  private right(i: number) { return 2 * i + 2; }

  peek(): number | undefined { return this.heap[0]; }
  size(): number { return this.heap.length; }

  insert(val: number): void {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  extractMin(): number | undefined {
    if (this.heap.length === 0) return undefined;
    const min = this.heap[0];
    const last = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.sinkDown(0);
    }
    return min;
  }

  private bubbleUp(i: number): void {
    while (i > 0 && this.heap[i] < this.heap[this.parent(i)]) {
      [this.heap[i], this.heap[this.parent(i)]] =
        [this.heap[this.parent(i)], this.heap[i]];
      i = this.parent(i);
    }
  }

  private sinkDown(i: number): void {
    let smallest = i;
    const l = this.left(i), r = this.right(i);
    if (l < this.heap.length && this.heap[l] < this.heap[smallest]) smallest = l;
    if (r < this.heap.length && this.heap[r] < this.heap[smallest]) smallest = r;
    if (smallest !== i) {
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      this.sinkDown(smallest);
    }
  }
}

const heap = new MinHeap();
[5, 3, 8, 1, 2].forEach(v => heap.insert(v));
console.log(heap.extractMin()); // 1
console.log(heap.extractMin()); // 2`,
      explanation: 'A min-heap uses an array where parent is always ≤ children. Insert adds to end and bubbles up. ExtractMin removes root, moves last to root, and sinks down. Both operations are O(log n) because the tree height is log n.',
      timeComplexity: 'O(log n) for insert/extract, O(1) for peek',
      spaceComplexity: 'O(n)'
    },
    {
      title: 'Find K Largest Elements',
      language: 'typescript',
      code: `// Using a min-heap of size K
function findKLargest(nums: number[], k: number): number[] {
  const minHeap = new MinHeap(); // From previous example

  for (const num of nums) {
    minHeap.insert(num);
    if (minHeap.size() > k) {
      minHeap.extractMin(); // Remove smallest
    }
  }

  // Heap contains K largest elements
  const result: number[] = [];
  while (minHeap.size() > 0) {
    result.push(minHeap.extractMin()!);
  }
  return result;
}

// Simplified using sort (for demonstration)
function kthLargest(nums: number[], k: number): number {
  // Min-heap approach: O(n log k)
  const heap: number[] = [];

  const push = (val: number) => {
    heap.push(val);
    heap.sort((a, b) => a - b); // Simplified heapify
    if (heap.length > k) heap.shift();
  };

  for (const num of nums) push(num);
  return heap[0]; // Kth largest is the min of top-K
}

console.log(kthLargest([3, 2, 1, 5, 6, 4], 2)); // 5`,
      explanation: 'To find K largest elements efficiently, maintain a min-heap of size K. As we scan the array, we insert each element. If the heap exceeds size K, we remove the minimum. After processing all elements, the heap contains exactly the K largest.',
      timeComplexity: 'O(n log k) — much better than O(n log n) sorting when k << n',
      spaceComplexity: 'O(k)'
    },
    {
      title: 'Merge K Sorted Lists',
      language: 'typescript',
      code: `// Merge K sorted arrays into one sorted array
function mergeKSorted(lists: number[][]): number[] {
  // Min-heap entries: [value, listIndex, elementIndex]
  type Entry = [number, number, number];
  const heap: Entry[] = [];
  const result: number[] = [];

  // Initialize heap with first element from each list
  for (let i = 0; i < lists.length; i++) {
    if (lists[i].length > 0) {
      heap.push([lists[i][0], i, 0]);
    }
  }
  heap.sort((a, b) => a[0] - b[0]);

  while (heap.length > 0) {
    // Extract minimum
    const [val, listIdx, elemIdx] = heap.shift()!;
    result.push(val);

    // If the list has more elements, add next one
    if (elemIdx + 1 < lists[listIdx].length) {
      const newEntry: Entry = [lists[listIdx][elemIdx + 1], listIdx, elemIdx + 1];
      // Insert in sorted position (simplified heap)
      const insertIdx = heap.findIndex(e => e[0] > newEntry[0]);
      if (insertIdx === -1) heap.push(newEntry);
      else heap.splice(insertIdx, 0, newEntry);
    }
  }

  return result;
}

console.log(mergeKSorted([[1,4,5], [1,3,4], [2,6]]));
// [1,1,2,3,4,4,5,6]`,
      explanation: 'Use a min-heap to always pick the smallest available element across all K lists. When an element is extracted, push the next element from the same list. The heap always contains at most K elements (one per list).',
      timeComplexity: 'O(N log K) where N = total elements, K = number of lists',
      spaceComplexity: 'O(K) for the heap'
    }
  ],

  patterns: [
    {
      name: 'Top-K Elements',
      description: 'Maintain a heap of size K to efficiently find the K largest/smallest elements in a stream or array.',
      technique: 'For K largest: use min-heap of size K. For K smallest: use max-heap of size K. Elements worse than the heap top are skipped.',
      example: 'Kth largest element, top K frequent elements, K closest points to origin',
      whenToUse: [
        'Finding K extreme elements',
        'Streaming data with bounded memory',
        'When K is much smaller than n',
        'Real-time top-K tracking'
      ]
    },
    {
      name: 'Two-Heap Median',
      description: 'Maintain two heaps to track the median of a data stream. Max-heap for lower half, min-heap for upper half.',
      technique: 'Balance sizes so heaps differ by at most 1. Median is the top of the larger heap (or average of both tops if equal size).',
      example: 'Find median from data stream, sliding window median',
      whenToUse: [
        'Running median in a stream',
        'When you need constant-time median access',
        'Balanced partitioning of data',
        'Real-time statistics'
      ]
    },
    {
      name: 'Merge K Sorted',
      description: 'Use a min-heap to merge K sorted sequences into one sorted sequence by always picking the minimum available element.',
      technique: 'Initialize heap with first element of each list. Extract min, push next element from the same list. Repeat until all lists exhausted.',
      example: 'Merge K sorted linked lists, external sort, log file merging',
      whenToUse: [
        'Merging multiple sorted data sources',
        'External sorting (disk-based)',
        'Combining sorted log files',
        'Database merge operations'
      ]
    }
  ],

  problems: [
    ...heapProblems,
    {
      id: 'heap-kth-largest',
      title: 'Kth Largest Element in an Array',
      difficulty: 'Medium',
      description: 'Find the kth largest element in an unsorted array.',
      examples: [
        { input: 'nums = [3,2,1,5,6,4], k = 2', output: '5' }
      ],
      solution: {
        approach: 'Use a min-heap of size k. Process all elements — the heap top is the kth largest.',
        code: `function findKthLargest(nums: number[], k: number): number {
  const minHeap: number[] = [];

  for (const num of nums) {
    minHeap.push(num);
    minHeap.sort((a, b) => a - b);
    if (minHeap.length > k) minHeap.shift();
  }

  return minHeap[0];
}`,
        timeComplexity: 'O(n log k)',
        spaceComplexity: 'O(k)',
        stepByStep: [
          'Create a min-heap of size k',
          'For each element, insert into heap',
          'If heap size exceeds k, remove minimum',
          'After processing all elements, heap top is kth largest'
        ]
      },
      hints: [
        'Use a min-heap of size k (not max-heap)',
        'The top of a size-k min-heap is the kth largest',
        'QuickSelect is an alternative O(n) average approach'
      ]
    },
    {
      id: 'heap-top-k-frequent',
      title: 'Top K Frequent Elements',
      difficulty: 'Medium',
      description: 'Given an integer array numpy, return the k most frequent elements.',
      examples: [
        { input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1, 2]' }
      ],
      solution: {
        approach: 'Count frequencies with a map, then use a min-heap of size k on the frequencies.',
        code: `function topKFrequent(nums: number[], k: number): number[] {
  // Count frequencies
  const freq = new Map<number, number>();
  for (const num of nums) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }

  // Use bucket sort for O(n) — bucket[i] = elements with frequency i
  const buckets: number[][] = new Array(nums.length + 1).fill(null).map(() => []);
  for (const [num, count] of freq) {
    buckets[count].push(num);
  }

  // Collect top k from highest frequency buckets
  const result: number[] = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i]);
  }

  return result.slice(0, k);
}`,
        timeComplexity: 'O(n) with bucket sort',
        spaceComplexity: 'O(n)',
        stepByStep: [
          'Count frequency of each element using a map',
          'Create buckets where index = frequency',
          'Place elements into their frequency bucket',
          'Iterate from highest frequency bucket, collect k elements'
        ]
      },
      hints: [
        'First count frequencies',
        'Bucket sort avoids O(n log n) sorting',
        'Frequency can be at most n'
      ]
    },
    {
      id: 'heap-median-stream',
      title: 'Find Median from Data Stream',
      difficulty: 'Hard',
      description: 'Design a data structure that supports adding integers and finding the median of all elements added so far.',
      examples: [
        {
          input: 'addNum(1), addNum(2), findMedian(), addNum(3), findMedian()',
          output: '[1.5, 2.0]'
        }
      ],
      solution: {
        approach: 'Use two heaps: max-heap for lower half, min-heap for upper half. Median is at the tops.',
        code: `class MedianFinder {
  private lower: number[] = []; // max-heap (store negated)
  private upper: number[] = []; // min-heap

  addNum(num: number): void {
    // Add to lower half (max-heap via negation)
    this.lower.push(-num);
    this.lower.sort((a, b) => a - b);

    // Move max of lower to upper
    this.upper.push(-this.lower.shift()!);
    this.upper.sort((a, b) => a - b);

    // Balance: lower should have >= elements than upper
    if (this.lower.length < this.upper.length) {
      this.lower.push(-this.upper.shift()!);
      this.lower.sort((a, b) => a - b);
    }
  }

  findMedian(): number {
    if (this.lower.length > this.upper.length) {
      return -this.lower[0];
    }
    return (-this.lower[0] + this.upper[0]) / 2;
  }
}`,
        timeComplexity: 'O(log n) per add, O(1) for median',
        spaceComplexity: 'O(n)',
        stepByStep: [
          'Maintain two heaps: max-heap (lower half) and min-heap (upper half)',
          'When adding: insert into lower, then move max of lower to upper',
          'Rebalance so lower has equal or one more element',
          'Median: if odd count → top of lower; if even → average of both tops'
        ]
      },
      hints: [
        'Use two heaps to split data into halves',
        'Max-heap for lower half, min-heap for upper half',
        'Keep heaps balanced (differ by at most 1)'
      ]
    }
  ],

  operations: [
    { name: 'Peek Min/Max', complexity: 'O(1)' },
    { name: 'Insert', complexity: 'O(log n)' },
    { name: 'Extract Min/Max', complexity: 'O(log n)' },
    { name: 'Build Heap', complexity: 'O(n)' },
    { name: 'Heap Sort', complexity: 'O(n log n)' },
    { name: 'Search', complexity: 'O(n)' }
  ],

  applications: [
    {
      name: 'Operating System Scheduling',
      description: 'Priority queues determine which process runs next based on priority levels.',
      example: 'Linux kernel\'s Completely Fair Scheduler uses a red-black tree (similar to heap) for task scheduling'
    },
    {
      name: 'Graph Algorithms',
      description: 'Dijkstra\'s shortest path and Prim\'s MST rely on min-heaps for efficient processing.',
      example: 'Google Maps uses Dijkstra with a priority queue to find shortest routes'
    },
    {
      name: 'Data Compression',
      description: 'Huffman coding uses a min-heap to build optimal prefix-free codes.',
      example: 'JPEG and MP3 compression use Huffman trees built from character frequency heaps'
    },
    {
      name: 'Event-Driven Simulation',
      description: 'Events are processed in time order using a priority queue.',
      example: 'Network simulators process packets in timestamp order using min-heaps'
    }
  ]
};
