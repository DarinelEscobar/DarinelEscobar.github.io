import React, { useEffect } from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface ProjectNavigationProps {
  handlePrevProject: () => void;
  handleNextProject: () => void;
  disablePrev: boolean;
  disableNext: boolean;
  onExpandProject: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const ProjectNavigation: React.FC<ProjectNavigationProps> = ({
  handlePrevProject,
  handleNextProject,
  disablePrev,
  disableNext,
  onExpandProject,
}) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });

  useEffect(() => {
    if (inView) controls.start("visible");
    if (!inView) controls.start("hidden");
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="bottom-[calc(2rem+env(safe-area-inset-bottom))] left-1/2 z-50 absolute flex items-center space-x-4 bg-gray-200/30 dark:bg-gray-700/40 shadow-lg backdrop-blur-sm px-4 py-2 rounded-full -translate-x-1/2"
    >
      <motion.button
        variants={itemVariants}
        onClick={handlePrevProject}
        disabled={disablePrev}
        className="bg-white/80 hover:bg-white dark:hover:bg-white/20 dark:bg-white/10 disabled:opacity-50 p-2 rounded-full transition-colors"
      >
        <ChevronLeft />
      </motion.button>

      <motion.button
        variants={itemVariants}
        onClick={onExpandProject}
        className="bg-white/80 hover:bg-white dark:hover:bg-white/20 dark:bg-white/10 p-2 rounded-full transition-colors"
      >
        <Maximize2 />
      </motion.button>

      <motion.button
        variants={itemVariants}
        onClick={handleNextProject}
        disabled={disableNext}
        className="bg-white/80 hover:bg-white dark:hover:bg-white/20 dark:bg-white/10 disabled:opacity-50 p-2 rounded-full transition-colors"
      >
        <ChevronRight />
      </motion.button>
    </motion.div>
  );
};

export default ProjectNavigation;