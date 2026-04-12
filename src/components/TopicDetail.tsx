import { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Code, Lightbulb, Trophy, Briefcase, ChevronDown, ChevronUp, Eye, EyeOff, Zap, CheckCircle2, Circle } from 'lucide-react';
import type { Topic } from '../types/topic';
import DataStructureVisualizer, { type VisualizerProps } from './DataStructureVisualizer';
import { useProgress } from '../hooks/useProgress';

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
                    case 'arrays': module = await import('../data/topics/arrays'); break;
                    case 'linked-lists': module = await import('../data/topics/linkedLists'); break;
                    case 'hash-tables': module = await import('../data/topics/hashTables'); break;
                    case 'trees': module = await import('../data/topics/trees'); break;
                    case 'graphs': module = await import('../data/topics/graphs'); break;
                    case 'sorting-searching': module = await import('../data/topics/sorting'); break;
                    case 'stacks-queues': module = await import('../data/topics/stacksQueues'); break;
                    case 'strings': module = await import('../data/topics/strings'); break;
                    case 'design': module = await import('../data/topics/design'); break;
                    case 'math-bit-logic': module = await import('../data/topics/mathBitLogic'); break;
                    case 'dynamic-programming': module = await import('../data/topics/dynamicProgramming'); break;
                    case 'recursion-backtracking': module = await import('../data/topics/recursionBacktracking'); break;
                    case 'heaps': module = await import('../data/topics/heaps'); break;
                    case 'tries': module = await import('../data/topics/tries'); break;
                    case 'greedy': module = await import('../data/topics/greedy'); break;
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
            case 'Easy': return '#10b981';
            case 'Medium': return '#f59e0b';
            case 'Hard': return '#ef4444';
            default: return '#6366f1';
        }
    };

    // Map topic IDs to visualization types
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
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
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
        <div className="topic-detail" style={{ paddingTop: '8rem', minHeight: '100vh', paddingBottom: '4rem' }}>
            {/* Header */}
            <header className="container" style={{ marginBottom: '3rem' }}>
                <button
                    onClick={onBack}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'var(--text-muted)',
                        marginBottom: '2rem',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '0.95rem'
                    }}
                >
                    <ArrowLeft size={18} /> Back to Topics
                </button>

                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ color: 'var(--primary-color)' }}>
                            {topic.icon}
                        </div>
                        <h1 style={{ fontSize: '3rem', margin: 0 }}>{topic.title}</h1>
                    </div>
                    
                    <button 
                        onClick={() => toggleTopic(topic.id)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.75rem 1.5rem',
                            backgroundColor: isCompleted ? 'rgba(16, 185, 129, 0.1)' : 'var(--primary-color)',
                            color: isCompleted ? '#10b981' : 'white',
                            border: isCompleted ? '1px solid #10b981' : 'none',
                            borderRadius: '8px',
                            fontWeight: '600',
                            fontSize: '0.95rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {isCompleted ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                        {isCompleted ? 'Completed' : 'Mark as Completed'}
                    </button>
                </div>

                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    {topic.description}
                </p>

                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                        <BookOpen size={18} color="var(--secondary-color)" />
                        <span style={{ color: 'var(--text-muted)' }}>Complexity:</span>
                        <code style={{ color: 'var(--secondary-color)', fontWeight: '600' }}>{topic.complexity}</code>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                        <Code size={18} color="var(--primary-color)" />
                        <span style={{ color: 'var(--text-muted)' }}>{topic.examples.length} Examples</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                        <Trophy size={18} color="#f59e0b" />
                        <span style={{ color: 'var(--text-muted)' }}>{topic.problems.length} Practice Problems</span>
                    </div>
                </div>
            </header>

            {/* Tab Navigation */}
            <div className="container" style={{ marginBottom: '2rem' }}>
                <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    borderBottom: '2px solid var(--border-color)',
                    overflowX: 'auto'
                }}>
                    {(['theory', 'examples', 'patterns', 'visualizations', 'problems'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                padding: '1rem 2rem',
                                background: 'transparent',
                                border: 'none',
                                borderBottom: activeTab === tab ? '2px solid var(--primary-color)' : '2px solid transparent',
                                color: activeTab === tab ? 'var(--text-main)' : 'var(--text-muted)',
                                fontWeight: activeTab === tab ? '600' : '400',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                textTransform: 'capitalize',
                                transition: 'all 0.3s ease',
                                marginBottom: '-2px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
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
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                        <div>
                            {/* Introduction */}
                            <div className="glass" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
                                <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <BookOpen size={24} color="var(--primary-color)" />
                                    Introduction
                                </h2>
                                <p style={{ lineHeight: '1.8', color: 'var(--text-muted)', whiteSpace: 'pre-line' }}>
                                    {topic.introduction}
                                </p>
                            </div>

                            {/* Why Important */}
                            <div className="glass" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Why It's Important</h3>
                                <p style={{ lineHeight: '1.8', color: 'var(--text-muted)' }}>
                                    {topic.whyImportant}
                                </p>
                            </div>

                            {/* When to Use */}
                            <div className="glass" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>When to Use</h3>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.5rem' }}>
                                    {topic.whenToUse.map((use, idx) => (
                                        <li key={idx} style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{use}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Advantages vs Disadvantages */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                                <div className="glass" style={{ padding: '2rem', borderLeft: '4px solid #10b981' }}>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#10b981' }}>✓ Advantages</h3>
                                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '1.25rem', fontSize: '0.9rem' }}>
                                        {topic.advantages.map((adv, idx) => (
                                            <li key={idx} style={{ color: 'var(--text-muted)', lineHeight: '1.5' }}>{adv}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="glass" style={{ padding: '2rem', borderLeft: '4px solid #ef4444' }}>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#ef4444' }}>✗ Disadvantages</h3>
                                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '1.25rem', fontSize: '0.9rem' }}>
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
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        marginBottom: expandedSection.concepts ? '1.5rem' : 0
                                    }}
                                >
                                    <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Core Concepts</h3>
                                    {expandedSection.concepts ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                                </button>

                                {expandedSection.concepts && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                        {topic.concepts.map((concept, idx) => (
                                            <div key={idx} style={{ paddingBottom: '1.25rem', borderBottom: idx < topic.concepts.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                                                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary-color)' }}>{concept.name}</h4>
                                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>{concept.description}</p>
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
                                <h4 style={{ marginBottom: '1.25rem', fontSize: '1.2rem' }}>Time Complexity</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {topic.operations.map((op, idx) => (
                                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{op.name}</span>
                                            <code style={{
                                                padding: '0.25rem 0.75rem',
                                                background: 'rgba(var(--primary-color-rgb), 0.1)',
                                                borderRadius: '6px',
                                                color: 'var(--secondary-color)',
                                                fontSize: '0.85rem',
                                                fontWeight: '600'
                                            }}>
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
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        marginBottom: expandedSection.applications ? '1.25rem' : 0
                                    }}
                                >
                                    <h4 style={{ margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Briefcase size={18} />
                                        Applications
                                    </h4>
                                    {expandedSection.applications ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </button>

                                {expandedSection.applications && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        {topic.applications.map((app, idx) => (
                                            <div key={idx} style={{ paddingBottom: '1rem', borderBottom: idx < topic.applications.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                                                <h5 style={{ fontSize: '0.95rem', marginBottom: '0.35rem', color: 'var(--text-main)' }}>{app.name}</h5>
                                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem', lineHeight: '1.5' }}>{app.description}</p>
                                                <p style={{ fontSize: '0.8rem', color: 'var(--secondary-color)', fontStyle: 'italic' }}>Ex: {app.example}</p>
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
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {topic.examples.map((example, idx) => (
                            <div key={idx} className="glass" style={{ padding: '2.5rem' }}>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                                        <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{example.title}</h3>
                                        <span style={{
                                            padding: '0.35rem 1rem',
                                            background: 'var(--primary-color)',
                                            color: 'white',
                                            borderRadius: '6px',
                                            fontSize: '0.85rem',
                                            fontWeight: '600'
                                        }}>
                                            {example.language.toUpperCase()}
                                        </span>
                                    </div>
                                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.95rem' }}>
                                        {example.explanation}
                                    </p>
                                </div>

                                <pre style={{
                                    backgroundColor: 'rgba(0,0,0,0.4)',
                                    padding: '1.75rem',
                                    borderRadius: '12px',
                                    overflowX: 'auto',
                                    border: '1px solid var(--border-color)',
                                    marginBottom: '1.25rem'
                                }}>
                                    <code style={{ color: '#e5e7eb', fontSize: '0.9rem', lineHeight: '1.6' }}>{example.code}</code>
                                </pre>

                                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.9rem' }}>
                                    <div>
                                        <span style={{ color: 'var(--text-muted)' }}>Time: </span>
                                        <code style={{ color: 'var(--secondary-color)', fontWeight: '600' }}>{example.timeComplexity}</code>
                                    </div>
                                    <div>
                                        <span style={{ color: 'var(--text-muted)' }}>Space: </span>
                                        <code style={{ color: 'var(--secondary-color)', fontWeight: '600' }}>{example.spaceComplexity}</code>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Patterns Tab */}
                {activeTab === 'patterns' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))', gap: '2rem' }}>
                        {topic.patterns.map((pattern, idx) => (
                            <div key={idx} className="glass" style={{ padding: '2rem', borderLeft: '4px solid var(--primary-color)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                    <Lightbulb size={24} color="var(--primary-color)" />
                                    <h3 style={{ fontSize: '1.35rem', margin: 0 }}>{pattern.name}</h3>
                                </div>

                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '1rem' }}>
                                    {pattern.description}
                                </p>

                                <div style={{ marginBottom: '1rem' }}>
                                    <h4 style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Technique:</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{pattern.technique}</p>
                                </div>

                                <div style={{ marginBottom: '1rem' }}>
                                    <h4 style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Example Uses:</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--secondary-color)', fontStyle: 'italic' }}>{pattern.example}</p>
                                </div>

                                <div>
                                    <h4 style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>When to Use:</h4>
                                    <ul style={{ fontSize: '0.85rem', color: 'var(--text-muted)', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                                        {pattern.whenToUse.map((use, i) => (
                                            <li key={i} style={{ lineHeight: '1.5' }}>{use}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Problems Tab */}
                {activeTab === 'problems' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
                        {!topic.problems || topic.problems.length === 0 ? (
                            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                <p>No practice problems available for this topic yet.</p>
                            </div>
                        ) : (
                            <>
                                <div style={{ padding: '1rem', background: 'rgba(99, 102, 241, 0.15)', borderRadius: '8px' }}>
                                    <strong style={{ fontSize: '1.1rem' }}>
                                        {topic.problems.length} Practice {topic.problems.length === 1 ? 'Problem' : 'Problems'}
                                    </strong>
                                </div>
                                {topic.problems.map((problem, index) => (
                                <div key={problem.id} className="glass" style={{ padding: '2.5rem', flex: '0 0 auto', minHeight: 'auto', marginBottom: '2rem' }}>
                                <div style={{ marginTop: '-1.5rem', marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--primary-color)' }}>
                                    Problem {index + 1} of {topic.problems.length}
                                </div>
                                {/* Problem Header */}
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem', gap: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <button
                                                onClick={() => toggleProblem(problem.id)}
                                                style={{
                                                    background: 'transparent',
                                                    border: 'none',
                                                    color: isProblemCompleted(problem.id) ? '#10b981' : 'var(--text-muted)',
                                                    cursor: 'pointer',
                                                    padding: 0,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                                title={isProblemCompleted(problem.id) ? "Mark as uncompleted" : "Mark as completed"}
                                            >
                                                {isProblemCompleted(problem.id) ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                                            </button>
                                            <h3 style={{ fontSize: '1.5rem', margin: 0, color: isProblemCompleted(problem.id) ? 'var(--text-muted)' : 'inherit', textDecoration: isProblemCompleted(problem.id) ? 'line-through' : 'none' }}>
                                                {problem.title}
                                            </h3>
                                        </div>
                                        <span style={{
                                            padding: '0.35rem 1rem',
                                            background: getDifficultyColor(problem.difficulty),
                                            color: 'white',
                                            borderRadius: '6px',
                                            fontSize: '0.85rem',
                                            fontWeight: '600'
                                        }}>
                                            {problem.difficulty}
                                        </span>
                                    </div>
                                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                                        {problem.description}
                                    </p>
                                </div>

                                {/* Examples */}
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Examples:</h4>
                                    {problem.examples.map((ex, idx) => (
                                        <div key={idx} style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                                            <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                                <span style={{ color: 'var(--text-muted)' }}>Input: </span>
                                                <code style={{ color: 'var(--secondary-color)' }}>{ex.input}</code>
                                            </div>
                                            <div style={{ fontSize: '0.9rem', marginBottom: ex.explanation ? '0.5rem' : 0 }}>
                                                <span style={{ color: 'var(--text-muted)' }}>Output: </span>
                                                <code style={{ color: 'var(--primary-color)' }}>{ex.output}</code>
                                            </div>
                                            {ex.explanation && (
                                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic', margin: 0 }}>
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
                                    <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        {problem.hints.map((hint, idx) => (
                                            <li key={idx} style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.9rem' }}>{hint}</li>
                                        ))}
                                    </ul>
                                </details>

                                {/* Solution Toggle */}
                                <button
                                    onClick={() => toggleSolution(problem.id)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.75rem 1.5rem',
                                        background: showSolution[problem.id] ? 'rgba(239, 68, 68, 0.2)' : 'var(--primary-color)',
                                        color: showSolution[problem.id] ? '#ef4444' : 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontWeight: '600',
                                        fontSize: '0.95rem',
                                        marginBottom: '1.5rem'
                                    }}
                                >
                                    {showSolution[problem.id] ? <EyeOff size={18} /> : <Eye size={18} />}
                                    {showSolution[problem.id] ? 'Hide Solution' : 'Show Solution'}
                                </button>

                                {/* Solution */}
                                {showSolution[problem.id] && (
                                    <div style={{ borderLeft: '4px solid var(--primary-color)', paddingLeft: '1.5rem' }}>
                                        <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Approach:</h4>
                                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                                            {problem.solution.approach}
                                        </p>

                                        <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Solution Code:</h4>
                                        <pre style={{
                                            backgroundColor: 'rgba(0,0,0,0.4)',
                                            padding: '1.75rem',
                                            borderRadius: '12px',
                                            overflowX: 'auto',
                                            border: '1px solid var(--border-color)',
                                            marginBottom: '1.5rem'
                                        }}>
                                            <code style={{ color: '#e5e7eb', fontSize: '0.9rem', lineHeight: '1.6' }}>{problem.solution.code}</code>
                                        </pre>

                                        <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                                            <div>
                                                <span style={{ color: 'var(--text-muted)' }}>Time: </span>
                                                <code style={{ color: 'var(--secondary-color)', fontWeight: '600' }}>{problem.solution.timeComplexity}</code>
                                            </div>
                                            <div>
                                                <span style={{ color: 'var(--text-muted)' }}>Space: </span>
                                                <code style={{ color: 'var(--secondary-color)', fontWeight: '600' }}>{problem.solution.spaceComplexity}</code>
                                            </div>
                                        </div>

                                        <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Step by Step:</h4>
                                        <ol style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            {problem.solution.stepByStep.map((step, idx) => (
                                                <li key={idx} style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.9rem' }}>{step}</li>
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
                    <div style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Interactive Visualizations</h2>
                        <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                            Watch how {topic.title} works with animated, interactive visualizations. These help you understand the data structure's behavior in real-time.
                        </p>
                        {renderVisualization()}
                        <div style={{
                            backgroundColor: 'rgba(0, 217, 255, 0.08)',
                            border: '1px solid rgba(0, 217, 255, 0.2)',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            marginTop: '2rem'
                        }}>
                            <h3 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>About the Visualization</h3>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
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
