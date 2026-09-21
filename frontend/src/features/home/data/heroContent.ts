import { heroMain } from "@/assets";
import type { HeroContent } from "@/shared/types/hero";

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

  visual: {
    type: "image",
    image: heroMain,
    imageAlt: "Custom hoodie manufactured by ROKAI, worn by a model", 
  },
};