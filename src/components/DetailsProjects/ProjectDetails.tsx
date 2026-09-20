import type { ProjectData } from "@/content/portfolio/types";
import { useUiCopy } from "@/lib/portfolioContent";

export default function ProjectDetails({ project }: { project: Pick<ProjectData, "Project_Overview" | "responsibilities" | "achievements"> }) {
  const { projects } = useUiCopy();
  return (
    <div className="project-body">
      {project.Project_Overview && <section><h3>{projects.projectOverviewLabel}</h3><p>{project.Project_Overview}</p></section>}
      {project.responsibilities.length > 0 && <section><h3>{projects.keyResponsibilitiesLabel}</h3><ul>{project.responsibilities.map((item, index) => <li key={index}>{item}</li>)}</ul></section>}
      {project.achievements.length > 0 && <section><h3>{projects.notableAchievementsLabel}</h3><ul>{project.achievements.map((item, index) => <li key={index}>{item}</li>)}</ul></section>}
    </div>
  );
}
