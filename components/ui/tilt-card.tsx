"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { cn } from "@/lib/utils";

interface TiltCardProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  /** Maximum rotation on each axis, in degrees. */
  maxTilt?: number;
}

/**
 * A card that tilts in 3D toward the pointer and renders a spotlight that
 * tracks the cursor. Degrades to a static card without a fine pointer.
 */
export function TiltCard({
  children,
  className,
  maxTilt = 7,
  ...props
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const isFinePointer = useMediaQuery("(pointer: fine)");
  const enabled = isFinePointer && !reduceMotion;

  const [hovered, setHovered] = useState(false);

  const rotateX = useSpring(useMotionValue(0), { stiffness: 220, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 220, damping: 20 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glow = useMotionTemplate`radial-gradient(340px circle at ${glowX}% ${glowY}%, var(--glow), transparent 70%)`;

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    rotateY.set((px - 0.5) * maxTilt * 2);
    rotateX.set((0.5 - py) * maxTilt * 2);
    glowX.set(px * 100);
    glowY.set(py * 100);
  }

  function handleLeave() {
    setHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      style={
        enabled
          ? { rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }
          : undefined
      }
      className={cn(
        "group relative overflow-hidden rounded-2xl transition-colors duration-300",
        "glass hover:border-border-strong",
        className,
      )}
      {...(props as React.ComponentProps<typeof motion.div>)}
    >
      {enabled ? (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{ background: glow, opacity: hovered ? 1 : 0 }}
        />
      ) : null}
      <div className="relative">{children}</div>
    </motion.div>
  );
}
