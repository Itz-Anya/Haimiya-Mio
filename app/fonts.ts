import {
  Dancing_Script,
  Fraunces,
  Great_Vibes,
  JetBrains_Mono,
  Lugrasimo,
  Plus_Jakarta_Sans,
  Zen_Maru_Gothic,
} from "next/font/google";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-greatvibes",
  display: "swap",
});

const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-dancing",
  display: "swap",
});

const zen = Zen_Maru_Gothic({
  weight: ["500", "700"],
  preload: false,
  variable: "--font-zen",
  display: "swap",
});

const lugrasimo = Lugrasimo({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-lugrasimo",
  display: "swap",
});

export const fontVariables = [
  jakarta,
  fraunces,
  greatVibes,
  jetbrains,
  dancing,
  zen,
  lugrasimo,
]
  .map((font) => font.variable)
  .join(" ");
