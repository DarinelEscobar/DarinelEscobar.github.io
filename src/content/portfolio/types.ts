export type Language = "en" | "es";

export interface SkillItem {
  name: string;
  icon: string;
  library: string;
  color: string;
}

export interface SectionIcon {
  name: string;
  library: string;
  color: string;
}

export interface CertificationItem {
  name: string;
  link: string;
  imageKey: string;
}

export interface SkillSectionData {
  section_icon: SectionIcon;
  skills?: SkillItem[];
  languages_list?: SkillItem[];
}

export interface CertificationsData {
  section_icon: SectionIcon;
  items: CertificationItem[];
}

export interface ResumeData {
  personal_info: {
    full_name: string;
    short_name: string;
    rol: string;
    location: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    portfolio: string;
  };
  professional_summary: {
    summary: string;
    note: string;
  };
  Skills_Technologies: Record<string, SkillSectionData>;
  education: Array<{
    degree: string;
    institution: string;
    graduation_date: string;
    relevant_coursework: string[];
  }>;
  certifications: CertificationsData;
}

export interface ProjectMedia {
  type: string;
  url: string;
  description?: string;
}

export interface ProjectQuickView {
  summary: string;
  impact_label?: string;
  stack_highlights: string[];
  preview_variant?: string;
}

export interface ProjectData {
  name: string;
  Project_Overview: string;
  description: string;
  role: string;
  technologies?: Record<string, string[]>;
  start_date?: string;
  end_date?: string;
  responsibilities: string[];
  achievements: string[];
  client?: string;
  team_size?: number;
  url?: string;
  repository?: string;
  media: ProjectMedia[];
  quick_view?: ProjectQuickView;
}

export interface PortfolioLink {
  to: string;
  label: string;
}

export interface UiCopy {
  locale: {
    time: string;
    date: string;
    duration: string;
  };
  header: {
    locationLabel: string;
    navigationLabel: string;
    themeLabel: string;
    languageLabel: string;
    menuLabel: string;
    closeLabel: string;
    lightModeLabel: string;
    darkModeLabel: string;
    navigationLinks: PortfolioLink[];
  };
  home: {
    about: {
      line1Prefix: string;
      line1Highlight: string;
      line1Suffix: string;
      line2Prefix: string;
      line2Highlight: string;
      line2Suffix: string;
      line3Prefix: string;
      line3Highlight: string;
      line3Suffix: string;
      line4Prefix: string;
      line4Highlight: string;
      line4Suffix: string;
      notePrefix: string;
      noteHighlightOne: string;
      noteMiddle: string;
      noteHighlightTwo: string;
      noteSuffix: string;
    };
    skills: {
      titlePrefix: string;
      titleHighlight: string;
      subtitle: string;
      sectionTitles: Record<string, string>;
    };
  };
  contact: {
    title: string;
    subtitle: string;
  };
  footer: {
    topLabel: string;
    copyrightLabel: string;
    quickJumpLabel: string;
    ascendLabel: string;
    contactInfoLabel: string;
    craftedByLabel: string;
  };
  projects: {
    exploreProjectLabel: string;
    viewRepositoryLabel: string;
    viewModeLabel: string;
    simplifiedViewLabel: string;
    detailedViewLabel: string;
    yearColumnLabel: string;
    projectColumnLabel: string;
    previewColumnLabel: string;
    actionColumnLabel: string;
    openProjectDetailsLabel: string;
    noProjectsAvailableLabel: string;
    noImageAvailableLabel: string;
    noImagesAvailableLabel: string;
    projectOverviewLabel: string;
    keyResponsibilitiesLabel: string;
    notableAchievementsLabel: string;
    technicalDetailsLabel: string;
    clientLabel: string;
    durationLabel: string;
    teamLabel: string;
    roleLabel: string;
    technologyStackLabel: string;
    multimediaMaterialLabel: string;
    previousImageLabel: string;
    nextImageLabel: string;
    teamMemberSingular: string;
    teamMemberPlural: string;
    monthSingular: string;
    monthPlural: string;
    weekSingular: string;
    weekPlural: string;
    andLabel: string;
  };
}

export interface PortfolioContent {
  resume: ResumeData;
  projects: ProjectData[];
  ui: UiCopy;
}
