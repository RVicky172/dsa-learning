import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, KeyRound } from 'lucide-react';
import { authService } from '../services/authService';

interface ForgotPasswordProps {
  onBackLogin?: () => void;
}

const ForgotPassword = ({ onBackLogin }: ForgotPasswordProps) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await authService.forgotPassword({ email: email.trim() });
      setMessage(response.message);
    } catch {
      setError('Unable to process request right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="container" style={{ paddingTop: 'clamp(4rem, 10vw, 8rem)', paddingBottom: 'clamp(4rem, 10vw, 8rem)' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="glass"
        style={{ maxWidth: '520px', margin: '0 auto', padding: 'clamp(1.4rem, 3vw, 2rem)' }}
      >
        <h2 style={{ marginBottom: '0.4rem' }}>Forgot Password</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Enter your email and we will send password reset instructions.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
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

          {message ? <div style={{ color: 'var(--success-color)', fontSize: '0.9rem' }}>{message}</div> : null}
          {error ? <div style={{ color: 'var(--error-color)', fontSize: '0.9rem' }}>{error}</div> : null}

          <motion.button
            type="submit"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
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
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            <KeyRound size={16} />
            {isSubmitting ? 'Submitting...' : 'Send Reset Instructions'}
          </motion.button>
        </form>

        <button
          onClick={onBackLogin}
          style={{
            marginTop: '0.8rem',
            width: '100%',
            minHeight: '40px',
            borderRadius: '10px',
            border: '1px solid var(--border-color)',
            background: 'transparent',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          Back to Login
        </button>
      </motion.div>
    </section>
  );
};

export default ForgotPassword;
