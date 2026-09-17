import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/features/home/data/categories";
import { gsap, motion } from "@/shared/animations";
import Button from "@/shared/components/ui/Button";

type CategoryCardProps = {
  category: Category;
  index: number;
};

export default function CategoryCard({ category, index }: CategoryCardProps) {
  const animateModel = (target: HTMLImageElement, scale: number) => {
    gsap.to(target, {
      scale,
      duration: motion.duration.hover,
      ease: motion.ease.hover,
    });
  };

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-white/5 bg-[#0d0808] p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8">
      <div className="mx-auto h-[280px] w-full max-w-[200px] shrink-0 sm:mx-0 sm:h-[320px] sm:w-[200px]">
        <img
          src={category.image}
          alt={category.title}
          className="h-full w-full object-contain"
          onMouseEnter={(event) => animateModel(event.currentTarget, 1.04)}
          onMouseLeave={(event) => animateModel(event.currentTarget, 1)}
        />
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <span className="font-space-grotesk text-sm font-medium text-[#E51B24]">
          {String(index + 1).padStart(2, "0")}
        </span>

        <h3
          className="bg-clip-text font-space-grotesk text-[40px] font-medium leading-[51px] tracking-[0%] text-transparent"
          style={{ backgroundImage: "linear-gradient(90deg, #E51B24 0%, #690106 100%)" }}
        >
          {category.title}
        </h3>

        <p className="max-w-md font-space-grotesk text-[15px] font-light leading-[26px] text-white/60">
          {category.description}
        </p>

        <Button
          href={category.buttonHref}
          variant="dark"
          icon={ArrowUpRight}
          weight="semibold"
          size="15px"
          className="mt-2 h-[46px] w-fit rounded-lg !bg-[#E51B24] px-5 text-white hover:!bg-[#c9161f]"
        >
          {category.buttonLabel}
        </Button>
      </div>
    </div>
  );
}