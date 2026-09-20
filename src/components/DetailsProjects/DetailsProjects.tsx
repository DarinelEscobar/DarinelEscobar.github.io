import { useRef, useState } from "react";
import { X } from "lucide-react";
import type { ProjectData } from "@/content/portfolio/types";
import { usePresentationCopy } from "@/lib/portfolioContent";
import useModalDialog from "@/hooks/useModalDialog";
import HeroSection from "./HeroSection";
import ProjectDetails from "./ProjectDetails";
import TechnicalSidebar from "./TechnicalSidebar";
import MediaGallery from "./MediaGallery";

interface DetailsProjectsProps {
  projects: ProjectData[];
  projectIndex: number;
  onClose: () => void;
}

export default function DetailsProjects({ projects, projectIndex, onClose }: DetailsProjectsProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const copy = usePresentationCopy();
  useModalDialog(ref);
  const project = projects[projectIndex];
  if (!project) return null;
  return (
    <dialog ref={ref} className="project-dialog" aria-labelledby="project-detail-title"
      onCancel={(event) => { if (event.target === event.currentTarget) { event.preventDefault(); onClose(); } }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="project-dialog-bar">
        <span>{project.source === "experience" ? copy.professional : copy.personal}</span>
        <button type="button" className="icon-button" aria-label={copy.close} onClick={onClose}><X size={22} /></button>
      </div>
      <div className="project-dialog-content">
        <HeroSection project={project} />
        <div className="project-detail-layout">
          <ProjectDetails project={project} />
          <TechnicalSidebar project={project} />
        </div>
        {project.media.length > 0 && <MediaGallery media={project.media} currentImageIndex={currentImageIndex} setCurrentImageIndex={setCurrentImageIndex} />}
      </div>
    </dialog>
  );
}
