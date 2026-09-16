import { ArrowUpRight, Recycle } from "lucide-react";
import SectionEyebrow from "./SectionEyebrow";
import { sustainabilityGoals } from "@/features/home/data/sustainabilityGoals";
import AnimatedArrow from "@/shared/components/ui/AnimatedArrow";

const SustainabilityGoalsSection = () => {
  const {
    eyebrow,
    titleTop,
    titleBottom,
    description,
    ctaText,
    ctaHref,
    image,
    caption,
  } = sustainabilityGoals;

  const captionRow = (
    <div className="flex items-start gap-4">
      <Recycle className="h-8 w-8 shrink-0 text-white" strokeWidth={1.75} />
      <div className="flex flex-col gap-1">
        <p
          className="font-space-grotesk font-bold text-white"
          style={{ fontSize: "18px", lineHeight: "21px", letterSpacing: "0%" }}
        >
          {caption.title}
        </p>
        <p
          className="font-space-grotesk font-light text-white/70"
          style={{ fontSize: "12px", lineHeight: "15px", letterSpacing: "0%" }}
        >
          {caption.description}
        </p>
      </div>
    </div>
  );

  return (
    <section className="w-full bg-black px-6 pb-24 pt-16 sm:px-10 lg:px-20 lg:pb-32 lg:pt-20">
      <div className="relative mx-auto w-full max-w-[1512px] bg-[#F3F1ED] p-6 sm:p-10 lg:aspect-[1369/540] lg:p-0">
        <div className="flex flex-col gap-6 lg:absolute lg:left-0 lg:top-0 lg:h-full lg:w-[51.13%] lg:justify-center lg:p-14">
          <SectionEyebrow
            label={eyebrow}
            textClassName="text-black"
            lineClassName="border-[#E51B24]"
          />

          <h2 className="font-space-grotesk">
            <span
              className="block font-bold text-black"
              style={{
                fontSize: "clamp(32px, 2.9vw + 12px, 60px)",
                lineHeight: "clamp(34px, 3.3vw + 12px, 68px)",
                letterSpacing: "0%",
              }}
            >
              {titleTop}
            </span>
            <span
              className="block bg-clip-text font-light text-transparent"
              style={{
                fontSize: "clamp(30px, 2.9vw + 12px, 60px)",
                lineHeight: "clamp(30px, 2.9vw + 12px, 60px)",
                letterSpacing: "0%",
                backgroundImage: "linear-gradient(90deg, #E51B24 0%, #690106 100%)",
              }}
            >
              {titleBottom}
            </span>
          </h2>

          <p
            className="font-space-grotesk font-light text-black/80"
            style={{
              fontSize: "clamp(16px, 0.5vw + 14px, 20px)",
              lineHeight: "clamp(21px, 0.6vw + 17px, 25px)",
              letterSpacing: "0%",
            }}
          >
            {description}
          </p>

          <a
            href={ctaHref}
            className="inline-flex w-fit items-center gap-2 bg-[#E51B24] px-5 py-3.5 text-white transition-colors hover:bg-[#c9161e]"
          >
            <span className="font-space-grotesk text-[16px] font-medium leading-[20px]">
              {ctaText}
            </span>
            <AnimatedArrow icon={ArrowUpRight} className="h-5 w-5 shrink-0" />
          </a>
        </div>

        <div className="mt-10 lg:hidden">
          <div className="relative aspect-[624/402] w-full overflow-hidden">
            <img
              src={image}
              alt="Trees in a sunlit forest"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="bg-black px-6 py-6">{captionRow}</div>
        </div>

        <div className="hidden lg:block lg:absolute lg:bottom-0 lg:left-[51.13%] lg:right-0 lg:top-[17.04%] lg:bg-black" />

        <div className="hidden lg:block lg:absolute lg:left-[51.13%] lg:top-[9.44%] lg:h-[74.44%] lg:w-[45.58%] lg:overflow-hidden">
          <img
            src={image}
            alt="Trees in a sunlit forest"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="hidden lg:flex lg:absolute lg:bottom-0 lg:left-[51.13%] lg:right-0 lg:top-[83.89%] lg:items-center lg:px-8">
          {captionRow}
        </div>
      </div>
    </section>
  );
};

export default SustainabilityGoalsSection;
