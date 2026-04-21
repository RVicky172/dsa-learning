import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, Library, FileText, Activity } from 'lucide-react';
import { apiClient } from '../services/apiClient';
import { useAuth } from '../hooks/useAuth';
import type { AdminOverview } from '../types/api';
import AdminTopicsManager from '../components/admin/AdminTopicsManager';
import AdminProblemsManager from '../components/admin/AdminProblemsManager';
import styles from './AdminDashboard.module.css';

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
      <section className={`container ${styles.page}`}>
        <div className={`glass ${styles.centerCard}`}>
          <h2 className={styles.centerTitle}>Admin Dashboard</h2>
          <p className={styles.centerText}>Login as an admin to access this area.</p>
          <button
            onClick={onGoLogin}
            className={styles.primaryButton}
          >
            Go to Login
          </button>
        </div>
      </section>
    );
  }

  if (!isAdmin) {
    return (
      <section className={`container ${styles.page}`}>
        <div className={`glass ${styles.centerCard}`}>
          <h2 className={styles.centerTitle}>Admin Access Required</h2>
          <p className={styles.centerTextNoMargin}>Your account does not have admin privileges.</p>
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
    <section className={`container ${styles.page}`}>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className={styles.panel}>
          <ShieldCheck size={24} color="var(--success-color)" />
          <h2 className={styles.panelTitle}>Admin Dashboard</h2>
        </div>

        {error ? <div className={styles.errorText}>{error}</div> : null}

        <div className={styles.tabRow}>
          <button
            onClick={() => setActiveTab('overview')}
            className={`${styles.tabButton} ${activeTab === 'overview' ? styles.tabButtonActive : ''}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('topics')}
            className={`${styles.tabButton} ${activeTab === 'topics' ? styles.tabButtonActive : ''}`}
          >
            Topic CRUD
          </button>
          <button
            onClick={() => setActiveTab('problems')}
            className={`${styles.tabButton} ${activeTab === 'problems' ? styles.tabButtonActive : ''}`}
          >
            Problem CRUD
          </button>
        </div>

        {activeTab === 'overview' ? (
          overview ? (
            <div className={styles.overviewGrid}>
              {cards.map((card) => (
                <div key={card.label} className={`glass ${styles.overviewCard}`}>
                  <div className={styles.overviewCardHeader}>
                    <card.icon size={16} />
                    <span>{card.label}</span>
                  </div>
                  <div className={styles.overviewValue}>{card.value}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`glass ${styles.loadingCard}`}>Loading admin overview...</div>
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

export default AdminDashboard;
