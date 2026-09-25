import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import { gsap, motion, revealLeft, revealRight, revealUp, revealVisible, useGSAP } from "@/shared/animations";
import Button from "@/shared/components/ui/Button";
import AnimatedArrow from "@/shared/components/ui/AnimatedArrow";
import { usePrefersReducedMotion } from "@/shared/hooks/usePrefersReducedMotion";
import type { HeroContent, HeroGlow } from "@/shared/types/hero";
import SectionGlow from "../layout/SectionGlow";

const DEFAULT_GLOWS: HeroGlow[] = [
  { width: 601, height: 901, top: 9, left: 783, color: "#E51B24C4", blur: 500 },
  { width: 315, height: 315, top: 167, left: 688, color: "#E51B2487", blur: 500 },
];

export default function HeroSection({
  eyebrow,
  headingLines,
  description,
  primaryCta,
  secondaryCta,
  secondaryRow,
  visual,
  background,
  subscribe,
  featureTags,
  brandCard,
}: HeroContent) {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isModelVisual = visual.type === "model";
  const isBackgroundVisual = visual.type === "background";
  const glows = background?.glows ?? DEFAULT_GLOWS;
  const [email, setEmail] = useState("");

  const sectionBgColor = background?.bgColor ?? "#000000";
  const sectionHeightPx = isBackgroundVisual ? background?.heightPx ?? 560 : undefined;
  const photoOpacity = isBackgroundVisual ? visual.position.opacity ?? 1 : 1;

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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    subscribe?.onSubmit?.(email);
  };

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      const tl = gsap.timeline()
        .fromTo("[data-hero-heading]", revealLeft(), revealVisible)
        .fromTo("[data-hero-divider], [data-hero-description]", revealLeft(), { ...revealVisible, stagger: motion.stagger }, "-=0.2")
        .fromTo("[data-hero-ctas]", revealLeft(), revealVisible, "-=0.15");
      if (document.querySelector("[data-hero-tags]")) tl.fromTo("[data-hero-tags]", revealLeft(), revealVisible, "-=0.15");
      if (document.querySelector("[data-hero-proof]")) tl.fromTo("[data-hero-proof]", revealLeft(), revealVisible, "-=0.15");
      if (document.querySelector("[data-hero-visual]")) {
        tl.fromTo("[data-hero-visual]", revealUp(32), revealVisible, "-=0.2");
      }
      if (document.querySelector("[data-hero-product-card], [data-hero-caption]")) {
        tl.fromTo("[data-hero-product-card], [data-hero-caption]", revealRight(), { ...revealVisible, stagger: motion.stagger }, "-=0.25");
      }
      if (document.querySelector("[data-hero-brand-card]")) {
        tl.fromTo("[data-hero-brand-card]", revealUp(20), revealVisible, "-=0.2");
      }
    },
    { scope: heroRef, dependencies: [prefersReducedMotion], revertOnUpdate: true }
  );

  return (
    <SectionGlow>
    <section
      ref={heroRef}
      className={`relative overflow-hidden pb-8 lg:pb-9 ${background?.sectionClassName ?? ""}`}
      style={{
        backgroundColor: sectionBgColor,
        ...(sectionHeightPx ? { minHeight: undefined } : {}),
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="relative hidden max-w-[1512px] lg:block"
          style={sectionHeightPx ? { height: sectionHeightPx } : { height: "100%" }}
        >
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
          {isBackgroundVisual && (
            <div
              className="absolute overflow-hidden"
              style={{
                width: visual.position.width,
                height: visual.position.height,
                top: visual.position.top,
                left: visual.position.left,
                transform: visual.position.angle ? `rotate(${visual.position.angle}deg)` : undefined,
              }}
            >
              <img
                data-hero-visual
                src={visual.image}
                alt={visual.imageAlt}
                className="h-full w-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ backgroundColor: sectionBgColor, opacity: 1 - photoOpacity }}
              />
            </div>
          )}

          {/* Floating accent card (e.g. "YOUR BRAND.") — positioned against the same
              1512px frame as the glows/background image, per the Figma spec. */}
          {brandCard && (
            <div
              data-hero-brand-card
              className="pointer-events-auto z-100 absolute z-10 flex flex-col justify-center  px-5"
              style={{
                width: brandCard.position.width,
                height: brandCard.position.height,
                top: brandCard.position.top,
                left: brandCard.position.left,
                transform: brandCard.position.angle ? `rotate(${brandCard.position.angle}deg)` : undefined,
                opacity: brandCard.position.opacity ?? 1,
                borderRadius: brandCard.position.borderRadius ?? 10,
                backgroundColor: brandCard.bgColor ?? "#E51B24",
              }}
            >
              <p className="font-space-grotesk text-[25px] font-bold uppercase leading-[18px] text-white">
                {brandCard.title}
              </p>
              <p className="mt-1 font-space-grotesk text-[12px] py-2 font-normal uppercase leading-[12px] tracking-wide text-white/80">
                {brandCard.subtitle}
              </p>
            </div>
          )}
        </div>

        <div
          className="absolute -right-1/3 -top-1/4 h-[70vw] w-[70vw] max-h-[420px] max-w-[420px] rounded-full lg:hidden"
          style={{ backgroundColor: "#E51B2470", filter: "blur(120px)" }}
        />
      </div>

      <div
        className={`relative mx-auto grid max-w-[1512px] items-center gap-8 px-5 py-10 sm:px-8 md:px-10 ${isBackgroundVisual ? "" : "lg:grid-cols-2 lg:gap-5"} lg:px-16`}
        style={sectionHeightPx ? { minHeight: undefined } : undefined}
      >
        <div className={`relative z-10 flex min-w-0 flex-col gap-6 ${isBackgroundVisual ? "max-w-2xl" : ""}`}>
          {eyebrow && (
            <p className="font-space-grotesk text-xs font-medium uppercase tracking-[0.2em] text-white/70">
              {eyebrow}
            </p>
          )}

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
                {line.text}
                {index < headingLines.length - 1 && (
                  <>
                    {" "}
                    <br />
                  </>
                )}
              </span>
            ))}
          </h1>

          <div data-hero-divider className="flex items-center gap-2">
            <span className="h-[3px] w-12 bg-white" />
            <span className="h-[3px] w-3 bg-white" />
          </div>

          <p data-hero-description className="max-w-md font-space-grotesk text-base text-white/80">{description}</p>

          <div data-hero-ctas className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            {subscribe ? (
              <form onSubmit={handleSubscribe} className="flex w-full flex-col gap-3 sm:max-w-xl sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={subscribe.placeholder}
                  className="h-[44px] w-full min-w-0 flex-1 rounded-md bg-white px-4 font-space-grotesk text-sm text-black placeholder:text-black/40 focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex h-[44px] w-full shrink-0 items-center justify-center gap-2 rounded-md bg-[#E51B24] px-6 font-space-grotesk text-sm font-medium text-white transition hover:bg-[#c41720] sm:w-auto"
                >
                  {subscribe.buttonLabel}
                  <AnimatedArrow icon={ArrowUpRight} size={16} />
                </button>
              </form>
            ) : (
              primaryCta && (
                <>
                  <Button
                    href={primaryCta.href}
                    variant={secondaryCta ? "outline" : "primary"}
                    icon={ArrowUpRight}
                    className="h-[44px] w-full px-4 sm:w-auto sm:px-6"
                  >
                    {primaryCta.label}
                  </Button>
                  {secondaryCta && (
                    <Button href={secondaryCta.href} icon={ArrowUpRight} className="h-[44px] w-full px-4 sm:w-auto sm:px-6">
                      {secondaryCta.label}
                    </Button>
                  )}
                </>
              )
            )}
          </div>

          {/* NEW — small uppercase feature-tag row under the CTAs */}
          {featureTags && featureTags.length > 0 && (
            <div  className="flex flex-wrap items-center gap-y-2 pt-1">
              {featureTags.map((tag, i) => (
                <span key={tag} className="flex items-center ">
                  {i > 0 && <span aria-hidden className="mx-3 h-3 w-px bg-white/20" />}
                  <span className="whitespace-nowrap  border-1 border-[#FFFFFF1A] p-2 font-space-grotesk text-[11px] font-medium uppercase  text-white/50">
                    {tag}
                  </span>
                </span>
              ))}
            </div>
          )}

          {secondaryRow && (
            <div data-hero-proof>
              {secondaryRow.type === "join" ? (
                <div className="mt-2 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                  <div className="flex shrink-0 -space-x-3">
                    {secondaryRow.avatars.map((avatar, index) => (
                      <img
                        key={`${avatar}-${index}`}
                        src={avatar}
                        alt=""
                        className="h-10 w-10 rounded-full border-2 border-black object-cover"
                      />
                    ))}
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
          )}
        </div>

        {!isBackgroundVisual && (
          <div className="relative flex w-full items-end justify-center gap-8 lg:gap-15">
            <div className={`relative z-10 w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[480px] ${isModelVisual ? "lg:-translate-x-10" : ""}`}>
              <img
                data-hero-visual
                src={visual.image}
                alt={visual.imageAlt}
                width={480}
                height={670}
                decoding="async"
                fetchPriority="high"
                className="h-auto w-full object-contain rounded-xl"
              />

              {visual.floatingBadges?.map((badge, index) => (
                <div
                  key={`${badge.label}-${index}`}
                  data-hero-badge
                  className="absolute z-20 rounded-md bg-black/80 px-2 py-1.5 backdrop-blur-sm sm:px-3 sm:py-2"
                  style={{
                    top: badge.position.top,
                    bottom: badge.position.bottom,
                    left: badge.position.left,
                    right: badge.position.right,
                    animation: prefersReducedMotion
                      ? undefined
                      : `float-badge 3s ease-in-out ${index * 0.4}s infinite`,
                  }}
                >
                  <p className="font-space-grotesk text-[10px] font-bold leading-none text-white sm:text-sm">
                    {badge.value}
                  </p>
                  <p className="mt-1 font-space-grotesk text-[7px] uppercase leading-none tracking-wide text-white/60 sm:text-[9px]">
                    {badge.label}
                  </p>
                </div>
              ))}

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
        )}
      </div>

      {isBackgroundVisual && (
        <div className="relative mt-6 w-full overflow-hidden lg:hidden">
          <img
            src={visual.image}
            alt={visual.imageAlt}
            className="h-[220px] w-full object-cover sm:h-[280px] md:h-[340px]"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ backgroundColor: sectionBgColor, opacity: 1 - photoOpacity }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(17,17,17,0.15) 0%, rgba(17,17,17,0) 30%, rgba(17,17,17,0.85) 100%)",
            }}
          />
          {/* Mobile version of the brand card, stacked instead of absolutely positioned */}
          {brandCard && (
            <div
              className="absolute bottom-4 left-4 flex max-w-[180px] flex-col justify-center px-4 py-3"
              style={{
                borderRadius: brandCard.position.borderRadius ?? 10,
                backgroundColor: brandCard.bgColor ?? "#E51B24",
              }}
            >
              <p className="font-space-grotesk text-[13px] font-bold uppercase leading-[16px] text-white">
                {brandCard.title}
              </p>
              <p className="mt-1 font-space-grotesk text-[8px] font-medium uppercase leading-[11px] tracking-wide text-white/80">
                {brandCard.subtitle}
              </p>
            </div>
          )}
        </div>
      )}
    </section>
    </SectionGlow>
  );
}