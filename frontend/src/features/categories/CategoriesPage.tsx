import HeroSection from "@/shared/components/sections/HeroSection";

import { useAsyncData } from "@/shared/hooks/useAsyncData";
import { categoriesService } from "@/shared/api/services/categoriesService";
import { DataLoader, PageLoader } from "@/shared/components/feedback";
import CategoriesSection from "@/shared/components/sections/CategoriesSection";
import { categories } from "./data/catagories";
import FAQSection from "../home/components/FAQSection";
import ProblemSolversSection from "../home/components/ProblemSolversSection";
import WhyRokaiSection from "@/shared/components/sections/WhyRokaiSection";
import GiEngineeringSection from "@/shared/components/sections/GiEngineeringSection";
import GiSystemSection from "./componnets/GiSystemSection";

import HowWeWorkSection from "./data/HowWeWorkSection";
import ClientFeedbackSection from "./componnets/ClientFeedbackSection";
export default function CategoriesPage() {
  const { data, loading, error, refetch } = useAsyncData(() =>
    categoriesService.getCategoriesPageData()
  );

  return (
    <DataLoader
      loading={loading}
      error={error}
      data={data}
      skeleton={<PageLoader message="LOADING APPAREL CATALOG..." />}
      onRetry={refetch}
    >
      {(pageData) => (
        <div className="bg-black">
          <HeroSection {...pageData.hero} />
         <CategoriesSection
  eyebrow="Premium Quality"
  headingLine1="for Every Level of"
  headingLine2="Training & Competition"
  description="Choose the right Gi for your needs."
  categories={categories}
  showNav={false}
/>
<WhyRokaiSection />
  <ProblemSolversSection />
  <GiEngineeringSection />
  <GiSystemSection />
  <HowWeWorkSection />
  <ClientFeedbackSection />
  <FAQSection />
  
        </div>
       
        
      )}
    </DataLoader>
  );
}
