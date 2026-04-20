import { useEffect, useMemo, useState } from 'react';
import { Code2, Play, Terminal, AlertCircle, Loader2, History } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useCodeExecution } from '../hooks/useCodeExecution';
import type { ExecutionStatus } from '../types/api';

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
    <section
      className="glass"
      style={{
        padding: '1.25rem',
        border: '1px solid var(--border-color)',
        marginBottom: '1.5rem'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1rem',
          flexWrap: 'wrap'
        }}
      >
        <h4
          style={{
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '1rem'
          }}
        >
          <Code2 size={18} color="var(--primary-color)" />
          Run Code
        </h4>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value as 'javascript' | 'python' | 'typescript')}
            style={{
              background: 'var(--surface-color)',
              color: 'var(--text-main)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '0.45rem 0.65rem',
              fontSize: '0.85rem'
            }}
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
          </select>

          <button
            onClick={submitRun}
            disabled={isRunning || !sourceCode.trim() || !isAuthenticated}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              border: 'none',
              borderRadius: '8px',
              padding: '0.5rem 0.9rem',
              cursor: isRunning || !sourceCode.trim() || !isAuthenticated ? 'not-allowed' : 'pointer',
              background:
                isRunning || !sourceCode.trim() || !isAuthenticated
                  ? 'rgba(148, 163, 184, 0.25)'
                  : 'var(--primary-color)',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.85rem'
            }}
          >
            {isRunning ? <Loader2 size={16} style={{ animation: 'spin 0.8s linear infinite' }} /> : <Play size={16} />}
            {isRunning ? 'Running...' : 'Run'}
          </button>
        </div>
      </div>

      {!isAuthenticated && (
        <div
          style={{
            marginBottom: '0.9rem',
            padding: '0.7rem 0.8rem',
            borderRadius: '8px',
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            color: '#fbbf24',
            fontSize: '0.85rem'
          }}
        >
          Log in to run code and save execution history.
        </div>
      )}

      <textarea
        value={sourceCode}
        onChange={(event) => setSourceCode(event.target.value)}
        placeholder="Write your code here"
        spellCheck={false}
        style={{
          width: '100%',
          minHeight: '170px',
          background: 'rgba(2, 6, 23, 0.65)',
          color: '#e2e8f0',
          border: '1px solid var(--border-color)',
          borderRadius: '10px',
          padding: '0.85rem',
          fontSize: '0.85rem',
          lineHeight: '1.5',
          fontFamily: 'var(--font-mono)',
          marginBottom: '0.8rem'
        }}
      />

      <textarea
        value={stdin}
        onChange={(event) => setStdin(event.target.value)}
        placeholder="Optional stdin input"
        spellCheck={false}
        style={{
          width: '100%',
          minHeight: '72px',
          background: 'rgba(2, 6, 23, 0.45)',
          color: '#e2e8f0',
          border: '1px solid var(--border-color)',
          borderRadius: '10px',
          padding: '0.75rem',
          fontSize: '0.82rem',
          lineHeight: '1.5',
          fontFamily: 'var(--font-mono)',
          marginBottom: '0.9rem'
        }}
      />

      {errorMessage && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            color: '#f87171',
            marginBottom: '0.8rem',
            fontSize: '0.85rem'
          }}
        >
          <AlertCircle size={16} />
          <span>{errorMessage}</span>
        </div>
      )}

      <div
        style={{
          border: '1px solid var(--border-color)',
          borderRadius: '10px',
          overflow: 'hidden',
          marginBottom: '0.8rem'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
            padding: '0.55rem 0.75rem',
            background: 'rgba(148, 163, 184, 0.08)',
            borderBottom: '1px solid var(--border-color)',
            fontSize: '0.8rem'
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <Terminal size={15} /> Output
          </span>

          {outputToRender && (
            <span style={{ color: getStatusColor(outputToRender.status), fontWeight: 600 }}>
              {outputToRender.status}
              {outputToRender.runtimeMs ? ` · ${outputToRender.runtimeMs} ms` : ''}
            </span>
          )}
        </div>

        <pre
          style={{
            margin: 0,
            minHeight: '90px',
            maxHeight: '220px',
            overflow: 'auto',
            background: 'rgba(2, 6, 23, 0.85)',
            color: '#cbd5e1',
            padding: '0.8rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82rem',
            lineHeight: '1.5'
          }}
        >
          {(outputToRender?.stdout || outputToRender?.stderr || 'Run code to see stdout and stderr output.').trim()}
        </pre>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            color: 'var(--text-muted)',
            fontSize: '0.8rem'
          }}
        >
          <History size={14} />
          Recent executions: {isLoadingHistory ? 'loading...' : history.length}
        </span>

        {latestHistory && (
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            Last id: {latestHistory.id.slice(0, 8)}
          </span>
        )}
      </div>
    </section>
  );
};

export default CodeExecutionPanel;
