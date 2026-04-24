import { useState, useEffect, useMemo, useRef } from 'react';
import { useProgress } from '../../hooks/useProgress';
import { useAuth } from '../../hooks/useAuth';
import { problemService } from '../../services/problemService';
import type { ApiProblemRecord } from './ProblemCard';
import ProblemsHeader from './ProblemsHeader';
import ProblemsFilters from './ProblemsFilters';
import ProblemCard from './ProblemCard';
import ProblemsStats from './ProblemsStats';
import styles from './ProblemsPage.module.css';

const PAGE_SIZE = 12;
const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard'];

interface ProblemsPageProps {
  onGoLogin?: () => void;
  onGoUpgrade?: () => void;
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
  const [problems, setProblems] = useState<ApiProblemRecord[]>([]);
  const [isLoadingProblems, setIsLoadingProblems] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const { isProblemCompleted, toggleProblem } = useProgress();

  // Load problems from API
  useEffect(() => {
    let isCancelled = false;

    const loadProblems = async () => {
      setIsLoadingProblems(true);
      try {
        const apiProblems = await problemService.list(undefined, token ?? undefined);
        if (!isCancelled) {
          const mapped: ApiProblemRecord[] = apiProblems.map((p, idx) => ({
            id: p.id,
            topicId: p.topicId,
            topicTitle: p.topicTitle,
            topicSlug: p.topicSlug,
            title: p.title,
            difficulty: p.difficulty,
            isPremium: p.isPremium,
            canAccess: p.canAccess ?? !p.isPremium,
            description: p.description,
            uniqueKey: `api:${p.id}:${idx}`
          }));
          setProblems(mapped);
        }
      } catch {
        // API unavailable — leave list empty so UI shows empty state
      } finally {
        if (!isCancelled) setIsLoadingProblems(false);
      }
    };

    void loadProblems();
    return () => { isCancelled = true; };
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

  // Build available topic categories from loaded problems
  const availableCategories = useMemo(() => {
    const seen = new Set<string>();
    problems.forEach((p) => seen.add(p.topicTitle));
    return ['All', ...Array.from(seen)];
  }, [problems]);

  // Filter problems
  const filteredProblems = useMemo(() => problems.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'All' || problem.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === 'All' || problem.topicTitle === selectedCategory;
    return matchesSearch && matchesDifficulty && matchesCategory;
  }), [problems, searchQuery, selectedDifficulty, selectedCategory]);

  const visibleProblems = filteredProblems.slice(0, visibleCount);
  const hasMoreProblems = visibleCount < filteredProblems.length;

  // Infinite scroll
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

  const resetListUiState = () => {
    setVisibleCount(PAGE_SIZE);
    setExpandedProblem(null);
    setShowSolution({});
  };

  const handleSearchChange = (value: string) => { setSearchQuery(value); resetListUiState(); };
  const handleDifficultyChange = (d: string) => { setSelectedDifficulty(d); resetListUiState(); };
  const handleCategoryChange = (c: string) => { setSelectedCategory(c); resetListUiState(); };

  const toggleSolution = (uniqueKey: string) =>
    setShowSolution((prev) => ({ ...prev, [uniqueKey]: !prev[uniqueKey] }));

  return (
    <section id="problems" className={`container ${styles.section}`}>
      <ProblemsHeader isLoadingProblems={isLoadingProblems} backendMode={true} />

      <ProblemsFilters
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={handleDifficultyChange}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        availableCategories={availableCategories}
        difficulties={DIFFICULTIES}
        isMobile={isMobile}
        isSmallPhone={isSmallPhone}
      />

      <div className={styles.problemsList}>
        {filteredProblems.length === 0 && !isLoadingProblems ? (
          <div className={`glass ${styles.emptyState}`}>
            <p>No problems match your filters. Try adjusting your search.</p>
          </div>
        ) : (
          visibleProblems.map((problem) => (
            <ProblemCard
              key={problem.uniqueKey}
              problem={problem}
              isExpanded={expandedProblem === problem.uniqueKey}
              onToggleExpand={() =>
                setExpandedProblem(expandedProblem === problem.uniqueKey ? null : problem.uniqueKey)
              }
              solutionVisible={showSolution[problem.uniqueKey] ?? false}
              onToggleSolution={() => toggleSolution(problem.uniqueKey)}
              isCompleted={isProblemCompleted(problem.id)}
              onToggleComplete={(e) => {
                e.stopPropagation();
                if (problem.isPremium && !problem.canAccess) return;
                toggleProblem(problem.id);
              }}
              isAuthenticated={isAuthenticated}
              token={token ?? undefined}
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
