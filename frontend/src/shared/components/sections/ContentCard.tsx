import { ArrowUpRight } from "lucide-react";
import Button from "@/shared/components/ui/Button";
import AnimatedArrow from "@/shared/components/ui/AnimatedArrow";
import type { ContentCardData } from "@/shared/types/sections";

interface ContentCardProps {
  card: ContentCardData;
}

export default function ContentCard({ card }: ContentCardProps) {
  const {
    image,
    title,
    subtitle,
    description,
    tags,
    badge,
    ctaText = "Learn More",
    ctaHref = "/contact",
    variant = "light",
  } = card;

  // Dark Overlay Variant (as seen in EngineeredBenchmark feature cards)
  if (variant === "dark") {
    return (
      <article className="group relative flex h-[clamp(460px,36vw,560px)] w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-neutral-950 transition-transform duration-300 hover:-translate-y-1">
        <div className="relative min-h-0 flex-1 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          {badge && (
            <span className="absolute left-4 top-4 rounded bg-[#E51B24] px-2.5 py-1 font-space-grotesk text-xs font-bold uppercase tracking-wider text-white">
              {badge}
            </span>
          )}

          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5 sm:p-6">
            {subtitle && (
              <span className="font-space-grotesk text-xs font-semibold uppercase tracking-wider text-[#E51B24]">
                {subtitle}
              </span>
            )}
            <h3 className="font-space-grotesk text-xl sm:text-2xl font-bold text-white">
              {title}
            </h3>
            <p className="line-clamp-3 font-space-grotesk text-sm text-white/80">
              {description}
            </p>
          </div>
        </div>

        <a
          href={ctaHref}
          className="flex min-h-[56px] items-center justify-between gap-3 bg-[#E51B24] px-5 py-3 text-white transition-colors hover:bg-[#c9161e]"
        >
          <span className="font-space-grotesk text-sm font-medium">
            {ctaText}
          </span>
          <AnimatedArrow icon={ArrowUpRight} className="h-5 w-5 shrink-0" />
        </a>
      </article>
    );
  }

  // Resource / Article Variant
  if (variant === "resource") {
    return (
      <article className="group flex flex-col justify-between overflow-hidden rounded-xl border border-white/15 bg-[#111111] p-6 transition-all duration-300 hover:border-[#E51B24] hover:bg-[#161616]">
        <div>
          <div className="flex items-center justify-between gap-3">
            {badge && (
              <span className="rounded bg-white/10 px-2.5 py-1 font-space-grotesk text-xs font-semibold text-white">
                {badge}
              </span>
            )}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-space-grotesk text-[11px] text-[#E51B24]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 aspect-[16/10] overflow-hidden rounded-lg bg-black/40">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <h3 className="mt-5 font-space-grotesk text-xl font-bold text-white group-hover:text-[#E51B24] transition-colors">
            {title}
          </h3>

          <p className="mt-2.5 font-space-grotesk text-sm font-light leading-relaxed text-white/70">
            {description}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10">
          <Button
            href={ctaHref}
            variant="primary"
            icon={ArrowUpRight}
            weight="medium"
            size="13px"
            className="w-full h-[40px]"
          >
            {ctaText}
          </Button>
        </div>
      </article>
    );
  }

  // Default: Light / White Card (as in Categories & Programs)
  return (
    <article className="flex flex-col justify-between overflow-hidden rounded-2xl bg-white shadow-xl transition-transform duration-300 hover:-translate-y-1">
      <div>
        <div className="relative mx-4 mt-4 aspect-[16/10] overflow-hidden rounded-xl border border-black/5 bg-neutral-100 sm:mx-6 sm:mt-6">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover object-center"
          />
          {badge && (
            <span className="absolute top-3 left-3 rounded-md bg-black/80 px-2.5 py-1 font-space-grotesk text-xs font-bold text-white backdrop-blur-sm">
              {badge}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3 px-6 py-6 sm:px-8 sm:py-6">
          <h3
            className="bg-clip-text font-space-grotesk text-2xl sm:text-3xl font-bold text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #E51B24 0%, #690106 100%)",
            }}
          >
            {title}
          </h3>

          {subtitle && (
            <p className="font-space-grotesk text-base font-bold text-black">
              {subtitle}
            </p>
          )}

          <p className="font-space-grotesk text-sm sm:text-base font-light leading-relaxed text-black/80">
            {description}
          </p>

          {tags && tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-neutral-200 px-3 py-1 font-space-grotesk text-xs font-medium text-black"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-6 pt-0">
        <a
          href={ctaHref}
          className="flex w-full items-center justify-between gap-3 rounded-lg border-2 border-[#E51B24] bg-[#E51B24] px-5 py-3.5 text-white transition-colors hover:bg-[#c9161e]"
        >
          <span className="font-space-grotesk text-sm sm:text-base font-medium">
            {ctaText}
          </span>
          <AnimatedArrow icon={ArrowUpRight} className="h-5 w-5 shrink-0" />
        </a>
      </div>
    </article>
  );
}
