import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import AnimatedArrow from "@/shared/components/ui/AnimatedArrow";

/* -------------------------------------------------------------------------- */
/*  Types — API-ready                                                         */
/* -------------------------------------------------------------------------- */

export interface StartProjectCtaSectionProps {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  watermark?: string;
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function StartProjectCtaSection({
  eyebrow = "Start a Project",
  title = "TELL US WHAT YOU WANT",
  highlight = "MADE.",
  description = "Have a product idea, specification or existing range? Start the conversation with ROKAI and map the right manufacturing route.",
  ctaLabel = "Request a quote",
  ctaHref = "/contact",
  watermark = "ROKAI",
}: StartProjectCtaSectionProps) {
  return (
    <div className="relative bg-black overflow-hidden">
      {/* Red haze, right side */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-[60%] bg-[radial-gradient(ellipse_70%_80%_at_85%_80%,rgba(229,27,36,0.16),transparent_70%)]"
      />

      {/* Watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-6 right-0 select-none whitespace-nowrap font-space-grotesk text-[140px] font-bold uppercase leading-none tracking-[-0.04em] text-white/[0.05] sm:text-[190px] lg:text-[230px]"
      >
        {watermark}
      </span>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-5 flex flex-col py-14 sm:py-16 lg:mx-25 lg:py-[72px]"
      >
        <div className="flex items-center gap-6">
          <span className="font-space-grotesk text-xs uppercase tracking-widest text-white/70">
            {eyebrow}
          </span>
          <span className="h-px w-10 bg-[#E51B24]" />
        </div>

        <h2 className="mt-3 max-w-[620px] font-space-grotesk text-3xl font-bold uppercase leading-[1.1] md:text-4xl lg:text-5xl">
          <span className="block text-white">{title}</span>
          <span className="block text-[#E51B24]">{highlight}</span>
        </h2>

        <p className="mt-8 max-w-[520px] font-space-grotesk text-[14px] font-light leading-[22px] text-white/70">
          {description}
        </p>

        <a
          href={ctaHref}
          className="mt-8 inline-flex h-[37px] w-fit items-center gap-[10px] rounded-[6px] bg-[#E63946] px-[13px] font-space-grotesk text-[12px] font-medium text-white transition-colors hover:bg-[#c92e3a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {ctaLabel}
          <AnimatedArrow icon={ArrowUpRight} className="h-3.5 w-3.5 shrink-0" />
        </a>
      </motion.div>
    </div>
  );
}