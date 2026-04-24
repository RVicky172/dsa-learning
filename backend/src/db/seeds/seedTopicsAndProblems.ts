import { db } from '../client.js';

// Minimal schema from frontend topicsData for seeding
interface TopicFromFrontend {
  id: string;
  title: string;
  description: string;
}

interface ProblemFromFrontend {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  statement: string;
  solution?: {
    explanation: string;
  };
}

// Sample topics and problems (extracted from frontend topicsData)
const sampleTopics: TopicFromFrontend[] = [
  {
    id: 'arrays',
    title: 'Arrays',
    description: 'Master the fundamentals of arrays, the most basic data structure.'
  },
  {
    id: 'linked-lists',
    title: 'Linked Lists',
    description: 'Learn about node-based linear data structures and pointer manipulation.'
  },
  {
    id: 'stacks-queues',
    title: 'Stacks & Queues',
    description: 'Understand LIFO and FIFO data structures and their applications.'
  },
  {
    id: 'trees',
    title: 'Trees',
    description: 'Explore hierarchical data structures and tree traversal techniques.'
  },
  {
    id: 'graphs',
    title: 'Graphs',
    description: 'Master graph algorithms including BFS, DFS, and shortest paths.'
  }
];

const sampleProblems: Record<string, ProblemFromFrontend[]> = {
  arrays: [
    {
      id: 'arr-001',
      title: 'Two Sum',
      difficulty: 'Easy',
      statement: 'Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.',
      solution: { explanation: 'Use a hash map to store numbers and their indices for O(n) time.' }
    },
    {
      id: 'arr-002',
      title: 'Best Time to Buy and Sell Stock',
      difficulty: 'Easy',
      statement: 'Find the maximum profit from buying and selling a stock once.',
      solution: { explanation: 'Track minimum price as you iterate, calculate max profit.' }
    },
    {
      id: 'arr-003',
      title: 'Container With Most Water',
      difficulty: 'Medium',
      statement: 'Find two lines that together with the x-axis form a container that holds the most water.',
      solution: { explanation: 'Use two pointers starting from both ends, move inward.' }
    },
    {
      id: 'arr-004',
      title: 'Trapping Rain Water',
      difficulty: 'Hard',
      statement: 'Calculate how much rain water can be trapped between elevation lines.',
      solution: { explanation: 'Use dynamic programming with left and right max heights.' }
    }
  ],
  'linked-lists': [
    {
      id: 'll-001',
      title: 'Reverse Linked List',
      difficulty: 'Easy',
      statement: 'Reverse the nodes of a singly linked list.',
      solution: { explanation: 'Iterative approach: maintain prev, curr, next pointers.' }
    },
    {
      id: 'll-002',
      title: 'Merge Two Sorted Lists',
      difficulty: 'Easy',
      statement: 'Merge two sorted linked lists into one sorted list.',
      solution: { explanation: 'Compare nodes and link smaller node to result list.' }
    },
    {
      id: 'll-003',
      title: 'Detect Cycle in Linked List',
      difficulty: 'Medium',
      statement: 'Detect if a linked list contains a cycle.',
      solution: { explanation: 'Use Floyd cycle detection with slow and fast pointers.' }
    }
  ],
  'stacks-queues': [
    {
      id: 'sq-001',
      title: 'Valid Parentheses',
      difficulty: 'Easy',
      statement: 'Determine if a string of brackets is valid.',
      solution: { explanation: 'Use a stack to match opening and closing brackets.' }
    },
    {
      id: 'sq-002',
      title: 'Min Stack',
      difficulty: 'Medium',
      statement: 'Implement a stack that supports push, pop, top, and retrieving minimum in O(1).',
      solution: { explanation: 'Maintain two stacks: one for values, one for minimums.' }
    }
  ],
  trees: [
    {
      id: 'tree-001',
      title: 'Binary Tree Inorder Traversal',
      difficulty: 'Easy',
      statement: 'Traverse a binary tree in inorder (left, root, right).',
      solution: { explanation: 'Recursive or iterative with explicit stack.' }
    },
    {
      id: 'tree-002',
      title: 'Maximum Path Sum',
      difficulty: 'Hard',
      statement: 'Find the maximum sum of any path in a binary tree.',
      solution: { explanation: 'DFS with post-order traversal, track max at each node.' }
    }
  ],
  graphs: [
    {
      id: 'graph-001',
      title: 'Number of Islands',
      difficulty: 'Medium',
      statement: 'Count the number of islands in a grid (connected 1s).',
      solution: { explanation: 'DFS or BFS to explore connected components.' }
    },
    {
      id: 'graph-002',
      title: 'Shortest Path in a Grid',
      difficulty: 'Medium',
      statement: 'Find the shortest path in a grid with obstacles.',
      solution: { explanation: 'Use BFS to find shortest path level by level.' }
    }
  ]
};

async function seedTopicsAndProblems(): Promise<void> {
  try {
    console.log('Starting to seed topics and problems...');

    // Seed topics
    for (const topic of sampleTopics) {
      const existingTopic = await db.query(
        'SELECT id FROM topics WHERE slug = $1 LIMIT 1',
        [topic.id]
      );

      if (!existingTopic.rows[0]) {
        await db.query(
          `
          INSERT INTO topics (slug, title, description, order_index, is_published)
          VALUES ($1, $2, $3, $4, true)
          `,
          [topic.id, topic.title, topic.description, sampleTopics.indexOf(topic)]
        );
        console.log(`✓ Created topic: ${topic.title}`);
      }
    }

    // Seed problems
    for (const [topicSlug, problems] of Object.entries(sampleProblems)) {
      const topicResult = await db.query(
        'SELECT id FROM topics WHERE slug = $1',
        [topicSlug]
      );

      if (!topicResult.rows[0]) {
        console.warn(`Topic not found for slug: ${topicSlug}`);
        continue;
      }

      const topicId = topicResult.rows[0].id;

      for (const problem of problems) {
        const existingProblem = await db.query(
          'SELECT id FROM problems WHERE slug = $1 LIMIT 1',
          [problem.id]
        );

        if (!existingProblem.rows[0]) {
          const result = await db.query<{ id: string }>(
            `
            INSERT INTO problems (topic_id, slug, title, difficulty, statement, is_premium)
            VALUES ($1, $2, $3, $4, $5, false)
            RETURNING id
            `,
            [
              topicId,
              problem.id,
              problem.title,
              problem.difficulty,
              problem.statement
            ]
          );

          const problemId = result.rows[0].id;

          // Add a solution for the problem
          if (problem.solution) {
            await db.query(
              `
              INSERT INTO problem_solutions (problem_id, language, approach, code, time_complexity, space_complexity, is_optimal)
              VALUES ($1, $2, $3, $4, $5, $6, true)
              `,
              [
                problemId,
                'javascript',
                problem.solution.explanation,
                '// Solution code placeholder',
                'O(n)',
                'O(1)'
              ]
            );
          }

          console.log(`  ✓ Created problem: ${problem.title} (${problem.difficulty})`);
        }
      }
    }

    console.log('\n✅ Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedTopicsAndProblems();
