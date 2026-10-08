import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Code2, Sparkles, Star } from "lucide-react";
import { Enter, Reveal } from "@/components/motion/Reveal";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { CountUp } from "@/components/ui/CountUp";
import { SplitWords } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "All Projects",
  description:
    "Every bot, website and small experiment by Anya (Mio-haimiya) that made it out of the drafts folder.",
  path: "/projects",
});

const stats = [
  { Icon: Sparkles, count: projects.length, label: "Builds" },
  { Icon: Star, count: projects.filter((p) => p.featured).length, label: "Featured" },
  { Icon: Code2, count: projects.filter((p) => p.repoUrl).length, label: "Open source" },
];

export default function AllProjects() {
  return (
    <main id="main" className="mx-auto max-w-6xl px-4 pb-24 pt-28">
      <div className="mb-12 text-center md:mb-16">
        <Enter variant="down">
          <Link href="/" className="ghost-button mb-6 min-h-10 px-5 py-2 text-sm">
            <ArrowLeft aria-hidden className="size-4" />
            Back home
          </Link>
        </Enter>
        <Enter delay={0.2}>
          <p aria-hidden className="font-hand -mb-1 text-3xl text-primary md:text-4xl">
            everything I&apos;ve made ♡
          </p>
        </Enter>
        <h1 className="text-4xl not-italic md:text-6xl">
          <SplitWords text="All Projects" wordClassName="text-gradient" />
        </h1>
        <Enter delay={0.3}>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground md:text-base">
            Every bot, website and small experiment that made it out of the drafts folder.
          </p>
        </Enter>

        <Reveal delay={0.4} className="mx-auto mt-8 grid max-w-xl grid-cols-3 gap-3">
          {stats.map(({ Icon, count, label }) => (
            <div
              key={label}
              className="rounded-2xl border border-border/60 bg-card/70 px-3 py-4 shadow-card backdrop-blur-sm"
            >
              <Icon aria-hidden className="mx-auto mb-1 size-5 text-primary" />
              <div className="font-display text-2xl font-semibold text-gradient md:text-3xl">
                <CountUp to={count} />
              </div>
              <div className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                {label}
              </div>
            </div>
          ))}
        </Reveal>
      </div>

      <ProjectsExplorer />
    </main>
  );
}
