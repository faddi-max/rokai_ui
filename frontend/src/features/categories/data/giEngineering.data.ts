import { group } from "@/assets";

export interface GiCallout {
  label: string;
  /** % from left, matching the dot position baked into the source image */
  x: number;
  /** % from top, matching the dot position baked into the source image */
  y: number;
  /** which side of the dot the label text sits on */
  side: "left" | "right";
}

export interface GiEngineeringImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface GiEngineeringData {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  headingLine3: string;
  sideDescription: string;
  callouts: GiCallout[];
  image: GiEngineeringImage;
}

export const giEngineeringData: GiEngineeringData = {
  eyebrow: "Custom Gi Engineering",
  headingLine1: "Engineered For",
  headingLine2: "Performance.",
  headingLine3: "Built Around Your Brand.",
  sideDescription:
    "From fabric to final stitching, Rokai controls every stage of custom Gi production delivering consistent performance, precise branding and scalable quality.",
  callouts: [
    { label: "Double-Layered Knees", x: 25.2, y: 22.9, side: "left" },
    { label: "Side Slit Strength", x: 79.4, y: 32.4, side: "right" },
    { label: "Reinforced Lapel", x: 21.6, y: 62.7, side: "left" },
    { label: "Contrast Stitching", x: 70.8, y: 69.8, side: "right" },
  ],
  image: {
    src: group,
    alt: "Rokai custom BJJ gi with construction callouts",
    width: 1178,
    height: 976,
  },
};