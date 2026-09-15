import { engineeredBenchmarkImage } from "@/assets";

export interface FeatureItem {
  id: string;
  image: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
}

export const engineeredBenchmarkHeading = {
  titleTop: "ENGINEERED",
  titleBottom: "BENCHMARK",
  description:
    "Built to set the standard, every product is crafted for elite performance, durability, and consistent quality at scale.",
};

export const engineeredBenchmarkFeatures: FeatureItem[] = [
  {
    id: "flagship-fabrics",
    image: engineeredBenchmarkImage,
    title: "BJJ Flagships Fabrics",
    description:
      "Premium fabrics engineered for BJJ apparel, delivering unmatched durability, comfort, and performance for every roll.",
    ctaText: "Explore Fabrics",
    ctaHref: "#flagship-fabrics",
  },
  {
    id: "catalogue",
    image: engineeredBenchmarkImage,
    title: "Our Catalogue",
    description:
      "Discover a complete range of BJJ apparel, jiu jitsu gear and custom gear BJJ built for performance on and off the mats.",
    ctaText: "View Catalogue",
    ctaHref: "#catalogue",
  },
  {
    id: "customization",
    image: engineeredBenchmarkImage,
    title: "Bespoke & Customizations",
    description:
      "Create fully customized BJJ apparel and jiu jitsu uniforms with unique designs, branding and precision detailing.",
    ctaText: "Customize Now",
    ctaHref: "#customization",
  },
  {
    id: "size-guideline",
    image: engineeredBenchmarkImage,
    title: "Size Guideline",
    description:
      "Find the perfect fit with our easy to follow BJJ sizing guide for all apparel, uniforms and training gear.",
    ctaText: "Check Sizes",
    ctaHref: "#size-guideline",
  },
];
