import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, ChevronDown, ChevronUp, EyeOff, Zap, Clock, HardDrive, Crown } from 'lucide-react';
import CodeExecutionPanel from '../CodeExecutionPanel';
import type { ProblemListItem } from '../../data/problems/registry';
import styles from './ProblemsPage.module.css';

const difficultyColors: Record<string, string> = {
  'Easy': '#22c55e',
  'Medium': '#f97316',
  'Hard': '#eab308',
  'Expert': '#ef4444'
};

interface ProblemRecord extends ProblemListItem {
  isPremium: boolean;
  canAccess: boolean;
  uniqueKey: string;
}

interface ProblemCardProps {
  problem: ProblemRecord;
  isExpanded: boolean;
  onToggleExpand: () => void;
  solutionVisible: boolean;
  onToggleSolution: () => void;
  isCompleted: boolean;
  onToggleComplete: (e: React.MouseEvent) => void;
  isAuthenticated: boolean;
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
  onGoLogin,
  onGoUpgrade,
}: ProblemCardProps) => {
  const isLocked = problem.isPremium && !problem.canAccess;
  const difficultyColor = difficultyColors[problem.difficulty];

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
            {problem.category.map(cat => (
              <span key={cat} className={styles.categoryTag}>{cat}</span>
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

          {!isLocked && (
            <>
              {/* Examples */}
              <div className={styles.examplesSection}>
                <h4 className={styles.exampleTitle}>Examples:</h4>
                {problem.examples.map((ex, idx) => (
                  <div key={idx} className={styles.exampleItem}>
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

              {/* Code Execution Panel */}
              <CodeExecutionPanel
                problemId={problem.id}
                initialCode={problem.solution.code}
              />

              {/* Solution Button */}
              <div className={styles.solutionButtonContainer}>
                <button
                  onClick={onToggleSolution}
                  className={`${styles.solutionButton} ${solutionVisible ? styles.visible : ''}`}
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
                  className={styles.solutionContent}
                >
                  <h4 className={styles.solutionHeader}>⚡ Solution Approach</h4>
                  <p className={styles.solutionApproach}>{problem.solution.approach}</p>

                  <pre className={styles.solutionCode}>
                    <code>{problem.solution.code}</code>
                  </pre>

                  <div className={`glass ${styles.complexityAnalysis}`}>
                    <h5 className={styles.complexityTitle}>📊 Complexity Analysis</h5>
                    <div className={styles.complexityGrid}>
                      <div>
                        <div className={styles.complexityItem}>
                          <Clock size={16} color="#22c55e" />
                          <span className={styles.complexityLabel}>Time:</span>
                          <code className={`${styles.complexityValue} ${styles.complexityTime}`}>
                            {problem.solution.timeComplexity}
                          </code>
                        </div>
                      </div>
                      <div>
                        <div className={styles.complexityItem}>
                          <HardDrive size={16} color="#8b5cf6" />
                          <span className={styles.complexityLabel}>Space:</span>
                          <code className={`${styles.complexityValue} ${styles.complexitySpace}`}>
                            {problem.solution.spaceComplexity}
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.stepByStepSection}>
                    <h5 className={styles.stepByStepTitle}>Step-by-Step:</h5>
                    <ol className={styles.stepByStepList}>
                      {problem.solution.stepByStep.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProblemCard;
