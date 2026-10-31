export interface UsageStep {
  id: string;
  number: string;
  title: string;
  description: string;
}

export const usageSteps: UsageStep[] = [
  {
    id: "select-product",
    number: "01",
    title: "Select your product",
    description:
      "Choose your combat apparel type, production quantity, number of styles and size range.",
  },
  {
    id: "fabric-quality",
    number: "02",
    title: "Choose fabric & quality",
    description:
      "Select a fabric family, fabric weight and quality level that best match your product brief.",
  },
  {
    id: "customization",
    number: "03",
    title: "Define customization",
    description:
      "Specify decoration, design locations, construction complexity and any special trims.",
  },
  {
    id: "brand-details",
    number: "04",
    title: "Add brand details",
    description:
      "Choose labels, hangtags, individual polybags and branded packaging requirements.",
  },
  {
    id: "delivery",
    number: "05",
    title: "Set delivery preferences",
    description:
      "Choose the destination, shipping preference and production timeline for your scenario.",
  },
  {
    id: "calculate",
    number: "06",
    title: "Calculate & review",
    description:
      "Generate the estimate, review the cost breakdown and compare unit and total costs.",
  },
  {
    id: "share-brief",
    number: "07",
    title: "Share your product brief",
    description:
      "Copy your selections or prepare an inquiry so the ROKAI team can review your requirements.",
  },
];