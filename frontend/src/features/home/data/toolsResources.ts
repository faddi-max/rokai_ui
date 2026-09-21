import { resourse1, resourse2 } from "@/assets";

export interface ToolResource {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  href: string;
  image: string;
  imageAlt: string;
}

export const toolsResourcesHeading = {
  eyebrow: "Resources",
  titleTop: "TOOLS TO HELP",
  titleBottom: "YOU GROW.",
  description: "Practical resources for building your BJJ brand.",
};

export const toolsResources: ToolResource[] = [
  {
    id: "ai-academy-scorecard",
    number: "01",
    title: "AI ACADEMY",
    subtitle: "SCORE CARD",
    description:
      "Go from concept to premium custom apparel manufacturing in minutes. Our ecosystem automates design, tech-packs, and production tracking seamlessly.",
    buttonText: "Start Your Brand Now",
    href: "#ai-academy-scorecard",
    image: resourse1,
    imageAlt: "Rokai AI Academy score card dashboard on a desktop monitor",
  },
  {
    id: "rokai-brand-growth",
    number: "02",
    title: "ROKAI BRAND",
    subtitle: "GROWTH SCORE",
    description:
      "See how your cage score compares to the absolute top BJJ operations globally. Discover hidden gaps in your brand footprint, retention rate, and digital exposure.",
    buttonText: "Get My Free Scorecard",
    href: "#rokai-brand-growth",
    image: resourse2,
    imageAlt: "Rokai brand growth score dashboard on a desktop monitor",
  },
];