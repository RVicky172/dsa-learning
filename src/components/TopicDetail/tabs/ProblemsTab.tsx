import type { CSSProperties } from 'react';
import { CheckCircle2, Circle, Eye, EyeOff } from 'lucide-react';
import type { Topic } from '../../../types/topic';
import CodeExecutionPanel from '../../CodeExecutionPanel';
import styles from '../TopicDetail.module.css';

interface ProblemsTabProps {
    topic: Topic;
    showSolution: Record<string, boolean>;
    toggleSolution: (problemId: string) => void;
    isProblemCompleted: (problemId: string) => boolean;
    toggleProblem: (problemId: string) => void;
}

const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
        case 'Easy': return '#22c55e';
        case 'Medium': return '#eab308';
        case 'Hard': return '#ef4444';
        default: return '#6366f1';
    }
};

const difficultyBadgeStyle = (difficulty: string): CSSProperties => ({
    '--difficulty-color': getDifficultyColor(difficulty),
} as CSSProperties);

const ProblemsTab = ({ topic, showSolution, toggleSolution, isProblemCompleted, toggleProblem }: ProblemsTabProps) => {
    if (!topic.problems || topic.problems.length === 0) {
        return (
            <div className={styles.problemsContainer}>
                <div className={styles.emptyProblemsState}>
                    <p>No practice problems available for this topic yet.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.problemsContainer}>
            <div className={styles.problemCountBadge}>
                <strong className={styles.problemCountText}>
                    {topic.problems.length} Practice {topic.problems.length === 1 ? 'Problem' : 'Problems'}
                </strong>
            </div>
            {topic.problems.map((problem, index) => (
                <div key={problem.id} className={`glass ${styles.problemCard}`}>
                    <div className={styles.problemNumber}>
                        Problem {index + 1} of {topic.problems.length}
                    </div>

                    {/* Problem Header */}
                    <div className={styles.problemHeader}>
                        <div className={styles.problemTitleSection}>
                            <div className={styles.problemTitleContent}>
                                <button
                                    onClick={() => toggleProblem(problem.id)}
                                    className={`${styles.completionToggle} ${isProblemCompleted(problem.id) ? styles.completed : ''}`}
                                    title={isProblemCompleted(problem.id) ? 'Mark as uncompleted' : 'Mark as completed'}
                                >
                                    {isProblemCompleted(problem.id) ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                                </button>
                                <h3 className={`${styles.problemTitle} ${isProblemCompleted(problem.id) ? styles.completed : ''}`}>
                                    {problem.title}
                                </h3>
                            </div>
                            <span className={styles.difficultyBadge} style={difficultyBadgeStyle(problem.difficulty)}>
                                {problem.difficulty}
                            </span>
                        </div>
                        <p className={styles.problemDescription}>
                            {problem.description}
                        </p>
                    </div>

                    {/* Examples */}
                    {problem.examples && problem.examples.length > 0 && (
                        <div className={styles.examplesSection}>
                            <h4 className={styles.examplesSectionTitle}>Examples:</h4>
                            {problem.examples.map((ex, idx) => (
                                <div key={idx} className={styles.exampleBlock}>
                                    <div className={styles.exampleInput}>
                                        <span className={styles.exampleInputLabel}>Input: </span>
                                        <code className={styles.exampleInputCode}>{ex.input}</code>
                                    </div>
                                    <div className={styles.exampleOutput}>
                                        <span className={styles.exampleOutputLabel}>Output: </span>
                                        <code className={styles.exampleOutputCode}>{ex.output}</code>
                                    </div>
                                    {ex.explanation && (
                                        <p className={styles.exampleExplanationText}>
                                            {ex.explanation}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Hints */}
                    {problem.hints && problem.hints.length > 0 && (
                        <details className={styles.hintsDetails}>
                            <summary className={styles.hintsSummary}>
                                💡 Hints
                            </summary>
                            <ul className={styles.hintsList}>
                                {problem.hints.map((hint, idx) => (
                                    <li key={idx} className={styles.hint}>{hint}</li>
                                ))}
                            </ul>
                        </details>
                    )}

                    {/* Run Code */}
                    <CodeExecutionPanel
                        problemId={problem.id}
                        initialCode={problem.solution?.code || ''}
                    />

                    {/* Solution Toggle — only show when solution data exists */}
                    {(problem.solution?.approach || problem.solution?.code) && (
                        <>
                            <button
                                onClick={() => toggleSolution(problem.id)}
                                className={`${styles.solutionToggle} ${showSolution[problem.id] ? styles.hidden : ''}`}
                            >
                                {showSolution[problem.id] ? <EyeOff size={18} /> : <Eye size={18} />}
                                {showSolution[problem.id] ? 'Hide Solution' : 'Show Solution'}
                            </button>

                            {showSolution[problem.id] && (
                                <div className={styles.solutionContent}>
                                    {problem.solution.approach && (
                                        <>
                                            <h4 className={styles.solutionApproachTitle}>Approach:</h4>
                                            <p className={styles.solutionApproach}>{problem.solution.approach}</p>
                                        </>
                                    )}

                                    {problem.solution.code && (
                                        <>
                                            <h4 className={styles.solutionCodeTitle}>Solution Code:</h4>
                                            <pre className={styles.codeBlock}>
                                                <code className={styles.codeContent}>{problem.solution.code}</code>
                                            </pre>
                                        </>
                                    )}

                                    {(problem.solution.timeComplexity || problem.solution.spaceComplexity) && (
                                        <div className={styles.complexityInfo}>
                                            {problem.solution.timeComplexity && (
                                                <div>
                                                    <span className={styles.complexityLabel}>Time: </span>
                                                    <code className={styles.complexityValue}>{problem.solution.timeComplexity}</code>
                                                </div>
                                            )}
                                            {problem.solution.spaceComplexity && (
                                                <div>
                                                    <span className={styles.complexityLabel}>Space: </span>
                                                    <code className={styles.complexityValue}>{problem.solution.spaceComplexity}</code>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {problem.solution.stepByStep && problem.solution.stepByStep.length > 0 && (
                                        <>
                                            <h4 className={styles.stepByStepTitle}>Step by Step:</h4>
                                            <ol className={styles.stepByStepList}>
                                                {problem.solution.stepByStep.map((step, idx) => (
                                                    <li key={idx} className={styles.step}>{step}</li>
                                                ))}
                                            </ol>
                                        </>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ProblemsTab;
