import { apiClient } from "@/shared/api/apiClient";
import { categoryHeroContent } from "@/features/categories/data/heroContent";
import type { BlogCategory, HeroContent } from "@/shared/types/hero";
import { heroContent } from "@/features/blogs/data/bloghero";
import {blogCategories} from "@/features/blogs/data/blogCategories"
export interface CategoriesPageData {
  hero: HeroContent;
  blogCategories:BlogCategory[],
  categoryHeroContent: HeroContent;
}

export const categoriesService = {
  /**
   * Fetches the entire Categories page payload.
   * Future API integration:
   * return apiClient.get<CategoriesPageData>('/categories');
   */
  async getCategoriesPageData(): Promise<CategoriesPageData> {
    return apiClient.simulateCall<CategoriesPageData>({
      hero: categoryHeroContent,
      blogCategories: [],
      categoryHeroContent: categoryHeroContent,
    });
  },
    async getblogPageData(): Promise<CategoriesPageData> {
    return apiClient.simulateCall<CategoriesPageData>({
      hero: heroContent,
      categoryHeroContent: categoryHeroContent,
      blogCategories: blogCategories || [], 
    });
  },
};
