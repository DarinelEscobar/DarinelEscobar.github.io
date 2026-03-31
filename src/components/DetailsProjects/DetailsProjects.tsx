import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import HeroSection from "./HeroSection";
import ProjectDetails from "./ProjectDetails";
import TechnicalSidebar from "./TechnicalSidebar";
import MediaGallery from "./MediaGallery";
import { AnimatePresence, motion } from "framer-motion";

interface Project {
  name: string;
  Project_Overview: string;
  description: string;
  role: string;
  start_date: string;
  end_date: string;
  client: string;
  team_size: number;
  url?: string;
  repository?: string;
  responsibilities?: string[];
  achievements?: string[];
  media?: {
    type: string;
    url: string;
    description?: string;
  }[];
}

interface DetailsProjectsProps {
  projects: Project[];
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
  const project = projects[projectIndex];

  const updateScrollHint = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const overflowDistance = container.scrollHeight - container.clientHeight;
    const hasOverflow = overflowDistance > 32;
    const hasMoreBelow = overflowDistance - container.scrollTop > 32;
    const shouldShowHint = hasOverflow && container.scrollTop < 48 && hasMoreBelow;

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

  if (!project) {
    return null;
  }

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
          <motion.button
            type="button"
            aria-label="Scroll down to continue reading the project details"
            className="bottom-6 left-1/2 z-40 fixed flex items-center gap-3 bg-white/92 shadow-2xl backdrop-blur-sm px-4 py-3 border border-black/10 rounded-full -translate-x-1/2 text-dar dark:bg-gray-900/92 dark:border-white/10 dark:text-whi"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={handleScrollHintClick}
          >
            <span className="font-rob font-medium text-[0.68rem] tracking-[0.28em] uppercase">
              Scroll to continue
            </span>
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DetailsProjects;
