"use client";

import { AppProvider } from "@/components/providers/AppProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { EasterEggs } from "@/components/effects/EasterEggs";
import { Navigation } from "@/components/layout/Navigation";
import {
  Scene,
  SceneExhibition,
} from "@/components/exhibition/SceneExhibition";
import { SceneHUD } from "@/components/exhibition/SceneHUD";
import { SceneHero } from "@/components/exhibition/scenes/SceneHero";
import { SceneAbout } from "@/components/exhibition/scenes/SceneAbout";
import { SceneProjects } from "@/components/exhibition/scenes/SceneProjects";
import { SceneExperience } from "@/components/exhibition/scenes/SceneExperience";
import { SceneResearch } from "@/components/exhibition/scenes/SceneResearch";
import { SceneLeadership } from "@/components/exhibition/scenes/SceneLeadership";
import { SceneContact } from "@/components/exhibition/scenes/SceneContact";

/** Interactive cinematic experience (client-only). */
export function PortfolioApp() {
  return (
    <AppProvider>
      <LoadingScreen />
      <CustomCursor />
      <EasterEggs />
      <SceneExhibition>
        <Navigation />
        <SceneHUD />
        <Scene id="hero">
          <SceneHero />
        </Scene>
        <Scene id="about">
          <SceneAbout />
        </Scene>
        <Scene id="projects">
          <SceneProjects />
        </Scene>
        <Scene id="experience">
          <SceneExperience />
        </Scene>
        <Scene id="research">
          <SceneResearch />
        </Scene>
        <Scene id="leadership">
          <SceneLeadership />
        </Scene>
        <Scene id="contact">
          <SceneContact />
        </Scene>
      </SceneExhibition>
    </AppProvider>
  );
}
