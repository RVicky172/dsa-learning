import { useState, useEffect } from 'react';
import { problemsService, type ProblemDetail } from '../services/problemsService';
import type { ApiError } from '../types/api';

export interface UseProblemsResult {
  problem: ProblemDetail | null;
  loading: boolean;
  error: ApiError | null;
}

export function useProblem(problemId: string, token?: string): UseProblemsResult {
  const [problem, setProblem] = useState<ProblemDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const loadProblem = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await problemsService.getProblemById(problemId, token);
        setProblem(data);
      } catch (err) {
        setError(err as ApiError);
        setProblem(null);
      } finally {
        setLoading(false);
      }
    };

    loadProblem();
  }, [problemId, token]);

  return { problem, loading, error };
}
