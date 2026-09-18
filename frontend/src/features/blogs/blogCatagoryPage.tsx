import { Link, useNavigate, useParams } from "react-router-dom";
import HeroSection from "@/shared/components/sections/HeroSection";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";
import { useAsyncData } from "@/shared/hooks/useAsyncData";
import { categoriesService } from "@/shared/api/services/categoriesService";
import { DataLoader, PageLoader } from "@/shared/components/feedback";
import FAQSection from "../home/components/FAQSection";
import ManufacturingProcessSection from "../home/components/ManufacturingProcessSection";
import BlogCard from "./components/BlogCategoryCard";
import { getCategoryBySlug } from "./data/blogCategories";
import { getPostsByCategorySlug } from "./data/blogPost";

export default function BlogCategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

 
  const { data, loading, error, refetch } = useAsyncData(() =>
    categoriesService.getblogPageData()
  );

  const category = slug ? getCategoryBySlug(slug) : undefined;
  const posts = slug ? getPostsByCategorySlug(slug) : [];

  if (!category) {
    return (
      <section className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-black px-5 py-16 text-center text-white">
        <p className="text-lg">This category doesn't exist.</p>
        <Link to="/blogs" className="text-sm font-semibold text-[#E63946] underline">
          Back to all categories
        </Link>
      </section>
    );
  }

  return (
    <DataLoader
      loading={loading}
      error={error}
      data={data}
      skeleton={<PageLoader message="LOADING APPAREL CATALOG..." />}
      onRetry={refetch}
    >
      {(pageData) => (
        <div>
          <HeroSection {...pageData.hero} />

          <section
            className="relative bg-black px-5 py-16 sm:px-8 md:px-10 lg:px-16 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(150,15,20,0.3),transparent_60%)]" />
            <div className="relative mx-auto max-w-[1512px]">
              <SectionHeaderblog
                eyebrow={category.title}
                title="Recent Blog"
                highlight="& News Post"
                description={category.description}
              />

              {posts.length === 0 ? (
                <p className="mt-10 text-white/60">
                  No posts published in this category yet — check back soon.
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {posts.map((post) => (
                    <BlogCard
                      key={post.id}
                      variant="article"
                      image={post.image}
                      badgeLabel={post.badgeLabel}
                      author={post.author}
                      tags={post.tags}
                      highlightTitle={post.highlightTitle}
                      bodyTitle={post.bodyTitle}
                      description={post.description}
                      onReadMore={() => navigate(`/blogs/post/${post.slug}`)}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>

          <ManufacturingProcessSection />
          <FAQSection />
        </div>
      )}
    </DataLoader>
  );
}