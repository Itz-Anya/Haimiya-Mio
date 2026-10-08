import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { Marquee } from "@/components/ui/Marquee";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Marquee />
      <About />
      <Gallery />
      <Skills />
      <FeaturedProjects />
      <Contact />
    </main>
  );
}
