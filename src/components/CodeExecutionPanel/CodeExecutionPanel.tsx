import { useEffect, useMemo, useState } from 'react';
import { Code2, Play, Terminal, AlertCircle, Loader2, History } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCodeExecution } from '../../hooks/useCodeExecution';
import type { ExecutionStatus } from '../../types/api';
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
  const { isRunning, isLoadingHistory, errorMessage, lastRunResult, history, runCode, refreshHistory } =
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
      /:\s*[A-Za-z_][A-Za-z0-9_<>,\[\]\| ]*/.test(trimmed) ||
      /\binterface\s+\w+/.test(trimmed) ||
      /\btype\s+\w+\s*=/.test(trimmed)
    ) {
      return 'typescript';
    }

    return 'javascript';
  };

  const [language, setLanguage] = useState<'javascript' | 'python' | 'typescript'>(
    inferLanguage(initialCode || '')
  );
  const [sourceCode, setSourceCode] = useState(initialCode || '');
  const [stdin, setStdin] = useState('');

  const safeProblemId = useMemo(() => {
    if (!problemId) {
      return undefined;
    }

    return UUID_REGEX.test(problemId) ? problemId : undefined;
  }, [problemId]);

  useEffect(() => {
    const nextCode = initialCode || '';
    setSourceCode(nextCode);
    setLanguage(inferLanguage(nextCode));
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
  const outputToRender = lastRunResult ?? latestHistory;

  return (
    <section className={`glass ${styles.container}`}>
      <div className={styles.header}>
        <h4 className={styles.title}>
          <Code2 size={18} color="var(--primary-color)" />
          Run Code
        </h4>

        <div className={styles.controls}>
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value as 'javascript' | 'python' | 'typescript')}
            className={styles.languageSelect}
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
          </select>

          <button
            onClick={submitRun}
            disabled={isRunning || !sourceCode.trim() || !isAuthenticated}
            className={styles.runButton}
          >
            {isRunning ? <Loader2 size={16} style={{ animation: 'spin 0.8s linear infinite' }} /> : <Play size={16} />}
            {isRunning ? 'Running...' : 'Run'}
          </button>
        </div>
      </div>

      {!isAuthenticated && (
        <div className={styles.authWarning}>
          Log in to run code and save execution history.
        </div>
      )}

      <textarea
        value={sourceCode}
        onChange={(event) => setSourceCode(event.target.value)}
        placeholder="Write your code here"
        spellCheck={false}
        className={styles.codeTextarea}
      />

      <textarea
        value={stdin}
        onChange={(event) => setStdin(event.target.value)}
        placeholder="Optional stdin input"
        spellCheck={false}
        className={styles.stdinTextarea}
      />

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
          {(outputToRender?.stdout || outputToRender?.stderr || 'Run code to see stdout and stderr output.').trim()}
        </pre>
      </div>

      <div className={styles.footer}>
        <span className={styles.footerLabel}>
          <History size={14} />
          Recent executions: {isLoadingHistory ? 'loading...' : history.length}
        </span>

        {latestHistory && (
          <span className={styles.footerInfo}>
            Last id: {latestHistory.id.slice(0, 8)}
          </span>
        )}
      </div>
    </section>
  );
};

export default CodeExecutionPanel;
