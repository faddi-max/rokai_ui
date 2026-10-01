export interface FabricTab {
  id: string; // matches a FabricCollection.id (used as the scroll anchor)
  label: string;
}

export interface FabricRow {
  id: string;
  brand: string; // small label above the fabric name, e.g. "ROKAI"
  name: string;
  gsm: string; // "200 GSM"
  weave: string; // "Pearl Weave"
  composition: string; // "100% Cotton"
  compositionNote?: string;
  keyFeatures: string;
  athleticBenefits: string;
  useCase: string[]; // one line per entry
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

export interface FabricsHeroData {
  breadcrumb: string;
  titleWhite: string;
  titleRed: string;
  tabs: FabricTab[];
}

export interface FabricsPageData {
  hero: FabricsHeroData;
  collections: FabricCollection[];
}