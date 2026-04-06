import React, { Suspense, lazy, useState } from "react";
import { useInView } from "react-intersection-observer";
import type { ProjectData } from "@/content/portfolio/types";
import { usePortfolioContent } from "@/lib/portfolioContent";

import "./Projects.css";

import ProjectCard from "./ProjectCard";
import ProjectNavigation from "./ProjectNavigation";

import { formatDate } from "./dateUtils";

const DetailsProjects = lazy(() => import("../DetailsProjects/DetailsProjects"));

const Projects: React.FC = () => {
  const {
    projects,
    ui,
  } = usePortfolioContent();
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [expandedProjectIndex, setExpandedProjectIndex] = useState<number | null>(null);
  const fallbackProject: ProjectData = {
    name: "",
    Project_Overview: "",
    description: "",
    role: "",
    responsibilities: [],
    achievements: [],
    media: [],
  };
  const currentProject = projects[currentProjectIndex] ?? fallbackProject;
  const media = currentProject.media ?? [];

  const { ref, inView } = useInView({ threshold: 0.35, triggerOnce: false });

  const startDate = currentProject.start_date ? formatDate(currentProject.start_date, ui.locale.date) : "";
  const endDate = currentProject.end_date ? formatDate(currentProject.end_date, ui.locale.date) : "";

  const handlePrevProject = () => {
    if (currentProjectIndex > 0) {
      setDirection(-1);
      setCurrentImageIndex(0);
      setCurrentProjectIndex((prev) => prev - 1);
    }
  };

  const handleNextProject = () => {
    if (currentProjectIndex < projects.length - 1) {
      setDirection(1);
      setCurrentImageIndex(0);
      setCurrentProjectIndex((prev) => prev + 1);
    }
  };

  const handleExpandProject = (projectIndex: number) => {
    setExpandedProjectIndex(projectIndex);
  };

  const handleCloseDetails = () => {
    setExpandedProjectIndex(null);
  };

  return (
    <div
      ref={ref}
      className="relative flex min-h-screen min-h-[100dvh] w-screen flex-col items-center justify-center bg-whi px-4 py-8 sm:px-6 lg:py-0"
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

      {inView && projects.length > 0 && (
        <ProjectNavigation
          handlePrevProject={handlePrevProject}
          handleNextProject={handleNextProject}
          disablePrev={currentProjectIndex === 0}
          disableNext={projects.length === 0 || currentProjectIndex === projects.length - 1}
          onExpandProject={() => handleExpandProject(currentProjectIndex)}
        />
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
