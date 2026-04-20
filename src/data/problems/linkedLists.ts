import type { Problem } from '../../types/topic';

export const linkedListProblems: Problem[] = [
  {
    id: 'll-reorder',
    title: 'Reorder List',
    difficulty: 'Medium',
    description: 'Reorder a linked list: L0 → L1 → ... → Ln becomes L0 → Ln → L1 → Ln-1 → ...',
    examples: [
      {
        input: 'head = [1,2,3,4]',
        output: '[1,4,2,3]',
        explanation: 'Reordered as 1→4→2→3'
      }
    ],
    solution: {
      approach: 'Find middle, reverse second half, then merge two halves alternately',
      code: `function reorderList(head: ListNode | null): void {
  if (!head || !head.next) return;

  // Find middle using slow/fast pointers
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Reverse second half
  let prev = null;
  let curr = slow;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  // Merge two halves
  let first = head;
  let second = prev;
  while (second.next) {
    const tmp1 = first.next;
    const tmp2 = second.next;
    first.next = second;
    second.next = tmp1;
    first = tmp1;
    second = tmp2;
  }
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Use slow/fast pointers to find middle',
        'Reverse the second half of the list',
        'Merge the two halves alternately',
        'Update pointers during merge'
      ]
    },
    hints: [
      'Use slow and fast pointers to find middle',
      'Reverse the second half',
      'Interleave nodes from both halves'
    ]
  },
  {
    id: 'll-copy-random',
    title: 'Copy List with Random Pointer',
    difficulty: 'Medium',
    description: 'Deep copy a linked list where each node has a random pointer to any node in the list.',
    examples: [
      {
        input: 'head = [[7,null],[13,0],[11,4],[10,2],[1,0]]',
        output: '[[7,null],[13,0],[11,4],[10,2],[1,0]]',
        explanation: 'A deep copy is returned'
      }
    ],
    solution: {
      approach: 'Use a hash map to store mapping between original and copied nodes',
      code: `function copyRandomList(head: Node | null): Node | null {
  if (!head) return null;

  const map = new Map<Node, Node>();

  // First pass: create all nodes
  let curr = head;
  while (curr) {
    map.set(curr, new Node(curr.val));
    curr = curr.next;
  }

  // Second pass: set next and random pointers
  curr = head;
  while (curr) {
    const copy = map.get(curr);
    if (copy) {
      copy.next = curr.next ? map.get(curr.next) || null : null;
      copy.random = curr.random ? map.get(curr.random) || null : null;
    }
    curr = curr.next;
  }

  return map.get(head) || null;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      stepByStep: [
        'Create a hash map for node mapping',
        'First pass: create copy of each node',
        'Second pass: set next and random pointers for copies',
        'Return the copy of head'
      ]
    },
    hints: [
      'Use a hash map to track copied nodes',
      'Two passes: first to create nodes, second to set pointers',
      'Map original nodes to their copies'
    ]
  },
  {
    id: 'll-flatten',
    title: 'Flatten a Multilevel Doubly Linked List',
    difficulty: 'Medium',
    description: 'Flatten a multilevel doubly linked list with a child pointer.',
    examples: [
      {
        input: '1→2→3 with 2 having child [7→8→9]',
        output: '1→2→7→8→9→3',
        explanation: 'Child is flattened into the main list'
      }
    ],
    solution: {
      approach: 'Use DFS to traverse and flatten child nodes recursively',
      code: `function flatten(head: Node | null): Node | null {
  if (!head) return head;

  let curr = head;

  while (curr) {
    if (curr.child) {
      const next = curr.next;

      // Recursively flatten the child
      const flatChild = flatten(curr.child);
      curr.next = flatChild;
      flatChild.prev = curr;
      curr.child = null;

      // Find the tail of the flattened child
      while (curr.next) {
        curr = curr.next;
      }

      // Connect to the original next
      if (next) {
        curr.next = next;
        next.prev = curr;
      }
    }
    curr = curr.next;
  }

  return head;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h) - height of recursion',
      stepByStep: [
        'Traverse the main list',
        'When a child is found, flatten it recursively',
        'Connect flattened child to main list',
        'Update previous pointers for doubly linked list',
        'Clear child pointer after flattening'
      ]
    },
    hints: [
      'Use recursive DFS to flatten children',
      'Find the tail of flattened child',
      'Properly reconnect nodes'
    ]
  },
  {
    id: 'merge-two-sorted-lists',
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    description: 'Merge two sorted linked lists and return it as a sorted list.',
    examples: [
      {
        input: 'list1 = [1,2,4], list2 = [1,3,4]',
        output: '[1,1,2,3,4,4]'
      }
    ],
    solution: {
      approach: 'Use recursion to merge by comparing heads and recursing on the rest',
      code: `function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  if (!list1) return list2;
  if (!list2) return list1;

  if (list1.val < list2.val) {
    list1.next = mergeTwoLists(list1.next, list2);
    return list1;
  } else {
    list2.next = mergeTwoLists(list1, list2.next);
    return list2;
  }
}`,
      timeComplexity: 'O(n + m)',
      spaceComplexity: 'O(n + m) - recursion stack',
      stepByStep: [
        'Compare the heads of both lists',
        'Recurse on the remaining lists after the smaller head',
        'Attach the result to the smaller head',
        'Base case: if one list is empty, return the other'
      ]
    },
    hints: [
      'Recursive approach works well for linked lists',
      'Compare values at current nodes',
      'Merge the rest recursively'
    ]
  }
];

