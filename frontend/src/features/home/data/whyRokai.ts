import { whyrokai } from "@/assets";
import type { LucideIcon } from "lucide-react";
import { PenTool, Settings2, Factory, PackageCheck } from "lucide-react";


export interface WhyRokaiFeature {
  id: string;
  number: string;
  icon: LucideIcon;
  title: string;
  items: string[];
}

export const whyRokai = {
  eyebrow: "WHY ROKAI",
  headingLine1: "FROM IDEA TO",
  headingHighlight: "PRODUCTION.",

  description: "End-to-end support for building better BJJ apparel.",

  whyrokai,
  mockupImageAlt: "Rokai BJJ gi product and concept development mockup",

  closingLine1: "We Are",
  closingHighlight: "PROBLEM SOLVER.",

  ctaLabel: "Explore Our Capabilities",
  ctaHref: "#capabilities",

  features: [
    {
      id: "design-development",
      number: "01",
      icon: PenTool,
      title: "DESIGN & DEVELOPMENT",
      items: ["Patterns", "Samples", "Prototyping"],
    },
    {
      id: "fit-quality",
      number: "02",
      icon: Settings2,
      title: "FIT & QUALITY",
      items: ["Custom Fittings", "Measurements", "Inspection", "Finishing"],
    },
    {
      id: "production",
      number: "03",
      icon: Factory,
      title: "PRODUCTION",
      items: ["Fabric Sourcing", "Material Selection", "Bulk Manufacturing"],
    },
    {
      id: "delivery",
      number: "04",
      icon: PackageCheck,
      title: "DELIVERY",
      items: ["Order Support", "Packaging", "Final Preparation"],
    },
  ] as WhyRokaiFeature[],
};