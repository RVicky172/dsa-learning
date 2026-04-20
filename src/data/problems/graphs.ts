import type { Problem } from '../../types/topic';

export const graphProblems: Problem[] = [
  {
    id: 'graph-clone',
    title: 'Clone Graph',
    difficulty: 'Medium',
    description: 'Create a deep copy of an undirected graph.',
    examples: [
      {
        input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]',
        output: 'Deep copy of the graph'
      }
    ],
    solution: {
      approach: 'Use DFS with a map to track visited nodes and their copies',
      code: `function cloneGraph(node: Node | null): Node | null {
  if (!node) return null;

  const visited = new Map<Node, Node>();

  function dfs(node: Node): Node {
    if (visited.has(node)) {
      return visited.get(node)!;
    }

    const copy = new Node(node.val);
    visited.set(node, copy);

    for (const neighbor of node.neighbors) {
      copy.neighbors.push(dfs(neighbor));
    }

    return copy;
  }

  return dfs(node);
}`,
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      stepByStep: [
        'Create a copy of current node',
        'Mark as visited with mapping',
        'Recursively clone all neighbors',
        'Connect cloned neighbors to copy',
        'Return the cloned graph'
      ]
    },
    hints: [
      'Use DFS to traverse graph',
      'Map original nodes to copies',
      'Handle cycles with visited map'
    ]
  },
  {
    id: 'number-of-islands',
    title: 'Number of Islands',
    difficulty: 'Medium',
    description: 'Given a 2D grid of 1s (land) and 0s (water), count the number of islands.',
    examples: [
      {
        input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
        output: '1'
      }
    ],
    solution: {
      approach: 'Use DFS to mark all connected land cells as visited',
      code: `function numIslands(grid: string[][]): number {
  if (!grid || grid.length === 0) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  const dfs = (i: number, j: number) => {
    if (i < 0 || i >= rows || j < 0 || j >= cols || grid[i][j] === '0') return;
    grid[i][j] = '0'; // mark as visited
    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  };

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === '1') {
        count++;
        dfs(i, j);
      }
    }
  }

  return count;
}`,
      timeComplexity: 'O(m * n)',
      spaceComplexity: 'O(m * n) - worst case recursion',
      stepByStep: [
        'Iterate through each cell in the grid',
        'When land (1) is found, increment count and DFS',
        'DFS marks all connected land as visited (0)',
        'Continue until all cells are processed'
      ]
    },
    hints: [
      'DFS or BFS can be used to explore islands',
      'Mark visited cells to avoid recounting',
      'Count each new land cell that starts a new island'
    ]
  }
];
