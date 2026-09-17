import { herocatagory } from "@/assets";
import type { HeroContent } from "@/shared/types/hero";

export const categoryHeroContent: HeroContent = {
  headingLines: [
    { text: "CUSTOM JIU" },
    { text: "JITSU" },
    { text: "GIS BUILT TO PERFORM.", highlight: true },
  ],
  description: "Custom BJJ Gis engineered for performance, durability and your brand.",
  primaryCta: { label: "Get Your Free Assessment", href: "#assessment" },
  secondaryCta: { label: "Get a Quote", href: "#quote" },
  secondaryRow: {
    type: "badges",
    badges: [
      { value: "96%", label: "Client Satisfaction" },
      { value: "5+", label: "Years Experience" },
      { value: "800+", label: "Products Developed" },
      { value: "24/7", label: "Client Support" },
    ],
  },
  visual: {
    type: "image",
    image: herocatagory,
    imageAlt: "ROKAI custom Jiu-Jitsu gi",
  },
  background: {
    glows: [
      { width: 640, height: 880, top: 10, left: 800, color: "#E51B24B3", blur: 500 },
      { width: 300, height: 300, top: 170, left: 760, color: "#E51B247A", blur: 500 },
    ],
  },
};
