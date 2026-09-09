import type { Service } from "@/types/content";

/**
 * Hourly USD rates. These are starting/indicative rates — final scope and
 * rate are confirmed after the free intro call, and fixed-price project
 * quotes are available on request. Edit freely; every card on the Pricing
 * section reads straight from this list.
 */
export const services: Service[] = [
  {
    id: "architecture",
    title: "AI System Architecture",
    icon: "layers",
    summary:
      "Designing the blueprint before a line of code ships — RAG pipelines, agentic systems and inference infrastructure that fit your stack and your load.",
    rate: 85,
    rateNote: "Starting at",
    deliverables: [
      "System design docs & architecture diagrams",
      "Technology and vendor selection",
      "Scalability and cost-modelling review",
    ],
  },
  {
    id: "migration",
    title: "Legacy → Microservices Migration",
    icon: "workflow",
    summary:
      "Breaking monolithic systems into scalable, cloud-native microservices — without stopping the business while it happens.",
    rate: 75,
    rateNote: "Starting at",
    deliverables: [
      "Migration roadmap & phased rollout plan",
      "Service boundaries & API contracts",
      "Low/zero-downtime cutover strategy",
    ],
  },
  {
    id: "build",
    title: "Build From Scratch",
    icon: "code",
    summary:
      "End-to-end product builds — from a blank repo to a production-grade full-stack or AI application.",
    rate: 70,
    rateNote: "Starting at",
    deliverables: [
      "Full-stack or AI product, shipped to production",
      "CI/CD pipeline & cloud infrastructure setup",
      "Documentation and handover for your team",
    ],
  },
  {
    id: "consultation",
    title: "AI/ML Consultation",
    icon: "brain",
    summary:
      "Technical advisory on model selection, RAG quality, inference cost and where AI actually pays off in your product.",
    rate: 90,
    rateNote: "Starting at",
    deliverables: [
      "Free 30-minute intro call — always",
      "Technical audits & second opinions",
      "Ongoing advisory retainers available",
    ],
  },
  {
    id: "project-management",
    title: "Project Management",
    icon: "gauge",
    summary:
      "Leading delivery for engineering and AI teams — roadmap, sprint cadence and shipping on schedule.",
    rate: 65,
    rateNote: "Starting at",
    deliverables: [
      "Roadmap & sprint planning",
      "Cross-functional team coordination",
      "Stakeholder reporting & delivery tracking",
    ],
  },
];

export const pricingNote =
  "Rates are hourly, in USD, and starting points — final scope and rate are confirmed after the free intro call. Fixed-price project quotes are available on request.";
