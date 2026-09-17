import { gi, gi1 } from "@/assets";

export interface GiSystemCard {
  id: string;
  image: string;
  imageAlt: string;
  titleHighlight: string;
  titleRest: string;
  description: string;
  designedFor: string[];
  keyFeatures: string[];
  ctaLabel: string;
  ctaHref: string;
  tag: string;
}

export interface GiSystemsData {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  sideDescription: string;
  cards: GiSystemCard[];
}

export const giSystemsData: GiSystemsData = {
  eyebrow: "Custom BJJ Gi Collection",
  headingLine1: "Choose Your",
  headingLine2: "Gi System.",
  sideDescription:
    "Two purpose-built Gi systems for everyday training and competition performance. Choose the build that fits your athletes, academy or brand.",
  cards: [
    {
      id: "training",
      image: gi,
      imageAlt: "Rokai training Gi fabric being prepared on production equipment",
      titleHighlight: "Training",
      titleRest: "BJJ GI",
      description:
        "Built for everyday training, academy use and reliable team uniform production.",
      designedFor: ["Academics", "Regular Sparring", "Team Uniforms"],
      keyFeatures: ["Reinforced construction", "Breathable fabrics", "Custom branding"],
      ctaLabel: "Explore Trainings GIS",
      ctaHref: "/gi-systems/training",
      tag: "Everyday Trainings",
    },
    {
      id: "competition",
      image: gi1,
      imageAlt: "Rokai competition Gi being packed and inspected in a warehouse",
      titleHighlight: "Competition",
      titleRest: "BJJ GI",
      description:
        "Engineered for tournament performance, mobility and competition-ready construction.",
      designedFor: ["IBJJF Athletes", "Tournaments", "Performance Teams"],
      keyFeatures: ["Lightweight fabric", "Mobility-focused cut", "Competition-ready build"],
      ctaLabel: "Explore Competition GIS",
      ctaHref: "/gi-systems/competition",
      tag: "Competition",
    },
  ],
};
