import { profile, roles, skillGroups, systems } from "@/content";

export type LineTone = "default" | "muted" | "accent" | "error" | "prompt";

export interface TerminalLine {
  id: string;
  text: string;
  tone: LineTone;
}

/** Side effects a command can ask the host component to perform. */
export interface TerminalContext {
  goto: (sectionId: string) => void;
  toggleTheme: () => void;
  downloadResume: () => void;
  clear: () => void;
}

interface CommandSpec {
  name: string;
  usage: string;
  description: string;
  run: (args: string[], context: TerminalContext) => string[] | void;
}

let lineCounter = 0;
export function makeLine(text: string, tone: LineTone = "default"): TerminalLine {
  lineCounter += 1;
  return { id: `line-${lineCounter}`, text, tone };
}

const commandList: CommandSpec[] = [
  {
    name: "help",
    usage: "help",
    description: "List every available command",
    run: () => [
      "Available commands:",
      "",
      ...commandList.map(
        (command) => `  ${command.usage.padEnd(20)}${command.description}`,
      ),
      "",
      "Tip: press Tab to autocomplete, ↑ / ↓ to replay history.",
    ],
  },
  {
    name: "whoami",
    usage: "whoami",
    description: "Identity, role and location",
    run: () => [
      profile.name,
      `${profile.role} · ${profile.experienceYears} years of experience`,
      profile.location,
      profile.availability,
    ],
  },
  {
    name: "about",
    usage: "about",
    description: "The short version of what I build",
    run: () => [profile.tagline, "", ...profile.summary],
  },
  {
    name: "skills",
    usage: "skills [group]",
    description: "Browse the stack, optionally by group",
    run: (args) => {
      const query = args[0]?.toLowerCase();

      if (!query) {
        return [
          "Skill groups — run `skills <group>` for the full list:",
          "",
          ...skillGroups.map(
            (group) => `  ${group.id.padEnd(12)}${group.label} (${group.skills.length})`,
          ),
        ];
      }

      const group = skillGroups.find(
        (candidate) =>
          candidate.id === query || candidate.label.toLowerCase().includes(query),
      );

      if (!group) return [`skills: no group matching "${args[0]}"`];
      return [`${group.label} — ${group.summary}`, "", `  ${group.skills.join(" · ")}`];
    },
  },
  {
    name: "experience",
    usage: "experience",
    description: "Career timeline, newest first",
    run: () =>
      roles.flatMap((role) => [
        `${role.period}`,
        `  ${role.title} — ${role.company}`,
        `  ${role.focus}`,
        "",
      ]),
  },
  {
    name: "systems",
    usage: "systems",
    description: "Flagship AI systems and their impact",
    run: () =>
      systems.flatMap((system) => [
        `${system.title} — ${system.impact}`,
        `  ${system.pipeline.join("  →  ")}`,
        "",
      ]),
  },
  {
    name: "contact",
    usage: "contact",
    description: "How to reach me",
    run: () => [
      `email   ${profile.email}`,
      `phone   ${profile.phone}`,
      `place   ${profile.location}`,
      "",
      "Or run `goto contact` to jump to the form.",
    ],
  },
  {
    name: "resume",
    usage: "resume",
    description: "Download the PDF résumé",
    run: (_args, context) => {
      context.downloadResume();
      return ["Opening résumé…"];
    },
  },
  {
    name: "goto",
    usage: "goto <section>",
    description: "Scroll to about | skills | experience | systems | contact",
    run: (args, context) => {
      const target = args[0]?.toLowerCase();
      const sections = ["about", "skills", "experience", "systems", "contact"];
      if (!target || !sections.includes(target)) {
        return [`goto: expected one of ${sections.join(", ")}`];
      }
      context.goto(target);
      return [`Navigating to #${target}…`];
    },
  },
  {
    name: "theme",
    usage: "theme",
    description: "Toggle between dark and light",
    run: (_args, context) => {
      context.toggleTheme();
      return ["Theme toggled."];
    },
  },
  {
    name: "clear",
    usage: "clear",
    description: "Clear the terminal",
    run: (_args, context) => {
      context.clear();
    },
  },
];

export const commandNames = commandList.map((command) => command.name);

/** Longest common prefix completion for the Tab key. */
export function completeCommand(input: string): string {
  const matches = commandNames.filter((name) => name.startsWith(input));
  if (matches.length === 0) return input;
  if (matches.length === 1) return matches[0];

  let prefix = matches[0];
  for (const match of matches) {
    while (!match.startsWith(prefix)) prefix = prefix.slice(0, -1);
  }
  return prefix;
}

/**
 * Execute a raw input string. Returns the lines to append; commands with side
 * effects (clear, theme, navigation) call back into `context`.
 */
export function runCommand(
  input: string,
  context: TerminalContext,
): TerminalLine[] {
  const trimmed = input.trim();
  if (!trimmed) return [];

  const [name, ...args] = trimmed.split(/\s+/);
  const command = commandList.find((candidate) => candidate.name === name.toLowerCase());

  if (!command) {
    // A couple of friendly nudges for commands people reflexively try.
    if (name === "ls") {
      return [makeLine("about  skills  experience  systems  contact  resume", "muted")];
    }
    if (name === "sudo") {
      return [makeLine("Nice try. You already have full access. 🙂", "accent")];
    }
    return [
      makeLine(`command not found: ${name}`, "error"),
      makeLine("Type `help` to see what's available.", "muted"),
    ];
  }

  const output = command.run(args, context);
  return (output ?? []).map((text) => makeLine(text));
}

export const WELCOME_LINES: TerminalLine[] = [
  makeLine(`${profile.name} — interactive shell`, "accent"),
  makeLine(""),
  makeLine(`  role     ${profile.role}`),
  makeLine("  focus    RAG · agentic systems · LLM infrastructure"),
  makeLine(`  since    2023 · ${profile.experienceYears} years shipping production software`),
  makeLine(`  based    ${profile.location}`),
  makeLine(""),
  makeLine("Type `help` for the full command list, or tap one below.", "muted"),
];
