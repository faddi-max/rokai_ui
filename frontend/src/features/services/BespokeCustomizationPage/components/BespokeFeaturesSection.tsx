import { motion } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  Types — API-ready                                                         */
/* -------------------------------------------------------------------------- */

export interface BespokeFeatureData {
  number: string;
  title: string;
  description: string;
}

export interface BespokeFeaturesSectionProps {
  features?: BespokeFeatureData[];
}

/* -------------------------------------------------------------------------- */
/*  Default content                                                           */
/* -------------------------------------------------------------------------- */

const DEFAULT_FEATURES: BespokeFeatureData[] = [
  {
    number: "01",
    title: "Built to order",
    description:
      "Choose your silhouette, branding, graphics, labels and finishing details.",
  },
  {
    number: "01",
    title: "Production focused",
    description:
      "Materials and construction are considered around real training and competition use.",
  },
  {
    number: "01",
    title: "More than a logo",
    description:
      "Turn every garment, patch and package into a consistent brand experience.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Column                                                                    */
/* -------------------------------------------------------------------------- */

function FeatureColumn({
  number,
  title,
  description,
  index,
}: BespokeFeatureData & { index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col px-0 py-8 lg:px-8 lg:pb-11 lg:pt-9 ${
        index > 0 ? "border-t border-white/10 lg:border-l lg:border-t-0" : ""
      } ${index === 0 ? "lg:pl-0" : ""}`}
    >
      <span className="font-space-grotesk text-[12px] font-normal leading-none text-[#E63946]">
        {number}
      </span>

      <h3 className="mt-10 font-space-grotesk text-[19px] font-bold leading-[26px] text-white lg:mt-14 lg:text-[20px]">
        {title}
      </h3>

      <p className="mt-3 max-w-[280px] font-space-grotesk text-[14px] font-normal leading-[21px] text-white/60">
        {description}
      </p>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function BespokeFeaturesSection({
  features = DEFAULT_FEATURES,
}: BespokeFeaturesSectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#0d0808]">
      {/* Dark maroon wash + red glow rising from the bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0a0a0a 0%, #120a0a 55%, #1f0f11 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(ellipse_60%_100%_at_50%_100%,rgba(229,27,36,0.16),transparent_72%)]"
      />

      {/* py here keeps the vertical dividers inset from the section edges */}
      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-5 py-8 sm:px-8 lg:px-[30px] lg:py-11">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {features.map((feature, i) => (
            <FeatureColumn key={feature.title} index={i} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}