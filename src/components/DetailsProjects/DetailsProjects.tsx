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
            className="bottom-6 left-1/2 z-40 fixed flex items-center gap-3 overflow-hidden border border-black/10 bg-white/95 px-4 py-3 rounded-full text-dar shadow-[0_18px_50px_rgba(15,23,42,0.18)] backdrop-blur-md -translate-x-1/2 dark:border-white/10 dark:bg-[#18130f]/92 dark:text-white/90 dark:shadow-[0_24px_65px_rgba(0,0,0,0.55)]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={handleScrollHintClick}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-blue-500/5 pointer-events-none dark:from-white/5 dark:via-transparent dark:to-transparent" />
            <span className="z-10 flex justify-center items-center bg-blue-600 shadow-[0_10px_25px_rgba(37,99,235,0.35)] rounded-full w-8 h-8 text-white dark:border dark:border-blue-300/15 dark:bg-blue-500/20 dark:text-blue-200 dark:shadow-none">
              <ChevronDown className="w-4 h-4" />
            </span>
            <span className="z-10 font-rob font-semibold text-[0.7rem] tracking-[0.2em] uppercase dark:text-white/88">
              Scroll to continue
            </span>
            <motion.span
              className="z-10 text-blue-700 dark:text-white/45"
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
