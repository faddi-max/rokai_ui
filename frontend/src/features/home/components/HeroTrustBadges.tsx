import { Factory, Globe, Ruler, TrendingUp, type LucideIcon } from "lucide-react";
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

export default function HeroTrustBadges({ blocks = heroTrustBlocks }: HeroTrustBadgesProps) {
  return (
    <section
      aria-label="Why brands work with ROKAI"
      className="relative z-10 -mt-10 px-5 sm:-mt-12 sm:px-8 lg:-mt-16 lg:px-0"
    >
      <ul className="mx-auto grid w-full max-w-[1140px] grid-cols-1 rounded-2xl bg-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.25)] sm:grid-cols-2 lg:grid-cols-4">
        {blocks.map((block, index) => {
          const Icon = ICONS[block.icon];
          return (
            <li
              key={block.title}
              className={[
                "flex min-w-0 items-start gap-3 px-6 py-7",
                index > 0 ? "border-t border-[#EBEBEB]" : "",
                index % 2 === 1 ? "sm:border-l" : "",
                index === 1 ? "sm:border-t-0" : "",
                index >= 2 ? "sm:border-t" : "",
                "lg:border-t-0",
                index > 0 ? "lg:border-l" : "",
              ].join(" ")}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center">
                <Icon className="h-9 w-9 text-[#E51B24]" strokeWidth={2} aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="font-space-grotesk text-[13px] font-bold uppercase leading-tight tracking-wide text-[#1A1A1A]">
                  {block.title}
                </p>
                <p className="mt-1.5 font-space-grotesk text-[12px] font-normal leading-[16px] text-[#6B6B6B]">
                  {block.description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}