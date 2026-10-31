import { motion } from "framer-motion";
import { usageSteps, type UsageStep } from "../data/howToUse.data";


function StepRow({ step, index }: { step: UsageStep; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start gap-4 border-b border-white/10 py-4"
    >
      <span className="flex size-[26px] shrink-0 items-center justify-center rounded-full border border-[#E63946]/30 bg-[#E63946]/15 font-space-grotesk text-[9px] font-medium leading-none text-[#E63946]">
        {step.number}
      </span>

      <div className="min-w-0">
        <h3 className="font-space-grotesk text-[11px] font-bold leading-[14px] text-white sm:text-[12px]">
          {step.title}
        </h3>
        <p className="mt-1.5 max-w-[300px] font-space-grotesk text-[9px] font-normal leading-[14px] text-white/50 sm:text-[10px]">
          {step.description}
        </p>
      </div>
    </motion.li>
  );
}

export default function CostEstimatorHowToUse() {
  // Left column gets the first half (rounded up), right column the rest,
  // so steps read 01, 03, 05, 07 | 02, 04, 06 visually in a 2-col grid.
  const leftSteps = usageSteps.filter((_, i) => i % 2 === 0);
  const rightSteps = usageSteps.filter((_, i) => i % 2 === 1);

  return (
    <section className="relative w-full bg-transparent">
      <div className="mx-auto w-full max-w-[1180px] px-5 pb-16 sm:px-8 lg:pb-24">
       <motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.15 }}
  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
  className="rounded-[12px] border border-white/10 bg-[#0E0E0E] p-5 sm:p-6"
>
          {/* Heading */}
          <span className="font-space-grotesk text-[9px] font-medium uppercase tracking-[0.15em] text-[#E63946]">
            Simple workflow
          </span>
          <h2 className="mt-2 font-space-grotesk text-[24px] font-bold leading-[1.15] text-white sm:text-[28px]">
            How to use the cost calculator
          </h2>
          <p className="mt-3 max-w-[470px] font-space-grotesk text-[11px] font-normal leading-[17px] text-white/50 sm:text-[12px]">
            Follow these steps to create a useful first estimate. The more accurate your product
            assumptions, the more relevant the planning result will be.
          </p>

          {/* Steps */}
          <div className="mt-4 grid grid-cols-1 gap-x-12 sm:grid-cols-2 lg:gap-x-16">
            <ol className="flex flex-col border-t border-transparent">
              {leftSteps.map((step, i) => (
                <StepRow key={step.id} step={step} index={i * 2} />
              ))}
            </ol>
            <ol className="flex flex-col border-t border-transparent">
              {rightSteps.map((step, i) => (
                <StepRow key={step.id} step={step} index={i * 2 + 1} />
              ))}
            </ol>
          </div>
        </motion.div>
      </div>
    </section>
  );
}