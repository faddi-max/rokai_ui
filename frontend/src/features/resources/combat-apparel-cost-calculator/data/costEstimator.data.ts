export type Option = { value: string; label: string; factor?: number };

export const productTypes: Option[] = [
  { value: "mma-shorts", label: "MMA Shorts", factor: 9 },
  { value: "rashguard", label: "Rash Guards", factor: 8 },
  { value: "bjj-gi", label: "BJJ Gis", factor: 32 },
  { value: "spats", label: "Spats / Leggings", factor: 10 },
  { value: "hoodie", label: "Hoodies & Teamwear", factor: 18 },
];

export const styleOptions: Option[] = [
  { value: "1", label: "1 style", factor: 1 },
  { value: "2", label: "2 styles", factor: 1.04 },
  { value: "3", label: "3 styles", factor: 1.08 },
  { value: "4+", label: "4+ styles", factor: 1.14 },
];

export const sizeRanges: Option[] = [
  { value: "standard", label: "Standard (XS–2XL)", factor: 1 },
  { value: "extended", label: "Extended (XS–4XL)", factor: 1.05 },
  { value: "youth", label: "Youth + Adult", factor: 1.08 },
];

export const fabrics: Option[] = [
  { value: "polyester", label: "Polyester performance", factor: 1 },
  { value: "cotton", label: "Cotton blend", factor: 1.1 },
  { value: "ripstop", label: "Ripstop", factor: 1.18 },
  { value: "pearl", label: "Pearl weave cotton", factor: 1.3 },
];

export const fabricWeights: Option[] = [
  { value: "light", label: "Lightweight", factor: 0.92 },
  { value: "standard", label: "Standard weight", factor: 1 },
  { value: "heavy", label: "Heavyweight", factor: 1.15 },
];

export const qualityLevels: Option[] = [
  { value: "core", label: "Core Performance", factor: 1 },
  { value: "premium", label: "Premium", factor: 1.22 },
  { value: "elite", label: "Elite / Pro", factor: 1.5 },
];

// Customization: flat add-on per unit (USD)
export const decorationMethods: Option[] = [
  { value: "sublimation", label: "Sublimation print", factor: 1.2 },
  { value: "embroidery", label: "Embroidery", factor: 2.1 },
  { value: "screen", label: "Screen print", factor: 0.9 },
  { value: "heat", label: "Heat transfer", factor: 1.1 },
  { value: "none", label: "No decoration", factor: 0 },
];

export const complexities: Option[] = [
  { value: "standard", label: "Standard construction", factor: 1 },
  { value: "advanced", label: "Advanced construction", factor: 1.12 },
  { value: "technical", label: "Technical / reinforced", factor: 1.25 },
];

export const designLocations: Option[] = [
  { value: "1-2", label: "1–2 locations", factor: 1 },
  { value: "3-4", label: "3–4 locations", factor: 1.6 },
  { value: "5+", label: "5+ locations", factor: 2.3 },
];

export const specialTrims: Option[] = [
  { value: "none", label: "None", factor: 0 },
  { value: "reinforced", label: "Reinforced stitching", factor: 0.8 },
  { value: "custom-trims", label: "Custom trims / zippers", factor: 1.4 },
  { value: "patches", label: "Patches", factor: 1.1 },
];

// Branding & packaging: per-unit add-on (USD)
export const brandingOptions = [
  { value: "wovenLabel", label: "Woven label", cost: 0.25 },
  { value: "printedLabel", label: "Printed care label", cost: 0.12 },
  { value: "hangtag", label: "Custom hangtag", cost: 0.2 },
  { value: "polybag", label: "Individual polybag", cost: 0.1 },
  { value: "packaging", label: "Branded packaging", cost: 0.9 },
] as const;

export type BrandingKey = (typeof brandingOptions)[number]["value"];

// Destination: per-unit freight base (USD)
export const countries: Option[] = [
  { value: "us", label: "United States", factor: 1.1 },
  { value: "uk", label: "United Kingdom", factor: 0.95 },
  { value: "eu", label: "European Union", factor: 0.95 },
  { value: "ca", label: "Canada", factor: 1.15 },
  { value: "au", label: "Australia", factor: 1.3 },
  { value: "ae", label: "United Arab Emirates", factor: 0.7 },
];

export const shippingPrefs: Option[] = [
  { value: "standard", label: "Standard freight estimate", factor: 1 },
  { value: "express", label: "Express courier", factor: 2.2 },
  { value: "sea", label: "Sea freight (bulk)", factor: 0.6 },
];

export const timelines: Option[] = [
  { value: "flexible", label: "Flexible timeline", factor: 1 },
  { value: "standard", label: "Standard timeline", factor: 1.04 },
  { value: "rush", label: "Rush production", factor: 1.18 },
];

export const currencies = [
  { value: "USD", label: "USD ($)", symbol: "$", rate: 1 },
  { value: "EUR", label: "EUR (€)", symbol: "€", rate: 0.92 },
  { value: "GBP", label: "GBP (£)", symbol: "£", rate: 0.79 },
  { value: "AED", label: "AED (د.إ)", symbol: "AED ", rate: 3.67 },
] as const;

export const MIN_QTY = 50;

/**
 * PLACEHOLDER ASSUMPTIONS — every number in this file is illustrative.
 * Replace with approved ROKAI pricing logic before publishing.
 */
export const WHOLESALE_MARKUP = 1.4;
export const RETAIL_MULTIPLIER = 2.2;