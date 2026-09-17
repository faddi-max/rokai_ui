import { scalingBrandsImage } from "@/assets";

export interface WhyRokaiFeature {
  number: string;
  title: string;
  description: string;
}

export interface WhyRokaiCta {
  label: string;
  href: string;
}

export interface WhyRokaiImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface WhyRokaiData {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  sideDescription: string;
  features: WhyRokaiFeature[];
  cta: WhyRokaiCta;
  image: WhyRokaiImage;
}

export const whyRokaiData: WhyRokaiData = {
  eyebrow: "WHY ROKAI",
  headingLine1: "Your Partner For",
  headingLine2: "Custom BJJ Gis",
  sideDescription:
    "Custom Gi manufacturing for academies and brands built around quality, consistency and complete brand control.",
  features: [
    {
      number: "01",
      title: "Custom Development",
      description: "Fit, fabric & construction.",
    },
    {
      number: "02",
      title: "Brand Control",
      description: "Colors, patches & labels.",
    },
    {
      number: "03",
      title: "Scalable Production",
      description: "Consistent quality from samples to bulk.",
    },
  ],
  cta: {
    label: "See How we Build Your Brand",
    href: "/brand",
  },
  image: {
    src: scalingBrandsImage,
    alt: "Three BJJ athletes wearing white, black and blue Rokai custom gis",
    width: 730,
    height: 557,
  },
};