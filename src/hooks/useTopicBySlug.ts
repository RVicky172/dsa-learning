import { useState, useEffect } from 'react';
import { topicsService, type TopicWithProblems } from '../services/topicsService';
import type { ApiError } from '../types/api';

export interface UseTopicBySlugResult {
  topic: TopicWithProblems | null;
  loading: boolean;
  error: ApiError | null;
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function useTopicBySlug(topicIdOrSlug: string, token?: string): UseTopicBySlugResult {
  const [topic, setTopic] = useState<TopicWithProblems | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const loadTopic = async () => {
      try {
        setLoading(true);
        setError(null);
        const isUuid = UUID_REGEX.test(topicIdOrSlug);
        const data = isUuid
          ? await topicsService.getTopicById(topicIdOrSlug, token)
          : await topicsService.getTopicBySlug(topicIdOrSlug, token);
        setTopic(data);
      } catch (err) {
        setError(err as ApiError);
        setTopic(null);
      } finally {
        setLoading(false);
      }
    };

    loadTopic();
  }, [topicIdOrSlug, token]);

  return { topic, loading, error };
}
