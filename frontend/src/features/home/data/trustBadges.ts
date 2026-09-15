export type TrustBadge = {
  type: "trustpilot" | "google" | "guarantee" | "academies" | "brand";
  rating?: string;
  title: string;
  subtitle: string;
  link?: string;
};

export const trustBadges: TrustBadge[] = [
  {
    type: "trustpilot",
    rating: "4.8",
    title: "Based on 150+ reviews",
    subtitle: "Read our reviews on Trustpilot",
  },
  {
    type: "google",
    rating: "4.9",
    title: "Based on 180+ reviews",
    subtitle: "Read our reviews on Google",
  },
  {
    type: "guarantee",
    title: "Satisfaction Guarantee",
    subtitle: "We stand behind our quality.",
  },
  {
    type: "academies",
    title: "500+ Academies",
    subtitle: "We stand behind our quality.",
  },
  {
    type: "brand",
    title: "300+ BJJ Brands",
    subtitle: "Trusted B2B Manufacturing",
  },
];
