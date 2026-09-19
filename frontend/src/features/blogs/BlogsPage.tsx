import HeroSection from "@/shared/components/sections/HeroSection";
import { useAsyncData } from "@/shared/hooks/useAsyncData";
import { blogsService } from "@/shared/api/services/blogsService";
import { DataLoader, PageLoader } from "@/shared/components/feedback";
import FAQSection from "../home/components/FAQSection";
import BlogCategoriesSection from "./components/blogCatagorySection";
import ManufacturingProcessSection from "../home/components/ManufacturingProcessSection";


const fetchBlogsPage = () => blogsService.getBlogsPageData();

export default function BlogsPage() {
  const { data, loading, error, refetch } = useAsyncData(fetchBlogsPage);

  return (
    <DataLoader
      loading={loading}
      error={error}
      data={data}
      skeleton={<PageLoader message="LOADING BLOGS..." />}
      onRetry={refetch}
    >
      {(pageData) => (
        <div>
          <HeroSection {...pageData.hero} />
          <BlogCategoriesSection categories={pageData.blogCategories} />
          <ManufacturingProcessSection />
          <FAQSection />
        </div>
      )}
    </DataLoader>
  );
}