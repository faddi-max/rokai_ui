import { useRef } from "react";
import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import type { ManufactureProduct } from "@/features/home/data/manufactureProducts";
import AnimatedArrow from "@/shared/components/ui/AnimatedArrow";

interface ProductSliderProps {
  products: ManufactureProduct[];
}

const ProductSlider = ({ products }: ProductSliderProps) => {
  const trackRef = useRef<HTMLDivElement>(null);

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
    <div className="relative flex flex-wrap justify-center gap-3 sm:flex-nowrap sm:items-center sm:gap-6 lg:gap-10">
      <button
        type="button"
        onClick={() => scrollByAmount("prev")}
        aria-label="Previous product"
        className="order-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105 sm:order-none sm:h-12 sm:w-12"
      >
        <AnimatedArrow icon={ArrowUpLeft} className="h-5 w-5" />
      </button>

      <div
        ref={trackRef}
        className="order-1 flex w-full min-w-0 snap-x snap-mandatory items-center gap-5 overflow-x-auto scroll-smooth py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] sm:order-none sm:w-auto sm:flex-1 sm:gap-8 lg:gap-10"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex h-[150px] w-[min(72vw,230px)] shrink-0 snap-center items-center justify-center sm:h-[175px] sm:w-[clamp(220px,22vw,263px)]"
          >
            <img
              src={product.image}
              alt={product.alt}
              className="h-full w-full object-contain"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollByAmount("next")}
        aria-label="Next product"
        className="order-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105 sm:order-none sm:h-12 sm:w-12"
      >
        <AnimatedArrow icon={ArrowUpRight} className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ProductSlider;
