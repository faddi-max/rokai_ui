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
  eyebrow: "Product Development & R&D",
  titleTop: "Engineered for Performance.",
  titleBottom: "Built Around Your Brand.",
  description:
    "Every product starts with the details that matter: fabric, fit, construction, reinforcement, branding and intended use. Our development process turns your concept into a production-ready combat sports apparel system.",
};

export const engineeredBenchmarkFeatures: FeatureItem[] = [
  {
    id: "reinforced-construction",
    image: engineeredBenchmarkImage,
    title: "Reinforced Construction",
    description:
      "Sport-specific stitching and construction built to withstand daily training and competition use.",
    ctaText: "See How We Build",
    ctaHref: "/custom-fightwear-manufacturing/",
  },
  {
    id: "performance-fabrics",
    image: engineeredBenchmarkImage,
    title: "Performance Fabrics",
    description:
      "Fabrics selected around the intended use of each product, from training essentials to competition fightwear.",
    ctaText: "Explore Fabrics",
    ctaHref: "/custom-fightwear-manufacturing/",
  },
  {
    id: "precision-patterning",
    image: engineeredBenchmarkImage,
    title: "Precision Patterning",
    description:
      "Size-accurate cuts and production-ready patterns engineered for fit and mobility.",
    ctaText: "See Our Process",
    ctaHref: "/manufacturing-process/",
  },
  {
    id: "branding-accuracy",
    image: engineeredBenchmarkImage,
    title: "Branding Accuracy",
    description:
      "Custom colors, graphics, labels, patches and embroidery placed with precision across every unit.",
    ctaText: "Customize Your Brand",
    ctaHref: "/custom-fightwear-manufacturing/",
  },
];