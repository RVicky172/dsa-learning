import fs from 'fs';
import path from 'path';

const topicsDir = './src/data/topics';
const files = fs.readdirSync(topicsDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

let output = `import React from 'react';
import * as Icons from 'lucide-react';
import type { TopicMeta } from '../types/topic';

export const topicsData: TopicMeta[] = [
`;

for (const file of files) {
  const content = fs.readFileSync(path.join(topicsDir, file), 'utf-8');
  // Match fields from id to delay.
  // We need to carefully handle the icon line which might have React.createElement(IconName, ...)
  
  const idMatch = content.match(/id:\s*'([^']+)'/);
  const titleMatch = content.match(/title:\s*'([^']+)'/);
  const descMatch = content.match(/description:\s*'([^']+)'/);
  const compMatch = content.match(/complexity:\s*'([^']+)'/);
  const delayMatch = content.match(/delay:\s*([0-9.]+)/);
  const iconMatch = content.match(/icon:\s*React\.createElement\(([^,]+)[^)]*\)/) || content.match(/icon:\s*<\s*([^ ]+)\s*/);

  if (idMatch && titleMatch && descMatch && compMatch && delayMatch && iconMatch) {
    const iconName = iconMatch[1];
    output += `  {
    id: '${idMatch[1]}',
    title: '${titleMatch[1]}',
    description: '${descMatch[1]}',
    complexity: '${compMatch[1]}',
    icon: React.createElement((Icons as any)['${iconName}'], { size: 24 }),
    delay: ${delayMatch[1]}
  },
`;
  }
}

output += `];\n`;
fs.writeFileSync('./src/data/topicsData.ts', output);
console.log('Successfully generated topicsData.ts with metadata only.');
