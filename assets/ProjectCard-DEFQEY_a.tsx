import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Media {
  url: string;
  description?: string;
}

interface Project {
  name: string;
  role: string;
  description: string;
  start_date: string;
  end_date: string;
  media?: Media[];
}

interface ProjectCardProps {
  direction: number;
  currentProject: Project;
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
      <div className="relative mb-16 lg:mb-24 w-full h-auto lg:h-[80vh] overflow-hidden lg:overflow-visible card">
        {/* Versión Mobile/Tablet */}
        <div className="lg:hidden flex flex-col space-y-4 p-6 text-dar dark:text-gray-100">
          <motion.span variants={itemVariants} className="font-rob text-gray-500 dark:text-gray-400 text-xs">
            {startDate} – {endDate}
          </motion.span>

          <motion.h4 variants={itemVariants} className="font-rob text-blue-500 dark:text-blue-400 text-xs sm:text-sm uppercase tracking-[0.2em]">
            {currentProject.role}
          </motion.h4>

          <motion.h2 variants={itemVariants} className="font-cor font-bold text-2xl sm:text-3xl leading-tight">
            {currentProject.name}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="bg-gray-400/20 shadow-sm p-4 border border-gray-300/30 dark:border-gray-600 rounded-md font-lat text-dar text-base"
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
        <div className="hidden lg:block top-1/4 left-8 z-10 absolute space-y-4 w-1/2 text-dar">

          <motion.span variants={itemVariants} className="font-rob text-gray-500 dark:text-gray-400 text-sm">
            {startDate} – {endDate}
          </motion.span>

          <motion.h4 variants={itemVariants} className="font-rob text-blue-500 dark:text-blue-400 text-sm uppercase tracking-[0.2em]">
            {currentProject.role}
          </motion.h4>

          <motion.h2 variants={itemVariants} className="font-cor font-bold text-4xl leading-tight">
            {currentProject.name}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="bg-gray-400/20 shadow-sm p-4 border border-gray-600 rounded-md font-lat text-dar dark:text-whi text-base"
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

        {/* Contenedor de imágenes */}
        <motion.div
          variants={itemVariants}
          className="lg:top-1/4 right-0 lg:absolute mt-6 lg:mt-0 lg:pl-9 w-full lg:w-[55%] h-[300px] sm:h-[400px] lg:h-[60%] overflow-hidden card"
        >
          {media.length > 0 ? (
            <img
              src={getAssetImage(media[currentImageIndex].url)}
              alt={media[currentImageIndex].description || "Project Media"}
              className="border-gray-200/30 dark:border-gray-600 border-b rounded-xl w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              sizes="(min-width: 1024px) 55vw, 100vw"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div className="flex justify-center items-center bg-gray-200 dark:bg-gray-700 rounded-xl w-full h-full">
              <p className="text-gray-500 dark:text-gray-300">
                Sin imágenes disponibles
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
