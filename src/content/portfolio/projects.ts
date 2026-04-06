import projectsSource from "@data/projects.json";
import type { Language, ProjectData } from "./types";
import { buildProjects, type ProjectTranslation } from "./projectUtils";

const personalProjects = projectsSource.projects.personal_projects;

const englishTranslations: Record<string, ProjectTranslation> = {
  "Personal Portfolio Website": {
    Project_Overview:
      "A personal portfolio focused on presenting projects and technical skills in an interactive and responsive way.",
    description:
      "Development of a modern portfolio built with React and Tailwind CSS, enhanced with Framer Motion animations. It allows visitors to explore projects, review technical details, and get in touch through integrated contact flows.",
    role: "Solo Developer",
    technologies: {
      Frontend: ["React", "Tailwind CSS", "Framer Motion", "HTML", "CSS"],
      Design: ["Figma"],
      Deployment: ["GitHub Pages"],
    },
    responsibilities: [
      "Design the component architecture and navigation flow.",
      "Implement a responsive layout across different screen sizes.",
      "Integrate polished Framer Motion animations to highlight key sections.",
    ],
    achievements: [
      "Increased the visibility of personal work and received feedback from recruiters.",
      "The modular structure enabled future content updates without friction.",
      "Delivered a fully responsive experience with strong performance on mobile devices.",
    ],
    mediaDescriptions: ["Main portfolio section with a modern visual design."],
  },
  "ChatGPT-SmartNavbar": {
    Project_Overview:
      "A Chrome extension designed to speed up the ChatGPT workflow through shortcuts and smarter prompt management.",
    description:
      "The extension adds an intuitive and dynamic navigation layer to the ChatGPT interface, enabling prompt search and organization, plus custom categories to manage templates and frequent messages more efficiently.",
    role: "Frontend Developer",
    technologies: {
      "Browser Extension": ["JavaScript", "Chrome APIs"],
      Styling: ["Tailwind CSS", "Bootstrap (optional)"],
      Tools: ["npm", "Webpack", "Postman"],
    },
    responsibilities: [
      "Develop the extension interface with JavaScript and Tailwind CSS.",
      "Configure build and packaging scripts for the Chrome extension.",
      "Implement autocomplete and prompt organization features across multiple categories.",
      "Optimize performance through DOM observation and dynamic content updates.",
    ],
    achievements: [
      "Significantly improved productivity for users who rely heavily on ChatGPT.",
      "Implemented a flexible search system that supports incomplete words and multiple fragments.",
      "Added automatic preference persistence to make continued use smoother.",
    ],
    client: "Personal Project",
    mediaDescriptions: ["Main extension view showing the smart navigation bar."],
  },
};

const spanishTranslations: Record<string, ProjectTranslation> = {
  "Personal Portfolio Website": {
    role: "Desarrollador unico",
    technologies: {
      Frontend: ["React", "Tailwind CSS", "Framer Motion", "HTML", "CSS"],
      Diseno: ["Figma"],
      Despliegue: ["GitHub Pages"],
    },
  },
  "ChatGPT-SmartNavbar": {
    role: "Desarrollador Frontend",
    technologies: {
      "Extension de Navegador": ["JavaScript", "Chrome APIs"],
      Estilos: ["Tailwind CSS", "Bootstrap (opcional)"],
      Herramientas: ["npm", "Webpack", "Postman"],
    },
    client: "Proyecto personal",
  },
};

export const personalProjectsContent: Record<Language, ProjectData[]> = {
  en: buildProjects(personalProjects, englishTranslations),
  es: buildProjects(personalProjects, spanishTranslations),
};
