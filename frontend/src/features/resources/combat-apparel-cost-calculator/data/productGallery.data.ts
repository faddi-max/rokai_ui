import {
  Asterisk,
  ArrowRight,
  ArrowUpRight,
  Diamond,
  LayoutGrid,
  Package,
  type LucideIcon,
} from "lucide-react";

import * as assets from "@/assets";

/* -------------------------------------------------------------------------- */
/*  Safe asset lookup                                                         */
/*  A namespace import does not throw when an export is missing, unlike a     */
/*  named import. Missing names fall back to the placeholder instead of       */
/*  breaking the whole module graph.                                          */
/* -------------------------------------------------------------------------- */

const assetMap = assets as unknown as Record<string, string | undefined>;

const PLACEHOLDER_KEY = "galleryPlaceholder";

function img(name: string): string {
  const src = assetMap[name];

  if (!src) {
    if (import.meta.env.DEV) {
      console.warn(
        `[productGallery] "${name}" is not exported from @/assets. Using placeholder.`
      );
    }
    return assetMap[PLACEHOLDER_KEY] ?? "";
  }

  return src;
}

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export interface GalleryItem {
  id: string;
  label: string;
  image: string;
  imageAlt: string;
}

export interface KeyFeature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

/* -------------------------------------------------------------------------- */
/*  Gallery                                                                   */
/* -------------------------------------------------------------------------- */

export const galleryItems: GalleryItem[] = [
  { id: "mma-shorts", label: "MMA Shorts", image: img("galleryMmaShorts"), imageAlt: "Custom MMA shorts" },
  { id: "boxing-shorts", label: "Boxing Shorts", image: img("galleryBoxingShorts"), imageAlt: "Custom boxing shorts" },
  { id: "rash-guards", label: "Rash Guards", image: img("galleryRashGuards"), imageAlt: "Custom rash guard" },
  { id: "compression-wear", label: "Compression Wear", image: img("galleryCompression"), imageAlt: "Compression wear" },
  { id: "training-shirts", label: "Training Shirts", image: img("galleryTrainingShirts"), imageAlt: "Training shirts" },
  { id: "fightwear-sets", label: "Fightwear Sets", image: img("galleryFightwearSets"), imageAlt: "Fightwear sets" },
  { id: "custom-apparel", label: "Custom Apparel", image: img("galleryCustomApparel"), imageAlt: "Custom apparel hoodie" },
];

/* -------------------------------------------------------------------------- */
/*  Key features                                                              */
/* -------------------------------------------------------------------------- */

export const keyFeatures: KeyFeature[] = [
  {
    id: "product-cost",
    icon: LayoutGrid,
    title: "Product cost estimation",
    description: "Estimate manufacturing costs by garment and quantity.",
  },
  {
    id: "fabric-quality",
    icon: Diamond,
    title: "Fabric & quality selection",
    description: "Compare material, weight and quality assumptions.",
  },
  {
    id: "customization",
    icon: Asterisk,
    title: "Customization planning",
    description: "Include decoration, trims and construction complexity.",
  },
  {
    id: "branding",
    icon: Package,
    title: "Branding & packaging",
    description: "Account for labels, hangtags and packaging choices.",
  },
  {
    id: "landed-cost",
    icon: ArrowRight,
    title: "Landed-cost estimate",
    description: "Model delivery preferences and destination assumptions.",
  },
  {
    id: "pricing",
    icon: ArrowUpRight,
    title: "Pricing scenarios",
    description: "Review wholesale, retail and illustrative gross margin.",
  },
];