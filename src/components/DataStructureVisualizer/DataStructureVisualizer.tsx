import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ChevronLeft, ChevronRight, RotateCcw, Shuffle, PenLine, Check, X } from 'lucide-react';
import ArrayVisualization from './visualizations/ArrayVisualization';
import LinkedListVisualization from './visualizations/LinkedListVisualization';
import StackVisualization from './visualizations/StackVisualization';
import QueueVisualization from './visualizations/QueueVisualization';
import HeapVisualization from './visualizations/HeapVisualization';
import HashTableVisualization from './visualizations/HashTableVisualization';
import BinaryTreeVisualization from './visualizations/BinaryTreeVisualization';
import GraphVisualization from './visualizations/GraphVisualization';
import { getExampleData } from './utils/visualizationData';
import { useVisualizerControls } from '../../hooks/useVisualizerControls';
import styles from './DataStructureVisualizer.module.css';

export type VisualizationType =
  | 'array'
  | 'linked-list'
  | 'binary-tree'
  | 'graph'
  | 'stack'
  | 'queue'
  | 'heap'
  | 'hash-table'
  | 'two-pointer'
  | 'sorting';

export interface VisualizationStep {
  text: string;
  highlights?: number[];
  dataState?: (string | number)[];
}

interface DataStructureVisualizerProps {
  type: VisualizationType;
  data?: (string | number)[];
  title?: string;
  description?: string;
  advancedSteps?: string[] | VisualizationStep[];
}

export type VisualizerProps = DataStructureVisualizerProps;

interface ComplexityInfo {
  time: string;
  space: string;
  note: string;
}

const COMPLEXITY_INFO: Record<string, ComplexityInfo> = {
  array: { time: 'O(n)', space: 'O(1)', note: 'Linear search' },
  sorting: { time: 'O(n²)', space: 'O(1)', note: 'Bubble sort' },
  'two-pointer': { time: 'O(n)', space: 'O(1)', note: 'Two pointer scan' },
  'linked-list': { time: 'O(n)', space: 'O(1)', note: 'Traversal/insertion' },
  stack: { time: 'O(1)', space: 'O(n)', note: 'Push/pop amortized' },
  queue: { time: 'O(1)', space: 'O(n)', note: 'Enqueue/dequeue' },
  heap: { time: 'O(log n)', space: 'O(n)', note: 'Insert/extract-min' },
  'hash-table': { time: 'O(1) avg', space: 'O(n)', note: 'Hash insert/lookup' },
  'binary-tree': { time: 'O(n)', space: 'O(h)', note: 'In-order traversal' },
  graph: { time: 'O(V+E)', space: 'O(V)', note: 'BFS traversal' },
};

const DataStructureVisualizer: React.FC<DataStructureVisualizerProps> = ({
  type,
  data = [],
  title,
  description,
  advancedSteps = [],
}) => {
  const exampleData = getExampleData();
  const examples = (exampleData[type as keyof ReturnType<typeof getExampleData>]) || {
    data: data || [],
    description: '',
    steps: [],
  };

  const advancedStepTexts =
    advancedSteps.length > 0
      ? Array.isArray(advancedSteps) && typeof advancedSteps[0] === 'object'
        ? (advancedSteps as VisualizationStep[]).map((s) => s.text)
        : (advancedSteps as string[])
      : ([] as string[]);

  const steps = advancedStepTexts.length > 0 ? advancedStepTexts : examples.steps;
  const maxSteps = steps.length;

  const [state, actions] = useVisualizerControls(maxSteps, type);
  const { currentStep, isPlaying, playbackRate, customInputMode, customInputValue, customData, operationCount } = state;

  const activeData = customData ?? (data.length > 0 ? data : examples.data);
  const complexity = COMPLEXITY_INFO[type] ?? { time: 'O(?)', space: 'O(?)', note: '' };

  const renderVisualization = () => {
    const commonProps = {
      data: activeData,
      currentStep,
      steps: steps as string[],
      description: examples.description,
    };
    switch (type) {
      case 'array':
      case 'sorting':
      case 'two-pointer':
        return <ArrayVisualization {...commonProps} />;
      case 'linked-list':
        return <LinkedListVisualization {...commonProps} />;
      case 'stack':
        return <StackVisualization {...commonProps} />;
      case 'queue':
        return <QueueVisualization {...commonProps} />;
      case 'heap':
        return <HeapVisualization {...commonProps} />;
      case 'hash-table':
        return <HashTableVisualization {...commonProps} />;
      case 'binary-tree':
        return <BinaryTreeVisualization {...commonProps} />;
      case 'graph':
        return <GraphVisualization {...commonProps} />;
      default:
        return <ArrayVisualization {...commonProps} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={styles.container}
    >
      {title && <h3 className={styles.title}>{title}</h3>}
      {description && <p className={styles.description}>{description}</p>}

      {/* Complexity overlay */}
      <div className={styles.complexityBar}>
        <span className={styles.complexityItem}>
          <span className={styles.complexityLabel}>Time</span>
          <span className={styles.complexityValue}>{complexity.time}</span>
        </span>
        <span className={styles.complexityDivider} aria-hidden="true">|</span>
        <span className={styles.complexityItem}>
          <span className={styles.complexityLabel}>Space</span>
          <span className={styles.complexityValue}>{complexity.space}</span>
        </span>
        <span className={styles.complexityDivider} aria-hidden="true">|</span>
        <span className={styles.complexityNote}>{complexity.note}</span>
        {operationCount > 0 && (
          <>
            <span className={styles.complexityDivider} aria-hidden="true">|</span>
            <span className={styles.complexityItem}>
              <span className={styles.complexityLabel}>Ops</span>
              <span className={styles.complexityValue}>{operationCount}</span>
            </span>
          </>
        )}
      </div>

      {/* Progress bar */}
      <div className={styles.progressBar}>
        <motion.div
          className={styles.progressFill}
          initial={{ width: '0%' }}
          animate={{ width: maxSteps > 0 ? `${((currentStep + 1) / maxSteps) * 100}%` : '0%' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      <div className={styles.visualization}>{renderVisualization()}</div>

      {/* Custom input panel */}
      <AnimatePresence>
        {customInputMode && (
          <motion.div
            key="custom-input"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={styles.customInputPanel}
          >
            <label htmlFor="custom-data-input" className={styles.customInputLabel}>
              Enter comma-separated values (numbers or strings):
            </label>
            <div className={styles.customInputRow}>
              <input
                id="custom-data-input"
                type="text"
                value={customInputValue}
                onChange={(e) => actions.setCustomInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && actions.applyCustomInput()}
                placeholder="e.g. 5, 3, 8, 1, 9"
                className={styles.customInput}
              />
              <button
                onClick={actions.applyCustomInput}
                aria-label="Apply custom input"
                className={`${styles.button} ${styles.buttonIcon}`}
              >
                {React.createElement(Check, { size: 16 })}
              </button>
              <button
                onClick={actions.toggleCustomInput}
                aria-label="Cancel custom input"
                className={`${styles.button} ${styles.buttonIcon} ${styles.buttonCancel}`}
              >
                {React.createElement(X, { size: 16 })}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className={styles.controls}>
        {/* Playback row */}
        <div className={styles.controlsRow}>
          <button
            onClick={actions.togglePlay}
            aria-label={isPlaying ? 'Pause visualization' : 'Play visualization'}
            className={`${styles.button} ${isPlaying ? styles.playing : ''}`}
          >
            {React.createElement(isPlaying ? Pause : Play, { size: 18 })}
            <span className={styles.buttonLabel}>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>

          <button
            onClick={actions.stepBack}
            disabled={currentStep === 0}
            aria-label="Previous step"
            className={`${styles.button} ${styles.buttonSmall}`}
          >
            {React.createElement(ChevronLeft, { size: 18 })}
          </button>

          <span className={styles.stepCounter}>
            {currentStep + 1} / {maxSteps}
          </span>

          <button
            onClick={actions.stepForward}
            disabled={currentStep >= maxSteps - 1}
            aria-label="Next step"
            className={`${styles.button} ${styles.buttonSmall}`}
          >
            {React.createElement(ChevronRight, { size: 18 })}
          </button>

          <button
            onClick={actions.reset}
            aria-label="Reset visualization"
            className={styles.button}
          >
            {React.createElement(RotateCcw, { size: 18 })}
            <span className={styles.buttonLabel}>Reset</span>
          </button>
        </div>

        {/* Secondary row: speed + input controls */}
        <div className={styles.controlsRow}>
          <div className={styles.speedControl}>
            <label htmlFor={`speed-${type}`} className={styles.speedLabel}>Speed</label>
            <input
              id={`speed-${type}`}
              type="range"
              min="0.25"
              max="2"
              step="0.25"
              value={playbackRate}
              onChange={(e) => actions.setPlaybackRate(parseFloat(e.target.value))}
              className={styles.speedInput}
              aria-label={`Playback speed: ${playbackRate}x`}
            />
            <span className={styles.speedValue}>{playbackRate.toFixed(2)}x</span>
          </div>

          <button
            onClick={() => actions.randomize(type)}
            aria-label="Randomize input data"
            className={`${styles.button} ${styles.buttonSecondary}`}
            title="Randomize data"
          >
            {React.createElement(Shuffle, { size: 16 })}
            <span className={styles.buttonLabel}>Random</span>
          </button>

          <button
            onClick={actions.toggleCustomInput}
            aria-label="Enter custom input"
            className={`${styles.button} ${styles.buttonSecondary} ${customInputMode ? styles.active : ''}`}
            title="Custom input"
          >
            {React.createElement(PenLine, { size: 16 })}
            <span className={styles.buttonLabel}>Custom</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default memo(DataStructureVisualizer);
