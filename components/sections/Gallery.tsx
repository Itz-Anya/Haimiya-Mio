"use client";

import { useState } from "react";
import { AutoMarquee } from "@/components/motion/AutoMarquee";
import { Parallax, ScrollText } from "@/components/motion/Parallax";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Skeletonize } from "@/components/ui/Skeleton";
import { gallery, type GalleryImage } from "@/data/gallery";

function GalleryCard({ image }: { image: GalleryImage }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`group relative block aspect-[4/5] h-auto w-52 shrink-0 touch-manipulation overflow-hidden rounded-3xl border border-border/50 bg-linear-to-br ${image.tone} text-left shadow-card transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-hover sm:w-60 md:w-64`}
    >
      <span className="absolute inset-0 z-0 bg-background/10" aria-hidden />

      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
        className={`absolute inset-0 z-[1] block h-full w-full select-none object-contain p-1.5 transition-[transform,opacity] duration-700 group-hover:scale-[1.035] sm:p-2 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {!loaded && (
        <span aria-hidden className="absolute inset-0 z-[2] grid place-items-center bg-background/5">
          <span className="size-7 animate-pulse rounded-full bg-primary/15" />
        </span>
      )}
    </div>
  );
}

function Row({ images, speed, reverse }: { images: GalleryImage[]; speed: number; reverse?: boolean }) {
  return (
    <AutoMarquee
      speed={speed}
      reverse={reverse}
      pauseOnHover
      className="py-3 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
      groupClassName="items-stretch gap-4 pr-4 md:gap-6 md:pr-6"
    >
      {images.map((image) => (
        <GalleryCard key={image.src} image={image} />
      ))}
    </AutoMarquee>
  );
}

const reversed = [...gallery].reverse();

export function Gallery() {
  return (
    <section id="gallery" aria-labelledby="gallery-h" className="relative px-4 py-16 md:py-24">
      <ScrollText
        text="HAIMIYA-SENPAI ♥ HAIMIYA-SENPAI ♥"
        className="outline-text text-[22vw] md:text-[16vw]"
        speed={55}
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          id="gallery-h"
          no="02"
          label="Haimiya gallery"
          script="my favourite view"
          title="My favourite senpai, framed."
        />
      </div>

      <Skeletonize
        shape="gallery"
        rounded="0px"
        className="-mx-4 mt-10 md:mt-14"
        contentClassName="space-y-4 md:space-y-6"
      >
        <Parallax range={14}>
          <Row images={gallery} speed={42} />
        </Parallax>
        <Parallax range={22}>
          <Row images={reversed} speed={54} reverse />
        </Parallax>
      </Skeletonize>
    </section>
  );
}
