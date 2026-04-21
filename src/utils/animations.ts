/**
 * Framer Motion animation presets for consistent animations across components
 */

import type { Variants } from 'framer-motion';

/* Fade animations */
export const fadeInVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const fadeInUpVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const fadeInDownVariants: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const fadeInLeftVariants: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export const fadeInRightVariants: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

/* Scale animations */
export const scaleInVariants: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export const scaleInCenterVariants: Variants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.5 },
};

/* Stagger container for animating children */
export const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

/* Stagger item */
export const itemVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

/* Hover animations for cards */
export const cardHoverVariants: Variants = {
  initial: { y: 0, boxShadow: '0 4px 16px rgba(2, 6, 23, 0.5)' },
  hover: {
    y: -5,
    boxShadow: '0 12px 40px rgba(2, 6, 23, 0.6)',
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  tap: {
    y: -2,
    transition: { duration: 0.1 },
  },
};

/* Button hover animations */
export const buttonHoverVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

/* Expand/collapse animations */
export const expandVariants: Variants = {
  initial: { height: 0, opacity: 0 },
  animate: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

/* Modal/dialog animations */
export const modalVariants: Variants = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

export const backdropVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

/* Slide in animations */
export const slideInFromLeftVariants: Variants = {
  initial: { x: -400, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    x: -400,
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

export const slideInFromRightVariants: Variants = {
  initial: { x: 400, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    x: 400,
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

/* Rotate animations */
export const rotateVariants: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: { duration: 2, repeat: Infinity, ease: 'linear' },
  },
};

/* Pulse animations */
export const pulseVariants: Variants = {
  animate: {
    opacity: [1, 0.7, 1],
    transition: { duration: 2, repeat: Infinity },
  },
};

/* Bounce animations */
export const bounceVariants: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 1, repeat: Infinity, ease: 'easeInOut' },
  },
};

/* Animation configuration presets */
export const animationPresets = {
  transition: {
    fast: { duration: 0.15 },
    smooth: { duration: 0.3 },
    standard: { duration: 0.4 },
    slow: { duration: 0.6 },
  },
  easing: {
    default: [0.4, 0, 0.2, 1],
    in: [0.4, 0, 1, 1],
    out: [0, 0, 0.2, 1],
    inOut: [0.4, 0, 0.2, 1],
  },
  whileInView: {
    initial: 'initial',
    whileInView: 'animate',
    viewport: { once: true, amount: 0.3 },
  },
};

/* Scroll animation configuration */
export const scrollAnimationConfig = {
  initial: 'initial',
  whileInView: 'animate',
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

/* Stagger animation config */
export const staggerConfig = {
  container: {
    staggerChildren: 0.1,
    delayChildren: 0.2,
  },
  item: {
    duration: 0.3,
  },
};
