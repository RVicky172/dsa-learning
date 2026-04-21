import React from 'react';
import { motion } from 'framer-motion';
import styles from '../DataStructureVisualizer.module.css';

interface VisualizationProps {
  data: (string | number)[];
  currentStep: number;
  steps: string[];
  description: string;
}

const StackVisualization: React.FC<VisualizationProps> = ({
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
      <div className={styles.stackContainer}>
        {data.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            className={`${styles.stackItem} ${
              idx === data.length - 1 ? styles.stackItemTop : ''
            }`}
          >
            {item} {idx === data.length - 1 && <span className={styles.stackTopLabel}>← TOP</span>}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StackVisualization;
