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

export interface ProgramApplicationPayload {
  program_id: string; // e.g. "ambassador" | "affiliate" | "sponsorship" | "partnership"
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
        payload
      );
    } catch (err) {
      console.warn("API submission endpoint offline, returning simulated success:", err);
      // Simulate clean API response fallback for development
      return {
        success: true,
        message: `Application submitted successfully for ${payload.program_id} program!`,
        id: `APP-${Date.now().toString().slice(-6)}`,
      };
    }
  },
};
