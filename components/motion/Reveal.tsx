"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export type RevealVariant = "up" | "down" | "left" | "right" | "scale" | "blur" | "pop" | "flip";

export const variants: Record<RevealVariant, Variants> = {
  up: { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -36 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -48 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 48 }, show: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.88 }, show: { opacity: 1, scale: 1 } },
  blur: {
    hidden: { opacity: 0, y: 20, filter: "blur(14px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  pop: {
    hidden: { opacity: 0, scale: 0.55, rotate: -10 },
    show: { opacity: 1, scale: 1, rotate: 0 },
  },
  flip: {
    hidden: { opacity: 0, rotateX: -60, y: 24, transformPerspective: 800 },
    show: { opacity: 1, rotateX: 0, y: 0, transformPerspective: 800 },
  },
};

const VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
}

export function Reveal({ children, className, variant = "up", delay = 0, duration = 0.8 }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={variants[variant]}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Enter({ children, className, variant = "up", delay = 0, duration = 0.9 }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={variants[variant]}
      initial="hidden"
      animate="show"
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  gap = 0.08,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  );
}

export function Item({
  children,
  className,
  variant = "up",
  duration = 0.7,
}: Omit<RevealProps, "delay">) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} variants={variants[variant]} transition={{ duration, ease: EASE }}>
      {children}
    </motion.div>
  );
}

export const itemMotion = (variant: RevealVariant = "up", duration = 0.7) => ({
  variants: variants[variant],
  transition: { duration, ease: EASE },
});

export const staggerProps = (gap = 0.08, delay = 0) => ({
  initial: "hidden" as const,
  whileInView: "show" as const,
  viewport: VIEWPORT,
  variants: {
    hidden: {},
    show: { transition: { staggerChildren: gap, delayChildren: delay } },
  } as Variants,
});
