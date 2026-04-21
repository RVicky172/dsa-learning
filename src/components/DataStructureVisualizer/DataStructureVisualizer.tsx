import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import ArrayVisualization from './visualizations/ArrayVisualization';
import LinkedListVisualization from './visualizations/LinkedListVisualization';
import StackVisualization from './visualizations/StackVisualization';
import QueueVisualization from './visualizations/QueueVisualization';
import HeapVisualization from './visualizations/HeapVisualization';
import HashTableVisualization from './visualizations/HashTableVisualization';
import BinaryTreeVisualization from './visualizations/BinaryTreeVisualization';
import GraphVisualization from './visualizations/GraphVisualization';
import { getExampleData } from './utils/visualizationData';
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

const DataStructureVisualizer: React.FC<DataStructureVisualizerProps> = ({
  type,
  data = [],
  title,
  description,
  advancedSteps = []
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  // Get example data for the visualization type
  const exampleData = getExampleData();
  const examples = (exampleData[type as keyof ReturnType<typeof getExampleData>]) || { data: data || [], description: '', steps: [] };
  const maxSteps = Math.max(examples.steps.length, advancedSteps.length);

  // Animation loop
  useEffect(() => {
    if (!isPlaying || maxSteps === 0) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % maxSteps);
    }, 1000 / playbackRate);

    return () => clearInterval(interval);
  }, [isPlaying, playbackRate, maxSteps]);

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => (prev - 1 + maxSteps) % maxSteps);
  };

  const handleNext = () => {
    setCurrentStep((prev) => (prev + 1) % maxSteps);
  };

  const renderVisualization = () => {
    const vizData = data.length > 0 ? data : examples.data;
    const steps = advancedSteps.length > 0 
      ? (Array.isArray(advancedSteps) && typeof advancedSteps[0] === 'object' 
          ? (advancedSteps as VisualizationStep[]).map(s => s.text) 
          : (advancedSteps as string[]))
      : examples.steps;

    const commonProps = {
      data: vizData,
      currentStep,
      steps: steps as string[],
      description: examples.description
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
      className={styles.container}
    >
      {title && <h3 className={styles.title}>{title}</h3>}
      {description && <p className={styles.description}>{description}</p>}

      <div className={styles.visualization}>
        {renderVisualization()}
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? 'Pause visualization' : 'Play visualization'}
          className={`${styles.button} ${isPlaying ? styles.playing : ''}`}
        >
          {React.createElement(isPlaying ? Pause : Play, { size: 18 })}
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        <button
          onClick={handlePrevious}
          aria-label="Previous step"
          className={`${styles.button} ${styles.buttonSmall}`}
        >
          {React.createElement(ChevronLeft, { size: 18 })}
        </button>

        <span className={styles.stepCounter}>
          Step {currentStep + 1} / {maxSteps}
        </span>

        <button
          onClick={handleNext}
          aria-label="Next step"
          className={`${styles.button} ${styles.buttonSmall}`}
        >
          {React.createElement(ChevronRight, { size: 18 })}
        </button>

        <button
          onClick={handleReset}
          aria-label="Reset visualization"
          className={styles.button}
        >
          {React.createElement(RotateCcw, { size: 18 })}
          Reset
        </button>

        <div className={styles.speedControl}>
          <label className={styles.speedLabel}>Speed:</label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.5"
            value={playbackRate}
            onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
            className={styles.speedInput}
          />
          <span className={styles.speedValue}>{playbackRate.toFixed(1)}x</span>
        </div>
      </div>
    </motion.div>
  );
};

export default DataStructureVisualizer;
