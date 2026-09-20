import { Suspense, lazy, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { usePortfolioContent, usePresentationCopy } from "@/lib/portfolioContent";
import type { ProjectData, ProjectSource } from "@/content/portfolio/types";
import { type ProjectsLayoutMode, getProjectYear, getQuickSummary, getQuickStackHighlights, groupProjectsByYear } from "./quickViewUtils";
import ProjectQuickPreview from "./ProjectQuickPreview";

const DetailsProjects = lazy(() => import("../DetailsProjects/DetailsProjects"));

function ProjectCard({ project, onOpen, row = false }: { project: ProjectData; onOpen: () => void; row?: boolean }) {
  const copy = usePresentationCopy();
  const year = getProjectYear(project);
  return (
    <article className={row ? "project-row" : "project-card"}>
      <button type="button" className="project-image-button" onClick={onOpen} aria-label={copy.details + ": " + project.name}>
        <ProjectQuickPreview project={project} />
      </button>
      <div className="project-info">
        <div className="project-meta">
          <span>{project.source === "experience" ? copy.professional : copy.personal}</span>
          {year !== "----" && <span>{year}</span>}
          {project.quick_view?.impact_label && <span>{project.quick_view.impact_label}</span>}
        </div>
        <h3><button type="button" onClick={onOpen}>{project.name}</button></h3>
        <p className="project-summary">{getQuickSummary(project)}</p>
        <ul className="stack-tags" aria-label="Stack">{getQuickStackHighlights(project).map((tech) => <li key={tech}>{tech}</li>)}</ul>
        <button type="button" className="text-link" onClick={onOpen} aria-label={copy.details + ": " + project.name}>{copy.details}<ArrowUpRight size={18} /></button>
      </div>
    </article>
  );
}

const normalizeSearch = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export default function Projects({ layoutMode = "page" }: { layoutMode?: ProjectsLayoutMode }) {
  const { projects } = usePortfolioContent();
  const copy = usePresentationCopy();
  const [source, setSource] = useState<"all" | ProjectSource>("all");
  const [query, setQuery] = useState("");
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const isSection = layoutMode === "section";
  const Heading = isSection ? "h2" : "h1";
  const featuredVariants = ["ticketing", "payments", "automotive"];
  const featured = featuredVariants.flatMap((variant) => projects.filter((project) => project.quick_view?.preview_variant === variant).slice(0, 1));
  const search = normalizeSearch(query.trim());
  const filtered = projects.filter((project) => (source === "all" || project.source === source) &&
    normalizeSearch([project.name, project.role, project.client, getQuickSummary(project), ...Object.values(project.technologies ?? {}).flat()].join(" ")).includes(search));
  const selectedIndex = projects.findIndex((project) => project.name === selectedName);
  const groups = groupProjectsByYear(filtered);
  const filterOptions = [
    { value: "all" as const, label: copy.all },
    { value: "experience" as const, label: copy.professional },
    { value: "personal" as const, label: copy.personal },
  ];

  return (
    <section id="projects" className={"section-space" + (isSection ? " projects-section" : "")} aria-labelledby="projects-title">
      <div className="page-shell">
        <div className="section-heading-row">
          <div className="section-heading">
            <Heading id="projects-title" className="section-title">{isSection ? copy.selected : copy.allWork}</Heading>
            <p>{isSection ? copy.selectedIntro : copy.catalogIntro}</p>
          </div>
          {isSection && <Link className="text-link" to="/Project">{copy.allWork}<ArrowUpRight size={18} /></Link>}
        </div>
        {isSection ? (
          <div className="featured-grid">
            {(featured.length ? featured : projects.slice(0, 3)).map((project) => <ProjectCard key={project.name} project={project} onOpen={() => setSelectedName(project.name)} />)}
          </div>
        ) : (
          <>
            <div className="project-toolbar">
              <div className="project-filters" role="group" aria-label={copy.allWork}>
                {filterOptions.map((option) => <button key={option.value} type="button" aria-pressed={source === option.value} onClick={() => setSource(option.value)}>{option.label}</button>)}
              </div>
              <label className="project-search"><span>{copy.search}</span><div className="search-input"><Search size={18} aria-hidden="true" />
                <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={copy.searchPlaceholder} />
              </div></label>
            </div>
            <p className="result-count" role="status" aria-live="polite">{filtered.length} {copy.results}</p>
            {groups.length ? groups.map(([year, yearProjects]) => (
              <section className="project-year-group" key={year} aria-label={year === "----" ? copy.undated : year}>
                <h2 className="project-year">{year === "----" ? copy.undated : year}</h2>
                {yearProjects.map((project) => <ProjectCard row key={project.name} project={project} onOpen={() => setSelectedName(project.name)} />)}
              </section>
            )) : <div className="empty-state"><p>{copy.noResults}</p><button type="button" className="button button-outline" onClick={() => { setQuery(""); setSource("all"); }}>{copy.reset}</button></div>}
          </>
        )}
      </div>
      {selectedIndex >= 0 && (
        <Suspense fallback={<p role="status" className="page-shell">{copy.loading}</p>}>
          <DetailsProjects key={selectedName} projects={projects} projectIndex={selectedIndex} onClose={() => setSelectedName(null)} />
        </Suspense>
      )}
    </section>
  );
}
