export interface FabricSwatch {
  id: string;
  label: string;
  /** Optional photo. When omitted, a CSS texture (see `texture`) is rendered. */
  image?: string;
  imageAlt: string;
  texture: "satin" | "spandex" | "nylon" | "knit";
}

export const fabricSwatches: FabricSwatch[] = [
  { id: "polyester", label: "Polyester", imageAlt: "Polyester fabric swatch", texture: "satin" },
  { id: "polyester-spandex", label: "Polyester Spandex", imageAlt: "Polyester spandex fabric swatch", texture: "spandex" },
  { id: "nylon-spandex", label: "Nylon Spandex", imageAlt: "Nylon spandex fabric swatch", texture: "nylon" },
  { id: "compression-knit", label: "Compression Knit", imageAlt: "Compression knit fabric swatch", texture: "knit" },
];

export interface BreakdownItem {
  id: string;
  label: string;
  value: string;
}

export const costBreakdownItems: BreakdownItem[] = [
  { id: "manufacturing", label: "Manufacturing cost", value: "Garment & production assumptions" },
  { id: "customization", label: "Customization", value: "Decoration, trims & branding" },
  { id: "shipping", label: "Shipping", value: "Delivery scenario assumption" },
  { id: "landed", label: "Landed cost", value: "Combined estimated cost" },
];

export interface PricingScenario {
  id: string;
  term: string;
  description: string;
}

export const pricingScenarios: PricingScenario[] = [
  { id: "unit", term: "Unit cost", description: "estimated cost per garment." },
  { id: "wholesale", term: "Wholesale range", description: "an illustrative pricing reference." },
  { id: "retail", term: "Retail scenario", description: "a sample direct-to-consumer price." },
  { id: "margin", term: "Gross margin", description: "an indicative margin before other business expenses." },
];

export interface CostFactor {
  id: string;
  letter: string;
  title: string;
  description: string;
}

export const costFactors: CostFactor[] = [
  { id: "specs", letter: "A", title: "Technical specifications", description: "Measurements, fit, patterns and construction details." },
  { id: "artwork", letter: "B", title: "Artwork & placement", description: "Print files, embroidery files, number of placements and color details." },
  { id: "size", letter: "C", title: "Size breakdown", description: "Size-range and quantity allocation across sizes." },
  { id: "material", letter: "D", title: "Material confirmation", description: "Exact fabric composition, weight, availability and finish." },
  { id: "volume", letter: "E", title: "Order volume", description: "Confirmed units per style, colorway and size." },
  { id: "shipping", letter: "F", title: "Shipping & duties", description: "Final delivery address, freight method and applicable import charges." },
];

export const quoteCta = {
  eyebrow: "Take the next step",
  title: "Ready to turn your idea into a product?",
  description:
    "Use your estimate as a starting point. Share your requirements with ROKAI to discuss specifications, production feasibility and an exact quotation.",
  label: "Request an exact quote",
  href: "/contact",
};
