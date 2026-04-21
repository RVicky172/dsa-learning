import { useState, useEffect, useMemo, useRef } from 'react';
import {
    allProblems,
    problemDifficulties,
    type ProblemListItem
} from '../../data/problems/registry';
import { useProgress } from '../../hooks/useProgress';
import { useAuth } from '../../hooks/useAuth';
import { problemService } from '../../services/problemService';
import type { ProblemListItemApi } from '../../types/api';
import ProblemsHeader from './ProblemsHeader';
import ProblemsFilters from './ProblemsFilters';
import ProblemCard from './ProblemCard';
import ProblemsStats from './ProblemsStats';
import styles from './ProblemsPage.module.css';

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

  // Load problems from API or fallback to static
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

  // Handle responsive resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSmallPhone(window.innerWidth <= 480);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get available categories
  const availableCategories = useMemo(() => {
    const categorySet = new Set<string>();
    problems.forEach((problem) => {
      problem.category.forEach((category) => categorySet.add(category));
    });
    return ['All', ...Array.from(categorySet)];
  }, [problems]);

  // Filter problems
  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'All' || problem.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === 'All' || problem.category.includes(selectedCategory);
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const visibleProblems = filteredProblems.slice(0, visibleCount);
  const hasMoreProblems = visibleCount < filteredProblems.length;

  // Infinite scroll observer
  useEffect(() => {
    if (!hasMoreProblems) return;

    const target = loadMoreRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredProblems.length));
        }
      },
      { rootMargin: '320px 0px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMoreProblems, filteredProblems.length]);

  // Reset UI state on filter change
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

  const toggleSolution = (problemUniqueKey: string) => {
    setShowSolution(prev => ({
      ...prev,
      [problemUniqueKey]: !prev[problemUniqueKey]
    }));
  };

  return (
    <section id="problems" className={`container ${styles.section}`}>
      <ProblemsHeader isLoadingProblems={isLoadingProblems} backendMode={backendMode} />

      <ProblemsFilters
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={handleDifficultyChange}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        availableCategories={availableCategories}
        difficulties={problemDifficulties}
        isMobile={isMobile}
        isSmallPhone={isSmallPhone}
      />

      {/* Problems List */}
      <div className={styles.problemsList}>
        {filteredProblems.length === 0 ? (
          <div className={`glass ${styles.emptyState}`}>
            <p>No problems match your filters. Try adjusting your search.</p>
          </div>
        ) : (
          visibleProblems.map((problem) => (
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
                if (problem.isPremium && !problem.canAccess) return;
                toggleProblem(problem.id);
              }}
              isAuthenticated={isAuthenticated}
              onGoLogin={onGoLogin}
              onGoUpgrade={onGoUpgrade}
            />
          ))
        )}
      </div>

      {filteredProblems.length > 0 && (
        <div ref={loadMoreRef} className={styles.loadMoreContainer}>
          {hasMoreProblems ? (
            <p>Loading more problems...</p>
          ) : (
            <p>Showing all {filteredProblems.length} matching problems.</p>
          )}
        </div>
      )}

      <ProblemsStats problems={problems} isMobile={isMobile} isSmallPhone={isSmallPhone} />
    </section>
  );
};

export default ProblemsPage;
