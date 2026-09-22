import { ArrowUpRight } from "lucide-react";

import AnimatedArrow from "@/shared/components/ui/AnimatedArrow";
import { CapabilityItem } from "../data/capabilities";

interface CapabilityCardProps {
  item: CapabilityItem;
}

const CapabilityCard = ({ item }: CapabilityCardProps) => {
  const { image, title, subtitle, ctaText, ctaHref } = item;

  return (
    <article className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
      />

      {/* Bottom scrim so the text stays legible over any photo */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 via-45% to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-5 sm:p-6">
        <h3 className="font-space-grotesk text-[17px] font-bold leading-tight text-[#E51B24] sm:text-lg">
          {title}
        </h3>
        <p className="font-space-grotesk text-[12px] font-light leading-snug text-white/75 sm:text-[13px]">
          {subtitle}
        </p>

        <a
          href={ctaHref}
          className="mt-3 inline-flex w-fit shrink-0 items-center gap-2 rounded-md bg-[#E51B24] px-4 py-2.5 text-white transition-colors hover:bg-[#c9161e]"
        >
          <span className="whitespace-nowrap font-space-grotesk text-[12px] font-medium leading-none sm:text-[13px]">
            {ctaText}
          </span>
          <AnimatedArrow icon={ArrowUpRight} className="h-3.5 w-3.5 shrink-0" />
        </a>
      </div>
    </article>
  );
};

export default CapabilityCard;
