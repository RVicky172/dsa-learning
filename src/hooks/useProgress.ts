import { useState, useEffect } from 'react';
import { get, set } from 'idb-keyval';
import { useAuth } from './useAuth';
import { progressService } from '../services/progressService';
import { problemService } from '../services/problemService';

interface ProgressData {
  completedTopics: string[];
  completedProblems: string[];
}

const STORAGE_KEY = 'dsa-master-progress';
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function useProgress() {
  const { isAuthenticated, token } = useAuth();
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
    if (!isAuthenticated || !token) {
      return;
    }

    progressService.getMyProgress(token)
      .then((response) => {
        setProgress((prev) => ({
          ...prev,
          completedProblems: response.completedProblemIds ?? prev.completedProblems
        }));
      })
      .catch(() => {
        // Keep local progress when backend sync is unavailable.
      });
  }, [isAuthenticated, token]);

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
    const currentlyCompleted = progress.completedProblems.includes(problemId);
    const nextCompleted = !currentlyCompleted;

    setProgress((prev) => ({
      ...prev,
      completedProblems: nextCompleted
        ? [...prev.completedProblems, problemId]
        : prev.completedProblems.filter((id) => id !== problemId)
    }));

    if (isAuthenticated && token && UUID_REGEX.test(problemId)) {
      progressService.setProblemCompletion(problemId, nextCompleted, token)
        .then(async () => {
          if (nextCompleted) {
            await problemService.submitAttempt(
              problemId,
              {
                language: 'markdown',
                submittedCode: 'Marked as solved from problem checklist'
              },
              token
            );
          }
        })
        .catch(() => {
          // Roll back optimistic local state when backend write fails.
          setProgress((prev) => ({
            ...prev,
            completedProblems: currentlyCompleted
              ? prev.completedProblems.includes(problemId)
                ? prev.completedProblems
                : [...prev.completedProblems, problemId]
              : prev.completedProblems.filter((id) => id !== problemId)
          }));
        });
    }
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
