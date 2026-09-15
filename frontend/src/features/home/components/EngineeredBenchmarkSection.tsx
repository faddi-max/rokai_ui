import FeatureCard from "./FeatureCard";
import {
  engineeredBenchmarkFeatures,
  engineeredBenchmarkHeading,
} from "@/features/home/data/engineeredBenchmark";

const EngineeredBenchmarkSection = () => {
  const { titleTop, titleBottom, description } = engineeredBenchmarkHeading;

  return (
    <section className="w-full bg-black">
      <div className="mx-auto w-full max-w-[1512px] px-6 py-16 sm:px-10 md:py-20 lg:px-20 lg:py-24">
        <div className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-start lg:justify-between">
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
            className="font-space-grotesk font-light text-white lg:max-w-[420px] lg:text-left"
            style={{
              fontSize: "clamp(16px, 0.5vw + 14px, 20px)",
              lineHeight: "clamp(21px, 0.6vw + 17px, 25px)",
              letterSpacing: "0%",
            }}
          >
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {engineeredBenchmarkFeatures.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EngineeredBenchmarkSection;
