import { useNavigate } from "react-router-dom";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import type { BlogPost } from "@/shared/types/blogs";
import BlogCard from "./BlogCategoryCard";
import { trendingBlogs } from "../data/trendingBlogs";


interface TrendingBlogsSectionProps {
  blogs?: BlogPost[];
  eyebrow?: string;
  title?: string;
  highlight?: string;
}

export default function TrendingBlogsSection({
  blogs = trendingBlogs,
  eyebrow = "Trending Articles",
  title = "TRENDING",
  highlight = "BLOGS",
}: TrendingBlogsSectionProps) {
  const navigate = useNavigate();

  return (
    <SectionGlow>
      <SectionHeaderblog eyebrow={eyebrow} title={title} highlight={highlight} />

      <div className="mt-1 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-5 lg:mx-50 mx-5 pb-5">
        {blogs.map((blog, i) => (
          <BlogCard
            key={blog.id}
            variant="article"
            image={blog.image}
            index={String(i + 1).padStart(2, "0")}
            tag={blog.tag}
            date={blog.date}
            readTime={blog.readTime}
            title={blog.title}
            description={blog.description}
            onReadMore={() => navigate(`/blogs/${blog.slug}`)}
            className="mx-auto"
          />
        ))}
      </div>
    </SectionGlow>
  );
}