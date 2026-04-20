import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { db } from './client.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  const filename = process.argv[2];

  if (!filename) {
    throw new Error('Missing migration filename. Example: npm run migrate:init');
  }

  const migrationPath = path.join(__dirname, 'migrations', filename);
  const sql = await fs.readFile(migrationPath, 'utf8');

  await db.query(sql);
  await db.end();

  console.log(`Migration applied: ${filename}`);
}

run().catch(async (error: unknown) => {
  console.error('Migration failed:', error);
  await db.end();
  process.exit(1);
});
