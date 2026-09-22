import { ArrowUpRight } from "lucide-react";
import SectionEyebrow from "./SectionEyebrow";
import { sustainabilityGoals } from "@/features/home/data/sustainabilityGoals";
import AnimatedArrow from "@/shared/components/ui/AnimatedArrow";

const SustainabilityGoalsSection = () => {
  const {
    eyebrow,
    titleTop,
    titleBottom,
    description,
    goals,
    ctaText,
    ctaHref,
    image,
    caption,
  } = sustainabilityGoals;

  return (
    <section className="relative w-full overflow-hidden bg-black px-6 py-16 sm:px-10 lg:px-20 lg:py-24">
      {/* Ambient red glow, bottom-left — matches design's subtle vignette */}
      <div
        className="pointer-events-none absolute -bottom-1/4 -left-1/4 h-[60%] w-[50%]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(165,20,24,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-[1512px] grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16">
        {/* Left column */}
        <div className="flex flex-col gap-8 lg:gap-10">
          <SectionEyebrow
            label={eyebrow}
            textClassName="text-white/50"
            lineClassName="border-[#7A1017]"
          />

          <h2 className="font-space-grotesk uppercase">
            <span
              className="block font-bold text-white"
              style={{
                fontSize: "clamp(28px, 2.6vw + 12px, 52px)",
                lineHeight: "clamp(30px, 2.6vw + 12px, 56px)",
                letterSpacing: "0%",
              }}
            >
              {titleTop}
            </span>
            <span
              className="block bg-clip-text font-bold text-transparent"
              style={{
                fontSize: "clamp(28px, 2.6vw + 12px, 52px)",
                lineHeight: "clamp(30px, 2.6vw + 12px, 56px)",
                letterSpacing: "0%",
                backgroundImage:
                  "linear-gradient(90deg, #E51B24 0%, #690106 100%)",
              }}
            >
              {titleBottom}
            </span>
          </h2>

          <div className="grid grid-cols-3 gap-4 sm:gap-8">
            {goals.map((goal) => (
              <div key={goal.number} className="flex flex-col gap-3">
                <span
                  className="font-space-grotesk font-light leading-none text-white/40"
                  style={{ fontSize: "clamp(28px, 1.6vw + 16px, 40px)" }}
                >
                  {goal.number}
                </span>
                <div className="h-[2px] w-full bg-gradient-to-r from-[#E51B24] to-transparent" />
                <p
                  className="font-space-grotesk font-bold uppercase text-white"
                  style={{ fontSize: "13px", lineHeight: "17px" }}
                >
                  {goal.title}
                </p>
                <p
                  className="font-space-grotesk font-light text-white/45"
                  style={{ fontSize: "12px", lineHeight: "17px" }}
                >
                  {goal.description}
                </p>
              </div>
            ))}
          </div>

          <a
            href={ctaHref}
            className="inline-flex w-fit items-center gap-2 rounded-[4px] bg-[#E63946] px-6 py-3.5 text-white transition-colors hover:bg-[#c92e3a]"
          >
            <span className="font-space-grotesk text-[14px] font-semibold leading-[18px]">
              {ctaText}
            </span>
            <AnimatedArrow icon={ArrowUpRight} className="h-4 w-4 shrink-0" />
          </a>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-10 lg:pt-3">
          <div className="border-l-2 border-[#E51B24] pl-5">
            <p
              className="font-space-grotesk font-light text-white/60"
              style={{
                fontSize: "clamp(14px, 0.3vw + 13px, 16px)",
                lineHeight: "1.6",
              }}
            >
              {description}
            </p>
          </div>

          <div className="w-full">
            <div className="relative aspect-[312/219] w-full overflow-hidden">
              <img
                src={image}
                alt="Trees in a sunlit forest"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="bg-[#151515] px-6 py-5">
              {caption.map((line) => (
                <p
                  key={line}
                  className="font-space-grotesk uppercase text-white/45"
                  style={{
                    fontSize: "11px",
                    lineHeight: "1.9",
                    letterSpacing: "0.15em",
                  }}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilityGoalsSection;