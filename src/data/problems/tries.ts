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
  }
];

