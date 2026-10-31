import { motion } from "framer-motion";
import { costEstimatorHero } from "@/assets";
import CostEstimatorHero from "../combat-apparel-cost-calculator/componets/CostEstimatorHero";
import CostEstimatorBanner from "../combat-apparel-cost-calculator/componets/CostEstimatorBanner";
import ProfitCalculatorSection from "./components/ProfitCalculatorSection";
import CollectionPlannerSection from "./components/CollectionPlannerSection";
import ProfitInspirationSection from "./components/ProfitInspirationSection";
import { profitHero } from "./data/profitCalculator.data";

import ProfitInspirationSection1 from "./components/ProfitInspirationSection1";
import CollectionPlannerSection1 from "./components/CollectionPlannerSection1";

/* Maroon wash shared by the collection planner + inspiration sections */
const MAROON_WASH = [
  "radial-gradient(ellipse 55% 35% at 60% 55%, rgba(230,57,70,0.28), transparent 75%)",
  "radial-gradient(ellipse 80% 30% at 50% 0%, rgba(120,20,30,0.45), transparent 80%)",
  "linear-gradient(180deg, rgba(60,12,18,0.55) 0%, rgba(17,17,17,0) 100%)",
].join(", ");

export default function CombatApparelProfitCalculatorPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full"
    >
      <CostEstimatorHero {...profitHero} />
      <CostEstimatorBanner image={costEstimatorHero} steps={[]} />
      <ProfitCalculatorSection />

    
      <section
        aria-label="Profit calculator guide"
        className="relative overflow-hidden bg-[#111111]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: MAROON_WASH }}
        />
        <div className="relative z-10">
          <CollectionPlannerSection />
          <ProfitInspirationSection />
          
           <CollectionPlannerSection1 />
            <ProfitInspirationSection1 />

           
        </div>
      </section>
    </motion.main>
  );
}