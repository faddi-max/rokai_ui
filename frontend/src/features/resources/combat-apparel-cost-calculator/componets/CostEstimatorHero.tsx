import type { Variants } from "framer-motion";
import { motion } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  Types — API-ready                                                         */
/* -------------------------------------------------------------------------- */

export interface CostEstimatorTag {
  label: string;
  /** Highlighted pill: red dot + red border/text (first tag in the design). */
  active?: boolean;
}

export interface CostEstimatorHeroProps {
  eyebrow?: string;
  titleWhite?: string;
  titleRed?: string;
  description?: string;
  tags?: CostEstimatorTag[];
}

/* -------------------------------------------------------------------------- */
/*  Default content                                                           */
/* -------------------------------------------------------------------------- */

const DEFAULT_TAGS: CostEstimatorTag[] = [
  { label: "Cost estimation system", active: true },
  { label: "Preliminary planning estimate" },
  { label: "Live configuration" },
];

/* -------------------------------------------------------------------------- */
/*  Motion variants                                                           */
/* -------------------------------------------------------------------------- */

const EASE = [0.22, 1, 0.36, 1] as const;

/** Outer card: fade + subtle scale up */
const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.75, ease: EASE },
  },
};

/** Stagger wrapper for text children */
const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.3 },
  },
};

/** Each text child: fade + rise */
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

/** Tag pills: fade + slight scale from small */
const tagItem: Variants = {
  hidden: { opacity: 0, scale: 0.88, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, delay: 0.65 + i * 0.09, ease: EASE },
  }),
};

/** Rotated diamond: spin in from corner */
const diamondVariants: Variants = {
  hidden: { opacity: 0, rotate: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    rotate: 45,
    scale: 1,
    transition: { duration: 1.1, delay: 0.2, ease: EASE },
  },
};

/** Bottom accent line: draw in from left */
const accentVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0, originX: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.9, delay: 0.5, ease: EASE },
  },
};

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/*  Figma card: 1323 x 477.27, radius 7, border 1, padding 64                 */
/* -------------------------------------------------------------------------- */

export default function CostEstimatorHero({
  eyebrow = "Business Intelligence",
  titleWhite = "Build Your Gear.",
  titleRed = "Understand Your Costs.",
  description = "Configure your combat apparel requirements and explore estimated production, landed, wholesale, and retail costs before moving forward with ROKAI.",
  tags = DEFAULT_TAGS,
}: CostEstimatorHeroProps) {
  return (
    <section className="relative px-5 py-6 sm:px-8 lg:py-10">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="relative mx-auto flex w-full max-w-[1323px] flex-col justify-center overflow-hidden rounded-[7px] border border-[#2a2425] border-t-[#482126] p-6 sm:p-10 lg:min-h-[477.27px] lg:p-16"
        style={{
          background:
            "linear-gradient(110deg, rgba(49, 9, 14, 0.9) 8.49%, #101010 62.45%)",
        }}
      >
        {/* Rotated diamond — top-right corner */}
        <motion.div
          aria-hidden
          variants={diamondVariants}
          initial="hidden"
          animate="visible"
          className="pointer-events-none absolute hidden size-[342px] border border-[#61262D] lg:block"
          style={{
            right: -171,
            top: -171,
            boxShadow:
              "0px 0px 0px 58px #FF303803, 0px 0px 0px 28px #FF303805",
          }}
        />

        {/* Bottom-left progress accent — draws in from left */}
        <motion.span
          aria-hidden
          variants={accentVariants}
          initial="hidden"
          animate="visible"
          className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-[154px]"
          style={{
            background:
              "linear-gradient(90deg, #E63946 0%, rgba(230,57,70,0.2) 100%)",
          }}
        />

        {/* Text content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex max-w-[920px] flex-col"
        >
          <motion.span
            variants={item}
            className="font-space-grotesk text-[11px] font-bold uppercase leading-[18px] tracking-[0.2em] text-[#E63946] sm:text-[12px]"
          >
            {eyebrow}
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-[22px] font-space-grotesk text-[40px] font-bold leading-[46px] tracking-[-0.01em] sm:text-[54px] sm:leading-[60px] lg:text-[70px] lg:leading-[76px]"
          >
            <span className="block text-white">{titleWhite}</span>
            <span className="block text-[#E63946]">{titleRed}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-[780px] font-space-grotesk text-[15px] font-normal leading-[24px] text-white/70 sm:mt-8 lg:text-[17px] lg:leading-[30px]"
          >
            {description}
          </motion.p>

          <ul className="mt-7 flex flex-wrap gap-3">
            {tags.map((tag, i) => (
              <motion.li
                key={tag.label}
                custom={i}
                variants={tagItem}
                initial="hidden"
                animate="visible"
                className={`flex h-[38px] items-center gap-2 rounded-[3px] border px-4 font-space-grotesk text-[10px] font-medium uppercase tracking-[0.1em] lg:text-[11px] ${
                  tag.active
                    ? "border-[#61262D] bg-[#E63946]/10 text-[#E63946]"
                    : "border-white/10 text-white/55"
                }`}
              >
                {tag.active && (
                  <motion.span
                    aria-hidden
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="size-[6px] shrink-0 rounded-full bg-[#E63946]"
                  />
                )}
                {tag.label}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}
