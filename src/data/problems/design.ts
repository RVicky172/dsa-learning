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
