"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowDown, Bug, Flower2, Heart, Monitor, Palette, Sparkles, type LucideIcon } from "lucide-react";
import { scrollToTarget } from "@/components/layout/SmoothScroll";
import { Enter } from "@/components/motion/Reveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { Img } from "@/components/ui/Img";
import { Skeletonize } from "@/components/ui/Skeleton";
import { hero, heroTags, img, typewriter } from "@/data/site";

const tagIcons: LucideIcon[] = [Heart, Bug, Palette, Flower2];

function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (!deleting && text === word) {
      timer = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((index + 1) % words.length);
    } else {
      timer = setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? 45 : 95,
      );
    }

    return () => clearTimeout(timer);
  }, [text, deleting, index, words]);

  return text;
}

function Spark({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <Sparkles
      aria-hidden
      className={`animate-sparkle absolute text-primary ${className}`}
      style={{ animationDelay: `${delay}s` }}
    />
  );
}

function jumpTo(target: string) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToTarget(target);
  };
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const typed = useTypewriter(typewriter);

  const pointerX = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const pointerY = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      pointerX.set(e.clientX / innerWidth - 0.5);
      pointerY.set(e.clientY / innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [pointerX, pointerY, reduce]);

  const blobOneX = useTransform(pointerX, [-0.5, 0.5], [-40, 40]);
  const blobOneY = useTransform(pointerY, [-0.5, 0.5], [-40, 40]);
  const blobTwoX = useTransform(pointerX, [-0.5, 0.5], [30, -30]);
  const blobTwoY = useTransform(pointerY, [-0.5, 0.5], [30, -30]);
  const artX = useTransform(pointerX, [-0.5, 0.5], [-14, 14]);
  const artY = useTransform(pointerY, [-0.5, 0.5], [-8, 8]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scrollArtY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const textFade = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);

  return (
    <section
      ref={ref}
      id="home"
      aria-labelledby="hero-title"
      className="relative flex min-h-svh items-center overflow-hidden px-4 pb-14 pt-24 md:pt-28"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="animate-gradient-shift absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/10" />
        <motion.div style={{ x: blobOneX, y: blobOneY }} className="absolute -left-20 top-1/4">
          <div className="animate-float-slow size-96 rounded-full bg-primary/15 blur-3xl" />
        </motion.div>
        <motion.div style={{ x: blobTwoX, y: blobTwoY }} className="absolute -right-20 bottom-1/4">
          <div className="animate-float-slow-reverse size-80 rounded-full bg-accent/25 blur-3xl" />
        </motion.div>
        <span
          lang="ja"
          className="absolute right-4 top-28 hidden font-jp text-sm tracking-[.6em] text-primary/70 [writing-mode:vertical-rl] md:block"
        >
          先輩が好き
        </span>
      </div>

      <div className="relative mx-auto w-full max-w-6xl">
        <Skeletonize shape="hero" variant="scale">
          <div className="cute-card overflow-hidden">
            <div className="grid items-end md:grid-cols-12">
              <div className="relative order-1 px-6 pt-8 md:order-2 md:col-span-5 md:px-0 md:pt-10">
                <div className="relative mx-auto aspect-[935/941] w-[min(80vw,340px)] max-[399px]:w-[58vw] md:w-full md:max-w-none">
                  <div
                    aria-hidden
                    className="animate-glow-pulse absolute inset-[8%] rounded-full bg-linear-to-br from-primary/45 via-accent/50 to-pink-soft/40 blur-2xl"
                  />
                  <div
                    aria-hidden
                    className="animate-spin-slow absolute inset-[5%] rounded-full border-2 border-dashed border-primary/35"
                  />
                  <div
                    aria-hidden
                    className="animate-spin-reverse absolute inset-[12%] rounded-full border-2 border-dotted border-accent/70"
                  />
                  <Spark className="left-[6%] top-[14%] size-6" />
                  <Spark className="right-[8%] top-[24%] size-5" delay={0.8} />
                  <Spark className="right-[18%] top-[4%] size-4" delay={1.4} />

                  <motion.div
                    style={reduce ? undefined : { y: scrollArtY, x: artX }}
                    className="absolute inset-0"
                  >
                    <motion.div style={reduce ? undefined : { y: artY }} className="absolute inset-0">
                      <RevealImage
                        eager
                        priority
                        mode="rise"
                        delay={0.5}
                        src={img.hero}
                        alt="Haimiya-senpai touching her glasses in a cinematic illustration"
                        sizes="(min-width:768px) 40vw, 80vw"
                        skeleton={false}
                        className="absolute inset-0"
                        imgClassName="object-contain object-bottom drop-shadow-[0_18px_38px_hsl(340_82%_66%/0.35)] max-md:[mask-image:linear-gradient(to_bottom,#000_80%,transparent)]"
                      />
                    </motion.div>
                  </motion.div>

                  <Enter
                    variant="pop"
                    delay={1.1}
                    className="absolute -left-1 bottom-1 z-10 md:-left-4 md:bottom-4"
                  >
                    <div className="animate-float relative size-24 max-[399px]:size-16 md:size-32">
                      <Img
                        src={img.chibi}
                        alt="Chibi Haimiya waving hello"
                        sizes="128px"
                        skeleton={false}
                        className="object-contain drop-shadow-[0_8px_14px_hsl(340_82%_66%/0.4)]"
                      />
                    </div>
                  </Enter>
                </div>
              </div>

              <motion.div
                style={reduce ? undefined : { y: textY, opacity: textFade }}
                className="order-2 p-6 text-center md:order-1 md:col-span-7 md:p-12 md:pb-14 md:text-left"
              >
                <Enter delay={0.1}>
                  <span className="tag tag-sm mx-auto md:mx-0">
                    <Heart aria-hidden className="size-3.5 fill-current" />
                    {hero.eyebrow}
                  </span>
                </Enter>
                <Enter delay={0.2}>
                  <h1 id="hero-title" className="mt-4 min-w-0">
                    <span className="font-hand mb-0 block text-3xl font-semibold not-italic text-primary md:text-5xl">
                      Hello, I&apos;m
                    </span>
                    <span className="hero-name text-gradient block whitespace-nowrap text-[clamp(4.5rem,14vw,10rem)] leading-none">
                      Anya
                    </span>
                  </h1>
                </Enter>
                <Enter delay={0.3}>
                  <p className="font-hand mt-2 flex items-start justify-center gap-2 text-2xl not-italic text-muted-foreground md:justify-start md:text-3xl">
                    <span>&ldquo;{hero.sub}&rdquo;</span>
                    <Sparkles aria-hidden className="animate-wiggle mt-1 size-5 shrink-0 text-primary" />
                  </p>
                </Enter>
                <Enter delay={0.4}>
                  <p
                    className="mt-4 flex min-h-12 items-center justify-center gap-2 md:justify-start"
                    aria-live="off"
                  >
                    <Monitor aria-hidden className="size-5 shrink-0 text-primary" />
                    <span className="font-hand text-gradient text-3xl font-bold md:text-4xl">{typed}</span>
                    <span aria-hidden className="cursor-blink" />
                  </p>
                </Enter>

                <Enter delay={0.6} className="mt-6 flex flex-wrap justify-center gap-2.5 md:justify-start">
                  {heroTags.map((tag, i) => {
                    const TagIcon = tagIcons[i % tagIcons.length];
                    return (
                      <span key={tag} className="tag tag-sm">
                        <TagIcon aria-hidden className="size-3.5" />
                        {tag}
                      </span>
                    );
                  })}
                </Enter>
                <Enter delay={0.7} className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
                  <a href="#projects" onClick={jumpTo("#projects")} className="cute-button">
                    See My Projects
                  </a>
                  <a href="#skills" onClick={jumpTo("#skills")} className="ghost-button">
                    Discover My Skills
                  </a>
                </Enter>
              </motion.div>
            </div>
          </div>
        </Skeletonize>

        <Enter delay={1.3} className="mt-6 flex justify-center">
          <a
            href="#about"
            onClick={jumpTo("#about")}
            aria-label="Scroll to About"
            className="group flex flex-col items-center gap-1 font-mono text-[11px] tracking-[.3em] text-muted-foreground"
          >
            SCROLL
            <ArrowDown aria-hidden className="size-4 animate-bounce text-primary" />
          </a>
        </Enter>
      </div>
    </section>
  );
}
