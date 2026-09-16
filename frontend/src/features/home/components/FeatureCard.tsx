import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import type { FeatureItem } from "@/features/home/data/engineeredBenchmark";
import { gsap, motion, useGSAP } from "@/shared/animations";
import AnimatedArrow from "@/shared/components/ui/AnimatedArrow";
import { usePrefersReducedMotion } from "@/shared/hooks/usePrefersReducedMotion";

interface FeatureCardProps {
  feature: FeatureItem;
}

const FeatureCard = ({ feature }: FeatureCardProps) => {
  const cardRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { image, title, description, ctaText, ctaHref } = feature;

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.set("[data-feature-copy]", { autoAlpha: 0, y: 12 });
    },
    { scope: cardRef, dependencies: [prefersReducedMotion], revertOnUpdate: true }
  );

  const animateFeatureCopy = (visible: boolean) => {
    if (prefersReducedMotion) return;

    const copy = cardRef.current?.querySelectorAll("[data-feature-copy]");
    if (!copy) return;

    gsap.to(copy, {
      autoAlpha: visible ? 1 : 0,
      y: visible ? 0 : 12,
      duration: motion.duration.normal,
      ease: motion.ease.enter,
      stagger: motion.stagger,
    });
  };

  return (
    <article
      ref={cardRef}
      className="mx-auto flex h-[clamp(500px,40vw,621px)] w-full max-w-[326px] min-w-0 flex-col overflow-hidden"
      onMouseEnter={() => animateFeatureCopy(true)}
      onMouseLeave={() => animateFeatureCopy(false)}
    >
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover" />

        <div className="absolute inset-0 bg-gray-500/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 flex min-w-0 flex-col gap-2 p-4 sm:p-6">
          <h3
            data-feature-copy
            className="font-space-grotesk font-bold text-white"
            style={{
              fontSize: "clamp(22px, 0.8vw + 18px, 30px)",
              lineHeight: "clamp(26px, 0.8vw + 21px, 35px)",
              letterSpacing: "0%",
            }}
          >
            {title}
          </h3>

          <p
            data-feature-copy
            className="font-space-grotesk font-light text-white/80"
            style={{
              fontSize: "clamp(15px, 0.35vw + 13px, 18px)",
              lineHeight: "clamp(19px, 0.4vw + 16px, 23px)",
              letterSpacing: "0%",
            }}
          >
            {description}
          </p>
        </div>
      </div>

      <a
        href={ctaHref}
        className="flex min-h-[68px] items-center justify-between gap-3 bg-[#E51B24] px-4 py-3.5 text-white transition-colors hover:bg-[#c9161e] sm:px-6"
      >
        <span className="min-w-0 flex-1 break-words font-space-grotesk text-[14px] font-light leading-[18px] sm:text-[16px] sm:leading-[20px]">
          {ctaText}
        </span>
        <AnimatedArrow icon={ArrowUpRight} className="h-5 w-5 shrink-0" />
      </a>
    </article>
  );
};

export default FeatureCard;
