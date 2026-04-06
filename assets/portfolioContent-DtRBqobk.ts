import { experienceContent } from "@/content/portfolio/experience";
import { personalProjectsContent } from "@/content/portfolio/projects";
import { resumeContent } from "@/content/portfolio/resume";
import type { Language, PortfolioContent } from "@/content/portfolio/types";
import { uiCopy } from "@/content/portfolio/ui";
import useLanguage from "@/hooks/useLanguage";

export function getPortfolioContent(language: Language): PortfolioContent {
  return {
    resume: resumeContent[language],
    projects: [...experienceContent[language], ...personalProjectsContent[language]],
    ui: uiCopy[language],
  };
}

export function usePortfolioContent(): PortfolioContent & { language: Language } {
  const { language } = useLanguage();

  return {
    language,
    ...getPortfolioContent(language),
  };
}
