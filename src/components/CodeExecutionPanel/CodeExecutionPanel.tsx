import { useEffect, useMemo, useState, memo, useRef } from 'react';
import { Code2, Play, Terminal, AlertCircle, Loader2, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useCodeExecution } from '../../hooks/useCodeExecution';
import type { ExecutionStatus } from '../../types/api';
import SyntaxHighlightedCodeEditor from './SyntaxHighlightedCodeEditor';
import styles from './CodeExecutionPanel.module.css';

interface CodeExecutionPanelProps {
  problemId?: string;
  initialCode?: string;
}

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function getStatusColor(status: ExecutionStatus): string {
  switch (status) {
    case 'completed':
      return '#22c55e';
    case 'runtime_error':
    case 'failed':
      return '#ef4444';
    case 'timeout':
      return '#f59e0b';
    case 'running':
      return 'var(--secondary-color)';
    case 'queued':
    default:
      return 'var(--text-muted)';
  }
}

const CodeExecutionPanel = ({ problemId, initialCode = '' }: CodeExecutionPanelProps) => {
  const { isAuthenticated } = useAuth();
  const { isRunning, errorMessage, lastRunResult, history, runCode, refreshHistory } =
    useCodeExecution();

  const inferLanguage = (code: string): 'javascript' | 'python' | 'typescript' => {
    const trimmed = code.trim();

    if (
      /\bdef\s+\w+\s*\(/.test(trimmed) ||
      /\bprint\s*\(/.test(trimmed) ||
      /\bimport\s+\w+/.test(trimmed)
    ) {
      return 'python';
    }

    if (
      /:\s*[A-Za-z_][A-Za-z0-9_<>,[\\]| ]*/.test(trimmed) ||
      /\binterface\s+\w+/.test(trimmed) ||
      /\btype\s+\w+\s*=/.test(trimmed)
    ) {
      return 'typescript';
    }

    return 'javascript';
  };

  const prevInitialCodeRef = useRef<string | undefined>(initialCode);
  
  const [language, setLanguage] = useState<'javascript' | 'python' | 'typescript'>(
    inferLanguage(initialCode || '')
  );
  const [sourceCode, setSourceCode] = useState(initialCode || '');
  const [stdin, setStdin] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(null);

  const safeProblemId = useMemo(() => {
    if (!problemId) {
      return undefined;
    }

    return UUID_REGEX.test(problemId) ? problemId : undefined;
  }, [problemId]);

  useEffect(() => {
    if (prevInitialCodeRef.current !== initialCode) {
      const code = initialCode || '';
      // Sync code and language when initialCode prop changes
      // This pattern is intentional: sourceCode is editable by users, so it needs to be state,
      // but we must sync when the prop changes (e.g., selecting different problem code examples)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSourceCode(code);
      setLanguage(inferLanguage(code));
      prevInitialCodeRef.current = initialCode;
    }
  }, [initialCode]);

  const submitRun = async () => {
    if (!sourceCode.trim()) {
      return;
    }

    try {
      await runCode({
        problemId: safeProblemId,
        language,
        sourceCode,
        stdin,
        waitForCompletion: true
      });

      await refreshHistory({
        problemId: safeProblemId,
        page: 1,
        pageSize: 3
      });
    } catch {
      // Hook state already stores error for display.
    }
  };

  const latestHistory = history[0];
  const selectedHistory = selectedHistoryId
    ? history.find((h) => h.id === selectedHistoryId)
    : null;
  const outputToRender = lastRunResult ?? selectedHistory ?? latestHistory;

  return (
    <section className={`glass ${styles.container}`}>
      <div className={styles.header}>
        <h4 className={styles.title}>
          <Code2 size={18} color="var(--primary-color)" />
          Run Code
        </h4>

        <div className={styles.controls}>
          <div className={styles.languagePills} role="group" aria-label="Language">
            {(['javascript', 'typescript', 'python'] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                className={`${styles.langPill} ${language === lang ? styles.langPillActive : ''}`}
              >
                {lang === 'javascript' ? 'JS' : lang === 'typescript' ? 'TS' : 'PY'}
              </button>
            ))}
          </div>

          {isAuthenticated && (
            <button
              onClick={submitRun}
              disabled={isRunning || !sourceCode.trim()}
              className={styles.runButton}
            >
              {isRunning ? <Loader2 size={16} style={{ animation: 'spin 0.8s linear infinite' }} /> : <Play size={16} />}
              {isRunning ? 'Running…' : 'Run'}
            </button>
          )}
        </div>
      </div>

      {!isAuthenticated ? (
        <div className={styles.authWarning}>
          <AlertCircle size={15} />
          Log in to run and test your code.
        </div>
      ) : (
        <>
          <SyntaxHighlightedCodeEditor
            value={sourceCode}
            onChange={setSourceCode}
            language={language}
            placeholder="Write your code here"
          />

          <details className={styles.stdinDetails}>
            <summary className={styles.stdinSummary}>stdin (optional)</summary>
            <textarea
              value={stdin}
              onChange={(event) => setStdin(event.target.value)}
              placeholder="Optional stdin input"
              spellCheck={false}
              className={styles.stdinTextarea}
            />
          </details>

          {errorMessage && (
            <div className={styles.errorMessage}>
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className={styles.outputContainer}>
            <div className={styles.outputHeader}>
              <span className={styles.outputLabel}>
                <Terminal size={15} /> Output
              </span>

              {outputToRender && (
                <span className={styles.outputStatus} style={{ color: getStatusColor(outputToRender.status) }}>
                  {outputToRender.status}
                  {outputToRender.runtimeMs ? ` · ${outputToRender.runtimeMs} ms` : ''}
                </span>
              )}
            </div>

            <pre className={styles.outputContent}>
              {(outputToRender?.stdout || outputToRender?.stderr || 'Run code to see output here.').trim()}
            </pre>
          </div>

          {/* Execution History Panel */}
          {history.length > 0 && (
            <AnimatePresence>
              <div className={styles.historyPanel}>
                <div
                  className={styles.historyHeader}
                  onClick={() => setShowHistory(!showHistory)}
                >
                  <h5 className={styles.historyTitle}>
                    {showHistory ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    Recent runs ({history.length})
                  </h5>
                </div>

                {showHistory && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={styles.historyList}>
                      {history.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={styles.historyItem}
                          onClick={() => setSelectedHistoryId(item.id)}
                          style={{
                            borderColor:
                              selectedHistoryId === item.id
                                ? 'rgba(99, 102, 241, 0.6)'
                                : 'rgba(99, 102, 241, 0.25)',
                            background:
                              selectedHistoryId === item.id
                                ? 'rgba(99, 102, 241, 0.15)'
                                : 'rgba(99, 102, 241, 0.05)',
                          }}
                        >
                          <div className={styles.historyItemContent}>
                            <span className={styles.historyItemId}>
                              {item.id.slice(0, 8)}
                            </span>
                            <span
                              className={styles.historyItemStatus}
                              style={{ color: getStatusColor(item.status) }}
                            >
                              {item.status}
                            </span>
                            {item.runtimeMs && (
                              <span className={styles.historyItemTime}>
                                {item.runtimeMs}ms
                              </span>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </AnimatePresence>
          )}
        </>
      )}
    </section>
  );
};

export default memo(CodeExecutionPanel);
