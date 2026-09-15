import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { categories } from "@/features/home/data/categories";
import CategoryCard from "./CategoryCard";

export default function CategoriesSection() {
  return (
    <section className="relative bg-black overflow-hidden py-20 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(150,15,20,0.35),transparent_60%)]" />

      <div className="relative max-w-[1512px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div>
            <h2 className="font-space-grotesk text-[clamp(2rem,9vw,4.375rem)] font-bold leading-[1.02] uppercase lg:leading-[68px]">
              <span className="text-white block">BJJ Apparel</span>
              <span
                className="block bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, #E51B24 0%, #690106 100%)" }}
              >
                Categories
              </span>
            </h2>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button
              aria-label="Previous category"
              className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-black hover:opacity-80 transition-opacity"
            >
              <ArrowUpLeft size={20} strokeWidth={2.5} />
            </button>
            <button
              aria-label="Next category"
              className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-black hover:opacity-80 transition-opacity"
            >
              <ArrowUpRight size={20} strokeWidth={2.5} />
            </button>
          </div>

          <p className="max-w-sm font-space-grotesk text-[clamp(1rem,4.5vw,1.25rem)] font-light leading-[1.35] text-white/80">
            Explore our full range of BJJ gear from custom Gis to no-gi essentials, all built for
            performance, durability, and your brand identity.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
