import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { gsap, motion } from "@/shared/animations";
import AnimatedArrow from "@/shared/components/ui/AnimatedArrow";
import CategoryCard from "./CategoryCard";
import type { Category } from "@/features/home/data/categories";

type CategoriesSectionProps = {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
  categories: Category[];
  showNav?: boolean;
};

export default function CategoriesSection({
  eyebrow,
  headingLine1,
  headingLine2,
  description,
  categories,
  showNav = true,
}: CategoriesSectionProps) {
  const animateArrow = (target: HTMLElement, scale: number) => {
    const arrow = target.querySelector("[data-category-arrow]");
    if (arrow) {
      gsap.to(arrow, {
        scale,
        duration: motion.duration.hover,
        ease: motion.ease.hover,
      });
    }
  };

  return (
    <section className="relative bg-black overflow-hidden py-20 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(150,15,20,0.35),transparent_60%)]" />

      <div className="relative max-w-[1512px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Eyebrow + heading | description */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-space-grotesk text-[17px] font-light leading-[30px] uppercase tracking-[0.15em] text-white">
                {eyebrow}
              </span>
              <span className="h-px w-16 bg-[#E51B24]" />
            </div>

            <h2 className="font-space-grotesk text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.05] uppercase">
              <span className="block text-white">{headingLine1}</span>
              <span
                className="block bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, #E51B24 0%, #690106 100%)" }}
              >
                {headingLine2}
              </span>
            </h2>
          </div>

          <div className="flex items-start gap-4 max-w-sm lg:pt-2">
            <span className="mt-1 h-6 w-[2px] shrink-0 bg-[#E51B24]" />
            <p className="font-space-grotesk text-[17px] font-light leading-[30px] tracking-[0%] text-white/80">
              {description}
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>

        {/* Bottom nav — only shown when showNav is true */}
        {showNav && (
          <div className="mt-14 flex items-center justify-center gap-4">
            <button
              aria-label="Previous category"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black transition-opacity hover:opacity-80"
              onMouseEnter={(event) => animateArrow(event.currentTarget, 1.2)}
              onMouseLeave={(event) => animateArrow(event.currentTarget, 1)}
            >
              <AnimatedArrow icon={ArrowUpLeft} data-category-arrow size={20} strokeWidth={2.5} />
            </button>
            <button
              aria-label="Next category"
             className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black transition-opacity hover:opacity-80"
              onMouseEnter={(event) => animateArrow(event.currentTarget, 1.2)}
              onMouseLeave={(event) => animateArrow(event.currentTarget, 1)}
            >
              <AnimatedArrow icon={ArrowUpRight} data-category-arrow size={20} strokeWidth={2.5} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}