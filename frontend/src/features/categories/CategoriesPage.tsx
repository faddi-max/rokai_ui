import { useParams } from "react-router-dom";
import HeroSection from "@/shared/components/sections/HeroSection";
import { useAsyncData } from "@/shared/hooks/useAsyncData";
import { categoriesService } from "@/shared/api/services/categoriesService";
import { DataLoader, PageLoader } from "@/shared/components/feedback";
import CategoriesSection from "@/shared/components/sections/CategoriesSection";
import { categories as fallbackCategories } from "./data/catagories";
import FAQSection from "../home/components/FAQSection";
import ProblemSolversSection from "../home/components/ProblemSolversSection";
import WhyRokaiSection from "@/shared/components/sections/WhyRokaiSection";
import GiEngineeringSection from "@/shared/components/sections/GiEngineeringSection";
import GiSystemSection from "./componnets/GiSystemSection";

import HowWeWorkSection from "./data/HowWeWorkSection";
import ClientFeedbackSection from "./componnets/ClientFeedbackSection";

export default function CategoriesPage() {
  const params = useParams<{ slug?: string; parentSlug?: string }>();
  const slug = params.slug || params.parentSlug;

  const { data, loading, error, refetch } = useAsyncData(
    () => categoriesService.getCategoriesPageData(slug),
    { deps: [slug] }
  );

  return (
    <DataLoader
      loading={loading}
      error={error}
      data={data}
      skeleton={<PageLoader message="LOADING APPAREL CATALOG..." />}
      onRetry={refetch}
    >
      {(pageData) => {
        const displayCategories =
          pageData.categories && pageData.categories.length > 0
            ? pageData.categories
            : fallbackCategories;

        return (
          <div className="">
            <HeroSection {...pageData.hero} />
            <CategoriesSection
              eyebrow={
                pageData.category
                  ? `${pageData.category.title} Sub-Categories`
                  : "Premium Quality"
              }
              headingLine1={pageData.category ? pageData.category.title : "for Every Level of"}
              headingLine2="Collection & Products"
              description={
                pageData.category?.description ||
                "Choose the right gear for your needs."
              }
              categories={displayCategories}
              showNav={true}
            />
            <WhyRokaiSection />
            <ProblemSolversSection />
            <GiEngineeringSection />
            <GiSystemSection />
            <HowWeWorkSection />
            <ClientFeedbackSection />
            <FAQSection />
          </div>
        );
      }}
    </DataLoader>
  );
}
