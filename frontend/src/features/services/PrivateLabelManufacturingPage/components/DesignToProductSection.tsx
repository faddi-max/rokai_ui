import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";
import { manufactureProduct, servicemanufacturehero } from "@/assets";

/* -------------------------------------------------------------------------- */
/*  Types — API-ready                                                         */
/* -------------------------------------------------------------------------- */

export interface DesignToProductCard {
  id: string;
  badge: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface DesignToProductSectionProps {
  eyebrow?: string;
  title?: string;
  titleLine2?: string;
  highlight?: string;
  afterHighlight?: string;
  description?: string;
  cards?: DesignToProductCard[];
}

/* -------------------------------------------------------------------------- */
/*  Default content                                                           */
/* -------------------------------------------------------------------------- */

const DEFAULT_CARDS: DesignToProductCard[] = [
  {
    id: "brand-concept",
    badge: "01 / DESIGN",
    title: "Brand Concept",
    description: "Your artwork, product references and specifications become the starting point.",
    image: manufactureProduct,
    imageAlt: "Designer reviewing product concept and prototype",
  },
  {
    id: "production-ready",
    badge: "02 / PRODUCT",
    title: "Production Ready",
    description: "Approved construction, branding and finishing become a finished product.",
    image: servicemanufacturehero,
    imageAlt: "Athlete wearing finished production-ready gi at sunset",
  },
];

/* -------------------------------------------------------------------------- */
/*  Card                                                                      */
/* -------------------------------------------------------------------------- */

function TransformCard({ card, index }: { card: DesignToProductCard; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group relative aspect-[309/258] w-full overflow-hidden rounded-[10px] border border-white/10"
    >
      <img
        src={card.image}
        alt={card.imageAlt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/55 via-45% to-black/10" />

      {/* Badge */}
      <span className="absolute left-4 top-4 rounded-[4px] bg-[#111111] px-2.5 py-1 font-space-grotesk text-[10px] font-semibold uppercase tracking-wide text-white/85 backdrop-blur-sm">
        {card.badge}
      </span>

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-5 sm:p-6">
        <h3 className="font-space-grotesk text-[19px] font-bold leading-tight text-[#E51B24] sm:text-[21px]">
          {card.title}
        </h3>
        <p className=" font-space-grotesk text-[13px] font-light leading-snug text-[#9B9B9B]">
          {card.description}
        </p>
      </div>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function DesignToProductSection({
  eyebrow = "Development",
  title = "FROM DESIGN FILE TO",
  titleLine2,
  highlight = "FINISHED",
  afterHighlight = " PRODUCT.",
  description = "Make the transformation tangible show how an idea becomes a physical product ready for your customers.",
  cards = DEFAULT_CARDS,
}: DesignToProductSectionProps) {
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
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
          {cards.map((card, i) => (
            <TransformCard key={card.id} card={card} index={i} />
          ))}
        </div>
      </div>
    </SectionGlow>
  );
}