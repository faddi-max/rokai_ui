import { affiliateProgramhero } from "@/assets";
import type { HeroContent } from "@/shared/types/hero";

export const affiliateHeroContent: HeroContent = {
  headingLines: [
    { text: "TURN YOUR" },
    { text: "COMBAT SPORTS" },
    { text: "COMMUNITY INTO" },
    { text: "REVENUE.", highlight: true },
  ],
  description:
    "Recommend performance-driven BJJ apparel to your audience and earn commission on qualifying orders—backed by a manufacturing partner built for combat sports.",
  primaryCta: { label: "Become an affiliate", href: "#become-affiliate" },
  secondaryCta: { label: "See how it works", href: "#how-it-works" },
  visual: {
  type: "image",
  image: affiliateProgramhero,
  imageAlt: "Rokai affiliate program athlete",
  floatingBadges: [
    { value: "+80", label: "Coaches", position: { top: "33%", left: "17%" } },
    { value: "+1300", label: "Positive Reviews", position: { top: "21%", right: "15%" } },
    { value: "+1000", label: "Workout Videos", position: { bottom: "17%", left: "8%" } },
    { value: "+1500", label: "Trainers", position: { bottom: "18%", right: "15%" } },
  ],
},
  background: {
    glows: [
      { width: 640, height: 880, top: 10, left: 800, color: "#E51B24B3", blur: 500 },
      { width: 300, height: 300, top: 170, left: 760, color: "#E51B247A", blur: 500 },
    ],
  },
};