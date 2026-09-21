import {
  manufactureGlovesImage,
  manufactureGiImage,
  manufactureRashguardImage,
  manufactureShortsImage,
} from "@/assets";

export interface ManufactureProduct {
  id: string;
  image: string;
  alt: string;
  title: string;
  tags: string[];
}

export const whatWeManufactureHeading = {
  eyebrow: "What We Manufacture",
  titleTop: "COMBAT SPORT",
  titleBottom: "GEAR.",
  description:
    "Custom combat apparel engineered for brands, teams and athletes.",
};

export const manufactureProducts: ManufactureProduct[] = [
  {
    id: "gloves",
    image: manufactureGlovesImage,
    alt: "Rokai MMA gloves",
    title: "BJJ APPAREL",
    tags: ["GI", "NO-GI", "RASHGUARDS"],
  },
  {
    id: "gi",
    image: manufactureGiImage,
    alt: "Rokai BJJ gi",
    title: "TRAINING WEAR",
    tags: ["RASHGUARDS", "SHORTS", "SPATS"],
  },
  {
    id: "rashguard",
    image: manufactureRashguardImage,
    alt: "Rokai rashguard",
    title: "TEAMWEAR",
    tags: ["UNIFORMS", "GEARBAGS", "TRACKSUITS"],
  },
  {
    id: "shorts",
    image: manufactureShortsImage,
    alt: "Rokai fight shorts",
    title: "FIGHT GEAR",
    tags: ["SHORTS", "GLOVES", "HEADGUARDS"],
  },
];