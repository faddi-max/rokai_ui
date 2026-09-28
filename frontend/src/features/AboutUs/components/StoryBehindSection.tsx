import { Play, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import { storybehind } from "@/assets";

/* -------------------------------------------------------------------------- */
/*  Types — API-ready                                                         */
/* -------------------------------------------------------------------------- */

export interface StoryBehindSectionProps {
  eyebrow?: string;
  titleWhite?: string;
  titleRed?: string;
  description?: string;
  videoImage?: string;
  videoImageAlt?: string;
  videoUrl?: string;
  watchLabel?: string;
  founderEyebrow?: string;
  founderHeadingWhite?: string;
  founderHeadingRed?: string;
  founderDescription?: string;
  founderCtaLabel?: string;
  founderCtaHref?: string;
  watermark?: string;
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function StoryBehindSection({
  eyebrow = "The ROKAI Difference",
  titleWhite = "THE STORY BEHIND",
  titleRed = " HOW WE BUILD.",
  description = "From custom manufacturing and OEM to private label and product development, ROKAI is structured around helping partners move from an idea or specification to a production-ready product.",
  videoImage = storybehind,
  videoImageAlt = "ROKAI team working together in a workshop",
  videoUrl,
  watchLabel = "Watch Our Story",
  founderEyebrow = "Founder Story",
  founderHeadingWhite = "Why ROKAI exists.",
  founderHeadingRed = "Why we build differently.",
  founderDescription = "ROKAI's story belongs here through the founder's voice explaining why the company exists, what it believes manufacturing should look like, and why its approach is different.",
  founderCtaLabel = "Watch the founder story",
  founderCtaHref = "#founder-story",
  watermark = "ABOUT US",
}: StoryBehindSectionProps) {
  const handlePlay = () => {
    if (videoUrl) window.open(videoUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <SectionGlow className="relative overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="m-5 my-10 flex flex-col gap-6 lg:mx-25"
      >
        <div className="flex items-center gap-6">
          <span className="font-space-grotesk text-xs uppercase tracking-widest text-white/70">
            {eyebrow}
          </span>
          <span className="h-px w-10 bg-[#E51B24]" />
        </div>

        <h2 className="max-w-[820px] font-space-grotesk text-3xl font-bold uppercase leading-[1.1] md:text-4xl lg:text-5xl">
          <span className="text-white">{titleWhite}</span>
          <span className="text-[#E51B24]">{titleRed}</span>
        </h2>

        <p className="max-w-[720px] font-space-grotesk text-[14px] font-light leading-[22px] text-white/70">
          {description}
        </p>
      </motion.div>

      {/* Cards */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-16 sm:px-8 lg:px-[49px]">
        <div className="grid grid-cols-1 gap-[20px] lg:grid-cols-2">
          {/* LEFT — video card */}
          <motion.button
            type="button"
            onClick={handlePlay}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover="hover"
            aria-label={watchLabel}
            className="group relative aspect-[662/500] w-full overflow-hidden rounded-[14px] text-left outline-none focus-visible:ring-2 focus-visible:ring-[#E51B24]"
            style={{ background: "#0000005C", border: "1px solid #FFFFFF1C" }}
          >
            <motion.img
              src={videoImage}
              alt={videoImageAlt}
              loading="lazy"
              variants={{ rest: { scale: 1 }, hover: { scale: 1.03 } }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-black/25" />

            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E51B24] shadow-[0_8px_24px_rgba(229,27,36,0.45)] transition-transform duration-300 group-hover:scale-110">
                <Play className="ml-0.5 h-5 w-5 fill-white text-white" />
              </span>
              <span className="font-space-grotesk text-[13px] font-light text-white/90">
                {watchLabel}
              </span>
            </div>
          </motion.button>

          {/* RIGHT — founder story card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex aspect-auto min-h-[420px] w-full flex-col justify-center overflow-hidden rounded-[14px] px-8 py-10 sm:px-12 lg:aspect-[662/500] lg:px-[58px]"
            style={{ background: "#00000040", border: "1px solid #FFFFFF1C" }}
          >
            <div className="relative z-10 flex max-w-[500px] flex-col">
              <div className="flex items-center gap-3">
                <span aria-hidden className="h-px w-8 bg-[#E51B24]" />
                <span className="font-space-grotesk text-[8px] font-semibold uppercase tracking-[0.15em] text-[#E51B24]">
                  {founderEyebrow}
                </span>
              </div>

              <h3 className="mt-4 font-space-grotesk text-[30px] font-bold leading-[1.15] sm:text-[34px] lg:text-[50px]">
                <span className="block text-white">{founderHeadingWhite}</span>
                <span className="block text-[#E63946]">{founderHeadingRed}</span>
              </h3>

              <p className="mt-5 font-space-grotesk text-[15px] font-light leading-[18px] text-white/55">
                {founderDescription}
              </p>

              <a
                href={founderCtaHref}
                className="group/cta mt-5 inline-flex w-fit items-center gap-1.5 font-space-grotesk text-[10px] font-medium text-[#E63946] transition-opacity hover:opacity-80"
              >
                {founderCtaLabel}
                <ArrowUpRight
                  size={11}
                  className="transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
                />
              </a>
            </div>

      
          </motion.div>
                {/* Watermark */}
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-4 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-space-grotesk text-[110px] font-bold uppercase leading-none tracking-[-0.04em] text-white/[0.04] lg:text-[150px]"
            >
              {watermark}
            </span>
        </div>
      </div>
    </SectionGlow>
  );
}