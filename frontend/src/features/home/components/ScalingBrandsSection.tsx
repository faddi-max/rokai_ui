import { Play, ArrowUpRight } from "lucide-react";
import { scalingBrands } from "@/features/home/data/scalingBrands";
import Button from "@/shared/components/ui/Button";

export default function ScalingBrands() {
  return (
    <section className="relative bg-black overflow-hidden py-20 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(150,15,20,0.3),transparent_60%)]" />

      <div className="relative max-w-[1512px] mx-auto px-6 md:px-10 lg:px-16 grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src={scalingBrands.videoThumbnail}
            alt="Rokai BJJ team"
            className="h-[360px] w-full object-cover object-top opacity-100 rotate-0 sm:h-[420px] lg:h-[500px] lg:w-[704px]"
          />
          <a
            href={scalingBrands.videoUrl}
            aria-label="Play video"
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="w-16 h-16 rounded-full bg-[#E51B24] flex items-center justify-center hover:opacity-90 transition-opacity">
              <Play size={22} className="text-white fill-white ml-1" />
            </span>
          </a>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="font-space-grotesk text-[clamp(2rem,9vw,4.375rem)] font-bold leading-[1.02] text-white lg:leading-[68px]">
            {scalingBrands.headingLine1}
            <br />
            {scalingBrands.headingLine2}
            <br />
            <span
              className="bg-clip-text text-[clamp(1.875rem,8vw,3.75rem)] font-light leading-[1.02] text-transparent uppercase lg:leading-[51px]"
              style={{ backgroundImage: "linear-gradient(90deg, #E51B24 0%, #690106 100%)" }}
            >
              {scalingBrands.headingHighlight}
            </span>
          </h2>

          <p className="max-w-xl font-space-grotesk text-[clamp(1rem,4.5vw,1.25rem)] font-light leading-[1.35] text-white/80 capitalize">
            {scalingBrands.description}
          </p>

          <Button
            href={scalingBrands.ctaHref}
            variant="primary"
            icon={ArrowUpRight}
            weight="medium"
            size="20px"
            className="w-fit px-6 h-[56px]"
          >
            {scalingBrands.ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
