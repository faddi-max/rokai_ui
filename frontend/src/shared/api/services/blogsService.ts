import { apiClient, API_BASE_URL } from "@/shared/api/apiClient";
import { blogcatagory } from "@/assets";
import {
  blogCategories,
  getCategoryBySlug as getCategoryBySlugLocal,
} from "@/features/blogs/data/blogCategories";
import {
  blogPosts,
  getPostsByCategorySlug as getPostsByCategorySlugLocal,
  getPostBySlug as getPostBySlugLocal,
  getLatestPosts as getLatestPostsLocal,
} from "@/features/blogs/data/blogPost";
import { heroContent } from "@/features/blogs/data/bloghero";
import { categoryHeroContent } from "@/features/categories/data/heroContent";
import type { BlogCategory, BlogPost } from "@/shared/types/blogs";
import type { PageData } from "./categoriesService";

export interface ApiBlogCategory {
  id: number | string;
  title: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  status?: string;
  url?: string;
}

export interface ApiBlogPost {
  id: number | string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;   
  image?: string | null;
  image_alt?: string | null; 
  author?: string | null;
  status?: string;
  read_time?: number | null;
  published_at?: string | null;
  views_count?: number;      
  url?: string;             
  category?: {
    id: number | string;
    title: string;
    slug: string;
    description?: string | null;
    image?: string | null;
  } | null;
}

export const PUBLIC_HOST = (() => {
  try {
    return new URL(API_BASE_URL).host;
  } catch {
    return "";
  }
})();

export const SERVER_BASE_URL = (() => {
  try {
    return new URL(API_BASE_URL).origin;
  } catch {
    return "";
  }
})();

export function sanitizeImageUrl(url: string | null | undefined): string {
  if (!url || typeof url !== "string" || !url.trim() || url === "null" || url === "undefined") {
    return blogcatagory;
  }

  const cleanUrl = url.trim();

  // 1. If it's already a full valid public URL (not localhost/127.0.0.1), keep the EXACT URL from API
  if (/^https?:\/\//i.test(cleanUrl) && !/127\.0\.0\.1|localhost/i.test(cleanUrl)) {
    return cleanUrl;
  }

  // 2. If it points to local dev server (127.0.0.1 or localhost), replace with PUBLIC_HOST using http://
  if (/^http:\/\/(127\.0\.0\.1|localhost)(:\d+)?/i.test(cleanUrl)) {
    if (PUBLIC_HOST) {
      return cleanUrl.replace(/^http:\/\/(127\.0\.0\.1|localhost)(:\d+)?/i, `http://${PUBLIC_HOST}`);
    }
  }

  // 3. Prepend http://${PUBLIC_HOST} for relative /storage paths
  if (cleanUrl.startsWith("/storage/") && PUBLIC_HOST) {
    return `http://${PUBLIC_HOST}${cleanUrl}`;
  }

  return cleanUrl;
}

export function sanitizeContentHtml(html: string | null | undefined): string {
  if (!html) return "";
  let clean = html;

  if (PUBLIC_HOST) {
    // Replace 127.0.0.1 or localhost in img src with http://${PUBLIC_HOST}
    clean = clean.replace(
      /src=["']http:\/\/(127\.0\.0\.1|localhost)(:\d+)?([^"']+)["']/gi,
      `src="http://${PUBLIC_HOST}$3"`
    );

    // Fix relative /storage/ paths in img src
    clean = clean.replace(
      /src=["']\/storage\/([^"']+)["']/gi,
      `src="http://${PUBLIC_HOST}/storage/$1"`
    );
  }

  return clean;
}

function mapApiCategory(cat: ApiBlogCategory): BlogCategory {
  return {
    id: String(cat.id),
    slug: cat.slug,
    title: cat.title,
    description: cat.description || `Explore ${cat.title} articles, news, and guides.`,
    image: sanitizeImageUrl(cat.image),
  };
}

function mapApiPost(post: ApiBlogPost, fallbackSlug = ""): BlogPost {
  const readTimeLabel = post.read_time ? `${post.read_time} min read` : "5 min read";
  const catSlug = post.category?.slug || fallbackSlug;
  const catTitle = post.category?.title || "BJJ Apparel";
  const date = post.published_at ? post.published_at.slice(0, 10) : "";

 
  const cleanExcerpt = post.excerpt
    ? post.excerpt.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ")
    : "";

  return {
    id: String(post.id),
    slug: post.slug,
    categorySlug: catSlug,
    image: sanitizeImageUrl(post.image),
    badgeLabel: catTitle,
    author: post.author || "Rokai Team",
    tags: [{ label: "Article" }, { label: readTimeLabel, tone: "filled" }],
    highlightTitle: post.title,
    bodyTitle: "",
    description: cleanExcerpt,
    publishedAt: date,
    title: post.title,
    excerpt: cleanExcerpt,
    date,
    readTime: readTimeLabel,
    content: sanitizeContentHtml(post.content),
  };
}

export const blogsService = {

  async getBlogCategories(): Promise<BlogCategory[]> {
    try {
      const raw = await apiClient.get<ApiBlogCategory[]>("/blog-categories");
      if (Array.isArray(raw)) return raw.map(mapApiCategory);
    } catch (err) {
      console.warn("Could not fetch /blog-categories, using fallback:", err);
    }
    return apiClient.simulateCall(blogCategories);
  },


  async getBlogCategoryBySlug(slug: string): Promise<BlogCategory | undefined> {
    const categories = await blogsService.getBlogCategories();
    return categories.find((c) => c.slug === slug) ?? getCategoryBySlugLocal(slug);
  },

  
  async getPostsByCategorySlug(categorySlug: string): Promise<BlogPost[]> {
    try {
      const raw = await apiClient.get<ApiBlogPost[]>(`/blogs/category/${categorySlug}`);
      if (Array.isArray(raw)) return raw.map((p) => mapApiPost(p, categorySlug));
    } catch (err) {
      console.warn(`Could not fetch posts for '${categorySlug}', using fallback:`, err);
    }
    return apiClient.simulateCall(getPostsByCategorySlugLocal(categorySlug));
  },

  async getBlogPosts(categorySlug?: string): Promise<BlogPost[]> {
    if (categorySlug) return blogsService.getPostsByCategorySlug(categorySlug);

    try {
      const raw = await apiClient.get<ApiBlogPost[]>("/blogs");
      if (Array.isArray(raw)) return raw.map((p) => mapApiPost(p));
    } catch (err) {
      console.warn("Could not fetch /blogs, using fallback:", err);
    }
    return apiClient.simulateCall(blogPosts);
  },


  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    try {
      const raw = await apiClient.get<ApiBlogPost>(`/blogs/${slug}`);
      if (raw) return mapApiPost(raw);
    } catch (err) {
      console.warn(`Could not fetch post '${slug}', using fallback:`, err);
    }
    return apiClient.simulateCall(getPostBySlugLocal(slug));
  },


  async getLatestPosts(limit = 9): Promise<BlogPost[]> {
    try {
      const raw = await apiClient.get<ApiBlogPost[]>(`/blogs/latest?limit=${limit}`);
      if (Array.isArray(raw)) return raw.map((p) => mapApiPost(p));
    } catch (err) {
      console.warn("Could not fetch latest posts, using fallback:", err);
    }
    return apiClient.simulateCall(getLatestPostsLocal(limit));
  },

  /** Blogs page payload: hero + categories */
  async getBlogsPageData(): Promise<PageData> {
    const liveCategories = await blogsService.getBlogCategories();
    return {
      hero: heroContent,
      categoryHeroContent,
      blogCategories: liveCategories,
    };
  },
};