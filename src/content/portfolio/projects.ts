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
    quick_view: {
      summary:
        "Responsive portfolio built to present projects, technical strengths, and contact paths in a recruiter-friendly scan.",
      impact_label: "Personal brand",
    },
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
    quick_view: {
      summary:
        "Chrome extension that speeds up prompt retrieval, organization, and reuse directly inside ChatGPT.",
      impact_label: "Prompt workflow",
    },
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
  "Finance App (Nivo)": {
    "Project_Overview": "Aplicación personal de finanzas para registrar ingresos y gastos, consultar el flujo de efectivo y organizar presupuestos, metas de ahorro y movimientos recurrentes con almacenamiento local.",
    "description": "Aplicación personal de finanzas para registrar ingresos y gastos, consultar el flujo de efectivo y organizar presupuestos, metas de ahorro y movimientos recurrentes con almacenamiento local.",
    "role": "Desarrollador de proyecto personal",
    "responsibilities": [
      "Desarrollé la aplicación Flutter y la persistencia local con Drift y SQLite.",
      "Implementé captura y filtros de movimientos, seguimiento de efectivo y reportes por período.",
      "Construí herramientas de presupuestos, metas de ahorro y movimientos recurrentes y refiné la interfaz móvil."
    ],
    "achievements": [
      "Creé una aplicación móvil personal de finanzas con datos almacenados localmente.",
      "Generé versiones Android y documenté vistas reales en emulador."
    ],
    "client": "Proyecto personal",
    "quick_view": {
      "summary": "Aplicación personal de finanzas para registrar ingresos y gastos, consultar el flujo de efectivo y organizar presupuestos, metas de ahorro y movimientos recurrentes con almacenamiento local.",
      "impact_label": "Finanzas personales"
    },
    "mediaDescriptions": ["Inicio — demo Android en emulador","Movimientos — demo Android en emulador","Reportes por categoría — demo Android en emulador"]
  },
  "FitLog": {
    "Project_Overview": "Aplicación personal de entrenamiento para organizar rutinas, registrar series durante la sesión, revisar progreso por ejercicio e importar y exportar respaldos locales.",
    "description": "Aplicación personal de entrenamiento para organizar rutinas, registrar series durante la sesión, revisar progreso por ejercicio e importar y exportar respaldos locales.",
    "role": "Desarrollador de proyecto personal",
    "responsibilities": [
      "Desarrollé gestión de rutinas, sesiones activas y registro de series con peso, repeticiones, RIR y descanso.",
      "Implementé historial de entrenamientos, progreso por ejercicio y vistas de rendimiento.",
      "Desarrollé persistencia local, respaldos ZIP/XLSX e interfaces de resumen de sesión."
    ],
    "achievements": [
      "Creé una aplicación personal de entrenamiento centrada en registros y respaldos locales.",
      "Iteré la experiencia de entrenamiento y generé versiones Android."
    ],
    "client": "Proyecto personal",
    "quick_view": {
      "summary": "Aplicación personal de entrenamiento para organizar rutinas, registrar series durante la sesión, revisar progreso por ejercicio e importar y exportar respaldos locales.",
      "impact_label": "Registro de entrenamiento"
    },
    "mediaDescriptions": ["Biblioteca de rutinas — demo Android en emulador","Entrenamiento activo — demo Android en emulador","Panel de rendimiento — demo Android en emulador"]
  },
};

export const personalProjectsContent: Record<Language, ProjectData[]> = {
  en: buildProjects(personalProjects, englishTranslations, "personal"),
  es: buildProjects(personalProjects, spanishTranslations, "personal"),
};
