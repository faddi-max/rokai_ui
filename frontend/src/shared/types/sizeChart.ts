export interface SizeChartMeasurement {
  cm: number;
  inch: number;
}

export interface SizeChartColumn {
  key: string;
  label: string;
}

export interface SizeChartRow {
  size: string;
  /** keyed by SizeChartColumn.key */
  measurements: Record<string, SizeChartMeasurement>;
}

export interface SizeChartData {
  id: string;
  breadcrumb?: string;
  titleWhite: string;
  titleRed: string;
  tolerance?: string;
  image: string;
  imageAlt: string;
  tableLabel: string;
  unitsLabel: string;
  noteLabel: string;
  note: string;
  columns: SizeChartColumn[];
  rows: SizeChartRow[];
}