import { apiClient, API_BASE_URL } from "@/shared/api/apiClient";
import type { HeroContent } from "@/shared/types/hero";
import type { NavSubItem } from "@/shared/config/navigation";
import {
  servicemanufacturehero,
  oemhero,
  customlabel,
  manufactureProduct,
} from "@/assets";

export interface ApiServiceItem {
  id: number;
  title: string;
  description: string | null;
  image: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
}

export interface ServicePageData {
  hero: HeroContent;
  service?: ServiceItem;
  allServices: ServiceItem[];
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

export function sanitizeImageUrl(
  url: string | null | undefined,
  fallback: string = servicemanufacturehero
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

  // 3. Prepend origin / host for relative /storage paths (or any relative path)
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

export function getServiceSlug(item: { id?: number | string; title: string }): string {
  const t = item.title.toLowerCase().trim();
  if (t.includes("private label")) return "private-label-manufacturing";
  if (t.includes("oem")) return "oem-manufacturing";
  if (t.includes("label") || t.includes("packaging")) return "custom-labels-packaging";
  if (t.includes("shipping") || t.includes("logistic")) return "shipping-logistics";

  return item.title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const localServices: ServiceItem[] = [
  {
    id: "1",
    slug: "private-label-manufacturing",
    title: "Private Label Manufacturing",
    description:
      "Professional-grade resources for brand owners, academy managers and gear enthusiasts everything you need to choose, care for and build better combat sports gear.",
    image: servicemanufacturehero,
    imageAlt: "Private Label Manufacturing",
    href: "/services/private-label-manufacturing",
  },
  {
    id: "2",
    slug: "oem-manufacturing",
    title: "OEM Manufacturing",
    description:
      "From product concept to production, Rokai OEM Manufacturing gives brands the infrastructure, engineering and quality control to build combat sports gear around their exact requirements.",
    image: oemhero,
    imageAlt: "OEM Manufacturing",
    href: "/services/oem-manufacturing",
  },
  {
    id: "3",
    slug: "custom-labels-packaging",
    title: "Custom Labels Packaging",
    description:
      "Custom labeling and packaging helps your products create a consistent brand experience from production to presentation.",
    image: customlabel,
    imageAlt: "Custom Labels Packaging",
    href: "/services/custom-labels-packaging",
  },
  {
    id: "4",
    slug: "shipping-logistics",
    title: "Shipping & Logistics",
    description:
      "Reliable shipping and logistics support designed to move your products efficiently from production to destination.",
    image: manufactureProduct,
    imageAlt: "Shipping & Logistics",
    href: "/services/shipping-logistics",
  },
];

export function mapApiServiceToService(item: ApiServiceItem): ServiceItem {
  const slug = getServiceSlug(item);
  const fallback = localServices.find((s) => s.slug === slug)?.image || servicemanufacturehero;
  const image = sanitizeImageUrl(item.image, fallback);

  return {
    id: String(item.id),
    slug,
    title: item.title,
    description: item.description || `Professional ${item.title} services by ROKAI.`,
    image,
    imageAlt: item.title,
    href: `/services/${slug}`,
  };
}

export function mapServicesToNavItems(services: ServiceItem[]): NavSubItem[] {
  return services.map((service) => ({
    label: service.title,
    href: service.href,
    description: service.description,
    image: service.image,
  }));
}

export function buildServiceHero(service: ServiceItem): HeroContent {
  const titleWords = service.title.trim().toUpperCase().split(/\s+/);
  const mid = Math.ceil(titleWords.length / 2);
  const line1 = titleWords.slice(0, mid).join(" ");
  const line2 = titleWords.slice(mid).join(" ") || "SERVICES";

  return {
    eyebrow: "ROKAI MANUFACTURING & SERVICES",
    headingLines: [
      { text: line1 },
      { text: line2, highlight: true },
    ],
    description: service.description,
    primaryCta: { label: "Start Your Project", href: "#apply" },
    secondaryCta: { label: "Request a Quote", href: "#quote" },
    featureTags: [
      "Custom Branding",
      "Low MOQ Options",
      "Quality Manufacturing",
      "Global Shipping",
    ],
    visual: {
      type: "image",
      image: service.image,
      imageAlt: service.imageAlt || service.title,
    },
    brandCard: {
      title: "YOUR BRAND.",
      subtitle: "OUR MANUFACTURING EXPERTISE.",
      bgColor: "#E63946",
      position: {
        width: 220,
        height: 101,
        top: 406,
        left: 780,
        borderRadius: 10,
      },
    },
    background: {
      bgColor: "",
      heightPx: 560,
      glows: [
        { width: 460, height: 460, top: 0, left: 580, color: "#E51B243D", blur: 260 },
      ],
    },
  };
}

const SERVICES_TTL_MS = 5 * 60 * 1000;
let servicesCache: { data: ServiceItem[]; timestamp: number } | null = null;
let servicesRequest: Promise<ServiceItem[]> | null = null;
let servicesRequestToken: symbol | null = null;

export const servicesService = {
  /**
   * Clears in-memory services cache
   */
  clearCache(): void {
    servicesCache = null;
    servicesRequest = null;
    servicesRequestToken = null;
    apiClient.clearCache("/services");
  },

  /**
   * Fetches services list from backend API with in-memory caching and fallback
   */
  async getServices(forceRefresh = false): Promise<ServiceItem[]> {
    const cached = servicesCache;
    const isFresh = cached && Date.now() - cached.timestamp < SERVICES_TTL_MS;
    if (!forceRefresh && isFresh) {
      return cached.data;
    }
    if (!forceRefresh && servicesRequest) {
      return servicesRequest;
    }

    const requestToken = Symbol("services");
    const request = (async () => {
      await Promise.resolve();
      try {
        const raw = await apiClient.get<ApiServiceItem[]>("/services", { forceRefresh });

        const mapped = Array.isArray(raw) && raw.length > 0
          ? raw
              .slice()
              .sort((a, b) => Number(a.id) - Number(b.id))
              .map(mapApiServiceToService)
          : localServices;

        servicesCache = { data: mapped, timestamp: Date.now() };
        return mapped;
      } catch (err) {
        console.warn("Could not fetch /services, using fallback:", err);
        return localServices;
      } finally {
        if (servicesRequestToken === requestToken) {
          servicesRequest = null;
          servicesRequestToken = null;
        }
      }
    })();

    if (!forceRefresh) {
      servicesRequest = request;
      servicesRequestToken = requestToken;
    }

    return request;
  },

  /**
   * Fetches services formatted as NavSubItem array for the Navbar dropdown
   */
  async getNavServices(): Promise<NavSubItem[]> {
    const all = await servicesService.getServices();
    return mapServicesToNavItems(all);
  },

  /**
   * Finds a service by slug or id
   */
  async getServiceBySlug(slug: string): Promise<ServiceItem | undefined> {
    const all = await servicesService.getServices();
    const norm = slug.toLowerCase().replace(/[^a-z0-9]/g, "");
    return all.find(
      (s) =>
        s.slug === slug ||
        s.id === slug ||
        s.slug.replace(/[^a-z0-9]/g, "") === norm ||
        s.title.toLowerCase().replace(/[^a-z0-9]/g, "") === norm
    );
  },

  /**
   * Fetches the entire Services page data payload with dynamic hero
   */
  async getServicesPageData(slug?: string): Promise<ServicePageData> {
    const allServices = await servicesService.getServices();
    let selectedService: ServiceItem | undefined;

    if (slug) {
      selectedService = await servicesService.getServiceBySlug(slug);
    }
    if (!selectedService) {
      selectedService = allServices[0] || localServices[0];
    }

    const hero = buildServiceHero(selectedService);

    return {
      hero,
      service: selectedService,
      allServices,
    };
  },
};