import { heroMain, avatar1, avatar2, avatar3, avatar4 } from "@/assets";
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


  secondaryRow: {
    type: "join",
    avatars: [avatar1, avatar2, avatar3, avatar4],
    joinText: "Join 100+ academies and brands growing with ROKAI",
  },

  visual: {
    type: "background",
    image: heroMain,
    imageAlt: "Custom hoodie manufactured by ROKAI, worn by a model",
    position: { width: 601, height: 901, top: 9, left: 783, opacity: 1 },
  },

  background: {
  
    heightPx: 910,
  
    glows: [],
  
    sectionClassName: "max-lg:!min-h-0",
  },
};
export const categoryHeroContent = heroContent;
