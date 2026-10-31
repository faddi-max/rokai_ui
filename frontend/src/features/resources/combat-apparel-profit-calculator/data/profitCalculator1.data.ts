import {
  BarChart3,
  Layers,
  Megaphone,
  Percent,
  Scale,
  Target,
  type LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/*  NOTE: shape mirrors the other hero-style data files. If                   */
/*  CostEstimatorHero expects different prop names, rename the keys here.     */
/* -------------------------------------------------------------------------- */

export const profitHero = {
  eyebrow: "Combat apparel profit calculator",
  headingWhite: "Know your margin",
  headingRed: "before you launch",
  description:
    "Estimate revenue, costs and profit for your combat apparel collection so every order is planned around a healthy margin.",
  primaryCta: { label: "Start calculating", href: "#profit-calculator" },
  secondaryCta: { label: "How it works", href: "#how-it-works" },
};

/* -------------------------------------------------------------------------- */
/*  Calculator fields                                                         */
/* -------------------------------------------------------------------------- */

export interface ProfitField {
  name: "price" | "unitCost" | "quantity" | "marketing" | "feePct";
  label: string;
  hint: string;
  prefix?: string;
  suffix?: string;
  defaultValue: string;
}

export const profitFields: ProfitField[] = [
  { name: "price", label: "Selling price", hint: "Price per unit to your customer", prefix: "$", defaultValue: "60" },
  { name: "unitCost", label: "Unit cost", hint: "Production + shipping per unit", prefix: "$", defaultValue: "28" },
  { name: "quantity", label: "Quantity", hint: "Units in this collection", defaultValue: "200" },
  { name: "marketing", label: "Marketing budget", hint: "Total ad and launch spend", prefix: "$", defaultValue: "1500" },
  { name: "feePct", label: "Platform & payment fees", hint: "Percentage of revenue", suffix: "%", defaultValue: "5" },
];

/* -------------------------------------------------------------------------- */
/*  Key features  (titles/descriptions read from a low-res screenshot —       */
/*  verify copy against Figma)                                                */
/* -------------------------------------------------------------------------- */

export interface FeatureItem {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const keyFeatures = {
  eyebrow: "Understand this estimate",
  title: "Key features",
  description:
    "This product calculator helps estimate profit and make smarter decisions.",
  items: [
    { id: "profit", icon: BarChart3, title: "Profit forecasting", description: "Estimate gross and net profit." },
    { id: "margin", icon: Percent, title: "Contribution margin", description: "See the margin on every unit." },
    { id: "breakeven", icon: Target, title: "Break-even planning", description: "Find the units needed to break even." },
    { id: "portfolio", icon: Layers, title: "SKU portfolio", description: "Test the mix of products you launch." },
    { id: "roas", icon: Megaphone, title: "ROAS planning", description: "Estimate the return on your ad spend." },
    { id: "compare", icon: Scale, title: "Unit-wise comparison", description: "Compare per-unit profitability." },
  ] as FeatureItem[],
};

/* -------------------------------------------------------------------------- */
/*  Workflow                                                                  */
/* -------------------------------------------------------------------------- */

export const workflow = {
  eyebrow: "Simple workflow",
  title: "How to use the profit calculator",
  description:
    "Start with one product, enter realistic assumptions, then add other products for a collection view.",
  steps: [
    { number: "01", title: "Enter selling price", description: "Set the price you plan to charge per unit." },
    { number: "02", title: "Add product costs", description: "Include production, materials and shipping." },
    { number: "03", title: "Set marketing & fees", description: "Add ad spend and platform fees." },
    { number: "04", title: "Review & compare", description: "Check margin and break-even, then compare." },
  ],
};

/* -------------------------------------------------------------------------- */
/*  CTA                                                                       */
/* -------------------------------------------------------------------------- */

export const profitCta = {
  eyebrow: "Build with clarity",
  title: "Plan the launch. Protect your margin.",
  description:
    "Identify cost pressures, test pricing and compare the effect on profit before you commit to production.",
  buttonLabel: "Recalculate your plan",
  buttonHref: "#profit-calculator",
};