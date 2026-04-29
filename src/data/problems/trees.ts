import type { Problem } from '../../types/topic';

export const treeProblems: Problem[] = [
  {
    id: 'tree-level-order',
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    description: 'Return the level-order (BFS) traversal of a binary tree.',
    examples: [
      {
        input: 'root = [3,9,20,null,null,15,7]',
        output: '[[3],[9,20],[15,7]]',
        explanation: 'Each inner array represents one level'
      }
    ],
    solution: {
      approach: 'Use BFS with a queue to traverse level by level',
      code: `function levelOrder(root: TreeNode | null): number[][] {
  const result: number[][] = [];
  if (!root) return result;

  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const level: number[] = [];
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      level.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(level);
  }

  return result;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(w) - width of tree',
      stepByStep: [
        'Initialize queue with root',
        'For each level, process all nodes currently in queue',
        'Add values to current level array',
        'Enqueue children for next level'
      ]
    },
    hints: [
      'Use BFS with queue',
      'Process one level at a time',
      'Track level size to know when level ends'
    ]
  },
  {
    id: 'tree-validate-bst',
    title: 'Validate Binary Search Tree',
    difficulty: 'Medium',
    description: 'Validate if a binary tree is a valid BST.',
    examples: [
      {
        input: 'root = [2,1,3]',
        output: 'true',
        explanation: 'Valid BST'
      }
    ],
    solution: {
      approach: 'Use DFS with min/max constraints',
      code: `function isValidBST(root: TreeNode | null): boolean {
  function validate(node: TreeNode | null, min: number, max: number): boolean {
    if (!node) return true;

    if (node.val <= min || node.val >= max) return false;

    return (
      validate(node.left, min, node.val) &&
      validate(node.right, node.val, max)
    );
  }

  return validate(root, -Infinity, Infinity);
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
      stepByStep: [
        'Use DFS with min and max bounds',
        'Check if current node is within bounds',
        'Recursively validate left and right subtrees',
        'Update bounds as we traverse'
      ]
    },
    hints: [
      'Pass min/max constraints to recursive calls',
      'Each node must be greater than left subtree nodes',
      'Each node must be less than right subtree nodes'
    ]
  },
  {
    id: 'tree-lowest-ancestor',
    title: 'Lowest Common Ancestor of BST',
    difficulty: 'Easy',
    description: 'Find the lowest common ancestor of two nodes in a BST.',
    examples: [
      {
        input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8',
        output: '6',
        explanation: '6 is LCA of 2 and 8'
      }
    ],
    solution: {
      approach: 'Use BST property to navigate toward LCA',
      code: `function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode,
  q: TreeNode
): TreeNode {
  while (root) {
    if (p.val < root.val && q.val < root.val) {
      // Both in left subtree
      root = root.left!;
    } else if (p.val > root.val && q.val > root.val) {
      // Both in right subtree
      root = root.right!;
    } else {
      // LCA found
      return root;
    }
  }

  return root!;
}`,
      timeComplexity: 'O(h)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'If both values are less than current, go left',
        'If both values are greater than current, go right',
        'Otherwise, current node is the LCA',
        'Return the LCA'
      ]
    },
    hints: [
      'Use BST property for navigation',
      'LCA is found when nodes are on different sides',
      'No recursion needed for BST'
    ]
  },
  {
    id: 'maximum-depth-binary-tree',
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    description: 'Find the maximum depth of a binary tree.',
    examples: [
      {
        input: 'root = [3,9,20,null,null,15,7]',
        output: '3'
      }
    ],
    solution: {
      approach: 'Use recursive DFS to find the maximum depth',
      code: `function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return Math.max(leftDepth, rightDepth) + 1;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h) - height of tree',
      stepByStep: [
        'Base case: null node has depth 0',
        'Recursively find depth of left and right subtrees',
        'Return the maximum of the two plus one'
      ]
    },
    hints: [
      'Depth is the number of nodes along the longest path',
      'Recursive approach works well for trees',
      'Add 1 for each level'
    ]
  },
  // ── NEW BATCH (TKT-016) ──────────────────────────────────────────
  {
    id: 'tree-symmetric-tree',
    title: 'Symmetric Tree',
    difficulty: 'Easy',
    description: 'Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).',
    examples: [
      { input: 'root = [1,2,2,3,4,4,3]', output: 'true' },
      { input: 'root = [1,2,2,null,3,null,3]', output: 'false' }
    ],
    solution: {
      approach: 'Recursive mirror check: two subtrees are mirrors if their roots are equal and each left subtree mirrors the other right subtree.',
      code: `function isSymmetric(root: TreeNode | null): boolean {
  function isMirror(left: TreeNode | null, right: TreeNode | null): boolean {
    if (!left && !right) return true;
    if (!left || !right) return false;
    return left.val === right.val &&
      isMirror(left.left, right.right) &&
      isMirror(left.right, right.left);
  }
  return isMirror(root?.left ?? null, root?.right ?? null);
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h) call stack',
      stepByStep: [
        'Compare left and right subtrees using a helper',
        'Both null → symmetric',
        'Only one null → not symmetric',
        'Values must match and left.left mirrors right.right, left.right mirrors right.left',
        'Recurse until all nodes are checked'
      ]
    },
    hints: ['Think of it as comparing two trees: the left and right subtrees.', 'The recursion compares outer and inner pairs simultaneously.']
  },
  {
    id: 'tree-invert-binary-tree',
    title: 'Invert Binary Tree',
    difficulty: 'Easy',
    description: 'Given the root of a binary tree, invert the tree and return its root.',
    examples: [
      { input: 'root = [4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]' },
      { input: 'root = [2,1,3]', output: '[2,3,1]' }
    ],
    solution: {
      approach: 'Post-order recursion: invert left and right subtrees, then swap them.',
      code: `function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null;
  const left = invertTree(root.left);
  const right = invertTree(root.right);
  root.left = right;
  root.right = left;
  return root;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
      stepByStep: [
        'Base case: return null for empty node',
        'Recursively invert left subtree',
        'Recursively invert right subtree',
        'Swap root.left and root.right',
        'Return root'
      ]
    },
    hints: ['Swap children after recursing into them (post-order).', 'Works identically with BFS using a queue.']
  },
  {
    id: 'tree-path-sum-ii',
    title: 'Path Sum II',
    difficulty: 'Medium',
    description: 'Given the root of a binary tree and an integer targetSum, return all root-to-leaf paths where the sum of node values equals targetSum.',
    examples: [
      { input: 'root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22', output: '[[5,4,11,2],[5,8,4,5]]' }
    ],
    solution: {
      approach: 'DFS with backtracking: explore each path, recording it when we reach a leaf with the target sum.',
      code: `function pathSum(root: TreeNode | null, targetSum: number): number[][] {
  const result: number[][] = [];
  function dfs(node: TreeNode | null, remaining: number, path: number[]): void {
    if (!node) return;
    path.push(node.val);
    remaining -= node.val;
    if (!node.left && !node.right && remaining === 0) {
      result.push([...path]);
    }
    dfs(node.left, remaining, path);
    dfs(node.right, remaining, path);
    path.pop(); // backtrack
  }
  dfs(root, targetSum, []);
  return result;
}`,
      timeComplexity: 'O(n²) worst case (copying paths)',
      spaceComplexity: 'O(n)',
      stepByStep: [
        'Use DFS and maintain current path and remaining sum',
        'Push current node to path and subtract its value',
        'At a leaf with remaining === 0, copy path to result',
        'Recurse on left and right children',
        'Pop the current node from path on backtrack'
      ]
    },
    hints: ['Use backtracking to avoid creating new arrays on every call.', 'Remember to copy the path when adding to results.']
  },
  {
    id: 'tree-construct-preorder-inorder',
    title: 'Construct Binary Tree from Preorder and Inorder Traversal',
    difficulty: 'Medium',
    description: 'Given two integer arrays preorder and inorder, construct and return the binary tree. preorder[0] is always the root.',
    examples: [
      { input: 'preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]', output: '[3,9,20,null,null,15,7]' }
    ],
    solution: {
      approach: 'Recursion with a hash map: use the first preorder element as root, find it in inorder to split left/right subtrees.',
      code: `function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  const indexMap = new Map<number, number>();
  inorder.forEach((val, idx) => indexMap.set(val, idx));
  let preIdx = 0;
  function build(left: number, right: number): TreeNode | null {
    if (left > right) return null;
    const rootVal = preorder[preIdx++];
    const node = new TreeNode(rootVal);
    const mid = indexMap.get(rootVal)!;
    node.left = build(left, mid - 1);
    node.right = build(mid + 1, right);
    return node;
  }
  return build(0, inorder.length - 1);
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      stepByStep: [
        'Build a map from value to inorder index for O(1) lookup',
        'The first element of preorder is the root',
        'Find the root in inorder to determine left/right subtree sizes',
        'Recurse: left subtree uses elements to the left of root in inorder',
        'Right subtree uses elements to the right'
      ]
    },
    hints: ['The root is always the first element in preorder.', 'Use a hash map to find the root position in inorder in O(1).']
  },
  {
    id: 'tree-right-side-view',
    title: 'Binary Tree Right Side View',
    difficulty: 'Medium',
    description: 'Given the root of a binary tree, imagine yourself standing on the right side of it. Return the values of the nodes you can see ordered from top to bottom.',
    examples: [
      { input: 'root = [1,2,3,null,5,null,4]', output: '[1,3,4]' },
      { input: 'root = [1,null,3]', output: '[1,3]' }
    ],
    solution: {
      approach: 'BFS level-order traversal; record the last node value at each level.',
      code: `function rightSideView(root: TreeNode | null): number[] {
  if (!root) return [];
  const result: number[] = [];
  const queue: TreeNode[] = [root];
  while (queue.length > 0) {
    const levelSize = queue.length;
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      if (i === levelSize - 1) result.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return result;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(w) where w is the max tree width',
      stepByStep: [
        'Use BFS with a queue',
        'At each level process all nodes',
        'The last node processed in each level is the rightmost visible node',
        'Add its value to result',
        'Continue until queue is empty'
      ]
    },
    hints: ['BFS gives level-by-level access naturally.', 'Only the last element of each BFS level is visible from the right.']
  },
  {
    id: 'tree-serialize-deserialize',
    title: 'Serialize and Deserialize Binary Tree',
    difficulty: 'Hard',
    description: 'Design an algorithm to serialize a binary tree to a string and deserialize that string back to the original tree structure.',
    examples: [
      { input: 'root = [1,2,3,null,null,4,5]', output: '[1,2,3,null,null,4,5]', explanation: 'Serialized then deserialized back to the same tree.' }
    ],
    solution: {
      approach: 'BFS serialization: encode level-order traversal with "null" for missing nodes. Deserialization replays BFS using a queue of parent nodes.',
      code: `function serialize(root: TreeNode | null): string {
  if (!root) return '';
  const result: string[] = [];
  const queue: (TreeNode | null)[] = [root];
  while (queue.length > 0) {
    const node = queue.shift()!;
    if (node === null) {
      result.push('null');
    } else {
      result.push(String(node.val));
      queue.push(node.left);
      queue.push(node.right);
    }
  }
  return result.join(',');
}

function deserialize(data: string): TreeNode | null {
  if (!data) return null;
  const tokens = data.split(',');
  const root = new TreeNode(Number(tokens[0]));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length > 0 && i < tokens.length) {
    const node = queue.shift()!;
    if (tokens[i] !== 'null') {
      node.left = new TreeNode(Number(tokens[i]));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(Number(tokens[i]));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      stepByStep: [
        'Serialize: BFS and append node values (or "null") to an array then join with commas',
        'Deserialize: split by comma and use BFS queue of parent nodes',
        'Pop a parent from the queue and assign its left/right from the token stream',
        'Push non-null children to the queue',
        'Continue until all tokens are consumed'
      ]
    },
    hints: ['BFS (level-order) is the most natural format for serialization.', 'During deserialization, use a queue to know which node to assign children to.']
  }
];

