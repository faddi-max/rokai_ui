import { motion } from "framer-motion";
import CostEstimatorHero from "./componets/CostEstimatorHero";
import CostEstimatorBanner from "./componets/CostEstimatorBanner";
import CostEstimatorSection from "./componets/CostEstimatorSection";
import { costEstimatorHero } from "@/assets";
import CostEstimatorOverview from "./componets/CostEstimatorOverview";
import CostEstimatorHowToUse from "./componets/CostEstimatorHowToUse";
import FAQSection from "@/features/home/components/FAQSection";
import CostEstimatorResultsGuide from "./componets/CostEstimatorResultsGuide";

export default function CombatApparelCostCalculatorPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full"
    >
      <CostEstimatorHero />
      <CostEstimatorBanner image={costEstimatorHero} />
      <CostEstimatorSection />
      <CostEstimatorOverview />
      <CostEstimatorHowToUse />
      <CostEstimatorResultsGuide />
      <FAQSection />
    </motion.main>
  );
}