import React from "react";
import {
  Code2 as Code,
  Cloud,
  Database,
  Smartphone,
  Server,
  LayoutPanelLeft,
  PocketKnife,
  HeartHandshake,
  Speech,
  Award,
  type LucideIcon,
} from "lucide-react";
import {
  SiPython,
  SiJavascript,
  SiMysql,
  SiMongodb,
  SiAxios,
  SiAngular,
  SiExpress,
  SiFlutter,
  SiLaravel,
  SiCodeigniter,
  SiRabbitmq,
  SiTailwindcss,
  SiPostman,
  SiCodio,
  SiPhp,
  SiLivewire,
  SiVite,
  SiFramer,
  SiShadcnui,
  SiGithub,
  SiBitbucket,
  SiJira,
  SiJest,
  SiNextdotjs,
  SiSwagger,
  SiOpenapiinitiative,
  SiComposer,
  SiStripe,
  SiMercadopago,
  SiTypescript,
  SiVitest,
  SiCplusplus,
  SiC,
  SiJenkins,
} from "react-icons/si";
import {
  FaAws,
  FaDocker,
  FaGit,
  FaReact,
  FaNode,
  FaBootstrap,
  FaFigma,
  FaLightbulb,
  FaClock,
  FaProjectDiagram,
  FaShieldAlt,
  FaCodeBranch,
  FaUsers,
  FaVial,
  FaQuestion,
} from "react-icons/fa";
import { GiEagleEmblem, GiCactus, GiFuji, GiInfo } from "react-icons/gi";
import { usePortfolioContent } from "@/lib/portfolioContent";

// Map for Lucide icons
const lucideMap: Record<string, LucideIcon> = {
  code: Code,
  Code: Code,
  cloud: Cloud,
  Cloud: Cloud,
  database: Database,
  Database: Database,
  smartphone: Smartphone,
  Smartphone: Smartphone,
  server: Server,
  Server: Server,
  layoutpanelleft: LayoutPanelLeft,
  LayoutPanelLeft: LayoutPanelLeft,
  pocketknife: PocketKnife,
  PocketKnife: PocketKnife,
  hearthandshake: HeartHandshake,
  HeartHandshake: HeartHandshake,
  speech: Speech,
  Speech: Speech,
  award: Award,
  Award: Award,
};

// Maps for React Icons
const siMap: Record<string, React.ComponentType<{ className?: string }>> = {
  SiPython,
  SiJavascript,
  SiMysql,
  SiMongodb,
  SiAxios,
  SiAngular,
  SiExpress,
  SiFlutter,
  SiLaravel,
  SiCodeigniter,
  SiRabbitmq,
  SiTailwindcss,
  SiPostman,
  SiCodio,
  SiPhp,
  SiLivewire,
  SiVite,
  SiFramer,
  SiShadcnui,
  SiGithub,
  SiBitbucket,
  SiJira,
  SiJest,
  SiNextdotjs,
  SiSwagger,
  SiOpenapiinitiative,
  SiComposer,
  SiStripe,
  SiMercadopago,
  SiTypescript,
  SiVitest,
  SiCplusplus,
  SiC,
  SiJenkins,
};

const faMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaAws,
  FaDocker,
  FaGit,
  FaReact,
  FaNode,
  FaBootstrap,
  FaFigma,
  FaLightbulb,
  FaClock,
  FaProjectDiagram,
  FaShieldAlt,
  FaCodeBranch,
  FaUsers,
  FaVial,
  FaQuestion,
};

const giMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GiEagleEmblem,
  GiCactus,
  GiFuji,
  GiInfo,
};

function getIcon(iconName: string, library: string): React.ReactNode {
  switch (library.toLowerCase()) {
    case "lucide-react": {
      const LucideIcon = lucideMap[iconName] || Code;
      return React.createElement(LucideIcon, { className: "w-5 h-5" });
    }
    case "fa": {
      const FaIcon = faMap[iconName] || FaQuestion;
      return React.createElement(FaIcon, { className: "h-5 w-5" });
    }

    case "si": {
      const SiIcon = siMap[iconName] || SiCodio;
      return React.createElement(SiIcon, { className: "h-5 w-5" });
    }

    case "gi": {
      const GiIcon = giMap[iconName] || GiInfo;
      return React.createElement(GiIcon, { className: "h-5 w-5" });
    }

    default:
      return React.createElement(Code, { className: "w-5 h-5" });
  }
}

function truncate(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

interface Skill {
  name: string;
  icon: string;
  library: string;
  color: string;
}

interface SectionIcon {
  name: string;
  library: string;
  color: string;
}

interface CertificationItem {
  name: string;
  link: string;
  imageKey: string;
}

interface CombinedSection {
  section_icon?: SectionIcon;
  skills?: Skill[];
  languages_list?: Skill[];
  items?: CertificationItem[];
}

export interface SkillSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  skills: { name: string; icon: React.ReactNode; color: string }[];
}

export default function useSkillSections(): SkillSection[] {
  const {
    resume,
    ui: { home },
  } = usePortfolioContent();
  const combinedSections: Record<string, CombinedSection> = {
    ...resume.Skills_Technologies,
    certifications: resume.certifications,
  };

  return Object.keys(combinedSections).map((key) => {
    const sectionObj: CombinedSection = combinedSections[key];
    const secIcon = sectionObj.section_icon || {
      name: "code",
      library: "lucide-react",
      color: "#333",
    };

    let skillArray: Skill[] = [];
    if (sectionObj.skills) {
      skillArray = sectionObj.skills;
    } else if (sectionObj.languages_list) {
      skillArray = sectionObj.languages_list;
    } else if (sectionObj.items) {
      skillArray = sectionObj.items.map((cert) => ({
        name: cert.name,
        icon: "award",
        library: "lucide-react",
        color: secIcon.color,
      }));
    }

    const finalSkills = skillArray.map((sk) => ({
      name: truncate(sk.name, 16),
      icon: getIcon(sk.icon, sk.library),
      color: sk.color,
    }));

    return {
      id: key,
      title: truncate(home.skills.sectionTitles[key] ?? key, 24),
      icon: getIcon(secIcon.name, secIcon.library),
      color: secIcon.color,
      skills: finalSkills,
    };
  });
}
