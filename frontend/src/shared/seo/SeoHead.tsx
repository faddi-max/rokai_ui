import { Helmet } from "react-helmet-async";
import { siteConfig } from "./siteConfig";

type SeoHeadProps = {
  title: string;
  description: string;
  path: string;        // example: "/" or "/private-label-fightwear/"
  jsonLd?: object;     // structured data (schema)
  noindex?: boolean;   // true = tell Google NOT to index this page
};

export default function SeoHead({ title, description, path, jsonLd, noindex }: SeoHeadProps) {
  const canonical = siteConfig.url + path;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Social sharing (WhatsApp, LinkedIn, Facebook, X) */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={siteConfig.ogImage} />
      <meta name="twitter:card" content="summary_large_image" />

      {/* Schema for Google */}
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}