import { useCallback, useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { Edit3, Plus, RefreshCcw, Trash2, X } from 'lucide-react';
import { apiClient } from '../../services/apiClient';
import type { AdminListResponse, AdminTopic, AdminTopicPayload, ApiError } from '../../types/api';
import styles from './AdminTopicsManager.module.css';

interface AdminTopicsManagerProps {
  token: string;
  onTopicsChanged?: () => void;
}

const defaultForm: AdminTopicPayload = {
  slug: '',
  title: '',
  description: '',
  orderIndex: 0,
  isPublished: true
};

const AdminTopicsManager = ({ token, onTopicsChanged }: AdminTopicsManagerProps) => {
  const [items, setItems] = useState<AdminTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<AdminTopicPayload>(defaultForm);

  const isEditing = useMemo(() => Boolean(editingId), [editingId]);

  const loadTopics = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiClient.get<AdminListResponse<AdminTopic>>('/admin/topics', token);
      setItems(data.items);
      setError(null);
    } catch {
      setError('Unable to load topics.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void loadTopics();
  }, [loadTopics]);

  const resetForm = () => {
    setForm(defaultForm);
    setEditingId(null);
  };

  const startEdit = (topic: AdminTopic) => {
    setEditingId(topic.id);
    setForm({
      slug: topic.slug,
      title: topic.title,
      description: topic.description,
      orderIndex: topic.orderIndex,
      isPublished: topic.isPublished
    });
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      if (editingId) {
        await apiClient.patch<AdminTopic, AdminTopicPayload>(`/admin/topics/${editingId}`, form, token);
      } else {
        await apiClient.post<AdminTopic, AdminTopicPayload>('/admin/topics', form, token);
      }

      resetForm();
      await loadTopics();
      onTopicsChanged?.();
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message ?? 'Failed to save topic.');
    } finally {
      setSubmitting(false);
    }
  };

  const deleteTopic = async (topicId: string) => {
    setError(null);

    try {
      await apiClient.delete<Record<string, never>>(`/admin/topics/${topicId}`, token);
      if (editingId === topicId) {
        resetForm();
      }
      await loadTopics();
      onTopicsChanged?.();
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message ?? 'Failed to delete topic.');
    }
  };

  return (
    <div className={`glass ${styles.root}`}>
      <div className={styles.headerRow}>
        <div>
          <h3 className={styles.title}>Manage Topics</h3>
          <p className={styles.subtitle}>
            Create, edit, publish, and remove topic records.
          </p>
        </div>
        <button
          onClick={() => {
            void loadTopics();
          }}
          className={styles.refreshButton}
        >
          <RefreshCcw size={15} />
          Refresh
        </button>
      </div>

      {error ? <div className={styles.error}>{error}</div> : null}

      <form onSubmit={submitForm} className={styles.form}>
        <div className={styles.formGrid}>
          <input
            value={form.title}
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
            placeholder="Topic title"
            required
            className={styles.inputBase}
          />
          <input
            value={form.slug}
            onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value }))}
            placeholder="topic-slug"
            required
            className={styles.inputBase}
          />
          <input
            type="number"
            value={form.orderIndex}
            min={0}
            onChange={(event) => setForm((prev) => ({ ...prev, orderIndex: Number(event.target.value) || 0 }))}
            placeholder="Order"
            className={styles.inputBase}
          />
          <label className={`${styles.inputBase} ${styles.checkboxField}`}>
            <input
              type="checkbox"
              checked={form.isPublished}
              onChange={(event) => setForm((prev) => ({ ...prev, isPublished: event.target.checked }))}
            />
            Published
          </label>
        </div>
        <textarea
          value={form.description}
          onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
          placeholder="Short topic description"
          required
          rows={3}
          className={`${styles.inputBase} ${styles.textarea}`}
        />

        <div className={styles.actions}>
          <button
            type="submit"
            disabled={submitting}
            className={styles.primaryButton}
          >
            {isEditing ? <Edit3 size={15} /> : <Plus size={15} />}
            {submitting ? 'Saving...' : isEditing ? 'Update Topic' : 'Create Topic'}
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
        <div className={styles.loading}>Loading topics...</div>
      ) : (
        <div className={styles.list}>
          {items.map((topic) => (
            <div key={topic.id} className={styles.card}>
              <div className={styles.cardRow}>
                <div>
                  <div className={styles.cardTitle}>{topic.title}</div>
                  <div className={styles.cardMeta}>{topic.slug} • order {topic.orderIndex}</div>
                  <div className={styles.cardDescription}>{topic.description}</div>
                </div>
                <div className={styles.cardActions}>
                  <span
                    className={`${styles.badge} ${topic.isPublished ? styles.badgePublished : styles.badgeDraft}`}
                  >
                    {topic.isPublished ? 'Published' : 'Draft'}
                  </span>
                  <button onClick={() => startEdit(topic)} className={styles.iconButton} aria-label={`Edit ${topic.title}`}>
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={() => {
                      const shouldDelete = window.confirm(`Delete topic "${topic.title}"? This also deletes linked problems.`);
                      if (shouldDelete) {
                        void deleteTopic(topic.id);
                      }
                    }}
                    className={styles.iconButton}
                    aria-label={`Delete ${topic.title}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 ? <div className={styles.empty}>No topics found.</div> : null}
        </div>
      )}
    </div>
  );
};

export default AdminTopicsManager;
