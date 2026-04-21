import { motion } from 'framer-motion';
import { Check, Lock, ArrowRight, BookOpen, Code, Zap, Trophy } from 'lucide-react';
import { useProgress } from '../../hooks/useProgress';
import RoadmapBackground from './RoadmapBackground';
import RoadmapCard from './RoadmapCard';
import styles from './Roadmap.module.css';
import type { RoadmapNode } from './types';

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

    const getStatusIcon = (status: 'completed' | 'current' | 'locked') => {
        switch (status) {
            case 'completed': return <Check size={20} />;
            case 'current': return <ArrowRight size={20} />;
            case 'locked': return <Lock size={16} />;
        }
    };

    const getStatusColor = (status: 'completed' | 'current' | 'locked') => {
        switch (status) {
            case 'completed': return '#22c55e';
            case 'current': return 'var(--primary-color)';
            case 'locked': return 'var(--text-muted)';
        }
    };

    const completedCount = roadmapData.filter(n => getDynamicStatus(n) === 'completed').length;
    const currentCount = roadmapData.filter(n => getDynamicStatus(n) === 'current').length;
    const lockedCount = roadmapData.filter(n => getDynamicStatus(n) === 'locked').length;
    const progress = Math.round((completedCount / roadmapData.length) * 100);

    return (
        <section id="roadmap" className={`container ${styles.section}`}>
            <RoadmapBackground />

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
                    className={styles.badge}
                >
                    <ArrowRight size={16} fill="currentColor" />
                    <span className={styles.badgeText}>Structured Learning Path</span>
                </motion.div>
                <h2 className={styles.title}>
                    Learning <span className="gradient-text">Roadmap</span>
                </h2>
                <p className={styles.description}>
                    Follow this structured path to master Data Structures and Algorithms. Each step builds upon the previous.
                </p>
            </motion.div>

            {/* Progress Stats */}
            <div className={`glass ${styles.statsContainer}`}>
                <div className={styles.statItem}>
                    <p className={styles.statValue} style={{ color: '#22c55e' }}>{completedCount}</p>
                    <p className={styles.statLabel}>Completed</p>
                </div>
                <div className={styles.statItem}>
                    <p className={styles.statValue} style={{ color: 'var(--primary-color)' }}>{currentCount}</p>
                    <p className={styles.statLabel}>In Progress</p>
                </div>
                <div className={styles.statItem}>
                    <p className={styles.statValue} style={{ color: 'var(--text-muted)' }}>{lockedCount}</p>
                    <p className={styles.statLabel}>Remaining</p>
                </div>
                <div className={styles.statItem}>
                    <p className={styles.statValue} style={{ color: '#eab308' }}>{progress}%</p>
                    <p className={styles.statLabel}>Progress</p>
                </div>
            </div>

            {/* Roadmap Timeline */}
            <div className={styles.timelineContainer}>
                <div className={styles.timelineLine} />

                {roadmapData.map((node, index) => (
                    <motion.div
                        key={node.id}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ delay: index * 0.1 }}
                        className={styles.timelineNode}
                        style={{
                            justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start',
                            paddingRight: index % 2 === 0 ? 'calc(50% + 2rem)' : 0,
                            paddingLeft: index % 2 === 0 ? 0 : 'calc(50% + 2rem)',
                        }}
                    >
                        {/* Node Circle */}
                        <div 
                            className={styles.nodeCircle}
                            style={{
                                background: getDynamicStatus(node) === 'locked' ? 'var(--bg-secondary)' : getStatusColor(getDynamicStatus(node)),
                                border: `3px solid ${getStatusColor(getDynamicStatus(node))}`,
                                color: getDynamicStatus(node) === 'locked' ? 'var(--text-muted)' : 'white',
                            }}
                        >
                            {getStatusIcon(getDynamicStatus(node))}
                        </div>

                        {/* Card */}
                        <RoadmapCard
                            node={node}
                            status={getDynamicStatus(node)}
                            statusColor={getStatusColor(getDynamicStatus(node))}
                            difficultyColor={difficultyColors[node.difficulty]}
                            onNavigate={onNavigateToTopic}
                            onToggleTopic={toggleTopic}
                        />
                    </motion.div>
                ))}
            </div>

            {/* Tips Section */}
            <div className={`glass ${styles.tipsSection}`}>
                <h3 style={{ marginBottom: '1.5rem' }}>💡 Pro Tips for Success</h3>
                <div className={styles.tipsGrid}>
                    <div className={styles.tipItem}>
                        <h4 style={{ color: 'var(--primary-color)' }}>Practice Daily</h4>
                        <p>
                            Consistency beats intensity. Solve at least one problem daily.
                        </p>
                    </div>
                    <div className={styles.tipItem}>
                        <h4 style={{ color: '#22c55e' }}>Understand, Don't Memorize</h4>
                        <p>
                            Focus on understanding patterns, not memorizing solutions.
                        </p>
                    </div>
                    <div className={styles.tipItem}>
                        <h4 style={{ color: '#eab308' }}>Debug Effectively</h4>
                        <p>
                            Use print statements and trace through examples step-by-step.
                        </p>
                    </div>
                    <div className={styles.tipItem}>
                        <h4 style={{ color: 'var(--secondary-color)' }}>Review & Refactor</h4>
                        <p>
                            After solving, review cleaner solutions and learn from them.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Roadmap;
