import { useState, useEffect, useCallback, useRef } from "react";

export interface UseAsyncDataOptions<T> {
  immediate?: boolean;
  initialData?: T;
  onError?: (error: Error) => void;
  onSuccess?: (data: T) => void;
}

export interface UseAsyncDataResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  setData: React.Dispatch<React.SetStateAction<T | null>>;
}

/**
 * Custom hook for future API data fetching with loading and error states.
 * 
 * Usage:
 * ```tsx
 * const { data, loading, error, refetch } = useAsyncData(
 *   () => categoriesService.getCategoriesPageData()
 * );
 * ```
 */
export function useAsyncData<T>(
  fetcher: () => Promise<T>,
  options: UseAsyncDataOptions<T> = {}
): UseAsyncDataResult<T> {
  const { immediate = true, initialData = null } = options;

  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<Error | null>(null);

  // Store options in ref to avoid re-triggering effects
  const optionsRef = useRef(options);
  useEffect(() => {
    optionsRef.current = options;
  });

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      setData(result);
      optionsRef.current.onSuccess?.(result);
    } catch (err) {
      const parsedError = err instanceof Error ? err : new Error(String(err));
      setError(parsedError);
      optionsRef.current.onError?.(parsedError);
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    let isCancelled = false;

    if (immediate) {
      fetcher()
        .then((result) => {
          if (!isCancelled) {
            setData(result);
            optionsRef.current.onSuccess?.(result);
            setLoading(false);
          }
        })
        .catch((err) => {
          if (!isCancelled) {
            const parsedError =
              err instanceof Error ? err : new Error(String(err));
            setError(parsedError);
            optionsRef.current.onError?.(parsedError);
            setLoading(false);
          }
        });
    }

    return () => {
      isCancelled = true;
    };
  }, [fetcher, immediate]);

  return {
    data,
    loading,
    error,
    refetch: execute,
    setData,
  };
}
