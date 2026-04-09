import type { ProjectData } from "@/content/portfolio/types";

export type ProjectsLayoutMode = "section" | "page";
export type ProjectsViewMode = "simplified" | "detailed";

export const PROJECTS_VIEW_STORAGE_KEYS: Record<ProjectsLayoutMode, string> = {
  section: "projects_view_home",
  page: "projects_view_project",
};

export function getProjectYear(project: ProjectData): string {
  const dateCandidate = project.end_date ?? project.start_date;

  if (!dateCandidate) {
    return "----";
  }

  return dateCandidate.slice(0, 4);
}

export function getQuickSummary(project: ProjectData): string {
  return project.quick_view?.summary ?? project.description;
}

export function getQuickStackHighlights(project: ProjectData): string[] {
  return project.quick_view?.stack_highlights ?? [];
}

export function groupProjectsByYear(projects: ProjectData[]) {
  const groupedProjects = new Map<string, ProjectData[]>();

  projects.forEach((project) => {
    const year = getProjectYear(project);
    const yearProjects = groupedProjects.get(year) ?? [];

    yearProjects.push(project);
    groupedProjects.set(year, yearProjects);
  });

  return Array.from(groupedProjects.entries()).sort(([yearA], [yearB]) => yearB.localeCompare(yearA));
}
