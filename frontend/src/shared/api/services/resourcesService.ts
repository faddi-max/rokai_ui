import { apiClient } from "@/shared/api/apiClient";
import {
  downloadableResources,
  sizingMatrixData,
  resourcesFaqs,
  type ResourceDownload,
  type SizingRow,
} from "@/features/resources/data/resourcesData";
import type { FAQItemData } from "@/shared/types/sections";

export interface ResourcesPageData {
  resources: ResourceDownload[];
  sizingMatrix: SizingRow[];
  faqs: FAQItemData[];
}

export const resourcesService = {
  /**
   * Fetches the entire Resources page payload.
   * Future API integration:
   * return apiClient.get<ResourcesPageData>('/resources');
   */
  async getResourcesPageData(): Promise<ResourcesPageData> {
    return apiClient.simulateCall<ResourcesPageData>({
      resources: downloadableResources,
      sizingMatrix: sizingMatrixData,
      faqs: resourcesFaqs,
    });
  },

  /**
   * Fetches downloadable spec sheets and templates.
   * Future API integration:
   * return apiClient.get<ResourceDownload[]>('/resources/downloads');
   */
  async getDownloads(): Promise<ResourceDownload[]> {
    return apiClient.simulateCall<ResourceDownload[]>(downloadableResources);
  },
};
