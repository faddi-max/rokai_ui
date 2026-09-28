import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";
import { aboutpartner } from "@/assets";

/* -------------------------------------------------------------------------- */
/*  Types — API-ready                                                         */
/* -------------------------------------------------------------------------- */

export interface BuyerType {
  id: string;
  number: string;
  title: string;
  image: string;
  imageAlt: string;
  watermark: string;
  caption: string;
}

export interface DifferentBuyersSectionProps {
  eyebrow?: string;
  title?: string;
  titleLine2?: string;
  highlight?: string;
  afterHighlight?: string;
  description?: string;
  buyers?: BuyerType[];
  footerNote?: string;
}

/* -------------------------------------------------------------------------- */
/*  Default content                                                           */
/* -------------------------------------------------------------------------- */

const DEFAULT_BUYERS: BuyerType[] = [
  {
    id: "combat-brands",
    number: "01",
    title: "Combat Brands",
    image: aboutpartner,
    imageAlt: "Athletes running at dusk",
    watermark: "ROKAI / COMBAT BRANDS",
    caption: "Built around your brand.",
  },
  {
    id: "academies-clubs",
    number: "02",
    title: "Academies & Clubs",
    image: aboutpartner,
    imageAlt: "Academy athletes training",
    watermark: "ROKAI / ACADEMIES & CLUBS",
    caption: "Built around your academy.",
  },
  {
    id: "teams",
    number: "03",
    title: "Teams",
    image: aboutpartner,
    imageAlt: "Team in matching apparel",
    watermark: "ROKAI / TEAMS",
    caption: "Built around your team.",
  },
  {
    id: "retailers",
    number: "04",
    title: "Retailers",
    image: aboutpartner,
    imageAlt: "Retail apparel range",
    watermark: "ROKAI / RETAILERS",
    caption: "Built around your shelves.",
  },
  {
    id: "distributors",
    number: "05",
    title: "Distributors",
    image: aboutpartner,
    imageAlt: "Distribution and logistics",
    watermark: "ROKAI / DISTRIBUTORS",
    caption: "Built around your network.",
  },
  {
    id: "events",
    number: "06",
    title: "Events",
    image: aboutpartner,
    imageAlt: "Combat sports event apparel",
    watermark: "ROKAI / EVENTS",
    caption: "Built around your event.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function DifferentBuyersSection({
  eyebrow = "Who Is Build For",
  title = "DIFFERENT BUYERS.",
  titleLine2,
  highlight = "ONE PARTNER.",
  afterHighlight = "",
  description = "Different buyers have different requirements. Our manufacturing model supports multiple partner types across the combat sports ecosystem.",
  buyers = DEFAULT_BUYERS,
  footerNote = "ONE MANUFACTURING PARTNER. MULTIPLE PATHS TO PRODUCTION.",
}: DifferentBuyersSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = buyers[activeIndex];

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

      <div className="relative z-10 mx-auto w-full max-w-[1178px] px-5 pb-10 sm:px-8 lg:px-[30px]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[558px_1fr] lg:gap-10">
          {/* LEFT — list */}
          <ul className="flex w-full flex-col border-t border-[#FFFFFF1C]">
            {buyers.map((buyer, i) => {
              const isActive = i === activeIndex;
              return (
                <li key={buyer.id} className="border-b border-[#FFFFFF1C]">
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(i)}
                    onFocus={() => setActiveIndex(i)}
                    onClick={() => setActiveIndex(i)}
                    className="group flex h-[82px] w-full items-center gap-6 text-left"
                  >
                    <span
                      className={`w-6 shrink-0 font-space-grotesk text-[9px] font-medium transition-colors duration-300 ${
                        isActive ? "text-[#E63946]" : "text-white/30"
                      }`}
                    >
                      {buyer.number}
                    </span>

                    <span
                      className={`flex-1 font-space-grotesk text-[26px] font-light leading-none transition-all duration-300 ${
                        isActive
                          ? "translate-x-1 text-[#E63946]"
                          : "text-white/45 group-hover:text-white/70"
                      }`}
                    >
                      {buyer.title}
                    </span>

                    <ArrowUpRight
                      size={12}
                      className={`shrink-0 transition-all duration-300 ${
                        isActive
                          ? "text-[#E63946] opacity-100"
                          : "text-white/30 opacity-60"
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* RIGHT — image */}
          <div className="relative aspect-[615/498] w-full overflow-hidden rounded-[8px] border border-white/10 bg-[#0d0d0d]">
            <AnimatePresence mode="wait">
              <motion.img
                key={active.id}
                src={active.image}
                alt={active.imageAlt}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>

            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(230,57,70,0.04) 0%, rgba(230,57,70,0) 45%), linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.65) 100%)",
              }}
            />

            <div className="absolute bottom-5 left-5 flex flex-col gap-1.5">
              <span className="font-space-grotesk text-[8px] font-semibold uppercase tracking-[0.15em] text-[#E63946]">
                {active.watermark}
              </span>
              <span className="font-space-grotesk text-[17px] font-bold text-white sm:text-[18px]">
                {active.caption}
              </span>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-10 border-t border-[#FFFFFF1C] pt-4">
          <span className="font-space-grotesk text-[8px] font-medium uppercase tracking-[0.12em] text-white/40">
            {footerNote}
          </span>
        </div>
      </div>
    </SectionGlow>
  );
}