"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = Omit<ImageProps, "fill" | "className"> & {
  className?: string;
  skeleton?: boolean;
  fill?: true;
};

export function Img({ className, skeleton = true, alt, onLoad, ...rest }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapper.current?.querySelector("img");
    if (el && el.complete && el.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <div ref={wrapper} className="absolute inset-0">
      {skeleton && !loaded && !failed && (
        <div aria-hidden className="skeleton-shimmer absolute inset-0" />
      )}
      {failed ? (
        <div
          role="img"
          aria-label={String(alt)}
          className="absolute inset-0 grid place-items-center bg-muted/40 text-muted-foreground"
        >
          <span className="flex flex-col items-center gap-1 text-[11px]">
            <ImageOff className="size-6" />
            Image unavailable
          </span>
        </div>
      ) : (
        <Image
          {...rest}
          alt={alt}
          fill
          onLoad={(e) => {
            setLoaded(true);
            onLoad?.(e);
          }}
          onError={() => setFailed(true)}
          className={cn(
            "transition-opacity duration-500",
            loaded ? "opacity-100" : "opacity-0",
            className,
          )}
        />
      )}
    </div>
  );
}
