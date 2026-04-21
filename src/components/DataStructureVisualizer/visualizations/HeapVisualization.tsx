import React from 'react';
import { motion } from 'framer-motion';
import styles from '../DataStructureVisualizer.module.css';

interface VisualizationProps {
  data: (string | number)[];
  currentStep: number;
  steps: string[];
  description: string;
}

const HeapVisualization: React.FC<VisualizationProps> = ({
  data,
  currentStep,
  steps,
  description
}) => {
  const stepText = steps[Math.min(currentStep, steps.length - 1)] || '';

  return (
    <div>
      <div className={styles.stepDescriptionContainer}>
        <p className={styles.stepDescriptionText}>{description}</p>
        <p className={styles.stepText}>{stepText}</p>
      </div>
      <svg width="100%" height="300" viewBox="0 0 400 300" className={styles.svgVisualization}>
        {/* Draw connections for heap structure */}
        {data.map((_, idx) => {
          const leftChild = 2 * idx + 1;

          if (leftChild < data.length) {
            const startX = 50 + (idx % 4) * 80;
            const startY = Math.floor(idx / 4) * 60 + 40;
            const endX = 50 + (leftChild % 4) * 80;
            const endY = Math.floor(leftChild / 4) * 60 + 40;

            return (
              <line
                key={`left-${idx}`}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke="var(--primary-color)"
                strokeWidth="2"
                opacity="0.6"
              />
            );
          }
          return null;
        })}

        {/* Draw heap nodes */}
        {data.map((item, idx) => (
          <motion.g
            key={idx}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            <circle
              cx={50 + (idx % 4) * 80}
              cy={Math.floor(idx / 4) * 60 + 40}
              r="20"
              fill={idx === 0 ? 'var(--secondary-color)' : 'var(--primary-color)'}
              opacity="0.8"
            />
            <text
              x={50 + (idx % 4) * 80}
              y={Math.floor(idx / 4) * 60 + 45}
              textAnchor="middle"
              fill="white"
              fontSize="14"
              fontWeight="600"
            >
              {item}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
};

export default HeapVisualization;
