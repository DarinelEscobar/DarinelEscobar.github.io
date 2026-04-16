import React, { Suspense, lazy, useState } from "react";
import { useInView } from "react-intersection-observer";
import { usePortfolioContent } from "@/lib/portfolioContent";
import { cn } from "@/lib/utils";
import ProjectsSourceFilter from "./ProjectsSourceFilter";
import SimplifiedProjectsView from "./SimplifiedProjectsView";
import {
  filterProjectsBySource,
  type ProjectsLayoutMode,
  type ProjectsSourceFilterMode,
} from "./quickViewUtils";

const DetailsProjects = lazy(() => import("../DetailsProjects/DetailsProjects"));
const floatingControlsClassName =
  "fixed left-1/2 bottom-[calc(env(safe-area-inset-bottom)+12px)] z-40 inline-flex -translate-x-1/2 items-center rounded-full bg-gray-200/[0.35] px-3 py-2 shadow-lg shadow-black/10 backdrop-blur-sm dark:bg-gray-700/[0.45] dark:shadow-black/40";

interface ProjectsProps {
  layoutMode?: ProjectsLayoutMode;
}

const Projects: React.FC<ProjectsProps> = ({ layoutMode = "page" }) => {
  const { projects, ui } = usePortfolioContent();
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "-15% 0px -15% 0px",
  });
  const [sourceFilter, setSourceFilter] = useState<ProjectsSourceFilterMode>("all");
  const [expandedProjectIndex, setExpandedProjectIndex] = useState<number | null>(null);
  const visibleProjects = filterProjectsBySource(projects, sourceFilter);

  const handleOpenProject = (projectIndex: number) => {
    if (projectIndex < 0 || projectIndex >= visibleProjects.length) {
      return;
    }

    setExpandedProjectIndex(projectIndex);
  };

  const handleCloseDetails = () => {
    setExpandedProjectIndex(null);
  };

  return (
    <div ref={ref} className="relative w-full bg-whi text-dar">
      <div
        className={cn(
          "mx-auto w-full max-w-[1740px] px-2 pb-24 pt-24 sm:px-3 sm:pb-28 lg:px-4",
          layoutMode === "section" ? "py-8 lg:py-24" : "min-h-screen"
        )}
      >
        <div className={cn("w-full", layoutMode === "section" && "rounded-[2rem]")}>
          <SimplifiedProjectsView
            projects={visibleProjects}
            copy={ui.projects}
            dateLocale={ui.locale.date}
            onOpenProject={handleOpenProject}
          />
        </div>
      </div>

      {inView ? (
        <div className={floatingControlsClassName}>
          <ProjectsSourceFilter
            allProjectsLabel={ui.projects.allProjectsFilterLabel}
            realExperienceLabel={ui.projects.realExperienceFilterLabel}
            value={sourceFilter}
            onChange={setSourceFilter}
          />
        </div>
      ) : null}

      {expandedProjectIndex !== null && (
        <Suspense fallback={<div className="fixed inset-0 z-50 bg-black/70" />}>
          <DetailsProjects
            projects={visibleProjects}
            projectIndex={expandedProjectIndex}
            onClose={handleCloseDetails}
          />
        </Suspense>
      )}
    </div>
  );
};

export default Projects;
