interface ExperienceEntry {
  company: string;
  role: string;
  location: string;
  startYear: number;
  endYear: number | null;
  current: boolean;
  description: string;
}

interface EducationEntry {
  institution: string;
  degree: string;
  year: number;
  description?: string;
}

interface SkillItem {
  label: string;
  order: number;
}

type CurrentlyType = "making" | "studying" | "building";

interface CurrentlyItem {
  type: CurrentlyType;
  label: string;
  detail?: string;
}

interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

interface SiteConfig {
  title: string;
  description: string;
  footerLine: string;
  copyright: string;
}

export type {
  ExperienceEntry,
  EducationEntry,
  SkillItem,
  CurrentlyType,
  CurrentlyItem,
  SocialLink,
  SiteConfig,
};
