import React from 'react';
import type { VisualizerProps } from '../components/DataStructureVisualizer';

export interface CodeExample {
    title: string;
    language: string;
    code: string;
    explanation: string;
    timeComplexity: string;
    spaceComplexity: string;
}

export interface Pattern {
    name: string;
    description: string;
    technique: string;
    example: string;
    whenToUse: string[];
}

export interface Problem {
    id: string;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    description: string;
    examples: {
        input: string;
        output: string;
        explanation?: string;
    }[];
    solution: {
        approach: string;
        code: string;
        timeComplexity: string;
        spaceComplexity: string;
        stepByStep: string[];
    };
    hints: string[];
}

export interface TopicSection {
    title: string;
    content: string;
}

export interface TopicMeta {
    id: string;
    title: string;
    description: string;
    complexity: string;
    icon: React.ReactNode;
    delay: number;
}

export interface Topic extends TopicMeta {
    title: string;
    description: string;
    complexity: string;
    icon: React.ReactNode;
    delay: number;

    // Detailed content
    learningOutcomes?: string[];
    introduction: string;
    whyImportant: string;
    whenToUse: string[];
    advantages: string[];
    disadvantages: string[];

    // Core concepts
    concepts: {
        name: string;
        description: string;
    }[];

    // Code examples
    examples: CodeExample[];

    // Common patterns
    patterns: Pattern[];

    // Practice problems
    problems: Problem[];

    // Real-world applications
    applications: {
        name: string;
        description: string;
        example: string;
    }[];

    // Key operations with complexity
    operations: {
        name: string;
        complexity: string;
    }[];

    // Optional custom visualizations
    visualizations?: VisualizerProps[];
}
