import type { FAQItemData } from "@/shared/types/sections";

export interface ResourceDownload {
  id: string;
  title: string;
  format: string;
  fileSize: string;
  category: "Catalogs" | "Sizing" | "Tech Packs" | "Compliance";
  description: string;
  badge?: string;
}

export const downloadableResources: ResourceDownload[] = [
  {
    id: "catalog-2026",
    title: "2026 ROKAI OEM Catalog & Material Spec Sheet",
    format: "PDF Document",
    fileSize: "14.2 MB",
    category: "Catalogs",
    description:
      "Our full commercial catalog featuring technical weave breakdown, fabric weights, collar rubber cores, zipper and trim options, and volume pricing brackets.",
    badge: "Most Downloaded",
  },
  {
    id: "gi-sizing-matrix",
    title: "Comprehensive BJJ Gi Sizing & Pattern Grading Matrix",
    format: "PDF & XLS Sheet",
    fileSize: "2.8 MB",
    category: "Sizing",
    description:
      "Exact garment dimensions for Adult (A0-A5), Long/Husky variations, Female (F1-F4), and Youth (M00-M4) with pre-wash and post-wash shrinkage allowances.",
    badge: "Essential",
  },
  {
    id: "techpack-templates",
    title: "Blank Fightwear Vector Tech Pack Starter Pack",
    format: "Adobe Illustrator (.AI) & Vector PDF",
    fileSize: "24.5 MB",
    category: "Tech Packs",
    description:
      "Production-ready vector templates for BJJ Gis, rashguards, grappling shorts, and team hoodies with standardized seam callouts and dimension charts.",
    badge: "Designer Kit",
  },
  {
    id: "ibjjf-checklist",
    title: "IBJJF 2026 Tournament Uniform Compliance Checklist",
    format: "Printable PDF",
    fileSize: "1.6 MB",
    category: "Compliance",
    description:
      "A 1-page inspection guide covering collar thickness, sleeve clearance tolerances, allowable patch placements, and fabric weave legality rules.",
    badge: "Rulebook",
  },
  {
    id: "sublimation-swatch-guide",
    title: "Pantone to CMYK Dye-Sublimation Color Matching Chart",
    format: "PDF Swatch Book",
    fileSize: "8.4 MB",
    category: "Catalogs",
    description:
      "Calibrated color values for Italian sublimation inks ensuring zero discrepancy between screen mockups and physical compression rashguards.",
  },
  {
    id: "pro-shop-order-sheet",
    title: "Academy Pro Shop Order & Inventory Planning Calculator",
    format: "Excel (.XLSX) Spreadsheet",
    fileSize: "1.2 MB",
    category: "Sizing",
    description:
      "Automated spreadsheet for head coaches to calculate student size distributions, profit margins, and reorder triggers without stockouts.",
  },
];

export interface SizingRow {
  size: string;
  heightFt: string;
  heightCm: string;
  weightLbs: string;
  weightKg: string;
  recommendedFor: string;
}

export const sizingMatrixData: SizingRow[] = [
  { size: "A0", heightFt: "5'2\" - 5'5\"", heightCm: "157 - 165 cm", weightLbs: "115 - 140 lbs", weightKg: "52 - 63 kg", recommendedFor: "Rooster / Light Feather" },
  { size: "A1", heightFt: "5'5\" - 5'8\"", heightCm: "165 - 173 cm", weightLbs: "140 - 165 lbs", weightKg: "63 - 75 kg", recommendedFor: "Feather / Light" },
  { size: "A1L", heightFt: "5'8\" - 5'11\"", heightCm: "173 - 180 cm", weightLbs: "145 - 165 lbs", weightKg: "65 - 75 kg", recommendedFor: "Tall & Lean Athletic" },
  { size: "A2", heightFt: "5'8\" - 5'11\"", heightCm: "173 - 180 cm", weightLbs: "165 - 190 lbs", weightKg: "75 - 86 kg", recommendedFor: "Middle / Medium-Heavy" },
  { size: "A2L", heightFt: "5'11\" - 6'2\"", heightCm: "180 - 188 cm", weightLbs: "170 - 195 lbs", weightKg: "77 - 88 kg", recommendedFor: "Long Limbs Athletic" },
  { size: "A2H", heightFt: "5'8\" - 5'11\"", heightCm: "173 - 180 cm", weightLbs: "190 - 215 lbs", weightKg: "86 - 97 kg", recommendedFor: "Broad Shoulders / Husky" },
  { size: "A3", heightFt: "5'11\" - 6'2\"", heightCm: "180 - 188 cm", weightLbs: "190 - 220 lbs", weightKg: "86 - 100 kg", recommendedFor: "Heavy / Super-Heavy" },
  { size: "A4", heightFt: "6'1\" - 6'4\"", heightCm: "185 - 193 cm", weightLbs: "220 - 255 lbs", weightKg: "100 - 115 kg", recommendedFor: "Ultra Heavy" },
  { size: "A5", heightFt: "6'3\" - 6'7\"", heightCm: "190 - 201 cm", weightLbs: "255 - 290+ lbs", weightKg: "115 - 132+ kg", recommendedFor: "Open Weight Championship" },
];

export const resourcesFaqs: FAQItemData[] = [
  {
    id: "res-faq-1",
    question: "Can I use your AI vector tech pack templates for commercial production?",
    answer:
      "Yes. Our vector templates are completely royalty-free for coaches, designers, and apparel brands manufacturing with Rokai or preparing tech packs for sampling.",
  },
  {
    id: "res-faq-2",
    question: "How accurate is the pre-shrunk allowance on your sizing charts?",
    answer:
      "Our pearl weave cotton undergoes mechanical sanforization and industrial wash treatment before cutting. We guarantee less than 1.5% shrinkage when washed in cold water and hang dried.",
  },
  {
    id: "res-faq-3",
    question: "Can Rokai grade custom sizes for our academy beyond standard A0-A5?",
    answer:
      "Yes. Our pattern engineers can customize sleeve taper, jacket skirt length, and pant rise to create a bespoke fit exclusive to your academy or franchise.",
  },
];
