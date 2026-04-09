import React from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { ProjectData, UiCopy } from "@/content/portfolio/types";
import { cn } from "@/lib/utils";
import ProjectQuickPreview from "./ProjectQuickPreview";
import { formatDate } from "./dateUtils";
import { getQuickStackHighlights, getQuickSummary, groupProjectsByYear } from "./quickViewUtils";

interface SimplifiedProjectsViewProps {
  projects: ProjectData[];
  copy: UiCopy["projects"];
  dateLocale: string;
  onOpenProject: (projectIndex: number) => void;
}

const chipClassName =
  "inline-flex items-center rounded-full border border-black/12 bg-black/[0.03] px-3 py-1 font-rob text-[11px] uppercase tracking-[0.16em] text-black/60 dark:border-white/10 dark:bg-white/[0.05] dark:text-white/65";

const desktopRowVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: index * 0.04,
      duration: 0.32,
      ease: "easeOut",
    },
  }),
};

function MetaRow({ project }: { project: ProjectData }) {
  const stackHighlights = getQuickStackHighlights(project);

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {project.client ? <span className={chipClassName}>{project.client}</span> : null}
      {project.quick_view?.impact_label ? (
        <span className={chipClassName}>{project.quick_view.impact_label}</span>
      ) : null}
      {stackHighlights.map((item) => (
        <span key={item} className={chipClassName}>
          {item}
        </span>
      ))}
    </div>
  );
}

function getProjectDateLabel(project: ProjectData, dateLocale: string): string {
  const startDate = project.start_date ? formatDate(project.start_date, dateLocale) : "";
  const endDate = project.end_date ? formatDate(project.end_date, dateLocale) : "";

  return [startDate, endDate].filter(Boolean).join(" - ");
}

function DesktopProjectsTable({
  groupedProjects,
  allProjects,
  copy,
  dateLocale,
  onOpenProject,
}: {
  groupedProjects: Array<[string, ProjectData[]]>;
  allProjects: ProjectData[];
  copy: UiCopy["projects"];
  dateLocale: string;
  onOpenProject: (projectIndex: number) => void;
}) {
  return (
    <div className="hidden md:block">
      <div className="overflow-hidden rounded-[2rem] border border-black/12 bg-white/70 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-black/20 dark:shadow-[0_30px_70px_rgba(0,0,0,0.3)]">
        <div className="sticky top-0 z-10 grid border-b border-black/10 bg-[rgba(242,238,230,0.95)] font-rob text-[11px] uppercase tracking-[0.22em] text-black/45 backdrop-blur-md md:grid-cols-[172px_minmax(0,1fr)] dark:border-white/10 dark:bg-[rgba(20,20,20,0.94)] dark:text-white/45">
          <div className="border-r border-black/10 p-5 dark:border-white/10">{copy.yearColumnLabel}</div>
          <div className="grid minmax-0 grid-cols-[minmax(0,1fr)_230px_156px]">
            <div className="border-r border-black/10 p-5 dark:border-white/10">
              {copy.projectColumnLabel}
            </div>
            <div className="border-r border-black/10 p-5 dark:border-white/10">
              {copy.previewColumnLabel}
            </div>
            <div className="p-5">{copy.actionColumnLabel}</div>
          </div>
        </div>

        {groupedProjects.map(([year, yearProjects]) => (
          <section
            key={year}
            className="grid border-b border-black/10 last:border-b-0 md:grid-cols-[172px_minmax(0,1fr)] dark:border-white/10"
          >
            <div className="border-r border-black/10 p-6 dark:border-white/10">
              <span className="font-cor text-5xl leading-none text-dar lg:text-6xl">{year}</span>
            </div>

            <div>
              {yearProjects.map((project) => {
                const projectIndex = allProjects.indexOf(project);
                const dateLabel = getProjectDateLabel(project, dateLocale);

                return (
                  <motion.article
                    key={`${year}-${project.name}`}
                    custom={projectIndex}
                    initial="hidden"
                    animate="visible"
                    variants={desktopRowVariants}
                    className="grid border-b border-black/10 last:border-b-0 md:grid-cols-[minmax(0,1fr)_230px_156px] dark:border-white/10"
                  >
                    <div className="p-6">
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <p className="font-rob text-[11px] uppercase tracking-[0.22em] text-black/45 dark:text-white/45">
                            {project.role}
                          </p>
                          {dateLabel ? (
                            <p className="font-rob text-[11px] uppercase tracking-[0.18em] text-black/38 dark:text-white/38">
                              {dateLabel}
                            </p>
                          ) : null}
                        </div>
                        <h3 className="font-cor text-4xl leading-none text-dar lg:text-5xl">
                          {project.name}
                        </h3>
                        <p className="max-w-3xl font-lat text-sm leading-6 text-black/68 dark:text-white/68">
                          {getQuickSummary(project)}
                        </p>
                      </div>

                      <MetaRow project={project} />
                    </div>

                    <div className="border-l border-black/10 p-4 dark:border-white/10">
                      <ProjectQuickPreview project={project} className="h-full" />
                    </div>

                    <div className="border-l border-black/10 p-4 dark:border-white/10">
                      <button
                        type="button"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-black/12 bg-white/70 px-4 py-3 font-rob text-xs uppercase tracking-[0.18em] text-dar transition-colors hover:bg-dar hover:text-whi dark:border-white/10 dark:bg-white/[0.05] dark:text-whi dark:hover:bg-white dark:hover:text-black"
                        onClick={() => onOpenProject(projectIndex)}
                      >
                        {copy.openProjectDetailsLabel}
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function MobileProjectsTable({
  groupedProjects,
  allProjects,
  copy,
  dateLocale,
  onOpenProject,
}: {
  groupedProjects: Array<[string, ProjectData[]]>;
  allProjects: ProjectData[];
  copy: UiCopy["projects"];
  dateLocale: string;
  onOpenProject: (projectIndex: number) => void;
}) {
  return (
    <div className="space-y-4 md:hidden">
      {groupedProjects.map(([year, yearProjects]) => (
        <section
          key={year}
          className="overflow-hidden rounded-[1.75rem] border border-black/12 bg-white/70 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-black/20 dark:shadow-[0_20px_46px_rgba(0,0,0,0.28)]"
        >
          <div className="border-b border-black/10 px-5 py-4 dark:border-white/10">
            <span className="font-cor text-4xl leading-none text-dar">{year}</span>
          </div>

          <div className="divide-y divide-black/10 dark:divide-white/10">
            {yearProjects.map((project, index) => {
              const projectIndex = allProjects.indexOf(project);
              const dateLabel = getProjectDateLabel(project, dateLocale);

              return (
                <motion.article
                  key={`${year}-${project.name}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.28, ease: "easeOut" }}
                  className="space-y-4 p-5"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <p className="font-rob text-[11px] uppercase tracking-[0.2em] text-black/45 dark:text-white/45">
                        {project.role}
                      </p>
                      {dateLabel ? (
                        <p className="font-rob text-[11px] uppercase tracking-[0.18em] text-black/38 dark:text-white/38">
                          {dateLabel}
                        </p>
                      ) : null}
                    </div>
                    <h3 className="font-cor text-3xl leading-none text-dar">{project.name}</h3>
                    <p className="font-lat text-sm leading-6 text-black/68 dark:text-white/68">
                      {getQuickSummary(project)}
                    </p>
                  </div>

                  <MetaRow project={project} />

                  <ProjectQuickPreview project={project} />

                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-black/12 bg-white/70 px-4 py-3 font-rob text-xs uppercase tracking-[0.18em] text-dar transition-colors hover:bg-dar hover:text-whi dark:border-white/10 dark:bg-white/[0.05] dark:text-whi dark:hover:bg-white dark:hover:text-black"
                    onClick={() => onOpenProject(projectIndex)}
                  >
                    {copy.openProjectDetailsLabel}
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </motion.article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

const SimplifiedProjectsView: React.FC<SimplifiedProjectsViewProps> = ({
  projects,
  copy,
  dateLocale,
  onOpenProject,
}) => {
  if (projects.length === 0) {
    return (
      <div className="rounded-[1.75rem] border border-dashed border-black/12 bg-white/60 px-6 py-12 text-center font-lat text-base text-black/68 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/68">
        {copy.noProjectsAvailableLabel}
      </div>
    );
  }

  const groupedProjects = groupProjectsByYear(projects);

  return (
    <div className={cn("w-full")}>
      <DesktopProjectsTable
        groupedProjects={groupedProjects}
        allProjects={projects}
        copy={copy}
        dateLocale={dateLocale}
        onOpenProject={onOpenProject}
      />

      <MobileProjectsTable
        groupedProjects={groupedProjects}
        allProjects={projects}
        copy={copy}
        dateLocale={dateLocale}
        onOpenProject={onOpenProject}
      />
    </div>
  );
};

export default SimplifiedProjectsView;
