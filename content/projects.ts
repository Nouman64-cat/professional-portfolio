import type { Project } from "@/types/content";

/**
 * Real, verifiable work — each entry links to the actual GitHub repository.
 * Newest/most relevant first; the grid renders in array order.
 */
export const projects: Project[] = [
  {
    id: "zygotrix",
    title: "Zygotrix",
    tagline: "Educational genetics simulation platform",
    icon: "sparkles",
    status: "Live product",
    impact: "5,000-run validation, <1% deviation",
    description:
      "A platform that models how parental genetic data combines to shape possible offspring traits — Mendelian inheritance, sex-linked genes, epistasis and polygenic scoring, made explorable rather than theoretical.",
    highlights: [
      "Dual C++ simulation core: a stochastic engine (Mersenne Twister + Bernoulli sampling) for single-outcome runs, and a deterministic engine that computes exact probabilities like an automated Punnett square",
      "ABO blood-group validation across 5,000 simulated crosses landed at 49.6% / 50.4% against a 50/50 expectation — confirming the stochastic engine tracks real Mendelian probability",
      "Full product surface beyond the engine: web app, backend API, an AI integration layer, and a documentation/education site",
    ],
    stack: ["C++", "TypeScript", "Python", "Next.js", "Docker"],
    links: [
      { label: "Live demo", href: "https://zygotrix.vercel.app" },
      { label: "View on GitHub", href: "https://github.com/Nouman64-cat/Zygotrix" },
    ],
  },
  {
    id: "insurance-ai",
    title: "Insurance AI",
    tagline: "Event-driven multi-tenant underwriting platform",
    icon: "network",
    status: "Open-source platform",
    impact: "5 microservices, one Kafka backbone",
    description:
      "An automated underwriting system: proposals go in, and a LangGraph-orchestrated pipeline scores them and returns an auto-approve, decline, or human-review decision — with every tenant isolated at the request level.",
    highlights: [
      "Event-driven microservices on Kafka — API gateway, LangGraph risk engine, OCR engine, summarizer and tenant service, each independently deployable via Docker Compose",
      "Deterministic decision aggregation: 40% medical score + 40% financial score + 20% fraud-ring signal, the fraud check run as a graph query over Memgraph",
      "Two request paths on the same pipeline — async (202 + Kafka) for batch throughput, sync (Server-Sent Events) for real-time decisions",
      "Every request is tenant-scoped by header, with live monitoring via Kafka UI and Memgraph Lab plus a Docusaurus documentation site",
    ],
    stack: ["FastAPI", "LangGraph", "Gemini 2.5 Flash", "Kafka", "PostgreSQL", "Memgraph", "Next.js", "Docker"],
    links: [{ label: "View on GitHub", href: "https://github.com/Nouman64-cat/insurance-ai" }],
  },
  {
    id: "courtcierge",
    title: "CourtCierge",
    tagline: "Legal practice platform for lawyers and clients",
    icon: "shield",
    status: "Private codebase",
    impact: "5 services, one platform",
    description:
      "A full legal-tech SaaS: case management, secure client messaging, billing and time tracking, generated case documents, and a multilingual AI legal assistant — as web, mobile and marketing surfaces on a shared backend.",
    highlights: [
      "Real-time case messaging over Socket.IO with JWT-secured, role-based access for lawyers and clients",
      "Stripe-integrated billing and time tracking, with automated PDF case documents (PDFKit/Puppeteer) and S3-backed file storage",
      "A multilingual RAG legal assistant — answers in English, Urdu script or Roman Urdu, grounded in Pakistani law via LangChain and Pinecone over OpenAI",
      "One backend serving a React/GraphQL web dashboard, an Expo/React Native mobile app, and a separate marketing site",
    ],
    stack: ["Node.js", "Express", "MySQL", "Socket.IO", "Stripe", "React", "GraphQL", "LangChain", "Pinecone", "Expo"],
    links: [{ label: "View on GitHub", href: "https://github.com/Nouman64-cat/courtcierge" }],
  },
  {
    id: "5g-ai-network-lab",
    title: "5G AI Network Lab",
    tagline: "Applied lab: agentic bandwidth management on a live 5G core",
    icon: "gauge",
    // Honest framing: this is a hands-on lab (largely NVIDIA DLI-authored
    // infrastructure), not an original build like the three projects above.
    status: "Hands-on lab",
    impact: "Closed-loop AI control on a real 5G core",
    description:
      "A hands-on lab pairing an open-source 5G network simulation (OAI core, RAN, multi-slice UEs) with a LangGraph agent that reads live traffic metrics and dynamically rebalances bandwidth across network slices — applied agentic AI against real network infrastructure, not a toy environment.",
    highlights: [
      "Full OAI-based 5G core, RAN (gNodeB via FlexRIC) and two UE simulators, orchestrated with Docker Compose",
      "A LangGraph agent closes the loop — reads iPerf-generated traffic metrics from a Kinetica database and issues live slice-bandwidth adjustments through FlexRIC",
      "Grafana dashboards for real-time visibility into per-slice throughput and packet loss",
    ],
    stack: ["LangGraph", "Python", "Kinetica", "Docker", "OAI 5G Core/RAN", "Grafana"],
    links: [{ label: "View on GitHub", href: "https://github.com/Nouman64-cat/5G-AI-Network-Lab" }],
  },
];
