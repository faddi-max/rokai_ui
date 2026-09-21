import { Check } from "lucide-react";
import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import SectionTitle from "./SectionTitle";

/* -------------------------------------------------------------------------- */
/*  Types — API-ready                                                         */
/* -------------------------------------------------------------------------- */

export type CriteriaVariant = "qualify" | "disqualify";

export interface CriteriaColumnData {
  title: string;
  subtitle: string;
  variant: CriteriaVariant;
  items: string[];
}

export interface WhoIsForSectionProps {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  note?: string;
  columns?: CriteriaColumnData[];
}

/* -------------------------------------------------------------------------- */
/*  Default content                                                           */
/* -------------------------------------------------------------------------- */

const DEFAULTS: Required<WhoIsForSectionProps> = {
  eyebrow: "Built around real alignment",
  title: "WHO THIS",
  highlight: "PROGRAM IS FOR.",
  note: "This is not for every club and that’s intentional.",
  columns: [
    {
      title: "YOU QUALIFY IF:",
      subtitle: "Alignment with the program",
      variant: "qualify",
      items: [
        "Active in BJJ competition or training seriously",
        "Representing your academy with discipline and consistency",
        "Active on social media (even small but real presence)",
        "Respected in your gym or local community",
      ],
    },
    {
      title: "THIS IS NOT FOR:",
      subtitle: "Misalignment with the program",
      variant: "disqualify",
      items: [
        "Casual practitioners",
        "Fake or inactive profiles",
        "People looking only for free gear",
        "Anyone not serious about BJJ growth",
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Reusable pieces                                                           */
/* -------------------------------------------------------------------------- */

function CriteriaMarker({ variant }: { variant: CriteriaVariant }) {
  if (variant === "qualify") {
    return <Check aria-hidden size={12} strokeWidth={2.5} className="shrink-0 text-[#2FB574]" />;
  }
  return (
    <span aria-hidden className="mx-[4px] size-[4px] shrink-0 rounded-full bg-[#E63946]" />
  );
}

function CriteriaColumn({ title, subtitle, variant, items }: CriteriaColumnData) {
  return (
    <div className="flex flex-col p-6 sm:p-10">
      <h3 className="font-space-grotesk text-[20px] font-bold uppercase leading-[24px] text-[#cfcfcf]">
        {title}
      </h3>
      <p className="mt-[26px] font-space-grotesk text-[10px] font-normal leading-[14px] text-[#6b6b6b]">
        {subtitle}
      </p>

      <ul className="mt-[24px] flex flex-col">
        {items.map((item) => (
          <li
            key={item}
            className="flex min-h-[42px] items-center gap-[14px] border-b border-[#262626] py-2 font-space-grotesk text-[13px] font-normal leading-[18px] text-[#d0d0d0]"
          >
            <CriteriaMarker variant={variant} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function WhoIsForSection(props: WhoIsForSectionProps) {
  const c = { ...DEFAULTS, ...props };

  return (
    <SectionGlow className="relative overflow-hidden">
      {/* Red glow rising from the bottom edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px] bg-[radial-gradient(ellipse_60%_100%_at_50%_100%,rgba(230,57,70,0.22),transparent_70%)]"
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
          <SectionTitle eyebrow={c.eyebrow} title={c.title} highlight={c.highlight} lineColor="#E63946" />

          <div className="flex min-h-[52px] items-center border-l border-[#a11212] pl-4 lg:mt-[68px] lg:self-start">
            <p className="font-space-grotesk text-[15px] font-normal leading-[22px] text-[#bdbdbd]">
              {c.note}
            </p>
          </div>
        </div>

        {/* Criteria panel */}
        <div className="mx-auto mt-10 grid max-w-[1180px] grid-cols-1 overflow-hidden rounded-[6px] bg-[#101010] lg:mt-[41px] lg:grid-cols-2">
          {c.columns.map((col, i) => (
            <div
              key={col.title}
              className={i > 0 ? "border-t border-[#1c1c1c] lg:border-l lg:border-t-0" : ""}
            >
              <CriteriaColumn {...col} />
            </div>
          ))}
        </div>
      </motion.div>
    </SectionGlow>
  );
}