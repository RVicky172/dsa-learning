import { useState, useEffect } from 'react';

interface ChartConfig {
  mainChartMargin: { top: number; right: number; left: number; bottom: number };
  growthChartMargin: { top: number; right: number; left: number; bottom: number };
  mainAxisFontSize: number;
  growthAxisFontSize: number;
  mainYAxisWidth: number;
  growthYAxisWidth: number;
  mainLabelFontSize: number;
  growthLabelOffset: number;
  mainLabelOffset: number;
  strokeWidth: number;
  /** Hide rotated axis labels on very small screens to save horizontal space */
  showAxisLabels: boolean;
  /** Explicit pixel height for the main Growth Rate chart */
  mainChartHeight: number;
  /** Explicit pixel height for the mini Growth Curve chart */
  miniChartHeight: number;
}

export const useResponsiveChartConfig = (): ChartConfig => {
  const [config, setConfig] = useState<ChartConfig>(() => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
    return getChartConfig(width);
  });

  useEffect(() => {
    const handleResize = () => {
      setConfig(getChartConfig(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return config;
};

function getChartConfig(width: number): ChartConfig {
  // Mobile-first breakpoints
  const isMobileSmall = width < 375;
  const isMobile = width < 480;
  const isTablet = width < 768;

  return {
    // Main chart (Growth Rate Visualization)
    // On mobile hide axis labels so we can shrink left margin significantly
    mainChartMargin: {
      top: isMobileSmall ? 8 : isMobile ? 10 : isTablet ? 14 : 15,
      right: isMobileSmall ? 8 : isMobile ? 12 : isTablet ? 30 : 40,
      left: isMobileSmall ? 4 : isMobile ? 4 : isTablet ? 10 : 20,
      bottom: isMobileSmall ? 20 : isMobile ? 24 : isTablet ? 36 : 40
    },
    // Growth curve chart
    growthChartMargin: {
      top: isMobileSmall ? 8 : isMobile ? 10 : isTablet ? 14 : 15,
      right: isMobileSmall ? 8 : isMobile ? 10 : isTablet ? 16 : 20,
      left: isMobileSmall ? 4 : isMobile ? 4 : isTablet ? 10 : 15,
      bottom: isMobileSmall ? 10 : isMobile ? 12 : isTablet ? 18 : 20
    },
    // Main chart axis label font size
    mainAxisFontSize: isMobileSmall ? 8 : isMobile ? 9 : isTablet ? 10 : 11,
    // Growth chart axis label font size
    growthAxisFontSize: isMobileSmall ? 7 : isMobile ? 8 : isTablet ? 8 : 9,
    // Main chart Y-axis width — tight on mobile since we hide the rotated label
    mainYAxisWidth: isMobileSmall ? 32 : isMobile ? 36 : isTablet ? 42 : 55,
    // Growth chart Y-axis width
    growthYAxisWidth: isMobileSmall ? 28 : isMobile ? 32 : isTablet ? 36 : 44,
    // Chart label font size
    mainLabelFontSize: isMobileSmall ? 9 : isMobile ? 10 : isTablet ? 11 : 12,
    // Y-axis label offset (smaller on mobile)
    growthLabelOffset: isMobileSmall ? -20 : isMobile ? -25 : -35,
    // X-axis label offset
    mainLabelOffset: isMobileSmall ? -14 : isMobile ? -16 : isTablet ? -19 : -22,
    // Stroke width for growth curve
    strokeWidth: isMobileSmall ? 1.5 : isMobile ? 2 : 2.5,
    // Hide rotated axis labels on mobile — they steal too much horizontal space
    showAxisLabels: !isMobile,
    // Explicit chart heights (avoids flex-container height-collapse in Recharts)
    mainChartHeight: isMobileSmall ? 240 : isMobile ? 260 : isTablet ? 320 : 400,
    miniChartHeight: isMobileSmall ? 180 : isMobile ? 200 : isTablet ? 220 : 260,
  };
}
