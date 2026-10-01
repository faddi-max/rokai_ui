import { apiClient } from "@/shared/api/apiClient";
import { fabricsPageFallback } from "@/features/services/BJJApparelFabricsPage/data/fabricsData";
import type { FabricsPageData } from "@/shared/types/fabrics";

export const fabricsService = {
  /** GET /fabrics → FabricsPageData; falls back to local data if the API is offline. */
  async getFabricsPageData(): Promise<FabricsPageData> {
    return apiClient.fetchWithFallback<FabricsPageData>(
      "/fabrics",
      fabricsPageFallback
    );
  },
};