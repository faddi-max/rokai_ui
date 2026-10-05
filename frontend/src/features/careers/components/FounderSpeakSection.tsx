import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import { founderImage } from "@/assets";

/* -------------------------------------------------------------------------- */
/*  Types — API-ready                                                         */
/* -------------------------------------------------------------------------- */

export interface FounderSpeakSectionProps {
  eyebrow?: string;
  /** White statement (63 / 76, bold). */
  headingWhite?: string;
  /** Gradient statement (56 / 60, medium). */
  headingHighlight?: string;
  quote?: string;
  attribution?: string;
  image?: string;
  imageAlt?: string;
  imageLabelLeft?: string;
  imageLabelRight?: string;
}

const HIGHLIGHT_GRADIENT = "linear-gradient(90deg, #E63946 0%, #690106 100%)";

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function FounderSpeakSection({
  eyebrow = "Founder’s Speak",
  headingWhite = "We don’t just build structures. We",
  headingHighlight = "build relationships.",
  quote = "At Brikly, every project is a personal investment that represents who we are as a team. We care deeply about our clients, our people, and the communities we serve. Our goal isn't just to complete jobs. it's to exceed expectations, earn trust, and leave a lasting impact.",
  attribution = "Founder - Brikly",
  image = founderImage,
  imageAlt = "Brikly founder portrait",
  imageLabelLeft = "Founder",
  imageLabelRight = "Brikly",
}: FounderSpeakSectionProps) {
  return (
    <SectionGlow className="relative overflow-hidden">
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8 lg:px-[104px] lg:py-[58px]">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[510px_minmax(0,1fr)] lg:gap-[72px]">
          {/* LEFT — portrait card (510 x 614) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto aspect-[510/614] w-full max-w-[510px] overflow-hidden rounded-[10px] border border-white/20 bg-[#0000005E] lg:mx-0"
          >
            <motion.img
              initial={{ scale: 1.06 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              src={image}
              alt={imageAlt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Overlay: keeps the bottom caption legible */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent"
            />

            {/* Caption bar */}
            <div className="absolute inset-x-6 bottom-4 flex items-center justify-between border-t border-white/25 pt-3">
              <span className="font-space-grotesk text-[9px] font-medium uppercase leading-none tracking-[0.12em] text-white">
                {imageLabelLeft}
              </span>
              <span className="font-space-grotesk text-[9px] font-medium uppercase leading-none tracking-[0.12em] text-[#E63946]">
                {imageLabelRight}
              </span>
            </div>
          </motion.div>

          {/* RIGHT — statement */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={contentVariants}
            className="flex min-w-0 flex-col lg:max-w-[650px]"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <span className="font-space-grotesk text-[12px] font-normal uppercase leading-none tracking-[0.04em] text-white/80">
                {eyebrow}
              </span>
              <span aria-hidden className="h-px w-[52px] bg-white/30" />
            </motion.div>

            <h2 className="mt-5 w-full font-space-grotesk uppercase lg:w-[559px]">
              <motion.span variants={itemVariants} className="block text-[34px] font-bold leading-[42px] text-white sm:text-[48px] sm:leading-[58px] lg:h-[228px] lg:text-[63px] lg:leading-[76px]">
                {headingWhite}
              </motion.span>
              <motion.span
                variants={itemVariants}
                className="block w-full bg-clip-text text-[30px] font-medium leading-[36px] text-transparent sm:text-[42px] sm:leading-[48px] lg:h-[120px] lg:text-[56px] lg:leading-[60px]"
                style={{ backgroundImage: HIGHLIGHT_GRADIENT }}
              >
                {headingHighlight}
              </motion.span>
            </h2>

            <motion.div variants={itemVariants} className="mt-7 w-full border-l-2 border-[#E63946] pl-[15px] lg:w-[559px]">
              <p className="font-space-grotesk text-[14px] font-normal leading-[21px] text-white/85 sm:text-[15px] sm:leading-[22px]">
                “{quote}”
              </p>
            </motion.div>
            <motion.p variants={itemVariants} className="mt-[10px] font-space-grotesk text-[17px] font-bold leading-[30px] text-white">
              {attribution}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </SectionGlow>
  );
}
