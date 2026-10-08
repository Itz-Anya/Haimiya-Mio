"use client";

import { useState } from "react";
import { motion, useAnimationControls } from "motion/react";
import { itemMotion, staggerProps } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Skeletonize } from "@/components/ui/Skeleton";
import { skillCount, skillGroups, type Skill } from "@/data/skills";

const BURST_ANGLES = Array.from({ length: 10 }, (_, i) => (i / 10) * Math.PI * 2);

function SkillTile({ skill }: { skill: Skill }) {
  const { Icon, color } = skill;
  const tint = color ?? "hsl(var(--primary))";
  const controls = useAnimationControls();
  const [bursts, setBursts] = useState<number[]>([]);

  const pop = () => {
    const id = Date.now() + Math.random();
    setBursts((list) => [...list.slice(-2), id]);
    setTimeout(() => setBursts((list) => list.filter((x) => x !== id)), 900);
    controls.start({
      scale: [1, 1.5, 0.82, 1.18, 1],
      rotate: [0, -20, 16, -8, 0],
      transition: { duration: 0.75, ease: "easeOut" },
    });
  };

  return (
    <motion.li {...itemMotion("scale", 0.45)} className="relative min-w-0">
      <motion.button
        type="button"
        onClick={pop}
        whileHover="hover"
        whileTap={{ scale: 0.94 }}
        aria-label={`${skill.name} skill`}
        className="group relative flex h-full w-full cursor-pointer flex-col items-center gap-2 rounded-2xl border border-border/60 bg-card/70 px-1.5 py-3 text-center transition-[border-color,box-shadow] duration-300 hover:border-primary/50 hover:shadow-hover min-[400px]:px-2 min-[400px]:py-4"
      >
        {skill.learning && (
          <span className="absolute right-1 top-1 rounded-full bg-primary/15 px-1.5 py-0.5 text-[8px] font-semibold uppercase leading-none tracking-wide text-primary min-[400px]:right-1.5 min-[400px]:top-1.5 min-[400px]:text-[9px]">
            learning
          </span>
        )}
        <motion.span
          variants={{ hover: { y: -4 } }}
          transition={{ type: "spring", stiffness: 300, damping: 14 }}
          className="relative grid size-10 place-items-center min-[400px]:size-12"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-3 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle, color-mix(in srgb, ${tint} 38%, transparent), transparent 70%)`,
            }}
          />
          <motion.span
            variants={{
              hover: {
                scale: 1.18,
                rotate: [0, -10, 10, -5, 0],
                transition: {
                  rotate: { duration: 0.6 },
                  scale: { type: "spring", stiffness: 300, damping: 12 },
                },
              },
            }}
            className="relative grid size-10 place-items-center rounded-xl bg-muted/70 min-[400px]:size-12"
          >
            <motion.span animate={controls} className="grid place-items-center">
              <Icon aria-hidden className="size-6 min-[400px]:size-7" style={color ? { color } : undefined} />
            </motion.span>
          </motion.span>
          {bursts.map((id) => (
            <span key={id} aria-hidden className="pointer-events-none absolute inset-0">
              <motion.span
                initial={{ scale: 0.4, opacity: 0.7 }}
                animate={{ scale: 2.2, opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="absolute inset-0 rounded-xl border-2"
                style={{ borderColor: tint }}
              />
              {BURST_ANGLES.map((angle, k) => (
                <motion.span
                  key={k}
                  initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                  animate={{ x: Math.cos(angle) * 40, y: Math.sin(angle) * 40, scale: 0, opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="absolute left-1/2 top-1/2 -ml-[3px] -mt-[3px] size-1.5 rounded-full"
                  style={{ background: k % 2 ? tint : "hsl(var(--primary))" }}
                />
              ))}
            </span>
          ))}
        </motion.span>
        <span className="w-full min-w-0 break-words text-[11px] font-semibold leading-tight min-[400px]:text-xs md:text-[13px]">
          {skill.name}
        </span>
      </motion.button>
    </motion.li>
  );
}

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-h" className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="skills-h"
          no="03"
          label="Skills"
          script="what's in my toolbox"
          title="My Tech Stack"
          sub={`${skillCount} tools I actually use across ${skillGroups.length} areas. No fake percentages, promise.`}
        />
        <div className="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-6 md:gap-5">
          {skillGroups.map((group, i) => (
            <Skeletonize
              key={group.id}
              shape="tiles"
              delay={(i % 2) * 0.1}
              className={`min-w-0 ${group.span}`}
              contentClassName="h-full"
            >
              <div className="cute-card h-full min-w-0 p-3.5 min-[400px]:p-5 md:p-6">
                <div className="mb-3 flex items-center gap-2.5 min-[400px]:mb-4 min-[400px]:gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/15">
                    <group.Icon className="size-5 text-primary" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg leading-tight">{group.title}</h3>
                    <p className="truncate text-xs text-muted-foreground">{group.blurb}</p>
                  </div>
                </div>
                <motion.ul
                  {...staggerProps(0.05)}
                  className="grid grid-cols-[repeat(2,minmax(0,1fr))] gap-2 min-[400px]:gap-2.5 sm:grid-cols-3 md:gap-3 lg:grid-cols-4"
                >
                  {group.skills.map((skill) => (
                    <SkillTile key={skill.name} skill={skill} />
                  ))}
                </motion.ul>
              </div>
            </Skeletonize>
          ))}
        </div>
      </div>
    </section>
  );
}
