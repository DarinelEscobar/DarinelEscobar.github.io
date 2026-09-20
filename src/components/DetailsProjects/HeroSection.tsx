import { ArrowUpRight } from "lucide-react";
import type { ProjectData } from "@/content/portfolio/types";
import { useUiCopy } from "@/lib/portfolioContent";
import ProjectQuickPreview from "@/components/Projects/ProjectQuickPreview";
import { getQuickSummary } from "@/components/Projects/quickViewUtils";

export default function HeroSection({ project }: { project: ProjectData }) {
  const { projects } = useUiCopy();
  return (
    <div className="project-hero">
      <div>
        <h2 id="project-detail-title">{project.name}</h2>
        <p>{getQuickSummary(project)}</p>
        <div className="button-row">
          {project.url && <a className="button button-primary" href={project.url} target="_blank" rel="noopener noreferrer">{projects.exploreProjectLabel}<ArrowUpRight size={18} /></a>}
          {project.repository && <a className="button button-outline" href={project.repository} target="_blank" rel="noopener noreferrer">{projects.viewRepositoryLabel}<ArrowUpRight size={18} /></a>}
        </div>
      </div>
      <ProjectQuickPreview project={project} />
    </div>
  );
}
