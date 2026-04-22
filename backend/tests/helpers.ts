/**
 * Shared helpers for integration tests.
 * Tests run against a live backend via TEST_API_URL (default http://localhost:4000).
 */

function envRequired(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Integration tests require env var: ${name}`);
  return v;
}

export const BASE_URL = (process.env['TEST_API_URL'] ?? 'http://localhost:4000').replace(/\/$/, '');

/** Password used when registering test users (set via TEST_USER_PASSWORD env var). */
export const TEST_USER_PASSWORD = envRequired('TEST_USER_PASSWORD');

/** Unique suffix per test run to prevent DB key collisions between runs. */
export const RUN_ID = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

let _slugCounter = 0;

export function testEmail(tag: string): string {
  return `test-${tag}-${RUN_ID}@e2e.local`;
}

export function testSlug(tag: string): string {
  return `e2e-${tag}-${RUN_ID}-${++_slugCounter}`;
}

// ---------------------------------------------------------------------------
// Typed fetch wrapper
// ---------------------------------------------------------------------------

export interface ApiResponse<T = unknown> {
  status: number;
  body: T;
}

export async function api<T = unknown>(
  path: string,
  init?: {
    method?: string;
    body?: string;
    token?: string;
    headers?: Record<string, string>;
  }
): Promise<ApiResponse<T>> {
  const { token, headers: extraHeaders, ...rest } = init ?? {};
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...extraHeaders
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...rest, headers });
  const body = await res.json().catch(() => null) as T;
  return { status: res.status, body };
}

// ---------------------------------------------------------------------------
// Auth helpers
// ---------------------------------------------------------------------------

export interface AuthPayload {
  user: {
    id: string;
    email: string;
    displayName: string;
    roles: string[];
    subscriptionTier: string;
  };
  tokens: { accessToken: string };
}

export async function register(
  email: string,
  password = TEST_USER_PASSWORD,
  displayName = 'E2E User'
): Promise<AuthPayload> {
  const { status, body } = await api<AuthPayload>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, displayName })
  });
  if (status !== 201) {
    throw new Error(`register failed (${status}): ${JSON.stringify(body)}`);
  }
  return body;
}

export async function login(email: string, password: string): Promise<AuthPayload> {
  const { status, body } = await api<AuthPayload>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  if (status !== 200) {
    throw new Error(`login failed (${status}): ${JSON.stringify(body)}`);
  }
  return body;
}

let _cachedAdminToken: string | null = null;

export async function getAdminToken(): Promise<string> {
  if (_cachedAdminToken) return _cachedAdminToken;
  const email = process.env['TEST_ADMIN_EMAIL'] ?? 'admin@dsamaster.local';
  const password = envRequired('TEST_ADMIN_PASSWORD');
  const auth = await login(email, password);
  _cachedAdminToken = auth.tokens.accessToken;
  return _cachedAdminToken;
}

// ---------------------------------------------------------------------------
// Admin resource helpers
// ---------------------------------------------------------------------------

export interface TopicPayload {
  id: string;
  slug: string;
  title: string;
}

export async function createTestTopic(
  adminTok: string,
  overrides?: Partial<{ slug: string; title: string; description: string }>
): Promise<TopicPayload> {
  const slug = overrides?.slug ?? testSlug('topic');
  const { status, body } = await api<TopicPayload>('/admin/topics', {
    method: 'POST',
    token: adminTok,
    body: JSON.stringify({
      slug,
      title: overrides?.title ?? `E2E Topic ${slug}`,
      description: overrides?.description ?? 'Integration test topic',
      orderIndex: 0,
      isPublished: true
    })
  });
  if (status !== 201) throw new Error(`createTestTopic failed (${status}): ${JSON.stringify(body)}`);
  return body;
}

export interface ProblemPayload {
  id: string;
  slug: string;
  title: string;
  isPremium: boolean;
}

export async function createTestProblem(
  adminTok: string,
  topicId: string,
  overrides?: Partial<{ slug: string; title: string; isPremium: boolean; difficulty: string }>
): Promise<ProblemPayload> {
  const slug = overrides?.slug ?? testSlug('problem');
  const { status, body } = await api<ProblemPayload>('/admin/problems', {
    method: 'POST',
    token: adminTok,
    body: JSON.stringify({
      topicId,
      slug,
      title: overrides?.title ?? `E2E Problem ${slug}`,
      difficulty: overrides?.difficulty ?? 'Easy',
      isPremium: overrides?.isPremium ?? false,
      statement: 'Given an array of integers, return the sum.',
      constraints: '1 <= n <= 1000'
    })
  });
  if (status !== 201) throw new Error(`createTestProblem failed (${status}): ${JSON.stringify(body)}`);
  return body;
}

export async function deleteTestTopic(adminTok: string, topicId: string): Promise<void> {
  await api(`/admin/topics/${topicId}`, { method: 'DELETE', token: adminTok });
}
