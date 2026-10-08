"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectTile } from "@/components/projects/ProjectTile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { projects, type Project } from "@/data/projects";

const COUNT = 6;

function pickRandom(count: number): Project[] {
  const list = [...projects];
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list.slice(0, count);
}

export function FeaturedProjects() {
  const [picked, setPicked] = useState<Project[] | null>(null);

  useEffect(() => {
    setPicked(pickRandom(COUNT));
  }, []);

  return (
    <section id="projects" aria-labelledby="projects-h" className="relative px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="projects-h"
          no="04"
          label="Projects"
          script="made with love"
          title="Things I've built."
          sub={`Bots, apps and small experiments. Here are ${COUNT} picked at random from ${projects.length}, tap any card to open it.`}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {picked ? (
            <AnimatePresence mode="popLayout">
              {picked.map((project, i) => (
                <ProjectTile key={project.title} project={project} index={i} />
              ))}
            </AnimatePresence>
          ) : (
            Array.from({ length: COUNT }, (_, i) => (
              <div key={i} aria-hidden>
                <SkeletonCard shape="card" className="h-[26rem] rounded-[2rem]" />
              </div>
            ))
          )}
        </div>

        <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/projects" className="cute-button group">
            View all {projects.length} projects
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
