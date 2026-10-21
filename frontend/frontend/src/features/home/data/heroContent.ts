import type { HeroContent } from "@/shared/types/hero";
import {
  HERO_JOIN_ROW,
  MODEL_HERO_BACKGROUND,
  MODEL_HERO_VISUAL,
} from "@/shared/config/modelHeroLayout";

// Copy is home-specific; layout (model image, avatars, 910px height) comes from the shared Figma config.
export const heroContent: HeroContent = {
  eyebrow: "B2B Combat Sports Apparel Manufacturing",
  headingLines: [
    { text: "Custom combat sports apparel" },
    { text: "built around" },
    { text: "your brand.", highlight: true },
  ],
  description:
    "ROKAI develops and manufactures custom fightwear for combat sports brands, academies, gyms and teams, from product development and sampling to bulk production and worldwide delivery.",
  primaryCta: { label: "Start your project", href: "/contact" },
  secondaryCta: { label: "Explore manufacturing", href: "/custom-fightwear-manufacturing/" },
  secondaryRow: HERO_JOIN_ROW,
  visual: MODEL_HERO_VISUAL,
  background: MODEL_HERO_BACKGROUND,
};
