import React from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectNavigationProps {
  handlePrevProject: () => void;
  handleNextProject: () => void;
  disablePrev: boolean;
  disableNext: boolean;
  onExpandProject: () => void;
  extraControls?: React.ReactNode;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const ProjectNavigation: React.FC<ProjectNavigationProps> = ({
  handlePrevProject,
  handleNextProject,
  disablePrev,
  disableNext,
  onExpandProject,
  extraControls,
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="
        fixed left-1/2 bottom-[calc(env(safe-area-inset-bottom)+8px)] z-50 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-gray-200/[0.35] px-3 py-2 shadow-lg shadow-black/10 backdrop-blur-sm
        dark:bg-gray-700/[0.45] dark:shadow-black/40
        md:absolute md:bottom-[calc(2rem+env(safe-area-inset-bottom))] md:left-1/2 md:-translate-x-1/2
      "
    >
      {extraControls}

      <motion.button
        variants={itemVariants}
        onClick={handlePrevProject}
        disabled={disablePrev}
        className="rounded-full bg-white/[0.85] p-2 text-dar shadow-sm shadow-black/10 transition-colors disabled:opacity-50 hover:bg-white dark:bg-white/10 dark:shadow-black/40 dark:hover:bg-white/20"
      >
        <ChevronLeft />
      </motion.button>

      <motion.button
        variants={itemVariants}
        onClick={onExpandProject}
        className="rounded-full bg-white/[0.85] p-2 text-dar shadow-sm shadow-black/10 transition-colors hover:bg-white dark:bg-white/10 dark:shadow-black/40 dark:hover:bg-white/20"
      >
        <Maximize2 />
      </motion.button>

      <motion.button
        variants={itemVariants}
        onClick={handleNextProject}
        disabled={disableNext}
        className="rounded-full bg-white/[0.85] p-2 text-dar shadow-sm shadow-black/10 transition-colors disabled:opacity-50 hover:bg-white dark:bg-white/10 dark:shadow-black/40 dark:hover:bg-white/20"
      >
        <ChevronRight />
      </motion.button>
    </motion.div>
  );
};

export default ProjectNavigation;
