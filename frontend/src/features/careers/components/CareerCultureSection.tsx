import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";
import { collaboration, craft, growth, respect } from "@/assets";

/* -------------------------------------------------------------------------- */
/*  Types — API-ready                                                         */
/* -------------------------------------------------------------------------- */

export interface CultureCardData {
  id: string;
  /** Leave empty for the grey placeholder tile (card 05 in the design). */
  image?: string;
  imageAlt: string;
  /** Small red eyebrow, e.g. "01 / COLLABORATION". */
  label: string;
  title: string;
  /** Tailwind grid placement + size classes. */
  className?: string;
  /** Large variant: bigger title. */
  featured?: boolean;
}

export interface CareerCultureSectionProps {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  description?: string;
  cards?: CultureCardData[];
}

/* -------------------------------------------------------------------------- */
/*  Default content                                                           */
/*  Figma: big card 534 x 472, small cards 320.27 x 226, gap 18 / 20         */
/* -------------------------------------------------------------------------- */

const SMALL = "min-h-[226px] lg:min-h-0";

const DEFAULT_CARDS: CultureCardData[] = [
  {
    id: "collaboration",
    image: collaboration,
    imageAlt: "Team member working at a computer",
    label: "01 / COLLABORATION",
    title: "Better work happens together.",
    featured: true,
    className: "min-h-[320px] sm:col-span-2 lg:col-span-1 lg:row-span-2 lg:min-h-0",
  },
  {
    id: "growth",
    image: growth,
    imageAlt: "Sparks flying during metalwork",
    label: "02 / GROWTH",
    title: "Build your next chapter.",
    className: SMALL,
  },
  {
    id: "craft",
    image: craft,
    imageAlt: "Team members working together on a construction site",
    label: "03 / CRAFT",
    title: "Take pride in the details.",
    className: SMALL,
  },
  {
    id: "respect",
    image: respect,
    imageAlt: "Cordless drill on a workbench",
    label: "04 / RESPECT",
    title: "People come first.",
    className: SMALL,
  },
  {
    id: "impact",
      image: growth,
    imageAlt: "",
    label: "05 / IMPACT",
    title: "Build for communities.",
    className: SMALL,
  },
];

/* -------------------------------------------------------------------------- */
/*  Card                                                                      */
/* -------------------------------------------------------------------------- */

function CultureCard({ card, index }: { card: CultureCardData; index: number }) {
  return (
    <motion.article
      tabIndex={0}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative isolate overflow-hidden rounded-[10px] border border-white/10 bg-[#2b2b2b] outline-none focus-visible:ring-2 focus-visible:ring-[#E63946] ${
        card.className ?? ""
      }`}
    >
      {/* Image */}
      {card.image && (
        <img
          src={card.image}
          alt={card.imageAlt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus-visible:scale-105"
        />
      )}

      {/* Base overlay (always on): light dim + dark bottom fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10"
      />

      {/* Hover overlay: deeper dark + faint red wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/55 to-[#E63946]/15 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100"
      />

      {/* Caption: hidden until hover (always visible on touch devices) */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-[22px] pb-[20px]">
        <div className="translate-y-3 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
          <p className="font-space-grotesk text-[9px] font-normal uppercase leading-[100%] tracking-[1.08px] text-[#E63946]">
            {card.label}
          </p>
          <h3
            className={`mt-[6px] font-space-grotesk font-bold text-white ${
              card.featured
                ? "text-[20px] leading-[26px]"
                : "text-[16px] leading-[22px]"
            }`}
          >
            {card.title}
          </h3>
        </div>
      </div>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function CareerCultureSection({
  eyebrow = "Inside ROKAI",
  title = "HOW WE",
  highlight = "WORK.",
  description = "A collaborative, team-first environment where craftsmanship, accountability, respect, and continuous growth are part of the work.",
  cards = DEFAULT_CARDS,
}: CareerCultureSectionProps) {
  return (
    <SectionGlow className="relative overflow-hidden">
      <SectionHeaderblog
        bare
        eyebrow={eyebrow}
        title={title}
        highlight={highlight}
        highlightGradient="linear-gradient(90deg, #E51B24 0%, #690106 100%)"
        accentColor="#E51B24"
        description={description}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1250px] px-5 pb-16 sm:px-8 lg:px-[20px] lg:pb-24">
        <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2 lg:grid-cols-[534fr_320fr_320fr] lg:grid-rows-[226px_226px] lg:gap-x-[18px] lg:gap-y-[20px]">
          {cards.map((card, i) => (
            <CultureCard key={card.id} card={card} index={i} />
          ))}
        </div>
      </div>
    </SectionGlow>
  );
}