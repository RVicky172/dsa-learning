import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown, ChevronUp, EyeOff, Zap, Clock, HardDrive, CheckCircle2, Circle } from 'lucide-react';
import { 
    arrayProblems,
    linkedListProblems,
    hashTableProblems,
    stackQueueProblems,
    treeProblems,
    graphProblems
} from '../data/newProblems';
import type { Problem } from '../types/topic';
import { useProgress } from '../hooks/useProgress';

const difficultyColors: Record<string, string> = {
    'Easy': '#22c55e',
    'Medium': '#f97316',
    'Hard': '#eab308',
    'Expert': '#ef4444'
};

const categories = ['All', 'Arrays', 'Linked List', 'Hash Table', 'Stack', 'Queue', 'Trees', 'Graphs'];
const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

const ProblemsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [expandedProblem, setExpandedProblem] = useState<string | null>(null);
    const [showSolution, setShowSolution] = useState<Record<string, boolean>>({});
    const { isProblemCompleted, toggleProblem } = useProgress();

    // Combine all problems and add category information
    const allProblems = [
        ...arrayProblems.map(p => ({ ...p, category: ['Arrays'] })),
        ...linkedListProblems.map(p => ({ ...p, category: ['Linked List'] })),
        ...hashTableProblems.map(p => ({ ...p, category: ['Hash Table'] })),
        ...stackQueueProblems.map(p => ({ ...p, category: ['Stack', 'Queue'] })),
        ...treeProblems.map(p => ({ ...p, category: ['Trees'] })),
        ...graphProblems.map(p => ({ ...p, category: ['Graphs'] }))
    ];

    const filteredProblems = allProblems.filter(problem => {
        const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            problem.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDifficulty = selectedDifficulty === 'All' || problem.difficulty === selectedDifficulty;
        const matchesCategory = selectedCategory === 'All' || problem.category.includes(selectedCategory);
        return matchesSearch && matchesDifficulty && matchesCategory;
    });

    const toggleSolution = (problemId: string) => {
        setShowSolution(prev => ({
            ...prev,
            [problemId]: !prev[problemId]
        }));
    };

    return (
        <section id="problems" className="container" style={{ padding: '8rem 0' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                    Practice <span className="gradient-text">Problems</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
                    Master DSA with curated problems. Each includes brute force and optimal solutions with detailed complexity analysis.
                </p>
            </div>

            {/* Filters */}
            <div className="glass" style={{ padding: '1.5rem 2rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    {/* Search */}
                    <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search problems..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem 0.75rem 2.75rem',
                                borderRadius: '8px',
                                border: '1px solid var(--border-color)',
                                background: 'rgba(0,0,0,0.2)',
                                color: 'var(--text-main)',
                                fontSize: '0.95rem'
                            }}
                        />
                    </div>

                    {/* Difficulty Filter */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Filter size={18} color="var(--text-muted)" />
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {difficulties.map(diff => (
                                <button
                                    key={diff}
                                    onClick={() => setSelectedDifficulty(diff)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '8px',
                                        border: 'none',
                                        background: selectedDifficulty === diff
                                            ? (diff === 'All' ? 'var(--primary-color)' : difficultyColors[diff] || 'var(--primary-color)')
                                            : 'transparent',
                                        color: selectedDifficulty === diff ? 'white' : 'var(--text-muted)',
                                        cursor: 'pointer',
                                        fontWeight: '600',
                                        fontSize: '0.85rem',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {diff}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Category Filter */}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            style={{
                                padding: '0.35rem 0.85rem',
                                borderRadius: '6px',
                                border: selectedCategory === cat ? '1px solid var(--primary-color)' : '1px solid var(--border-color)',
                                background: selectedCategory === cat ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                                color: selectedCategory === cat ? 'var(--primary-color)' : 'var(--text-muted)',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Problems List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {filteredProblems.length === 0 ? (
                    <div className="glass" style={{ padding: '3rem', textAlign: 'center' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>No problems match your filters. Try adjusting your search.</p>
                    </div>
                ) : (
                    filteredProblems.map((problem) => (
                        <ProblemCard
                            key={problem.id}
                            problem={problem}
                            isExpanded={expandedProblem === problem.id}
                            onToggleExpand={() => setExpandedProblem(expandedProblem === problem.id ? null : problem.id)}
                            solutionVisible={showSolution[problem.id]}
                            onToggleSolution={() => toggleSolution(problem.id)}
                            isCompleted={isProblemCompleted(problem.id)}
                            onToggleComplete={(e) => {
                                e.stopPropagation();
                                toggleProblem(problem.id);
                            }}
                        />
                    ))
                )}
            </div>

            {/* Stats */}
            <div className="glass" style={{ marginTop: '3rem', padding: '2rem', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '2rem', fontWeight: '700', color: '#22c55e' }}>
                        {allProblems.filter(p => p.difficulty === 'Easy').length}
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Easy</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '2rem', fontWeight: '700', color: '#eab308' }}>
                        {allProblems.filter(p => p.difficulty === 'Medium').length}
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Medium</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '2rem', fontWeight: '700', color: '#ef4444' }}>
                        {allProblems.filter(p => p.difficulty === 'Hard').length}
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Hard</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '2rem', fontWeight: '700', color: '#8b5cf6' }}>
                        {allProblems.filter(p => p.difficulty === 'Hard').length}
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Expert</p>
                </div>
            </div>
        </section>
    );
};

interface ProblemCardProps {
    problem: Problem & { category: string[] };
    isExpanded: boolean;
    onToggleExpand: () => void;
    solutionVisible: boolean;
    onToggleSolution: () => void;
    isCompleted: boolean;
    onToggleComplete: (e: React.MouseEvent) => void;
}

const ProblemCard = ({ problem, isExpanded, onToggleExpand, solutionVisible, onToggleSolution, isCompleted, onToggleComplete }: ProblemCardProps) => {
    const difficultyColor = difficultyColors[problem.difficulty];

    return (
        <motion.div
            layout
            className="glass"
            style={{ overflow: 'hidden' }}
        >
            {/* Header - Always visible */}
            <div
                onClick={onToggleExpand}
                style={{
                    padding: '1.5rem 2rem',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <button
                        onClick={onToggleComplete}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: isCompleted ? '#22c55e' : 'var(--text-muted)',
                            cursor: 'pointer',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        title={isCompleted ? "Mark as uncompleted" : "Mark as completed"}
                    >
                        {isCompleted ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                    </button>
                    <span style={{
                        padding: '0.35rem 0.85rem',
                        borderRadius: '6px',
                        background: difficultyColor,
                        color: 'white',
                        fontSize: '0.8rem',
                        fontWeight: '700'
                    }}>
                        {problem.difficulty}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', margin: 0, color: isCompleted ? 'var(--text-muted)' : 'inherit', textDecoration: isCompleted ? 'line-through' : 'none' }}>
                        {problem.title}
                    </h3>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {problem.category.map(cat => (
                            <span key={cat} style={{
                                padding: '0.25rem 0.6rem',
                                borderRadius: '4px',
                                background: 'rgba(99, 102, 241, 0.15)',
                                color: 'var(--primary-color)',
                                fontSize: '0.75rem'
                            }}>
                                {cat}
                            </span>
                        ))}
                    </div>
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ padding: '0 2rem 2rem' }}
                >
                    {/* Description */}
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                        {problem.description}
                    </p>

                    {/* Examples */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h4 style={{ marginBottom: '0.75rem' }}>Examples:</h4>
                        {problem.examples.map((ex, idx) => (
                            <div key={idx} style={{
                                padding: '1rem',
                                background: 'rgba(0,0,0,0.2)',
                                borderRadius: '8px',
                                marginBottom: '0.75rem'
                            }}>
                                <div style={{ marginBottom: '0.5rem' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Input: </span>
                                    <code style={{ color: 'var(--secondary-color)' }}>{ex.input}</code>
                                </div>
                                <div style={{ marginBottom: ex.explanation ? '0.5rem' : 0 }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Output: </span>
                                    <code style={{ color: '#22c55e' }}>{ex.output}</code>
                                </div>
                                {ex.explanation && (
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic', margin: 0 }}>
                                        {ex.explanation}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Solution Button */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <button
                            onClick={() => onToggleSolution()}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '8px',
                                background: solutionVisible ? '#22c55e' : 'rgba(34, 197, 94, 0.15)',
                                color: solutionVisible ? 'white' : '#22c55e',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '0.9rem'
                            }}
                        >
                            {solutionVisible ? <EyeOff size={18} /> : <Zap size={18} />}
                            {solutionVisible ? 'Hide Solution' : 'Show Solution'}
                        </button>
                    </div>

                    {/* Solution Content */}
                    {solutionVisible && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                borderLeft: `4px solid #22c55e`,
                                paddingLeft: '1.5rem'
                            }}
                        >
                            <h4 style={{
                                color: '#22c55e',
                                marginBottom: '1rem'
                            }}>
                                ⚡ Solution Approach
                            </h4>

                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '1rem' }}>
                                {problem.solution.approach}
                            </p>

                            {/* Code */}
                            <pre style={{
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                padding: '1.5rem',
                                borderRadius: '12px',
                                overflowX: 'auto',
                                marginBottom: '1.5rem',
                                fontSize: '0.85rem',
                                lineHeight: '1.6'
                            }}>
                                <code style={{ color: '#e5e7eb' }}>
                                    {problem.solution.code}
                                </code>
                            </pre>

                            {/* Complexity Analysis */}
                            <div className="glass" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                                <h5 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    📊 Complexity Analysis
                                </h5>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                            <Clock size={16} color="#22c55e" />
                                            <span style={{ fontWeight: '600' }}>Time:</span>
                                            <code style={{ color: '#22c55e', fontWeight: '700' }}>
                                                {problem.solution.timeComplexity}
                                            </code>
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                            <HardDrive size={16} color="#8b5cf6" />
                                            <span style={{ fontWeight: '600' }}>Space:</span>
                                            <code style={{ color: '#8b5cf6', fontWeight: '700' }}>
                                                {problem.solution.spaceComplexity}
                                            </code>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Step by Step */}
                            <div style={{ marginTop: '1rem' }}>
                                <h5 style={{ marginBottom: '0.75rem' }}>Step-by-Step:</h5>
                                <ol style={{ paddingLeft: '1.25rem', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.8' }}>
                                    {problem.solution.stepByStep.map((step, idx) => (
                                        <li key={idx}>{step}</li>
                                    ))}
                                </ol>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </motion.div>
    );
};

export default ProblemsPage;
