import { Check, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";

/* -------------------------------------------------------------------------- */
/*  Types — API-ready                                                         */
/* -------------------------------------------------------------------------- */

export interface ResourceCategory {
  id: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
}

/* -------------------------------------------------------------------------- */
/*  Default content                                                           */
/* -------------------------------------------------------------------------- */

const DEFAULT_DESCRIPTION = "Technical guides and resources.";

const resourceCategories: ResourceCategory[] = [
  {
    id: "bjj-gear-guides",
    title: "BJJ Gear Guides",
    description: DEFAULT_DESCRIPTION,
    ctaText: "Access Hub",
    ctaHref: "/resources/bjj-gear-guides",
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    description: DEFAULT_DESCRIPTION,
    ctaText: "Access Hub",
    ctaHref: "/resources/manufacturing",
  },
  {
    id: "materials-fabrics",
    title: "Materials & Fabrics",
    description: DEFAULT_DESCRIPTION,
    ctaText: "Access Hub",
    ctaHref: "/resources/materials-fabrics",
  },
  {
    id: "sizing-fit",
    title: "Sizing & Fit",
    description: DEFAULT_DESCRIPTION,
    ctaText: "Access Hub",
    ctaHref: "/resources/sizing-fit",
  },
  {
    id: "care-maintenance",
    title: "Care & Maintenance",
    description: DEFAULT_DESCRIPTION,
    ctaText: "Access Hub",
    ctaHref: "/resources/care-maintenance",
  },
  {
    id: "interactive-tools",
    title: "Interactive Tools",
    description: DEFAULT_DESCRIPTION,
    ctaText: "Access Hub",
    ctaHref: "/resources/interactive-tools",
  },
  {
    id: "business-templates",
    title: "Business Templates",
    description: DEFAULT_DESCRIPTION,
    ctaText: "Access Hub",
    ctaHref: "/resources/business-templates",
  },
  {
    id: "research-reports",
    title: "Research & Reports",
    description: DEFAULT_DESCRIPTION,
    ctaText: "Access Hub",
    ctaHref: "/resources/research-reports",
  },
];

export interface ResourceCategoriesSectionProps {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  description?: string;
  categories?: ResourceCategory[];
}

/* -------------------------------------------------------------------------- */
/*  Reusable card                                                             */
/* -------------------------------------------------------------------------- */

function ResourceCard({
  title,
  description,
  ctaText,
  ctaHref,
  index,
}: ResourceCategory & { index: number }) {
  return (
    <motion.a
      href={ctaHref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -6,
        borderColor: "rgba(229, 27, 36, 0.5)",
        boxShadow: "0px 12px 26px 5px rgba(229, 27, 36, 0.32)",
      }}
      className="group flex h-[264px] w-full max-w-[275px] flex-col rounded-[8.03px] border border-[#E51B24]/15 bg-[#111111] px-7 py-7 shadow-[0px_0px_9.37px_4.02px_#E51B2447] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E51B24]"
    >
      <span className="flex size-[38px] shrink-0 items-center justify-center rounded-full bg-[#E639461F] text-[#E63946] transition-colors duration-300 group-hover:bg-[#E63946] group-hover:text-white">
        <Check size={16} strokeWidth={3} aria-hidden />
      </span>

      <h3 className="mt-6 font-space-grotesk text-[20px] font-medium uppercase leading-[25px] tracking-[0%] text-white transition-colors duration-300 group-hover:text-[#E51B24]">
        {title}
      </h3>

      <p className="mt-2 font-space-grotesk text-[15px] font-normal leading-[100%] tracking-[0%] text-[#C0C0C0]">
        {description}
      </p>

      <div className="mt-auto pt-[25px]">
        <span className="inline-flex h-[37px] w-[139px] items-center justify-center gap-[10px] rounded-[6px] bg-[#E63946] px-[13px] py-[4px] font-space-grotesk text-[13px] font-medium leading-none text-white transition-colors duration-300 group-hover:bg-[#c9161e]">
          {ctaText}
          <ArrowUpRight
            size={14}
            className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </span>
      </div>
    </motion.a>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function ResourceCategoriesSection({
  eyebrow = "Start by topic",
  title = "EVERYTHING YOU NEED,",
  highlight = "ORGANIZED.",
  description = "Choose a category to quickly reach the right guide, tool or professional resource.",
  categories = resourceCategories,
}: ResourceCategoriesSectionProps) {
  return (
    <SectionGlow className="relative py-10 overflow-hidden">
      {/* --- Header --- */}
      <SectionHeaderblog
        bare
        eyebrow={eyebrow}
        title={title}
        highlight={highlight}
        accentColor="#E51B24"
        description={description}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1250px] px-5 pb-16 sm:px-8 lg:px-[30px]">
        <div className="grid w-full grid-cols-1 place-items-center gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((item, i) => (
            <ResourceCard key={item.id} index={i} {...item} />
          ))}
        </div>
      </div>
    </SectionGlow>
  );
}