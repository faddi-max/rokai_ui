import { apiClient } from "@/shared/api/apiClient";
import { jackets as fallbackImage } from "@/assets";
import { fabricsPageFallback } from "@/features/services/BJJApparelFabricsPage/data/fabricsData";
import { sanitizeImageUrl } from "@/shared/api/services/servicesService";
import { parseHtmlTable } from "@/shared/utils/parseHtmlTable";
import type {
  ApiFabric,
  FabricCollection,
  FabricTableData,
  FabricsTablePageData,
} from "@/shared/types/fabrics";

const NOTE =
  "Fabric specifications may vary slightly depending on the product and manufacturing process.";

/** Makes every row exactly as long as the header row. */
function normalizeRow(row: string[], length: number): string[] {
  return Array.from({ length }, (_, i) => row[i] ?? "");
}

function mapApiFabric(item: ApiFabric): FabricTableData {
  const { headers, rows } = parseHtmlTable(item.html_table);

  return {
    id: `fabric-${item.id}`,
    breadcrumb: item.subtitle?.trim() || "Fabric Guide",
    title: item.title.trim(),
    description: item.description?.trim() || "",
    image: sanitizeImageUrl(item.image_url, fallbackImage),
    imageAlt: `${item.title} fabric specifications`,
    tableLabel: "Fabric Specifications",
    tableMeta: "ROKAI Fabric Guide",
    note: NOTE,
    headers,
    rows: rows.map((row) => normalizeRow(row, headers.length)),
  };
}

/** Converts the old local (fixed-column) data into the new shape for fallback. */
function legacyToTable(c: FabricCollection): FabricTableData {
  return {
    id: c.id,
    breadcrumb: c.breadcrumb,
    title: `${c.titleWhite} ${c.titleRed}`,
    description: c.description,
    image: c.image,
    imageAlt: c.imageAlt,
    tableLabel: c.tableLabel,
    tableMeta: c.tableMeta,
    note: c.note,
    headers: [
      "Fabric Name",
      "GSM / Weave Type",
      "Composition",
      "Key Features",
      "Athletic Benefits",
      "Training Tier / Use Case",
    ],
    rows: c.rows.map((r) => [
      r.name,
      `${r.gsm} / ${r.weave}`,
      [r.composition, r.compositionNote].filter(Boolean).join(" "),
      r.keyFeatures,
      r.athleticBenefits,
      r.useCase.join(" / "),
    ]),
  };
}

export const fabricsService = {
  /** GET /flagship-fabrics -> FabricsTablePageData; falls back to local data if the API fails. */
  async getFabricsPageData(): Promise<FabricsTablePageData> {
    try {
      const raw = await apiClient.get<ApiFabric[]>("/flagship-fabrics");

      if (Array.isArray(raw) && raw.length > 0) {
        const collections = raw
          .slice()
          .sort((a, b) => Number(a.id) - Number(b.id)) // API returns newest first
          .map(mapApiFabric)
          .filter((c) => c.headers.length > 0 && c.rows.length > 0);

        if (collections.length > 0) return { collections };
      }
    } catch (err) {
      console.warn("Could not fetch /flagship-fabrics, using fallback:", err);
    }

    return { collections: fabricsPageFallback.collections.map(legacyToTable) };
  },
};