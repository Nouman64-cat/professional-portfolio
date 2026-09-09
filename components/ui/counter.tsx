"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

interface CounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
}

/**
 * Counts up to `value` the first time it scrolls into view.
 *
 * The final value is rendered server-side (so it is present without JS and
 * for crawlers); the animation writes directly to the DOM node, keeping the
 * per-frame updates out of React's render cycle.
 */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  durationMs = 1400,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = numberRef.current;
    if (!node || reduceMotion) return;

    // Start from zero as soon as the client takes over.
    if (!inView) {
      node.textContent = "0";
      return;
    }

    const controls = animate(0, value, {
      duration: durationMs / 1000,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = Math.round(latest).toLocaleString();
      },
    });

    return () => controls.stop();
  }, [durationMs, inView, reduceMotion, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      <span ref={numberRef}>{value.toLocaleString()}</span>
      {suffix}
    </span>
  );
}
