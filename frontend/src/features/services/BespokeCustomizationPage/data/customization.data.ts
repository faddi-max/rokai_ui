import {
  customizationShort,
  customizationGi,
  customizationRushguard,
} from "@/assets";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export type CustomizationFilter =
  | "all"
  | "embroidery"
  | "patches"
  | "printing"
  | "labels"
  | "customization";

export interface CalloutPoint {
  /**
   * % of the product STAGE box (0-100).
   * Values below 0 or above 100 sit outside the box (used for label dots).
   */
  x: number;
  y: number;
}

export interface CustomizationCallout {
  label: string;
  sublabel: string;
  /** which side of the dot the text sits on */
  side: "left" | "right";
  /** dot next to the label (usually outside the box) */
  dot: CalloutPoint;
  /** where the stick ends on the product */
  target: CalloutPoint;
}

export interface CustomizationGuide {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface CustomizationOption {
  id: string;
  title: string;
  description: string;
  tag: string;
  filter: Exclude<CustomizationFilter, "all">;
}

/** One image of a category slider (API `images[]`). */
export interface CustomizationSlide {
  id: string;
  src: string;
  /** API labels for this image (e.g. SCREEN PRINTING, HEAT TRANSFER) */
  points: string[];
}

export interface CustomizationCategory {
  id: string;
  /** text shown on the top slider button, e.g. "BJJ GI" */
  tabLabel: string;
  categoryLabel: string;
  titleWhite: string;
  titleRed: string;
  image: string;
  imageAlt: string;
  /** Figma stage width in px (max width, shrinks on small screens) */
  width: number;
  /** Figma stage ratio "width/height" (e.g. "624.76/1143") */
  aspectRatio: string;
  /** "contain" = image never cropped (default), "cover" = fills and crops */
  objectFit?: "contain" | "cover";
  objectPosition?: string;
  /** x,y callouts: they belong to the FIRST image only */
  callouts: CustomizationCallout[];
  guides?: CustomizationGuide[];
  options: CustomizationOption[];
  /** All images for the per-category slider (first = main image) */
  slides?: CustomizationSlide[];
}

export interface CustomizationFilterItem {
  id: CustomizationFilter;
  label: string;
}

/** Item in the top slider. Several items can point to the same category. */
export interface CustomizationSliderItem {
  /** unique key of the slider button */
  key: string;
  label: string;
  /** id of the category block to scroll to */
  targetId: string;
}

/* -------------------------------------------------------------------------- */
/*  Filters                                                                   */
/* -------------------------------------------------------------------------- */

export const customizationFilters: CustomizationFilterItem[] = [
  { id: "all", label: "All" },
  { id: "embroidery", label: "Embroidery" },
  { id: "patches", label: "Patches" },
  { id: "printing", label: "Printing" },
  { id: "labels", label: "Labels" },
  { id: "customization", label: "Customization" },
];

/* -------------------------------------------------------------------------- */
/*  Options (shared across categories for now)                                */
/* -------------------------------------------------------------------------- */

const opt = (
  id: string,
  title: string,
  description: string,
  tag: string,
  filter: CustomizationOption["filter"]
): CustomizationOption => ({ id, title, description, tag, filter });

const sharedOptions: CustomizationOption[] = [
  opt("direct-embroidery", "Direct Embroidery", "Logo stitched directly onto the fabric for a premium finish.", "Embroidery · Durable branding", "embroidery"),
  opt("embroidery-patches", "Embroidery Patches", "Separate embroidered patches applied to any placement.", "Patches · Custom placement", "patches"),
  opt("woven-patches", "Woven Patches", "Fine-detail woven patches with a clean, flat edge.", "Patches · Fine detail", "patches"),
  opt("sublimation-patches", "Sublimation Patches", "Full-colour printed patches with unlimited colours.", "Patches · Full colour", "patches"),
  opt("screen-printing", "Screen Printing", "Bold, long-lasting prints for logos and lettering.", "Printing · Long-lasting", "printing"),
  opt("heat-transfer", "Heat Transfer Printing", "Sharp, lightweight transfers for complex artwork.", "Printing · Lightweight", "printing"),
  opt("rubber-pvc-patches", "Rubber / PVC Patches", "Soft-touch raised patches with strong durability.", "Patches · Water resistant", "patches"),
  opt("woven-labels", "Woven Labels", "Custom woven neck and hem labels.", "Labels · Brand identity", "labels"),
  opt("printed-labels", "Printed Labels", "Printed care and size labels for every unit.", "Labels · Care & size", "labels"),
  opt("custom-stitching", "Custom Stitching", "Contrast stitching colours and reinforced seams.", "Customization · Construction", "customization"),
  opt("fabric-customization", "Fabric Customization", "Choose fabric weight, weave and finish.", "Customization · Materials", "customization"),
  opt("color-customization", "Color Customization", "Custom colours matched to your brand palette.", "Customization · Brand match", "customization"),
  opt("custom-drawstrings", "Custom Drawstrings", "Branded drawstrings in custom colours and ends.", "Customization · Details", "customization"),
  opt("inner-lining-prints", "Inner Lining Prints", "Hidden prints and details inside the garment.", "Printing · Inner detail", "printing"),
  opt("custom-packaging", "Custom Packaging", "Branded bags, boxes and inserts.", "Customization · Packaging", "customization"),
];

/* -------------------------------------------------------------------------- */
/*  Categories                                                                */
/* -------------------------------------------------------------------------- */

export const customizationCategories: CustomizationCategory[] = [
  /* ---------- 01: BJJ Gi  (Figma 624.76 x 1143, asset 1024 x 1520) ---------- */
  {
    id: "bjj-gi",
    tabLabel: "BJJ GI",
    categoryLabel: "Category 01",
    titleWhite: "BJJ Gi",
    titleRed: "Customization",
    image: customizationRushguard,
    imageAlt: "ROKAI custom BJJ gi",
    width: 624.76,
    aspectRatio: "624.76/1143",
    objectFit: "contain",
    callouts: [
      { label: "Direct Embroidery", sublabel: "Right Chest", side: "left",
        dot: { x: -20, y: 17 }, target: { x: 37, y: 23.9 } },
      { label: "Embroidery Patch", sublabel: "Left Sleeve", side: "left",
        dot: { x: -14, y: 31 }, target: { x: 21, y: 26 } },
      { label: "Custom Fabrics", sublabel: "Pant Upper Thigh", side: "left",
        dot: { x: -12, y: 56 }, target: { x: 38, y: 58.9 } },
      { label: "Sublimation Patch", sublabel: "Back", side: "right",
        dot: { x: 118, y: 12 }, target: { x: 65, y: 23.2 } },
      { label: "Woven Patch", sublabel: "Right Sleeves", side: "right",
        dot: { x: 122, y: 22 }, target: { x: 79, y: 26.1 } },
      { label: "Woven Label", sublabel: "Lower Jacket Hem", side: "right",
        dot: { x: 118, y: 42 }, target: { x: 70, y: 49.2 } },
      { label: "Patch Replacement", sublabel: "Pant Lower Leg", side: "right",
        dot: { x: 112, y: 76 }, target: { x: 70.5, y: 82.9 } },
    ],
    options: sharedOptions,
  },

  /* ---------- 02: BJJ Rushguard  (Figma 669 x 1011, asset 1165 x 1350) ---------- */
  {
    id: "bjj-rushguard",
    tabLabel: "BJJ RUSHGUARDS",
    categoryLabel: "Category 02",
    titleWhite: "BJJ Rushguard",
    titleRed: "Customization",
    image: customizationGi,
    imageAlt: "ROKAI custom BJJ rushguard",
    width: 669,
    aspectRatio: "669/1011",
    objectFit: "contain",
    callouts: [
      { label: "Direct Embroidery", sublabel: "Right Chest", side: "left",
        dot: { x: -20, y: 20 }, target: { x: 48, y: 33.9 } },
      { label: "Embroidery Patch", sublabel: "Left Sleeves", side: "left",
        dot: { x: -14, y: 52 }, target: { x: 8, y: 62.8 } },
      { label: "Woven Patch", sublabel: "Right Sleeves", side: "right",
        dot: { x: 122, y: 22 }, target: { x: 89, y: 36.7 } },
      { label: "Woven Label", sublabel: "Lower Jacket Hem", side: "right",
        dot: { x: 118, y: 72 }, target: { x: 64, y: 82.7 } },
    ],
    options: sharedOptions,
  },

  /* ---------- 03: BJJ Grappling Short (unchanged, was OK) ---------- */
  {
    id: "grappling-short",
    tabLabel: "BJJ GRAPPLING SHORT",
    categoryLabel: "Category 03",
    titleWhite: "BJJ Grappling Short",
    titleRed: "Customization",
    image: customizationShort,
    imageAlt: "ROKAI custom BJJ grappling short",
    width: 432,
    aspectRatio: "906/1090",
    objectFit: "cover",
    objectPosition: "50% 38%",
    callouts: [
      { label: "Direct Embroidery", sublabel: "Right Chest", side: "left",
        dot: { x: -28, y: 10 }, target: { x: 30, y: 17 } },
      { label: "Embroidery Patch", sublabel: "Left Sleeves", side: "left",
        dot: { x: -14, y: 35 }, target: { x: 20, y: 38 } },
      { label: "Woven Patch", sublabel: "Right Sleeves", side: "right",
        dot: { x: 118, y: 12 }, target: { x: 84, y: 25 } },
      { label: "Woven Label", sublabel: "Lower Jacket Hem", side: "right",
        dot: { x: 120, y: 62 }, target: { x: 80, y: 64 } },
    ],
    options: sharedOptions,
  },
];

/* -------------------------------------------------------------------------- */
/*  Top slider (temporary: the same 3 items repeated until real data exists)  */
/* -------------------------------------------------------------------------- */

export const customizationSliderItems: CustomizationSliderItem[] = [1, 2].flatMap((round) =>
  customizationCategories.map((c) => ({
    key: `${c.id}-${round}`,
    label: c.tabLabel,
    targetId: c.id,
  }))
);