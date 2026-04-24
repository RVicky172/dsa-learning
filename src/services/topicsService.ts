import { apiClient } from './apiClient';

export interface Topic {
  id: string;
  slug: string;
  title: string;
  description: string;
  orderIndex: number;
}

export interface TopicWithProblems extends Topic {
  problems: Array<{
    id: string;
    title: string;
    difficulty: string;
    description: string;
    isPremium: boolean;
  }>;
}

export const topicsService = {
  /**
   * Get all published topics
   */
  getAllTopics: () => apiClient.get<{ topics: Topic[] }>('/topics'),

  /**
   * Get topic by slug with all its problems
   */
  getTopicBySlug: (slug: string, token?: string) =>
    apiClient.get<TopicWithProblems>(`/topics/by-slug/${slug}`, token),

  /**
   * Get topic by ID with all its problems
   */
  getTopicById: (topicId: string, token?: string) =>
    apiClient.get<TopicWithProblems>(`/topics/${topicId}`, token)
};
