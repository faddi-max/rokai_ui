import { Factory, Globe, Ruler, TrendingUp, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
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

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function HeroTrustBadges({
  blocks = heroTrustBlocks,
}: HeroTrustBadgesProps) {
  return (
    <section
      aria-label="Why brands work with ROKAI"
      className="relative z-10 -mt-10 px-5 sm:-mt-12 sm:px-8 lg:-mt-16 lg:px-0"
    >
      <motion.ul
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="mx-auto grid w-full max-w-[1140px] grid-cols-1 rounded-2xl bg-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.25)] sm:grid-cols-2 lg:grid-cols-4"
      >
        {blocks.map((block, index) => {
          const Icon = ICONS[block.icon];

          return (
            <motion.li
              key={block.title}
              variants={itemVariants}
              whileHover={{
                y: -6,
                scale: 1.02,
                transition: {
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
              className={[
                "group relative flex min-w-0 items-start gap-3 px-6 py-7",
                "cursor-pointer",
                "transition-shadow duration-300",
                "hover:z-10 hover:shadow-[0_15px_35px_-12px_rgba(0,0,0,0.2)]",
                index > 0 ? "border-t border-[#EBEBEB]" : "",
                index % 2 === 1 ? "sm:border-l" : "",
                index === 1 ? "sm:border-t-0" : "",
                index >= 2 ? "sm:border-t" : "",
                "lg:border-t-0",
                index > 0 ? "lg:border-l" : "",
              ].join(" ")}
            >
              <motion.span
                className="flex h-11 w-11 shrink-0 items-center justify-center"
                whileHover={{
                  scale: 1.12,
                  rotate: 5,
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Icon
                  className="h-9 w-9 text-[#E51B24] transition-colors duration-300 group-hover:text-[#C9141D]"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </motion.span>

              <div className="min-w-0 flex-1 pt-0.5">
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