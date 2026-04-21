import { Lightbulb } from 'lucide-react';
import type { Topic } from '../../../types/topic';
import styles from '../TopicDetail.module.css';

interface PatternsTabProps {
    topic: Topic;
}

const PatternsTab = ({ topic }: PatternsTabProps) => {
    return (
        <div className={styles.patternsGrid}>
            {topic.patterns.map((pattern, idx) => (
                <div key={idx} className={`glass ${styles.patternCard}`}>
                    <div className={styles.patternHeader}>
                        <Lightbulb size={24} color="var(--primary-color)" />
                        <h3 className={styles.patternTitle}>{pattern.name}</h3>
                    </div>

                    <p className={styles.patternDescription}>
                        {pattern.description}
                    </p>

                    <div className={styles.patternDetail}>
                        <h4 className={styles.patternDetailTitle}>Technique:</h4>
                        <p className={styles.patternDetailContent}>{pattern.technique}</p>
                    </div>

                    <div className={styles.patternDetail}>
                        <h4 className={styles.patternDetailTitle}>Example Uses:</h4>
                        <p className={styles.patternDetailExample}>{pattern.example}</p>
                    </div>

                    <div>
                        <h4 className={styles.patternDetailTitle}>When to Use:</h4>
                        <ul className={styles.whenToUseList}>
                            {pattern.whenToUse.map((use, i) => (
                                <li key={i} className={styles.whenToUseItem}>{use}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PatternsTab;
