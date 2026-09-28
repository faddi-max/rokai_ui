import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";

export interface RokaiDifferenceSectionProps {
  image: string;
  imageAlt?: string;
  eyebrow?: string;
  titleBefore?: string;
  titleHighlight?: string;
  titleAfter?: string;
  description?: string;
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};

export default function RokaiDifferenceSection({
  image,
  imageAlt = "ROKAI product development workspace showing gi, rashguard, shorts and branding designs",
  eyebrow = "The ROKAI difference",
  titleBefore = "We sell ",
  titleHighlight = "manufacturing",
  titleAfter = ", not just products.",
  description = "From custom manufacturing and OEM to private label and product development, ROKAI is structured around helping partners move from an idea or specification to a production-ready product.",
}: RokaiDifferenceSectionProps) {
  return (
    <SectionGlow className="relative overflow-hidden">
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-16 px-5 py-14 sm:px-8 lg:px-[37px] lg:py-20">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6"
        >
          <div className="flex items-center gap-4">
            <span className="font-space-grotesk text-xs uppercase tracking-widest text-white/70">
              {eyebrow}
            </span>
            <span aria-hidden className="h-px w-10 bg-[#E63946]" />
          </div>

          <h2 className="max-w-[1180px] font-space-grotesk text-[32px] font-bold uppercase leading-[1.1] text-white sm:text-[44px] lg:text-[56px] lg:leading-[60px]">
            {titleBefore}
            <span className="text-[#E63946]">{titleHighlight}</span>
            {titleAfter}
          </h2>

          <p className="max-w-[890px] font-space-grotesk text-[14px] font-normal leading-[1.5] text-white/70 sm:text-[16px]">
            {description}
          </p>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto aspect-[1258/593] w-full max-w-[1258px] overflow-hidden rounded-[14px] bg-[#00000057]"
        >
          <img src={image} alt={imageAlt} loading="lazy" className="h-full w-full object-cover" />
        </motion.div>
      </div>
    </SectionGlow>
  );
}