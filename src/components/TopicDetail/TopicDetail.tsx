import { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Code, Lightbulb, Trophy, Briefcase, ChevronDown, ChevronUp, Eye, EyeOff, Zap, CheckCircle2, Circle } from 'lucide-react';
import type { Topic } from '../../types/topic';
import DataStructureVisualizer, { type VisualizerProps } from '../DataStructureVisualizer';
import { useProgress } from '../../hooks/useProgress';
import CodeExecutionPanel from '../CodeExecutionPanel';
import styles from './TopicDetail.module.css';

interface TopicDetailProps {
    topicId: string;
    onBack: () => void;
}

const TopicDetail = ({ topicId, onBack }: TopicDetailProps) => {
    const [topic, setTopic] = useState<Topic | null>(null);
    const [loading, setLoading] = useState(true);

    const [activeTab, setActiveTab] = useState<'theory' | 'examples' | 'patterns' | 'problems' | 'visualizations'>('theory');
    const [showSolution, setShowSolution] = useState<Record<string, boolean>>({});
    const [expandedSection, setExpandedSection] = useState<Record<string, boolean>>({
        concepts: true,
        applications: false
    });
    
    useEffect(() => {
        const loadTopic = async () => {
            setLoading(true);
            try {
                let module;
                switch (topicId) {
                    case 'arrays': module = await import('../../data/topics/arrays'); break;
                    case 'linked-lists': module = await import('../../data/topics/linkedLists'); break;
                    case 'hash-tables': module = await import('../../data/topics/hashTables'); break;
                    case 'trees': module = await import('../../data/topics/trees'); break;
                    case 'graphs': module = await import('../../data/topics/graphs'); break;
                    case 'sorting-searching': module = await import('../../data/topics/sorting'); break;
                    case 'stacks-queues': module = await import('../../data/topics/stacksQueues'); break;
                    case 'strings': module = await import('../../data/topics/strings'); break;
                    case 'design': module = await import('../../data/topics/design'); break;
                    case 'math-bit-logic': module = await import('../../data/topics/mathBitLogic'); break;
                    case 'dynamic-programming': module = await import('../../data/topics/dynamicProgramming'); break;
                    case 'recursion-backtracking': module = await import('../../data/topics/recursionBacktracking'); break;
                    case 'heaps': module = await import('../../data/topics/heaps'); break;
                    case 'tries': module = await import('../../data/topics/tries'); break;
                    case 'greedy': module = await import('../../data/topics/greedy'); break;
                    default: throw new Error('Unknown topic');
                }
                const loadedTopic = Object.values(module)[0] as Topic;
                setTopic(loadedTopic);
            } catch (err) {
                console.error("Failed to load topic", err);
            } finally {
                setLoading(false);
            }
        };
        loadTopic();
    }, [topicId]);

    useEffect(() => {
        if (topic) {
            console.log('Topic loaded:', topic.title, 'Problems count:', topic.problems?.length);
            if (topic.problems && topic.problems.length > 0) {
                console.log('Problem IDs:', topic.problems.map(p => p.id));
                console.log('Full problems array:', topic.problems);
            }
        }
    }, [topic]);

    const { isTopicCompleted, toggleTopic, isProblemCompleted, toggleProblem } = useProgress();

    if (loading || !topic) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column', gap: '1rem', paddingTop: '8rem' }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    border: '3px solid var(--border-color)',
                    borderTop: '3px solid var(--primary-color)',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                }} />
                <p style={{ color: 'var(--text-muted)' }}>Loading topic data...</p>
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

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy': return '#22c55e';
            case 'Medium': return '#eab308';
            case 'Hard': return '#ef4444';
            default: return '#6366f1';
        }
    };

    const getVisualizationType = (): VisualizerProps['type'] => {
        const visualizationMap: Record<string, VisualizerProps['type']> = {
            'arrays': 'array',
            'linked-lists': 'linked-list',
            'hash-tables': 'hash-table',
            'trees': 'binary-tree',
            'stacks-queues': 'stack',
            'heaps': 'heap',
            'graphs': 'graph',
        };
        return visualizationMap[topic.id] || 'array';
    };

    const renderVisualization = () => {
        const vizType = getVisualizationType();
        return (
            <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', color: 'var(--primary-color)' }}>
                    Data Structure Visualization
                </h2>
                {topic.visualizations && topic.visualizations.length > 0 ? (
                    <div className={styles.visualizationsList}>
                        {topic.visualizations.map((viz, idx) => (
                            <div key={idx}>
                                <DataStructureVisualizer {...viz} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <DataStructureVisualizer
                        type={vizType}
                        title={`${topic.title} Visualization`}
                        description="Watch the animation to understand how this data structure works"
                    />
                )}
            </div>
        );
    };

    return (
        <div className={styles.container}>
            {/* Header */}
            <header className="container" style={{ marginBottom: '2rem' }}>
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
            <div className="container" style={{ marginBottom: '2rem' }}>
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
                {/* Theory Tab */}
                {activeTab === 'theory' && (
                    <div className={styles.contentGrid}>
                        <div>
                            {/* Introduction */}
                            <div className="glass" style={{ padding: 'clamp(1rem, 4vw, 2.5rem)', marginBottom: '2rem' }}>
                                <h2 className={styles.theoryTitle}>
                                    <BookOpen size={24} color="var(--primary-color)" />
                                    Introduction
                                </h2>
                                <p className={styles.theoryContent}>
                                    {topic.introduction}
                                </p>
                            </div>

                            {/* Why Important */}
                            <div className="glass" style={{ padding: 'clamp(1rem, 4vw, 2.5rem)', marginBottom: '2rem' }}>
                                <h3 className={styles.sectionTitle}>Why It's Important</h3>
                                <p className={styles.sectionContent}>
                                    {topic.whyImportant}
                                </p>
                            </div>

                            {/* When to Use */}
                            <div className="glass" style={{ padding: 'clamp(1rem, 4vw, 2.5rem)', marginBottom: '2rem' }}>
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
                                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '1.25rem', fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)' }}>
                                        {topic.advantages.map((adv, idx) => (
                                            <li key={idx} style={{ color: 'var(--text-muted)', lineHeight: '1.5' }}>{adv}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className={`glass ${styles.disadvantagesCard}`}>
                                    <h3 className={styles.disadvantagesTitle}>✗ Disadvantages</h3>
                                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '1.25rem', fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)' }}>
                                        {topic.disadvantages.map((dis, idx) => (
                                            <li key={idx} style={{ color: 'var(--text-muted)', lineHeight: '1.5' }}>{dis}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Core Concepts */}
                            <div className="glass" style={{ padding: '2.5rem' }}>
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
                            <div className="glass" style={{ padding: '2rem', marginBottom: '2rem' }}>
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
                            <div className="glass" style={{ padding: '2rem' }}>
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
                )}

                {/* Examples Tab */}
                {activeTab === 'examples' && (
                    <div className={styles.examplesContainer}>
                        {topic.examples.map((example, idx) => (
                            <div key={idx} className="glass" style={{ padding: '2.5rem' }}>
                                <div style={{ marginBottom: '1.5rem' }}>
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
                )}

                {/* Patterns Tab */}
                {activeTab === 'patterns' && (
                    <div className={styles.patternsGrid}>
                        {topic.patterns.map((pattern, idx) => (
                            <div key={idx} className="glass" style={{ padding: '2rem', borderLeft: '4px solid var(--primary-color)' }}>
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
                )}

                {/* Problems Tab */}
                {activeTab === 'problems' && (
                    <div className={styles.problemsContainer}>
                        {!topic.problems || topic.problems.length === 0 ? (
                            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                <p>No practice problems available for this topic yet.</p>
                            </div>
                        ) : (
                            <>
                                <div className={styles.problemCountBadge}>
                                    <strong className={styles.problemCountText}>
                                        {topic.problems.length} Practice {topic.problems.length === 1 ? 'Problem' : 'Problems'}
                                    </strong>
                                </div>
                                {topic.problems.map((problem, index) => (
                                    <div key={problem.id} className="glass" style={{ padding: '2.5rem' }}>
                                        <div className={styles.problemNumber}>
                                            Problem {index + 1} of {topic.problems.length}
                                        </div>

                                        {/* Problem Header */}
                                        <div className={styles.problemHeader}>
                                            <div className={styles.problemTitleSection}>
                                                <div className={styles.problemTitleContent}>
                                                    <button
                                                        onClick={() => toggleProblem(problem.id)}
                                                        className={`${styles.completionToggle} ${isProblemCompleted(problem.id) ? styles.completed : ''}`}
                                                        title={isProblemCompleted(problem.id) ? "Mark as uncompleted" : "Mark as completed"}
                                                    >
                                                        {isProblemCompleted(problem.id) ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                                                    </button>
                                                    <h3 className={`${styles.problemTitle} ${isProblemCompleted(problem.id) ? styles.completed : ''}`}>
                                                        {problem.title}
                                                    </h3>
                                                </div>
                                                <span className={styles.difficultyBadge} style={{ background: getDifficultyColor(problem.difficulty) }}>
                                                    {problem.difficulty}
                                                </span>
                                            </div>
                                            <p className={styles.problemDescription}>
                                                {problem.description}
                                            </p>
                                        </div>

                                        {/* Examples */}
                                        <div className={styles.examplesSection}>
                                            <h4 className={styles.examplesSectionTitle}>Examples:</h4>
                                            {problem.examples.map((ex, idx) => (
                                                <div key={idx} className={styles.exampleBlock}>
                                                    <div className={styles.exampleInput}>
                                                        <span className={styles.exampleInputLabel}>Input: </span>
                                                        <code className={styles.exampleInputCode}>{ex.input}</code>
                                                    </div>
                                                    <div className={styles.exampleOutput}>
                                                        <span className={styles.exampleOutputLabel}>Output: </span>
                                                        <code className={styles.exampleOutputCode}>{ex.output}</code>
                                                    </div>
                                                    {ex.explanation && (
                                                        <p className={styles.exampleExplanationText}>
                                                            {ex.explanation}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Hints */}
                                        <details style={{ marginBottom: '1.5rem' }}>
                                            <summary style={{ cursor: 'pointer', fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--primary-color)' }}>
                                                💡 Hints
                                            </summary>
                                            <ul className={styles.hintsList}>
                                                {problem.hints.map((hint, idx) => (
                                                    <li key={idx} className={styles.hint}>{hint}</li>
                                                ))}
                                            </ul>
                                        </details>

                                        {/* Run Code */}
                                        <CodeExecutionPanel
                                            problemId={problem.id}
                                            initialCode={problem.solution.code}
                                        />

                                        {/* Solution Toggle */}
                                        <button
                                            onClick={() => toggleSolution(problem.id)}
                                            className={`${styles.solutionToggle} ${showSolution[problem.id] ? styles.hidden : ''}`}
                                        >
                                            {showSolution[problem.id] ? <EyeOff size={18} /> : <Eye size={18} />}
                                            {showSolution[problem.id] ? 'Hide Solution' : 'Show Solution'}
                                        </button>

                                        {/* Solution */}
                                        {showSolution[problem.id] && (
                                            <div className={styles.solutionContent}>
                                                <h4 className={styles.solutionApproachTitle}>Approach:</h4>
                                                <p className={styles.solutionApproach}>
                                                    {problem.solution.approach}
                                                </p>

                                                <h4 className={styles.solutionCodeTitle}>Solution Code:</h4>
                                                <pre className={styles.codeBlock}>
                                                    <code className={styles.codeContent}>{problem.solution.code}</code>
                                                </pre>

                                                <div className={styles.complexityInfo}>
                                                    <div>
                                                        <span className={styles.complexityLabel}>Time: </span>
                                                        <code className={styles.complexityValue}>{problem.solution.timeComplexity}</code>
                                                    </div>
                                                    <div>
                                                        <span className={styles.complexityLabel}>Space: </span>
                                                        <code className={styles.complexityValue}>{problem.solution.spaceComplexity}</code>
                                                    </div>
                                                </div>

                                                <h4 className={styles.stepByStepTitle}>Step by Step:</h4>
                                                <ol className={styles.stepByStepList}>
                                                    {problem.solution.stepByStep.map((step, idx) => (
                                                        <li key={idx} className={styles.step}>{step}</li>
                                                    ))}
                                                </ol>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                )}

                {/* Visualizations Tab */}
                {activeTab === 'visualizations' && (
                    <div className={styles.visualizationsContainer}>
                        <h2 className={styles.visualizationsTitle}>Interactive Visualizations</h2>
                        <p className={styles.visualizationsDescription}>
                            Watch how {topic.title} works with animated, interactive visualizations. These help you understand the data structure's behavior in real-time.
                        </p>
                        {renderVisualization()}
                        <div className={styles.visualizationInfoBox}>
                            <h3 className={styles.visualizationInfoTitle}>About the Visualization</h3>
                            <ul className={styles.visualizationInfoList}>
                                <li>✨ <strong>Animated Elements:</strong> Watch how elements are added, removed, or rearranged</li>
                                <li>🎯 <strong>Highlighted Focus:</strong> Elements are highlighted as they are being processed</li>
                                <li>⏱️ <strong>Real-time Flow:</strong> The animation loops to show continuous operation</li>
                                <li>💡 <strong>Educational:</strong> Helps visualize abstract concepts in a concrete way</li>
                            </ul>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default TopicDetail;
