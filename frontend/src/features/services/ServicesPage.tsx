import HeroSection from "@/shared/components/sections/HeroSection";
import ContentGridSection from "@/shared/components/sections/ContentGridSection";
import SplitMediaSection from "@/shared/components/sections/SplitMediaSection";
import ProcessStepsSection from "@/shared/components/sections/ProcessStepsSection";
import FAQSection from "@/shared/components/sections/FAQSection";
import CTASection from "@/shared/components/sections/CTASection";
import TrustBadgesSection from "@/shared/components/sections/TrustBadgesSection";
import { useAsyncData } from "@/shared/hooks/useAsyncData";
import { servicesService } from "@/shared/api/services/servicesService";
import { DataLoader, PageLoader } from "@/shared/components/feedback";

export default function ServicesPage() {
  const { data, loading, error, refetch } = useAsyncData(() =>
    servicesService.getServicesPageData()
  );

  return (
    <DataLoader
      loading={loading}
      error={error}
      data={data}
      skeleton={<PageLoader message="LOADING MANUFACTURING CAPABILITIES..." />}
      onRetry={refetch}
    >
      {(pageData) => (
        <div className="bg-black">
          {/* Services Hero Section */}
          <HeroSection {...pageData.hero} />

          {/* Floating Trust Badges */}
          <TrustBadgesSection floating />

          {/* Core Manufacturing Capabilities Grid */}
          <div id="capabilities">
            <ContentGridSection
              header={{
                eyebrow: "OUR CORE CAPABILITIES",
                titleTop: "FULL SUITE OF",
                titleBottom: "PRODUCTION SERVICES",
                description:
                  "We provide end-to-end combat sports garment engineering. Whether launching your first gym gi or fulfilling 10,000 retail units per month, we have the infrastructure to scale with you.",
                align: "between",
              }}
              cards={pageData.capabilities}
              columns={2}
            />
          </div>

          {/* 4-Step Production Workflow */}
          <ProcessStepsSection
            header={{
              eyebrow: "QUALITY GATES AT EVERY STEP",
              titleTop: "HOW WE MANUFACTURE",
              titleBottom: "YOUR GEAR",
              description:
                "Our ISO-certified manufacturing flow guarantees transparency, real-time batch updates, and verifiable consistency from initial thread to final stitch.",
              align: "between",
            }}
            steps={pageData.steps}
          />

          {/* Split Section: Lab Testing & Quality Protocol */}
          <SplitMediaSection data={pageData.labTesting} />

          {/* FAQ Section */}
          <FAQSection
            header={{
              eyebrow: "TRANSPARENT ANSWERS",
              titleTop: "MANUFACTURING & OEM",
              titleBottom: "FREQUENT QUESTIONS",
              description:
                "Everything you need to know about factory NDAs, sample turnarounds, DDP logistics, and scaling your production.",
            }}
            faqs={pageData.faqs}
          />

          {/* Call to Action Banner */}
          <CTASection
            eyebrow="TAKE THE NEXT STEP"
            titleTop="LET'S DISCUSS YOUR"
            titleHighlight="PRODUCTION NEEDS"
            description="Schedule a 15-minute consultation with our senior apparel engineer or submit your tech pack for an immediate competitive cost breakdown."
            primaryCta={{
              label: "Book a Production Consultation",
              href: "/contact#consultation",
            }}
            secondaryCta={{
              label: "Submit Your Tech Pack",
              href: "/contact#techpack",
            }}
          />
        </div>
      )}
    </DataLoader>
  );
}
