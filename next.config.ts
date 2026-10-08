import type { NextConfig } from "next";

const imageHosts = [
  "anya-file-host.vercel.app",
  "raw.githubusercontent.com",
  "sylveon-music.vercel.app",
  "files.catbox.moe",
];

const config: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: imageHosts.map((hostname) => ({
      protocol: "https" as const,
      hostname,
    })),
  },
};

export default config;
