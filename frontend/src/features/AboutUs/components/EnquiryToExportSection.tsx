import { motion } from "framer-motion";

export interface TimelineStepData {
  number: string;
  title: string;
  description: string;
}

export interface EnquiryToExportSectionProps {
  image: string;
  imageAlt?: string;
  eyebrow?: string;
  titleWhite?: string;
  titleRed?: string;
  description?: string;
  steps?: TimelineStepData[];
}

const DEFAULT_STEPS: TimelineStepData[] = [
  { number: "01", title: "Enquiry", description: "Understand the product and project requirements." },
  { number: "02", title: "Spec & Tech Pack", description: "Review materials, construction and technical requirements." },
  { number: "03", title: "Sample", description: "Turn the specification into a physical sample." },
  { number: "04", title: "Approval", description: "Review the product before production begins." },
  { number: "05", title: "Production", description: "Move the approved product into manufacturing." },
  { number: "06", title: "QC", description: "Inspect production through defined quality stages." },
  { number: "07", title: "Export", description: "Prepare the completed order for delivery." },
];

function TimelineStep({
  number,
  title,
  description,
  index,
  isFirst,
  isLast,
}: TimelineStepData & { index: number; isFirst: boolean; isLast: boolean }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={`relative min-h-[200px] border-l border-white/10 pb-6 pl-5 pr-3 pt-[56px] ${
        isFirst ? "lg:border-l-transparent lg:pl-0" : ""
      } ${isLast ? "lg:border-r lg:border-r-white/10" : ""}`}
    >
      <span
        aria-hidden
        className="absolute left-0 top-[22px] size-[5px] -translate-x-1/2 rounded-full bg-[#E63946]"
      />
      <span className="block font-space-grotesk text-[11px] font-normal leading-none text-[#E63946]">
        {number}
      </span>
      <h3 className="mt-4 font-space-grotesk text-[14px] font-bold leading-[20px] text-white">
        {title}
      </h3>
      <p className="mt-2 font-space-grotesk text-[12px] font-normal leading-[16px] text-white/50">
        {description}
      </p>
    </motion.li>
  );
}

export default function EnquiryToExportSection({
  image,
  imageAlt = "",
  eyebrow = "R&D Product Development",
  titleWhite = "FROM ENQUIRY",
  titleRed = "TO EXPORT.",
  description = "A clear production route keeps the project moving from the first conversation through approval, manufacturing, QC and export.",
  steps = DEFAULT_STEPS,
}: EnquiryToExportSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a]">
      <img
        src={image}
        alt={imageAlt}
        aria-hidden={!imageAlt}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.92) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-16 pt-14 sm:px-8 lg:px-[44px] lg:pb-32 lg:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between"
        >
          <div>
            <div className="mb-4 flex items-center gap-4">
              <span className="font-space-grotesk text-[12px] uppercase tracking-[0.08em] text-white/70">
                {eyebrow}
              </span>
              <span aria-hidden className="h-px w-[52px] bg-[#E63946]" />
            </div>

            <h2 className="font-space-grotesk text-[36px] font-bold uppercase leading-[1.1] sm:text-[48px] lg:text-[64px] lg:leading-[68px]">
              <span className="block text-white">{titleWhite}</span>
              <span className="block text-[#E63946]">{titleRed}</span>
            </h2>
          </div>

          <p className="max-w-[420px] border-l border-white/25 pl-4 font-space-grotesk text-[14px] font-normal leading-[1.5] text-white/80 sm:text-[16px] lg:mt-4">
            {description}
          </p>
        </motion.div>

        <ol className="mx-auto mt-14 grid w-full max-w-[1246px] grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:mt-[100px] lg:grid-cols-7">
          {steps.map((step, i) => (
            <TimelineStep
              key={step.number}
              index={i}
              isFirst={i === 0}
              isLast={i === steps.length - 1}
              {...step}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}