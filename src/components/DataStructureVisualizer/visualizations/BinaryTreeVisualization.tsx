import React from 'react';
import { motion } from 'framer-motion';
import styles from '../DataStructureVisualizer.module.css';

interface VisualizationProps {
  data: (string | number)[];
  currentStep: number;
  steps: string[];
  description: string;
}

const BinaryTreeVisualization: React.FC<VisualizationProps> = ({
  data: _data,
  currentStep,
  steps,
  description
}) => {
  const treeNodes = [
    { id: 10, x: 200, y: 40 },
    { id: 5, x: 100, y: 120 },
    { id: 15, x: 300, y: 120 },
    { id: 3, x: 50, y: 200 },
    { id: 7, x: 150, y: 200 },
    { id: 12, x: 250, y: 200 },
    { id: 18, x: 350, y: 200 },
  ];
  
  const highlightOrder = [3, 1, 4, 0, 5, 2, 6];
  const currentIndexToHighlight = highlightOrder[Math.min(currentStep, highlightOrder.length - 1)];

  const stepText = steps[Math.min(currentStep, steps.length - 1)] || '';

  return (
    <div>
      <div className={styles.stepDescriptionContainer}>
        <p className={styles.stepDescriptionText}>{description}</p>
        <p className={styles.stepText}>{stepText}</p>
      </div>
      <svg width="100%" height="250" viewBox="0 0 400 250" className={styles.svgVisualization}>
        {/* Edges */}
        <line x1="200" y1="40" x2="100" y2="120" stroke="var(--primary-color)" strokeWidth="2" opacity="0.6" />
        <line x1="200" y1="40" x2="300" y2="120" stroke="var(--primary-color)" strokeWidth="2" opacity="0.6" />
        <line x1="100" y1="120" x2="50" y2="200" stroke="var(--primary-color)" strokeWidth="2" opacity="0.6" />
        <line x1="100" y1="120" x2="150" y2="200" stroke="var(--primary-color)" strokeWidth="2" opacity="0.6" />
        <line x1="300" y1="120" x2="250" y2="200" stroke="var(--primary-color)" strokeWidth="2" opacity="0.6" />
        <line x1="300" y1="120" x2="350" y2="200" stroke="var(--primary-color)" strokeWidth="2" opacity="0.6" />
        
        {/* Nodes */}
        {treeNodes.map((node, idx) => (
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
              fill={currentIndexToHighlight === idx ? 'var(--secondary-color)' : 'var(--primary-color)'}
              opacity={currentIndexToHighlight === idx ? "1" : "0.8"}
              style={{ 
                filter: currentIndexToHighlight === idx ? 'drop-shadow(0 0 8px var(--secondary-color))' : 'none',
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

export default BinaryTreeVisualization;
