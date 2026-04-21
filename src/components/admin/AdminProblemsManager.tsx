import { useCallback, useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { Edit3, Plus, RefreshCcw, Trash2, X } from 'lucide-react';
import { apiClient } from '../../services/apiClient';
import type {
  AdminListResponse,
  AdminProblem,
  AdminProblemPayload,
  AdminTopic,
  ApiError
} from '../../types/api';
import styles from './AdminProblemsManager.module.css';

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
    <div className={`glass ${styles.root}`}>
      <div className={styles.headerRow}>
        <div>
          <h3 className={styles.title}>Manage Problems</h3>
          <p className={styles.subtitle}>
            Maintain problem inventory by topic with difficulty and monetization flags.
          </p>
        </div>

        <div className={styles.headerActions}>
          <select
            value={filterTopicId}
            onChange={(event) => setFilterTopicId(event.target.value)}
            className={styles.inputBase}
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
            className={styles.refreshButton}
          >
            <RefreshCcw size={15} />
            Refresh
          </button>
        </div>
      </div>

      {error ? <div className={styles.error}>{error}</div> : null}

      {disabledBecauseNoTopics ? (
        <div className={styles.warning}>
          Create at least one topic before adding problems.
        </div>
      ) : null}

      <form onSubmit={submitForm} className={styles.form}>
        <div className={styles.formGrid}>
          <select
            value={form.topicId}
            onChange={(event) => setForm((prev) => ({ ...prev, topicId: event.target.value }))}
            required
            className={styles.inputBase}
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
            className={styles.inputBase}
            disabled={disabledBecauseNoTopics}
          />

          <input
            value={form.slug}
            onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value }))}
            placeholder="problem-slug"
            required
            className={styles.inputBase}
            disabled={disabledBecauseNoTopics}
          />

          <select
            value={form.difficulty}
            onChange={(event) => setForm((prev) => ({ ...prev, difficulty: event.target.value as AdminProblemPayload['difficulty'] }))}
            className={styles.inputBase}
            disabled={disabledBecauseNoTopics}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <label className={`${styles.inputBase} ${styles.checkboxField}`}>
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
          className={`${styles.inputBase} ${styles.textarea}`}
          disabled={disabledBecauseNoTopics}
        />

        <textarea
          value={form.constraints}
          onChange={(event) => setForm((prev) => ({ ...prev, constraints: event.target.value }))}
          placeholder="Constraints (optional)"
          rows={2}
          className={`${styles.inputBase} ${styles.textarea}`}
          disabled={disabledBecauseNoTopics}
        />

        <div className={styles.actions}>
          <button
            type="submit"
            disabled={submitting || disabledBecauseNoTopics}
            className={styles.primaryButton}
          >
            {isEditing ? <Edit3 size={15} /> : <Plus size={15} />}
            {submitting ? 'Saving...' : isEditing ? 'Update Problem' : 'Create Problem'}
          </button>

          {isEditing ? (
            <button
              type="button"
              onClick={resetForm}
              className={styles.secondaryButton}
            >
              <X size={15} />
              Cancel Edit
            </button>
          ) : null}
        </div>
      </form>

      {loading ? (
        <div className={styles.loading}>Loading problems...</div>
      ) : (
        <div className={styles.list}>
          {problems.map((problem) => (
            <div key={problem.id} className={styles.card}>
              <div className={styles.cardRow}>
                <div>
                  <div className={styles.cardTitle}>{problem.title}</div>
                  <div className={styles.cardMeta}>
                    {problem.slug} • {problem.topicTitle} • {problem.difficulty}
                  </div>
                  <div className={styles.cardDescription}>
                    {problem.statement}
                  </div>
                </div>
                <div className={styles.cardActions}>
                  {problem.isPremium ? (
                    <span className={`${styles.badge} ${styles.premiumBadge}`}>Premium</span>
                  ) : (
                    <span className={`${styles.badge} ${styles.freeBadge}`}>Free</span>
                  )}
                  <button onClick={() => startEdit(problem)} className={styles.iconButton} aria-label={`Edit ${problem.title}`}>
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={() => {
                      const shouldDelete = window.confirm(`Delete problem "${problem.title}"?`);
                      if (shouldDelete) {
                        void deleteProblem(problem.id);
                      }
                    }}
                    className={styles.iconButton}
                    aria-label={`Delete ${problem.title}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {problems.length === 0 ? <div className={styles.empty}>No problems found for this filter.</div> : null}
        </div>
      )}
    </div>
  );
};

export default AdminProblemsManager;
