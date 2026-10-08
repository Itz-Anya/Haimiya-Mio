import { Flower2, Heart } from "lucide-react";
import { Img } from "@/components/ui/Img";
import { Marquee } from "@/components/ui/Marquee";
import { Skeletonize } from "@/components/ui/Skeleton";
import { Year } from "@/components/ui/Year";
import { img, marqueeFooter, PROFILE, site } from "@/data/site";
import { BackToTop } from "./BackToTop";

export function Footer() {
  return (
    <footer className="relative overflow-hidden px-4 pb-8 pt-10 text-center">
      <Marquee reverse items={marqueeFooter} speed={60} />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
      />

      <Skeletonize shape="footer" rounded="1.5rem" className="mx-auto mt-8 max-w-4xl">
        <div className="animate-float relative mx-auto size-24">
          <Img
            src={img.chibi}
            alt=""
            sizes="96px"
            skeleton={false}
            className="object-contain drop-shadow-[0_8px_14px_hsl(340_82%_66%/0.4)]"
          />
        </div>
        <p className="font-hand mt-3 text-3xl font-bold">
          {site.name} <span className="text-primary">· {site.username}</span>
        </p>
        <p className="font-hand mx-auto mt-3 max-w-md text-xl not-italic text-foreground/75 md:text-2xl">
          &ldquo;{site.tagline}&rdquo;
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {PROFILE.role} · {PROFILE.location}
        </p>

        <div className="mx-auto mt-6 h-px w-24 bg-linear-to-r from-transparent via-border to-transparent" />
        <p className="mt-4 flex flex-wrap items-center justify-center gap-1 pb-[env(safe-area-inset-bottom)] text-xs text-muted-foreground md:text-sm">
          © <Year /> · made with{" "}
          <Heart aria-hidden className="size-3.5 animate-pulse fill-primary text-primary" /> by{" "}
          {PROFILE.name} <Flower2 aria-hidden className="size-3.5 text-pink-400" />
        </p>
        <BackToTop />
      </Skeletonize>
    </footer>
  );
}
