import type { OpenSourceEntry } from "@/types/content";

/**
 * Published packages and applied labs — things that either left this machine
 * onto a public registry, or ran against real infrastructure. Newest first.
 */
export const openSourceEntries: OpenSourceEntry[] = [
  {
    id: "pinion",
    title: "Pinion",
    tagline: "Job queue & worker system for Python",
    icon: "workflow",
    status: "Published on PyPI",
    description:
      "A lightweight, extensible job queue and worker system — in-memory for quick prototyping, SQLite-backed for cross-process durability, with the production concerns (retries, dead-letter queue, metrics) built in from the start rather than bolted on.",
    highlights: [
      "Pluggable Storage protocol — ships with in-memory and SQLite (WAL-mode, atomic job claiming) backends",
      "Exponential backoff retries with jitter, and automatic dead-letter routing once retries are exhausted",
      "Decorator-based @task registry, plus a `pinion worker` CLI reporting live processed/succeeded/failed/retried metrics",
    ],
    stack: ["Python 3.12", "SQLite", "Threading", "Pytest", "MkDocs"],
    install: "pip install pinion-queue",
    version: "v0.2.7",
    links: [
      { label: "PyPI", href: "https://pypi.org/project/pinion-queue/" },
      { label: "Documentation", href: "https://nouman64-cat.github.io/Pinion/" },
      { label: "View on GitHub", href: "https://github.com/Nouman64-cat/Pinion" },
    ],
  },
  {
    id: "react-voice-action-router",
    title: "react-voice-action-router",
    tagline: "Headless voice-control library for React",
    icon: "network",
    status: "Published on npm",
    description:
      "A headless voice-action router for React: built-in speech recognition plus AI-powered intent routing and a dictation mode, so a hands-free interface doesn't need a bespoke speech pipeline behind it.",
    highlights: [
      "Context-aware routing — the AI only ever sees the current screen's registered commands, not the whole app",
      "Universal LLM adapter support (OpenAI, Anthropic, Gemini, Ollama or a custom backend), with direct phrase-matching tried first for latency",
      "Auto-healing microphone session and an offline fallback, so core commands keep working without the AI layer",
    ],
    stack: ["React", "TypeScript", "tsup", "Web Speech API"],
    install: "npm install react-voice-action-router",
    version: "v1.3.2",
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/react-voice-action-router" },
      {
        label: "View on GitHub",
        href: "https://github.com/Nouman64-cat/react-voice-action-router",
      },
    ],
  },
  {
    id: "5g-ai-network-lab",
    title: "5G AI Network Lab",
    tagline: "Applied lab: agentic bandwidth management on a live 5G core",
    icon: "gauge",
    status: "Hands-on lab",
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
