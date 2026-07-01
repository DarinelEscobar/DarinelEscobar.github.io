import React, { Suspense, lazy, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { usePortfolioContent } from "@/lib/portfolioContent";
import { cn } from "@/lib/utils";
import { modalOverlay } from "@/lib/motionPresets";
import ProjectsSourceFilter from "./ProjectsSourceFilter";
import SimplifiedProjectsView from "./SimplifiedProjectsView";
import {
  filterProjectsBySource,
  type ProjectsLayoutMode,
  type ProjectsSourceFilterMode,
} from "./quickViewUtils";

const DetailsProjects = lazy(() => import("../DetailsProjects/DetailsProjects"));
const floatingControlsClassName =
  "fixed left-1/2 bottom-[calc(env(safe-area-inset-bottom)+12px)] z-40 inline-flex items-center rounded-full border border-dar/10 bg-whi/85 px-3 py-2 shadow-[0_16px_44px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-white/10 dark:shadow-black/40";

interface ProjectsProps {
  layoutMode?: ProjectsLayoutMode;
}

const Projects: React.FC<ProjectsProps> = ({ layoutMode = "page" }) => {
  const { projects, ui } = usePortfolioContent();
  const reduceMotion = useReducedMotion();
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
          "mx-auto w-full max-w-[1500px] px-5 pb-24 pt-24 sm:px-8 sm:pb-28 lg:px-12",
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

      <AnimatePresence>
        {inView ? (
          <motion.div
            className={floatingControlsClassName}
            initial={reduceMotion ? false : { opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 10, x: "-50%" }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            <ProjectsSourceFilter
              allProjectsLabel={ui.projects.allProjectsFilterLabel}
              realExperienceLabel={ui.projects.realExperienceFilterLabel}
              value={sourceFilter}
              onChange={setSourceFilter}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {expandedProjectIndex !== null ? (
          <motion.div
            key="project-details-shell"
            className="fixed inset-0 z-50 bg-slate-950/72"
            variants={modalOverlay}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            exit={reduceMotion ? undefined : "exit"}
          >
            <Suspense fallback={<div className="h-full w-full bg-slate-950/72" />}>
              <DetailsProjects
                projects={visibleProjects}
                projectIndex={expandedProjectIndex}
                onClose={handleCloseDetails}
              />
            </Suspense>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
