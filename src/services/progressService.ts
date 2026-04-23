import { apiClient } from './apiClient';
import type {
  ProgressRecommendationsResponse,
  ProblemProgressUpdateResponse,
  UpdateProblemProgressPayload,
  UserProgressResponse
} from '../types/api';

export const progressService = {
  getMyProgress: (token: string) =>
    apiClient.get<UserProgressResponse>('/progress/me', token),

  getRecommendations: (token: string, limit = 6) =>
    apiClient.get<ProgressRecommendationsResponse>(`/progress/me/recommendations?limit=${limit}`, token),

  setProblemCompletion: (problemId: string, completed: boolean, token: string) =>
    apiClient.post<ProblemProgressUpdateResponse, UpdateProblemProgressPayload>(
      `/progress/me/problems/${problemId}`,
      { completed },
      token
    )
};
