import { useState, useEffect, useCallback } from "react";
import { Navbar } from "./components/layout/Navbar";
import { CustomCursor } from "./components/ui/CustomCursor";
import { SectionCinematicReveal } from "./components/ui/SectionCinematicReveal";
import { useMediaQuery } from "react-responsive";

import { Hero } from "./components/sections/Hero";
import { Stats } from "./components/sections/Stats";
import { About } from "./components/sections/About";
import { Projects } from "./components/sections/Projects";
import { CaseStudies } from "./components/sections/CaseStudies";
import { Services } from "./components/sections/Services";
import { TechStack } from "./components/sections/TechStack";
import { Experience } from "./components/sections/Experience";
import { Testimonials } from "./components/sections/Testimonials";
import { Contact } from "./components/sections/Contact";
import { AuroraHero } from "./components/sections/AuroraHero";
import { Footer } from "./components/sections/Footer";
import { useScrollProgress } from "./hooks/useScrollProgress";

function App() {
  const { activeSection, isScrolled } = useScrollProgress();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const stored = localStorage.getItem("bipul-theme");
    if (stored === "light") {
      root.classList.remove("dark");
      root.classList.add("light");
      setIsDark(false);
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove("dark");
      root.classList.add("light");
      localStorage.setItem("bipul-theme", "light");
      setIsDark(false);
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
      localStorage.setItem("bipul-theme", "dark");
      setIsDark(true);
    }
  }, [isDark]);

  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {isDesktop && <CustomCursor />}
      <div
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 70% at 50% 0%, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 32%, rgba(0,0,0,0) 72%)",
        }}
      />
      <div
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.4) 100%)",
        }}
      />
      <Navbar
        activeSection={activeSection}
        isScrolled={isScrolled}
      />
      <main className="relative z-10">
        <Hero />
        <SectionCinematicReveal tone="lift">
          <Stats />
        </SectionCinematicReveal>
        <SectionCinematicReveal tone="glide-left">
          <About />
        </SectionCinematicReveal>
        <SectionCinematicReveal tone="curtain">
          <Projects />
        </SectionCinematicReveal>
        <SectionCinematicReveal tone="glide-right">
          <CaseStudies />
        </SectionCinematicReveal>
        <SectionCinematicReveal tone="depth">
          <Services />
        </SectionCinematicReveal>
        <SectionCinematicReveal tone="float">
          <TechStack />
        </SectionCinematicReveal>
        <SectionCinematicReveal tone="vault">
          <Experience />
        </SectionCinematicReveal>
        <SectionCinematicReveal tone="glide-right">
          <Testimonials />
        </SectionCinematicReveal>
        <SectionCinematicReveal tone="depth">
          <Contact />
        </SectionCinematicReveal>
        <AuroraHero />
      </main>
      <SectionCinematicReveal tone="vault" className="relative z-10">
        <Footer />
      </SectionCinematicReveal>
    </div>
  );
}

export default App;
