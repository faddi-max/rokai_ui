import SectionHeader from "@/shared/components/sections/SectionHeader";
import type { ProcessStep, SectionHeaderProps } from "@/shared/types/sections";

interface ProcessStepsSectionProps {
  header: SectionHeaderProps;
  steps: ProcessStep[];
  className?: string;
}

export default function ProcessStepsSection({
  header,
  steps,
  className = "",
}: ProcessStepsSectionProps) {
  return (
    <section className={`relative w-full overflow-hidden bg-black py-16 sm:py-20 lg:py-24 ${className}`}>
      <div className="relative mx-auto max-w-[1512px] px-6 sm:px-10 lg:px-16">
        <SectionHeader {...header} />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, idx) => (
            <div
              key={step.stepNumber}
              className="relative flex flex-col justify-between rounded-xl border border-white/15 bg-[#111111] p-6 transition-all duration-300 hover:border-[#E51B24] hover:bg-[#161616]"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="font-space-grotesk text-3xl font-black text-[#E51B24]">
                    {step.stepNumber}
                  </span>
                  {step.subtitle && (
                    <span className="rounded bg-white/10 px-2.5 py-0.5 font-space-grotesk text-xs text-white/80">
                      {step.subtitle}
                    </span>
                  )}
                </div>

                <h3 className="mt-5 font-space-grotesk text-xl font-bold text-white">
                  {step.title}
                </h3>

                <p className="mt-2.5 font-space-grotesk text-sm font-light leading-relaxed text-white/70">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2 pt-4 text-xs font-medium text-white/40">
                <span>Phase {idx + 1} of {steps.length}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
