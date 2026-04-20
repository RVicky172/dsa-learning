import { useCallback, useEffect, useMemo, useState } from 'react';
import type { CSSProperties, FormEvent } from 'react';
import { Edit3, Plus, RefreshCcw, Trash2, X } from 'lucide-react';
import { apiClient } from '../../services/apiClient';
import type { AdminListResponse, AdminTopic, AdminTopicPayload, ApiError } from '../../types/api';

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
    <div className="glass" style={{ padding: '1rem', borderRadius: '14px', marginTop: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ margin: 0 }}>Manage Topics</h3>
          <p style={{ margin: '0.35rem 0 0', color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            Create, edit, publish, and remove topic records.
          </p>
        </div>
        <button
          onClick={() => {
            void loadTopics();
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

      {error ? <div style={{ color: 'var(--error-color)', marginBottom: '0.75rem' }}>{error}</div> : null}

      <form onSubmit={submitForm} style={{ display: 'grid', gap: '0.7rem', marginBottom: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.65rem' }}>
          <input
            value={form.title}
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
            placeholder="Topic title"
            required
            style={inputStyle}
          />
          <input
            value={form.slug}
            onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value }))}
            placeholder="topic-slug"
            required
            style={inputStyle}
          />
          <input
            type="number"
            value={form.orderIndex}
            min={0}
            onChange={(event) => setForm((prev) => ({ ...prev, orderIndex: Number(event.target.value) || 0 }))}
            placeholder="Order"
            style={inputStyle}
          />
          <label style={{ ...inputStyle, display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
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
          style={{ ...inputStyle, resize: 'vertical' }}
        />

        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button
            type="submit"
            disabled={submitting}
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
            {submitting ? 'Saving...' : isEditing ? 'Update Topic' : 'Create Topic'}
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
        <div style={{ color: 'var(--text-muted)' }}>Loading topics...</div>
      ) : (
        <div style={{ display: 'grid', gap: '0.55rem' }}>
          {items.map((topic) => (
            <div key={topic.id} style={{ border: '1px solid var(--border-color)', borderRadius: '12px', padding: '0.7rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{topic.title}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{topic.slug} • order {topic.orderIndex}</div>
                  <div style={{ color: 'var(--text-secondary)', marginTop: '0.35rem', fontSize: '0.92rem' }}>{topic.description}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      padding: '0.18rem 0.5rem',
                      borderRadius: '999px',
                      background: topic.isPublished ? 'var(--success-bg)' : 'var(--warning-bg)',
                      color: topic.isPublished ? 'var(--success-light)' : 'var(--warning-light)'
                    }}
                  >
                    {topic.isPublished ? 'Published' : 'Draft'}
                  </span>
                  <button onClick={() => startEdit(topic)} style={iconButtonStyle} aria-label={`Edit ${topic.title}`}>
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={() => {
                      const shouldDelete = window.confirm(`Delete topic "${topic.title}"? This also deletes linked problems.`);
                      if (shouldDelete) {
                        void deleteTopic(topic.id);
                      }
                    }}
                    style={iconButtonStyle}
                    aria-label={`Delete ${topic.title}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 ? <div style={{ color: 'var(--text-muted)' }}>No topics found.</div> : null}
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

export default AdminTopicsManager;
