"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

import { useMediaQuery } from "@/lib/hooks/use-media-query";

/**
 * Soft accent spotlight that trails the cursor.
 * Rendered only for fine pointers with motion enabled.
 */
export function CursorGlow() {
  const isFinePointer = useMediaQuery("(pointer: fine)");
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const springX = useSpring(x, { stiffness: 120, damping: 22, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 120, damping: 22, mass: 0.6 });

  const enabled = isFinePointer && !reduceMotion;

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }}
      className="pointer-events-none fixed top-0 left-0 z-0 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500"
    >
      <div className="size-[420px] rounded-full bg-[radial-gradient(circle,var(--glow),transparent_65%)] blur-2xl" />
    </motion.div>
  );
}
