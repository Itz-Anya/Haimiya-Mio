"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Moon, Sparkles, Star, Sun } from "lucide-react";

const starMotion = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 },
};

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");

    root.classList.add("theme-switching");
    root.classList.toggle("dark", next);
    setDark(next);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => root.classList.remove("theme-switching")),
    );

    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <motion.button
      type="button"
      onClick={toggle}
      whileTap={{ scale: 0.9 }}
      role="switch"
      aria-checked={dark}
      aria-label="Dark theme"
      className="relative h-8 w-14 shrink-0 rounded-full bg-linear-to-r from-amber-200 to-amber-400 p-1 shadow-inner dark:from-indigo-800 dark:to-purple-900"
    >
      <motion.span
        className="absolute left-1 top-1 grid size-6 place-items-center rounded-full bg-white shadow-lg"
        animate={{ x: dark ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {dark ? (
          <Moon aria-hidden className="size-4 text-indigo-600" />
        ) : (
          <Sun aria-hidden className="size-4 text-amber-500" />
        )}
      </motion.span>
      <AnimatePresence>
        {dark && (
          <>
            <motion.span key="star" {...starMotion} className="absolute left-2 top-1.5">
              <Star aria-hidden className="size-2 fill-yellow-300 text-yellow-300" />
            </motion.span>
            <motion.span
              key="sparkle"
              {...starMotion}
              transition={{ delay: 0.1 }}
              className="absolute bottom-1 left-3"
            >
              <Sparkles aria-hidden className="size-2 text-yellow-200" />
            </motion.span>
          </>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
