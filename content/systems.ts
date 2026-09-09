import type { SystemHighlight } from "@/types/content";

/**
 * Every entry here is one specific engineering decision from one real,
 * shipped project — not an abstract industry pattern. `relatedProjectId`
 * points at the `Project` it comes from; the icon is deliberately the same
 * as that project's, so the two read as one story told at two zoom levels.
 */
export const systems: SystemHighlight[] = [
  {
    id: "trust-through-duplication",
    title: "Trust Through Duplication",
    tagline: "A stochastic engine, checked against exact math, every single run",
    icon: "sparkles",
    impact: "5,000 runs, <1% deviation",
    description:
      "Rather than trust one stochastic simulator, Zygotrix runs two independent engines side by side — a Monte Carlo engine that mirrors real biological randomness, and a deterministic engine that computes the exact probability distribution, like an automated Punnett square. Validating one against the other, thousands of times, is how you ship a random system with proof instead of hope.",
    pipeline: ["Model genotypes", "Run stochastic engine", "Run deterministic engine", "Cross-validate", "Ship with proof"],
    stack: ["C++", "Mersenne Twister", "Probability theory", "TypeScript"],
    relatedProjectId: "zygotrix",
  },
  {
    id: "auditable-ai-decisions",
    title: "Auditable AI, Not a Black Box",
    tagline: "An LLM scores the case; a fixed formula makes the call",
    icon: "network",
    impact: "40/40/20 weighted, auditable",
    description:
      "Insurance underwriting can't be a black box, so the LangGraph pipeline keeps scoring and deciding separate. Medical and financial models each contribute 40%, a Memgraph fraud-ring graph query contributes 20%, and a fixed formula — not a second LLM call — turns those three signals into an auto-approve, decline, or human-review outcome anyone can audit after the fact.",
    pipeline: ["Validate proposal", "Score medical + financial", "Graph fraud check", "Weighted aggregate", "Route decision"],
    stack: ["LangGraph", "Gemini 2.5 Flash", "Memgraph", "Kafka"],
    relatedProjectId: "insurance-ai",
  },
  {
    id: "language-discipline",
    title: "Language Discipline",
    tagline: "Detects the question's language first, then answers in only that one",
    icon: "shield",
    impact: "3 languages, never mixed",
    description:
      "Most multilingual assistants blend languages mid-sentence — for a legal assistant, that reads as unreliable. CourtCierge's RAG pipeline detects whether a question came in English, Urdu script, or Roman Urdu before it retrieves anything, then answers strictly in that same register, grounded in Pakistani law. A small constraint, deliberately enforced, because trust in a legal answer starts with not sounding confused.",
    pipeline: ["Detect language", "Retrieve (Pinecone)", "Ground in Pakistani law", "Generate in-language", "Never mix"],
    stack: ["LangChain", "Pinecone", "OpenAI API", "Node.js"],
    relatedProjectId: "courtcierge",
  },
  {
    id: "agents-on-real-infrastructure",
    title: "Agents on Real Infrastructure",
    tagline: "A LangGraph agent that issues live commands to a running 5G core",
    icon: "gauge",
    impact: "Closed loop, not a chatbot",
    description:
      "It's easy to build an agent that talks about infrastructure. This one changes it — reading live per-slice throughput and packet-loss metrics from Kinetica, then issuing real bandwidth-reallocation commands to FlexRIC against an actual OAI 5G core and RAN. The hard engineering problem isn't the LLM call; it's closing the loop safely against something that can't be undone with a git revert.",
    pipeline: ["Stream metrics (Kinetica)", "Agent reasons (LangGraph)", "Command FlexRIC", "Reallocate bandwidth", "Observe (Grafana)"],
    stack: ["LangGraph", "Kinetica", "FlexRIC", "OAI 5G Core/RAN"],
    relatedProjectId: "5g-ai-network-lab",
  },
];
