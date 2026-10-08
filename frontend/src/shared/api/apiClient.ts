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
  timeoutMs?: number;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const DEFAULT_TTL_MS = 5 * 60 * 1000;

const apiCache = new Map<string, CacheEntry<unknown>>();
const inFlightGetRequests = new Map<string, Promise<unknown>>();
const inFlightGetRequestTokens = new Map<string, symbol>();

const getEnvBaseUrl = (): string => {
  const env =
    (import.meta as unknown as { env?: Record<string, string> }).env || {};

  const rawUrl =
    env.VITE_API_BASE_URL ||
    env.VITE_API_URL ||
    env.API_BASE_URL ||
    "https://augmented-glucose-platform.ngrok-free.dev";

  const cleanUrl = rawUrl.replace(/\/+$/, "");

  return cleanUrl.endsWith("/api/v1")
    ? cleanUrl
    : `${cleanUrl}/api/v1`;
};

export const API_BASE_URL = getEnvBaseUrl();

function buildUrl(endpoint: string): string {
  const cleanBase = API_BASE_URL.replace(/\/+$/, "");
  const cleanEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;

  return `${cleanBase}${cleanEndpoint}`;
}

async function parseResponseBody(response: Response): Promise<unknown> {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    // Laravel sometimes returns an HTML error page instead of JSON.
    if (text.includes("<html") || text.includes("<!DOCTYPE")) {
      const titleMatch = text.match(
        /<title[^>]*>(.*?)<\/title>/is
      );

      const title = titleMatch?.[1]
        ?.replace(/\s+/g, " ")
        .trim();

      console.error(
        "[API] Server returned HTML instead of JSON."
      );

      console.error(
        "[API] HTML response:",
        text
      );

      return {
        html: true,
        title: title || "Laravel Server Error",
        raw: text,
      };
    }

    return text;
  }
}

function getErrorMessage(
  method: string,
  endpoint: string,
  status: number,
  details: unknown
): string {
  if (
    details &&
    typeof details === "object" &&
    "message" in details &&
    typeof details.message === "string"
  ) {
    return details.message;
  }

  return `${method} ${endpoint} failed with status ${status}`;
}

function unwrapData<T>(value: unknown): T {
  if (
    value &&
    typeof value === "object" &&
    "data" in value
  ) {
    return (value as { data: T }).data;
  }

  return value as T;
}

function throwIfApiFailure(
  method: string,
  endpoint: string,
  status: number,
  responseBody: unknown
): void {
  if (
    responseBody &&
    typeof responseBody === "object" &&
    "success" in responseBody &&
    responseBody.success === false
  ) {
    const message =
      "message" in responseBody &&
      typeof responseBody.message === "string"
        ? responseBody.message
        : `${method} ${endpoint} was not successful`;

    throw new ApiError(status, message, responseBody);
  }
}

export const apiClient = {
  baseUrl: API_BASE_URL,

  /* ------------------------------------------------------------------------ */
  /* GET                                                                      */
  /* ------------------------------------------------------------------------ */

  async get<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const {
      headers = {},
      cache = true,
      ttlMs = DEFAULT_TTL_MS,
      forceRefresh = false,
      timeoutMs = 8000,
    } = options;

    const url = buildUrl(endpoint);

    if (cache && !forceRefresh && apiCache.has(url)) {
      const entry = apiCache.get(url) as CacheEntry<T>;
      const isFresh = Date.now() - entry.timestamp < ttlMs;

      if (isFresh) {
        return entry.data;
      }
    }

    if (cache && !forceRefresh) {
      const inFlightRequest = inFlightGetRequests.get(url);

      if (inFlightRequest) {
        return inFlightRequest as Promise<T>;
      }
    }

    const requestToken = Symbol(url);

    const request = (async (): Promise<T> => {
      await Promise.resolve();

      const controller = new AbortController();
      const timer = setTimeout(
        () => controller.abort(),
        timeoutMs
      );

      try {
        const response = await fetch(url, {
          method: "GET",
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            ...headers,
          },
        });

        const responseBody = await parseResponseBody(response);

        if (!response.ok) {
          throw new ApiError(
            response.status,
            getErrorMessage(
              "GET",
              endpoint,
              response.status,
              responseBody
            ),
            responseBody
          );
        }

        throwIfApiFailure(
          "GET",
          endpoint,
          response.status,
          responseBody
        );

        const result = unwrapData<T>(responseBody);

        if (cache) {
          apiCache.set(url, {
            data: result,
            timestamp: Date.now(),
          });
        }

        return result;
      } catch (error) {
        if (error instanceof ApiError) {
          throw error;
        }

        if ((error as Error)?.name === "AbortError") {
          throw new ApiError(
            408,
            `GET ${endpoint} timed out after ${timeoutMs}ms`
          );
        }

        throw new ApiError(
          500,
          (error as Error)?.message || "Network Error"
        );
      } finally {
        clearTimeout(timer);

        if (
          inFlightGetRequestTokens.get(url) === requestToken
        ) {
          inFlightGetRequests.delete(url);
          inFlightGetRequestTokens.delete(url);
        }
      }
    })();

    if (cache && !forceRefresh) {
      inFlightGetRequests.set(url, request);
      inFlightGetRequestTokens.set(url, requestToken);
    }

    return request;
  },

  /* ------------------------------------------------------------------------ */
  /* POST                                                                     */
  /* ------------------------------------------------------------------------ */

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

      const responseBody = await parseResponseBody(response);

      if (!response.ok) {
        throw new ApiError(
          response.status,
          getErrorMessage(
            "POST",
            endpoint,
            response.status,
            responseBody
          ),
          responseBody
        );
      }

      throwIfApiFailure(
        "POST",
        endpoint,
        response.status,
        responseBody
      );

      const result = unwrapData<T>(responseBody);

      // POST mutates server data, so invalidate stale GET data.
      apiCache.clear();
      inFlightGetRequests.clear();
      inFlightGetRequestTokens.clear();

      return result;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(
        500,
        (error as Error)?.message || "Network Error"
      );
    }
  },

  /* ------------------------------------------------------------------------ */
  /* PUT                                                                      */
  /* ------------------------------------------------------------------------ */

  /**
   * HTTP PUT for resource updates.
   *
   * Example:
   * PUT /affiliate/update/67
   *
   * Successful mutations invalidate the GET cache.
   */
  async put<T, B = unknown>(
    endpoint: string,
    body: B,
    headers: HeadersInit = {}
  ): Promise<T> {
    const url = buildUrl(endpoint);

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          ...headers,
        },
        body: JSON.stringify(body),
      });

      const responseBody = await parseResponseBody(response);

      if (!response.ok) {
        throw new ApiError(
          response.status,
          getErrorMessage(
            "PUT",
            endpoint,
            response.status,
            responseBody
          ),
          responseBody
        );
      }

      throwIfApiFailure(
        "PUT",
        endpoint,
        response.status,
        responseBody
      );

      const result = unwrapData<T>(responseBody);

      // PUT mutates server data, so invalidate every stale GET response.
      apiCache.clear();
      inFlightGetRequests.clear();
      inFlightGetRequestTokens.clear();

      return result;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(
        500,
        (error as Error)?.message || "Network Error"
      );
    }
  },

  /* ------------------------------------------------------------------------ */
  /* FALLBACK                                                                 */
  /* ------------------------------------------------------------------------ */

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

  /* ------------------------------------------------------------------------ */
  /* CACHE                                                                    */
  /* ------------------------------------------------------------------------ */

  clearCache(endpoint?: string): void {
    if (endpoint) {
      const url = buildUrl(endpoint);

      apiCache.delete(url);
      inFlightGetRequests.delete(url);
      inFlightGetRequestTokens.delete(url);
      return;
    }

    apiCache.clear();
    inFlightGetRequests.clear();
    inFlightGetRequestTokens.clear();
  },

  /* ------------------------------------------------------------------------ */
  /* SIMULATION                                                               */
  /* ------------------------------------------------------------------------ */

  simulateCall<T>(
    data: T,
    delayMs = 300
  ): Promise<T> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, delayMs);
    });
  },
};
