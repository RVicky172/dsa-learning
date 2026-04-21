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
  },
  // ── NEW BATCH (TKT-016) ──────────────────────────────────────────
  {
    id: 'graph-valid-tree',
    title: 'Graph Valid Tree',
    difficulty: 'Easy',
    description: 'Given n nodes labeled 0 to n-1 and a list of undirected edges, determine if these edges form a valid tree. A valid tree has exactly n-1 edges and is fully connected.',
    examples: [
      { input: 'n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]', output: 'true' },
      { input: 'n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]', output: 'false', explanation: 'Contains a cycle.' }
    ],
    solution: {
      approach: 'Union-Find: a valid tree has no cycle and is connected. Check edges === n-1 then use Union-Find to detect cycles.',
      code: `function validTree(n: number, edges: number[][]): boolean {
  if (edges.length !== n - 1) return false;
  const parent = Array.from({ length: n }, (_, i) => i);
  function find(x: number): number {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }
  for (const [u, v] of edges) {
    const pu = find(u);
    const pv = find(v);
    if (pu === pv) return false; // cycle
    parent[pu] = pv;
  }
  return true;
}`,
      timeComplexity: 'O(n α(n)) ≈ O(n)',
      spaceComplexity: 'O(n)',
      stepByStep: [
        'A valid tree has exactly n-1 edges; reject immediately if not',
        'Initialise Union-Find with each node as its own parent',
        'For each edge, find the roots of both nodes',
        'If roots are the same, a cycle exists — return false',
        'Otherwise union the two components; return true'
      ]
    },
    hints: ['A tree on n nodes always has exactly n-1 edges.', 'Union-Find detects cycles efficiently.']
  },
  {
    id: 'graph-find-town-judge',
    title: 'Find the Town Judge',
    difficulty: 'Easy',
    description: 'In a town of n people, the "town judge" trusts nobody and is trusted by everybody else. Given a list of trust pairs [a,b] meaning a trusts b, return the judge\'s label or -1.',
    examples: [
      { input: 'n = 2, trust = [[1,2]]', output: '2' },
      { input: 'n = 3, trust = [[1,3],[2,3]]', output: '3' },
      { input: 'n = 3, trust = [[1,3],[2,3],[3,1]]', output: '-1' }
    ],
    solution: {
      approach: 'Net trust score: for each trust pair, decrement the truster\'s score and increment the trustee\'s score. The judge has score n-1.',
      code: `function findJudge(n: number, trust: number[][]): number {
  const score = new Array(n + 1).fill(0);
  for (const [a, b] of trust) {
    score[a]--;
    score[b]++;
  }
  for (let i = 1; i <= n; i++) {
    if (score[i] === n - 1) return i;
  }
  return -1;
}`,
      timeComplexity: 'O(n + e)',
      spaceComplexity: 'O(n)',
      stepByStep: [
        'Create a score array indexed by person (1-based)',
        'For each trust pair decrease the truster and increase the trustee',
        'The judge is trusted by everyone (score += n-1) and trusts nobody (score -= 0)',
        'Scan for the person with score === n-1',
        'Return -1 if none found'
      ]
    },
    hints: ['Net in-degree minus out-degree equals n-1 for the judge.', 'A single pass over trust pairs and one scan over scores is sufficient.']
  },
  {
    id: 'graph-course-schedule',
    title: 'Course Schedule',
    difficulty: 'Medium',
    description: 'There are numCourses courses labeled 0 to numCourses-1. Given prerequisites[i] = [a,b] meaning you must take b before a, determine if you can finish all courses (i.e., there is no cycle in the dependency graph).',
    examples: [
      { input: 'numCourses = 2, prerequisites = [[1,0]]', output: 'true' },
      { input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', output: 'false' }
    ],
    solution: {
      approach: 'Topological sort via BFS (Kahn\'s algorithm): detect cycles using in-degree counts.',
      code: `function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const inDegree = new Array(numCourses).fill(0);
  const adj: number[][] = Array.from({ length: numCourses }, () => []);
  for (const [a, b] of prerequisites) {
    adj[b].push(a);
    inDegree[a]++;
  }
  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }
  let processed = 0;
  while (queue.length > 0) {
    const course = queue.shift()!;
    processed++;
    for (const next of adj[course]) {
      inDegree[next]--;
      if (inDegree[next] === 0) queue.push(next);
    }
  }
  return processed === numCourses;
}`,
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
      stepByStep: [
        'Build adjacency list and compute in-degrees from prerequisites',
        'Enqueue all nodes with in-degree 0',
        'Process each node: decrement in-degree of its neighbours',
        'Enqueue neighbours whose in-degree reaches 0',
        'If processed count equals numCourses, no cycle exists'
      ]
    },
    hints: ['No cycle in a directed graph ↔ valid topological ordering exists.', 'Kahn\'s BFS algorithm with in-degree tracking is cleanest here.']
  },
  {
    id: 'graph-pacific-atlantic',
    title: 'Pacific Atlantic Water Flow',
    difficulty: 'Medium',
    description: 'Given an m×n matrix of non-negative heights, water can flow to adjacent cells (4-directional) with height ≤ current. Return all cells from which water can reach both the Pacific and Atlantic oceans.',
    examples: [
      { input: 'heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]', output: '[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]' }
    ],
    solution: {
      approach: 'Reverse BFS from each ocean border. A cell reachable from both oceans is in the answer.',
      code: `function pacificAtlantic(heights: number[][]): number[][] {
  const m = heights.length;
  const n = heights[0].length;
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  function bfs(starts: [number,number][]): boolean[][] {
    const visited = Array.from({ length: m }, () => new Array(n).fill(false));
    const queue = [...starts];
    for (const [r, c] of starts) visited[r][c] = true;
    while (queue.length > 0) {
      const [r, c] = queue.shift()!;
      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc] && heights[nr][nc] >= heights[r][c]) {
          visited[nr][nc] = true;
          queue.push([nr, nc]);
        }
      }
    }
    return visited;
  }
  const pacStarts: [number,number][] = [];
  const atlStarts: [number,number][] = [];
  for (let r = 0; r < m; r++) {
    pacStarts.push([r, 0]);
    atlStarts.push([r, n - 1]);
  }
  for (let c = 0; c < n; c++) {
    pacStarts.push([0, c]);
    atlStarts.push([m - 1, c]);
  }
  const pac = bfs(pacStarts);
  const atl = bfs(atlStarts);
  const result: number[][] = [];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (pac[r][c] && atl[r][c]) result.push([r, c]);
    }
  }
  return result;
}`,
      timeComplexity: 'O(m × n)',
      spaceComplexity: 'O(m × n)',
      stepByStep: [
        'BFS backwards from Pacific border cells (top row + left column)',
        'BFS backwards from Atlantic border cells (bottom row + right column)',
        'Traverse to neighbours with equal or greater height (reverse flow)',
        'A cell reachable from both BFS passes can flow to both oceans',
        'Collect and return all such cells'
      ]
    },
    hints: ['Reverse the direction: BFS from ocean borders inward.', 'A cell is valid if it appears in both Pacific-reachable and Atlantic-reachable sets.']
  },
  {
    id: 'graph-word-ladder',
    title: 'Word Ladder',
    difficulty: 'Medium',
    description: 'Given beginWord, endWord and a wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, where each adjacent pair differs by exactly one letter. Return 0 if no such sequence exists.',
    examples: [
      { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', output: '5', explanation: 'hit → hot → dot → dog → cog' }
    ],
    solution: {
      approach: 'BFS on word graph: neighbours differ by exactly one character. Use a set for O(1) word lookup.',
      code: `function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;
  const queue: [string, number][] = [[beginWord, 1]];
  const visited = new Set([beginWord]);
  while (queue.length > 0) {
    const [word, steps] = queue.shift()!;
    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) {
        const newWord = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
        if (newWord === endWord) return steps + 1;
        if (wordSet.has(newWord) && !visited.has(newWord)) {
          visited.add(newWord);
          queue.push([newWord, steps + 1]);
        }
      }
    }
  }
  return 0;
}`,
      timeComplexity: 'O(m² × n) where m = word length, n = word list size',
      spaceComplexity: 'O(m × n)',
      stepByStep: [
        'Add wordList to a Set for O(1) lookup',
        'BFS starting from beginWord with step count 1',
        'For each word try replacing each position with all 26 letters',
        'If the new word is in the set and not visited, enqueue it',
        'Return step count when endWord is reached, or 0 if BFS exhausted'
      ]
    },
    hints: ['BFS guarantees the shortest path.', 'Generate all one-letter variations rather than comparing every word pair.']
  },
  {
    id: 'graph-alien-dictionary',
    title: 'Alien Dictionary',
    difficulty: 'Hard',
    description: 'Given a list of words sorted lexicographically in an alien language, derive the order of characters in that language. Return any valid order, or "" if the ordering is impossible.',
    examples: [
      { input: 'words = ["wrt","wrf","er","ett","rftt"]', output: '"wertf"' },
      { input: 'words = ["z","x","z"]', output: '""', explanation: 'Contradiction detected.' }
    ],
    solution: {
      approach: 'Topological sort: compare adjacent words to derive edges (character ordering constraints), then run Kahn\'s BFS.',
      code: `function alienOrder(words: string[]): string {
  const adj = new Map<string, Set<string>>();
  const inDegree = new Map<string, number>();
  for (const word of words) {
    for (const ch of word) {
      if (!adj.has(ch)) adj.set(ch, new Set());
      if (!inDegree.has(ch)) inDegree.set(ch, 0);
    }
  }
  for (let i = 0; i < words.length - 1; i++) {
    const w1 = words[i];
    const w2 = words[i + 1];
    if (w1.length > w2.length && w1.startsWith(w2)) return '';
    for (let j = 0; j < Math.min(w1.length, w2.length); j++) {
      if (w1[j] !== w2[j]) {
        if (!adj.get(w1[j])!.has(w2[j])) {
          adj.get(w1[j])!.add(w2[j]);
          inDegree.set(w2[j], (inDegree.get(w2[j]) ?? 0) + 1);
        }
        break;
      }
    }
  }
  const queue: string[] = [];
  for (const [ch, deg] of inDegree) {
    if (deg === 0) queue.push(ch);
  }
  let order = '';
  while (queue.length > 0) {
    const ch = queue.shift()!;
    order += ch;
    for (const next of adj.get(ch)!) {
      inDegree.set(next, inDegree.get(next)! - 1);
      if (inDegree.get(next) === 0) queue.push(next);
    }
  }
  return order.length === inDegree.size ? order : '';
}`,
      timeComplexity: 'O(C) where C = total characters across all words',
      spaceComplexity: 'O(1) bounded by alphabet size',
      stepByStep: [
        'Collect all unique characters and initialise in-degree map',
        'Compare adjacent word pairs character by character to extract ordering edges',
        'Detect invalid input: longer word prefix of shorter next word',
        'Run Kahn\'s BFS topological sort',
        'If output length < number of unique chars, a cycle exists — return ""'
      ]
    },
    hints: ['Compare consecutive words to extract character order constraints.', 'Topological sort detects if the derived graph has a cycle (contradiction).']
  }
];
