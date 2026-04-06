import resumeSource from "@data/data.json";
import type { Language, ResumeData, SkillItem } from "./types";

function cloneResumeData(): ResumeData {
  return JSON.parse(JSON.stringify(resumeSource.resume)) as ResumeData;
}

function replaceSkillNames(skills: SkillItem[] | undefined, names: string[]): SkillItem[] | undefined {
  if (!skills) {
    return skills;
  }

  return skills.map((skill, index) => ({
    ...skill,
    name: names[index] ?? skill.name,
  }));
}

const resumeEn = cloneResumeData();
resumeEn.personal_info.rol = "Software Engineer";
resumeEn.professional_summary = {
  summary: "I'm Darinel, a versatile software engineer who enjoys full-stack development and problem-solving.",
  note: "Always eager to learn and grow, I thrive on tackling new challenges and expanding my skill set.",
};

const resumeEs = cloneResumeData();
resumeEs.personal_info.rol = "Ingeniero de Software";
resumeEs.personal_info.location = "Mexico";
resumeEs.professional_summary = {
  summary: "Soy Darinel, un ingeniero de software versatil que disfruta el desarrollo full-stack y la resolucion de problemas.",
  note: "Siempre con ganas de aprender y crecer, disfruto enfrentar nuevos desafios y ampliar mis habilidades.",
};
resumeEs.Skills_Technologies.soft_skills.skills = replaceSkillNames(
  resumeEs.Skills_Technologies.soft_skills.skills,
  ["Resolucion de Problemas", "Gestion del Tiempo"]
);
resumeEs.Skills_Technologies.languages.languages_list = replaceSkillNames(
  resumeEs.Skills_Technologies.languages.languages_list,
  ["Ingles B2", "Espanol Nativo", "Japones N4"]
);
resumeEs.education = resumeEs.education.map((item) => ({
  ...item,
  degree: "Ingenieria en Software",
  relevant_coursework: [
    "Arquitectura de Software",
    "Computacion en la Nube",
    "Sistemas de Bases de Datos",
    "Estructuras de Datos y Algoritmos",
    "Desarrollo Web",
    "Principios de Ingenieria de Software",
  ],
}));

export const resumeContent: Record<Language, ResumeData> = {
  en: resumeEn,
  es: resumeEs,
};
