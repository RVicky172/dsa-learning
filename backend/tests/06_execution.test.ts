/**
 * TKT-021 E2E - Code execution journey
 * Covers: /execution/run (auth, validation, premium gating, async mode),
 *         GET /execution/:id, GET /execution (list)
 *
 * Note: Tests that actually run code inside Docker are marked as optional
 * and check both 200 (Docker available) and 500/503 (Docker not available).
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

describe('Execution journey', () => {
  let freeTok = '';
  let adminTok = '';
  let topic: TopicPayload;
  let freeProblem: ProblemPayload;
  let premiumProblem: ProblemPayload;
  let queuedExecutionId = '';

  before(async () => {
    adminTok = await getAdminToken();
    const auth = await register(testEmail('exec-user'), PASSWORD);
    freeTok = auth.tokens.accessToken;

    topic = await createTestTopic(adminTok);
    freeProblem = await createTestProblem(adminTok, topic.id, { isPremium: false });
    premiumProblem = await createTestProblem(adminTok, topic.id, { isPremium: true });
  });

  after(async () => {
    await deleteTestTopic(adminTok, topic.id);
  });

  // -------------------------------------------------------------------------
  // Auth / validation gates (no Docker needed)
  // -------------------------------------------------------------------------

  it('POST /execution/run returns 401 without auth', async () => {
    const { status } = await api('/execution/run', {
      method: 'POST',
      body: JSON.stringify({ language: 'javascript', sourceCode: 'console.log(1)' })
    });
    assert.equal(status, 401);
  });

  it('POST /execution/run returns 400 for unsupported language', async () => {
    const { status } = await api('/execution/run', {
      method: 'POST',
      token: freeTok,
      body: JSON.stringify({ language: 'ruby', sourceCode: 'puts 1' })
    });
    assert.equal(status, 400);
  });

  it('POST /execution/run returns 400 for empty sourceCode', async () => {
    const { status } = await api('/execution/run', {
      method: 'POST',
      token: freeTok,
      body: JSON.stringify({ language: 'javascript', sourceCode: '' })
    });
    assert.equal(status, 400);
  });

  it('POST /execution/run returns 400 for oversized sourceCode (> 65536 chars)', async () => {
    const { status } = await api('/execution/run', {
      method: 'POST',
      token: freeTok,
      body: JSON.stringify({ language: 'javascript', sourceCode: 'x'.repeat(65537) })
    });
    assert.equal(status, 400);
  });

  it('POST /execution/run returns 403 for free user on premium problem', async () => {
    const { status } = await api('/execution/run', {
      method: 'POST',
      token: freeTok,
      body: JSON.stringify({
        problemId: premiumProblem.id,
        language: 'javascript',
        sourceCode: 'console.log(42)',
        waitForCompletion: false
      })
    });
    assert.equal(status, 403);
  });

  it('POST /execution/run returns 404 for non-existent problemId', async () => {
    const { status } = await api('/execution/run', {
      method: 'POST',
      token: freeTok,
      body: JSON.stringify({
        problemId: '00000000-0000-0000-0000-000000000000',
        language: 'javascript',
        sourceCode: 'console.log(1)',
        waitForCompletion: false
      })
    });
    assert.equal(status, 404);
  });

  // -------------------------------------------------------------------------
  // Async execution (queues job, returns 202 immediately - no Docker needed)
  // -------------------------------------------------------------------------

  it('POST /execution/run with waitForCompletion=false returns 202 and executionId', async () => {
    const { status, body } = await api<{ id: string; status: string }>(
      '/execution/run',
      {
        method: 'POST',
        token: freeTok,
        body: JSON.stringify({
          problemId: freeProblem.id,
          language: 'javascript',
          sourceCode: 'console.log("hello")',
          waitForCompletion: false
        })
      }
    );
    // 202 means queued; 503 means queue at capacity (also acceptable in test env).
    assert.ok(status === 202 || status === 503, `Unexpected status ${status}`);
    if (status === 202) {
      const b = body as { id: string; status: string };
      assert.ok(b.id, 'executionId should be returned');
      assert.equal(b.status, 'queued');
      queuedExecutionId = b.id;
    }
  });

  // -------------------------------------------------------------------------
  // GET /execution/:id
  // -------------------------------------------------------------------------

  it('GET /execution/:id returns 401 without auth', async () => {
    const id = queuedExecutionId || '00000000-0000-0000-0000-000000000001';
    const { status } = await api(`/execution/${id}`);
    assert.equal(status, 401);
  });

  it('GET /execution/:id returns 400 for invalid UUID', async () => {
    const { status } = await api('/execution/not-a-uuid', { token: freeTok });
    assert.equal(status, 400);
  });

  it('GET /execution/:id returns own execution record', async () => {
    if (!queuedExecutionId) {
      // Skip if async run did not succeed (queue full or Docker unavailable).
      return;
    }
    const { status, body } = await api<{ id: string; status: string }>(
      `/execution/${queuedExecutionId}`,
      { token: freeTok }
    );
    assert.equal(status, 200);
    assert.equal((body as { id: string }).id, queuedExecutionId);
  });

  it('GET /execution/:id returns 404 for another user\'s execution', async () => {
    if (!queuedExecutionId) return;
    // Admin token should NOT be able to fetch a different user's execution.
    const { status } = await api(`/execution/${queuedExecutionId}`, { token: adminTok });
    assert.equal(status, 404);
  });

  // -------------------------------------------------------------------------
  // GET /execution (list)
  // -------------------------------------------------------------------------

  it('GET /execution returns 401 without auth', async () => {
    const { status } = await api('/execution');
    assert.equal(status, 401);
  });

  it('GET /execution returns paginated list for authenticated user', async () => {
    const { status, body } = await api<{ items: unknown[]; pagination: { page: number } }>(
      '/execution',
      { token: freeTok }
    );
    assert.equal(status, 200);
    const b = body as { items: unknown[]; pagination: { page: number } };
    assert.ok(Array.isArray(b.items));
    assert.equal(b.pagination.page, 1);
  });

  it('GET /execution accepts language and status filters', async () => {
    const { status } = await api('/execution?language=javascript&status=queued', {
      token: freeTok
    });
    assert.equal(status, 200);
  });

  it('GET /execution returns 400 for invalid status filter', async () => {
    const { status } = await api('/execution?status=banana', { token: freeTok });
    assert.equal(status, 400);
  });
});
