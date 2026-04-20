import { useCallback, useEffect, useMemo, useState } from 'react';
import type { CSSProperties, FormEvent } from 'react';
import { Edit3, Plus, RefreshCcw, Trash2, X } from 'lucide-react';
import { apiClient } from '../../services/apiClient';
import type {
  AdminListResponse,
  AdminProblem,
  AdminProblemPayload,
  AdminTopic,
  ApiError
} from '../../types/api';

interface AdminProblemsManagerProps {
  token: string;
  onProblemsChanged?: () => void;
}

const defaultForm: AdminProblemPayload = {
  topicId: '',
  slug: '',
  title: '',
  difficulty: 'Easy',
  isPremium: false,
  statement: '',
  constraints: ''
};

const AdminProblemsManager = ({ token, onProblemsChanged }: AdminProblemsManagerProps) => {
  const [topics, setTopics] = useState<AdminTopic[]>([]);
  const [problems, setProblems] = useState<AdminProblem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterTopicId, setFilterTopicId] = useState<string>('all');
  const [form, setForm] = useState<AdminProblemPayload>(defaultForm);

  const isEditing = useMemo(() => Boolean(editingId), [editingId]);

  const loadTopics = useCallback(async () => {
    const topicsResponse = await apiClient.get<AdminListResponse<AdminTopic>>('/admin/topics', token);
    setTopics(topicsResponse.items);

    if (topicsResponse.items.length > 0) {
      setForm((prev) => (prev.topicId ? prev : { ...prev, topicId: topicsResponse.items[0].id }));
    }
  }, [token]);

  const loadProblems = useCallback(async (topicId: string) => {
    const query = topicId !== 'all' ? `?topicId=${encodeURIComponent(topicId)}` : '';
    const problemsResponse = await apiClient.get<AdminListResponse<AdminProblem>>(`/admin/problems${query}`, token);
    setProblems(problemsResponse.items);
  }, [token]);

  const loadAll = useCallback(async (topicId: string) => {
    setLoading(true);
    try {
      await Promise.all([loadTopics(), loadProblems(topicId)]);
      setError(null);
    } catch {
      setError('Unable to load problems.');
    } finally {
      setLoading(false);
    }
  }, [loadProblems, loadTopics]);

  useEffect(() => {
    void loadAll(filterTopicId);
  }, [filterTopicId, loadAll]);

  const resetForm = () => {
    setEditingId(null);
    setForm((prev) => ({
      ...defaultForm,
      topicId: topics[0]?.id ?? prev.topicId
    }));
  };

  const startEdit = (problem: AdminProblem) => {
    setEditingId(problem.id);
    setForm({
      topicId: problem.topicId,
      slug: problem.slug,
      title: problem.title,
      difficulty: problem.difficulty,
      isPremium: problem.isPremium,
      statement: problem.statement,
      constraints: problem.constraints
    });
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      if (editingId) {
        await apiClient.patch<AdminProblem, AdminProblemPayload>(`/admin/problems/${editingId}`, form, token);
      } else {
        await apiClient.post<AdminProblem, AdminProblemPayload>('/admin/problems', form, token);
      }

      resetForm();
      await loadProblems(filterTopicId);
      onProblemsChanged?.();
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message ?? 'Failed to save problem.');
    } finally {
      setSubmitting(false);
    }
  };

  const deleteProblem = async (problemId: string) => {
    setError(null);

    try {
      await apiClient.delete<Record<string, never>>(`/admin/problems/${problemId}`, token);
      if (editingId === problemId) {
        resetForm();
      }
      await loadProblems(filterTopicId);
      onProblemsChanged?.();
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message ?? 'Failed to delete problem.');
    }
  };

  const disabledBecauseNoTopics = topics.length === 0;

  return (
    <div className="glass" style={{ padding: '1rem', borderRadius: '14px', marginTop: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ margin: 0 }}>Manage Problems</h3>
          <p style={{ margin: '0.35rem 0 0', color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            Maintain problem inventory by topic with difficulty and monetization flags.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <select
            value={filterTopicId}
            onChange={(event) => setFilterTopicId(event.target.value)}
            style={inputStyle}
          >
            <option value="all">All topics</option>
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>{topic.title}</option>
            ))}
          </select>

          <button
            onClick={() => {
              void loadAll(filterTopicId);
            }}
            style={{
              minHeight: '40px',
              borderRadius: '10px',
              border: '1px solid var(--border-color)',
              background: 'transparent',
              color: 'var(--text-secondary)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0 0.85rem',
              cursor: 'pointer'
            }}
          >
            <RefreshCcw size={15} />
            Refresh
          </button>
        </div>
      </div>

      {error ? <div style={{ color: 'var(--error-color)', marginBottom: '0.75rem' }}>{error}</div> : null}

      {disabledBecauseNoTopics ? (
        <div style={{ color: 'var(--warning-light)', marginBottom: '1rem' }}>
          Create at least one topic before adding problems.
        </div>
      ) : null}

      <form onSubmit={submitForm} style={{ display: 'grid', gap: '0.7rem', marginBottom: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.65rem' }}>
          <select
            value={form.topicId}
            onChange={(event) => setForm((prev) => ({ ...prev, topicId: event.target.value }))}
            required
            style={inputStyle}
            disabled={disabledBecauseNoTopics}
          >
            <option value="" disabled>Select topic</option>
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>{topic.title}</option>
            ))}
          </select>

          <input
            value={form.title}
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
            placeholder="Problem title"
            required
            style={inputStyle}
            disabled={disabledBecauseNoTopics}
          />

          <input
            value={form.slug}
            onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value }))}
            placeholder="problem-slug"
            required
            style={inputStyle}
            disabled={disabledBecauseNoTopics}
          />

          <select
            value={form.difficulty}
            onChange={(event) => setForm((prev) => ({ ...prev, difficulty: event.target.value as AdminProblemPayload['difficulty'] }))}
            style={inputStyle}
            disabled={disabledBecauseNoTopics}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <label style={{ ...inputStyle, display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={form.isPremium}
              onChange={(event) => setForm((prev) => ({ ...prev, isPremium: event.target.checked }))}
              disabled={disabledBecauseNoTopics}
            />
            Premium
          </label>
        </div>

        <textarea
          value={form.statement}
          onChange={(event) => setForm((prev) => ({ ...prev, statement: event.target.value }))}
          placeholder="Problem statement"
          required
          rows={4}
          style={{ ...inputStyle, resize: 'vertical' }}
          disabled={disabledBecauseNoTopics}
        />

        <textarea
          value={form.constraints}
          onChange={(event) => setForm((prev) => ({ ...prev, constraints: event.target.value }))}
          placeholder="Constraints (optional)"
          rows={2}
          style={{ ...inputStyle, resize: 'vertical' }}
          disabled={disabledBecauseNoTopics}
        />

        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button
            type="submit"
            disabled={submitting || disabledBecauseNoTopics}
            style={{
              minHeight: '40px',
              borderRadius: '10px',
              border: 'none',
              background: 'var(--primary-gradient)',
              color: 'white',
              fontWeight: 700,
              padding: '0 1rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem'
            }}
          >
            {isEditing ? <Edit3 size={15} /> : <Plus size={15} />}
            {submitting ? 'Saving...' : isEditing ? 'Update Problem' : 'Create Problem'}
          </button>

          {isEditing ? (
            <button
              type="button"
              onClick={resetForm}
              style={{
                minHeight: '40px',
                borderRadius: '10px',
                border: '1px solid var(--border-color)',
                background: 'transparent',
                color: 'var(--text-secondary)',
                padding: '0 1rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem'
              }}
            >
              <X size={15} />
              Cancel Edit
            </button>
          ) : null}
        </div>
      </form>

      {loading ? (
        <div style={{ color: 'var(--text-muted)' }}>Loading problems...</div>
      ) : (
        <div style={{ display: 'grid', gap: '0.55rem' }}>
          {problems.map((problem) => (
            <div key={problem.id} style={{ border: '1px solid var(--border-color)', borderRadius: '12px', padding: '0.7rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{problem.title}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {problem.slug} • {problem.topicTitle} • {problem.difficulty}
                  </div>
                  <div style={{ color: 'var(--text-secondary)', marginTop: '0.35rem', fontSize: '0.92rem' }}>
                    {problem.statement}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  {problem.isPremium ? (
                    <span style={premiumBadgeStyle}>Premium</span>
                  ) : (
                    <span style={freeBadgeStyle}>Free</span>
                  )}
                  <button onClick={() => startEdit(problem)} style={iconButtonStyle} aria-label={`Edit ${problem.title}`}>
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={() => {
                      const shouldDelete = window.confirm(`Delete problem "${problem.title}"?`);
                      if (shouldDelete) {
                        void deleteProblem(problem.id);
                      }
                    }}
                    style={iconButtonStyle}
                    aria-label={`Delete ${problem.title}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {problems.length === 0 ? <div style={{ color: 'var(--text-muted)' }}>No problems found for this filter.</div> : null}
        </div>
      )}
    </div>
  );
};

const inputStyle: CSSProperties = {
  background: 'var(--bg-tertiary)',
  border: '1px solid var(--border-color)',
  borderRadius: '10px',
  color: 'var(--text-main)',
  minHeight: '40px',
  padding: '0.55rem 0.7rem',
  font: 'inherit'
};

const iconButtonStyle: CSSProperties = {
  width: '32px',
  height: '32px',
  borderRadius: '8px',
  border: '1px solid var(--border-color)',
  background: 'transparent',
  color: 'var(--text-secondary)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer'
};

const premiumBadgeStyle: CSSProperties = {
  fontSize: '0.78rem',
  padding: '0.18rem 0.5rem',
  borderRadius: '999px',
  background: 'var(--accent-gradient)',
  color: 'white'
};

const freeBadgeStyle: CSSProperties = {
  fontSize: '0.78rem',
  padding: '0.18rem 0.5rem',
  borderRadius: '999px',
  background: 'var(--info-bg)',
  color: 'var(--info-light)'
};

export default AdminProblemsManager;
