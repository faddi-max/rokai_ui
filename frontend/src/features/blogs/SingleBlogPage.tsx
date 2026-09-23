import { Link, useParams } from "react-router-dom";
import { useAsyncData } from "@/shared/hooks/useAsyncData";
import { blogsService } from "@/shared/api/services/blogsService";
import { DataLoader, PageLoader } from "@/shared/components/feedback";
import BlogHeroDetail from "./components/BlogHeroDetail";
import BlogContentSection from "./components/BlogContentSection";
import FAQItem from "../home/components/FAQItem";
import FAQSection from "../home/components/FAQSection";
import SectionGlow from "@/shared/components/layout/SectionGlow";

export default function SinglePageBlog() {
  const { slug } = useParams<{ slug: string }>();

  const { data, loading, error, refetch } = useAsyncData(async () => {
    const [post, categories] = await Promise.all([
      slug ? blogsService.getBlogPostBySlug(slug) : Promise.resolve(undefined),
      blogsService.getBlogCategories(),
    ]);
    return { post, categories };
  }, [slug]);

  if (!loading && !data?.post) {
    return (
      <section className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-black px-5 py-16 text-center text-white">
        <p className="text-lg">This post doesn't exist.</p>
        <Link to="/blogs" className="text-sm font-semibold text-[#E63946] underline">
          Back to all posts
        </Link>
      </section>
    );
  }

  return (
    <DataLoader
      loading={loading}
      error={error}
      data={data}
      skeleton={<PageLoader message="LOADING POST..." />}
      onRetry={refetch}
    >
      {({ post, categories }) => (
        <div>
          <BlogHeroDetail post={post} />
          <SectionGlow>
          <BlogContentSection post={post} categories={categories} />
          </SectionGlow>
          <FAQSection />
        </div>
      )}
    </DataLoader>
  );
}