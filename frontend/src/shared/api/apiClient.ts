/**
 * ROKAI API Client
 *
 * Centralized HTTP client for handling future backend API integration.
 * Replace simulated calls with `apiClient.get(...)` or `apiClient.post(...)`
 * once backend endpoints are available.
 */

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const API_BASE_URL =
  (import.meta as unknown as { env?: { VITE_API_URL?: string } }).env?.VITE_API_URL ||
  "/api";

export const apiClient = {
  /**
   * Performs an HTTP GET request
   */
  async get<T>(endpoint: string, headers: HeadersInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });

      if (!response.ok) {
        throw new ApiError(
          response.status,
          `GET ${endpoint} failed with status ${response.status}`
        );
      }

      return (await response.json()) as T;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, (error as Error).message || "Network Error");
    }
  },

  /**
   * Performs an HTTP POST request
   */
  async post<T, B = unknown>(
    endpoint: string,
    body: B,
    headers: HeadersInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new ApiError(
          response.status,
          `POST ${endpoint} failed with status ${response.status}`
        );
      }

      return (await response.json()) as T;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, (error as Error).message || "Network Error");
    }
  },

  /**
   * Utility helper to simulate an asynchronous API call with realistic latency.
   * Enables testing of loaders, shimmer skeletons, and empty states.
   * 
   * When integrating real APIs, simply replace:
   * `return simulateApiCall(mockData);`
   * with:
   * `return apiClient.get<T>('/your-endpoint');`
   */
  simulateCall<T>(data: T, delayMs = 350): Promise<T> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, delayMs);
    });
  },
};
