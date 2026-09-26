import { apiClient, API_BASE_URL } from "@/shared/api/apiClient";
import { categoryHeroContent } from "@/features/categories/data/heroContent";
import type { BlogCategory, HeroContent } from "@/shared/types/hero";
import { heroContent } from "@/features/blogs/data/bloghero";
import { blogCategories } from "@/features/blogs/data/blogCategories";
import { affiliateHeroContent } from "@/features/programs/affiliate-program/data/heroContent";
import { categories as localCategories } from "@/features/categories/data/catagories";
import type { Category } from "@/features/home/data/categories";
import { ambassadorHeroContent } from "@/features/programs/ambassador-program/data/ambassadorHero";
import { ambassadorHero } from "@/features/programs/sponsorship-program/data/ambassadorHero";
import { clubpartnershipHero } from "@/features/programs/club-partnership/data/clubpartnershiphero";
import { ResourcesHero } from "@/features/resources/data/resourseHero";
import { Privateservicehero } from "@/features/services/PrivateLabelManufacturingPage/data/PrivateServiceHero";
import { catagoriespage1 } from "@/assets";
import type { CategoryLink, CategoryGroup, CategoryGroupItem } from "@/shared/config/navigation";

export interface ApiCategory {
  id: number;
  parent_id: number | null;
  title: string;
  slug: string;
  description: string | null;
  image: string | null;
  status: string;
  sort_order: number;
  level: number;
  created_at?: string;
  updated_at?: string;
  children?: ApiCategory[];
}

export interface PageData {
  hero: HeroContent;
  blogCategories: BlogCategory[];
  categoryHeroContent: HeroContent;
  categories?: Category[];
  category?: Category;
  allCategories?: Category[];
}

export const PUBLIC_HOST = (() => {
  try {
    return new URL(API_BASE_URL).host;
  } catch {
    return "";
  }
})();

export function sanitizeImageUrl(url: string | null | undefined): string {
  if (!url || typeof url !== "string" || !url.trim() || url === "null" || url === "undefined") {
    return catagoriespage1;
  }

  const cleanUrl = url.trim();

  // 1. If it's already a full valid public URL (not localhost/127.0.0.1), keep the EXACT URL from API
  if (/^https?:\/\//i.test(cleanUrl) && !/127\.0\.0\.1|localhost/i.test(cleanUrl)) {
    return cleanUrl;
  }

  // 2. If it points to local dev server (127.0.0.1 or localhost), replace with PUBLIC_HOST using http://
  if (/^http:\/\/(127\.0\.0\.1|localhost)(:\d+)?/i.test(cleanUrl)) {
    if (PUBLIC_HOST) {
      return cleanUrl.replace(/^http:\/\/(127\.0\.0\.1|localhost)(:\d+)?/i, `http://${PUBLIC_HOST}`);
    }
  }

  // 3. Prepend http://${PUBLIC_HOST} for relative /storage paths
  if (cleanUrl.startsWith("/storage/") && PUBLIC_HOST) {
    return `http://${PUBLIC_HOST}${cleanUrl}`;
  }

  return cleanUrl;
}

export function mapApiCategoryToCategory(cat: ApiCategory, parentSlug?: string): Category {
  const slug = cat.slug || String(cat.id);
  const image = sanitizeImageUrl(cat.image);
  const buttonHref = cat.level === 1
    ? `/categories/${slug}`
    : `/categories/${parentSlug || slug}/${slug}`;

  const mappedChildren = Array.isArray(cat.children)
    ? cat.children.map((child) => mapApiCategoryToCategory(child, parentSlug || slug))
    : [];

  return {
    id: String(cat.id),
    slug,
    parent_id: cat.parent_id,
    level: cat.level,
    title: cat.title,
    description: cat.description || `Explore our high quality ${cat.title} apparel and gear.`,
    image: image,
    imageAlt: cat.title,
    buttonLabel: `Explore ${cat.title}`,
    buttonHref,
    children: mappedChildren,
  };
}

function normalizeSlug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function findCategoryBySlug(categories: Category[], slug: string): Category | undefined {
  const normTarget = normalizeSlug(slug);

  function search(items: Category[]): Category | undefined {
    for (const item of items) {
      if (item.slug && item.slug === slug) return item;
      if (item.id === slug) return item;
      if (item.slug && normalizeSlug(item.slug) === normTarget) return item;
      if (item.children && item.children.length > 0) {
        const found = search(item.children);
        if (found) return found;
      }
    }
    return undefined;
  }

  return search(categories);
}

export function mapCategoriesToNavLinks(apiCategories: Category[]): CategoryLink[] {
  return apiCategories
    .filter((parent) => !parent.parent_id || parent.level === 1)
    .map((parent) => {
      const groups: CategoryGroup[] = [];
      const quickLinks: CategoryGroupItem[] = [];

      if (Array.isArray(parent.children)) {
        parent.children.forEach((child) => {
          if (Array.isArray(child.children) && child.children.length > 0) {
            groups.push({
              title: child.title,
              items: child.children.map((subChild) => ({
                label: subChild.title,
                href: `/categories/${parent.slug || parent.id}/${subChild.slug || subChild.id}`,
              })),
            });
          } else {
            quickLinks.push({
              label: child.title,
              href: `/categories/${parent.slug || parent.id}/${child.slug || child.id}`,
            });
          }
        });
      }

      return {
        label: parent.title,
        href: `/categories/${parent.slug || parent.id}`,
        image: parent.image,
        groups,
        quickLinks: quickLinks.length > 0 ? quickLinks : undefined,
      };
    });
}

let categoriesCachePromise: Promise<Category[]> | null = null;

export const categoriesService = {
  /**
   * Clears in-memory categories cache
   */
  clearCache(): void {
    categoriesCachePromise = null;
    apiClient.clearCache("/categories");
  },

  /**
   * Fetches product categories list from backend API with in-memory caching
   */
  async getCategories(forceRefresh = false): Promise<Category[]> {
    if (forceRefresh) {
      categoriesCachePromise = null;
    }

    if (!categoriesCachePromise) {
      categoriesCachePromise = (async () => {
        try {
          const raw = await apiClient.get<ApiCategory[]>("/categories", { forceRefresh });
          if (Array.isArray(raw) && raw.length > 0) {
            return raw.map((cat) => mapApiCategoryToCategory(cat));
          }
        } catch (err) {
          console.warn("Could not fetch /categories, using fallback:", err);
        }
        return localCategories;
      })();
    }

    return categoriesCachePromise;
  },

  /**
   * Fetches categories mapped for the Navbar dropdown (Level 1 -> Level 2 -> Level 3)
   */
  async getNavCategories(): Promise<CategoryLink[]> {
    const all = await categoriesService.getCategories();
    return mapCategoriesToNavLinks(all);
  },

  /**
   * Fetches parent categories (level 1) for Homepage CategoriesSection
   */
  async getParentCategories(): Promise<Category[]> {
    const all = await categoriesService.getCategories();
    const parents = all.filter((c) => !c.parent_id || c.level === 1);
    return parents.length > 0 ? parents : all;
  },

  /**
   * Fetches category by slug or id
   */
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const all = await categoriesService.getCategories();
    return findCategoryBySlug(all, slug);
  },

  /**
   * Fetches a single category by ID/slug
   */
  async getCategoryById(id: string): Promise<Category | undefined> {
    return categoriesService.getCategoryBySlug(id);
  },

  /**
   * Fetches the entire Categories page payload.
   */
  async getCategoriesPageData(slug?: string): Promise<PageData> {
    const allCategories = await categoriesService.getCategories();

    let selectedCategory: Category | undefined;
    if (slug) {
      selectedCategory = findCategoryBySlug(allCategories, slug);
    }
    if (!selectedCategory) {
      selectedCategory = allCategories[0] || localCategories[0];
    }

    let childCategories: Category[] = [];
    if (selectedCategory && selectedCategory.children && selectedCategory.children.length > 0) {
      childCategories = selectedCategory.children;
    } else if (selectedCategory) {
      childCategories = allCategories.filter((c) => c.id !== selectedCategory?.id);
    }
    if (childCategories.length === 0) {
      childCategories = localCategories;
    }

    const titleText = selectedCategory ? selectedCategory.title.toUpperCase() : "EQUIPMENT & APPAREL";

    const dynamicHero: HeroContent = {
      ...categoryHeroContent,
      headingLines: [
        { text: titleText },
        { text: "BUILT TO PERFORM.", highlight: true },
      ],
      description: selectedCategory?.description || categoryHeroContent.description,
      visual: {
        type: "image",
        image: selectedCategory?.image || categoryHeroContent.visual.image,
        imageAlt: selectedCategory?.imageAlt || selectedCategory?.title || "ROKAI Category",
      },
    };

    return {
      hero: dynamicHero,
      blogCategories: blogCategories || [],
      categoryHeroContent: dynamicHero,
      categories: childCategories,
      category: selectedCategory,
      allCategories,
    };
  },

  /**
   * Fetches Programs page data payload
   */
  async getProgramsPageData(): Promise<PageData> {
    const fallback: PageData = {
      hero: affiliateHeroContent,
      categoryHeroContent: categoryHeroContent,
      blogCategories: blogCategories || [],
    };
    return apiClient.fetchWithFallback<PageData>("/programs/page", fallback);
  },

  /**
   * Fetches Blogs page data payload
   */
  async getBlogsPageData(): Promise<PageData> {
    const fallback: PageData = {
      hero: heroContent,
      categoryHeroContent: categoryHeroContent,
      blogCategories: blogCategories || [],
    };
    return apiClient.fetchWithFallback<PageData>("/blogs/page", fallback);
  },

  async getAmbassadorPageData(): Promise<PageData> {
    const fallback: PageData = {
      hero: ambassadorHeroContent,
      categoryHeroContent: categoryHeroContent,
      blogCategories: blogCategories || [],
    };
    return apiClient.fetchWithFallback<PageData>("/programs/page", fallback);
  },

  async getsponsershipPageData(): Promise<PageData> {
    const fallback: PageData = {
      hero: ambassadorHero,
      categoryHeroContent: categoryHeroContent,
      blogCategories: blogCategories || [],
    };
    return apiClient.fetchWithFallback<PageData>("/programs/page", fallback);
  },

  async getresourcesPageData(): Promise<PageData> {
    const fallback: PageData = {
      hero: ResourcesHero,
      categoryHeroContent: categoryHeroContent,
      blogCategories: blogCategories || [],
    };
    return apiClient.fetchWithFallback<PageData>("/programs/page", fallback);
  },

  async clubPartnershipPageData(): Promise<PageData> {
    const fallback: PageData = {
      hero: clubpartnershipHero,
      categoryHeroContent: categoryHeroContent,
      blogCategories: blogCategories || [],
    };
    return apiClient.fetchWithFallback<PageData>("/programs/page", fallback);
  },

  async ServicesPrivateLabelManufacture(): Promise<PageData> {
    const fallback: PageData = {
      hero: Privateservicehero,
      categoryHeroContent: categoryHeroContent,
      blogCategories: blogCategories || [],
    };
    return apiClient.fetchWithFallback<PageData>("/programs/page", fallback);
  },
};
