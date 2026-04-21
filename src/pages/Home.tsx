import React from 'react';
import Hero from '../components/Hero';
import { topicsData } from '../data/topicsData';
import { useProgress } from '../hooks/useProgress';
import FeaturesSection from '../components/HomeSections/FeaturesSection';
import StatsSection from '../components/HomeSections/StatsSection';
import TopicsPreviewSection from '../components/HomeSections/TopicsPreviewSection';
import CTASection from '../components/HomeSections/CTASection';

interface HomeProps {
  onNavigate: (section: string) => void;
  onTopicSelect: (topicId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate, onTopicSelect, searchQuery, setSearchQuery }) => {
  const { stats } = useProgress();

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
      <TopicsPreviewSection topics={filteredTopics} onTopicSelect={onTopicSelect} />
      <CTASection totalTopics={topicsData.length} onNavigate={onNavigate} />
    </>
  );
};

export default Home;
