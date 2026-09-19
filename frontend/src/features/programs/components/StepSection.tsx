import SectionHeaderblog from "@/shared/components/sections/SectionHeaderblog";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import { Step, STEPS } from "../data/steps.data";
import StepCard from "@/shared/components/sections/StepCard";


type StepSectionProps = {
  steps?: Step[];
};

export default function StepSection({ steps = STEPS }: StepSectionProps) {
  return (
    <SectionGlow>
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
        <SectionHeaderblog
          eyebrow="Three clear steps"
          title="Join. Share."
          highlight="Earn."
          description="No complicated setup. Apply once, receive your referral tools, and start recommending Rokai to the people who already trust you."
        />

        <div className="mx-auto mt-10 max-w-[1200px] sm:mt-12 lg:mt-16">
          
          <div
            className="grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 sm:gap-6
                       sm:[&>:last-child:nth-child(odd)]:col-span-2
                       lg:grid-cols-3 lg:[&>:last-child:nth-child(odd)]:col-span-1"
          >
            {steps.map(({ id, ...step }, i) => (
              <StepCard key={id} index={i + 1} {...step} />
            ))}
          </div>
        </div>
      </section>
    </SectionGlow>
  );
}