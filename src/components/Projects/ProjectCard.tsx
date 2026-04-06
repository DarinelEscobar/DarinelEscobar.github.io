import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { ProjectData } from "@/content/portfolio/types";
import { usePortfolioContent } from "@/lib/portfolioContent";

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
  "dark:bg-black/25 dark:text-whi dark:border-white/[0.12] dark:shadow-[0_14px_30px_rgba(0,0,0,0.38)]",
].join(" ");

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
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false, // vuelve a animar al reentrar
  });

  useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [inView, controls]);

  const getAssetImage = (url: string) => {
    try {
      const assetPath = url.replace("@/", "./");
      return new URL(`/src/${assetPath}`, import.meta.url).href;
    } catch (error) {
      console.error("Error loading image:", error);
      return "";
    }
  };

  return (
    // Contenedor principal, maneja el "stagger" de todos los hijos
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="flex justify-center items-center lg:w-[90%]"
    >
      <div className="relative mb-16 lg:mb-24 w-full h-auto overflow-hidden card lg:min-h-[80vh]">
        {/* Versión Mobile/Tablet */}
        <div className="lg:hidden flex flex-col space-y-4 p-6 text-dar dark:text-gray-100">
          {(startDate || endDate) && (
            <motion.span variants={itemVariants} className="font-rob text-gray-500 dark:text-gray-400 text-xs">
              {[startDate, endDate].filter(Boolean).join(" - ")}
            </motion.span>
          )}

          <motion.p variants={itemVariants} className="font-rob text-blue-500 dark:text-blue-400 text-xs sm:text-sm uppercase tracking-[0.2em] font-bold">
            {currentProject.role}
          </motion.p>

          <motion.h2 variants={itemVariants} className="font-cor font-bold text-2xl sm:text-3xl leading-tight">
            {currentProject.name}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className={descriptionPanelClass}
          >
            {currentProject.description}
          </motion.p>

          {media.length > 1 && (
            <motion.div variants={itemVariants} className="flex space-x-2">
              {media.map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full cursor-pointer ${
                    i === currentImageIndex
                      ? "bg-blue-500 dark:bg-blue-400"
                      : "bg-gray-300"
                  }`}
                  onMouseEnter={() => setCurrentImageIndex(i)}
                />
              ))}
            </motion.div>
          )}
        </div>

        {/* Versión Desktop */}
        <div className="hidden lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] items-center gap-10 xl:gap-14 px-8 xl:px-10 py-12 xl:py-16 min-h-[80vh]">
          <div className="z-10 min-w-0 space-y-4 text-dar">
            {(startDate || endDate) && (
              <motion.span variants={itemVariants} className="block font-rob text-gray-500 dark:text-gray-400 text-sm">
                {[startDate, endDate].filter(Boolean).join(" - ")}
              </motion.span>
            )}

            <motion.p variants={itemVariants} className="font-rob text-blue-500 dark:text-blue-400 text-xs sm:text-sm uppercase tracking-[0.2em] font-bold">
              {currentProject.role}
            </motion.p>

            <motion.h2 variants={itemVariants} className="max-w-2xl font-cor font-bold text-4xl leading-tight text-dar dark:text-whi">
              {currentProject.name}
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className={descriptionPanelClass}
            >
              {currentProject.description}
            </motion.p>

            {media.length > 1 && (
              <motion.div variants={itemVariants} className="flex space-x-2">
                {media.map((_, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${
                      i === currentImageIndex
                        ? "bg-blue-500 dark:bg-blue-400"
                        : "bg-gray-300 dark:bg-gray-500"
                    }`}
                    onMouseEnter={() => setCurrentImageIndex(i)}
                  />
                ))}
              </motion.div>
            )}
          </div>

          {/* Contenedor de imágenes */}
          <motion.div
            variants={itemVariants}
            className="justify-self-end mt-6 lg:mt-0 w-full max-w-[52rem] h-[300px] sm:h-[400px] lg:h-[clamp(22rem,58vh,34rem)] overflow-hidden card"
          >
            {media.length > 0 ? (
              <img
                src={getAssetImage(media[currentImageIndex].url)}
                alt={media[currentImageIndex].description || projects.multimediaMaterialLabel}
                className="border-gray-200/30 dark:border-gray-600 border-b rounded-xl w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              <div className="flex justify-center items-center bg-gray-200 dark:bg-gray-700 rounded-xl w-full h-full">
                <p className="text-gray-500 dark:text-gray-300">
                  {projects.noImagesAvailableLabel}
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Contenedor de imágenes Mobile/Tablet */}
        <motion.div
          variants={itemVariants}
          className="lg:hidden mt-6 lg:mt-0 w-full h-[300px] sm:h-[400px] overflow-hidden card"
        >
          {media.length > 0 ? (
            <img
              src={getAssetImage(media[currentImageIndex].url)}
              alt={media[currentImageIndex].description || projects.multimediaMaterialLabel}
              className="border-gray-200/30 dark:border-gray-600 border-b rounded-xl w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div className="flex justify-center items-center bg-gray-200 dark:bg-gray-700 rounded-xl w-full h-full">
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
