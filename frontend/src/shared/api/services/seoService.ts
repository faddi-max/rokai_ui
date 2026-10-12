import { apiClient } from "@/shared/api/apiClient";
import type {
  SeoAllResponseData,
  SeoPageResponseData,
  SeoRecord,
} from "@/shared/types/seo";

export const seoService = {
  /**
   * Fetches the SEO metadata for a specific page key (e.g. 'home', 'about', 'services').
   * Endpoint: GET /seo/page/{page_key}
   */
  async getPageSeo(pageKey: string): Promise<SeoRecord | null> {
    if (!pageKey) return null;

    try {
      const response = await apiClient.get<SeoPageResponseData>(
        `/seo/page/${encodeURIComponent(pageKey)}`
      );

      return response?.seo ?? null;
    } catch {
      // Gracefully fall back if page key is not in backend config or request fails
      return null;
    }
  },

  /**
   * Fetches full page response including label, path, and seo object.
   * Endpoint: GET /seo/page/{page_key}
   */
  async getPageData(pageKey: string): Promise<SeoPageResponseData | null> {
    if (!pageKey) return null;

    try {
      const response = await apiClient.get<SeoPageResponseData>(
        `/seo/page/${encodeURIComponent(pageKey)}`
      );

      return response ?? null;
    } catch {
      return null;
    }
  },

  /**
   * Fetches the global SEO configuration for all static pages and records.
   * Endpoint: GET /seo
   */
  async getAllSeo(): Promise<SeoAllResponseData | null> {
    try {
      const response = await apiClient.get<SeoAllResponseData>("/seo");
      return response ?? null;
    } catch {
      return null;
    }
  },

  /**
   * Resolves a URL pathname to its corresponding page key.
   */
  getPageKeyFromPath(pathname: string): string {
    const clean = pathname.replace(/^\/+|\/+$/g, "").toLowerCase();

    if (!clean || clean === "home") {
      return "home";
    }

    if (clean.startsWith("about")) return "about";
    if (clean.startsWith("services")) return "services";
    if (clean.startsWith("contact")) return "contact";
    if (clean.startsWith("blogs") || clean.startsWith("blog")) return "blogs";
    if (clean.startsWith("categories") || clean.startsWith("category")) return "categories";
    if (clean.startsWith("catalogue")) return "catalogue";
    if (clean.startsWith("careers") || clean.startsWith("career")) return "careers";
    if (clean.startsWith("legal") || clean.startsWith("privacy")) return "legal";
    if (clean.startsWith("testimonials") || clean.startsWith("testimonial")) return "testimonials";
    if (clean.startsWith("resources") || clean.startsWith("resource")) return "resources";
    if (clean.startsWith("programs") || clean.startsWith("program")) return "programs";

    const firstSegment = clean.split("/")[0];
    return firstSegment || "home";
  },

  /**
   * Returns a friendly default fallback title for a given pathname if API metadata is not set.
   */
  getDefaultTitleForPath(pathname: string): string {
    const key = this.getPageKeyFromPath(pathname);
    const titles: Record<string, string> = {
      home: "Combat Sports Apparel Manufacturer | ROKAI",
      about: "About Us | ROKAI",
      services: "Services & Capabilities | ROKAI",
      contact: "Contact Us | ROKAI",
      blogs: "Journal & Insights | ROKAI",
      categories: "Combat Sports Apparel Categories | ROKAI",
      catalogue: "Product Catalogue | ROKAI",
      careers: "Careers & Join Us | ROKAI",
      legal: "Legal & Privacy Policy | ROKAI",
      testimonials: "Client Stories & Testimonials | ROKAI",
      resources: "Tools & Resources | ROKAI",
      programs: "Partnership & Programs | ROKAI",
    };

    return (
      titles[key] ||
      `${key.charAt(0).toUpperCase() + key.slice(1).replace(/-/g, " ")} | ROKAI`
    );
  },
};
