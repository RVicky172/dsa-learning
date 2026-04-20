import type { Topic } from '../../types/topic';
import React from 'react';
import { TreePalm } from 'lucide-react';
import { treeProblems } from '../problems/trees';

export const treesTopic: Topic = {
  id: 'trees',
  title: 'Trees',
  description: 'Hierarchical data structures for efficient searching and organizing.',
  complexity: 'O(log n) Average',
  icon: React.createElement(TreePalm, { size: 24 }),
  delay: 0.4,

  introduction: `Trees are one of the most important non-linear data structures in computer science. A tree is a hierarchical collection of nodes connected by edges, with one special node called the root. Unlike linear data structures like arrays and linked lists, trees enable representing hierarchical relationships between data elements.

At its core, a tree is defined recursively: a tree is either empty, or it consists of a root node and zero or more subtrees. This recursive definition makes tree algorithms naturally recursive.

Trees come in various forms: general trees, binary trees, binary search trees, balanced trees (AVL, Red-Black), heaps, and tries. Each type has specific properties and use cases optimized for particular problems.

## Key Properties

1. **Hierarchical Structure**: Data is organized in levels with parent-child relationships
2. **Root Node**: The topmost node from which all other nodes descend
3. **Leaf Nodes**: Nodes with no children
4. **Edges**: Connections between parent and child nodes
5. **Subtree**: Any node with its descendants forms a subtree
6. **Height**: Length of the longest path from node to leaf
7. **Depth**: Distance from root to node

## Binary Trees

A binary tree is a special tree where each node has at most two children (left and right). This restriction enables more efficient algorithms and is fundamental to many data structures.

## Tree Traversals

Different ways to visit all nodes:
- **Inorder**: Left, Root, Right (gives sorted order in BST)
- **Preorder**: Root, Left, Right (good for copying tree)
- **Postorder**: Left, Right, Root (good for deletion)
- **Level-order**: Visit by levels (breadth-first)

## Balanced vs Unbalanced

An unbalanced tree can degenerate into a linked list (O(n) search), while balanced trees maintain O(log n) height, guaranteeing efficient operations.`,

  whyImportant: `Trees are fundamental to computer science and appear everywhere: file systems, database indexes, DOM in browsers, compiler ASTs, AI decision trees, and countless algorithms. Understanding trees deeply is essential for interviews and real-world system design.`,

  whenToUse: [
    'When you need to represent hierarchical data',
    'For efficient searching with sorted data (Binary Search Trees)',
    'For priority-based operations (Heaps)',
    'For autocomplete and prefix matching (Tries)',
    'When you need to maintain sorted order while allowing insertions/deletions',
    'For representing parse trees and syntax trees in compilers',
    'For file system organization'
  ],

  advantages: [
    'O(log n) average time for search, insert, delete in balanced trees',
    'Efficient for representing hierarchical relationships',
    'Natural recursive structure simplifies algorithms',
    'Can maintain sorted order dynamically',
    'Flexible for various problem types',
    'Better than arrays for frequent insertions/deletions with ordering',
    'Enables algorithms like heap sort with guaranteed O(n log n)'
  ],

  disadvantages: [
    'Can degenerate to O(n) if unbalanced (like linked list)',
    'More complex implementation than arrays',
    'Requires more memory per node (pointers)',
    'Not cache-friendly due to scattered memory',
    'Balancing logic can be complex (AVL, Red-Black)',
    'Cannot efficiently access elements by index',
    'Tree traversal requires recursion or explicit stack'
  ],

  concepts: [
    {
      name: 'Binary Search Tree (BST)',
      description: 'A binary tree where left child < parent < right child. Enables O(log n) search when balanced.'
    },
    {
      name: 'Balanced Trees',
      description: 'Trees where the height is O(log n) where n is number of nodes. AVL and Red-Black trees self-balance.'
    },
    {
      name: 'Heap',
      description: 'A complete binary tree satisfying heap property: parent >= all children (max heap) or parent <= all children (min heap).'
    },
    {
      name: 'Tree Traversal',
      description: 'Systematic ways to visit all nodes: Inorder, Preorder, Postorder (DFS) or Level-order (BFS). Each has specific applications.'
    },
    {
      name: 'Trie (Prefix Tree)',
      description: 'A tree designed for efficient prefix searching. Each node represents a character. Used for autocomplete and spell checking.'
    },
    {
      name: 'Segment Tree & Fenwick Tree',
      description: 'Advanced tree structures for range queries and updates. Enable O(log n) query times on arrays.'
    },
    {
      name: 'Tree Recursion',
      description: 'Many tree problems naturally decompose into smaller subproblems, making recursion the natural solution approach.'
    }
  ],

  examples: [
    {
      title: 'Binary Tree Node and Basic Operations',
      language: 'typescript',
      code: `// Binary Tree Node
class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;
  
  constructor(value: T) {
    this.value = value;
  }
}

// Tree traversals
function inorderTraversal(root: TreeNode<number> | null, result: number[] = []): number[] {
  if (root) {
    inorderTraversal(root.left, result);
    result.push(root.value);
    inorderTraversal(root.right, result);
  }
  return result;
}

function preorderTraversal(root: TreeNode<number> | null, result: number[] = []): number[] {
  if (root) {
    result.push(root.value);
    preorderTraversal(root.left, result);
    preorderTraversal(root.right, result);
  }
  return result;
}

function postorderTraversal(root: TreeNode<number> | null, result: number[] = []): number[] {
  if (root) {
    postorderTraversal(root.left, result);
    postorderTraversal(root.right, result);
    result.push(root.value);
  }
  return result;
}

// Level-order traversal (BFS)
function levelOrderTraversal(root: TreeNode<number> | null): number[][] {
  if (!root) return [];
  
  const result: number[][] = [];
  const queue: TreeNode<number>[] = [root];
  
  while (queue.length > 0) {
    const levelSize = queue.length;
    const levelValues: number[] = [];
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      levelValues.push(node.value);
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    result.push(levelValues);
  }
  
  return result;
}

// Example tree:    1
//                /   \\
//               2     3
//              / \\
//             4   5

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

console.log('Inorder:', inorderTraversal(root));      // [4, 2, 5, 1, 3]
console.log('Preorder:', preorderTraversal(root));    // [1, 2, 4, 5, 3]
console.log('Postorder:', postorderTraversal(root));  // [4, 5, 2, 3, 1]
console.log('Level-order:', levelOrderTraversal(root)); // [[1], [2, 3], [4, 5]]`,
      explanation: 'These fundamental traversal methods visit all nodes in different orders. Inorder of BST gives sorted sequence. Preorder and postorder are useful for different applications. Level-order uses BFS.',
      timeComplexity: 'O(n) for all traversals - visit each node once',
      spaceComplexity: 'O(h) for recursion stack (h = height)'
    },
    {
      title: 'Binary Search Tree Operations',
      language: 'typescript',
      code: `class BinarySearchTree {
  root: TreeNode<number> | null = null;
  
  // Insert value into BST - O(log n) average, O(n) worst case
  insert(value: number): void {
    if (this.root === null) {
      this.root = new TreeNode(value);
    } else {
      this._insertRecursive(this.root, value);
    }
  }
  
  private _insertRecursive(node: TreeNode<number>, value: number): void {
    if (value < node.value) {
      if (node.left === null) {
        node.left = new TreeNode(value);
      } else {
        this._insertRecursive(node.left, value);
      }
    } else if (value > node.value) {
      if (node.right === null) {
        node.right = new TreeNode(value);
      } else {
        this._insertRecursive(node.right, value);
      }
    }
    // Ignore duplicates
  }
  
  // Search for value - O(log n) average, O(n) worst case
  search(value: number): boolean {
    return this._searchRecursive(this.root, value);
  }
  
  private _searchRecursive(node: TreeNode<number> | null, value: number): boolean {
    if (node === null) return false;
    
    if (value === node.value) return true;
    if (value < node.value) return this._searchRecursive(node.left, value);
    return this._searchRecursive(node.right, value);
  }
  
  // Find minimum value in tree
  findMin(node: TreeNode<number> = this.root!): number {
    while (node.left !== null) {
      node = node.left;
    }
    return node.value;
  }
  
  // Find maximum value in tree
  findMax(node: TreeNode<number> = this.root!): number {
    while (node.right !== null) {
      node = node.right;
    }
    return node.value;
  }
}

// Usage
const bst = new BinarySearchTree();
[5, 3, 7, 2, 4, 6, 8].forEach(val => bst.insert(val));
console.log(bst.search(4));    // true
console.log(bst.search(9));    // false
console.log(bst.findMin());    // 2
console.log(bst.findMax());    // 8`,
      explanation: 'BST maintains left < parent < right property. This enables binary search. However, unbalanced trees degrade to O(n). This is why balanced BSTs (AVL, Red-Black) are important.',
      timeComplexity: 'O(log n) average for balanced tree, O(n) worst case for unbalanced',
      spaceComplexity: 'O(1) for insert/search, O(h) for recursion stack'
    },
    {
      title: 'Tree Height and Depth',
      language: 'typescript',
      code: `// Calculate height of tree
function height(root: TreeNode<number> | null): number {
  if (root === null) return -1;
  return 1 + Math.max(height(root.left), height(root.right));
}

// Calculate depth of specific node
function depth(root: TreeNode<number> | null, node: TreeNode<number> | null, d: number = 0): number {
  if (root === null) return -1;
  
  if (root === node) return d;
  
  const leftDepth = depth(root.left, node, d + 1);
  if (leftDepth !== -1) return leftDepth;
  
  return depth(root.right, node, d + 1);
}

// Check if tree is balanced
function isBalanced(root: TreeNode<number> | null): boolean {
  if (root === null) return true;
  
  const leftHeight = height(root.left);
  const rightHeight = height(root.right);
  
  if (Math.abs(leftHeight - rightHeight) > 1) return false;
  
  return isBalanced(root.left) && isBalanced(root.right);
}

// Find diameter (longest path between any two nodes)
function diameter(root: TreeNode<number> | null): number {
  if (root === null) return 0;
  
  const leftHeight = height(root.left);
  const rightHeight = height(root.right);
  
  const leftDiameter = diameter(root.left);
  const rightDiameter = diameter(root.right);
  
  return Math.max(
    leftHeight + rightHeight + 2,  // Path through root
    leftDiameter,                   // Largest in left subtree
    rightDiameter                   // Largest in right subtree
  );
}`,
      explanation: 'Height, balance, and diameter are important tree properties. A balanced tree has height O(log n) and enables O(log n) operations. The diameter is the longest path in the tree.',
      timeComplexity: 'Height: O(n), isBalanced: O(n log n) or O(n), Diameter: O(n²) naive',
      spaceComplexity: 'O(h) for recursion stack'
    },
    {
      title: 'Lowest Common Ancestor (LCA)',
      language: 'typescript',
      code: `// Find LCA in BST - efficient due to BST property
function findLCAinBST(root: TreeNode<number> | null, p: number, q: number): TreeNode<number> | null {
  if (root === null) return null;
  
  // Both p and q are in left subtree
  if (p < root.value && q < root.value) {
    return findLCAinBST(root.left, p, q);
  }
  
  // Both p and q are in right subtree
  if (p > root.value && q > root.value) {
    return findLCAinBST(root.right, p, q);
  }
  
  // p and q are on different sides, or one is root
  return root;
}

// Find LCA in general binary tree
function findLCAinBT(root: TreeNode<number> | null, p: TreeNode<number> | null, q: TreeNode<number> | null): TreeNode<number> | null {
  if (root === null || root === p || root === q) {
    return root;
  }
  
  const leftLCA = findLCAinBT(root.left, p, q);
  const rightLCA = findLCAinBT(root.right, p, q);
  
  // If both found in different subtrees, root is LCA
  if (leftLCA && rightLCA) return root;
  
  // If both found in same subtree, that subtree's LCA
  return leftLCA ? leftLCA : rightLCA;
}

// Example
//        3
//       / \\
//      5   1
//     / \\
//    6   2
// LCA(5, 1) = 3
// LCA(5, 2) = 5`,
      explanation: 'LCA is the deepest node that is ancestor of both nodes. In BST we can use the ordering property. In general trees we need to check both subtrees.',
      timeComplexity: 'BST: O(log n) average, General: O(n)',
      spaceComplexity: 'O(h) for recursion stack'
    }
  ],

  patterns: [
    {
      name: 'DFS (Depth-First Search)',
      description: 'Explore as far as possible along each branch before backtracking. Uses recursion or explicit stack.',
      technique: 'Recursively visit node, then all nodes in left subtree, then all in right subtree. Three orders: inorder, preorder, postorder.',
      example: 'Tree traversal, path finding, topological sorting',
      whenToUse: [
        'Tree traversal',
        'Finding paths in tree',
        'Checking tree properties',
        'Evaluating expressions'
      ]
    },
    {
      name: 'BFS (Breadth-First Search)',
      description: 'Explore level by level, visiting all nodes at depth k before depth k+1.',
      technique: 'Use queue to process nodes level by level. Dequeue a node, process it, enqueue its children.',
      example: 'Level-order traversal, shortest path, nearest neighbor',
      whenToUse: [
        'Level-order traversal',
        'Finding shortest path',
        'Exploring neighbors first',
        'Minimum steps problems'
      ]
    },
    {
      name: 'Recursion on Trees',
      description: 'Leverage tree structure for recursive solutions: solve for current node based on subproblems.',
      technique: 'Solve recursively for left subtree, right subtree, then combine results at root.',
      example: 'Sum, height, balance, diameter, path sum',
      whenToUse: [
        'Computing properties of subtrees',
        'Combining results bottom-up',
        'Natural for tree structure',
        'When subproblems are same type'
      ]
    },
    {
      name: 'Backtracking in Trees',
      description: 'Explore all paths and undo choices to explore other branches.',
      technique: 'Go down path, backtrack when dead-end, try next branch.',
      example: 'Path from root to leaf, all paths, N-Queens on tree variant',
      whenToUse: [
        'Finding all paths',
        'Constraint satisfaction',
        'Exploring all possibilities',
        'Puzzles and games'
      ]
    }
  ],

  problems: [
    ...treeProblems
  ],

  operations: [
    { name: 'Search', complexity: 'O(log n) avg, O(n) worst' },
    { name: 'Insert', complexity: 'O(log n) avg, O(n) worst' },
    { name: 'Delete', complexity: 'O(log n) avg, O(n) worst' },
    { name: 'Traversal (Inorder)', complexity: 'O(n)' },
    { name: 'Find Min/Max', complexity: 'O(log n) avg, O(n) worst' },
    { name: 'Find Height', complexity: 'O(n)' },
    { name: 'Find LCA', complexity: 'O(log n) avg BST, O(n) general' }
  ],

  applications: [
    {
      name: 'File Systems',
      description: 'Directory structure with files and folders as tree nodes.',
      example: 'Windows Explorer, Mac Finder represent file systems as trees'
    },
    {
      name: 'Database Indexing',
      description: 'B-Trees and B+ Trees are fundamental to database index structures.',
      example: 'Every SQL database uses tree structures for efficient data retrieval'
    },
    {
      name: 'DOM in Web Browsers',
      description: 'HTML document structure represented as tree.',
      example: 'Browser renders DOM tree to display web pages'
    },
    {
      name: 'Compiler Design',
      description: 'Abstract Syntax Trees (AST) represent program structure.',
      example: 'Compilers parse code into trees for analysis and optimization'
    },
    {
      name: 'AI and Machine Learning',
      description: 'Decision trees for classification and regression.',
      example: 'Random forests and gradient boosting use tree ensembles'
    },
    {
      name: 'Autocomplete and Spell Checking',
      description: 'Tries (prefix trees) enable efficient prefix matching.',
      example: 'Google search autocomplete uses tries for instant suggestions'
    },
    {
      name: 'Priority Queues',
      description: 'Heaps (special trees) implement priority-based operations.',
      example: 'Heap sort, Dijkstra\'s algorithm, and priority queues in systems'
    }
  ]
};
