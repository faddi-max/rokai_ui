import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";
import { sustainabilityGoals } from "@/features/home/data/sustainabilityGoals";

const SustainabilityGoalsSection = () => {
  const { eyebrow, titleTop, titleBottom, description, goals, image, caption } =
    sustainabilityGoals;

  return (
    <SectionGlow className="relative overflow-hidden">
      <SectionHeaderblog
        bare
        eyebrow={eyebrow}
        title={titleTop}
        highlight={titleBottom}
        highlightGradient="linear-gradient(90deg, #E51B24 0%, #690106 100%)"
        accentColor="#E51B24"
        description={description}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 pb-20 sm:px-8 lg:px-[30px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          {/* LEFT — goals, aligned to the bottom of the image column */}
          <div className="flex items-end">
            <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-5 lg:pb-[70px]">
              {goals.map((goal, i) => (
                <motion.div
                  key={goal.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex flex-col"
                >
                  <span
                    className="font-space-grotesk font-light leading-none text-white/45"
                    style={{ fontSize: "clamp(30px, 1.4vw + 18px, 40px)" }}
                  >
                    {goal.number}
                  </span>

                  <span
                    aria-hidden
                    className="mt-2 block h-px w-full bg-gradient-to-r from-[#E51B24] to-[#E51B24]/30"
                  />

                  <h3 className="mt-3 max-w-[150px] py-3 font-space-grotesk text-[18px] font-bold uppercase leading-[25px] text-white">
                    {goal.title}
                  </h3>

                  <p className="mt-2 max-w-[125px] font-space-grotesk text-[15px] font-light leading-[20px] text-white/50">
                    {goal.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT — image + caption strip */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full overflow-hidden rounded-[10px] border border-white/10 bg-[#151515]"
          >
            <div className="relative aspect-[313/220] w-full overflow-hidden">
              <img
                src={image}
                alt="Trees in a sunlit forest"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="bg-[#151515] px-6 py-5">
              {caption.map((line) => (
                <p
                  key={line}
                  className="font-space-grotesk text-[8px] font-medium uppercase leading-[12px] tracking-[0.25em] text-white/50"
                >
                  {line}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SectionGlow>
  );
};

export default SustainabilityGoalsSection;