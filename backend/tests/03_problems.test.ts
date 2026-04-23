/**
 * TKT-021 E2E - Problems + premium entitlement journey
 * Creates a test topic, free problem, and premium problem via admin API.
 * Verifies access control for unauthenticated, free, and admin users.
 */
import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import {
  api,
  register,
  getAdminToken,
  createTestTopic,
  createTestProblem,
  deleteTestTopic,
  testEmail,
  type TopicPayload,
  type ProblemPayload,
  TEST_USER_PASSWORD as PASSWORD
} from './helpers.ts';

describe('Problems journey', () => {
  let adminTok = '';
  let freeTok = '';
  let topic: TopicPayload;
  let freeProblem: ProblemPayload;
  let premiumProblem: ProblemPayload;

  before(async () => {
    adminTok = await getAdminToken();
    const auth = await register(testEmail('prob-user'), PASSWORD);
    freeTok = auth.tokens.accessToken;

    topic = await createTestTopic(adminTok);
    freeProblem = await createTestProblem(adminTok, topic.id, { isPremium: false });
    premiumProblem = await createTestProblem(adminTok, topic.id, { isPremium: true });
  });

  after(async () => {
    // Cascade deletes problems too (FK constraint with ON DELETE CASCADE expected).
    await deleteTestTopic(adminTok, topic.id);
  });

  // -------------------------------------------------------------------------
  // List problems
  // -------------------------------------------------------------------------

  it('GET /problems returns list without auth (canAccess=false for premium)', async () => {
    const { status, body } = await api<Array<{ id: string; canAccess: boolean; isPremium: boolean }>>(
      '/problems'
    );
    assert.equal(status, 200);
    assert.ok(Array.isArray(body));

    const free = (body as Array<{ id: string; canAccess: boolean; isPremium: boolean }>).find(
      (p) => p.id === freeProblem.id
    );
    const premium = (body as Array<{ id: string; canAccess: boolean; isPremium: boolean }>).find(
      (p) => p.id === premiumProblem.id
    );

    assert.ok(free, 'free problem should appear in list');
    assert.equal(free?.canAccess, true);
    assert.ok(premium, 'premium problem should appear in list');
    assert.equal(premium?.canAccess, false);
  });

  it('GET /problems with free user auth (canAccess=false for premium)', async () => {
    const { status, body } = await api<Array<{ id: string; canAccess: boolean }>>('/problems', {
      token: freeTok
    });
    assert.equal(status, 200);
    const premium = (body as Array<{ id: string; canAccess: boolean }>).find(
      (p) => p.id === premiumProblem.id
    );
    assert.equal(premium?.canAccess, false);
  });

  it('GET /problems with admin token (canAccess=true for premium)', async () => {
    const { status, body } = await api<Array<{ id: string; canAccess: boolean }>>('/problems', {
      token: adminTok
    });
    assert.equal(status, 200);
    const premium = (body as Array<{ id: string; canAccess: boolean }>).find(
      (p) => p.id === premiumProblem.id
    );
    assert.equal(premium?.canAccess, true);
  });

  // -------------------------------------------------------------------------
  // Get single problem
  // -------------------------------------------------------------------------

  it('GET /problems/:id returns free problem details without auth', async () => {
    const { status, body } = await api<{ id: string; isPremium: boolean }>(
      `/problems/${freeProblem.id}`
    );
    assert.equal(status, 200);
    assert.equal((body as { id: string }).id, freeProblem.id);
    assert.equal((body as { isPremium: boolean }).isPremium, false);
  });

  it('GET /problems/:id returns 403 for premium problem without auth', async () => {
    const { status } = await api(`/problems/${premiumProblem.id}`);
    assert.equal(status, 403);
  });

  it('GET /problems/:id returns 403 for premium problem with free user', async () => {
    const { status } = await api(`/problems/${premiumProblem.id}`, { token: freeTok });
    assert.equal(status, 403);
  });

  it('GET /problems/:id returns 200 for premium problem with admin', async () => {
    const { status, body } = await api<{ id: string; isPremium: boolean }>(
      `/problems/${premiumProblem.id}`,
      { token: adminTok }
    );
    assert.equal(status, 200);
    assert.equal((body as { isPremium: boolean }).isPremium, true);
  });

  it('GET /problems/:id returns 400 for invalid UUID', async () => {
    const { status } = await api('/problems/not-a-uuid');
    assert.equal(status, 400);
  });

  it('GET /problems/:id returns 404 for non-existent problem', async () => {
    const { status } = await api('/problems/00000000-0000-0000-0000-000000000000');
    assert.equal(status, 404);
  });

  // -------------------------------------------------------------------------
  // Submit attempts
  // -------------------------------------------------------------------------

  it('POST /problems/:id/attempts returns 401 without auth', async () => {
    const { status } = await api(`/problems/${freeProblem.id}/attempts`, {
      method: 'POST',
      body: JSON.stringify({ language: 'javascript', submittedCode: 'return 1;' })
    });
    assert.equal(status, 401);
  });

  it('POST /problems/:id/attempts succeeds for free user on free problem', async () => {
    const { status, body } = await api<{ id: string; status: string }>(
      `/problems/${freeProblem.id}/attempts`,
      {
        method: 'POST',
        token: freeTok,
        body: JSON.stringify({ language: 'javascript', submittedCode: 'function sum(a,b){return a+b;}' })
      }
    );
    assert.equal(status, 201);
    assert.ok((body as { id: string }).id, 'attempt id should be returned');
    assert.ok(
      ['accepted', 'wrong_answer'].includes((body as { status: string }).status),
      `unexpected attempt status: ${(body as { status: string }).status}`
    );
  });

  it('POST /problems/:id/attempts returns 403 for free user on premium problem', async () => {
    const { status } = await api(`/problems/${premiumProblem.id}/attempts`, {
      method: 'POST',
      token: freeTok,
      body: JSON.stringify({ language: 'javascript', submittedCode: 'function sum(a,b){return a+b;}' })
    });
    assert.equal(status, 403);
  });

  it('POST /problems/:id/attempts returns 400 for invalid language', async () => {
    const { status } = await api(`/problems/${freeProblem.id}/attempts`, {
      method: 'POST',
      token: freeTok,
      body: JSON.stringify({ language: 'ruby', submittedCode: 'puts 42' })
    });
    assert.equal(status, 400);
  });

  it('POST /problems/:id/attempts returns 400 for oversized code (> 65536 chars)', async () => {
    const { status } = await api(`/problems/${freeProblem.id}/attempts`, {
      method: 'POST',
      token: freeTok,
      body: JSON.stringify({ language: 'javascript', submittedCode: 'x'.repeat(65537) })
    });
    assert.equal(status, 400);
  });

  // -------------------------------------------------------------------------
  // Progress
  // -------------------------------------------------------------------------

  it('GET /progress/me returns 401 without auth', async () => {
    const { status } = await api('/progress/me');
    assert.equal(status, 401);
  });

  it('GET /progress/me returns progress object for authenticated user', async () => {
    const { status, body } = await api<{ topics: unknown[]; completedProblemIds: unknown[] }>(
      '/progress/me',
      { token: freeTok }
    );
    assert.equal(status, 200);
    assert.ok(Array.isArray((body as { topics: unknown[] }).topics));
    assert.ok(Array.isArray((body as { completedProblemIds: unknown[] }).completedProblemIds));
  });

  it('GET /progress/me/recommendations returns 401 without auth', async () => {
    const { status } = await api('/progress/me/recommendations');
    assert.equal(status, 401);
  });

  it('GET /progress/me/recommendations excludes completed and premium-inaccessible problems for free user', async () => {
    const markCompleted = await api(`/progress/me/problems/${freeProblem.id}`, {
      method: 'POST',
      token: freeTok,
      body: JSON.stringify({ completed: true })
    });
    assert.equal(markCompleted.status, 200);

    const { status, body } = await api<{ items: Array<{ problemId: string }> }>(
      '/progress/me/recommendations',
      { token: freeTok }
    );

    assert.equal(status, 200);
    const ids = (body as { items: Array<{ problemId: string }> }).items.map((item) => item.problemId);
    assert.equal(ids.includes(freeProblem.id), false, 'completed problems should not be recommended');
    assert.equal(ids.includes(premiumProblem.id), false, 'premium problem should not be recommended to free users');
  });

  it('GET /progress/me/recommendations includes premium problem for admin', async () => {
    const { status, body } = await api<{ items: Array<{ problemId: string }> }>(
      '/progress/me/recommendations',
      { token: adminTok }
    );

    assert.equal(status, 200);
    const ids = (body as { items: Array<{ problemId: string }> }).items.map((item) => item.problemId);
    assert.equal(ids.includes(premiumProblem.id), true, 'admin should receive premium recommendations');
  });
});
