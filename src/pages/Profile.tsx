import { motion } from 'framer-motion';
import { Crown, ShieldCheck, UserCircle2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface ProfileProps {
  onGoToLogin?: () => void;
}

const Profile = ({ onGoToLogin }: ProfileProps) => {
  const { user, isAuthenticated, isAdmin, isPremium } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <section className="container" style={{ paddingTop: 'clamp(4rem, 10vw, 8rem)', paddingBottom: 'clamp(4rem, 10vw, 8rem)' }}>
        <div className="glass" style={{ maxWidth: '560px', margin: '0 auto', padding: '1.5rem', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '0.6rem' }}>Profile Unavailable</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Please login to view your profile and learning status.</p>
          <button
            onClick={onGoToLogin}
            style={{
              minHeight: '42px',
              borderRadius: '10px',
              border: 'none',
              background: 'var(--primary-gradient)',
              color: 'white',
              fontWeight: 700,
              padding: '0 1rem',
              cursor: 'pointer'
            }}
          >
            Go to Login
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="container" style={{ paddingTop: 'clamp(4rem, 10vw, 8rem)', paddingBottom: 'clamp(4rem, 10vw, 8rem)' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="glass"
        style={{ maxWidth: '640px', margin: '0 auto', padding: 'clamp(1.4rem, 3vw, 2rem)' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
          <UserCircle2 size={28} color="var(--primary-color)" />
          <h2 style={{ margin: 0 }}>My Profile</h2>
        </div>

        <div style={{ display: 'grid', gap: '0.75rem' }}>
          <div>
            <strong style={{ color: 'var(--text-secondary)' }}>Name:</strong>{' '}
            <span>{user.displayName}</span>
          </div>
          <div>
            <strong style={{ color: 'var(--text-secondary)' }}>Email:</strong>{' '}
            <span>{user.email}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Crown size={16} color={isPremium ? 'var(--warning-color)' : 'var(--text-muted)'} />
            <strong style={{ color: 'var(--text-secondary)' }}>Subscription:</strong>
            <span>{user.subscriptionTier}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={16} color={isAdmin ? 'var(--success-color)' : 'var(--text-muted)'} />
            <strong style={{ color: 'var(--text-secondary)' }}>Admin Access:</strong>
            <span>{isAdmin ? 'Enabled' : 'No'}</span>
          </div>
          <div>
            <strong style={{ color: 'var(--text-secondary)' }}>Roles:</strong>{' '}
            <span>{user.roles.join(', ')}</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Profile;
