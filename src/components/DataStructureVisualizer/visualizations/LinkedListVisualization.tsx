import React from 'react';
import { motion } from 'framer-motion';
import styles from '../DataStructureVisualizer.module.css';

interface VisualizationProps {
  data: (string | number)[];
  currentStep: number;
  steps: string[];
  description: string;
}

const LinkedListVisualization: React.FC<VisualizationProps> = ({
  data,
  currentStep,
  steps,
  description
}) => {
  const stepText = steps[Math.min(currentStep % steps.length, steps.length - 1)] || '';

  return (
    <div>
      <div className={styles.stepDescriptionContainer}>
        <p className={styles.stepDescriptionText}>{description}</p>
        <p className={styles.stepText}>{stepText}</p>
      </div>
      <div className={styles.linkedListContainer}>
        {data.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center' }}>
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`${styles.linkedListNode} ${
                idx === currentStep % data.length ? styles.linkedListNodeHighlighted : ''
              }`}
            >
              {item}
            </motion.div>
            {idx < data.length - 1 && (
              <svg width="30" height="20" className={styles.linkedListArrow}>
                <path d="M 5 10 L 25 10" stroke="var(--primary-color)" strokeWidth="2" fill="none" />
                <polygon points="25,10 20,6 20,14" fill="var(--primary-color)" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinkedListVisualization;
