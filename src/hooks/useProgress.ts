import { useState, useEffect } from 'react';
import { get, set } from 'idb-keyval';

interface ProgressData {
  completedTopics: string[];
  completedProblems: string[];
}

const STORAGE_KEY = 'dsa-master-progress';

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>({ completedTopics: [], completedProblems: [] });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from IndexedDB on mount
    get<ProgressData>(STORAGE_KEY).then((data) => {
      if (data) setProgress(data);
      setIsLoaded(true);
    }).catch(e => {
      console.error('Failed to load progress from IndexedDB', e);
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    // Save to IndexedDB whenever progress changes, but only if loaded
    if (isLoaded) {
      set(STORAGE_KEY, progress).catch(e => console.error('Failed to save progress to IndexedDB', e));
    }
  }, [progress, isLoaded]);

  const toggleTopic = (topicId: string) => {
    setProgress(prev => {
      const isCompleted = prev.completedTopics.includes(topicId);
      return {
        ...prev,
        completedTopics: isCompleted 
          ? prev.completedTopics.filter(id => id !== topicId)
          : [...prev.completedTopics, topicId]
      };
    });
  };

  const toggleProblem = (problemId: string) => {
    setProgress(prev => {
      const isCompleted = prev.completedProblems.includes(problemId);
      return {
        ...prev,
        completedProblems: isCompleted
          ? prev.completedProblems.filter(id => id !== problemId)
          : [...prev.completedProblems, problemId]
      };
    });
  };

  const isTopicCompleted = (topicId: string) => progress.completedTopics.includes(topicId);
  const isProblemCompleted = (problemId: string) => progress.completedProblems.includes(problemId);

  const stats = {
    totalCompletedTopics: progress.completedTopics.length,
    totalCompletedProblems: progress.completedProblems.length
  };

  return {
    progress,
    toggleTopic,
    toggleProblem,
    isTopicCompleted,
    isProblemCompleted,
    stats
  };
}
