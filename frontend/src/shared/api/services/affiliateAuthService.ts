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
  };
  token: string;
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
    return res.data?.data || res.data || res;
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
};