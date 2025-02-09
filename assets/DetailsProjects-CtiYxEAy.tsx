import React, { useState } from "react";
import { X } from "lucide-react";
import data from "@data/experience.json";
import HeroSection from "./HeroSection";
import ProjectDetails from "./ProjectDetails";
import TechnicalSidebar from "./TechnicalSidebar";
import MediaGallery from "./MediaGallery";
import { motion } from "framer-motion";

interface DetailsProjectsProps {
  projectIndex: number;
  onClose: () => void;
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 },
  },
};

const DetailsProjects: React.FC<DetailsProjectsProps> = ({
  projectIndex,
  onClose,
}) => {
  const project = data.experience.projects[projectIndex];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <motion.div
      className="z-50 fixed inset-0 bg-black/70 overflow-auto"
      variants={modalVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Contenedor principal */}
      <div className="absolute w-full min-h-full">
        {/* Botón para cerrar */}
        <button
          onClick={onClose}
          className="top-4 right-4 z-50 fixed bg-white/90 hover:bg-white dark:hover:bg-gray-800 dark:bg-gray-800/80 shadow p-2 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-dar dark:text-gray-200" />
        </button>

        {/* Fondo general y texto principal */}
        <div className="bg-whi min-h-screen text-dar">
          {/* Sección Hero */}
          <HeroSection project={project} />

          {/* Sección de detalles del proyecto y barra lateral */}
          <section className="px-4 py-24">
            <div className="gap-12 grid lg:grid-cols-3 mx-auto container">
              <ProjectDetails project={project} />
              <TechnicalSidebar project={project} />
            </div>
          </section>

          {/* Sección Multimedia (Slider + Galería) */}
          {project.media && project.media.length > 0 && (
            <MediaGallery
              media={project.media}
              currentImageIndex={currentImageIndex}
              setCurrentImageIndex={setCurrentImageIndex}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DetailsProjects;
