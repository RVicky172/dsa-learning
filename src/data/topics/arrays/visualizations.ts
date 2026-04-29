import type { VisualizerProps } from '../../../components/DataStructureVisualizer';

export const arraysVisualizations: VisualizerProps[] = [
  {
    type: 'two-pointer',
    title: 'Two Pointers Pattern',
    description: 'Finding a target sum (e.g., 9) in a sorted array using two pointers.',
    data: [1, 2, 4, 6, 8, 9, 15],
    advancedSteps: [
      { text: 'Target is 9. Start with pointers at both ends: 1 + 15 = 16 (Too big)', highlights: [0, 6] },
      { text: 'Sum is too big, move right pointer left: 1 + 9 = 10 (Too big)', highlights: [0, 5] },
      { text: 'Sum is too big, move right pointer left: 1 + 8 = 9 (Found it!)', highlights: [0, 4] }
    ]
  },
  {
    type: 'sorting',
    title: 'Bubble Sort (Step-by-Step)',
    description: 'Sorting an array by repeatedly swapping adjacent elements that are in the wrong order.',
    data: [5, 3, 8, 4],
    advancedSteps: [
      { text: 'Compare 5 and 3. Since 5 > 3, we need to swap them.', highlights: [0, 1] },
      { text: 'Swapped 5 and 3.', highlights: [0, 1], dataState: [3, 5, 8, 4] },
      { text: 'Compare 5 and 8. Since 5 < 8, they are in correct order.', highlights: [1, 2], dataState: [3, 5, 8, 4] },
      { text: 'Compare 8 and 4. Since 8 > 4, we need to swap them.', highlights: [2, 3], dataState: [3, 5, 8, 4] },
      { text: 'Swapped 8 and 4. The largest element (8) has bubbled to the end!', highlights: [2, 3], dataState: [3, 5, 4, 8] },
    ]
  }
];
