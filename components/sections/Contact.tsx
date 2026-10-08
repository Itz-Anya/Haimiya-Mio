import { Mail } from "lucide-react";
import { Parallax, ScrollScale } from "@/components/motion/Parallax";
import { Item, Reveal, Stagger } from "@/components/motion/Reveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { Img } from "@/components/ui/Img";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Skeletonize } from "@/components/ui/Skeleton";
import { StatusPill } from "@/components/ui/StatusPill";
import { contacts, img } from "@/data/site";

const gradients: Record<string, string> = {
  Telegram: "from-sky-400 to-blue-500",
  Instagram: "from-fuchsia-500 to-orange-400",
  Email: "from-rose-400 to-pink-500",
  GitHub: "from-slate-600 to-slate-800",
};

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-h" className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollScale>
          <Skeletonize shape="text" variant="scale">
            <div className="cute-card overflow-hidden p-6 md:p-10">
              <span className="ribbon">
                <Mail className="size-9 text-pink-400 md:size-10" />
              </span>
              <SectionHeading
                id="contact-h"
                no="05"
                label="Contact"
                script="say hi ♡"
                title="Let's talk."
                sub="Got a question, an idea, or just want to talk anime? My inbox and DMs are open."
              />
              <div className="grid items-center gap-10 md:grid-cols-12">
                <div className="md:col-span-7">
                  <Stagger className="flex flex-wrap justify-center gap-4 md:justify-start" gap={0.1}>
                    {contacts.map(({ label, href, Icon, external }) => (
                      <Item key={label} variant="pop">
                        <a
                          href={href}
                          aria-label={label + (external ? " (opens in new tab)" : "")}
                          title={label}
                          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="social-icon group size-16"
                        >
                          <span
                            aria-hidden
                            className={`absolute inset-0 bg-linear-to-br ${
                              gradients[label] ?? "from-primary to-accent"
                            } opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                          />
                          <Icon
                            aria-hidden
                            className="relative size-7 transition-all duration-300 group-hover:scale-110 group-hover:text-white"
                          />
                        </a>
                      </Item>
                    ))}
                  </Stagger>

                  <Reveal delay={0.1} className="mt-8 flex items-center justify-center gap-3 md:justify-start">
                    <div className="animate-float relative size-14 shrink-0">
                      <Img
                        src={img.chibi}
                        alt=""
                        sizes="56px"
                        skeleton={false}
                        className="object-contain drop-shadow-[0_6px_10px_hsl(340_82%_66%/0.35)]"
                      />
                    </div>
                    <StatusPill />
                  </Reveal>
                </div>

                <div className="md:col-span-5">
                  <Parallax range={22} rotate={1.5}>
                    <div className="relative mx-auto w-full max-w-xs max-[399px]:max-w-[11rem] md:max-w-none">
                      <div
                        aria-hidden
                        className="animate-glow-pulse absolute inset-x-[8%] inset-y-[6%] rounded-[3rem] bg-linear-to-br from-primary/35 via-accent/40 to-pink-soft/30 blur-2xl"
                      />
                      <RevealImage
                        mode="rise"
                        src={img.about}
                        alt="Illustration of Haimiya-senpai in rose-tinted glasses"
                        sizes="(min-width:768px) 38vw, 80vw"
                        skeleton={false}
                        className="relative aspect-[4/5] w-full"
                        imgClassName="object-contain object-bottom drop-shadow-[0_16px_32px_hsl(340_82%_66%/0.3)]"
                      />
                    </div>
                  </Parallax>
                </div>
              </div>
            </div>
          </Skeletonize>
        </ScrollScale>
      </div>
    </section>
  );
}
