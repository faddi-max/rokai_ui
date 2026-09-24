import { Link, useParams } from "react-router-dom";
import { useAsyncData } from "@/shared/hooks/useAsyncData";
import { blogsService } from "@/shared/api/services/blogsService";
import { DataLoader, PageLoader } from "@/shared/components/feedback";
import BlogHeroDetail from "./components/BlogHeroDetail";
import BlogContentSection from "./components/BlogContentSection";

import FAQSection from "../home/components/FAQSection";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import TrendingBlogsSection from "./components/TrendingBlogsSection";
import CommunityDiscussionSection from "./components/CommunityDiscussionSection";

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
          <TrendingBlogsSection />
          <CommunityDiscussionSection />
          </SectionGlow>
          {/* <FAQSection /> */}
        </div>
      )}
    </DataLoader>
  );
}