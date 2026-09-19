import { Play, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { scalingBrands } from "@/features/home/data/scalingBrands";
import { gsap, revealLeft, revealRight, revealVisible, useGSAP } from "@/shared/animations";
import Button from "@/shared/components/ui/Button";
import { usePrefersReducedMotion } from "@/shared/hooks/usePrefersReducedMotion";

export default function ScalingBrands() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.set("[data-scaling-model]", revealLeft());
      gsap.set("[data-scaling-content]", revealRight());

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;

          gsap
            .timeline()
            .to("[data-scaling-model]", revealVisible)
            .to("[data-scaling-content]", revealVisible, "-=0.2");

          observer.disconnect();
        },
        { threshold: 0.25 }
      );

      if (sectionRef.current) observer.observe(sectionRef.current);

      return () => observer.disconnect();
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion], revertOnUpdate: true }
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black py-16 lg:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(150,15,20,0.3),transparent_60%)]" />

      <div className="relative mx-auto grid max-w-[1512px] items-center gap-10 px-6 md:px-10 lg:grid-cols-2 lg:gap-14 lg:px-16">
        <div
          data-scaling-model
          className="group relative mx-auto w-full max-w-[560px] overflow-hidden rounded-2xl border border-white/10 shadow-2xl transition-all duration-500 hover:border-[#E51B24]/40"
        >
          <img
            src={scalingBrands.videoThumbnail}
            alt="Rokai BJJ team"
            className="max-h-[480px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <a
            href={scalingBrands.videoUrl}
            aria-label="Play video"
            className="absolute inset-0 flex flex-col items-center justify-center gap-3"
          >
            <div className="relative flex items-center justify-center">
              {!prefersReducedMotion && (
                <span className="absolute inset-0 animate-ping rounded-full bg-[#E51B24]/40 opacity-75" />
              )}
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#E51B24] shadow-[0_0_20px_rgba(229,27,36,0.6)] transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14">
                <Play size={18} className="ml-0.5 fill-white text-white" />
              </span>
            </div>
            <span className="font-space-grotesk text-xs font-medium uppercase tracking-widest text-white transition-colors duration-300 group-hover:text-[#E51B24]">
              {scalingBrands.watchLabel ?? "Watch Our Story"}
            </span>
          </a>
        </div>

        <div data-scaling-content className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="font-space-grotesk text-xs uppercase tracking-wide text-white/60">
              {scalingBrands.eyebrow ?? "A partner you can stand behind"}
            </span>
            <span className="h-px flex-1 max-w-[60px] bg-[#E51B24]" />
          </div>

          <h2 className="font-space-grotesk text-[clamp(1.75rem,5vw,2.75rem)] font-bold leading-[1.1] text-white">
            {scalingBrands.headingLine1}
            <br />
            {scalingBrands.headingLine2}
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #E51B24 0%, #690106 100%)" }}
            >
              {scalingBrands.headingHighlight}
            </span>
          </h2>

          <p className="max-w-lg font-space-grotesk text-sm font-light leading-[1.5] text-white/70 sm:text-base">
            {scalingBrands.description}
          </p>

          <Button
            href={scalingBrands.ctaHref}
            variant="primary"
            icon={ArrowUpRight}
            weight="medium"
            size="14px"
            className="mt-2 h-[40px] w-fit px-5"
          >
            {scalingBrands.ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}