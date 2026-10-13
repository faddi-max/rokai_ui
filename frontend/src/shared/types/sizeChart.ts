export interface ApiSizeChart {
  id: number;
  subtitle: string | null;
  title: string;
  description: string | null;
  image_path: string | null;
  image_url: string | null;
  table_html: string | null;
}

/** Shape the SizeChartSection renders (works for any number of columns). */
export interface SizeChartTableData {
  id: string;
  breadcrumb?: string;
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
  tableLabel: string;
  unitsLabel: string;
  noteLabel: string;
  note: string;
  headers: string[];
  rows: string[][];
}
/* ---------- Legacy fixed-column shapes (used by local fallback data) ---------- */

export type SizeChartColumnKey =
  | "wingspan"
  | "chest"
  | "length"
  | "waist"
  | "hips"
  | "pantLength";

export interface SizeChartColumn {
  key: SizeChartColumnKey;
  label: string;
}

export interface SizeChartMeasurement {
  cm: number;
  inch: number;
}

export interface SizeChartRow {
  size: string;
  measurements: Record<SizeChartColumnKey, SizeChartMeasurement>;
}

export interface SizeChartData {
  id: string;
  breadcrumb: string;
  titleWhite: string;
  titleRed: string;
  tolerance: string;
  image: string;
  imageAlt: string;
  tableLabel: string;
  unitsLabel: string;
  noteLabel: string;
  note: string;
  columns: SizeChartColumn[];
  rows: SizeChartRow[];
}
