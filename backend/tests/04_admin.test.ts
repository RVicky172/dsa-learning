/**
 * TKT-021 E2E - Admin CRUD journey
 * Verifies: non-admin blocked, admin can CRUD topics and problems.
 */
import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { api, register, getAdminToken, testEmail, testSlug, TEST_USER_PASSWORD as PASSWORD } from './helpers.ts';

describe('Admin journey', () => {
  let adminTok = '';
  let nonAdminTok = '';
  let createdTopicId = '';
  let createdTopicSlug = '';
  let createdProblemId = '';

  before(async () => {
    adminTok = await getAdminToken();
    const auth = await register(testEmail('admin-nonadmin'), PASSWORD);
    nonAdminTok = auth.tokens.accessToken;
  });

  after(async () => {
    // Clean up: delete the test topic (cascades to problems).
    if (createdTopicId) {
      await api(`/admin/topics/${createdTopicId}`, { method: 'DELETE', token: adminTok });
    }
  });

  // -------------------------------------------------------------------------
  // Overview
  // -------------------------------------------------------------------------

  it('GET /admin/overview returns 401 without auth', async () => {
    const { status } = await api('/admin/overview');
    assert.equal(status, 401);
  });

  it('GET /admin/overview returns 403 for non-admin user', async () => {
    const { status } = await api('/admin/overview', { token: nonAdminTok });
    assert.equal(status, 403);
  });

  it('GET /admin/overview returns counts for admin', async () => {
    const { status, body } = await api<{ users: number; problems: number; topics: number; attempts: number }>(
      '/admin/overview',
      { token: adminTok }
    );
    assert.equal(status, 200);
    const b = body as { users: number; problems: number; topics: number; attempts: number };
    assert.ok(typeof b.users === 'number');
    assert.ok(typeof b.problems === 'number');
    assert.ok(typeof b.topics === 'number');
    assert.ok(typeof b.attempts === 'number');
  });

  // -------------------------------------------------------------------------
  // Topic CRUD
  // -------------------------------------------------------------------------

  it('POST /admin/topics returns 403 for non-admin', async () => {
    const { status } = await api('/admin/topics', {
      method: 'POST',
      token: nonAdminTok,
      body: JSON.stringify({ slug: testSlug('blocked'), title: 'Blocked', description: 'n/a' })
    });
    assert.equal(status, 403);
  });

  it('POST /admin/topics creates a topic as admin', async () => {
    const slug = testSlug('admin-topic');
    const { status, body } = await api<{ id: string; slug: string; title: string }>(
      '/admin/topics',
      {
        method: 'POST',
        token: adminTok,
        body: JSON.stringify({
          slug,
          title: `Admin E2E Topic ${slug}`,
          description: 'Created by admin E2E test',
          orderIndex: 99,
          isPublished: true
        })
      }
    );
    assert.equal(status, 201);
    const b = body as { id: string; slug: string; title: string };
    assert.ok(b.id, 'id should be present');
    assert.equal(b.slug, slug);
    createdTopicId = b.id;
    createdTopicSlug = slug;
  });

  it('POST /admin/topics returns 409 for duplicate slug', async () => {
    assert.ok(createdTopicSlug, 'createdTopicSlug must be set by previous test');
    const { status } = await api('/admin/topics', {
      method: 'POST',
      token: adminTok,
      body: JSON.stringify({
        slug: createdTopicSlug,
        title: 'Duplicate',
        description: 'Dup'
      })
    });
    assert.equal(status, 409);
  });

  it('PATCH /admin/topics/:id updates title as admin', async () => {
    assert.ok(createdTopicId, 'createdTopicId should be set by previous test');
    const newTitle = `Updated Title ${Date.now()}`;
    const { status, body } = await api<{ title: string }>(
      `/admin/topics/${createdTopicId}`,
      {
        method: 'PATCH',
        token: adminTok,
        body: JSON.stringify({ title: newTitle })
      }
    );
    assert.equal(status, 200);
    assert.equal((body as { title: string }).title, newTitle);
  });

  it('PATCH /admin/topics/:id returns 403 for non-admin', async () => {
    const { status } = await api(`/admin/topics/${createdTopicId}`, {
      method: 'PATCH',
      token: nonAdminTok,
      body: JSON.stringify({ title: 'Hacked' })
    });
    assert.equal(status, 403);
  });

  it('PATCH /admin/topics/:id returns 400 for invalid UUID', async () => {
    const { status } = await api('/admin/topics/not-a-uuid', {
      method: 'PATCH',
      token: adminTok,
      body: JSON.stringify({ title: 'x' })
    });
    assert.equal(status, 400);
  });

  // -------------------------------------------------------------------------
  // Problem CRUD
  // -------------------------------------------------------------------------

  it('POST /admin/problems creates a problem linked to the test topic', async () => {
    assert.ok(createdTopicId, 'createdTopicId must exist');
    const slug = testSlug('admin-problem');
    const { status, body } = await api<{ id: string; isPremium: boolean; topicId: string }>(
      '/admin/problems',
      {
        method: 'POST',
        token: adminTok,
        body: JSON.stringify({
          topicId: createdTopicId,
          slug,
          title: `Admin E2E Problem ${slug}`,
          difficulty: 'Medium',
          isPremium: true,
          statement: 'Find the maximum subarray sum.',
          constraints: '1 <= n <= 10^5'
        })
      }
    );
    assert.equal(status, 201);
    const b = body as { id: string; isPremium: boolean; topicId: string };
    assert.ok(b.id);
    assert.equal(b.isPremium, true);
    assert.equal(b.topicId, createdTopicId);
    createdProblemId = b.id;
  });

  it('POST /admin/problems returns 403 for non-admin', async () => {
    const { status } = await api('/admin/problems', {
      method: 'POST',
      token: nonAdminTok,
      body: JSON.stringify({
        topicId: createdTopicId,
        slug: testSlug('blocked-problem'),
        title: 'Blocked Problem',
        difficulty: 'Easy',
        isPremium: false,
        statement: 'Blocked.',
        constraints: ''
      })
    });
    assert.equal(status, 403);
  });

  it('PATCH /admin/problems/:id toggles isPremium', async () => {
    assert.ok(createdProblemId, 'createdProblemId must exist');
    const { status, body } = await api<{ isPremium: boolean }>(
      `/admin/problems/${createdProblemId}`,
      {
        method: 'PATCH',
        token: adminTok,
        body: JSON.stringify({ isPremium: false })
      }
    );
    assert.equal(status, 200);
    assert.equal((body as { isPremium: boolean }).isPremium, false);
  });

  it('GET /admin/problems lists problems for admin', async () => {
    const { status, body } = await api<{ items: unknown[] }>('/admin/problems', {
      token: adminTok
    });
    assert.equal(status, 200);
    assert.ok(Array.isArray((body as { items: unknown[] }).items));
  });

  it('GET /admin/problems returns 403 for non-admin', async () => {
    const { status } = await api('/admin/problems', { token: nonAdminTok });
    assert.equal(status, 403);
  });

  it('DELETE /admin/topics/:id returns 404 for non-existent topic', async () => {
    const { status } = await api('/admin/topics/00000000-0000-0000-0000-000000000000', {
      method: 'DELETE',
      token: adminTok
    });
    assert.equal(status, 404);
  });
});
