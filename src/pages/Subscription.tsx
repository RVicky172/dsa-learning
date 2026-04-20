import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, Sparkles } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { subscriptionService } from '../services/subscriptionService';
import type { SubscriptionState } from '../types/api';

interface SubscriptionPageProps {
  onGoLogin?: () => void;
}

const SubscriptionPage = ({ onGoLogin }: SubscriptionPageProps) => {
  const { isAuthenticated, token, refreshProfile } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpgrading, setIsUpgrading] = useState<'pro_monthly' | 'pro_yearly' | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !token) {
      setIsLoading(false);
      return;
    }

    subscriptionService.getMySubscription(token)
      .then((state) => {
        setSubscription(state);
        setError(null);
      })
      .catch(() => {
        setError('Unable to load subscription state right now.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isAuthenticated, token]);

  const currentTier = subscription?.tier ?? 'free';

  const planCards = useMemo(() => [
    {
      id: 'pro_monthly' as const,
      name: 'Pro Monthly',
      price: '$9 / month',
      label: 'Flexible',
      features: ['Unlock premium problems', 'Priority execution queue', 'Advanced pattern guides']
    },
    {
      id: 'pro_yearly' as const,
      name: 'Pro Yearly',
      price: '$79 / year',
      label: 'Best Value',
      features: ['Everything in monthly', 'Annual savings', 'Early access to new tracks']
    }
  ], []);

  const handleUpgrade = async (planId: 'pro_monthly' | 'pro_yearly') => {
    if (!token) {
      return;
    }

    setIsUpgrading(planId);
    setError(null);

    try {
      const session = await subscriptionService.createCheckoutSession({ planId }, token);

      if (session.checkoutUrl.startsWith('mock://')) {
        await subscriptionService.completeMockCheckout(session.checkoutSessionId, token);
      }

      const latest = await subscriptionService.getMySubscription(token);
      setSubscription(latest);
      await refreshProfile();
    } catch {
      setError('Upgrade failed. Please try again.');
    } finally {
      setIsUpgrading(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <section className="container" style={{ paddingTop: 'clamp(4rem, 10vw, 8rem)', paddingBottom: 'clamp(4rem, 10vw, 8rem)' }}>
        <div className="glass" style={{ maxWidth: '640px', margin: '0 auto', padding: '1.5rem', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '0.6rem' }}>Unlock Premium Learning</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Login to view plans and unlock premium problems.
          </p>
          <button
            onClick={onGoLogin}
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: '999px', background: 'var(--accent-gradient)', color: 'white', marginBottom: '0.8rem' }}>
            <Sparkles size={14} />
            Premium Access
          </div>
          <h2 style={{ marginBottom: '0.5rem' }}>Choose Your Pro Plan</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Current tier: <strong style={{ color: 'var(--text-main)' }}>{currentTier}</strong>
          </p>
          {subscription?.currentPeriodEnd ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Active until: {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
            </p>
          ) : null}
          {subscription?.status === 'pending' ? (
            <p style={{ color: 'var(--warning-color)', fontSize: '0.9rem' }}>
              Payment is pending confirmation.
            </p>
          ) : null}
          {error ? <p style={{ color: 'var(--error-color)' }}>{error}</p> : null}
        </div>

        {isLoading ? (
          <div className="glass" style={{ padding: '1rem', textAlign: 'center' }}>Loading plans...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {planCards.map((plan) => {
              const isCurrent = currentTier === plan.id;
              const isBusy = isUpgrading === plan.id;

              return (
                <motion.div
                  key={plan.id}
                  className="glass"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    padding: '1.1rem',
                    border: isCurrent ? '1px solid var(--accent-color)' : '1px solid var(--border-color)',
                    borderRadius: '14px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.7rem' }}>
                    <h3 style={{ margin: 0 }}>{plan.name}</h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{plan.label}</span>
                  </div>
                  <p style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 0.7rem' }}>{plan.price}</p>

                  <div style={{ display: 'grid', gap: '0.45rem', marginBottom: '1rem' }}>
                    {plan.features.map((feature) => (
                      <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                        <Check size={14} color="var(--success-color)" />
                        <span style={{ fontSize: '0.92rem' }}>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      if (!isCurrent) {
                        void handleUpgrade(plan.id);
                      }
                    }}
                    disabled={isCurrent || Boolean(isUpgrading)}
                    style={{
                      minHeight: '40px',
                      width: '100%',
                      borderRadius: '10px',
                      border: 'none',
                      background: isCurrent ? 'var(--surface-hover)' : 'var(--primary-gradient)',
                      color: isCurrent ? 'var(--text-muted)' : 'white',
                      fontWeight: 700,
                      cursor: isCurrent ? 'default' : 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.45rem'
                    }}
                  >
                    {isCurrent ? (
                      <>
                        <Crown size={14} />
                        Current Plan
                      </>
                    ) : isBusy ? 'Processing...' : 'Upgrade Now'}
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default SubscriptionPage;
