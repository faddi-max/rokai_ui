import { apiClient } from "@/shared/api/apiClient";

export interface PartnershipApplicationPayload {
  type: string;
  full_name: string;
  email: string;
  whatsapp_number: string;
  gym_academy_name?: string;
  instagram_website?: string;
  number_of_members?: string;
  looking_for?: string;
  agreed_to_terms: boolean;
}

export interface PartnershipApplicationResponse {
  success: boolean;
  message: string;
  id?: string | number;
  data?: unknown;
}

export function resolveApplicationType(rawId: string): string {
  const norm = (rawId || "").toLowerCase().trim();
  if (norm.includes("ambassador")) return "ambassador";
  if (norm.includes("club") || norm.includes("partnership")) return "club";
  if (norm.includes("sponsor")) return "sponsorship";
  if (norm.includes("affiliate")) return "affiliate";
  return norm || "ambassador";
}

export const partnershipApplicationsService = {
  /**
   * Submits a partnership application (ambassador, club, etc.)
   * to POST /partnership-applications with comprehensive error handling.
   */
  async submitApplication(
    payload: PartnershipApplicationPayload
  ): Promise<PartnershipApplicationResponse> {
    try {
      const responseData = await apiClient.post<
        { id?: string | number; message?: string } | PartnershipApplicationResponse,
        PartnershipApplicationPayload
      >("/partnership-applications", payload, {
        Accept: "application/json",
      });

      const resId =
        responseData && typeof responseData === "object" && "id" in responseData
          ? (responseData as { id: string | number }).id
          : `APP-${Date.now().toString().slice(-6)}`;

      const resMessage =
        responseData &&
        typeof responseData === "object" &&
        "message" in responseData &&
        typeof (responseData as { message?: string }).message === "string"
          ? (responseData as { message: string }).message
          : "Your application submitted successfully!";

      console.log("Partnership application API success response:", responseData);

      return {
        success: true,
        message: resMessage,
        id: resId,
        data: responseData,
      };
    } catch (err: unknown) {
      const apiErr = err as {
        status?: number;
        message?: string;
        details?: { message?: string; errors?: Record<string, string[] | string> };
      };

      let errorMessage =
        apiErr?.details?.message ||
        apiErr?.message ||
        "Submission failed. Please check your information and try again.";

      // Extract specific validation messages returned by the API
      if (apiErr?.details?.errors && typeof apiErr.details.errors === "object") {
        const messages: string[] = [];
        for (const key of Object.keys(apiErr.details.errors)) {
          const val = apiErr.details.errors[key];
          if (Array.isArray(val)) {
            messages.push(...val);
          } else if (typeof val === "string") {
            messages.push(val);
          }
        }
        if (messages.length > 0) {
          errorMessage = messages.join(" ");
        }
      }

      console.error("Partnership application error:", {
        status: apiErr?.status,
        message: errorMessage,
        error: err,
      });

      return {
        success: false,
        message: errorMessage,
      };
    }
  },
};
