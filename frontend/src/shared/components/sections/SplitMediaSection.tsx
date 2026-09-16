import { Play, ArrowUpRight } from "lucide-react";
import Button from "@/shared/components/ui/Button";
import SectionEyebrow from "@/shared/components/ui/SectionEyebrow";
import ChecklistItem from "@/shared/components/ui/ChecklistItem";
import type { SplitMediaData } from "@/shared/types/sections";

interface SplitMediaSectionProps {
  data: SplitMediaData;
  className?: string;
}

export default function SplitMediaSection({
  data,
  className = "",
}: SplitMediaSectionProps) {
  const {
    eyebrow,
    titleTop,
    titleBottom,
    headingHighlight,
    description,
    secondaryDescription,
    media,
    mediaPosition = "left",
    checklist = [],
    cta,
    secondaryCta,
  } = data;

  const isMediaLeft = mediaPosition === "left";

  return (
    <section
      className={`relative w-full overflow-hidden bg-black py-16 sm:py-20 lg:py-28 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(150,15,20,0.25),transparent_60%)]" />

      <div className="relative mx-auto grid max-w-[1512px] items-center gap-12 px-6 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-16">
        {/* Media Block */}
        <div
          className={`relative overflow-hidden rounded-2xl ${
            isMediaLeft ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <div className="relative aspect-[16/10] sm:aspect-[16/11] w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-2xl">
            <img
              src={media.src}
              alt={media.alt || `${titleTop} ${titleBottom}`}
              className="h-full w-full object-cover"
            />

            {media.isVideo && (
              <a
                href={media.videoUrl || "#play"}
                aria-label="Play video"
                className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/20"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E51B24] shadow-lg transition-transform hover:scale-110 sm:h-20 sm:w-20">
                  <Play className="ml-1 h-7 w-7 fill-white text-white sm:h-8 sm:w-8" />
                </span>
              </a>
            )}
          </div>
        </div>

        {/* Content Block */}
        <div
          className={`flex flex-col gap-6 ${
            isMediaLeft ? "lg:order-2" : "lg:order-1"
          }`}
        >
          {eyebrow && <SectionEyebrow label={eyebrow} />}

          <h2 className="font-space-grotesk font-bold uppercase leading-tight text-white">
            <span
              className="block"
              style={{
                fontSize: "clamp(32px, 3.2vw + 12px, 64px)",
                lineHeight: "clamp(34px, 3.3vw + 12px, 66px)",
              }}
            >
              {titleTop}
            </span>
            <span
              className="block bg-clip-text font-light text-transparent"
              style={{
                fontSize: "clamp(28px, 2.8vw + 12px, 56px)",
                lineHeight: "clamp(30px, 2.5vw + 10px, 52px)",
                backgroundImage:
                  "linear-gradient(90deg, #E51B24 0%, #690106 100%)",
              }}
            >
              {headingHighlight || titleBottom}
            </span>
          </h2>

          <p className="max-w-xl font-space-grotesk text-base font-light leading-relaxed text-white/80 sm:text-lg">
            {description}
          </p>

          {secondaryDescription && (
            <p className="max-w-xl font-space-grotesk text-sm font-light leading-relaxed text-white/70">
              {secondaryDescription}
            </p>
          )}

          {checklist.length > 0 && (
            <ul className="my-2 flex flex-col gap-3.5">
              {checklist.map((item) => (
                <ChecklistItem key={item} label={item} />
              ))}
            </ul>
          )}

          {(cta || secondaryCta) && (
            <div className="mt-2 flex flex-wrap items-center gap-4">
              {cta && (
                <Button
                  href={cta.href}
                  variant="primary"
                  icon={ArrowUpRight}
                  weight="medium"
                  size="15px"
                  className="h-[50px] px-7"
                >
                  {cta.text}
                </Button>
              )}
              {secondaryCta && (
                <Button
                  href={secondaryCta.href}
                  variant="outline"
                  icon={ArrowUpRight}
                  weight="medium"
                  size="15px"
                  className="h-[50px] px-7"
                >
                  {secondaryCta.text}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
