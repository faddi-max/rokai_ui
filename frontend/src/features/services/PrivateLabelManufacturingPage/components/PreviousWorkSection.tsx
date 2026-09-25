import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";
import { brand1, brand2, brand3, brand4, brandhero } from "@/assets";

/* -------------------------------------------------------------------------- */
/*  Types — API-ready                                                         */
/* -------------------------------------------------------------------------- */

export interface PortfolioItem {
  id: string;
  tag: string;
  title: string;
  image: string;
  imageAlt: string;
}

export interface PreviousWorkSectionProps {
  eyebrow?: string;
  title?: string;
  titleLine2?: string;
  highlight?: string;
  afterHighlight?: string;
  description?: string;
  featured?: PortfolioItem;
  items?: PortfolioItem[];
}

/* -------------------------------------------------------------------------- */
/*  Default content                                                           */
/* -------------------------------------------------------------------------- */

const DEFAULT_FEATURED: PortfolioItem = {
  id: "custom-bjj-collection",
  tag: "PRIVATE LABEL",
  title: "Custom BJJ Collection",
  image: brandhero,
  imageAlt: "Custom white BJJ gi with belt detail",
};

const DEFAULT_ITEMS: PortfolioItem[] = [
  {
    id: "competition-range",
    tag: "",
    title: "Competition Range",
    image: brand1,
    imageAlt: "Competition-ready gi fabric detail",
  },
  {
    id: "performance-set",
    tag: "ADIDI",
    title: "Performance Set",
    image: brand2,
    imageAlt: "Athletes running silhouette at dusk",
  },
  {
    id: "academy-collection",
    tag: "TEAMWEAR",
    title: "Academy Collection",
    image: brand3,
    imageAlt: "Athlete lifting weights in training gear",
  },
  {
    id: "custom-sublimation",
    tag: "RASH GUARD",
    title: "Custom Sublimation",
    image: brand4,
    imageAlt: "Athlete training at sunset in sublimated apparel",
  },
];

/* -------------------------------------------------------------------------- */
/*  Small card (2x2 grid)                                                     */
/* -------------------------------------------------------------------------- */

function PortfolioCard({ item, index }: { item: PortfolioItem; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative aspect-[352/172] w-full overflow-hidden rounded-[8px] border border-white/10"
    >
      <img
        src={item.image}
        alt={item.imageAlt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/35 via-50% to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4">
        {item.tag && (
          <span className="font-space-grotesk text-[9px] font-semibold uppercase tracking-[0.15em] text-[#E51B24]">
            {item.tag}
          </span>
        )}
        <span className="font-space-grotesk text-[14px] font-bold text-white">
          {item.title}
        </span>
      </div>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function PreviousWorkSection({
  eyebrow = "Previous Work",
  title = "MADE FOR REAL",
  titleLine2,
  highlight = "BRANDS",
  afterHighlight = "",
  description = "Replace these visual placeholders with Rokai's actual manufacturing portfolio and case studies.",
  featured = DEFAULT_FEATURED,
  items = DEFAULT_ITEMS,
}: PreviousWorkSectionProps) {
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
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.05fr]">
          {/* LEFT — featured hero image */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="group relative aspect-[344/354] w-full overflow-hidden rounded-[10px] border border-white/10 lg:aspect-auto"
          >
            <img
              src={featured.image}
              alt={featured.imageAlt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/45 via-40% to-black/10" />

            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-5 sm:p-6">
              {featured.tag && (
                <span className="font-space-grotesk text-[10px] font-semibold uppercase tracking-[0.15em] text-[#E51B24]">
                  {featured.tag}
                </span>
              )}
              <h3 className="font-space-grotesk text-[20px] font-bold text-white sm:text-[22px]">
                {featured.title}
              </h3>
            </div>
          </motion.article>

          {/* RIGHT — 2x2 grid */}
          <div className="grid grid-cols-2 gap-4 self-start">
            {items.map((item, i) => (
              <PortfolioCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </SectionGlow>
  );
}