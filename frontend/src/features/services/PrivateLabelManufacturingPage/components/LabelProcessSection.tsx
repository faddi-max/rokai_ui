import { ArrowRight, Quote } from "lucide-react";
import { motion } from "framer-motion";

import SectionGlow from "@/shared/components/layout/SectionGlow";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";

/* -------------------------------------------------------------------------- */
/*  Types — API-ready                                                         */
/* -------------------------------------------------------------------------- */

export interface ProcessStepData {
  number: string;
  title: string;
  description: string;
}

export interface ClientLogoData {
  label: string;
}

export interface TestimonialData {
  quote: string;
  clientName: string;
  clientRole: string;
}

export interface PrivateLabelProcessSectionProps {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  description?: string;
  steps?: ProcessStepData[];
  logos?: ClientLogoData[];
  testimonial?: TestimonialData;
}

/* -------------------------------------------------------------------------- */
/*  Default content                                                           */
/* -------------------------------------------------------------------------- */

const DEFAULT_STEPS: ProcessStepData[] = [
  {
    number: "01",
    title: "Design Support",
    description: "Move from product idea to production-ready specifications.",
  },
  {
    number: "02",
    title: "Manufacturing Expertise",
    description: "Develop products with practical manufacturing considerations.",
  },
  {
    number: "03",
    title: "Consistent Quality",
    description: "Build repeatable products around approved specifications.",
  },
  {
    number: "04",
    title: "Reliable Production",
    description: "Structure your collection around a clear production workflow.",
  },
  {
    number: "05",
    title: "Custom Branding",
    description: "Carry your identity across product and packaging.",
  },
  {
    number: "06",
    title: "Global Fulfillment",
    description: "Prepare finished products for delivery to your market.",
  },
];

const DEFAULT_LOGOS: ClientLogoData[] = [
  { label: "Client Logo" },
  { label: "Brand Name" },
  { label: "Academy" },
  { label: "BJJ Brand" },
  { label: "Team Logo" },
];

const DEFAULT_TESTIMONIAL: TestimonialData = {
  quote:
    "Rokai helped us move from an initial product idea to a finished collection with a much clearer production process.",
  clientName: "Client Name",
  clientRole: "Founder / Brand Name",
};

/* -------------------------------------------------------------------------- */
/*  Process step card                                                         */
/* -------------------------------------------------------------------------- */

function ProcessStepCard({
  step,
  index,
}: {
  step: ProcessStepData;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -4,
        borderColor: "rgba(229, 27, 36, 0.5)",
      }}
      className="flex min-h-[128px] w-full flex-1 flex-col rounded-[8px] border border-[#E51B24]/25 bg-[#111111] px-5 py-4 transition-all duration-300"
    >
      <span className="font-space-grotesk text-[11px] font-bold text-[#E51B24]">
        {step.number}
      </span>

      <h3 className="mt-2 font-space-grotesk text-[15px] font-bold uppercase leading-[18px] tracking-[0.01em] text-white">
        {step.title}
      </h3>

      <p className="mt-1.5 font-space-grotesk text-[13px] font-light leading-[16px] text-white/50">
        {step.description}
      </p>
    </motion.div>
  );
}

/** Small horizontal connector arrow shown between adjacent cards in a row. */
function StepConnector() {
  return (
    <span
      aria-hidden
      className="hidden shrink-0 items-center justify-center lg:flex lg:w-8"
    >
      <ArrowRight size={16} className="text-[#E51B24]" strokeWidth={2} />
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Client logo strip                                                         */
/* -------------------------------------------------------------------------- */

function ClientLogoStrip({ logos }: { logos: ClientLogoData[] }) {
  return (
    <div className="grid grid-cols-2 divide-y divide-white/10 border-y border-white/10 sm:grid-cols-3 sm:divide-y-0 lg:grid-cols-5">
      {logos.map((logo, index) => (
        <div
          key={logo.label}
          className={`flex items-center justify-center px-4 py-6 ${
            index > 0 ? "sm:border-l sm:border-white/10" : ""
          }`}
        >
          <span className="font-space-grotesk text-[11px] font-medium uppercase tracking-[0.1em] text-white/30">
            {logo.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Testimonial card                                                          */
/* -------------------------------------------------------------------------- */

function TestimonialCard({ testimonial }: { testimonial: TestimonialData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-6 rounded-[8px] border border-white/10 bg-[#111111] px-7 py-12 sm:flex-row sm:items-center sm:justify-between sm:gap-10"
    >
      <div className="flex gap-4 sm:gap-5">
        <Quote
          className="mt-0.5 h-6 w-6 shrink-0 text-[#E51B24]"
          strokeWidth={0}
          fill="currentColor"
        />
        <p className="max-w-[520px] font-space-grotesk text-[20px] font-normal leading-[24px] text-white/85">
          {testimonial.quote}
        </p>
      </div>

      <div className="shrink-0 text-right sm:pl-6">
        <p className="font-space-grotesk text-[15px] font-bold uppercase tracking-[0.06em] text-white">
          {testimonial.clientName}
        </p>
        <p className="mt-1 font-space-grotesk text-[11px] font-light text-white/40">
          {testimonial.clientRole}
        </p>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function LabelProcessSection({
  eyebrow = "Partnership",
  title = "WHY BRANDS",
  highlight = "PARTNER WITH ROKAI.",
  description = "Position Rokai as a long-term manufacturing partner instead of simply another supplier.",
  steps = DEFAULT_STEPS,
  logos = DEFAULT_LOGOS,
  testimonial = DEFAULT_TESTIMONIAL,
}: PrivateLabelProcessSectionProps) {
  const rows = [steps.slice(0, 3), steps.slice(3, 6)];

  return (
    <SectionGlow className="relative overflow-hidden">
      <SectionHeaderblog
        bare
        eyebrow={eyebrow}
        title={title}
        highlight={highlight}
        accentColor="#E51B24"
        description={description}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1178px] px-5 pb-16 sm:px-8 lg:px-[30px]">
        {/* --- Process step grid, with connector arrows inside each row --- */}
        <div className="flex flex-col gap-4">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
              {row.map((step, i) => {
                const globalIndex = rowIndex * 3 + i;
                const isLastInRow = i === row.length - 1;

                return (
                  <div key={step.number} className="flex flex-1 items-stretch">
                    <ProcessStepCard step={step} index={globalIndex} />
                    {!isLastInRow && <StepConnector />}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* --- Client logo strip --- */}
        <div className="mt-12 lg:mt-14">
          <ClientLogoStrip logos={logos} />
        </div>

        {/* --- Testimonial --- */}
        <div className="mt-8 lg:mt-10">
          <TestimonialCard testimonial={testimonial} />
        </div>
      </div>
    </SectionGlow>
  );
}