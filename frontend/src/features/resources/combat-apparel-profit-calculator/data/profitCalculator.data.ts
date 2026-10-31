import type { CostEstimatorTag } from "../../combat-apparel-cost-calculator/componets/CostEstimatorHero";

/* -------------------------------------------------------------------------- */
/*  Hero content                                                              */
/* -------------------------------------------------------------------------- */

export const profitHero = {
  eyebrow: "ROKAI Production Tools",
  titleWhite: "Know your numbers.",
  titleRed: "Grow your combat brand.",
  description:
    "Model your product economics before launch. Understand what remains after manufacturing, shipping, payment processing and advertising, then compare products or plan your complete initial collection.",
  tags: [
    { label: "Planning model only — results depend on your assumptions", active: true },
  ] satisfies CostEstimatorTag[],
};

/* -------------------------------------------------------------------------- */
/*  Form options                                                              */
/* -------------------------------------------------------------------------- */

export const profitCurrencies = [
  { value: "USD", label: "USD", symbol: "$" },
  { value: "EUR", label: "EUR", symbol: "€" },
  { value: "GBP", label: "GBP", symbol: "£" },
  { value: "AED", label: "AED", symbol: "AED " },
] as const;

export const planningPeriods = [
  { value: "monthly", label: "Monthly", noun: "month" },
  { value: "quarterly", label: "Quarterly", noun: "quarter" },
  { value: "yearly", label: "Yearly", noun: "year" },
  { value: "launch", label: "Launch / one-off drop", noun: "launch" },
] as const;

/* -------------------------------------------------------------------------- */
/*  Defaults                                                                  */
/* -------------------------------------------------------------------------- */

/** All numeric fields are kept as strings so inputs can be edited freely. */
export interface ProfitFormState {
  currency: string;
  sellingPrice: string;
  unitsSold: string;
  period: string;
  manufacturingCost: string;
  fulfillmentCost: string;
  packagingCost: string;
  otherVariableCost: string;
  paymentFeePct: string;
  paymentFeeFixed: string;
  adSpend: string;
  adOrders: string;
  fixedOpex: string;
  launchCosts: string;
  returnsPct: string;
  salesTaxPct: string;
}

export const PROFIT_DEFAULTS: ProfitFormState = {
  currency: "USD",
  sellingPrice: "65",
  unitsSold: "500",
  period: "monthly",
  manufacturingCost: "10",
  fulfillmentCost: "8",
  packagingCost: "1.5",
  otherVariableCost: "1",
  paymentFeePct: "2.9",
  paymentFeeFixed: "0.30",
  adSpend: "4000",
  adOrders: "200",
  fixedOpex: "2500",
  launchCosts: "500",
  returnsPct: "2",
  salesTaxPct: "0",
};
