import { apiClient } from "@/shared/api/apiClient";
import { categoryHeroContent } from "@/features/categories/data/heroContent";
import type { HeroContent } from "@/shared/types/hero";

export interface CategoriesPageData {
  hero: HeroContent;
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
    });
  },
};
