import { motion } from "framer-motion";
import {
  galleryItems,
  keyFeatures,
  type GalleryItem,
  type KeyFeature,
} from "../data/productGallery.data";

const CARD_BG = "linear-gradient(93.58deg, #0E0E0E 6.47%, rgba(230, 57, 70, 0) 283.99%)";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
};

/* -------------------------------------------------------------------------- */
/*  Shared header                                                             */
/* -------------------------------------------------------------------------- */

function CardHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <span className="font-space-grotesk text-[9px] font-medium uppercase tracking-[0.15em] text-[#E63946]">
        {eyebrow}
      </span>
      <h2 className="mt-2 font-space-grotesk text-[24px] font-bold leading-[1.15] text-white sm:text-[28px]">
        {title}
      </h2>
      <p className="mt-3 max-w-[560px] font-space-grotesk text-[11px] font-normal leading-[17px] text-white/50 sm:text-[12px]">
        {description}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Gallery                                                                   */
/* -------------------------------------------------------------------------- */

function GalleryTile({ item, index }: { item: GalleryItem; index: number }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col overflow-hidden rounded-[6px] border border-white/10 bg-[#0B0B0B] transition-colors duration-300 hover:border-[#E63946]/50"
    >
      <div className="aspect-[100/112] w-full overflow-hidden bg-black">
        <img
          src={item.image}
          alt={item.imageAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <figcaption className="flex h-[28px] items-center justify-center border-t border-white/10 px-1 text-center font-space-grotesk text-[8px] font-bold leading-none text-white sm:text-[9px]">
        {item.label}
      </figcaption>
    </motion.figure>
  );
}

function ProductGallery() {
  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[12px] border border-white/10 p-5 sm:p-6"
      style={{ background: CARD_BG }}
    >
      <CardHeading
        eyebrow="Explore the range"
        title="Combat apparel product gallery"
        description="Visual references for popular product categories you can use when planning your collection."
      />

      <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-7">
        {galleryItems.map((item, i) => (
          <GalleryTile key={item.id} item={item} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Key features                                                              */
/* -------------------------------------------------------------------------- */

function FeatureCard({ feature, index }: { feature: KeyFeature; index: number }) {
  const Icon = feature.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3, borderColor: "rgba(230, 57, 70, 0.4)" }}
      className="flex min-h-[76px] items-center gap-3.5 rounded-[6px] border border-white/10 bg-black/30 px-4 py-4"
    >
      <span className="flex size-[28px] shrink-0 items-center justify-center rounded-full border border-[#E63946]/30 bg-[#E63946]/15 text-[#E63946]">
        <Icon size={12} strokeWidth={2.4} aria-hidden />
      </span>

      <div className="min-w-0">
        <h3 className="font-space-grotesk text-[11px] font-bold leading-[14px] text-white sm:text-[12px]">
          {feature.title}
        </h3>
        <p className="mt-1 max-w-[190px] font-space-grotesk text-[9px] font-normal leading-[13px] text-white/50 sm:text-[10px] sm:leading-[14px]">
          {feature.description}
        </p>
      </div>
    </motion.article>
  );
}

function KeyFeatures() {
  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[12px] border border-white/10 p-5 sm:p-6"
      style={{ background: CARD_BG }}
    >
      <CardHeading
        eyebrow="Understand the tool"
        title="Key features"
        description="Everything you need to build an early picture of your combat apparel production economics — from product specification to landed-cost planning."
      />

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {keyFeatures.map((feature, i) => (
          <FeatureCard key={feature.id} feature={feature} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function CostEstimatorOverview() {
  return (
    <section className="relative w-full bg-transparent">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-5 px-5 pb-14 pt-2 sm:px-8 lg:gap-6 lg:pb-20">
        <ProductGallery />
        <KeyFeatures />
      </div>
    </section>
  );
}