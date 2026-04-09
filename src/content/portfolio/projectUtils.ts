import type { ProjectData, ProjectMedia, ProjectQuickView } from "./types";

interface RawProjectData {
  name: string;
  Project_Overview?: string;
  project_overview?: string;
  description: string;
  role: string;
  technologies?: Record<string, string[]>;
  start_date?: string;
  end_date?: string;
  responsibilities?: string[];
  achievements?: string[];
  client?: string;
  team_size?: number;
  url?: string;
  repository?: string;
  media?: ProjectMedia[];
  quick_view?: Partial<ProjectQuickView>;
}

export interface ProjectTranslation {
  Project_Overview?: string;
  description?: string;
  role?: string;
  technologies?: Record<string, string[]>;
  responsibilities?: string[];
  achievements?: string[];
  client?: string;
  mediaDescriptions?: string[];
  quick_view?: Partial<ProjectQuickView>;
}

function cleanOptionalValue(value?: string): string | undefined {
  if (!value || value === "N/A") {
    return undefined;
  }

  return value;
}

function normalizeMedia(media: ProjectMedia[] | undefined, descriptions: string[] | undefined): ProjectMedia[] {
  return (media ?? []).map((item, index) => ({
    ...item,
    description: descriptions?.[index] ?? item.description,
  }));
}

function flattenTechnologies(technologies?: Record<string, string[]>): string[] {
  if (!technologies) {
    return [];
  }

  return Object.values(technologies)
    .flat()
    .filter(Boolean)
    .filter((technology, index, allTechnologies) => allTechnologies.indexOf(technology) === index);
}

function normalizeQuickView(
  project: RawProjectData,
  translatedProject: ProjectTranslation | undefined,
  technologies: Record<string, string[]> | undefined
): ProjectQuickView | undefined {
  const sourceQuickView = project.quick_view;
  const translatedQuickView = translatedProject?.quick_view;
  const stackHighlights =
    translatedQuickView?.stack_highlights ??
    sourceQuickView?.stack_highlights ??
    flattenTechnologies(technologies).slice(0, 3);
  const summary =
    translatedQuickView?.summary ??
    sourceQuickView?.summary ??
    translatedProject?.description ??
    project.description;
  const impactLabel = translatedQuickView?.impact_label ?? sourceQuickView?.impact_label;
  const previewVariant = translatedQuickView?.preview_variant ?? sourceQuickView?.preview_variant;

  if (!summary && stackHighlights.length === 0 && !impactLabel && !previewVariant) {
    return undefined;
  }

  return {
    summary,
    impact_label: impactLabel,
    stack_highlights: stackHighlights,
    preview_variant: previewVariant,
  };
}

export function buildProjects(
  rawProjects: RawProjectData[],
  translations: Record<string, ProjectTranslation> = {}
): ProjectData[] {
  return rawProjects.map((project) => {
    const translatedProject = translations[project.name];
    const technologies = translatedProject?.technologies ?? project.technologies;

    return {
      name: project.name,
      Project_Overview:
        translatedProject?.Project_Overview ??
        project.Project_Overview ??
        project.project_overview ??
        "",
      description: translatedProject?.description ?? project.description,
      role: translatedProject?.role ?? project.role,
      technologies,
      start_date: cleanOptionalValue(project.start_date),
      end_date: cleanOptionalValue(project.end_date),
      responsibilities: translatedProject?.responsibilities ?? project.responsibilities ?? [],
      achievements: translatedProject?.achievements ?? project.achievements ?? [],
      client: translatedProject?.client ?? cleanOptionalValue(project.client),
      team_size: typeof project.team_size === "number" ? project.team_size : undefined,
      url: cleanOptionalValue(project.url),
      repository: cleanOptionalValue(project.repository),
      media: normalizeMedia(project.media, translatedProject?.mediaDescriptions),
      quick_view: normalizeQuickView(project, translatedProject, technologies),
    };
  });
}
