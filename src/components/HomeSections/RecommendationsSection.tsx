import { motion } from 'framer-motion';
import type { ProgressRecommendationItem } from '../../types/api';

interface RecommendationsSectionProps {
  items: ProgressRecommendationItem[];
  isLoading: boolean;
  onViewProblems: () => void;
  onProblemSelect?: (topicId: string) => void;
}

const RecommendationsSection = ({ items, isLoading, onViewProblems, onProblemSelect }: RecommendationsSectionProps) => {
  if (isLoading) {
    return (
      <section className="container" style={{ padding: 'clamp(2rem, 6vw, 4rem) 0' }}>
        <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px' }}>
          <p style={{ color: 'var(--text-muted)' }}>Loading personalized recommendations...</p>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return null;
  }

  const handleProblemClick = (item: ProgressRecommendationItem) => {
    if (onProblemSelect) {
      onProblemSelect(item.topicId);
    }
  };

  return (
    <section className="container" style={{ padding: 'clamp(2rem, 6vw, 4rem) 0' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass"
        style={{ padding: 'clamp(1rem, 3vw, 1.5rem)', borderRadius: '20px' }}
      >
        <div style={{ marginBottom: '1rem' }}>
          <p
            className="gradient-text"
            style={{ fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.8rem' }}
          >
            Recommended For You
          </p>
          <h3 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', marginTop: '0.6rem' }}>
            Next Best Problems To Solve
          </h3>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem'
          }}
        >
          {items.slice(0, 6).map((item) => (
            <motion.div
              key={item.problemId}
              whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(99, 102, 241, 0.15)' }}
              onClick={() => handleProblemClick(item)}
              style={{
                border: '1px solid var(--border-color)',
                borderRadius: '14px',
                padding: '1rem',
                background: 'rgba(255,255,255,0.03)',
                cursor: onProblemSelect ? 'pointer' : 'default',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              <p style={{ color: 'var(--secondary-color)', fontSize: '0.8rem', fontWeight: 600 }}>{item.topicTitle}</p>
              <h4 style={{ marginTop: '0.4rem', fontSize: '1rem' }}>{item.title}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem', minHeight: '2.8em' }}>
                {item.reason}
              </p>
              <div style={{ marginTop: '0.8rem', display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <span className="glass" style={{ padding: '0.2rem 0.6rem', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 500 }}>
                  {item.difficulty}
                </span>
                {item.isPremium && !item.canAccess && (
                  <span className="glass" style={{ padding: '0.2rem 0.6rem', borderRadius: '10px', fontSize: '0.75rem', background: 'rgba(251, 146, 60, 0.1)', color: 'var(--secondary-color)', fontWeight: 500 }}>
                    🔒 Premium
                  </span>
                )}
                {item.isPremium && item.canAccess && (
                  <span className="glass" style={{ padding: '0.2rem 0.6rem', borderRadius: '10px', fontSize: '0.75rem', background: 'rgba(34, 197, 94, 0.1)', color: 'var(--text-success)', fontWeight: 500 }}>
                    ✓ Unlocked
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: '1rem' }}>
          <button
            type="button"
            onClick={onViewProblems}
            className="glass"
            style={{
              padding: '0.7rem 1rem',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
          >
            View Problems
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default RecommendationsSection;
