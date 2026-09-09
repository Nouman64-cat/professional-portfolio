import type { Role } from "@/types/content";

/** Newest first — the timeline renders in array order. */
export const roles: Role[] = [
  {
    id: "rizviz",
    title: "Lead AI/ML Engineer",
    company: "Rizviz Internation Impex",
    location: "Lahore, Pakistan",
    period: "Feb 2026 — Present",
    start: "2026-02",
    end: null,
    focus:
      "Owning the architecture of an enterprise AI platform — retrieval, agents, inference and the team that ships them.",
    highlights: [
      "Architected and delivered an enterprise-scale RAG platform integrating LLMs, vector databases, external APIs and structured data to drastically improve knowledge retrieval.",
      "Designed and deployed multi-agent AI systems using LangGraph and AutoGen, enabling autonomous workflows and end-to-end process automation across enterprise use cases.",
      "Engineered a high-throughput LLM inference platform supporting millions of daily requests, with intelligent batching, caching and cost-aware routing to significantly reduce infrastructure costs.",
      "Optimised inference performance through token-level optimisation and distributed serving, sharply improving latency under heavy production load.",
      "Built a robust LLM evaluation framework combining offline benchmarking with online A/B testing to guarantee model reliability, consistency and production trustworthiness.",
      "Led and mentored a cross-functional team of 12 engineers across ML, platform and infrastructure, driving architectural strategy, roadmap planning and alignment.",
    ],
    stack: ["LangGraph", "AutoGen", "Vector DBs", "LLM Serving", "Kubernetes", "Evaluation"],
  },
  {
    id: "geniteam",
    title: "Associate Software Engineer — AI Specialist",
    company: "GenIteam Solutions",
    location: "Lahore, Pakistan",
    period: "Aug 2025 — Mar 2026",
    start: "2025-08",
    end: "2026-03",
    focus:
      "Distributed ML pipelines and production models, delivered alongside international research partners.",
    highlights: [
      "Designed and scaled distributed ML pipelines supporting both batch and real-time inference workloads at production scale.",
      "Collaborated directly with international clients and stakeholders, including NVIDIA, to develop and deliver a complex research simulation project.",
      "Built and deployed recommender systems and fraud detection models, driving improved model performance that directly impacted core business KPIs.",
      "Architected a centralised feature store and reusable training pipelines, accelerating the team's experimentation lifecycle and model iteration speed.",
      "Developed automated monitoring and retraining pipelines to ensure continuous model performance and proactively handle data drift in production.",
    ],
    stack: ["PyTorch", "Feature Store", "Recommenders", "Fraud Detection", "MLOps", "NVIDIA"],
  },
  {
    id: "onyxtec",
    title: "Full Stack Associate Software Engineer",
    company: "Onyxtec Solution",
    location: "Lahore, Pakistan",
    period: "Feb 2025 — Jul 2025",
    start: "2025-02",
    end: "2025-07",
    focus:
      "Real-time, compliance-sensitive healthcare systems built on scalable microservices.",
    highlights: [
      "Built large-scale, full-stack systems for enterprise clients, specifically developing real-time applications for the healthcare industry.",
      "Designed and deployed highly scalable REST-based microservices supporting real-time self-healing and rigorous system compliance.",
      "Enhanced machine learning model accuracy through advanced feature engineering and comprehensive hyperparameter optimisation.",
    ],
    stack: ["Node.js", "REST Microservices", "React", "Healthcare Compliance", "Feature Engineering"],
  },
  {
    id: "career-twearkz",
    title: "Senior Frontend Engineer",
    company: "Career Twearkz Inc.",
    location: "Lahore, Pakistan",
    period: "Jul 2024 — Feb 2025",
    start: "2024-07",
    end: "2025-02",
    focus:
      "Large-scale interfaces and analytical dashboards for AI startups and enterprise clients.",
    highlights: [
      "Developed highly interactive, large-scale frontend applications for AI startups and enterprise clients.",
      "Designed complex analytical dashboards supporting business intelligence, data visualisation and executive decision-making.",
      "Automated internal data workflows, significantly improving system reliability and operational efficiency across organisational data platforms.",
    ],
    stack: ["React", "Next.js", "TypeScript", "Data Visualisation", "Dashboards"],
  },
  {
    id: "excelo",
    title: "WordPress Developer & Automation Engineer",
    company: "Excelo Web Solutions",
    location: "Remote",
    period: "Jan 2023 — Mar 2024",
    start: "2023-01",
    end: "2024-03",
    focus:
      "E-commerce delivery for US-based clients, plus the Python automation that kept them running.",
    highlights: [
      "Developed customised e-commerce platforms and online stores for US-based clients in a fully remote capacity.",
      "Authored Python scripts to automate routine business processes, saving substantial manual hours.",
      "Engineered web scraping tools to extract and process research and marketing data, driving strategic business improvements.",
    ],
    stack: ["WordPress", "WooCommerce", "Python", "Web Scraping", "Automation"],
  },
];
