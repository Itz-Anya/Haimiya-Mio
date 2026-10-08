<div align="center">

<img src="public/images/haimiya/avatar.png" alt="Mio-haimiya avatar" width="160" height="160" style="border-radius: 50%; object-fit: cover;" />

# Mio-haimiya

**Haimiya-San's little corner of the internet** ♡

A cute, animated portfolio for Anya, a student developer who builds bots and small web apps, and is a big Haimiya-senpai fan.

[**Visit the live site**](https://mio-haimiya.vercel.app/)

![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## About

This site is where two sides of me meet: tidy code on the outside, a lot of Haimiya-senpai on the inside. It has a soft pink and lavender look, smooth scrolling, falling petals and a light/dark theme.

## Features

- Animated hero with a typewriter, parallax art and floating sparkles
- About section, auto-scrolling gallery and an interactive skills grid
- Random project picks on the home page, plus a filterable `/projects` page
- Light and dark theme that remembers your choice
- Smooth scrolling with Lenis, and full support for reduced motion
- Complete SEO setup: Open Graph, Twitter cards, favicons, sitemap, robots and JSON-LD

## Tech stack

| Area      | Tools                              |
| --------- | ---------------------------------- |
| Framework | Next.js 15 (App Router), React 19  |
| Language  | TypeScript                         |
| Styling   | Tailwind CSS 4                     |
| Motion    | Motion (Framer Motion), Lenis      |
| Icons     | Lucide, React Icons                |
| Hosting   | Vercel                             |

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

| Command             | What it does                  |
| ------------------- | ----------------------------- |
| `npm run dev`       | Start the dev server          |
| `npm run build`     | Create a production build     |
| `npm start`         | Run the production build      |
| `npm run typecheck` | Check types with TypeScript   |

No environment variables are needed.

## Project structure

```text
app/                 Routes, layout, fonts, global styles, robots and sitemap
components/
  layout/            Navbar, footer, theme toggle, smooth scroll, petals
  sections/          Hero, About, Gallery, Skills, Projects, Contact
  projects/          Project card and the filterable explorer
  motion/            Reveal, parallax and marquee animation helpers
  ui/                Image, skeleton, headings and other small pieces
data/                Site info, skills, projects and gallery content
lib/                 Helpers (class names, SEO metadata)
public/              Images, icons and the social preview image
```

## Make it yours

| To change...        | Edit                                                    |
| ------------------- | ------------------------------------------------------- |
| Name, bio, links    | `data/site.ts`                                          |
| Skills              | `data/skills.ts`                                        |
| Projects            | `data/projects.ts` (add new image hosts in `next.config.ts`) |
| Gallery images      | Drop files into `public/images/haimiya/`                |
| Colors and theme    | `app/globals.css`                                       |
| SEO and meta tags   | `lib/seo.ts` and `app/layout.tsx`                       |

Every image in `public/images/haimiya/` shows up in the gallery automatically, except `avatar.png`, which is used as the logo and favicon.

## Deploy

The easiest way is [Vercel](https://vercel.com/). Import the repository and it will be deployed with the default Next.js settings.

---

<div align="center">

Made with love and too much caffeine by Anya ♡

</div>
