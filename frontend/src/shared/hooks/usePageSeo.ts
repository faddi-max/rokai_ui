import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { seoService } from "@/shared/api/services/seoService";
import type { SeoRecord } from "@/shared/types/seo";

export function usePageSeo(explicitPageKey?: string) {
  const location = useLocation();
  const pageKey =
    explicitPageKey || seoService.getPageKeyFromPath(location.pathname);

  const [seo, setSeo] = useState<SeoRecord | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    seoService
      .getPageSeo(pageKey)
      .then((data) => {
        if (isMounted) {
          setSeo(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [pageKey]);

  return { seo, loading, error, pageKey };
}
