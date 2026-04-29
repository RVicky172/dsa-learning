import type { Problem } from '../../types/topic';

export const designProblems: Problem[] = [
  {
    id: 'design-twitter',
    title: 'Design Twitter',
    difficulty: 'Medium',
    description: 'Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and see the 10 most recent tweets in the users news feed.',
    examples: [{ input: 'postTweet(1, 5), getNewsFeed(1), follow(1, 2), postTweet(2, 6), getNewsFeed(1)', output: 'null, [5], null, null, [6, 5]' }],
    solution: {
      approach: 'Hash maps for follow relations and a global timestamp / list of tweets.',
      code: `// Conceptual pseudo-code for system design
class Twitter {
    tweets = []; // [{userId, tweetId}]
    follows = new Map(); // Follower -> Set(Followees)

    postTweet(userId: number, tweetId: number): void {
        this.tweets.push({ userId, tweetId });
    }

    getNewsFeed(userId: number): number[] {
        const following = this.follows.get(userId) || new Set();
        const res = [];
        for (let i = this.tweets.length - 1; i >= 0 && res.length < 10; i--) {
            const tweet = this.tweets[i];
            if (tweet.userId === userId || following.has(tweet.userId)) {
                res.push(tweet.tweetId);
            }
        }
        return res;
    }
    // follow/unfollow manipulates the Set
}`,
      timeComplexity: 'O(T) where T is total tweets to scan for feed',
      spaceComplexity: 'O(U + T) for Users and Tweets',
      stepByStep: ['Track relationships using Maps of Sets', 'Store tweets linearly', 'Feed generation filters tweets from bottom to top']
    },
    hints: ['Consider how to fetch the latest tweets efficiently', 'A user sees their own tweets and followees tweets']
  },
  {
    id: 'design-hashmap',
    title: 'Design HashMap',
    difficulty: 'Easy',
    description: 'Design a HashMap without using any built-in hash table libraries.',
    examples: [
      {
        input: '["MyHashMap", "put", "put", "get", "get", "put", "get", "remove", "get"] [[], [1, 1], [2, 2], [1], [3], [2, 1], [2], [2], [2]]',
        output: '[null, null, null, 1, -1, null, 1, null, -1]'
      }
    ],
    solution: {
      approach: 'Use an array of linked lists to handle collisions, with a simple hash function',
      code: `class MyHashMap {
  private buckets: LinkedList[];
  private size: number;

  constructor() {
    this.size = 1000;
    this.buckets = new Array(this.size).fill(null).map(() => new LinkedList());
  }

  put(key: number, value: number): void {
    const index = this.hash(key);
    this.buckets[index].put(key, value);
  }

  get(key: number): number {
    const index = this.hash(key);
    return this.buckets[index].get(key);
  }

  remove(key: number): void {
    const index = this.hash(key);
    this.buckets[index].remove(key);
  }

  private hash(key: number): number {
    return key % this.size;
  }
}

class LinkedList {
  head: Node | null = null;

  put(key: number, value: number): void {
    let curr = this.head;
    while (curr) {
      if (curr.key === key) {
        curr.value = value;
        return;
      }
      curr = curr.next;
    }
    const newNode = new Node(key, value);
    newNode.next = this.head;
    this.head = newNode;
  }

  get(key: number): number {
    let curr = this.head;
    while (curr) {
      if (curr.key === key) return curr.value;
      curr = curr.next;
    }
    return -1;
  }

  remove(key: number): void {
    if (!this.head) return;
    if (this.head.key === key) {
      this.head = this.head.next;
      return;
    }
    let curr = this.head;
    while (curr.next) {
      if (curr.next.key === key) {
        curr.next = curr.next.next;
        return;
      }
      curr = curr.next;
    }
  }
}

class Node {
  key: number;
  value: number;
  next: Node | null;

  constructor(key: number, value: number) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}`,
      timeComplexity: 'O(1) average, O(n) worst case',
      spaceComplexity: 'O(n)',
      stepByStep: [
        'Use array of linked lists for separate chaining',
        'Implement put, get, remove operations',
        'Handle collisions by traversing linked list',
        'Use modulo for simple hash function'
      ]
    },
    hints: [
      'Use an array with linked lists for collision resolution',
      'Implement basic linked list operations',
      'Choose a reasonable bucket size'
    ]
  },
  // ── NEW BATCH (TKT-016) ──────────────────────────────────────────
  {
    id: 'design-parking-system',
    title: 'Design Parking System',
    difficulty: 'Easy',
    description: 'Design a parking system for a parking lot that has three kinds of parking spaces: big, medium, and small, with a fixed number of slots. Implement addCar(carType) which returns true if the car can be parked, false otherwise.',
    examples: [
      { input: 'ParkingSystem(1,1,0), addCar(1), addCar(2), addCar(3), addCar(1)', output: 'true, true, false, false' }
    ],
    solution: {
      approach: 'Store counts for each type; decrement on success.',
      code: `class ParkingSystem {
  private spaces: number[];
  constructor(big: number, medium: number, small: number) {
    this.spaces = [0, big, medium, small];
  }
  addCar(carType: number): boolean {
    if (this.spaces[carType] > 0) {
      this.spaces[carType]--;
      return true;
    }
    return false;
  }
}`,
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Store remaining spaces indexed by carType (1, 2, 3)',
        'On addCar, check if spaces[carType] > 0',
        'Decrement and return true; otherwise return false'
      ]
    },
    hints: ['Index 0 unused; car types map directly to array indices.']
  },
  {
    id: 'design-recent-counter',
    title: 'Number of Recent Calls',
    difficulty: 'Easy',
    description: 'Design a RecentCounter class that counts recent requests within a 3000-millisecond window. ping(t) adds a new request at time t and returns the count of requests in [t-3000, t].',
    examples: [
      { input: 'ping(1), ping(100), ping(3001), ping(3002)', output: '1, 2, 3, 3' }
    ],
    solution: {
      approach: 'Queue: push t, then dequeue elements older than t-3000. Queue length is the answer.',
      code: `class RecentCounter {
  private queue: number[] = [];
  ping(t: number): number {
    this.queue.push(t);
    while (this.queue[0] < t - 3000) this.queue.shift();
    return this.queue.length;
  }
}`,
      timeComplexity: 'O(1) amortised',
      spaceComplexity: 'O(n)',
      stepByStep: [
        'Push the new timestamp onto the queue',
        'Remove timestamps older than t-3000 from the front',
        'Return queue length'
      ]
    },
    hints: ['Pings always arrive in increasing order — simple queue works.', 'Each element is pushed and popped at most once.']
  },
  {
    id: 'design-time-based-kv',
    title: 'Time Based Key-Value Store',
    difficulty: 'Medium',
    description: 'Design a time-based key-value data structure. set(key, value, timestamp) stores the value. get(key, timestamp) returns the value with the largest timestamp <= given timestamp, or "" if none.',
    examples: [
      { input: 'set("foo","bar",1), get("foo",1), get("foo",3), set("foo","bar2",4), get("foo",4), get("foo",5)', output: '"bar","bar","bar2","bar2"' }
    ],
    solution: {
      approach: 'Map from key to sorted list of (timestamp, value) pairs. Binary search for the floor timestamp on get.',
      code: `class TimeMap {
  private store = new Map<string, Array<[number, string]>>();
  set(key: string, value: string, timestamp: number): void {
    if (!this.store.has(key)) this.store.set(key, []);
    this.store.get(key)!.push([timestamp, value]);
  }
  get(key: string, timestamp: number): string {
    const arr = this.store.get(key);
    if (!arr) return '';
    let lo = 0; let hi = arr.length - 1; let res = '';
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (arr[mid][0] <= timestamp) { res = arr[mid][1]; lo = mid + 1; }
      else hi = mid - 1;
    }
    return res;
  }
}`,
      timeComplexity: 'O(log n) get, O(1) set',
      spaceComplexity: 'O(n)',
      stepByStep: [
        'set: append (timestamp, value) to the key\'s list (timestamps always increase)',
        'get: binary search for the largest timestamp <= query',
        'Update result when arr[mid][0] <= timestamp, search right half',
        'Otherwise search left half'
      ]
    },
    hints: ['Timestamps are given in strictly increasing order per key — list stays sorted automatically.', 'Binary search for floor value.']
  },
  {
    id: 'design-browser-history',
    title: 'Design Browser History',
    difficulty: 'Medium',
    description: 'Implement a BrowserHistory class: visit(url), back(steps), forward(steps). back/forward return the URL after moving the cursor the given steps (capped at history boundaries).',
    examples: [
      { input: 'BrowserHistory("leetcode.com"), visit("google.com"), visit("facebook.com"), back(1), back(1), forward(1), visit("linkedin.com"), forward(2), back(2)', output: '"facebook.com","leetcode.com","google.com","linkedin.com","google.com"' }
    ],
    solution: {
      approach: 'Array as stack; track current index. visit truncates forward history.',
      code: `class BrowserHistory {
  private history: string[];
  private cur: number;
  constructor(homepage: string) {
    this.history = [homepage];
    this.cur = 0;
  }
  visit(url: string): void {
    this.history = this.history.slice(0, this.cur + 1);
    this.history.push(url);
    this.cur++;
  }
  back(steps: number): string {
    this.cur = Math.max(0, this.cur - steps);
    return this.history[this.cur];
  }
  forward(steps: number): string {
    this.cur = Math.min(this.history.length - 1, this.cur + steps);
    return this.history[this.cur];
  }
}`,
      timeComplexity: 'O(n) visit, O(1) back/forward',
      spaceComplexity: 'O(n)',
      stepByStep: [
        'visit: truncate history after current position, append new URL',
        'back: decrement cur by steps, clamp to 0',
        'forward: increment cur by steps, clamp to history length-1',
        'Return history[cur]'
      ]
    },
    hints: ['Visiting a new URL invalidates all forward history.', 'Clamp cur to valid range on back/forward.']
  },
  {
    id: 'design-hit-counter',
    title: 'Design Hit Counter',
    difficulty: 'Medium',
    description: 'Design a hit counter that counts hits in the past 5 minutes (300 seconds). hit(timestamp) records a hit. getHits(timestamp) returns the number of hits in [timestamp-299, timestamp].',
    examples: [
      { input: 'hit(1), hit(2), hit(3), getHits(4), hit(300), getHits(300), getHits(301)', output: '3, 4, 3' }
    ],
    solution: {
      approach: 'Circular buffer of 300 slots: store (timestamp, count) per second bucket.',
      code: `class HitCounter {
  private times = new Array<number>(300).fill(0);
  private hits = new Array<number>(300).fill(0);
  hit(timestamp: number): void {
    const i = timestamp % 300;
    if (this.times[i] !== timestamp) {
      this.times[i] = timestamp;
      this.hits[i] = 1;
    } else {
      this.hits[i]++;
    }
  }
  getHits(timestamp: number): number {
    let total = 0;
    for (let i = 0; i < 300; i++) {
      if (timestamp - this.times[i] < 300) total += this.hits[i];
    }
    return total;
  }
}`,
      timeComplexity: 'O(1) hit, O(300) = O(1) getHits',
      spaceComplexity: 'O(300) = O(1)',
      stepByStep: [
        'Use timestamp % 300 as bucket index',
        'If bucket timestamp differs from current, reset bucket',
        'Increment hit count for matching timestamp',
        'getHits sums buckets whose timestamp is within 300 seconds'
      ]
    },
    hints: ['300-slot circular buffer handles the 5-minute window.', 'Check that bucket timestamp still falls within the window before counting.']
  },
  {
    id: 'design-lfu-cache',
    title: 'LFU Cache',
    difficulty: 'Hard',
    description: 'Design a data structure that follows the LFU (Least Frequently Used) cache eviction policy. get(key) and put(key, value) must both run in O(1). When capacity is full, evict the least frequently used item; ties broken by least recently used.',
    examples: [
      { input: 'LFUCache(2), put(1,1), put(2,2), get(1), put(3,3), get(2), get(3), put(4,4), get(1), get(3), get(4)', output: '1,-1,3,-1,4' }
    ],
    solution: {
      approach: 'Three data structures: keyMap (key→{value, freq}), freqMap (freq→LinkedHashSet of keys), minFreq tracker.',
      code: `class LFUCache {
  private cap: number;
  private minFreq = 0;
  private keyMap = new Map<number, { val: number; freq: number }>();
  private freqMap = new Map<number, Set<number>>();

  constructor(capacity: number) { this.cap = capacity; }

  private bump(key: number): void {
    const entry = this.keyMap.get(key)!;
    const oldFreq = entry.freq;
    entry.freq++;
    this.freqMap.get(oldFreq)!.delete(key);
    if (this.freqMap.get(oldFreq)!.size === 0) {
      this.freqMap.delete(oldFreq);
      if (this.minFreq === oldFreq) this.minFreq++;
    }
    if (!this.freqMap.has(entry.freq)) this.freqMap.set(entry.freq, new Set());
    this.freqMap.get(entry.freq)!.add(key);
  }

  get(key: number): number {
    if (!this.keyMap.has(key)) return -1;
    this.bump(key);
    return this.keyMap.get(key)!.val;
  }

  put(key: number, value: number): void {
    if (this.cap === 0) return;
    if (this.keyMap.has(key)) {
      this.keyMap.get(key)!.val = value;
      this.bump(key);
      return;
    }
    if (this.keyMap.size >= this.cap) {
      const evict = this.freqMap.get(this.minFreq)!.values().next().value as number;
      this.freqMap.get(this.minFreq)!.delete(evict);
      this.keyMap.delete(evict);
    }
    this.keyMap.set(key, { val: value, freq: 1 });
    if (!this.freqMap.has(1)) this.freqMap.set(1, new Set());
    this.freqMap.get(1)!.add(key);
    this.minFreq = 1;
  }
}`,
      timeComplexity: 'O(1) per operation',
      spaceComplexity: 'O(capacity)',
      stepByStep: [
        'keyMap tracks value and frequency per key',
        'freqMap maps frequency to insertion-ordered set of keys',
        'minFreq tracks the current minimum frequency for O(1) eviction',
        'On access/insert, move key from old freq bucket to freq+1 bucket',
        'On eviction, remove the first key in freqMap[minFreq] (LRU among LFU)'
      ]
    },
    hints: ['JS Set preserves insertion order — use it as the LRU within a frequency bucket.', 'minFreq resets to 1 on every new insert.']
  }
];

// Missing models for ProblemsPage
export interface AdvancedProblem {
    id: string;
    title: string;
    difficulty: string;
    category: string[];
    description: string;
    examples: { input: string; output: string; explanation?: string }[];
    constraints: string[];
    hints: string[];
    bruteForce: {
        approach: string;
        code: string;
        timeComplexity: string;
        spaceComplexity: string;
        whyThisComplexity: string;
    };
    optimal: {
        approach: string;
        code: string;
        timeComplexity: string;
        spaceComplexity: string;
        whyThisComplexity: string;
        stepByStep: string[];
    };
    keyTakeaways: string[];
}

export const difficultyColors: Record<string, string> = {
    'Easy': '#22c55e',
    'Medium': '#f97316',
    'Hard': '#eab308',
    'Expert': '#ef4444'
};

export const advancedProblems: AdvancedProblem[] = [
    {
        id: 'adv-lru-cache',
        title: 'Design LRU Cache (Advanced)',
        difficulty: 'Hard',
        category: ['Design', 'Hash Table', 'Linked List'],
        description: 'Design and implement a data structure for Least Recently Used (LRU) cache.',
        examples: [
            { input: 'LRUCache(2), put(1,1), put(2,2), get(1)', output: '1', explanation: 'Cache is {1=1, 2=2}, get(1) makes 1 most recently used.' }
        ],
        constraints: ['capacity >= 1', '0 <= key <= 10^4', 'O(1) average time complexity required.'],
        hints: ['Use a hash map to look up keys.', 'Use a doubly linked list to order them.'],
        bruteForce: {
            approach: 'Array based timeline',
            code: 'class LRUCache { /* brute force implemented with array push/shift */ }',
            timeComplexity: 'O(n) for update',
            spaceComplexity: 'O(n)',
            whyThisComplexity: 'Shifting elements in an array takes O(n) time.'
        },
        optimal: {
            approach: 'Hash Map + Doubly Linked List',
            code: 'class LRUCache { /* Node pointers and map for instant O(1) access */ }',
            timeComplexity: 'O(1) average',
            spaceComplexity: 'O(n) nodes',
            whyThisComplexity: 'Linked list provides O(1) removals. Map provides O(1) lookups.',
            stepByStep: [
                'Create a generic doubly linked list node',
                'Maintain head and tail dummy nodes',
                'Whenever a node is accessed, move it to the front',
                'When capacity is reached, remove node from tail and map'
            ]
        },
        keyTakeaways: ['Combining data structures often solves time constraints.']
    }
];
