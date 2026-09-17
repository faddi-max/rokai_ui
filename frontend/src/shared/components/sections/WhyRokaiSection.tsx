import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap, motion, revealLeft, revealRight, revealUp, revealVisible, useGSAP } from "@/shared/animations";
import AnimatedArrow from "@/shared/components/ui/AnimatedArrow";
import { usePrefersReducedMotion } from "@/shared/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);
import { whyRokaiData } from "../../../features/categories/data/whyRokai.data";
import type {
  WhyRokaiData,
  WhyRokaiFeature,
} from "../../../features/categories/data/whyRokai.data";

interface WhyRokaiSectionProps {
  data?: WhyRokaiData;
}

export default function WhyRokaiSection({
  data = whyRokaiData,
}: WhyRokaiSectionProps) {
  const { eyebrow, headingLine1, headingLine2, sideDescription, features, cta, image } =
    data;

  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const animateArrow = (target: HTMLElement, scale: number) => {
    const arrow = target.querySelector("[data-cta-arrow]");
    if (arrow) {
      gsap.to(arrow, {
        scale,
        duration: motion.duration.hover,
        ease: motion.ease.hover,
      });
    }
  };

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      })
        .fromTo("[data-why-eyebrow]", revealLeft(), revealVisible)
        .fromTo("[data-why-heading]", revealLeft(), revealVisible, "-=0.2")
        .fromTo("[data-why-feature]", revealUp(24), { ...revealVisible, stagger: motion.stagger }, "-=0.15")
        .fromTo("[data-why-cta]", revealUp(16), revealVisible, "-=0.1")
        .fromTo("[data-why-description]", revealRight(), revealVisible, "-=0.55")
        .fromTo("[data-why-visual]", revealRight(), revealVisible, "-=0.3");
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion], revertOnUpdate: true }
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black font-space-grotesk">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(150,15,20,0.35),transparent_60%)]" />

      <div className="relative mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-20 lg:py-[70px] lg:pl-[49px] lg:pr-[72px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-[61px]">
          <div className="flex flex-col">
            <div data-why-eyebrow className="mb-6 flex flex-wrap items-center gap-4 sm:mb-8">
              <span className="text-[15px] font-light leading-[26px] text-white sm:whitespace-nowrap sm:text-[17px] sm:leading-[30px]">
                {eyebrow}
              </span>
              <span
                aria-hidden="true"
                className="h-[2px] w-12 shrink-0 bg-[#E51B24] sm:w-16"
              />
            </div>

            <h2 data-why-heading className="uppercase">
              <span className="block text-[32px] font-bold leading-[1.15] text-white sm:text-[52px] sm:leading-[62px] lg:text-[63px] lg:leading-[76px]">
                {headingLine1}
              </span>
              <span className="block bg-gradient-to-r from-[#E51B24] to-[#690106] bg-clip-text text-[28px] font-medium leading-[1.15] text-transparent sm:text-[46px] sm:leading-[54px] lg:text-[56px] lg:leading-[60px]">
                {headingLine2}
              </span>
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-16 sm:grid-cols-3 sm:gap-6 lg:gap-8">
              {features.map((feature) => (
                <FeatureItem key={feature.number} feature={feature} />
              ))}
            </div>

            <div data-why-cta className="mt-12 sm:mt-14">
              <a
                href={cta.href}
                className="inline-flex items-center gap-2 rounded-md bg-[#E51B24] px-6 py-3.5 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-[#c8151d] sm:text-[15px]"
                onMouseEnter={(event) => animateArrow(event.currentTarget, 1.2)}
                onMouseLeave={(event) => animateArrow(event.currentTarget, 1)}
              >
                {cta.label}
                <AnimatedArrow icon={ArrowUpRight} data-cta-arrow size={16} strokeWidth={2.5} />
              </a>
            </div>
          </div>

          <div className="flex flex-col">
            <div data-why-description className="mb-6 flex max-w-full gap-2 sm:mb-8 sm:max-w-[320px] lg:ml-auto lg:max-w-[300px]">
              <span
                aria-hidden="true"
                className="w-[1px] shrink-0 self-stretch bg-[#E51B24]"
              />
              <p className="text-left text-[13px] font-light leading-[22px] tracking-normal text-white/75 sm:text-[14px] sm:leading-[25px]">
                {sideDescription}
              </p>
            </div>

            <div
              data-why-visual
              className="relative mx-auto aspect-[730/557] w-full max-w-[730px] overflow-hidden rounded-2xl transition-transform duration-500 ease-out hover:scale-[1.01]"
            >
              <img
                src={image.src}
                alt="Rokai BJJ team"
                className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 ease-out"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[#00000070]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureItem({ feature }: { feature: WhyRokaiFeature }) {
  return (
    <div data-why-feature className="flex flex-col">
      <span className="mb-2 text-[34px] font-light leading-none text-white/30 sm:text-[40px] lg:text-[44px]">
        {feature.number}
      </span>
      <span aria-hidden="true" className="mb-4 block h-px w-10 bg-red-500" />
      <h3 className="mb-1.5 text-[16px] font-bold uppercase leading-[20px] text-white sm:text-[18px]">
        {feature.title}
      </h3>
      <p className="text-[13px] font-normal leading-[19px] text-[#B7B7BA] sm:text-[14px] sm:leading-[20px]">
        {feature.description}
      </p>
    </div>
  );
}