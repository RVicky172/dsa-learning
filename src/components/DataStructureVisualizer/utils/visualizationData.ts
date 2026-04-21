export const getExampleData = () => ({
  'array': {
    data: [4, 2, 7, 1, 9, 5],
    description: 'Array search and manipulation',
    steps: ['Start', 'Check index 0', 'Check index 1', 'Check index 2', 'Check index 3', 'Found!']
  },
  'array-search': {
    data: [4, 2, 7, 1, 9, 5],
    description: 'Linear search in array',
    steps: ['Start', 'Check 4', 'Check 2', 'Check 7', 'Check 1', 'Check 9', 'Found 5']
  },
  'array-binary-search': {
    data: [1, 2, 4, 5, 7, 9],
    description: 'Binary search (requires sorted array)',
    steps: ['Start', 'Mid = 4', 'Left half', 'Mid = 2', 'Right half', 'Found!']
  },
  'linked-list-insert': {
    data: [1, 2, 3],
    description: 'Insert node into linked list',
    steps: ['Start', 'Find position', 'Create node', 'Link previous', 'Link next', 'Complete']
  },
  'stack-operations': {
    data: [1, 2, 3, 4, 5],
    description: 'Stack LIFO operations',
    steps: ['Initial', 'Push 1', 'Push 2', 'Push 3', 'Pop 3', 'Pop 2', 'Complete']
  },
  'queue-operations': {
    data: [1, 2, 3, 4, 5],
    description: 'Queue FIFO operations',
    steps: ['Initial', 'Enqueue 1', 'Enqueue 2', 'Enqueue 3', 'Dequeue 1', 'Dequeue 2', 'Complete']
  },
  'heap-insert': {
    data: [10, 8, 9, 4, 5, 3, 2],
    description: 'Max heap insertion',
    steps: ['Initial heap', 'Insert 11', 'Bubble up', 'Swap parent', 'Heap property satisfied']
  },
  'hash-insert': {
    data: ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'],
    description: 'Hash table insertion with chaining',
    steps: ['Insert Alice', 'Insert Bob', 'Insert Charlie', 'Insert Diana', 'Insert Eve', 'Complete']
  },
  'binary-tree-inorder': {
    data: [],
    description: 'In-order traversal (Left, Root, Right)',
    steps: ['Start', 'Visit 3', 'Visit 5', 'Visit 7', 'Visit 10', 'Visit 12', 'Visit 15', 'Visit 18']
  },
  'graph-bfs': {
    data: [],
    description: 'Breadth-first search traversal',
    steps: ['Start at A', 'Queue: A', 'Visit A, Add B,C', 'Queue: B,C', 'Visit B, Add D,E', 'Queue: C,D,E', 'Visit C, Add F', 'Complete']
  },
  'sorting': {
    data: [64, 34, 25, 12, 22, 11, 90],
    description: 'Array sorting visualization',
    steps: ['Start', 'Pass 1', 'Pass 2', 'Pass 3', 'Pass 4', 'Pass 5', 'Sorted']
  },
  'two-pointer': {
    data: [1, 2, 3, 4, 5, 6, 7],
    description: 'Two pointer technique for target sum',
    steps: ['Start', 'Left=0, Right=6', 'Sum too large', 'Move right', 'Sum too small', 'Move left', 'Found pair']
  }
});
