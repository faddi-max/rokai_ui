import { ArrowUpRight } from "lucide-react";
import type { PartnershipProgram } from "@/features/home/data/partnershipPrograms";

interface ProgramCardProps {
  program: PartnershipProgram;
}

const ProgramCard = ({ program }: ProgramCardProps) => {
  const { image, title, subtitle, description, ctaText, ctaHref } = program;

  return (
    <article className="flex flex-col overflow-hidden bg-white">
      <div className="relative mx-4 mt-4 aspect-[365/230] overflow-hidden rounded-lg border-2 border-black/10">
        <img src={image} alt={title} className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-1 flex-col gap-3 px-6 py-6 sm:px-8 sm:py-7">
        <h3
          className="bg-clip-text font-space-grotesk font-bold text-transparent"
          style={{
            fontSize: "clamp(24px, 1.2vw + 18px, 35px)",
            lineHeight: "clamp(24px, 0.9vw + 18px, 30px)",
            letterSpacing: "0%",
            backgroundImage: "linear-gradient(90deg, #E51B24 0%, #690106 100%)",
          }}
        >
          {title}
        </h3>

        <p
          className="font-space-grotesk font-bold text-black"
          style={{
            fontSize: "clamp(16px, 0.4vw + 14px, 20px)",
            lineHeight: "clamp(20px, 0.5vw + 17px, 25px)",
            letterSpacing: "0%",
          }}
        >
          {subtitle}
        </p>

        <p
          className="flex-1 font-space-grotesk font-light text-black"
          style={{
            fontSize: "clamp(16px, 0.4vw + 14px, 20px)",
            lineHeight: "clamp(20px, 0.5vw + 17px, 25px)",
            letterSpacing: "0%",
          }}
        >
          {description}
        </p>
      </div>

      <a
        href={ctaHref}
        className="mx-4 mb-4 flex items-center justify-between gap-3 rounded-lg border-2 border-[#E51B24] bg-[#E51B24] px-4 py-4 text-white transition-colors hover:bg-[#c9161e] sm:gap-4 sm:px-8"
      >
        <span className="min-w-0 flex-1 break-words font-space-grotesk text-[14px] font-light leading-[18px] sm:text-[16px] sm:leading-[20px]">
          {ctaText}
        </span>
        <ArrowUpRight className="h-6 w-6 shrink-0" />
      </a>
    </article>
  );
};

export default ProgramCard;
