import { ArrowUpRight } from "lucide-react";
import type { PartnershipProgram } from "@/features/home/data/partnershipPrograms";
import { gsap, motion } from "@/shared/animations";
import AnimatedArrow from "@/shared/components/ui/AnimatedArrow";
import SectionEyebrow from "./SectionEyebrow";

interface ProgramCardProps {
  program: PartnershipProgram;
}

const ProgramCard = ({ program }: ProgramCardProps) => {
  const { image, eyebrow, headingRed, headingWhite, description, ctaText, ctaHref, stat } =
    program;

  const animateImageFrame = (target: HTMLDivElement, scale: number) => {
    gsap.to(target, {
      scale,
      duration: motion.duration.hover,
      ease: motion.ease.hover,
    });
  };

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border-10 border-white bg-[#111111]">
      {/* Image, inset within the white frame */}
      <div
        className="relative mx-3 mt-3 aspect-[365/230] overflow-hidden rounded-lg sm:mx-4 sm:mt-4"
        onMouseEnter={(event) => animateImageFrame(event.currentTarget, 1.14)}
        onMouseLeave={(event) => animateImageFrame(event.currentTarget, 1)}
      >
        <img src={image} alt={`${headingRed} ${headingWhite}`} className="h-full w-full object-cover" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 px-5 py-5 sm:px-6 sm:py-6">
        <SectionEyebrow label={eyebrow} size="sm" />

        <h3 className="font-space-grotesk font-bold leading-tight">
          <span
            className="block text-[#E51B24]"
            style={{
              fontSize: "clamp(22px, 1.1vw + 16px, 32px)",
              lineHeight: "clamp(24px, 0.9vw + 18px, 34px)",
            }}
          >
            {headingRed}
          </span>
          <span
            className="block text-white"
            style={{
              fontSize: "clamp(22px, 1.1vw + 16px, 32px)",
              lineHeight: "clamp(24px, 0.9vw + 18px, 34px)",
            }}
          >
            {headingWhite}
          </span>
        </h3>

        <p
          className="flex-1 font-space-grotesk font-light text-white/65"
          style={{
            fontSize: "clamp(14px, 0.3vw + 12px, 16px)",
            lineHeight: "clamp(19px, 0.4vw + 15px, 22px)",
          }}
        >
          {description}
        </p>

        {/* Bottom row: auto-width CTA button + right-aligned stat block */}
        <div className="mt-1 flex items-end justify-between gap-4">
          <a
            href={ctaHref}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#E51B24] px-5 py-3 text-white transition-colors hover:bg-[#c9161e]"
          >
            <span className="whitespace-nowrap font-space-grotesk text-[13px] font-medium leading-none sm:text-sm">
              {ctaText}
            </span>
            <AnimatedArrow icon={ArrowUpRight} className="h-4 w-4 shrink-0" />
          </a>

          <div className="flex flex-col items-end gap-1 text-right">
            <p className="font-space-grotesk text-[9px] font-medium uppercase leading-[1.35] tracking-wide text-white/60 sm:text-[10px]">
              {stat.line1}
              <br />
              {stat.line2}
              <br />
              {stat.line3}
            </p>
            <span aria-hidden="true" className="h-px w-10 bg-[#E51B24]" />
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProgramCard;