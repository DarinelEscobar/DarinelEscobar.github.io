// ✅ Corrected: src/components/Projects/ProjectNavigation.tsx
import React from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectNavigationProps {
  handlePrevProject: () => void;
  handleNextProject: () => void;
  disablePrev: boolean;
  disableNext: boolean;
  onExpandProject: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
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
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="
        z-50 inline-flex items-center space-x-3
        bg-gray-200/30 dark:bg-gray-700/40 shadow-lg backdrop-blur-sm px-3 py-2 rounded-full
        fixed left-1/2 -translate-x-1/2 bottom-[calc(env(safe-area-inset-bottom)+8px)]
        md:absolute md:bottom-[calc(2rem+env(safe-area-inset-bottom))] md:left-1/2 md:-translate-x-1/2
      "
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
