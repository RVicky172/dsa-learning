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
  }
];

