/**
 * ROKAI API Client
 *
 * Centralized, production-ready HTTP client for handling backend API integration.
 * Includes an in-memory caching mechanism (TTL / Stale-While-Revalidate) to prevent
 * redundant network calls when users navigate between pages or reopen routes.
 */

export interface ApiResponse<T> {
  success?: boolean;
  data: T;
  status?: number;
  message?: string;
  meta?: unknown;
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

export interface RequestOptions {
  headers?: HeadersInit;
 
  cache?: boolean;
 
  ttlMs?: number;

  forceRefresh?: boolean;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const DEFAULT_TTL_MS = 5 * 60 * 1000; 
const apiCache = new Map<string, CacheEntry<unknown>>();

const getEnvBaseUrl = (): string => {
  const env = (import.meta as unknown as { env?: Record<string, string> }).env || {};
  const rawUrl =
    env.VITE_API_BASE_URL ||
    env.VITE_API_URL ||
    env.API_BASE_URL ||
    "https://augmented-glucose-platform.ngrok-free.dev";

  const cleanUrl = rawUrl.replace(/\/+$/, "");
  return cleanUrl.endsWith("/api/v1") ? cleanUrl : `${cleanUrl}/api/v1`;
};

export const API_BASE_URL = getEnvBaseUrl();

function buildUrl(endpoint: string): string {
  const cleanBase = API_BASE_URL.replace(/\/+$/, "");
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${cleanBase}${cleanEndpoint}`;
}

export const apiClient = {
  baseUrl: API_BASE_URL,

  /**
   * Performs an HTTP GET request with automatic in-memory caching to eliminate redundant network calls.
   */
  async get<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const {
      headers = {},
      cache = true,
      ttlMs = DEFAULT_TTL_MS,
      forceRefresh = false,
    } = options;

    const url = buildUrl(endpoint);

    // 1. Check in-memory cache if enabled and not forcing a refresh
    if (cache && !forceRefresh && apiCache.has(url)) {
      const entry = apiCache.get(url) as CacheEntry<T>;
      const isFresh = Date.now() - entry.timestamp < ttlMs;
      if (isFresh) {
        return entry.data;
      }
    }

    // 2. Perform fresh network request
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          ...headers,
        },
      });

      if (!response.ok) {
        throw new ApiError(
          response.status,
          `GET ${endpoint} failed with status ${response.status}`
        );
      }

      const resJson = await response.json();

      // Unwrap API response envelope ({ success: true, data: T })
      const result: T =
        resJson && typeof resJson === "object" && "data" in resJson
          ? (resJson as { data: T }).data
          : (resJson as T);

      // 3. Save result to cache
      if (cache) {
        apiCache.set(url, {
          data: result,
          timestamp: Date.now(),
        });
      }

      return result;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, (error as Error).message || "Network Error");
    }
  },


  async post<T, B = unknown>(
    endpoint: string,
    body: B,
    headers: HeadersInit = {}
  ): Promise<T> {
    const url = buildUrl(endpoint);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
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

      const resJson = await response.json();

      const result: T =
        resJson && typeof resJson === "object" && "data" in resJson
          ? (resJson as { data: T }).data
          : (resJson as T);

      // Invalidate cache on mutations
      apiCache.clear();

      return result;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, (error as Error).message || "Network Error");
    }
  },

  /**
   * Tries to fetch data from the real API endpoint first (with caching).
   * If the request fails (e.g. backend offline, ngrok down, 404),
   * it falls back to local data gracefully.
   */
  async fetchWithFallback<T>(
    endpoint: string,
    fallbackData: T,
    options: RequestOptions = {},
    delayMs = 250
  ): Promise<T> {
    try {
      return await this.get<T>(endpoint, options);
    } catch {
      return this.simulateCall<T>(fallbackData, delayMs);
    }
  },

  /**
   * Clears specific cached endpoint or all cached API responses.
   */
  clearCache(endpoint?: string): void {
    if (endpoint) {
      const url = buildUrl(endpoint);
      apiCache.delete(url);
    } else {
      apiCache.clear();
    }
  },

  /**
   * Utility helper to simulate an asynchronous API call with realistic latency.
   */
  simulateCall<T>(data: T, delayMs = 300): Promise<T> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, delayMs);
    });
  },
};
