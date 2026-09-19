import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type DependencyList,
  type Dispatch,
  type SetStateAction,
} from "react";

export interface UseAsyncDataOptions<T> {
 
  immediate?: boolean;
  initialData?: T;
  
  deps?: DependencyList;
  onError?: (error: Error) => void;
  onSuccess?: (data: T) => void;
}

export interface UseAsyncDataResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  setData: Dispatch<SetStateAction<T | null>>;
}

export function useAsyncData<T>(
  fetcher: () => Promise<T>,
  options: UseAsyncDataOptions<T> = {}
): UseAsyncDataResult<T> {
  const { immediate = true, initialData = null, deps = [] } = options;

  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<Error | null>(null);

  const fetcherRef = useRef(fetcher);
  const optionsRef = useRef(options);
  useEffect(() => {
    fetcherRef.current = fetcher;
    optionsRef.current = options;
  });


  const requestIdRef = useRef(0);

  const execute = useCallback(async () => {
    const requestId = ++requestIdRef.current;
    setLoading(true);
    setError(null);

    try {
      const result = await fetcherRef.current();
      if (requestId !== requestIdRef.current) return;
      setData(result);
      optionsRef.current.onSuccess?.(result);
    } catch (err) {
      if (requestId !== requestIdRef.current) return;
      const parsed = err instanceof Error ? err : new Error(String(err));
      setError(parsed);
      optionsRef.current.onError?.(parsed);
    } finally {
      if (requestId === requestIdRef.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (immediate) void execute();
    return () => {
   
      requestIdRef.current++;
    };
   
  }, [immediate, execute, ...deps]);

  return { data, loading, error, refetch: execute, setData };
}