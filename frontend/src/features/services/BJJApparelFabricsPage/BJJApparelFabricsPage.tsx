import { motion } from "framer-motion";
import { bespokehero } from "@/assets";
import { useAsyncData } from "@/shared/hooks/useAsyncData";
import { DataLoader, PageLoader } from "@/shared/components/feedback";
import { fabricsService } from "@/shared/api/services/fabricsService";
import HowWeWorkSection from "@/features/categories/data/HowWeWorkSection";
import ClientFeedbackSection from "@/features/categories/componnets/ClientFeedbackSection";
import FAQSection from "@/features/home/components/FAQSection";

import FabricsHero from "./components/FabricsHero";
import FabricsSection from "./components/FabricsSection";

export default function BJJApparelFabricsPage() {
  const { data, loading, error, refetch } = useAsyncData(() =>
    fabricsService.getFabricsPageData()
  );

  return (
    <DataLoader
      loading={loading}
      error={error}
      data={data}
      skeleton={<PageLoader message="LOADING FABRICS..." />}
      onRetry={refetch}
    >
      {(pageData) => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <FabricsHero image={bespokehero}  />

          {pageData.collections.map((collection) => (
            <FabricsSection key={collection.id} data={collection} />
          ))}

          <HowWeWorkSection />
          <ClientFeedbackSection />
          <FAQSection />
        </motion.div>
      )}
    </DataLoader>
  );
}