import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import { Benefit, BENEFITS } from "../data/benefits.data";
import BenefitCard from "./BenefitCard";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";

type BenefitsSectionProps = {
  benefits?: Benefit[];
};

export default function BenefitsSection({
  benefits = BENEFITS,
}: BenefitsSectionProps) {
  return (
    <SectionGlow>
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
        <SectionHeaderblog
          eyebrow="Partnership benefits"
          title="More than"
          highlight="a link."
          description="Everything you need to promote with clarity, follow performance, and grow a reliable partnership."
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, staggerChildren: 0.12 }}
          className="mx-auto mt-12 grid max-w-[742px] grid-cols-1 justify-items-center gap-[22px] md:grid-cols-2 lg:mt-16"
        >
          {benefits.map(({ id, ...benefit }, i) => (
            <BenefitCard key={id} index={i + 1} {...benefit} />
          ))}
        </motion.div>
      </section>
    </SectionGlow>
  );
}
