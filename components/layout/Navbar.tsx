"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Briefcase, Heart, Home, Images, Mail, Menu, Sparkles, User, X, type LucideIcon } from "lucide-react";
import { Img } from "@/components/ui/Img";
import { img, nav, site } from "@/data/site";
import { scrollToTarget } from "./SmoothScroll";
import { ThemeToggle } from "./ThemeToggle";

const icons: Record<string, LucideIcon> = {
  home: Home,
  about: User,
  gallery: Images,
  skills: Sparkles,
  projects: Briefcase,
  contact: Mail,
};

export function Navbar() {
  const path = usePathname();
  const onHome = path === "/";
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const active = onHome ? section : path.startsWith("/projects") ? "projects" : "";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!onHome) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setSection(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    nav.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [onHome]);

  useEffect(() => {
    if (!open) return;
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (e: React.MouseEvent, id: string) => {
    setOpen(false);
    if (!onHome) return;
    e.preventDefault();
    if (id === "home") scrollToTarget(0);
    else scrollToTarget(`#${id}`);
  };

  return (
    <>
      <motion.header
        initial={false}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
          scrolled
            ? "border-b border-border/50 bg-card/95 shadow-lg md:bg-card/85 md:backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <nav aria-label="Primary" className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <motion.a
            href="/#home"
            onClick={(e) => go(e, "home")}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2.5"
          >
            <span className="relative size-9 overflow-hidden rounded-full ring-2 ring-primary/50">
              <Img src={img.avatar} alt="" sizes="36px" priority className="object-cover object-[50%_20%]" />
            </span>
            <span className="font-hand hidden text-2xl font-bold text-primary sm:inline">{site.name}</span>
          </motion.a>

          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((item) => {
              const Icon = icons[item.id] ?? Heart;
              const on = active === item.id;
              return (
                <li key={item.id}>
                  <motion.a
                    href={`/#${item.id}`}
                    onClick={(e) => go(e, item.id)}
                    aria-current={on ? "true" : undefined}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                      on ? "text-primary-foreground" : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute inset-0 -z-10 rounded-full bg-linear-to-r from-primary to-pink-medium"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <Icon aria-hidden className="size-4" />
                    {item.label}
                  </motion.a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <motion.button
              ref={menuButton}
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-10 place-items-center rounded-xl border border-border/50 bg-card/80 md:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-foreground/20 md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.ul
              key="menu"
              id="mobile-menu"
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-4 top-[4.25rem] z-50 flex flex-col gap-1 rounded-2xl border border-border/50 bg-card/95 p-3 shadow-2xl md:hidden"
            >
              {nav.map((item, i) => {
                const Icon = icons[item.id] ?? Heart;
                const on = active === item.id;
                return (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <a
                      ref={i === 0 ? firstLink : undefined}
                      href={`/#${item.id}`}
                      onClick={(e) => go(e, item.id)}
                      aria-current={on ? "true" : undefined}
                      className={`flex min-h-12 items-center gap-3 rounded-xl px-4 text-sm font-medium transition-all ${
                        on
                          ? "bg-linear-to-r from-primary/20 to-pink-medium/20 text-primary"
                          : "text-foreground/75 hover:bg-muted"
                      }`}
                    >
                      <Icon aria-hidden className="size-5" />
                      {item.label}
                      {on && <Heart aria-hidden className="ml-auto size-4 animate-pulse fill-primary text-primary" />}
                    </a>
                  </motion.li>
                );
              })}
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
