import { API_BASE_URL, apiClient } from "@/shared/api/apiClient";

export interface InquiryPayload {
  name: string;
  brand_name: string;
  email: string;
  inquiry_type: string;
  message: string;
  attachment?: File | null;
}

export interface ApiInquiryData {
  id: number;
  name: string;
  brand_name: string;
  email: string;
  inquiry_type: string;
  message: string;
  attachment: string | null;
  created_at: string;
  updated_at: string;
}

export interface InquiryResponse {
  success: boolean;
  message: string;
  data?: ApiInquiryData | unknown;
  id?: string | number;
}

export const inquiriesService = {
  /**
   * Submits a general inquiry to POST /inquiries
   */
  async submitInquiry(payload: InquiryPayload): Promise<InquiryResponse> {
    try {
      let responseData: unknown;
      let resMessage = "Your inquiry has been sent successfully!";
      let resId: string | number = `INQ-${Date.now().toString().slice(-6)}`;

      if (payload.attachment instanceof File) {
        // Multipart upload when attachment is provided
        const cleanBase = API_BASE_URL.replace(/\/+$/, "");
        const url = `${cleanBase}/inquiries`;

        const formData = new FormData();
        formData.append("name", payload.name);
        formData.append("brand_name", payload.brand_name);
        formData.append("email", payload.email);
        formData.append("inquiry_type", payload.inquiry_type);
        formData.append("message", payload.message);
        formData.append("attachment", payload.attachment);

        const response = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          body: formData,
        });

        const resJson = await response.json();

        if (!response.ok) {
          let errorMsg =
            resJson?.message || `Inquiry submission failed with status ${response.status}`;
          if (resJson?.errors && typeof resJson.errors === "object") {
            const lines: string[] = [];
            for (const key of Object.keys(resJson.errors)) {
              const val = resJson.errors[key];
              if (Array.isArray(val)) lines.push(...val);
              else if (typeof val === "string") lines.push(val);
            }
            if (lines.length > 0) errorMsg = lines.join(" ");
          }
          console.error("Inquiry API error:", errorMsg);
          return { success: false, message: errorMsg };
        }

        responseData = resJson?.data || resJson;
        if (resJson?.message) resMessage = resJson.message;
        if (resJson?.data?.id) resId = resJson.data.id;
      } else {
        // Standard JSON submission via apiClient
        const jsonBody = {
          name: payload.name,
          brand_name: payload.brand_name,
          email: payload.email,
          inquiry_type: payload.inquiry_type,
          message: payload.message,
        };

        const res = await apiClient.post<
          { id?: string | number; message?: string } | ApiInquiryData,
          typeof jsonBody
        >("/inquiries", jsonBody, {
          Accept: "application/json",
        });

        responseData = res;
        if (res && typeof res === "object" && "id" in res && res.id) {
          resId = res.id;
        }
        if (res && typeof res === "object" && "message" in res && typeof res.message === "string") {
          resMessage = res.message;
        }
      }

      console.log("Inquiry API success response:", responseData);

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

      if (apiErr?.details?.errors && typeof apiErr.details.errors === "object") {
        const messages: string[] = [];
        for (const key of Object.keys(apiErr.details.errors)) {
          const val = apiErr.details.errors[key];
          if (Array.isArray(val)) messages.push(...val);
          else if (typeof val === "string") messages.push(val);
        }
        if (messages.length > 0) {
          errorMessage = messages.join(" ");
        }
      }

      console.error("Inquiry submission error:", {
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
