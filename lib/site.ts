import { profile } from "@/content";

/**
 * Deployment-level config. Set NEXT_PUBLIC_SITE_URL in production so
 * canonical URLs, the sitemap and OG images resolve absolutely.
 */
export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  title: `${profile.name} — ${profile.role}`,
  shortTitle: profile.name,
  description:
    "AI/ML and Cloud Engineer with 4+ years building enterprise-grade AI platforms: autonomous agent systems, RAG pipelines, and high-throughput LLM inference on AWS, GCP and Azure.",
  keywords: [
    "AI Engineer",
    "Machine Learning Engineer",
    "LLM Engineer",
    "RAG",
    "LangGraph",
    "Multi-Agent Systems",
    "MLOps",
    "Cloud Engineer",
    "Next.js",
    "AI Consultant",
    "System Architecture",
    "Microservices Migration",
    "Freelance AI Engineer",
    "Nouman Ejaz",
  ],
} as const;
