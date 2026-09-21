import { apiClient } from "@/shared/api/apiClient";
import { categoryHeroContent } from "@/features/categories/data/heroContent";
import type { BlogCategory, HeroContent } from "@/shared/types/hero";
import { heroContent } from "@/features/blogs/data/bloghero";
import { blogCategories } from "@/features/blogs/data/blogCategories";
import { affiliateHeroContent } from "@/features/programs/data/heroContent";
import { categories as localCategories } from "@/features/categories/data/catagories";
import type { Category } from "@/features/home/data/categories";
import { ambassadorHeroContent } from "@/features/programs/ambassador-program/data/ambassadorHero";

export interface PageData {
  hero: HeroContent;
  blogCategories: BlogCategory[];
  categoryHeroContent: HeroContent;
  categories?: Category[];
}

export const categoriesService = {
  /**
   * Fetches the entire Categories page payload.
   */
  async getCategoriesPageData(): Promise<PageData> {
    const fallback: PageData = {
      hero: categoryHeroContent,
      blogCategories: blogCategories || [],
      categoryHeroContent: categoryHeroContent,
      categories: localCategories,
    };
    return apiClient.fetchWithFallback<PageData>("/categories/page", fallback);
  },

  /**
   * Fetches product categories list
   */
  async getCategories(): Promise<Category[]> {
    return apiClient.fetchWithFallback<Category[]>("/categories", localCategories);
  },

  /**
   * Fetches a single category by ID/slug
   */
  async getCategoryById(id: string): Promise<Category | undefined> {
    try {
      return await apiClient.get<Category>(`/categories/${id}`);
    } catch {
      const found = localCategories.find((c) => c.id === id);
      return apiClient.simulateCall<Category | undefined>(found);
    }
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
};
