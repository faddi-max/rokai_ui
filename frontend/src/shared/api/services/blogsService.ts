import { apiClient } from "@/shared/api/apiClient";
import { blogPosts, type BlogPost } from "@/features/blogs/data/blogsData";

export const blogsService = {
  /**
   * Fetches published articles & whitepapers.
   * Future API integration:
   * return apiClient.get<BlogPost[]>('/blogs');
   */
  async getBlogPosts(): Promise<BlogPost[]> {
    return apiClient.simulateCall<BlogPost[]>(blogPosts);
  },

  /**
   * Fetches an individual blog post by ID/slug.
   * Future API integration:
   * return apiClient.get<BlogPost>(`/blogs/${id}`);
   */
  async getBlogPostById(id: string): Promise<BlogPost | undefined> {
    const post = blogPosts.find((p) => p.id === id);
    return apiClient.simulateCall<BlogPost | undefined>(post);
  },
};
