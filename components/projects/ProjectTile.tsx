"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ExternalLink, Github, Star } from "lucide-react";
import { Img } from "@/components/ui/Img";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

interface Props {
  project: Project;
  index: number;
  className?: string;
  ref?: React.Ref<HTMLElement>;
}

export function ProjectTile({ project, index, className, ref }: Props) {
  const reduce = useReducedMotion();
  const href = project.liveUrl ?? project.repoUrl;
  const [ratio, setRatio] = useState(16 / 10);

  return (
    <motion.article
      ref={ref}
      layout={!reduce}
      initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
      exit={reduce ? undefined : { opacity: 0, scale: 0.92 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, delay: Math.min(index, 5) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-border/60 bg-card/80 shadow-card backdrop-blur-sm",
        "transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-hover",
        className,
      )}
    >
      <div className="relative m-2.5 overflow-hidden rounded-3xl bg-muted/50" style={{ aspectRatio: ratio }}>
        {project.image ? (
          <Img
            src={project.image}
            alt={`${project.title} preview`}
            sizes="(min-width:1024px) 380px, (min-width:640px) 45vw, 92vw"
            onLoad={(e) => {
              const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
              if (w && h) setRatio(Math.min(2.2, Math.max(0.9, w / h)));
            }}
            className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div
            className={`h-full w-full bg-linear-to-br ${project.color ?? "from-primary/30 to-accent/30"}`}
          />
        )}
        <span className="absolute left-3 top-3 z-10 rounded-full border border-white/40 bg-black/30 px-2.5 py-0.5 font-mono text-[11px] font-semibold tracking-widest text-white backdrop-blur-md">
          {String(index + 1).padStart(2, "0")}
        </span>
        {project.featured && (
          <span
            className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold text-primary-foreground shadow-cute"
            style={{ background: "var(--gradient-button)" }}
          >
            <Star aria-hidden className="size-3 fill-current" />
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-2">
        <div className="flex items-start justify-between gap-3">
          <h3 className="break-words text-lg md:text-xl">{project.title}</h3>
          {href && (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} (opens in new tab)`}
              className="grid size-9 shrink-0 place-items-center rounded-full border border-border bg-card text-primary transition-all duration-300 group-hover:rotate-45 group-hover:border-transparent group-hover:text-primary-foreground group-hover:[background:var(--gradient-button)]"
            >
              <ArrowUpRight aria-hidden className="size-4" />
            </a>
          )}
        </div>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li key={tag} className="chip">
              {tag}
            </li>
          ))}
        </ul>
        {(project.liveUrl || project.repoUrl) && (
          <div className="mt-5 flex flex-wrap gap-2.5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cute-button min-h-10 px-5 py-2 text-sm"
              >
                <ExternalLink aria-hidden className="size-4" />
                Live
                <span className="sr-only"> demo of {project.title} (opens in new tab)</span>
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ghost-button min-h-10 px-5 py-2 text-sm"
              >
                <Github aria-hidden className="size-4" />
                Code
                <span className="sr-only"> for {project.title} (opens in new tab)</span>
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}
