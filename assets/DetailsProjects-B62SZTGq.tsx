import React, { useState } from "react";
import { X } from "lucide-react";
import HeroSection from "./HeroSection";
import ProjectDetails from "./ProjectDetails";
import TechnicalSidebar from "./TechnicalSidebar";
import MediaGallery from "./MediaGallery";
import { motion } from "framer-motion";

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
  if (projectIndex < 0 || projectIndex >= projects.length) {
    return null;
  }

  const project = projects[projectIndex];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <motion.div
      className="z-50 fixed inset-0 bg-black/70 overflow-auto"
      variants={modalVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="absolute w-full min-h-full">
        <button
          onClick={onClose}
          className="top-4 right-4 z-50 fixed bg-white/90 hover:bg-white dark:hover:bg-gray-800 dark:bg-gray-800/80 shadow p-2 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-dark dark:text-gray-200" />
        </button>

        <div className="bg-white min-h-screen text-dark">
          <HeroSection project={project} />

          <section className="px-4 py-24">
            <div className="gap-12 grid lg:grid-cols-3 mx-auto container">
              <ProjectDetails project={project} />
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
    </motion.div>
  );
};

export default DetailsProjects;