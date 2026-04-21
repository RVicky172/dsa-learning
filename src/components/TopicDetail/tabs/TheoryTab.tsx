import { BookOpen, ChevronDown, ChevronUp, Briefcase } from 'lucide-react';
import type { Topic } from '../../../types/topic';
import styles from '../TopicDetail.module.css';

interface TheoryTabProps {
    topic: Topic;
    expandedSection: Record<string, boolean>;
    toggleSection: (section: string) => void;
}

const buildFallbackLearningOutcomes = (topic: Topic): string[] => {
    const conceptOutcomes = topic.concepts.slice(0, 3).map((concept) => `Understand ${concept.name.toLowerCase()} and apply it in DSA problems.`);
    const operationOutcome = topic.operations.length > 0
        ? `Compare common ${topic.title.toLowerCase()} operations by time complexity (${topic.operations[0].complexity} and beyond).`
        : `Compare common ${topic.title.toLowerCase()} operations by time and space complexity.`;

    return [
        `Explain core ${topic.title.toLowerCase()} fundamentals and practical trade-offs.`,
        ...conceptOutcomes,
        operationOutcome
    ].slice(0, 5);
};

const TheoryTab = ({ topic, expandedSection, toggleSection }: TheoryTabProps) => {
    const learningOutcomes = topic.learningOutcomes && topic.learningOutcomes.length > 0
        ? topic.learningOutcomes
        : buildFallbackLearningOutcomes(topic);

    return (
        <div className={styles.contentGrid}>
            <div>
                {/* What You Will Learn */}
                <div className={`glass ${styles.theorySection}`}>
                    <h3 className={styles.sectionTitle}>What You Will Learn</h3>
                    <ul className={styles.listContainer}>
                        {learningOutcomes.map((outcome, idx) => (
                            <li key={idx} className={styles.listItem}>{outcome}</li>
                        ))}
                    </ul>
                </div>

                {/* Introduction */}
                <div className={`glass ${styles.theorySection}`}>
                    <h2 className={styles.theoryTitle}>
                        <BookOpen size={24} color="var(--primary-color)" />
                        Introduction
                    </h2>
                    <p className={styles.theoryContent}>
                        {topic.introduction}
                    </p>
                </div>

                {/* Why Important */}
                <div className={`glass ${styles.theorySection}`}>
                    <h3 className={styles.sectionTitle}>Why It's Important</h3>
                    <p className={styles.sectionContent}>
                        {topic.whyImportant}
                    </p>
                </div>

                {/* When to Use */}
                <div className={`glass ${styles.theorySection}`}>
                    <h3 className={styles.sectionTitle}>When to Use</h3>
                    <ul className={styles.listContainer}>
                        {topic.whenToUse.map((use, idx) => (
                            <li key={idx} className={styles.listItem}>{use}</li>
                        ))}
                    </ul>
                </div>

                {/* Advantages vs Disadvantages */}
                <div className={styles.advantagesDisadvantagesGrid}>
                    <div className={`glass ${styles.advantagesCard}`}>
                        <h3 className={styles.advantagesTitle}>✓ Advantages</h3>
                        <ul className={styles.prosConsList}>
                            {topic.advantages.map((adv, idx) => (
                                <li key={idx} className={styles.prosConsItem}>{adv}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={`glass ${styles.disadvantagesCard}`}>
                        <h3 className={styles.disadvantagesTitle}>✗ Disadvantages</h3>
                        <ul className={styles.prosConsList}>
                            {topic.disadvantages.map((dis, idx) => (
                                <li key={idx} className={styles.prosConsItem}>{dis}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Core Concepts */}
                <div className={`glass ${styles.conceptsContainer}`}>
                    <button
                        onClick={() => toggleSection('concepts')}
                        className={styles.conceptsHeader}
                    >
                        <h3 className={styles.conceptsTitle}>Core Concepts</h3>
                        {expandedSection.concepts ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                    </button>

                    {expandedSection.concepts && (
                        <div className={styles.conceptsList}>
                            {topic.concepts.map((concept, idx) => (
                                <div key={idx} className={styles.conceptItem}>
                                    <h4 className={styles.conceptName}>{concept.name}</h4>
                                    <p className={styles.conceptDescription}>{concept.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Sidebar */}
            <aside>
                {/* Key Operations */}
                <div className={`glass ${styles.sidebarCard}`}>
                    <h4 className={styles.sectionTitle}>Time Complexity</h4>
                    <div className={styles.operationsCard}>
                        {topic.operations.map((op, idx) => (
                            <div key={idx} className={styles.operationItem}>
                                <span className={styles.operationName}>{op.name}</span>
                                <code className={styles.complexityBadge}>
                                    {op.complexity}
                                </code>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Real-World Applications */}
                <div className={`glass ${styles.sidebarCard} ${styles.sidebarCardLast}`}>
                    <button
                        onClick={() => toggleSection('applications')}
                        className={styles.applicationsHeader}
                    >
                        <h4 className={styles.applicationsTitle}>
                            <Briefcase size={18} />
                            Applications
                        </h4>
                        {expandedSection.applications ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>

                    {expandedSection.applications && (
                        <div className={styles.applicationsList}>
                            {topic.applications.map((app, idx) => (
                                <div key={idx} className={styles.applicationItem}>
                                    <h5 className={styles.applicationName}>{app.name}</h5>
                                    <p className={styles.applicationDescription}>{app.description}</p>
                                    <p className={styles.applicationExample}>Ex: {app.example}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </aside>
        </div>
    );
};

export default TheoryTab;
