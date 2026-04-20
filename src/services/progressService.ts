import { apiClient } from './apiClient';
import type {
  ProblemProgressUpdateResponse,
  UpdateProblemProgressPayload,
  UserProgressResponse
} from '../types/api';

export const progressService = {
  getMyProgress: (token: string) =>
    apiClient.get<UserProgressResponse>('/progress/me', token),

  setProblemCompletion: (problemId: string, completed: boolean, token: string) =>
    apiClient.post<ProblemProgressUpdateResponse, UpdateProblemProgressPayload>(
      `/progress/me/problems/${problemId}`,
      { completed },
      token
    )
};
