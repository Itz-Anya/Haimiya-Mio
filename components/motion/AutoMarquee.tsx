"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  scrollBoost?: number;
  pauseOnHover?: boolean;
  className?: string;
  groupClassName?: string;
}

export function AutoMarquee({
  children,
  speed = 60,
  reverse = false,
  scrollBoost = 0.35,
  pauseOnHover = false,
  className,
  groupClassName,
}: Props) {
  const x = useMotionValue(0);
  const outer = useRef<HTMLDivElement>(null);
  const group = useRef<HTMLDivElement>(null);
  const groupWidth = useRef(0);
  const visible = useRef(true);
  const hovered = useRef(false);
  const lastY = useRef(0);
  const velocity = useRef(0);
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const groupEl = group.current;
    const outerEl = outer.current;
    if (!groupEl || !outerEl) return;

    const measure = () => {
      groupWidth.current = groupEl.offsetWidth;
      setReady(groupWidth.current > 0);
    };
    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(groupEl);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
      },
      { rootMargin: "200px" },
    );
    intersectionObserver.observe(outerEl);

    lastY.current = window.scrollY;

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  useAnimationFrame((_, delta) => {
    const width = groupWidth.current;
    const dt = Math.min(delta, 50) / 1000;
    const y = window.scrollY;
    const dy = y - lastY.current;
    lastY.current = y;
    if (!width || !visible.current || dt <= 0) return;

    velocity.current += (Math.min(Math.abs(dy) / dt, 3000) - velocity.current) * 0.12;

    const direction = reverse ? 1 : -1;
    let move = reduce ? speed * 0.5 * dt : speed * dt;
    if (!reduce) move += velocity.current * dt * scrollBoost;
    if (pauseOnHover && hovered.current) move = 0;

    let next = x.get() + direction * move;
    if (next <= -width) next += width;
    else if (next > 0) next -= width;
    x.set(next);
  });

  return (
    <div
      ref={outer}
      className={cn("overflow-hidden", className)}
      onPointerEnter={() => {
        hovered.current = true;
      }}
      onPointerLeave={() => {
        hovered.current = false;
      }}
    >
      <motion.div style={{ x, opacity: ready ? 1 : 0 }} className="flex w-max will-change-transform">
        <div ref={group} className={cn("flex shrink-0 items-center", groupClassName)}>
          {children}
        </div>
        <div aria-hidden inert className={cn("flex shrink-0 items-center", groupClassName)}>
          {children}
        </div>
        <div aria-hidden inert className={cn("flex shrink-0 items-center", groupClassName)}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
