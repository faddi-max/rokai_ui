import { useRef } from "react";
import { gsap, motion, revealLeft, revealRight, revealUp, revealVisible, useGSAP } from "@/shared/animations";
import { usePrefersReducedMotion } from "@/shared/hooks/usePrefersReducedMotion";
import { giEngineeringData } from "../../../features/categories/data/giEngineering.data";
import type { GiCallout, GiEngineeringData } from "../../../features/categories/data/giEngineering.data";

interface GiEngineeringSectionProps {
  data?: GiEngineeringData;
}

export default function GiEngineeringSection({
  data = giEngineeringData,
}: GiEngineeringSectionProps) {
  const { eyebrow, headingLine1, headingLine2, headingLine3, sideDescription, callouts, image } =
    data;

  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      gsap.timeline()
        .fromTo("[data-gi-eyebrow]", revealLeft(), revealVisible)
        .fromTo("[data-gi-heading]", revealLeft(), revealVisible, "-=0.2")
        .fromTo("[data-gi-description]", revealRight(), revealVisible, "-=0.55")
        .fromTo("[data-gi-visual]", revealUp(32), revealVisible, "-=0.2")
        .fromTo("[data-gi-callout]", { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: motion.stagger }, "-=0.3")
        .fromTo("[data-gi-legend]", revealUp(16), { ...revealVisible, stagger: motion.stagger }, "-=0.2");
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion], revertOnUpdate: true }
  );

  return (
    <section ref={sectionRef} className="bg-black font-space-grotesk">
      <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-10 sm:py-16 md:py-20 lg:py-[70px] lg:pl-[49px] lg:pr-[72px]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-[61px]">
          <div className="flex flex-col">
            <div data-gi-eyebrow className="mb-5 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <span className="whitespace-nowrap text-[12px] font-normal leading-[18px] text-white/70 sm:text-[13px] sm:leading-[20px]">
                {eyebrow}
              </span>
              <span aria-hidden="true" className="h-[1px] w-10 shrink-0 bg-[#E51B24] sm:w-12" />
            </div>

            <h2 data-gi-heading className="uppercase">
              <span className="block text-[24px] font-bold leading-[1.2] text-white sm:text-[28px] md:text-[34px] md:leading-[1.15] lg:text-[38px] lg:leading-[44px]">
                {headingLine1}
              </span>
              <span className="block text-[24px] font-bold leading-[1.2] text-white sm:text-[28px] md:text-[34px] md:leading-[1.15] lg:text-[38px] lg:leading-[44px]">
                {headingLine2}
              </span>
              <span className="block bg-gradient-to-r from-[#E51B24] to-[#690106] bg-clip-text text-[24px] font-bold leading-[1.2] text-transparent sm:text-[28px] md:text-[34px] md:leading-[1.15] lg:text-[38px] lg:leading-[44px]">
                {headingLine3}
              </span>
            </h2>
          </div>

          <div data-gi-description className="flex max-w-full gap-2 sm:max-w-[320px] lg:ml-auto lg:max-w-[300px]">
            <span
              aria-hidden="true"
              className="w-[1px] h-10 mt-5 mx-2 shrink-0 self-stretch bg-[#E51B24]"
            />
            <p className="text-left text-[13px] font-light leading-[19px] tracking-normal text-white/75 sm:text-[14px] sm:leading-[20px]">
              {sideDescription}
            </p>
          </div>
        </div>

        <div
          data-gi-visual
          className="relative mx-auto mt-10 hidden w-full max-w-[420px] overflow-visible sm:mt-12 sm:block sm:max-w-[600px] md:max-w-[720px] lg:mt-16 lg:max-w-[900px]"
        >
          <div className="relative aspect-[1178/976] w-full">
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-contain"
            />
            {callouts.map((callout) => (
              <CalloutLabel key={callout.label} callout={callout} />
            ))}
          </div>
        </div>

        {/* Mobile fallback: image on its own, callouts listed below as a
            simple legend so nothing overlaps or gets clipped on narrow screens. */}
        <div className="mt-10 sm:hidden">
          <div className="relative mx-auto aspect-[1178/976] w-full max-w-[320px]">
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-contain"
            />
          </div>
          <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4">
            {callouts.map((callout) => (
              <li key={callout.label} data-gi-legend className="flex items-start gap-2">
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#E51B24]"
                />
                <span className="text-[13px] font-medium leading-[16px] text-white">
                  {callout.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function CalloutLabel({ callout }: { callout: GiCallout }) {
  const isLeft = callout.side === "left";

  return (
    <span
      data-gi-callout
      style={{
        position: "absolute",
        top: `${callout.y}%`,
        transform: "translateY(-50%)",
        ...(isLeft
          ? { right: `calc(100% - ${callout.x}% + 10px)` }
          : { left: `calc(${callout.x}% + 10px)` }),
      }}
      className={`w-max max-w-[110px] text-[11px] font-medium leading-[14px] text-white sm:max-w-[130px] sm:text-[12px] sm:leading-[15px] md:max-w-[150px] lg:max-w-[170px] lg:text-[13px] lg:leading-[16px] ${
        isLeft ? "text-right" : "text-left"
      }`}
    >
      {callout.label}
    </span>
  );
}