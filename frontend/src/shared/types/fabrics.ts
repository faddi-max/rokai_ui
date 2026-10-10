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