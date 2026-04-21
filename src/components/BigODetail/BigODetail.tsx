import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, Activity, Search, Database, Layers, CheckCircle2, Eye, Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useResponsiveChartConfig } from '../../hooks/useResponsiveChartConfig';
import styles from './BigODetail.module.css';

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
        color: '#22c55e',
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
        color: '#eab308',
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
        color: '#f43f5e',
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
    const [hoveredComplexity, setHoveredComplexity] = useState<string | null>(null);
    const [hiddenLines, setHiddenLines] = useState<Set<string>>(new Set());
    const chartConfig = useResponsiveChartConfig();

    const toggleLine = (complexity: string) => {
        setHiddenLines(prev => {
            const next = new Set(prev);
            if (next.has(complexity)) next.delete(complexity);
            else next.add(complexity);
            return next;
        });
    };

    const factorial = (n: number): number => {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    };

    const CAP = 10_000_000;
    const chartData = Array.from({ length: 13 }, (_, i) => {
        const n = i + 1;
        return {
            n,
            'O(1)': 1,
            'O(log n)': parseFloat(Math.log2(n + 1).toFixed(2)),
            'O(n)': n,
            'O(n log n)': parseFloat((n * Math.log2(n + 1)).toFixed(2)),
            'O(n²)': n * n,
            'O(n³)': Math.min(n * n * n, CAP),
            'O(2ⁿ)': Math.min(Math.pow(2, n), CAP),
            'O(n!)': Math.min(factorial(n), CAP),
        };
    });

    const getComplexityInfo = (complexity: string) => {
        return complexityExamples.find(ex => ex.complexity === complexity);
    };

    const formatYAxis = (val: number) => {
        if (val >= 1_000_000) return (val / 1_000_000).toFixed(0) + 'M';
        if (val >= 1_000) return (val / 1_000).toFixed(0) + 'k';
        return val.toString();
    };

    const activeInfo = hoveredComplexity ? getComplexityInfo(hoveredComplexity) : null;

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <div className={styles.headerIcon}>
                    <TrendingUp size={22} color="white" />
                </div>
                <div className={styles.headerText}>
                    <h3>Growth Rate Visualization</h3>
                    <p>Logarithmic scale · n = 1 → 13 · Click legend to toggle lines</p>
                </div>
            </div>

            <div className={`${styles.infoBanner} ${activeInfo ? styles.active : ''}`} style={activeInfo ? { background: `${activeInfo.color}18`, borderColor: `${activeInfo.color}40` } : {}}>
                {activeInfo ? (
                    <>
                        <div className={styles.infoDot} style={{ background: activeInfo.color, boxShadow: `0 0 10px ${activeInfo.color}` }} />
                        <div className={styles.infoContent}>
                            <span className={styles.infoName} style={{ color: activeInfo.color }}>{activeInfo.name}</span>
                            <span className={styles.infoExample}>
                                {activeInfo.realWorld.split(',')[0]}
                            </span>
                        </div>
                    </>
                ) : (
                    <span className={styles.infoHint}>
                        ↑ Hover over the legend buttons or chart lines to highlight a complexity class
                    </span>
                )}
            </div>

            <div className={styles.chartContainer} style={{ height: `${chartConfig.mainChartHeight}px` }}>
                <ResponsiveContainer width="100%" height={chartConfig.mainChartHeight}>
                    <LineChart data={chartData} margin={chartConfig.mainChartMargin}>
                        <CartesianGrid strokeDasharray="4 4" stroke="rgba(255,255,255,0.06)" />
                        <XAxis
                            dataKey="n"
                            stroke="rgba(255,255,255,0.2)"
                            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: chartConfig.mainAxisFontSize, fontWeight: 600 }}
                            tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                            label={chartConfig.showAxisLabels ? {
                                value: 'Input Size (n)',
                                position: 'insideBottom',
                                offset: chartConfig.mainLabelOffset,
                                fill: 'rgba(255,255,255,0.6)',
                                fontSize: chartConfig.mainLabelFontSize,
                                fontWeight: 600
                            } : undefined}
                        />
                        <YAxis
                            scale="log"
                            domain={[1, 'auto']}
                            stroke="rgba(255,255,255,0.2)"
                            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: chartConfig.mainAxisFontSize }}
                            tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                            tickFormatter={formatYAxis}
                            width={chartConfig.mainYAxisWidth}
                            label={chartConfig.showAxisLabels ? {
                                value: 'Operations (log scale)',
                                angle: -90,
                                position: 'insideLeft',
                                offset: chartConfig.growthLabelOffset,
                                fill: 'rgba(255,255,255,0.6)',
                                fontSize: chartConfig.mainLabelFontSize,
                                fontWeight: 600
                            } : undefined}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(4, 7, 20, 0.97)',
                                border: '1px solid rgba(255,255,255,0.12)',
                                borderRadius: '14px',
                                boxShadow: '0 12px 48px rgba(0,0,0,0.7)',
                                color: '#fff',
                                padding: '12px 16px'
                            }}
                            itemStyle={{ fontWeight: '700', fontSize: '0.85rem', padding: '2px 0' }}
                            labelStyle={{ color: 'rgba(255,255,255,0.5)', marginBottom: '6px', fontSize: '0.8rem' }}
                            labelFormatter={(label) => `n = ${label}`}
                            formatter={(value, name) => {
                                const num = typeof value === 'number' ? value : Number(value);
                                if (isNaN(num)) return ['—', name];
                                let display: string;
                                if (num >= 1_000_000) display = (num / 1_000_000).toFixed(2) + 'M';
                                else if (num >= 1_000) display = (num / 1_000).toFixed(1) + 'k';
                                else display = num.toFixed(num < 10 ? 2 : 0);
                                if (num >= CAP) display += ' (capped)';
                                return [display, name];
                            }}
                        />
                        {complexityExamples.map(ex => (
                            <Line
                                key={ex.id}
                                type="monotone"
                                dataKey={ex.complexity}
                                stroke={ex.color}
                                strokeWidth={hoveredComplexity === ex.complexity ? 4 : hiddenLines.has(ex.complexity) ? 0 : 2.5}
                                dot={false}
                                hide={hiddenLines.has(ex.complexity)}
                                activeDot={{
                                    r: hoveredComplexity === ex.complexity ? 8 : 5,
                                    fill: ex.color,
                                    stroke: 'white',
                                    strokeWidth: 2
                                }}
                                strokeOpacity={hoveredComplexity && hoveredComplexity !== ex.complexity ? 0.15 : 1}
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className={styles.legendContainer}>
                {complexityExamples.map(ex => {
                    const isHidden = hiddenLines.has(ex.complexity);
                    const isHighlighted = hoveredComplexity === ex.complexity;
                    return (
                        <motion.button
                            key={ex.id}
                            onClick={() => toggleLine(ex.complexity)}
                            onMouseEnter={() => setHoveredComplexity(ex.complexity)}
                            onMouseLeave={() => setHoveredComplexity(null)}
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.95 }}
                            className={`${styles.legendButton} ${isHighlighted ? styles.highlighted : ''} ${isHidden ? styles.hidden : ''}`}
                            style={{
                                borderColor: isHighlighted ? ex.color : isHidden ? 'rgba(255,255,255,0.1)' : `${ex.color}50`,
                                background: isHighlighted ? `${ex.color}22` : isHidden ? 'rgba(255,255,255,0.04)' : `${ex.color}10`,
                                color: isHidden ? 'rgba(255,255,255,0.35)' : isHighlighted ? ex.color : 'var(--text-main)',
                                boxShadow: isHighlighted ? `0 0 18px ${ex.color}40` : 'none',
                                opacity: isHidden ? 0.5 : 1,
                            }}
                        >
                            <div className={styles.legendDot} style={{ background: isHidden ? 'rgba(255,255,255,0.2)' : ex.color, boxShadow: isHighlighted ? `0 0 8px ${ex.color}` : 'none' }} />
                            {ex.complexity}
                        </motion.button>
                    );
                })}
                <button className={styles.showAllButton} onClick={() => setHiddenLines(new Set())}>
                    Show All
                </button>
            </div>
        </div>
    );
};

const BigODetail = () => {
    const [selectedExample, setSelectedExample] = useState(complexityExamples[0]);
    const [highlightedLine, setHighlightedLine] = useState<number | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [currentAnnotationIndex, setCurrentAnnotationIndex] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [revealedProblems, setRevealedProblems] = useState<Set<number>>(new Set());

    const toggleReveal = (index: number) => {
        setRevealedProblems(prev => {
            const next = new Set(prev);
            if (next.has(index)) next.delete(index);
            else next.add(index);
            return next;
        });
    };

    const totalAnnotations = selectedExample.annotations.length;

    const applyAnnotationIndex = useCallback((index: number) => {
        if (totalAnnotations === 0) {
            setCurrentAnnotationIndex(0);
            setHighlightedLine(null);
            return;
        }

        const clamped = Math.max(0, Math.min(index, totalAnnotations - 1));
        setCurrentAnnotationIndex(clamped);
        setHighlightedLine(selectedExample.annotations[clamped]?.line ?? null);
    }, [totalAnnotations, selectedExample.annotations]);

    const startAnimation = () => {
        if (totalAnnotations === 0) {
            setIsAnimating(false);
            setHighlightedLine(null);
            return;
        }

        if (currentAnnotationIndex >= totalAnnotations - 1) {
            applyAnnotationIndex(0);
        } else {
            setHighlightedLine(selectedExample.annotations[currentAnnotationIndex]?.line ?? null);
        }

        setIsAnimating(true);
    };

    const pauseAnimation = () => {
        setIsAnimating(false);
    };

    const resetAnimation = () => {
        setIsAnimating(false);
        setHighlightedLine(null);
        setCurrentAnnotationIndex(0);
    };

    const stepBackward = () => {
        setIsAnimating(false);
        applyAnnotationIndex(currentAnnotationIndex - 1);
    };

    const stepForward = () => {
        setIsAnimating(false);
        applyAnnotationIndex(currentAnnotationIndex + 1);
    };

    useEffect(() => {
        if (!isAnimating || totalAnnotations === 0) {
            return;
        }

        const delayMs = Math.max(250, 1200 / playbackRate);
        const timer = window.setTimeout(() => {
            if (currentAnnotationIndex >= totalAnnotations - 1) {
                setIsAnimating(false);
                setHighlightedLine(null);
                return;
            }

            applyAnnotationIndex(currentAnnotationIndex + 1);
        }, delayMs);

        return () => window.clearTimeout(timer);
    }, [
        isAnimating,
        currentAnnotationIndex,
        playbackRate,
        totalAnnotations,
        applyAnnotationIndex,
    ]);

    const comparisonTableData = [
        { c: 'O(1)', n10: '1', n100: '1', n1k: '1', n10k: '1', ex: 'Array access, Hash lookup', color: '#22c55e', bg: 'rgba(34, 197, 94, 0.05)' },
        { c: 'O(log n)', n10: '3', n100: '7', n1k: '10', n10k: '13', ex: 'Binary Search', color: '#f97316', bg: 'rgba(249, 115, 22, 0.05)' },
        { c: 'O(n)', n10: '10', n100: '100', n1k: '1,000', n10k: '10,000', ex: 'Linear Search, Find Max', color: '#6366f1', bg: 'rgba(99, 102, 241, 0.05)' },
        { c: 'O(n log n)', n10: '33', n100: '664', n1k: '9,966', n10k: '132,877', ex: 'Merge/Quick Sort', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.05)' },
        { c: 'O(n²)', n10: '100', n100: '10,000', n1k: '1,000,000', n10k: '100,000,000', ex: 'Bubble/Selection Sort', color: '#eab308', bg: 'rgba(234, 179, 8, 0.05)' },
        { c: 'O(n³)', n10: '1,000', n100: '1,000,000', n1k: '1×10⁹', n10k: '1×10¹³', ex: 'Matrix Multiplication', color: '#f43f5e', bg: 'rgba(244, 63, 94, 0.05)' },
        { c: 'O(2ⁿ)', n10: '1,024', n100: '1.27×10³⁰', n1k: '∞', n10k: '∞', ex: 'Naive Fibonacci', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.05)' },
        { c: 'O(n!)', n10: '3,628,800', n100: '∞', n1k: '∞', n10k: '∞', ex: 'TSP Brute Force', color: '#7c3aed', bg: 'rgba(124, 58, 237, 0.05)' },
    ];

    const patternData = [
        { title: 'Divide & Conquer', icon: Search, color: '#22c55e', desc: 'Break problem into smaller subproblems, solve recursively, combine solutions.', time: 'O(n log n) or O(log n)', examples: 'Merge Sort, Quick Sort' },
        { title: 'Dynamic Programming', icon: Database, color: '#6366f1', desc: 'Solve complex problems by breaking them down into simpler subproblems and storing results.', time: 'Often O(n²) or O(n³)', examples: 'Fibonacci, Knapsack' },
        { title: 'Greedy Algorithms', icon: Zap, color: '#eab308', desc: 'Make locally optimal choices at each step to find global optimum.', time: 'Usually O(n log n)', examples: "Dijkstra's, Huffman" },
        { title: 'Tree/Graph Traversal', icon: Layers, color: '#f43f5e', desc: 'Visit all nodes in a tree or graph structure systematically.', time: 'O(V + E) or O(n)', examples: 'DFS, BFS, Trees' }
    ];

    const practiceProblems = [
        { title: 'Two Sum', desc: 'Find two numbers in an array that add up to a target sum.', p1: 'Brute Force:', p1v: 'O(n²)', p2: 'Optimal:', p2v: 'O(n) Hash Map' },
        { title: 'Valid Parentheses', desc: 'Check if a string of parentheses is valid using a stack.', p1: 'Time:', p1v: 'O(n) Single pass', p2: 'Space:', p2v: 'O(n) Stack' },
        { title: 'Merge Intervals', desc: 'Merge overlapping intervals in a list.', p1: 'Time:', p1v: 'O(n log n) Sort', p2: 'Space:', p2v: 'O(n) Result' },
        { title: 'Climbing Stairs', desc: 'Find number of ways to climb n stairs.', p1: 'Recursive:', p1v: 'O(2ⁿ)', p2: 'DP:', p2v: 'O(n) Memoization' }
    ];

    return (
        <section id="big-o" className="container">
            <div className={styles.heroSection}>
                <div className={styles.heroHeader}>
                    <div className={styles.heroGlowOrb} />

                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
                        className={styles.heroBadge}
                    >
                        <Zap size={16} fill="currentColor" />
                        <span className={styles.heroBadgeText}>Foundational Concept</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className={styles.heroTitle}
                    >
                        The Language of <br />
                        <span className="gradient-text">Efficiency</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className={styles.heroDescription}
                    >
                        Big O notation is a mathematical tool used to describe the limiting behavior of a function. In computer science, it's the standard for analyzing the <strong>scalability</strong> and <strong>performance</strong> of algorithms as input sizes grow towards infinity.
                    </motion.p>
                </div>

                <ComplexityGraph />
            </div>

            {/* Algorithm Counting & Analysis Section */}
            <div style={{ marginBottom: '6rem' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', marginBottom: '1rem', fontWeight: '800' }}>
                        Algorithm <span className="gradient-text">Counting & Analysis</span>
                    </h2>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
                        Learn to count operations and analyze algorithm efficiency. Click on any complexity to see step-by-step analysis.
                    </p>
                </div>

                {/* Dashboard Layout */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Horizontal Complexity Selector */}
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        overflowX: 'auto',
                        padding: '0.5rem',
                        margin: '-0.5rem',
                        WebkitOverflowScrolling: 'touch',
                        msOverflowStyle: 'none',
                        scrollbarWidth: 'none'
                    } as React.CSSProperties}>
                        {complexityExamples.map((example) => {
                            const isSelected = selectedExample.id === example.id;
                            return (
                                <motion.button
                                    key={example.id}
                                    onClick={() => { setSelectedExample(example); resetAnimation(); }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                                        padding: '0.8rem 1.5rem', borderRadius: '99px',
                                        border: isSelected ? `1px solid ${example.color}` : '1px solid rgba(255,255,255,0.08)',
                                        background: isSelected ? `${example.color}15` : 'rgba(255,255,255,0.02)',
                                        color: isSelected ? example.color : 'var(--text-muted)',
                                        cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        boxShadow: isSelected ? `0 0 20px ${example.color}30, inset 0 0 10px ${example.color}10` : 'none',
                                        whiteSpace: 'nowrap', flexShrink: 0
                                    }}
                                >
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: isSelected ? example.color : 'rgba(255,255,255,0.2)', boxShadow: isSelected ? `0 0 8px ${example.color}` : 'none' }} />
                                    <span style={{ fontWeight: '800', fontFamily: 'var(--font-mono)', fontSize: '1rem' }}>
                                        {example.complexity}
                                    </span>
                                    {isSelected && (
                                        <span style={{ fontSize: '0.85rem', opacity: 0.9, paddingLeft: '0.25rem', borderLeft: `1px solid ${example.color}40`, marginLeft: '0.25rem' }}>
                                            {example.name.split(' - ')[1]}
                                        </span>
                                    )}
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Main Content: Code Panel and Graph */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                        {/* Code Panel */}
                        <div className="glass" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            {/* Mac-style Window Header */}
                            <div style={{
                                padding: 'clamp(0.6rem, 2vw, 0.9rem) clamp(0.75rem, 3vw, 1.5rem)',
                                background: 'rgba(0,0,0,0.45)',
                                borderBottom: '1px solid rgba(255,255,255,0.06)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexWrap: 'wrap',
                                gap: '0.75rem'
                            }}>
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
                                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#eab308' }} />
                                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e' }} />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
                                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: selectedExample.color, boxShadow: `0 0 8px ${selectedExample.color}`, flexShrink: 0 }} />
                                        <span style={{ color: selectedExample.color, fontWeight: '700', fontSize: 'clamp(0.75rem, 2.5vw, 0.9rem)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{selectedExample.name}</span>
                                    </div>
                                    <div style={{
                                        fontSize: '0.8rem', fontFamily: 'var(--font-mono)',
                                        color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)',
                                        padding: '0.25rem 0.85rem', borderRadius: '99px', border: '1px solid rgba(255,255,255,0.06)'
                                    }}>algorithm.js</div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                    <button
                                        onClick={isAnimating ? pauseAnimation : startAnimation}
                                        aria-label={isAnimating ? 'Pause walkthrough' : 'Play walkthrough'}
                                        style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                                            width: '36px', height: '36px', borderRadius: '8px',
                                            background: selectedExample.color, color: 'white', border: 'none',
                                            cursor: 'pointer', fontWeight: '700', fontSize: '0.85rem',
                                            boxShadow: `0 4px 12px ${selectedExample.color}50`, transition: 'all 0.2s',
                                            padding: 0
                                        }}
                                    >
                                        {isAnimating ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                                    </button>
                                    <button
                                        onClick={stepBackward}
                                        aria-label="Previous step"
                                        style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            width: '36px', borderRadius: '8px',
                                            background: 'rgba(255,255,255,0.06)', color: 'var(--text-main)',
                                            border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', padding: 0
                                        }}
                                    >
                                        <ChevronLeft size={16} />
                                    </button>
                                    <button
                                        onClick={stepForward}
                                        aria-label="Next step"
                                        style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            width: '36px', borderRadius: '8px',
                                            background: 'rgba(255,255,255,0.06)', color: 'var(--text-main)',
                                            border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', padding: 0
                                        }}
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                    <button
                                        onClick={resetAnimation}
                                        aria-label="Reset animation"
                                        style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                                            padding: '0.5rem 1rem', borderRadius: '8px',
                                            background: 'rgba(255,255,255,0.06)', color: 'var(--text-main)',
                                            border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer',
                                            fontWeight: '600', fontSize: '0.85rem'
                                        }}
                                    >
                                        <RotateCcw size={14} />
                                    </button>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                        <span style={{ fontSize: '0.75rem' }}>Speed:</span>
                                        <select
                                            value={playbackRate}
                                            onChange={(e) => setPlaybackRate(Number(e.target.value))}
                                            style={{
                                                background: 'rgba(255,255,255,0.06)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                color: 'var(--text-main)',
                                                borderRadius: '6px',
                                                padding: '0.35rem 0.6rem',
                                                fontSize: '0.8rem',
                                                cursor: 'pointer',
                                                fontFamily: 'var(--font-mono)'
                                            }}
                                        >
                                            <option value="0.5">0.5x</option>
                                            <option value="1">1x</option>
                                            <option value="1.5">1.5x</option>
                                            <option value="2">2x</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Code Display */}
                            <div style={{ background: '#090c14', padding: 'clamp(0.75rem, 3vw, 1.5rem) 0', overflowX: 'auto' }}>
                                <pre style={{
                                    margin: 0, fontSize: 'clamp(0.75rem, 2.5vw, 0.95rem)', lineHeight: '1.85',
                                    overflowX: 'auto', fontFamily: "'JetBrains Mono', 'Courier New', monospace"
                                }}>
                                    {selectedExample.code.split('\n').map((line, index) => {
                                        const lineNum = index + 1;
                                        const annotation = selectedExample.annotations.find(a => a.line === lineNum);
                                        const isHighlighted = highlightedLine === lineNum;
                                        return (
                                            <div
                                                key={index}
                                                style={{
                                                    display: 'flex', alignItems: 'center',
                                                    padding: '0.15rem clamp(0.5rem, 3vw, 1.5rem)',
                                                    background: isHighlighted ? `${selectedExample.color}20` : 'transparent',
                                                    borderLeft: isHighlighted ? `3px solid ${selectedExample.color}` : '3px solid transparent',
                                                    transition: 'all 0.3s ease'
                                                }}
                                            >
                                                <span style={{
                                                    width: '2.2rem', color: isHighlighted ? selectedExample.color : 'rgba(255,255,255,0.18)',
                                                    userSelect: 'none', fontSize: '0.82rem', flexShrink: 0, textAlign: 'right',
                                                    marginRight: '1.5rem', fontWeight: isHighlighted ? '700' : '400'
                                                }}>{lineNum}</span>
                                                <code style={{
                                                    color: isHighlighted ? '#fff' : '#b0bec5', flex: 1,
                                                    fontFamily: 'inherit', whiteSpace: 'pre',
                                                    textShadow: isHighlighted ? `0 0 12px ${selectedExample.color}50` : 'none'
                                                }}>{line || '\u00A0'}</code>
                                                {annotation && isHighlighted && (
                                                    <motion.div
                                                        initial={{ opacity: 0, x: 12 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        style={{
                                                            marginLeft: '1.5rem', padding: '0.3rem 0.85rem',
                                                            background: selectedExample.color, color: 'white',
                                                            borderRadius: '6px', fontSize: '0.78rem', fontWeight: '700',
                                                            whiteSpace: 'nowrap', flexShrink: 0,
                                                            boxShadow: `0 4px 12px ${selectedExample.color}60`,
                                                            display: 'flex', alignItems: 'center', gap: '0.35rem'
                                                        }}
                                                    >
                                                        {annotation.text}
                                                    </motion.div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </pre>
                            </div>

                            {/* Annotation Legend */}
                            <div style={{ padding: 'clamp(1rem, 3vw, 1.5rem)', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: selectedExample.color }} />
                                        <span>Current Operation</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span>{currentAnnotationIndex + 1} / {totalAnnotations}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ marginBottom: '4rem' }}>
                <h3 className={styles.heroTitle} style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    Theoretical <span className="gradient-text">Foundations</span>
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'clamp(1rem, 4vw, 2rem)' }}>
                    <div className="glass" style={{ padding: '1.5rem', borderLeft: '4px solid #ef4444', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '0 12px 12px 0' }}>
                        <h4 style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '1.25rem' }}>Big O (O)</h4>
                        <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Upper Bound (Worst Case)</p>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                            Describes the <strong>maximum</strong> time an algorithm could take. It guarantees that the algorithm will never be slower than this.
                        </p>
                        <div style={{ marginTop: '1rem', fontStyle: 'italic', fontSize: '0.85rem' }}>"f(n) is O(g(n)) if f(n) ≤ c · g(n)"</div>
                    </div>
                    <div className="glass" style={{ padding: '1.5rem', borderLeft: '4px solid #22c55e', background: 'rgba(34, 197, 94, 0.05)', borderRadius: '0 12px 12px 0' }}>
                        <h4 style={{ color: '#22c55e', marginBottom: '1rem', fontSize: '1.25rem' }}>Big Omega (Ω)</h4>
                        <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Lower Bound (Best Case)</p>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                            Describes the <strong>minimum</strong> time an algorithm could take. It guarantees that the algorithm will never be faster than this.
                        </p>
                        <div style={{ marginTop: '1rem', fontStyle: 'italic', fontSize: '0.85rem' }}>"f(n) is Ω(g(n)) if f(n) ≥ c · g(n)"</div>
                    </div>
                    <div className="glass" style={{ padding: '1.5rem', borderLeft: '4px solid #f97316', background: 'rgba(249, 115, 22, 0.05)', borderRadius: '0 12px 12px 0' }}>
                        <h4 style={{ color: '#f97316', marginBottom: '1rem', fontSize: '1.25rem' }}>Big Theta (Θ)</h4>
                        <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Tight Bound (Average Case)</p>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                            Describes the <strong>exact</strong> growth rate. An algorithm is Θ(g(n)) if it is both O(g(n)) and Ω(g(n)).
                        </p>
                        <div style={{ marginTop: '1rem', fontStyle: 'italic', fontSize: '0.85rem' }}>"f(n) is Θ(g(n)) if c₁g(n) ≤ f(n) ≤ c₂g(n)"</div>
                    </div>
                    <div className="glass" style={{ padding: '1.5rem', borderLeft: '4px solid #8b5cf6', background: 'rgba(139, 92, 246, 0.05)', borderRadius: '0 12px 12px 0' }}>
                        <h4 style={{ color: '#8b5cf6', marginBottom: '1rem', fontSize: '1.25rem' }}>Amortized Time</h4>
                        <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Average over time</p>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                            Guarantees average performance over a sequence of operations. A costly operation is averaged out by many subsequent cheap ones (e.g., resizing a dynamic array).
                        </p>
                    </div>
                </div>
            </div>

            <div style={{ marginBottom: '4rem' }}>
                <div className="glass" style={{ padding: 'clamp(1.25rem, 5vw, 3rem)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, transparent 70%)', borderRadius: '50%', zIndex: 0 }} />
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(249,115,22,0.4)' }}>
                                <TrendingUp size={24} color="white" />
                            </div>
                            Understanding <span className="gradient-text">Logarithms</span>
                        </h3>
                        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                            Logarithms are fundamental to understanding O(log n) complexity. They describe how many times you need to divide a number by a base to get 1.
                        </p>
                        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '12px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '1.5rem' }}>
                            <div>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>log₂(2) =</p>
                                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f97316' }}>1</p>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>2 ÷ 2 = 1 (1 division)</p>
                            </div>
                            <div>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>log₂(8) =</p>
                                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f97316' }}>3</p>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>8 ÷ 2 ÷ 2 ÷ 2 = 1 (3 divisions)</p>
                            </div>
                            <div>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>log₂(1024) =</p>
                                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f97316' }}>10</p>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>1024 halved 10 times = 1</p>
                            </div>
                            <div>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>log₂(1,000,000) ≈</p>
                                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f97316' }}>20</p>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Only 20 divisions for a million!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ marginBottom: '4rem' }}>
                <div className="glass" style={{ padding: 'clamp(1.25rem, 5vw, 3rem)', overflowX: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                        <Activity size={24} className="gradient-text" color="var(--primary-color)" />
                        <h3 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '800' }}>Performance Comparison</h3>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                <th style={{ padding: '1rem 1.25rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>Complexity</th>
                                <th style={{ padding: '1rem 0.75rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em', textAlign: 'center', whiteSpace: 'nowrap' }}>n=10</th>
                                <th style={{ padding: '1rem 0.75rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em', textAlign: 'center', whiteSpace: 'nowrap' }}>n=100</th>
                                <th style={{ padding: '1rem 0.75rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em', textAlign: 'center', whiteSpace: 'nowrap' }}>n=1,000</th>
                                <th style={{ padding: '1rem 0.75rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em', textAlign: 'center', whiteSpace: 'nowrap' }}>n=10,000</th>
                                <th style={{ padding: '1rem 1.25rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>Example</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisonTableData.map((row, i) => (
                                <tr key={row.c} style={{ borderBottom: i === 7 ? 'none' : '1px solid rgba(255,255,255,0.03)', background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.1)' }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = row.bg}
                                    onMouseLeave={(e) => e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.1)'}
                                >
                                    <td style={{ padding: '0.9rem 1.25rem', color: row.color, fontWeight: '700', whiteSpace: 'nowrap' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: row.color, boxShadow: `0 0 8px ${row.color}`, flexShrink: 0 }} />
                                            {row.c}
                                        </div>
                                    </td>
                                    <td style={{ padding: '0.9rem 0.75rem', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>{row.n10}</td>
                                    <td style={{ padding: '0.9rem 0.75rem', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: row.n100 === '∞' || row.n100.includes('10³⁰') ? row.color : 'inherit' }}>{row.n100}</td>
                                    <td style={{ padding: '0.9rem 0.75rem', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: row.n1k === '∞' || row.n1k.includes('10⁹') ? row.color : 'inherit' }}>{row.n1k}</td>
                                    <td style={{ padding: '0.9rem 0.75rem', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: row.n10k === '∞' || row.n10k.includes('10¹³') || row.n10k === '100,000,000' ? row.color : 'inherit' }}>{row.n10k}</td>
                                    <td style={{ padding: '0.9rem 1.25rem', color: 'var(--text-muted)', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>{row.ex}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div style={{ marginBottom: '4rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h3 style={{ fontSize: '2.5rem', fontWeight: '800' }}>
                        Common <span className="gradient-text">Patterns</span>
                    </h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(1rem, 4vw, 2rem)' }}>
                    {patternData.map((pattern) => {
                        const IconComponent = pattern.icon;
                        return (
                            <motion.div key={pattern.title} whileHover={{ y: -5 }} className="glass" style={{ padding: '2rem', borderRadius: '20px', background: `${pattern.color}08`, border: `1px solid ${pattern.color}22`, position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '100px', height: '100px', background: `radial-gradient(circle, ${pattern.color}22 0%, transparent 70%)`, borderRadius: '50%' }} />
                                <IconComponent size={32} color={pattern.color} style={{ marginBottom: '1rem' }} />
                                <h4 style={{ color: pattern.color, marginBottom: '1rem', fontSize: '1.3rem', fontWeight: '700' }}>{pattern.title}</h4>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                    {pattern.desc}
                                </p>
                                <div style={{ fontSize: '0.9rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px' }}>
                                    <div style={{ marginBottom: '0.25rem' }}><strong style={{ color: 'var(--text-main)' }}>Time:</strong> <code style={{ color: pattern.color }}>{pattern.time}</code></div>
                                    <div><strong style={{ color: 'var(--text-main)' }}>Examples:</strong> {pattern.examples}</div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <div style={{ marginBottom: '4rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h3 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: '800' }}>
                        Ready to <span className="gradient-text">Practice?</span>
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>Test your Big O knowledge with these classic algorithmic problems.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(1rem, 4vw, 2rem)' }}>
                    {practiceProblems.map((prob, i) => {
                        const isRevealed = revealedProblems.has(i);
                        return (
                            <motion.div key={prob.title} whileHover={{ y: -5 }} className="glass" style={{ padding: '2rem', borderRadius: '20px', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                    <h4 style={{ color: 'var(--text-main)', margin: 0, fontSize: '1.25rem', fontWeight: '700' }}>{prob.title}</h4>
                                    <CheckCircle2 size={20} color={isRevealed ? "var(--primary-color)" : "rgba(255,255,255,0.2)"} opacity={isRevealed ? 1 : 0.5} style={{ transition: 'all 0.3s' }} />
                                </div>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.5rem', flex: 1 }}>
                                    {prob.desc}
                                </p>
                                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px', fontSize: '0.85rem', position: 'relative', overflow: 'hidden', minHeight: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    {!isRevealed ? (
                                        <button 
                                            onClick={() => toggleReveal(i)}
                                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '0.6rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: '600', width: '100%', transition: 'all 0.2s', outline: 'none' }}
                                            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                                            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                                        >
                                            <Eye size={16} /> Reveal Solution
                                        </button>
                                    ) : (
                                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span style={{ color: 'var(--text-muted)' }}>{prob.p1}</span>
                                                <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{prob.p1v}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span style={{ color: 'var(--text-muted)' }}>{prob.p2}</span>
                                                <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{prob.p2v}</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default BigODetail;
