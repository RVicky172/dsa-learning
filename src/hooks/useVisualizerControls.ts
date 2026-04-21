import { useState, useEffect, useCallback } from 'react';
import type { VisualizationType } from '../components/DataStructureVisualizer/DataStructureVisualizer';

export interface VisualizerControlsState {
  currentStep: number;
  isPlaying: boolean;
  playbackRate: number;
  customInputMode: boolean;
  customInputValue: string;
  customData: (string | number)[] | null;
  operationCount: number;
}

export interface VisualizerControlsActions {
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  stepForward: () => void;
  stepBack: () => void;
  reset: () => void;
  setPlaybackRate: (rate: number) => void;
  randomize: (type: VisualizationType) => void;
  toggleCustomInput: () => void;
  setCustomInputValue: (value: string) => void;
  applyCustomInput: () => void;
}

const RANDOM_DATA_GENERATORS: Record<string, () => (string | number)[]> = {
  array: () => Array.from({ length: 6 }, () => Math.floor(Math.random() * 90) + 1),
  sorting: () => Array.from({ length: 7 }, () => Math.floor(Math.random() * 90) + 1),
  'two-pointer': () =>
    Array.from({ length: 7 }, (_, i) => i * 2 + Math.floor(Math.random() * 3) + 1).sort(
      (a, b) => (a as number) - (b as number)
    ),
  'linked-list': () => Array.from({ length: 5 }, () => Math.floor(Math.random() * 20) + 1),
  stack: () => Array.from({ length: 5 }, () => Math.floor(Math.random() * 20) + 1),
  queue: () => Array.from({ length: 5 }, () => Math.floor(Math.random() * 20) + 1),
  heap: () => Array.from({ length: 7 }, () => Math.floor(Math.random() * 30) + 1),
  'hash-table': () =>
    ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'].sort(() => Math.random() - 0.5).slice(0, 4),
  'binary-tree': () => [],
  graph: () => [],
};

export function useVisualizerControls(
  maxSteps: number,
  _type: VisualizationType
): [VisualizerControlsState, VisualizerControlsActions] {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [customInputMode, setCustomInputMode] = useState(false);
  const [customInputValue, setCustomInputValue] = useState('');
  const [customData, setCustomData] = useState<(string | number)[] | null>(null);
  const [operationCount, setOperationCount] = useState(0);

  // Animation loop
  useEffect(() => {
    if (!isPlaying || maxSteps === 0) return;
    const delay = Math.round(1000 / playbackRate);
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const next = (prev + 1) % maxSteps;
        if (next === 0) setIsPlaying(false); // stop at end
        return next;
      });
      setOperationCount((c) => c + 1);
    }, delay);
    return () => clearInterval(interval);
  }, [isPlaying, playbackRate, maxSteps]);

  // Reset operation count when step resets
  useEffect(() => {
    if (currentStep === 0) setOperationCount(0);
  }, [currentStep]);

  const play = useCallback(() => setIsPlaying(true), []);
  const pause = useCallback(() => setIsPlaying(false), []);
  const togglePlay = useCallback(() => setIsPlaying((v) => !v), []);

  const stepForward = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, maxSteps - 1));
    setOperationCount((c) => c + 1);
  }, [maxSteps]);

  const stepBack = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const reset = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
    setOperationCount(0);
  }, []);

  const randomize = useCallback(
    (vizType: VisualizationType) => {
      const generator = RANDOM_DATA_GENERATORS[vizType] || RANDOM_DATA_GENERATORS['array'];
      setCustomData(generator());
      setCustomInputMode(false);
      reset();
    },
    [reset]
  );

  const toggleCustomInput = useCallback(() => {
    setCustomInputMode((v) => !v);
  }, []);

  const applyCustomInput = useCallback(() => {
    const parsed = customInputValue
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => (isNaN(Number(s)) ? s : Number(s)));
    if (parsed.length > 0) {
      setCustomData(parsed);
      setCustomInputMode(false);
      reset();
    }
  }, [customInputValue, reset]);

  const state: VisualizerControlsState = {
    currentStep,
    isPlaying,
    playbackRate,
    customInputMode,
    customInputValue,
    customData,
    operationCount,
  };

  const actions: VisualizerControlsActions = {
    play,
    pause,
    togglePlay,
    stepForward,
    stepBack,
    reset,
    setPlaybackRate,
    randomize,
    toggleCustomInput,
    setCustomInputValue,
    applyCustomInput,
  };

  return [state, actions];
}
