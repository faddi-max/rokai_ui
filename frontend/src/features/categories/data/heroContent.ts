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

  // Avatar row from the Figma hero
  secondaryRow: {
    type: "join",
    avatars: [avatar1, avatar2, avatar3, avatar4],
    joinText: "Join 100+ academies and brands growing with ROKAI",
  },

  // Figma: image 601 x 901 at top 9 / left 783, used as the hero background
  visual: {
    type: "background",
    image: heroMain,
    imageAlt: "Custom hoodie manufactured by ROKAI, worn by a model",
    position: { width: 601, height: 901, top: 9, left: 783, opacity: 1 },
  },

  background: {
    // Hero is 910px tall on desktop so the photo runs behind the full trust card.
    heightPx: 910,
    // No hero glows: the global site background image is the only backdrop.
    glows: [],
    // Inline min-height is 910 everywhere; drop it below lg so mobile isn't tall and empty.
    sectionClassName: "max-lg:!min-h-0",
  },
};