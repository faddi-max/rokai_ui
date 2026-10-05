import { useState } from "react";
import { motion } from "framer-motion";

import LeadMagnetHero from "./components/LeadMagnetHero";
import AcademyIntelligenceForm from "./components/AcademyIntelligenceForm";
import AcademyReportCard from "./components/AcademyReportCard";
import EliteStandardsSection from "./components/EliteStandardsSection";
import { buildReport, type AcademyReport } from "./data/academyReport";

import FAQSection from "@/features/home/components/FAQSection";
import ClientFeedbackSection from "@/features/categories/componnets/ClientFeedbackSection";

export default function LeadMagnetStudioPage() {
  const [report, setReport] = useState<AcademyReport | null>(null);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full"
    >
      <LeadMagnetHero />
      <EliteStandardsSection />

      <AcademyIntelligenceForm
        onGenerate={async (payload) => {
          // Later: const res = await api.generateReport(payload); setReport(res);
          setReport(buildReport(payload));
          setTimeout(
            () =>
              document
                .getElementById("academy-report")
                ?.scrollIntoView({ behavior: "smooth", block: "start" }),
            100
          );
        }}
      />

      {report && <AcademyReportCard report={report} />}

      <ClientFeedbackSection />
      <FAQSection />
    </motion.main>
  );
}