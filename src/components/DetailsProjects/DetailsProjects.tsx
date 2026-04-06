import React, { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { ProjectData } from "@/content/portfolio/types";
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

const modalVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const DetailsProjects: React.FC<DetailsProjectsProps> = ({
  projects,
  projectIndex,
  onClose,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(false);

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

    const handleScroll = () => updateScrollHint();
    const frameId = window.requestAnimationFrame(updateScrollHint);
    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => updateScrollHint())
        : null;

    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateScrollHint);
    resizeObserver?.observe(container);

    if (content) {
      resizeObserver?.observe(content);
    }

    return () => {
      window.cancelAnimationFrame(frameId);
      container.removeEventListener("scroll", handleScroll);
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
      className="z-50 fixed inset-0 bg-black/70 overflow-auto"
      variants={modalVariants}
      initial="hidden"
      animate="visible"
    >
      <div ref={contentRef} className="absolute w-full min-h-full">
        <button
          onClick={onClose}
          className="top-4 right-4 z-50 fixed bg-white/90 hover:bg-white dark:hover:bg-gray-700 dark:bg-gray-800/80 shadow p-2 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-dark dark:text-whi" />
        </button>

        <div className="bg-whi min-h-screen text-dar">
          <HeroSection project={project} />

          <section className="px-4 py-24">
            <div className="gap-12 grid lg:grid-cols-3 mx-auto container">
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
