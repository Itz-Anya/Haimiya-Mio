"use client";

import { ArrowUp } from "lucide-react";
import { scrollToTarget } from "./SmoothScroll";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => scrollToTarget(0)}
      className="mx-auto mt-2 inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 text-xs font-semibold transition-colors hover:text-primary"
    >
      <ArrowUp aria-hidden className="size-4" />
      Back to top
    </button>
  );
}
