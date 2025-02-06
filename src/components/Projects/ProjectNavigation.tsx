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

    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-4 px-4 py-2
                    bg-gray-200/30 dark:bg-gray-700/40
                    backdrop-blur-sm rounded-full shadow-lg">

      <button
        onClick={handlePrevProject}
        disabled={disablePrev}
        className="p-2 rounded-full bg-white/80 dark:bg-white/10
                   hover:bg-white dark:hover:bg-white/20
                   disabled:opacity-50 transition-colors"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={onExpandProject}
        className="p-2 rounded-full bg-white/80 dark:bg-white/10
                   hover:bg-white dark:hover:bg-white/20
                   transition-colors"
      >
        <Maximize2 />
      </button>

      <button
        onClick={handleNextProject}
        disabled={disableNext}
        className="p-2 rounded-full bg-white/80 dark:bg-white/10
                   hover:bg-white dark:hover:bg-white/20
                   disabled:opacity-50 transition-colors"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default ProjectNavigation;
