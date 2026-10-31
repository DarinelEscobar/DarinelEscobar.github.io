import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { usePortfolioContent } from "@/lib/portfolioContent";
import { getAssetImage } from "@/lib/assetImages";
import type { ProjectData } from "@/content/portfolio/types";
import { filterProjectsBySource, selectFeaturedProjects, type ProjectsLayoutMode, type ProjectsSourceFilterMode } from "./quickViewUtils";
import DetailsProjects from "../DetailsProjects/DetailsProjects";

const featuredNames = ["FREX Club", "EZTICKET - Event Ticketing and Access Control Platform", "AMIFIT Cobro App"];

export default function Projects({ layoutMode = "page" }: { layoutMode?: ProjectsLayoutMode }) {
  const { projects, language } = usePortfolioContent();
  const [filter, setFilter] = useState<ProjectsSourceFilterMode>("all");
  const [selected, setSelected] = useState<ProjectData | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const es = language === "es";
  const featured = layoutMode === "section";
  const visible = featured ? selectFeaturedProjects(projects, featuredNames) : filterProjectsBySource(projects, filter);

  return <section className="work-section">
    <div className="editorial-wrap">
      <div className="section-heading"><div><p className="section-label">{es ? "Una selección de mi trabajo" : "A selection of my work"}</p>{featured ? <h2>{es ? "Proyectos que toman forma." : "Work brought to life."}</h2> : <h1>{es ? "Proyectos que toman forma." : "Work brought to life."}</h1>}</div>
        {featured ? <Link className="text-link" to="/Project">{es ? "Todos los proyectos" : "All projects"} <ArrowUpRight size={16} /></Link> :
          <div className="project-filters" aria-label={es ? "Filtrar proyectos" : "Filter projects"}>
            <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>{es ? "Todos" : "All work"}</button>
            <button type="button" aria-pressed={filter === "experience"} onClick={() => setFilter("experience")}>{es ? "Profesionales" : "Professional"}</button>
          </div>}
      </div>
      <div className={featured ? "project-grid featured-grid" : "project-grid"}>
        {visible.map((project, index) => {
          const image = project.media[0];
          const src = image ? getAssetImage(image.url) : "";
          return <article className="project-card" key={project.name}>
            <button className="project-image" onClick={event => { opener.current = event.currentTarget; setSelected(project); }} aria-label={`${es ? "Ver proyecto" : "View project"}: ${project.name}`}>
              {src ? <img src={src} alt={image.description || project.name} loading="lazy" /> : <span>{project.name}</span>}
              <span className="project-image-action" aria-hidden="true"><ArrowUpRight size={21} /></span>
            </button>
            <div className="project-meta"><span>{String(index + 1).padStart(2, "0")}{project.client ? ` / ${project.client}` : project.source === "personal" ? ` / ${es ? "Proyecto personal" : "Personal project"}` : ""}</span><span>{project.end_date?.slice(0, 4) || ""}</span></div>
            <h3><button onClick={event => { opener.current = event.currentTarget; setSelected(project); }}>{project.name}</button></h3>
            <p>{project.quick_view?.summary || project.description}</p>
            <div className="project-role">{project.role} <span>↗</span></div>
          </article>;
        })}
      </div>
    </div>
    {selected && <DetailsProjects project={selected} onClose={() => { setSelected(null); requestAnimationFrame(() => opener.current?.focus()); }} />}
  </section>;
}
