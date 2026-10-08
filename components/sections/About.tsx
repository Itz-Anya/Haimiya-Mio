import {
  Bot,
  Code2,
  Flower2,
  Globe,
  GraduationCap,
  Heart,
  MapPin,
  Moon,
  Music,
  Palette,
  Server,
  Smartphone,
  Sparkles,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import { Parallax } from "@/components/motion/Parallax";
import { Item, Reveal, Stagger } from "@/components/motion/Reveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusPill } from "@/components/ui/StatusPill";
import { Skeletonize } from "@/components/ui/Skeleton";
import { about, img, PROFILE } from "@/data/site";

interface IconLabel {
  label: string;
  Icon: LucideIcon;
}

const facts: (IconLabel & { value: string })[] = [
  { label: "Name", value: `${PROFILE.name} (${PROFILE.fullName})`, Icon: Heart },
  { label: "Age", value: String(PROFILE.age), Icon: Sparkles },
  { label: "Currently", value: PROFILE.role, Icon: GraduationCap },
  { label: "Based in", value: PROFILE.location, Icon: MapPin },
];

const lists: { title: string; items: IconLabel[] }[] = [
  {
    title: "Loves",
    items: [
      { label: "Food", Icon: Heart },
      { label: "Bots", Icon: Bot },
      { label: "Websites", Icon: Globe },
      { label: "Music", Icon: Music },
    ],
  },
  {
    title: "Hobbies",
    items: [
      { label: "Eating (again)", Icon: Utensils },
      { label: "Sleeping", Icon: Moon },
      { label: "Coding", Icon: Code2 },
      { label: "Late-night scrolling", Icon: Smartphone },
    ],
  },
  {
    title: "Currently learning",
    items: [
      { label: "Backend Development", Icon: Server },
      { label: "UI/UX Design", Icon: Palette },
    ],
  },
];

const boxStyle =
  "rounded-2xl border border-border/60 bg-card/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg";

export function About() {
  const [intro, ...rest] = about.paragraphs;

  return (
    <section id="about" aria-labelledby="about-h" className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="about-h"
          no="01"
          label="About me"
          script="a little hello ♡"
          title={about.heading}
        />
        <div className="grid items-start gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:sticky md:top-28 md:col-span-5">
            <Skeletonize variant="scale" shape="media">
              <div className="cute-card overflow-hidden">
                <div
                  aria-hidden
                  className="absolute inset-x-[10%] bottom-0 top-[14%] rounded-t-full bg-linear-to-b from-primary/30 via-accent/40 to-transparent blur-xl"
                />
                <Parallax range={26}>
                  <RevealImage
                    mode="rise"
                    src={img.portrait}
                    alt="Haimiya-senpai laughing in a track jacket"
                    sizes="(min-width:768px) 40vw, 90vw"
                    skeleton={false}
                    className="relative mx-auto aspect-[2/3] w-[88%] max-[399px]:w-[64%]"
                    imgClassName="object-contain object-bottom drop-shadow-[0_16px_32px_hsl(340_82%_66%/0.3)]"
                  />
                </Parallax>
                <span className="glass absolute bottom-4 left-4 rounded-full px-3 py-1.5 font-mono text-[11px] tracking-wider text-primary">
                  ♥ HAIMIYA-HOLIC
                </span>
              </div>
            </Skeletonize>
          </div>

          <Skeletonize shape="text" className="md:col-span-7">
            <div className="cute-card p-6 md:p-9">
              <span className="ribbon">
                <Flower2 className="size-9 text-pink-400 md:size-10" />
              </span>

              <Stagger gap={0.12}>
                <Item>
                  <p className="text-lg leading-relaxed text-foreground/90 md:text-xl">{intro}</p>
                </Item>
                {rest.map((paragraph) => (
                  <Item key={paragraph}>
                    <p className="mt-4 leading-relaxed text-foreground/75">{paragraph}</p>
                  </Item>
                ))}
              </Stagger>

              <Stagger className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4" gap={0.08}>
                {facts.map(({ label, value, Icon }) => (
                  <Item key={label} variant="scale">
                    <div className={`${boxStyle} h-full text-center`}>
                      <Icon aria-hidden className="mx-auto mb-2 size-5 text-primary" />
                      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
                      <p className="mt-1 break-words text-sm font-semibold">{value}</p>
                    </div>
                  </Item>
                ))}
              </Stagger>

              <Stagger className="mt-6 grid gap-3 md:grid-cols-3" gap={0.1}>
                {lists.map(({ title, items }) => (
                  <Item key={title}>
                    <div className={`${boxStyle} h-full p-5`}>
                      <h3 className="mb-3 font-display text-xs font-semibold uppercase tracking-wider text-primary">
                        {title}
                      </h3>
                      <ul className="space-y-2">
                        {items.map(({ label, Icon }) => (
                          <li key={label} className="flex items-center gap-2 text-sm text-foreground/80">
                            <Icon aria-hidden className="size-4 shrink-0 text-primary" />
                            <span className="break-words">{label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Item>
                ))}
              </Stagger>

              <Reveal variant="up" delay={0.1} className="mt-8 flex justify-center">
                <StatusPill />
              </Reveal>
            </div>
          </Skeletonize>
        </div>
      </div>
    </section>
  );
}
