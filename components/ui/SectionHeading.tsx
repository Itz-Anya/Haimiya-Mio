"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE, Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

interface SplitWordsProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
}

export function SplitWords({ text, className, wordClassName, delay = 0 }: SplitWordsProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return (
      <span className={className}>
        <span className={wordClassName}>{text}</span>
      </span>
    );
  }

  return (
    <>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        className={cn("inline", className)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: delay } } }}
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[.18em] align-bottom">
            <motion.span
              className={cn("inline-block", wordClassName)}
              variants={{ hidden: { y: "115%", rotate: 5 }, show: { y: "0%", rotate: 0 } }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </>
  );
}

interface SectionHeadingProps {
  id: string;
  label: string;
  title: string;
  no?: string;
  sub?: string;
  script?: string;
  center?: boolean;
}

export function SectionHeading({ id, label, title, no, sub, script, center = true }: SectionHeadingProps) {
  return (
    <div className={cn("mb-10 md:mb-14", center && "text-center")}>
      <Reveal variant="down">
        <span className="tag tag-sm mb-4 font-mono uppercase tracking-widest">
          {no ? `${no} / ${label}` : label}
        </span>
      </Reveal>
      {script && (
        <Reveal variant="blur" delay={0.1}>
          <p aria-hidden className="font-hand -mb-1 text-3xl text-primary md:text-4xl">
            {script}
          </p>
        </Reveal>
      )}
      <h2 id={id} className="text-3xl leading-tight md:text-5xl">
        <SplitWords text={title} wordClassName="text-gradient" />
      </h2>
      {sub && (
        <Reveal
          delay={0.2}
          className={cn("mt-4 max-w-xl text-sm text-muted-foreground md:text-base", center && "mx-auto")}
        >
          <p>{sub}</p>
        </Reveal>
      )}
    </div>
  );
}
