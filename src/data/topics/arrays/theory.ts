import type { Topic } from '../../../types/topic';

export const arraysTheory: Pick<Topic, 'introduction' | 'whyImportant' | 'whenToUse' | 'advantages' | 'disadvantages' | 'concepts' | 'operations' | 'applications'> = {
  introduction: `Arrays and strings are the most fundamental data structures in computer science. An array is a collection of elements stored in contiguous memory locations, making it possible to calculate the position of each element by simply adding an offset to a base value. This contiguous memory allocation makes arrays incredibly efficient for random access operations.

At a deeper level, arrays represent how computers store data in physical RAM. When you declare an array of size 10, the operating system allocates a continuous block of memory address space. This "locality of reference" is what makes arrays faster than linked lists for many tasks, as modern CPU caches are optimized for reading contiguous blocks of data (spatial locality).

Strings, in most programming languages, are essentially arrays of characters. They inherit many properties from arrays while adding their own unique characteristics and operations. Understanding arrays and strings is crucial because they form the foundation for more complex data structures and algorithms.

The power of arrays lies in their simplicity and efficiency. With O(1) time complexity for accessing elements by index, arrays provide the fastest way to retrieve data when you know the position. However, this efficiency comes with trade-offs in flexibility, particularly when it comes to insertion and deletion operations.

## Memory Layout & Performance

Arrays leverage the principle of spatial locality. When a CPU accesses array[0], modern processors load the surrounding memory into the L1/L2 cache. This means accessing array[1] is nearly free - it's already in the cache! This is why iterating through arrays is so fast. In contrast, linked lists suffer from poor cache performance because nodes are scattered throughout memory.

## Dynamic Arrays

Most modern languages provide dynamic arrays (vectors in C++, lists in Python, arrays in JavaScript) that automatically resize when you add elements beyond their capacity. This is done using amortized analysis: when capacity is exceeded, a new array (usually double the size) is allocated, and all elements are copied. While the copy operation is O(n), amortized across many insertions, the average cost per insertion remains O(1).`,

  whyImportant: `Arrays and strings appear in virtually every programming task. From storing user data to processing text, from implementing other data structures to solving complex algorithmic problems, arrays are everywhere. Mastering array manipulation is essential for technical interviews and real-world software development. Many advanced algorithms (sorting, searching, dynamic programming) work on arrays. Understanding arrays deeply gives you the foundation to tackle more complex topics.`,

  whenToUse: [
    'When you need fast random access to elements',
    'When the size of your data is known or doesn\'t change frequently',
    'When you need to store homogeneous data elements',
    'When implementing other data structures like stacks, queues, or hash tables',
    'For text processing and string manipulation tasks',
    'When cache performance is important (contiguous memory)',
    'For implementing algorithms like sorting and searching'
  ],

  advantages: [
    'O(1) time complexity for accessing elements by index',
    'Cache-friendly due to contiguous memory allocation',
    'Simple and intuitive to use',
    'Efficient memory usage when size is known',
    'Excellent for iteration and traversal',
    'Fast sequential access patterns',
    'Efficient for implementing stacks and queues'
  ],

  disadvantages: [
    'Fixed size in many languages (static arrays)',
    'Expensive insertion and deletion operations (O(n) in worst case)',
    'Wasted memory if array is not fully utilized',
    'Difficulty in resizing (requires creating new array and copying elements)',
    'Requires contiguous memory block (can fail for very large arrays)',
    'Not suitable for frequent insertions in the middle'
  ],

  concepts: [
    {
      name: 'Index-based Access',
      description: 'Elements are accessed using their position (index), starting from 0. This allows for constant-time retrieval of any element. The address of any element can be calculated as: baseAddress + (index × elementSize).'
    },
    {
      name: 'Contiguous Memory',
      description: 'Array elements are stored in consecutive memory locations, enabling efficient access and cache performance. This is the key difference from linked lists and is why random access is so fast.'
    },
    {
      name: 'Static vs Dynamic Arrays',
      description: 'Static arrays have fixed size determined at compile time, while dynamic arrays (like JavaScript arrays or Python lists) can grow and shrink automatically at runtime.'
    },
    {
      name: 'String Immutability',
      description: 'In many languages, strings are immutable - operations create new strings rather than modifying existing ones. This affects performance considerations for string operations.'
    },
    {
      name: 'Multi-dimensional Arrays',
      description: 'Arrays can contain other arrays, creating matrices and higher-dimensional structures for complex data representation. In memory, these are usually laid out in row-major or column-major order.'
    },
    {
      name: 'Amortized Analysis',
      description: 'For dynamic arrays, individual insertions may be O(n) when resizing, but the amortized cost across many insertions is O(1). This is important for understanding performance in practice.'
    },
    {
      name: 'Subarray Problems',
      description: 'Many problems involve finding subarrays with specific properties. Techniques like sliding window and prefix sums make these efficient.'
    }
  ],

  operations: [
    { name: 'Access by Index', complexity: 'O(1)' },
    { name: 'Search (unsorted)', complexity: 'O(n)' },
    { name: 'Search (sorted)', complexity: 'O(log n)' },
    { name: 'Insert at End', complexity: 'O(1) amortized' },
    { name: 'Insert at Beginning', complexity: 'O(n)' },
    { name: 'Insert at Middle', complexity: 'O(n)' },
    { name: 'Delete from End', complexity: 'O(1)' },
    { name: 'Delete from Beginning', complexity: 'O(n)' },
    { name: 'Delete from Middle', complexity: 'O(n)' },
    { name: 'Sort', complexity: 'O(n log n)' }
  ],

  applications: [
    {
      name: 'Database Indexing',
      description: 'Databases use arrays and array-like structures for efficient data storage and retrieval.',
      example: 'B-tree indexes in SQL databases store multiple keys in arrays for efficient searching'
    },
    {
      name: 'Image Processing',
      description: '2D arrays represent pixels in images, enabling various visual transformations.',
      example: 'Image filters, rotations, and compressions all work with pixel arrays'
    },
    {
      name: 'Matrix Operations',
      description: '2D arrays are fundamental to linear algebra and scientific computing.',
      example: 'Neural networks, graph algorithms, and physics simulations use matrix operations'
    },
    {
      name: 'Text Processing',
      description: 'Strings (arrays of characters) are essential for text manipulation and parsing.',
      example: 'Search engines, text editors, compilers all rely on string processing'
    },
    {
      name: 'Stacks and Queues',
      description: 'Abstract data types implemented on top of arrays.',
      example: 'Function call stacks, task scheduling, and undo/redo functionality'
    },
    {
      name: 'Cache Management',
      description: 'Arrays take advantage of CPU cache for high-performance data access.',
      example: 'Modern processors prefer array access patterns over random memory access'
    }
  ]
};
