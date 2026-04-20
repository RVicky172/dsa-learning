import { useCallback, useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, Library, FileText, Activity } from 'lucide-react';
import { apiClient } from '../services/apiClient';
import { useAuth } from '../hooks/useAuth';
import type { AdminOverview } from '../types/api';
import AdminTopicsManager from '../components/admin/AdminTopicsManager';
import AdminProblemsManager from '../components/admin/AdminProblemsManager';

interface AdminDashboardProps {
  onGoLogin?: () => void;
}

const AdminDashboard = ({ onGoLogin }: AdminDashboardProps) => {
  const { isAuthenticated, isAdmin, token } = useAuth();
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'topics' | 'problems'>('overview');

  const loadOverview = useCallback(() => {
    if (!isAuthenticated || !isAdmin || !token) {
      return;
    }

    apiClient.get<AdminOverview>('/admin/overview', token)
      .then((data) => {
        setOverview(data);
        setError(null);
      })
      .catch(() => {
        setError('Unable to load admin overview right now.');
      });
  }, [isAuthenticated, isAdmin, token]);

  useEffect(() => {
    loadOverview();
  }, [loadOverview]);

  if (!isAuthenticated) {
    return (
      <section className="container" style={{ paddingTop: 'clamp(4rem, 10vw, 8rem)', paddingBottom: 'clamp(4rem, 10vw, 8rem)' }}>
        <div className="glass" style={{ maxWidth: '560px', margin: '0 auto', padding: '1.5rem', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '0.5rem' }}>Admin Dashboard</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Login as an admin to access this area.</p>
          <button
            onClick={onGoLogin}
            style={{ minHeight: '42px', borderRadius: '10px', border: 'none', background: 'var(--primary-gradient)', color: 'white', fontWeight: 700, padding: '0 1rem', cursor: 'pointer' }}
          >
            Go to Login
          </button>
        </div>
      </section>
    );
  }

  if (!isAdmin) {
    return (
      <section className="container" style={{ paddingTop: 'clamp(4rem, 10vw, 8rem)', paddingBottom: 'clamp(4rem, 10vw, 8rem)' }}>
        <div className="glass" style={{ maxWidth: '560px', margin: '0 auto', padding: '1.5rem', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '0.5rem' }}>Admin Access Required</h2>
          <p style={{ color: 'var(--text-muted)' }}>Your account does not have admin privileges.</p>
        </div>
      </section>
    );
  }

  const cards = overview ? [
    { label: 'Users', value: overview.users, icon: Users },
    { label: 'Topics', value: overview.topics, icon: Library },
    { label: 'Problems', value: overview.problems, icon: FileText },
    { label: 'Attempts', value: overview.attempts, icon: Activity }
  ] : [];

  return (
    <section className="container" style={{ paddingTop: 'clamp(4rem, 10vw, 8rem)', paddingBottom: 'clamp(4rem, 10vw, 8rem)' }}>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
          <ShieldCheck size={24} color="var(--success-color)" />
          <h2 style={{ margin: 0 }}>Admin Dashboard</h2>
        </div>

        {error ? <div style={{ color: 'var(--error-color)', marginBottom: '0.8rem' }}>{error}</div> : null}

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <button
            onClick={() => setActiveTab('overview')}
            style={tabButtonStyle(activeTab === 'overview')}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('topics')}
            style={tabButtonStyle(activeTab === 'topics')}
          >
            Topic CRUD
          </button>
          <button
            onClick={() => setActiveTab('problems')}
            style={tabButtonStyle(activeTab === 'problems')}
          >
            Problem CRUD
          </button>
        </div>

        {activeTab === 'overview' ? (
          overview ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '0.9rem' }}>
              {cards.map((card) => (
                <div key={card.label} className="glass" style={{ padding: '1rem', borderRadius: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                    <card.icon size={16} />
                    <span>{card.label}</span>
                  </div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>{card.value}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass" style={{ padding: '1rem' }}>Loading admin overview...</div>
          )
        ) : null}

        {activeTab === 'topics' && token ? (
          <AdminTopicsManager token={token} onTopicsChanged={loadOverview} />
        ) : null}

        {activeTab === 'problems' && token ? (
          <AdminProblemsManager token={token} onProblemsChanged={loadOverview} />
        ) : null}
      </motion.div>
    </section>
  );
};

function tabButtonStyle(active: boolean): CSSProperties {
  return {
    minHeight: '38px',
    borderRadius: '10px',
    border: active ? '1px solid transparent' : '1px solid var(--border-color)',
    background: active ? 'var(--primary-gradient)' : 'transparent',
    color: active ? 'white' : 'var(--text-secondary)',
    padding: '0 0.95rem',
    cursor: 'pointer',
    fontWeight: 600
  };
}

export default AdminDashboard;
