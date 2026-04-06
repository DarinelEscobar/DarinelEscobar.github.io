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

const descriptionPanelClass = [
  "rounded-xl border p-4 font-lat text-base leading-relaxed backdrop-blur-md",
  "bg-white/60 text-dar border-black/10 shadow-[0_12px_28px_rgba(15,23,42,0.12)]",
  "dark:bg-black/25 dark:border-white/[0.12] dark:shadow-[0_14px_30px_rgba(0,0,0,0.38)]",
].join(" ");

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

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
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [inView, controls]);

  const imageSource = media[currentImageIndex]
    ? getProjectCardImageSource(media[currentImageIndex].url, currentImageIndex === 0)
    : null;

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    if (!imageSource) {
      event.currentTarget.style.display = "none";
      return;
    }

    if (event.currentTarget.dataset.fallbackApplied === "true") {
      event.currentTarget.style.display = "none";
      return;
    }

    event.currentTarget.dataset.fallbackApplied = "true";
    event.currentTarget.src =
      imageSource.srcSet?.split(",").pop()?.trim().split(" ")[0] ?? imageSource.src;
    event.currentTarget.removeAttribute("srcset");
  };

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
                : "bg-gray-300 dark:bg-gray-500"
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
      className="flex w-full items-center justify-center lg:w-[90%]"
    >
      <div className="card relative mb-16 w-full overflow-hidden lg:mb-24 lg:min-h-[80vh]">
        <div className="flex min-h-full flex-col gap-6 px-6 py-6 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:items-center lg:gap-10 lg:px-8 lg:py-12 xl:gap-14 xl:px-10 xl:py-16">
          <div className="z-10 min-w-0 space-y-4 text-dar">
            {(startDate || endDate) && (
              <motion.span
                variants={itemVariants}
                className="block font-rob text-xs text-gray-500 dark:text-gray-400 lg:text-sm"
              >
                {[startDate, endDate].filter(Boolean).join(" - ")}
              </motion.span>
            )}

            <motion.p
              variants={itemVariants}
              className="font-rob text-xs font-bold uppercase tracking-[0.2em] text-blue-500 dark:text-blue-400 sm:text-sm"
            >
              {currentProject.role}
            </motion.p>

            <motion.h2
              variants={itemVariants}
              className="max-w-2xl font-cor text-2xl font-bold leading-tight text-dar sm:text-3xl lg:text-4xl"
            >
              {currentProject.name}
            </motion.h2>

            <motion.p variants={itemVariants} className={descriptionPanelClass}>
              {currentProject.description}
            </motion.p>

            {renderIndicators()}
          </div>

          <motion.div
            variants={itemVariants}
            className="card mt-2 h-[300px] w-full justify-self-end overflow-hidden sm:h-[400px] lg:mt-0 lg:h-[clamp(22rem,58vh,34rem)] lg:max-w-[52rem]"
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
                onError={handleImageError}
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
      </div>
    </motion.div>
  );
};

export default ProjectCard;
