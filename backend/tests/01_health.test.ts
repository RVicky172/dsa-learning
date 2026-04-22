/**
 * TKT-021 E2E - Health endpoint journey
 * Tests: GET /health, /health/ready, /health/metrics
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { api } from './helpers.ts';

describe('Health endpoints', () => {
  it('GET /health returns 200 with status ok', async () => {
    const { status, body } = await api<{ ok: boolean; service: string }>('/health');
    assert.equal(status, 200);
    assert.equal((body as { ok: boolean }).ok, true);
  });

  it('GET /health/ready returns 200 or 503 with an ok field', async () => {
    const { status, body } = await api<{ ok: boolean }>('/health/ready');
    assert.ok(status === 200 || status === 503, `Unexpected status ${status}`);
    assert.ok(
      typeof (body as { ok?: boolean }).ok === 'boolean',
      'body.ok should be a boolean'
    );
  });

  it('GET /health/metrics returns 200 with memoryBytes field', async () => {
    const { status, body } = await api<{ memoryBytes?: unknown }>('/health/metrics');
    assert.equal(status, 200);
    assert.ok('memoryBytes' in (body as object), 'body should have a memoryBytes field');
  });
});
