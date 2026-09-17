import { useRef } from "react";
import { gsap, motion, revealLeft, revealRight, revealUp, revealVisible, useGSAP } from "@/shared/animations";
import { usePrefersReducedMotion } from "@/shared/hooks/usePrefersReducedMotion";
import {
  problemSolversChecklist,
  problemSolversHeading,
  herocatagory,
} from "@/features/home/data/problemSolvers";

const ProblemSolversSection = () => {
  const { eyebrow, titleTop, titleBottom, description } = problemSolversHeading;
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const animateImage = (target: HTMLImageElement, scale: number) => {
    gsap.to(target, {
      scale,
      duration: motion.duration.hover,
      ease: motion.ease.hover,
    });
  };

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      gsap.timeline()
        .fromTo("[data-problem-eyebrow]", revealLeft(), revealVisible)
        .fromTo("[data-problem-heading]", revealLeft(), revealVisible, "-=0.2")
        .fromTo("[data-problem-description]", revealRight(), revealVisible, "-=0.55")
        .fromTo("[data-problem-item]", revealUp(24), { ...revealVisible, stagger: motion.stagger }, "-=0.2")
        .fromTo("[data-problem-visual]", revealRight(), revealVisible, "-=0.5");
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion], revertOnUpdate: true }
  );

  return (
    <section ref={sectionRef} className="w-full bg-black">
      <div className="mx-auto w-full max-w-[1512px] px-5 py-14 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-20 lg:py-24">
        <div className="mb-10 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div data-problem-eyebrow className="mb-4 flex items-center gap-3">
              <span className="font-space-grotesk text-[15px] font-light leading-[26px] tracking-[0%] text-white sm:text-[17px] sm:leading-[30px]">
                {eyebrow}
              </span>
              <span className="h-px w-10 shrink-0 bg-[#E51B24] sm:w-14" />
            </div>

            <h2 data-problem-heading className="font-space-grotesk text-white">
              <span
                className="block font-bold"
                style={{
                  fontSize: "clamp(28px, 2.9vw + 12px, 60px)",
                  lineHeight: "clamp(30px, 3.3vw + 12px, 68px)",
                  letterSpacing: "0%",
                }}
              >
                {titleTop}
              </span>
              <span
                className="block bg-clip-text font-bold text-transparent"
                style={{
                  fontSize: "clamp(28px, 2.9vw + 12px, 60px)",
                  lineHeight: "clamp(30px, 3.3vw + 12px, 68px)",
                  letterSpacing: "0%",
                  backgroundImage: "linear-gradient(90deg, #E51B24 0%, #690106 100%)",
                }}
              >
                {titleBottom}
              </span>
            </h2>
          </div>

          <div data-problem-description className="flex max-w-sm items-start gap-4 lg:pt-2">
            <span className="mt-1.5 h-8 w-[2px] shrink-0 bg-[#E51B24] sm:mt-5" />
            <p className="font-space-grotesk text-[15px] font-light leading-[24px] tracking-[0%] text-white/80 sm:text-[17px] sm:leading-[30px]">
              {description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-16">
          <ul className="flex flex-col gap-1">
            {problemSolversChecklist.map((item) => (
              <li key={item} data-problem-item className="flex items-start gap-3">
                <span className="mt-[14px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#E51B24] sm:mt-[22px]" />
                <span className="font-space-grotesk text-[16px] font-light leading-[28px] tracking-[0%] text-white/80 sm:text-[18px] sm:leading-[50px]">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <div
            data-problem-visual
            className="relative mx-auto aspect-[560/420] w-full max-w-[560px] overflow-hidden rounded-xl lg:aspect-auto lg:h-full"
          >
            <img
              src={herocatagory}
              alt="Rokai manufacturing quality control"
              className="h-full min-h-full w-full rounded-xl object-cover"
              onMouseEnter={(event) => animateImage(event.currentTarget, 1.04)}
              onMouseLeave={(event) => animateImage(event.currentTarget, 1)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolversSection;