import { useRef } from "react";
import type { ComponentProps } from "react";
import type { LucideIcon } from "lucide-react";
import { gsap, motion } from "@/shared/animations";

type AnimatedArrowProps = ComponentProps<LucideIcon> & {
  icon: LucideIcon;
};

/** Rotates an upper-direction Lucide arrow to horizontal while hovered. */
export default function AnimatedArrow({ icon: Icon, ...props }: AnimatedArrowProps) {
  const iconRef = useRef<SVGSVGElement>(null);

  const rotate = (rotation: number) => {
    if (!iconRef.current) return;

    gsap.to(iconRef.current, {
      rotation,
      duration: motion.duration.hover,
      ease: motion.ease.hover,
    });
  };

  return (
    <Icon
      ref={iconRef}
    {...props}
      onMouseEnter={() => rotate(motion.rotation.iconHover)}
      onMouseLeave={() => rotate(0)}
    />
  );
}
