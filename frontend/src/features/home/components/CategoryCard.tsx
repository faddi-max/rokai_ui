import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/features/home/data/categories";
import Button from "@/shared/components/ui/Button";

type CategoryCardProps = {
  category: Category;
};

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="flex flex-col items-center gap-6 rounded-2xl bg-white p-5 sm:flex-row sm:gap-8 sm:p-8">
      <img
        src={category.image}
        alt={category.title}
        className="h-[280px] w-full max-w-[220px] shrink-0 rounded-xl object-contain sm:h-[320px] sm:w-[220px]"
      />

      <div className="flex flex-col gap-4">
        <h3
          className="bg-clip-text font-space-grotesk text-[clamp(2rem,9vw,2.5rem)] font-medium leading-[1.15] text-transparent"
          style={{ backgroundImage: "linear-gradient(90deg, #E51B24 0%, #690106 100%)" }}
        >
          {category.title}
        </h3>

        <p className="font-space-grotesk text-[clamp(1rem,4.5vw,1.25rem)] font-light leading-[1.35] text-black/70 capitalize">
          {category.description}
        </p>

        <Button
          href={category.buttonHref}
          variant="dark"
          icon={ArrowUpRight}
          weight="medium"
          size="15px"
          className="w-fit px-5 h-[44px]"
        >
          {category.buttonLabel}
        </Button>
      </div>
    </div>
  );
}
