import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import data from "@data/experience.json";

import "./Projects.css";

import ProjectCard from "./ProjectCard";
import ProjectNavigation from "./ProjectNavigation";
import DetailsProjects from "../DetailsProjects/DetailsProjects";

import { formatDate } from "./dateUtils";

const Projects: React.FC = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [expandedProjectIndex, setExpandedProjectIndex] = useState<number | null>(null);

  const projects = data.experience.projects;
  const currentProject = projects[currentProjectIndex];
  const media = currentProject.media || [];

  // Observa si el contenedor está en vista (no es estrictamente necesario para la posición,
  // pero lo mantengo ya que puede servir para animaciones que tengas configuradas)
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: false });

  // Ajusta la variable --vh con el alto real del viewport en móviles
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  // Formateo de fechas
  const startDate = formatDate(currentProject.start_date);
  const endDate = formatDate(currentProject.end_date);

  // Funciones de navegación
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

  const handleExpandProject = (projectIndex: number) => {
    setExpandedProjectIndex(projectIndex);
  };

  const handleCloseDetails = () => {
    setExpandedProjectIndex(null);
  };

  return (
    <motion.div
      ref={ref}
      // Importante: "relative" + uso de la variable --vh para altura real en móviles
      className="relative flex flex-col justify-center items-center bg-whi px-4 sm:px-6 py-8 lg:py-0 w-screen min-h-[calc(var(--vh,1vh)*100)] transition-colors duration-300"
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

      <ProjectNavigation
        handlePrevProject={handlePrevProject}
        handleNextProject={handleNextProject}
        disablePrev={currentProjectIndex === 0}
        disableNext={currentProjectIndex === projects.length - 1}
        onExpandProject={() => handleExpandProject(currentProjectIndex)}
      />

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
