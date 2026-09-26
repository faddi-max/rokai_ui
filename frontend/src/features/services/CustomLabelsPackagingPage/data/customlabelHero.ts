import { customlabel, oemhero } from "@/assets";
import type { HeroContent } from "@/shared/types/hero";

export const oemHero: HeroContent = {
  headingLines: [
    { text: "YOUR BRAND." },
    { text: "YOUR IDENTITY." },
    { text: "OUR PRESENTATION.", highlight: true },
  ],
  description:
    "Custom labeling and packaging helps your products create a consistent brand experience from production to presentation.",
  primaryCta: { label: "Start Your Project", href: "#apply" },
  secondaryCta: { label: "Request a Quote", href: "#quote" },
  visual: {
    type: "background",
    image: customlabel,
    imageAlt: "OEM manufacturing specialist working with production equipment",
    position: { width: 482, height: 450, top: 20, left: 935, opacity: 1 },
  },
  brandCard: {
    title: "YOUR BRAND.",
    subtitle: "OUR MANUFACTURING EXPERTISE.",
    bgColor: "#E63946",
    position: {
      width: 220,
      height: 101,
      top: 406,
      left: 780,
      borderRadius: 10,
    },
  },
  background: {
    bgColor: "",
    heightPx: 560,
    glows: [
      { width: 460, height: 460, top: 0, left: 580, color: "#E51B243D", blur: 260 },
    ],
  },
};
