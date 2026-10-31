import { motion } from "framer-motion";
import { keyFeatures, workflow } from "../data/profitCalculator1.data";

const ease = [0.22, 1, 0.36, 1] as const;

const eyebrowClass =
  "font-space-grotesk text-[8px] font-bold uppercase tracking-[1.6px] text-[#E63946] sm:text-[9px]";

export default function CollectionPlannerSection() {
  return (
    <div id="how-it-works" className="mx-auto flex w-full max-w-[1000px] flex-col gap-5 px-5 py-14 sm:px-8 lg:py-20">
      {/* ----------------------------- Key features ---------------------------- */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.55, ease }}
        className="rounded-[4px] border border-[#E63946]/70 p-5 sm:p-6"
        style={{
          background:
            "linear-gradient(135deg, #D63A47 0%, #A82733 45%, #6E1720 100%)",
        }}
      >
        <p className="font-space-grotesk text-[8px] font-bold uppercase tracking-[1.6px] text-white/80 sm:text-[9px]">
          {keyFeatures.eyebrow}
        </p>
        <h2 className="mt-2 font-space-grotesk text-[18px] font-medium leading-[1.2] text-white sm:text-[20px]">
          {keyFeatures.title}
        </h2>
        <p className="mt-1.5 font-space-grotesk text-[9px] font-light leading-[14px] text-white/75 sm:text-[10px]">
          {keyFeatures.description}
        </p>

        <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {keyFeatures.items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.06, ease }}
                whileHover={{ y: -2, borderColor: "rgba(255,255,255,0.28)" }}
                className="flex items-start gap-2.5 rounded-[3px] border border-white/10 bg-black/25 px-3 py-3 transition-colors duration-300"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-[3px] bg-[#E63946]/80 text-white">
                  <Icon size={11} strokeWidth={2.2} aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="font-space-grotesk text-[10px] font-bold leading-[13px] text-white">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 font-space-grotesk text-[8px] font-light leading-[11px] text-white/60">
                    {item.description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </motion.section>

      {/* ------------------------------- Workflow ------------------------------ */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.55, delay: 0.05, ease }}
        className="rounded-[4px] border border-[#E63946]/40 bg-[#111111]/80 p-5 sm:p-6"
      >
        <p className={eyebrowClass}>{workflow.eyebrow}</p>
        <h2 className="mt-2 font-space-grotesk text-[18px] font-medium leading-[1.2] text-white sm:text-[20px]">
          {workflow.title}
        </h2>
        <p className="mt-1.5 font-space-grotesk text-[9px] font-light leading-[14px] text-white/55 sm:text-[10px]">
          {workflow.description}
        </p>

        <ol className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {workflow.steps.map((step, i) => (
            <motion.li
              key={step.number}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: i * 0.06, ease }}
              whileHover={{ y: -2, borderColor: "rgba(230,57,70,0.5)" }}
              className="flex min-h-[78px] flex-col rounded-[3px] border border-white/10 bg-black/40 px-3 py-3 transition-colors duration-300"
            >
              <span className="flex h-[18px] w-[22px] items-center justify-center rounded-[2px] bg-[#E63946]/25 font-space-grotesk text-[8px] font-bold text-[#E63946]">
                {step.number}
              </span>
              <h3 className="mt-2 font-space-grotesk text-[10px] font-bold leading-[13px] text-white">
                {step.title}
              </h3>
              <p className="mt-0.5 font-space-grotesk text-[8px] font-light leading-[11px] text-white/45">
                {step.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </motion.section>
    </div>
  );
}