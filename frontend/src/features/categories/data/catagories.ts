import { catagoriespage1, catagoriespage2 } from "@/assets";
import type { Category } from "@/features/home/data/categories";

export const categories: Category[] = [
  {
    id: "training-gis",
    image: catagoriespage1,
    title: "BJJ Training GIs",
    description:
      "Built For Daily Training & Durability Designed To Handle Intense Sessions With Reinforced Stitching, Breathable Fabric, And Long-Lasting Comfort For Everyday Use.",
    buttonLabel: "Start Your Gi Line",
    buttonHref: "#training-gis",
  },
  {
    id: "competition-gis",
    image: catagoriespage2,
    title: "IBJJF Competition GIs",
    description:
      "Competition-Ready. IBJJF Compliant. Precision-Built To Meet IBJJF Standards With Lightweight, Performance-Focused Construction For Peak Competition Performance.",
    buttonLabel: "Design Competition Ready Gi",
    buttonHref: "#competition-gis",
  },
];