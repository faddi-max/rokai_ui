export interface ApiFabric {
  id: number;
  subtitle: string | null;
  title: string;
  description: string | null;
  image_path: string | null;
  image_url: string | null;
  html_table: string | null;
}

/** Shape FabricsSection renders (any number of columns). */
export interface FabricTableData {
  id: string;
  breadcrumb: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  tableLabel: string;
  tableMeta?: string;
  note: string;
  headers: string[];
  rows: string[][];
}

export interface FabricsTablePageData {
  collections: FabricTableData[];
}
/* ---------- Legacy fixed-column shapes (used by local fallback data) ---------- */

export interface FabricRow {
  id: string;
  brand: string;
  name: string;
  gsm: string;
  weave: string;
  composition: string;
  compositionNote: string;
  keyFeatures: string;
  athleticBenefits: string;
  useCase: string[];
}

export interface FabricCollection {
  id: string;
  breadcrumb: string;
  titleWhite: string;
  titleRed: string;
  description: string;
  image: string;
  imageAlt: string;
  tableLabel: string;
  tableMeta?: string;
  note: string;
  rows: FabricRow[];
}

export interface FabricsHeroTab {
  id: string;
  label: string;
}

export interface FabricsHeroData {
  breadcrumb: string;
  titleWhite: string;
  titleRed: string;
  tabs: FabricsHeroTab[];
}

export interface FabricsPageData {
  hero: FabricsHeroData;
  collections: FabricCollection[];
}
