import { Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import SectionEyebrow from "./SectionEyebrow";
import { manufacturingProcess } from "@/features/home/data/manufacturingProcess";
import { gsap, motion as gsapMotion, revealLeft, revealVisible, useGSAP } from "@/shared/animations";
import { usePrefersReducedMotion } from "@/shared/hooks/usePrefersReducedMotion";

const ManufacturingProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { eyebrow, titleTop, titleBottom, description, image, videoUrl } =
    manufacturingProcess;

  const handlePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.ended) {
        videoRef.current.currentTime = 0;
      }
      void videoRef.current.play();
      setHasStarted(true);
    }
  };

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
      <div className="mx-auto w-full max-w-[1440px] px-6  pt-16 sm:px-10 sm:pt-20 lg:px-[68px] lg:pb-12 lg:pt-24">
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

      {/* Video block */}

<div className="mx-auto w-full max-w-[1440px] px-6 pb-16 sm:px-10 sm:pb-20 lg:px-[68px] lg:pb-24">
  <div className="relative aspect-video w-full overflow-hidden rounded-md bg-black">
    {videoUrl && (
      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls
        className="h-full w-full object-contain"
      />
    )}
  </div>
</div>


    </section>
  );
};

export default ManufacturingProcessSection;