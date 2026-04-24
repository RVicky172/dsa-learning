import React from 'react';
import {
  Hash,
  Database,
  Link,
  Layers,
  GitBranch,
  Network,
  ArrowUpDown,
  Type,
  Layout,
  Binary,
  Zap,
  RotateCcw,
  TrendingUp,
  AlignLeft,
  Target,
} from 'lucide-react';

const ICON_SIZE = 24;

const SLUG_ICON_MAP: Record<string, React.ReactNode> = {
  arrays: React.createElement(Hash, { size: ICON_SIZE }),
  'hash-tables': React.createElement(Database, { size: ICON_SIZE }),
  'linked-lists': React.createElement(Link, { size: ICON_SIZE }),
  'stacks-queues': React.createElement(Layers, { size: ICON_SIZE }),
  trees: React.createElement(GitBranch, { size: ICON_SIZE }),
  graphs: React.createElement(Network, { size: ICON_SIZE }),
  'sorting-searching': React.createElement(ArrowUpDown, { size: ICON_SIZE }),
  strings: React.createElement(Type, { size: ICON_SIZE }),
  design: React.createElement(Layout, { size: ICON_SIZE }),
  'math-bit-logic': React.createElement(Binary, { size: ICON_SIZE }),
  'dynamic-programming': React.createElement(Zap, { size: ICON_SIZE }),
  'recursion-backtracking': React.createElement(RotateCcw, { size: ICON_SIZE }),
  heaps: React.createElement(TrendingUp, { size: ICON_SIZE }),
  tries: React.createElement(AlignLeft, { size: ICON_SIZE }),
  greedy: React.createElement(Target, { size: ICON_SIZE }),
};

export function getTopicIcon(slug: string): React.ReactNode {
  return SLUG_ICON_MAP[slug] ?? React.createElement(Hash, { size: ICON_SIZE });
}
