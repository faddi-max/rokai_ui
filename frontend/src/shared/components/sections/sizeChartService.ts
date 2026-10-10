import { sizeChartsFallback } from "@/features/services/BJJApparelSizeChartPage/data/sizeCharts";
import { apiClient } from "@/shared/api/apiClient";
import { sanitizeImageUrl } from "@/shared/api/services/servicesService";
import { sizeChartMen } from "@/assets";
import type {
  ApiSizeChart,
  SizeChartData,
  SizeChartTableData,
} from "@/shared/types/sizeChart";

const NOTE =
  "Measurements may vary slightly depending on the product and manufacturing process.";

/* -------------------------------------------------------------------------- */
/*  HTML table -> headers / rows (textContent only, no HTML is injected)      */
/* -------------------------------------------------------------------------- */

function parseTableHtml(html: string | null | undefined) {
  if (!html) return { headers: [] as string[], rows: [] as string[][] };

  const doc = new DOMParser().parseFromString(html, "text/html");
  const clean = (el: Element) => (el.textContent ?? "").replace(/\s+/g, " ").trim();

  const headers = Array.from(doc.querySelectorAll("thead th")).map(clean);
  const rows = Array.from(doc.querySelectorAll("tbody tr"))
    .map((tr) => Array.from(tr.querySelectorAll("td")).map(clean))
    .filter((row) => row.length > 0);

  return { headers, rows };
}

function mapApiChart(item: ApiSizeChart): SizeChartTableData {
  const { headers, rows } = parseTableHtml(item.table_html);

  return {
    id: String(item.id),
    breadcrumb: item.subtitle || "Size Chart",
    title: item.title,
    description: item.description || undefined,
    image: sanitizeImageUrl(item.image_url, sizeChartMen),
    imageAlt: `${item.title} measurement reference`,
    tableLabel: "Measurement Chart",
    unitsLabel: "Centimeters / Inches",
    noteLabel: "Measurement note:",
    note: NOTE,
    headers,
    rows,
  };
}

/* Converts the old local (fixed-column) data into the new shape for fallback. */
function legacyToTable(chart: SizeChartData): SizeChartTableData {
  return {
    id: chart.id,
    breadcrumb: chart.breadcrumb,
    title: `${chart.titleWhite} ${chart.titleRed}`,
    description: chart.tolerance,
    image: chart.image,
    imageAlt: chart.imageAlt,
    tableLabel: chart.tableLabel,
    unitsLabel: chart.unitsLabel,
    noteLabel: chart.noteLabel,
    note: chart.note,
    headers: ["Size", ...chart.columns.map((c) => c.label)],
    rows: chart.rows.map((row) => [
      row.size,
      ...chart.columns.map((c) => {
        const m = row.measurements[c.key];
        return m ? `${m.cm} cm ${m.inch.toFixed(1)} in` : "";
      }),
    ]),
  };
}

export const sizeChartService = {
  /** GET /rokai-size-charts -> SizeChartTableData[]; falls back to local data if the API fails. */
  async getSizeCharts(): Promise<SizeChartTableData[]> {
    try {
      const raw = await apiClient.get<ApiSizeChart[]>("/rokai-size-charts");

      if (Array.isArray(raw) && raw.length > 0) {
        return raw
          .slice()
          .sort((a, b) => Number(a.id) - Number(b.id)) // API returns newest first
          .map(mapApiChart)
          .filter((chart) => chart.headers.length > 0 && chart.rows.length > 0);
      }
    } catch (err) {
      console.warn("Could not fetch /rokai-size-charts, using fallback:", err);
    }

    return sizeChartsFallback.map(legacyToTable);
  },
};