

import { servicemanufacturehero } from "@/assets";
import type { HeroContent } from "@/shared/types/hero";

export const Privateservicehero: HeroContent = {
  headingLines: [
    { text: "BUILD YOUR OWN BJJ" },
    { text: "APPAREL BRAND.", highlight: true },
  ],
  description:
    "Professional-grade resources for brand owners, academy managers and gear enthusiasts everything you need to choose, care for and build better combat sports gear.",
  primaryCta: { label: "Start Your Project", href: "#apply" },
  secondaryCta: { label: "Request a Quote", href: "#quote" },
  featureTags: [
    "Custom Branding",
    "Low MOQ Options",
    "Quality Manufacturing",
    "Global Shipping",
  ],
  visual: {
   
    image: servicemanufacturehero,
    imageAlt: "Rokai BJJ athlete training at sunset",
    position: { width: 1712, height: 600, top: 0, left: 0, opacity: 1 },
  },
  brandCard: {
    title: "YOUR BRAND.",
    subtitle: "OUR MANUFACTURING EXPERTISE",
    bgColor: "#E63946",
    position: {
      width: 220,
      height: 101.02468872070312,
      top: 406.05,
      left: 780,
      angle: 0,
      opacity: 1,
      borderRadius: 10,
    },
  },
  background: {
    bgColor: "",
    heightPx: 600,
    glows: [
      { width: 315, height: 315, top: 167, left: 688, color: "#E51B2487", blur: 500 },
      { width: 329, height: 329, top: 383, left: 919, color: "#E51B2487", blur: 500 },
    ],
  },
};
