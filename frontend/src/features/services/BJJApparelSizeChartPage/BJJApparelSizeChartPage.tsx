import { motion } from "framer-motion";
import { bespokehero, sizeChartMen } from "@/assets";
import { useAsyncData } from "@/shared/hooks/useAsyncData";
import { DataLoader, PageLoader } from "@/shared/components/feedback";
import HowWeWorkSection from "@/features/categories/data/HowWeWorkSection";
import ClientFeedbackSection from "@/features/categories/componnets/ClientFeedbackSection";
import FAQSection from "@/features/home/components/FAQSection";
import { sizeChartService } from "@/shared/components/sections/sizeChartService";
import SizeChartHero from "./components/SizeChartHero";
import SizeChartSection from "./components/SizeChartSection";

export default function BJJApparelSizeChartPage() {
  const { data, loading, error, refetch } = useAsyncData(() =>
    sizeChartService.getSizeCharts()
  );

  return (
    <DataLoader
      loading={loading}
      error={error}
      data={data}
      skeleton={<PageLoader message="LOADING SIZE CHARTS..." />}
      onRetry={refetch}
    >
      {(charts) => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SizeChartHero image={bespokehero} />
          {charts.map((chart) => (
            <SizeChartSection key={chart.id} data={chart} />
          ))}
          <HowWeWorkSection />
          <ClientFeedbackSection />
          <FAQSection />
        </motion.div>
      )}
    </DataLoader>
  );
}