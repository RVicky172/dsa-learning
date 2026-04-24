import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, ChevronDown, ChevronUp, EyeOff, Zap, Clock, HardDrive, Crown, Loader2 } from 'lucide-react';
import CodeExecutionPanel from '../CodeExecutionPanel';
import { problemService } from '../../services/problemService';
import type { ProblemDetailApi } from '../../types/api';
import styles from './ProblemsPage.module.css';

const difficultyColors: Record<string, string> = {
  'Easy': '#22c55e',
  'Medium': '#f97316',
  'Hard': '#eab308',
  'Expert': '#ef4444'
};

export interface ApiProblemRecord {
  id: string;
  topicId: string;
  topicTitle: string;
  topicSlug: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isPremium: boolean;
  canAccess: boolean;
  description: string;
  uniqueKey: string;
}

interface ProblemCardProps {
  problem: ApiProblemRecord;
  isExpanded: boolean;
  onToggleExpand: () => void;
  solutionVisible: boolean;
  onToggleSolution: () => void;
  isCompleted: boolean;
  onToggleComplete: (e: React.MouseEvent) => void;
  isAuthenticated: boolean;
  token?: string;
  onGoLogin?: () => void;
  onGoUpgrade?: () => void;
}

const ProblemCard = ({
  problem,
  isExpanded,
  onToggleExpand,
  solutionVisible,
  onToggleSolution,
  isCompleted,
  onToggleComplete,
  isAuthenticated,
  token,
  onGoLogin,
  onGoUpgrade,
}: ProblemCardProps) => {
  const isLocked = problem.isPremium && !problem.canAccess;
  const difficultyColor = difficultyColors[problem.difficulty];

  const [detail, setDetail] = useState<ProblemDetailApi | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  // Lazy-load full problem details when expanded and not locked
  useEffect(() => {
    if (!isExpanded || isLocked || detail) return;

    setLoadingDetail(true);
    problemService
      .getById(problem.id, token)
      .then((data) => setDetail(data))
      .catch(() => { /* silently fall back to empty state */ })
      .finally(() => setLoadingDetail(false));
  }, [isExpanded, isLocked, problem.id, token, detail]);

  const optimalSolution = detail?.solutions?.find((s) => s.isOptimal) ?? detail?.solutions?.[0];
  const hints = detail?.hints ?? [];
  const examples = detail?.examples ?? [];

  return (
    <motion.div
      layout
      className={`glass ${styles.problemCard}`}
    >
      {/* Header */}
      <div className={styles.cardHeader} onClick={onToggleExpand}>
        <div className={styles.cardHeaderLeft}>
          <button
            onClick={onToggleComplete}
            className={`${styles.completeButton} ${isCompleted ? styles.completed : ''} ${isLocked ? styles.locked : ''}`}
            title={isCompleted ? "Mark as uncompleted" : "Mark as completed"}
            disabled={isLocked}
          >
            {isCompleted ? <CheckCircle2 size={24} /> : <Circle size={24} />}
          </button>

          <span className={styles.difficultyBadge} style={{ backgroundColor: difficultyColor }}>
            {problem.difficulty}
          </span>

          <h3 className={`${styles.cardTitle} ${isCompleted ? styles.completed : ''}`}>
            {problem.title}
          </h3>

          {problem.isPremium && (
            <span className={`${styles.premiumBadge} ${isLocked ? styles.locked : ''}`}>
              <Crown size={12} />
              {isLocked ? 'Premium Locked' : 'Premium'}
            </span>
          )}
        </div>

        <div className={styles.cardHeaderRight}>
          <div className={styles.categoryTags}>
            <span className={styles.categoryTag}>{problem.topicTitle}</span>
          </div>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={styles.cardContent}
        >
          <p className={styles.cardDescription}>{problem.description}</p>

          {isLocked && (
            <div className={`glass ${styles.premiumLock}`}>
              <div className={styles.premiumLockHeader}>
                <Crown size={16} color="var(--warning-color)" />
                Premium Problem
              </div>
              <p className={styles.premiumLockText}>
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
                className={styles.premiumButton}
              >
                {isAuthenticated ? 'Upgrade to Premium' : 'Login to Upgrade'}
              </button>
            </div>
          )}

          {!isLocked && loadingDetail && (
            <div className={styles.detailLoading}>
              <Loader2 size={20} className={styles.spinner} />
              <span>Loading details...</span>
            </div>
          )}

          {!isLocked && !loadingDetail && (
            <>
              {/* Examples */}
              {examples.length > 0 && (
                <div className={styles.examplesSection}>
                  <h4 className={styles.exampleTitle}>Examples:</h4>
                  {examples.map((ex, idx) => (
                    <div key={ex.id ?? idx} className={styles.exampleItem}>
                      <div className={styles.exampleLine}>
                        <span className={styles.exampleLabel}>Input: </span>
                        <code className={`${styles.exampleCode} ${styles.exampleCodeInput}`}>{ex.input}</code>
                      </div>
                      <div className={styles.exampleLine}>
                        <span className={styles.exampleLabel}>Output: </span>
                        <code className={`${styles.exampleCode} ${styles.exampleCodeOutput}`}>{ex.output}</code>
                      </div>
                      {ex.explanation && (
                        <p className={styles.exampleExplanation}>{ex.explanation}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Code Execution Panel */}
              <CodeExecutionPanel
                problemId={problem.id}
                initialCode={optimalSolution?.code ?? ''}
              />

              {/* Hints */}
              {hints.length > 0 && (
                <div className={styles.hintsSection}>
                  <h4 className={styles.exampleTitle}>Hints:</h4>
                  <ol className={styles.stepByStepList}>
                    {hints.map((h, idx) => (
                      <li key={h.id ?? idx}>{h.text}</li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Solution Button */}
              {optimalSolution && (
                <>
                  <div className={styles.solutionButtonContainer}>
                    <button
                      onClick={onToggleSolution}
                      className={`${styles.solutionButton} ${solutionVisible ? styles.visible : ''}`}
                    >
                      {solutionVisible ? <EyeOff size={18} /> : <Zap size={18} />}
                      {solutionVisible ? 'Hide Solution' : 'Show Solution'}
                    </button>
                  </div>

                  {solutionVisible && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={styles.solutionContent}
                    >
                      <h4 className={styles.solutionHeader}>⚡ Solution Approach</h4>
                      <p className={styles.solutionApproach}>{optimalSolution.approach}</p>

                      <pre className={styles.solutionCode}>
                        <code>{optimalSolution.code}</code>
                      </pre>

                      <div className={`glass ${styles.complexityAnalysis}`}>
                        <h5 className={styles.complexityTitle}>📊 Complexity Analysis</h5>
                        <div className={styles.complexityGrid}>
                          <div>
                            <div className={styles.complexityItem}>
                              <Clock size={16} color="#22c55e" />
                              <span className={styles.complexityLabel}>Time:</span>
                              <code className={`${styles.complexityValue} ${styles.complexityTime}`}>
                                {optimalSolution.timeComplexity}
                              </code>
                            </div>
                          </div>
                          <div>
                            <div className={styles.complexityItem}>
                              <HardDrive size={16} color="#8b5cf6" />
                              <span className={styles.complexityLabel}>Space:</span>
                              <code className={`${styles.complexityValue} ${styles.complexitySpace}`}>
                                {optimalSolution.spaceComplexity}
                              </code>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProblemCard;
