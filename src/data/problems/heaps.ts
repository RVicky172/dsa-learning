import type { Problem } from '../../types/topic';

export const heapProblems: Problem[] = [
  {
    id: 'heap-top-k-frequent',
    title: 'Top K Frequent Elements',
    difficulty: 'Medium',
    description: 'Given an integer array nums and an integer k, return the k most frequent elements.',
    examples: [{ input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1,2]' }],
    solution: {
      approach: 'Frequency Map + Bucket Sort (or Min Heap)',
      code: `function topKFrequent(nums: number[], k: number): number[] {
  const map = new Map();
  for (const num of nums) map.set(num, (map.get(num) || 0) + 1);
  const buckets: number[][] = Array.from({length: nums.length + 1}, () => []);
  for (const [num, freq] of map.entries()) {
    buckets[freq].push(num);
  }
  const res = [];
  for (let i = buckets.length - 1; i >= 0 && res.length < k; i--) {
    res.push(...buckets[i]);
  }
  return res.slice(0, k);
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      stepByStep: ['Count frequencies into a Map', 'Create buckets where index is frequency', 'Iterate buckets backwards to get top k elements']
    },
    hints: ['Count frequencies first', 'Use a heap or bucket sort']
  },
  {
    id: 'kth-largest-stream',
    title: 'Kth Largest Element in a Stream',
    difficulty: 'Easy',
    description: 'Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element.',
    examples: [
      {
        input: '["KthLargest", "add", "add", "add", "add"] [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]',
        output: '[null, 4, 5, 5, 8, 8]',
        explanation: 'The kth largest is initialized with [4,5,8,2], so sorted is [2,4,5,8], 3rd is 4. Then add 3 -> [2,3,4,5,8], 3rd is 4. Add 5 -> [2,3,4,5,5,8], 3rd is 5. Add 10 -> [2,3,4,5,5,8,10], 3rd is 5. Add 9 -> [2,3,4,5,5,8,9,10], 3rd is 8. Add 4 -> [2,3,4,4,5,5,8,9,10], 3rd is 8.'
      }
    ],
    solution: {
      approach: 'Use a min-heap of size k to keep track of the k largest elements',
      code: `class KthLargest {
  constructor(k: number, nums: number[]) {
    this.k = k;
    this.heap = new MinHeap();
    for (const num of nums) {
      this.add(num);
    }
  }

  add(val: number): number {
    this.heap.push(val);
    if (this.heap.size() > this.k) {
      this.heap.pop();
    }
    return this.heap.peek();
  }
}`,
      timeComplexity: 'O(n log k) for init, O(log k) for add',
      spaceComplexity: 'O(k)',
      stepByStep: [
        'Initialize min-heap with first k elements',
        'For each new element, add to heap',
        'If heap size > k, remove smallest',
        'The heap top is always the kth largest'
      ]
    },
    hints: [
      'Use a min-heap to keep smallest of the largest k',
      'Heap size should not exceed k',
      'The root is the kth largest'
    ]
  }
];

