import type { ProjectData } from "@/content/portfolio/types";
import { useUiCopy } from "@/lib/portfolioContent";

export default function TechnicalSidebar({ project }: { project: Pick<ProjectData, "start_date" | "end_date" | "client" | "team_size" | "role" | "technologies"> }) {
  const { locale, projects } = useUiCopy();
  const formatDate = (value?: string) => {
    if (!value) return "";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString(locale.date, { month: "long", year: "numeric", timeZone: "UTC" });
  };
  const dates = [formatDate(project.start_date), formatDate(project.end_date)].filter(Boolean);
  return (
    <aside className="technical-sidebar" aria-labelledby="technical-title">
      <h3 id="technical-title">{projects.technicalDetailsLabel}</h3>
      <dl>
        {project.client && <div><dt>{projects.clientLabel}</dt><dd>{project.client}</dd></div>}
        <div><dt>{projects.roleLabel}</dt><dd>{project.role}</dd></div>
        {dates.length > 0 && <div><dt>{projects.durationLabel}</dt><dd>{dates.join(" - ")}</dd></div>}
        {typeof project.team_size === "number" && <div><dt>{projects.teamLabel}</dt><dd>{project.team_size} {project.team_size === 1 ? projects.teamMemberSingular : projects.teamMemberPlural}</dd></div>}
      </dl>
      {project.technologies && <>
        <h4>{projects.technologyStackLabel}</h4>
        <ul className="stack-tags">{[...new Set(Object.values(project.technologies).flat())].map((technology) => <li key={technology}>{technology}</li>)}</ul>
      </>}
    </aside>
  );
}
