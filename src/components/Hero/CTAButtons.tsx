import React from 'react';
import styles from './Hero.module.css';

interface CTAButtonsProps {
  onRoadmapClick: () => void;
  onBigOClick: () => void;
  onProblemsClick: () => void;
}

const CTAButtons: React.FC<CTAButtonsProps> = ({
  onRoadmapClick,
  onBigOClick,
  onProblemsClick,
}) => {
  const primaryButtonStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, var(--primary-color), var(--primary-hover))',
    color: 'white',
    padding: 'clamp(0.75rem, 3vw, 1rem) clamp(1.5rem, 4vw, 2.5rem)',
    borderRadius: '12px',
    fontWeight: '700',
    fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
    boxShadow: '0 15px 40px rgba(139, 92, 246, 0.3)',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
  };

  const secondaryButtonStyle: React.CSSProperties = {
    padding: 'clamp(0.75rem, 3vw, 1rem) clamp(1.5rem, 4vw, 2.5rem)',
    fontWeight: '600',
    fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
    cursor: 'pointer',
    border: '2px solid var(--border-color)',
    borderRadius: '12px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    background: 'rgba(99, 102, 241, 0.08)',
    backdropFilter: 'blur(12px)',
    color: 'var(--text-main)',
  };

  const accentButtonStyle: React.CSSProperties = {
    backgroundColor: 'rgba(244, 63, 94, 0.1)',
    color: 'var(--accent-light)',
    padding: 'clamp(0.75rem, 3vw, 1rem) clamp(1.5rem, 4vw, 2.5rem)',
    borderRadius: '12px',
    fontWeight: '600',
    fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
    cursor: 'pointer',
    border: '2px solid var(--accent-color)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLButtonElement>,
    isPrimary: boolean
  ) => {
    if (isPrimary) {
      e.currentTarget.style.transform = 'translateY(-3px)';
      e.currentTarget.style.boxShadow = '0 20px 50px rgba(139, 92, 246, 0.4)';
      e.currentTarget.style.filter = 'brightness(1.1)';
    } else {
      e.currentTarget.style.transform = 'translateY(-3px)';
      e.currentTarget.style.borderColor = 'var(--primary-color)';
      e.currentTarget.style.boxShadow = '0 15px 40px rgba(139, 92, 246, 0.3)';
    }
  };

  const handleMouseLeave = (
    e: React.MouseEvent<HTMLButtonElement>,
    isPrimary: boolean
  ) => {
    if (isPrimary) {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 15px 40px rgba(139, 92, 246, 0.3)';
      e.currentTarget.style.filter = 'brightness(1)';
    } else {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.borderColor = 'var(--border-color)';
      e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
    }
  };

  const handleAccentMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = 'translateY(-3px)';
    e.currentTarget.style.background = 'rgba(244, 63, 94, 0.2)';
    e.currentTarget.style.boxShadow = '0 15px 40px rgba(244, 63, 94, 0.2)';
  };

  const handleAccentMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.background = 'rgba(244, 63, 94, 0.1)';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <div className={styles.ctaContainer}>
      <button
        onClick={onRoadmapClick}
        style={primaryButtonStyle}
        onMouseEnter={(e) => handleMouseEnter(e, true)}
        onMouseLeave={(e) => handleMouseLeave(e, true)}
      >
        Explore Roadmap →
      </button>
      <button
        onClick={onBigOClick}
        style={secondaryButtonStyle}
        onMouseEnter={(e) => handleMouseEnter(e, false)}
        onMouseLeave={(e) => handleMouseLeave(e, false)}
      >
        Learn Big O
      </button>
      <button
        onClick={onProblemsClick}
        style={accentButtonStyle}
        onMouseEnter={handleAccentMouseEnter}
        onMouseLeave={handleAccentMouseLeave}
      >
        Practice Problems
      </button>
    </div>
  );
};

export default CTAButtons;
