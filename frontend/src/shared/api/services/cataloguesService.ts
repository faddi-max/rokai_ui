import { apiClient, API_BASE_URL } from "@/shared/api/apiClient";
import { catalogueHeroContent } from "@/features/catalogue/data/catalogueHeroContent";
import type { HeroContent } from "@/shared/types/hero";
import type { Guide } from "@/features/catalogue/data/guides.data";
import {
  bloghero,
  capabilityFabricsImage,
  capabilityCatalogueImage,
} from "@/assets";

export interface ApiCatalogueItem {
  id: number;
  title: string;
  description: string | null;
  pdf_path?: string | null;
  pdf_url?: string | null;
  image?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface CatalogueItem extends Guide {
  pdfPath?: string;
  pdfUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CataloguePageData {
  hero: HeroContent;
  catalogues: CatalogueItem[];
}

export const PUBLIC_HOST = (() => {
  try {
    return new URL(API_BASE_URL).host;
  } catch {
    return "";
  }
})();

export const SERVER_BASE_URL = (() => {
  try {
    return new URL(API_BASE_URL).origin;
  } catch {
    return "";
  }
})();

export function sanitizeFileUrl(
  url: string | null | undefined,
  fallback: string = ""
): string {
  if (!url || typeof url !== "string" || !url.trim() || url === "null" || url === "undefined") {
    return fallback;
  }

  const cleanUrl = url.trim();

  // 1. If it's already a full valid public URL (not localhost/127.0.0.1), keep the EXACT URL from API
  if (/^https?:\/\//i.test(cleanUrl) && !/127\.0\.0\.1|localhost/i.test(cleanUrl)) {
    return cleanUrl;
  }

  // 2. If it points to local dev server (127.0.0.1 or localhost), replace with SERVER_BASE_URL / PUBLIC_HOST
  if (/^http:\/\/(127\.0\.0\.1|localhost)(:\d+)?/i.test(cleanUrl)) {
    if (SERVER_BASE_URL) {
      return cleanUrl.replace(/^http:\/\/(127\.0\.0\.1|localhost)(:\d+)?/i, SERVER_BASE_URL);
    }
    if (PUBLIC_HOST) {
      const protocol = API_BASE_URL.startsWith("https") ? "https" : "http";
      return cleanUrl.replace(/^http:\/\/(127\.0\.0\.1|localhost)(:\d+)?/i, `${protocol}://${PUBLIC_HOST}`);
    }
  }

  // 3. Prepend origin / host for relative /storage paths (or any relative path starting with /)
  if ((cleanUrl.startsWith("/storage/") || cleanUrl.startsWith("storage/")) && (SERVER_BASE_URL || PUBLIC_HOST)) {
    const base = SERVER_BASE_URL || `${API_BASE_URL.startsWith("https") ? "https" : "http"}://${PUBLIC_HOST}`;
    const path = cleanUrl.startsWith("/") ? cleanUrl : `/${cleanUrl}`;
    return `${base}${path}`;
  }

  if (cleanUrl.startsWith("/") && (SERVER_BASE_URL || PUBLIC_HOST)) {
    const base = SERVER_BASE_URL || `${API_BASE_URL.startsWith("https") ? "https" : "http"}://${PUBLIC_HOST}`;
    return `${base}${cleanUrl}`;
  }

  return cleanUrl;
}

export function getCatalogueImage(item: ApiCatalogueItem): string {
  if (item.image) {
    return sanitizeFileUrl(item.image, capabilityCatalogueImage);
  }

  const lowerTitle = (item.title || "").toLowerCase();
  if (lowerTitle.includes("fabric")) {
    return capabilityFabricsImage;
  }
  if (lowerTitle.includes("kimono") || lowerTitle.includes("gi")) {
    return bloghero;
  }

  return capabilityCatalogueImage;
}

export const localCatalogues: CatalogueItem[] = [
  {
    id: "3",
    title: "BJJ Kimonos",
    description: "Engineered For Durability, Comfort, And Performance.",
    image: bloghero,
    imageAlt: "BJJ Kimonos",
    fileType: "PDF",
    downloadHref: sanitizeFileUrl("/storage/catalogues/uCwFH8xd5oI7ec3ca7LC6pUxM5xVVM4xyeZVTDXN.pdf"),
    openHref: sanitizeFileUrl("/storage/catalogues/uCwFH8xd5oI7ec3ca7LC6pUxM5xVVM4xyeZVTDXN.pdf"),
    pdfPath: "catalogues/uCwFH8xd5oI7ec3ca7LC6pUxM5xVVM4xyeZVTDXN.pdf",
    pdfUrl: "/storage/catalogues/uCwFH8xd5oI7ec3ca7LC6pUxM5xVVM4xyeZVTDXN.pdf",
  },
  {
    id: "2",
    title: "Fabrics",
    description: "We have show you all the fabrics details in this PDF.",
    image: capabilityFabricsImage,
    imageAlt: "Fabrics",
    fileType: "PDF",
    downloadHref: sanitizeFileUrl("/storage/catalogues/hiUaxINf5MQdd8uZfAT9SPBlOIJohGttzpmfblYZ.pdf"),
    openHref: sanitizeFileUrl("/storage/catalogues/hiUaxINf5MQdd8uZfAT9SPBlOIJohGttzpmfblYZ.pdf"),
    pdfPath: "catalogues/hiUaxINf5MQdd8uZfAT9SPBlOIJohGttzpmfblYZ.pdf",
    pdfUrl: "/storage/catalogues/hiUaxINf5MQdd8uZfAT9SPBlOIJohGttzpmfblYZ.pdf",
  },
];

export function mapApiCatalogueToCatalogue(item: ApiCatalogueItem): CatalogueItem {
  const rawPdfUrl = item.pdf_url || (item.pdf_path ? `/storage/${item.pdf_path}` : "");
  const resolvedPdfUrl = sanitizeFileUrl(rawPdfUrl);
  const image = getCatalogueImage(item);

  return {
    id: String(item.id),
    title: item.title,
    description: item.description || `ROKAI ${item.title} Catalogue.`,
    image,
    imageAlt: item.title,
    fileType: "PDF",
    downloadHref: resolvedPdfUrl,
    openHref: resolvedPdfUrl,
    pdfPath: item.pdf_path || undefined,
    pdfUrl: item.pdf_url || undefined,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  };
}

const CATALOGUES_TTL_MS = 5 * 60 * 1000;
let cataloguesCache: { data: CatalogueItem[]; timestamp: number } | null = null;
let cataloguesRequest: Promise<CatalogueItem[]> | null = null;
let cataloguesRequestToken: symbol | null = null;

export const cataloguesService = {
  /**
   * Clears in-memory catalogues cache
   */
  clearCache(): void {
    cataloguesCache = null;
    cataloguesRequest = null;
    cataloguesRequestToken = null;
    apiClient.clearCache("/catalogues");
  },

  /**
   * Fetches catalogues list from backend API with in-memory caching and fallback
   */
  async getCatalogues(forceRefresh = false): Promise<CatalogueItem[]> {
    const cached = cataloguesCache;
    const isFresh = cached && Date.now() - cached.timestamp < CATALOGUES_TTL_MS;
    if (!forceRefresh && isFresh) {
      return cached.data;
    }
    if (!forceRefresh && cataloguesRequest) {
      return cataloguesRequest;
    }

    const requestToken = Symbol("catalogues");
    const request = (async () => {
      await Promise.resolve();
      try {
        const raw = await apiClient.get<ApiCatalogueItem[]>("/catalogues", { forceRefresh });
        console.log("Catalogues API success response:", raw);

        const mapped = Array.isArray(raw) && raw.length > 0
          ? raw
              .slice()
              .sort((a, b) => Number(b.id) - Number(a.id))
              .map(mapApiCatalogueToCatalogue)
          : localCatalogues;

        cataloguesCache = { data: mapped, timestamp: Date.now() };
        return mapped;
      } catch (err) {
        console.warn("Could not fetch /catalogues, using fallback:", err);
        return localCatalogues;
      } finally {
        if (cataloguesRequestToken === requestToken) {
          cataloguesRequest = null;
          cataloguesRequestToken = null;
        }
      }
    })();

    if (!forceRefresh) {
      cataloguesRequest = request;
      cataloguesRequestToken = requestToken;
    }

    return request;
  },

  /**
   * Finds a catalogue item by ID
   */
  async getCatalogueById(id: string | number): Promise<CatalogueItem | undefined> {
    const all = await cataloguesService.getCatalogues();
    return all.find((c) => c.id === String(id));
  },

  /**
   * Fetches the entire Catalogue page payload with dynamic hero
   */
  async getCataloguePageData(forceRefresh = false): Promise<CataloguePageData> {
    const catalogues = await cataloguesService.getCatalogues(forceRefresh);

    return {
      hero: catalogueHeroContent,
      catalogues,
    };
  },
};
