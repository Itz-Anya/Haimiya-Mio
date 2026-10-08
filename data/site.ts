import type { IconType } from "react-icons";
import { FiMail } from "react-icons/fi";
import { SiGithub, SiInstagram, SiTelegram } from "react-icons/si";

export const img = {
  hero: "/images/haimiya/hero.png",
  portrait: "/images/haimiya/portrait.png",
  avatar: "/images/haimiya/avatar.png",
  about: "/images/haimiya/about.png",
  chibi: "/images/haimiya/chibi.png",
};

export const PROFILE = {
  name: "Anya",
  fullName: "Ananya",
  age: 16,
  role: "High School Student",
  location: "Karnataka, India",
  status: "Probably eating or sleeping",
  telegram: "https://t.me/SylveonHere",
  telegramHandle: "@SylveonHere",
  instagram: "https://instagram.com/itz.mio.haimiya",
  email: "mailto:Itz-Anya@outlook.com",
  github: "https://github.com/Itz-Anya",
} as const;

export const site = {
  url: "https://mio-haimiya.vercel.app",
  name: "Mio-haimiya",
  username: "Haimiya-San",
  title: "Mio-haimiya | Haimiya-San",
  description:
    "Hi, I'm Anya (Mio-haimiya), a student developer from India who loves anime, builds Telegram bots and small web apps, and is a huge Haimiya-senpai fan.",
  tagline: "Living in my own little anime universe.",
  themeColor: "#E8B6CF",
  darkThemeColor: "#120a0d",
  locale: "en_US",
  keywords: [
    "Mio-haimiya",
    "Haimiya-San",
    "Haimiya-senpai",
    "Anya",
    "Ananya",
    "portfolio",
    "student developer",
    "frontend developer",
    "web developer",
    "Telegram bot developer",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "anime",
    "manga",
    "India",
  ],
};

export const nav = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "gallery", label: "Gallery" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const hero = {
  eyebrow: "The girl behind the senpai obsession",
  sub: "Better known as Haimiya-San.",
};

export const about = {
  heading: "A little about the person behind the screen.",
  paragraphs: [
    "Hi, I'm Anya, I'm 16, and I'm completely obsessed with Haimiya-senpai. So much that I built my own little corner of the internet around her.",
    `I'm a high school student from ${PROFILE.location}. I code for fun: Telegram bots, anime and manga apps, weather and music tools, and pretty much any idea that won't leave my head until it exists.`,
    "When I'm not coding, I'm probably eating or sleeping. The rest of the time I'm admiring my favorite manga character, Haimiya-senpai, the reason there's a Haimiya-holic in my name.",
    "This site is where both sides of me meet: tidy code on the outside, a lot of Haimiya-senpai on the inside.",
  ],
};

export const contacts: {
  label: string;
  value: string;
  href: string;
  Icon: IconType;
  external: boolean;
}[] = [
  {
    label: "Telegram",
    value: PROFILE.telegramHandle,
    href: PROFILE.telegram,
    Icon: SiTelegram,
    external: true,
  },
  {
    label: "Instagram",
    value: "@" + PROFILE.instagram.split("/").pop(),
    href: PROFILE.instagram,
    Icon: SiInstagram,
    external: true,
  },
  {
    label: "Email",
    value: PROFILE.email.replace("mailto:", ""),
    href: PROFILE.email,
    Icon: FiMail,
    external: false,
  },
  {
    label: "GitHub",
    value: PROFILE.github.split("/").pop() ?? "GitHub",
    href: PROFILE.github,
    Icon: SiGithub,
    external: true,
  },
];

export const typewriter = [
  "Haimiya-senpai Admirer",
  "Frontend Developer",
  "Bot Builder",
  "UI Tinkerer",
  "Late-night Coder",
  "Perpetual Learner",
];

export const heroTags = [
  "Haimiya-holic",
  "Bot Builder",
  "UI Tinkerer",
  "Idea Collector",
];

export const marquee = [
  "Haimiya-holic",
  "先輩が好き",
  "Anime & Code",
  "Living in my own little anime universe",
  "Haimiya-senpai ♥",
  "宮村先輩",
  "Bot Builder",
  "Late-night Coder",
  "Manga & Matcha",
  "UI Tinkerer",
  "Idea Collector",
  "Perpetual Learner",
];

export const marqueeFooter = [
  "Thanks for visiting ♡",
  "また会おうね",
  "Made with love & too much caffeine",
  "Haimiya-senpai forever ♥",
  "ありがとう",
  "Keep building, keep dreaming",
  "Haimiya-holic",
  "先輩が好き",
  "See you in the next project",
  "おやすみ、先輩",
];
