import { apiClient } from "@/shared/api/apiClient";
import {
  categoriesHeroData,
  categoriesCardsData,
  fabricSpecsSplitData,
  orderingSteps,
  categoriesFaqs,
} from "@/features/categories/data/categoriesData";
import type {
  ContentCardData,
  FAQItemData,
  PageHeroProps,
  ProcessStep,
  SplitMediaData,
} from "@/shared/types/sections";

export interface CategoriesPageData {
  hero: PageHeroProps;
  catalog: ContentCardData[];
  fabricSpecs: SplitMediaData;
  steps: ProcessStep[];
  faqs: FAQItemData[];
}

export const categoriesService = {
  /**
   * Fetches the entire Categories page payload.
   * Future API integration:
   * return apiClient.get<CategoriesPageData>('/categories');
   */
  async getCategoriesPageData(): Promise<CategoriesPageData> {
    return apiClient.simulateCall<CategoriesPageData>({
      hero: categoriesHeroData,
      catalog: categoriesCardsData,
      fabricSpecs: fabricSpecsSplitData,
      steps: orderingSteps,
      faqs: categoriesFaqs,
    });
  },

  /**
   * Fetches only the product categories catalog items.
   * Future API integration:
   * return apiClient.get<ContentCardData[]>('/categories/catalog');
   */
  async getCatalog(): Promise<ContentCardData[]> {
    return apiClient.simulateCall<ContentCardData[]>(categoriesCardsData);
  },
};
