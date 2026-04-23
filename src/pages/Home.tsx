import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import { topicsData } from '../data/topicsData';
import { useProgress } from '../hooks/useProgress';
import { useAuth } from '../hooks/useAuth';
import { progressService } from '../services/progressService';
import type { ProgressRecommendationItem } from '../types/api';
import FeaturesSection from '../components/HomeSections/FeaturesSection';
import StatsSection from '../components/HomeSections/StatsSection';
import TopicsPreviewSection from '../components/HomeSections/TopicsPreviewSection';
import RecommendationsSection from '../components/HomeSections/RecommendationsSection';
import CTASection from '../components/HomeSections/CTASection';

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

  // Filter topics based on search query
  const filteredTopics = topicsData.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Hero onNavigate={onNavigate} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <FeaturesSection totalTopics={topicsData.length} />
      <StatsSection
        totalTopics={topicsData.length}
        completedTopics={stats.totalCompletedTopics}
        completedProblems={stats.totalCompletedProblems}
      />
      {isAuthenticated && (
        <RecommendationsSection
          items={recommendations}
          isLoading={isLoadingRecommendations}
          onViewProblems={() => onNavigate('problems')}
        />
      )}
      <TopicsPreviewSection topics={filteredTopics} onTopicSelect={onTopicSelect} />
      <CTASection totalTopics={topicsData.length} onNavigate={onNavigate} />
    </>
  );
};

export default Home;
