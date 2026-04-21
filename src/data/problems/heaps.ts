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
  },
  // ── NEW BATCH (TKT-016) ──────────────────────────────────────────
  {
    id: 'heap-last-stone-weight',
    title: 'Last Stone Weight',
    difficulty: 'Easy',
    description: 'You have a collection of stones, each with a positive integer weight. Each turn, smash the two heaviest stones: if equal they both destroy; otherwise the smaller is destroyed and the larger is reduced by the difference. Return the weight of the last remaining stone (or 0).',
    examples: [
      { input: 'stones = [2,7,4,1,8,1]', output: '1' },
      { input: 'stones = [1]', output: '1' }
    ],
    solution: {
      approach: 'Max-heap simulation. JS has no built-in max-heap, so negate values in a min-heap or use a sorted array.',
      code: `function lastStoneWeight(stones: number[]): number {
  // Simulate with sorted array (no built-in heap in JS)
  while (stones.length > 1) {
    stones.sort((a, b) => a - b);
    const y = stones.pop()!;
    const x = stones.pop()!;
    if (x !== y) stones.push(y - x);
  }
  return stones[0] ?? 0;
}`,
      timeComplexity: 'O(n² log n) with sort; O(n log n) with proper heap',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Repeat until one stone remains',
        'Pick the two largest stones',
        'If different, push back y - x',
        'Return remaining stone or 0'
      ]
    },
    hints: ['A max-heap makes each step O(log n).', 'Negate values to simulate max-heap with a min-heap.']
  },
  {
    id: 'heap-relative-ranks',
    title: 'Relative Ranks',
    difficulty: 'Easy',
    description: 'Given an integer array score, return an array answer where answer[i] is the rank of athlete i. Top three athletes get "Gold Medal", "Silver Medal", "Bronze Medal"; the rest get their rank as a string.',
    examples: [
      { input: 'score = [5,4,3,2,1]', output: '["Gold Medal","Silver Medal","Bronze Medal","4","5"]' },
      { input: 'score = [10,3,8,9,4]', output: '["Gold Medal","5","Bronze Medal","Silver Medal","4"]' }
    ],
    solution: {
      approach: 'Sort indices by score descending; assign medals and ranks.',
      code: `function findRelativeRanks(score: number[]): string[] {
  const medals = ['Gold Medal', 'Silver Medal', 'Bronze Medal'];
  const sorted = score.map((s, i) => [s, i] as [number, number])
                      .sort((a, b) => b[0] - a[0]);
  const result = new Array<string>(score.length);
  for (let rank = 0; rank < sorted.length; rank++) {
    const [, i] = sorted[rank];
    result[i] = rank < 3 ? medals[rank] : String(rank + 1);
  }
  return result;
}`,
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      stepByStep: [
        'Create index-score pairs and sort by score descending',
        'Assign "Gold", "Silver", "Bronze" for ranks 0-2',
        'Assign numeric string for remaining ranks',
        'Use original index to place result correctly'
      ]
    },
    hints: ['Sort indices by score, then map ranks back to positions.', 'rank + 1 converts 0-based rank to 1-based string.']
  },
  {
    id: 'heap-k-closest-points',
    title: 'K Closest Points to Origin',
    difficulty: 'Medium',
    description: 'Given an array of points and an integer k, return the k closest points to the origin (0, 0). The distance is Euclidean.',
    examples: [
      { input: 'points = [[1,3],[-2,2]], k = 1', output: '[[-2,2]]' },
      { input: 'points = [[3,3],[5,-1],[-2,4]], k = 2', output: '[[3,3],[-2,4]]' }
    ],
    solution: {
      approach: 'Partial sort / quickselect. Simple approach: sort by squared distance and take first k.',
      code: `function kClosest(points: number[][], k: number): number[][] {
  return points
    .sort((a, b) => (a[0]**2 + a[1]**2) - (b[0]**2 + b[1]**2))
    .slice(0, k);
}`,
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Use squared distance to avoid sqrt (preserves order)',
        'Sort points by squared distance ascending',
        'Return first k points'
      ]
    },
    hints: ['Use squared distance to avoid floating point.', 'A max-heap of size k gives O(n log k) — better when k << n.']
  },
  {
    id: 'heap-task-scheduler',
    title: 'Task Scheduler',
    difficulty: 'Medium',
    description: 'Given a list of tasks (represented by characters) and a cooldown n, find the minimum number of CPU intervals needed to finish all tasks. Identical tasks need at least n intervals between them.',
    examples: [
      { input: 'tasks = ["A","A","A","B","B","B"], n = 2', output: '8', explanation: 'A→B→idle→A→B→idle→A→B.' },
      { input: 'tasks = ["A","A","A","B","B","B"], n = 0', output: '6' }
    ],
    solution: {
      approach: 'Greedy: the bottleneck is the most frequent task. Formula: max((maxFreq-1)*(n+1) + countOfMaxFreq, tasks.length).',
      code: `function leastInterval(tasks: string[], n: number): number {
  const freq = new Array(26).fill(0);
  for (const t of tasks) freq[t.charCodeAt(0) - 65]++;
  freq.sort((a, b) => b - a);
  const maxFreq = freq[0];
  let countMax = 0;
  for (const f of freq) if (f === maxFreq) countMax++;
  return Math.max((maxFreq - 1) * (n + 1) + countMax, tasks.length);
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Count frequency of each task',
        'The most frequent task determines the frame structure',
        '(maxFreq-1) full frames of size (n+1), plus a final group of size countMax',
        'Total is at least tasks.length (no idle needed if tasks fill all slots)'
      ]
    },
    hints: ['Think of "frames" of size n+1 anchored by the most frequent task.', 'The answer is max(formula, tasks.length).']
  },
  {
    id: 'heap-merge-k-sorted-lists',
    title: 'Merge K Sorted Lists',
    difficulty: 'Medium',
    description: 'You are given an array of k linked-lists, each sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.',
    examples: [
      { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]' },
      { input: 'lists = []', output: '[]' }
    ],
    solution: {
      approach: 'Divide and conquer: repeatedly merge pairs of lists. O(n log k) time.',
      code: `// ListNode defined elsewhere
function mergeKLists(lists: Array<{ val: number; next: typeof lists[0] } | null>): typeof lists[0] {
  if (!lists.length) return null;
  while (lists.length > 1) {
    const merged: typeof lists = [];
    for (let i = 0; i < lists.length; i += 2) {
      merged.push(mergeTwoLists(lists[i], lists[i + 1] ?? null));
    }
    lists = merged;
  }
  return lists[0];
}

function mergeTwoLists<T extends { val: number; next: T | null }>(
  l1: T | null, l2: T | null
): T | null {
  const dummy = { val: 0, next: null } as unknown as T;
  let cur = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) { cur.next = l1; l1 = l1.next; }
    else { cur.next = l2; l2 = l2.next; }
    cur = cur.next!;
  }
  cur.next = l1 ?? l2;
  return dummy.next;
}`,
      timeComplexity: 'O(n log k)',
      spaceComplexity: 'O(log k)',
      stepByStep: [
        'Pair up lists and merge each pair',
        'Repeat until only one list remains',
        'Each pass halves the number of lists — log k passes total',
        'Each pass touches all n nodes — O(n log k) overall'
      ]
    },
    hints: ['Divide and conquer is cleaner than a single large merge.', 'A min-heap of (val, listIndex, node) is the textbook O(n log k) solution.']
  },
  {
    id: 'heap-find-median-stream',
    title: 'Find Median from Data Stream',
    difficulty: 'Hard',
    description: 'Design a data structure that supports addNum(num) and findMedian(). findMedian returns the median of all numbers added so far.',
    examples: [
      { input: 'addNum(1), addNum(2), findMedian()', output: '1.5' },
      { input: 'addNum(3), findMedian()', output: '2.0' }
    ],
    solution: {
      approach: 'Two heaps: a max-heap for the lower half and a min-heap for the upper half. Keep their sizes balanced.',
      code: `// JS lacks a built-in heap; conceptual implementation shown
class MedianFinder {
  // lo: max-heap (negated values in min-heap)
  // hi: min-heap
  private lo: number[] = [];
  private hi: number[] = [];

  addNum(num: number): void {
    // Push to max-heap (negate for min-heap simulation)
    this.heapPush(this.lo, -num);
    // Balance: move top of lo to hi
    this.heapPush(this.hi, -this.heapPop(this.lo)!);
    // Ensure lo has >= elements as hi
    if (this.lo.length < this.hi.length) {
      this.heapPush(this.lo, -this.heapPop(this.hi)!);
    }
  }

  findMedian(): number {
    if (this.lo.length > this.hi.length) return -this.lo[0];
    return (-this.lo[0] + this.hi[0]) / 2;
  }

  private heapPush(h: number[], val: number): void {
    h.push(val);
    let i = h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (h[p] <= h[i]) break;
      [h[p], h[i]] = [h[i], h[p]]; i = p;
    }
  }

  private heapPop(h: number[]): number | undefined {
    if (!h.length) return undefined;
    const top = h[0];
    const last = h.pop()!;
    if (h.length) {
      h[0] = last;
      let i = 0;
      while (true) {
        let s = i;
        const l = 2*i+1; const r = 2*i+2;
        if (l < h.length && h[l] < h[s]) s = l;
        if (r < h.length && h[r] < h[s]) s = r;
        if (s === i) break;
        [h[i], h[s]] = [h[s], h[i]]; i = s;
      }
    }
    return top;
  }
}`,
      timeComplexity: 'O(log n) per addNum, O(1) findMedian',
      spaceComplexity: 'O(n)',
      stepByStep: [
        'lo is a max-heap for the lower half; hi is a min-heap for the upper half',
        'After each insertion, rebalance so |lo| - |hi| <= 1',
        'If even count: median = (lo.top + hi.top) / 2',
        'If odd count: median = lo.top (lo always has the extra)'
      ]
    },
    hints: ['Two heaps keep the split point in O(log n) per add.', 'Always rebalance after every insertion.']
  }
];

