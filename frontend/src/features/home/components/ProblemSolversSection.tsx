import { ArrowUpRight } from "lucide-react";
import AnimatedArrow from "@/shared/components/ui/AnimatedArrow";
import ChecklistItem from "./ChecklistItem";
import { gsap, motion } from "@/shared/animations";
import {
  problemSolversChecklist,
  problemSolversCta,
  problemSolversHeading,
  problemSolversImage,
} from "@/features/home/data/problemSolvers";

const ProblemSolversSection = () => {
  const { titleTop, titleBottom, description } = problemSolversHeading;

  const animateImage = (target: HTMLImageElement, scale: number) => {
    gsap.to(target, {
      scale,
      duration: motion.duration.hover,
      ease: motion.ease.hover,
    });
  };

  return (
    <section className="w-full bg-black">
      <div className="mx-auto w-full max-w-[1512px] px-6 py-16 sm:px-10 md:py-20 lg:px-20 lg:py-24">
        <div className="mb-10 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-start lg:justify-between">
          <h2 className="font-space-grotesk text-white">
            <span
              className="block font-bold"
              style={{
                fontSize: "clamp(32px, 2.9vw + 12px, 60px)",
                lineHeight: "clamp(34px, 3.3vw + 12px, 68px)",
                letterSpacing: "0%",
              }}
            >
              {titleTop}
            </span>
            <span
              className="block bg-clip-text font-light text-transparent"
              style={{
                fontSize: "clamp(30px, 2.9vw + 12px, 60px)",
                lineHeight: "clamp(30px, 2.9vw + 12px, 60px)",
                letterSpacing: "0%",
                backgroundImage: "linear-gradient(90deg, #E51B24 0%, #690106 100%)",
              }}
            >
              {titleBottom}
            </span>
          </h2>

          <p
            className="font-space-grotesk font-light text-white lg:max-w-[360px] lg:text-left"
            style={{
              fontSize: "clamp(16px, 0.5vw + 14px, 20px)",
              lineHeight: "clamp(21px, 0.6vw + 17px, 25px)",
              letterSpacing: "0%",
            }}
          >
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:items-stretch lg:gap-16">
          <div className="flex flex-col gap-8">
            <ul className="flex flex-col gap-4 sm:gap-5">
              {problemSolversChecklist.map((item) => (
                <ChecklistItem key={item} label={item} />
              ))}
            </ul>

            <a
              href={problemSolversCta.href}
              className="inline-flex w-fit items-center gap-2 rounded-md bg-[#E51B24] px-5 py-3 text-white transition-colors hover:bg-[#c9161e]"
            >
              <span className="font-space-grotesk text-[16px] font-light leading-[20px]">
                {problemSolversCta.text}
              </span>
              <AnimatedArrow icon={ArrowUpRight} className="h-4 w-4 shrink-0" />
            </a>
          </div>

          <div className="relative mx-auto aspect-[560/420] w-full max-w-[560px] overflow-hidden rounded-xl lg:aspect-auto lg:h-full">
            <img
              src={problemSolversImage}
              alt="Rokai combat sports manufacturing services"
              className="h-full min-h-full w-full rounded-xl object-cover"
              onMouseEnter={(event) => animateImage(event.currentTarget, 1.04)}
              onMouseLeave={(event) => animateImage(event.currentTarget, 1)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolversSection;
