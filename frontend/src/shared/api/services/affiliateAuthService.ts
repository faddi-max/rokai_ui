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

export const affiliateAuthService = {
  async signup(payload: SignupPayload): Promise<AuthResponse> {
    return apiClient.post<AuthResponse, SignupPayload>("/affiliate/register", payload);
  },

  async login(payload: LoginPayload): Promise<AuthResponse> {
    return apiClient.post<AuthResponse, LoginPayload>("/affiliate/login", payload);
  },
};