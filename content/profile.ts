import type { EducationEntry, Metric, NavItem, SocialLink } from "@/types/content";

export const profile = {
  name: "Nouman Ejaz",
  firstName: "Nouman",
  role: "Lead AI/ML & Cloud Engineer",
  /** Rotated through the hero headline typewriter. */
  titles: [
    "Lead AI/ML Engineer",
    "Agentic Systems Architect",
    "Cloud & Platform Engineer",
    "Full-Stack Product Builder",
  ],
  location: "Bahria Town, Lahore, Pakistan",
  email: "working.nouman.ejaz@gmail.com",
  phone: "+92 324 1428934",
  /** Digits only, for the tel: href. */
  phoneHref: "+923241428934",
  availability: "Open to senior & lead AI engineering roles",
  experienceYears: "4+",
  resumePath: "/nouman-ejaz-resume.pdf",
  /** Free 30-minute intro call — used by the header, hero, pricing and contact CTAs. */
  calendlyUrl: "https://calendly.com/working-nouman-ejaz/ai-consultation",
  tagline:
    "I architect and scale enterprise-grade AI platforms that serve millions of users.",
  summary: [
    "I design and ship autonomous AI agent systems, RAG pipelines and ML-powered products — backed by a strong full-stack foundation and four-plus years of shipping software that real businesses depend on.",
    "My work spans cloud-native infrastructure across AWS, GCP and Azure, large-scale LLM inference optimisation, and leading cross-functional engineering teams. I care about systems that are scalable, well-structured, adhere to SOLID principles, and deliver measurable business value.",
  ],
} as const;

/**
 * Social links render only when a href is present, so the site never ships a
 * dead link. Add your profile URLs here and the icons appear everywhere —
 * header, hero, footer and the ⌘K command palette.
 */
export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/Nouman64-cat",
    icon: "github",
    handle: "github.com/Nouman64-cat",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nouman-ejaz-64251125b/",
    icon: "linkedin",
    handle: "in/nouman-ejaz-64251125b",
  },
  {
    label: "Email",
    href: `mailto:${profile.email}`,
    icon: "mail",
    handle: profile.email,
  },
  {
    label: "Phone",
    href: `tel:${profile.phoneHref}`,
    icon: "phone",
    handle: profile.phone,
  },
];

export const navItems: NavItem[] = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "systems", label: "Systems" },
  { id: "projects", label: "Projects" },
  { id: "open-source", label: "Open Source" },
  { id: "pricing", label: "Pricing" },
  { id: "contact", label: "Contact" },
];

export const metrics: Metric[] = [
  {
    label: "Years building software",
    value: 4,
    suffix: "+",
    description:
      "From WordPress automation to leading AI platform engineering — shipping production systems since 2023.",
  },
  {
    label: "Engineers led",
    value: 12,
    description:
      "A cross-functional team across ML, platform and infrastructure, driving architecture and roadmap.",
  },
  {
    label: "Faster knowledge retrieval",
    value: 70,
    suffix: "%",
    description:
      "Enterprise RAG platform unifying documents, APIs and structured data into one retrieval layer.",
  },
  {
    label: "Daily LLM requests served",
    value: 1,
    prefix: "",
    suffix: "M+",
    description:
      "High-throughput inference platform with intelligent batching, caching and cost-aware routing.",
  },
];

export const education: EducationEntry[] = [
  {
    degree: "Bachelor of Science in Software Engineering",
    institution: "University of Management and Technology",
    location: "Lahore, Pakistan",
    period: "2021 — 2025",
  },
];
