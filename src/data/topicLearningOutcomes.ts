export const topicLearningOutcomes: Record<string, string[]> = {
  arrays: [
    'Explain how contiguous memory enables O(1) index access and cache-friendly traversal.',
    'Apply sliding window and prefix-sum techniques to solve subarray problems efficiently.',
    'Choose the right trade-off between array mutation cost and lookup performance.',
    'Analyze common array operations using time and space complexity.'
  ],
  'linked-lists': [
    'Implement singly and doubly linked lists with correct pointer updates.',
    'Use fast/slow pointers to detect cycles and find middle-node patterns.',
    'Handle insertion and deletion edge cases at head, tail, and middle nodes.',
    'Compare linked lists with arrays for memory locality and operation costs.'
  ],
  'hash-tables': [
    'Describe hashing, collisions, and load factor behavior in practical systems.',
    'Use hash maps and sets to reduce lookup-heavy problems to near O(1) average time.',
    'Apply frequency counting and grouping patterns for strings and arrays.',
    'Evaluate worst-case behavior and mitigation strategies for collision-heavy workloads.'
  ],
  trees: [
    'Traverse trees with DFS and BFS variants for search and aggregation tasks.',
    'Implement and reason about BST insert, search, and delete operations.',
    'Solve tree DP and recursion problems using postorder decomposition.',
    'Analyze balanced vs unbalanced tree complexity impacts.'
  ],
  graphs: [
    'Model real-world relationships with graph representations and choose the right one.',
    'Implement BFS and DFS for connectivity, pathing, and component discovery.',
    'Apply shortest-path and MST algorithms to optimization scenarios.',
    'Identify algorithm complexity in terms of vertices and edges.'
  ],
  'sorting-searching': [
    'Choose sorting algorithms based on data size, stability, and memory constraints.',
    'Apply binary search patterns on sorted spaces and monotonic conditions.',
    'Use partition and divide-and-conquer ideas in practical interview problems.',
    'Compare best, average, and worst-case behavior for common algorithms.'
  ],
  'stacks-queues': [
    'Use LIFO/FIFO semantics to model processing constraints correctly.',
    'Solve monotonic stack and queue-window problems with linear-time patterns.',
    'Implement queue-with-stacks and stack-with-queues transformations.',
    'Analyze amortized complexity in push/pop/enqueue/dequeue operations.'
  ],
  strings: [
    'Apply two-pointer, frequency-map, and windowing techniques to text problems.',
    'Use prefix/suffix ideas for efficient matching and transformation tasks.',
    'Handle Unicode and edge-case constraints when processing string input.',
    'Optimize string algorithms by reducing unnecessary copying and rescans.'
  ],
  design: [
    'Decompose system requirements into scalable service and data boundaries.',
    'Select architecture patterns based on consistency, availability, and latency goals.',
    'Reason about caching, rate limiting, and queue-based decoupling trade-offs.',
    'Communicate design decisions with clear constraints and failure-mode thinking.'
  ],
  'math-bit-logic': [
    'Use bitwise operations for masking, toggling, and compact state representation.',
    'Apply number theory basics like GCD, modular arithmetic, and combinatorics patterns.',
    'Convert brute-force loops into arithmetic or bit-logic optimizations.',
    'Recognize overflow and boundary pitfalls in numeric implementations.'
  ],
  'dynamic-programming': [
    'Identify optimal substructure and overlapping subproblems in candidate tasks.',
    'Move from recursion to memoization and tabulation systematically.',
    'Design state definitions and transitions for 1D, 2D, and interval DP.',
    'Optimize DP space usage while preserving correctness.'
  ],
  'recursion-backtracking': [
    'Build recursive solutions with clear base cases and shrinking subproblems.',
    'Use backtracking templates for combinations, permutations, and constraint search.',
    'Prune search trees effectively to avoid combinatorial explosion.',
    'Trace call stacks to debug recursion depth and correctness issues.'
  ],
  heaps: [
    'Use min-heaps and max-heaps for top-k and priority scheduling problems.',
    'Implement push/pop/heapify with correct O(log n) behavior.',
    'Combine heaps with maps for streaming median and frequency tasks.',
    'Decide when heap-based approaches outperform full sorting.'
  ],
  tries: [
    'Represent prefix relationships using trie node structures.',
    'Implement insert, search, and prefix queries with O(L) complexity.',
    'Apply tries to autocomplete and dictionary-matching use cases.',
    'Balance trie memory overhead against lookup speed benefits.'
  ],
  greedy: [
    'Identify problems where local optimal choices lead to global optimal results.',
    'Use sorting and priority rules to construct greedy strategies.',
    'Validate greedy correctness using exchange and cut arguments.',
    'Recognize when a greedy attempt should be replaced with DP or graph methods.'
  ]
};