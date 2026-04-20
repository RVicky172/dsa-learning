import type { Problem } from '../../types/topic';
import { arrayProblems } from './arrays';
import { linkedListProblems } from './linkedLists';
import { hashTableProblems } from './hashTables';
import { stackQueueProblems } from './stacksQueues';
import { treeProblems } from './trees';
import { graphProblems } from './graphs';
import { stringProblems } from './strings';
import { sortingProblems, searchingProblems, advancedSortingProblems } from './sorting';
import { greedyProblems } from './greedy';
import { dpProblems } from './dynamicProgramming';
import { recursionProblems } from './recursion';
import { mathProblems } from './math';
import { heapProblems } from './heaps';
import { trieProblems } from './tries';
import { designProblems, advancedProblems, type AdvancedProblem } from './design';

export type ProblemDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Expert';

export interface ProblemListItem extends Omit<Problem, 'difficulty'> {
  difficulty: ProblemDifficulty;
  category: string[];
  uniqueKey: string;
}

type ProblemSource = Problem | AdvancedProblem;

const validDifficulties: ProblemDifficulty[] = ['Easy', 'Medium', 'Hard', 'Expert'];

const normalizeDifficulty = (difficulty: string): ProblemDifficulty => {
  if (validDifficulties.includes(difficulty as ProblemDifficulty)) {
    return difficulty as ProblemDifficulty;
  }

  return 'Medium';
};

const convertToProblem = (problem: ProblemSource): Omit<ProblemListItem, 'category' | 'uniqueKey'> => {
  const sourceSolution = 'optimal' in problem ? problem.optimal : problem.solution;

  return {
    id: problem.id,
    title: problem.title,
    difficulty: normalizeDifficulty(problem.difficulty),
    description: problem.description,
    examples: problem.examples,
    solution: {
      approach: sourceSolution?.approach || '',
      code: sourceSolution?.code || '',
      timeComplexity: sourceSolution?.timeComplexity || '',
      spaceComplexity: sourceSolution?.spaceComplexity || '',
      stepByStep: sourceSolution?.stepByStep || problem.hints || []
    },
    hints: problem.hints || []
  };
};

const withCategory = (
  problems: ProblemSource[],
  category: string[],
  source: string
): ProblemListItem[] => {
  return problems.map((problem, index) => ({
    ...convertToProblem(problem),
    category,
    uniqueKey: `${source}:${problem.id}:${index}`
  }));
};

export const allProblems: ProblemListItem[] = [
  ...withCategory(arrayProblems, ['Arrays'], 'arrays'),
  ...withCategory(linkedListProblems, ['Linked List'], 'linked-list'),
  ...withCategory(hashTableProblems, ['Hash Table'], 'hash-table'),
  ...withCategory(stackQueueProblems, ['Stack', 'Queue'], 'stack-queue'),
  ...withCategory(treeProblems, ['Trees'], 'trees'),
  ...withCategory(graphProblems, ['Graphs'], 'graphs'),
  ...withCategory(stringProblems, ['Strings'], 'strings'),
  ...withCategory(advancedSortingProblems, ['Sorting'], 'advanced-sorting'),
  ...withCategory(greedyProblems, ['Greedy'], 'greedy'),
  ...withCategory(dpProblems, ['Dynamic Programming'], 'dynamic-programming'),
  ...withCategory(recursionProblems, ['Recursion'], 'recursion'),
  ...withCategory(mathProblems, ['Math'], 'math'),
  ...withCategory(heapProblems, ['Heaps'], 'heaps'),
  ...withCategory(trieProblems, ['Tries'], 'tries'),
  ...withCategory(designProblems, ['System Design'], 'system-design'),
  ...withCategory(advancedProblems, ['Advanced'], 'advanced'),
  ...withCategory(sortingProblems, ['Sorting'], 'sorting'),
  ...withCategory(searchingProblems, ['Searching'], 'searching')
];

export const problemCategories: string[] = [
  'All',
  'Arrays',
  'Linked List',
  'Hash Table',
  'Stack',
  'Queue',
  'Trees',
  'Graphs',
  'Strings',
  'Sorting',
  'Searching',
  'Greedy',
  'Dynamic Programming',
  'Recursion',
  'Math',
  'Heaps',
  'Tries',
  'System Design',
  'Advanced'
];

export const problemDifficulties: Array<'All' | ProblemDifficulty> = [
  'All',
  'Easy',
  'Medium',
  'Hard',
  'Expert'
];
