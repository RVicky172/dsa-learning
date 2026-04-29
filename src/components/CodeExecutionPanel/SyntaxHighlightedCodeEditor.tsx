import { useState, useRef } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import styles from './SyntaxHighlightedCodeEditor.module.css';

interface SyntaxHighlightedCodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: 'javascript' | 'python' | 'typescript';
  placeholder?: string;
}

/**
 * A code editor with syntax highlighting overlay.
 * Uses a transparent textarea on top of a highlighted pre element
 * to provide both editing capability and visual feedback.
 */
const SyntaxHighlightedCodeEditor = ({
  value,
  onChange,
  language,
  placeholder = 'Write your code here'
}: SyntaxHighlightedCodeEditorProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync scroll between textarea and highlight layer
  const handleScroll = () => {
    if (containerRef.current && textareaRef.current) {
      const scrollTop = textareaRef.current.scrollTop;
      const highlightElement = containerRef.current.querySelector(
        '[data-highlight-layer]'
      ) as HTMLElement;
      if (highlightElement) {
        highlightElement.scrollTop = scrollTop;
      }
    }
  };

  // Map React language names to highlight.js language names
  const getLanguageForHighlight = (): string => {
    const languageMap: Record<'javascript' | 'python' | 'typescript', string> = {
      javascript: 'javascript',
      typescript: 'typescript',
      python: 'python'
    };
    return languageMap[language];
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.editorContainer} ${isFocused ? styles.focused : ''}`}
      data-language={language}
    >
      {/* Syntax-highlighted layer (read-only) */}
      <div className={styles.highlightLayer} data-highlight-layer>
        <SyntaxHighlighter
          language={getLanguageForHighlight()}
          style={atomOneDark}
          customStyle={{
            margin: 0,
            padding: '0.85rem',
            backgroundColor: 'transparent',
            fontSize: '0.85rem',
            lineHeight: '1.5',
            minHeight: '170px',
            borderRadius: 0,
            overflow: 'hidden',
            display: 'block',
            width: '100%'
          }}
          wrapLines={true}
          codeTagProps={{
            style: {
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem'
            }
          }}
        >
          {value || placeholder}
        </SyntaxHighlighter>
      </div>

      {/* Editable textarea overlay */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onScroll={handleScroll}
        spellCheck={false}
        placeholder={placeholder}
        className={styles.textarea}
      />
    </div>
  );
};

export default SyntaxHighlightedCodeEditor;
