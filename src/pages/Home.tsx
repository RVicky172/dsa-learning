import React, { useEffect, useState, useMemo } from 'react';
import Hero from '../components/Hero';
import { topicsService } from '../services/topicsService';
import type { Topic as ApiTopic } from '../services/topicsService';
import { useProgress } from '../hooks/useProgress';
import { useAuth } from '../hooks/useAuth';
import { progressService } from '../services/progressService';
import type { ProgressRecommendationItem } from '../types/api';
import FeaturesSection from '../components/HomeSections/FeaturesSection';
import StatsSection from '../components/HomeSections/StatsSection';
import TopicsPreviewSection from '../components/HomeSections/TopicsPreviewSection';
import RecommendationsSection from '../components/HomeSections/RecommendationsSection';
import CTASection from '../components/HomeSections/CTASection';
import type { TopicMeta } from '../types/topic';
import { getTopicIcon } from '../utils/topicIcons';

interface HomeProps {
  onNavigate: (section: string) => void;
  onTopicSelect: (topicId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate, onTopicSelect, searchQuery, setSearchQuery }) => {
  const { stats } = useProgress();
  const { isAuthenticated, token } = useAuth();
  const [recommendations, setRecommendations] = useState<ProgressRecommendationItem[]>([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  const [apiTopics, setApiTopics] = useState<ApiTopic[]>([]);

  useEffect(() => {
    topicsService.getAllTopics()
      .then((res) => setApiTopics(res.topics))
      .catch(() => setApiTopics([]));
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadRecommendations = async () => {
      if (!isAuthenticated || !token) {
        setRecommendations([]);
        return;
      }

      setIsLoadingRecommendations(true);
      try {
        const response = await progressService.getRecommendations(token, 6);
        if (!cancelled) {
          setRecommendations(response.items);
        }
      } catch {
        if (!cancelled) {
          setRecommendations([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoadingRecommendations(false);
        }
      }
    };

    void loadRecommendations();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, token]);

  // Map API topics to TopicMeta with icons derived from slug
  const topicsMeta: TopicMeta[] = useMemo(
    () => apiTopics.map((t) => ({ id: t.id, slug: t.slug, title: t.title, description: t.description, icon: getTopicIcon(t.slug) })),
    [apiTopics]
  );

  // Filter topics based on search query
  const filteredTopics = topicsMeta.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalTopics = apiTopics.length || 15; // fallback for SSR / loading flash

  return (
    <>
      <Hero onNavigate={onNavigate} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <FeaturesSection totalTopics={totalTopics} />
      <StatsSection
        totalTopics={totalTopics}
        completedTopics={stats.totalCompletedTopics}
        completedProblems={stats.totalCompletedProblems}
      />
      {isAuthenticated && (
        <RecommendationsSection
          items={recommendations}
          isLoading={isLoadingRecommendations}
          onViewProblems={() => onNavigate('problems')}
          onProblemSelect={onTopicSelect}
        />
      )}
      <TopicsPreviewSection topics={filteredTopics} onTopicSelect={onTopicSelect} />
      <CTASection totalTopics={totalTopics} onNavigate={onNavigate} />
    </>
  );
};

export default Home;
