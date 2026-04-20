import { apiClient } from './apiClient';
import type { AuthResponse, AuthUser } from '../types/api';

interface RegisterPayload {
  email: string;
  password: string;
  displayName: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface ForgotPasswordPayload {
  email: string;
}

export const authService = {
  register: (payload: RegisterPayload) =>
    apiClient.post<AuthResponse, RegisterPayload>('/auth/register', payload),

  login: (payload: LoginPayload) =>
    apiClient.post<AuthResponse, LoginPayload>('/auth/login', payload),

  logout: (token: string) =>
    apiClient.post<{ message: string }, Record<string, never>>('/auth/logout', {}, token),

  forgotPassword: (payload: ForgotPasswordPayload) =>
    apiClient.post<{ message: string }, ForgotPasswordPayload>('/auth/forgot-password', payload),

  me: (token: string) =>
    apiClient.get<AuthUser>('/users/me', token)
};
