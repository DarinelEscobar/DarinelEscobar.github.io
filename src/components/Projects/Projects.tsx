import React, { Suspense, lazy, useState } from "react";
import { usePortfolioContent } from "@/lib/portfolioContent";
import { cn } from "@/lib/utils";
import SimplifiedProjectsView from "./SimplifiedProjectsView";
import type { ProjectsLayoutMode } from "./quickViewUtils";

const DetailsProjects = lazy(() => import("../DetailsProjects/DetailsProjects"));

interface ProjectsProps {
  layoutMode?: ProjectsLayoutMode;
}

const Projects: React.FC<ProjectsProps> = ({ layoutMode = "page" }) => {
  const { projects, ui } = usePortfolioContent();
  const [expandedProjectIndex, setExpandedProjectIndex] = useState<number | null>(null);

  const handleOpenProject = (projectIndex: number) => {
    if (projectIndex < 0 || projectIndex >= projects.length) {
      return;
    }

    setExpandedProjectIndex(projectIndex);
  };

  const handleCloseDetails = () => {
    setExpandedProjectIndex(null);
  };

  return (
    <div className="relative w-full bg-whi text-dar">
      <div
        className={cn(
          "mx-auto w-full max-w-[1740px] px-2 pb-8 pt-24 sm:px-3 lg:px-4",
          layoutMode === "section" ? "min-h-screen min-h-[100dvh] lg:py-24" : "min-h-screen"
        )}
      >
        <div
          className={cn(
            "w-full",
            layoutMode === "section" &&
              "max-h-[min(72vh,52rem)] overflow-y-auto rounded-[2rem]"
          )}
        >
          <SimplifiedProjectsView
            projects={projects}
            copy={ui.projects}
            dateLocale={ui.locale.date}
            onOpenProject={handleOpenProject}
          />
        </div>
      </div>

      {expandedProjectIndex !== null && (
        <Suspense fallback={<div className="fixed inset-0 z-50 bg-black/70" />}>
          <DetailsProjects
            projects={projects}
            projectIndex={expandedProjectIndex}
            onClose={handleCloseDetails}
          />
        </Suspense>
      )}
    </div>
  );
};

export default Projects;
