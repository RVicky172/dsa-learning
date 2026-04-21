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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, borderColor: 'var(--primary-color)' }}
      className={`glass ${styles.container}`}
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
        <span className={styles.complexityLabel}>
          Complexity: {complexity}
        </span>
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
