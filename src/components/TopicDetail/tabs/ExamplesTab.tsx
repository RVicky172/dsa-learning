import type { Topic } from '../../../types/topic';
import styles from '../TopicDetail.module.css';

interface ExamplesTabProps {
    topic: Topic;
}

const ExamplesTab = ({ topic }: ExamplesTabProps) => {
    return (
        <div className={styles.examplesContainer}>
            {topic.examples.map((example, idx) => (
                <div key={idx} className={`glass ${styles.exampleCard}`}>
                    <div className={styles.exampleHeader}>
                        <div className={styles.exampleTitleSection}>
                            <h3 className={styles.exampleTitle}>{example.title}</h3>
                            <span className={styles.languageBadge}>
                                {example.language.toUpperCase()}
                            </span>
                        </div>
                        <p className={styles.exampleExplanation}>
                            {example.explanation}
                        </p>
                    </div>

                    <pre className={styles.codeBlock}>
                        <code className={styles.codeContent}>{example.code}</code>
                    </pre>

                    <div className={styles.complexityInfo}>
                        <div>
                            <span className={styles.complexityLabel}>Time: </span>
                            <code className={styles.complexityValue}>{example.timeComplexity}</code>
                        </div>
                        <div>
                            <span className={styles.complexityLabel}>Space: </span>
                            <code className={styles.complexityValue}>{example.spaceComplexity}</code>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ExamplesTab;
