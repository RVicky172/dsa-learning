/**
 * Universal seed script for ALL 143 problems from frontend
 * 
 * This script:
 * 1. Reads all problem modules from the frontend using file I/O
 * 2. Maps frontend topics to database slugs
 * 3. Seeds all 143 problems to the database
 * 4. Handles duplicates gracefully
 * 
 * Usage: npm run seed:all-problems
 */

import { db } from '../client.js';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';


interface Problem {
  id: string;
  title: string;
  difficulty: string;
  description: string;
  examples?: Array<{ input: string; output: string; explanation?: string }>;
  solution?: {
    approach?: string;
    code?: string;
    stepByStep?: string[];
    timeComplexity?: string;
    spaceComplexity?: string;
  };
  hints?: string[];
}

// Topic mapping with file names
const TOPIC_CONFIG: Record<
  string,
  {
    slug: string;
    title: string;
    description: string;
    file: string;
  }
> = {
  arrays: {
    slug: 'arrays',
    title: 'Arrays & Strings',
    description: 'Fundamental building blocks for data storage and manipulation.',
    file: 'arrays'
  },
  'hash-tables': {
    slug: 'hash-tables',
    title: 'Hash Tables',
    description: 'Lightning-fast key-value mapping for optimal performance.',
    file: 'hashTables'
  },
  'linked-lists': {
    slug: 'linked-lists',
    title: 'Linked Lists',
    description: 'Dynamic data structures for efficient insertions and deletions.',
    file: 'linkedLists'
  },
  'stacks-queues': {
    slug: 'stacks-queues',
    title: 'Stacks & Queues',
    description: 'LIFO and FIFO data structures and their applications.',
    file: 'stacksQueues'
  },
  trees: {
    slug: 'trees',
    title: 'Trees',
    description: 'Explore hierarchical data structures and tree traversal techniques.',
    file: 'trees'
  },
  graphs: {
    slug: 'graphs',
    title: 'Graphs',
    description: 'Master graph algorithms including BFS, DFS, and shortest paths.',
    file: 'graphs'
  },
  'sorting-searching': {
    slug: 'sorting-searching',
    title: 'Sorting & Searching',
    description: 'Algorithms for organizing and finding data efficiently.',
    file: 'sorting'
  },
  strings: {
    slug: 'strings',
    title: 'Strings',
    description: 'Text processing and pattern matching algorithms.',
    file: 'strings'
  },
  design: {
    slug: 'design',
    title: 'System Design & Patterns',
    description: 'Architectural patterns and system design principles.',
    file: 'design'
  },
  'math-bit-logic': {
    slug: 'math-bit-logic',
    title: 'Math & Bit Logic',
    description: 'Mathematical operations and bitwise manipulations.',
    file: 'math'
  },
  'dynamic-programming': {
    slug: 'dynamic-programming',
    title: 'Dynamic Programming',
    description: 'Solve optimization problems by breaking them into overlapping subproblems.',
    file: 'dynamicProgramming'
  },
  'recursion-backtracking': {
    slug: 'recursion-backtracking',
    title: 'Recursion & Backtracking',
    description: 'Recursive problem-solving and systematic exploration of solution spaces.',
    file: 'recursion'
  },
  heaps: {
    slug: 'heaps',
    title: 'Heaps & Priority Queues',
    description: 'Efficient access to minimum/maximum elements with heap-ordered trees.',
    file: 'heaps'
  },
  tries: {
    slug: 'tries',
    title: 'Tries',
    description: 'Prefix trees for efficient string storage and retrieval.',
    file: 'tries'
  },
  greedy: {
    slug: 'greedy',
    title: 'Greedy Algorithms',
    description: 'Make locally optimal choices to find globally optimal solutions.',
    file: 'greedy'
  }
};

// Map to store loaded problems
interface TopicProblems {
  slug: string;
  title: string;
  description: string;
  problems: Problem[] | Problem;
}

async function loadProblemsFromFile(filename: string): Promise<Problem[] | Problem> {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  // Path from backend/src/db/seeds -> root/src/data/problems
  const filePath = path.resolve(__dirname, '../../../../src/data/problems', `${filename}.ts`);
  
  try {
    if (!fs.existsSync(filePath)) {
      console.error(`  ✗ File not found: ${filePath}`);
      return [];
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Extract the export statement
    // Look for: export const <name>: Problem[] = [ ... ]
    // or: export const <name>: Problem = { ... }
    const exportMatch = content.match(
      /export\s+const\s+(\w+)\s*:\s*(?:Problem\[\]|Problem)\s*=\s*([\s\S]*?)(?=\n*(?:export|$))/
    );

    if (!exportMatch) {
      console.error(`  ✗ No problem export found in ${filename}.ts`);
      return [];
    }

    const dataStr = exportMatch[2];

    // Remove code comment blocks
    let cleanStr = dataStr.replace(/\/\*[\s\S]*?\*\//g, '');
    // Remove line comments
    cleanStr = cleanStr.replace(/\/\/.*$/gm, '');
    // Trim
    cleanStr = cleanStr.trim();

    // Remove trailing semicolon if exists
    if (cleanStr.endsWith(';')) {
      cleanStr = cleanStr.slice(0, -1).trim();
    }

    // Try to parse as JavaScript object/array
    // Use Function constructor to evaluate the expression
    try {
      const problems = new Function(`'use strict'; return (${cleanStr})`)();
      
      if (Array.isArray(problems)) {
        return problems;
      } else if (typeof problems === 'object' && problems !== null && 'id' in problems) {
        return problems;
      } else {
        console.error(`  ✗ Unexpected data structure in ${filename}.ts`);
        return [];
      }
    } catch (evalError) {
      console.error(`  ✗ Failed to parse ${filename}.ts:`, evalError);
      return [];
    }
  } catch (error) {
    console.error(`Failed to load problems from ${filename}:`, error);
    return [];
  }
}

async function seedAllProblems(): Promise<void> {
  try {
    console.log('🌱 Starting comprehensive seed of all 143 problems...\n');

    let totalProblems = 0;
    let totalTopics = 0;
    let totalInserted = 0;

    // Load all problem modules first
    console.log('📖 Loading problem modules...');
    const topics: Record<string, TopicProblems> = {};
    
    for (const [topicKey, config] of Object.entries(TOPIC_CONFIG)) {
      console.log(`  Loading ${config.title}...`);
      const problems = await loadProblemsFromFile(config.file);
      topics[topicKey] = {
        slug: config.slug,
        title: config.title,
        description: config.description,
        problems
      };
    }

    console.log('\n📊 Processing topics and inserting problems...\n');

    // Process each topic
    for (const [topicKey, topicData] of Object.entries(topics)) {
      const { slug, title, description, problems: problemsData } = topicData;

      // Normalize problems to array
      const problemsArray = Array.isArray(problemsData) ? problemsData : [problemsData];

      if (problemsArray.length === 0) {
        console.log(`⏭️  Skipping ${title} - no problems loaded`);
        continue;
      }

      console.log(`📚 Processing ${title}... (${problemsArray.length} problems)`);

      // Ensure topic exists in database
      const existingTopic = await db.query(
        'SELECT id FROM topics WHERE slug = $1 LIMIT 1',
        [slug]
      );

      let topicId: string;

      if (!existingTopic.rows[0]) {
        const result = await db.query<{ id: string }>(
          `
          INSERT INTO topics (slug, title, description, order_index, is_published)
          VALUES ($1, $2, $3, $4, true)
          RETURNING id
          `,
          [slug, title, description, Object.keys(TOPIC_CONFIG).indexOf(topicKey)]
        );
        topicId = result.rows[0].id;
        console.log(`  ✓ Created topic: ${title}`);
        totalTopics++;
      } else {
        topicId = existingTopic.rows[0].id;
      }

      // Insert problems
      for (const problem of problemsArray) {
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
            [topicId, problem.id, problem.title, problem.difficulty, problem.description]
          );

          const problemId = result.rows[0].id;

          // Insert solution if available
          if (problem.solution) {
            const timeComplexity = problem.solution.timeComplexity || 'Varies';
            const spaceComplexity = problem.solution.spaceComplexity || 'Varies';

            await db.query(
              `
              INSERT INTO problem_solutions (problem_id, language, approach, code, time_complexity, space_complexity, is_optimal)
              VALUES ($1, $2, $3, $4, $5, $6, true)
              `,
              [
                problemId,
                'typescript',
                problem.solution.approach || 'See code for approach',
                problem.solution.code || '// Solution code',
                timeComplexity,
                spaceComplexity
              ]
            );
          }

          // Insert hints if available
          if (problem.hints && Array.isArray(problem.hints)) {
            for (let i = 0; i < problem.hints.length; i++) {
              await db.query(
                `
                INSERT INTO problem_hints (problem_id, hint_text, sort_order)
                VALUES ($1, $2, $3)
                `,
                [problemId, problem.hints[i], i]
              );
            }
          }

          // Insert examples if available
          if (problem.examples && Array.isArray(problem.examples)) {
            for (let i = 0; i < problem.examples.length; i++) {
              const example = problem.examples[i];
              await db.query(
                `
                INSERT INTO problem_examples (problem_id, input_text, output_text, explanation, sort_order)
                VALUES ($1, $2, $3, $4, $5)
                `,
                [problemId, example.input, example.output, example.explanation || '', i]
              );
            }
          }

          totalInserted++;
        }
      }

      totalProblems += problemsArray.length;
    }

    console.log('\n' + '='.repeat(60));
    console.log('✅ SEEDING COMPLETED SUCCESSFULLY!');
    console.log(`   📊 Topics processed: ${Object.keys(TOPIC_CONFIG).length}`);
    console.log(`   📝 Total problems found: ${totalProblems}`);
    console.log(`   ✨ Problems inserted: ${totalInserted}`);
    console.log('='.repeat(60) + '\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedAllProblems();
