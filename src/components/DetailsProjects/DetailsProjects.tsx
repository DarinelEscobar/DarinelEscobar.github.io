import React, { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ProjectData } from "@/content/portfolio/types";
import { modalPanel } from "@/lib/motionPresets";
import HeroSection from "./HeroSection";
import ProjectDetails from "./ProjectDetails";
import TechnicalSidebar from "./TechnicalSidebar";
import MediaGallery from "./MediaGallery";
import ScrollIndicator from "./ScrollIndicator";

interface DetailsProjectsProps {
  projects: ProjectData[];
  projectIndex: number;
  onClose: () => void;
}

const DetailsProjects: React.FC<DetailsProjectsProps> = ({
  projects,
  projectIndex,
  onClose,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const reduceMotion = useReducedMotion();

  const updateScrollHint = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const overflowDistance = container.scrollHeight - container.clientHeight;
    const hasOverflow = overflowDistance > 32;
    const hasMoreBelow = overflowDistance - container.scrollTop > 32;
    const shouldShowHint = hasOverflow && container.scrollTop < 220 && hasMoreBelow;

    setShowScrollHint((previousValue) =>
      previousValue === shouldShowHint ? previousValue : shouldShowHint
    );
  }, []);

  const handleScrollHintClick = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.scrollTo({
      top: Math.min(
        container.scrollTop + Math.max(container.clientHeight * 0.65, 320),
        container.scrollHeight
      ),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    const content = contentRef.current;
    if (!container) return;

    updateScrollHint();

    const frameId = window.requestAnimationFrame(updateScrollHint);
    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => updateScrollHint())
        : null;

    window.addEventListener("resize", updateScrollHint);
    resizeObserver?.observe(container);

    if (content) {
      resizeObserver?.observe(content);
    }

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", updateScrollHint);
      resizeObserver?.disconnect();
    };
  }, [projectIndex, updateScrollHint]);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [projectIndex]);

  if (projectIndex < 0 || projectIndex >= projects.length) {
    return null;
  }

  const project = projects[projectIndex];

  return (
    <motion.div
      ref={scrollContainerRef}
      className="h-full overflow-auto"
      onScroll={updateScrollHint}
      variants={modalPanel}
      initial={reduceMotion ? false : "hidden"}
      animate="visible"
      exit={reduceMotion ? undefined : "exit"}
    >
      <div ref={contentRef} className="relative min-h-full w-full">
        <button
          onClick={onClose}
          className="fixed right-4 top-4 z-50 rounded-full border border-dar/10 bg-whi/92 p-2 text-dar shadow-[0_16px_44px_rgba(15,23,42,0.16)] backdrop-blur-md transition-colors hover:text-[rgb(var(--cobalt))] dark:border-white/10"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="min-h-screen bg-whi text-dar">
          <HeroSection project={project} />

          <section className="px-5 py-24 sm:px-8 lg:px-12">
            <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-3">
              <ProjectDetails
                project={{
                  ...project,
                  responsibilities: project.responsibilities || [],
                  achievements: project.achievements || [],
                }}
              />
              <TechnicalSidebar project={project} />
            </div>
          </section>

          {project.media && project.media.length > 0 && (
            <MediaGallery
              media={project.media}
              currentImageIndex={currentImageIndex}
              setCurrentImageIndex={setCurrentImageIndex}
            />
          )}
        </div>
      </div>

      <AnimatePresence>
        {showScrollHint && (
          <ScrollIndicator
            containerRef={scrollContainerRef}
            onClick={handleScrollHintClick}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DetailsProjects;
