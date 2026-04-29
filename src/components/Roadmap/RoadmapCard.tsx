import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Lightbulb, Code } from 'lucide-react';
import styles from './Roadmap.module.css';
import type { RoadmapNode } from './types';

interface RoadmapCardProps {
  node: RoadmapNode;
  status: 'completed' | 'current' | 'locked';
  statusColor: string;
  difficultyColor: string;
  onNavigate?: (topicId: string) => void;
  onToggleTopic: (id: string) => void;
}

const RoadmapCard: React.FC<RoadmapCardProps> = ({
  node,
  status,
  statusColor,
  difficultyColor,
  onNavigate,
  onToggleTopic,
}) => {
  const isLocked = status === 'locked';
  const isCurrent = status === 'current';

  return (
    <motion.div
      whileHover={{ scale: !isLocked ? 1.02 : 1 }}
      onClick={() => {
        if (!isLocked && onNavigate && node.topicId) {
          onNavigate(node.topicId);
        }
      }}
      className={`glass ${styles.roadmapCard}`}
      style={{
        width: 'min(400px, 100%)',
        cursor: !isLocked ? 'pointer' : 'default',
        opacity: isLocked ? 0.6 : 1,
        borderLeft: isCurrent ? '4px solid var(--primary-color)' : 'none'
      }}
    >
      <div className={styles.cardHeader}>
        <div className={styles.cardTitleSection}>
          <node.icon size={20} color={statusColor} />
          <h3 className={styles.cardTitle}>{node.title}</h3>
        </div>
        <span className={styles.difficultyBadge} style={{ backgroundColor: difficultyColor }}>
          {node.difficulty}
        </span>
      </div>

      <p className={styles.cardDescription}>{node.description}</p>

      <div className={styles.topicsContainer}>
        {node.topics.map(topic => (
          <span key={topic} className={styles.topicBadge}>
            {topic}
          </span>
        ))}
      </div>

      <div className={styles.cardFooter}>
        <span>📅 {node.estimatedTime}</span>
      </div>

      {node.prerequisites.length > 0 && (
        <p className={styles.prerequisites}>
          Prerequisites: {node.prerequisites.length > 0 ? `${node.prerequisites.length} requirement(s)` : 'None'}
        </p>
      )}

      {isCurrent && node.topicId && (
        <div className={styles.actionButtonGroup}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onNavigate && node.topicId) {
                onNavigate(node.topicId);
              }
            }}
            className={styles.actionButton}
            style={{ backgroundColor: 'var(--primary-color)' }}
            title="View full topic with theory and examples"
          >
            <BookOpen size={16} />
            Learn
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onNavigate && node.topicId) {
                onNavigate(`${node.topicId}-visualize`);
              }
            }}
            className={styles.actionButton}
            style={{ backgroundColor: 'var(--secondary-color)' }}
            title="View interactive data structure visualization"
          >
            <Lightbulb size={16} />
            Visualize
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onNavigate && node.topicId) {
                onNavigate(`${node.topicId}-practice`);
              }
            }}
            className={styles.actionButton}
            style={{ backgroundColor: '#6ee7b7' }}
            title="Practice problems for this topic"
          >
            <Code size={16} />
            Practice
          </button>
        </div>
      )}

      {isCurrent && !node.topicId && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleTopic(node.id);
          }}
          className={styles.actionButton}
          style={{ backgroundColor: '#22c55e' }}
        >
          Mark Pre-requisite Complete ✓
        </button>
      )}
    </motion.div>
  );
};

export default RoadmapCard;
