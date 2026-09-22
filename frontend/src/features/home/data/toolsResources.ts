import { resourse1,resourse2 } from "@/assets";

export interface ToolResource {
  id: string;
  image: string;
  imageAlt: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  href: string;
}

export const toolsResourcesHeading = {
  eyebrow: "Combat Sports Product Systems",
  titleTop: "Choose Your",
  titleBottom: "Fightwear System.",
  description:
    "Build the right apparel range around your sport, buyer and brand requirements—from training essentials to competition-ready equipment.",
};

export const toolsResources: ToolResource[] = [
  {
    id: "training-apparel",
    image: resourse1,
    imageAlt: "ROKAI training apparel for academies and daily use",
    number: "01",
    title: "Training Apparel",
    subtitle: "Designed for Repeat Use.",
    description:
      "Durable, comfortable and brand-ready apparel for academies, gyms, teams and everyday training. Includes performance fabrics, reinforced construction and custom branding.",
    buttonText: "Explore Training Apparel",
    href: "/training-apparel-manufacturing/",
  },
  {
    id: "competition-fightwear",
    image: resourse2,
    imageAlt: "ROKAI competition fightwear built for performance",
    number: "02",
    title: "Competition Fightwear",
    subtitle: "Built for the Demands of Competition.",
    description:
      "Technical fightwear developed around mobility, performance, athlete use and competition requirements. Includes lightweight construction, mobility-focused cuts and competition-ready development.",
    buttonText: "Explore Competition Fightwear",
    href: "/competition-fightwear-manufacturing/",
  },
];