export interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  topics: string[];
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  prerequisites: string[];
  status: 'completed' | 'current' | 'locked';
  icon: React.ComponentType<{ size?: number; color?: string }>;
  topicId?: string;
}
