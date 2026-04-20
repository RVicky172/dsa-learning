// Re-export all per-topic problem arrays from a single entry point.
// Add new problems to the relevant per-topic file; they will automatically
// appear in both the TopicDetail view and the ProblemsPage.

export { arrayProblems } from './arrays';
export { linkedListProblems } from './linkedLists';
export { hashTableProblems } from './hashTables';
export { stackQueueProblems } from './stacksQueues';
export { treeProblems } from './trees';
export { graphProblems } from './graphs';
export { stringProblems } from './strings';
export { sortingProblems, searchingProblems, advancedSortingProblems } from './sorting';
export { greedyProblems } from './greedy';
export { dpProblems } from './dynamicProgramming';
export { recursionProblems } from './recursion';
export { mathProblems } from './math';
export { heapProblems } from './heaps';
export { trieProblems } from './tries';
export { designProblems, advancedProblems, type AdvancedProblem } from './design';
