export type TrustIconKey = "factory" | "development" | "production" | "delivery";

export type TrustBlock = {
  icon: TrustIconKey;
  title: string;
  description: string;
};


export const heroTrustBlocks: TrustBlock[] = [
  {
    icon: "factory",
    title: "Direct manufacturer",
    description: "Factory-direct B2B production",
  },
  {
    icon: "development",
    title: "Custom development",
    description: "From specification to approved sample",
  },
  {
    icon: "production",
    title: "Scalable production",
    description: "Built for repeat and bulk orders",
  },
  {
    icon: "delivery",
    title: "Global delivery",
    description: "Serving international buyers",
  },
];