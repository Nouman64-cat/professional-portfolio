/**
 * Shared content types.
 *
 * Every section of the site renders from the plain data objects in `content/`,
 * so adding a role, skill or system means editing data — never JSX.
 */

export type IconName =
  | "brain"
  | "cloud"
  | "code"
  | "database"
  | "gauge"
  | "layers"
  | "network"
  | "shield"
  | "sparkles"
  | "terminal"
  | "workflow";

export interface NavItem {
  /** DOM id of the section this item scrolls to. */
  id: string;
  label: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail" | "phone" | "file";
  /** Shown in the command palette and on hover. */
  handle: string;
}

export interface Metric {
  label: string;
  value: number;
  /** Rendered after the animated number, e.g. "%" or "+". */
  suffix?: string;
  prefix?: string;
  description: string;
}

export interface SkillGroup {
  id: string;
  label: string;
  icon: IconName;
  /** One-line framing of what this stack is used for. */
  summary: string;
  skills: string[];
}

export interface Role {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  /** ISO-ish sort key, newest first. */
  start: string;
  end: string | null;
  /** Short framing shown before the achievement list is expanded. */
  focus: string;
  highlights: string[];
  stack: string[];
}

export interface SystemHighlight {
  id: string;
  title: string;
  tagline: string;
  icon: IconName;
  /** Headline outcome, e.g. "70% faster retrieval". */
  impact: string;
  description: string;
  /** Ordered stages rendered as an architecture flow diagram. */
  pipeline: string[];
  stack: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  location: string;
  period: string;
}

export interface Service {
  id: string;
  title: string;
  icon: IconName;
  /** One-line framing of the engagement. */
  summary: string;
  /** Hourly rate in USD. */
  rate: number;
  /** e.g. "Starting at" — shown before the rate. */
  rateNote: string;
  /** What's included, 2–4 short bullets. */
  deliverables: string[];
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  icon: IconName;
  /** Short, verifiable status chip, e.g. "Live product". */
  status: string;
  /** Headline outcome or scale statement. */
  impact: string;
  description: string;
  /** What's real about it — 3–4 concrete, checkable bullets. */
  highlights: string[];
  stack: string[];
  /** 0–2 entries: live demo first, then source. Omit what doesn't exist. */
  links: ProjectLink[];
}
