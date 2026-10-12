export interface SeoOg {
  title?: string | null;
  description?: string | null;
  image?: string | null;
  type?: string | null;
}

export interface SeoTwitter {
  card?: string | null;
  title?: string | null;
  description?: string | null;
  image?: string | null;
}

export interface SeoRecord {
  id?: number;
  page_key?: string | null;
  label?: string | null;
  url_path?: string | null;
  type?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
  canonical_url?: string | null;
  robots?: string | null;
  og?: SeoOg | null;
  twitter?: SeoTwitter | null;
  schema_type?: string | null;
  schema_markup?: Record<string, unknown> | string | null;
  in_sitemap?: boolean;
  sitemap_priority?: string | null;
  sitemap_changefreq?: string | null;
  updated_at?: string | null;
}

export interface SeoPageResponseData {
  page_key: string;
  label?: string;
  path?: string;
  seo?: SeoRecord | null;
}

export interface SeoStaticPageEntry {
  page_key: string;
  label: string;
  path: string;
  is_set: boolean;
  seo?: SeoRecord | null;
}

export interface SeoAllResponseData {
  static_pages?: SeoStaticPageEntry[];
  records?: SeoRecord[];
}
