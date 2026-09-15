import { engineeredBenchmarkImage, scalingBrandsImage } from "@/assets";

export interface ToolResource {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  href: string;
  image: string;
  imageAlt: string;
}

export const toolsResourcesHeading = {
  titleTop: "ROKAI TOOLS",
  titleBottom: "AND RESOURCES",
  description:
    "Gloves, Gis, Fit wear, Protective Gear, Training Equipment and More Fully Customization For Your Brand and Organization.",
};

export const toolsResources: ToolResource[] = [
  {
    id: "ai-academy-scorecard",
    title: "AI ACADEMY",
    subtitle: "SCORE CARD",
    description:
      "Go from concept to premium custom apparel manufacturing in minutes. Our ecosystem automates design, tech-packs, and production tracking seamlessly.",
    buttonText: "START YOUR BRAND NOW",
    href: "#ai-academy-scorecard",
    image: engineeredBenchmarkImage,
    imageAlt: "Rokai fabric specifications and material scorecard",
  },
  {
    id: "rokai-brand-growth",
    title: "ROKAI BRAND",
    subtitle: "GROWTH SCORE",
    description:
      "See how your cage score compares to the absolute top BJJ operations globally. Discover hidden gaps in your brand footprint, retention rate, and digital exposure.",
    buttonText: "GET MY FREE SCORECARD",
    href: "#rokai-brand-growth",
    image: scalingBrandsImage,
    imageAlt: "Rokai team representing a growing BJJ brand",
  },
];
