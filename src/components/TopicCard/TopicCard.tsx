import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useProgress } from '../../hooks/useProgress';
import styles from './TopicCard.module.css';

interface TopicCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  complexity: string;
  delay?: number;
  id: string;
}

function getDifficultyFromComplexity(complexity: string): { label: string; color: string } {
  const c = complexity.toLowerCase();
  if (c.includes('o(1)') || c.includes('bitwise')) {
    return { label: 'Beginner', color: '#16a34a' };
  }
  if (c.includes('log n')) {
    return { label: 'Easy', color: '#22c55e' };
  }
  if (c.includes('n log n') || c.includes('n)')) {
    return { label: 'Intermediate', color: '#ff6b35' };
  }
  if (c.includes('n²') || c.includes('n^2') || c.includes('n2')) {
    return { label: 'Advanced', color: '#ef4444' };
  }
  if (c.includes('2ⁿ') || c.includes('n!') || c.includes('2^n')) {
    return { label: 'Expert', color: '#dc2626' };
  }
  return { label: 'Intermediate', color: '#06b6d4' };
}

const TopicCard = ({
  title,
  description,
  icon,
  complexity,
  delay = 0,
  id,
}: TopicCardProps) => {
  const { isTopicCompleted } = useProgress();
  const completed = isTopicCompleted(id);
  const difficulty = getDifficultyFromComplexity(complexity);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(6, 182, 212, 0.2)' }}
      className={`glass ${styles.container}`}
      style={{ borderRadius: '12px', border: '1px solid var(--border-color)' }}
    >
      <div className={styles.header}>
        <div className={styles.iconBox}>{icon}</div>
        {completed && (
          <div className={styles.completedBadge}>
            <CheckCircle2 size={18} />
            <span style={{ display: 'none' }}>Completed</span>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.difficultyRow}>
          <span
            className={styles.difficultyDot}
            style={{ backgroundColor: difficulty.color }}
            aria-hidden="true"
          />
          <span className={styles.difficultyLabel} style={{ color: difficulty.color }}>
            {difficulty.label}
          </span>
          <span className={styles.complexityLabel}>&nbsp;&middot;&nbsp;{complexity}</span>
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.footer}>
        <button className={styles.learnButton}>
          Learn more <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default TopicCard;
