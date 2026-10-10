import { apiClient, API_BASE_URL } from "@/shared/api/apiClient";
import {
  customizationCategories as localCategories,
  type CustomizationCategory,
  type CustomizationOption,
  type CustomizationSlide,
  type CustomizationSliderItem,
} from "@/features/services/BespokeCustomizationPage/data/customization.data";

/* -------------------------------------------------------------------------- */
/*  API types                                                                 */
/* -------------------------------------------------------------------------- */

export interface ApiCustomizationImage {
  id: number;
  image_url: string;
  points: string[] | null;
}

export interface ApiCustomization {
  id: number;
  title: string;
  description: string | null;
  tabs_html: string | null;
  images: ApiCustomizationImage[] | null;
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

/**
 * API slug -> id of the LOCAL category that holds the x/y callouts and the
 * stage size. Categories not listed here get no callouts (empty) for now.
 */
const LOCAL_LAYOUT_BY_SLUG: Record<string, string> = {
  "bjj-gi": "bjj-gi",
  "bjj-rashguard": "bjj-rushguard",
  "bjj-grappling-short": "grappling-short",
};

const DEFAULT_STAGE = {
  width: 624.76,
  aspectRatio: "4/5",
  objectFit: "contain" as const,
};

/** Page https par ho to http ngrok images mixed-content se block hoti hain. */
function fixImageUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (API_BASE_URL.startsWith("https") && url.startsWith("http://")) {
    return url.replace("http://", "https://");
  }
  return url;
}

function inferFilter(title: string): CustomizationOption["filter"] {
  const t = title.toLowerCase();
  if (t.includes("patch")) return "patches";
  if (t.includes("embroidery")) return "embroidery";
  if (t.includes("label")) return "labels";
  if (t.includes("print") || t.includes("sublimation") || t.includes("transfer")) {
    return "printing";
  }
  return "customization";
}

/** tabs_html table (Customization Type | What It Is | Best For) -> options */
function parseOptions(categoryId: string, html: string | null): CustomizationOption[] {
  if (!html || typeof DOMParser === "undefined") return [];

  const doc = new DOMParser().parseFromString(html, "text/html");

  return Array.from(doc.querySelectorAll("tbody tr")).flatMap((tr, i) => {
    const cells = Array.from(tr.querySelectorAll("td")).map(
      (td) => td.textContent?.trim() ?? ""
    );
    const [title, description = "", bestFor = ""] = cells;
    if (!title) return [];

    return [
      {
        // index added: API has duplicate titles inside one table
        id: `${categoryId}-${slugify(title)}-${i}`,
        title,
        description,
        tag: bestFor,
        filter: inferFilter(title),
      },
    ];
  });
}

export function mapApiCustomization(
  item: ApiCustomization,
  index: number
): CustomizationCategory {
  const base = item.title.replace(/\s*customization\s*$/i, "").trim();
  const id = slugify(base);

  const local = localCategories.find((c) => c.id === LOCAL_LAYOUT_BY_SLUG[id]);

  const slides: CustomizationSlide[] = (item.images ?? [])
    .map((img) => ({
      id: String(img.id),
      src: fixImageUrl(img.image_url),
      points: img.points ?? [],
    }))
    .filter((s) => s.src);

  return {
    id,
    tabLabel: base,
    categoryLabel: `Category ${String(index + 1).padStart(2, "0")}`,
    titleWhite: base,
    titleRed: "Customization",
    image: slides[0]?.src || local?.image || "",
    imageAlt: `ROKAI custom ${base}`,
    width: local?.width ?? DEFAULT_STAGE.width,
    aspectRatio: local?.aspectRatio ?? DEFAULT_STAGE.aspectRatio,
    objectFit: local?.objectFit ?? DEFAULT_STAGE.objectFit,
    objectPosition: local?.objectPosition,
    callouts: local?.callouts ?? [], // x,y abhi local
    guides: local?.guides,
    options: parseOptions(id, item.tabs_html),
    slides,
  };
}

export const buildSliderItems = (
  categories: CustomizationCategory[]
): CustomizationSliderItem[] =>
  categories.map((c) => ({ key: c.id, label: c.tabLabel, targetId: c.id }));

/* -------------------------------------------------------------------------- */
/*  Service                                                                   */
/* -------------------------------------------------------------------------- */

export const customizationService = {
  async getCustomizationCategories(): Promise<CustomizationCategory[]> {
    try {
      const raw = await apiClient.get<ApiCustomization[]>("/bespoke-customizations");

      if (Array.isArray(raw) && raw.length > 0) {
   
        return raw
          .slice()
          .sort((a, b) => a.id - b.id)
          .map(mapApiCustomization);
      }

      console.warn("/bespoke-customizations returned no data, using fallback");
    } catch (err) {
      console.warn("Could not fetch /bespoke-customizations, using fallback:", err);
    }

    return localCategories;
  },
};