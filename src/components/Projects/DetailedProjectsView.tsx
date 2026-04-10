import React from "react";
import { useInView } from "react-intersection-observer";
import type { ProjectData } from "@/content/portfolio/types";
import type { ProjectsLayoutMode } from "./quickViewUtils";
import { cn } from "@/lib/utils";
import ProjectCard from "./ProjectCard";
import ProjectNavigation from "./ProjectNavigation";

interface DetailedProjectsViewProps {
  layoutMode: ProjectsLayoutMode;
  currentProject: ProjectData;
  projectsLength: number;
  currentProjectIndex: number;
  currentImageIndex: number;
  direction: number;
  startDate: string;
  endDate: string;
  onPrevProject: () => void;
  onNextProject: () => void;
  onExpandProject: () => void;
  setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>;
  extraControls?: React.ReactNode;
}

const DetailedProjectsView: React.FC<DetailedProjectsViewProps> = ({
  layoutMode,
  currentProject,
  projectsLength,
  currentProjectIndex,
  currentImageIndex,
  direction,
  startDate,
  endDate,
  onPrevProject,
  onNextProject,
  onExpandProject,
  setCurrentImageIndex,
  extraControls,
}) => {
  const media = currentProject.media ?? [];
  const { ref, inView } = useInView({ threshold: 0.35, triggerOnce: false });

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex w-full flex-1 items-center justify-center",
        layoutMode === "section" ? "py-4 lg:py-0" : "py-6 lg:py-8"
      )}
    >
      <ProjectCard
        key={currentProjectIndex}
        direction={direction}
        currentProject={currentProject}
        startDate={startDate}
        endDate={endDate}
        media={media}
        currentProjectIndex={currentProjectIndex}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
      />

      {inView && projectsLength > 0 && (
        <ProjectNavigation
          handlePrevProject={onPrevProject}
          handleNextProject={onNextProject}
          disablePrev={currentProjectIndex === 0}
          disableNext={projectsLength === 0 || currentProjectIndex === projectsLength - 1}
          onExpandProject={onExpandProject}
          extraControls={extraControls}
        />
      )}
    </div>
  );
};

export default DetailedProjectsView;
