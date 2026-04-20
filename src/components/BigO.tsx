import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, HardDrive, Calculator, Zap, Target, BookOpen, Search } from 'lucide-react';

const complexities = [
    {
        label: 'O(1)',
        name: 'Constant Time',
        color: '#14b8a6',
        desc: 'Performance is independent of input size.',
        example: 'Array access by index: arr[5]',
        realWorld: 'Dictionary lookup, Hash table access',
        operations: '1 operation regardless'
    },
    {
        label: 'O(log n)',
        name: 'Logarithmic Time',
        color: '#0ea5e9',
        desc: 'Execution time increases logarithmically.',
        example: 'Binary search',
        realWorld: 'Finding a word in dictionary',
        operations: 'Reduces size by half each step'
    },
    {
        label: 'O(n)',
        name: 'Linear Time',
        color: '#6366f1',
        desc: 'Directly proportional to input size.',
        example: 'Finding maximum in array',
        realWorld: 'Linear search, Printing all',
        operations: 'One operation per element'
    },
    {
        label: 'O(n log n)',
        name: 'Linearithmic Time',
        color: '#8b5cf6',
        desc: 'Efficient sorting algorithms.',
        example: 'Merge Sort, Quick Sort',
        realWorld: 'Practical sorting algorithms',
        operations: 'n × log₂(n) operations'
    },
    {
        label: 'O(n²)',
        name: 'Quadratic Time',
        color: '#eab308',
        desc: 'Nested loops over the same input.',
        example: 'Bubble Sort, Selection Sort',
        realWorld: 'Checking all pairs in a set',
        operations: 'n × n operations'
    },
    {
        label: 'O(2ⁿ)',
        name: 'Exponential Time',
        color: '#f43f5e',
        desc: 'Growth doubles with each addition.',
        example: 'Solving Tower of Hanoi',
        realWorld: 'Brute force password cracking',
        operations: '2^n operations'
    },
];

const MathProofInteractive = () => {
    const [constantC, setConstantC] = useState(2);
    const [startN, setStartN] = useState(5);

    // Simple plotting logic for interactive proof f(n) <= c * g(n) for n >= n0
    // Let's say f(n) = n^2 + 5n + 10
    // g(n) = n^2
    const generatePath = (fn: (x: number) => number) => {
        let path = '';
        for (let i = 0; i <= 20; i++) {
            const x = (i / 20) * 100;
            // Scale y to roughly fit 0-500 into 100 units
            const val = Math.min(fn(i), 500); 
            const y = 100 - (val / 500) * 100;
            if (i === 0) path += `M ${x} ${y} `;
            else path += `L ${x} ${y} `;
        }
        return path;
    };

    const f_n = (n: number) => n * n + 5 * n + 10;
    const cg_n = (n: number) => constantC * (n * n);

    return (
        <div className="glass" style={{ padding: 'clamp(1.25rem, 5vw, 2.5rem)', marginBottom: '4rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
                <h3 style={{ fontSize: '2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Calculator className="gradient-text" /> 
                    Interactive Proof: Big O Definition
                </h3>
                <p style={{ color: 'var(--text-muted)' }}>
                    Proof that <span style={{ color: '#14b8a6' }}>f(n) = n² + 5n + 10</span> is O(n²) because we can find constants <strong>c</strong> and <strong>n₀</strong> such that <span style={{ color: '#f43f5e' }}>f(n) ≤ c · n²</span> for all n ≥ n₀.
                </p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)', gap: 'clamp(1rem, 4vw, 2rem)', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div>
                        <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-main)', fontWeight: '600' }}>
                            <span>Constant (c):</span>
                            <span style={{ color: '#f43f5e' }}>{constantC}</span>
                        </label>
                        <input 
                            type="range" min="1" max="10" step="0.5" value={constantC} 
                            onChange={e => setConstantC(parseFloat(e.target.value))}
                            style={{ width: '100%', accentColor: '#f43f5e' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-main)', fontWeight: '600' }}>
                            <span>Starting n (n₀):</span>
                            <span style={{ color: '#eab308' }}>{startN}</span>
                        </label>
                        <input 
                            type="range" min="1" max="15" step="1" value={startN} 
                            onChange={e => setStartN(parseInt(e.target.value))}
                            style={{ width: '100%', accentColor: '#eab308' }}
                        />
                    </div>
                    
                    <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: '8px', background: 'rgba(0,0,0,0.2)' }}>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Current State:</div>
                        {f_n(startN) <= cg_n(startN) ? (
                            <div style={{ color: '#14b8a6', fontWeight: 'bold' }}>✓ Equation holds at n₀ = {startN}</div>
                        ) : (
                            <div style={{ color: '#f43f5e', fontWeight: 'bold' }}>✗ Increase c or n₀</div>
                        )}
                    </div>
                </div>

                <div style={{ position: 'relative', height: '250px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', padding: '1.5rem' }}>
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                        {/* Grid lines */}
                        <defs>
                            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
                            </pattern>
                        </defs>
                        <rect width="100" height="100" fill="url(#grid)" />
                        
                        {/* Axis bounds */}
                        <line x1="0" y1="100" x2="100" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                        <line x1="0" y1="0" x2="0" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

                        {/* f(n) */}
                        <path d={generatePath(f_n)} fill="none" stroke="#14b8a6" strokeWidth="2" strokeDasharray="3 3"/>
                        
                        {/* c * g(n) */}
                        <path d={generatePath(cg_n)} fill="none" stroke="#f43f5e" strokeWidth="2.5" />

                        {/* n0 line */}
                        <line 
                            x1={(startN / 20) * 100} y1="0" 
                            x2={(startN / 20) * 100} y2="100" 
                            stroke="#eab308" strokeWidth="1" strokeDasharray="4 4" 
                        />
                    </svg>

                    <div style={{ position: 'absolute', bottom: '0', right: '10px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>Input Size (n)</div>
                </div>
            </div>
        </div>
    );
};

const BigOTheory = () => {
    return (
        <section id="big-o" className="container" style={{ padding: 'clamp(3rem, 8vw, 6rem) 1rem' }}>
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ textAlign: 'center', marginBottom: '5rem' }}
            >
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 1.25rem', borderRadius: '99px', background: 'var(--primary-gradient)', color: 'white', marginBottom: '2rem', boxShadow: '0 4px 20px rgba(139, 92, 246, 0.3)' }}
                >
                    <BookOpen size={16} fill="currentColor" />
                    <span style={{ fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Theoretical Foundation</span>
                </motion.div>

                <h2 style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', marginBottom: '1.5rem', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
                    Mastering <span className="gradient-text">Big O Notation</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', maxWidth: '750px', margin: '0 auto', fontSize: '1.25rem', lineHeight: '1.7' }}>
                    The universal language for algorithm efficiency. Learn to analyze time and space complexity to write scalable, high-performance code that handles real-world data at any scale.
                </p>
            </motion.div>

            {/* Core Concepts */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="glass"
                style={{ padding: 'clamp(1.25rem, 5vw, 3rem)', marginBottom: '4rem' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <Calculator size={32} style={{ color: '#8b5cf6' }} />
                    <h3 style={{ fontSize: '2rem', margin: 0 }}>What is Big O?</h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(1.5rem, 4vw, 3rem)', alignItems: 'start' }}>
                    <div>
                        <h4 style={{ color: '#8b5cf6', marginBottom: '1rem', fontSize: '1.3rem' }}>
                            Mathematical Upper Bound
                        </h4>
                        <p style={{ lineHeight: '1.7', marginBottom: '1.5rem' }}>
                            Big O notation describes the <strong>upper bound</strong> of an algorithm's growth rate.
                            It tells us the <em>worst-case scenario</em> for how an algorithm's performance scales
                            as input size approaches infinity.
                        </p>
                        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px' }}>
                            <h5 style={{ color: '#14b8a6', marginBottom: '0.5rem', fontSize: '1rem' }}>Formal Definition</h5>
                            <code style={{
                                color: 'var(--text-main)',
                                display: 'block',
                                fontFamily: 'var(--font-mono)',
                                lineHeight: '1.5'
                            }}>
                                f(n) = O(g(n)) ⟺ <br/>
                                ∃ c, n₀ &gt; 0 such that<br/>
                                ∀ n ≥ n₀: f(n) ≤ c × g(n)
                            </code>
                        </div>
                    </div>
                    <div>
                        <h4 style={{ color: '#8b5cf6', marginBottom: '1rem', fontSize: '1.3rem' }}>
                            Why It Matters
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(20, 184, 166, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Clock size={20} color="#14b8a6" />
                                </div>
                                <div>
                                    <strong style={{ display: 'block', marginBottom: '0.25rem', fontSize: '1.1rem' }}>Time Complexity</strong>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>How execution time scales with data.</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <HardDrive size={20} color="#8b5cf6" />
                                </div>
                                <div>
                                    <strong style={{ display: 'block', marginBottom: '0.25rem', fontSize: '1.1rem' }}>Space Complexity</strong>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Auxiliary memory usage patterns.</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(244, 63, 94, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Target size={20} color="#f43f5e" />
                                </div>
                                <div>
                                    <strong style={{ display: 'block', marginBottom: '0.25rem', fontSize: '1.1rem' }}>Scalability Insights</strong>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Predicting bottlenecks in production.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Interactive Proof */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
            >
                <MathProofInteractive />
            </motion.div>

            {/* Understanding Logarithms */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="glass"
                style={{ padding: 'clamp(1.25rem, 5vw, 3rem)', marginBottom: '4rem', background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.05) 0%, rgba(14, 165, 233, 0.02) 100%)', border: '1px solid rgba(14, 165, 233, 0.2)' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{ padding: '0.75rem', background: 'rgba(14, 165, 233, 0.1)', borderRadius: '12px' }}>
                        <Target size={28} color="#0ea5e9" />
                    </div>
                    <h3 style={{ fontSize: '2rem', margin: 0, color: '#0ea5e9' }}>Understanding Logarithms <span style={{ opacity: 0.5 }}>O(log n)</span></h3>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(1.5rem, 4vw, 3rem)', alignItems: 'center' }}>
                    <div>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                            A logarithm is simply the inverse of exponentiation. If exponentiation is <strong>"how many times do I multiply by 2 to get N?"</strong>, a logarithm is <strong>"how many times can I divide N by 2 until I reach 1?"</strong>
                        </p>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '2rem' }}>
                            In Computer Science, we usually assume Base 2: <code>log₂(N)</code>. This is incredibly powerful because it means as your data grows exponentially, your operations only grow linearly!
                        </p>
                        
                        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #0ea5e9' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Calculation</span>
                                <span style={{ fontWeight: 'bold' }}>Operations (log₂N)</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span>N = 16</span>
                                <span style={{ color: '#0ea5e9', fontFamily: 'var(--font-mono)' }}>4</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span>N = 1,024 <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>(1k)</span></span>
                                <span style={{ color: '#0ea5e9', fontFamily: 'var(--font-mono)' }}>10</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span>N = 1,048,576 <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>(1M)</span></span>
                                <span style={{ color: '#0ea5e9', fontFamily: 'var(--font-mono)' }}>20</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>N = 1 Trillion</span>
                                <span style={{ color: '#0ea5e9', fontFamily: 'var(--font-mono)' }}>~40</span>
                            </div>
                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Search size={18} color="#0ea5e9" /> Code Example: Binary Search
                            </h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                Searching a phonebook with 1,000,000 names takes at most <strong>20 steps</strong> because you rip the book in half every time.
                            </p>
                            <code style={{ display: 'block', padding: '1rem', background: '#0a0a0a', borderRadius: '8px', color: '#c9d1d9', fontSize: '0.85rem' }}>
                                <span style={{ color: '#ff7b72' }}>while</span> (left &lt;= right) {'{\n'}
                                {'  '}<span style={{ color: '#79c0ff' }}>mid</span> = Math.floor((left + right) / <span style={{ color: '#a5d6ff' }}>2</span>);\n
                                {'  '}<span style={{ color: '#ff7b72' }}>if</span> (arr[mid] === target) <span style={{ color: '#ff7b72' }}>return</span> mid;\n
                                {'  '}// The magic of log(n):\n
                                {'  '}// We eliminate 50% of elements!\n
                                {'}'}
                            </code>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Complexity Classes Overview */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{ marginBottom: '4rem' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h3 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                        Core Complexity Classes
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>From best to worst performance capabilities.</p>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem' }}>
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
                                borderTop: `4px solid ${item.color}`,
                                position: 'relative',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <h4 style={{ color: item.color, fontSize: '1.5rem', margin: 0, fontWeight: '800' }}>
                                    {item.label}
                                </h4>
                                <span style={{
                                    background: `${item.color}20`,
                                    color: item.color,
                                    padding: '0.3rem 0.8rem',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    fontWeight: '700'
                                }}>
                                    {item.name}
                                </span>
                            </div>

                            <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                                {item.desc}
                            </p>

                            <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ marginBottom: '0.75rem' }}>
                                    <strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Example:</strong>
                                    <code style={{ fontSize: '0.85rem', color: item.color }}>{item.example}</code>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Zap size={14} style={{ color: item.color }} />
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                        {item.operations}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default BigOTheory;
