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
  const { eyebrow, titleTop, titleBottom, image, videoUrl } =
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
    <section ref={sectionRef} className="w-full bg-black">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-16 sm:px-10 md:py-20 lg:px-[34px] lg:py-24">
        <div data-manufacturing-text className="mb-6 sm:mb-8">
          <SectionEyebrow label={eyebrow} />
        </div>

        <h2 data-manufacturing-text className="mb-8 font-space-grotesk text-white sm:mb-10 lg:mb-12">
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

        <motion.button
          type="button"
          onClick={() => videoUrl && window.open(videoUrl, "_blank")}
          whileHover="hover"
          initial="rest"
          animate="rest"
          className="group relative aspect-[16/9] w-full overflow-hidden text-left outline-none focus-visible:ring-2 focus-visible:ring-[#E51B24] lg:h-[657px] lg:aspect-auto"
        >
          <motion.img
            src={image}
            alt={`${titleTop} ${titleBottom}`}
            variants={{ rest: { scale: 1 }, hover: { scale: 1.03 } }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />

          <motion.span
            variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#E51B24] shadow-[0_8px_24px_rgba(229,27,36,0.45)] sm:h-[72px] sm:w-[72px]"
          >
            <Play className="ml-0.5 h-6 w-6 fill-white text-white sm:h-7 sm:w-7" />
          </motion.span>
        </motion.button>
      </div>
    </section>
  );
};

export default ManufacturingProcessSection;
