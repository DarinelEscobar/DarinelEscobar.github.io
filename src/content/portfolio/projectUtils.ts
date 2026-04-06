import type { ProjectData, ProjectMedia } from "./types";

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

export function buildProjects(
  rawProjects: RawProjectData[],
  translations: Record<string, ProjectTranslation> = {}
): ProjectData[] {
  return rawProjects.map((project) => {
    const translatedProject = translations[project.name];

    return {
      name: project.name,
      Project_Overview:
        translatedProject?.Project_Overview ??
        project.Project_Overview ??
        project.project_overview ??
        "",
      description: translatedProject?.description ?? project.description,
      role: translatedProject?.role ?? project.role,
      technologies: translatedProject?.technologies ?? project.technologies,
      start_date: cleanOptionalValue(project.start_date),
      end_date: cleanOptionalValue(project.end_date),
      responsibilities: translatedProject?.responsibilities ?? project.responsibilities ?? [],
      achievements: translatedProject?.achievements ?? project.achievements ?? [],
      client: translatedProject?.client ?? cleanOptionalValue(project.client),
      team_size: typeof project.team_size === "number" ? project.team_size : undefined,
      url: cleanOptionalValue(project.url),
      repository: cleanOptionalValue(project.repository),
      media: normalizeMedia(project.media, translatedProject?.mediaDescriptions),
    };
  });
}
