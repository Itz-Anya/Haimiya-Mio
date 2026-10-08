"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { SearchX } from "lucide-react";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import { ProjectTile } from "./ProjectTile";

function filterProjects(tag: string) {
  if (tag === "All") return projects;
  if (tag === "Featured") return projects.filter((p) => p.featured);
  return projects.filter((p) => p.tags.includes(tag));
}

export function ProjectsExplorer() {
  const [active, setActive] = useState("All");

  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    projects.forEach((p) => p.tags.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)));
    const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([tag]) => tag);
    return ["All", "Featured", ...sorted];
  }, []);

  const shown = useMemo(() => filterProjects(active), [active]);

  return (
    <LayoutGroup>
      <div
        role="tablist"
        aria-label="Filter projects"
        className="no-scrollbar -mx-4 mb-10 flex gap-2 overflow-x-auto px-4 pb-2 md:flex-wrap md:justify-center md:overflow-visible"
      >
        {tags.map((tag) => {
          const on = tag === active;
          return (
            <button
              key={tag}
              role="tab"
              aria-selected={on}
              type="button"
              onClick={() => setActive(tag)}
              className={cn(
                "relative shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-300",
                on
                  ? "border-transparent text-primary-foreground"
                  : "border-border/70 bg-card/70 text-foreground/80 hover:border-primary/50 hover:text-foreground",
              )}
            >
              {on && (
                <motion.span
                  layoutId="projFilter"
                  className="absolute inset-0 -z-0 rounded-full shadow-cute"
                  style={{ background: "var(--gradient-button)" }}
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                />
              )}
              <span className="relative z-10">
                {tag}
                {tag === "All" ? ` · ${projects.length}` : ""}
              </span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((project, i) => (
            <ProjectTile key={project.title} project={project} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {shown.length === 0 && (
        <p className="mt-10 flex items-center justify-center gap-2 text-muted-foreground">
          <SearchX aria-hidden className="size-5" />
          Nothing here yet.
        </p>
      )}
    </LayoutGroup>
  );
}
