import { ambassadorProgramhero } from "@/assets";

import type { HeroContent } from "@/shared/types/hero";


export const ambassadorHeroContent: HeroContent = {
  headingLines: [
    { text: "ROKAI" },
    { text: "AMBASSADOR", highlight: true },
    { text: "PROGRAM" },
  ],
  description: "Represent the Brand That Represents Champions",
  primaryCta: { label: "Start Your Partnership Journey", href: "#apply" },
  visual: {
    type: "background",
    image: ambassadorProgramhero,
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