import type { BlogPost } from "../data/blogPost";
import BlogPostCard from "./BlogPostCard";

interface BlogPostGridProps {
  title: string;
  highlight: string;
  subtitle?: string;
  posts: BlogPost[];
}

export default function BlogPostGrid({ title, highlight, subtitle, posts }: BlogPostGridProps) {
  if (!posts.length) return null;

  return (
    <section className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-space-grotesk uppercase text-3xl font-bold text-white">
            {title} <span className="text-[#E51B24]">{highlight}</span>
          </h2>
          {subtitle && <p className="text-sm text-gray-400 max-w-xs">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <BlogPostCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}