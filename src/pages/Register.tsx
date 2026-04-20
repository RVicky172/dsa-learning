import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface RegisterProps {
  onSuccess?: () => void;
  onGoLogin?: () => void;
  onBackHome?: () => void;
}

const Register = ({ onSuccess, onGoLogin, onBackHome }: RegisterProps) => {
  const { signUp, status, errorMessage } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocalError(null);

    if (!displayName.trim() || !email.trim() || !password.trim()) {
      setLocalError('Please fill in all fields.');
      return;
    }

    if (password.trim().length < 8) {
      setLocalError('Password must be at least 8 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      await signUp({
        displayName: displayName.trim(),
        email: email.trim(),
        password
      });
      onSuccess?.();
    } catch {
      setLocalError('Registration failed. Try a different email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resolvedError = localError ?? errorMessage;

  return (
    <section className="container" style={{ paddingTop: 'clamp(4rem, 10vw, 8rem)', paddingBottom: 'clamp(4rem, 10vw, 8rem)' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass"
        style={{
          maxWidth: '520px',
          margin: '0 auto',
          padding: 'clamp(1.5rem, 3vw, 2.2rem)',
          borderRadius: '16px'
        }}
      >
        <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.7rem, 4vw, 2.4rem)', marginBottom: '0.4rem' }}>Create Account</h2>
          <p style={{ color: 'var(--text-muted)' }}>Join DSA Master and save your learning progress.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
          <label style={{ display: 'grid', gap: '0.5rem' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Display Name</span>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                placeholder="Your name"
                autoComplete="name"
                style={{
                  width: '100%',
                  minHeight: '44px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  background: 'rgba(0,0,0,0.2)',
                  color: 'var(--text-main)',
                  padding: '0.65rem 0.75rem 0.65rem 2.4rem'
                }}
              />
            </div>
          </label>

          <label style={{ display: 'grid', gap: '0.5rem' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Email</span>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                style={{
                  width: '100%',
                  minHeight: '44px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  background: 'rgba(0,0,0,0.2)',
                  color: 'var(--text-main)',
                  padding: '0.65rem 0.75rem 0.65rem 2.4rem'
                }}
              />
            </div>
          </label>

          <label style={{ display: 'grid', gap: '0.5rem' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Password</span>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="At least 8 characters"
                autoComplete="new-password"
                style={{
                  width: '100%',
                  minHeight: '44px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  background: 'rgba(0,0,0,0.2)',
                  color: 'var(--text-main)',
                  padding: '0.65rem 0.75rem 0.65rem 2.4rem'
                }}
              />
            </div>
          </label>

          {resolvedError ? (
            <div style={{ color: 'var(--error-color)', fontSize: '0.9rem' }}>{resolvedError}</div>
          ) : null}

          <motion.button
            type="submit"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting || status === 'loading'}
            style={{
              minHeight: '46px',
              borderRadius: '10px',
              border: 'none',
              background: 'var(--primary-gradient)',
              color: 'white',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.8 : 1
            }}
          >
            <UserPlus size={16} />
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </motion.button>
        </form>

        <div style={{ display: 'grid', gap: '0.6rem', marginTop: '1rem' }}>
          <button
            onClick={onGoLogin}
            style={{
              minHeight: '40px',
              borderRadius: '10px',
              border: '1px solid var(--border-color)',
              background: 'transparent',
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            Already have an account? Login
          </button>
          <button
            onClick={onBackHome}
            style={{
              minHeight: '40px',
              borderRadius: '10px',
              border: '1px solid var(--border-color)',
              background: 'transparent',
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            Back to Home
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Register;
