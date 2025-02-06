import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import data from "@data/experience.json";

import "./Projects.css";

import ProjectCard from "./ProjectCard";
import ProjectNavigation from "./ProjectNavigation";
import DetailsProjects from "../DetailsProjects/DetailsProjects"; // <— Asegúrate de la ruta correcta

import { formatDate } from "./dateUtils";

const Projects: React.FC = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Estado para controlar la ventana emergente de "DetailsProjects"
  const [expandedProjectIndex, setExpandedProjectIndex] = useState<number | null>(null);

  const projects = data.experience.projects;
  const currentProject = projects[currentProjectIndex];
  const media = currentProject.media || [];

  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: false });

  const startDate = formatDate(currentProject.start_date);
  const endDate = formatDate(currentProject.end_date);

  const handlePrevProject = () => {
    if (currentProjectIndex > 0) {
      setDirection(-1);
      setCurrentImageIndex(0);
      setCurrentProjectIndex((prev) => prev - 1);
    }
  };

  const handleNextProject = () => {
    if (currentProjectIndex < projects.length - 1) {
      setDirection(1);
      setCurrentImageIndex(0);
      setCurrentProjectIndex((prev) => prev + 1);
    }
  };

  /**
   * handleExpandProject:
   *  - recibe el índice del proyecto (o ID) que queremos expandir.
   *  - establece ese índice en el estado `expandedProjectIndex`.
   */
  const handleExpandProject = (projectIndex: number) => {
    setExpandedProjectIndex(projectIndex);
  };

  /**
   * handleCloseDetails:
   *  - cierra la ventana emergente de "DetailsProjects"
   */
  const handleCloseDetails = () => {
    setExpandedProjectIndex(null);
  };

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col min-h-screen w-screen bg-whi justify-center items-center py-8 lg:py-0 px-4 sm:px-6 transition-colors duration-300"
    >
      <AnimatePresence custom={direction} mode="wait">
        <ProjectCard
          key={currentProjectIndex}
          direction={direction}
          currentProject={currentProject}
          startDate={startDate}
          endDate={endDate}
          media={media}
          currentProjectIndex={currentProjectIndex}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
        />
      </AnimatePresence>

      {/* Componente de Navegación + Botón de Expandir */}
      <ProjectNavigation
        handlePrevProject={handlePrevProject}
        handleNextProject={handleNextProject}
        disablePrev={currentProjectIndex === 0}
        disableNext={currentProjectIndex === projects.length - 1}
        onExpandProject={() => handleExpandProject(currentProjectIndex)}
      />

      {/* Ventana emergente DetailsProjects si expandedProjectIndex NO es null */}
      {expandedProjectIndex !== null && (
        <DetailsProjects
          projectIndex={expandedProjectIndex}
          onClose={handleCloseDetails}
        />
      )}
    </motion.div>
  );
};

export default Projects;
