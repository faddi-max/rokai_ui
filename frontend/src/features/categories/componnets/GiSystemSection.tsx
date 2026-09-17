import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { gsap, motion, revealLeft, revealRight, revealUp, revealVisible, useGSAP } from "@/shared/animations";
import { usePrefersReducedMotion } from "@/shared/hooks/usePrefersReducedMotion";
import { giSystemsData } from "../data/giSystems.data";
import type { GiSystemCard, GiSystemsData } from "../data/giSystems.data";

interface GiSystemSectionProps {
  data?: GiSystemsData;
}

export default function GiSystemSection({
  data = giSystemsData,
}: GiSystemSectionProps) {
  const { eyebrow, headingLine1, headingLine2, sideDescription, cards } = data;

  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      gsap.timeline()
        .fromTo("[data-gisys-eyebrow]", revealLeft(), revealVisible)
        .fromTo("[data-gisys-heading]", revealLeft(), revealVisible, "-=0.2")
        .fromTo("[data-gisys-description]", revealRight(), revealVisible, "-=0.55")
        .fromTo("[data-gisys-card]", revealUp(32), { ...revealVisible, stagger: motion.stagger }, "-=0.2");
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion], revertOnUpdate: true }
  );

  return (
    <section ref={sectionRef} className="bg-black font-space-grotesk">
      <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-10 sm:py-16 md:py-20 lg:py-[70px] lg:pl-[49px] lg:pr-[72px]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-[61px]">
          <div className="flex flex-col">
            <div data-gisys-eyebrow className="mb-5 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <span className="whitespace-nowrap text-[12px] font-normal leading-[18px] text-white/70 sm:text-[13px] sm:leading-[20px]">
                {eyebrow}
              </span>
              <span aria-hidden="true" className="h-[1px] w-10 shrink-0 bg-[#E51B24] sm:w-12" />
            </div>

            <h2 data-gisys-heading className="uppercase">
              <span className="block text-[32px] font-bold leading-[1.1] text-white sm:text-[40px] md:text-[48px] lg:text-[52px] lg:leading-[1.1]">
                {headingLine1}
              </span>
              <span className="block bg-gradient-to-r from-[#E51B24] to-[#690106] bg-clip-text text-[32px] font-bold leading-[1.1] text-transparent sm:text-[40px] md:text-[48px] lg:text-[52px] lg:leading-[1.1]">
                {headingLine2}
              </span>
            </h2>
          </div>
          <div data-gisys-description className="flex max-w-full gap-2 sm:max-w-[320px] lg:ml-auto lg:max-w-[300px]">
            <span
              aria-hidden="true"
              className="w-[1px] h-10 mt-5 mx-2 shrink-0 self-stretch bg-[#E51B24]"
            />
            <p className="text-left text-[13px] font-light leading-[19px] tracking-normal text-white/75 sm:text-[14px] sm:leading-[20px]">
              {sideDescription}
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-14 sm:grid-cols-2 lg:mt-16 lg:gap-8">
          {cards.map((card) => (
            <GiSystemCardItem key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GiSystemCardItem({ card }: { card: GiSystemCard }) {
  return (
    <div
      data-gisys-card
      className="group relative aspect-[656/749] w-full rounded-[14px] bg-white p-3 transition-transform duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/50"
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-[11px] bg-black">
        <div className="relative aspect-[638/392] w-full shrink-0 overflow-hidden rounded-[14px]">
          <img
            src={card.image}
            alt={card.imageAlt}
            className="absolute inset-0 h-full w-full scale-100 object-cover transition-transform duration-700 ease-out group-hover:scale-125"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-[14px] bg-[#0000006E] opacity-0 transition-opacity duration-500 ease-out opacity-100"
          />
        </div>

        <div className="flex flex-1 flex-col px-6 pb-6 pt-5 sm:px-7 sm:pt-6">
          <span aria-hidden="true" className="mb-3 block h-px w-10 bg-red-300" />

          <h3 className="text-[26px] font-bold uppercase leading-[1] sm:text-[30px] lg:text-[35px] lg:leading-[35px]">
            <span className="bg-gradient-to-r from-[#E51B24] to-[#690106] bg-clip-text text-transparent">
              {card.titleHighlight}
            </span>{" "}
            <span className="text-white">{card.titleRest}</span>
          </h3>

          <p className="mt-3 text-[14px] font-light leading-[20px] text-white/70 sm:text-[15px]">
            {card.description}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-6">
            <div>
              <span className="block text-[11px] font-semibold uppercase tracking-wide text-white/40">
                Designed For
              </span>
              <ul className="mt-3 space-y-1.5">
                {card.designedFor.map((item) => (
                  <li key={item} className="text-[13px] leading-[18px] text-white/70">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="block text-[11px] font-semibold uppercase tracking-wide text-white/40">
                Key Features
              </span>
              <ul className="mt-3 space-y-1.5">
                {card.keyFeatures.map((item) => (
                  <li key={item} className="text-[13px] leading-[18px] text-white/70">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-auto flex items-end justify-between gap-4 pt-8">
            <a
              href={card.ctaHref}
              className="group/btn inline-flex items-center gap-2 rounded-md bg-[#E51B24] px-5 py-3 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-[#c8151d]"
            >
              {card.ctaLabel}
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 ease-out group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                strokeWidth={2.5}
              />
            </a>
            <div className="flex flex-col items-end gap-2">
              <span className="whitespace-nowrap text-[11px] font-medium uppercase tracking-wide text-white/50">
                {card.tag}
              </span>
              <span aria-hidden="true" className="h-px w-8 bg-red-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}