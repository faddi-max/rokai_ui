import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedArrow from "@/shared/components/ui/AnimatedArrow";
import { profitCta } from "../data/profitCalculator1.data";
import { QuoteCta } from "../../combat-apparel-cost-calculator/componets/CostEstimatorResultsGuide";

export default function ProfitInspirationSection() {
  return (
    <div className="mx-auto w-full max-w-[1000px] px-5 pb-16 sm:px-8 lg:pb-24">
    <QuoteCta />
    </div>
  );
}