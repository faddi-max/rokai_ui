import { sizeChartsFallback } from "@/features/services/BJJApparelSizeChartPage/data/sizeCharts";
import { apiClient } from "@/shared/api/apiClient";

import type { SizeChartData } from "@/shared/types/sizeChart";

export const sizeChartService = {
  /** GET /size-charts → SizeChartData[]; falls back to local data if the API is offline. */
  async getSizeCharts(): Promise<SizeChartData[]> {
    return apiClient.fetchWithFallback<SizeChartData[]>(
      "/size-charts",
      sizeChartsFallback
    );
  },
};