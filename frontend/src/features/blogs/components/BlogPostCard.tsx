import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import AnimatedArrow from "@/shared/components/ui/AnimatedArrow";
import type { BlogPost } from "../data/blogPost";

export default function BlogPostCard({ post, index }: { post: BlogPost; index?: number }) {
  return (
    <Link
      to={`/blogs/${post.categorySlug}/${post.slug}`}
      className="group block bg-[#0D0D0D] border border-white/10 hover:border-[#E51B24]/50 transition-colors"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-black/70 text-[10px] uppercase text-white px-2 py-1">
          {post.date}
        </span>
        <span className="absolute top-3 right-3 bg-[#E51B24] text-[10px] uppercase text-white px-2 py-1">
          {post.readTime}
        </span>
      </div>
      <div className="p-5">
        {typeof index === "number" && (
          <span className="block text-xs text-[#E51B24] font-semibold mb-1">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <h3 className="font-space-grotesk uppercase text-base font-bold text-white mb-2 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-gray-400 line-clamp-2">{post.excerpt}</p>
        <span className="inline-flex items-center gap-2 text-sm text-white bg-[#E51B24] px-4 py-2 mt-4">
          Read More <AnimatedArrow icon={ArrowUpRight} className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}