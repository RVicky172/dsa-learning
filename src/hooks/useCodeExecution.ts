import { useCallback, useMemo, useState } from 'react';
import { executionService } from '../services/executionService';
import { useAuth } from './useAuth';
import type {
  ExecutionHistoryQuery,
  ExecutionRecord,
  RunCodePayload,
  RunCodeResult
} from '../types/api';

interface UseCodeExecutionResult {
  isRunning: boolean;
  isLoadingHistory: boolean;
  errorMessage: string | null;
  lastRunResult: RunCodeResult | null;
  history: ExecutionRecord[];
  runCode: (payload: RunCodePayload) => Promise<RunCodeResult>;
  refreshHistory: (query?: ExecutionHistoryQuery) => Promise<void>;
}

export function useCodeExecution(): UseCodeExecutionResult {
  const { token, isAuthenticated } = useAuth();
  const [isRunning, setIsRunning] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastRunResult, setLastRunResult] = useState<RunCodeResult | null>(null);
  const [history, setHistory] = useState<ExecutionRecord[]>([]);

  const assertToken = useCallback((): string => {
    if (!isAuthenticated || !token) {
      throw new Error('Please log in to run code.');
    }

    return token;
  }, [isAuthenticated, token]);

  const runCode = useCallback(
    async (payload: RunCodePayload): Promise<RunCodeResult> => {
      setIsRunning(true);
      setErrorMessage(null);

      try {
        const authToken = assertToken();
        const result = await executionService.runCode(payload, authToken);
        setLastRunResult(result);
        return result;
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to execute code.';
        setErrorMessage(message);
        throw error;
      } finally {
        setIsRunning(false);
      }
    },
    [assertToken]
  );

  const refreshHistory = useCallback(
    async (query?: ExecutionHistoryQuery): Promise<void> => {
      setIsLoadingHistory(true);
      setErrorMessage(null);

      try {
        const authToken = assertToken();
        const response = await executionService.listExecutions(query, authToken);
        setHistory(response.items);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to load execution history.';
        setErrorMessage(message);
        throw error;
      } finally {
        setIsLoadingHistory(false);
      }
    },
    [assertToken]
  );

  return useMemo(
    () => ({
      isRunning,
      isLoadingHistory,
      errorMessage,
      lastRunResult,
      history,
      runCode,
      refreshHistory
    }),
    [isRunning, isLoadingHistory, errorMessage, lastRunResult, history, runCode, refreshHistory]
  );
}
