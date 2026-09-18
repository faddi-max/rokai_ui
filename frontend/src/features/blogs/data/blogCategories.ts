import { blogcatagory } from "@/assets";

export interface BlogCategory {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  parentSlug?: string;
}

export const blogCategories: BlogCategory[] = [
  {
    id: "1",
    slug: "bjj-training-apparel",
    title: "BJJ Training Apparel",
    description:
      "Explore BJJ Training Apparel blogs to find content that matches your interests and needs.",
    image: blogcatagory,
  },
  {
    id: "2",
    slug: "performance-fabrics-tech",
    title: "Performance Fabrics & Tech",
    description: "Deep dives into the fabrics and tech behind combat-sports apparel.",
    image: blogcatagory,
  },
  {
    id: "3",
    slug: "ibjjf-competition-apparel",
    title: "IBJJF Competition Apparel",
    description: "Everything about compliant, competition-ready gear.",
    image: blogcatagory,
  },
  {
    id: "4",
    slug: "no-gi-apparel",
    title: "No-Gi Apparel",
    description: "No-Gi rashguards, shorts and spats — buying and care guides.",
    image: blogcatagory,
    parentSlug: "bjj-training-apparel",
  },
  {
    id: "5",
    slug: "bjj-gear-accessories",
    title: "BJJ Gear & Accessories",
    description: "Belts, bags, grip aids and the small gear that adds up.",
    image: blogcatagory,
  },
  {
    id: "6",
    slug: "clubs-coaches-growth",
    title: "Clubs & Coaches Growth",
    description: "Running and growing an academy — merch, retention, ops.",
    image: blogcatagory,
  },
  {
    id: "7",
    slug: "private-label-oem",
    title: "Private Label & OEM",
    description: "Sourcing and producing your own branded apparel line.",
    image: blogcatagory,
  },
  {
    id: "8",
    slug: "rd-innovation",
    title: "R&D & Innovation",
    description: "What's next in materials, cut, and construction.",
    image: blogcatagory,
  },
  {
    id: "9",
    slug: "brand-industry",
    title: "Brand & Industry",
    description: "News and analysis from across the BJJ apparel industry.",
    image: blogcatagory,
  },
];

export const getCategoryBySlug = (slug: string) =>
  blogCategories.find((c) => c.slug === slug);

export const getRelatedCategories = (slug: string) => {
  const current = getCategoryBySlug(slug);
  if (!current) return [];
  return blogCategories.filter(
    (c) =>
      c.slug !== slug &&
      (c.parentSlug === current.slug ||
        c.parentSlug === current.parentSlug ||
        current.parentSlug === c.slug)
  );
};