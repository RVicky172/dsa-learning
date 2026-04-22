/**
 * TKT-021 E2E - Auth user journey
 * Covers: register, login, logout, forgot-password, /users/me
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { api, register, login, testEmail, RUN_ID, TEST_USER_PASSWORD as PASSWORD } from './helpers.ts';

describe('Auth journey', () => {
  const email = testEmail('auth');
  let accessToken = '';

  it('POST /auth/register creates a new user and returns access token', async () => {
    const auth = await register(email, PASSWORD, 'Auth Test User');
    assert.ok(auth.tokens.accessToken, 'accessToken should be present');
    assert.equal(auth.user.email, email);
    assert.ok(auth.user.roles.includes('user'), 'should have user role');
    assert.equal(auth.user.subscriptionTier, 'free');
    accessToken = auth.tokens.accessToken;
  });

  it('POST /auth/register returns 409 for duplicate email', async () => {
    const { status } = await api('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password: PASSWORD, displayName: 'Dup User' })
    });
    assert.equal(status, 409);
  });

  it('POST /auth/register returns 400 for short password', async () => {
    const { status } = await api('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email: testEmail('bad'), password: 'short', displayName: 'Bad' })
    });
    assert.equal(status, 400);
  });

  it('POST /auth/register returns 400 for missing displayName', async () => {
    const { status } = await api('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email: testEmail('nodisplay'), password: PASSWORD })
    });
    assert.equal(status, 400);
  });

  it('POST /auth/login succeeds with valid credentials', async () => {
    const auth = await login(email, PASSWORD);
    assert.ok(auth.tokens.accessToken);
    assert.equal(auth.user.email, email);
  });

  it('POST /auth/login returns 401 for wrong password', async () => {
    const { status } = await api('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password: 'WrongPass99!' })
    });
    assert.equal(status, 401);
  });

  it('POST /auth/login returns 401 for non-existent email', async () => {
    const { status } = await api('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: `nobody-${RUN_ID}@e2e.local`, password: PASSWORD })
    });
    assert.equal(status, 401);
  });

  it('GET /users/me returns authenticated user profile', async () => {
    const { status, body } = await api<{ email: string; roles: string[] }>('/users/me', {
      token: accessToken
    });
    assert.equal(status, 200);
    assert.equal((body as { email: string }).email, email);
  });

  it('GET /users/me returns 401 without token', async () => {
    const { status } = await api('/users/me');
    assert.equal(status, 401);
  });

  it('POST /auth/logout returns 200', async () => {
    const { status } = await api('/auth/logout', { method: 'POST', token: accessToken });
    assert.equal(status, 200);
  });

  it('POST /auth/forgot-password returns generic 200 (no email enumeration)', async () => {
    const knownEmail = await api('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
    const unknownEmail = await api('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email: `nosuchuser-${RUN_ID}@e2e.local` })
    });
    // Both must return 200 to prevent user enumeration
    assert.equal(knownEmail.status, 200);
    assert.equal(unknownEmail.status, 200);
  });

  it('POST /auth/forgot-password returns 400 for invalid email format', async () => {
    const { status } = await api('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email: 'not-an-email' })
    });
    assert.equal(status, 400);
  });
});
