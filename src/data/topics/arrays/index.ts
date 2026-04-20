import type { Topic } from '../../../types/topic';
import React from 'react';
import { Hash } from 'lucide-react';
import { arrayProblems } from '../../problems/arrays';
import { arraysTheory } from './theory';
import { arraysExamples } from './examples';
import { arraysPatterns } from './patterns';
import { arraysVisualizations } from './visualizations';

import { topicsData } from '../../topicsData';

// Fetch the base metadata safely so we don't duplicate logic if possible
const baseMeta = topicsData.find(t => t.id === 'arrays');

export const arraysTopic: Topic = {
  id: baseMeta?.id || 'arrays',
  title: baseMeta?.title || 'Arrays & Strings',
  description: baseMeta?.description || 'Fundamental building blocks for data storage and manipulation.',
  complexity: baseMeta?.complexity || 'O(1) Access',
  icon: baseMeta?.icon || React.createElement(Hash, { size: 24 }),
  delay: baseMeta?.delay || 0.1,
  
  ...arraysTheory,
  examples: arraysExamples,
  patterns: arraysPatterns,
  problems: arrayProblems,
  visualizations: arraysVisualizations
};
