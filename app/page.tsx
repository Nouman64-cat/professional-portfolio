import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { Systems } from "@/components/sections/systems";
import { PersonJsonLd } from "@/components/seo/person-json-ld";

export default function HomePage() {
  return (
    <>
      <PersonJsonLd />
      <Hero />
      <div className="rule mx-auto max-w-6xl" />
      <About />
      <div className="rule mx-auto max-w-6xl" />
      <Skills />
      <div className="rule mx-auto max-w-6xl" />
      <Experience />
      <div className="rule mx-auto max-w-6xl" />
      <Systems />
      <div className="rule mx-auto max-w-6xl" />
      <Contact />
    </>
  );
}
