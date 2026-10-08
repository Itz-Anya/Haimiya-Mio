"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { AutoMarquee } from "./AutoMarquee";

export function Parallax({
  children,
  className,
  range = 40,
  rotate = 0,
}: {
  children: ReactNode;
  className?: string;
  range?: number;
  rotate?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);
  const r = useTransform(scrollYProgress, [0, 1], [-rotate, rotate]);

  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { y, rotate: r }}>
      {children}
    </motion.div>
  );
}

export function ScrollText({
  text,
  className,
  speed = 55,
  reverse = false,
}: {
  text: string;
  className?: string;
  speed?: number;
  reverse?: boolean;
}) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-6 md:top-12">
      <AutoMarquee speed={speed} reverse={reverse} scrollBoost={0.3} groupClassName="pr-[6vw]">
        <span className={className}>{text}</span>
      </AutoMarquee>
    </div>
  );
}

export function ScrollScale({
  children,
  className,
  from = 0.93,
}: {
  children: ReactNode;
  className?: string;
  from?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.55"] });
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [from, 1]), {
    stiffness: 110,
    damping: 26,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduce ? undefined : { scale, transformOrigin: "50% 100%" }}
    >
      {children}
    </motion.div>
  );
}
