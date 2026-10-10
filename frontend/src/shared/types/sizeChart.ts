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