import { apiClient } from "@/shared/api/apiClient";

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}
export interface LoginPayload {
  email: string;
  password: string;
}
export interface OtpVerifyPayload {
  email: string;
  otp: string;
}
export interface ForgotPasswordPayload {
  email: string;
}
export interface ResetPasswordPayload {
  email: string;
  otp: string;
  password: string;
}
export interface MessageResponse {
  success: boolean;
  message: string;
}
export interface AuthResponse {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
  profile: {
    id: number;
    user_id: number;
    status: string;
    commission_percentage: string | number;
    badge_tier: string;
    website_url?: string | null;
    linkedin?: string | null;
    youtube?: string | null;
    instagram?: string | null;
    facebook?: string | null;
    tiktok?: string | null;
    order_amount?: number | string | null;
    notes?: string | null;
  };
  token: string;
 
}


function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isDisplayableMessage(value: string): boolean {
  const message = value.trim();
  return (
    message.length > 0 &&
    message.length <= 400 &&
    !/<\/?[a-z][^>]*>|<style\b|<!doctype/i.test(message) &&
    !/[{}]/.test(message) &&
    !/(?:^|[;}])\s*[-\w]+\s*:\s*[^;{}]+;/.test(message)
  );
}

function unwrapMessageResponse(response: unknown): MessageResponse {
  let result = response;
  if (isRecord(result) && "data" in result) {
    result = result.data;
    if (isRecord(result) && "data" in result) result = result.data;
  }

  if (!isRecord(result)) {
    throw new Error("The server returned an unexpected response. Please try again.");
  }
  if (result.success === false) {
    throw new Error(
      typeof result.message === "string" && isDisplayableMessage(result.message)
        ? result.message
        : "The request could not be completed. Please try again."
    );
  }
  if (
    typeof result.success !== "boolean" ||
    typeof result.message !== "string"
  ) {
    throw new Error("The server returned an unexpected response. Please try again.");
  }
  return {
    success: result.success,
    message: isDisplayableMessage(result.message) ? result.message : "",
  };
}

// interface ApiResponse<T> {
//   success: boolean;
//   message: string;
//   data?: T;
// }

export const affiliateAuthService = {
  async signup(payload: SignupPayload): Promise<AuthResponse> {
    const res = await apiClient.post<any, SignupPayload>("/affiliate/register", payload);
    console.log(res);
    const result = res?.data?.data || res?.data || res;
    if (result?.success === false) {
      throw new Error(result.message || "This email is already registered. Please log in instead.");
    }
    return result;
  },

  async login(payload: LoginPayload): Promise<AuthResponse> {
    const res = await apiClient.post<any, LoginPayload>("/affiliate/login", payload);
    console.log(res);
    return res.data?.data || res.data || res;
  },

  async verifyOtp(payload: OtpVerifyPayload): Promise<AuthResponse> {
    const res = await apiClient.post<any, OtpVerifyPayload>("/affiliate/verify-otp", payload);
    console.log(res.message);
    return res.data?.data || res.data || res;
  },

  async resendOtp(payload: { email: string }): Promise<{ success: boolean; message: string }> {
    const res = await apiClient.post<any, { email: string }>("/affiliate/resend-otp", payload);
    return res.data || res;
  },

  async forgotPassword(payload: ForgotPasswordPayload): Promise<MessageResponse> {
    const response = await apiClient.post<unknown, ForgotPasswordPayload>(
      "/affiliate/forgot-password",
      payload
    );
    return unwrapMessageResponse(response);
  },

  async resetPassword(payload: ResetPasswordPayload): Promise<MessageResponse> {
    const response = await apiClient.post<unknown, ResetPasswordPayload>(
      "/affiliate/reset-password",
      payload
    );
    return unwrapMessageResponse(response);
  },
  
};