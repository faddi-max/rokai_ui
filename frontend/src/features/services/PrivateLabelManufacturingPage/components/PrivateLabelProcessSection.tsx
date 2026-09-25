import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";

/* -------------------------------------------------------------------------- */
/*  Types — API-ready                                                         */
/* -------------------------------------------------------------------------- */

export interface PrivateLabelStep {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface PrivateLabelProcessSectionProps {
  eyebrow?: string;
  title?: string;
   titleLine2?: string;
  highlight?: string;
  afterHighlight?: string;
  description?: string;
  steps?: PrivateLabelStep[];
}

/* -------------------------------------------------------------------------- */
/*  Default content                                                           */
/* -------------------------------------------------------------------------- */

const DEFAULT_STEPS: PrivateLabelStep[] = [
  {
    id: "your-idea",
    number: "01",
    title: "YOUR IDEA",
    description: "Concept, references or sketches.",
  },
  {
    id: "design",
    number: "02",
    title: "DESIGN",
    description: "Specifications and development.",
  },
  {
    id: "sampling",
    number: "03",
    title: "SAMPLING",
    description: "Prototype for approval.",
  },
  {
    id: "production",
    number: "04",
    title: "PRODUCTION",
    description: "Approved bulk manufacturing.",
  },
  {
    id: "quality-check",
    number: "05",
    title: "QUALITY CHECK",
    description: "Inspection before shipment.",
  },
  {
    id: "delivery",
    number: "06",
    title: "DELIVERY",
    description: "Packed and shipped globally.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Card                                                                      */
/* -------------------------------------------------------------------------- */

function StepCard({ step, index }: { step: PrivateLabelStep; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -4,
        borderColor: "rgba(229, 27, 36, 0.55)",
        boxShadow: "0px 10px 24px 2px rgba(229, 27, 36, 0.22)",
      }}
      className="flex h-full min-h-[118px] w-full flex-col justify-center gap-2 rounded-[8px] border border-[#E51B24]/25 bg-[#111111] px-6 py-5 transition-colors duration-300"
    >
      <span className="font-space-grotesk text-[13px] font-bold leading-none text-[#E51B24]">
        {step.number}
      </span>
      <h3 className="font-space-grotesk text-[15px] font-bold uppercase leading-snug tracking-[-0.01em] text-white">
        {step.title}
      </h3>
      <p className="font-space-grotesk text-[12px] leading-[1.5] text-white/50">
        {step.description}
      </p>
    </motion.div>
  );
}


function StepConnector() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute right-[-22px] top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center lg:flex"
    >
      <ArrowRight className="h-4 w-4 text-[#E51B24]" strokeWidth={2.8} />
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function PrivateLabelProcessSection({
  eyebrow = "Private Label",
title = "YOUR BRAND.",
titleLine2 = "YOUR DESIGNS.",

  highlight = "OUR EXPERTISE.",

  description = "Private label manufacturing means you build the brand while Rokai supports the product development and manufacturing behind it. You bring the vision, we help turn it into a production ready product.",
  steps = DEFAULT_STEPS,
}: PrivateLabelProcessSectionProps) {
  return (
    <SectionGlow className="relative overflow-hidden">
      <SectionHeaderblog
        bare
        eyebrow={eyebrow}
        title={title}
        highlight={highlight}
     titleLine2={titleLine2}
        highlightPosition="start"
        accentColor="#E51B24"
        description={description}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1178px] px-5 pb-16 sm:px-8 lg:px-[30px]">
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-6">
          {steps.map((step, i) => (
            <div key={step.id} className="relative">
              <StepCard step={step} index={i} />
              {i % 3 !== 2 && <StepConnector />}
            </div>
          ))}
        </div>
      </div>
    </SectionGlow>
  );
}