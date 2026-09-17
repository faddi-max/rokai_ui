import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { gsap, motion, revealLeft, revealRight, revealUp, revealVisible, useGSAP } from "@/shared/animations";
import Button from "@/shared/components/ui/Button";
import { usePrefersReducedMotion } from "@/shared/hooks/usePrefersReducedMotion";
import type { HeroContent, HeroGlow } from "@/shared/types/hero";

/** Default background glow, taken from the Figma hero frame (1512px wide, unpadded). */
const DEFAULT_GLOWS: HeroGlow[] = [
  { width: 601, height: 901, top: 9, left: 783, color: "#E51B24C4", blur: 500 },
  { width: 315, height: 315, top: 167, left: 688, color: "#E51B2487", blur: 500 },
];

/** Shared marketing hero for all top-level landing pages. */
export default function HeroSection({
  headingLines,
  description,
  primaryCta,
  secondaryCta,
  secondaryRow,
  visual,
  background,
}: HeroContent) {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isModelVisual = visual.type === "model";
  const glows = background?.glows ?? DEFAULT_GLOWS;
  const renderBadgeValue = (value: string) => {
    const accent = value.match(/(%|\+|\/7)$/)?.[0];

    if (!accent) return value;

    return (
      <>
        {value.slice(0, -accent.length)}
        <span className="bg-[linear-gradient(180deg,#E51B24_0%,#7F0F14_100%)] bg-clip-text text-transparent">
          {accent}
        </span>
      </>
    );
  };

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      gsap.timeline()
        .fromTo("[data-hero-heading]", revealLeft(), revealVisible)
        .fromTo("[data-hero-divider], [data-hero-description]", revealLeft(), { ...revealVisible, stagger: motion.stagger }, "-=0.2")
        .fromTo("[data-hero-ctas]", revealLeft(), revealVisible, "-=0.15")
        .fromTo("[data-hero-proof]", revealLeft(), revealVisible, "-=0.15")
        .fromTo("[data-hero-visual]", revealUp(32), revealVisible, "-=0.2")
        .fromTo("[data-hero-product-card], [data-hero-caption]", revealRight(), { ...revealVisible, stagger: motion.stagger }, "-=0.25");
    },
    { scope: heroRef, dependencies: [prefersReducedMotion], revertOnUpdate: true }
  );

  return (
    <section ref={heroRef} className={`relative overflow-hidden bg-black pb-8 lg:pb-0 ${background?.sectionClassName ?? ""}`}>
      <div className="pointer-events-none absolute inset-0">
        <div className="relative mx-auto hidden h-full max-w-[1512px] lg:block">
          {glows.map((glow, index) => (
            <div
              key={index}
              className="absolute"
              style={{
                width: glow.width,
                height: glow.height,
                top: glow.top,
                left: glow.left,
                backgroundColor: glow.color,
                filter: `blur(${glow.blur}px)`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative mx-auto grid max-w-[1512px] items-center gap-8 px-5 py-10 sm:px-8 md:px-10 lg:grid-cols-2 lg:gap-5 lg:px-16 ">
        <div className="relative z-10 flex min-w-0 flex-col gap-6">
          <h1 data-hero-heading className="font-space-grotesk text-[clamp(2rem,9vw,3.5rem)] font-bold uppercase leading-[1.02] text-white lg:text-[70px] lg:leading-[68px]">
            {headingLines.map((line, index) => (
              <span
                key={`${line.text}-${index}`}
                className={
                  line.highlight
                    ? "bg-[linear-gradient(90deg,#E51B24_0%,#690106_100%)] bg-clip-text text-transparent lg:whitespace-nowrap lg:text-[63px] lg:leading-[76px]"
                    : undefined
                }
              >
                {line.text}{index < headingLines.length - 1 && <br />}
              </span>
            ))}
          </h1>
          <div data-hero-divider className="h-[3px] w-16 bg-white" />
          <p data-hero-description className="max-w-md font-space-grotesk text-base text-white/80">{description}</p>
          <div data-hero-ctas className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Button href={primaryCta.href} variant="outline" icon={ArrowUpRight} className="h-[44px] w-full px-4 sm:w-auto sm:px-6">{primaryCta.label}</Button>
            <Button href={secondaryCta.href} icon={ArrowUpRight} className="h-[44px] w-full px-4 sm:w-auto sm:px-6">{secondaryCta.label}</Button>
          </div>
          <div data-hero-proof>
            {secondaryRow.type === "join" ? (
              <div className="mt-2 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <div className="flex shrink-0 -space-x-3">
                  {secondaryRow.avatars.map((avatar, index) => <img key={`${avatar}-${index}`} src={avatar} alt="Rokai community member" className="h-10 w-10 rounded-full border-2 border-black object-cover" />)}
                </div>
                <p className="font-space-grotesk text-sm text-white/80">{secondaryRow.joinText}</p>
              </div>
            ) : (
              <div className="mt-1 grid max-w-xl grid-cols-2 gap-y-4 border-t border-white/20 pt-4 sm:grid-cols-4 sm:gap-0">
                {secondaryRow.badges.map((badge, index) => (
                  <div key={badge.label} className={index > 0 ? "border-white/20 sm:border-l sm:pl-5" : undefined}>
                    <p className="font-space-grotesk text-[28px] font-bold leading-[34px] text-white lg:text-[39.32px] lg:leading-[47.43px]">
                      {renderBadgeValue(badge.value)}
                    </p>
                    <p className="mt-1 font-space-grotesk text-[10px] uppercase tracking-wide text-white/60">{badge.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="relative flex w-full items-end justify-center gap-8 lg:gap-15">
          <div className={`relative z-10 w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[480px] ${isModelVisual ? "lg:-translate-x-10" : ""}`}>
            <img data-hero-visual src={visual.image} alt={visual.imageAlt} className="h-auto w-full object-contain" />
            {isModelVisual && (
              <div data-hero-product-card className="absolute -top-1 right-0 flex w-[112px] flex-col rounded-md bg-white p-2.5 shadow-lg sm:-top-4 sm:-right-10 sm:w-[140px] sm:p-3 lg:-right-24">
                <img src={visual.productCard.image} alt={visual.productCard.imageAlt} className="h-[88px] w-full rounded object-contain object-top sm:h-[110px]" />
                <p className="mt-2 text-center font-space-grotesk text-[10px] font-normal uppercase leading-[13px] text-black sm:text-[12px] sm:leading-[15px]">{visual.productCard.name}</p>
              </div>
            )}
          </div>
          {isModelVisual && visual.caption && (
            <div data-hero-caption className="relative z-10 mb-16 hidden flex-col items-start gap-2 lg:flex">
              <span className="whitespace-nowrap font-space-grotesk text-[20px] font-bold leading-[30px] tracking-[0.2em] text-white">{visual.caption}</span>
              <div className="absolute left-1/2 top-10 h-[10px] w-[58px] -translate-x-1/2 -translate-y-1/2 bg-white" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
