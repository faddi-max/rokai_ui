import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { heroContent } from "@/features/home/data/heroContent";
import { gsap, motion, revealLeft, revealRight, revealUp, revealVisible, useGSAP } from "@/shared/animations";
import Button from "@/shared/components/ui/Button";
import { usePrefersReducedMotion } from "@/shared/hooks/usePrefersReducedMotion";

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const entrance = gsap.timeline();

      entrance
        .fromTo("[data-hero-heading]", revealLeft(), revealVisible)
        .fromTo("[data-hero-ctas]", revealLeft(), revealVisible, "-=0.15")
        .fromTo(
          "[data-hero-divider], [data-hero-description]",
          revealLeft(),
          { ...revealVisible, stagger: motion.stagger },
          "-=0.2"
        )
        .fromTo("[data-hero-join]", revealLeft(), revealVisible, "-=0.15")
        .fromTo("[data-hero-model]", revealUp(32), revealVisible, "-=0.2")
        .fromTo(
          "[data-hero-product-card], [data-hero-estd]",
          revealRight(),
          { ...revealVisible, stagger: motion.stagger },
          "-=0.25"
        );
    },
    { scope: heroRef, dependencies: [prefersReducedMotion], revertOnUpdate: true }
  );

  return (
    <section ref={heroRef} className="relative bg-black overflow-hidden pb-8 lg:pb-0">
      <div className="relative mx-auto grid max-w-[1512px] items-center gap-8 px-5 py-10 sm:px-8 md:px-10 lg:grid-cols-2 lg:gap-5 lg:px-16 lg:pt-14">
        <div className="flex min-w-0 flex-col gap-6">
          <h1 data-hero-heading className="font-space-grotesk text-[clamp(2rem,9vw,3.5rem)] font-bold leading-[1.02] text-white uppercase lg:text-[70px] lg:leading-[68px]">
            {heroContent.headingLine1}
            <br />
            {heroContent.headingLine2}
            <br />
            {heroContent.headingLine3}
            <br />
            <span className="text-[#E51B24]">{heroContent.headingLine4}</span>
          </h1>

          <div data-hero-divider className="w-16 h-[3px] bg-white" />

          <p data-hero-description className="font-space-grotesk text-white/80 text-base max-w-md">
            {heroContent.description}
          </p>

          <div data-hero-ctas className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Button href={heroContent.primaryCta.href} variant="outline" icon={ArrowUpRight} className="h-[44px] w-full px-4 sm:w-auto sm:px-6">
              {heroContent.primaryCta.label}
            </Button>
            <Button href={heroContent.secondaryCta.href} icon={ArrowUpRight} className="h-[44px] w-full px-4 sm:w-auto sm:px-6">
              {heroContent.secondaryCta.label}
            </Button>
          </div>

          <div data-hero-join className="mt-2 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <div className="flex shrink-0 -space-x-3">
              {heroContent.avatars.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt="Academy member"
                  className="w-10 h-10 rounded-full border-2 border-black object-cover"
                />
              ))}
            </div>
            <p className="font-space-grotesk text-white/80 text-sm">
              {heroContent.joinText}
            </p>
          </div>
        </div>

        <div className="relative flex w-full items-end justify-center gap-8 lg:gap-15">
          <div className="absolute inset-0 lg:-inset-x-16 bg-[radial-gradient(circle_at_60%_45%,rgba(180,20,25,0.4),transparent_65%)]" />

          <div className="relative z-10 w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[480px] lg:-translate-x-10">
            <img
              data-hero-model
              src={heroContent.heroImage}
              alt="Rokai hoodie model"
              className="h-auto w-full object-contain"
            />

            <div data-hero-product-card className="absolute -top-1 right-0 flex w-[112px] flex-col rounded-md bg-white p-2.5 shadow-lg sm:-top-4 sm:-right-10 sm:w-[140px] sm:p-3 lg:-right-24">
              <img
                src={heroContent.productCard.image}
                alt={heroContent.productCard.name}
                className="h-[88px] w-full rounded object-contain object-top sm:h-[110px]"
              />
              <p className="mt-2 text-center font-space-grotesk text-[10px] font-normal leading-[13px] text-black uppercase sm:text-[12px] sm:leading-[15px]">
                R Jiu-Jitsu
                <br />
                Hoodie
              </p>
            </div>
          </div>

          <div data-hero-estd className="relative z-10 mb-16 hidden flex-col items-start gap-2 lg:flex">
            <span className="font-space-grotesk font-bold text-white text-[20px] leading-[30px] tracking-[0.2em] whitespace-nowrap">
              {heroContent.estdText}
            </span>
            <div
              className="absolute left-1/2 top-10 h-[10px] w-[58px] -translate-x-1/2 -translate-y-1/2"
              style={{ backgroundColor: "white" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
