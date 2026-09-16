import PageHero from "@/shared/components/sections/PageHero";
import ContentGridSection from "@/shared/components/sections/ContentGridSection";
import SplitMediaSection from "@/shared/components/sections/SplitMediaSection";
import ProcessStepsSection from "@/shared/components/sections/ProcessStepsSection";
import FAQSection from "@/shared/components/sections/FAQSection";
import CTASection from "@/shared/components/sections/CTASection";
import TrustBadgesSection from "@/shared/components/sections/TrustBadgesSection";
import { useAsyncData } from "@/shared/hooks/useAsyncData";
import { categoriesService } from "@/shared/api/services/categoriesService";
import { DataLoader, PageLoader } from "@/shared/components/feedback";

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
          {/* Hero Section */}
          <PageHero {...pageData.hero} />

          {/* Floating Trust Badges */}
          <TrustBadgesSection floating />

          {/* Product Categories Catalog Grid */}
          <div id="catalog">
            <ContentGridSection
              header={{
                eyebrow: "OUR CORE CATALOG",
                titleTop: "FULL RANGE OF",
                titleBottom: "BJJ & COMBAT APPAREL",
                description:
                  "Choose from our battle-tested uniform cuts or work with our pattern engineers to create a proprietary fit for your academy members.",
                align: "between",
              }}
              cards={pageData.catalog}
              columns={3}
            />
          </div>

          {/* Fabric Specifications Split Feature */}
          <SplitMediaSection data={pageData.fabricSpecs} />

          {/* How It Works Workflow Steps */}
          <ProcessStepsSection
            header={{
              eyebrow: "SIMPLE & TRANSPARENT",
              titleTop: "HOW TO ORDER",
              titleBottom: "CUSTOM APPAREL",
              description:
                "From initial concept to your academy's gear rack, our 4-step streamlined production pipeline eliminates guesswork.",
              align: "between",
            }}
            steps={pageData.steps}
          />

          {/* Category FAQs */}
          <FAQSection
            header={{
              eyebrow: "SPECIFICATIONS & DETAILS",
              titleTop: "CATEGORY SPECIFIC",
              titleBottom: "FREQUENT QUESTIONS",
              description:
                "Got questions about sizing, fabric certifications, or IBJJF legalities? We've got answers.",
            }}
            faqs={pageData.faqs}
          />

          {/* Closing Call to Action */}
          <CTASection
            eyebrow="GET STARTED TODAY"
            titleTop="READY TO OUTFIT"
            titleHighlight="YOUR ENTIRE ACADEMY?"
            description="Get free 3D design mockups and a transparent quote within 24 hours. No hidden fees, guaranteed on-time delivery."
            primaryCta={{
              label: "Start Your Custom Order",
              href: "/contact",
            }}
            secondaryCta={{
              label: "Request Fabric Swatches",
              href: "/contact#samples",
            }}
          />
        </div>
      )}
    </DataLoader>
  );
}
