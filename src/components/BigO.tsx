import { motion } from 'framer-motion';
import { TrendingUp, Clock, HardDrive, Calculator, Zap, Target } from 'lucide-react';

const complexities = [
    {
        label: 'O(1)',
        name: 'Constant Time',
        color: '#10b981',
        desc: 'Performance is independent of input size.',
        example: 'Array access by index: arr[5]',
        realWorld: 'Dictionary lookup, Hash table access',
        operations: '1 operation regardless of input size'
    },
    {
        label: 'O(log n)',
        name: 'Logarithmic Time',
        color: '#f97316',
        desc: 'Execution time increases logarithmically.',
        example: 'Binary search in sorted array',
        realWorld: 'Finding a word in dictionary, Database indexing',
        operations: 'Reduces problem size by half each step'
    },
    {
        label: 'O(n)',
        name: 'Linear Time',
        color: '#6366f1',
        desc: 'Directly proportional to input size.',
        example: 'Finding maximum in unsorted array',
        realWorld: 'Linear search, Printing all elements',
        operations: 'One operation per element'
    },
    {
        label: 'O(n log n)',
        name: 'Linearithmic Time',
        color: '#8b5cf6',
        desc: 'Efficient sorting algorithms.',
        example: 'Merge Sort, Quick Sort, Heap Sort',
        realWorld: 'Most practical sorting algorithms',
        operations: 'n × log₂(n) operations'
    },
    {
        label: 'O(n²)',
        name: 'Quadratic Time',
        color: '#f59e0b',
        desc: 'Nested loops over the same input.',
        example: 'Bubble Sort, Selection Sort',
        realWorld: 'Checking all pairs in a set',
        operations: 'n × n operations'
    },
    {
        label: 'O(2ⁿ)',
        name: 'Exponential Time',
        color: '#ef4444',
        desc: 'Growth doubles with each addition.',
        example: 'Solving Tower of Hanoi, Subset generation',
        realWorld: 'Brute force password cracking',
        operations: '2^n operations (grows extremely fast)'
    },
];

const BigOTheory = () => {
    return (
        <section id="big-o" className="container" style={{ padding: '8rem 0' }}>
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ textAlign: 'center', marginBottom: '5rem' }}
            >
                <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                    Mastering <span className="gradient-text">Big O Notation</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem', lineHeight: '1.6' }}>
                    The language of algorithm efficiency. Learn to analyze time and space complexity to write
                    scalable, high-performance code that handles real-world data at any scale.
                </p>
            </motion.div>

            {/* Core Concepts */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="glass"
                style={{ padding: '3rem', marginBottom: '4rem' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <Calculator size={32} style={{ color: 'var(--primary-color)' }} />
                    <h3 style={{ fontSize: '2rem', margin: 0 }}>What is Big O?</h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
                    <div>
                        <h4 style={{ color: 'var(--primary-color)', marginBottom: '1rem', fontSize: '1.3rem' }}>
                            Mathematical Definition
                        </h4>
                        <p style={{ lineHeight: '1.7', marginBottom: '1.5rem' }}>
                            Big O notation describes the <strong>upper bound</strong> of an algorithm's growth rate.
                            It tells us the <em>worst-case scenario</em> for how an algorithm's performance scales
                            as input size increases.
                        </p>
                        <div className="glass" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                            <h5 style={{ color: 'var(--secondary-color)', marginBottom: '0.5rem' }}>Formal Definition</h5>
                            <code style={{
                                background: 'rgba(245, 158, 11, 0.1)',
                                padding: '0.5rem',
                                borderRadius: '6px',
                                display: 'block',
                                fontFamily: 'monospace'
                            }}>
                                f(n) = O(g(n)) ⟺ ∃ c, n₀ &gt; 0 such that ∀ n ≥ n₀: f(n) ≤ c × g(n)
                            </code>
                        </div>
                    </div>
                    <div>
                        <h4 style={{ color: 'var(--primary-color)', marginBottom: '1rem', fontSize: '1.3rem' }}>
                            Why It Matters
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Clock size={20} style={{ color: 'var(--secondary-color)' }} />
                                <span><strong>Time Complexity:</strong> How execution time scales</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <HardDrive size={20} style={{ color: 'var(--accent-color)' }} />
                                <span><strong>Space Complexity:</strong> Memory usage patterns</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Target size={20} style={{ color: 'var(--primary-color)' }} />
                                <span><strong>Scalability:</strong> Performance with large datasets</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Complexity Classes */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{ marginBottom: '4rem' }}
            >
                <h3 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem' }}>
                    Complexity Classes
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                    {complexities.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                            className="glass"
                            style={{
                                padding: '2rem',
                                borderLeft: `4px solid ${item.color}`,
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Subtle background gradient */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                width: '100px',
                                height: '100px',
                                background: `radial-gradient(circle, ${item.color}15 0%, transparent 70%)`,
                                borderRadius: '50%',
                                transform: 'translate(30px, -30px)'
                            }} />

                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                    <h4 style={{ color: item.color, fontSize: '1.5rem', margin: 0, fontWeight: '700' }}>
                                        {item.label}
                                    </h4>
                                    <span style={{
                                        background: `${item.color}20`,
                                        color: item.color,
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '20px',
                                        fontSize: '0.75rem',
                                        fontWeight: '600'
                                    }}>
                                        {item.name}
                                    </span>
                                </div>

                                <p style={{ color: 'var(--text-main)', marginBottom: '1rem', lineHeight: '1.6' }}>
                                    {item.desc}
                                </p>

                                <div style={{ marginBottom: '1rem' }}>
                                    <h5 style={{ color: 'var(--primary-color)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                        Example Algorithm:
                                    </h5>
                                    <code style={{
                                        background: 'rgba(245, 158, 11, 0.1)',
                                        padding: '0.5rem 0.75rem',
                                        borderRadius: '6px',
                                        fontSize: '0.85rem',
                                        display: 'block'
                                    }}>
                                        {item.example}
                                    </code>
                                </div>

                                <div style={{ marginBottom: '1rem' }}>
                                    <h5 style={{ color: 'var(--secondary-color)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                        Real World Use:
                                    </h5>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                                        {item.realWorld}
                                    </p>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Zap size={14} style={{ color: 'var(--accent-color)' }} />
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                        {item.operations}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Visual Comparison */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="glass"
                style={{ padding: '3rem', marginBottom: '4rem' }}
            >
                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <TrendingUp size={28} style={{ color: 'var(--primary-color)' }} />
                        Growth Rate Comparison
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        Visualizing how different complexities scale with input size (n)
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
                    <div style={{ height: '350px', width: '100%', position: 'relative', borderBottom: '2px solid var(--border-color)', borderLeft: '2px solid var(--border-color)' }}>
                        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                            {/* Grid lines */}
                            <defs>
                                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="var(--border-color)" strokeWidth="0.2" opacity="0.3"/>
                                </pattern>
                            </defs>
                            <rect width="100" height="100" fill="url(#grid)" />

                            {/* O(2^n) - Exponential */}
                            <motion.path
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 2, delay: 0.5 }}
                                d="M 0 100 Q 20 80 40 40 Q 60 10 80 0 Q 90 -5 100 -10"
                                fill="transparent"
                                stroke="#ef4444"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />

                            {/* O(n²) - Quadratic */}
                            <motion.path
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 2, delay: 0.3 }}
                                d="M 0 100 Q 50 100 100 0"
                                fill="transparent"
                                stroke="#f59e0b"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />

                            {/* O(n log n) - Linearithmic */}
                            <motion.path
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 2, delay: 0.2 }}
                                d="M 0 100 Q 30 85 60 60 Q 80 40 100 25"
                                fill="transparent"
                                stroke="#8b5cf6"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />

                            {/* O(n) - Linear */}
                            <motion.path
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 2, delay: 0.1 }}
                                d="M 0 100 L 100 20"
                                fill="transparent"
                                stroke="#6366f1"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />

                            {/* O(log n) - Logarithmic */}
                            <motion.path
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 2 }}
                                d="M 0 100 Q 0 60 100 60"
                                fill="transparent"
                                stroke="#f97316"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />

                            {/* O(1) - Constant */}
                            <motion.path
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5 }}
                                d="M 0 95 L 100 90"
                                fill="transparent"
                                stroke="#10b981"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />
                        </svg>

                        <div style={{ position: 'absolute', bottom: '-30px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            Input Size (n) →
                        </div>
                        <div style={{ position: 'absolute', top: '50%', left: '-60px', transform: 'translateY(-50%) rotate(-90deg)', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            Operations ↑
                        </div>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: 'var(--primary-color)' }}>
                            Performance Rankings
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[
                                { label: 'O(1)', desc: 'Best - Instantaneous', color: '#10b981' },
                                { label: 'O(log n)', desc: 'Excellent - Very fast', color: '#f97316' },
                                { label: 'O(n)', desc: 'Good - Linear scaling', color: '#6366f1' },
                                { label: 'O(n log n)', desc: 'Fair - Acceptable for sorting', color: '#8b5cf6' },
                                { label: 'O(n²)', desc: 'Poor - Avoid for large n', color: '#f59e0b' },
                                { label: 'O(2ⁿ)', desc: 'Worst - Exponential growth', color: '#ef4444' }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        padding: '0.75rem',
                                        borderRadius: '8px',
                                        background: `linear-gradient(135deg, ${item.color}10, ${item.color}05)`
                                    }}
                                >
                                    <div style={{
                                        width: '12px',
                                        height: '12px',
                                        backgroundColor: item.color,
                                        borderRadius: '50%',
                                        flexShrink: 0
                                    }} />
                                    <div>
                                        <strong style={{ color: item.color }}>{item.label}</strong>
                                        <span style={{ color: 'var(--text-muted)', marginLeft: '0.5rem', fontSize: '0.9rem' }}>
                                            {item.desc}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Common Mistakes & Tips */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="glass"
                style={{ padding: '3rem' }}
            >
                <h3 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
                    Common Pitfalls & Best Practices
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                    <div>
                        <h4 style={{ color: '#ef4444', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            ⚠️ Common Mistakes
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <li style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', borderLeft: '3px solid #ef4444' }}>
                                <strong>Counting operations instead of growth rate</strong>
                                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                    Big O ignores constants and lower-order terms
                                </p>
                            </li>
                            <li style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', borderLeft: '3px solid #ef4444' }}>
                                <strong>Confusing worst-case with average-case</strong>
                                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                    Big O typically refers to worst-case analysis
                                </p>
                            </li>
                            <li style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', borderLeft: '3px solid #ef4444' }}>
                                <strong>Focusing only on time complexity</strong>
                                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                    Space complexity is equally important
                                </p>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ color: '#10b981', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            ✅ Best Practices
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <li style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', borderLeft: '3px solid #10b981' }}>
                                <strong>Focus on scalability</strong>
                                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                    Consider how your algorithm performs with large inputs
                                </p>
                            </li>
                            <li style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', borderLeft: '3px solid #10b981' }}>
                                <strong>Balance time and space</strong>
                                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                    Sometimes O(n²) time with O(1) space beats O(n) time with O(n²) space
                                </p>
                            </li>
                            <li style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', borderLeft: '3px solid #10b981' }}>
                                <strong>Understand the problem constraints</strong>
                                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                    Choose algorithms that fit your specific use case and data size
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default BigOTheory;
