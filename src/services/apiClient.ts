import type { ApiError } from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000';

function buildHeaders(token?: string): HeadersInit {
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

async function request<TResponse>(
  path: string,
  options: RequestInit,
  token?: string
): Promise<TResponse> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...buildHeaders(token),
      ...(options.headers ?? {})
    }
  });

  if (!response.ok) {
    let message = 'Request failed';
    try {
      const payload = await response.json() as { message?: string };
      if (payload.message) {
        message = payload.message;
      }
    } catch {
      // Keep fallback message when body is not JSON.
    }
    const error: ApiError = { status: response.status, message };
    throw error;
  }

  if (response.status === 204) {
    return {} as TResponse;
  }

  return response.json() as Promise<TResponse>;
}

export const apiClient = {
  get: <TResponse>(path: string, token?: string) =>
    request<TResponse>(path, { method: 'GET' }, token),

  post: <TResponse, TBody>(path: string, body: TBody, token?: string) =>
    request<TResponse>(path, { method: 'POST', body: JSON.stringify(body) }, token),

  patch: <TResponse, TBody>(path: string, body: TBody, token?: string) =>
    request<TResponse>(path, { method: 'PATCH', body: JSON.stringify(body) }, token),

  delete: <TResponse>(path: string, token?: string) =>
    request<TResponse>(path, { method: 'DELETE' }, token)
};
