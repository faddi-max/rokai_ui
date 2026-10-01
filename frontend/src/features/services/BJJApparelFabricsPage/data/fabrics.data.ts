export interface FabricFocusArea {
  id: string;
  number: string;
  title: string;
  description: string;
  considerations: string[];
}

export const fabricFocusAreas: FabricFocusArea[] = [
  {
    id: "weight-and-structure",
    number: "01",
    title: "Weight & structure",
    description:
      "Compare fabric weight and construction with the garment design and its intended use.",
    considerations: ["Fabric weight", "GSM", "Construction"],
  },
  {
    id: "hand-feel-and-performance",
    number: "02",
    title: "Hand feel & performance",
    description:
      "Review the material's feel and performance requirements against the fit and movement of the product.",
    considerations: ["Hand feel", "Stretch", "Recovery"],
  },
  {
    id: "color-and-finishing",
    number: "03",
    title: "Color & finishing",
    description:
      "Check how colors, branding methods, and finishing details work with the selected material.",
    considerations: ["Color", "Branding", "Finishing"],
  },
];