import type { LucideIcon } from "lucide-react";
import { Bot, Cloud, Database, Layers } from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiDiscord,
  SiDocker,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiFramer,
  SiGit,
  SiGithub,
  SiGnubash,
  SiHtml5,
  SiJavascript,
  SiLinux,
  SiMongodb,
  SiNetlify,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
} from "react-icons/si";

export interface Skill {
  name: string;
  Icon: IconType;
  color: string | null;
  learning?: boolean;
}

export interface SkillGroup {
  id: string;
  title: string;
  blurb: string;
  Icon: LucideIcon;
  span: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    blurb: "Where most of my late nights go.",
    Icon: Layers,
    span: "md:col-span-4",
    skills: [
      { name: "HTML & CSS", Icon: SiHtml5, color: "#E34F26" },
      { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", Icon: SiNextdotjs, color: null },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Vite", Icon: SiVite, color: "#646CFF" },
      { name: "Framer Motion", Icon: SiFramer, color: null },
    ],
  },
  {
    id: "cloud",
    title: "Deploy & Cloud",
    blurb: "Getting it out of localhost.",
    Icon: Cloud,
    span: "md:col-span-2",
    skills: [
      { name: "Vercel", Icon: SiVercel, color: null },
      { name: "Netlify", Icon: SiNetlify, color: "#00C7B7" },
      { name: "Docker", Icon: SiDocker, color: "#2496ED", learning: true },
    ],
  },
  {
    id: "backend",
    title: "Backend & Data",
    blurb: "Servers, data, and the parts users never see.",
    Icon: Database,
    span: "md:col-span-3",
    skills: [
      { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Express", Icon: SiExpress, color: null },
      { name: "Python", Icon: SiPython, color: "#3776AB" },
      { name: "Supabase", Icon: SiSupabase, color: "#3ECF8E", learning: true },
      { name: "MongoDB", Icon: SiMongodb, color: "#47A248", learning: true },
      { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1", learning: true },
      { name: "Firebase", Icon: SiFirebase, color: "#FFCA28" },
    ],
  },
  {
    id: "tools",
    title: "Bots & Tools",
    blurb: "Little programs and the workflow around them.",
    Icon: Bot,
    span: "md:col-span-3",
    skills: [
      { name: "Discord.js", Icon: SiDiscord, color: "#5865F2" },
      { name: "Bash", Icon: SiGnubash, color: "#4EAA25" },
      { name: "Git", Icon: SiGit, color: "#F05032" },
      { name: "GitHub", Icon: SiGithub, color: null },
      { name: "Linux", Icon: SiLinux, color: null },
      { name: "Postman", Icon: SiPostman, color: "#FF6C37" },
      { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
    ],
  },
];

export const skillCount = skillGroups.reduce((total, group) => total + group.skills.length, 0);
