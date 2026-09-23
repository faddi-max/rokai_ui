import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";


type Benefit = {
  number: string;
  title: string;
  description: string;
};

const benefits: Benefit[] = [
  {
    number: "01",
    title: "New Revenue Stream",
    description: "Generate consistent income beyond memberships",
  },
  {
    number: "02",
    title: "Zero Inventory Risk",
    description: "No upfront investment or unsold stock",
  },
  {
    number: "03",
    title: "Done-For-You System",
    description: "We handle everything operational",
  },
  {
    number: "04",
    title: "Stronger Team Identity",
    description: "Build pride, loyalty, and retention",
  },
  {
    number: "05",
    title: "Proven Sales System",
    description: "Convert students into repeat buyers",
  },
  {
    number: "06",
    title: "Fast Launch",
    description: "Go live within 14 days",
  },
  {
    number: "07",
    title: "Risk-Aware Structure",
    description: "Backed by a results-driven guarantee",
  },
];

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */
function BenefitCard({ number, title, description, index }: Benefit & { index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -6,
        borderColor: "rgba(229, 27, 36, 0.55)",
        boxShadow: "0px 12px 24px 4px rgba(229, 27, 36, 0.28)",
      }}
      className="group flex min-h-[132px] w-full flex-col justify-between rounded-[10px] border border-[#E51B24]/25 bg-[#111111] px-7 py-6 transition-all duration-300"
    >
      <span className="font-space-grotesk text-[13px] font-medium text-[#E51B24]">
        {number}
      </span>

      <div className="mt-4">
        <h3 className="font-space-grotesk text-[15px] font-bold uppercase leading-snug tracking-[-0.01em] text-white">
          {title}
        </h3>
        <p className="mt-2 font-space-grotesk text-[12px] leading-[1.5] text-white/50">
          {description}
        </p>
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function WhyBeneficialSection() {
  return (
    <SectionGlow className="relative overflow-hidden">
          {/* --- Header --- */}
        <SectionHeaderblog
          bare
          eyebrow="Why it works"
          title="Why this program is"
          highlight="beneficial for clubs."
          highlightGradient="linear-gradient(90deg, #E63946 0%, #7A1B22 100%)"
          accentColor="#E63946"
          description="ROKAI is more than a partnership. It's a complete revenue system for your academy."
        />
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 pb-20 sm:px-8 lg:px-[30px]">
    

        {/* --- Cards --- */}
        <div className="mt-14 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {benefits.map((item, i) => (
            <BenefitCard key={item.number} index={i} {...item} />
          ))}
        </div>

        {/* --- CTA --- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex justify-end"
        >
          <a
            href="#apply"
            className="flex h-[48px] shrink-0 items-center gap-2 rounded-[6px] bg-[#E51B24] px-6 font-space-grotesk text-[13px] font-medium text-white transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E51B24]"
          >
            Start Now
            <ArrowUpRight size={14} aria-hidden />
          </a>
        </motion.div>
      </div>
    </SectionGlow>
  );
}