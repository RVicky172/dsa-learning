import { motion } from 'framer-motion';
import { Check, Lock, Clock, ArrowRight, BookOpen, Code, Zap, Trophy } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';

interface RoadmapNode {
    id: string;
    title: string;
    description: string;
    topics: string[];
    estimatedTime: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    prerequisites: string[];
    status: 'completed' | 'current' | 'locked';
    icon: typeof BookOpen;
    topicId?: string; // Link to actual topic in topicsData
}

const roadmapData: RoadmapNode[] = [
    {
        id: 'basics',
        title: 'Programming Basics',
        description: 'Master the fundamentals of programming and basic data types',
        topics: ['Variables & Data Types', 'Control Flow', 'Functions', 'Loops'],
        estimatedTime: '1-2 weeks',
        difficulty: 'Beginner',
        prerequisites: [],
        status: 'completed',
        icon: BookOpen
    },
    {
        id: 'arrays',
        title: 'Arrays & Strings',
        description: 'Learn array manipulation, string operations, and common patterns',
        topics: ['Array Operations', 'Two Pointers', 'Sliding Window', 'String Manipulation'],
        estimatedTime: '2-3 weeks',
        difficulty: 'Beginner',
        prerequisites: ['basics'],
        status: 'completed',
        icon: Code,
        topicId: 'arrays'
    },
    {
        id: 'complexity',
        title: 'Big O Notation',
        description: 'Understand time and space complexity analysis',
        topics: ['Time Complexity', 'Space Complexity', 'Best/Worst/Average Case', 'Amortized Analysis'],
        estimatedTime: '1 week',
        difficulty: 'Beginner',
        prerequisites: ['basics'],
        status: 'current',
        icon: Zap
    },
    {
        id: 'linked-lists',
        title: 'Linked Lists',
        description: 'Master singly and doubly linked lists with common patterns',
        topics: ['Singly Linked List', 'Doubly Linked List', 'Fast & Slow Pointers', 'Reversal Techniques'],
        estimatedTime: '2 weeks',
        difficulty: 'Intermediate',
        prerequisites: ['arrays'],
        status: 'locked',
        icon: Code,
        topicId: 'linked-lists'
    },
    {
        id: 'stacks-queues',
        title: 'Stacks & Queues',
        description: 'Learn LIFO and FIFO data structures',
        topics: ['Stack Operations', 'Queue Operations', 'Monotonic Stack', 'Priority Queue'],
        estimatedTime: '1-2 weeks',
        difficulty: 'Intermediate',
        prerequisites: ['linked-lists'],
        status: 'locked',
        icon: Code,
        topicId: 'stacks-queues'
    },
    {
        id: 'hash-tables',
        title: 'Hash Tables',
        description: 'Master hash maps and their applications',
        topics: ['Hash Functions', 'Collision Handling', 'Frequency Counting', 'Two Sum Pattern'],
        estimatedTime: '2 weeks',
        difficulty: 'Intermediate',
        prerequisites: ['arrays'],
        status: 'locked',
        icon: Code,
        topicId: 'hash-tables'
    },
    {
        id: 'trees',
        title: 'Trees & BST',
        description: 'Binary trees, BST, and tree traversals',
        topics: ['Binary Tree Traversals', 'BST Operations', 'DFS/BFS on Trees', 'Tree Construction'],
        estimatedTime: '3-4 weeks',
        difficulty: 'Intermediate',
        prerequisites: ['stacks-queues'],
        status: 'locked',
        icon: Code,
        topicId: 'trees'
    },
    {
        id: 'heaps',
        title: 'Heaps & Priority Queues',
        description: 'Min/Max heaps and their applications',
        topics: ['Heap Operations', 'Heapify', 'Top K Elements', 'Merge K Sorted'],
        estimatedTime: '2 weeks',
        difficulty: 'Intermediate',
        prerequisites: ['trees'],
        status: 'locked',
        icon: Code,
        topicId: 'heaps'
    },
    {
        id: 'graphs',
        title: 'Graphs',
        description: 'Graph representations and traversal algorithms',
        topics: ['Graph Representations', 'BFS', 'DFS', 'Topological Sort', 'Shortest Path'],
        estimatedTime: '4-5 weeks',
        difficulty: 'Advanced',
        prerequisites: ['trees'],
        status: 'locked',
        icon: Code,
        topicId: 'graphs'
    },
    {
        id: 'recursion',
        title: 'Recursion & Backtracking',
        description: 'Master recursive thinking and backtracking patterns',
        topics: ['Recursive Thinking', 'Memoization', 'Backtracking', 'Permutations/Combinations'],
        estimatedTime: '3 weeks',
        difficulty: 'Advanced',
        prerequisites: ['trees'],
        status: 'locked',
        icon: Code,
        topicId: 'recursion-backtracking'
    },
    {
        id: 'dp',
        title: 'Dynamic Programming',
        description: 'Solve optimization problems with DP',
        topics: ['1D DP', '2D DP', 'State Transition', 'Common Patterns'],
        estimatedTime: '6-8 weeks',
        difficulty: 'Advanced',
        prerequisites: ['recursion'],
        status: 'locked',
        icon: Trophy,
        topicId: 'dynamic-programming'
    },
    {
        id: 'advanced',
        title: 'Advanced Topics',
        description: 'Master advanced algorithms and data structures',
        topics: ['Tries', 'Segment Trees', 'Union Find', 'Advanced Graph Algorithms'],
        estimatedTime: '4-6 weeks',
        difficulty: 'Expert',
        prerequisites: ['dp', 'graphs'],
        status: 'locked',
        icon: Trophy,
        topicId: 'tries'
    }
];

const difficultyColors: Record<string, string> = {
    'Beginner': '#22c55e',
    'Intermediate': '#f97316',
    'Advanced': '#eab308',
    'Expert': '#ef4444'
};

interface RoadmapProps {
    onNavigateToTopic?: (topicId: string) => void;
}

const Roadmap = ({ onNavigateToTopic }: RoadmapProps) => {
    const { isTopicCompleted, toggleTopic } = useProgress();

    const getDynamicStatus = (node: RoadmapNode): 'completed' | 'current' | 'locked' => {
        const trackingId = node.topicId || node.id;
        if (isTopicCompleted(trackingId)) return 'completed';

        const allPrereqsCompleted = node.prerequisites.every(prereqId => {
            const prereqNode = roadmapData.find(n => n.id === prereqId);
            if (!prereqNode) return true;
            const prereqTrackingId = prereqNode.topicId || prereqNode.id;
            return isTopicCompleted(prereqTrackingId);
        });

        return allPrereqsCompleted ? 'current' : 'locked';
    };
    const getStatusIcon = (status: RoadmapNode['status']) => {
        switch (status) {
            case 'completed': return <Check size={20} />;
            case 'current': return <ArrowRight size={20} />;
            case 'locked': return <Lock size={16} />;
        }
    };

    const getStatusColor = (status: RoadmapNode['status']) => {
        switch (status) {
            case 'completed': return '#22c55e';
            case 'current': return 'var(--primary-color)';
            case 'locked': return 'var(--text-muted)';
        }
    };

    return (
        <section id="roadmap" className="container" style={{ 
            padding: '8rem 2rem', 
            width: '100%', 
            maxWidth: '100%',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* 3D Data Structures Background */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
                zIndex: 0,
                opacity: 0.4
            }}>
                {/* Array Structure */}
                <motion.div
                    animate={{
                        y: [0, -30, 0],
                        rotateX: [0, 10, 0],
                        rotateZ: [0, 5, 0]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute',
                        top: '10%',
                        right: '5%',
                        perspective: '1000px'
                    }}
                >
                    <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        transformStyle: 'preserve-3d'
                    }}>
                        {[0, 1, 2, 3, 4].map(i => (
                            <div
                                key={i}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    background: `linear-gradient(135deg, var(--primary-color), var(--secondary-color))`,
                                    borderRadius: '8px',
                                    boxShadow: `0 ${10 + i * 5}px 30px rgba(var(--primary-color-rgb), 0.3)`,
                                    transform: `translateZ(${i * 10}px)`
                                }}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Tree Structure */}
                <motion.svg
                    viewBox="0 0 200 200"
                    width={200}
                    height={200}
                    animate={{
                        y: [0, 20, 0],
                        rotateY: [0, 15, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '5%',
                        opacity: 0.6,
                        perspective: '1000px'
                    }}
                >
                    {/* Root */}
                    <circle cx="100" cy="20" r="12" fill="var(--secondary-color)" />
                    {/* Level 1 */}
                    <line x1="100" y1="32" x2="60" y2="60" stroke="var(--accent-color)" strokeWidth="2" />
                    <line x1="100" y1="32" x2="140" y2="60" stroke="var(--accent-color)" strokeWidth="2" />
                    <circle cx="60" cy="60" r="10" fill="var(--secondary-color)" />
                    <circle cx="140" cy="60" r="10" fill="var(--secondary-color)" />
                    {/* Level 2 */}
                    <line x1="60" y1="70" x2="40" y2="100" stroke="var(--accent-color)" strokeWidth="2" />
                    <line x1="60" y1="70" x2="80" y2="100" stroke="var(--accent-color)" strokeWidth="2" />
                    <line x1="140" y1="70" x2="120" y2="100" stroke="var(--accent-color)" strokeWidth="2" />
                    <line x1="140" y1="70" x2="160" y2="100" stroke="var(--accent-color)" strokeWidth="2" />
                    <circle cx="40" cy="100" r="8" fill="var(--primary-color)" />
                    <circle cx="80" cy="100" r="8" fill="var(--primary-color)" />
                    <circle cx="120" cy="100" r="8" fill="var(--primary-color)" />
                    <circle cx="160" cy="100" r="8" fill="var(--primary-color)" />
                </motion.svg>

                {/* Stack Structure */}
                <motion.div
                    animate={{
                        y: [-30, 0, -30],
                        rotateX: [0, -10, 0]
                    }}
                    transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute',
                        bottom: '15%',
                        right: '8%',
                        perspective: '1000px'
                    }}
                >
                    {[0, 1, 2, 3].map(i => (
                        <div
                            key={i}
                            style={{
                                width: '60px',
                                height: '30px',
                                background: `linear-gradient(135deg, var(--accent-color), var(--primary-color))`,
                                borderRadius: '6px',
                                marginBottom: '-5px',
                                boxShadow: `0 ${5 + i * 3}px 20px rgba(var(--accent-color), 0.25)`,
                                zIndex: 3 - i
                            }}
                        />
                    ))}
                </motion.div>

                {/* Linked List Structure */}
                <motion.div
                    animate={{
                        x: [0, 20, 0],
                        rotateZ: [0, 8, 0]
                    }}
                    transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute',
                        top: '70%',
                        left: '8%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0rem'
                    }}
                >
                    {[0, 1, 2].map(i => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0rem' }}>
                            <div
                                style={{
                                    width: '35px',
                                    height: '35px',
                                    background: `linear-gradient(135deg, var(--secondary-color), var(--accent-color))`,
                                    borderRadius: '50%',
                                    boxShadow: `0 8px 25px rgba(var(--secondary-color), 0.3)`,
                                    border: '2px solid var(--primary-color)'
                                }}
                            />
                            {i < 2 && (
                                <svg width="30" height="20" style={{ marginRight: '-5px' }}>
                                    <path d="M 5 10 L 25 10" stroke="var(--primary-color)" strokeWidth="2" fill="none" />
                                    <polygon points="25,10 20,6 20,14" fill="var(--primary-color)" />
                                </svg>
                            )}
                        </div>
                    ))}
                </motion.div>

                {/* Queue Structure */}
                <motion.div
                    animate={{
                        y: [0, 25, 0],
                        rotateZ: [0, -5, 0]
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute',
                        top: '20%',
                        left: '15%',
                        display: 'flex',
                        gap: '0.3rem'
                    }}
                >
                    {[0, 1, 2, 3].map(i => (
                        <div
                            key={i}
                            style={{
                                width: '30px',
                                height: '50px',
                                background: `linear-gradient(135deg, var(--primary-color), var(--accent-color))`,
                                borderRadius: '4px',
                                boxShadow: `0 ${8 + i * 4}px 25px rgba(var(--primary-color), 0.25)`,
                                transform: `translateY(${i * 8}px)`
                            }}
                        />
                    ))}
                </motion.div>

                {/* Hash Table */}
                <motion.div
                    animate={{
                        rotateY: [0, 15, 0],
                        y: [0, -15, 0]
                    }}
                    transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute',
                        bottom: '20%',
                        left: '12%',
                        perspective: '1000px'
                    }}
                >
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 35px)',
                        gap: '8px'
                    }}>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div
                                key={i}
                                style={{
                                    width: '35px',
                                    height: '35px',
                                    background: `linear-gradient(135deg, var(--accent-color), var(--secondary-color))`,
                                    borderRadius: '6px',
                                    boxShadow: `0 6px 15px rgba(var(--accent-color), 0.2)`,
                                    border: '1px solid var(--primary-color)'
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                    Learning <span className="gradient-text">Roadmap</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
                    Follow this structured path to master Data Structures and Algorithms. Each step builds upon the previous.
                </p>
            </div>

            {/* Progress Stats */}
            <div className="glass" style={{ padding: '2rem', marginBottom: '3rem', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '2.5rem', fontWeight: '700', color: '#22c55e' }}>
                        {roadmapData.filter(n => getDynamicStatus(n) === 'completed').length}
                    </p>
                    <p style={{ color: 'var(--text-muted)' }}>Completed</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--primary-color)' }}>
                        {roadmapData.filter(n => getDynamicStatus(n) === 'current').length}
                    </p>
                    <p style={{ color: 'var(--text-muted)' }}>In Progress</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--text-muted)' }}>
                        {roadmapData.filter(n => getDynamicStatus(n) === 'locked').length}
                    </p>
                    <p style={{ color: 'var(--text-muted)' }}>Remaining</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '2.5rem', fontWeight: '700', color: '#eab308' }}>
                        {Math.round((roadmapData.filter(n => getDynamicStatus(n) === 'completed').length / roadmapData.length) * 100)}%
                    </p>
                    <p style={{ color: 'var(--text-muted)' }}>Progress</p>
                </div>
            </div>

            {/* Roadmap Timeline */}
            <div style={{ position: 'relative' }}>
                {/* Vertical Line */}
                <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: 0,
                    bottom: 0,
                    width: '2px',
                    background: 'linear-gradient(to bottom, var(--primary-color), var(--secondary-color))',
                    transform: 'translateX(-50%)',
                    zIndex: 0
                }} />

                {roadmapData.map((node, index) => (
                    <motion.div
                        key={node.id}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ delay: index * 0.1 }}
                        style={{
                            display: 'flex',
                            justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start',
                            paddingRight: index % 2 === 0 ? 'calc(50% + 2rem)' : 0,
                            paddingLeft: index % 2 === 0 ? 0 : 'calc(50% + 2rem)',
                            marginBottom: '2rem',
                            position: 'relative'
                        }}
                    >
                        {/* Node Circle */}
                        <div style={{
                            position: 'absolute',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: getDynamicStatus(node) === 'locked' ? 'var(--bg-secondary)' : getStatusColor(getDynamicStatus(node)),
                            border: `3px solid ${getStatusColor(getDynamicStatus(node))}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: getDynamicStatus(node) === 'locked' ? 'var(--text-muted)' : 'white',
                            zIndex: 1
                        }}>
                            {getStatusIcon(getDynamicStatus(node))}
                        </div>

                        {/* Card */}
                        <motion.div
                            whileHover={{ scale: getDynamicStatus(node) !== 'locked' ? 1.02 : 1 }}
                            onClick={() => {
                                if (getDynamicStatus(node) !== 'locked' && onNavigateToTopic && node.topicId) {
                                    onNavigateToTopic(node.topicId);
                                }
                            }}
                            className="glass"
                            style={{
                                width: '400px',
                                padding: '1.5rem',
                                cursor: getDynamicStatus(node) !== 'locked' ? 'pointer' : 'default',
                                opacity: getDynamicStatus(node) === 'locked' ? 0.6 : 1,
                                borderLeft: getDynamicStatus(node) === 'current' ? '4px solid var(--primary-color)' : 'none'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <node.icon size={20} color={getStatusColor(getDynamicStatus(node))} />
                                    <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{node.title}</h3>
                                </div>
                                <span style={{
                                    padding: '0.25rem 0.6rem',
                                    borderRadius: '4px',
                                    background: difficultyColors[node.difficulty],
                                    color: 'white',
                                    fontSize: '0.7rem',
                                    fontWeight: '600'
                                }}>
                                    {node.difficulty}
                                </span>
                            </div>

                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: '1.5' }}>
                                {node.description}
                            </p>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                                {node.topics.map(topic => (
                                    <span key={topic} style={{
                                        padding: '0.2rem 0.5rem',
                                        borderRadius: '4px',
                                        background: 'var(--hover-bg-light)',
                                        color: 'var(--primary-color)',
                                        fontSize: '0.7rem',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid var(--border-color)'
                                    }}>
                                        {topic}
                                    </span>
                                ))}
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                <Clock size={14} />
                                <span>{node.estimatedTime}</span>
                            </div>

                            {node.prerequisites.length > 0 && (
                                <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                    Prerequisites: {node.prerequisites.map(p => roadmapData.find(n => n.id === p)?.title).join(', ')}
                                </p>
                            )}

                            {getDynamicStatus(node) === 'current' && node.topicId && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (onNavigateToTopic && node.topicId) {
                                            onNavigateToTopic(node.topicId);
                                        }
                                    }}
                                    style={{
                                        marginTop: '1rem',
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '8px',
                                        background: 'var(--primary-color)',
                                        color: 'white',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontWeight: '600',
                                        fontSize: '0.9rem',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 10px 25px rgba(234, 179, 8, 0.3)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    Continue Learning →
                                </button>
                            )}

                            {getDynamicStatus(node) === 'current' && !node.topicId && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleTopic(node.id);
                                    }}
                                    style={{
                                        marginTop: '1rem',
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '8px',
                                        background: '#22c55e',
                                        color: 'white',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontWeight: '600',
                                        fontSize: '0.9rem',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 10px 25px rgba(34, 197, 94, 0.3)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    Mark Pre-requisite Complete ✓
                                </button>
                            )}
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Tips Section */}
            <div className="glass" style={{ marginTop: '4rem', padding: '2rem' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>💡 Pro Tips for Success</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    <div>
                        <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--primary-color)' }}>Practice Daily</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            Consistency beats intensity. Solve at least one problem daily.
                        </p>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#22c55e' }}>Understand, Don't Memorize</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            Focus on understanding patterns, not memorizing solutions.
                        </p>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#eab308' }}>Review Regularly</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            Revisit completed topics to reinforce your understanding.
                        </p>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#f97316' }}>Time Your Solutions</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            In interviews, efficiency matters. Practice solving under time pressure.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Roadmap;
