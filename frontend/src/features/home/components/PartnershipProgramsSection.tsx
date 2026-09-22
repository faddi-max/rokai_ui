import { useRef } from "react";
import ProgramCard from "./ProgramCard";
import SectionEyebrow from "./SectionEyebrow";
import {
  partnershipPrograms,
  partnershipProgramsHeading,
} from "@/features/home/data/partnershipPrograms";
import { gsap, motion, useGSAP } from "@/shared/animations";
import { usePrefersReducedMotion } from "@/shared/hooks/usePrefersReducedMotion";

const PartnershipProgramsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { eyebrow, titleWhite, titleRed, description } =
    partnershipProgramsHeading;

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.set("[data-partnership-intro]", { autoAlpha: 0 });

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;

          gsap.to("[data-partnership-intro]", {
            autoAlpha: 1,
            duration: motion.duration.normal,
            ease: motion.ease.enter,
            stagger: motion.stagger,
          });
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
    <section ref={sectionRef} className="relative mt-20 w-full overflow-hidden bg-[#111111]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_85%,rgba(150,15,20,0.28),transparent_55%)]" />

      <div className="relative mx-auto w-full max-w-[1512px] px-6 py-16 sm:px-10 md:py-20 lg:px-20 lg:py-24">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-start lg:justify-between">
          <div data-partnership-intro>
            <SectionEyebrow label={eyebrow} size="lg" className="mb-3" />

            <h2 className="font-space-grotesk uppercase leading-none">
              <span
                className="block font-bold text-white"
                style={{
                  fontSize: "clamp(32px, 2.9vw + 12px, 60px)",
                  lineHeight: "clamp(34px, 3.3vw + 12px, 68px)",
                  letterSpacing: "0%",
                }}
              >
                {titleWhite}
              </span>
              <span
                className="block bg-clip-text font-bold text-transparent"
                style={{
                  fontSize: "clamp(32px, 2.9vw + 12px, 60px)",
                  lineHeight: "clamp(34px, 3.3vw + 12px, 68px)",
                  letterSpacing: "0%",
                  backgroundImage: "linear-gradient(90deg, #E51B24 0%, #690106 100%)",
                }}
              >
                {titleRed}
              </span>
            </h2>
          </div>

          <p
            data-partnership-intro
            className="border-l-2 border-[#E51B24] pl-4 font-space-grotesk font-light text-white/70 lg:max-w-[340px] lg:text-left"
            style={{
              fontSize: "clamp(14px, 0.4vw + 12px, 16px)",
              lineHeight: "clamp(19px, 0.5vw + 15px, 22px)",
              letterSpacing: "0%",
            }}
          >
            {description}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
          {partnershipPrograms.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnershipProgramsSection;