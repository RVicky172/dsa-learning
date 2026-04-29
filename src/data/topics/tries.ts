import type { Topic } from '../../types/topic';
import { trieProblems } from '../problems/tries';
import React from 'react';
import { Network } from 'lucide-react';

export const triesTopic: Topic = {
  id: 'tries',
  title: 'Tries (Prefix Trees)',
  description: 'Tree-based structure for efficient string prefix operations.',
  complexity: 'O(L) per operation',
  icon: React.createElement(Network, { size: 24 }),
  delay: 0.65,

  introduction: `A Trie (pronounced "try", from retrieval) is a tree-based data structure used to store and retrieve strings efficiently. Each node represents a character, and paths from root to nodes represent prefixes of stored strings.

Unlike hash tables which require O(n) for prefix queries, tries provide O(L) operations (where L is the string length) for insert, search, and prefix matching. This makes them ideal for autocomplete, spell checking, and IP routing.

## Structure
The root is empty. Each edge represents a character. A node can have up to 26 children (for lowercase English). A boolean flag marks the end of a word. The path from root to any end-of-word node spells out a stored string.`,

  whyImportant: 'Tries are the optimal data structure for prefix-based operations. They power autocomplete in search engines, T9 predictive text, spell checkers, and IP routing tables. Interview problems involving prefix matching, word search, or dictionary operations often require tries.',

  whenToUse: [
    'Autocomplete and type-ahead suggestions',
    'Spell checking and correction',
    'IP routing (longest prefix match)',
    'Word games (Boggle, Scrabble)',
    'Prefix-based filtering and search',
    'Implementing dictionaries with prefix queries'
  ],

  advantages: [
    'O(L) lookup, insert, delete — independent of dictionary size',
    'Efficient prefix searching and matching',
    'Alphabetical ordering comes naturally',
    'No hash collisions (unlike hash tables)',
    'Supports wildcard and partial matching'
  ],

  disadvantages: [
    'High memory usage (each node can have 26+ children)',
    'Cache-unfriendly (scattered memory access)',
    'Overkill for exact-match-only queries (use hash map)',
    'Complex implementation compared to hash tables'
  ],

  concepts: [
    {
      name: 'Trie Node Structure',
      description: 'Each node contains an array of children (size 26 for lowercase letters) and a boolean indicating if this node marks the end of a complete word.'
    },
    {
      name: 'Prefix Search',
      description: 'To find all words with a given prefix, traverse to the prefix node, then collect all words in the subtree below it. This is the core advantage over hash maps.'
    },
    {
      name: 'Compressed Trie (Radix Tree)',
      description: 'Merge chains of single-child nodes into one node with a multi-character label. Reduces memory usage significantly for sparse dictionaries.'
    },
    {
      name: 'Trie vs Hash Map',
      description: 'Tries: O(L) ops, prefix search, ordered. Hash maps: O(1) average for exact match, no prefix search. Choose based on whether you need prefix operations.'
    }
  ],

  examples: [
    {
      title: 'Trie Implementation',
      language: 'typescript',
      code: `class TrieNode {
  children: Map<string, TrieNode> = new Map();
  isEndOfWord = false;
}

class Trie {
  root = new TrieNode();

  insert(word: string): void {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.isEndOfWord = true;
  }

  search(word: string): boolean {
    const node = this.findNode(word);
    return node !== null && node.isEndOfWord;
  }

  startsWith(prefix: string): boolean {
    return this.findNode(prefix) !== null;
  }

  private findNode(str: string): TrieNode | null {
    let node = this.root;
    for (const char of str) {
      if (!node.children.has(char)) return null;
      node = node.children.get(char)!;
    }
    return node;
  }

  // Get all words with given prefix
  autocomplete(prefix: string): string[] {
    const node = this.findNode(prefix);
    if (!node) return [];
    const results: string[] = [];
    this.collectWords(node, prefix, results);
    return results;
  }

  private collectWords(node: TrieNode, prefix: string, results: string[]): void {
    if (node.isEndOfWord) results.push(prefix);
    for (const [char, child] of node.children) {
      this.collectWords(child, prefix + char, results);
    }
  }
}

const trie = new Trie();
["apple", "app", "apt", "bat", "bad"].forEach(w => trie.insert(w));
console.log(trie.search("app"));       // true
console.log(trie.startsWith("ap"));    // true
console.log(trie.autocomplete("ap"));  // ["app", "apple", "apt"]`,
      explanation: 'The trie stores each character as a node in a tree. Insert follows/creates a path. Search follows the path and checks the end flag. Autocomplete traverses to the prefix node and collects all words in the subtree.',
      timeComplexity: 'O(L) for insert/search/prefix where L = string length',
      spaceComplexity: 'O(N × L) where N = number of words'
    },
    {
      title: 'Word Search II (Trie + Backtracking)',
      language: 'typescript',
      code: `// Find all words from dictionary in a board (Boggle)
function findWords(board: string[][], words: string[]): string[] {
  const trie = new Trie();
  for (const word of words) trie.insert(word);

  const result = new Set<string>();
  const rows = board.length, cols = board[0].length;

  function dfs(r: number, c: number, node: TrieNode, path: string) {
    if (r < 0 || r >= rows || c < 0 || c >= cols) return;
    const char = board[r][c];
    if (char === '#' || !node.children.has(char)) return;

    const nextNode = node.children.get(char)!;
    const newPath = path + char;

    if (nextNode.isEndOfWord) result.add(newPath);

    board[r][c] = '#'; // Mark visited
    dfs(r+1, c, nextNode, newPath);
    dfs(r-1, c, nextNode, newPath);
    dfs(r, c+1, nextNode, newPath);
    dfs(r, c-1, nextNode, newPath);
    board[r][c] = char; // Restore
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dfs(r, c, trie.root, '');
    }
  }
  return [...result];
}`,
      explanation: 'Combines a trie with backtracking DFS on the board. The trie prunes invalid paths early — if the current prefix isn\'t in the trie, we stop exploring. This is much faster than checking each word independently.',
      timeComplexity: 'O(M × N × 4^L) worst case, but trie pruning makes it much faster in practice',
      spaceComplexity: 'O(sum of word lengths) for the trie'
    }
  ],

  patterns: [
    {
      name: 'Prefix Matching',
      description: 'Find all strings with a given prefix. The core use case for tries — something hash maps cannot do efficiently.',
      technique: 'Navigate to the prefix node, then DFS to collect all words in the subtree.',
      example: 'Autocomplete, search suggestions, IP routing (longest prefix match)',
      whenToUse: [
        'Autocomplete features',
        'Search suggestion systems',
        'Dictionary with prefix queries',
        'IP address routing'
      ]
    },
    {
      name: 'Trie + DFS/Backtracking',
      description: 'Combine a trie with grid/graph exploration. The trie acts as a pruning mechanism for valid prefixes.',
      technique: 'Build a trie from the dictionary. During DFS, only explore paths that exist in the trie.',
      example: 'Word search on a board, Boggle solver, word break problem',
      whenToUse: [
        'Finding dictionary words in a grid',
        'Word games (Boggle, Scrabble)',
        'Pattern matching with wildcards',
        'Multi-word search problems'
      ]
    }
  ],

  problems: [
    ...trieProblems,
    {
      id: 'trie-implement',
      title: 'Implement Trie (Prefix Tree)',
      difficulty: 'Medium',
      description: 'Implement a trie with insert, search, and startsWith methods.',
      examples: [
        {
          input: 'insert("apple"), search("apple"), search("app"), startsWith("app")',
          output: '[true, false, true]'
        }
      ],
      solution: {
        approach: 'Use a tree of nodes where each node has a map of children and an end-of-word flag.',
        code: `class TrieNode {
  children: Map<string, TrieNode> = new Map();
  isEnd = false;
}

class Trie {
  private root = new TrieNode();

  insert(word: string): void {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
      node = node.children.get(ch)!;
    }
    node.isEnd = true;
  }

  search(word: string): boolean {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) return false;
      node = node.children.get(ch)!;
    }
    return node.isEnd;
  }

  startsWith(prefix: string): boolean {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children.has(ch)) return false;
      node = node.children.get(ch)!;
    }
    return true;
  }
}`,
        timeComplexity: 'O(L) for all operations',
        spaceComplexity: 'O(N × L)',
        stepByStep: [
          'Each node has a children map and isEnd flag',
          'Insert: create nodes along the path, set isEnd at last node',
          'Search: follow path, return isEnd at last node',
          'StartsWith: follow path, return true if path exists (ignore isEnd)'
        ]
      },
      hints: [
        'Each node needs a map of char → child node',
        'Mark word endings with a boolean flag',
        'Search is like startsWith but also checks isEnd'
      ]
    },
    {
      id: 'trie-word-search-ii',
      title: 'Word Search II',
      difficulty: 'Hard',
      description: 'Given an m×n board and a list of words, find all words that can be formed by adjacent letters on the board.',
      examples: [
        {
          input: 'board = [["o","a","a"],["e","t","a"]], words = ["eat","oath","eta"]',
          output: '["eat","oath","eta"]'
        }
      ],
      solution: {
        approach: 'Build a trie from words, then DFS from each cell using the trie to prune invalid paths.',
        code: `function findWords(board: string[][], words: string[]): string[] {
  // Build trie (simplified)
  const root: any = {};
  for (const w of words) {
    let node = root;
    for (const c of w) { if (!node[c]) node[c] = {}; node = node[c]; }
    node.word = w;
  }

  const result: string[] = [];
  const R = board.length, C = board[0].length;

  function dfs(r: number, c: number, node: any) {
    if (r<0||r>=R||c<0||c>=C) return;
    const ch = board[r][c];
    if (ch === '#' || !node[ch]) return;

    node = node[ch];
    if (node.word) { result.push(node.word); node.word = null; }

    board[r][c] = '#';
    dfs(r+1,c,node); dfs(r-1,c,node);
    dfs(r,c+1,node); dfs(r,c-1,node);
    board[r][c] = ch;
  }

  for (let r=0; r<R; r++)
    for (let c=0; c<C; c++)
      dfs(r, c, root);
  return result;
}`,
        timeComplexity: 'O(M × N × 4^L)',
        spaceComplexity: 'O(sum of word lengths)',
        stepByStep: [
          'Build a trie from all words',
          'DFS from every cell on the board',
          'At each cell, check if char exists in current trie node',
          'If a complete word is found, add to results',
          'Mark cells visited during DFS, restore after backtracking'
        ]
      },
      hints: [
        'Trie enables searching all words simultaneously',
        'DFS with backtracking explores all paths',
        'Null out found words to avoid duplicates'
      ]
    }
  ],

  operations: [
    { name: 'Insert Word', complexity: 'O(L)' },
    { name: 'Search Word', complexity: 'O(L)' },
    { name: 'Prefix Search', complexity: 'O(L)' },
    { name: 'Delete Word', complexity: 'O(L)' },
    { name: 'Autocomplete', complexity: 'O(L + K)' },
    { name: 'Count Prefix Matches', complexity: 'O(L)' }
  ],

  applications: [
    {
      name: 'Search Engine Autocomplete',
      description: 'As users type, tries instantly find all matching suggestions.',
      example: 'Google search suggestions appear as you type, powered by trie-like structures'
    },
    {
      name: 'Spell Checking',
      description: 'Tries enable fast dictionary lookup and suggestions for misspelled words.',
      example: 'IDE autocomplete uses tries to suggest variable/function names as you type'
    },
    {
      name: 'IP Routing',
      description: 'Routers use tries (specifically Patricia trees) for longest prefix matching on IP addresses.',
      example: 'Network routers match IP addresses against routing tables using binary tries'
    },
    {
      name: 'Text Prediction',
      description: 'T9 predictive text and mobile keyboards use tries to predict words from key sequences.',
      example: 'Phone keyboard predicts "hello" when you type "43556"'
    }
  ]
};
