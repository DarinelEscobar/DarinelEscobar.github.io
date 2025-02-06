

import React, { useState } from "react";
import { X } from "lucide-react";
import data from "@data/experience.json";
import HeroSection from "./HeroSection";
import ProjectDetails from "./ProjectDetails";
import TechnicalSidebar from "./TechnicalSidebar";
import MediaGallery from "./MediaGallery";

interface DetailsProjectsProps {
  projectIndex: number;
  onClose: () => void;
}

const DetailsProjects: React.FC<DetailsProjectsProps> = ({
  projectIndex,
  onClose,
}) => {
  const project = data.experience.projects[projectIndex];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black/70">
      {/* Contenedor principal (permite scroll) */}
      <div className="relative min-h-full w-full">
        {/* Botón para cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow hover:bg-white z-50"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="min-h-screen bg-background text-foreground">
          {/* Sección Hero */}
          <HeroSection project={project} />

          {/* Sección de detalles del proyecto y barra lateral */}
          <section className="py-24 px-4">
            <div className="container mx-auto grid lg:grid-cols-3 gap-12">
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
    </div>
  );
};

export default DetailsProjects;
