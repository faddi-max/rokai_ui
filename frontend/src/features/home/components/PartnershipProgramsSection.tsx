import { useRef } from "react";
import ProgramCard from "./ProgramCard";
import {
  partnershipPrograms,
  partnershipProgramsHeading,
} from "@/features/home/data/partnershipPrograms";
import { gsap, motion, useGSAP } from "@/shared/animations";
import { usePrefersReducedMotion } from "@/shared/hooks/usePrefersReducedMotion";

const PartnershipProgramsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { titleTop, titleBottomLines, description } = partnershipProgramsHeading;

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
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(150,15,20,0.3),transparent_60%)]" />

      <div className="relative mx-auto w-full max-w-[1512px] px-6 py-16 sm:px-10 md:py-20 lg:px-20 lg:py-24">
        <div className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-start lg:justify-between">
          <h2 data-partnership-intro className="font-space-grotesk text-white">
            <span
              className="block font-bold"
              style={{
                fontSize: "clamp(32px, 2.9vw + 12px, 60px)",
                lineHeight: "clamp(34px, 3.3vw + 12px, 68px)",
                letterSpacing: "0%",
              }}
            >
              {titleTop}
            </span>
            {titleBottomLines.map((line) => (
              <span
                key={line}
                className="block bg-clip-text font-light text-transparent"
                style={{
                  fontSize: "clamp(30px, 2.9vw + 12px, 60px)",
                  lineHeight: "clamp(30px, 2.9vw + 12px, 60px)",
                  letterSpacing: "0%",
                  backgroundImage:
                    "linear-gradient(90deg, #E51B24 0%, #690106 100%)",
                }}
              >
                {line}
              </span>
            ))}
          </h2>

          <p
            data-partnership-intro
            className="font-space-grotesk font-light text-white lg:max-w-[420px] lg:text-left"
            style={{
              fontSize: "clamp(16px, 0.5vw + 14px, 20px)",
              lineHeight: "clamp(21px, 0.6vw + 17px, 25px)",
              letterSpacing: "0%",
            }}
          >
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {partnershipPrograms.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnershipProgramsSection;
