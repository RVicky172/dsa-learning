import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Lock, Clock, BookOpen, TrendingUp, Target, AlertCircle } from 'lucide-react';

interface LearningProgress {
  [topicId: string]: {
    completed: number;
    total: number;
    status: 'not-started' | 'in-progress' | 'completed';
  };
}

interface PathNode {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  prerequisites: string[];
  topicId: string;
  icon: React.ReactNode;
}

const LearningPathComponent = () => {
  const [progress, setProgress] = useState<LearningProgress>(() => {
    const saved = localStorage.getItem('learningProgress');
    return saved ? JSON.parse(saved) : {};
  });
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');

  const updateProgress = (nodeId: string, newStatus: 'not-started' | 'in-progress' | 'completed', completed?: number, total?: number) => {
    const existing = progress[nodeId] || { completed: 0, total: 1, status: 'not-started' as const };
    const newProgress = {
      ...progress,
      [nodeId]: {
        completed: completed !== undefined ? completed : existing.completed,
        total: total !== undefined ? total : existing.total,
        status: newStatus
      }
    };
    setProgress(newProgress);
    localStorage.setItem('learningProgress', JSON.stringify(newProgress));
  };

  const getNodeStatus = (nodeId: string): 'locked' | 'available' | 'completed' | 'in-progress' => {
    const node = pathNodes.find(n => n.id === nodeId);
    if (!node) return 'locked';

    const nodeProgress = progress[nodeId];
    
    // Check actual status
    if (nodeProgress?.status === 'completed') return 'completed';
    if (nodeProgress?.status === 'in-progress') return 'in-progress';
    
    // Check prerequisites
    const prereqsMet = node.prerequisites.length === 0 || node.prerequisites.every(
      prereq => progress[prereq]?.status === 'completed'
    );
    
    if (prereqsMet) return 'available';
    return 'locked';
  };

  const pathNodes: PathNode[] = [
    {
      id: 'arrays',
      title: 'Arrays & Strings',
      description: 'Master fundamental array operations and string manipulation techniques',
      estimatedTime: '2-3 weeks',
      difficulty: 'Beginner',
      prerequisites: [],
      topicId: 'arrays',
      icon: React.createElement(BookOpen, { size: 24 })
    },
    {
      id: 'linked-lists',
      title: 'Linked Lists',
      description: 'Learn pointer manipulation and list operations',
      estimatedTime: '2 weeks',
      difficulty: 'Intermediate',
      prerequisites: ['arrays'],
      topicId: 'linked-lists',
      icon: React.createElement(BookOpen, { size: 24 })
    },
    {
      id: 'stacks-queues',
      title: 'Stacks & Queues',
      description: 'Understand LIFO and FIFO data structures',
      estimatedTime: '1-2 weeks',
      difficulty: 'Intermediate',
      prerequisites: ['arrays'],
      topicId: 'stacks-queues',
      icon: React.createElement(BookOpen, { size: 24 })
    },
    {
      id: 'hash-tables',
      title: 'Hash Tables',
      description: 'Master hashing, collision resolution, and hash-based problems',
      estimatedTime: '2 weeks',
      difficulty: 'Intermediate',
      prerequisites: ['arrays'],
      topicId: 'hash-tables',
      icon: React.createElement(BookOpen, { size: 24 })
    },
    {
      id: 'trees',
      title: 'Trees & BST',
      description: 'Learn tree traversals, binary search trees, and tree operations',
      estimatedTime: '3-4 weeks',
      difficulty: 'Intermediate',
      prerequisites: ['stacks-queues', 'linked-lists'],
      topicId: 'trees',
      icon: React.createElement(BookOpen, { size: 24 })
    },
    {
      id: 'heaps',
      title: 'Heaps & Priority Queues',
      description: 'Understand heap structure and priority queue operations',
      estimatedTime: '1-2 weeks',
      difficulty: 'Advanced',
      prerequisites: ['trees'],
      topicId: 'heaps',
      icon: React.createElement(BookOpen, { size: 24 })
    },
    {
      id: 'graphs',
      title: 'Graphs & BFS/DFS',
      description: 'Master graph traversals and fundamental graph algorithms',
      estimatedTime: '3-4 weeks',
      difficulty: 'Advanced',
      prerequisites: ['stacks-queues'],
      topicId: 'graphs',
      icon: React.createElement(BookOpen, { size: 24 })
    }
  ];

  const completedTopics = pathNodes.filter(n => getNodeStatus(n.id) === 'completed').length;
  const totalTopics = pathNodes.length;
  const overallProgress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  const getProgressPercentage = (nodeId: string): number => {
    const p = progress[nodeId];
    if (!p || p.total === 0) return 0;
    return Math.round((p.completed / p.total) * 100);
  };

  const filteredNodes = filterDifficulty === 'All'
    ? pathNodes
    : pathNodes.filter(n => n.difficulty === filterDifficulty);

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Overall Progress Summary */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          padding: '2rem',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(0, 217, 255, 0.1) 100%)',
          borderRadius: '12px',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          marginBottom: '2rem'
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
              {React.createElement(TrendingUp, { size: 24, color: 'var(--primary-color)' })}
              <h3 style={{ margin: 0, color: 'var(--primary-color)' }}>Overall Progress</h3>
            </div>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: 'var(--primary-color)',
              marginBottom: '0.5rem'
            }}>
              {overallProgress}%
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              {completedTopics} of {totalTopics} topics completed
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
              {React.createElement(Target, { size: 24, color: 'var(--secondary-color)' })}
              <h3 style={{ margin: 0, color: 'var(--secondary-color)' }}>Current Focus</h3>
            </div>
            <div style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
              {pathNodes.find(n => getNodeStatus(n.id) === 'in-progress')?.title || 'Start with Arrays & Strings'}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
              {React.createElement(Clock, { size: 24, color: 'var(--primary-color)' })}
              <h3 style={{ margin: 0, color: 'var(--primary-color)' }}>Recommended Time</h3>
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              15-20 weeks for complete mastery
            </div>
          </div>
        </div>
      </motion.div>

      {/* Difficulty Filter */}
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'].map(diff => (
          <button
            key={diff}
            onClick={() => setFilterDifficulty(diff)}
            style={{
              padding: '0.6rem 1.2rem',
              backgroundColor: filterDifficulty === diff ? 'var(--primary-color)' : 'transparent',
              color: filterDifficulty === diff ? 'white' : 'var(--text-muted)',
              border: `1px solid ${filterDifficulty === diff ? 'var(--primary-color)' : 'var(--border-color)'}`,
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--primary-color)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = filterDifficulty === diff ? 'var(--primary-color)' : 'var(--border-color)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {diff}
          </button>
        ))}
      </div>

      {/* Learning Path Nodes */}
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {filteredNodes.map((node, idx) => {
          const status = getNodeStatus(node.id);
          const nodeProgress = getProgressPercentage(node.id);

          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => {
                if (status !== 'locked') {
                  // Toggle between available → in-progress → completed
                  if (status === 'available') {
                    updateProgress(node.id, 'in-progress', 0, 10);
                  } else if (status === 'in-progress') {
                    updateProgress(node.id, 'completed', 10, 10);
                  } else if (status === 'completed') {
                    updateProgress(node.id, 'in-progress', 5, 10);
                  }
                }
              }}
              style={{
                padding: '1.5rem',
                borderRadius: '12px',
                border: `2px solid ${
                  status === 'locked' ? 'var(--border-color)' :
                  status === 'completed' ? 'var(--secondary-color)' :
                  status === 'in-progress' ? 'var(--primary-color)' :
                  'rgba(99, 102, 241, 0.3)'
                }`,
                background: status === 'locked'
                  ? 'rgba(0, 0, 0, 0.2)'
                  : status === 'completed'
                  ? 'rgba(34, 197, 94, 0.05)'
                  : 'rgba(99, 102, 241, 0.05)',
                cursor: status === 'locked' ? 'not-allowed' : 'pointer',
                opacity: status === 'locked' ? 0.6 : 1,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (status !== 'locked') {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(99, 102, 241, 0.15)';
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '1.5rem', alignItems: 'center' }}>
                {/* Status Icon */}
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor:
                    status === 'locked' ? 'rgba(0, 0, 0, 0.3)' :
                    status === 'completed' ? 'var(--secondary-color)' :
                    status === 'in-progress' ? 'var(--primary-color)' :
                    'rgba(99, 102, 241, 0.2)',
                  color: status === 'locked' ? 'var(--text-muted)' : 'white',
                  fontSize: '1.5rem',
                  fontWeight: 'bold'
                }}>
                  {status === 'locked' && React.createElement(Lock, { size: 24 })}
                  {status === 'completed' && React.createElement(Check, { size: 24 })}
                  {status === 'in-progress' && <span>{nodeProgress}%</span>}
                  {status === 'available' && '▶'}
                </div>

                {/* Content */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-primary)' }}>
                      {node.title}
                    </h3>
                    <span style={{
                      padding: '0.3rem 0.8rem',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      backgroundColor:
                        node.difficulty === 'Beginner' ? 'rgba(34, 197, 94, 0.2)' :
                        node.difficulty === 'Intermediate' ? 'rgba(234, 179, 8, 0.2)' :
                        node.difficulty === 'Advanced' ? 'rgba(239, 68, 68, 0.2)' :
                        'rgba(139, 92, 246, 0.2)',
                      color:
                        node.difficulty === 'Beginner' ? '#22c55e' :
                        node.difficulty === 'Intermediate' ? '#eab308' :
                        node.difficulty === 'Advanced' ? '#ef4444' :
                        '#a78bfa',
                      textTransform: 'uppercase'
                    }}>
                      {node.difficulty}
                    </span>
                  </div>
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                    {node.description}
                  </p>
                  {node.prerequisites.length > 0 && (
                    <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Prerequisites: {node.prerequisites.map(p => pathNodes.find(n => n.id === p)?.title).join(', ')}
                    </div>
                  )}
                </div>

                {/* Time & Progress */}
                <div style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', justifyContent: 'flex-end' }}>
                    {React.createElement(Clock, { size: 18, color: 'var(--text-muted)' })}
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{node.estimatedTime}</span>
                  </div>
                  {status === 'in-progress' && (
                    <>
                      <div style={{
                        width: '100px',
                        height: '8px',
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        marginBottom: '0.5rem'
                      }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${nodeProgress}%` }}
                          style={{
                            height: '100%',
                            backgroundColor: 'var(--primary-color)',
                            borderRadius: '4px'
                          }}
                        />
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateProgress(node.id, 'completed', 10, 10);
                        }}
                        style={{
                          padding: '0.4rem 0.8rem',
                          fontSize: '0.8rem',
                          backgroundColor: 'var(--primary-color)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      >
                        Mark Complete
                      </button>
                    </>
                  )}
                  {status === 'completed' && (
                    <span style={{ fontSize: '0.85rem', color: 'var(--secondary-color)', fontWeight: '600' }}>
                      ✓ Completed
                    </span>
                  )}
                  {status === 'available' && (
                    <span style={{ fontSize: '0.85rem', color: 'var(--primary-color)', fontWeight: '600' }}>
                      Ready to Start
                    </span>
                  )}
                </div>
              </div>

              {status === 'locked' && node.prerequisites.length > 0 && (
                <div style={{
                  marginTop: '1rem',
                  padding: '0.75rem',
                  backgroundColor: 'rgba(240, 165, 37, 0.1)',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.85rem',
                  color: '#eab308'
                }}>
                  {React.createElement(AlertCircle, { size: 16 })}
                  Complete prerequisites to unlock
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Recommended Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        style={{
          marginTop: '3rem',
          padding: '2rem',
          background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)',
          borderRadius: '12px',
          border: '1px solid rgba(0, 217, 255, 0.3)'
        }}
      >
        <h3 style={{ marginTop: 0, color: 'var(--primary-color)', marginBottom: '1rem' }}>
          📚 Learning Tips
        </h3>
        <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>Complete all problems in a topic before moving to the next</li>
          <li style={{ marginBottom: '0.5rem' }}>Revisit difficult topics regularly to reinforce concepts</li>
          <li style={{ marginBottom: '0.5rem' }}>Practice Big O notation analysis for each problem</li>
          <li>Try to solve problems yourself before reading solutions</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default LearningPathComponent;
