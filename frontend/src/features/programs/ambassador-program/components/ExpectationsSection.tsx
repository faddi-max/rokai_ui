import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";

type Expectation = {
  label: string;
  description: string;
};

const expectations: Expectation[] = [
  {
    label: "Integrity",
    description: "Represent ROKAI with absolute integrity",
  },
  {
    label: "Gear",
    description: "Wear ROKAI gear during training & events",
  },
  {
    label: "Content",
    description: "Share authentic content (training, lifestyle)",
  },
  {
    label: "BJJ Community",
    description: "Maintain active presence in the BJJ community",
  },
];

/* ------------------------------------------------------------------ */
/* Card — same shell as StepCard (border / bg / glow / hover), but     */
/* layout is label + line on top, description pinned to the bottom.    */
/* ------------------------------------------------------------------ */
function ExpectationCard({
  label,
  description,
  index,
}: Expectation & { index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -8,
        scale: 1.02,
        borderColor: "rgba(229, 27, 36, 0.5)",
        boxShadow: "0px 12px 28px 6px rgba(229, 27, 36, 0.38)",
      }}
      className="group flex min-h-[156px] w-full flex-col justify-between rounded-[8.03px] border border-white/10 bg-[#111111] px-9 pb-7 pt-9 shadow-[0px_0px_9.37px_4.02px_#E51B2447] transition-all duration-300 lg:h-[156px]"
    >
      <div className="flex items-center gap-3">
        <span className="font-space-grotesk text-[13px] font-normal uppercase leading-none tracking-[0.02em] text-white/90 transition-colors duration-300 group-hover:text-white">
          {label}
        </span>
        <span
          aria-hidden
          className="h-px w-8 bg-[#E51B24] transition-all duration-300 group-hover:w-12"
        />
      </div>

      <p className="max-w-[172px] font-space-grotesk text-[11px] leading-[1.5] text-white/60 transition-colors duration-300 group-hover:text-white/90">
        {description}
      </p>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function ExpectationsSection() {
  return (
    <SectionGlow className="relative overflow-hidden">
      <div className="relative z-10 mx-auto w-full max-w-[1440px] pb-24 pt-10">
        {/* --- Header (left aligned, two lines) --- */}
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="px-5 sm:px-8 lg:px-[30px]"
        >
          <div className="flex items-center gap-3">
            <span className="font-space-grotesk text-[12px] font-normal leading-none text-white">
              The standard
            </span>
            <span aria-hidden className="h-px w-[46px] bg-[#E63946]" />
          </div>

          <h2 className="mt-4 font-space-grotesk uppercase leading-[0.95] tracking-[-0.02em]">
            <span className="block text-[44px] font-bold text-white sm:text-[56px] lg:text-[64px]">
              Ambassador
            </span>
            <span className="block bg-gradient-to-r from-[#E63946] to-[#7A1B22] bg-clip-text text-[44px] font-medium text-transparent sm:text-[56px] lg:text-[64px]">
              Expectations
            </span>
          </h2>
        </motion.header>

        {/* --- Cards --- */}
        <div className="mx-auto mt-16 grid w-full max-w-[1072px] grid-cols-1 gap-6 px-5 sm:grid-cols-2 sm:px-8 lg:mt-[72px] lg:grid-cols-4 lg:px-0">
          {expectations.map((item, i) => (
            <ExpectationCard key={item.label} index={i} {...item} />
          ))}
        </div>

        {/* --- CTA banner --- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 px-5 sm:px-8 lg:mt-[70px] lg:px-[44px]"
        >
          <div className="flex flex-col items-start justify-between gap-6 rounded-[12px] bg-white px-7 py-9 shadow-[0px_0px_12px_3px_rgba(230,57,70,0.28)] sm:px-10 lg:h-[197px] lg:flex-row lg:items-center lg:gap-10 lg:px-[48px] lg:py-0">
            <h3 className="font-space-grotesk text-[26px] font-bold uppercase leading-[1.1] tracking-[-0.01em] text-[#E63946] sm:text-[32px] lg:text-[36px]">
              Ready to prove your worth?
            </h3>

            <a
              href="#apply"
              className="flex h-[56px] shrink-0 items-center gap-6 rounded-[6px] bg-[#E63946] px-4 font-space-grotesk text-[14px] font-medium text-white transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E63946]"
            >
              Join the Movement
              <ArrowUpRight size={14} aria-hidden />
            </a>
          </div>
        </motion.div>
      </div>
    </SectionGlow>
  );
}
