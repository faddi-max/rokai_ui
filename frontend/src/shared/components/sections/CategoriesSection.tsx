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
  "flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

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
      className="relative bg-black overflow-hidden py-20 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(150,15,20,0.3),transparent_60%)]"
      />

      <div className="relative max-w-[1512px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <p className="font-space-grotesk text-[17px] font-light leading-[30px] uppercase tracking-[0.15em] text-white">
                {eyebrow}
              </p>
              <span aria-hidden="true" className="h-px w-16 bg-[#E51B24]" />
            </div>

            <h2
              id={headingId}
              className="font-space-grotesk text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.05] uppercase"
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

          <div className="flex items-start gap-4 max-w-sm lg:pt-2">
            <span aria-hidden="true" className=" h-8 w-[2px] shrink-0 bg-[#E51B24]" />
            <p className="font-space-grotesk text-[17px] font-light leading-[30px] tracking-[0%] text-white/80">
              {description}
            </p>
          </div>
        </div>

      
        <ul
          ref={trackRef}
          role="list"
          className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] lg:gap-8 [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((category, index) => (
            <li
              key={category.id}
              className="h-full w-[85vw] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-2rem)/2)]"
            >
              <CategoryCard category={category} index={index} />
            </li>
          ))}
        </ul>

        {
      showNav && categories.length > 2 && (
  <div className="mt-14 flex items-center justify-center gap-4">
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