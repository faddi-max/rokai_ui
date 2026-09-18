import { blogcatagory } from "@/assets";
import type { BlogCardTag } from "../components/BlogCategoryCard";

export interface BlogPost {
  id: string;
  slug: string;
  categorySlug: string;
  image: string;
  badgeLabel: string;
  author: string;
  tags: BlogCardTag[];
  highlightTitle: string;
  bodyTitle: string;
  description: string;
  content?: string;
  publishedAt: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "p1",
    slug: "how-to-wash-bjj-gi-the-right-way",
    categorySlug: "bjj-training-apparel",
    image: blogcatagory,
    badgeLabel: "BJJ Training Apparel",
    author: "Rokai Team",
    tags: [{ label: "Guide" }, { label: "8 min read", tone: "filled" }],
    highlightTitle: "How To Wash BJJ Gi The Right Way:",
    bodyTitle: "A Survival Guide For BJJ Academies & Brands",
    description:
      "If you manage a BJJ academy, run a competition team, or produce private-label gis, you know that a gi is more than just fabric.",
    publishedAt: "2026-08-12",
  },
  {
    id: "p2",
    slug: "choosing-gi-fabric-weight",
    categorySlug: "bjj-training-apparel",
    image: blogcatagory,
    badgeLabel: "BJJ Training Apparel",
    author: "Rokai Team",
    tags: [{ label: "Guide" }, { label: "6 min read", tone: "filled" }],
    highlightTitle: "Choosing The Right Gi Weight:",
    bodyTitle: "Pearl Weave Vs Gold Weave Explained",
    description:
      "Fabric weight changes how a gi grips, breathes, and holds up over a full season of training.",
    publishedAt: "2026-07-30",
  },
  {
    id: "p3",
    slug: "ripstop-vs-cotton-rashguards",
    categorySlug: "performance-fabrics-tech",
    image: blogcatagory,
    badgeLabel: "Performance Fabrics & Tech",
    author: "Rokai Team",
    tags: [{ label: "Tech" }, { label: "5 min read", tone: "filled" }],
    highlightTitle: "Ripstop Vs Compression:",
    bodyTitle: "Picking Fabric For No-Gi Rashguards",
    description:
      "The right blend of poly, spandex, and moisture-wicking finish matters more than the logo on the tag.",
    publishedAt: "2026-08-01",
  },
  {
    id: "p4",
    slug: "ibjjf-gi-compliance-checklist",
    categorySlug: "ibjjf-competition-apparel",
    image: blogcatagory,
    badgeLabel: "IBJJF Competition Apparel",
    author: "Rokai Team",
    tags: [{ label: "Checklist" }, { label: "7 min read", tone: "filled" }],
    highlightTitle: "IBJJF Compliance Checklist:",
    bodyTitle: "What Every Competition Gi Must Have",
    description:
      "Collar thickness, patch placement, and fit tolerances — the details that get gis rejected at weigh-in.",
    publishedAt: "2026-06-18",
  },
  {
    id: "p5",
    slug: "no-gi-spats-sizing-guide",
    categorySlug: "no-gi-apparel",
    image: blogcatagory,
    badgeLabel: "No-Gi Apparel",
    author: "Rokai Team",
    tags: [{ label: "Guide" }, { label: "4 min read", tone: "filled" }],
    highlightTitle: "Spats Sizing Guide:",
    bodyTitle: "Getting Compression Fit Right The First Time",
    description:
      "A too-loose spat bunches at the knee mid-roll — here's how to size for your academy's roster.",
    publishedAt: "2026-05-22",
  },
  {
    id: "p6",
    slug: "academy-merch-that-actually-sells",
    categorySlug: "clubs-coaches-growth",
    image: blogcatagory,
    badgeLabel: "Clubs & Coaches Growth",
    author: "Rokai Team",
    tags: [{ label: "Business" }, { label: "9 min read", tone: "filled" }],
    highlightTitle: "Academy Merch That Sells:",
    bodyTitle: "A Practical Playbook For Gyms",
    description:
      "Most academy merch racks lose money quietly. Here's what to stock, and what to retire.",
    publishedAt: "2026-04-10",
  },
];

export const getPostsByCategorySlug = (slug: string) =>
  blogPosts
    .filter((p) => p.categorySlug === slug)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

export const getPostBySlug = (slug: string) => blogPosts.find((p) => p.slug === slug);

export const getLatestPosts = (limit = 9) =>
  [...blogPosts]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, limit);