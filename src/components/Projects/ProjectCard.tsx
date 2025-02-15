import React from "react";
import { motion } from "framer-motion";
import {
  containerVariants,
  projectCardVariants,
  itemVariants,
  imageVariants,
} from "./variants";

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

const ProjectCard: React.FC<ProjectCardProps> = ({
  direction,
  currentProject,
  startDate,
  endDate,
  media,
  currentProjectIndex,
  currentImageIndex,
  setCurrentImageIndex,
}) => {
  const getAssetImage = (url: string) => {
    try {
      const assetPath = url.replace('@/', './');
      return new URL(`/src/${assetPath}`, import.meta.url).href;
    } catch (error) {
      console.error("Error loading image:", error);
      return "";
    }
  };

  return (
    <motion.div
      key={currentProjectIndex}
      className="flex justify-center items-center lg:w-[90%]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className="relative mb-16 lg:mb-24 w-full h-auto lg:h-[80vh] overflow-hidden lg:overflow-visible card"
        custom={direction}
        variants={projectCardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Versión Mobile/Tablet */}
        <motion.div
          className="lg:hidden flex flex-col space-y-4 p-6 text-dar dark:text-gray-100"
          variants={containerVariants}
        >
          <motion.span
            variants={itemVariants}
            className="font-rob text-gray-500 dark:text-gray-400 text-xs"
          >
            {startDate} – {endDate}
          </motion.span>
          <motion.h4
            variants={itemVariants}
            className="font-rob text-blue-500 dark:text-blue-400 text-xs sm:text-sm uppercase tracking-[0.2em]"
          >
            {currentProject.role}
          </motion.h4>
          <motion.h2
            variants={itemVariants}
            className="font-cor font-bold text-2xl sm:text-3xl leading-tight"
          >
            {currentProject.name}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="bg-gray-400/20 shadow-sm p-4 border border-gray-300/30 dark:border-gray-600 rounded-md font-lat text-dar text-base"
          >
            {currentProject.description}
          </motion.p>

          {/* Puntos para cambiar imágenes (versión Mobile/Tablet) */}
          {media.length > 1 && (
            <motion.div variants={itemVariants} className="flex space-x-2">
              {media.map((_, i) => (
                <motion.span
                  key={i}
                  className={`w-2 h-2 rounded-full cursor-pointer ${
                    i === currentImageIndex
                      ? "bg-blue-500 dark:bg-blue-400"
                      : "bg-gray-300"
                  }`}
                  onMouseEnter={() => setCurrentImageIndex(i)}
                  whileHover={{ scale: 1.5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Versión Desktop */}
        <motion.div
          className="hidden lg:block left-8 z-10 absolute space-y-4 w-1/2 text-dar dark:text-gray-100 translate-y-16"
          variants={containerVariants}
        >
          <motion.span
            variants={itemVariants}
            className="font-rob text-gray-500 dark:text-gray-400 text-sm"
          >
            {startDate} – {endDate}
          </motion.span>
          <motion.h4
            variants={itemVariants}
            className="font-rob text-blue-500 dark:text-blue-400 text-sm uppercase tracking-[0.2em]"
          >
            {currentProject.role}
          </motion.h4>
          <motion.h2
            variants={itemVariants}
            className="font-cor font-bold text-4xl leading-tight"
          >
            {currentProject.name}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="bg-gray-400/20 shadow-sm p-4 border border-gray-600 rounded-md font-lat text-dar dark:text-whi text-base"
          >
            {currentProject.description}
          </motion.p>

          {/* Puntos para cambiar imágenes (versión Desktop) */}
          {media.length > 1 && (
            <motion.div variants={itemVariants} className="flex space-x-2">
              {media.map((_, i) => (
                <motion.span
                  key={i}
                  className={`w-2 h-2 rounded-full cursor-pointer ${
                    i === currentImageIndex
                      ? "bg-blue-500 dark:bg-blue-400"
                      : "bg-gray-300"
                  }`}
                  onMouseEnter={() => setCurrentImageIndex(i)}
                  whileHover={{ scale: 1.5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Contenedor de imágenes */}
        <motion.div
          className="lg:top-1/4 right-0 lg:absolute mt-6 lg:mt-0 lg:pl-9 w-full lg:w-[55%] h-[300px] sm:h-[400px] lg:h-[60%] overflow-hidden card"
          variants={imageVariants}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {media.length > 0 ? (
            <motion.img
              src={getAssetImage(media[currentImageIndex].url)}
              alt={media[currentImageIndex].description || "Project Media"}
              className="border-gray-200/30 dark:border-gray-600 border-b rounded-xl w-full h-full object-cover lg:translate-y-9"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              loading="lazy"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="flex justify-center items-center bg-gray-200 dark:bg-gray-700 rounded-xl w-full h-full">
              <p className="text-gray-500 dark:text-gray-300">Sin imágenes disponibles</p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
