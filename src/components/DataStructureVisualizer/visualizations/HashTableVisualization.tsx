import React from 'react';
import { motion } from 'framer-motion';
import styles from '../DataStructureVisualizer.module.css';

interface VisualizationProps {
  data: (string | number)[];
  currentStep: number;
  steps: string[];
  description: string;
}

const HashTableVisualization: React.FC<VisualizationProps> = ({
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
      <div className={styles.hashTableGrid}>
        {data.slice(0, 5).map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ rotate: -10, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            className={styles.hashItem}
          >
            <div className={styles.hashItemIndex}>Hash {idx}</div>
            <div className={styles.hashItemValue}>{item}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HashTableVisualization;
