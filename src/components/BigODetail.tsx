import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Clock, HardDrive, Zap, Info, TrendingUp, BookOpen, Code, Activity, Search, Database, Layers, CheckCircle2 } from 'lucide-react';

interface ComplexityExample {
    id: string;
    name: string;
    complexity: string;
    color: string;
    code: string;
    annotations: { line: number; text: string; count: string }[];
    totalExplanation: string;
    spaceComplexity: string;
    spaceExplanation: string;
    realWorld: string;
}

const complexityExamples: ComplexityExample[] = [
    {
        id: 'constant',
        name: 'O(1) - Constant Time',
        complexity: 'O(1)',
        color: '#10b981',
        code: `function getFirstElement(arr) {
  return arr[0];  // Direct memory access
}

function swap(a, b) {
  let temp = a;   // 1 operation
  a = b;          // 1 operation  
  b = temp;       // 1 operation
  return [a, b];
}`,
        annotations: [
            { line: 2, text: 'Array index access is O(1)', count: '1' },
            { line: 6, text: 'Variable assignment', count: '1' },
            { line: 7, text: 'Variable assignment', count: '1' },
            { line: 8, text: 'Variable assignment', count: '1' },
        ],
        totalExplanation: 'Total operations: 1 + 1 + 1 = 3 (constant). No matter the input size (n=10 or n=1,000,000), we do the same number of operations. ∴ O(1)',
        spaceComplexity: 'O(1)',
        spaceExplanation: 'Uses fixed number of variables (temp, a, b) regardless of input size.',
        realWorld: 'Accessing an element in an array by index, looking up a key in a Hash Map (on average), or pushing/popping from a stack.'
    },
    {
        id: 'logarithmic',
        name: 'O(log n) - Logarithmic Time',
        complexity: 'O(log n)',
        color: '#f97316',
        code: `function binarySearch(arr, target) {
  let left = 0;                    
  let right = arr.length - 1;      
  
  while (left <= right) {          // How many times?
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    }
    
    if (arr[mid] < target) {
      left = mid + 1;              // Halve the search space
    } else {
      right = mid - 1;             // Halve the search space
    }
  }
  return -1;
}`,
        annotations: [
            { line: 2, text: 'Initialize left pointer', count: '1' },
            { line: 3, text: 'Initialize right pointer', count: '1' },
            { line: 5, text: 'Loop runs log₂(n) times because we halve search space each iteration', count: 'log₂(n)' },
            { line: 6, text: 'Calculate midpoint', count: 'log₂(n)' },
            { line: 12, text: 'Each iteration eliminates half of remaining elements', count: 'log₂(n)' },
        ],
        totalExplanation: 'n=16: 16→8→4→2→1 = 4 iterations. n=1024: only 10 iterations! Each iteration halves the input. ∴ O(log n)',
        spaceComplexity: 'O(1)',
        spaceExplanation: 'Only uses left, right, mid pointers. No extra space proportional to input.',
        realWorld: 'Binary Search in a sorted array, finding an element in a balanced Binary Search Tree (BST).'
    },
    {
        id: 'linear',
        name: 'O(n) - Linear Time',
        complexity: 'O(n)',
        color: '#6366f1',
        code: `function findMax(arr) {
  let max = arr[0];                // 1 operation
  
  for (let i = 1; i < arr.length; i++) {  // n-1 iterations
    if (arr[i] > max) {            // 1 comparison per iteration
      max = arr[i];                // 0-1 assignment per iteration
    }
  }
  
  return max;
}`,
        annotations: [
            { line: 2, text: 'Initialize max variable', count: '1' },
            { line: 4, text: 'Loop runs n-1 times (visits each element once)', count: 'n-1' },
            { line: 5, text: 'Compare current element with max', count: 'n-1' },
            { line: 6, text: 'Possibly update max', count: '0 to n-1' },
        ],
        totalExplanation: 'We visit each element exactly once. 1 + (n-1) + (n-1) = 2n - 1. Drop constants and lower terms → O(n)',
        spaceComplexity: 'O(1)',
        spaceExplanation: 'Only one extra variable (max) regardless of array size.',
        realWorld: 'Linear Search, finding the maximum/minimum element in an unsorted list, summing all elements in an array.'
    },
    {
        id: 'linearithmic',
        name: 'O(n log n) - Linearithmic Time',
        complexity: 'O(n log n)',
        color: '#8b5cf6',
        code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;  // Base case
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));   // Recurse left
  const right = mergeSort(arr.slice(mid));     // Recurse right
  
  return merge(left, right);                    // Merge: O(n)
}`,
        annotations: [
            { line: 4, text: 'Split array in half', count: '1' },
            { line: 5, text: 'Recursively sort left half', count: 'T(n/2)' },
            { line: 6, text: 'Recursively sort right half', count: 'T(n/2)' },
            { line: 8, text: 'Merge two sorted halves', count: 'n' },
        ],
        totalExplanation: 'Array splits log(n) times (the depth of recursion). At each level, we merge all n elements. log(n) levels × n work = O(n log n)',
        spaceComplexity: 'O(n)',
        spaceExplanation: 'Creates new arrays during splitting. Recursion stack is O(log n), but merged arrays need O(n) space.',
        realWorld: 'Efficient comparison-based sorting algorithms like Merge Sort, Quick Sort (average case), and Heap Sort.'
    },
    {
        id: 'quadratic',
        name: 'O(n²) - Quadratic Time',
        complexity: 'O(n²)',
        color: '#f59e0b',
        code: `function bubbleSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n; i++) {           // Outer loop: n times
    for (let j = 0; j < n - i - 1; j++) { // Inner loop: n-i-1 times
      if (arr[j] > arr[j + 1]) {          // Compare adjacent
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
        annotations: [
            { line: 4, text: 'Outer loop runs n times', count: 'n' },
            { line: 5, text: 'Inner loop runs (n-1), (n-2), ... 1 times', count: 'n-i-1' },
            { line: 6, text: 'Compare adjacent elements', count: 'n(n-1)/2' },
            { line: 8, text: 'Swap if needed', count: '0 to n(n-1)/2' },
        ],
        totalExplanation: 'Nested loops! Every element compared with every other element. Total operations ≈ n(n-1)/2 ≈ n²/2. Drop constants → O(n²)',
        spaceComplexity: 'O(1)',
        spaceExplanation: 'Sorts in-place. Only uses a small constant amount of extra space (temp variable).',
        realWorld: 'Simple sorting algorithms like Bubble Sort, Insertion Sort, or finding all possible pairs in a list.'
    },
    {
        id: 'cubic',
        name: 'O(n³) - Cubic Time',
        complexity: 'O(n³)',
        color: '#ec4899',
        code: `function matrixMultiply(A, B) {
  const n = A.length;
  const C = new Array(n).fill().map(() => new Array(n).fill(0));
  
  for (let i = 0; i < n; i++) {           // n times
    for (let j = 0; j < n; j++) {         // n times per i
      for (let k = 0; k < n; k++) {       // n times per j
        C[i][j] += A[i][k] * B[k][j];     // Multiply and add
      }
    }
  }
  return C;
}`,
        annotations: [
            { line: 5, text: 'Outer loop over rows', count: 'n' },
            { line: 6, text: 'Middle loop over columns', count: 'n' },
            { line: 7, text: 'Inner loop over elements', count: 'n' },
            { line: 8, text: 'Multiplication and addition', count: '1' },
        ],
        totalExplanation: 'Three nested loops: n × n × n = n³ operations. Common in matrix operations and some graph algorithms.',
        spaceComplexity: 'O(n²)',
        spaceExplanation: 'Result matrix requires n×n space, plus input matrices.',
        realWorld: 'Matrix multiplication, Floyd-Warshall algorithm for all-pairs shortest paths, some dynamic programming solutions.'
    },
    {
        id: 'exponential',
        name: 'O(2ⁿ) - Exponential Time',
        complexity: 'O(2ⁿ)',
        color: '#ef4444',
        code: `function fibonacci(n) {
  if (n <= 1) return n;           // Base case
  
  return fibonacci(n - 1) +       // Call 1
         fibonacci(n - 2);        // Call 2
}`,
        annotations: [
            { line: 2, text: 'Base case: O(1)', count: '1' },
            { line: 4, text: 'Recursive call 1', count: 'T(n-1)' },
            { line: 5, text: 'Recursive call 2', count: 'T(n-2)' },
        ],
        totalExplanation: 'Each call spawns 2 more recursive calls. The number of calls doubles at each level of the recursion tree. For n=40, this is ~1 trillion calls! ∴ O(2ⁿ)',
        spaceComplexity: 'O(n)',
        spaceExplanation: 'Recursion stack depth is n (following one branch down). Each stack frame uses O(1) space.',
        realWorld: 'Brute-force solvers for N-Queens, Traveling Salesperson Problem (naive approach), generating all subsets of a set.'
    },
    {
        id: 'factorial',
        name: 'O(n!) - Factorial Time',
        complexity: 'O(n!)',
        color: '#7c3aed',
        code: `function permutations(arr, n = arr.length) {
  if (n === 1) return [arr.slice()];  // Base case
  
  const result = [];
  for (let i = 0; i < n; i++) {
    // Swap current element with first
    [arr[0], arr[i]] = [arr[i], arr[0]];
    
    // Recurse on remaining elements
    const perms = permutations(arr, n - 1);
    result.push(...perms);
    
    // Backtrack
    [arr[0], arr[i]] = [arr[i], arr[0]];
  }
  return result;
}`,
        annotations: [
            { line: 2, text: 'Base case', count: '1' },
            { line: 5, text: 'Loop over remaining elements', count: 'n' },
            { line: 9, text: 'Recursive call on n-1 elements', count: 'T(n-1)' },
            { line: 10, text: 'Add permutations to result', count: '1' },
        ],
        totalExplanation: 'For n=3: 3! = 6 permutations. For n=10: 3.6 million. Each additional element multiplies work by n. ∴ O(n!)',
        spaceComplexity: 'O(n!)',
        spaceExplanation: 'Must store all n! permutations in memory.',
        realWorld: 'Generating all permutations, brute-force solutions to traveling salesman problem, some combinatorial problems.'
    }
];

const ComplexityGraph = () => {
    const width = 600;
    const height = 400;
    const padding = 50;
    const [hoveredComplexity, setHoveredComplexity] = useState<string | null>(null);

    const factorial = (n: number): number => {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    };

    const generatePath = (complexity: string, color: string, isHovered: boolean = false) => {
        const points: [number, number][] = [];
        const nSteps = 60;
        const maxN = 20;

        for (let i = 0; i <= nSteps; i++) {
            const n = (i / nSteps) * maxN;
            let y = 0;

            switch (complexity) {
                case 'O(1)': y = 1; break;
                case 'O(log n)': y = Math.log2(n + 1); break;
                case 'O(n)': y = n; break;
                case 'O(n log n)': y = n * Math.log2(n + 1); break;
                case 'O(n²)': y = n * n; break;
                case 'O(n³)': y = n * n * n; break;
                case 'O(2ⁿ)': y = Math.pow(2, n); break;
                case 'O(n!)': y = factorial(n); break;
            }

            // Normalize Y using log scale for better visualization
            const logY = Math.log10(y + 1);
            const maxLogY = Math.log10(Math.pow(2, maxN) + 1);
            const mappedX = padding + (n / maxN) * (width - 2 * padding);
            const mappedY = height - padding - (logY / maxLogY) * (height - 2 * padding);

            if (mappedY >= padding) {
                points.push([mappedX, mappedY]);
            }
        }

        return (
            <g>
                {/* Main path */}
                <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2.5, ease: "easeInOut", delay: complexityExamples.findIndex(ex => ex.complexity === complexity) * 0.1 }}
                    d={`M ${points.map(p => p.join(',')).join(' L ')}`}
                    fill="none"
                    stroke={color}
                    strokeWidth={isHovered ? "4" : "3"}
                    strokeLinecap="round"
                    filter={isHovered ? "drop-shadow(0 0 8px rgba(255,255,255,0.3))" : "none"}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setHoveredComplexity(complexity)}
                    onMouseLeave={() => setHoveredComplexity(null)}
                />

                {/* Data points for interactivity */}
                {points.filter((_, i) => i % 10 === 0).map((point, i) => (
                    <circle
                        key={i}
                        cx={point[0]}
                        cy={point[1]}
                        r={isHovered ? "3" : "2"}
                        fill={color}
                        opacity={isHovered ? 0.8 : 0.4}
                        style={{ transition: 'all 0.2s ease' }}
                    />
                ))}
            </g>
        );
    };

    const getComplexityInfo = (complexity: string) => {
        return complexityExamples.find(ex => ex.complexity === complexity);
    };

    return (
        <div className="glass" style={{
            padding: '2.5rem',
            position: 'relative',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '20px',
            backdropFilter: 'blur(20px)'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2.5rem',
                padding: '1rem 1.5rem',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
                borderRadius: '15px',
                border: '1px solid rgba(99, 102, 241, 0.2)'
            }}>
                <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4)'
                }}>
                    <TrendingUp size={24} color="white" />
                </div>
                <div>
                    <h3 style={{
                        fontSize: '2rem',
                        margin: 0,
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        fontWeight: '800'
                    }}>
                        Growth Rate Visualization
                    </h3>
                    <p style={{
                        margin: '0.5rem 0 0 0',
                        color: 'var(--text-muted)',
                        fontSize: '1rem'
                    }}>
                        Interactive comparison • Hover to highlight • Logarithmic scale
                    </p>
                </div>
            </div>

            <div style={{ position: 'relative', height: '450px', width: '100%', marginTop: '1rem' }}>
                <svg viewBox={`0 0 ${width} ${height}`} style={{
                    width: '100%',
                    height: '100%',
                    overflow: 'visible',
                    filter: 'drop-shadow(0 12px 40px rgba(0,0,0,0.15))'
                }}>
                    {/* Enhanced Background */}
                    <defs>
                        <linearGradient id="graphBg" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(99, 102, 241, 0.08)" />
                            <stop offset="50%" stopColor="rgba(168, 85, 247, 0.06)" />
                            <stop offset="100%" stopColor="rgba(236, 72, 153, 0.04)" />
                        </linearGradient>
                        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="rgba(99, 102, 241, 0.1)" />
                            <stop offset="100%" stopColor="transparent" />
                        </radialGradient>
                        <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
                        </pattern>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Background with subtle grid */}
                    <rect
                        x={padding - 20}
                        y={padding - 20}
                        width={width - 2 * padding + 40}
                        height={height - 2 * padding + 40}
                        fill="url(#graphBg)"
                        rx="20"
                    />
                    <rect
                        x={padding - 20}
                        y={padding - 20}
                        width={width - 2 * padding + 40}
                        height={height - 2 * padding + 40}
                        fill="url(#centerGlow)"
                        rx="20"
                    />
                    <rect
                        x={padding}
                        y={padding}
                        width={width - 2 * padding}
                        height={height - 2 * padding}
                        fill="url(#gridPattern)"
                        opacity="0.3"
                    />

                    {/* Enhanced Grid Lines */}
                    {Array.from({ length: 8 }, (_, i) => (
                        <g key={i}>
                            <line
                                x1={padding}
                                y1={padding + (i * (height - 2 * padding) / 7)}
                                x2={width - padding}
                                y2={padding + (i * (height - 2 * padding) / 7)}
                                stroke="rgba(255,255,255,0.08)"
                                strokeWidth="1"
                                strokeDasharray="1,3"
                            />
                            <text
                                x={padding - 25}
                                y={padding + (i * (height - 2 * padding) / 7) + 4}
                                fill="var(--text-dim)"
                                fontSize="11"
                                textAnchor="end"
                                fontWeight="500"
                            >
                                {Math.round(Math.pow(10, (7 - i) * 0.4))}
                            </text>
                        </g>
                    ))}

                    {/* Vertical grid lines */}
                    {Array.from({ length: 6 }, (_, i) => (
                        <line
                            key={i}
                            x1={padding + (i * (width - 2 * padding) / 5)}
                            y1={padding}
                            x2={padding + (i * (width - 2 * padding) / 5)}
                            y2={height - padding}
                            stroke="rgba(255,255,255,0.06)"
                            strokeWidth="1"
                            strokeDasharray="1,3"
                        />
                    ))}

                    {/* Enhanced Axis lines */}
                    <line
                        x1={padding}
                        y1={height - padding}
                        x2={width - padding}
                        y2={height - padding}
                        stroke="rgba(255,255,255,0.4)"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                    <line
                        x1={padding}
                        y1={padding}
                        x2={padding}
                        y2={height - padding}
                        stroke="rgba(255,255,255,0.4)"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />

                    {/* Complexity Paths */}
                    {complexityExamples.map(ex => generatePath(ex.complexity, ex.color, hoveredComplexity === ex.complexity))}

                    {/* Enhanced Axis Labels */}
                    <text
                        x={width / 2}
                        y={height - 15}
                        fill="var(--text-main)"
                        fontSize="14"
                        textAnchor="middle"
                        fontWeight="700"
                        opacity="0.9"
                    >
                        Input Size (n)
                    </text>
                    <text
                        x={20}
                        y={height / 2}
                        fill="var(--text-main)"
                        fontSize="14"
                        textAnchor="middle"
                        transform={`rotate(-90, 20, ${height / 2})`}
                        fontWeight="700"
                        opacity="0.9"
                    >
                        Operations (log scale)
                    </text>

                    {/* Enhanced X-axis markers */}
                    {[0, 4, 8, 12, 16, 20].map(n => (
                        <g key={n}>
                            <line
                                x1={padding + (n / 20) * (width - 2 * padding)}
                                y1={height - padding - 5}
                                x2={padding + (n / 20) * (width - 2 * padding)}
                                y2={height - padding + 5}
                                stroke="var(--text-dim)"
                                strokeWidth="2"
                            />
                            <text
                                x={padding + (n / 20) * (width - 2 * padding)}
                                y={height - padding + 25}
                                fill="var(--text-dim)"
                                fontSize="12"
                                textAnchor="middle"
                                fontWeight="600"
                            >
                                {n}
                            </text>
                        </g>
                    ))}
                </svg>

                {/* Enhanced Legend */}
                <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '0.5rem',
                    background: 'rgba(0,0,0,0.6)',
                    padding: '1.5rem',
                    borderRadius: '20px',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
                    maxWidth: '280px'
                }}>
                    {complexityExamples.map(ex => (
                        <motion.div
                            key={ex.id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                background: hoveredComplexity === ex.complexity ? 'rgba(255,255,255,0.15)' : 'transparent',
                                border: hoveredComplexity === ex.complexity ? `1px solid ${ex.color}40` : '1px solid transparent',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                backdropFilter: hoveredComplexity === ex.complexity ? 'blur(10px)' : 'none'
                            }}
                            onMouseEnter={() => setHoveredComplexity(ex.complexity)}
                            onMouseLeave={() => setHoveredComplexity(null)}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div style={{
                                width: '16px',
                                height: '16px',
                                borderRadius: '50%',
                                background: `linear-gradient(135deg, ${ex.color} 0%, ${ex.color}dd 100%)`,
                                boxShadow: hoveredComplexity === ex.complexity ? `0 0 16px ${ex.color}60` : `0 0 8px ${ex.color}30`,
                                transition: 'all 0.3s ease',
                                border: '2px solid rgba(255,255,255,0.2)'
                            }} />
                            <span style={{
                                color: hoveredComplexity === ex.complexity ? ex.color : 'var(--text-main)',
                                fontWeight: hoveredComplexity === ex.complexity ? '800' : '600',
                                fontSize: '0.9rem',
                                transition: 'all 0.3s ease',
                                textShadow: hoveredComplexity === ex.complexity ? `0 0 8px ${ex.color}40` : 'none'
                            }}>
                                {ex.complexity}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* Enhanced Tooltip */}
                {hoveredComplexity && (
                    <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.9 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        style={{
                            position: 'absolute',
                            top: '60%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            background: 'rgba(0,0,0,0.95)',
                            padding: '1.5rem 2rem',
                            borderRadius: '16px',
                            border: `2px solid ${getComplexityInfo(hoveredComplexity)?.color}60`,
                            boxShadow: `0 16px 48px ${getComplexityInfo(hoveredComplexity)?.color}25`,
                            backdropFilter: 'blur(20px)',
                            pointerEvents: 'none',
                            zIndex: 1000,
                            minWidth: '300px'
                        }}
                    >
                        <div style={{
                            color: getComplexityInfo(hoveredComplexity)?.color,
                            fontWeight: '800',
                            fontSize: '1.3rem',
                            marginBottom: '0.75rem',
                            textAlign: 'center',
                            textShadow: `0 0 12px ${getComplexityInfo(hoveredComplexity)?.color}40`
                        }}>
                            {getComplexityInfo(hoveredComplexity)?.name}
                        </div>
                        <div style={{
                            color: 'var(--text-muted)',
                            fontSize: '0.95rem',
                            lineHeight: '1.6',
                            textAlign: 'center'
                        }}>
                            {getComplexityInfo(hoveredComplexity)?.realWorld.split(',')[0]}
                        </div>
                        <div style={{
                            width: '100%',
                            height: '3px',
                            background: `linear-gradient(90deg, transparent 0%, ${getComplexityInfo(hoveredComplexity)?.color} 50%, transparent 100%)`,
                            borderRadius: '2px',
                            marginTop: '1rem'
                        }} />
                    </motion.div>
                )}
            </div>
        </div>
    );
};

const BigODetail = () => {
    const [selectedExample, setSelectedExample] = useState(complexityExamples[0]);
    const [highlightedLine, setHighlightedLine] = useState<number | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [currentAnnotationIndex, setCurrentAnnotationIndex] = useState(0);

    // Add responsive styles
    const responsiveStyles = `
        <style>
            @media (max-width: 1200px) {
                .main-content-grid {
                    grid-template-columns: 1fr 1fr !important;
                    gap: 2rem !important;
                }
            }
            @media (max-width: 768px) {
                .main-content-grid {
                    grid-template-columns: 1fr !important;
                    gap: 1.5rem !important;
                }
                .code-panel, .graph-panel, .analysis-panel {
                    min-height: auto !important;
                }
            }
            @media (max-width: 480px) {
                .complexity-selector {
                    flex-direction: column !important;
                    gap: 0.5rem !important;
                }
                .complexity-selector button {
                    width: 100% !important;
                    justify-content: center !important;
                }
            }
        </style>
    `;

    const startAnimation = () => {
        setIsAnimating(true);
        setCurrentAnnotationIndex(0);

        const animate = (index: number) => {
            if (index >= selectedExample.annotations.length) {
                setIsAnimating(false);
                setHighlightedLine(null);
                return;
            }

            setHighlightedLine(selectedExample.annotations[index].line);
            setCurrentAnnotationIndex(index);

            setTimeout(() => animate(index + 1), 2000);
        };

        animate(0);
    };

    const resetAnimation = () => {
        setIsAnimating(false);
        setHighlightedLine(null);
        setCurrentAnnotationIndex(0);
    };

    const codeLines = selectedExample.code.split('\n');

    return (
        <>
            <div dangerouslySetInnerHTML={{ __html: responsiveStyles }} />
            <section id="big-o" className="container" style={{ padding: '8rem 0' }}>
            {/* Big O Hero Section */}
            <div style={{ marginBottom: '6rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '5rem', position: 'relative' }}>
                    
                    {/* Background glowing orb */}
                    <div style={{ 
                        position: 'absolute', 
                        top: '50%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)', 
                        width: '600px', 
                        height: '600px', 
                        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, rgba(236, 72, 153, 0.05) 50%, transparent 70%)',
                        filter: 'blur(60px)',
                        zIndex: -1,
                        pointerEvents: 'none'
                    }} />

                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 1.25rem', borderRadius: '99px', background: 'var(--primary-gradient)', color: 'white', marginBottom: '2rem', boxShadow: '0 4px 20px rgba(245, 158, 11, 0.3)' }}
                    >
                        <Zap size={16} fill="currentColor" />
                        <span style={{ fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Foundational Concept</span>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={{ fontSize: '4.5rem', marginBottom: '1.5rem', letterSpacing: '-0.02em', lineHeight: '1.1' }}
                    >
                        The Language of <br/>
                        <span style={{ 
                            background: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            display: 'inline-block'
                        }}>Efficiency</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{ color: 'var(--text-muted)', fontSize: '1.3rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}
                    >
                        Big O notation is a mathematical tool used to describe the limiting behavior of a function. In computer science, it's the standard for analyzing the <strong style={{ color: 'var(--text-main)' }}>scalability</strong> and <strong style={{ color: 'var(--text-main)' }}>performance</strong> of algorithms as input sizes grow towards infinity.
                    </motion.p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                    <div className="glass" style={{ padding: '2.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            <Info size={24} className="gradient-text" />
                            <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Detailed Summary</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div style={{ padding: '1.25rem', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)' }}>
                                <h4 style={{ color: 'var(--primary-light)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Why It Matters</h4>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                    Computers differ in processing power, but Big O remains constant across all hardware. It focuses on how an algorithm's requirements (time or space) grow relative to the input size (n).
                                </p>
                            </div>
                            <div style={{ padding: '1.25rem', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)' }}>
                                <h4 style={{ color: 'var(--secondary-light)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Worst-Case Analysis</h4>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                    While we sometimes use average-case, Big O usually provides a <strong>Worst-Case</strong> guarantee. It ensures that the algorithm will never perform slower than the derived complexity.
                                </p>
                            </div>
                            <div style={{ padding: '1.25rem', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)' }}>
                                <h4 style={{ color: '#ec4899', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Asymptotic Growth</h4>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                    When input size is massive, constant factors and lower-order terms become irrelevant. Big O simplifies expressions (e.g., 2n² + 5n + 100 becomes O(n²)) to highlight the dominant trend.
                                </p>
                            </div>
                        </div>
                    </div>
                    <ComplexityGraph />
                </div>
            </div>

            {/* Theoretical Foundations */}
            <div style={{ marginBottom: '4rem' }}>
                <div className="glass" style={{ padding: '3rem' }}>
                    <h3 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Theoretical <span className="gradient-text">Foundations</span></h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' }}>
                        <div style={{ padding: '1.5rem', borderLeft: '4px solid #ef4444', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '0 12px 12px 0' }}>
                            <h4 style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '1.25rem' }}>Big O (O)</h4>
                            <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Upper Bound (Worst Case)</p>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                Describes the <strong>maximum</strong> time an algorithm could take. It guarantees that the algorithm will never be slower than this.
                            </p>
                            <div style={{ marginTop: '1rem', fontStyle: 'italic', fontSize: '0.85rem' }}>"f(n) is O(g(n)) if f(n) ≤ c · g(n)"</div>
                        </div>
                        <div style={{ padding: '1.5rem', borderLeft: '4px solid #10b981', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '0 12px 12px 0' }}>
                            <h4 style={{ color: '#10b981', marginBottom: '1rem', fontSize: '1.25rem' }}>Big Omega (Ω)</h4>
                            <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Lower Bound (Best Case)</p>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                Describes the <strong>minimum</strong> time an algorithm could take. It guarantees that the algorithm will never be faster than this.
                            </p>
                            <div style={{ marginTop: '1rem', fontStyle: 'italic', fontSize: '0.85rem' }}>"f(n) is Ω(g(n)) if f(n) ≥ c · g(n)"</div>
                        </div>
                        <div style={{ padding: '1.5rem', borderLeft: '4px solid #f97316', background: 'rgba(249, 115, 22, 0.05)', borderRadius: '0 12px 12px 0' }}>
                            <h4 style={{ color: '#f97316', marginBottom: '1rem', fontSize: '1.25rem' }}>Big Theta (Θ)</h4>
                            <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Tight Bound (Average Case)</p>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                Describes the <strong>exact</strong> growth rate. An algorithm is Θ(g(n)) if it is both O(g(n)) and Ω(g(n)).
                            </p>
                            <div style={{ marginTop: '1rem', fontStyle: 'italic', fontSize: '0.85rem' }}>"f(n) is Θ(g(n)) if c₁g(n) ≤ f(n) ≤ c₂g(n)"</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                    Algorithm <span className="gradient-text">Counting & Analysis</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
                    Learn to count operations and analyze algorithm efficiency. Click on any complexity to see step-by-step analysis.
                </p>
            </div>

            {/* Complexity Selector Array */}
            <div className="complexity-selector" style={{
                display: 'flex',
                gap: '0.75rem',
                marginBottom: '3rem',
                overflowX: 'auto',
                padding: '0.5rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.05)',
                maxWidth: 'fit-content',
                margin: '0 auto 4rem auto'
            }}>
                {complexityExamples.map((example) => {
                    const isSelected = selectedExample.id === example.id;
                    return (
                        <motion.button
                            key={example.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => { setSelectedExample(example); resetAnimation(); }}
                            style={{
                                padding: '0.8rem 1.5rem',
                                borderRadius: '16px',
                                border: isSelected ? `1px solid ${example.color}50` : '1px solid transparent',
                                background: isSelected ? `${example.color}15` : 'transparent',
                                color: isSelected ? example.color : 'var(--text-muted)',
                                cursor: 'pointer',
                                fontWeight: isSelected ? '700' : '500',
                                fontSize: '0.95rem',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                boxShadow: isSelected ? `0 8px 24px ${example.color}20, inset 0 0 12px ${example.color}10` : 'none'
                            }}
                        >
                            <div style={{
                                width: '8px', height: '8px', borderRadius: '50%', background: example.color,
                                filter: isSelected ? `drop-shadow(0 0 6px ${example.color})` : 'none',
                                opacity: isSelected ? 1 : 0.5
                            }} />
                            {example.complexity}
                        </motion.button>
                    );
                })}
            </div>

            {/* Main Content Grid - Improved Layout */}
            <div className="main-content-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(400px, 1.5fr) minmax(300px, 1fr) minmax(350px, 1.2fr)',
                gap: '2.5rem',
                alignItems: 'start'
            }}>
                {/* Code Panel - Enhanced */}
                <div className="glass" style={{
                    padding: '0',
                    minHeight: '600px',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                }}>
                    {/* Mac-style Window Header */}
                    <div style={{
                        padding: '1rem 1.5rem',
                        background: 'rgba(0,0,0,0.4)',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444', boxShadow: 'inset 0 0 2px rgba(0,0,0,0.2)' }}></div>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b', boxShadow: 'inset 0 0 2px rgba(0,0,0,0.2)' }}></div>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981', boxShadow: 'inset 0 0 2px rgba(0,0,0,0.2)' }}></div>
                        </div>
                        <div style={{
                            fontSize: '0.85rem',
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--text-muted)',
                            background: 'rgba(255,255,255,0.05)',
                            padding: '0.3rem 1rem',
                            borderRadius: '99px',
                            border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            algorithm.js
                        </div>
                        <div style={{ width: '48px', display: 'flex', justifyContent: 'flex-end', opacity: 0.5 }}>
                            <Code size={16} />
                        </div>
                    </div>

                    <div style={{ padding: '2rem 2.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '1.5rem',
                            flexWrap: 'wrap',
                            gap: '1rem'
                        }}>
                            <h3 style={{
                                color: 'var(--text-main)',
                                fontSize: '1.6rem',
                                margin: 0,
                                lineHeight: '1.3',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                fontWeight: '700'
                            }}>
                                <div style={{
                                    width: '14px',
                                    height: '14px',
                                    borderRadius: '50%',
                                    background: selectedExample.color,
                                    boxShadow: `0 0 12px ${selectedExample.color}`,
                                    position: 'relative'
                                }}>
                                    <div style={{
                                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                        width: '6px', height: '6px', borderRadius: '50%', background: 'white'
                                    }}/>
                                </div>
                                {selectedExample.name.split(' - ')[0]}
                            </h3>
                            <div style={{
                                display: 'flex',
                                gap: '0.75rem',
                                flexShrink: 0
                            }}>
                                <button
                                    onClick={isAnimating ? resetAnimation : startAnimation}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.6rem 1.2rem',
                                        borderRadius: '10px',
                                        background: selectedExample.color,
                                        color: 'white',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontWeight: '700',
                                        fontSize: '0.9rem',
                                        boxShadow: `0 4px 15px ${selectedExample.color}40`,
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {isAnimating ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                                    {isAnimating ? 'Pause' : 'Animate Analysis'}
                                </button>
                                <button
                                    onClick={resetAnimation}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.6rem 1.2rem',
                                        borderRadius: '10px',
                                        background: 'rgba(255,255,255,0.05)',
                                        color: 'var(--text-main)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        cursor: 'pointer',
                                        fontWeight: '600',
                                        fontSize: '0.9rem',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <RotateCcw size={16} />
                                    Reset
                                </button>
                            </div>
                        </div>

                        {/* Code with Line Numbers - Improved */}
                        <div style={{
                            flex: 1,
                            overflow: 'hidden',
                            borderRadius: '12px',
                            backgroundColor: '#0a0a0a', /* darker background for IDE feel */
                            border: '1px solid rgba(255,255,255,0.08)',
                            boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)',
                            position: 'relative'
                        }}>
                            <pre style={{
                                padding: '2rem 0',
                                margin: 0,
                                fontSize: '0.95rem',
                                lineHeight: '1.9',
                                overflowX: 'auto',
                                overflowY: 'auto',
                                maxHeight: '500px',
                                whiteSpace: 'pre-wrap',
                                wordWrap: 'break-word',
                                fontFamily: "'JetBrains Mono', 'Courier New', Courier, monospace"
                            }}>
                                {codeLines.map((line, index) => {
                                    const lineNum = index + 1;
                                    const annotation = selectedExample.annotations.find(a => a.line === lineNum);
                                    const isHighlighted = highlightedLine === lineNum;

                                    return (
                                        <div
                                            key={index}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                backgroundColor: isHighlighted ? `${selectedExample.color}25` : 'transparent',
                                                padding: '0.3rem 2rem',
                                                transition: 'all 0.3s ease',
                                                borderLeft: isHighlighted ? `4px solid ${selectedExample.color}` : '4px solid transparent',
                                                minHeight: '1.9rem',
                                                position: 'relative'
                                            }}
                                        >
                                            <span style={{
                                                width: '2rem',
                                                color: isHighlighted ? selectedExample.color : 'rgba(255,255,255,0.2)',
                                                userSelect: 'none',
                                                flexShrink: 0,
                                                fontSize: '0.85rem',
                                                textAlign: 'right',
                                                marginRight: '1.5rem',
                                                fontWeight: isHighlighted ? '700' : '400',
                                                transition: 'all 0.3s'
                                            }}>
                                                {lineNum}
                                            </span>
                                            <code style={{
                                                color: isHighlighted ? '#ffffff' : '#c9d1d9',
                                                flex: 1,
                                                fontFamily: 'inherit',
                                                whiteSpace: 'pre-wrap',
                                                wordBreak: 'break-all',
                                                textShadow: isHighlighted ? `0 0 10px ${selectedExample.color}40` : 'none'
                                            }}>
                                                {line || '\u00A0'}
                                            </code>
                                            {annotation && isHighlighted && (
                                                <motion.div
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    style={{
                                                        marginLeft: '1rem',
                                                        padding: '0.4rem 1rem',
                                                        background: `linear-gradient(135deg, ${selectedExample.color} 0%, ${selectedExample.color}dd 100%)`,
                                                        color: 'white',
                                                        borderRadius: '8px',
                                                        fontSize: '0.8rem',
                                                        fontWeight: '700',
                                                        whiteSpace: 'nowrap',
                                                        flexShrink: 0,
                                                        boxShadow: `0 4px 15px ${selectedExample.color}60`,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem'
                                                    }}
                                                >
                                                    <Clock size={12} />
                                                    {annotation.count}
                                                </motion.div>
                                            )}
                                        </div>
                                    );
                                })}
                            </pre>
                        </div>
                    </div>
                </div>

                {/* Mini Graph Panel - Enhanced */}
                {(() => {
                    const width = 350;
                    const height = 250;
                    const padding = 40;
                    
                    const hexToRgb = (hex: string) => {
                        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                        return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '99, 102, 241';
                    };

                    const factorial = (n: number): number => {
                        if (n <= 1) return 1;
                        return n * factorial(n - 1);
                    };

                    const generatePath = (complexity: string, color: string) => {
                        const points: [number, number][] = [];
                        const nSteps = 40;
                        const maxN = 15;

                        for (let i = 0; i <= nSteps; i++) {
                            const n = (i / nSteps) * maxN;
                            let y = 0;

                            switch (complexity) {
                                case 'O(1)': y = 1; break;
                                case 'O(log n)': y = Math.log2(n + 1); break;
                                case 'O(n)': y = n; break;
                                case 'O(n log n)': y = n * Math.log2(n + 1); break;
                                case 'O(n²)': y = n * n; break;
                                case 'O(n³)': y = n * n * n; break;
                                case 'O(2ⁿ)': y = Math.pow(2, n); break;
                                case 'O(n!)': y = factorial(Math.min(n, 10)); break; // Cap factorial for visibility
                            }

                            // Normalize Y using log scale for better visualization
                            const logY = Math.log10(y + 1);
                            const maxLogY = Math.log10(Math.pow(2, maxN) + 1);
                            const mappedX = padding + (n / maxN) * (width - 2 * padding);
                            const mappedY = height - padding - (logY / maxLogY) * (height - 2 * padding);

                            if (mappedY >= padding - 5) {
                                points.push([mappedX, mappedY]);
                            }
                        }

                        return (
                            <motion.path
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                                d={`M ${points.map(p => p.join(',')).join(' L ')}`}
                                fill="none"
                                stroke={color}
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                filter="drop-shadow(0 2px 8px rgba(0,0,0,0.2))"
                            />
                        );
                    };
                    
                    return (
                        <div className="glass" style={{
                            padding: '2rem',
                            minHeight: '400px',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '1.5rem'
                    }}>
                        <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '10px',
                            background: `linear-gradient(135deg, ${selectedExample.color} 0%, ${selectedExample.color}dd 100%)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: `0 4px 15px ${selectedExample.color}40`
                        }}>
                            <TrendingUp size={20} color="white" />
                        </div>
                        <h4 style={{
                            fontSize: '1.3rem',
                            margin: 0,
                            color: selectedExample.color,
                            fontWeight: '700'
                        }}>
                            {selectedExample.complexity} Growth
                        </h4>
                    </div>

                    <div style={{
                        flex: 1,
                        position: 'relative',
                        minHeight: '300px',
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        overflow: 'hidden'
                    }}>
                        <svg viewBox={`0 0 ${width} ${height}`} style={{
                            width: '100%',
                            height: '100%',
                            overflow: 'visible'
                        }}>
                            {/* Enhanced background */}
                            <defs>
                                <linearGradient id="miniBg" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor={`rgba(${hexToRgb(selectedExample.color)}, 0.1)`} />
                                    <stop offset="100%" stopColor={`rgba(${hexToRgb(selectedExample.color)}, 0.05)`} />
                                </linearGradient>
                                <pattern id="miniGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                                </pattern>
                            </defs>

                            {/* Background with grid */}
                            <rect
                                x={padding - 10}
                                y={padding - 10}
                                width={width - 2 * padding + 20}
                                height={height - 2 * padding + 20}
                                fill="url(#miniBg)"
                                rx="8"
                            />
                            <rect
                                x={padding}
                                y={padding}
                                width={width - 2 * padding}
                                height={height - 2 * padding}
                                fill="url(#miniGrid)"
                                opacity="0.5"
                            />

                            {/* Grid lines */}
                            <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding}
                                  stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />
                            <line x1={padding} y1={padding} x2={padding} y2={height - padding}
                                  stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />

                            {/* Selected Complexity Path */}
                            {generatePath(selectedExample.complexity, selectedExample.color)}

                            {/* Enhanced Labels */}
                            <text x={width - padding + 5} y={height - padding + 5}
                                  fill="var(--text-muted)" fontSize="12" fontWeight="600">n</text>
                            <text x={padding - 25} y={padding - 8}
                                  fill="var(--text-muted)" fontSize="12" fontWeight="600"
                                  transform={`rotate(-90, ${padding - 25}, ${padding - 8})`}>log T(n)</text>

                            {/* Value markers */}
                            {[0, 10, 20].map(n => (
                                <text key={n} x={padding + (n / 20) * (width - 2 * padding)} y={height - padding + 18}
                                      fill="var(--text-dim)" fontSize="10" textAnchor="middle">{n}</text>
                            ))}
                        </svg>
                    </div>

                    {/* Quick explanation */}
                    <div style={{
                        marginTop: '1rem',
                        padding: '1rem',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <p style={{
                            fontSize: '0.9rem',
                            color: 'var(--text-muted)',
                            lineHeight: '1.5',
                            margin: 0,
                            textAlign: 'center'
                        }}>
                            <strong style={{ color: selectedExample.color }}>Visual:</strong> How {selectedExample.complexity} grows with input size
                        </p>
                    </div>
                </div>
                    );
                })()}

                {/* Analysis Panel - Enhanced */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                    minHeight: '600px'
                }}>
                    {/* Operation Counting - Improved */}
                    <div className="glass" style={{
                        padding: '2rem',
                        flex: 1
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            marginBottom: '1.5rem'
                        }}>
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '8px',
                                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Clock size={18} color="white" />
                            </div>
                            <h4 style={{
                                fontSize: '1.3rem',
                                margin: 0,
                                color: 'var(--text-main)',
                                fontWeight: '700'
                            }}>
                                Operation Counting
                            </h4>
                        </div>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            maxHeight: '300px',
                            overflowY: 'auto',
                            paddingRight: '0.5rem'
                        }}>
                            {selectedExample.annotations.map((annotation, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        padding: '1.2rem',
                                        borderRadius: '12px',
                                        border: '1px solid var(--border-color)',
                                        background: currentAnnotationIndex === index && isAnimating ? `${selectedExample.color}15` : 'rgba(255,255,255,0.02)',
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => setHighlightedLine(annotation.line)}
                                >
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        background: `${selectedExample.color}25`,
                                        color: selectedExample.color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: '800',
                                        fontSize: '0.9rem',
                                        flexShrink: 0,
                                        border: `2px solid ${selectedExample.color}40`
                                    }}>
                                        {annotation.line}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{
                                            fontSize: '0.9rem',
                                            marginBottom: '0.5rem',
                                            lineHeight: '1.5',
                                            wordWrap: 'break-word'
                                        }}>
                                            {annotation.text}
                                        </p>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}>
                                            <span style={{
                                                fontSize: '0.8rem',
                                                color: 'var(--text-muted)'
                                            }}>
                                                Line {annotation.line}:
                                            </span>
                                            <code style={{
                                                padding: '0.3rem 0.8rem',
                                                background: `${selectedExample.color}20`,
                                                color: selectedExample.color,
                                                borderRadius: '6px',
                                                fontWeight: '700',
                                                fontSize: '0.85rem',
                                                border: `1px solid ${selectedExample.color}30`
                                            }}>
                                                {annotation.count}
                                            </code>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Complexity Summary - Enhanced */}
                    <div className="glass" style={{
                        padding: '2rem',
                        borderLeft: `4px solid ${selectedExample.color}`
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            marginBottom: '1.5rem'
                        }}>
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '8px',
                                background: `linear-gradient(135deg, ${selectedExample.color} 0%, ${selectedExample.color}dd 100%)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Clock size={18} color="white" />
                            </div>
                            <h4 style={{
                                fontSize: '1.2rem',
                                margin: 0
                            }}>
                                Time Complexity:
                                <code style={{
                                    color: selectedExample.color,
                                    marginLeft: '0.5rem',
                                    fontSize: '1.1rem',
                                    fontWeight: '800'
                                }}>
                                    {selectedExample.complexity}
                                </code>
                            </h4>
                        </div>

                        <p style={{
                            color: 'var(--text-muted)',
                            lineHeight: '1.7',
                            fontSize: '1rem',
                            marginBottom: '2rem',
                            wordWrap: 'break-word'
                        }}>
                            {selectedExample.totalExplanation}
                        </p>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            marginBottom: '1rem'
                        }}>
                            <div style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '6px',
                                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <HardDrive size={16} color="white" />
                            </div>
                            <h5 style={{
                                margin: 0,
                                fontSize: '1rem',
                                fontWeight: '700'
                            }}>
                                Space Complexity:
                                <code style={{
                                    color: '#8b5cf6',
                                    marginLeft: '0.5rem',
                                    fontWeight: '800'
                                }}>
                                    {selectedExample.spaceComplexity}
                                </code>
                            </h5>
                        </div>

                        <p style={{
                            color: 'var(--text-muted)',
                            lineHeight: '1.7',
                            fontSize: '0.95rem',
                            wordWrap: 'break-word'
                        }}>
                            {selectedExample.spaceExplanation}
                        </p>
                    </div>

                    {/* Real World Impact - Enhanced */}
                    <div className="glass" style={{
                        padding: '1.8rem',
                        borderTop: `4px solid ${selectedExample.color}`
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            marginBottom: '1rem'
                        }}>
                            <div style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '6px',
                                background: `linear-gradient(135deg, ${selectedExample.color} 0%, ${selectedExample.color}dd 100%)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <BookOpen size={16} color="white" />
                            </div>
                            <h5 style={{
                                margin: 0,
                                fontSize: '1rem',
                                fontWeight: '700'
                            }}>
                                Real-World Application
                            </h5>
                        </div>

                        <p style={{
                            color: 'var(--text-muted)',
                            fontSize: '0.95rem',
                            lineHeight: '1.6',
                            wordWrap: 'break-word',
                            margin: 0
                        }}>
                            {selectedExample.realWorld}
                        </p>
                    </div>

                    {/* Quick Tips - Enhanced */}
                    <div className="glass" style={{
                        padding: '1.5rem',
                        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.05) 100%)',
                        border: '1px solid rgba(245, 158, 11, 0.2)'
                    }}>
                        <h5 style={{
                            marginBottom: '1rem',
                            fontSize: '1rem',
                            color: '#f59e0b',
                            fontWeight: '700',
                            textAlign: 'center'
                        }}>
                            ⚡ Quick Counting Rules
                        </h5>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr',
                            gap: '0.75rem',
                            fontSize: '0.85rem',
                            color: 'var(--text-muted)',
                            lineHeight: '1.6'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ color: '#10b981', fontWeight: '600' }}>•</span>
                                <span>Single loop over n elements → <code style={{ color: '#6366f1' }}>O(n)</code></span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ color: '#10b981', fontWeight: '600' }}>•</span>
                                <span>Nested loops → <code style={{ color: '#f59e0b' }}>O(n²)</code></span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ color: '#10b981', fontWeight: '600' }}>•</span>
                                <span>Halving input each step → <code style={{ color: '#f97316' }}>O(log n)</code></span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ color: '#10b981', fontWeight: '600' }}>•</span>
                                <span>Fixed operations → <code style={{ color: '#10b981' }}>O(1)</code></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Complexity Comparison Table */}
            <div className="glass" style={{ marginTop: '3rem', padding: '0', overflow: 'hidden' }}>
                <div style={{ padding: '2.5rem 2.5rem 1rem 2.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Activity size={24} className="gradient-text" color="var(--primary-color)" />
                    <h3 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '800' }}>Performance Comparison</h3>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                <th style={{ padding: '1.25rem 2.5rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em' }}>Complexity</th>
                                <th style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em', textAlign: 'center' }}>n=10</th>
                                <th style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em', textAlign: 'center' }}>n=100</th>
                                <th style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em', textAlign: 'center' }}>n=1,000</th>
                                <th style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em', textAlign: 'center' }}>n=10,000</th>
                                <th style={{ padding: '1.25rem 2.5rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em' }}>Example Algorithm</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { c: 'O(1)', n10: '1', n100: '1', n1k: '1', n10k: '1', ex: 'Array access, Hash lookup', color: '#10b981', bg: 'rgba(16, 185, 129, 0.05)' },
                                { c: 'O(log n)', n10: '3', n100: '7', n1k: '10', n10k: '13', ex: 'Binary Search', color: '#f97316', bg: 'rgba(249, 115, 22, 0.05)' },
                                { c: 'O(n)', n10: '10', n100: '100', n1k: '1,000', n10k: '10,000', ex: 'Linear Search, Find Max', color: '#6366f1', bg: 'rgba(99, 102, 241, 0.05)' },
                                { c: 'O(n log n)', n10: '33', n100: '664', n1k: '9,966', n10k: '132,877', ex: 'Merge/Quick Sort', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.05)' },
                                { c: 'O(n²)', n10: '100', n100: '10,000', n1k: '1,000,000', n10k: '100,000,000', ex: 'Bubble/Selection Sort', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.05)' },
                                { c: 'O(n³)', n10: '1,000', n100: '1,000,000', n1k: '1×10⁹', n10k: '1×10¹³', ex: 'Matrix Multiplication', color: '#ec4899', bg: 'rgba(236, 72, 153, 0.05)' },
                                { c: 'O(2ⁿ)', n10: '1,024', n100: '1.27×10³⁰', n1k: '∞', n10k: '∞', ex: 'Naive Fibonacci', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.05)' },
                                { c: 'O(n!)', n10: '3,628,800', n100: '∞', n1k: '∞', n10k: '∞', ex: 'TSP Brute Force', color: '#7c3aed', bg: 'rgba(124, 58, 237, 0.05)' },
                            ].map((row, i) => (
                                <tr key={row.c} style={{ 
                                    borderBottom: i === 7 ? 'none' : '1px solid rgba(255,255,255,0.03)',
                                    background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.1)',
                                    transition: 'all 0.3s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = row.bg}
                                onMouseLeave={(e) => e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.1)'}
                                >
                                    <td style={{ padding: '1.25rem 2.5rem', color: row.color, fontWeight: '700' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: row.color, boxShadow: `0 0 8px ${row.color}` }} />
                                            {row.c}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.25rem 1rem', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>{row.n10}</td>
                                    <td style={{ padding: '1.25rem 1rem', textAlign: 'center', fontFamily: 'var(--font-mono)', color: row.n100 === '∞' || row.n100.includes('10³⁰') ? row.color : 'inherit' }}>{row.n100}</td>
                                    <td style={{ padding: '1.25rem 1rem', textAlign: 'center', fontFamily: 'var(--font-mono)', color: row.n1k === '∞' || row.n1k.includes('10⁹') ? row.color : 'inherit' }}>{row.n1k}</td>
                                    <td style={{ padding: '1.25rem 1rem', textAlign: 'center', fontFamily: 'var(--font-mono)', color: row.n10k === '∞' || row.n10k.includes('10¹³') || row.n10k === '100,000,000' ? row.color : 'inherit' }}>{row.n10k}</td>
                                    <td style={{ padding: '1.25rem 2.5rem', color: 'var(--text-muted)' }}>{row.ex}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Common Patterns Section */}
            <div style={{ marginTop: '4rem' }}>
                <div className="glass" style={{ padding: '3.5rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <span style={{ color: 'var(--primary-color)', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.85rem' }}>Algorithms</span>
                        <h3 style={{ fontSize: '2.5rem', margin: '0.5rem 0', fontWeight: '800' }}>
                            Common <span className="gradient-text">Patterns</span>
                        </h3>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <motion.div whileHover={{ y: -5 }} style={{ padding: '2rem', borderRadius: '20px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)', borderRadius: '50%' }} />
                            <Search size={32} color="#10b981" style={{ marginBottom: '1rem' }} />
                            <h4 style={{ color: '#10b981', marginBottom: '1rem', fontSize: '1.3rem', fontWeight: '700' }}>Divide & Conquer</h4>
                            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                Break problem into smaller subproblems, solve recursively, combine solutions.
                            </p>
                            <div style={{ fontSize: '0.9rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px' }}>
                                <div style={{ marginBottom: '0.25rem' }}><strong style={{ color: 'var(--text-main)' }}>Time:</strong> <code style={{ color: '#10b981' }}>O(n log n)</code> or <code style={{ color: '#10b981' }}>O(log n)</code></div>
                                <div><strong style={{ color: 'var(--text-main)' }}>Examples:</strong> Merge Sort, Quick Sort</div>
                            </div>
                        </motion.div>
                        <motion.div whileHover={{ y: -5 }} style={{ padding: '2rem', borderRadius: '20px', background: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.2)', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)', borderRadius: '50%' }} />
                            <Database size={32} color="#6366f1" style={{ marginBottom: '1rem' }} />
                            <h4 style={{ color: '#6366f1', marginBottom: '1rem', fontSize: '1.3rem', fontWeight: '700' }}>Dynamic Programming</h4>
                            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                Solve complex problems by breaking them down into simpler subproblems and storing results.
                            </p>
                            <div style={{ fontSize: '0.9rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px' }}>
                                <div style={{ marginBottom: '0.25rem' }}><strong style={{ color: 'var(--text-main)' }}>Time:</strong> Often <code style={{ color: '#6366f1' }}>O(n²)</code> or <code style={{ color: '#6366f1' }}>O(n³)</code></div>
                                <div><strong style={{ color: 'var(--text-main)' }}>Examples:</strong> Fibonacci, Knapsack</div>
                            </div>
                        </motion.div>
                        <motion.div whileHover={{ y: -5 }} style={{ padding: '2rem', borderRadius: '20px', background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, transparent 70%)', borderRadius: '50%' }} />
                            <Zap size={32} color="#f59e0b" style={{ marginBottom: '1rem' }} />
                            <h4 style={{ color: '#f59e0b', marginBottom: '1rem', fontSize: '1.3rem', fontWeight: '700' }}>Greedy Algorithms</h4>
                            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                Make locally optimal choices at each step to find global optimum.
                            </p>
                            <div style={{ fontSize: '0.9rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px' }}>
                                <div style={{ marginBottom: '0.25rem' }}><strong style={{ color: 'var(--text-main)' }}>Time:</strong> Usually <code style={{ color: '#f59e0b' }}>O(n log n)</code></div>
                                <div><strong style={{ color: 'var(--text-main)' }}>Examples:</strong> Dijkstra's, Huffman</div>
                            </div>
                        </motion.div>
                        <motion.div whileHover={{ y: -5 }} style={{ padding: '2rem', borderRadius: '20px', background: 'rgba(236, 72, 153, 0.05)', border: '1px solid rgba(236, 72, 153, 0.2)', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%)', borderRadius: '50%' }} />
                            <Layers size={32} color="#ec4899" style={{ marginBottom: '1rem' }} />
                            <h4 style={{ color: '#ec4899', marginBottom: '1rem', fontSize: '1.3rem', fontWeight: '700' }}>Tree/Graph Traversal</h4>
                            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                Visit all nodes in a tree or graph structure systematically.
                            </p>
                            <div style={{ fontSize: '0.9rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px' }}>
                                <div style={{ marginBottom: '0.25rem' }}><strong style={{ color: 'var(--text-main)' }}>Time:</strong> <code style={{ color: '#ec4899' }}>O(V + E)</code> or <code style={{ color: '#ec4899' }}>O(n)</code></div>
                                <div><strong style={{ color: 'var(--text-main)' }}>Examples:</strong> DFS, BFS, Trees</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Practice Problems Section */}
            <div style={{ marginTop: '4rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h3 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: '800' }}>
                        Ready to <span className="gradient-text">Practice?</span>
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>Test your Big O knowledge with these classic algorithmic problems.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                    {[
                        { title: 'Two Sum', desc: 'Find two numbers in an array that add up to a target sum.', p1: 'Brute Force:', p1v: 'O(n²)', p2: 'Optimal:', p2v: 'O(n) Hash Map' },
                        { title: 'Valid Parentheses', desc: 'Check if a string of parentheses is valid using a stack.', p1: 'Time:', p1v: 'O(n) Single pass', p2: 'Space:', p2v: 'O(n) Stack' },
                        { title: 'Merge Intervals', desc: 'Merge overlapping intervals in a list.', p1: 'Time:', p1v: 'O(n log n) Sort', p2: 'Space:', p2v: 'O(n) Result' },
                        { title: 'Climbing Stairs', desc: 'Find number of ways to climb n stairs.', p1: 'Recursive:', p1v: 'O(2ⁿ)', p2: 'DP:', p2v: 'O(n) Memoization' }
                    ].map(prob => (
                        <motion.div key={prob.title} whileHover={{ y: -5, boxShadow: '0 12px 40px rgba(0,0,0,0.4)' }} style={{ padding: '2rem', borderRadius: '20px', background: 'var(--surface-color)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <h4 style={{ color: 'var(--text-main)', margin: 0, fontSize: '1.25rem', fontWeight: '700' }}>{prob.title}</h4>
                                <CheckCircle2 size={20} color="var(--primary-color)" opacity={0.5} />
                            </div>
                            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.5rem', flex: 1 }}>
                                {prob.desc}
                            </p>
                            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px', fontSize: '0.85rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>{prob.p1}</span>
                                    <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{prob.p1v}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>{prob.p2}</span>
                                    <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{prob.p2v}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
        </>
    );
};

export default BigODetail;
