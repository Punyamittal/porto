"use client";

import { AppProvider } from "@/components/providers/AppProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { MouseLight } from "@/components/effects/MouseLight";
import { EasterEggs } from "@/components/effects/EasterEggs";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";

export function PortfolioApp() {
  return (
    <AppProvider>
      <LoadingScreen />
      <CustomCursor />
      <MouseLight />
      <EasterEggs />
      <Navigation />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </AppProvider>
  );
}
