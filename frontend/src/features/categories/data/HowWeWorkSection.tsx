import { motion } from "framer-motion";
import { ArrowRight, ImageIcon } from "lucide-react";
import { work1, work2, work3, work4, work5, work6 } from "@/assets";

type ProcessStep = {
  step: string;
  title: string;
  description: string;
  image?: string;
};

const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Requirements",
    description: "Share your product, quantity, fit and branding needs.",
    image: work6,
  },
  {
    step: "02",
    title: "Design & Sample",
    description: "Fabric, fit, pattern and branding are developed into your sample.",
    image: work5,
  },
  {
    step: "03",
    title: "Approval",
    description: "Review the sample, fit and branding before bulk production begins.",
    image: work4,
  },
  {
    step: "04",
    title: "Production",
    description: "Approved designs move into controlled manufacturing at scale.",
    image: work3,
  },
  {
    step: "05",
    title: "Quality Control",
    description: "Fit, construction, finish and branding are inspected before dispatch.",
    image: work2,
  },
  {
    step: "06",
    title: "Global Delivery",
    description: "Finished orders are securely packed and shipped worldwide.",
    image: work1,
  },
];

const ProcessImage = ({
  image,
  title,
  step,
}: {
  image?: string;
  title: string;
  step: string;
}) => (
  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-white/5">
    <span className="absolute left-3 top-3 z-10 flex h-9 w-9 items-center justify-center bg-[#E51B24] font-space-grotesk text-[15px] font-bold text-white sm:h-10 sm:w-10 sm:text-[16px]">
      {step}
    </span>
    {image ? (
      <img src={image} alt={title} className="h-full w-full object-cover" loading="lazy" />
    ) : (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white/[0.06] to-white/[0.02]">
        <ImageIcon className="h-8 w-8 text-white/15" strokeWidth={1.5} />
      </div>
    )}
  </div>
);

const HowWeWorkSection = () => {
  return (
    <section className="w-full bg-black">
      <div className="mx-auto w-full max-w-[1250px] px-5 py-16 sm:px-8 md:py-20 lg:px-0 lg:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <span className="font-space-grotesk text-[13px] font-medium uppercase tracking-[0.08em] text-white/70">
              How We Work
            </span>
            <h2 className="mt-3 font-space-grotesk">
              <span
                className="block font-bold uppercase text-white"
                style={{
                  fontSize: "clamp(28px, 2.6vw + 10px, 40px)",
                  lineHeight: "clamp(32px, 2.6vw + 10px, 44px)",
                }}
              >
                From Concept To
              </span>
              <span
                className="block bg-clip-text font-bold uppercase text-transparent"
                style={{
                  fontSize: "clamp(28px, 2.6vw + 10px, 40px)",
                  lineHeight: "clamp(32px, 2.6vw + 10px, 44px)",
                  backgroundImage: "linear-gradient(90deg, #E51B24 0%, #690106 100%)",
                }}
              >
                Global Delivery
              </span>
            </h2>
          </motion.div>

               <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
            className="border-l-2 border-[#E51B24] pl-4 lg:mt-2 lg:max-w-[230px]"
          >
            <p className="font-space-grotesk text-[13px] font-light leading-[19px] text-white/60 sm:text-[14px] sm:leading-[20px]">
             A controlled six-step process that takes your custom gear from initial requirements to
            finished production and worldwide delivery.
            </p>
          </motion.div>
        </div>

        <div className="relative mt-14 sm:mt-16 lg:mt-20">
          <span className="absolute left-4 top-0 h-full w-px bg-white/10 lg:left-1/2 lg:-translate-x-1/2" />

          <div className="flex flex-col gap-10 sm:gap-12 lg:gap-16">
            {processSteps.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="relative grid grid-cols-1 items-center gap-5 pl-12 lg:grid-cols-2 lg:gap-16 lg:pl-0"
                >
                  <span className="absolute left-4 top-1/2 z-10 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#E51B24] bg-black lg:left-1/2">
                    <ArrowRight className="h-3.5 w-3.5 text-[#E51B24]" strokeWidth={2.5} />
                  </span>

                  <div
                    className={
                      isEven
                        ? "order-2 lg:order-1 lg:pr-14 lg:text-right"
                        : "order-2 lg:order-2 lg:pl-14"
                    }
                  >
                    <span className="font-space-grotesk text-[12px] font-bold uppercase tracking-[0.05em] text-[#E51B24]">
                      Step {item.step}
                    </span>
                    <h3 className="mt-1 font-space-grotesk text-[19px] font-bold uppercase leading-[24px] text-white sm:text-[21px]">
                      {item.title}
                    </h3>
                    <p
                      className={
                        "mt-2 font-space-grotesk text-[13px] font-light leading-[19px] text-white/50 sm:text-[14px] sm:leading-[20px] " +
                        (isEven ? "lg:ml-auto lg:max-w-[300px]" : "lg:max-w-[300px]")
                      }
                    >
                      {item.description}
                    </p>
                  </div>

                  <div
                    className={
                      isEven
                        ? "order-1 lg:order-2 lg:pl-14"
                        : "order-1 lg:order-1 lg:flex lg:justify-end lg:pr-14"
                    }
                  >
                    <div className="lg:max-w-[380px]">
                      <ProcessImage image={item.image} title={item.title} step={item.step} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;