"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { PetalsCanvas } from "./PetalsCanvas";
import { ScrollProgress } from "./ScrollProgress";
import { SmoothScroll } from "./SmoothScroll";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <ScrollProgress />
      <PetalsCanvas />
      <div className="relative z-10 min-h-svh overflow-x-clip">{children}</div>
    </MotionConfig>
  );
}
