import { bloghero, capabilityCatalogueImage } from "@/assets";
import type { HeroContent } from "@/shared/types/hero";

export const catalogueHeroContent: HeroContent = {
  eyebrow: "ROKAI PRODUCT CATALOGUE",
  headingLines: [
    { text: "Explore" },
    { text: "Rokai"},
     { text: "catalogues", highlight: true },
  ],
  description:
    "Discover a complete range of BJJ apparel, jiu jitsu gear, and custom gear BJJ built for athletes and brands.",
  primaryCta: { label: "View Catalogues", href: "/contact" },
 
  visual: {
    type: "background",
    image: bloghero,
    imageAlt: "Rokai BJJ gi",
    position: { width: 1250, height: 412, top: -15, left: 365, opacity: 0.3, angle: 0 },
  },
};