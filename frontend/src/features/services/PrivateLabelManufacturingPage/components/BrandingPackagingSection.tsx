import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";
import { branddetails, brandimage } from "@/assets";

/* -------------------------------------------------------------------------- */
/*  Types — API-ready                                                         */
/* -------------------------------------------------------------------------- */

export interface BrandingCard {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
}

export interface BrandingPackagingSectionProps {
  eyebrow?: string;
  title?: string;
  titleLine2?: string;
  highlight?: string;
  afterHighlight?: string;
  description?: string;
  heroImage?: string;
  heroImageAlt?: string;
  heroWatermark?: string;
  heroCaption?: string;
  cards?: BrandingCard[];
}

/* -------------------------------------------------------------------------- */
/*  Default content                                                           */
/* -------------------------------------------------------------------------- */

const DEFAULT_CARDS: BrandingCard[] = [
  {
    id: "custom-labels",
    title: "Custom Labels",
    image: brandimage,
    imageAlt: "Custom woven brand label detail",
  },
  {
    id: "hang-tags",
    title: "Hang Tags",
    image: "",
    imageAlt: "Custom branded hang tag",
  },
  {
    id: "custom-bags",
    title: "Custom Bags",
    image: "",
    imageAlt: "Custom branded poly bag",
  },
  {
    id: "custom-boxes",
    title: "Custom Boxes",
    image: "",
    imageAlt: "Custom branded box and insert",
  },
];

/* -------------------------------------------------------------------------- */
/*  Small card (right-hand 2x2 grid)                                         */
/* -------------------------------------------------------------------------- */

function BrandingCardItem({ card, index }: { card: BrandingCard; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, borderColor: "rgba(229, 27, 36, 0.4)" }}
      className="group relative flex aspect-[264/168] w-full flex-col justify-end overflow-hidden rounded-[8px] border border-white/10 bg-[#111111] transition-colors duration-300"
    >
      {card.image ? (
        <img
          src={card.image}
          alt={card.imageAlt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-500 ease-out group-hover:scale-105"
        />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center font-space-grotesk text-[11px] font-semibold uppercase tracking-wide text-[#E51B24]/60">
          {card.title}
        </span>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" />

      <span className="relative z-10 p-4 font-space-grotesk text-[13px] font-medium text-white">
        {card.title}
      </span>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function BrandingPackagingSection({
  eyebrow = "Branding & Packaging",
  title = "EVERY DETAIL CARRIES",
  titleLine2,
  highlight = "YOUR",
  afterHighlight = " BRAND.",
  description = "Turn the unboxing experience into part of your identity with coordinated labels, packaging and inserts.",
  heroImage = branddetails,
  heroImageAlt = "Custom branded red BJJ gi with embroidered logo",
  heroWatermark = "BRAND EXPERIENCE",
  heroCaption = "Make the product feel like yours.",
  cards = DEFAULT_CARDS,
}: BrandingPackagingSectionProps) {
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
          {/* LEFT — hero image with overlay text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[344/354] w-full overflow-hidden rounded-[10px] border border-white/10 lg:aspect-auto"
          >
            <img
              src={heroImage}
              alt={heroImageAlt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/45 via-40% to-black/10" />

            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-5 sm:p-6">
              <span className="font-space-grotesk text-[10px] font-semibold uppercase tracking-[0.15em] text-[#E51B24]">
                {heroWatermark}
              </span>
              <h3 className="max-w-[220px] font-space-grotesk text-[20px] font-bold leading-[1.2] text-white sm:text-[22px]">
                {heroCaption}
              </h3>
            </div>
          </motion.div>

          {/* RIGHT — 2x2 grid of small cards */}
          <div className="grid grid-cols-2 gap-4 self-start">
            {cards.map((card, i) => (
              <BrandingCardItem key={card.id} card={card} index={i} />
            ))}
          </div>
        </div>
      </div>
    </SectionGlow>
  );
}