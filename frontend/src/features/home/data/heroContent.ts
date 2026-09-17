import { avatar1, avatar2, avatar3, avatar4, heroMain } from "@/assets";
import type { HeroContent } from "@/shared/types/hero";

export const heroContent: HeroContent = {
  headingLines: [
    { text: "THE FIRST" },
    { text: "AI-INTEGRATED" },
    { text: "BJJ APPAREL" },
    { text: "MANUFACTURER", highlight: true },
  ],
  description: "Premium quality. Precision engineering. Built for academies. Trusted by brands.",
  primaryCta: { label: "Get Your Free Assessment", href: "#assessment" },
  secondaryCta: { label: "Get a Quote", href: "#quote" },
  secondaryRow: {
    type: "join",
    avatars: [avatar1, avatar2, avatar3, avatar4],
    joinText: "Join 100+ academies and brands growing with ROKAI",
  },
  visual: {
    type: "image",
    image: heroMain,
    imageAlt: "Rokai hoodie model",
  },
};
