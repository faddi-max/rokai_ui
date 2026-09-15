import { competitionGiCategoryImage, trainingGiCategoryImage } from "@/assets";

export type Category = {
  id: string;
  image: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
};

export const categories: Category[] = [
  {
    id: "training-gis",
    image: trainingGiCategoryImage,
    title: "BJJ Training GIs",
    description:
      "Premium Bjj Training Gis And Jiu Jitsu Uniforms Built For Daily Grind Durable, Comfort Driven Bjj Apparel Designed For Bjj Academies And Teams",
    buttonLabel: "BJJ Competition GIs",
    buttonHref: "#training-gis",
  },
  {
    id: "competition-gis",
    image: competitionGiCategoryImage,
    title: "BJJ Competition GIs",
    description:
      "Premium Bjj Training Gis And Jiu Jitsu Uniforms Built For Daily Grind Durable, Comfort Driven Bjj Apparel Designed For Bjj Academies And Teams",
    buttonLabel: "Explore Private Label Options",
    buttonHref: "#competition-gis",
  },
];
