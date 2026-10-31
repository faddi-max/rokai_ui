import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";

/* -------------------------------------------------------------------------- */
/*  Types — API-ready                                                         */
/* -------------------------------------------------------------------------- */

export interface EstimatorStep {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface CostEstimatorBannerProps {
  /** Banner photo (the ROKAI athlete shot). */
  image: string;
  imageAlt?: string;
  steps?: EstimatorStep[];
}

/* -------------------------------------------------------------------------- */
/*  Default content                                                           */
/* -------------------------------------------------------------------------- */

const DEFAULT_STEPS: EstimatorStep[] = [
  {
    id: "configure",
    number: "01",
    title: "Configure",
    description:
      "Choose your garment, quantity, materials, branding requirements and delivery preferences.",
  },
  {
    id: "review",
    number: "02",
    title: "Review your estimate",
    description:
      "See unit economics, estimated landed cost and suggested wholesale and retail scenarios.",
  },
  {
    id: "quote",
    number: "03",
    title: "Request an exact quote",
    description:
      "Share your product brief with ROKAI so the team can review your requirements and confirm pricing.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Pieces                                                                    */
/* -------------------------------------------------------------------------- */

function StepCard({ step, index }: { step: EstimatorStep; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="flex min-h-[101px] w-full flex-col justify-center gap-2 rounded-[10px] p-[18px] lg:h-[101.33px]"
      style={{
        background: "linear-gradient(93.07deg, #E63946 2.55%, #690106 128.56%)",
      }}
    >
      <h3 className="font-space-grotesk text-[13px] font-bold leading-[18px] text-white sm:text-[14px]">
        {step.number} / {step.title}
      </h3>
      <p className="max-w-[320px] font-space-grotesk text-[11px] font-normal leading-[16px] text-white/85 sm:text-[12px]">
        {step.description}
      </p>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function CostEstimatorBanner({
  image,
  imageAlt = "ROKAI athlete in black and red fightwear",
  steps = DEFAULT_STEPS,
}: CostEstimatorBannerProps) {
  return (
    <SectionGlow className="relative overflow-hidden bg-[#111111]">
      {/* Soft red haze across the top, matching the design's maroon wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(230,57,70,0.16),transparent_72%)]"
      />

      <div
        className={`relative z-10 mx-auto w-full max-w-[1180px] px-5 pt-8 sm:px-8 lg:px-[30px] lg:pt-10 ${
          steps.length > 0 ? "pb-16 lg:pb-24" : "pb-2 lg:pb-4"
        }`}
      >
        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[16/7] w-full overflow-hidden rounded-[10px] border border-white/10 bg-[#0d0d0d] sm:aspect-[594/125]"
        >
          <img
            src={image}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover object-[70%_30%]"
          />

          {/* Left-to-right darkening + edge vignette */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(17,17,17,0.72) 0%, rgba(17,17,17,0.35) 40%, rgba(17,17,17,0) 65%), linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.35) 100%)",
            }}
          />
        </motion.div>

        {/* Steps (pass steps={[]} to show the banner on its own) */}
        {steps.length > 0 && (
          <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-5 sm:grid-cols-3 sm:gap-3 lg:gap-4">
            {steps.map((step, i) => (
              <StepCard key={step.id} step={step} index={i} />
            ))}
          </div>
        )}
      </div>
    </SectionGlow>
  );
}