import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import styles from './ProblemsPage.module.css';

interface ProblemsHeaderProps {
  isLoadingProblems: boolean;
  backendMode: boolean;
}

const ProblemsHeader = ({ isLoadingProblems, backendMode }: ProblemsHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={styles.header}
    >
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
        className={`${styles.badge}`}
      >
        <Zap size={16} fill="currentColor" />
        <span className={styles.badgeText}>Curated Problem Sets</span>
      </motion.div>
      
      <h2 className={styles.title}>
        Practice <span className="gradient-text">Problems</span>
      </h2>
      
      <p className={styles.description}>
        Master DSA with curated problems. Each includes brute force and optimal solutions with detailed complexity analysis.
      </p>
      
      <p className={styles.statusText}>
        {isLoadingProblems
          ? 'Loading problems from backend...'
          : backendMode
            ? 'Showing backend-managed problem set.'
            : 'Showing local fallback problem set.'}
      </p>
    </motion.div>
  );
};

export default ProblemsHeader;
