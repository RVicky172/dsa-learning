import React from 'react';
import * as Icons from 'lucide-react';
import type { TopicMeta } from '../types/topic';

type LucideIcon = typeof Icons.Hash;

const iconMap = Icons as unknown as Record<string, LucideIcon>;

export const topicsData: TopicMeta[] = [
  {
    id: 'arrays',
    title: 'Arrays & Strings',
    description: 'Fundamental building blocks for data storage and manipulation.',
    complexity: 'O(1) Access',
    icon: React.createElement(iconMap['Hash'], { size: 24 }),
    delay: 0.1
  },
  {
    id: 'design',
    title: 'System Design & Patterns',
    description: 'Architectural patterns and system design principles.',
    complexity: 'Variable',
    icon: React.createElement(iconMap['Share2'], { size: 24 }),
    delay: 0.8
  },
  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming',
    description: 'Solve optimization problems by breaking them into overlapping subproblems.',
    complexity: 'O(n²) typical',
    icon: React.createElement(iconMap['Trophy'], { size: 24 }),
    delay: 0.5
  },
  {
    id: 'graphs',
    title: 'Graphs',
    description: 'Complex networks for modeling relationships and connections.',
    complexity: 'O(V + E)',
    icon: React.createElement(iconMap['Network'], { size: 24 }),
    delay: 0.5
  },
  {
    id: 'greedy',
    title: 'Greedy Algorithms',
    description: 'Make locally optimal choices to find globally optimal solutions.',
    complexity: 'O(n log n) typical',
    icon: React.createElement(iconMap['TrendingUp'], { size: 24 }),
    delay: 0.75
  },
  {
    id: 'hash-tables',
    title: 'Hash Tables',
    description: 'Lightning-fast key-value mapping for optimal performance.',
    complexity: 'O(1) Average',
    icon: React.createElement(iconMap['Zap'], { size: 24 }),
    delay: 0.3
  },
  {
    id: 'heaps',
    title: 'Heaps & Priority Queues',
    description: 'Efficient access to minimum/maximum elements with heap-ordered trees.',
    complexity: 'O(log n) insert/delete',
    icon: React.createElement(iconMap['Layers'], { size: 24 }),
    delay: 0.55
  },
  {
    id: 'linked-lists',
    title: 'Linked Lists',
    description: 'Dynamic data structures for efficient insertions and deletions.',
    complexity: 'O(n) Search',
    icon: React.createElement(iconMap['List'], { size: 24 }),
    delay: 0.2
  },
  {
    id: 'math-bit-logic',
    title: 'Math & Bit Logic',
    description: 'Mathematical operations and bitwise manipulations.',
    complexity: 'O(1) Bitwise',
    icon: React.createElement(iconMap['Calculator'], { size: 24 }),
    delay: 0.9
  },
  {
    id: 'recursion-backtracking',
    title: 'Recursion & Backtracking',
    description: 'Recursive problem-solving and systematic exploration of solution spaces.',
    complexity: 'O(2ⁿ) / O(n!)',
    icon: React.createElement(iconMap['GitBranch'], { size: 24 }),
    delay: 0.6
  },
  {
    id: 'sorting-searching',
    title: 'Sorting & Searching',
    description: 'Algorithms for organizing and finding data efficiently.',
    complexity: 'O(n log n) typical',
    icon: React.createElement(iconMap['ArrowUpDown'], { size: 24 }),
    delay: 0.11
  },
  {
    id: 'stacks-queues',
    title: 'Stacks & Queues',
    description: 'LIFO and FIFO data structures for sequential processing and problem solving.',
    complexity: 'O(1) Operations',
    icon: React.createElement(iconMap['Layers'], { size: 24 }),
    delay: 0.6
  },
  {
    id: 'strings',
    title: 'Strings',
    description: 'Text processing and pattern matching algorithms.',
    complexity: 'O(n) typical',
    icon: React.createElement(iconMap['Lightbulb'], { size: 24 }),
    delay: 0.7
  },
  {
    id: 'trees',
    title: 'Trees',
    description: 'Hierarchical data structures for efficient searching and organizing.',
    complexity: 'O(log n) Average',
    icon: React.createElement(iconMap['TreePalm'], { size: 24 }),
    delay: 0.4
  },
  {
    id: 'tries',
    title: 'Tries (Prefix Trees)',
    description: 'Tree-based structure for efficient string prefix operations.',
    complexity: 'O(L) per operation',
    icon: React.createElement(iconMap['Network'], { size: 24 }),
    delay: 0.65
  },
];
