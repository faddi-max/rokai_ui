import {
  testimonialFactory1,
  testimonialFactory2,
} from "@/assets";

export interface Testimonial {
  id: string;
  image: string;
  videoUrl?: string;
  
  clientType: string;
  country: string;
  project: string;
  productCategory: string;
}

export interface TrustStat {
  label: string;
}

export const testimonialsHeading = {
  eyebrow: "Client & Partner Proof",
  titleTop: "Trusted By Those",
  titleBottom: "Who Build With Us.",
  description:
    "Feedback from businesses working with ROKAI on custom combat sports apparel, product development and manufacturing.",
};

// TODO (content team): replace with real, permissioned client cases before
// publishing. Per the SEO doc's Editorial Rule, fabricated or anonymous
// testimonials must not go live — each entry needs client sign-off.
export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    image: testimonialFactory1,
    clientType: "BJJ Academy", // e.g. "BJJ Academy", "Combat Sports Brand"
    country: "Country TBD",
    project: "Project TBD", // e.g. "Custom Competition Gi Line"
    productCategory: "Product Category TBD", // e.g. "BJJ Gis"
  },
  {
    id: "testimonial-2",
    image: testimonialFactory2,
    clientType: "Combat Sports Brand",
    country: "Country TBD",
    project: "Project TBD",
    productCategory: "Product Category TBD",
  },
];

// Non-numeric trust statements, per SEO doc Table 1 (verified capability
// claims rather than unverified percentages/counts).
export const trustStats: TrustStat[] = [
  { label: "Direct Manufacturer" },
  { label: "Custom Development" },
  { label: "Scalable Production" },
  { label: "Global Delivery" },
];