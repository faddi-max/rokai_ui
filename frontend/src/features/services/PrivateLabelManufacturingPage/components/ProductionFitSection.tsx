import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";

/* -------------------------------------------------------------------------- */
/*  Types — API-ready                                                         */
/* -------------------------------------------------------------------------- */

export interface ProductionTier {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  items: string[];
}

export interface ProductionFitSectionProps {
  eyebrow?: string;
  title?: string;
  titleLine2?: string;
  highlight?: string;
  afterHighlight?: string;
  description?: string;
  tiers?: ProductionTier[];
}

/* -------------------------------------------------------------------------- */
/*  Default content                                                           */
/* -------------------------------------------------------------------------- */

const DEFAULT_TIERS: ProductionTier[] = [
  {
    id: "start-small",
    number: "01",
    label: "Start Small",
    title: "START SMALL.",
    description: "For new brands validating a collection before scaling.",
    items: ["Sampling & development", "Flexible production options", "Custom branding"],
  },
  {
    id: "growing-brand",
    number: "02",
    label: "Growing Brand",
    title: "SCALE UP.",
    description: "For brands building repeat collections and expanding their range.",
    items: ["Bulk production", "Collection development", "Consistent specifications"],
  },
  {
    id: "established-brand",
    number: "03",
    label: "Established Brand",
    title: "GO BIGGER.",
    description: "For established brands requiring larger production capacity.",
    items: ["Large-scale manufacturing", "Multi-product collections", "Global fulfillment support"],
  },
];

/* -------------------------------------------------------------------------- */
/*  Card                                                                      */
/* -------------------------------------------------------------------------- */

function ProductionTierCard({ tier, index }: { tier: ProductionTier; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -5,
        borderColor: "rgba(229, 27, 36, 0.5)",
        boxShadow: "0px 10px 26px 4px rgba(229, 27, 36, 0.24)",
      }}
      className="flex h-full w-full flex-col rounded-[10px] border border-[#E51B24]/25 bg-[#111111] px-6 py-6 transition-all duration-300 sm:px-7 sm:py-7"
    >
      {/* Number + label */}
      <div className="flex items-center gap-2.5">
        <span className="font-space-grotesk text-[13px] font-bold leading-none text-[#E51B24]">
          {tier.number}
        </span>
        <span aria-hidden className="h-px w-5 bg-[#E51B24]/50" />
        <span className="font-space-grotesk text-[12px] font-medium text-white/50">
          {tier.label}
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-4 font-space-grotesk text-[22px] font-bold uppercase leading-[1.15] text-white sm:text-[24px]">
        {tier.title}
      </h3>

      {/* Description */}
      <p className="mt-3 font-space-grotesk text-[13px] font-light leading-[1.5] text-white/55">
        {tier.description}
      </p>

      {/* Item list */}
      <ul className="mt-6 flex flex-col">
        {tier.items.map((item) => (
          <li
            key={item}
            className="border-t border-white/10 py-3 font-space-grotesk text-[13px] font-light text-white/70 first:border-t-0"
          >
            {item}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function ProductionFitSection({
  eyebrow = "MOQ & Capacity",
  title = "PRODUCTION THAT FITS",
  titleLine2,
  highlight = "OUR",
  afterHighlight = " STAGE.",
  description = "Use actual Rokai MOQ figures here when confirmed. The structure below keeps the information easy to scan.",
  tiers = DEFAULT_TIERS,
}: ProductionFitSectionProps) {
  return (
    <SectionGlow className="relative overflow-hidden">
      <SectionHeaderblog
        bare
        eyebrow={eyebrow}
        title={title}
        titleLine2={titleLine2}
        highlight={highlight}
        afterHighlight={afterHighlight}
        highlightPosition="start"
        accentColor="#E51B24"
        description={description}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1178px] px-5 pb-16 sm:px-8 lg:px-[30px]">
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <ProductionTierCard key={tier.id} tier={tier} index={i} />
          ))}
        </div>
      </div>
    </SectionGlow>
  );
}