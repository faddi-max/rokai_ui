import { useNavigate } from "react-router-dom";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";
import BlogCard from "./BlogCategoryCard";
import { blogCategories, type BlogCategory } from "../data/blogCategories";

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
    <section className="relative bg-black px-4 py-10 sm:px-8 sm:py-12 md:px-10 md:py-14 lg:px-16 lg:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(150,15,20,0.3),transparent_60%)]" />
      <div className="relative mx-auto max-w-[1512px]">
        <SectionHeaderblog
          eyebrow={eyebrow}
          title={title}
          highlight={highlight}
          description={description}
        />
        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
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
      </div>
    </section>
  );
}