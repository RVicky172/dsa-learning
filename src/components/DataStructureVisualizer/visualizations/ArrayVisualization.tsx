import React from 'react';
import { motion } from 'framer-motion';
import styles from '../DataStructureVisualizer.module.css';

interface VisualizationProps {
  data: (string | number)[];
  currentStep: number;
  steps: string[];
  description: string;
}

const ArrayVisualization: React.FC<VisualizationProps> = ({
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
      <div className={styles.arrayContainer}>
        {data.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ scale: 0, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`${styles.arrayItem} ${
              idx === currentStep % data.length ? styles.arrayItemHighlighted : ''
            }`}
          >
            {item}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ArrayVisualization;
