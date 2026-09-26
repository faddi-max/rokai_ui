import { oemhero } from "@/assets";
import type { HeroContent } from "@/shared/types/hero";

export const oemHero: HeroContent = {
  headingLines: [
    { text: "BUILT FOR" },
    { text: "YOUR" },
    { text: "BRAND", highlight: true },
  ],
  description:
    "From product concept to production, Rokai OEM Manufacturing gives brands the infrastructure, engineering and quality control to build combat sports gear around their exact requirements.",
  primaryCta: { label: "Start Your Project", href: "#apply" },
  secondaryCta: { label: "Request a Quote", href: "#quote" },
  visual: {
    type: "background",
    image: oemhero,
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
    imageOverlay:
      "linear-gradient(148.35deg, rgba(230, 57, 70, 0.12) 0%, rgba(0, 0, 0, 0.1) 100%)",
    glows: [
      { width: 460, height: 460, top: 0, left: 580, color: "#E51B243D", blur: 260 },
    ],
  },
};
