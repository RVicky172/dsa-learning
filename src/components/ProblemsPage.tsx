import { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown, ChevronUp, EyeOff, Zap, Clock, HardDrive, CheckCircle2, Circle, Crown } from 'lucide-react';
import {
    allProblems,
    problemDifficulties,
    type ProblemListItem
} from '../data/problems/registry';
import { useProgress } from '../hooks/useProgress';
import { useAuth } from '../hooks/useAuth';
import { problemService } from '../services/problemService';
import type { ProblemListItemApi } from '../types/api';
import CodeExecutionPanel from './CodeExecutionPanel';

const difficultyColors: Record<string, string> = {
    'Easy': '#22c55e',
    'Medium': '#f97316',
    'Hard': '#eab308',
    'Expert': '#ef4444'
};

const PAGE_SIZE = 12;

interface ProblemRecord extends ProblemListItem {
    isPremium: boolean;
    canAccess: boolean;
}

interface ProblemsPageProps {
    onGoLogin?: () => void;
    onGoUpgrade?: () => void;
}

function buildFallbackProblem(problem: ProblemListItemApi, index: number): ProblemRecord {
    return {
        id: problem.id,
        title: problem.title,
        difficulty: problem.difficulty,
        description: problem.description,
        examples: [{ input: 'N/A', output: 'N/A', explanation: 'Example data not yet authored.' }],
        solution: {
            approach: 'No detailed editorial has been added for this imported problem yet.',
            code: '// Add solution details in the admin content editor',
            timeComplexity: 'N/A',
            spaceComplexity: 'N/A',
            stepByStep: ['Detailed solution notes will appear once authored.']
        },
        hints: [],
        category: ['Imported'],
        uniqueKey: `backend:${problem.id}:${index}`,
        isPremium: problem.isPremium,
        canAccess: problem.canAccess ?? !problem.isPremium
    };
}

const ProblemsPage = ({ onGoLogin, onGoUpgrade }: ProblemsPageProps) => {
    const { token, isAuthenticated } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [expandedProblem, setExpandedProblem] = useState<string | null>(null);
    const [showSolution, setShowSolution] = useState<Record<string, boolean>>({});
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isSmallPhone, setIsSmallPhone] = useState(window.innerWidth <= 480);
    const [problems, setProblems] = useState<ProblemRecord[]>(
        allProblems.map((problem) => ({ ...problem, isPremium: false, canAccess: true }))
    );
    const [isLoadingProblems, setIsLoadingProblems] = useState(true);
    const [backendMode, setBackendMode] = useState(false);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const { isProblemCompleted, toggleProblem } = useProgress();

    useEffect(() => {
        let isCancelled = false;

        const staticByTitle = new Map<string, ProblemListItem>();
        allProblems.forEach((problem) => {
            staticByTitle.set(problem.title.trim().toLowerCase(), problem);
        });

        const loadProblems = async () => {
            setIsLoadingProblems(true);

            try {
                const apiProblems = await problemService.list(undefined, token ?? undefined);

                if (apiProblems.length === 0) {
                    if (!isCancelled) {
                        setProblems(allProblems.map((problem) => ({ ...problem, isPremium: false, canAccess: true })));
                        setBackendMode(false);
                    }
                    return;
                }

                const mappedProblems = apiProblems.map((problem, index) => {
                    const staticMatch = staticByTitle.get(problem.title.trim().toLowerCase());

                    if (!staticMatch) {
                        return buildFallbackProblem(problem, index);
                    }

                    return {
                        ...staticMatch,
                        id: problem.id,
                        difficulty: problem.difficulty,
                        description: problem.description || staticMatch.description,
                        uniqueKey: `backend:${problem.id}:${index}`,
                        isPremium: problem.isPremium,
                        canAccess: problem.canAccess ?? !problem.isPremium
                    };
                });

                if (!isCancelled) {
                    setProblems(mappedProblems);
                    setBackendMode(true);
                }
            } catch {
                if (!isCancelled) {
                    setProblems(allProblems.map((problem) => ({ ...problem, isPremium: false, canAccess: true })));
                    setBackendMode(false);
                }
            } finally {
                if (!isCancelled) {
                    setIsLoadingProblems(false);
                }
            }
        };

        void loadProblems();

        return () => {
            isCancelled = true;
        };
    }, [token]);

    const resetListUiState = () => {
        setVisibleCount(PAGE_SIZE);
        setExpandedProblem(null);
        setShowSolution({});
    };

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        resetListUiState();
    };

    const handleDifficultyChange = (difficulty: string) => {
        setSelectedDifficulty(difficulty);
        resetListUiState();
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        resetListUiState();
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            setIsSmallPhone(window.innerWidth <= 480);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const availableCategories = useMemo(() => {
        const categorySet = new Set<string>();
        problems.forEach((problem) => {
            problem.category.forEach((category) => categorySet.add(category));
        });

        return ['All', ...Array.from(categorySet)];
    }, [problems]);

    const filteredProblems = problems.filter(problem => {
        const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            problem.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDifficulty = selectedDifficulty === 'All' || problem.difficulty === selectedDifficulty;
        const matchesCategory = selectedCategory === 'All' || problem.category.includes(selectedCategory);
        return matchesSearch && matchesDifficulty && matchesCategory;
    });

    const visibleProblems = filteredProblems.slice(0, visibleCount);
    const hasMoreProblems = visibleCount < filteredProblems.length;

    useEffect(() => {
        if (!hasMoreProblems) {
            return;
        }

        const target = loadMoreRef.current;
        if (!target) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredProblems.length));
                }
            },
            {
                rootMargin: '320px 0px'
            }
        );

        observer.observe(target);

        return () => observer.disconnect();
    }, [hasMoreProblems, filteredProblems.length]);

    const toggleSolution = (problemUniqueKey: string) => {
        setShowSolution(prev => ({
            ...prev,
            [problemUniqueKey]: !prev[problemUniqueKey]
        }));
    };

    return (
        <section id="problems" className="container" style={{ paddingTop: 'clamp(4rem, 10vw, 8rem)', paddingBottom: 'clamp(4rem, 10vw, 8rem)' }}>
            {/* Header */}
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
                    <Zap size={16} fill="currentColor" />
                    <span style={{ fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Curated Problem Sets</span>
                </motion.div>
                <h2 style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', marginBottom: '1.5rem', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
                    Practice <span className="gradient-text">Problems</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', maxWidth: '750px', margin: '0 auto', fontSize: '1.25rem', lineHeight: '1.7' }}>
                    Master DSA with curated problems. Each includes brute force and optimal solutions with detailed complexity analysis.
                </p>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.9rem', fontSize: '0.9rem' }}>
                    {isLoadingProblems
                        ? 'Loading problems from backend...'
                        : backendMode
                            ? 'Showing backend-managed problem set.'
                            : 'Showing local fallback problem set.'}
                </p>
            </motion.div>

            {/* Filters */}
            <div className="glass" style={{ padding: 'clamp(1rem, 3vw, 1.5rem) clamp(1rem, 4vw, 2rem)', marginBottom: '2rem' }}>
                {/* Mobile: Stack filters vertically */}
                <div style={{
                    display: 'flex',
                    gap: '1.5rem',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    flexDirection: isMobile ? 'column' : 'row'
                }}>
                    {/* Search */}
                    <div style={{
                        flex: 1,
                        minWidth: isMobile ? '100%' : '0',
                        position: 'relative'
                    }}>
                        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search problems..."
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem 0.75rem 2.75rem',
                                borderRadius: '8px',
                                border: '1px solid var(--border-color)',
                                background: 'rgba(0,0,0,0.2)',
                                color: 'var(--text-main)',
                                fontSize: '0.95rem',
                                minHeight: '44px',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    {/* Difficulty Filter */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: isSmallPhone ? '0.35rem' : '0.75rem',
                        flexWrap: 'wrap'
                    }}>
                        <Filter size={18} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                        <div style={{
                            display: 'flex',
                            gap: isSmallPhone ? '0.3rem' : '0.5rem',
                            flexWrap: 'wrap'
                        }}>
                            {problemDifficulties.map(diff => (
                                <button
                                    key={diff}
                                    onClick={() => handleDifficultyChange(diff)}
                                    style={{
                                        padding: isSmallPhone ? '0.4rem 0.7rem' : '0.5rem 1rem',
                                        borderRadius: '8px',
                                        border: 'none',
                                        background: selectedDifficulty === diff
                                            ? (diff === 'All' ? 'var(--primary-color)' : difficultyColors[diff] || 'var(--primary-color)')
                                            : 'transparent',
                                        color: selectedDifficulty === diff ? 'white' : 'var(--text-muted)',
                                        fontSize: isSmallPhone ? '0.75rem' : '0.85rem',
                                        minHeight: '36px',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    {diff}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Category Filter - 2 column grid on mobile */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isSmallPhone ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(100px, 1fr))',
                    gap: '0.5rem',
                    marginTop: '1rem'
                }}>
                    {availableCategories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryChange(cat)}
                            style={{
                                padding: isSmallPhone ? '0.35rem 0.6rem' : '0.35rem 0.85rem',
                                borderRadius: '6px',
                                border: selectedCategory === cat ? '1px solid var(--primary-color)' : '1px solid var(--border-color)',
                                background: selectedCategory === cat ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                                color: selectedCategory === cat ? 'var(--primary-color)' : 'var(--text-muted)',
                                cursor: 'pointer',
                                fontSize: isSmallPhone ? '0.7rem' : '0.8rem',
                                transition: 'all 0.3s ease',
                                minHeight: '36px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
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
                    <div className="glass" style={{ padding: 'clamp(1.5rem, 5vw, 3rem)', textAlign: 'center' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>No problems match your filters. Try adjusting your search.</p>
                    </div>
                ) : (
                    visibleProblems.map((problem) => {
                        const isLocked = problem.isPremium && !problem.canAccess;

                        return (
                        <ProblemCard
                            key={problem.uniqueKey}
                            problem={problem}
                            isExpanded={expandedProblem === problem.uniqueKey}
                            onToggleExpand={() => setExpandedProblem(expandedProblem === problem.uniqueKey ? null : problem.uniqueKey)}
                            solutionVisible={showSolution[problem.uniqueKey]}
                            onToggleSolution={() => toggleSolution(problem.uniqueKey)}
                            isCompleted={isProblemCompleted(problem.id)}
                            onToggleComplete={(e) => {
                                e.stopPropagation();
                                if (isLocked) {
                                    return;
                                }
                                toggleProblem(problem.id);
                            }}
                            isLocked={isLocked}
                            isAuthenticated={isAuthenticated}
                            onGoLogin={onGoLogin}
                            onGoUpgrade={onGoUpgrade}
                            isMobile={isMobile}
                            isSmallPhone={isSmallPhone}
                        />
                        );
                    })
                )}
            </div>

            {filteredProblems.length > 0 && (
                <div ref={loadMoreRef} style={{ marginTop: '1.25rem', textAlign: 'center', minHeight: '1px' }}>
                    {hasMoreProblems ? (
                        <p style={{ color: 'var(--text-muted)', fontSize: isSmallPhone ? '0.8rem' : '0.9rem' }}>
                            Loading more problems...
                        </p>
                    ) : (
                        <p style={{ color: 'var(--text-muted)', fontSize: isSmallPhone ? '0.8rem' : '0.9rem' }}>
                            Showing all {filteredProblems.length} matching problems.
                        </p>
                    )}
                </div>
            )}

            {/* Stats */}
            <div className="glass" style={{
                marginTop: '3rem',
                padding: isSmallPhone ? '1rem' : 'clamp(1rem, 4vw, 2rem)',
                display: 'grid',
                gridTemplateColumns: isSmallPhone ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: isSmallPhone ? '0.75rem' : '1rem'
            }}>
                <div style={{ textAlign: 'center', padding: isSmallPhone ? '0.5rem' : '1rem' }}>
                    <p style={{
                        fontSize: isSmallPhone ? '1.25rem' : '2rem',
                        fontWeight: '700',
                        color: '#22c55e',
                        margin: 0
                    }}>
                        {problems.filter(p => p.difficulty === 'Easy').length}
                    </p>
                    <p style={{
                        color: 'var(--text-muted)',
                        fontSize: isSmallPhone ? '0.8rem' : '0.9rem',
                        margin: '0.25rem 0 0'
                    }}>Easy</p>
                </div>
                <div style={{ textAlign: 'center', padding: isSmallPhone ? '0.5rem' : '1rem' }}>
                    <p style={{
                        fontSize: isSmallPhone ? '1.25rem' : '2rem',
                        fontWeight: '700',
                        color: '#eab308',
                        margin: 0
                    }}>
                        {problems.filter(p => p.difficulty === 'Medium').length}
                    </p>
                    <p style={{
                        color: 'var(--text-muted)',
                        fontSize: isSmallPhone ? '0.8rem' : '0.9rem',
                        margin: '0.25rem 0 0'
                    }}>Medium</p>
                </div>
                <div style={{ textAlign: 'center', padding: isSmallPhone ? '0.5rem' : '1rem' }}>
                    <p style={{
                        fontSize: isSmallPhone ? '1.25rem' : '2rem',
                        fontWeight: '700',
                        color: '#ef4444',
                        margin: 0
                    }}>
                        {problems.filter(p => p.difficulty === 'Hard').length}
                    </p>
                    <p style={{
                        color: 'var(--text-muted)',
                        fontSize: isSmallPhone ? '0.8rem' : '0.9rem',
                        margin: '0.25rem 0 0'
                    }}>Hard</p>
                </div>
            </div>
        </section>
    );
};

interface ProblemCardProps {
    problem: ProblemRecord;
    isExpanded: boolean;
    onToggleExpand: () => void;
    solutionVisible: boolean;
    onToggleSolution: () => void;
    isCompleted: boolean;
    onToggleComplete: (e: React.MouseEvent) => void;
    isLocked: boolean;
    isAuthenticated: boolean;
    onGoLogin?: () => void;
    onGoUpgrade?: () => void;
    isMobile: boolean;
    isSmallPhone: boolean;
}

const ProblemCard = ({
    problem,
    isExpanded,
    onToggleExpand,
    solutionVisible,
    onToggleSolution,
    isCompleted,
    onToggleComplete,
    isLocked,
    isAuthenticated,
    onGoLogin,
    onGoUpgrade,
    isMobile,
    isSmallPhone
}: ProblemCardProps) => {
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
                    padding: isSmallPhone ? '0.5rem 0.75rem' : 'clamp(0.75rem, 3vw, 1.5rem) clamp(1rem, 4vw, 2rem)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: isSmallPhone ? '0.4rem' : '0.75rem',
                    minHeight: isSmallPhone ? '44px' : 'auto'
                }}
            >
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: isSmallPhone ? '0.5rem' : '1.25rem',
                    flex: '0 1 auto',
                    minWidth: 0
                }}>
                    <button
                        onClick={onToggleComplete}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: isLocked ? 'var(--warning-color)' : isCompleted ? '#22c55e' : 'var(--text-muted)',
                            cursor: isLocked ? 'not-allowed' : 'pointer',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: isSmallPhone ? '32px' : '44px',
                            minHeight: isSmallPhone ? '32px' : '44px',
                            flexShrink: 0
                        }}
                        title={isCompleted ? "Mark as uncompleted" : "Mark as completed"}
                        disabled={isLocked}
                    >
                        {isCompleted ? <CheckCircle2 size={isSmallPhone ? 20 : 24} /> : <Circle size={isSmallPhone ? 20 : 24} />}
                    </button>
                    <span style={{
                        padding: isSmallPhone ? '0.2rem 0.5rem' : '0.35rem 0.85rem',
                        borderRadius: '6px',
                        background: difficultyColor,
                        color: 'white',
                        fontSize: isSmallPhone ? '0.7rem' : '0.8rem',
                        fontWeight: '700',
                        whiteSpace: 'nowrap',
                        flexShrink: 0
                    }}>
                        {problem.difficulty}
                    </span>
                    <h3 style={{
                        fontSize: isSmallPhone ? '0.95rem' : '1.25rem',
                        margin: 0,
                        color: isCompleted ? 'var(--text-muted)' : 'inherit',
                        textDecoration: isCompleted ? 'line-through' : 'none',
                        wordBreak: 'break-word',
                        overflow: 'visible'
                    }}>
                        {problem.title}
                    </h3>
                    {problem.isPremium ? (
                        <span style={{
                            padding: '0.2rem 0.5rem',
                            borderRadius: '999px',
                            background: isLocked ? 'var(--warning-bg)' : 'var(--accent-gradient)',
                            color: isLocked ? 'var(--warning-light)' : 'white',
                            fontSize: isSmallPhone ? '0.65rem' : '0.72rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                        }}>
                            <Crown size={12} />
                            {isLocked ? 'Premium Locked' : 'Premium'}
                        </span>
                    ) : null}
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: isSmallPhone ? '0.35rem' : '0.5rem',
                    flexWrap: 'wrap',
                    flexBasis: isMobile ? '100%' : 'auto',
                    marginLeft: isMobile ? 0 : 'auto'
                }}>
                    <div style={{
                        display: 'flex',
                        gap: isSmallPhone ? '0.25rem' : '0.5rem',
                        flexWrap: 'wrap'
                    }}>
                        {problem.category.map(cat => (
                            <span key={cat} style={{
                                padding: isSmallPhone ? '0.15rem 0.4rem' : '0.25rem 0.6rem',
                                borderRadius: '4px',
                                background: 'rgba(99, 102, 241, 0.15)',
                                color: 'var(--primary-color)',
                                fontSize: isSmallPhone ? '0.65rem' : '0.75rem',
                                whiteSpace: 'nowrap'
                            }}>
                                {cat}
                            </span>
                        ))}
                    </div>
                    {isExpanded ? <ChevronUp size={isSmallPhone ? 18 : 20} /> : <ChevronDown size={isSmallPhone ? 18 : 20} />}
                </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                        padding: isSmallPhone ? '0 0.75rem 0.75rem' : '0 clamp(1rem, 4vw, 2rem) clamp(1rem, 4vw, 2rem)'
                    }}
                >
                    {/* Description */}
                    <p style={{
                        color: 'var(--text-muted)',
                        lineHeight: '1.7',
                        marginBottom: '1.5rem',
                        fontSize: isSmallPhone ? '0.9rem' : 'inherit'
                    }}>
                        {problem.description}
                    </p>

                    {isLocked ? (
                        <div className="glass" style={{ padding: '1rem', border: '1px solid var(--warning-color)', marginBottom: '1.25rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.45rem' }}>
                                <Crown size={16} color="var(--warning-color)" />
                                <strong>Premium Problem</strong>
                            </div>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '0.9rem' }}>
                                Unlock this problem's examples and solution with a premium subscription.
                            </p>
                            <button
                                onClick={() => {
                                    if (isAuthenticated) {
                                        onGoUpgrade?.();
                                        return;
                                    }
                                    onGoLogin?.();
                                }}
                                style={{
                                    minHeight: '40px',
                                    borderRadius: '10px',
                                    border: 'none',
                                    background: 'var(--primary-gradient)',
                                    color: 'white',
                                    fontWeight: 700,
                                    padding: '0 1rem',
                                    cursor: 'pointer'
                                }}
                            >
                                {isAuthenticated ? 'Upgrade to Premium' : 'Login to Upgrade'}
                            </button>
                        </div>
                    ) : null}

                    {/* Examples */}
                    {!isLocked ? (
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h4 style={{ marginBottom: '0.75rem', fontSize: isSmallPhone ? '0.95rem' : '1rem' }}>Examples:</h4>
                        {problem.examples.map((ex, idx) => (
                            <div key={idx} style={{
                                padding: isSmallPhone ? '0.6rem' : '1rem',
                                background: 'rgba(0,0,0,0.2)',
                                borderRadius: '8px',
                                marginBottom: '0.75rem',
                                fontSize: isSmallPhone ? '0.8rem' : 'inherit'
                            }}>
                                <div style={{ marginBottom: '0.5rem', wordBreak: 'break-word' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Input: </span>
                                    <code style={{ color: 'var(--secondary-color)', fontSize: isSmallPhone ? '0.75rem' : 'inherit' }}>{ex.input}</code>
                                </div>
                                <div style={{ marginBottom: ex.explanation ? '0.5rem' : 0, wordBreak: 'break-word' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Output: </span>
                                    <code style={{ color: '#22c55e', fontSize: isSmallPhone ? '0.75rem' : 'inherit' }}>{ex.output}</code>
                                </div>
                                {ex.explanation && (
                                    <p style={{
                                        color: 'var(--text-muted)',
                                        fontSize: isSmallPhone ? '0.75rem' : '0.85rem',
                                        fontStyle: 'italic',
                                        margin: 0
                                    }}>
                                        {ex.explanation}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                    ) : null}

                    {/* Solution Button */}
                    {!isLocked ? (
                    <CodeExecutionPanel
                        problemId={problem.id}
                        initialCode={problem.solution.code}
                    />
                    ) : null}

                    {/* Solution Button */}
                    {!isLocked ? (
                    <div style={{ marginBottom: '1.5rem' }}>
                        <button
                            onClick={() => onToggleSolution()}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: isSmallPhone ? '0.6rem 1rem' : '0.75rem 1.5rem',
                                borderRadius: '8px',
                                background: solutionVisible ? '#22c55e' : 'rgba(34, 197, 94, 0.15)',
                                color: solutionVisible ? 'white' : '#22c55e',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: isSmallPhone ? '0.8rem' : '0.9rem',
                                width: isSmallPhone ? '100%' : 'auto',
                                justifyContent: 'center',
                                minHeight: '44px'
                            }}
                        >
                            {solutionVisible ? <EyeOff size={18} /> : <Zap size={18} />}
                            {solutionVisible ? 'Hide Solution' : 'Show Solution'}
                        </button>
                    </div>
                    ) : null}

                    {/* Solution Content */}
                    {!isLocked && solutionVisible && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                borderLeft: `4px solid #22c55e`,
                                paddingLeft: isSmallPhone ? '0.75rem' : '1.5rem'
                            }}
                        >
                            <h4 style={{
                                color: '#22c55e',
                                marginBottom: '1rem',
                                fontSize: isSmallPhone ? '0.95rem' : 'inherit'
                            }}>
                                ⚡ Solution Approach
                            </h4>

                            <p style={{
                                color: 'var(--text-muted)',
                                lineHeight: '1.7',
                                marginBottom: '1rem',
                                fontSize: isSmallPhone ? '0.9rem' : 'inherit'
                            }}>
                                {problem.solution.approach}
                            </p>

                            {/* Code */}
                            <pre style={{
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                padding: isSmallPhone ? '0.75rem' : '1.5rem',
                                borderRadius: '12px',
                                overflowX: 'auto',
                                marginBottom: '1.5rem',
                                fontSize: isSmallPhone ? '0.7rem' : '0.85rem',
                                lineHeight: '1.6',
                                maxWidth: '100%'
                            }}>
                                <code style={{ color: '#e5e7eb' }}>
                                    {problem.solution.code}
                                </code>
                            </pre>

                            {/* Complexity Analysis */}
                            <div className="glass" style={{
                                padding: isSmallPhone ? '0.75rem' : '1.5rem',
                                marginBottom: '1rem'
                            }}>
                                <h5 style={{
                                    marginBottom: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontSize: isSmallPhone ? '0.9rem' : 'inherit'
                                }}>
                                    📊 Complexity Analysis
                                </h5>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: isSmallPhone ? '1fr' : '1fr 1fr',
                                    gap: isSmallPhone ? '0.75rem' : '1rem'
                                }}>
                                    <div>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            marginBottom: '0.5rem',
                                            flexWrap: 'wrap'
                                        }}>
                                            <Clock size={16} color="#22c55e" />
                                            <span style={{ fontWeight: '600', fontSize: isSmallPhone ? '0.9rem' : 'inherit' }}>Time:</span>
                                            <code style={{
                                                color: '#22c55e',
                                                fontWeight: '700',
                                                fontSize: isSmallPhone ? '0.75rem' : 'inherit',
                                                wordBreak: 'break-all'
                                            }}>
                                                {problem.solution.timeComplexity}
                                            </code>
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            marginBottom: '0.5rem',
                                            flexWrap: 'wrap'
                                        }}>
                                            <HardDrive size={16} color="#8b5cf6" />
                                            <span style={{ fontWeight: '600', fontSize: isSmallPhone ? '0.9rem' : 'inherit' }}>Space:</span>
                                            <code style={{
                                                color: '#8b5cf6',
                                                fontWeight: '700',
                                                fontSize: isSmallPhone ? '0.75rem' : 'inherit',
                                                wordBreak: 'break-all'
                                            }}>
                                                {problem.solution.spaceComplexity}
                                            </code>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Step by Step */}
                            <div style={{ marginTop: '1rem' }}>
                                <h5 style={{
                                    marginBottom: '0.75rem',
                                    fontSize: isSmallPhone ? '0.95rem' : 'inherit'
                                }}>Step-by-Step:</h5>
                                <ol style={{
                                    paddingLeft: '1.25rem',
                                    color: 'var(--text-muted)',
                                    fontSize: isSmallPhone ? '0.85rem' : '0.9rem',
                                    lineHeight: isSmallPhone ? '1.6' : '1.8'
                                }}>
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
