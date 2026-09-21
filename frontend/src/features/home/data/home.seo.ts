import { siteConfig } from "@/shared/seo/siteConfig";

export const homeSeo = {
  title: "Combat Sports Apparel Manufacturer | ROKAI",
  description:
    "ROKAI is a B2B combat sports apparel manufacturer producing custom fightwear for brands, academies, gyms and teams, from product development and sampling to bulk production.",
  path: "/",
};

export const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: siteConfig.logo,
      description: siteConfig.description,
   
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      publisher: { "@id": `${siteConfig.url}/#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/#webpage`,
      url: `${siteConfig.url}/`,
      name: homeSeo.title,
      isPartOf: { "@id": `${siteConfig.url}/#website` },
      about: { "@id": `${siteConfig.url}/#organization` },
    },
  ],
};