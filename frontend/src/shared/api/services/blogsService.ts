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
  image?: string | null;
  author?: string | null;
  status?: string;
  read_time?: number | null;
  published_at?: string | null;
  category?: {
    id: number | string;
    title: string;
    slug: string;
    description?: string | null;
    image?: string | null;
  } | null;
}


const API_HOST = (() => {
  try {
    return new URL(API_BASE_URL).host;
  } catch {
    return "";
  }
})();

function sanitizeImageUrl(url: string | null | undefined): string {
  if (!url || typeof url !== "string" || !url.trim() || url === "null" || url === "undefined") {
    return blogcatagory;
  }

  const cleanUrl = url.trim();


  if (API_HOST && cleanUrl.includes(API_HOST)) {
    const storageMatch = cleanUrl.match(/\/storage\/.*/);
    if (storageMatch) return storageMatch[0];
    return cleanUrl.replace(/^http:\/\//i, "https://");
  }

  if (cleanUrl.startsWith("http://")) {
    return cleanUrl.replace(/^http:\/\//i, "https://");
  }

  return cleanUrl;
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
      const raw = await apiClient.get<ApiBlogPost>(`/blogs/posts/${slug}`);
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