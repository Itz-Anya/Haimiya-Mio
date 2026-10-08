import { Flower2, Heart } from "lucide-react";
import { AutoMarquee } from "@/components/motion/AutoMarquee";
import { marquee } from "@/data/site";

const isJapanese = (text: string) => /[ぁ-んァ-ン一-龥]/.test(text);

interface Props {
  reverse?: boolean;
  items?: string[];
  speed?: number;
}

export function Marquee({ reverse = false, items = marquee, speed = 70 }: Props) {
  return (
    <div
      aria-hidden
      className="relative -mx-2 my-6 -rotate-1 border-y border-primary/20 bg-primary/10 py-3 md:py-4"
    >
      <AutoMarquee
        speed={speed}
        reverse={reverse}
        pauseOnHover
        className="[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
        groupClassName="gap-8 pr-8 whitespace-nowrap"
      >
        {items.map((text, i) => (
          <span
            key={i}
            className="flex items-center gap-8 font-display text-lg font-semibold text-primary/80 md:text-2xl"
          >
            <span
              lang={isJapanese(text) ? "ja" : undefined}
              className={isJapanese(text) ? "font-jp" : ""}
            >
              {text}
            </span>
            {i % 2 ? (
              <Flower2 className="size-5 text-pink-400" />
            ) : (
              <Heart className="size-5 fill-primary/60 text-primary" />
            )}
          </span>
        ))}
      </AutoMarquee>
    </div>
  );
}
