/**
 * TKT-021 E2E - Subscription + payment mock journey
 * Covers: /subscriptions/me, /subscriptions/checkout-session,
 *         /payments/mock/complete, /payments/webhook
 */
import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import { api, register, getAdminToken, testEmail, TEST_USER_PASSWORD as PASSWORD } from './helpers.ts';

describe('Subscriptions journey', () => {
  let freeTok = '';
  let userId = '';

  before(async () => {
    const auth = await register(testEmail('sub-user'), PASSWORD);
    freeTok = auth.tokens.accessToken;
    userId = auth.user.id;
  });

  it('GET /subscriptions/me returns 401 without auth', async () => {
    const { status } = await api('/subscriptions/me');
    assert.equal(status, 401);
  });

  it('GET /subscriptions/me returns free tier for new user', async () => {
    const { status, body } = await api<{ tier: string; status: string }>('/subscriptions/me', {
      token: freeTok
    });
    assert.equal(status, 200);
    assert.equal((body as { tier: string }).tier, 'free');
    assert.equal((body as { status: string }).status, 'none');
  });

  it('POST /subscriptions/checkout-session returns 401 without auth', async () => {
    const { status } = await api('/subscriptions/checkout-session', {
      method: 'POST',
      body: JSON.stringify({ planId: 'pro_monthly' })
    });
    assert.equal(status, 401);
  });

  it('POST /subscriptions/checkout-session returns 400 for invalid plan', async () => {
    const { status } = await api('/subscriptions/checkout-session', {
      method: 'POST',
      token: freeTok,
      body: JSON.stringify({ planId: 'enterprise_forever' })
    });
    assert.equal(status, 400);
  });

  it('full pro_monthly upgrade flow via mock checkout', async () => {
    // Step 1: Create checkout session.
    const { status: checkoutStatus, body: checkoutBody } = await api<{
      checkoutUrl: string;
      checkoutSessionId: string;
    }>('/subscriptions/checkout-session', {
      method: 'POST',
      token: freeTok,
      body: JSON.stringify({ planId: 'pro_monthly' })
    });
    assert.equal(checkoutStatus, 201);
    const { checkoutSessionId } = checkoutBody as { checkoutUrl: string; checkoutSessionId: string };
    assert.ok(checkoutSessionId, 'checkoutSessionId should be present');

    // Step 2: Complete payment via mock endpoint.
    const { status: completeStatus } = await api(
      `/payments/mock/complete/${checkoutSessionId}`,
      { method: 'POST', token: freeTok }
    );
    assert.equal(completeStatus, 200);

    // Step 3: Verify subscription is now active.
    const { status: subStatus, body: subBody } = await api<{ tier: string; status: string }>(
      '/subscriptions/me',
      { token: freeTok }
    );
    assert.equal(subStatus, 200);
    assert.equal((subBody as { status: string }).status, 'active');
    assert.ok(
      ['pro_monthly', 'pro_yearly'].includes((subBody as { tier: string }).tier),
      `unexpected tier: ${(subBody as { tier: string }).tier}`
    );

    // Step 4: Verify premium problem access is now granted.
    // (Just check that /users/me shows upgraded tier via auth response)
    const { body: meBody } = await api<{ subscriptionTier: string }>('/users/me', {
      token: freeTok
    });
    // Note: /users/me reads live subscription so should reflect new tier.
    assert.ok(
      ['pro_monthly', 'pro_yearly'].includes((meBody as { subscriptionTier: string }).subscriptionTier),
      `subscriptionTier should be pro after upgrade, got: ${(meBody as { subscriptionTier: string }).subscriptionTier}`
    );
  });

  it('POST /payments/mock/complete/:id returns 403 for another user\'s session', async () => {
    // Create a second user with their own checkout.
    const auth2 = await register(testEmail('sub-user2'), PASSWORD);
    const tok2 = auth2.tokens.accessToken;

    const { body: sessionBody } = await api<{ checkoutSessionId: string }>(
      '/subscriptions/checkout-session',
      {
        method: 'POST',
        token: tok2,
        body: JSON.stringify({ planId: 'pro_yearly' })
      }
    );
    const sessionId = (sessionBody as { checkoutSessionId: string }).checkoutSessionId;

    // Attempt to complete with the first user's token.
    const { status } = await api(`/payments/mock/complete/${sessionId}`, {
      method: 'POST',
      token: freeTok
    });
    assert.equal(status, 403);
  });

  it('POST /payments/webhook returns 401 for missing or wrong secret', async () => {
    const { status: noSecret } = await api('/payments/webhook', {
      method: 'POST',
      body: JSON.stringify({ type: 'checkout.session.completed', data: { providerPaymentId: 'x' } })
    });
    assert.equal(noSecret, 401);

    const { status: wrongSecret } = await api('/payments/webhook', {
      method: 'POST',
      headers: { 'x-webhook-secret': 'wrong-secret' },
      body: JSON.stringify({ type: 'checkout.session.completed', data: { providerPaymentId: 'x' } })
    });
    assert.equal(wrongSecret, 401);
  });
});
