import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { ProjectData } from "@/content/portfolio/types";
import { usePortfolioContent } from "@/lib/portfolioContent";
import useMediaQuery from "@/hooks/useMediaQuery";
import { getProjectCardImageSource } from "./imageUtils";

interface Media {
  url: string;
  description?: string;
}

interface ProjectCardProps {
  direction: number;
  currentProject: ProjectData;
  startDate: string;
  endDate: string;
  media: Media[];
  currentProjectIndex: number;
  currentImageIndex: number;
  setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>;
}

// Variantes para el contenedor principal (stagger)
const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      // cada hijo se animará de forma escalonada
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Variantes para cada ítem
const itemVariants = {
  hidden: {
    y: 50,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 120,
    },
  },
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  currentProject,
  startDate,
  endDate,
  media,
  currentImageIndex,
  setCurrentImageIndex,
}) => {
  const {
    ui: { projects },
  } = usePortfolioContent();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false, // vuelve a animar al reentrar
  });

  useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [inView, controls]);

  const imageSource = media[currentImageIndex]
    ? getProjectCardImageSource(media[currentImageIndex].url, currentImageIndex === 0)
    : null;

  const renderIndicators = () =>
    media.length > 1 ? (
      <motion.div variants={itemVariants} className="flex space-x-2">
        {media.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`${projects.multimediaMaterialLabel} ${index + 1}`}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === currentImageIndex
                ? "bg-blue-500 dark:bg-blue-400"
                : "bg-gray-300"
            }`}
            onClick={() => setCurrentImageIndex(index)}
            onMouseEnter={isDesktop ? () => setCurrentImageIndex(index) : undefined}
          />
        ))}
      </motion.div>
    ) : null;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="flex items-center justify-center w-full lg:w-[90%]"
    >
      <div className="card relative mb-16 w-full overflow-hidden lg:mb-24 lg:h-[80vh] lg:overflow-visible">
        {isDesktop ? (
          <div className="absolute left-8 top-1/4 z-10 w-1/2 space-y-4 text-dar">
            {(startDate || endDate) && (
              <motion.span variants={itemVariants} className="font-rob text-sm text-gray-500 dark:text-gray-400">
                {[startDate, endDate].filter(Boolean).join(" - ")}
              </motion.span>
            )}

            <motion.p variants={itemVariants} className="font-rob text-xs font-bold uppercase tracking-[0.2em] text-blue-500 dark:text-blue-400 sm:text-sm">
              {currentProject.role}
            </motion.p>

            <motion.h2 variants={itemVariants} className="font-cor text-4xl font-bold leading-tight">
              {currentProject.name}
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="rounded-md border border-gray-600 bg-gray-400/20 p-4 font-lat text-base text-dar shadow-sm dark:text-whi"
            >
              {currentProject.description}
            </motion.p>

            {renderIndicators()}
          </div>
        ) : (
          <div className="flex flex-col space-y-4 p-6 text-dar dark:text-gray-100">
            {(startDate || endDate) && (
              <motion.span variants={itemVariants} className="font-rob text-xs text-gray-500 dark:text-gray-400">
                {[startDate, endDate].filter(Boolean).join(" - ")}
              </motion.span>
            )}

            <motion.p variants={itemVariants} className="font-rob text-xs font-bold uppercase tracking-[0.2em] text-blue-500 dark:text-blue-400 sm:text-sm">
              {currentProject.role}
            </motion.p>

            <motion.h2 variants={itemVariants} className="font-cor text-2xl font-bold leading-tight sm:text-3xl">
              {currentProject.name}
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="rounded-md border border-gray-300/30 bg-gray-400/20 p-4 font-lat text-base text-dar shadow-sm dark:border-gray-600"
            >
              {currentProject.description}
            </motion.p>

            {renderIndicators()}
          </div>
        )}

        <motion.div
          variants={itemVariants}
          className="card mt-6 h-[300px] w-full overflow-hidden lg:absolute lg:right-0 lg:top-1/4 lg:mt-0 lg:h-[60%] lg:w-[55%] lg:pl-9 sm:h-[400px]"
        >
          {media.length > 0 && imageSource ? (
            <img
              src={imageSource.src}
              srcSet={imageSource.srcSet}
              sizes={imageSource.srcSet ? "(max-width: 1023px) 92vw, 55vw" : undefined}
              alt={media[currentImageIndex].description || projects.multimediaMaterialLabel}
              className="h-full w-full rounded-xl border-b border-gray-200/30 object-cover dark:border-gray-600"
              loading="lazy"
              decoding="async"
              onError={(event) => {
                if (event.currentTarget.dataset.fallbackApplied === "true") {
                  event.currentTarget.style.display = "none";
                  return;
                }

                event.currentTarget.dataset.fallbackApplied = "true";
                event.currentTarget.src = imageSource.srcSet?.split(",").pop()?.trim().split(" ")[0] ?? imageSource.src;
                event.currentTarget.removeAttribute("srcset");
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-xl bg-gray-200 dark:bg-gray-700">
              <p className="text-gray-500 dark:text-gray-300">
                {projects.noImagesAvailableLabel}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
