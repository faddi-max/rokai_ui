import { useNavigate } from "react-router-dom";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import type { BlogCategory } from "@/shared/types/blogs";
import BlogCard from "./BlogCategoryCard";
import { blogCategories } from "../data/blogCategories";

interface BlogCategoriesSectionProps {
  categories?: BlogCategory[];
  eyebrow?: string;
  title?: string;
  highlight?: string;
  description?: string;
}

export default function BlogCategoriesSection({
  categories = blogCategories,
  eyebrow = "Blog",
  title = "Latest",
  highlight = "Blog Categories",
  description = "Expert insights to help you choose, train, and perform with confidence.",
}: BlogCategoriesSectionProps) {
  const navigate = useNavigate();

  return (
    <SectionGlow>
      <SectionHeaderblog
        eyebrow={eyebrow}
        title={title}
        highlight={highlight}
        description={description}
      />

      <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-3 lg:mx-30 mx-5 py-5">
        {categories.map((cat, i) => (
          <BlogCard
            key={cat.id}
            variant="category"
            image={cat.image}
            title={cat.title}
            index={String(i + 1).padStart(2, "0")}
            onReadMore={() => navigate(`/blogs/category/${cat.slug}`)}
            className="mx-auto"
          />
        ))}
      </div>
    </SectionGlow>
  );
}