import { useCallback, useEffect, useState, type CSSProperties } from 'react';
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

    const estimationPlaybook = [
        {
            title: 'One loop over the input',
            complexity: 'O(n)',
            color: '#6366f1',
            code: 'for (let i = 0; i < n; i++)',
            explanation: 'If every element is visited once, runtime grows in direct proportion to n.',
        },
        {
            title: 'Nested loops over the same input',
            complexity: 'O(n²)',
            color: '#eab308',
            code: 'for (...) {\n  for (...) { ... }\n}',
            explanation: 'When each outer iteration triggers another full pass, the work multiplies: n × n.',
        },
        {
            title: 'Halving or doubling each step',
            complexity: 'O(log n)',
            color: '#f97316',
            code: 'while (n > 1) n /= 2',
            explanation: 'Shrinking the problem by a constant factor means the step count only grows logarithmically.',
        },
        {
            title: 'Split, recurse, then do linear work',
            complexity: 'O(n log n)',
            color: '#8b5cf6',
            code: '2T(n/2) + O(n)',
            explanation: 'Divide-and-conquer often creates log n levels, with O(n) work repeated on each level.',
        },
    ] as const;

    const estimationRules = [
        'Drop constants and smaller terms: O(3n + 20) becomes O(n).',
        'Sequential blocks add, nested blocks multiply: O(a + b) vs O(a × b).',
        'Always identify the real input first. Two arrays may mean O(n + m), not just O(n).',
        'Time and space are separate. Hash maps, recursion, and helper arrays often change space complexity.',
    ] as const;

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

    const selectorStyles = (example: ComplexityExample, isSelected: boolean): CSSProperties => ({
        '--example-color': example.color,
        '--selector-border': isSelected ? example.color : 'rgba(255,255,255,0.08)',
        '--selector-background': isSelected ? `${example.color}15` : 'rgba(255,255,255,0.02)',
        '--selector-foreground': isSelected ? example.color : 'var(--text-muted)',
        '--selector-shadow': isSelected ? `0 0 20px ${example.color}30, inset 0 0 10px ${example.color}10` : 'none',
    } as CSSProperties);

    const titleDotStyle = {
        '--selected-color': selectedExample.color,
    } as CSSProperties;

    const playButtonStyle = {
        '--selected-color': selectedExample.color,
        '--selected-shadow': `0 4px 12px ${selectedExample.color}50`,
    } as CSSProperties;

    const theoryCardStyle = (accentColor: string, background: string) => ({
        '--theory-accent': accentColor,
        '--theory-background': background,
    } as CSSProperties);

    return (
        <section id="big-o" className={`container ${styles.page}`}>
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

            <div className={styles.analysisSection}>
                <div className={styles.analysisHeader}>
                    <h2 className={styles.analysisTitle}>
                        Algorithm <span className="gradient-text">Counting & Analysis</span>
                    </h2>
                    <p className={styles.analysisDescription}>
                        Learn to count operations and analyze algorithm efficiency. Click on any complexity to see step-by-step analysis.
                    </p>
                </div>

                <div className={styles.analysisStack}>
                    <div className={styles.selectorRail}>
                        {complexityExamples.map((example) => {
                            const isSelected = selectedExample.id === example.id;
                            return (
                                <motion.button
                                    key={example.id}
                                    onClick={() => {
                                        setSelectedExample(example);
                                        resetAnimation();
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`${styles.selectorButton} ${isSelected ? styles.selectorButtonSelected : ''}`}
                                    style={selectorStyles(example, isSelected)}
                                >
                                    <div className={styles.selectorDot} />
                                    <span className={styles.selectorComplexity}>{example.complexity}</span>
                                    {isSelected && (
                                        <span className={styles.selectorDetail}>{example.name.split(' - ')[1]}</span>
                                    )}
                                </motion.button>
                            );
                        })}
                    </div>

                    <div className={styles.walkthroughStack}>
                        <div className={`glass ${styles.walkthroughPanel}`}>
                            <div className={styles.walkthroughHeader}>
                                <div className={styles.windowDots}>
                                    <div className={`${styles.windowDot} ${styles.windowDotRed}`} />
                                    <div className={`${styles.windowDot} ${styles.windowDotYellow}`} />
                                    <div className={`${styles.windowDot} ${styles.windowDotGreen}`} />
                                </div>

                                <div className={styles.walkthroughMeta}>
                                    <div className={styles.walkthroughTitleWrap}>
                                        <div className={styles.walkthroughTitleDot} style={titleDotStyle} />
                                        <span className={styles.walkthroughTitleText} style={{ color: selectedExample.color }}>
                                            {selectedExample.name}
                                        </span>
                                    </div>
                                    <div className={styles.walkthroughFileBadge}>algorithm.js</div>
                                </div>

                                <div className={styles.walkthroughControls}>
                                    <button
                                        onClick={isAnimating ? pauseAnimation : startAnimation}
                                        aria-label={isAnimating ? 'Pause walkthrough' : 'Play walkthrough'}
                                        className={`${styles.iconButton} ${styles.primaryIconButton}`}
                                        style={playButtonStyle}
                                    >
                                        {isAnimating ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                                    </button>
                                    <button onClick={stepBackward} aria-label="Previous step" className={styles.iconButton}>
                                        <ChevronLeft size={16} />
                                    </button>
                                    <button onClick={stepForward} aria-label="Next step" className={styles.iconButton}>
                                        <ChevronRight size={16} />
                                    </button>
                                    <button
                                        onClick={resetAnimation}
                                        aria-label="Reset animation"
                                        className={`${styles.iconButton} ${styles.resetButton}`}
                                    >
                                        <RotateCcw size={14} />
                                        Reset
                                    </button>
                                    <label className={styles.speedControlCompact}>
                                        <span className={styles.speedControlLabel}>Speed</span>
                                        <select
                                            value={playbackRate}
                                            onChange={(event) => setPlaybackRate(Number(event.target.value))}
                                            className={styles.speedSelect}
                                        >
                                            <option value="1">1x</option>
                                            <option value="1.5">1.5x</option>
                                            <option value="2">2x</option>
                                        </select>
                                    </label>
                                </div>
                            </div>

                            <div className={styles.codeViewport}>
                                <pre className={styles.codeBlock}>
                                    {selectedExample.code.split('\n').map((line, index) => {
                                        const lineNum = index + 1;
                                        const isHighlighted = lineNum === highlightedLine;
                                        const annotation = selectedExample.annotations[currentAnnotationIndex];
                                        const showAnnotation = isHighlighted && annotation?.line === lineNum;

                                        return (
                                            <div
                                                key={index}
                                                className={`${styles.codeRow} ${isHighlighted ? styles.codeRowActive : ''}`}
                                                style={isHighlighted ? ({ '--selected-color': selectedExample.color, '--selected-soft': `${selectedExample.color}15` } as CSSProperties) : undefined}
                                            >
                                                <span
                                                    className={`${styles.codeLineNumber} ${isHighlighted ? styles.codeLineNumberActive : ''}`}
                                                    style={isHighlighted ? { color: selectedExample.color } : undefined}
                                                >
                                                    {lineNum}
                                                </span>
                                                <code
                                                    className={`${styles.codeContent} ${isHighlighted ? styles.codeContentActive : ''}`}
                                                    style={isHighlighted ? ({ '--selected-glow': `0 0 12px ${selectedExample.color}50` } as CSSProperties) : undefined}
                                                >
                                                    {line || '\u00A0'}
                                                </code>
                                                {showAnnotation && (
                                                    <motion.div
                                                        initial={{ opacity: 0, x: 12 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        className={styles.annotationChip}
                                                        style={{ background: selectedExample.color, boxShadow: `0 4px 12px ${selectedExample.color}60` }}
                                                    >
                                                        {annotation.count}
                                                    </motion.div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </pre>
                            </div>

                            <div className={styles.walkthroughFooter}>
                                <div className={styles.walkthroughFooterRow}>
                                    <div className={styles.walkthroughFooterLegend}>
                                        <div className={styles.walkthroughFooterDot} style={{ background: selectedExample.color }} />
                                        <span>
                                            {selectedExample.annotations[currentAnnotationIndex]?.text ?? 'Start the walkthrough to see each operation counted.'}
                                        </span>
                                    </div>
                                    <span>
                                        Step {totalAnnotations === 0 ? 0 : currentAnnotationIndex + 1} / {totalAnnotations}
                                    </span>
                                    <span>Space: {selectedExample.spaceComplexity}</span>
                                    <span>{selectedExample.realWorld}</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.sectionBlock}>
                            <h3 className={`${styles.heroTitle} ${styles.sectionHeadingCenter}`}>
                                Understanding the <span className="gradient-text">Notation Family</span>
                            </h3>
                            <div className={styles.theoryGrid}>
                                <div className={`glass ${styles.theoryCard}`} style={theoryCardStyle('#ef4444', 'rgba(239, 68, 68, 0.05)')}>
                                    <h4 className={styles.theoryCardTitle}>Big O (O)</h4>
                                    <p className={styles.theoryCardLabel}>Upper Bound (Worst Case)</p>
                                    <p className={styles.theoryCardText}>
                                        Describes the maximum growth rate. It tells you the slowest acceptable performance an algorithm might have as input grows.
                                    </p>
                                    <div className={styles.theoryFormula}>"f(n) is O(g(n)) if f(n) ≤ c · g(n)"</div>
                                </div>

                                <div className={`glass ${styles.theoryCard}`} style={theoryCardStyle('#22c55e', 'rgba(34, 197, 94, 0.05)')}>
                                    <h4 className={styles.theoryCardTitle}>Big Omega (Ω)</h4>
                                    <p className={styles.theoryCardLabel}>Lower Bound (Best Case)</p>
                                    <p className={styles.theoryCardText}>
                                        Describes the minimum growth rate. It captures how well an algorithm can perform in the most favorable scenario.
                                    </p>
                                    <div className={styles.theoryFormula}>"f(n) is Ω(g(n)) if f(n) ≥ c · g(n)"</div>
                                </div>

                                <div className={`glass ${styles.theoryCard}`} style={theoryCardStyle('#f97316', 'rgba(249, 115, 22, 0.05)')}>
                                    <h4 className={styles.theoryCardTitle}>Big Theta (Θ)</h4>
                                    <p className={styles.theoryCardLabel}>Tight Bound</p>
                                    <p className={styles.theoryCardText}>
                                        Used when the upper and lower bounds match. It means the algorithm reliably grows at that exact rate.
                                    </p>
                                    <div className={styles.theoryFormula}>"f(n) is Θ(g(n)) if c₁·g(n) ≤ f(n) ≤ c₂·g(n)"</div>
                                </div>

                                <div className={`glass ${styles.theoryCard}`} style={theoryCardStyle('#8b5cf6', 'rgba(139, 92, 246, 0.05)')}>
                                    <h4 className={styles.theoryCardTitle}>Amortized Time</h4>
                                    <p className={styles.theoryCardLabel}>Average Over Operations</p>
                                    <p className={styles.theoryCardText}>
                                        Explains rare expensive operations by averaging them across many cheap ones, like dynamic array resizing.
                                    </p>
                                    <div className={styles.theoryFormula}>Total cost across many operations / number of operations</div>
                                </div>
                            </div>
                        </div>

                        {/* ══════════════════════════════════════════
                            ZONE 1 — Definition Hero (2-column)
                        ══════════════════════════════════════════ */}
                        <div className={styles.sectionBlock}>
                            <div className={styles.logHero}>
                                <div className={styles.logHeroGlow} />

                                {/* Left: title + formula */}
                                <div className={styles.logHeroLeft}>
                                    <div className={styles.logHeroEyebrow}>
                                        <Search size={14} />
                                        <span>Foundational Concept</span>
                                    </div>
                                    <h2 className={styles.logHeroTitle}>
                                        Why <span className="gradient-text">Logarithms</span> Matter
                                    </h2>
                                    <p className={styles.logHeroBody}>
                                        In CS we almost always use <strong style={{ color: '#f97316' }}>base 2</strong> because computers split
                                        problems in half. A logarithm answers one question:
                                    </p>
                                    <blockquote className={styles.logHeroQuote}>
                                        "How many times can you halve&nbsp;<em>n</em> before reaching&nbsp;1?"
                                    </blockquote>
                                    <div className={styles.logHeroFormula}>
                                        <span className={styles.logHeroFormulaPart}>log₂(n) = k</span>
                                        <span className={styles.logHeroFormulaOp}>↔</span>
                                        <span className={styles.logHeroFormulaPart}>2<sup>k</sup> = n</span>
                                    </div>
                                    <p className={styles.logHeroExample}>
                                        Example: &nbsp;<code className={styles.logHeroCode}>log₂(1024) = 10</code>&nbsp; because &nbsp;<code className={styles.logHeroCode}>2¹⁰ = 1024</code>
                                    </p>
                                </div>

                                {/* Right: numbered halving chain */}
                                <div className={styles.logHeroRight}>
                                    <p className={styles.logChainCaption}>Halving 32 down to 1 — step by step</p>
                                    <div className={styles.logChain}>
                                        {([32, 16, 8, 4, 2, 1] as const).map((v, i) => (
                                            <div key={v} className={styles.logChainRow}>
                                                <span className={styles.logChainStepNum}>{i < 5 ? i + 1 : '✓'}</span>
                                                <div
                                                    className={styles.logChainBar}
                                                    style={{
                                                        width: `${100 - i * 14}%`,
                                                        opacity: 1 - i * 0.08,
                                                        background: `linear-gradient(90deg, #f97316, #ea580c${Math.round((1 - i * 0.15) * 255).toString(16).padStart(2, '0')})`,
                                                    }}
                                                >
                                                    <span className={styles.logChainBarVal}>{v}</span>
                                                </div>
                                                {i < 5 && <span className={styles.logChainOp}>÷ 2</span>}
                                            </div>
                                        ))}
                                    </div>
                                    <div className={styles.logChainFooter}>
                                        5 halvings &nbsp;∴&nbsp; <strong>log₂(32) = 5</strong>
                                        &nbsp;&nbsp;|&nbsp;&nbsp; Verify: 2<sup>5</sup> = 32 ✓
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ══════════════════════════════════════════
                            ZONE 2 — Scale Stat Cards
                        ══════════════════════════════════════════ */}
                        <div className={styles.sectionBlock}>
                            <div className={styles.logScaleHeader}>
                                <h3 className={styles.logScaleHeading}>
                                    The <span className="gradient-text">Superpower</span>: Massive&nbsp;Input&nbsp;→&nbsp;Tiny&nbsp;Steps
                                </h3>
                                <p className={styles.logScaleSubtitle}>
                                    Every time&nbsp;<strong>n doubles</strong>, you only add&nbsp;<strong>1 more step</strong>. Watch how little the step count grows:
                                </p>
                            </div>
                            <div className={styles.logScaleGrid}>
                                {(
                                    [
                                        { label: '16 items', n: '16', steps: 4, pct: 13 },
                                        { label: '1K items', n: '1,024', steps: 10, pct: 33 },
                                        { label: '1M items', n: '1,048,576', steps: 20, pct: 67 },
                                        { label: '1B items', n: '1,073,741,824', steps: 30, pct: 100 },
                                    ] as const
                                ).map(({ label, n, steps, pct }) => (
                                    <motion.div
                                        key={n}
                                        whileHover={{ y: -5, boxShadow: '0 16px 48px rgba(249,115,22,0.18)' }}
                                        className={`glass ${styles.logScaleCard}`}
                                    >
                                        <p className={styles.logScaleCardLabel}>{label}</p>
                                        <div className={styles.logScaleCardNum}>{steps}</div>
                                        <p className={styles.logScaleCardUnit}>steps max</p>
                                        <div className={styles.logScaleBarTrack}>
                                            <motion.div
                                                className={styles.logScaleBarFill}
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${pct}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                                            />
                                        </div>
                                        <code className={styles.logScaleFormula}>log₂({n}) = {steps}</code>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* ══════════════════════════════════════════
                            ZONE 2b — Logarithmic Growth Chart
                        ══════════════════════════════════════════ */}
                        <div className={styles.sectionBlock}>
                            <div className={`glass ${styles.logChartCard}`}>
                                <div className={styles.logChartHeader}>
                                    <div className={styles.logChartHeaderLeft}>
                                        <div className={styles.logChartIconBox}>
                                            <TrendingUp size={16} color="white" />
                                        </div>
                                        <div>
                                            <h3 className={styles.logChartTitle}>O(log n) vs O(n) vs O(1)</h3>
                                            <p className={styles.logChartSubtitle}>Operations as input doubles — logarithmic barely moves</p>
                                        </div>
                                    </div>
                                    <div className={styles.logChartLegend}>
                                        {[
                                            { label: 'O(1)',     color: '#22c55e' },
                                            { label: 'O(log n)', color: '#f97316' },
                                            { label: 'O(n)',     color: '#ef4444' },
                                        ].map(({ label, color }) => (
                                            <div key={label} className={styles.logChartLegendItem}>
                                                <span className={styles.logChartLegendDot} style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
                                                <span style={{ color }}>{label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className={styles.logChartBody}>
                                    <ResponsiveContainer width="100%" height={260}>
                                        <LineChart
                                            data={Array.from({ length: 32 }, (_, i) => {
                                                const n = i + 1;
                                                return { n, 'O(1)': 1, 'O(log n)': parseFloat(Math.log2(n).toFixed(2)), 'O(n)': n };
                                            })}
                                            margin={{ top: 10, right: 20, bottom: 20, left: 10 }}
                                        >
                                            <CartesianGrid strokeDasharray="4 4" stroke="rgba(255,255,255,0.05)" />
                                            <XAxis
                                                dataKey="n"
                                                stroke="rgba(255,255,255,0.15)"
                                                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                                                tickLine={false}
                                                label={{ value: 'Input size (n)', position: 'insideBottom', offset: -10, fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                                            />
                                            <YAxis
                                                stroke="rgba(255,255,255,0.15)"
                                                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                                                tickLine={false}
                                                width={32}
                                                label={{ value: 'ops', angle: -90, position: 'insideLeft', offset: 10, fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                                            />
                                            <Tooltip
                                                contentStyle={{ background: 'rgba(4,7,20,0.97)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff', fontSize: '0.82rem', padding: '10px 14px' }}
                                                labelFormatter={(v) => `n = ${v}`}
                                                itemStyle={{ fontWeight: 700, padding: '1px 0' }}
                                            />
                                            <Line type="monotone" dataKey="O(1)"     stroke="#22c55e" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: '#22c55e', stroke: 'white', strokeWidth: 2 }} />
                                            <Line type="monotone" dataKey="O(log n)" stroke="#f97316" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: '#f97316', stroke: 'white', strokeWidth: 2 }} />
                                            <Line type="monotone" dataKey="O(n)"     stroke="#ef4444" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: '#ef4444', stroke: 'white', strokeWidth: 2 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* ══════════════════════════════════════════
                            ZONE 3 — Binary Search Execution Trace
                        ══════════════════════════════════════════ */}
                        <div className={styles.sectionBlock}>
                            <div className={`glass ${styles.logExecCard}`}>
                                {/* Card header */}
                                <div className={styles.logExecHeader}>
                                    <div className={styles.logExecHeaderLeft}>
                                        <div className={styles.logExecIconBox}>
                                            <Search size={18} color="white" />
                                        </div>
                                        <div>
                                            <h3 className={styles.logExecTitle}>Binary Search — Execution Trace</h3>
                                            <p className={styles.logExecSubtitle}>Finding <code className={styles.logExecCode}>target = 15</code> in a sorted array</p>
                                        </div>
                                    </div>
                                    <div className={styles.logExecArray}>
                                        {[
                                            { val: 1, idx: 0 }, { val: 3, idx: 1 }, { val: 5, idx: 2 },
                                            { val: 6, idx: 3 }, { val: 8, idx: 4 }, { val: 10, idx: 5 },
                                            { val: 12, idx: 6 }, { val: 15, idx: 7 },
                                        ].map(({ val, idx }) => (
                                            <div key={idx} className={`${styles.logExecCell} ${val === 15 ? styles.logExecCellTarget : ''}`}>
                                                <span className={styles.logExecCellIdx}>{idx}</span>
                                                <span className={styles.logExecCellVal}>{val}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Iteration steps */}
                                <div className={styles.logExecSteps}>
                                    {(
                                        [
                                            { n: 1, left: 0, mid: 3, right: 7, checkVal: 6,  op: '<',   decision: 'go RIGHT', newPtr: 'left = 4', remaining: '[8, 10, 12, 15]', shrink: '8 → 4 items', done: false },
                                            { n: 2, left: 4, mid: 5, right: 7, checkVal: 10, op: '<',   decision: 'go RIGHT', newPtr: 'left = 6', remaining: '[12, 15]',        shrink: '4 → 2 items', done: false },
                                            { n: 3, left: 6, mid: 6, right: 7, checkVal: 12, op: '<',   decision: 'go RIGHT', newPtr: 'left = 7', remaining: '[15]',            shrink: '2 → 1 item',  done: false },
                                            { n: 4, left: 7, mid: 7, right: 7, checkVal: 15, op: '===', decision: 'FOUND',    newPtr: 'index 7',  remaining: null,              shrink: null,          done: true  },
                                        ] as const
                                    ).map(({ n, left, mid, right, checkVal, op, decision, newPtr, remaining, shrink, done }) => (
                                        <div key={n} className={`${styles.traceCard} ${done ? styles.traceCardDone : ''}`}>
                                            {/* Header: step number + pointer pills */}
                                            <div className={styles.traceHead}>
                                                <span className={styles.traceStepNum}>Step {n}</span>
                                                <div className={styles.tracePtrs}>
                                                    <span className={styles.tracePtr} style={{ color: '#6366f1', background: 'rgba(99,102,241,0.12)', borderColor: 'rgba(99,102,241,0.3)' }}>left&nbsp;=&nbsp;{left}</span>
                                                    <span className={styles.tracePtr} style={{ color: '#f97316', background: 'rgba(249,115,22,0.15)',  borderColor: 'rgba(249,115,22,0.4)'  }}>mid&nbsp;=&nbsp;{mid}</span>
                                                    <span className={styles.tracePtr} style={{ color: '#8b5cf6', background: 'rgba(139,92,246,0.12)', borderColor: 'rgba(139,92,246,0.3)' }}>right&nbsp;=&nbsp;{right}</span>
                                                </div>
                                            </div>
                                            {/* Body: check row + remaining row */}
                                            <div className={styles.traceBody}>
                                                <div className={styles.traceCheckRow}>
                                                    <code className={styles.traceCheckExpr}>arr[{mid}]&nbsp;=&nbsp;{checkVal}</code>
                                                    <span className={styles.traceOp}>{op}</span>
                                                    <code className={styles.traceTarget}>15&nbsp;<span style={{ opacity: 0.55, fontWeight: 400 }}>(target)</span></code>
                                                    <span className={`${styles.traceDecision} ${done ? styles.traceDecisionFound : styles.traceDecisionRight}`}>
                                                        {done ? `✓ ${decision} at ${newPtr}` : `→ ${decision}  ·  ${newPtr}`}
                                                    </span>
                                                </div>
                                                {remaining && (
                                                    <div className={styles.traceRemainingRow}>
                                                        <span className={styles.traceRemainingLabel}>Candidates</span>
                                                        <code className={styles.traceRemainingArr}>{remaining}</code>
                                                        <span className={styles.traceRemainingNote}>— {shrink} ÷2 ✓</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.logExecFooter}>
                                    <span>4 iterations &nbsp;·&nbsp; n = 8 &nbsp;·&nbsp; log₂(8) = 3 worst-case</span>
                                    <span className={styles.logExecFooterHighlight}>
                                        Scale to 1,000,000 items → only ~20 iterations
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* ══════════════════════════════════════════
                            ZONE 4 — O(n) vs O(log n) + Algo Cards
                        ══════════════════════════════════════════ */}
                        <div className={styles.sectionBlock}>
                            {/* VS Panel */}
                            <div className={styles.logVsPanel}>
                                <div className={`${styles.logVsCard}`} style={{ borderColor: 'rgba(239,68,68,0.25)', background: 'rgba(239,68,68,0.04)' }}>
                                    <div className={styles.logVsTag} style={{ color: '#ef4444', background: 'rgba(239,68,68,0.12)' }}>O(n) — Linear Search</div>
                                    <p className={styles.logVsBody}>Check every element one by one. For a 1,000,000-item list, the worst case is:</p>
                                    <div className={styles.logVsBigNum} style={{ color: '#ef4444' }}>1,000,000</div>
                                    <p className={styles.logVsBigLabel}>comparisons</p>
                                    <div className={styles.logVsProgressTrack}>
                                        <div className={styles.logVsProgressFill} style={{ width: '100%', background: '#ef4444' }} />
                                    </div>
                                    <pre className={styles.logVsCode}>{`for (let i = 0; i < arr.length; i++) {
  if (arr[i] === target) return i;
}  // visits EVERY element`}</pre>
                                </div>

                                <div className={styles.logVsDivider}>
                                    <div className={styles.logVsDividerLine} />
                                    <div className={styles.logVsVsBadge}>VS</div>
                                    <div className={styles.logVsDividerLine} />
                                </div>

                                <div className={`${styles.logVsCard}`} style={{ borderColor: 'rgba(249,115,22,0.25)', background: 'rgba(249,115,22,0.04)' }}>
                                    <div className={styles.logVsTag} style={{ color: '#f97316', background: 'rgba(249,115,22,0.12)' }}>O(log n) — Binary Search</div>
                                    <p className={styles.logVsBody}>Halve the search space each step. Same list, same target, at worst:</p>
                                    <div className={styles.logVsBigNum} style={{ color: '#f97316' }}>~20</div>
                                    <p className={styles.logVsBigLabel}>comparisons</p>
                                    <div className={styles.logVsProgressTrack}>
                                        <div className={styles.logVsProgressFill} style={{ width: '2%', background: '#f97316' }} />
                                    </div>
                                    <pre className={styles.logVsCode}>{`while (left <= right) {
  const mid = (left + right) >> 1;
  if (arr[mid] === target) return mid;
  arr[mid] < target ? left=mid+1 : right=mid-1;
}`}</pre>
                                </div>
                            </div>

                            {/* Algorithm cards */}
                            <div className={styles.logAlgoGrid}>
                                {(
                                    [
                                        { Icon: Search,     color: '#6366f1', algo: 'Binary Search',       ds: 'Sorted Array',        badge: 'O(log n)',          why: 'Each comparison eliminates half the remaining elements.', trace: { steps: ['1024', '512', '256', '…', '1'], summary: '10 steps' } },
                                        { Icon: Layers,     color: '#22c55e', algo: 'BST Lookup / Insert', ds: 'Binary Search Tree',   badge: 'O(log n) balanced', why: 'Left or right at every node. Height = log₂(n) for balanced trees.', trace: { steps: ['root', 'L/R', 'L/R', '…', 'node'], summary: '≈20 levels / 1M nodes' } },
                                        { Icon: TrendingUp, color: '#f97316', algo: 'Heap Push / Pop',     ds: 'Min / Max Heap',       badge: 'O(log n)',          why: 'Bubble up/down the heap. Height = ⌊log₂(n)⌋ swaps max.', trace: { steps: ['1024', '512', '256', '…', 'root'], summary: '≤10 swaps' } },
                                        { Icon: Activity,   color: '#8b5cf6', algo: 'Merge Sort',          ds: 'Any Array',            badge: 'O(n log n)',        why: 'Recursive halving creates log₂(n) levels × O(n) merge work.', trace: { steps: ['n=8', 'n=4', 'n=2', 'n=1'], summary: '3 levels · O(n) merge each' } },
                                    ] as const
                                ).map(({ Icon, color, algo, ds, badge, why, trace }) => (
                                    <motion.div
                                        key={algo}
                                        whileHover={{ y: -4, boxShadow: `0 14px 44px ${color}22` }}
                                        className={`glass ${styles.logAlgoCard}`}
                                        style={{ '--algo-color': color, borderTopColor: color } as React.CSSProperties}
                                    >
                                        <div className={styles.logAlgoTop}>
                                            <div className={styles.logAlgoIconBox} style={{ background: `linear-gradient(135deg, ${color}, ${color}aa)`, boxShadow: `0 4px 14px ${color}40` }}>
                                                <Icon size={18} color="white" />
                                            </div>
                                            <span className={styles.logAlgoBadge} style={{ color, background: `${color}15`, border: `1px solid ${color}30` }}>{badge}</span>
                                        </div>
                                        <p className={styles.logAlgoName}>{algo}</p>
                                        <p className={styles.logAlgoDs} style={{ color }}>{ds}</p>
                                        <p className={styles.logAlgoWhy}>{why}</p>
                                        <div className={styles.logAlgoTrace} style={{ borderColor: `${color}20`, background: `${color}06` }}>
                                            <span className={styles.logAlgoTraceLabel}>trace</span>
                                            <div className={styles.logAlgoTraceRow}>
                                                {trace.steps.map((step, i) => (
                                                    <>
                                                        <span key={i} className={styles.logAlgoTraceChip} style={{ color, borderColor: `${color}40`, background: `${color}14` }}>{step}</span>
                                                        {i < trace.steps.length - 1 && <span key={`arr-${i}`} className={styles.logAlgoTraceArrow} style={{ color }}>›</span>}
                                                    </>
                                                ))}
                                            </div>
                                            <span className={styles.logAlgoTraceSummary}>{trace.summary}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.sectionBlock}>
                            <div className={`glass ${styles.comparisonCard}`}>
                                <div className={styles.comparisonHeader}>
                                    <Activity size={24} className="gradient-text" color="var(--primary-color)" />
                                    <h3 className={styles.comparisonTitle}>Performance Comparison</h3>
                                </div>
                                <table className={styles.comparisonTable}>
                                    <thead>
                                        <tr className={styles.comparisonHeadRow}>
                                            <th className={styles.comparisonHeadCell}>Complexity</th>
                                            <th className={`${styles.comparisonHeadCell} ${styles.comparisonHeadCellCentered}`}>n=10</th>
                                            <th className={`${styles.comparisonHeadCell} ${styles.comparisonHeadCellCentered}`}>n=100</th>
                                            <th className={`${styles.comparisonHeadCell} ${styles.comparisonHeadCellCentered}`}>n=1,000</th>
                                            <th className={`${styles.comparisonHeadCell} ${styles.comparisonHeadCellCentered}`}>n=10,000</th>
                                            <th className={styles.comparisonHeadCell}>Example</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {comparisonTableData.map((row, index) => (
                                            <tr
                                                key={row.c}
                                                className={`${styles.comparisonRow} ${index % 2 !== 0 ? styles.comparisonRowAlt : ''} ${index === comparisonTableData.length - 1 ? styles.comparisonRowLast : ''}`}
                                                onMouseEnter={(event) => {
                                                    event.currentTarget.style.background = row.bg;
                                                }}
                                                onMouseLeave={(event) => {
                                                    event.currentTarget.style.background = index % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.1)';
                                                }}
                                            >
                                                <td className={`${styles.comparisonCell} ${styles.comparisonComplexityCell}`} style={{ color: row.color }}>
                                                    <div className={styles.comparisonComplexityWrap}>
                                                        <div className={styles.comparisonComplexityDot} style={{ background: row.color, boxShadow: `0 0 8px ${row.color}` }} />
                                                        {row.c}
                                                    </div>
                                                </td>
                                                <td className={`${styles.comparisonCell} ${styles.comparisonNumericCell}`}>{row.n10}</td>
                                                <td className={`${styles.comparisonCell} ${styles.comparisonNumericCell}`} style={{ color: row.n100 === '∞' || row.n100.includes('10³⁰') ? row.color : undefined }}>{row.n100}</td>
                                                <td className={`${styles.comparisonCell} ${styles.comparisonNumericCell}`} style={{ color: row.n1k === '∞' || row.n1k.includes('10⁹') ? row.color : undefined }}>{row.n1k}</td>
                                                <td className={`${styles.comparisonCell} ${styles.comparisonNumericCell}`} style={{ color: row.n10k === '∞' || row.n10k.includes('10¹³') || row.n10k === '100,000,000' ? row.color : undefined }}>{row.n10k}</td>
                                                <td className={`${styles.comparisonCell} ${styles.comparisonExampleCell}`}>{row.ex}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className={styles.sectionBlock}>
                            <div className={styles.playbookHeader}>
                                <h3 className={`${styles.heroTitle} ${styles.sectionHeadingCenter}`}>
                                    How To <span className="gradient-text">Estimate Big O</span> From Code
                                </h3>
                                <p className={styles.playbookDescription}>
                                    Before writing formal math, match the code shape to a growth pattern. This is the fastest way to build complexity intuition.
                                </p>
                            </div>

                            <div className={styles.playbookLayout}>
                                <div className={styles.playbookGrid}>
                                    {estimationPlaybook.map(({ title, complexity, color, code, explanation }) => (
                                        <motion.div
                                            key={title}
                                            whileHover={{ y: -4, boxShadow: `0 16px 40px ${color}18` }}
                                            className={`glass ${styles.playbookCard}`}
                                            style={{ borderTopColor: color }}
                                        >
                                            <div className={styles.playbookCardTop}>
                                                <span className={styles.playbookCardTitle}>{title}</span>
                                                <span className={styles.playbookBadge} style={{ color, background: `${color}15`, border: `1px solid ${color}30` }}>
                                                    {complexity}
                                                </span>
                                            </div>
                                            <code className={styles.playbookCode} style={{ color }}>{code}</code>
                                            <p className={styles.playbookText}>{explanation}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className={`glass ${styles.playbookRulesCard}`}>
                                    <div className={styles.playbookRulesHeader}>
                                        <div className={styles.playbookRulesIcon}>
                                            <Eye size={16} color="white" />
                                        </div>
                                        <div>
                                            <h4 className={styles.playbookRulesTitle}>What Beginners Often Miss</h4>
                                            <p className={styles.playbookRulesSubtitle}>Use these rules to avoid the most common wrong answers.</p>
                                        </div>
                                    </div>

                                    <div className={styles.playbookRulesList}>
                                        {estimationRules.map((rule, index) => (
                                            <div key={rule} className={styles.playbookRuleItem}>
                                                <span className={styles.playbookRuleNum}>{index + 1}</span>
                                                <p className={styles.playbookRuleText}>{rule}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className={styles.playbookRulesFooter}>
                                        Ask yourself: <strong>what grows with input size, and how many times do I repeat that work?</strong>
                                    </div>
                                </div>
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
                                        <motion.div
                                            key={pattern.title}
                                            whileHover={{ y: -5 }}
                                            className="glass"
                                            style={{
                                                padding: '2rem',
                                                borderRadius: '20px',
                                                background: `${pattern.color}08`,
                                                border: `1px solid ${pattern.color}22`,
                                                position: 'relative',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: '-10%',
                                                    right: '-10%',
                                                    width: '100px',
                                                    height: '100px',
                                                    background: `radial-gradient(circle, ${pattern.color}22 0%, transparent 70%)`,
                                                    borderRadius: '50%',
                                                }}
                                            />
                                            <IconComponent size={32} color={pattern.color} style={{ marginBottom: '1rem' }} />
                                            <h4 style={{ color: pattern.color, marginBottom: '1rem', fontSize: '1.3rem', fontWeight: '700' }}>{pattern.title}</h4>
                                            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                                {pattern.desc}
                                            </p>
                                            <div style={{ fontSize: '0.9rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px' }}>
                                                <div style={{ marginBottom: '0.25rem' }}>
                                                    <strong style={{ color: 'var(--text-main)' }}>Time:</strong>{' '}
                                                    <code style={{ color: pattern.color }}>{pattern.time}</code>
                                                </div>
                                                <div>
                                                    <strong style={{ color: 'var(--text-main)' }}>Examples:</strong> {pattern.examples}
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className={styles.sectionBlock}>
                            <div className={styles.practiceHeader}>
                                <h3 className={styles.practiceTitle}>
                                    Ready to <span className="gradient-text">Practice?</span>
                                </h3>
                                <p className={styles.practiceDescription}>
                                    Test your Big O knowledge with these classic algorithmic problems.
                                </p>
                            </div>
                            <div className={styles.practiceGrid}>
                                {practiceProblems.map((prob, index) => {
                                    const isRevealed = revealedProblems.has(index);

                                    return (
                                        <motion.div key={prob.title} whileHover={{ y: -5 }} className={`glass ${styles.practiceCard}`}>
                                            <div className={styles.practiceCardHeader}>
                                                <h4 className={styles.practiceCardTitle}>{prob.title}</h4>
                                                <CheckCircle2
                                                    size={20}
                                                    color={isRevealed ? 'var(--primary-color)' : 'rgba(255,255,255,0.2)'}
                                                    opacity={isRevealed ? 1 : 0.5}
                                                    style={{ transition: 'all 0.3s' }}
                                                />
                                            </div>
                                            <p className={styles.practiceCardText}>{prob.desc}</p>
                                            <div className={styles.practiceCardBody}>
                                                {!isRevealed ? (
                                                    <button
                                                        onClick={() => toggleReveal(index)}
                                                        className={styles.practiceRevealButton}
                                                        onMouseOver={(event) => {
                                                            event.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                                        }}
                                                        onMouseOut={(event) => {
                                                            event.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                                                        }}
                                                    >
                                                        <Eye size={16} /> Reveal Solution
                                                    </button>
                                                ) : (
                                                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={styles.practiceAnswerStack}>
                                                        <div className={styles.practiceAnswerRow}>
                                                            <span className={styles.practiceAnswerLabel}>{prob.p1}</span>
                                                            <span className={styles.practiceAnswerValue}>{prob.p1v}</span>
                                                        </div>
                                                        <div className={styles.practiceAnswerRow}>
                                                            <span className={styles.practiceAnswerLabel}>{prob.p2}</span>
                                                            <span className={styles.practiceAnswerValue}>{prob.p2v}</span>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BigODetail;
