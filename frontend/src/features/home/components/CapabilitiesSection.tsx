import SectionEyebrow from "./SectionEyebrow";
import CapabilityCard from "./CapabilityCard";
import { capabilities, capabilitiesHeading } from "../data/capabilities";


const CapabilitiesSection = () => {
  const { eyebrow, titleTop, titleBottom, description } = capabilitiesHeading;

  return (
    <section className="relative w-full overflow-hidden bg-black px-6 py-16 sm:px-10 md:py-20 lg:px-30 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_0%,rgba(150,15,20,0.35),transparent_55%)]" />

      <div className="relative mx-auto w-full max-w-[1512px]">
        <div className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-4">
              <SectionEyebrow
                label={eyebrow}
                textClassName="text-white/70"
                lineClassName="border-[#E51B24]"
              />
            </div>

            <h2 className="font-space-grotesk">
              <span
                className="block font-bold text-white"
                style={{
                  fontSize: "clamp(32px, 2.9vw + 12px, 60px)",
                  lineHeight: "clamp(34px, 3.3vw + 12px, 68px)",
                  letterSpacing: "0%",
                }}
              >
                {titleTop}
              </span>
              <span
                className="block font-bold text-[#E51B24]"
                style={{
                  fontSize: "clamp(32px, 2.9vw + 12px, 60px)",
                  lineHeight: "clamp(34px, 3.3vw + 12px, 68px)",
                  letterSpacing: "0%",
                }}
              >
                {titleBottom}
              </span>
            </h2>
          </div>

          <p
            className="border-l-2 border-[#E51B24] pl-4 font-space-grotesk font-light text-white/70 lg:max-w-[340px] lg:text-left"
            style={{
              fontSize: "clamp(14px, 0.4vw + 12px, 16px)",
              lineHeight: "clamp(19px, 0.5vw + 15px, 22px)",
              letterSpacing: "0%",
            }}
          >
            {description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-4 lg:gap-10">
          {capabilities.map((item) => (
            <CapabilityCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
