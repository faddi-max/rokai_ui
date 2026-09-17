import HeroSection from "@/shared/components/sections/HeroSection";
import ContentGridSection from "@/shared/components/sections/ContentGridSection";
import SplitMediaSection from "@/shared/components/sections/SplitMediaSection";
import ProcessStepsSection from "@/shared/components/sections/ProcessStepsSection";
import FAQSection from "@/shared/components/sections/FAQSection";
import CTASection from "@/shared/components/sections/CTASection";
import TrustBadgesSection from "@/shared/components/sections/TrustBadgesSection";
import { useAsyncData } from "@/shared/hooks/useAsyncData";
import { programsService } from "@/shared/api/services/programsService";
import { DataLoader, PageLoader } from "@/shared/components/feedback";

export default function ProgramsPage() {
  const { data, loading, error, refetch } = useAsyncData(() =>
    programsService.getProgramsPageData()
  );

  return (
    <DataLoader
      loading={loading}
      error={error}
      data={data}
      skeleton={<PageLoader message="LOADING PARTNERSHIP PROGRAM TIERS..." />}
      onRetry={refetch}
    >
      {(pageData) => (
        <div className="bg-black">
          {/* Hero Section */}
          <HeroSection {...pageData.hero} />

          {/* Floating Trust Badges */}
          <TrustBadgesSection floating />

          {/* Programs Catalog Grid */}
          <div id="programs-catalog">
            <ContentGridSection
              header={{
                eyebrow: "OUR CORE PARTNERSHIPS",
                titleTop: "TAILORED SOLUTIONS FOR",
                titleBottom: "GYMS, BRANDS & ATHLETES",
                description:
                  "Whether you run a single neighborhood dojo, manage a multi-state academy franchise, or dream of launching your own combat lifestyle label, we have a tailored program for you.",
                align: "between",
              }}
              cards={pageData.programs}
              columns={2}
            />
          </div>

          {/* Economics / Margins Split Section */}
          <SplitMediaSection data={pageData.academyEconomics} />

          {/* 4-Step Onboarding Pipeline */}
          <ProcessStepsSection
            header={{
              eyebrow: "SIMPLE ONBOARDING",
              titleTop: "HOW TO GET",
              titleBottom: "STARTED TODAY",
              description:
                "From your initial inquiry to your students wearing custom club gear on the mats, our onboarding process takes the friction out of custom apparel.",
              align: "between",
            }}
            steps={pageData.steps}
          />

          {/* FAQs */}
          <FAQSection
            header={{
              eyebrow: "PARTNERSHIP FAQS",
              titleTop: "COMMON QUESTIONS ABOUT",
              titleBottom: "OUR PROGRAMS",
              description:
                "Transparent terms, clear pricing brackets, and flexible turnaround times designed for gym owners.",
            }}
            faqs={pageData.faqs}
          />

          {/* Closing CTA */}
          <CTASection
            eyebrow="TAKE YOUR BRAND FURTHER"
            titleTop="READY TO OUTFIT"
            titleHighlight="YOUR ACADEMY?"
            description="Partner with Rokai today for wholesale discounts, free 3D digital design renders, and guaranteed factory direct delivery."
            primaryCta={{
              label: "Apply For Partnership",
              href: "/contact#partnership",
            }}
            secondaryCta={{
              label: "Request Wholesale Price List",
              href: "/contact#quote",
            }}
          />
        </div>
      )}
    </DataLoader>
  );
}
