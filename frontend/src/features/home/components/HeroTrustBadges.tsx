import type { Variants } from "framer-motion";
import { Factory, Globe, Ruler, TrendingUp, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  heroTrustBlocks,
  type TrustBlock,
  type TrustIconKey,
} from "@/features/home/data/heroTrustContent";

const ICONS: Record<TrustIconKey, LucideIcon> = {
  factory: Factory,
  development: Ruler,
  production: TrendingUp,
  delivery: Globe,
};

type HeroTrustBadgesProps = {
  blocks?: TrustBlock[];
};

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* Card rises in, then its children stagger in */
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: EASE,
      staggerChildren: 0.12,
      delayChildren: 0.25,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

/* One soft red sweep across the card, then it fades out completely */
const sweepVariants: Variants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: {
    x: "400%", // sweep width is 1/3 of the card, so 400% fully exits the card
    opacity: [0, 1, 1, 0],
    transition: {
      duration: 1.6,
      delay: 0.7,
      ease: "easeInOut",
      opacity: { duration: 1.6, delay: 0.7, times: [0, 0.2, 0.8, 1] },
    },
  },
};

export default function HeroTrustBadges({
  blocks = heroTrustBlocks,
}: HeroTrustBadgesProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-label="Why brands work with ROKAI"
      // Mobile/tablet: small overlap. Desktop: hero is 910px, card 162px tall,
      // -167px puts it at top 743 / bottom 905 exactly like Figma.
      className="relative z-10 -mt-10 px-5 sm:px-8 lg:-mt-[167px] lg:px-0"
    >
      <motion.ul
        variants={cardVariants}
        initial={reduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="relative mx-auto grid w-full max-w-[1306px] grid-cols-1 overflow-hidden rounded-[14px] bg-white shadow-[inset_-3px_2px_8px_1px_#6901064F] sm:grid-cols-2 lg:h-[162px] lg:grid-cols-4"
      >
        {/* light sweep */}
        {!reduceMotion && (
          <motion.span
            aria-hidden
            variants={sweepVariants}
            className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1/3"
            style={{
              background:
                "linear-gradient(100deg, transparent 0%, rgba(229,27,36,0.12) 50%, transparent 100%)",
            }}
          />
        )}

        {blocks.map((block, index) => {
          const Icon = ICONS[block.icon];

          return (
            <motion.li
              key={block.title}
              variants={itemVariants}
              className={[
                "group relative flex min-w-0 cursor-pointer items-center gap-4 px-6 py-7 lg:px-10 lg:py-0",
                index > 0 ? "border-t border-[#EBEBEB]" : "",
                index % 2 === 1 ? "sm:border-l" : "",
                index === 1 ? "sm:border-t-0" : "",
                "lg:border-0",
              ].join(" ")}
            >
              {/* desktop divider (inset, not full height) */}
              {index > 0 && (
                <span
                  aria-hidden
                  className="absolute left-0 top-1/2 hidden h-[80px] w-px -translate-y-1/2 bg-[#E3E3E3] lg:block"
                />
              )}

              {/* red accent bar that wipes in on hover */}
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-[#E51B24] transition-transform duration-500 ease-out group-hover:scale-x-100"
              />

              <motion.span
                className="flex h-10 w-10 shrink-0 items-center justify-center"
                whileHover={reduceMotion ? undefined : { scale: 1.14, rotate: 6 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <Icon
                  className="h-8 w-8 text-[#E51B24] transition-colors duration-300 group-hover:text-[#C9141D]"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </motion.span>

              <div className="min-w-0 flex-1">
                <p className="font-space-grotesk text-[13px] font-bold uppercase leading-tight tracking-wide text-[#1A1A1A] transition-transform duration-300 group-hover:translate-x-1">
                  {block.title}
                </p>
                <p className="mt-1.5 font-space-grotesk text-[12px] font-normal leading-[16px] text-[#6B6B6B] transition-transform duration-300 group-hover:translate-x-1">
                  {block.description}
                </p>
              </div>
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
}