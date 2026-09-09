"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Terminal as TerminalIcon } from "lucide-react";

import { profile } from "@/content";
import {
  completeCommand,
  commandNames,
  makeLine,
  runCommand,
  WELCOME_LINES,
  type TerminalContext,
  type TerminalLine,
} from "@/lib/terminal";
import { useTheme } from "@/components/providers/theme-provider";
import { scrollToSection, cn } from "@/lib/utils";

const toneClass = {
  default: "text-fg/85",
  muted: "text-subtle",
  accent: "text-accent",
  error: "text-rose-400",
  prompt: "text-fg",
} as const;

const QUICK_COMMANDS = ["whoami", "skills", "experience", "pricing", "book"];

/**
 * A real, keyboard-driven shell over the portfolio's content.
 *
 * Commands live in `lib/terminal.ts`; this component only handles input,
 * history, completion and rendering.
 */
export function Terminal({ className }: { className?: string }) {
  const { toggleTheme } = useTheme();
  const [lines, setLines] = useState<TerminalLine[]>(WELCOME_LINES);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Follow new output, but leave the banner readable from the top on load.
  const pinnedToBottom = useRef(false);
  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;
    if (!pinnedToBottom.current) {
      pinnedToBottom.current = true;
      return;
    }
    node.scrollTop = node.scrollHeight;
  }, [lines]);

  const submit = useCallback(
    (raw: string) => {
      const value = raw.trim();
      if (!value) return;

      let cleared = false;
      const context: TerminalContext = {
        goto: scrollToSection,
        toggleTheme,
        downloadResume: () => window.open(profile.resumePath, "_blank", "noopener"),
        bookCall: () => window.open(profile.calendlyUrl, "_blank", "noopener"),
        clear: () => {
          cleared = true;
        },
      };

      const output = runCommand(value, context);

      setLines((previous) =>
        cleared ? [] : [...previous, makeLine(value, "prompt"), ...output],
      );
      setHistory((previous) => [value, ...previous].slice(0, 50));
      setHistoryIndex(-1);
      setInput("");
    },
    [toggleTheme],
  );

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      submit(input);
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      setInput((current) => completeCommand(current.trimStart()));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.length === 0) return;
      const next = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(next);
      setInput(history[next]);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = historyIndex - 1;
      if (next < 0) {
        setHistoryIndex(-1);
        setInput("");
        return;
      }
      setHistoryIndex(next);
      setInput(history[next]);
    }
  }

  const suggestion =
    input.trim().length > 0
      ? commandNames.find((name) => name.startsWith(input.trim()) && name !== input.trim())
      : undefined;

  return (
    <div
      className={cn(
        "glass overflow-hidden rounded-2xl font-mono text-[13px] leading-relaxed",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-rose-400/70" />
          <span className="size-2.5 rounded-full bg-amber-400/70" />
          <span className="size-2.5 rounded-full bg-emerald-400/70" />
        </span>
        <span className="ml-2 flex items-center gap-2 text-xs text-subtle">
          <TerminalIcon className="size-3.5" aria-hidden />
          nouman@portfolio — zsh
        </span>
      </div>

      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        className="h-64 overflow-y-auto px-4 py-3 sm:h-72"
      >
        <div aria-live="polite" aria-atomic="false">
          {lines.map((line) => (
            <p key={line.id} className={cn("break-words whitespace-pre-wrap", toneClass[line.tone])}>
              {line.tone === "prompt" ? (
                <span className="text-accent">➜ </span>
              ) : null}
              {line.text || " "}
            </p>
          ))}
        </div>

        <div className="mt-1 flex items-center gap-2">
          <label htmlFor="terminal-input" className="text-accent select-none">
            ➜
          </label>
          <div className="relative flex-1">
            <input
              id="terminal-input"
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              aria-label="Terminal input — type help to list commands"
              className="w-full bg-transparent text-fg caret-accent outline-none"
            />
            {suggestion ? (
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 flex items-center text-subtle/60"
              >
                <span className="invisible">{input}</span>
                <span>{suggestion.slice(input.trim().length)}</span>
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-border bg-surface px-4 py-3">
        {QUICK_COMMANDS.map((command) => (
          <button
            key={command}
            type="button"
            onClick={() => {
              submit(command);
              inputRef.current?.focus();
            }}
            className="rounded-full border border-border px-3 py-1 text-[11px] text-muted transition-colors hover:border-accent/60 hover:text-accent"
          >
            {command}
          </button>
        ))}
      </div>
    </div>
  );
}
