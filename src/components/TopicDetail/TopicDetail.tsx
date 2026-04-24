import { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Code, Trophy, Zap, CheckCircle2, Circle } from 'lucide-react';
import type { Topic } from '../../types/topic';
import { useProgress } from '../../hooks/useProgress';
import { useTopicBySlug } from '../../hooks/useTopicBySlug';
import TheoryTab from './tabs/TheoryTab';
import ExamplesTab from './tabs/ExamplesTab';
import PatternsTab from './tabs/PatternsTab';
import ProblemsTab from './tabs/ProblemsTab';
import VisualizationsTab from './tabs/VisualizationsTab';
import styles from './TopicDetail.module.css';

interface TopicDetailProps {
    topicId: string;
    onBack: () => void;
}

const TopicDetail = ({ topicId, onBack }: TopicDetailProps) => {
    const { topic: fetchedTopic, loading } = useTopicBySlug(topicId);
    const [topic, setTopic] = useState<Topic | null>(null);

    const [activeTab, setActiveTab] = useState<'theory' | 'examples' | 'patterns' | 'problems' | 'visualizations'>('theory');
    const [showSolution, setShowSolution] = useState<Record<string, boolean>>({});
    const [expandedSection, setExpandedSection] = useState<Record<string, boolean>>({
        concepts: true,
        applications: false
    });
    
    // Update local topic state when fetched topic changes
    useEffect(() => {
        if (fetchedTopic) {
            // Map API response to Topic type
            const mappedTopic: Topic = {
                id: fetchedTopic.id,
                title: fetchedTopic.title,
                description: fetchedTopic.description,
                icon: null, // TODO: Icons from API or static mapping
                complexity: 'Medium', // TODO: Get from API
                delay: 0, // TODO: Get from API
                learningOutcomes: [],
                introduction: fetchedTopic.description,
                whyImportant: '',
                whenToUse: [],
                advantages: [],
                disadvantages: [],
                concepts: [],
                examples: [],
                patterns: [],
                applications: [],
                operations: [],
                problems: fetchedTopic.problems.map(p => ({
                    id: p.id,
                    title: p.title,
                    difficulty: p.difficulty as 'Easy' | 'Medium' | 'Hard',
                    description: p.description,
                    examples: [],
                    solution: { 
                        approach: '', 
                        code: '', 
                        timeComplexity: '', 
                        spaceComplexity: '',
                        stepByStep: []
                    },
                    hints: []
                }))
            };
            setTopic(mappedTopic);
        }
    }, [fetchedTopic]);

    const { isTopicCompleted, toggleTopic, isProblemCompleted, toggleProblem } = useProgress();

    if (loading || !topic) {
        return (
            <div className={styles.loadingState}>
                <div className={styles.loadingSpinner} />
                <p className={styles.loadingText}>Loading topic data...</p>
            </div>
        );
    }

    const isCompleted = isTopicCompleted(topic.id);

    const toggleSolution = (problemId: string) => {
        setShowSolution(prev => ({ ...prev, [problemId]: !prev[problemId] }));
    };

    const toggleSection = (section: string) => {
        setExpandedSection(prev => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <div className={styles.container}>
            {/* Header */}
            <header className={`container ${styles.header}`}>
                <button className={styles.backButton} onClick={onBack}>
                    <ArrowLeft size={18} /> Back to Topics
                </button>

                <div className={styles.headerTop}>
                    <div className={styles.titleSection}>
                        <div className={styles.titleIcon}>
                            {topic.icon}
                        </div>
                        <h1 className={styles.title}>{topic.title}</h1>
                    </div>

                    <button
                        onClick={() => toggleTopic(topic.id)}
                        className={`${styles.completionButton} ${isCompleted ? styles.completed : ''}`}
                    >
                        {isCompleted ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                        {isCompleted ? 'Completed' : 'Mark as Completed'}
                    </button>
                </div>

                <p className={styles.description}>
                    {topic.description}
                </p>

                <div className={styles.metaInfo}>
                    <div className={styles.metaItem}>
                        <BookOpen size={18} color="var(--secondary-color)" />
                        <span className={styles.metaLabel}>Complexity:</span>
                        <code className={styles.metaValue}>{topic.complexity}</code>
                    </div>
                    <div className={styles.metaItem}>
                        <Code size={18} color="var(--primary-color)" />
                        <span className={styles.metaLabel}>{topic.examples.length} Examples</span>
                    </div>
                    <div className={styles.metaItem}>
                        <Trophy size={18} color="#eab308" />
                        <span className={styles.metaLabel}>{topic.problems.length} Practice Problems</span>
                    </div>
                </div>
            </header>

            {/* Tab Navigation */}
            <div className={`container ${styles.tabSection}`}>
                <div className={styles.tabNav}>
                    {(['theory', 'examples', 'patterns', 'visualizations', 'problems'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`${styles.tabButton} ${activeTab === tab ? styles.active : ''}`}
                        >
                            {tab === 'visualizations' && <Zap size={18} />}
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <main className="container">
                {activeTab === 'theory' && (
                    <TheoryTab
                        topic={topic}
                        expandedSection={expandedSection}
                        toggleSection={toggleSection}
                    />
                )}
                {activeTab === 'examples' && <ExamplesTab topic={topic} />}
                {activeTab === 'patterns' && <PatternsTab topic={topic} />}
                {activeTab === 'problems' && (
                    <ProblemsTab
                        topic={topic}
                        showSolution={showSolution}
                        toggleSolution={toggleSolution}
                        isProblemCompleted={isProblemCompleted}
                        toggleProblem={toggleProblem}
                    />
                )}
                {activeTab === 'visualizations' && <VisualizationsTab topic={topic} />}
            </main>
        </div>
    );
};

export default TopicDetail;
