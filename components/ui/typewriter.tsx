"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

interface TypewriterProps {
  words: readonly string[];
  className?: string;
  typeMs?: number;
  deleteMs?: number;
  holdMs?: number;
  /** Pause between finishing a word and starting the next one. */
  switchMs?: number;
}

/**
 * Cycles through `words`, typing and deleting one character at a time.
 * Reduced-motion users get the first word, statically.
 */
export function Typewriter({
  words,
  className,
  typeMs = 65,
  deleteMs = 30,
  holdMs = 1800,
  switchMs = 320,
}: TypewriterProps) {
  const reduceMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;

    const word = words[wordIndex % words.length];
    const atFullWord = !deleting && text === word;
    const atEmpty = deleting && text === "";

    const delay = atFullWord ? holdMs : atEmpty ? switchMs : deleting ? deleteMs : typeMs;

    // Every state change happens in the timer callback, never in the effect
    // body, so a render never immediately schedules another.
    const timer = setTimeout(() => {
      if (atFullWord) {
        setDeleting(true);
        return;
      }
      if (atEmpty) {
        setDeleting(false);
        setWordIndex((index) => (index + 1) % words.length);
        return;
      }
      setText((current) =>
        deleting ? word.slice(0, current.length - 1) : word.slice(0, current.length + 1),
      );
    }, delay);

    return () => clearTimeout(timer);
  }, [deleting, deleteMs, holdMs, reduceMotion, switchMs, text, typeMs, wordIndex, words]);

  if (reduceMotion) {
    return <span className={className}>{words[0]}</span>;
  }

  return (
    <span className={cn("inline-flex items-baseline", className)}>
      {/* Announce the full list once instead of on every keystroke. */}
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden>{text}</span>
      <span
        aria-hidden
        className="animate-blink ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[0.05em] bg-accent"
      />
    </span>
  );
}
