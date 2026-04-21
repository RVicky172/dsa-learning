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
  },
  // ── NEW BATCH (TKT-016) ──────────────────────────────────────────
  {
    id: 'll-reverse-linked-list',
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    description: 'Given the head of a singly linked list, reverse the list and return the reversed list.',
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' },
      { input: 'head = [1,2]', output: '[2,1]' }
    ],
    solution: {
      approach: 'Iterative: maintain prev and curr pointers, re-link each node backward.',
      code: `function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr = head;
  while (curr !== null) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Initialise prev = null, curr = head',
        'Save curr.next in a temp variable',
        'Point curr.next to prev (reverse the link)',
        'Advance prev to curr and curr to saved next',
        'Return prev when curr is null'
      ]
    },
    hints: ['Save the next pointer before overwriting it.', 'Recursive solution: reverseList(head.next) then head.next.next = head; head.next = null.']
  },
  {
    id: 'll-middle-of-list',
    title: 'Middle of the Linked List',
    difficulty: 'Easy',
    description: 'Given the head of a singly linked list, return the middle node. If there are two middle nodes, return the second middle node.',
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[3,4,5]', explanation: 'The middle node is node 3.' },
      { input: 'head = [1,2,3,4,5,6]', output: '[4,5,6]', explanation: 'The second of the two middle nodes is node 4.' }
    ],
    solution: {
      approach: 'Fast and slow pointer: slow moves one step, fast moves two steps. When fast reaches the end, slow is at the middle.',
      code: `function middleNode(head: ListNode | null): ListNode | null {
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;
  }
  return slow;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Initialise both slow and fast to head',
        'Advance slow by 1 and fast by 2 each iteration',
        'When fast is null or fast.next is null, slow is at the middle',
        'Return slow'
      ]
    },
    hints: ['Two-pointer technique: fast pointer moves twice as fast as slow.', 'No need to count the total number of nodes.']
  },
  {
    id: 'll-linked-list-cycle-ii',
    title: 'Linked List Cycle II',
    difficulty: 'Medium',
    description: 'Given the head of a linked list, return the node where the cycle begins, or null if there is no cycle.',
    examples: [
      { input: 'head = [3,2,0,-4], pos = 1', output: 'node with val 2', explanation: 'Tail connects back to index 1.' },
      { input: 'head = [1], pos = -1', output: 'null' }
    ],
    solution: {
      approach: "Floyd's cycle detection: detect cycle with fast/slow pointers, then reset one pointer to head and advance both at the same speed until they meet at the cycle start.",
      code: `function detectCycle(head: ListNode | null): ListNode | null {
  let slow = head;
  let fast = head;
  // Phase 1: detect cycle
  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;
    if (slow === fast) break;
  }
  if (!fast || !fast.next) return null;
  // Phase 2: find entry
  slow = head;
  while (slow !== fast) {
    slow = slow!.next;
    fast = fast!.next;
  }
  return slow;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Run fast/slow pointer cycle detection',
        'If fast or fast.next is null, no cycle',
        'After meeting, reset slow to head',
        'Advance both slow and fast one step at a time',
        'They meet at the cycle entry node'
      ]
    },
    hints: ["Floyd's algorithm: cycle detection in phase 1, entry finding in phase 2.", 'The math guarantees meeting at the cycle start after resetting slow to head.']
  },
  {
    id: 'll-remove-nth-from-end',
    title: 'Remove Nth Node From End of List',
    difficulty: 'Medium',
    description: 'Given the head of a linked list, remove the nth node from the end of the list and return its head. Solve in one pass.',
    examples: [
      { input: 'head = [1,2,3,4,5], n = 2', output: '[1,2,3,5]' },
      { input: 'head = [1], n = 1', output: '[]' }
    ],
    solution: {
      approach: 'Two-pointer with a dummy head: advance the fast pointer n+1 steps ahead, then move both until fast is null.',
      code: `function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  const dummy = new ListNode(0, head);
  let fast: ListNode | null = dummy;
  let slow: ListNode | null = dummy;
  for (let i = 0; i <= n; i++) {
    fast = fast!.next;
  }
  while (fast !== null) {
    fast = fast.next;
    slow = slow!.next;
  }
  slow!.next = slow!.next!.next;
  return dummy.next;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Create a dummy node pointing to head to handle edge cases',
        'Move fast pointer n+1 steps from dummy',
        'Move both fast and slow until fast is null',
        'slow.next is the node to remove; skip it',
        'Return dummy.next'
      ]
    },
    hints: ['A dummy head simplifies edge cases (removing the first node).', 'Gap of n+1 between pointers means slow lands one before the target.']
  },
  {
    id: 'll-palindrome-linked-list',
    title: 'Palindrome Linked List',
    difficulty: 'Medium',
    description: 'Given the head of a singly linked list, return true if it is a palindrome or false otherwise. Solve in O(n) time and O(1) space.',
    examples: [
      { input: 'head = [1,2,2,1]', output: 'true' },
      { input: 'head = [1,2]', output: 'false' }
    ],
    solution: {
      approach: 'Find middle with slow/fast pointer, reverse second half, compare both halves.',
      code: `function isPalindrome(head: ListNode | null): boolean {
  // Find middle
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
  }
  // Reverse second half
  let prev: ListNode | null = null;
  let curr = slow;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  // Compare
  let left = head;
  let right = prev;
  while (right) {
    if (left!.val !== right.val) return false;
    left = left!.next;
    right = right.next;
  }
  return true;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Use slow/fast pointer to find the middle of the list',
        'Reverse the second half starting from slow',
        'Compare the first half and the reversed second half node by node',
        'Return false on first mismatch, true if all match'
      ]
    },
    hints: ['Two phases: find middle, then reverse and compare.', 'Optionally restore the list after comparison.']
  },
  {
    id: 'll-reverse-nodes-k-group',
    title: 'Reverse Nodes in k-Group',
    difficulty: 'Hard',
    description: 'Given the head of a linked list, reverse the nodes of the list k at a time and return the modified list. If the remaining nodes are fewer than k, leave them as-is.',
    examples: [
      { input: 'head = [1,2,3,4,5], k = 2', output: '[2,1,4,3,5]' },
      { input: 'head = [1,2,3,4,5], k = 3', output: '[3,2,1,4,5]' }
    ],
    solution: {
      approach: 'Check if k nodes remain, reverse that group, recursively handle the rest.',
      code: `function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  let count = 0;
  let node = head;
  while (node && count < k) {
    node = node.next;
    count++;
  }
  if (count < k) return head; // fewer than k nodes remain
  // Reverse k nodes
  let prev: ListNode | null = null;
  let curr = head;
  for (let i = 0; i < k; i++) {
    const next = curr!.next;
    curr!.next = prev;
    prev = curr;
    curr = next;
  }
  // head is now the tail of the reversed group
  head!.next = reverseKGroup(curr, k);
  return prev;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n/k) call stack',
      stepByStep: [
        'Count k nodes ahead; if fewer remain, return head unchanged',
        'Reverse k nodes iteratively, tracking prev and curr',
        'After reversal, original head is the tail of the reversed group',
        'Recursively reverse the rest and attach to head.next',
        'Return prev (new head of reversed group)'
      ]
    },
    hints: ['Check you have k nodes before reversing.', 'The original head becomes the tail after reversing — connect it to the recursion result.']
  }
];

