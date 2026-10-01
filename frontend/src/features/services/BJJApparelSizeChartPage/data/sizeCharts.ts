import { sizeChartMen, sizeChartWomen, sizeChartKids } from "@/assets";
import type {
  SizeChartColumn,
  SizeChartData,
  SizeChartMeasurement,
  SizeChartRow,
} from "@/shared/types/sizeChart";

const columns: SizeChartColumn[] = [
  { key: "wingspan", label: "Wingspan" },
  { key: "chest", label: "Chest" },
  { key: "length", label: "Length" },
  { key: "waist", label: "Waist" },
  { key: "hips", label: "Hips" },
  { key: "pantLength", label: "Pant Length (Back)" },
];

/* cm + inch given explicitly (Men's, read from Figma) */
const m = (cm: number, inch: number): SizeChartMeasurement => ({ cm, inch });

const row = (
  size: string,
  [wingspan, chest, length, waist, hips, pantLength]: SizeChartMeasurement[]
): SizeChartRow => ({
  size,
  measurements: { wingspan, chest, length, waist, hips, pantLength },
});

/* cm only, inches derived (Women's / Kids drafts) */
const mc = (cm: number): SizeChartMeasurement => ({
  cm,
  inch: Math.round((cm / 2.54) * 10) / 10,
});

const rowCm = (
  size: string,
  [wingspan, chest, length, waist, hips, pantLength]: number[]
): SizeChartRow => ({
  size,
  measurements: {
    wingspan: mc(wingspan),
    chest: mc(chest),
    length: mc(length),
    waist: mc(waist),
    hips: mc(hips),
    pantLength: mc(pantLength),
  },
});

export const mensChart: SizeChartData = {
  id: "mens-bjj",
  breadcrumb: "Size Chart",
  titleWhite: "MEN'S BJJ",
  titleRed: "GI SIZE CHART (A0–A5)",
  tolerance: "(±2 cm / 0.8 in tolerance in all areas)",
  image: sizeChartMen,
  imageAlt: "Men's BJJ gi laid out beside the measurement specifications chart",
  tableLabel: "Gi Measurement Chart",
  unitsLabel: "Centimeters / Inches",
  noteLabel: "Measurement note:",
  note: "Measurements may vary slightly depending on the product and manufacturing process.",
  columns,
  rows: [
    row("A0",  [m(157, 61.8), m(53, 20.9), m(72, 28.3), m(48, 18.9), m(52, 20.5), m(94, 37.0)]),
    row("A1L", [m(165, 65.0), m(55, 21.7), m(78, 30.7), m(50, 19.7), m(54, 21.3), m(96, 37.8)]),
    row("A1",  [m(162, 63.8), m(54, 21.3), m(76, 29.9), m(50, 19.7), m(53, 20.9), m(95, 37.4)]),
    row("A1H", [m(162, 63.8), m(57, 22.4), m(75, 29.5), m(53, 20.9), m(56, 22.0), m(95, 37.4)]),
    row("A2L", [m(172, 67.7), m(56, 22.0), m(82, 32.3), m(52, 20.5), m(56, 22.0), m(98, 38.6)]),
    row("A2",  [m(168, 66.1), m(55, 21.7), m(80, 31.5), m(52, 20.5), m(55, 21.7), m(97, 38.2)]),
    row("A2H", [m(168, 66.1), m(58, 22.8), m(79, 31.1), m(56, 22.0), m(58, 22.8), m(97, 38.2)]),
    row("A3L", [m(175, 68.9), m(57, 22.4), m(84, 33.1), m(54, 21.3), m(57, 22.4), m(100, 39.4)]),
    row("A3",  [m(170, 66.9), m(56, 22.0), m(82, 32.3), m(54, 21.3), m(56, 22.0), m(99, 39.0)]),
    row("A3H", [m(170, 66.9), m(59, 23.2), m(81, 31.9), m(58, 22.8), m(58, 22.8), m(99, 39.0)]),
    row("A4",  [m(178, 70.1), m(58, 22.8), m(86, 33.9), m(60, 23.6), m(61, 24.0), m(102, 40.2)]),
    row("A5",  [m(187, 73.6), m(62, 24.4), m(92, 36.2), m(62, 24.4), m(64, 25.2), m(107, 42.1)]),
  ],
};

// DRAFT values: verify every row against Figma.
export const womensChart: SizeChartData = {
  ...mensChart,
  id: "womens-bjj",
  titleWhite: "WOMEN'S BJJ",
  titleRed: "GI SIZE CHART (F1–F5)",
  image: sizeChartWomen,
  imageAlt: "Women's BJJ gi laid out beside the measurement specifications chart",
  rows: [
    rowCm("F1",  [150, 49, 66, 44, 50, 88]),
    rowCm("F1L", [158, 50, 70, 45, 51, 91]),
    rowCm("F2",  [155, 51, 68, 46, 52, 90]),
    rowCm("F2L", [163, 52, 72, 47, 53, 93]),
    rowCm("F3",  [160, 53, 70, 48, 54, 92]),
    rowCm("F3L", [168, 54, 74, 49, 55, 95]),
    rowCm("F4",  [165, 55, 72, 50, 56, 94]),
    rowCm("F5",  [172, 57, 76, 52, 58, 98]),
  ],
};

// DRAFT values: verify every row against Figma.
export const kidsChart: SizeChartData = {
  ...mensChart,
  id: "kids-bjj",
  titleWhite: "KIDS BJJ",
  titleRed: "GI SIZE CHART (M000–M4)",
  image: sizeChartKids,
  imageAlt: "Kids BJJ gi laid out beside the measurement specifications chart",
  rows: [
    rowCm("M000", [98, 36, 46, 36, 38, 58]),
    rowCm("M00",  [108, 38, 50, 38, 40, 64]),
    rowCm("M0",   [118, 40, 54, 40, 42, 70]),
    rowCm("M1",   [128, 43, 58, 42, 44, 76]),
    rowCm("M2",   [138, 46, 62, 44, 46, 82]),
    rowCm("M3",   [148, 49, 66, 46, 48, 88]),
    rowCm("M4",   [158, 52, 70, 48, 50, 94]),
  ],
};

export const sizeChartsFallback: SizeChartData[] = [mensChart, womensChart, kidsChart];