"use client";

import type { ComponentProps } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Img } from "@/components/ui/Img";
import { cn } from "@/lib/utils";
import { EASE } from "./Reveal";

type Mode = "rise" | "wipe" | "zoom";

interface Props extends Omit<ComponentProps<typeof Img>, "className"> {
  className?: string;
  imgClassName?: string;
  mode?: Mode;
  delay?: number;
  eager?: boolean;
  rounded?: string;
}

const boxVariants: Record<Exclude<Mode, "wipe">, Variants> = {
  rise: {
    hidden: { opacity: 0, y: 60, scale: 0.92, filter: "blur(16px)" },
    show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  },
  zoom: {
    hidden: { opacity: 0, scale: 1.15 },
    show: { opacity: 1, scale: 1 },
  },
};

export function RevealImage({
  className,
  imgClassName,
  mode = "rise",
  delay = 0,
  eager = false,
  rounded = "1.5rem",
  ...imgProps
}: Props) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={cn("relative", className)}>
        <Img {...imgProps} className={imgClassName} />
      </div>
    );
  }

  const trigger = eager
    ? { animate: "show" }
    : { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } };

  if (mode === "wipe") {
    return (
      <motion.div
        className={cn("relative overflow-hidden", className)}
        initial="hidden"
        {...trigger}
        variants={{
          hidden: { clipPath: `inset(100% 0% 0% 0% round ${rounded})` },
          show: { clipPath: `inset(0% 0% 0% 0% round ${rounded})` },
        }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      >
        <motion.div
          className="absolute inset-0"
          variants={{ hidden: { scale: 1.35 }, show: { scale: 1 } }}
          transition={{ duration: 1.4, delay, ease: EASE }}
        >
          <Img {...imgProps} className={imgClassName} />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn("relative", className)}
      initial="hidden"
      {...trigger}
      variants={boxVariants[mode]}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      <Img {...imgProps} className={imgClassName} />
    </motion.div>
  );
}
