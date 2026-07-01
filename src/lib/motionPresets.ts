import type { Transition, Variants } from "framer-motion";

export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const fastTransition: Transition = {
  duration: 0.26,
  ease: EASE_OUT,
};

export const smoothTransition: Transition = {
  duration: 0.46,
  ease: EASE_OUT,
};

export const softSpring: Transition = {
  type: "spring",
  stiffness: 160,
  damping: 24,
  mass: 0.8,
};

export const viewportOnce = {
  once: true,
  amount: 0.32,
} as const;

export const revealUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothTransition,
  },
};

export const revealScale: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: smoothTransition,
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.04,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothTransition,
  },
};

export const routeFade: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.34,
      ease: EASE_OUT,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.22,
      ease: EASE_OUT,
    },
  },
};

export const modalOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: fastTransition,
  },
  exit: {
    opacity: 0,
    transition: fastTransition,
  },
};

export const modalPanel: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: smoothTransition,
  },
  exit: {
    opacity: 0,
    scale: 0.99,
    y: 6,
    transition: fastTransition,
  },
};

export const navActivePillTransition: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 34,
  mass: 0.7,
};

export const getDelay = (index: number, step = 0.04, max = 0.18) =>
  Math.min(index * step, max);

export const getRevealProps = (
  reduceMotion: boolean | null,
  delay = 0,
  y = 18
) => {
  if (reduceMotion) {
    return { initial: false as const };
  }

  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: viewportOnce,
    transition: {
      ...smoothTransition,
      delay,
    },
  };
};
