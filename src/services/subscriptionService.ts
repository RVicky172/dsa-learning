import { apiClient } from './apiClient';
import type { SubscriptionState } from '../types/api';

interface CheckoutSessionPayload {
  planId: 'pro_monthly' | 'pro_yearly';
}

interface CheckoutSessionResponse {
  checkoutUrl: string;
  checkoutSessionId: string;
}

export const subscriptionService = {
  getMySubscription: (token: string) =>
    apiClient.get<SubscriptionState>('/subscriptions/me', token),

  createCheckoutSession: (payload: CheckoutSessionPayload, token: string) =>
    apiClient.post<CheckoutSessionResponse, CheckoutSessionPayload>(
      '/subscriptions/checkout-session',
      payload,
      token
    ),

  completeMockCheckout: (checkoutSessionId: string, token: string) =>
    apiClient.post<{ message: string }, Record<string, never>>(
      `/payments/mock/complete/${encodeURIComponent(checkoutSessionId)}`,
      {},
      token
    )
};
