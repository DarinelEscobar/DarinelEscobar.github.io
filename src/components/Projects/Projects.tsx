import React, { Suspense, lazy, useEffect, useState } from "react";
import type { ProjectData } from "@/content/portfolio/types";
import { usePortfolioContent } from "@/lib/portfolioContent";
import { cn } from "@/lib/utils";
import DetailedProjectsView from "./DetailedProjectsView";
import "./Projects.css";
import ProjectsViewToggle from "./ProjectsViewToggle";
import SimplifiedProjectsView from "./SimplifiedProjectsView";
import { formatDate } from "./dateUtils";
import {
  PROJECTS_VIEW_STORAGE_KEYS,
  type ProjectsLayoutMode,
  type ProjectsViewMode,
} from "./quickViewUtils";

const DetailsProjects = lazy(() => import("../DetailsProjects/DetailsProjects"));

const floatingControlsClassName =
  "fixed left-1/2 bottom-[calc(env(safe-area-inset-bottom)+8px)] z-50 inline-flex -translate-x-1/2 items-center rounded-full bg-gray-200/[0.35] px-3 py-2 shadow-lg shadow-black/10 backdrop-blur-sm dark:bg-gray-700/[0.45] dark:shadow-black/40 md:absolute md:bottom-[calc(2rem+env(safe-area-inset-bottom))] md:left-1/2 md:-translate-x-1/2";

interface ProjectsProps {
  layoutMode?: ProjectsLayoutMode;
}

const fallbackProject: ProjectData = {
  name: "",
  Project_Overview: "",
  description: "",
  role: "",
  responsibilities: [],
  achievements: [],
  media: [],
};

function getInitialViewMode(layoutMode: ProjectsLayoutMode): ProjectsViewMode {
  if (typeof window === "undefined") {
    return "simplified";
  }

  const storedMode = window.localStorage.getItem(PROJECTS_VIEW_STORAGE_KEYS[layoutMode]);
  return storedMode === "detailed" ? "detailed" : "simplified";
}

const Projects: React.FC<ProjectsProps> = ({ layoutMode = "page" }) => {
  const { projects, ui } = usePortfolioContent();
  const [viewMode, setViewMode] = useState<ProjectsViewMode>(() => getInitialViewMode(layoutMode));
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [expandedProjectIndex, setExpandedProjectIndex] = useState<number | null>(null);

  useEffect(() => {
    setViewMode(getInitialViewMode(layoutMode));
  }, [layoutMode]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(PROJECTS_VIEW_STORAGE_KEYS[layoutMode], viewMode);
  }, [layoutMode, viewMode]);

  useEffect(() => {
    if (projects.length === 0) {
      setCurrentProjectIndex(0);
      setCurrentImageIndex(0);
      return;
    }

    if (currentProjectIndex > projects.length - 1) {
      setCurrentProjectIndex(projects.length - 1);
      setCurrentImageIndex(0);
    }
  }, [currentProjectIndex, projects.length]);

  const currentProject = projects[currentProjectIndex] ?? fallbackProject;
  const startDate = currentProject.start_date ? formatDate(currentProject.start_date, ui.locale.date) : "";
  const endDate = currentProject.end_date ? formatDate(currentProject.end_date, ui.locale.date) : "";

  const handleViewModeChange = (nextViewMode: ProjectsViewMode) => {
    setViewMode(nextViewMode);
  };

  const handlePrevProject = () => {
    if (currentProjectIndex > 0) {
      setDirection(-1);
      setCurrentImageIndex(0);
      setCurrentProjectIndex((previousIndex) => previousIndex - 1);
    }
  };

  const handleNextProject = () => {
    if (currentProjectIndex < projects.length - 1) {
      setDirection(1);
      setCurrentImageIndex(0);
      setCurrentProjectIndex((previousIndex) => previousIndex + 1);
    }
  };

  const handleOpenProject = (projectIndex: number) => {
    if (projectIndex < 0 || projectIndex >= projects.length) {
      return;
    }

    setCurrentProjectIndex(projectIndex);
    setCurrentImageIndex(0);
    setExpandedProjectIndex(projectIndex);
  };

  const handleCloseDetails = () => {
    setExpandedProjectIndex(null);
  };

  const viewToggle = (
    <ProjectsViewToggle
      simplifiedLabel={ui.projects.simplifiedViewLabel}
      detailedLabel={ui.projects.detailedViewLabel}
      value={viewMode}
      onChange={handleViewModeChange}
    />
  );

  return (
    <div className="relative w-full bg-whi text-dar">
      {viewMode === "simplified" ? (
        <div
          className={cn(
            "mx-auto w-full max-w-[1560px] px-4 pb-24 pt-24 sm:px-6 sm:pb-28 lg:px-8",
            layoutMode === "section" ? "min-h-screen min-h-[100dvh] lg:py-24" : "min-h-screen"
          )}
        >
          <div
            className={cn(
              "w-full pb-20 sm:pb-16",
              layoutMode === "section" &&
                "max-h-[min(72vh,52rem)] overflow-y-auto rounded-[2.25rem] pr-1 sm:pr-2"
            )}
          >
            <SimplifiedProjectsView
              projects={projects}
              copy={ui.projects}
              dateLocale={ui.locale.date}
              onOpenProject={handleOpenProject}
            />
          </div>

          <div className={floatingControlsClassName}>
            {viewToggle}
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "relative flex min-h-screen min-h-[100dvh] w-full flex-col items-center justify-center bg-whi px-4 py-8 sm:px-6",
            layoutMode === "page" ? "lg:py-8" : "lg:py-0"
          )}
        >
          <DetailedProjectsView
            layoutMode={layoutMode}
            currentProject={currentProject}
            projectsLength={projects.length}
            currentProjectIndex={currentProjectIndex}
            currentImageIndex={currentImageIndex}
            direction={direction}
            startDate={startDate}
            endDate={endDate}
            onPrevProject={handlePrevProject}
            onNextProject={handleNextProject}
            onExpandProject={() => handleOpenProject(currentProjectIndex)}
            setCurrentImageIndex={setCurrentImageIndex}
            extraControls={viewToggle}
          />
        </div>
      )}

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
