import { catagoriespage1, catagoriespage2 } from "@/assets";
import type { Category } from "@/features/home/data/categories";

export const categories: Category[] = [
  {
    id: "training-gis",
    image: catagoriespage1,
    
    imageAlt: "Custom BJJ training gi",
    title: "BJJ Training Gis",
    description:
      "Custom training gis built for daily use, with reinforced stitching, breathable fabric and long-lasting comfort for academies, athletes and BJJ brands.",
    buttonLabel: "Start Your Gi Line",
    // Placeholder route: replace with the real page once it exists
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
];