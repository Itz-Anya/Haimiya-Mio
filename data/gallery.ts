type WebpackContext = {
  keys(): string[];
  (request: string): string;
};

type RequireWithContext = NodeRequire & {
  context: (
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp,
  ) => WebpackContext;
};

const imageContext = (require as RequireWithContext).context(
  "../public/images/haimiya",
  false,
  /\.(png|jpe?g|webp|gif|avif)$/i,
);

const tones = [
  "from-pink-soft/50 to-lavender/60",
  "from-lavender/60 to-pink-light",
  "from-peach/60 to-pink-soft/40",
  "from-mint/50 to-lavender/50",
  "from-pink-light to-secondary",
  "from-blue-soft/50 to-lavender/60",
  "from-purple-soft/50 to-pink-light",
  "from-peach/50 to-mint/50",
  "from-cyan-soft/50 to-lavender/60",
  "from-rose/50 to-peach/60",
];

const toAlt = (path: string) => {
  const name = path.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "Haimiya-senpai";
  return name.replace(/[-_]+/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

export interface GalleryImage {
  src: string;
  alt: string;
  tone: string;
}

export const gallery: GalleryImage[] = imageContext
  .keys()
  .filter((path) => !path.toLowerCase().endsWith("/avatar.png"))
  .sort((a, b) => a.localeCompare(b))
  .map((path, index) => ({
    src: `/images/haimiya/${encodeURIComponent(path.replace(/^\.\//, ""))}`,
    alt: `Haimiya-senpai artwork ${toAlt(path)}`,
    tone: tones[index % tones.length],
  }));
