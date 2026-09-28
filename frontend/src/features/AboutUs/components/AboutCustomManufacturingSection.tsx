import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";

export interface ManufacturingStepData {
  number: string;
  title: string;
  description: string;
}

export interface AboutCustomManufacturingSectionProps {
  eyebrow?: string;
  titleLines?: string[];
  highlight?: string;
  description?: string;
  steps?: ManufacturingStepData[];
}

const DEFAULT_STEPS: ManufacturingStepData[] = [
  { number: "01", title: "Your Design", description: "Artwork → tech pack → sample." },
  { number: "02", title: "Your Spec", description: "Fabric, GSM, fit and construction." },
  { number: "03", title: "Your Label", description: "Branding, trims and packaging." },
  {
    number: "04",
    title: "OEM",
    description: "You bring technical specification. We manufacture to it.",
  },
  {
    number: "05",
    title: "Private Label",
    description: "Products manufactured under your brand and labelling.",
  },
  {
    number: "06",
    title: "Product Development",
    description: "Move from an idea toward a production-ready product.",
  },
];

function StepCard({
  number,
  title,
  description,
  index,
  showArrow,
}: ManufacturingStepData & { index: number; showArrow: boolean }) {
  return (
    <div className="relative">
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{
          y: -6,
          borderColor: "rgba(229, 27, 36, 0.5)",
          boxShadow: "0px 12px 26px 5px rgba(229, 27, 36, 0.32)",
        }}
        className="flex h-full min-h-[175px] w-full flex-col gap-3 rounded-[8px] border border-[#E51B24]/15 bg-[#111111] px-8 py-7 shadow-[0px_0px_9.37px_4.02px_#E51B2447] transition-colors duration-300"
      >
        <span className="font-space-grotesk text-[13px] font-normal leading-none text-[#E63946]">
          {number}
        </span>
        <h3 className="mt-3 font-space-grotesk text-[17px] font-bold uppercase leading-[22px] text-white">
          {title}
        </h3>
        <p className="max-w-[240px] font-space-grotesk text-[12px] font-normal leading-[18px] text-white/60">
          {description}
        </p>
      </motion.article>

      {showArrow && (
        <span
          aria-hidden
          className="pointer-events-none absolute -right-[27px] top-1/2 z-10 hidden w-[27px] -translate-y-1/2 items-center justify-center text-[#E63946] lg:flex"
        >
          <ArrowRight size={18} strokeWidth={1.75} />
        </span>
      )}
    </div>
  );
}

export default function AboutCustomManufacturingSection({
  eyebrow = "Custom manufacturing",
  titleLines = ["YOUR DESIGN.", "YOUR SPEC."],
  highlight = "YOUR LABEL.",
  description = "Anything within our manufacturing capability can be built around your design, specification and branding requirements.",
  steps = DEFAULT_STEPS,
}: AboutCustomManufacturingSectionProps) {
  return (
    <SectionGlow className="relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="m-5 my-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between lg:mx-25"
      >
        <div>
          <div className="mb-3 flex items-center gap-6">
            <span className="font-space-grotesk text-xs uppercase tracking-widest text-white/70">
              {eyebrow}
            </span>
            <span aria-hidden className="h-px w-10 bg-[#E63946]" />
          </div>

          <h2 className="font-space-grotesk text-3xl font-bold uppercase leading-[1.1] md:text-4xl lg:text-5xl">
            {titleLines.map((line) => (
              <span key={line} className="block text-white">
                {line}
              </span>
            ))}
            <span className="block text-[#E63946]">{highlight}</span>
          </h2>
        </div>

        <p className="max-w-xs border-l-2 border-[#E63946] pl-4 text-sm text-white/60">
          {description}
        </p>
      </motion.div>

      <div className="relative mx-auto w-full max-w-[1040px] px-5 pb-20 sm:px-8 lg:px-0">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-[27px] lg:gap-y-[21px]">
          {steps.map((step, i) => (
            <StepCard key={step.number} index={i} {...step} showArrow={i % 3 !== 2} />
          ))}
        </div>
      </div>
    </SectionGlow>
  );
}