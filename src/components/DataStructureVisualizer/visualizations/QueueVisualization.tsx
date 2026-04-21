import React from 'react';
import { motion } from 'framer-motion';
import styles from '../DataStructureVisualizer.module.css';

interface VisualizationProps {
  data: (string | number)[];
  currentStep: number;
  steps: string[];
  description: string;
}

const QueueVisualization: React.FC<VisualizationProps> = ({
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
      <div className={styles.queueContainer}>
        <span className={styles.queueLabel}>Front</span>
        {data.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            className={`${styles.queueItem} ${idx === 0 ? styles.queueItemFront : ''}`}
          >
            {item}
          </motion.div>
        ))}
        <span className={styles.queueLabel}>Back</span>
      </div>
    </div>
  );
};

export default QueueVisualization;
