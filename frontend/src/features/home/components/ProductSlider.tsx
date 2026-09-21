import { useRef } from "react";
import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import type { ManufactureProduct } from "@/features/home/data/manufactureProducts";
import AnimatedArrow from "@/shared/components/ui/AnimatedArrow";

interface ProductSliderProps {
  products: ManufactureProduct[];
}

const arrowButtonClass =
  "order-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:order-none sm:h-12 sm:w-12 lg:h-14 lg:w-14";

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
    <div className="relative flex flex-wrap justify-center gap-3 sm:flex-nowrap sm:items-center sm:gap-6 lg:gap-16">
      <button
        type="button"
        onClick={() => scrollByAmount("prev")}
        aria-label="Previous product"
        className={arrowButtonClass}
      >
        <AnimatedArrow icon={ArrowUpLeft} className="h-5 w-5" />
      </button>

      <div
        ref={trackRef}
        className="order-1 flex w-full min-w-0 snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] sm:order-none sm:w-auto sm:flex-1 sm:gap-6 lg:gap-8"
      >
        {products.map((product, index) => (
          <article
            key={product.id}
            className="relative flex aspect-[3/5] w-[min(72vw,260px)] shrink-0 snap-start flex-col overflow-hidden rounded-[16px] border border-white/10 bg-gradient-to-b from-[#2E2E2E] to-[#111111] p-5 sm:aspect-[268/504] sm:w-[calc((100%-1.5rem)/2)] md:w-[calc((100%-3rem)/3)] lg:w-[calc((100%-6rem)/4)] lg:p-6"
          >
            <span
              className="font-space-grotesk font-medium text-white/60"
              style={{ fontSize: "14px", lineHeight: "14px" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="relative min-h-0 flex-1">
              <img
                src={product.image}
                alt={product.alt}
                className="absolute inset-0 h-full w-full object-contain p-2"
              />
            </div>

            <div>
              <span
                aria-hidden
                className="mb-3 block h-[2px] w-10 bg-[#E51B24]"
              />
              <h3
                className="font-space-grotesk font-bold uppercase text-white"
                style={{
                  fontSize: "clamp(16px, 0.5vw + 11px, 20px)",
                  lineHeight: "1.1",
                  letterSpacing: "0",
                }}
              >
                {product.title}
              </h3>
              <p
                className="mt-2 font-space-grotesk font-light uppercase text-white/60"
                style={{
                  fontSize: "clamp(11px, 0.2vw + 9px, 12px)",
                  lineHeight: "1.4",
                  letterSpacing: "0.04em",
                }}
              >
                {product.tags.join(" / ")}
              </p>
            </div>
          </article>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollByAmount("next")}
        aria-label="Next product"
        className={arrowButtonClass}
      >
        <AnimatedArrow icon={ArrowUpRight} className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ProductSlider;