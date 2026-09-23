import { apiClient } from "@/shared/api/apiClient";
import { affiliateHeroContent } from "@/features/programs/affiliate-program/data/heroContent";
import { STEPS, Step } from "@/features/programs/affiliate-program/data/steps.data";
import { audienceTags } from "@/features/programs/affiliate-program/data/audienceTags";
import type { HeroContent } from "@/shared/types/hero";

export interface ProgramsPageData {
  hero: HeroContent;
  steps: Step[];
  audienceTags: string[];
}

export const programsService = {
  /**
   * Fetches the entire Programs page payload.
   */
  async getProgramsPageData(): Promise<ProgramsPageData> {
    const fallback: ProgramsPageData = {
      hero: affiliateHeroContent,
      steps: STEPS,
      audienceTags: audienceTags,
    };
    return apiClient.fetchWithFallback<ProgramsPageData>("/programs/page", fallback);
  },

  /**
   * Fetches step-by-step process items for programs.
   */
  async getProgramSteps(): Promise<Step[]> {
    return apiClient.fetchWithFallback<Step[]>("/programs/steps", STEPS);
  },
};
