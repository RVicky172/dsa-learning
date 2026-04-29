import type { Problem } from '../../types/topic';

export const trieProblems: Problem[] = [
  {
    id: 'trie-implement',
    title: 'Implement Trie (Prefix Tree)',
    difficulty: 'Medium',
    description: 'A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings.',
    examples: [{ input: 'Trie(), insert("apple"), search("apple"), startsWith("app")', output: 'null, null, true, true' }],
    solution: {
      approach: 'Create a Node class containing children Map and isWord boolean.',
      code: `class TrieNode {
    children: Map<string, TrieNode> = new Map();
    isWord: boolean = false;
}
class Trie {
    root = new TrieNode();
    insert(word: string): void {
        let curr = this.root;
        for (const c of word) {
            if (!curr.children.has(c)) curr.children.set(c, new TrieNode());
            curr = curr.children.get(c)!;
        }
        curr.isWord = true;
    }
    search(word: string): boolean {
        let curr = this.root;
        for (const c of word) {
            if (!curr.children.has(c)) return false;
            curr = curr.children.get(c)!;
        }
        return curr.isWord;
    }
}`,
      timeComplexity: 'O(M) where M is the key length',
      spaceComplexity: 'O(1) auxiliary, O(N*M) total space',
      stepByStep: ['Store characters in nested objects/maps', 'Flag the end of a valid word', 'Traverse node by node for search operations']
    },
    hints: ['Each node represents a single character', 'You need a flag to mark where a stored word ends']
  },
  {
    id: 'replace-words',
    title: 'Replace Words',
    difficulty: 'Medium',
    description: 'In English, we have a concept called root, which can be followed by some other word to form another longer word - let\'s call this word successor. For example, when the root "an" is followed by the successor word "other", we can form a new word "another". Given a dictionary consisting of many roots and a sentence consisting of words separated by spaces, replace all the successors in the sentence with the root forming it.',
    examples: [
      {
        input: 'dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"',
        output: '"the cat was rat by the bat"'
      }
    ],
    solution: {
      approach: 'Build a trie with the dictionary roots, then for each word in sentence, find the shortest prefix that is a root',
      code: `function replaceWords(dictionary: string[], sentence: string): string {
  const trie = new Trie();
  for (const root of dictionary) {
    trie.insert(root);
  }

  const words = sentence.split(' ');
  for (let i = 0; i < words.length; i++) {
    words[i] = trie.findRoot(words[i]);
  }

  return words.join(' ');
}

class Trie {
  root = new TrieNode();

  insert(word: string) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) node.children[char] = new TrieNode();
      node = node.children[char];
    }
    node.isEnd = true;
  }

  findRoot(word: string): string {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!node.children[char]) return word;
      node = node.children[char];
      if (node.isEnd) return word.substring(0, i + 1);
    }
    return word;
  }
}

class TrieNode {
  children: { [key: string]: TrieNode } = {};
  isEnd = false;
}`,
      timeComplexity: 'O(N + M) where N is total characters in dictionary, M in sentence',
      spaceComplexity: 'O(N)',
      stepByStep: [
        'Build trie with all dictionary roots',
        'Split sentence into words',
        'For each word, traverse trie to find shortest root prefix',
        'Replace word with root if found'
      ]
    },
    hints: [
      'Use a trie to store dictionary roots',
      'For each word, find the shortest prefix that exists in trie',
      'Stop at the first end-of-word marker'
    ]
  },
  // ── NEW BATCH (TKT-016) ──────────────────────────────────────────
  {
    id: 'trie-longest-word-dict',
    title: 'Longest Word in Dictionary',
    difficulty: 'Easy',
    description: 'Given an array of strings words, return the longest word that can be built one character at a time by other words in words. If there are multiple answers, return the lexicographically smallest one.',
    examples: [
      { input: 'words = ["w","wo","wor","word","world"]', output: '"world"' },
      { input: 'words = ["a","banana","app","appl","ap","apply","apple"]', output: '"apple"' }
    ],
    solution: {
      approach: 'Insert all words into a trie. Then DFS/BFS only through nodes that are end-of-word, tracking the longest path.',
      code: `function longestWord(words: string[]): string {
  const set = new Set(words);
  words.sort();
  let result = '';
  for (const word of words) {
    if (word.length === 1 || set.has(word.slice(0, -1))) {
      if (word.length > result.length) result = word;
    }
  }
  return result;
}`,
      timeComplexity: 'O(n × L) where L is max word length',
      spaceComplexity: 'O(n × L)',
      stepByStep: [
        'Sort words so shorter prefixes come first',
        'For each word, check that its prefix (word without last char) is in the set',
        'Update result if current word is longer',
        'Sorting ensures lexicographic tie-breaking for equal-length words'
      ]
    },
    hints: ['Sorting allows greedy prefix validation.', 'A trie DFS also works but a Set is simpler.']
  },
  {
    id: 'trie-map-sum-pairs',
    title: 'Map Sum Pairs',
    difficulty: 'Easy',
    description: 'Design a MapSum class that supports two operations: insert(key, val) and sum(prefix). sum returns the sum of all values whose keys start with prefix.',
    examples: [
      { input: 'insert("apple", 3), sum("ap")', output: '3' },
      { input: 'insert("app", 2), sum("ap")', output: '5' }
    ],
    solution: {
      approach: 'Trie where each node stores a cumulative sum. On insert, propagate the delta (new val - old val if key exists) down all nodes.',
      code: `class MapSum {
  private trie: Map<string, MapSum> = new Map();
  private val = 0;
  private score = 0;
  private map: Map<string, number> = new Map();

  insert(key: string, val: number): void {
    const delta = val - (this.map.get(key) ?? 0);
    this.map.set(key, val);
    let node: MapSum = this;
    node.score += delta;
    for (const ch of key) {
      if (!node.trie.has(ch)) node.trie.set(ch, new MapSum());
      node = node.trie.get(ch)!;
      node.score += delta;
    }
    node.val = val;
  }

  sum(prefix: string): number {
    let node: MapSum = this;
    for (const ch of prefix) {
      if (!node.trie.has(ch)) return 0;
      node = node.trie.get(ch)!;
    }
    return node.score;
  }
}`,
      timeComplexity: 'O(L) per operation',
      spaceComplexity: 'O(n × L)',
      stepByStep: [
        'Store a score (prefix sum) at each trie node',
        'On insert, compute delta = new val - old val',
        'Propagate delta to all nodes along the key path',
        'sum() traverses the prefix and returns the final node\'s score'
      ]
    },
    hints: ['Track the old value to compute the delta correctly.', 'Each node\'s score is the sum of all values below it.']
  },
  {
    id: 'trie-design-add-search',
    title: 'Design Add and Search Words Data Structure',
    difficulty: 'Medium',
    description: 'Design a data structure that supports addWord(word) and search(word) where word may contain the wildcard "." matching any letter.',
    examples: [
      { input: 'addWord("bad"), addWord("dad"), addWord("mad"), search("pad")', output: 'false' },
      { input: 'search(".ad")', output: 'true' },
      { input: 'search("b..")', output: 'true' }
    ],
    solution: {
      approach: 'Trie with recursive DFS when "." is encountered, branching into all children.',
      code: `class WordDictionary {
  private children: Map<string, WordDictionary> = new Map();
  private isEnd = false;

  addWord(word: string): void {
    let node: WordDictionary = this;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, new WordDictionary());
      node = node.children.get(ch)!;
    }
    node.isEnd = true;
  }

  search(word: string): boolean {
    return this._search(word, 0);
  }

  private _search(word: string, i: number): boolean {
    if (i === word.length) return this.isEnd;
    const ch = word[i];
    if (ch === '.') {
      for (const child of this.children.values()) {
        if (child._search(word, i + 1)) return true;
      }
      return false;
    }
    return (this.children.get(ch)?._search(word, i + 1)) ?? false;
  }
}`,
      timeComplexity: 'O(L) add, O(26^L) worst-case search',
      spaceComplexity: 'O(n × L)',
      stepByStep: [
        'addWord: standard trie insert',
        'search: DFS from current node',
        'For ".", recurse into every child',
        'For a letter, follow only the matching child'
      ]
    },
    hints: ['The wildcard "." requires trying all children.', 'Recursion naturally handles multi-wildcard patterns.']
  },
  {
    id: 'trie-word-search-ii',
    title: 'Word Search II',
    difficulty: 'Medium',
    description: 'Given an m×n board of characters and a list of words, return all words that can be found in the board. Words are formed by sequentially adjacent cells (horizontally/vertically) and each cell may be used at most once per word.',
    examples: [
      { input: 'board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]', output: '["eat","oath"]' }
    ],
    solution: {
      approach: 'Build a trie from words. DFS from every cell; prune branches not in trie. Remove found words to avoid duplicates.',
      code: `function findWords(board: string[][], words: string[]): string[] {
  type TrieNode = { [key: string]: TrieNode } & { word?: string };
  const root: TrieNode = {};
  for (const w of words) {
    let node = root;
    for (const ch of w) { node[ch] = node[ch] ?? {}; node = node[ch]; }
    node.word = w;
  }
  const result: string[] = [];
  const R = board.length; const C = board[0].length;
  function dfs(r: number, c: number, node: TrieNode): void {
    if (r < 0 || r >= R || c < 0 || c >= C) return;
    const ch = board[r][c];
    if (ch === '#' || !node[ch]) return;
    const next = node[ch];
    if (next.word) { result.push(next.word); delete next.word; }
    board[r][c] = '#';
    dfs(r+1, c, next); dfs(r-1, c, next); dfs(r, c+1, next); dfs(r, c-1, next);
    board[r][c] = ch;
  }
  for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) dfs(r, c, root);
  return result;
}`,
      timeComplexity: 'O(M × N × 4 × 3^(L-1)) where L = word length',
      spaceComplexity: 'O(W × L)',
      stepByStep: [
        'Build trie from all words',
        'DFS from each cell, traversing trie simultaneously',
        'Mark cell as visited with "#" during DFS',
        'When a word node is reached, record word and delete from trie to prevent duplicates'
      ]
    },
    hints: ['Build the trie once; do DFS from every cell.', 'Delete found words from the trie to avoid duplicates and prune dead branches.']
  },
  {
    id: 'trie-index-pairs',
    title: 'Index Pairs of a String',
    difficulty: 'Medium',
    description: 'Given a text string and an array of words, return all [i, j] index pairs such that text[i..j] is in words.',
    examples: [
      { input: 'text = "thestoryofleetcodeandme", words = ["story","fleet","leetcode"]', output: '[[3,7],[9,13],[10,17]]' },
      { input: 'text = "ababa", words = ["aba","ab"]', output: '[[0,1],[0,2],[2,3],[2,4]]' }
    ],
    solution: {
      approach: 'Insert all words into a trie. For each starting index in text, walk the trie to find matching words.',
      code: `function indexPairs(text: string, words: string[]): number[][] {
  type TrieNode = { [key: string]: TrieNode; isEnd?: boolean };
  const root: TrieNode = {};
  for (const w of words) {
    let node = root;
    for (const ch of w) { node[ch] = node[ch] ?? {}; node = node[ch]; }
    node.isEnd = true;
  }
  const result: number[][] = [];
  for (let i = 0; i < text.length; i++) {
    let node = root;
    for (let j = i; j < text.length; j++) {
      const ch = text[j];
      if (!node[ch]) break;
      node = node[ch];
      if (node.isEnd) result.push([i, j]);
    }
  }
  return result;
}`,
      timeComplexity: 'O(W × L + T × L) where T = text length',
      spaceComplexity: 'O(W × L)',
      stepByStep: [
        'Build trie from words',
        'For each starting position i in text, walk trie character by character',
        'Whenever isEnd is reached, record [i, j]',
        'Break when no matching child exists'
      ]
    },
    hints: ['Walk the trie simultaneously with the text window.', 'Unlike single-word search, multiple words can start at the same index.']
  },
  {
    id: 'trie-palindrome-pairs',
    title: 'Palindrome Pairs',
    difficulty: 'Hard',
    description: 'Given a list of unique words, return all pairs [i, j] such that words[i] + words[j] is a palindrome.',
    examples: [
      { input: 'words = ["abcd","dcba","lls","s","sssll"]', output: '[[0,1],[1,0],[3,2],[2,4]]' },
      { input: 'words = ["bat","tab","cat"]', output: '[[0,1],[1,0]]' }
    ],
    solution: {
      approach: 'For each word, insert its reverse into a trie along with its index. Then for each word, check: (1) prefixes whose reverse is in the map and the suffix is a palindrome; (2) suffixes whose reverse is in the map and the prefix is a palindrome.',
      code: `function palindromePairs(words: string[]): number[][] {
  const revMap = new Map(words.map((w, i) => [w.split('').reverse().join(''), i]));
  const result: number[][] = [];
  function isPalin(s: string, lo: number, hi: number): boolean {
    while (lo < hi) { if (s[lo++] !== s[hi--]) return false; }
    return true;
  }
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    for (let k = 0; k <= w.length; k++) {
      // Case 1: left part is palindrome, append reverse of right part
      if (isPalin(w, 0, k - 1)) {
        const j = revMap.get(w.slice(k));
        if (j !== undefined && j !== i) result.push([j, i]);
      }
      // Case 2: right part is palindrome, prepend reverse of left part
      if (k < w.length && isPalin(w, k, w.length - 1)) {
        const j = revMap.get(w.slice(0, k));
        if (j !== undefined && j !== i) result.push([i, j]);
      }
    }
  }
  return result;
}`,
      timeComplexity: 'O(n × k²) where k is average word length',
      spaceComplexity: 'O(n × k)',
      stepByStep: [
        'Build a map from reversed word to index',
        'For each word and split position k, check if the left half is a palindrome',
        'If so, the right half reversed should form a valid pair',
        'Symmetrically check if the right half is a palindrome',
        'Avoid self-pairing with j !== i check'
      ]
    },
    hints: ['Consider all split positions of each word.', 'If a suffix is a palindrome, we only need the prefix reversed elsewhere.']
  }
];

