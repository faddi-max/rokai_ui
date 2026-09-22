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
    id: "custom-development",
    image: capabilityFabricsImage,
    title: "Custom Development",
    subtitle: "Fit, fabric, construction and finishing developed around your requirements.",
    ctaText: "See How We Build",
    ctaHref: "/custom-fightwear-manufacturing/",
  },
  {
    id: "brand-control",
    image: capabilityCustomizationImage,
    title: "Brand Control",
    subtitle: "Custom colors, graphics, labels, patches, embroidery and packaging.",
    ctaText: "Customize Your Brand",
    ctaHref: "/custom-fightwear-manufacturing/",
  },
  {
    id: "scalable-production",
    image: capabilityCatalogueImage,
    title: "Scalable Production",
    subtitle: "Approved samples move into consistent bulk manufacturing.",
    ctaText: "See How We Scale",
    ctaHref: "/custom-fightwear-manufacturing/",
  },
    {
    id: "brand-control",
    image: capabilityCustomizationImage,
    title: "Brand Control",
    subtitle: "Custom colors, graphics, labels, patches, embroidery and packaging.",
    ctaText: "Customize Your Brand",
    ctaHref: "/custom-fightwear-manufacturing/",
  },
];