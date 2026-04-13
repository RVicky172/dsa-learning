import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Clock, HardDrive, Zap, TrendingUp, BookOpen, Activity, Search, Database, Layers, CheckCircle2, Eye } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

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

    // Cap at n=12 so O(n!) and O(2^n) don't explode the scale. Values are capped at 10M.
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
        <div className="glass" style={{
            padding: '2rem',
            position: 'relative',
            background: 'linear-gradient(135deg, rgba(15,15,30,0.9) 0%, rgba(20,20,40,0.8) 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '24px',
            backdropFilter: 'blur(20px)'
        }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{
                    width: '44px', height: '44px', borderRadius: '12px',
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 20px rgba(99,102,241,0.5)'
                }}>
                    <TrendingUp size={22} color="white" />
                </div>
                <div>
                    <h3 style={{ fontSize: '1.5rem', margin: 0, fontWeight: '800', color: 'var(--text-main)' }}>
                        Growth Rate Visualization
                    </h3>
                    <p style={{ margin: '0.2rem 0 0 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        Logarithmic scale · n = 1 → 13 · Click legend to toggle lines
                    </p>
                </div>
            </div>

            {/* Info banner when hovering */}
            <div style={{
                height: '56px',
                marginBottom: '1rem',
                padding: '0.75rem 1.25rem',
                borderRadius: '12px',
                background: activeInfo ? `${activeInfo.color}18` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${activeInfo ? activeInfo.color + '40' : 'rgba(255,255,255,0.06)'}`,
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                transition: 'all 0.3s ease'
            }}>
                {activeInfo ? (
                    <>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: activeInfo.color, boxShadow: `0 0 10px ${activeInfo.color}`, flexShrink: 0 }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <span style={{ color: activeInfo.color, fontWeight: '700', fontSize: '0.9rem' }}>{activeInfo.name}</span>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: '0.75rem' }}>
                                {activeInfo.realWorld.split(',')[0]}
                            </span>
                        </div>
                    </>
                ) : (
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                        ↑ Hover over the legend buttons or chart lines to highlight a complexity class
                    </span>
                )}
            </div>

            {/* Chart */}
            <div style={{
                background: 'rgba(0,0,0,0.35)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.06)',
                padding: '0.5rem 0.5rem 0 0',
                height: '420px',
                overflow: 'hidden'
            }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 15, right: 40, left: 60, bottom: 40 }}>
                        <CartesianGrid strokeDasharray="4 4" stroke="rgba(255,255,255,0.06)" />
                        <XAxis
                            dataKey="n"
                            stroke="rgba(255,255,255,0.2)"
                            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600 }}
                            tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                            label={{
                                value: 'Input Size (n)',
                                position: 'insideBottom',
                                offset: -22,
                                fill: 'rgba(255,255,255,0.6)',
                                fontSize: 13,
                                fontWeight: 600
                            }}
                        />
                        <YAxis
                            scale="log"
                            domain={[1, 'auto']}
                            stroke="rgba(255,255,255,0.2)"
                            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }}
                            tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                            tickFormatter={formatYAxis}
                            width={55}
                            label={{
                                value: 'Operations (log scale)',
                                angle: -90,
                                position: 'insideLeft',
                                offset: -45,
                                fill: 'rgba(255,255,255,0.6)',
                                fontSize: 13,
                                fontWeight: 600
                            }}
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

            {/* Interactive Legend Chips */}
            <div style={{
                marginTop: '1.25rem',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.6rem',
            }}>
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
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.45rem 1rem',
                                borderRadius: '99px',
                                border: isHighlighted ? `1.5px solid ${ex.color}` : isHidden ? '1.5px solid rgba(255,255,255,0.1)' : `1.5px solid ${ex.color}50`,
                                background: isHighlighted ? `${ex.color}22` : isHidden ? 'rgba(255,255,255,0.04)' : `${ex.color}10`,
                                color: isHidden ? 'rgba(255,255,255,0.35)' : isHighlighted ? ex.color : 'var(--text-main)',
                                fontWeight: isHighlighted ? '800' : '600',
                                fontSize: '0.82rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                boxShadow: isHighlighted ? `0 0 18px ${ex.color}40` : 'none',
                                textDecoration: isHidden ? 'line-through' : 'none',
                                opacity: isHidden ? 0.5 : 1,
                                fontFamily: 'var(--font-mono)'
                            }}
                        >
                            <div style={{
                                width: '8px', height: '8px', borderRadius: '50%',
                                background: isHidden ? 'rgba(255,255,255,0.2)' : ex.color,
                                boxShadow: isHighlighted ? `0 0 8px ${ex.color}` : 'none',
                                flexShrink: 0
                            }} />
                            {ex.complexity}
                        </motion.button>
                    );
                })}
                <button
                    onClick={() => setHiddenLines(new Set())}
                    style={{
                        padding: '0.45rem 0.9rem',
                        borderRadius: '99px',
                        border: '1.5px solid rgba(255,255,255,0.15)',
                        background: 'transparent',
                        color: 'rgba(255,255,255,0.4)',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        fontWeight: '600',
                        transition: 'all 0.2s'
                    }}
                >
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
    const [revealedProblems, setRevealedProblems] = useState<Set<number>>(new Set());

    const toggleReveal = (index: number) => {
        setRevealedProblems(prev => {
            const next = new Set(prev);
            if (next.has(index)) next.delete(index);
            else next.add(index);
            return next;
        });
    };

    // Add responsive styles
    const responsiveStyles = `
        <style>
            @media (max-width: 1200px) {
                .main-content-grid {
                    grid-template-columns: 1fr 1fr !important;
                    gap: 2rem !important;
                }
            }
            @media (max-width: 992px) {
                .dsa-content-row {
                    grid-template-columns: 1fr !important;
                }
            }
            .hide-scroll::-webkit-scrollbar {
                display: none;
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

    const internalFactorial = (n: number): number => {
        if (n <= 1) return 1;
        return n * internalFactorial(n - 1);
    };

    const minChartCap = 1_000_000_000;
    const miniChartData = Array.from({ length: 15 }, (_, i) => {
        const n = i + 1;
        const comp = selectedExample.complexity;
        let val = 1;
        if (comp === 'O(1)') val = 1;
        else if (comp === 'O(log n)') val = Math.max(1, Math.log2(n + 1));
        else if (comp === 'O(n)') val = n;
        else if (comp === 'O(n log n)') val = Math.max(1, n * Math.log2(n + 1));
        else if (comp === 'O(n²)') val = n * n;
        else if (comp === 'O(n³)') val = Math.pow(n, 3);
        else if (comp === 'O(2ⁿ)') val = Math.pow(2, n);
        else if (comp === 'O(n!)') val = internalFactorial(n);

        return { n, val: Math.min(val, minChartCap) };
    });

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
                            background: 'radial-gradient(circle, rgba(234, 179, 8, 0.15) 0%, rgba(244, 63, 94, 0.05) 50%, transparent 70%)',
                            filter: 'blur(60px)',
                            zIndex: -1,
                            pointerEvents: 'none'
                        }} />

                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 1.25rem', borderRadius: '99px', background: 'var(--primary-gradient)', color: 'white', marginBottom: '2rem', boxShadow: '0 4px 20px rgba(234, 179, 8, 0.3)' }}
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
                            The Language of <br />
                            <span style={{
                                background: 'linear-gradient(135deg, #eab308 0%, #f43f5e 100%)',
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

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                        {/* Beginner Introduction Section */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                            {/* The Restaurant Analogy */}
                            <div className="glass" style={{ padding: '2.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                    <BookOpen size={28} color="#eab308" />
                                    <h3 style={{ fontSize: '1.6rem', margin: 0, color: '#fff', fontWeight: '800' }}>The "Pizza" Analogy</h3>
                                </div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                                    Abstract math can be confusing. Let's imagine you're dealing with <strong style={{ color: 'var(--text-main)' }}>n</strong> slices of pizza to understand how algorithms scale.
                                </p>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <div style={{ background: 'rgba(34, 197, 94, 0.05)', padding: '1.25rem', borderRadius: '12px', borderLeft: '4px solid #22c55e' }}>
                                        <h4 style={{ color: '#22c55e', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><code style={{ background: 'transparent', padding: 0 }}>O(1)</code> Constant</h4>
                                        <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                            <strong>Eating a slice:</strong> No matter if you bought 1 pizza or 1,000 pizzas, taking the first bite takes the exact same amount of time.
                                        </p>
                                    </div>
                                    <div style={{ background: 'rgba(99, 102, 241, 0.05)', padding: '1.25rem', borderRadius: '12px', borderLeft: '4px solid #6366f1' }}>
                                        <h4 style={{ color: '#6366f1', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><code style={{ background: 'transparent', padding: 0 }}>O(n)</code> Linear</h4>
                                        <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                            <strong>Delivering to <span style={{ fontFamily: 'var(--font-mono)' }}>n</span> houses:</strong> If you deliver to 10 houses, it takes 10x longer than delivering to 1 house. The time scales directly with the workload.
                                        </p>
                                    </div>
                                    <div style={{ background: 'rgba(234, 179, 8, 0.05)', padding: '1.25rem', borderRadius: '12px', borderLeft: '4px solid #eab308' }}>
                                        <h4 style={{ color: '#eab308', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><code style={{ background: 'transparent', padding: 0 }}>O(n²)</code> Quadratic</h4>
                                        <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                            <strong>The Block Party:</strong> Every house on the street delivers a pizza to <em>every other house</em>. If there are 10 houses, that's 100 deliveries! As <code style={{ color: '#eab308' }}>n</code> grows, work explodes.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* The 3 Golden Rules */}
                            <div className="glass" style={{ padding: '2.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                    <Zap size={28} color="#f43f5e" />
                                    <h3 style={{ fontSize: '1.6rem', margin: 0, color: '#fff', fontWeight: '800' }}>The Golden Rules</h3>
                                </div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                                    When calculating Big O in an interview, you must follow these absolute core mathematical rules:
                                </p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    <div style={{ padding: '1.25rem', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', position: 'relative' }}>
                                        <div style={{ position: 'absolute', top: '-10px', left: '-10px', width: '28px', height: '28px', background: '#f43f5e', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>1</div>
                                        <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', fontSize: '1.1rem', marginLeft: '0.5rem' }}>Worst-Case Scenario</h4>
                                        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: '0 0 0 0.5rem' }}>
                                            Always assume the absolute worst. If searching an array, assume the item is at the very end or doesn't exist. Big O is about guarantees.
                                        </p>
                                    </div>
                                    <div style={{ padding: '1.25rem', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', position: 'relative' }}>
                                        <div style={{ position: 'absolute', top: '-10px', left: '-10px', width: '28px', height: '28px', background: '#0ea5e9', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>2</div>
                                        <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', fontSize: '1.1rem', marginLeft: '0.5rem' }}>Drop Constants</h4>
                                        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: '0 0 0 0.5rem' }}>
                                            Hardware speed varies, so we don't care about fixed multipliers. <code style={{ color: '#0ea5e9' }}>O(2n)</code> or <code style={{ color: '#0ea5e9' }}>O(100n)</code> is entirely simplified to just <code style={{ color: '#0ea5e9', fontWeight: 'bold' }}>O(n)</code>.
                                        </p>
                                    </div>
                                    <div style={{ padding: '1.25rem', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', position: 'relative' }}>
                                        <div style={{ position: 'absolute', top: '-10px', left: '-10px', width: '28px', height: '28px', background: '#8b5cf6', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>3</div>
                                        <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', fontSize: '1.1rem', marginLeft: '0.5rem' }}>Drop Non-Dominant Terms</h4>
                                        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: '0 0 0 0.5rem' }}>
                                            When <strong style={{ color: '#8b5cf6' }}>n</strong> is extremely large, lower terms are basically zero. <code style={{ color: '#8b5cf6' }}>O(n² + 5n + 100)</code> simply becomes <code style={{ color: '#8b5cf6', fontWeight: 'bold' }}>O(n²)</code>. The fastest growing term always wins.
                                        </p>
                                    </div>
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
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
                            <div style={{ padding: '1.5rem', borderLeft: '4px solid #ef4444', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '0 12px 12px 0' }}>
                                <h4 style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '1.25rem' }}>Big O (O)</h4>
                                <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Upper Bound (Worst Case)</p>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                    Describes the <strong>maximum</strong> time an algorithm could take. It guarantees that the algorithm will never be slower than this.
                                </p>
                                <div style={{ marginTop: '1rem', fontStyle: 'italic', fontSize: '0.85rem' }}>"f(n) is O(g(n)) if f(n) ≤ c · g(n)"</div>
                            </div>
                            <div style={{ padding: '1.5rem', borderLeft: '4px solid #22c55e', background: 'rgba(34, 197, 94, 0.05)', borderRadius: '0 12px 12px 0' }}>
                                <h4 style={{ color: '#22c55e', marginBottom: '1rem', fontSize: '1.25rem' }}>Big Omega (Ω)</h4>
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
                            <div style={{ padding: '1.5rem', borderLeft: '4px solid #8b5cf6', background: 'rgba(139, 92, 246, 0.05)', borderRadius: '0 12px 12px 0' }}>
                                <h4 style={{ color: '#8b5cf6', marginBottom: '1rem', fontSize: '1.25rem' }}>Amortized Time</h4>
                                <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Average over time</p>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                    Guarantees average performance over a sequence of operations. A costly operation is averaged out by many subsequent cheap ones (e.g., resizing a dynamic array).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Understanding Logarithms */}
                <div style={{ marginBottom: '4rem' }}>
                    <div className="glass" style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, transparent 70%)', borderRadius: '50%', zIndex: 0 }} />
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(249,115,22,0.4)' }}>
                                    <TrendingUp size={24} color="white" />
                                </div>
                                Understanding <span style={{
                                    background: 'linear-gradient(135deg, #fdba74 0%, #ea580c 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    display: 'inline-block'
                                }}>Logarithms</span>
                            </h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2.5rem', maxWidth: '900px' }}>
                                In computer science algorithms, when we see <strong style={{ color: '#f97316' }}>O(log n)</strong>, we are almost always talking about <strong>base-2 logarithms (log₂)</strong>. But what exactly is a logarithm mathematically and practically? 
                                <br/><br/>
                                Simply put, while exponential growth means <em>doubling</em> things, logarithmic growth means <em>halving</em> them. Asking for <code>log₂(n)</code> is essentially asking: <strong>"How many times do I need to divide <code style={{ color: '#f97316' }}>n</code> by 2 to get down to 1?"</strong>
                            </p>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <h4 style={{ color: '#fdba74', marginBottom: '1rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <RotateCcw size={18} /> The Math: Exponents Reversed
                                    </h4>
                                    <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                        If an exponent tells you how many times to multiply a number by itself (<code style={{ color: 'var(--text-main)' }}>2³ = 8</code>), a logarithm tells you what exponent was used to get a result (<code style={{ color: 'var(--text-main)' }}>log₂(8) = 3</code>).
                                    </p>
                                    <div style={{ background: 'rgba(249, 115, 22, 0.1)', padding: '1.25rem', borderRadius: '12px', borderLeft: '4px solid #f97316', fontFamily: 'var(--font-mono)', fontSize: '1rem', display: 'flex', justifyContent: 'center' }}>
                                        2<sup style={{ fontSize: '0.7em' }}>x</sup> = y &nbsp;&nbsp; ⟺ &nbsp;&nbsp; log₂(y) = x
                                    </div>
                                </div>
                                
                                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <h4 style={{ color: '#fdba74', marginBottom: '1rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Layers size={18} /> How to Calculate: log₂(16)
                                    </h4>
                                    <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1rem' }}>Let's see how many times we can divide 16 by 2:</p>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.8', fontFamily: 'var(--font-mono)' }}>
                                        <li>Step 1: 16 ÷ 2 = <strong style={{ color: 'var(--text-main)' }}>8</strong></li>
                                        <li>Step 2:  8 ÷ 2 = <strong style={{ color: 'var(--text-main)' }}>4</strong></li>
                                        <li>Step 3:  4 ÷ 2 = <strong style={{ color: 'var(--text-main)' }}>2</strong></li>
                                        <li>Step 4:  2 ÷ 2 = <strong style={{ color: 'var(--text-main)' }}>1</strong></li>
                                    </ul>
                                    <div style={{ marginTop: '1rem', fontWeight: '700', color: '#f97316', background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '8px', textAlign: 'center' }}>
                                        Total Steps = 4 ∴ log₂(16) = 4
                                    </div>
                                </div>
                                
                                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <h4 style={{ color: '#fdba74', marginBottom: '1rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Zap size={18} /> Why It's Amazing
                                    </h4>
                                    <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                        Algorithms with <code style={{ color: '#f97316' }}>O(log n)</code> complexity are incredibly efficient. Even with a massive input size, the number of operations remains staggeringly small because halving destroys data fast.
                                    </p>
                                    <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'var(--text-muted)' }}>n = 1,000</span> <strong style={{ color: '#f97316' }}>≈ 10 operations</strong>
                                        </div>
                                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'var(--text-muted)' }}>n = 1,000,000</span> <strong style={{ color: '#f97316' }}>≈ 20 operations</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div style={{ marginTop: '3rem', padding: '2.5rem', borderRadius: '16px', background: 'rgba(249, 115, 22, 0.05)', border: '1px solid rgba(249, 115, 22, 0.2)' }}>
                                <h4 style={{ color: '#fdba74', marginBottom: '2rem', fontSize: '1.4rem', borderBottom: '1px solid rgba(249, 115, 22, 0.2)', paddingBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Search size={22} color="#f97316" />
                                    Deep Dive: Where do Logarithms appear in DSA?
                                </h4>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
                                    <div>
                                        <h5 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <div style={{ width: '8px', height: '8px', background: '#f97316', borderRadius: '50%' }}></div>
                                            1. Divide and Conquer
                                        </h5>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                                            Whenever an algorithm divides the problem size by a fraction (typically halving it) at each step, you get <code style={{ color: '#f97316' }}>O(log n)</code>.
                                            <strong>Binary Search</strong> is the classic example: searching a sorted array not element-by-element, but by splitting it in half repeatedly.
                                        </p>
                                    </div>
                                    <div>
                                        <h5 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <div style={{ width: '8px', height: '8px', background: '#f97316', borderRadius: '50%' }}></div>
                                            2. Trees and Hierarchies
                                        </h5>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                                            A perfectly balanced Binary Tree with <code style={{ color: 'var(--text-main)' }}>n</code> nodes has a height of exactly <code style={{ color: '#f97316' }}>log₂(n)</code>. When going down a path from the root to a leaf, the number of steps is proportional to the tree's height. This powers efficient BSTs and Heaps.
                                        </p>
                                    </div>
                                    <div>
                                        <h5 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <div style={{ width: '8px', height: '8px', background: '#f97316', borderRadius: '50%' }}></div>
                                            3. Does the Base matter?
                                        </h5>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                                            In Big O notation, <code style={{ color: '#f97316' }}>O(log₂ n)</code>, <code style={{ color: '#f97316' }}>O(log₁₀ n)</code>, and <code style={{ color: '#f97316' }}>O(ln n)</code> are mathematically equivalent because they only differ by a constant multiplier. Since Big O ignores constants, we usually just write <code style={{ color: '#f97316' }}>O(log n)</code>.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>

                {/* Space Complexity Callout */}
                <div style={{ marginBottom: '4rem' }}>
                    <div className="glass" style={{ padding: '2rem 3rem', display: 'flex', alignItems: 'center', gap: '2rem', borderLeft: '4px solid #0ea5e9', flexDirection: 'row', flexWrap: 'wrap' }}>
                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 20px rgba(14,165,233,0.3)' }}>
                            <HardDrive size={32} color="white" />
                        </div>
                        <div style={{ flex: '1 1 300px' }}>
                            <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', color: '#fff', fontWeight: '800' }}>Don't Forget About <span style={{ color: '#38bdf8' }}>Space Complexity!</span></h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6', margin: 0 }}>
                                While we often obsess over execution speed (Time Complexity), <strong>Space Complexity</strong> measures how much extra memory an algorithm requires as input grows. 
                                In modern systems with massive datasets, solving problems <code style={{ color: '#38bdf8' }}>in-place (O(1) space)</code> is often just as critical as raw speed.
                            </p>
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

                {/* Dashboard Layout */}
                <div className="dsa-dashboard-layout" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '4rem' }}>

                    {/* Premium Horizontal Complexity Selector */}
                    <div className="hide-scroll" style={{ 
                        display: 'flex', 
                        gap: '1rem', 
                        overflowX: 'auto', 
                        padding: '0.5rem',
                        margin: '-0.5rem', // to offset padding for box-shadows
                        WebkitOverflowScrolling: 'touch',
                        msOverflowStyle: 'none',
                        scrollbarWidth: 'none'
                    }}>
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

                    {/* Right Side - Dashboard Main Content */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                        {/* Top Row: Code and Graph */}
                        <div className="dsa-content-row" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'stretch' }}>

                            {/* ── Code Panel ── */}
                            <div className="glass" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
                                {/* Mac-style Window Header */}
                                <div style={{
                                    padding: '0.9rem 1.5rem',
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
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        {/* Selected algorithm title */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}>
                                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: selectedExample.color, boxShadow: `0 0 8px ${selectedExample.color}`, flexShrink: 0 }} />
                                            <span style={{ color: selectedExample.color, fontWeight: '700', fontSize: '0.9rem' }}>{selectedExample.name}</span>
                                        </div>
                                        <div style={{
                                            fontSize: '0.8rem', fontFamily: 'var(--font-mono)',
                                            color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)',
                                            padding: '0.25rem 0.85rem', borderRadius: '99px', border: '1px solid rgba(255,255,255,0.06)'
                                        }}>algorithm.js</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.6rem' }}>
                                        <button
                                            onClick={isAnimating ? resetAnimation : startAnimation}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: '0.4rem',
                                                padding: '0.5rem 1.1rem', borderRadius: '8px',
                                                background: selectedExample.color, color: 'white', border: 'none',
                                                cursor: 'pointer', fontWeight: '700', fontSize: '0.85rem',
                                                boxShadow: `0 4px 12px ${selectedExample.color}50`
                                            }}
                                        >
                                            {isAnimating ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                                            {isAnimating ? 'Pause' : 'Animate'}
                                        </button>
                                        <button
                                            onClick={resetAnimation}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: '0.4rem',
                                                padding: '0.5rem 1rem', borderRadius: '8px',
                                                background: 'rgba(255,255,255,0.06)', color: 'var(--text-main)',
                                                border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer',
                                                fontWeight: '600', fontSize: '0.85rem'
                                            }}
                                        >
                                            <RotateCcw size={13} /> Reset
                                        </button>
                                    </div>
                                </div>

                                {/* Code display */}
                                <div style={{ background: '#090c14', padding: '1.5rem 0' }}>
                                    <pre style={{
                                        margin: 0, fontSize: '0.95rem', lineHeight: '1.85',
                                        overflowX: 'auto', fontFamily: "'JetBrains Mono', 'Courier New', monospace"
                                    }}>
                                        {codeLines.map((line, index) => {
                                            const lineNum = index + 1;
                                            const annotation = selectedExample.annotations.find(a => a.line === lineNum);
                                            const isHighlighted = highlightedLine === lineNum;
                                            return (
                                                <div
                                                    key={index}
                                                    style={{
                                                        display: 'flex', alignItems: 'center',
                                                        padding: '0.15rem 1.5rem',
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
                                                            <Clock size={11} />{annotation.count}
                                                        </motion.div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </pre>
                                </div>
                            </div>

                            {/* Selected Complexity Graph */}
                            <div className="glass" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${selectedExample.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Activity size={18} color={selectedExample.color} />
                                    </div>
                                    <div>
                                        <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-main)' }}>Growth Curve</h4>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{selectedExample.complexity}</span>
                                    </div>
                                </div>
                                <div style={{ height: '280px', background: 'rgba(0,0,0,0.15)', borderRadius: '12px', padding: '1.5rem 1rem 0.5rem 0', border: '1px solid rgba(255,255,255,0.03)' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={miniChartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor={selectedExample.color} stopOpacity={0.4} />
                                                    <stop offset="95%" stopColor={selectedExample.color} stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                            <XAxis dataKey="n" stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} tickLine={false} />
                                            <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} tickLine={false} scale="log" domain={['dataMin', 'dataMax']} tickFormatter={val => val >= 1000 ? (val / 1000).toFixed(0) + 'k' : val.toString()} width={40} />
                                            <Tooltip
                                                contentStyle={{ background: '#0f172a', border: `1px solid ${selectedExample.color}40`, borderRadius: '8px', fontSize: '0.8rem' }}
                                                itemStyle={{ color: selectedExample.color, fontWeight: '700' }}
                                                labelStyle={{ color: 'var(--text-muted)' }}
                                                formatter={(value: unknown) => {
                                                    const num = typeof value === 'number' ? value : Number(value);
                                                    if (isNaN(num)) return ['—', 'Operations'];
                                                    return [num >= 1000000 ? (num / 1000000).toFixed(1) + 'M' : num.toString(), 'Operations'];
                                                }}
                                            />
                                            <Area type="monotone" dataKey="val" name="Operations" stroke={selectedExample.color} strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                                <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                                    At <strong>n = 15</strong>, this algorithm roughly requires <strong>{miniChartData[14].val >= 1000000 ? (miniChartData[14].val / 1000000).toFixed(1) + 'M' : miniChartData[14].val.toLocaleString()}</strong> operations.
                                </p>
                            </div>
                        </div>

                        {/* ── Row 2: Three Info Cards ── */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                            {/* Time Complexity */}
                            <div className="glass" style={{ padding: '1.75rem', borderTop: `3px solid ${selectedExample.color}` }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                                    <div style={{
                                        width: '30px', height: '30px', borderRadius: '8px', flexShrink: 0,
                                        background: `linear-gradient(135deg, ${selectedExample.color}, ${selectedExample.color}bb)`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}><Clock size={16} color="white" /></div>
                                    <span style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Time Complexity</span>
                                </div>
                                <div style={{ fontSize: '2rem', fontWeight: '800', color: selectedExample.color, marginBottom: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                                    {selectedExample.complexity}
                                </div>
                                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                                    {selectedExample.totalExplanation}
                                </p>
                            </div>

                            {/* Space Complexity */}
                            <div className="glass" style={{ padding: '1.75rem', borderTop: '3px solid #8b5cf6' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                                    <div style={{
                                        width: '30px', height: '30px', borderRadius: '8px', flexShrink: 0,
                                        background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}><HardDrive size={16} color="white" /></div>
                                    <span style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Space Complexity</span>
                                </div>
                                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#8b5cf6', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                                    {selectedExample.spaceComplexity}
                                </div>
                                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                                    {selectedExample.spaceExplanation}
                                </p>
                            </div>

                            {/* Real-World */}
                            <div className="glass" style={{ padding: '1.75rem', borderTop: '3px solid #0ea5e9' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                                    <div style={{
                                        width: '30px', height: '30px', borderRadius: '8px', flexShrink: 0,
                                        background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}><BookOpen size={16} color="white" /></div>
                                    <span style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Real-World Use</span>
                                </div>
                                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                                    {selectedExample.realWorld}
                                </p>
                            </div>
                        </div>

                        {/* ── Row 3: Operation Counting ── */}
                        <div className="glass" style={{ padding: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '8px',
                                    background: 'linear-gradient(135deg, #eab308, #ca8a04)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}><Clock size={18} color="white" /></div>
                                <h4 style={{ fontSize: '1.2rem', margin: 0, fontWeight: '700' }}>Operation Counting</h4>
                                <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                    Click a step to jump to that line
                                </span>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                                {selectedExample.annotations.map((annotation, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.07 }}
                                        onClick={() => setHighlightedLine(annotation.line)}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '1rem',
                                            padding: '1.1rem 1.25rem', borderRadius: '12px',
                                            border: `1px solid ${currentAnnotationIndex === index && isAnimating ? selectedExample.color + '60' : 'rgba(255,255,255,0.07)'}`,
                                            background: currentAnnotationIndex === index && isAnimating
                                                ? `${selectedExample.color}12` : 'rgba(255,255,255,0.02)',
                                            cursor: 'pointer', transition: 'all 0.3s ease'
                                        }}
                                        whileHover={{ scale: 1.02, backgroundColor: `${selectedExample.color}10` }}
                                    >
                                        {/* Line number badge */}
                                        <div style={{
                                            width: '34px', height: '34px', borderRadius: '50%', flexShrink: 0,
                                            background: `${selectedExample.color}20`, color: selectedExample.color,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontWeight: '800', fontSize: '0.9rem', border: `2px solid ${selectedExample.color}40`
                                        }}>{annotation.line}</div>

                                        {/* Text */}
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <p style={{ fontSize: '0.88rem', margin: '0 0 0.3rem 0', lineHeight: '1.4', color: 'var(--text-main)' }}>
                                                {annotation.text}
                                            </p>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Line {annotation.line}</span>
                                        </div>

                                        {/* Count badge */}
                                        <code style={{
                                            padding: '0.3rem 0.75rem', borderRadius: '6px', fontSize: '0.85rem',
                                            fontWeight: '800', color: selectedExample.color, flexShrink: 0,
                                            background: `${selectedExample.color}15`, border: `1px solid ${selectedExample.color}30`
                                        }}>{annotation.count}</code>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* ── Row 4: Quick Counting Rules ── */}
                        <div className="glass" style={{
                            padding: '1.5rem 2rem',
                            background: 'linear-gradient(135deg, rgba(234,179,8,0.06) 0%, rgba(217,119,6,0.03) 100%)',
                            border: '1px solid rgba(234,179,8,0.18)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                                <span style={{ fontSize: '1.2rem' }}>⚡</span>
                                <h5 style={{ margin: 0, fontSize: '1rem', color: '#eab308', fontWeight: '700' }}>Quick Counting Rules</h5>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                {[
                                    { rule: 'Single loop over n elements', result: 'O(n)', color: '#6366f1' },
                                    { rule: 'Nested loops', result: 'O(n²)', color: '#eab308' },
                                    { rule: 'Halving input each step', result: 'O(log n)', color: '#f97316' },
                                    { rule: 'Fixed set of operations', result: 'O(1)', color: '#22c55e' },
                                    { rule: 'Loop + halving combined', result: 'O(n log n)', color: '#14b8a6' },
                                    { rule: 'Recursive branching (2 calls)', result: 'O(2ⁿ)', color: '#ef4444' },
                                ].map((item, i) => (
                                    <div key={i} style={{
                                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                                        padding: '0.6rem 1.1rem', borderRadius: '99px',
                                        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                                        fontSize: '0.84rem'
                                    }}>
                                        <span style={{ color: 'var(--text-muted)' }}>{item.rule}</span>
                                        <span style={{ color: 'rgba(255,255,255,0.2)' }}>→</span>
                                        <code style={{ color: item.color, fontWeight: '700' }}>{item.result}</code>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div> {/* end vertical stack */}
                </div> {/* end dsa-dashboard-layout */}



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
                                    { c: 'O(1)', n10: '1', n100: '1', n1k: '1', n10k: '1', ex: 'Array access, Hash lookup', color: '#22c55e', bg: 'rgba(34, 197, 94, 0.05)' },
                                    { c: 'O(log n)', n10: '3', n100: '7', n1k: '10', n10k: '13', ex: 'Binary Search', color: '#f97316', bg: 'rgba(249, 115, 22, 0.05)' },
                                    { c: 'O(n)', n10: '10', n100: '100', n1k: '1,000', n10k: '10,000', ex: 'Linear Search, Find Max', color: '#6366f1', bg: 'rgba(99, 102, 241, 0.05)' },
                                    { c: 'O(n log n)', n10: '33', n100: '664', n1k: '9,966', n10k: '132,877', ex: 'Merge/Quick Sort', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.05)' },
                                    { c: 'O(n²)', n10: '100', n100: '10,000', n1k: '1,000,000', n10k: '100,000,000', ex: 'Bubble/Selection Sort', color: '#eab308', bg: 'rgba(234, 179, 8, 0.05)' },
                                    { c: 'O(n³)', n10: '1,000', n100: '1,000,000', n1k: '1×10⁹', n10k: '1×10¹³', ex: 'Matrix Multiplication', color: '#f43f5e', bg: 'rgba(244, 63, 94, 0.05)' },
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
                            <motion.div whileHover={{ y: -5 }} style={{ padding: '2rem', borderRadius: '20px', background: 'rgba(34, 197, 94, 0.05)', border: '1px solid rgba(34, 197, 94, 0.2)', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(34, 197, 94, 0.2) 0%, transparent 70%)', borderRadius: '50%' }} />
                                <Search size={32} color="#22c55e" style={{ marginBottom: '1rem' }} />
                                <h4 style={{ color: '#22c55e', marginBottom: '1rem', fontSize: '1.3rem', fontWeight: '700' }}>Divide & Conquer</h4>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                    Break problem into smaller subproblems, solve recursively, combine solutions.
                                </p>
                                <div style={{ fontSize: '0.9rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px' }}>
                                    <div style={{ marginBottom: '0.25rem' }}><strong style={{ color: 'var(--text-main)' }}>Time:</strong> <code style={{ color: '#22c55e' }}>O(n log n)</code> or <code style={{ color: '#22c55e' }}>O(log n)</code></div>
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
                            <motion.div whileHover={{ y: -5 }} style={{ padding: '2rem', borderRadius: '20px', background: 'rgba(234, 179, 8, 0.05)', border: '1px solid rgba(234, 179, 8, 0.2)', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(234, 179, 8, 0.2) 0%, transparent 70%)', borderRadius: '50%' }} />
                                <Zap size={32} color="#eab308" style={{ marginBottom: '1rem' }} />
                                <h4 style={{ color: '#eab308', marginBottom: '1rem', fontSize: '1.3rem', fontWeight: '700' }}>Greedy Algorithms</h4>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                    Make locally optimal choices at each step to find global optimum.
                                </p>
                                <div style={{ fontSize: '0.9rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px' }}>
                                    <div style={{ marginBottom: '0.25rem' }}><strong style={{ color: 'var(--text-main)' }}>Time:</strong> Usually <code style={{ color: '#eab308' }}>O(n log n)</code></div>
                                    <div><strong style={{ color: 'var(--text-main)' }}>Examples:</strong> Dijkstra's, Huffman</div>
                                </div>
                            </motion.div>
                            <motion.div whileHover={{ y: -5 }} style={{ padding: '2rem', borderRadius: '20px', background: 'rgba(244, 63, 94, 0.05)', border: '1px solid rgba(244, 63, 94, 0.2)', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(244, 63, 94, 0.2) 0%, transparent 70%)', borderRadius: '50%' }} />
                                <Layers size={32} color="#f43f5e" style={{ marginBottom: '1rem' }} />
                                <h4 style={{ color: '#f43f5e', marginBottom: '1rem', fontSize: '1.3rem', fontWeight: '700' }}>Tree/Graph Traversal</h4>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                    Visit all nodes in a tree or graph structure systematically.
                                </p>
                                <div style={{ fontSize: '0.9rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px' }}>
                                    <div style={{ marginBottom: '0.25rem' }}><strong style={{ color: 'var(--text-main)' }}>Time:</strong> <code style={{ color: '#f43f5e' }}>O(V + E)</code> or <code style={{ color: '#f43f5e' }}>O(n)</code></div>
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
                        ].map((prob, i) => {
                            const isRevealed = revealedProblems.has(i);
                            return (
                                <motion.div key={prob.title} whileHover={{ y: -5, boxShadow: '0 12px 40px rgba(0,0,0,0.4)' }} style={{ padding: '2rem', borderRadius: '20px', background: 'var(--surface-color)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
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
        </>
    );
};

export default BigODetail;
