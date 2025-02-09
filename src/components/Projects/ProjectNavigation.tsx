import React from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface ProjectNavigationProps {
  handlePrevProject: () => void;
  handleNextProject: () => void;
  disablePrev: boolean;
  disableNext: boolean;
  onExpandProject: () => void;
}

const ProjectNavigation: React.FC<ProjectNavigationProps> = ({
  handlePrevProject,
  handleNextProject,
  disablePrev,
  disableNext,
  onExpandProject,
}) => {
  return (
    <div
      className="bottom-[calc(2rem+env(safe-area-inset-bottom))] left-1/2 z-50 absolute flex items-center space-x-4 bg-gray-200/30 dark:bg-gray-700/40 shadow-lg backdrop-blur-sm px-4 py-2 rounded-full -translate-x-1/2"
    >
      <button
        onClick={handlePrevProject}
        disabled={disablePrev}
        className="bg-white/80 hover:bg-white dark:hover:bg-white/20 dark:bg-white/10 disabled:opacity-50 p-2 rounded-full transition-colors"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={onExpandProject}
        className="bg-white/80 hover:bg-white dark:hover:bg-white/20 dark:bg-white/10 p-2 rounded-full transition-colors"
      >
        <Maximize2 />
      </button>

      <button
        onClick={handleNextProject}
        disabled={disableNext}
        className="bg-white/80 hover:bg-white dark:hover:bg-white/20 dark:bg-white/10 disabled:opacity-50 p-2 rounded-full transition-colors"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default ProjectNavigation;
