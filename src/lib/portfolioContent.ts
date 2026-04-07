import { experienceContent } from "@/content/portfolio/experience";
import { personalProjectsContent } from "@/content/portfolio/projects";
import { resumeContent } from "@/content/portfolio/resume";
import type {
  Language,
  PortfolioContent,
  ProjectData,
  ResumeData,
  UiCopy,
} from "@/content/portfolio/types";
import { uiCopy } from "@/content/portfolio/ui";
import useLanguage from "@/hooks/useLanguage";

export function getResumeContent(language: Language): ResumeData {
  return resumeContent[language];
}

export function getProjectsContent(language: Language): ProjectData[] {
  return [...experienceContent[language], ...personalProjectsContent[language]];
}

export function getUiCopy(language: Language): UiCopy {
  return uiCopy[language];
}

export function getPortfolioContent(language: Language): PortfolioContent {
  return {
    resume: getResumeContent(language),
    projects: getProjectsContent(language),
    ui: getUiCopy(language),
  };
}

export function useResumeContent(): ResumeData {
  const { language } = useLanguage();

  return getResumeContent(language);
}

export function useProjectsContent(): ProjectData[] {
  const { language } = useLanguage();

  return getProjectsContent(language);
}

export function useUiCopy(): UiCopy {
  const { language } = useLanguage();

  return getUiCopy(language);
}

export function usePortfolioContent(): PortfolioContent & { language: Language } {
  const { language } = useLanguage();

  return {
    language,
    ...getPortfolioContent(language),
  };
}
