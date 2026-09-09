import type { SystemHighlight } from "@/types/content";

export const systems: SystemHighlight[] = [
  {
    id: "enterprise-rag",
    title: "Enterprise RAG",
    tagline: "One retrieval layer over every source of truth",
    icon: "network",
    impact: "70% faster retrieval",
    description:
      "A large-scale Retrieval-Augmented Generation system integrating diverse documents, external APIs and structured data — cutting knowledge retrieval time by 70% while drastically improving response quality.",
    pipeline: ["Ingest", "Chunk & Embed", "Hybrid Retrieve", "Re-rank", "Ground & Generate"],
    stack: ["Pinecone", "Qdrant", "LlamaIndex", "PostgreSQL", "OpenAI API"],
  },
  {
    id: "multi-agent",
    title: "Multi-Agent AI",
    tagline: "Autonomous planning with a human in the loop",
    icon: "workflow",
    impact: "End-to-end automation",
    description:
      "An advanced agentic system capable of autonomous planning, complex reasoning and tool execution, with human-in-the-loop validation to keep enterprise automation safe and reliable.",
    pipeline: ["Plan", "Route to Agent", "Execute Tools", "Human Review", "Commit"],
    stack: ["LangGraph", "AutoGen", "CrewAI", "MCP", "Agent2Agent"],
  },
  {
    id: "realtime-fraud",
    title: "Real-Time Fraud",
    tagline: "Streaming inference for mission-critical security",
    icon: "shield",
    impact: "Sub-second latency",
    description:
      "A high-throughput streaming pipeline built on Kafka and Spark, achieving sub-second inference latency for mission-critical security workloads.",
    pipeline: ["Event Stream", "Feature Store", "Score", "Decision", "Feedback Loop"],
    stack: ["Kafka", "Spark", "Redis", "scikit-learn", "Feature Store"],
  },
  {
    id: "llm-optimisation",
    title: "LLM Optimisation",
    tagline: "Maximum throughput, minimum spend",
    icon: "gauge",
    impact: "Millions of daily requests",
    description:
      "Sophisticated batching, semantic caching and intelligent routing strategies that hold high-scale performance steady while aggressively minimising compute costs.",
    pipeline: ["Batch", "Semantic Cache", "Cost-Aware Route", "Distributed Serve", "Evaluate"],
    stack: ["vLLM-style serving", "Redis", "Model Router", "MLflow", "A/B Testing"],
  },
];
