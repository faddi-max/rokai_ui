import { motion } from "framer-motion";
import HeroSection from "@/shared/components/sections/HeroSection";
import { useAsyncData } from "@/shared/hooks/useAsyncData";
import { categoriesService } from "@/shared/api/services/categoriesService";
import { DataLoader, PageLoader } from "@/shared/components/feedback";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";

import { audienceTags } from "./data/audienceTags";
import AudienceTagsSection from "./components/AudienceTagsSection";
import FAQSection from "../home/components/FAQSection";
import ClientFeedbackSection from "../categories/componnets/ClientFeedbackSection";
import ScalingBrands from "../home/components/ScalingBrandsSection";
import AffiliateLoginSection from "./components/AffiliateLoginSection";
import StepSection from "./components/StepSection";
import BenefitsSection from "./components/BenefitsSection";

export default function AffiliatePage() {
  const { data, loading, error, refetch } = useAsyncData(() =>
    categoriesService.getProgramsPageData()
  );

  return (
    <DataLoader
      loading={loading}
      error={error}
      data={data}
      skeleton={<PageLoader message="LOADING PROGRAM DETAILS..." />}
      onRetry={refetch}
    >
      {(pageData) => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full"
        >
          <HeroSection {...pageData.hero} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionHeaderblog
              eyebrow="Built for the community"
              title="Is this program"
              highlight="for you?"
              description="If you lead, teach, compete, create, or connect people in Brazilian Jiu-Jitsu, Rokai gives you a direct way to turn trusted recommendations into additional income."
            />
            <AudienceTagsSection tags={audienceTags} />
            <AffiliateLoginSection />
            <StepSection />
            <BenefitsSection />
            <ScalingBrands />
            <ClientFeedbackSection />
            <FAQSection />
          </motion.div>
        </motion.div>
      )}
    </DataLoader>
  );
}