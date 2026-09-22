import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

import { gsap, revealLeft, revealRight, revealVisible, useGSAP } from "@/shared/animations";
import Button from "@/shared/components/ui/Button";
import { usePrefersReducedMotion } from "@/shared/hooks/usePrefersReducedMotion";
import { whyRokai } from "../data/whyRokai";

export default function WhyRokai() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.set("[data-why-visual]", revealLeft());
      gsap.set("[data-why-content]", revealRight());

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;

          gsap
            .timeline()
            .to("[data-why-visual]", revealVisible)
            .to("[data-why-content]", revealVisible, "-=0.2");

          observer.disconnect();
        },
        { threshold: 0.2 }
      );

      if (sectionRef.current) observer.observe(sectionRef.current);

      return () => observer.disconnect();
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion], revertOnUpdate: true }
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_75%,rgba(150,15,20,0.28),transparent_55%)]" />

      <div className="relative mx-auto grid max-w-[1512px] gap-12 px-6 md:px-10 lg:grid-cols-2 lg:gap-16 lg:px-16">
        {/* Left column — eyebrow, heading, mockup stack */}
        <div data-why-visual className="flex flex-col">
          <div className="mb-4 flex items-center gap-2">
            <span className="font-space-grotesk text-xs font-medium uppercase tracking-widest text-white/70">
              {whyRokai.eyebrow}
            </span>
            <span className="h-px w-8 bg-[#E51B24]" />
          </div>

          <h2 className="font-space-grotesk text-[clamp(2rem,5vw,3rem)] font-extrabold uppercase leading-[1.05] text-white">
            {whyRokai.headingLine1}
            <br />
            <span className="text-[#E51B24]">{whyRokai.headingHighlight}</span>
          </h2>

          <div className="relative mt-10 h-[320px] w-full max-w-[480px] sm:h-[380px]">
            <div className="absolute left-0 top-4 w-[62%] -rotate-3 overflow-hidden rounded-xl border border-white/10 bg-neutral-900 shadow-2xl transition-transform duration-500 ease-out hover:-translate-y-1 hover:rotate-0">
              <img
                src={whyRokai.mockupImage}
                alt={whyRokai.mockupImageAlt}
                className="h-full w-full object-cover"
              />
            </div>
           
          </div>
        </div>

        {/* Right column — description, capability grid, closing CTA row */}
        <div data-why-content className="flex flex-col justify-between gap-10">
          <p className="max-w-sm border-l-2 border-[#E51B24] pl-4 font-space-grotesk text-base font-light leading-relaxed text-white/80 lg:mt-2">
            {whyRokai.description}
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {whyRokai.features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.id}
                  className="group rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors duration-300 hover:border-[#E51B24]/40 hover:bg-white/[0.05]"
                >
                  <span className="font-space-grotesk text-[11px] font-medium text-white/40">
                    {feature.number}
                  </span>

                  <div className="mt-2 flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E51B24] shadow-[0_0_16px_rgba(229,27,36,0.5)]">
                      <Icon size={16} className="text-white" />
                    </span>
                    <h3 className="font-space-grotesk text-sm font-bold uppercase leading-tight text-white">
                      {feature.title}
                    </h3>
                  </div>

                  <p className="mt-3 font-space-grotesk text-xs font-light leading-relaxed text-white/60">
                    {feature.items.join(" • ")}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-space-grotesk text-base font-medium text-white">
              {whyRokai.closingLine1}{" "}
              <span className="text-[#E51B24]">{whyRokai.closingHighlight}</span>
            </p>

            <Button
              href={whyRokai.ctaHref}
              variant="primary"
              icon={ArrowUpRight}
              weight="medium"
              size="14px"
              className="h-[40px] w-fit px-5"
            >
              {whyRokai.ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
