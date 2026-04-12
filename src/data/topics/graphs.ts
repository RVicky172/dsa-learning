import type { Topic } from '../../types/topic';
import React from 'react';
import { Network } from 'lucide-react';
import { graphProblems } from '../newProblems';

export const graphsTopic: Topic = {
  id: 'graphs',
  title: 'Graphs',
  description: 'Complex networks for modeling relationships and connections.',
  complexity: 'O(V + E)',
  icon: React.createElement(Network, { size: 24 }),
  delay: 0.5,

  introduction: `A graph is an abstract data type that consists of a finite set of vertices (also called nodes) and edges (also called arcs) that connect pairs of vertices. Unlike trees which have hierarchical relationships with a single root, graphs allow arbitrary connections between nodes, enabling more complex relationship modeling.

Graphs are fundamental to computer science and real-world problem modeling. They appear everywhere: social networks (nodes are people, edges are friendships), computer networks (nodes are computers, edges are connections), maps (nodes are cities, edges are roads), and much more.

## Types of Graphs

1. **Directed vs Undirected**: Edges have direction or not
2. **Weighted vs Unweighted**: Edges carry values or not
3. **Cyclic vs Acyclic**: Contain cycles or not
4. **Connected vs Disconnected**: All nodes reachable from each other

## Representations

- **Adjacency Matrix**: 2D array showing connections (good for dense graphs)
- **Adjacency List**: Map of node to neighbors (good for sparse graphs)
- **Edge List**: List of all edges (simple but inefficient for queries)

## Graph Algorithms

The main categories:
- **Traversal**: DFS, BFS - visiting all nodes systematically
- **Shortest Path**: Dijkstra, Bellman-Ford - finding optimal routes
- **Minimum Spanning Tree**: Kruskal, Prim - connecting all nodes with minimum weight
- **Topological Sort**: For directed acyclic graphs
- **Cycle Detection**: Finding if graph has cycles

## Complexity Analysis

- DFS/BFS: O(V + E) where V = vertices, E = edges
- Dijkstra: O((V + E) log V) with min-heap
- Kruskal: O(E log E) for sorting edges
- Floyd-Warshall: O(V³) - all-pairs shortest path`,

  whyImportant: `Graphs model many real-world problems beautifully. Understanding graph algorithms is crucial for system design, recommendation systems, routing, network analysis, and countless applications. Most complex systems can be modeled as graphs, making this knowledge essential for senior engineers.`,

  whenToUse: [
    'Modeling networks and relationships',
    'Finding shortest paths between locations',
    'Social network analysis and connections',
    'Computer network routing',
    'Recommendation systems and similar items',
    'Task scheduling with dependencies',
    'Game state space exploration',
    'Compiler dependency analysis'
  ],

  advantages: [
    'Flexible representation of complex relationships',
    'Can model any binary relationship',
    'Rich set of well-studied algorithms',
    'Can represent hierarchies (trees are special graphs)',
    'Efficient algorithms for many problems (Dijkstra, etc.)',
    'Natural fit for many real-world problems',
    'Can find cycles, paths, and connected components'
  ],

  disadvantages: [
    'Can have O(V²) or O(V × E) space complexity',
    'Complex implementation compared to simpler structures',
    'Some problems are NP-hard (TSP, Hamiltonian cycle)',
    'Algorithms can have high time complexity',
    'Visual representation becomes complex for large graphs',
    'Choosing right representation (matrix vs list) matters',
    'Must handle edge cases (cycles, disconnected components)'
  ],

  concepts: [
    {
      name: 'Adjacency Matrix',
      description: '2D array where matrix[i][j] = weight of edge from i to j. Good for dense graphs and checking if edge exists (O(1)).'
    },
    {
      name: 'Adjacency List',
      description: 'Map/array where each node stores list of neighbors. More memory efficient for sparse graphs.'
    },
    {
      name: 'Depth-First Search (DFS)',
      description: 'Traverse graph by exploring as far as possible before backtracking. Uses stack or recursion.'
    },
    {
      name: 'Breadth-First Search (BFS)',
      description: 'Traverse graph level by level. Uses queue. Guarantees shortest path in unweighted graphs.'
    },
    {
      name: 'Shortest Path Algorithms',
      description: 'Dijkstra (non-negative weights), Bellman-Ford (negative weights allowed), BFS (unweighted).'
    },
    {
      name: 'Minimum Spanning Tree',
      description: 'Subset of edges connecting all vertices with minimum total weight. Kruskal and Prim algorithms.'
    },
    {
      name: 'Topological Sorting',
      description: 'Linear ordering of vertices in a DAG where every edge u→v has u before v. Used for task scheduling.'
    },
    {
      name: 'Union-Find (Disjoint Set)',
      description: 'Data structure for efficient cycle detection and connected component finding.'
    }
  ],

  examples: [
    {
      title: 'Graph Representation and DFS',
      language: 'typescript',
      code: `// Graph represented as adjacency list
class Graph {
  private adjacencyList: Map<number, number[]> = new Map();
  
  // Add edge to undirected graph
  addEdge(u: number, v: number): void {
    if (!this.adjacencyList.has(u)) {
      this.adjacencyList.set(u, []);
    }
    if (!this.adjacencyList.has(v)) {
      this.adjacencyList.set(v, []);
    }
    
    this.adjacencyList.get(u)!.push(v);
    this.adjacencyList.get(v)!.push(u); // For undirected graph
  }
  
  // Depth-First Search - O(V + E)
  dfs(start: number, visited: Set<number> = new Set(), result: number[] = []): number[] {
    visited.add(start);
    result.push(start);
    
    for (const neighbor of this.adjacencyList.get(start) || []) {
      if (!visited.has(neighbor)) {
        this.dfs(neighbor, visited, result);
      }
    }
    
    return result;
  }
  
  // Breadth-First Search - O(V + E)
  bfs(start: number): number[] {
    const visited = new Set<number>();
    const result: number[] = [];
    const queue: number[] = [start];
    
    visited.add(start);
    
    while (queue.length > 0) {
      const node = queue.shift()!;
      result.push(node);
      
      for (const neighbor of this.adjacencyList.get(node) || []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    
    return result;
  }
  
  // Detect cycle using DFS
  hasCycleDFS(node: number, visited: Set<number>, parent: number = -1): boolean {
    visited.add(node);
    
    for (const neighbor of this.adjacencyList.get(node) || []) {
      if (!visited.has(neighbor)) {
        if (this.hasCycleDFS(neighbor, visited, node)) {
          return true;
        }
      } else if (neighbor !== parent) {
        return true; // Back edge found
      }
    }
    
    return false;
  }
}

// Usage
const g = new Graph();
g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(1, 2);
g.addEdge(2, 3);

console.log('DFS:', g.dfs(0));      // [0, 1, 2, 3] or similar
console.log('BFS:', g.bfs(0));      // [0, 1, 2, 3]
console.log('Has cycle:', g.hasCycleDFS(0, new Set())); // true`,
      explanation: 'DFS and BFS are fundamental graph traversals. DFS uses recursion/stack, BFS uses queue. Both run in O(V+E) time. Detecting cycles is a common application.',
      timeComplexity: 'DFS: O(V + E), BFS: O(V + E)',
      spaceComplexity: 'O(V) for visited set and recursion/queue'
    },
    {
      title: 'Dijkstra Shortest Path Algorithm',
      language: 'typescript',
      code: `// Dijkstra\\'s algorithm for shortest path in weighted graph
function dijkstra(graph: Map<number, Array<[number, number]>>, start: number): Map<number, number> {
  const distances = new Map<number, number>();
  const visited = new Set<number>();
  const pq: Array<[number, number]> = [[0, start]]; // [distance, node]
  
  // Initialize distances
  for (const node of graph.keys()) {
    distances.set(node, node === start ? 0 : Infinity);
  }
  
  while (pq.length > 0) {
    // Sort to get minimum (in practice, use min-heap)
    pq.sort((a, b) => a[0] - b[0]);
    const [currentDist, current] = pq.shift()!;
    
    if (visited.has(current)) continue;
    visited.add(current);
    
    // Check all neighbors
    for (const [neighbor, weight] of graph.get(current) || []) {
      const newDist = currentDist + weight;
      
      if (newDist < distances.get(neighbor)!) {
        distances.set(neighbor, newDist);
        pq.push([newDist, neighbor]);
      }
    }
  }
  
  return distances;
}

// Example: Finding shortest path in a network
//     1 ---5--- 2
//    / \\        / \\
//   2   3      1   2
//  /     \\    /     \\
// 0 -----1--- 3 -----4

const weightedGraph = new Map<number, Array<[number, number]>>();
weightedGraph.set(0, [[1, 2], [2, 1]]);
weightedGraph.set(1, [[0, 2], [2, 3], [3, 1]]);
weightedGraph.set(2, [[0, 1], [1, 3], [3, 2]]);
weightedGraph.set(3, [[1, 1], [2, 2], [4, 5]]);
weightedGraph.set(4, [[3, 5]]);

const distances = dijkstra(weightedGraph, 0);
console.log('Shortest distances from 0:', distances);
// { 0: 0, 1: 2, 2: 1, 3: 3, 4: 8 }`,
      explanation: 'Dijkstra finds shortest path from source to all other nodes in weighted graph with non-negative weights. Uses greedy approach with priority queue. O((V+E)logV) with min-heap.',
      timeComplexity: 'O((V + E) log V) with min-heap',
      spaceComplexity: 'O(V) for distances and visited'
    },
    {
      title: 'Union-Find for Cycle Detection',
      language: 'typescript',
      code: `// Union-Find (Disjoint Set Union) data structure
class UnionFind {
  parent: number[];
  rank: number[];
  
  constructor(n: number) {
    this.parent = Array.from({length: n}, (_, i) => i);
    this.rank = Array(n).fill(0);
  }
  
  // Find with path compression
  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }
  
  // Union with rank optimization
  union(x: number, y: number): boolean {
    const px = this.find(x);
    const py = this.find(y);
    
    if (px === py) return false; // Already in same set
    
    if (this.rank[px] < this.rank[py]) {
      this.parent[px] = py;
    } else if (this.rank[px] > this.rank[py]) {
      this.parent[py] = px;
    } else {
      this.parent[py] = px;
      this.rank[px]++;
    }
    
    return true; // Successfully unioned
  }
}

// Detect cycle in undirected graph using Union-Find
function detectCycleUF(n: number, edges: Array<[number, number]>): boolean {
  const uf = new UnionFind(n);
  
  for (const [u, v] of edges) {
    if (!uf.union(u, v)) {
      return true; // Cycle found
    }
  }
  
  return false;
}

// Kruskal's algorithm for Minimum Spanning Tree
function kruskalMST(n: number, edges: Array<[number, number, number]>): number {
  edges.sort((a, b) => a[2] - b[2]); // Sort by weight
  
  const uf = new UnionFind(n);
  let totalWeight = 0;
  let edgesAdded = 0;
  
  for (const [u, v, weight] of edges) {
    if (uf.union(u, v)) {
      totalWeight += weight;
      edgesAdded++;
      
      if (edgesAdded === n - 1) break; // MST complete
    }
  }
  
  return totalWeight;
}

// Example
const edges = [[0, 1, 1], [0, 2, 4], [1, 2, 2], [1, 3, 3], [2, 3, 5]];
console.log('Cycle detected:', detectCycleUF(4, edges.map(e => [e[0], e[1]])));
console.log('MST weight:', kruskalMST(4, edges));`,
      explanation: 'Union-Find is efficient for connectivity problems. Achieves nearly O(1) operations with path compression and union by rank. Essential for cycle detection and MST algorithms.',
      timeComplexity: 'Nearly O(1) per operation with optimizations',
      spaceComplexity: 'O(V) for parent and rank arrays'
    },
    {
      title: 'Topological Sort (for DAGs)',
      language: 'typescript',
      code: `// Topological sort using DFS
function topologicalSort(graph: Map<number, number[]>, numVertices: number): number[] {
  const visited = new Set<number>();
  const stack: number[] = [];
  
  function dfs(node: number): void {
    visited.add(node);
    
    for (const neighbor of graph.get(node) || []) {
      if (!visited.has(neighbor)) {
        dfs(neighbor);
      }
    }
    
    stack.push(node);
  }
  
  for (let i = 0; i < numVertices; i++) {
    if (!visited.has(i)) {
      dfs(i);
    }
  }
  
  return stack.reverse();
}

// Topological sort using Kahn's algorithm (BFS)
function topologicalSortKahn(graph: Map<number, number[]>, numVertices: number): number[] {
  const inDegree = new Map<number, number>();
  
  // Initialize in-degrees
  for (let i = 0; i < numVertices; i++) {
    inDegree.set(i, 0);
  }
  
  for (const neighbors of graph.values()) {
    for (const neighbor of neighbors) {
      inDegree.set(neighbor, (inDegree.get(neighbor) || 0) + 1);
    }
  }
  
  const queue: number[] = [];
  for (let i = 0; i < numVertices; i++) {
    if (inDegree.get(i) === 0) {
      queue.push(i);
    }
  }
  
  const result: number[] = [];
  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node);
    
    for (const neighbor of graph.get(node) || []) {
      inDegree.set(neighbor, inDegree.get(neighbor)! - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }
  
  return result;
}

// Example: Course prerequisites
// 0 -> 1 (take 0 before 1)
// 0 -> 2
// 1 -> 2

const courseGraph = new Map<number, number[]>();
courseGraph.set(0, [1, 2]);
courseGraph.set(1, [2]);
courseGraph.set(2, []);

console.log('Topological order:', topologicalSort(courseGraph, 3)); // [0, 1, 2]`,
      explanation: 'Topological sort orders vertices in directed acyclic graphs. DFS-based approach is intuitive, Kahn\'s algorithm is iterative. Essential for dependency resolution and task scheduling.',
      timeComplexity: 'O(V + E) for both approaches',
      spaceComplexity: 'O(V) for visited/queue'
    }
  ],

  patterns: [
    {
      name: 'DFS Graph Traversal',
      description: 'Explore graph deeply before backtracking. Uses recursion or explicit stack.',
      technique: 'Mark node visited, recurse on unvisited neighbors, backtrack when no unvisited neighbors remain.',
      example: 'Connected components, cycle detection, topological sort',
      whenToUse: [
        'Finding connected components',
        'Detecting cycles',
        'Path finding in graph',
        'Topological sorting'
      ]
    },
    {
      name: 'BFS Graph Traversal',
      description: 'Explore graph level by level using queue. Guarantees shortest path in unweighted graphs.',
      technique: 'Enqueue start node, process nodes by dequeuing and enqueueing unvisited neighbors.',
      example: 'Shortest path in unweighted graph, level-order discovery',
      whenToUse: [
        'Shortest path in unweighted graph',
        'Bipartite graph checking',
        'Level-based traversal',
        'Minimum steps problems'
      ]
    },
    {
      name: 'Shortest Path Algorithms',
      description: 'Find minimum cost path between vertices. Different algorithms for different constraints.',
      technique: 'Dijkstra: greedy with priority queue. BFS: for unweighted. Bellman-Ford: for negative weights.',
      example: 'GPS navigation, network routing, game AI pathfinding',
      whenToUse: [
        'Finding shortest routes in weighted graphs',
        'Network routing algorithms',
        'Game pathfinding',
        'Traffic optimization'
      ]
    },
    {
      name: 'Union-Find for Connectivity',
      description: 'Efficiently track connected components and detect cycles.',
      technique: 'Maintain parent pointers with path compression and union by rank for near O(1) ops.',
      example: 'Cycle detection, MST algorithms, network connectivity',
      whenToUse: [
        'Detecting cycles efficiently',
        'Finding connected components',
        'Kruskal\'s MST algorithm',
        'Network connectivity queries'
      ]
    }
  ],

  problems: [
    ...graphProblems
  ],

  operations: [
    { name: 'Add Vertex', complexity: 'O(1)' },
    { name: 'Add Edge', complexity: 'O(1)' },
    { name: 'Remove Vertex', complexity: 'O(V + E)' },
    { name: 'Remove Edge', complexity: 'O(E)' },
    { name: 'Traversal (DFS/BFS)', complexity: 'O(V + E)' },
    { name: 'Shortest Path (Dijkstra)', complexity: 'O((V + E) log V)' },
    { name: 'MST (Kruskal)', complexity: 'O(E log E)' }
  ],

  applications: [
    {
      name: 'Social Networks',
      description: 'Nodes are people, edges are friendships. Analyze connections, recommendations, communities.',
      example: 'Facebook friend suggestions, LinkedIn connections'
    },
    {
      name: 'Maps and Navigation',
      description: 'Nodes are locations, edges are roads with distances as weights.',
      example: 'Google Maps, GPS routing, pathfinding'
    },
    {
      name: 'Computer Networks',
      description: 'Nodes are computers, edges are connections. Analyze reachability and routing.',
      example: 'Internet routing protocols, network topology analysis'
    },
    {
      name: 'Recommendation Systems',
      description: 'Nodes are users/items, edges represent relationships or interactions.',
      example: 'Netflix recommendations, Amazon product recommendations'
    },
    {
      name: 'Task Scheduling',
      description: 'Nodes are tasks, edges are dependencies. Use topological sort.',
      example: 'Project management, build system dependency resolution'
    },
    {
      name: 'Game Development',
      description: 'Nodes are game states, edges are transitions. Use pathfinding for NPC AI.',
      example: 'Game level design, NPC pathfinding, strategy games'
    },
    {
      name: 'Compiler Design',
      description: 'Dependency graphs for dead code elimination and optimization.',
      example: 'Modern compilers use graphs for instruction scheduling'
    }
  ]
};
