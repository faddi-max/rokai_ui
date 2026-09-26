import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/features/home/data/categories";
import { gsap, motion } from "@/shared/animations";
import Button from "@/shared/components/ui/Button";
import { catagoriespage1 } from "@/assets";

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
    <article className="flex h-full flex-col gap-4 rounded-2xl border border-white/5 bg-[#0d0808] p-5 sm:gap-6 sm:p-6 lg:flex-row lg:items-center lg:gap-8 xl:p-8">
      <div className="mx-auto h-56 w-full max-w-[180px] shrink-0 sm:h-64 sm:max-w-[200px] lg:mx-0 lg:h-[300px] lg:w-[200px]">
        <img
          src={category.image || catagoriespage1}
          alt={category.imageAlt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = catagoriespage1;
          }}
          onMouseEnter={(event) => animateModel(event.currentTarget, 1.04)}
          onMouseLeave={(event) => animateModel(event.currentTarget, 1)}
        />
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <span
          aria-hidden="true"
          className="font-space-grotesk text-sm font-medium text-[#E51B24]"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <h3
          className="bg-clip-text font-space-grotesk text-3xl font-medium leading-tight text-transparent sm:text-4xl"
          style={{ backgroundImage: "linear-gradient(90deg, #E51B24 0%, #690106 100%)" }}
        >
          {category.title}
        </h3>

        <p className="max-w-md font-space-grotesk text-sm font-light leading-6 text-white/60 sm:text-[15px] sm:leading-[26px]">
          {category.description}
        </p>

        <Button
          href={category.buttonHref}
          variant="dark"
          icon={ArrowUpRight}
          weight="bold"
          size="15px"
          className="mt-2 h-[46px] w-fit rounded-lg !bg-[#E51B24] px-5 text-white hover:!bg-[#c9161f]"
        >
          {category.buttonLabel}
          
          <span className="sr-only">: {category.title}</span>
        </Button>
      </div>
    </article>
  );
}