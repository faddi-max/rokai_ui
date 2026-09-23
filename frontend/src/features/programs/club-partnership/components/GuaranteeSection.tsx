import { Check, ArrowUpRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";


type Guarantee = {
  title: string;
  description: string;
  value: string;
};

const guarantees: Guarantee[] = [
  {
    title: "Strategic Relaunch",
    description:
      "We review the offer, positioning and launch plan, then refine the weak points.",
    value: "Valued at $1,500",
  },
  {
    title: "10-Day Launch Focus",
    description:
      "A concentrated launch window gives the campaign clear momentum and urgency.",
    value: "Valued at $1,500",
  },
  {
    title: "The Zero-Risk Clause",
    description:
      "The partnership structure is designed to reduce unnecessary inventory exposure.",
    value: "Valued at $1,500",
  },
];

const commitments = [
  "Real Partnerships",
  "Guaranteed Hits",
  "Factory Direct",
  "Scale System",
];

/* ------------------------------------------------------------------ */
/* Guarantee card                                                      */
/* ------------------------------------------------------------------ */
function GuaranteeCard({ title, description, value, index }: Guarantee & { index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -8,
        borderColor: "rgba(229, 27, 36, 0.5)",
        boxShadow: "0px 12px 28px 6px rgba(229, 27, 36, 0.38)",
      }}
      className="group flex min-h-[188px] w-full flex-col rounded-[8.03px] border border-white/10 bg-[#111111] px-7 py-7 shadow-[0px_0px_9.37px_4.02px_#E51B2447] transition-all duration-300"
    >
      <span className="flex size-7 items-center justify-center rounded-full bg-[#E51B24]/15 text-[#E51B24] transition-colors duration-300 group-hover:bg-[#E51B24] group-hover:text-white">
        <Check size={13} strokeWidth={3} aria-hidden />
      </span>

      <h3 className="mt-6 font-space-grotesk text-[16px] font-bold uppercase leading-snug tracking-[-0.01em] text-white transition-colors duration-300 group-hover:text-[#E51B24]">
        {title}
      </h3>

      <p className="mt-2 max-w-[240px] font-space-grotesk text-[12px] leading-[1.5] text-white/60 transition-colors duration-300 group-hover:text-white/90">
        {description}
      </p>

      <div className="mt-auto pt-6">
        <p className="border-t border-white/10 pt-4 font-space-grotesk text-center text-[11px] font-medium text-[#E63946]">
          {value}
        </p>
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function GuaranteeSection() {
  return (
    <SectionGlow className="relative overflow-hidden">
       {/* --- Header --- */}
        <SectionHeaderblog
          bare
          eyebrow="Security & confidence"
          title="The ROKAI"
          highlight="30-Order Guarantee."
          highlightGradient="linear-gradient(90deg, #E63946 0%, #802027 100%)"
          accentColor="#E63946"
          description="If your academy does not generate at least 30 apparel orders within the initial launch period, the process is reviewed against the agreed program terms."
        />
      <div className="relative z-10 mx-auto w-full max-w-[1178px] px-5 pb-16 sm:px-8 lg:px-[30px]">
       

        {/* --- Guarantee cards --- */}
        <div className="mt-2 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guarantees.map((item, i) => (
            <GuaranteeCard key={item.title} index={i} {...item} />
          ))}
        </div>

        {/* --- Commitment panel --- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-8 flex flex-col gap-10 overflow-hidden rounded-[12px] border border-white/10 bg-[#0d0d0d] p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between lg:gap-14 lg:p-12"
        >
          {/* Top accent divider */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-[3px]"
            style={{
              background:
                "linear-gradient(90deg, #E63946 0%, rgba(230, 57, 70, 0) 100%)",
            }}
          />
          {/* Left: copy */}
          <div className="max-w-[440px]">
            <div className="flex items-center gap-3">
              <ShieldCheck size={13} className="text-[#E63946]" aria-hidden />
              <span className="font-space-grotesk text-[11px] font-medium uppercase tracking-[0.08em] text-white/50">
                The ROKAI commitment
              </span>
              <span aria-hidden className="h-px w-8 bg-[#E63946]" />
            </div>

            <h3 className="mt-4 font-space-grotesk text-[24px] font-bold uppercase leading-[1.2] tracking-[-0.01em] text-white sm:text-[28px]">
              You don&apos;t pay for effort. You pay for{" "}
              <span className="text-[#E63946]">results—and we stand behind them.</span>
            </h3>

            <p className="mt-4 font-space-grotesk text-[13px] leading-[1.5] text-white/50">
              Your competitors get products. Your club gets a complete growth system.
            </p>
          </div>

          {/* Right: checklist pills + CTA */}
          <div className="w-full max-w-[460px] shrink-0">
            <div className="grid grid-cols-2 gap-3">
              {commitments.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-[6px] border border-white/10 bg-[#151515] px-4 py-3"
                >
                  <Check size={13} className="shrink-0 text-[#E51B24]" strokeWidth={3} aria-hidden />
                  <span className="font-space-grotesk text-[12px] font-medium text-white/80">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="#apply"
              className="mt-3 flex h-[52px] w-full items-center justify-center gap-2 rounded-[6px] bg-[#E63946] font-space-grotesk text-[13px] font-medium text-white transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E63946]"
            >
              Launch Your Brand Now
              <ArrowUpRight size={14} aria-hidden />
            </a>
          </div>
        </motion.div>
      </div>
    </SectionGlow>
  );
}