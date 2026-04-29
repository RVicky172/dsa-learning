import type { Topic } from '../../types/topic';
import { arraysTopic } from './arrays/index';
import { linkedListsTopic } from './linkedLists';
import { hashTablesTopic } from './hashTables';
import { stacksQueuesTopic } from './stacksQueues';
import { treesTopic } from './trees';
import { graphsTopic } from './graphs';
import { stringsTopic } from './strings';
import { sortingTopic } from './sorting';
import { greedyTopic } from './greedy';
import { dynamicProgrammingTopic } from './dynamicProgramming';
import { recursionBacktrackingTopic } from './recursionBacktracking';
import { mathTopic } from './mathBitLogic';
import { heapsTopic } from './heaps';
import { triesTopic } from './tries';
import { designTopic } from './design';

export const allTopics: Topic[] = [
  arraysTopic,
  linkedListsTopic,
  hashTablesTopic,
  stacksQueuesTopic,
  treesTopic,
  graphsTopic,
  stringsTopic,
  sortingTopic,
  greedyTopic,
  dynamicProgrammingTopic,
  recursionBacktrackingTopic,
  mathTopic,
  heapsTopic,
  triesTopic,
  designTopic,
];

/** Lookup a static topic by its id/slug */
export const topicsBySlug: Record<string, Topic> = Object.fromEntries(
  allTopics.map(t => [t.id, t])
);
