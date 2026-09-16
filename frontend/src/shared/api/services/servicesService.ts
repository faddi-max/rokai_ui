import { apiClient } from "@/shared/api/apiClient";
import {
  servicesHeroData,
  serviceCapabilitiesCards,
  servicesProcessSteps,
  labTestingSplitData,
  servicesFaqs,
} from "@/features/services/data/servicesData";
import type {
  ContentCardData,
  FAQItemData,
  PageHeroProps,
  ProcessStep,
  SplitMediaData,
} from "@/shared/types/sections";

export interface ServicesPageData {
  hero: PageHeroProps;
  capabilities: ContentCardData[];
  steps: ProcessStep[];
  labTesting: SplitMediaData;
  faqs: FAQItemData[];
}

export const servicesService = {
  /**
   * Fetches the entire Services page data payload.
   * Future API integration:
   * return apiClient.get<ServicesPageData>('/services');
   */
  async getServicesPageData(): Promise<ServicesPageData> {
    return apiClient.simulateCall<ServicesPageData>({
      hero: servicesHeroData,
      capabilities: serviceCapabilitiesCards,
      steps: servicesProcessSteps,
      labTesting: labTestingSplitData,
      faqs: servicesFaqs,
    });
  },

  /**
   * Fetches manufacturing capabilities cards.
   * Future API integration:
   * return apiClient.get<ContentCardData[]>('/services/capabilities');
   */
  async getCapabilities(): Promise<ContentCardData[]> {
    return apiClient.simulateCall<ContentCardData[]>(serviceCapabilitiesCards);
  },
};
