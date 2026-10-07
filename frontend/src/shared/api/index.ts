export { apiClient, ApiError, API_BASE_URL } from "./apiClient";
export type { ApiResponse } from "./apiClient";

export { categoriesService } from "./services/categoriesService";
export type { PageData } from "./services/categoriesService";

export { blogsService } from "./services/blogsService";
export { programsService } from "./services/programsService";
export { resourcesService } from "./services/resourcesService";
export { servicesService } from "./services/servicesService";
export { cataloguesService } from "./services/cataloguesService";
export type { CatalogueItem, CataloguePageData } from "./services/cataloguesService";
export {
  partnershipApplicationsService,
  resolveApplicationType,
} from "./services/partnershipApplicationsService";
export type {
  PartnershipApplicationPayload,
  PartnershipApplicationResponse,
} from "./services/partnershipApplicationsService";
export { inquiriesService } from "./services/inquiriesService";
export type {
  InquiryPayload,
  InquiryResponse,
  ApiInquiryData,
} from "./services/inquiriesService";
