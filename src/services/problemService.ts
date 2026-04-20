import { apiClient } from './apiClient';
import type {
  ProblemAttemptPayload,
  ProblemAttemptResult,
  ProblemDetailApi,
  ProblemListItemApi
} from '../types/api';

interface ProblemListQuery {
  topicId?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}

function buildProblemListPath(query?: ProblemListQuery): string {
  if (!query) {
    return '/problems';
  }

  const params = new URLSearchParams();
  if (query.topicId) {
    params.set('topicId', query.topicId);
  }
  if (query.difficulty) {
    params.set('difficulty', query.difficulty);
  }

  const encoded = params.toString();
  return encoded ? `/problems?${encoded}` : '/problems';
}

export const problemService = {
  list: (query?: ProblemListQuery, token?: string) =>
    apiClient.get<ProblemListItemApi[]>(buildProblemListPath(query), token),

  listByTopic: (topicId: string, token?: string) =>
    apiClient.get<ProblemListItemApi[]>(buildProblemListPath({ topicId }), token),

  getById: (problemId: string, token?: string) =>
    apiClient.get<ProblemDetailApi>(`/problems/${problemId}`, token),

  submitAttempt: (problemId: string, payload: ProblemAttemptPayload, token: string) =>
    apiClient.post<ProblemAttemptResult, ProblemAttemptPayload>(
      `/problems/${problemId}/attempts`,
      payload,
      token
    )
};
