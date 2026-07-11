export const SCENE_IDS = [
  "hero",
  "about",
  "projects",
  "experience",
  "research",
  "leadership",
  "contact",
] as const;

export type SceneId = (typeof SCENE_IDS)[number];

export const SCENE_META: Record<
  SceneId,
  { label: string; index: number; transition: string }
> = {
  hero: { label: "01 HOME", index: 0, transition: "fade-scale-blur" },
  about: { label: "02 ABOUT", index: 1, transition: "diagonal-reveal" },
  projects: { label: "03 WORK", index: 2, transition: "slide-rotate" },
  experience: { label: "04 XP", index: 3, transition: "panel-drop" },
  research: { label: "05 RESEARCH", index: 4, transition: "lab-scan-wipe" },
  leadership: { label: "06 LEAD", index: 5, transition: "parallax-left" },
  contact: { label: "07 CONTACT", index: 6, transition: "terminal-boot" },
};

export const NAV_SCENES = SCENE_IDS.map((id) => ({
  id,
  label: SCENE_META[id].label.replace(/^\d+\s/, ""),
  href: `#${id}`,
}));

/** Duration in seconds for scene transitions */
export const SCENE_DURATION = 1.55;
