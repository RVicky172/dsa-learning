import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft } from 'lucide-react';

export interface VisualizationStep {
  text: string;
  highlights: number[];
  dataState?: (string | number)[];
}

export interface VisualizerProps {
  type: 'array' | 'linked-list' | 'binary-tree' | 'graph' | 'stack' | 'queue' | 'heap' | 'hash-table' | 'two-pointer' | 'sorting';
  data?: (string | number)[];
  title?: string;
  description?: string;
  advancedSteps?: VisualizationStep[];
}

const DataStructureVisualizer: React.FC<VisualizerProps> = ({
  type,
  data = [],
  title = '',
  description = '',
  advancedSteps = []
}) => {

  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [step, setStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(1.5); // seconds per step
  // If advancedSteps provided, max steps derived from it
  const maxSteps = advancedSteps.length > 0 ? advancedSteps.length : Math.max(data.length || 5, 6);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setHighlightedIndex(prev => {
        if (prev === null) return 0;
        if (prev >= maxSteps - 1) return 0;
        return prev + 1;
      });
      setStep(prev => (prev + 1) % maxSteps);
    }, speed * 1000);
    return () => clearInterval(timer);
  }, [isPlaying, speed, maxSteps]);

  const handleReset = () => {
    setHighlightedIndex(null);
    setStep(0);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    setIsPlaying(false);
    setHighlightedIndex(prev => {
      if (prev === null || prev === 0) return maxSteps - 1;
      return prev - 1;
    });
  };

  const handleNext = () => {
    setIsPlaying(false);
    setHighlightedIndex(prev => {
      if (prev === null) return 0;
      if (prev >= maxSteps - 1) return 0;
      return prev + 1;
    });
  };

  // Example-based visualizations with meaningful data
  const getExampleData = () => {
    const examples: Record<string, { data: (string | number)[], description: string, steps: string[] }> = {
      'array-search': {
        data: [2, 5, 8, 12, 16, 23, 38, 45],
        description: 'Linear Search: Finding element 23',
        steps: [
          'Start at index 0 (value 2)',
          'Check index 1 (value 5) - not found',
          'Check index 2 (value 8) - not found',
          'Check index 3 (value 12) - not found',
          'Check index 4 (value 16) - not found',
          'Check index 5 (value 23) - FOUND! ✓'
        ]
      },
      'array-binary-search': {
        data: [2, 5, 8, 12, 16, 23, 38, 45],
        description: 'Binary Search: Efficiently finding element 16',
        steps: [
          'Search space: [0-7]',
          'Middle (3): 12 < 16, search right half',
          'Search space: [4-7]',
          'Middle (5): 23 > 16, search left half',
          'Search space: [4-4]',
          'Found at index 4! ✓'
        ]
      },
      'linked-list-insert': {
        data: [10, 20, 30, 40],
        description: 'Linked List: Inserting element 25 after 20',
        steps: [
          'Traverse to node 20',
          'Create new node 25',
          'Point 25 to next (30)',
          'Point 20 to 25',
          'Insertion complete ✓'
        ]
      },
      'stack-operations': {
        data: [1, 2, 3, 4, 5],
        description: 'Stack (LIFO): Push and Pop operations',
        steps: [
          'Stack: [1]',
          'Push 2: [1, 2]',
          'Push 3: [1, 2, 3]',
          'Push 4: [1, 2, 3, 4]',
          'Push 5: [1, 2, 3, 4, 5]',
          'Pop: 5 removed, TOP = 4'
        ]
      },
      'queue-operations': {
        data: [1, 2, 3, 4, 5],
        description: 'Queue (FIFO): Enqueue and Dequeue operations',
        steps: [
          'Queue: [1]',
          'Enqueue 2: [1, 2]',
          'Enqueue 3: [1, 2, 3]',
          'Enqueue 4: [1, 2, 3, 4]',
          'Enqueue 5: [1, 2, 3, 4, 5]',
          'Dequeue: 1 removed, Front = 2'
        ]
      },
      'heap-insert': {
        data: [10, 8, 9, 4, 5, 3, 2],
        description: 'Min Heap: Bubbling up after insert',
        steps: [
          'Initial heap structure',
          'Top = 2 (minimum)',
          'Extract min: 2',
          'Next min: 3',
          'Next min: 4',
          'Next min: 5'
        ]
      },
      'hash-insert': {
        data: ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'],
        description: 'Hash Table: Key-value storage with hashing',
        steps: [
          'Hash(Alice) → Bucket 1',
          'Hash(Bob) → Bucket 0',
          'Hash(Charlie) → Bucket 2',
          'Hash(Diana) → Bucket 1',
          'Hash(Eve) → Bucket 0',
          'All entries hashed ✓'
        ]
      },
      'binary-tree-inorder': {
        data: [10, 5, 15, 3, 7, 12, 18],
        description: 'Binary Search Tree: In-order traversal (Left, Root, Right)',
        steps: [
          'Visit Left Subtree of 10',
          'Visit Left Subtree of 5',
          'Print 3',
          'Print 5',
          'Print 7',
          'Print 10',
          'Visit Right Subtree of 10',
          'Print 12',
          'Print 15',
          'Print 18'
        ]
      },
      'graph-bfs': {
        data: ['A', 'B', 'C', 'D', 'E', 'F'],
        description: 'Graph BFS: Exploring level by level starting from A',
        steps: [
          'Start at Node A',
          'Visit neighbors: B, C',
          'Visit neighbors of B: D, E',
          'Visit neighbors of C: F',
          'All nodes visited ✓'
        ]
      }
    };
    return examples;
  };

  const visualizeArray = () => {
    let arrayData = data.length > 0 ? data : [2, 5, 8, 12, 16, 23, 38, 45];
    let stepText = '';
    let currentHighlights = [highlightedIndex];
    let displayText = description;

    if (advancedSteps.length > 0) {
      const stepData = advancedSteps[step % maxSteps];
      if (stepData.dataState) {
        arrayData = stepData.dataState;
      }
      stepText = stepData.text;
      currentHighlights = stepData.highlights;
      displayText = title || description;
    } else {
      const examples = getExampleData();
      const currentExample = examples['array-search'];
      stepText = currentExample.steps[Math.min(highlightedIndex || 0, currentExample.steps.length - 1)] || '';
      displayText = currentExample.description;
    }

    return (
      <div className="visualization-array">
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
            {displayText}
          </p>
          <p style={{ color: 'var(--primary-color)', fontWeight: '600', fontSize: '0.9rem', minHeight: '1.5rem' }}>
            {stepText}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {arrayData.map((item, idx) => {
            const isHighlighted = currentHighlights.includes(idx);
            return (
              <motion.div
                key={idx}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: isHighlighted ? 1.15 : 1,
                  opacity: 1,
                  backgroundColor: isHighlighted ? 'var(--secondary-color)' : 'var(--primary-color)'
                }}
                transition={{ duration: 0.3 }}
                style={{
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px',
                  color: 'white',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: isHighlighted ? '0 0 15px var(--secondary-color)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
                  border: '2px solid transparent'
                }}
              >
                {item}
              </motion.div>
            );
          })}
        </div>
        <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Step {step + 1} of {maxSteps}
        </div>
      </div>
    );
  };

  const visualizeLinkedList = () => {
    const listData = data.length > 0 ? data : [10, 20, 30, 40];
    const examples = getExampleData();
    const currentExample = examples['linked-list-insert'] || { data: listData, description: '', steps: [] };
    const stepText = currentExample.steps[Math.min(highlightedIndex || 0, currentExample.steps.length - 1)] || '';

    return (
      <div className="visualization-linked-list">
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
            {currentExample.description}
          </p>
          <p style={{ color: 'var(--primary-color)', fontWeight: '600', fontSize: '0.9rem' }}>
            {stepText}
          </p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'center', minWidth: 'fit-content' }}>
            {listData.map((item, idx) => (
              <React.Fragment key={idx}>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: highlightedIndex === idx ? 1.2 : 1,
                    opacity: 1,
                    backgroundColor: highlightedIndex === idx ? 'var(--secondary-color)' : 'var(--primary-color)'
                  }}
                  transition={{ duration: 0.4 }}
                  style={{
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px',
                    color: 'white',
                    fontWeight: '600',
                    boxShadow: highlightedIndex === idx ? '0 0 20px var(--secondary-color)' : '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {item}
                </motion.div>
                {idx < listData.length - 1 && (
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    style={{ fontSize: '1.5rem', color: 'var(--primary-color)' }}
                  >
                    →
                  </motion.div>
                )}
                {idx === listData.length - 1 && <span style={{ color: 'var(--text-muted)' }}>null</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const visualizeStack = () => {
    const stackData = data.length > 0 ? data : [1, 2, 3, 4, 5];
    const examples = getExampleData();
    const currentExample = examples['stack-operations'] || { data: stackData, description: '', steps: [] };
    const stepText = currentExample.steps[Math.min(step % currentExample.steps.length, currentExample.steps.length - 1)] || '';

    return (
      <div>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
            {currentExample.description}
          </p>
          <p style={{ color: 'var(--primary-color)', fontWeight: '600', fontSize: '0.9rem' }}>
            {stepText}
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          {stackData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              style={{
                width: '120px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: idx === stackData.length - 1 ? 'var(--secondary-color)' : 'var(--primary-color)',
                color: 'white',
                fontWeight: '600',
                borderRadius: '8px',
                boxShadow: idx === stackData.length - 1 ? '0 0 20px var(--secondary-color)' : '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}
            >
              {item} {idx === stackData.length - 1 && <span style={{ marginLeft: '0.5rem' }}>← TOP</span>}
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const visualizeQueue = () => {
    const queueData = data.length > 0 ? data : [1, 2, 3, 4, 5];
    const examples = getExampleData();
    const currentExample = examples['queue-operations'] || { data: queueData, description: '', steps: [] };
    const stepText = currentExample.steps[Math.min(step % currentExample.steps.length, currentExample.steps.length - 1)] || '';

    return (
      <div>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
            {currentExample.description}
          </p>
          <p style={{ color: 'var(--primary-color)', fontWeight: '600', fontSize: '0.9rem' }}>
            {stepText}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-muted)' }}>Front</span>
          {queueData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              style={{
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: idx === 0 ? 'var(--secondary-color)' : 'var(--primary-color)',
                color: 'white',
                fontWeight: '600',
                borderRadius: '8px',
                boxShadow: idx === 0 ? '0 0 20px var(--secondary-color)' : '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}
            >
              {item}
            </motion.div>
          ))}
          <span style={{ color: 'var(--text-muted)' }}>Back</span>
        </div>
      </div>
    );
  };

  const visualizeHeap = () => {
    const heapData = data.length > 0 ? data : [10, 8, 9, 4, 5, 3, 2];
    const examples = getExampleData();
    const currentExample = examples['heap-insert'] || { data: heapData, description: '', steps: [] };
    const stepText = currentExample.steps[Math.min(highlightedIndex || 0, currentExample.steps.length - 1)] || '';

    return (
      <div>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
            {currentExample.description}
          </p>
          <p style={{ color: 'var(--primary-color)', fontWeight: '600', fontSize: '0.9rem' }}>
            {stepText}
          </p>
        </div>
        <svg width="100%" height="300" viewBox="0 0 400 300" style={{ maxWidth: '400px', margin: '0 auto' }}>
          {/* Draw connections for heap structure */}
          {heapData.map((_, idx) => {
            const leftChild = 2 * idx + 1;

            if (leftChild < heapData.length) {
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
                />
              );
            }
            return null;
          })}

          {/* Draw heap nodes */}
          {heapData.map((item, idx) => (
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

  const visualizeHashTable = () => {
    const tableData = data.length > 0 ? data.slice(0, 5) : ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'];
    const examples = getExampleData();
    const currentExample = examples['hash-insert'] || { data: tableData, description: '', steps: [] };
    const stepText = currentExample.steps[Math.min(step % currentExample.steps.length, currentExample.steps.length - 1)] || '';

    return (
      <div>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
            {currentExample.description}
          </p>
          <p style={{ color: 'var(--primary-color)', fontWeight: '600', fontSize: '0.9rem' }}>
            {stepText}
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', maxWidth: '500px', margin: '0 auto' }}>
          {tableData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              style={{
                padding: '1rem',
                backgroundColor: 'var(--primary-color)',
                borderRadius: '8px',
                color: 'white',
                textAlign: 'center',
                fontWeight: '600',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}
            >
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Hash {idx}</div>
              <div style={{ fontSize: '0.95rem', marginTop: '0.5rem' }}>{item}</div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const visualizeBinaryTree = () => {
    const treeNodes = [
      { id: 10, x: 200, y: 40 },
      { id: 5, x: 100, y: 120 },
      { id: 15, x: 300, y: 120 },
      { id: 3, x: 50, y: 200 },
      { id: 7, x: 150, y: 200 },
      { id: 12, x: 250, y: 200 },
      { id: 18, x: 350, y: 200 },
    ];
    
    // In-order traversal indices to highlight:
    // 3, 5, 7, 10, 12, 15, 18
    const highlightOrder = [3, 1, 4, 0, 5, 2, 6];
    const currentIndexToHighlight = highlightOrder[Math.min(highlightedIndex || 0, highlightOrder.length - 1)];

    const examples = getExampleData();
    const currentExample = examples['binary-tree-inorder'] || { data: [], description: '', steps: [] };
    const stepText = currentExample.steps[Math.min(highlightedIndex || 0, currentExample.steps.length - 1)] || '';

    return (
      <div>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
            {currentExample.description}
          </p>
          <p style={{ color: 'var(--primary-color)', fontWeight: '600', fontSize: '0.9rem' }}>
            {stepText}
          </p>
        </div>
        <svg width="100%" height="250" viewBox="0 0 400 250" style={{ maxWidth: '400px', margin: '0 auto', display: 'block' }}>
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

  const visualizeGraph = () => {
    // A simple graph layout:
    //    A
    //  /   \
    // B     C
    // | \   |
    // D  E  F
    const graphNodes = [
      { id: 'A', x: 200, y: 40 },
      { id: 'B', x: 100, y: 120 },
      { id: 'C', x: 300, y: 120 },
      { id: 'D', x: 50, y: 220 },
      { id: 'E', x: 150, y: 220 },
      { id: 'F', x: 300, y: 220 },
    ];
    
    // BFS traversal order highlight:
    // A -> B,C -> D,E,F
    const activeNodesByStep = [
      [0],          // A
      [1, 2],       // B, C
      [3, 4],       // D, E (neighbors of B)
      [5],          // F (neighbors of C)
      [0,1,2,3,4,5] // All
    ];
    const currentActiveList = activeNodesByStep[Math.min(highlightedIndex || 0, activeNodesByStep.length - 1)] || [];

    const examples = getExampleData();
    const currentExample = examples['graph-bfs'] || { data: [], description: '', steps: [] };
    const stepText = currentExample.steps[Math.min(highlightedIndex || 0, currentExample.steps.length - 1)] || '';

    return (
      <div>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
            {currentExample.description}
          </p>
          <p style={{ color: 'var(--primary-color)', fontWeight: '600', fontSize: '0.9rem' }}>
            {stepText}
          </p>
        </div>
        <svg width="100%" height="260" viewBox="0 0 400 260" style={{ maxWidth: '400px', margin: '0 auto', display: 'block' }}>
          {/* Edges */}
          <line x1="200" y1="40" x2="100" y2="120" stroke="var(--primary-color)" strokeWidth="2" opacity="0.6" />
          <line x1="200" y1="40" x2="300" y2="120" stroke="var(--primary-color)" strokeWidth="2" opacity="0.6" />
          <line x1="100" y1="120" x2="50" y2="220" stroke="var(--primary-color)" strokeWidth="2" opacity="0.6" />
          <line x1="100" y1="120" x2="150" y2="220" stroke="var(--primary-color)" strokeWidth="2" opacity="0.6" />
          <line x1="300" y1="120" x2="300" y2="220" stroke="var(--primary-color)" strokeWidth="2" opacity="0.6" />
          
          {/* Additional Graph edge to make it explicitly not just a tree */}
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

  const renderVisualization = () => {
    switch (type) {
      case 'array':
        return visualizeArray();
      case 'linked-list':
        return visualizeLinkedList();
      case 'binary-tree':
        return visualizeBinaryTree();
      case 'graph':
        return visualizeGraph();
      case 'stack':
        return visualizeStack();
      case 'queue':
        return visualizeQueue();
      case 'heap':
        return visualizeHeap();
      case 'hash-table':
        return visualizeHashTable();
      case 'sorting':
      case 'two-pointer':
        return visualizeArray(); // sorting and two-pointer reuse array layout with advanced steps
      default:
        return visualizeArray();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        padding: '2rem',
        backgroundColor: 'rgba(0, 217, 255, 0.05)',
        borderRadius: '12px',
        border: '1px solid rgba(0, 217, 255, 0.2)',
        marginTop: '2rem'
      }}
    >
      {title && <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary-color)' }}>{title}</h3>}
      {description && <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.95rem', color: 'var(--text-muted)' }}>{description}</p>}
      <div style={{ minHeight: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {renderVisualization()}
      </div>

      {/* Controls */}
      <div style={{
        marginTop: '2rem',
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '1rem',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: '8px'
      }}>
        {/* Play/Pause */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.6rem 1rem',
            backgroundColor: isPlaying ? 'var(--secondary-color)' : 'var(--primary-color)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {React.createElement(isPlaying ? Pause : Play, { size: 18 })}
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        {/* Previous Step */}
        <button
          onClick={handlePrevious}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0.6rem 0.8rem',
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {React.createElement(ChevronLeft, { size: 18 })}
        </button>

        {/* Step counter */}
        <span style={{
          padding: '0.6rem 1rem',
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
          borderRadius: '6px',
          color: 'var(--text-muted)',
          fontSize: '0.9rem',
          fontWeight: '600',
          border: '1px solid var(--primary-color)'
        }}>
          Step {(highlightedIndex ?? 0) + 1} / {maxSteps}
        </span>

        {/* Next Step */}
        <button
          onClick={handleNext}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0.6rem 0.8rem',
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {React.createElement(ChevronRight, { size: 18 })}
        </button>

        {/* Reset */}
        <button
          onClick={handleReset}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.6rem 1rem',
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {React.createElement(RotateCcw, { size: 18 })}
          Reset
        </button>

        {/* Speed Control */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.6rem 1rem',
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
          borderRadius: '6px',
          border: '1px solid var(--primary-color)'
        }}>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
            Speed:
          </label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.5"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            style={{
              width: '80px',
              cursor: 'pointer'
            }}
          />
          <span style={{ fontSize: '0.85rem', color: 'var(--primary-color)', minWidth: '30px' }}>
            {(4 - speed).toFixed(1)}x
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default DataStructureVisualizer;
