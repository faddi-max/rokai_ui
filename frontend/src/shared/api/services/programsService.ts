import { apiClient, API_BASE_URL } from "@/shared/api/apiClient";
import { affiliateHeroContent } from "@/features/programs/affiliate-program/data/heroContent";
import { ambassadorHeroContent } from "@/features/programs/ambassador-program/data/ambassadorHero";
import { ambassadorHero as sponsorshipHeroContent } from "@/features/programs/sponsorship-program/data/ambassadorHero";
import { clubpartnershipHero } from "@/features/programs/club-partnership/data/clubpartnershiphero";
import { STEPS, Step } from "@/features/programs/affiliate-program/data/steps.data";
import { audienceTags } from "@/features/programs/affiliate-program/data/audienceTags";
import {
  affiliateProgramhero,
  ambassadorProgramhero,
  sponserhero,
} from "@/assets";
import type { HeroContent } from "@/shared/types/hero";
import type { NavSubItem } from "@/shared/config/navigation";

export interface ApiProgramItem {
  id: number;
  heading: string;
  subheading: string;
  description: string | null;
  text_batch?: string | null;
  image: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface ProgramItem {
  id: string;
  slug: string;
  heading: string;
  subheading: string;
  title: string;
  description: string;
  textBatch?: string;
  image: string;
  imageAlt: string;
  href: string;
}

export interface ProgramPageData {
  hero: HeroContent;
  program?: ProgramItem;
  allPrograms: ProgramItem[];
  steps?: Step[];
  audienceTags?: string[];
}

export interface ProgramsPageData extends ProgramPageData {
  steps: Step[];
  audienceTags: string[];
}

export interface ProgramApplicationPayload {
  program_id: string; 
  program_name?: string;
  full_name: string;
  email: string;
  phone?: string;
  social_handle?: string;
  organization?: string;
  role?: string;
  experience_years?: string;
  message?: string;
  agree_terms?: boolean;
}

export interface ProgramApplicationResponse {
  success: boolean;
  message: string;
  id?: string | number;
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
  fallback: string = affiliateProgramhero
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

export function getProgramSlug(item: { id?: number | string; subheading?: string; heading?: string }): string {
  const text = `${item.subheading || ""} ${item.heading || ""}`.toLowerCase();
  if (text.includes("affiliate")) return "affiliate";
  if (text.includes("ambassador")) return "ambassador";
  if (text.includes("sponsor")) return "sponsorship";
  if (text.includes("partnership") || text.includes("club")) return "partnership";

  return (item.subheading || item.heading || String(item.id || ""))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const localPrograms: ProgramItem[] = [
  {
    id: "4",
    slug: "affiliate",
    heading: "Share the Gear.Earn With ROKAI.",
    subheading: "Affiliate Program",
    title: "Affiliate Program",
    description: "Recommend performance-driven combat sports apparel to your audience and earn commission on qualifying orders.",
    textBatch: "Commission On Every Referral",
    image: affiliateProgramhero,
    imageAlt: "Affiliate Program",
    href: "/programs/affiliate",
  },
  {
    id: "3",
    slug: "ambassador",
    heading: "Represent ROKAI.Inspire Others.",
    subheading: "Ambassador Program",
    title: "Ambassador Program",
    description: "A selective partnership for athletes who represent discipline, performance and the values ROKAI is built on.",
    textBatch: "Limited Athlete Selection",
    image: ambassadorProgramhero,
    imageAlt: "Ambassador Program",
    href: "/programs/ambassador",
  },
  {
    id: "2",
    slug: "sponsorship",
    heading: "Take Your AcademyFurther",
    subheading: "Sponsorship Program",
    title: "Sponsorship Program",
    description: "Selective support for academies through custom gear, branding and long-term manufacturing partnership.",
    textBatch: "Selective Partner Program",
    image: sponserhero,
    imageAlt: "Sponsorship Program",
    href: "/programs/sponsorship",
  },
  {
    id: "1",
    slug: "partnership",
    heading: "Grow Your AcademyWith ROKAI",
    subheading: "Club Partnership Program",
    title: "Club Partnership Program",
    description: "Custom apparel and teamwear developed around your academy's identity, with production support built for bulk orders and member merchandise.",
    textBatch: "Built For Academies Worldwide",
    image: sponserhero,
    imageAlt: "Club Partnership Program",
    href: "/programs/partnership",
  },
];

export function mapApiProgramToProgram(item: ApiProgramItem): ProgramItem {
  const slug = getProgramSlug(item);
  const fallback = localPrograms.find((p) => p.slug === slug)?.image || affiliateProgramhero;
  const image = sanitizeImageUrl(item.image, fallback);

  return {
    id: String(item.id),
    slug,
    heading: item.heading,
    subheading: item.subheading,
    title: item.subheading || item.heading,
    description: item.description || `ROKAI ${item.subheading || "Program"}.`,
    textBatch: item.text_batch || undefined,
    image,
    imageAlt: item.subheading || item.heading,
    href: `/programs/${slug}`,
  };
}

export function mapProgramsToNavItems(programs: ProgramItem[]): NavSubItem[] {
  return programs.map((program) => ({
    label: program.subheading || program.title,
    href: program.href,
    description: program.description,
    image: program.image,
  }));
}

function parseHeadingLines(
  heading: string,
  fallback: { text: string; highlight?: boolean }[]
): { text: string; highlight?: boolean }[] {
  if (!heading || !heading.trim()) return fallback;
  const trimmed = heading.trim();

  // If contains dot separation like "Share the Gear.Earn With ROKAI."
  if (trimmed.includes(".")) {
    const parts = trimmed.split(".").map((s) => s.trim()).filter(Boolean);
    if (parts.length >= 2) {
      return [
        { text: parts[0] + "." },
        { text: parts.slice(1).join(" "), highlight: true },
      ];
    }
  }

  // Otherwise split across multiple words if long
  const words = trimmed.split(/\s+/);
  if (words.length > 2) {
    const mid = Math.ceil(words.length / 2);
    return [
      { text: words.slice(0, mid).join(" ") },
      { text: words.slice(mid).join(" "), highlight: true },
    ];
  }

  return [{ text: trimmed, highlight: true }];
}

export function buildProgramHero(program: ProgramItem): HeroContent {
  const baseHero = (() => {
    switch (program.slug) {
      case "ambassador":
        return ambassadorHeroContent;
      case "sponsorship":
        return sponsorshipHeroContent;
      case "partnership":
        return clubpartnershipHero;
      case "affiliate":
      default:
        return affiliateHeroContent;
    }
  })();

  const headingLines = parseHeadingLines(program.heading, baseHero.headingLines);

  return {
    ...baseHero,
    eyebrow: program.textBatch || program.subheading || baseHero.eyebrow,
    headingLines,
    description: program.description || baseHero.description,
    visual: {
      ...baseHero.visual,
      image: program.image || baseHero.visual.image,
      imageAlt: program.subheading || program.title || baseHero.visual.imageAlt,
    },
  };
}

const PROGRAMS_TTL_MS = 5 * 60 * 1000;
let programsCache: { data: ProgramItem[]; timestamp: number } | null = null;
let programsRequest: Promise<ProgramItem[]> | null = null;
let programsRequestToken: symbol | null = null;

export const programsService = {
  /**
   * Clears in-memory programs cache
   */
  clearCache(): void {
    programsCache = null;
    programsRequest = null;
    programsRequestToken = null;
    apiClient.clearCache("/programs");
  },

  /**
   * Fetches programs list from backend API with in-memory caching and fallback
   */
  async getPrograms(forceRefresh = false): Promise<ProgramItem[]> {
    const cached = programsCache;
    const isFresh = cached && Date.now() - cached.timestamp < PROGRAMS_TTL_MS;
    if (!forceRefresh && isFresh) {
      return cached.data;
    }
    if (!forceRefresh && programsRequest) {
      return programsRequest;
    }

    const requestToken = Symbol("programs");
    const request = (async () => {
      await Promise.resolve();
      try {
        const raw = await apiClient.get<ApiProgramItem[]>("/programs", { forceRefresh });

        const mapped = Array.isArray(raw) && raw.length > 0
          ? raw
              .slice()
              .sort((a, b) => Number(b.id) - Number(a.id)) // 4, 3, 2, 1
              .map(mapApiProgramToProgram)
          : localPrograms;

        programsCache = { data: mapped, timestamp: Date.now() };
        return mapped;
      } catch (err) {
        console.warn("Could not fetch /programs, using fallback:", err);
        return localPrograms;
      } finally {
        if (programsRequestToken === requestToken) {
          programsRequest = null;
          programsRequestToken = null;
        }
      }
    })();

    if (!forceRefresh) {
      programsRequest = request;
      programsRequestToken = requestToken;
    }

    return request;
  },

  /**
   * Fetches programs formatted as NavSubItem array for dropdowns
   */
  async getNavPrograms(): Promise<NavSubItem[]> {
    const all = await programsService.getPrograms();
    return mapProgramsToNavItems(all);
  },

  /**
   * Finds a program by slug or id
   */
  async getProgramBySlug(slug: string): Promise<ProgramItem | undefined> {
    const all = await programsService.getPrograms();
    const norm = slug.toLowerCase().replace(/[^a-z0-9]/g, "");
    return all.find(
      (p) =>
        p.slug === slug ||
        p.id === slug ||
        p.slug.replace(/[^a-z0-9]/g, "") === norm ||
        p.title.toLowerCase().replace(/[^a-z0-9]/g, "") === norm ||
        p.subheading.toLowerCase().replace(/[^a-z0-9]/g, "") === norm
    );
  },

  /**
   * Fetches specific Program page data payload with dynamic hero
   */
  async getProgramPageData(slug: string): Promise<ProgramPageData> {
    const allPrograms = await programsService.getPrograms();
    let selected = await programsService.getProgramBySlug(slug);

    if (!selected) {
      selected = allPrograms.find((p) => p.slug === slug) || allPrograms[0] || localPrograms[0];
    }

    const hero = buildProgramHero(selected);

    return {
      hero,
      program: selected,
      allPrograms,
      steps: STEPS,
      audienceTags: audienceTags,
    };
  },

  /**
   * Fetches the entire Programs page payload (Affiliate page base).
   */
  async getProgramsPageData(): Promise<ProgramsPageData> {
    const pageData = await programsService.getProgramPageData("affiliate");
    return {
      ...pageData,
      steps: STEPS,
      audienceTags: audienceTags,
    };
  },

  /**
   * Fetches step-by-step process items for programs.
   */
  async getProgramSteps(): Promise<Step[]> {
    return apiClient.fetchWithFallback<Step[]>("/programs/steps", STEPS);
  },

  /**
   * Submits a program application to the backend API.
   * Includes the unique program_id (e.g., 'ambassador', 'affiliate', 'sponsorship', 'partnership').
   */
  async submitProgramApplication(
    payload: ProgramApplicationPayload
  ): Promise<ProgramApplicationResponse> {
    try {
      return await apiClient.post<ProgramApplicationResponse, ProgramApplicationPayload>(
        "/programs/apply",
        payload,
        {
          Accept: "application/json",
        }
      );
    } catch (err: unknown) {
      const apiErr = err as {
        message?: string;
        details?: { message?: string; errors?: Record<string, string[] | string> };
      };

      let errorMessage =
        apiErr?.details?.message || apiErr?.message || "Failed to submit application. Please try again.";

      if (apiErr?.details?.errors && typeof apiErr.details.errors === "object") {
        const messages: string[] = [];
        for (const key of Object.keys(apiErr.details.errors)) {
          const val = apiErr.details.errors[key];
          if (Array.isArray(val)) {
            messages.push(...val);
          } else if (typeof val === "string") {
            messages.push(val);
          }
        }
        if (messages.length > 0) {
          errorMessage = messages.join(" ");
        }
      }

      console.error("Program application failed:", err);
      return {
        success: false,
        message: errorMessage,
      };
    }
  },
};
