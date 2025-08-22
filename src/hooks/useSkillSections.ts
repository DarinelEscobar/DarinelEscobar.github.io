import React from "react"
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
} from "lucide-react"
import * as SiIcons from "react-icons/si"
import * as FaIcons from "react-icons/fa"
import * as GiIcons from "react-icons/gi"

import data from "@data/data.json"

const lucideMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
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
}

function getIcon(iconName: string, library: string): React.ReactNode {
  switch (library.toLowerCase()) {
    case "lucide-react": {
      const LucideIcon = lucideMap[iconName] || Code
      return React.createElement(LucideIcon, { className: "w-5 h-5" })
    }
    case "fa":
      return React.createElement(
        FaIcons[iconName as keyof typeof FaIcons] || FaIcons.FaQuestion,
        { className: "h-5 w-5" }
      )
    case "si":
      return React.createElement(
        SiIcons[iconName as keyof typeof SiIcons] || SiIcons.SiCodio,
        { className: "h-5 w-5" }
      )
    case "gi":
      return React.createElement(
        GiIcons[iconName as keyof typeof GiIcons] || GiIcons.GiInfo,
        { className: "h-5 w-5" }
      )
    default:
      return React.createElement(Code, { className: "w-5 h-5" })
  }
}

function formatSectionTitle(key: string): string {
  return key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
}

function truncate(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max)}…` : text
}

interface Skill {
  name: string
  icon: string
  library: string
  color: string
}

interface SectionIcon {
  name: string
  library: string
  color: string
}

interface CertificationItem {
  name: string
  link: string
  imageKey: string
}

interface CombinedSection {
  section_icon?: SectionIcon
  skills?: Skill[]
  languages_list?: Skill[]
  items?: CertificationItem[]
}

export interface SkillSection {
  title: string
  icon: React.ReactNode
  color: string
  skills: { name: string; icon: React.ReactNode; color: string }[]
}

export default function useSkillSections(): SkillSection[] {
  const combinedSections: Record<string, CombinedSection> = {
    ...data.resume.Skills_Technologies,
    certifications: data.resume.certifications,
  }

  return Object.keys(combinedSections).map((key) => {
    const sectionObj: CombinedSection = combinedSections[key]
    const secIcon =
      sectionObj.section_icon || {
        name: "code",
        library: "lucide-react",
        color: "#333",
      }

    let skillArray: Skill[] = []
    if (sectionObj.skills) {
      skillArray = sectionObj.skills
    } else if (sectionObj.languages_list) {
      skillArray = sectionObj.languages_list
    } else if (sectionObj.items) {
      skillArray = sectionObj.items.map((cert) => ({
        name: cert.name,
        icon: "award",
        library: "lucide-react",
        color: secIcon.color,
      }))
    }

    const finalSkills = skillArray.map((sk) => ({
      name: truncate(sk.name, 16),
      icon: getIcon(sk.icon, sk.library),
      color: sk.color,
    }))

    return {
      title: truncate(formatSectionTitle(key), 24),
      icon: getIcon(secIcon.name, secIcon.library),
      color: secIcon.color,
      skills: finalSkills,
    }
  })
}

