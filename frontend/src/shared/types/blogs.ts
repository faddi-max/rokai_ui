import type { HeroContent } from "./hero";

export interface BlogCategory {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  parentSlug?: string;
}

export interface BlogCardTag {
  label: string;
  tone?: "outline" | "filled";
}

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
  title?: string;
  excerpt?: string;
  date?: string;
  readTime?: string;
}

export interface BlogsPageData {
  hero: HeroContent;
  blogCategories: BlogCategory[];
  featuredPosts?: BlogPost[];
  latestPosts?: BlogPost[];
}
