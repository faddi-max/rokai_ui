import { useId, useRef } from "react";
import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
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

const arrowButtonClass =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-14 sm:w-14";

export default function CategoriesSection({
  eyebrow,
  headingLine1,
  headingLine2,
  description,
  categories,
  showNav = true,
}: CategoriesSectionProps) {
  const headingId = useId();
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollByAmount = (direction: "prev" | "next") => {
    const track = trackRef.current;
    if (!track) return;
    const amount = track.clientWidth * 0.6;
    track.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      aria-labelledby={headingId}
      className="relative overflow-hidden bg-black py-14 sm:py-20 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(150,15,20,0.3),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-[1512px] px-4 sm:px-6 md:px-10 lg:px-16">
        <div className="mb-10 flex flex-col justify-between gap-8 sm:mb-16 sm:gap-10 lg:flex-row lg:items-start">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <p className="font-space-grotesk text-xs font-light leading-5 uppercase tracking-[0.15em] text-white sm:text-[17px] sm:leading-[30px]">
                {eyebrow}
              </p>
              <span aria-hidden="true" className="h-px w-8 shrink-0 bg-[#E51B24] sm:w-16" />
            </div>

            <h2
              id={headingId}
              className="font-space-grotesk text-3xl font-bold leading-[1.05] uppercase sm:text-4xl lg:text-5xl"
            >
              <span className="block text-white">{headingLine1}</span>
              <span
                className="block bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, #E51B24 0%, #690106 100%)" }}
              >
                {headingLine2}
              </span>
            </h2>
          </div>

          <div className="flex max-w-sm items-start gap-3 sm:gap-4 lg:pt-2">
            <span aria-hidden="true" className="h-8 w-[2px] shrink-0 bg-[#E51B24]" />
            <p className="font-space-grotesk text-sm font-light leading-6 text-white/80 sm:text-[17px] sm:leading-[30px]">
              {description}
            </p>
          </div>
        </div>

      
        <ul
          ref={trackRef}
          role="list"
          className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-6 lg:gap-8 [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((category, index) => (
            <li
              key={category.id}
              className="h-full w-[88vw] shrink-0 snap-start sm:w-[78vw] lg:w-[70vw] xl:w-[calc((100%-2rem)/2)]"
            >
              <CategoryCard category={category} index={index} />
            </li>
          ))}
        </ul>

        {
      showNav && categories.length > 2 && (
  <div className="mt-8 flex items-center justify-center gap-4 sm:mt-14">
    <button
      type="button"
      aria-label="Previous category"
      onClick={(e) => {
        scrollByAmount("prev");
        e.currentTarget.blur();
      }}
      className={arrowButtonClass}
    >
      <ArrowUpLeft size={20} strokeWidth={2.5} />
    </button>
    <button
      type="button"
      aria-label="Next category"
      onClick={(e) => {
        scrollByAmount("next");
        e.currentTarget.blur();
      }}
      className={arrowButtonClass}
    >
      <ArrowUpRight size={20} strokeWidth={2.5} />
    </button>
  </div>
)}
      </div>
    </section>
  );
}