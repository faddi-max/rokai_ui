export type Category = {
  id: string;
  image: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
  imageAlt: string;
  slug?: string;
  parent_id?: number | string | null;
  level?: number;
  children?: Category[];
};

import {
  catagoriespage1,
  catagoriespage2,
 
} from "@/assets";

export const categories: Category[] = [
  {
    id: "training-gis",
    image: catagoriespage1,
    imageAlt: "Custom BJJ training gi",
    title: "BJJ Training Gis",
    description:
      "Custom training gis built for daily use, with reinforced stitching, breathable fabric and long-lasting comfort for academies, athletes and BJJ brands.",
    buttonLabel: "Start Your Gi Line",
    buttonHref: "/bjj-apparel-manufacturing/#training-gis",
  },
  {
    id: "competition-gis",
    image: catagoriespage2,
    imageAlt: "Custom BJJ competition gi",
    title: "IBJJF Competition Gis",
    description:
      "Lightweight, performance-focused competition gis developed around your specifications and the demands of competition.",
    buttonLabel: "Design Competition Ready Gi",
    buttonHref: "/bjj-apparel-manufacturing/#competition-gis",
  },
  {
    id: "mma-fightwear",
    image: catagoriespage1,
    imageAlt: "Custom MMA fightwear",
    title: "MMA Fightwear",
    description:
      "Performance-focused shorts, rash guards and training apparel developed for MMA gyms, teams and brands.",
    buttonLabel: "Explore MMA Fightwear",
    buttonHref: "/mma-fightwear-manufacturing/",
  },
  {
    id: "boxing-apparel",
    image: catagoriespage2,
    imageAlt: "Custom boxing apparel",
    title: "Boxing Apparel",
    description:
      "Custom boxing apparel developed for training, teams, gyms and fightwear brands.",
    buttonLabel: "Explore Boxing Apparel",
    buttonHref: "/boxing-apparel-manufacturing/",
  },
  {
    id: "muay-thai-kickboxing",
    image: catagoriespage1,
    imageAlt: "Custom Muay Thai and kickboxing fightwear",
    title: "Muay Thai & Kickboxing",
    description:
      "Custom fightwear developed for movement, durability, identity and team use.",
    buttonLabel: "Explore Fightwear",
    buttonHref: "/muay-thai-kickboxing-apparel/",
  },
  {
    id: "wrestling-apparel",
    image: catagoriespage2,
    imageAlt: "Custom wrestling apparel",
    title: "Wrestling Apparel",
    description:
      "Custom competition and training apparel for wrestling teams, clubs and organizations.",
    buttonLabel: "Explore Wrestling Apparel",
    buttonHref: "/wrestling-apparel-manufacturing/",
  },
];