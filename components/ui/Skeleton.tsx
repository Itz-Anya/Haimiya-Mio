"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { EASE, variants as revealVariants, type RevealVariant } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export function Bone({ className, style }: { className?: string; style?: CSSProperties }) {
  return <div aria-hidden className={cn("skeleton-shimmer rounded-full", className)} style={style} />;
}

export type SkeletonShape = "text" | "media" | "tiles" | "card" | "hero" | "gallery" | "footer";

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

export function SkeletonShapeView({ shape = "text" }: { shape?: SkeletonShape }) {
  switch (shape) {
    case "tiles":
      return (
        <div className="flex h-full flex-col gap-5 p-5 md:p-6">
          <div className="flex items-center gap-3">
            <Bone className="size-10 rounded-xl!" />
            <div className="flex-1 space-y-2">
              <Bone className="h-4 w-1/3" />
              <Bone className="h-3 w-2/3" />
            </div>
          </div>
          <div className="grid flex-1 grid-cols-3 gap-3 lg:grid-cols-4">
            {range(8).map((i) => (
              <Bone key={i} className="min-h-20 rounded-2xl!" />
            ))}
          </div>
        </div>
      );

    case "media":
      return (
        <div className="flex h-full flex-col gap-3 p-4">
          <Bone className="flex-1 rounded-2xl!" />
          <Bone className="h-4 w-1/2" />
        </div>
      );

    case "hero":
      return (
        <div className="grid h-full items-center gap-6 p-6 md:grid-cols-12 md:p-12">
          <div className="order-1 flex justify-center md:order-2 md:col-span-5">
            <Bone className="aspect-square w-40 max-w-full md:w-72" />
          </div>
          <div className="order-2 flex flex-col items-center gap-4 md:order-1 md:col-span-7 md:items-start">
            <Bone className="h-7 w-40" />
            <Bone className="h-6 w-28" />
            <Bone className="h-16 w-56 rounded-2xl! md:h-24 md:w-80" />
            <Bone className="h-4 w-3/4 max-w-xs" />
            <div className="flex gap-2">
              <Bone className="h-7 w-20" />
              <Bone className="h-7 w-24" />
              <Bone className="h-7 w-16" />
            </div>
            <div className="flex gap-3 pt-2">
              <Bone className="h-11 w-36" />
              <Bone className="h-11 w-40" />
            </div>
          </div>
        </div>
      );

    case "gallery":
      return (
        <div className="flex h-full flex-col justify-center gap-4 overflow-hidden py-3">
          {range(2).map((row) => (
            <div key={row} className="flex gap-4 px-4">
              {range(6).map((i) => (
                <Bone key={i} className="aspect-[4/5] w-52 shrink-0 rounded-3xl! sm:w-60" />
              ))}
            </div>
          ))}
        </div>
      );

    case "footer":
      return (
        <div className="flex h-full flex-col items-center gap-3 p-4">
          <Bone className="size-20 rounded-full!" />
          <Bone className="h-6 w-48" />
          <Bone className="h-4 w-64 max-w-full" />
          <Bone className="h-3 w-40" />
          <Bone className="mt-3 h-3 w-52" />
        </div>
      );

    case "card":
      return (
        <div className="flex h-full flex-col gap-3 p-2.5">
          <Bone className="h-48 rounded-2xl! md:h-52" />
          <div className="space-y-3 p-2.5">
            <Bone className="h-5 w-3/4" />
            <Bone className="h-3 w-full" />
            <Bone className="h-3 w-5/6" />
            <div className="flex gap-2 pt-2">
              <Bone className="h-6 w-16" />
              <Bone className="h-6 w-20" />
              <Bone className="h-6 w-14" />
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="flex h-full flex-col gap-4 p-6 md:p-9">
          <Bone className="h-6 w-2/3" />
          <div className="space-y-3">
            <Bone className="h-3.5 w-full" />
            <Bone className="h-3.5 w-11/12" />
            <Bone className="h-3.5 w-4/5" />
          </div>
          <div className="grid grid-cols-2 gap-3 pt-3 md:grid-cols-4">
            {range(4).map((i) => (
              <Bone key={i} className="h-20 rounded-2xl!" />
            ))}
          </div>
        </div>
      );
  }
}

export function SkeletonCard({ shape = "card", className }: { shape?: SkeletonShape; className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("overflow-hidden rounded-3xl border border-border/60 bg-card/60 shadow-card", className)}
    >
      <SkeletonShapeView shape={shape} />
    </div>
  );
}

interface SkeletonizeProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  shape?: SkeletonShape;
  variant?: RevealVariant;
  delay?: number;
  rounded?: string;
}

export function Skeletonize({
  children,
  className,
  contentClassName,
  shape = "text",
  variant = "up",
  delay = 0,
  rounded = "1.75rem",
}: SkeletonizeProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  const base = revealVariants[variant];
  const content: Variants = {
    hidden: base.hidden as never,
    show: {
      ...(base.show as object),
      transition: { duration: 0.9, delay: delay + 0.35, ease: EASE },
    } as never,
  };
  const overlay: Variants = {
    hidden: { opacity: 1 },
    show: { opacity: 0, transition: { duration: 0.7, delay: delay + 0.3, ease: "easeOut" } },
  };

  return (
    <motion.div
      className={cn("relative", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: {}, show: {} }}
    >
      <motion.div className={contentClassName} variants={content}>
        {children}
      </motion.div>
      <motion.div
        aria-hidden
        variants={overlay}
        style={{ borderRadius: rounded }}
        className="pointer-events-none absolute inset-0 z-20 overflow-hidden border border-border/40 bg-card"
      >
        <SkeletonShapeView shape={shape} />
      </motion.div>
    </motion.div>
  );
}
