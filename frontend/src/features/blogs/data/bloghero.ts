import { blogcatagory, bloghero } from "@/assets";
import { HeroContent } from "@/shared/types/hero";

export const heroContent: HeroContent = {
  headingLines: [
    { text: "EXPLORE" },
    { text: "OUR" },
    { text: "CATEGORIES", highlight: true },
  ],
  description: "Explore different categories to find content that matches your interests and needs.",
  visual: {
    type: "background",
    image: bloghero,
    imageAlt: "Rokai BJJ gi",
    position: { width: 1250, height: 612, top: -25, left: 365, opacity: 0.6, angle: 0 },
  },
  subscribe: {
    placeholder: "Enter Your Email Address",
    buttonLabel: "Subscribe",
    onSubmit: (email) => console.log("subscribe:", email),
  },
};
export const blogCategories = [
  { image: blogcatagory, title: "BJJ Training" },
  { image: blogcatagory, title: "Performance" },
  { image: blogcatagory, title: "IBJJF Competition" },
];