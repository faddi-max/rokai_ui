import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { siteConfig } from "./siteConfig";
import { seoService } from "@/shared/api/services/seoService";
import { usePageSeo } from "@/shared/hooks/usePageSeo";
import type { SeoOg, SeoRecord, SeoTwitter } from "@/shared/types/seo";

export type SeoHeadProps = {
  /**
   * Explicit page key (e.g. 'home', 'about', 'services', 'contact', 'blogs').
   * If not provided, it is automatically derived from the current URL route.
   */
  pageKey?: string;

  /**
   * Fallback or override title.
   * If the API returns meta_title, the API title takes priority.
   */
  title?: string;

  /**
   * Fallback or override description.
   * If the API returns meta_description, the API description takes priority.
   */
  description?: string;

  /**
   * Relative path (e.g. "/" or "/about").
   * Used for canonical URL fallback if canonical_url from API is absent.
   */
  path?: string;

  /**
   * Explicit canonical URL override.
   */
  canonical?: string;

  /**
   * Meta keywords.
   */
  keywords?: string;

  /**
   * Custom robots directive (e.g. "index, follow").
   */
  robots?: string;

  /**
   * Open Graph override options.
   */
  og?: SeoOg;

  /**
   * Twitter card override options.
   */
  twitter?: SeoTwitter;

  /**
   * Structured data (schema.org JSON-LD).
   */
  jsonLd?: object;

  /**
   * If true, sets robots to "noindex,nofollow".
   */
  noindex?: boolean;

  /**
   * Direct SEO record to use (bypasses fetching if passed).
   */
  seoData?: SeoRecord | null;

  /**
   * If true, prevents automatic fetching from /api/v1/seo/page/{page_key}.
   */
  disableApiFetch?: boolean;
};

function useSafeLocation() {
  try {
    return useLocation();
  } catch {
    return { pathname: "/" };
  }
}

export default function SeoHead({
  pageKey,
  title,
  description,
  path,
  canonical,
  keywords,
  robots,
  og,
  twitter,
  jsonLd,
  noindex,
  seoData,
  disableApiFetch = false,
}: SeoHeadProps) {
  const location = useSafeLocation();
  const resolvedPath = path || location.pathname || "/";
  const derivedPageKey =
    pageKey || seoService.getPageKeyFromPath(resolvedPath);

  // Dynamically fetch SEO from /api/v1/seo/page/{page_key} unless disabled or direct data is passed
  const { seo: fetchedSeo } = usePageSeo(
    disableApiFetch || seoData ? undefined : derivedPageKey
  );

  const activeSeo: SeoRecord | null = seoData ?? fetchedSeo ?? null;

  // 1. Title
  const finalTitle =
    activeSeo?.meta_title ||
    title ||
    seoService.getDefaultTitleForPath(resolvedPath);

  // 2. Description
  const finalDescription =
    activeSeo?.meta_description ||
    description ||
    siteConfig.description;

  // 3. Keywords
  const finalKeywords = activeSeo?.meta_keywords || keywords || null;

  // 4. Canonical URL
  const canonicalUrl = useMemo(() => {
    if (activeSeo?.canonical_url && activeSeo.canonical_url.trim()) {
      return activeSeo.canonical_url;
    }
    if (canonical && canonical.trim()) {
      return canonical;
    }
    const cleanPath = resolvedPath.startsWith("/")
      ? resolvedPath
      : `/${resolvedPath}`;
    const cleanBase = siteConfig.url.replace(/\/+$/, "");
    return `${cleanBase}${cleanPath}`;
  }, [activeSeo?.canonical_url, canonical, resolvedPath]);

  // 5. Robots
  const finalRobots = noindex
    ? "noindex,nofollow"
    : activeSeo?.robots || robots || "index, follow";

  // 6. Open Graph
  const ogType = activeSeo?.og?.type || og?.type || "website";
  const ogTitle =
    activeSeo?.og?.title ||
    activeSeo?.meta_title ||
    og?.title ||
    finalTitle;
  const ogDescription =
    activeSeo?.og?.description ||
    activeSeo?.meta_description ||
    og?.description ||
    finalDescription;
  const ogImage =
    activeSeo?.og?.image ||
    og?.image ||
    siteConfig.ogImage;

  // 7. Twitter
  const twitterCard =
    activeSeo?.twitter?.card ||
    twitter?.card ||
    "summary_large_image";
  const twitterTitle =
    activeSeo?.twitter?.title ||
    twitter?.title ||
    ogTitle;
  const twitterDescription =
    activeSeo?.twitter?.description ||
    twitter?.description ||
    ogDescription;
  const twitterImage =
    activeSeo?.twitter?.image ||
    twitter?.image ||
    ogImage;

  // 8. Structured Data (Schema.org JSON-LD)
  const schemaList = useMemo(() => {
    const list: object[] = [];

    if (activeSeo?.schema_markup) {
      if (typeof activeSeo.schema_markup === "object") {
        list.push(activeSeo.schema_markup);
      } else if (typeof activeSeo.schema_markup === "string") {
        try {
          const parsed = JSON.parse(activeSeo.schema_markup);
          if (parsed && typeof parsed === "object") {
            list.push(parsed);
          }
        } catch {
          // ignore malformed schema string
        }
      }
    }

    if (jsonLd && typeof jsonLd === "object") {
      list.push(jsonLd);
    }

    return list;
  }, [activeSeo?.schema_markup, jsonLd]);

  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      {finalKeywords && <meta name="keywords" content={finalKeywords} />}
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content={finalRobots} />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter / X */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={twitterDescription} />
      <meta name="twitter:image" content={twitterImage} />

      {/* Structured data */}
      {schemaList.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}