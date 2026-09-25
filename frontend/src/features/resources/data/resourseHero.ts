import { ambassadorProgramhero, sponserhero } from "@/assets";

import type { HeroContent } from "@/shared/types/hero";


export const ResourcesHero: HeroContent = {
  headingLines: [
    { text: "The BJJ gear" },
    { text: "gear", },
    { text: "intelligence hub.", highlight: true },
  ],
  description: "Professional-grade resources for brand owners, academy managers and gear enthusiasts everything you need to choose, care for andbuild better combat sports gear.",
  primaryCta: { label: "Unlock your revenue stream ", href: "#apply" },
  visual: {
    type: "background",
    image: sponserhero,
    imageAlt: "Rokai ambassador athletes",
    position: { width: 1712, height: 600, top: 0, left: 0, opacity: 0.32 },
  },
  background: {
    bgColor: "#111111",
    heightPx: 600,
    glows: [
      { width: 315, height: 315, top: 167, left: 688, color: "#E51B2487", blur: 500 },
      { width: 329, height: 329, top: 383, left: 919, color: "#E51B2487", blur: 500 },
    ],
  },
};