import type { Topic } from '../../types/topic';
import { designProblems } from '../problems/design';
import React from 'react';
import { Share2 } from 'lucide-react';

export const designTopic: Topic = {
  id: 'design',
  title: 'System Design & Patterns',
  description: 'Architectural patterns and system design principles.',
  complexity: 'Variable',
  icon: React.createElement(Share2, { size: 24 }),
  delay: 0.8,

  introduction: `System design involves creating scalable, reliable, and maintainable systems. Understanding design patterns, distributed systems concepts, and architectural principles is crucial for building production systems.

At the core, system design is about making trade-offs. Every decision — SQL vs NoSQL, microservices vs monolith, consistency vs availability — involves trade-offs that depend on your specific requirements.

## The CAP Theorem
In distributed systems, you can only guarantee two of three properties: Consistency (every read gets the most recent write), Availability (every request gets a response), and Partition Tolerance (the system works despite network failures). Since network partitions are unavoidable, you must choose between CP (consistent but may be unavailable) and AP (available but may serve stale data).

## SOLID Principles
These five principles guide object-oriented design: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion. Following them leads to code that is easier to maintain, test, and extend.`,

  whyImportant: 'Senior engineers spend more time on system design than coding. These skills are critical for career advancement, real-world impact, and interview performance. System design interviews are standard at companies like Google, Meta, Amazon, and are the primary differentiator between mid-level and senior engineers.',

  whenToUse: [
    'Designing scalable systems that handle millions of users',
    'Implementing caching strategies for performance',
    'Building distributed systems with fault tolerance',
    'Creating maintainable architectures for growing teams',
    'Optimizing for performance, reliability, and cost',
    'Breaking monoliths into microservices',
    'Designing data-intensive applications'
  ],

  advantages: [
    'Proven patterns reduce design time and risk',
    'Improves code maintainability and readability',
    'Enables horizontal and vertical scaling',
    'Reduces bugs through good architecture',
    'Facilitates team collaboration on large codebases'
  ],

  disadvantages: [
    'Over-engineering can add unnecessary complexity',
    'Patterns must be applied appropriately to the context',
    'Learning curve is steep for distributed systems',
    'Premature optimization can waste resources',
    'Distributed systems introduce new failure modes'
  ],

  concepts: [
    {
      name: 'Caching (LRU, LFU)',
      description: 'Store frequently accessed data for fast retrieval. LRU evicts least recently used items; LFU evicts least frequently used. Cache invalidation is one of the hardest problems in CS.'
    },
    {
      name: 'Load Balancing',
      description: 'Distribute incoming requests across multiple servers. Strategies include round-robin, least connections, IP hash, and weighted distribution. Essential for handling traffic spikes.'
    },
    {
      name: 'Database Sharding',
      description: 'Partition data across multiple databases for horizontal scaling. Shard keys determine data distribution. Challenges include cross-shard queries and rebalancing.'
    },
    {
      name: 'Message Queues',
      description: 'Decouple services using asynchronous messaging (Kafka, RabbitMQ, SQS). Enables event-driven architecture, retry logic, and load smoothing.'
    },
    {
      name: 'Consistent Hashing',
      description: 'Distribute data across nodes so that adding/removing nodes only requires remapping a small fraction of keys. Used in distributed caches and databases.'
    },
    {
      name: 'Rate Limiting',
      description: 'Control the rate of requests to protect services from abuse. Token bucket and sliding window are common algorithms. Essential for API design.'
    }
  ],

  examples: [
    {
      title: 'LRU Cache Implementation',
      language: 'typescript',
      code: `// LRU Cache using Map (ordered insertion)
class LRUCache {
  capacity: number;
  cache: Map<number, number>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key: number): number {
    if (!this.cache.has(key)) return -1;

    // Move to end (most recently used)
    const value = this.cache.get(key)!;
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key: number, value: number): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Evict least recently used (first item)
      const lruKey = this.cache.keys().next().value;
      this.cache.delete(lruKey);
    }
    this.cache.set(key, value);
  }
}

// Usage
const cache = new LRUCache(3);
cache.put(1, 10);
cache.put(2, 20);
cache.put(3, 30);
cache.get(1);       // Returns 10, marks as recent
cache.put(4, 40);   // Evicts key 2 (least recent)
cache.get(2);       // Returns -1 (evicted)`,
      explanation: 'This LRU cache leverages JavaScript Map\'s ordered insertion property. The first key in the Map is the least recently used. On access, we delete and re-insert to move to the end. This achieves O(1) for both get and put operations.',
      timeComplexity: 'O(1) for both get and put',
      spaceComplexity: 'O(capacity)'
    },
    {
      title: 'Rate Limiter (Token Bucket)',
      language: 'typescript',
      code: `// Token Bucket Rate Limiter
class TokenBucketRateLimiter {
  maxTokens: number;
  tokens: number;
  refillRate: number;     // tokens per second
  lastRefillTime: number;

  constructor(maxTokens: number, refillRate: number) {
    this.maxTokens = maxTokens;
    this.tokens = maxTokens;
    this.refillRate = refillRate;
    this.lastRefillTime = Date.now();
  }

  refill(): void {
    const now = Date.now();
    const elapsed = (now - this.lastRefillTime) / 1000;
    const tokensToAdd = elapsed * this.refillRate;

    this.tokens = Math.min(this.maxTokens, this.tokens + tokensToAdd);
    this.lastRefillTime = now;
  }

  allowRequest(): boolean {
    this.refill();

    if (this.tokens >= 1) {
      this.tokens -= 1;
      return true;  // Request allowed
    }
    return false;   // Rate limited
  }
}

// Allow 10 requests per second, burst of 20
const limiter = new TokenBucketRateLimiter(20, 10);

for (let i = 0; i < 25; i++) {
  console.log(\`Request \${i}: \${limiter.allowRequest() ? "✓" : "✗"}\`);
}`,
      explanation: 'Token bucket allows bursts while maintaining an average rate. Tokens refill at a constant rate. Each request consumes one token. When empty, requests are rejected. This is used by APIs like Twitter, Stripe, and AWS.',
      timeComplexity: 'O(1) per request check',
      spaceComplexity: 'O(1)'
    },
    {
      title: 'Consistent Hashing',
      language: 'typescript',
      code: `// Simplified consistent hashing
class ConsistentHash {
  ring: Map<number, string>;
  sortedKeys: number[];
  replicas: number;

  constructor(nodes: string[], replicas = 3) {
    this.ring = new Map();
    this.sortedKeys = [];
    this.replicas = replicas;

    for (const node of nodes) {
      this.addNode(node);
    }
  }

  private hash(key: string): number {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = ((hash << 5) - hash + key.charCodeAt(i)) | 0;
    }
    return Math.abs(hash);
  }

  addNode(node: string): void {
    for (let i = 0; i < this.replicas; i++) {
      const virtualKey = this.hash(\`\${node}:\${i}\`);
      this.ring.set(virtualKey, node);
      this.sortedKeys.push(virtualKey);
    }
    this.sortedKeys.sort((a, b) => a - b);
  }

  getNode(key: string): string {
    const hash = this.hash(key);
    for (const ringKey of this.sortedKeys) {
      if (hash <= ringKey) return this.ring.get(ringKey)!;
    }
    return this.ring.get(this.sortedKeys[0])!;
  }
}

const ch = new ConsistentHash(["Server-A", "Server-B", "Server-C"]);
console.log(ch.getNode("user:123"));  // Consistent mapping
console.log(ch.getNode("user:456"));`,
      explanation: 'Consistent hashing places nodes and keys on a virtual ring. Each key maps to the nearest node clockwise. Adding/removing a node only affects keys between it and its predecessor — typically 1/N of all keys. Virtual nodes (replicas) improve distribution uniformity.',
      timeComplexity: 'O(log n) for lookup with binary search',
      spaceComplexity: 'O(n × replicas) for the ring'
    }
  ],

  patterns: [
    {
      name: 'Pub/Sub (Publisher-Subscriber)',
      description: 'Decouple message producers from consumers. Publishers send messages to topics; subscribers receive messages from topics they registered for.',
      technique: 'Use a message broker (Kafka, Redis Pub/Sub). Publishers don\'t know about subscribers and vice versa. Enables event-driven architectures.',
      example: 'Real-time notifications, event sourcing, microservice communication',
      whenToUse: [
        'When services need to communicate asynchronously',
        'When you need fan-out messaging (one-to-many)',
        'When producers and consumers have different processing speeds',
        'For building event-driven architectures'
      ]
    },
    {
      name: 'CQRS (Command Query Separation)',
      description: 'Separate read and write operations into different models. Commands modify state; queries read state. Each can be independently optimized.',
      technique: 'Use separate databases or schemas for reads and writes. Sync with eventual consistency. Reads can use denormalized views.',
      example: 'E-commerce with read-optimized product catalog and write-optimized order processing',
      whenToUse: [
        'When read and write patterns differ significantly',
        'When you need to scale reads and writes independently',
        'When complex queries slow down write operations',
        'For event-sourced systems'
      ]
    },
    {
      name: 'Circuit Breaker',
      description: 'Prevent cascading failures in distributed systems. When a service fails repeatedly, the circuit breaker "opens" and fails fast instead of waiting for timeouts.',
      technique: 'Track failure count. When threshold is exceeded, open the circuit (reject requests immediately). After a cooldown period, allow test requests to check if the service recovered.',
      example: 'Netflix Hystrix, resilient API gateways, microservice communication',
      whenToUse: [
        'When calling external or unreliable services',
        'When you need to prevent cascading failures',
        'When degraded service is better than no service',
        'For building resilient microservice architectures'
      ]
    }
  ],

  problems: [
    ...designProblems,
    {
      id: 'design-lru',
      title: 'Design LRU Cache',
      difficulty: 'Medium',
      description: 'Implement an LRU Cache that supports get(key) and put(key, value) operations in O(1) time.',
      examples: [
        {
          input: 'LRUCache(2), put(1,1), put(2,2), get(1), put(3,3), get(2)',
          output: '[1, -1]',
          explanation: 'get(1) returns 1; put(3,3) evicts key 2; get(2) returns -1'
        }
      ],
      solution: {
        approach: 'Use a Map which maintains insertion order. Delete and re-insert on access to move to the end.',
        code: `class LRUCache {
  private capacity: number;
  private cache: Map<number, number>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key: number): number {
    if (!this.cache.has(key)) return -1;
    const val = this.cache.get(key)!;
    this.cache.delete(key);
    this.cache.set(key, val);
    return val;
  }

  put(key: number, value: number): void {
    this.cache.delete(key);
    if (this.cache.size >= this.capacity) {
      this.cache.delete(this.cache.keys().next().value);
    }
    this.cache.set(key, value);
  }
}`,
        timeComplexity: 'O(1) for both get and put',
        spaceComplexity: 'O(capacity)',
        stepByStep: [
          'Use Map for O(1) lookup and ordered insertion',
          'On get: delete and re-insert to mark as most recent',
          'On put: delete if exists, evict LRU if at capacity',
          'First key in Map is always the least recently used'
        ]
      },
      hints: [
        'JavaScript Map maintains insertion order',
        'Delete and re-insert to move to "most recent"',
        'The first key is always the least recently used'
      ]
    },
    {
      id: 'design-rate-limiter',
      title: 'Design Rate Limiter',
      difficulty: 'Medium',
      description: 'Design a rate limiter that allows at most N requests per window of T seconds.',
      examples: [
        {
          input: 'limit = 3, window = 60s, requests at t=1,2,3,4',
          output: '[true, true, true, false]',
          explanation: 'Fourth request exceeds the limit of 3 per 60s'
        }
      ],
      solution: {
        approach: 'Use sliding window with a queue of timestamps. Remove expired timestamps, then check count.',
        code: `class SlidingWindowRateLimiter {
  private limit: number;
  private windowMs: number;
  private requests: Map<string, number[]>;

  constructor(limit: number, windowSeconds: number) {
    this.limit = limit;
    this.windowMs = windowSeconds * 1000;
    this.requests = new Map();
  }

  isAllowed(userId: string): boolean {
    const now = Date.now();
    if (!this.requests.has(userId)) {
      this.requests.set(userId, []);
    }

    const timestamps = this.requests.get(userId)!;

    // Remove expired timestamps
    while (timestamps.length > 0 && timestamps[0] <= now - this.windowMs) {
      timestamps.shift();
    }

    if (timestamps.length < this.limit) {
      timestamps.push(now);
      return true;
    }
    return false;
  }
}`,
        timeComplexity: 'O(1) amortized',
        spaceComplexity: 'O(limit × users)',
        stepByStep: [
          'Maintain a queue of request timestamps per user',
          'Remove timestamps outside the current window',
          'Check if remaining count is below the limit',
          'If allowed, add current timestamp and return true'
        ]
      },
      hints: [
        'Use a sliding window approach',
        'Store timestamps of recent requests',
        'Clean up expired timestamps before checking'
      ]
    },
    {
      id: 'design-hashmap',
      title: 'Design HashMap',
      difficulty: 'Easy',
      description: 'Implement a HashMap from scratch with put, get, and remove operations.',
      examples: [
        {
          input: 'put(1, 10), put(2, 20), get(1), remove(2), get(2)',
          output: '[10, -1]',
          explanation: 'get(1) returns 10; after removing 2, get(2) returns -1'
        }
      ],
      solution: {
        approach: 'Use an array of buckets with chaining (linked lists) to handle collisions.',
        code: `class MyHashMap {
  private size: number;
  private buckets: [number, number][][];

  constructor() {
    this.size = 1000;
    this.buckets = new Array(this.size).fill(null).map(() => []);
  }

  private hash(key: number): number {
    return key % this.size;
  }

  put(key: number, value: number): void {
    const bucket = this.buckets[this.hash(key)];
    for (const pair of bucket) {
      if (pair[0] === key) { pair[1] = value; return; }
    }
    bucket.push([key, value]);
  }

  get(key: number): number {
    const bucket = this.buckets[this.hash(key)];
    for (const pair of bucket) {
      if (pair[0] === key) return pair[1];
    }
    return -1;
  }

  remove(key: number): void {
    const bucket = this.buckets[this.hash(key)];
    const idx = bucket.findIndex(p => p[0] === key);
    if (idx !== -1) bucket.splice(idx, 1);
  }
}`,
        timeComplexity: 'O(1) average, O(n/k) worst case',
        spaceComplexity: 'O(n + k) where k = number of buckets',
        stepByStep: [
          'Create an array of empty buckets',
          'Hash the key to find the bucket index',
          'For put: check if key exists in bucket, update or append',
          'For get: search the bucket for the key',
          'For remove: find and splice the key-value pair'
        ]
      },
      hints: [
        'Use modulo as a simple hash function',
        'Handle collisions with chaining (arrays within arrays)',
        'Search within the bucket linearly'
      ]
    }
  ],

  operations: [
    { name: 'Hash Map Lookup', complexity: 'O(1) average' },
    { name: 'Cache Hit', complexity: 'O(1)' },
    { name: 'Load Balance', complexity: 'O(1)' },
    { name: 'Consistent Hash Lookup', complexity: 'O(log n)' },
    { name: 'Rate Limit Check', complexity: 'O(1)' },
    { name: 'Queue Enqueue/Dequeue', complexity: 'O(1)' }
  ],

  applications: [
    {
      name: 'Content Delivery Networks',
      description: 'CDNs use caching and consistent hashing to serve static content from the nearest server.',
      example: 'Cloudflare caches website assets at 300+ edge locations worldwide'
    },
    {
      name: 'Social Media Feeds',
      description: 'Fan-out on write/read strategies determine how posts appear in followers\' timelines.',
      example: 'Twitter uses a hybrid approach: fan-out on write for most users, fan-out on read for celebrities'
    },
    {
      name: 'E-commerce',
      description: 'Shopping cart systems, inventory management, and order processing use various design patterns.',
      example: 'Amazon uses microservices with message queues for the checkout pipeline'
    },
    {
      name: 'Real-time Messaging',
      description: 'Chat systems use pub/sub, WebSockets, and message queues for real-time delivery.',
      example: 'WhatsApp uses a custom protocol over TCP for message delivery with end-to-end encryption'
    }
  ]
};
