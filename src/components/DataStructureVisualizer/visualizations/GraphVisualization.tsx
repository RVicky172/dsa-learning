import React from 'react';
import { motion } from 'framer-motion';
import styles from '../DataStructureVisualizer.module.css';

interface VisualizationProps {
  data: (string | number)[];
  currentStep: number;
  steps: string[];
  description: string;
}

const GraphVisualization: React.FC<VisualizationProps> = ({
  data: _data,
  currentStep,
  steps,
  description
}) => {
  const graphNodes = [
    { id: 'A', x: 200, y: 40 },
    { id: 'B', x: 100, y: 120 },
    { id: 'C', x: 300, y: 120 },
    { id: 'D', x: 50, y: 220 },
    { id: 'E', x: 150, y: 220 },
    { id: 'F', x: 300, y: 220 },
  ];
  
  const activeNodesByStep = [
    [0],          // A
    [1, 2],       // B, C
    [3, 4],       // D, E
    [5],          // F
    [0,1,2,3,4,5] // All
  ];
  const currentActiveList = activeNodesByStep[Math.min(currentStep, activeNodesByStep.length - 1)] || [];

  const stepText = steps[Math.min(currentStep, steps.length - 1)] || '';

  return (
    <div>
      <div className={styles.stepDescriptionContainer}>
        <p className={styles.stepDescriptionText}>{description}</p>
        <p className={styles.stepText}>{stepText}</p>
      </div>
      <svg width="100%" height="260" viewBox="0 0 400 260" className={styles.svgVisualization}>
        {/* Edges */}
        <line x1="200" y1="40" x2="100" y2="120" stroke="var(--primary-color)" strokeWidth="2" opacity="0.6" />
        <line x1="200" y1="40" x2="300" y2="120" stroke="var(--primary-color)" strokeWidth="2" opacity="0.6" />
        <line x1="100" y1="120" x2="50" y2="220" stroke="var(--primary-color)" strokeWidth="2" opacity="0.6" />
        <line x1="100" y1="120" x2="150" y2="220" stroke="var(--primary-color)" strokeWidth="2" opacity="0.6" />
        <line x1="300" y1="120" x2="300" y2="220" stroke="var(--primary-color)" strokeWidth="2" opacity="0.6" />
        
        {/* Additional Graph edge */}
        <line x1="150" y1="220" x2="300" y2="220" stroke="var(--text-muted)" strokeWidth="2" strokeDasharray="4" opacity="0.4" />

        {/* Nodes */}
        {graphNodes.map((node, idx) => (
          <motion.g
            key={node.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r="20"
              fill={currentActiveList.includes(idx) ? 'var(--secondary-color)' : 'var(--primary-color)'}
              opacity={currentActiveList.includes(idx) ? "1" : "0.8"}
              style={{ 
                filter: currentActiveList.includes(idx) ? 'drop-shadow(0 0 8px var(--secondary-color))' : 'none',
                transition: 'all 0.3s ease'
              }}
            />
            <text
              x={node.x}
              y={node.y + 5}
              textAnchor="middle"
              fill="white"
              fontSize="14"
              fontWeight="600"
            >
              {node.id}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
};

export default GraphVisualization;
