import { costEstimatorHero } from "@/assets";

/* -------------------------------------------------------------------------- */
/*  Collection planner                                                        */
/* -------------------------------------------------------------------------- */

/** Numeric fields are strings so inputs can be edited freely. */
export interface PlannerProduct {
  id: string;
  name: string;
  sellingPrice: string;
  manufacturingCost: string;
  shippingCost: string;
  expectedUnits: string;
  paymentFeePct: string;
  packagingCost: string;
  otherVariableCost: string;
  adSpend: string;
}

export type PlannerField = Exclude<keyof PlannerProduct, "id" | "name">;

/** Grid order of the numeric inputs on each product card (4 per row). */
export const plannerFields: { key: PlannerField; label: string; max?: number }[] = [
  { key: "sellingPrice", label: "Selling price" },
  { key: "manufacturingCost", label: "Manufacturing / unit" },
  { key: "shippingCost", label: "Shipping / unit" },
  { key: "expectedUnits", label: "Expected units" },
  { key: "paymentFeePct", label: "Payment fee (%)", max: 100 },
  { key: "packagingCost", label: "Packaging / unit" },
  { key: "otherVariableCost", label: "Other variable / unit" },
  { key: "adSpend", label: "Ad spend allocation" },
];

export const MAX_PLANNER_PRODUCTS = 6;

export const DEFAULT_PLANNER_PRODUCTS: PlannerProduct[] = [
  {
    id: "p1",
    name: "MMA Shorts",
    sellingPrice: "55",
    manufacturingCost: "10",
    shippingCost: "6",
    expectedUnits: "350",
    paymentFeePct: "2.9",
    packagingCost: "1.5",
    otherVariableCost: "1",
    adSpend: "1500",
  },
  {
    id: "p2",
    name: "Rash Guard",
    sellingPrice: "60",
    manufacturingCost: "14",
    shippingCost: "6",
    expectedUnits: "250",
    paymentFeePct: "2.9",
    packagingCost: "1.5",
    otherVariableCost: "1",
    adSpend: "1200",
  },
];

/* -------------------------------------------------------------------------- */
/*  Inspiration cards                                                         */
/* -------------------------------------------------------------------------- */

export interface InspirationCard {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  /** CSS object-position so each card can frame a different part of the photo. */
  imagePosition?: string;
}

export const inspirationContent = {
  eyebrow: "Built around combat apparel",
  title: "Plan the products. Understand the numbers.",
  description:
    "Use product and brand visuals as inspiration while you model your selling price, unit economics and collection mix.",
};

export const inspirationCards: InspirationCard[] = [
  {
    id: "range",
    title: "Product range planning",
    description: "Model different apparel products and compare their profit potential.",
    image: costEstimatorHero,
    imageAlt: "ROKAI rash guard, shorts and gloves",
    imagePosition: "35% 40%",
  },
  {
    id: "brand",
    title: "Brand positioning",
    description: "Explore how premium positioning affects price, value and margin.",
    image: costEstimatorHero,
    imageAlt: "ROKAI branded fightwear collection",
    imagePosition: "35% 40%",
  },
  {
    id: "launch",
    title: "Launch readiness",
    description: "Plan what your first collection needs to deliver before you move forward.",
    image: costEstimatorHero,
    imageAlt: "ROKAI combat apparel ready for launch",
    imagePosition: "35% 40%",
  },
];
