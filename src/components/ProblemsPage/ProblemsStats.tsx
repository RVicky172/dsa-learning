import type { ApiProblemRecord } from './ProblemCard';
import styles from './ProblemsPage.module.css';

interface ProblemsStatsProps {
  problems: ApiProblemRecord[];
  isMobile?: boolean;
  isSmallPhone?: boolean;
}

const ProblemsStats = ({ problems, isMobile: _isMobile, isSmallPhone: _isSmallPhone }: ProblemsStatsProps) => {
  const easyCount = problems.filter(p => p.difficulty === 'Easy').length;
  const mediumCount = problems.filter(p => p.difficulty === 'Medium').length;
  const hardCount = problems.filter(p => p.difficulty === 'Hard').length;

  return (
    <div className={`glass ${styles.stats}`}>
      <div className={styles.statItem}>
        <p className={`${styles.statValue} ${styles.statEasy}`}>{easyCount}</p>
        <p className={styles.statLabel}>Easy</p>
      </div>
      <div className={styles.statItem}>
        <p className={`${styles.statValue} ${styles.statMedium}`}>{mediumCount}</p>
        <p className={styles.statLabel}>Medium</p>
      </div>
      <div className={styles.statItem}>
        <p className={`${styles.statValue} ${styles.statHard}`}>{hardCount}</p>
        <p className={styles.statLabel}>Hard</p>
      </div>
    </div>
  );
};

export default ProblemsStats;
