export interface LeadMagnetFormat {
  id: string;
  name: string;
  description: string;
  title: string;
  introduction: string;
  sections: string[];
  callToAction: string;
}

export const leadMagnetFormats: LeadMagnetFormat[] = [
  {
    id: "buying-guide",
    name: "Buying guide",
    description: "Help buyers compare gear and choose with confidence.",
    title: "The Academy Gear Buying Guide",
    introduction:
      "A practical guide for {{audience}} who want to make a more confident choice about their next team gear order.",
    sections: [
      "Compare fabric weight, weave, and intended use",
      "Choose fits and sizes for a whole team",
      "Plan a first order around your academy's needs",
    ],
    callToAction: "Get the gear guide",
  },
  {
    id: "launch-checklist",
    name: "Launch checklist",
    description: "Turn a new teamwear launch into clear next steps.",
    title: "The Teamwear Launch Checklist",
    introduction:
      "A step-by-step planning resource for {{audience}} preparing a smooth, well-organized teamwear launch.",
    sections: [
      "Set a launch timeline and gather team requirements",
      "Confirm artwork, garment details, and size needs",
      "Prepare ordering, delivery, and member updates",
    ],
    callToAction: "Send me the checklist",
  },
  {
    id: "sizing-guide",
    name: "Sizing guide",
    description: "Make uniform sizing easier for teams and academies.",
    title: "The Academy Uniform Sizing Guide",
    introduction:
      "A clear sizing resource for {{audience}} looking to make uniform selection simpler for every athlete.",
    sections: [
      "Collect accurate athlete measurements",
      "Understand fit preferences and size variations",
      "Organize a team size list before placing an order",
    ],
    callToAction: "Get the sizing guide",
  },
  {
    id: "product-comparison",
    name: "Product comparison",
    description: "Explain the differences between product options.",
    title: "The Fightwear Fabric Comparison",
    introduction:
      "A straightforward comparison for {{audience}} weighing fabric choices for training, competition, and everyday use.",
    sections: [
      "Compare common weaves and fabric weights",
      "Match fabric features to training needs",
      "Balance comfort, durability, and intended use",
    ],
    callToAction: "View the comparison",
  },
];

export const leadMagnetStudioSteps = [
  "Choose a format",
  "Define your audience",
  "Generate a content outline",
  "Share it to capture leads",
];
