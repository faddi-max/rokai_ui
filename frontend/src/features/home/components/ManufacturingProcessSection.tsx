import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";
import SectionEyebrow from "./SectionEyebrow";
import { manufacturingProcess } from "@/features/home/data/manufacturingProcess";
import { gsap, motion as gsapMotion, revealLeft, revealVisible, useGSAP } from "@/shared/animations";
import { usePrefersReducedMotion } from "@/shared/hooks/usePrefersReducedMotion";

const ManufacturingProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { eyebrow, titleTop, titleBottom, description, image, videoUrl } =
    manufacturingProcess;

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.set("[data-manufacturing-text]", revealLeft());

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;

          gsap.to("[data-manufacturing-text]", {
            ...revealVisible,
            stagger: gsapMotion.stagger,
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
    <section
      ref={sectionRef}
      className="w-full bg-black"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(105,1,6,0.35) 0%, rgba(0,0,0,0) 55%)",
      }}
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 pb-10 pt-16 sm:px-10 sm:pt-20 lg:px-[68px] lg:pb-12 lg:pt-24">
        {/* Header row: heading (left) + description (right) */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div data-manufacturing-text className="mb-6 sm:mb-8">
              <SectionEyebrow label={eyebrow} />
            </div>

            <h2 data-manufacturing-text className="font-space-grotesk text-white">
              <span
                className="block font-bold"
                style={{
                  fontSize: "clamp(36px, 3.4vw + 14px, 70px)",
                  lineHeight: "clamp(36px, 3.3vw + 12px, 68px)",
                  letterSpacing: "0%",
                }}
              >
                {titleTop}
              </span>
              <span
                className="mt-1 block bg-clip-text font-light text-transparent"
                style={{
                  fontSize: "clamp(30px, 2.9vw + 12px, 60px)",
                  lineHeight: "clamp(30px, 2.5vw + 10px, 51px)",
                  letterSpacing: "0%",
                  backgroundImage: "linear-gradient(90deg, #E51B24 0%, #690106 100%)",
                }}
              >
                {titleBottom}
              </span>
            </h2>
          </div>

          <div className="flex flex-col">
            <div
              data-why-description
              className="mb-6 flex max-w-full gap-2 sm:mb-8 sm:max-w-[320px] lg:ml-auto lg:max-w-[300px]"
            >
              <span
                aria-hidden="true"
                className="w-[1px] shrink-0 self-stretch bg-[#E51B24]"
              />
              <p className="text-left text-[13px] font-light leading-[22px] tracking-normal text-white/75 sm:text-[14px] sm:leading-[25px]">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Video / image block */}
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-[68px]">
        <motion.button
          type="button"
          onClick={() => videoUrl && window.open(videoUrl, "_blank")}
          whileHover="hover"
          initial="rest"
          animate="rest"
          className="group relative aspect-[16/9] w-full overflow-hidden text-left outline-none focus-visible:ring-2 focus-visible:ring-[#E51B24] md:aspect-auto md:h-[380px] lg:h-[480px]"
        >
          <motion.img
            src={image}
            alt={`${titleTop} ${titleBottom}`}
            variants={{ rest: { scale: 1 }, hover: { scale: 1.03 } }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)",
            }}
          />

          <motion.div
            variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E51B24] shadow-[0_8px_24px_rgba(229,27,36,0.45)] sm:h-[72px] sm:w-[72px]">
              <Play className="ml-0.5 h-6 w-6 fill-white text-white sm:h-7 sm:w-7" />
            </span>
            <span className="font-sans text-sm text-white/90 sm:text-base">
              Watch full Process
            </span>
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
};

export default ManufacturingProcessSection;