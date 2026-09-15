import SectionEyebrow from "./SectionEyebrow";
import ProductSlider from "./ProductSlider";
import {
  manufactureProducts,
  whatWeManufactureHeading,
} from "@/features/home/data/manufactureProducts";

const WhatWeManufactureSection = () => {
  const { eyebrow, titleTop, titleBottom, description } =
    whatWeManufactureHeading;

  return (
    <section className="w-full bg-black">
      <div className="mx-auto w-full max-w-[1512px] px-6 py-16 sm:px-10 md:py-20 lg:px-20 lg:py-24">
        <div className="mb-10 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <SectionEyebrow label={eyebrow} />

            <h2 className="mt-2 font-space-grotesk">
              <span
                className="block font-bold text-white"
                style={{
                  fontSize: "clamp(32px, 3.4vw + 14px, 70px)",
                  lineHeight: "clamp(34px, 3.3vw + 12px, 68px)",
                  letterSpacing: "0%",
                }}
              >
                {titleTop}
              </span>
              <span
                className="block bg-clip-text font-light text-transparent"
                style={{
                  fontSize: "clamp(28px, 2.9vw + 12px, 60px)",
                  lineHeight: "clamp(28px, 2.5vw + 10px, 51px)",
                  letterSpacing: "0%",
                  backgroundImage:
                    "linear-gradient(90deg, #E51B24 0%, #690106 100%)",
                }}
              >
                {titleBottom}
              </span>
            </h2>
          </div>

          <p
            className="font-space-grotesk font-light text-white lg:max-w-[320px] lg:text-left"
            style={{
              fontSize: "clamp(16px, 0.5vw + 14px, 20px)",
              lineHeight: "clamp(21px, 0.6vw + 17px, 25px)",
              letterSpacing: "0%",
            }}
          >
            {description}
          </p>
        </div>

        <ProductSlider products={manufactureProducts} />
      </div>
    </section>
  );
};

export default WhatWeManufactureSection;
