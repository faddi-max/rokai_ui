import {
  capabilityFabricsImage,
  capabilityCatalogueImage,
  capabilityCustomizationImage,
  capabilitySizeGuideImage,
} from "@/assets";

export interface CapabilityItem {
  id: string;
  image: string;
  title: string;
  titleHref?: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
}

export const capabilitiesHeading = {
  eyebrow: "Custom Fightwear Manufacturing",
  titleTop: "YOUR PRODUCT. YOUR BRAND.",
  titleBottom: "OUR MANUFACTURING.",
  description:
    "Turn your specifications into production-ready fightwear. ROKAI supports custom product development, fabric selection, pattern engineering, branding, sampling and scalable production.",
};

export const capabilities: CapabilityItem[] = [
  {
    id: "flagship-fabrics",
    image: capabilityFabricsImage,
    title: "BJJ Flagships Fabrics",
    titleHref: "/services/bjj-apparel-fabrics",
    subtitle: "Premium fabrics engineered for BJJ apparel, delivering unmatched durability, comfort and performance.",
    ctaText: "Explore Fabrics",
    ctaHref: "/services/bjj-apparel-fabrics",
  },
  {
    id: "catalogue",
    image: capabilityCatalogueImage,
    title: "Catalogue",
    subtitle: "Discover a complete range of BJJ apparel, jiu jitsu gear, and custom fightwear.",
    ctaText: "View Catalogue",
    ctaHref: "/categories",
  },
  {
    id: "bespoke-customization",
    image: capabilityCustomizationImage,
    title: "Bespoke & Customizations",
    subtitle: "Create fully customized BJJ apparel and jiu jitsu uniforms with unique designs and branding.",
    ctaText: "Customize Now",
    ctaHref: "/services/bespoke-customization",
  },
  {
    id: "size-guideline",
    image: capabilitySizeGuideImage,
    title: "Size Guideline",
    subtitle: "Find the right fit with our easy-to-follow BJJ sizing guide for apparel and uniforms.",
    ctaText: "Check Sizes",
    ctaHref: "/services/bjj-apparel-size-chart",
  },
];