import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import { work1, work2, work3, work4, work5, work6 } from "@/assets";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import SectionTitle from "@/features/programs/ambassador-program/components/SectionTitle";

/* -------------------------------------------------------------------------- */
/*  Types — API-ready                                                         */
/* -------------------------------------------------------------------------- */

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
  image?: string;
  /**
   * Desktop only. Fixed width (px) for the description of steps whose text sits
   * on the LEFT of the timeline and wraps to two lines (design-specific).
   */
  descWidth?: number;
};

export interface HowWeWorkSectionProps {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  intro?: string;
  steps?: ProcessStep[];
}

/* -------------------------------------------------------------------------- */
/*  Default content                                                           */
/* -------------------------------------------------------------------------- */

const DEFAULT_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Requirements",
    description: "Share your product, quantity, fit and branding needs.",
    image: work6,
  },
  {
    step: "02",
    title: "Design & Sample",
    description: "Fabric, fit, pattern and branding are developed into your sample.",
    image: work5,
  },
  {
    step: "03",
    title: "Approval",
    description: "Review the sample, fit and branding before bulk production begins.",
    image: work4,
    descWidth: 419,
  },
  {
    step: "04",
    title: "Production",
    description: "Approved designs move into controlled manufacturing at scale.",
    image: work3,
  },
  {
    step: "05",
    title: "Quality Control",
    description: "Fit, construction, finish and branding are inspected before dispatch.",
    image: work2,
    descWidth: 450,
  },
  {
    step: "06",
    title: "Global Delivery",
    description: "Finished orders are securely packed and shipped worldwide.",
    image: work1,
  },
];

const DEFAULT_INTRO =
  "A controlled six-step process that takes your custom gear from initial requirements to finished production and worldwide delivery.";

const HEADING_GRADIENT = "linear-gradient(90deg, #E51B24 0%, #690106 100%)";

const HEADING_CLASS =
  "font-space-grotesk font-medium uppercase tracking-normal text-[34px] leading-[40px] sm:text-[46px] sm:leading-[54px] lg:text-[56px] lg:leading-[71px]";

/* -------------------------------------------------------------------------- */
/*  Reusable pieces                                                           */
/* -------------------------------------------------------------------------- */

function ProcessImage({ image, title, step }: Pick<ProcessStep, "image" | "title" | "step">) {
  return (
    <div className="relative aspect-[395/202] w-full overflow-hidden rounded-[6px] bg-white/5">
      <span className="absolute left-3 top-3 z-10 flex h-6 w-7 items-center justify-center bg-[#E51B24] font-space-grotesk text-[11px] font-bold leading-none text-white lg:left-4 lg:top-4">
        {step}
      </span>
      {image ? (
        <img src={image} alt={title} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white/[0.06] to-white/[0.02]">
          <ImageIcon className="h-8 w-8 text-white/15" strokeWidth={1.5} />
        </div>
      )}
    </div>
  );
}

/** Small red node sitting on the centre line. */
function TimelineMarker() {
  return (
    <span
      aria-hidden
      className="absolute left-4 top-1/2 z-10 flex size-[14px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#E51B24] bg-[#1a0b0d] lg:left-1/2"
    >
      <span className="size-[4px] rounded-full bg-[#E51B24]" />
    </span>
  );
}

/** Short red rule between the marker and the step title (desktop only). */
function TimelineConnector({ textOnLeft }: { textOnLeft: boolean }) {
  return (
    <span
      aria-hidden
      className={`absolute top-1/2 hidden h-px w-[39px] bg-[#E51B24]/60 lg:left-1/2 lg:block ${
        textOnLeft ? "-ml-[79px]" : "ml-[40px]"
      }`}
    />
  );
}

function StepText({
  step,
  title,
  description,
  descWidth,
  textOnLeft,
}: ProcessStep & { textOnLeft: boolean }) {
  return (
    <div
      className={`lg:absolute lg:inset-x-0 lg:top-1/2 lg:-mt-[36px] ${
        textOnLeft ? "lg:pr-[86px] lg:text-right" : "lg:pl-[86px]"
      }`}
    >
      <span className="block font-space-grotesk text-[11px] font-bold uppercase leading-[14px] tracking-[0.05em] text-[#E51B24]">
        Step {step}
      </span>
      <h3 className="mt-[7px] font-space-grotesk text-[19px] font-bold uppercase leading-[26px] text-white sm:text-[22px]">
        {title}
      </h3>
      <p
        style={textOnLeft && descWidth ? { width: descWidth } : undefined}
        className={`mt-2 max-w-full font-space-grotesk text-[14px] font-light leading-[22px] text-white/45 sm:text-[16px] sm:leading-[27px] ${
          textOnLeft && descWidth ? "lg:ml-auto lg:text-left" : ""
        }`}
      >
        {description}
      </p>
    </div>
  );
}

function ProcessStepRow(props: ProcessStep & { textOnLeft: boolean }) {
  const { textOnLeft, image, title, step } = props;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative grid grid-cols-1 items-center gap-5 pl-12 lg:grid-cols-2 lg:gap-0 lg:pl-0"
    >
      <TimelineMarker />
      <TimelineConnector textOnLeft={textOnLeft} />

      {/* Text column */}
      <div className={`order-2 lg:relative ${textOnLeft ? "lg:order-1" : "lg:order-2"}`}>
        <StepText {...props} />
      </div>

      {/* Image column */}
      <div
        className={
          textOnLeft
            ? "order-1 lg:order-2 lg:pl-[41px]"
            : "order-1 lg:order-1 lg:flex lg:justify-end lg:pr-[41px]"
        }
      >
        <div className="w-full lg:max-w-[395px]">
          <ProcessImage image={image} title={title} step={step} />
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function HowWeWorkSection({
  eyebrow = "How We Work",
  title = "FROM CONCEPT TO",
  highlight = "GLOBAL DELIVERY",
  intro = DEFAULT_INTRO,
  steps = DEFAULT_STEPS,
}: HowWeWorkSectionProps) {
  return (
    <SectionGlow className="relative w-full overflow-hidden">
      {/* Red haze at the top and a faint one at the bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(230,57,70,0.18),transparent_72%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[260px] bg-[radial-gradient(ellipse_50%_100%_at_50%_100%,rgba(230,57,70,0.10),transparent_72%)]"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-5 pb-16 pt-16 sm:px-8 md:px-10 lg:px-[49px] lg:pb-[77px] lg:pt-[86px]">
        {/* Header */}
        <div className="flex flex-col gap-6 lg:-mr-2 lg:flex-row lg:items-start lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <SectionTitle
              eyebrow={eyebrow}
              title={title}
              highlight={highlight}
              highlightGradient={HEADING_GRADIENT}
              headingClassName={HEADING_CLASS}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
            className="border-l-2 border-[#E51B24] py-[14px] pl-[15px] lg:mt-[56px] lg:w-[456px] lg:shrink-0"
          >
            <p className="font-space-grotesk text-[14px] font-light leading-[22px] text-white/60 sm:text-[16px] sm:leading-[25px]">
              {intro}
            </p>
          </motion.div>
        </div>

        {/*
          Timeline. On desktop the centre line sits at x = 677 in the 1440 frame
          (not 720), so the wrapper is shifted/widened to reproduce that.
          Remove `lg:-ml-[49px] lg:w-[calc(100%+12px)]` to centre it instead.
        */}
        <div className="relative mt-14 sm:mt-16 lg:-ml-[49px] lg:mt-[72px] lg:w-[calc(100%+12px)]">
          <span
            aria-hidden
            className="absolute bottom-0 left-4 top-0 w-px bg-white/10 lg:bottom-[60px] lg:left-1/2 lg:top-[52px] lg:-translate-x-1/2"
          />

          <div className="flex flex-col gap-10 sm:gap-12 lg:gap-[72px]">
            {steps.map((item, index) => (
              <ProcessStepRow key={item.step} {...item} textOnLeft={index % 2 === 0} />
            ))}
          </div>
        </div>
      </div>
    </SectionGlow>
  );
}