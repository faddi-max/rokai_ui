import { motion } from "framer-motion";
import { Globe2, Lock, PenTool, Shield, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import SectionTitle from "@/features/programs/ambassador-program/components/SectionTitle";

/* -------------------------------------------------------------------------- */
/*  Types — API-ready                                                         */
/* -------------------------------------------------------------------------- */

export interface StandardItem {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface EliteStandardsSectionProps {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  items?: StandardItem[];
}

/* -------------------------------------------------------------------------- */
/*  Default content                                                           */
/*  NOTE: "Club Trusted" intentionally has no academy count — add one only    */
/*  once the content team supplies a verified figure.                         */
/* -------------------------------------------------------------------------- */

const DEFAULT_ITEMS: StandardItem[] = [
  {
    id: "bjj-durability",
    icon: Shield,
    title: "BJJ Durability",
    description: "GSM-tested fabric for the toughest rolls.",
  },
  {
    id: "global-reach",
    icon: Globe2,
    title: "Global Reach",
    description: "Fast worldwide shipping with live tracking.",
  },
  {
    id: "club-trusted",
    icon: Star,
    title: "Club Trusted",
    description: "Official supplier to BJJ academies worldwide.",
  },
  {
    id: "custom-edge",
    icon: PenTool,
    title: "Custom Edge",
    description: "Free design mockups for team orders.",
  },
  {
    id: "secure-pay",
    icon: Lock,
    title: "Secure Pay",
    description: "SSL-encrypted Visa & PayPal checkout.",
  },
];

const HEADING_GRADIENT = "linear-gradient(90deg, #E63946 0%, #690106 100%)";

const HEADING_CLASS =
  "font-space-grotesk font-bold uppercase tracking-normal text-[32px] leading-[38px] sm:text-[44px] sm:leading-[50px] lg:text-[48px] lg:leading-[54px]";

/* -------------------------------------------------------------------------- */
/*  Card                                                                      */
/* -------------------------------------------------------------------------- */

function StandardCard({ item, index }: { item: StandardItem; index: number }) {
  const Icon = item.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, borderColor: "rgba(229, 27, 36, 0.5)" }}
      className="flex min-h-[154px] w-full flex-col rounded-[4px] border border-white/10 bg-[#111111] p-5 shadow-[0px_0px_9.37px_4.02px_#E51B2447] transition-colors duration-300 sm:w-[calc(50%-10px)] lg:w-[284px]"
    >
      <span className="flex size-8 items-center justify-center rounded-[4px] bg-[#E51B24]/15 text-[#E51B24]">
        <Icon size={14} strokeWidth={2.2} aria-hidden />
      </span>

      <h3 className="mt-6 font-space-grotesk text-[14px] font-bold uppercase leading-[18px] tracking-[0.02em] text-white">
        {item.title}
      </h3>

      <p className="mt-2 max-w-[220px] font-space-grotesk text-[12px] font-normal leading-[18px] text-white/55">
        {item.description}
      </p>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function EliteStandardsSection({
  eyebrow = "Reliability & Performance",
  title = "ELITE STANDARDS.",
  highlight = "BUILT FOR WARRIORS.",
  items = DEFAULT_ITEMS,
}: EliteStandardsSectionProps) {
  return (
    <SectionGlow className="relative overflow-hidden">
      {/* Red haze behind the heading */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(230,57,70,0.16),transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-[1360px] px-5 pb-16 pt-14 sm:px-8 lg:pb-20 lg:pt-16">
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

        <div className="mx-auto mt-12 flex max-w-[920px] flex-wrap justify-center gap-5 lg:mt-16">
          {items.map((item, i) => (
            <StandardCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </SectionGlow>
  );
}
