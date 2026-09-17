import { apiClient } from "@/shared/api/apiClient";
import {
  programsHeroData,
  programsCardsData,
  academySplitData,
  programSteps,
  programsFaqs,
} from "@/features/programs/data/programsData";
import type {
  ContentCardData,
  FAQItemData,
  ProcessStep,
  SplitMediaData,
} from "@/shared/types/sections";
import type { HeroContent } from "@/shared/types/hero";

export interface ProgramsPageData {
  hero: HeroContent;
  programs: ContentCardData[];
  academyEconomics: SplitMediaData;
  steps: ProcessStep[];
  faqs: FAQItemData[];
}

export const programsService = {
  /**
   * Fetches the entire Programs page payload.
   * Future API integration:
   * return apiClient.get<ProgramsPageData>('/programs');
   */
  async getProgramsPageData(): Promise<ProgramsPageData> {
    return apiClient.simulateCall<ProgramsPageData>({
      hero: programsHeroData,
      programs: programsCardsData,
      academyEconomics: academySplitData,
      steps: programSteps,
      faqs: programsFaqs,
    });
  },

  /**
   * Fetches only the partnership program cards.
   * Future API integration:
   * return apiClient.get<ContentCardData[]>('/programs/cards');
   */
  async getPrograms(): Promise<ContentCardData[]> {
    return apiClient.simulateCall<ContentCardData[]>(programsCardsData);
  },
};
