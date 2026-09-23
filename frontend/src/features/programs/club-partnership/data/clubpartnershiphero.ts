import { ambassadorProgramhero, sponserhero } from "@/assets";

import type { HeroContent } from "@/shared/types/hero";


export const clubpartnershipHero: HeroContent = {
  headingLines: [
    { text: "ROKAI Club" },
    { text: "Revenue " },
    { text: "Partnership Program", highlight: true },
  ],
  description: "Build a premium apparel system for your academy without inventory,operational burden or unnecessary risk.",
  primaryCta: { label: "Start Your Partnership Journey", href: "#apply" },
  visual: {
    type: "background",
    image: sponserhero,
    imageAlt: "Rokai ambassador athletes",
    position: { width: 1612, height: 600, top: 0, left: 0, opacity: 0.32 },
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