import { apiClient } from './apiClient';
import type {
  ExecutionHistoryQuery,
  ExecutionHistoryResponse,
  ExecutionRecord,
  RunCodePayload,
  RunCodeResult
} from '../types/api';

function buildExecutionListPath(query?: ExecutionHistoryQuery): string {
  if (!query) {
    return '/execution';
  }

  const params = new URLSearchParams();

  if (query.problemId) {
    params.set('problemId', query.problemId);
  }

  if (query.language) {
    params.set('language', query.language);
  }

  if (query.status) {
    params.set('status', query.status);
  }

  if (query.page) {
    params.set('page', String(query.page));
  }

  if (query.pageSize) {
    params.set('pageSize', String(query.pageSize));
  }

  const encoded = params.toString();
  return encoded ? `/execution?${encoded}` : '/execution';
}

export const executionService = {
  runCode: (payload: RunCodePayload, token: string) =>
    apiClient.post<RunCodeResult, RunCodePayload>('/execution/run', payload, token),

  getExecutionById: (executionId: string, token: string) =>
    apiClient.get<ExecutionRecord>(`/execution/${encodeURIComponent(executionId)}`, token),

  listExecutions: (query: ExecutionHistoryQuery | undefined, token: string) =>
    apiClient.get<ExecutionHistoryResponse>(buildExecutionListPath(query), token)
};
