import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import SectionTitle from "../../ambassador-program/components/SectionTitle";


/* -------------------------------------------------------------------------- */
/*  Types — API-ready                                                         */
/* -------------------------------------------------------------------------- */

export interface UnlockItemData {
  number: string;
  label: string;
  heading: string;
  description: string;
  value: string;
}

export interface WhatYourClubUnlocksSectionProps {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  note?: string;
  items?: UnlockItemData[];
}

/* -------------------------------------------------------------------------- */
/*  Default content                                                           */
/* -------------------------------------------------------------------------- */

const DEFAULT_DESCRIPTION =
  "Fully branded, premium-quality gear tailored to your academy and athletes.";

const DEFAULTS: Required<WhatYourClubUnlocksSectionProps> = {
  eyebrow: "What your club unlocks",
  title: "A COMPLETE SYSTEM.",
  highlight: "BUILT TO GENERATE VALUE.",
  note: "Every component supports one goal: turning your academy's apparel into a professional, repeatable revenue channel.",
  items: [
    {
      number: "01",
      label: "BRAND",
      heading: "CUSTOM APPAREL LINE",
      description: DEFAULT_DESCRIPTION,
      value: "$1,500",
    },
    {
      number: "01",
      label: "BRAND",
      heading: "CUSTOM APPAREL LINE",
      description: DEFAULT_DESCRIPTION,
      value: "$1,500",
    },
    {
      number: "01",
      label: "BRAND",
      heading: "CUSTOM APPAREL LINE",
      description: DEFAULT_DESCRIPTION,
      value: "$1,800",
    },
    {
      number: "01",
      label: "BRAND",
      heading: "CUSTOM APPAREL LINE",
      description: DEFAULT_DESCRIPTION,
      value: "$1,500",
    },
    {
      number: "01",
      label: "BRAND",
      heading: "CUSTOM APPAREL LINE",
      description: DEFAULT_DESCRIPTION,
      value: "$1,500",
    },
    {
      number: "01",
      label: "BRAND",
      heading: "CUSTOM APPAREL LINE",
      description: DEFAULT_DESCRIPTION,
      value: "$1,500",
    },
    {
      number: "01",
      label: "BRAND",
      heading: "CUSTOM APPAREL LINE",
      description: DEFAULT_DESCRIPTION,
      value: "$1,500",
    },
    {
      number: "01",
      label: "BRAND",
      heading: "CUSTOM APPAREL LINE",
      description: DEFAULT_DESCRIPTION,
      value: "$1,500",
    },
    {
      number: "01",
      label: "BRAND",
      heading: "CUSTOM APPAREL LINE",
      description: DEFAULT_DESCRIPTION,
      value: "$1,500",
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Reusable pieces                                                           */
/* -------------------------------------------------------------------------- */

function UnlockCard({
  number,
  label,
  heading,
  description,
  value,
  index,
}: UnlockItemData & { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -4, scale: 1.015 }}
      transition={{
        duration: 0.5,
        delay: (index % 3) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
     
      style={{
        maxWidth: 360.1611022949219,
        background: "#111111",
        boxShadow: "0px 0px 9.37px 4.02px #E51B2447",
      }}
    >
      <div className="flex min-h-0 w-full flex-1 flex-col gap-[28px] lg:min-h-[200px] lg:px-[34px] lg:py-[27px]">
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-[8px]">
            <span className="font-space-grotesk text-[14px] font-bold leading-none text-[#8a8a8a]">
              {number}
            </span>
            <span aria-hidden className="h-px w-[18px] bg-[#E63946]" />
            <span className="font-space-grotesk text-[15px] font-bold uppercase leading-none tracking-wide text-[#8a8a8a]">
              {label}
            </span>
          </div>

          <h3 className="font-space-grotesk text-[16px] font-bold uppercase leading-[22px] text-white sm:text-[17px]">
            {heading}
          </h3>

          <p className="font-space-grotesk text-[12px] font-normal leading-[18px] text-[#8a8a8a]">
            {description}
          </p>
        </div>

        <p className="mt-auto border-t border-white/10 pt-[26px] text-center font-space-grotesk text-[12px] leading-[16px] text-[#E63946]">
          Valued at {value}
        </p>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function WhatYourClubUnlocksSection(
  props: WhatYourClubUnlocksSectionProps
) {
  const c = { ...DEFAULTS, ...props };

  return (
    <SectionGlow className="relative overflow-hidden">
      {/* Red glow rising from the bottom edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px] bg-[radial-gradient(ellipse_60%_100%_at_50%_100%,rgba(230,57,70,0.18),transparent_70%)]"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-[1440px] px-5 pb-20 pt-14 sm:px-8 md:px-10 lg:px-[49px] lg:pb-[100px] lg:pt-[56px]"
      >
        {/* Header row */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:pr-[31px]">
          <SectionTitle
            eyebrow={c.eyebrow}
            title={c.title}
            highlight={c.highlight}
            lineColor="#E63946"
          />

          <div className="flex min-h-[52px] items-center border-l border-[#a11212] pl-4 lg:mt-[68px] lg:max-w-[300px] lg:self-start">
            <p className="font-space-grotesk text-[15px] font-normal leading-[22px] text-[#bdbdbd]">
              {c.note}
            </p>
          </div>
        </div>

        {/* Unlock grid */}
        <div className="mx-auto mt-10 grid max-w-[1180px] grid-cols-1 gap-[12px] sm:grid-cols-2 sm:gap-[14px] lg:mt-[41px] lg:grid-cols-3 lg:gap-[16px]">
          {c.items.map((item, i) => (
            <UnlockCard key={`${item.heading}-${i}`} {...item} index={i} />
          ))}
        </div>
      </motion.div>
    </SectionGlow>
  );
}