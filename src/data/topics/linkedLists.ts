import type { Topic } from '../../types/topic';
import React from 'react';
import { List } from 'lucide-react';
import { linkedListProblems } from '../problems/linkedLists';

export const linkedListsTopic: Topic = {
  id: 'linked-lists',
  title: 'Linked Lists',
  description: 'Dynamic data structures for efficient insertions and deletions.',
  complexity: 'O(n) Search',
  icon: React.createElement(List, { size: 24 }),
  delay: 0.2,

  introduction: `A linked list is a linear data structure where elements are stored in nodes. Unlike arrays, elements are not stored in contiguous memory locations. Instead, each node contains data and a reference (or link) to the next node in the sequence. This fundamental difference gives linked lists unique advantages and tradeoffs compared to arrays.

The beauty of linked lists lies in their dynamic nature. They can easily grow and shrink during runtime by allocating and deallocating memory on demand. This makes them ideal for applications where the size of data is unpredictable or frequently changing.

There are several types of linked lists: singly linked lists (one-directional), doubly linked lists (bidirectional), and circular linked lists. Each type has its own use cases and trade-offs in terms of memory usage and operation efficiency.

## Node Structure

Each node in a linked list contains:
- **Data**: The actual value or object being stored
- **Next pointer**: A reference to the next node (and previous pointer in doubly linked lists)

This pointer-based structure allows for efficient insertion and deletion without requiring contiguous memory blocks.

## Memory Allocation vs Arrays

Unlike arrays that require contiguous memory, linked lists can utilize scattered memory locations. Each node can be allocated independently, which is more flexible but less cache-friendly. The trade-off is: memory flexibility vs. performance.

## Iteration Complexity

One key difference from arrays: accessing the kth element in a linked list requires traversing k nodes (O(k) time), whereas arrays provide O(1) random access. This makes linked lists unsuitable for problems requiring frequent random access.`,

  whyImportant: `Linked lists are fundamental to understanding how dynamic memory allocation works and form the basis for many other data structures like stacks, queues, and graphs. They're frequently tested in technical interviews and are essential for system-level programming. Understanding pointers and references is critical for language like C++ and crucial for grasping memory management concepts.`,

  whenToUse: [
    'When you need frequent insertions and deletions at known positions',
    'When the size of data is unknown or changes frequently',
    'When you don\'t need random access to elements',
    'Implementing stacks, queues, or other abstract data types',
    'When memory fragmentation is a concern',
    'For implementing caches (LRU cache) and song playlists',
    'In graph representations using adjacency lists'
  ],

  advantages: [
    'O(1) time complexity for insertion/deletion at known positions',
    'Dynamic size - grows and shrinks easily',
    'Efficient memory utilization - no wasted space for unused capacity',
    'Easy insertion/deletion at beginning without shifting elements',
    'No need to specify size in advance',
    'Efficient for implementing queues and deques',
    'Foundation for tree and graph structures'
  ],

  disadvantages: [
    'O(n) time for accessing elements (no random access)',
    'Extra memory for storing pointers/references (typically 8 bytes per pointer)',
    'Not cache-friendly due to non-contiguous memory',
    'Cannot do binary search efficiently',
    'More complex implementation than arrays',
    'Higher overhead for small data',
    'Potential for memory leaks if not managed properly'
  ],

  concepts: [
    {
      name: 'Node Structure',
      description: 'Each node contains data and a pointer/reference to the next node (and previous node in doubly linked lists). This creates the chain structure.'
    },
    {
      name: 'Head Pointer',
      description: 'A reference to the first node in the list. Essential for accessing the list. Without it, the entire list is inaccessible.'
    },
    {
      name: 'Traversal',
      description: 'Moving through the list by following next pointers from the head to the end (null). Must start from head since random access is impossible.'
    },
    {
      name: 'Singly vs Doubly Linked',
      description: 'Singly linked lists have one-way links (efficient, simpler). Doubly linked lists have bidirectional links allowing backward traversal (more flexible, more memory).'
    },
    {
      name: 'Circular Lists',
      description: 'The last node points back to the first node, creating a circle. Useful for round-robin scheduling and repeating sequences.'
    },
    {
      name: 'Sentinel/Dummy Node',
      description: 'An artificial node used at the beginning to simplify edge case handling. Eliminates need to check if head is being modified.'
    },
    {
      name: 'Fast & Slow Pointers',
      description: 'Two pointers moving at different speeds through the list, useful for cycle detection and finding middle element.'
    }
  ],

  examples: [
    {
      title: 'Node and LinkedList Implementation',
      language: 'typescript',
      code: `// Node class for linked list
class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;
  
  constructor(value: T) {
    this.value = value;
  }
}

// LinkedList class with basic operations
class LinkedList<T> {
  head: ListNode<T> | null = null;
  size: number = 0;
  
  // Add to beginning - O(1)
  prepend(value: T): void {
    const newNode = new ListNode(value);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }
  
  // Add to end - O(n)
  append(value: T): void {
    const newNode = new ListNode(value);
    
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }
  
  // Delete node with value - O(n)
  delete(value: T): boolean {
    if (!this.head) return false;
    
    // If head matches
    if (this.head.value === value) {
      this.head = this.head.next;
      this.size--;
      return true;
    }
    
    // Search for value in rest of list
    let current = this.head;
    while (current.next) {
      if (current.next.value === value) {
        current.next = current.next.next;
        this.size--;
        return true;
      }
      current = current.next;
    }
    return false;
  }
  
  // Print list contents
  print(): void {
    let current = this.head;
    let result = '';
    while (current) {
      result += current.value + ' -> ';
      current = current.next;
    }
    console.log(result + 'null');
  }
}

// Usage
const list = new LinkedList<number>();
list.append(1);
list.append(2);
list.append(3);
list.prepend(0);
list.print(); // 0 -> 1 -> 2 -> 3 -> null`,
      explanation: 'This shows the basic linked list implementation. Prepend is O(1) since we modify the head directly. Append is O(n) because we must traverse to the end. This is a key difference from arrays.',
      timeComplexity: 'Prepend: O(1), Append: O(n), Delete: O(n)',
      spaceComplexity: 'O(1) for operations, O(n) for storage'
    },
    {
      title: 'Reverse a Linked List',
      language: 'typescript',
      code: `// Iterative reversal - most efficient
function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let current: ListNode | null = head;
  
  while (current) {
    const next = current.next;  // Save next before we change it
    current.next = prev;        // Reverse the link
    prev = current;             // Move prev forward
    current = next;             // Move current forward
  }
  
  return prev;  // New head of reversed list
}

// Recursive reversal - elegant but uses call stack
function reverseListRecursive(head: ListNode | null): ListNode | null {
  // Base case
  if (!head || !head.next) return head;
  
  // Reverse the rest of the list
  const newHead = reverseListRecursive(head.next);
  
  // Put first element at the end
  head.next.next = head;
  head.next = null;
  
  return newHead;
}

// Example
// Before: 1 -> 2 -> 3 -> null
// After:  3 -> 2 -> 1 -> null`,
      explanation: 'Reversing a linked list is a classic problem. The iterative approach uses three pointers to reverse links one by one with O(1) space. The recursive approach is elegant but uses O(n) call stack space.',
      timeComplexity: 'O(n) - must visit each node once',
      spaceComplexity: 'Iterative: O(1), Recursive: O(n) call stack'
    },
    {
      title: 'Fast & Slow Pointer (Cycle Detection)',
      language: 'typescript',
      code: `// Detect if linked list has a cycle
function hasCycle(head: ListNode | null): boolean {
  if (!head || !head.next) return false;
  
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;
  
  // If there's a cycle, fast will eventually catch slow
  while (fast && fast.next) {
    slow = slow!.next;           // Move 1 step
    fast = fast.next.next;       // Move 2 steps
    
    if (slow === fast) {
      return true;  // Cycle detected
    }
  }
  
  return false;  // No cycle
}

// Find the start of a cycle (if one exists)
function findCycleStart(head: ListNode | null): ListNode | null {
  if (!head) return null;
  
  let slow = head, fast = head;
  
  // Detect cycle first
  while (fast && fast.next) {
    slow = slow.next!;
    fast = fast.next.next;
    if (slow === fast) break;
  }
  
  // If no cycle found
  if (!fast || !fast.next) return null;
  
  // Find cycle start: both pointers meet at cycle start
  slow = head;
  while (slow !== fast) {
    slow = slow.next!;
    fast = fast!.next;
  }
  
  return slow;
}

// Example: 1 -> 2 -> 3 -> 4 -> 2 (cycle to node 2)
// hasCycle returns true
// findCycleStart returns node with value 2`,
      explanation: 'Floyd\'s cycle detection algorithm uses fast and slow pointers. If a cycle exists, the fast pointer (moving 2 steps) will eventually lap the slow pointer (moving 1 step). Finding the cycle start uses a mathematical property of the algorithm.',
      timeComplexity: 'O(n) - at most 2n iterations',
      spaceComplexity: 'O(1) - only two pointers'
    },
    {
      title: 'Find Middle and Merge Sorted Lists',
      language: 'typescript',
      code: `// Find middle node of linked list
function findMiddle(head: ListNode | null): ListNode | null {
  if (!head) return null;
  
  let slow = head;
  let fast = head;
  
  // Fast moves 2 steps, slow moves 1 step
  // When fast reaches end, slow is at middle
  while (fast && fast.next) {
    slow = slow.next!;
    fast = fast.next.next;
  }
  
  return slow;
}

// Merge two sorted linked lists
function mergeSorted(
  l1: ListNode | null, 
  l2: ListNode | null
): ListNode | null {
  // Use dummy node to simplify edge cases
  const dummy = new ListNode(0);
  let current = dummy;
  
  // Compare nodes from both lists
  while (l1 && l2) {
    if (l1.value <= l2.value) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }
  
  // Attach remaining nodes
  current.next = l1 || l2;
  
  return dummy.next;
}

// Example
// l1: 1 -> 3 -> 5
// l2: 2 -> 4 -> 6
// Result: 1 -> 2 -> 3 -> 4 -> 5 -> 6`,
      explanation: 'The dummy node pattern simplifies handling of edge cases (like when one list is empty or when we modify the head). This is a common technique in linked list problems.',
      timeComplexity: 'O(n + m) - single pass through both lists',
      spaceComplexity: 'O(1) - only pointers, no extra data structures'
    },
    {
      title: 'Remove Nth Node From End',
      language: 'typescript',
      code: `// Remove nth node from end of list
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  // Dummy node handles edge case where head is removed
  const dummy = new ListNode(0);
  dummy.next = head;
  
  let fast: ListNode | null = dummy;
  let slow: ListNode | null = dummy;
  
  // Move fast pointer n+1 steps ahead
  for (let i = 0; i <= n; i++) {
    if (fast) fast = fast.next;
  }
  
  // Move both pointers until fast reaches end
  while (fast) {
    fast = fast.next;
    slow = slow.next!;
  }
  
  // Remove the target node
  slow.next = slow.next!.next;
  
  return dummy.next;
}

// Example
// Input: 1 -> 2 -> 3 -> 4 -> 5, n = 2
// Output: 1 -> 2 -> 3 -> 5
// (Removed node 4, which was 2nd from end)`,
      explanation: 'This uses the two-pointer technique with a gap. The dummy node is crucial for handling the case where the head node itself needs to be removed. The gap between pointers lets us find the node before the target.',
      timeComplexity: 'O(n) - single pass to create gap, single pass to traverse',
      spaceComplexity: 'O(1) - only pointers'
    }
  ],

  patterns: [
    {
      name: 'Fast & Slow Pointers',
      description: 'Use two pointers moving at different speeds to solve various linked list problems efficiently.',
      technique: 'One pointer moves twice as fast as the other. When fast reaches end, slow is at middle. If there\'s a cycle, they will meet.',
      example: 'Find middle node, detect cycles, find nth from end, palindrome checking',
      whenToUse: [
        'Finding middle element without knowing length',
        'Cycle detection in linked lists',
        'Finding kth from end without two passes',
        'Detecting if list is a palindrome'
      ]
    },
    {
      name: 'Dummy Node',
      description: 'Create a dummy node before head to simplify edge cases and allow uniform handling of all nodes.',
      technique: 'Add a dummy node pointing to head. Return dummy.next as final result. This eliminates special cases for head modification.',
      example: 'Remove nodes, merge lists, partition lists, delete duplicates',
      whenToUse: [
        'When you need to delete or modify head node',
        'Merging multiple lists',
        'Partitioning lists',
        'Operations that might remove the head'
      ]
    },
    {
      name: 'Two Pointers (Gap)',
      description: 'Maintain two pointers with a constant gap between them to solve problems without storing positions.',
      technique: 'Move first pointer n steps ahead, then move both until first reaches end. The second pointer is now n positions before the end.',
      example: 'Remove nth from end, find kth from end, partition lists',
      whenToUse: [
        'Finding/removing from end without length',
        'Partitioning lists into sections',
        'Offset operations',
        'Identifying nth node from end'
      ]
    },
    {
      name: 'Recursive Processing',
      description: 'Use recursion to process lists from end to start, useful for certain transformations.',
      technique: 'Recurse to the end, then process on the way back up the call stack.',
      example: 'Reverse list, reverse in groups, check palindrome, sum values',
      whenToUse: [
        'Reversing operations',
        'Processing from end to start',
        'Complex link manipulations',
        'When backtracking is needed'
      ]
    },
    {
      name: 'Hash Set for Visited',
      description: 'Track visited nodes with a set to detect cycles or avoid revisiting nodes.',
      technique: 'Store node references in a set as you traverse. Check membership to detect revisits.',
      example: 'Cycle detection (alternative to fast/slow), cloning lists with cycles',
      whenToUse: [
        'Cycle detection (space-time tradeoff with fast/slow)',
        'Cloning complex lists',
        'Operations requiring visited tracking',
        'When O(n) space is acceptable'
      ]
    }
  ],

  problems: [
    ...linkedListProblems
  ],

  operations: [
    { name: 'Access at Index', complexity: 'O(n)' },
    { name: 'Search', complexity: 'O(n)' },
    { name: 'Insert at Beginning', complexity: 'O(1)' },
    { name: 'Insert at End', complexity: 'O(n)' },
    { name: 'Insert at Known Position', complexity: 'O(1) after reaching it' },
    { name: 'Delete from Beginning', complexity: 'O(1)' },
    { name: 'Delete from End', complexity: 'O(n)' },
    { name: 'Delete from Known Position', complexity: 'O(1) after reaching it' },
    { name: 'Reverse', complexity: 'O(n)' },
    { name: 'Traverse/Print', complexity: 'O(n)' }
  ],

  applications: [
    {
      name: 'Browser History',
      description: 'Back/forward navigation in web browsers uses doubly linked lists for efficient navigation.',
      example: 'Chrome, Firefox use linked lists to maintain page history for O(1) navigation'
    },
    {
      name: 'Music Playlists',
      description: 'Next/previous song navigation in media players.',
      example: 'Spotify, Apple Music use circular linked lists for playlist management'
    },
    {
      name: 'Undo Functionality',
      description: 'Undo/redo in text editors and applications.',
      example: 'VS Code, Photoshop maintain a linked list of actions for undo/redo'
    },
    {
      name: 'LRU Cache',
      description: 'Least Recently Used cache implementation using doubly linked list + hash map.',
      example: 'Operating systems use LRU caches for memory management'
    },
    {
      name: 'Memory Management',
      description: 'Free memory block tracking in operating systems.',
      example: 'Linux kernel uses linked lists to track available memory pages'
    },
    {
      name: 'Graph Representation',
      description: 'Adjacency lists for graph representations.',
      example: 'Social networks, recommendation systems use graph algorithms with adjacency lists'
    },
    {
      name: 'Polynomial Arithmetic',
      description: 'Representing polynomials as linked lists of terms.',
      example: 'Mathematical software uses linked lists for efficient polynomial operations'
    }
  ]
};
