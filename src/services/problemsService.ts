import { apiClient } from './apiClient';

export interface ProblemSolution {
  id: string;
  language: string;
  approach: string;
  code: string;
  timeComplexity: string;
  spaceComplexity: string;
  isOptimal: boolean;
}

export interface ProblemHint {
  id: string;
  text: string;
}

export interface ProblemExample {
  id: string;
  input: string;
  output: string;
  explanation: string;
}

export interface Problem {
  id: string;
  topicId: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  statement: string;
  constraints: string;
  isPremium: boolean;
  canAccess: boolean;
}

export interface ProblemDetail extends Problem {
  solutions: ProblemSolution[];
  hints: ProblemHint[];
  examples: ProblemExample[];
}

export const problemsService = {
  /**
   * Get all problems (optionally filtered by topic)
   */
  getAllProblems: (topicId?: string, token?: string) => {
    const params = topicId ? `?topicId=${topicId}` : '';
    return apiClient.get<{ problems: Problem[] }>(`/problems${params}`, token);
  },

  /**
   * Get a specific problem with full details (solutions, hints, examples)
   */
  getProblemById: (problemId: string, token?: string) =>
    apiClient.get<ProblemDetail>(`/problems/${problemId}`, token),

  /**
   * Submit a code attempt for a problem
   */
  submitAttempt: (
    problemId: string,
    submittedCode: string,
    language: string,
    token: string
  ) =>
    apiClient.post<
      { id: string; status: string; runtimeMs: number; memoryKb: number },
      { submittedCode: string; language: string }
    >(
      `/problems/${problemId}/attempts`,
      {
        submittedCode,
        language
      },
      token
    )
};
