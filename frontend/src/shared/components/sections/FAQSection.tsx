import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SectionHeader from "@/shared/components/sections/SectionHeader";
import type { FAQItemData, SectionHeaderProps } from "@/shared/types/sections";

interface FAQSectionProps {
  header?: SectionHeaderProps;
  faqs: FAQItemData[];
  className?: string;
}

export default function FAQSection({
  header = {
    titleTop: "FREQUENTLY ASKED",
    titleBottom: "QUESTIONS",
    description: "Everything you need to know about custom BJJ apparel manufacturing, minimums, lead times, and private label services.",
  },
  faqs,
  className = "",
}: FAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className={`relative w-full overflow-hidden bg-black py-16 sm:py-20 lg:py-24 ${className}`}>
      <div className="relative mx-auto max-w-[1250px] px-6 sm:px-10 lg:px-16">
        <SectionHeader {...header} />

        <div className="mt-8 flex flex-col divide-y divide-white/10 border-y border-white/10">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div key={faq.id} className="py-5 sm:py-6">
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="flex w-full items-center justify-between gap-4 text-left transition-colors hover:text-[#E51B24]"
                  aria-expanded={isOpen}
                >
                  <span className="font-space-grotesk text-lg font-bold sm:text-xl text-white">
                    {faq.question}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#E51B24] border-[#E51B24] text-white" : "text-white"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="mt-4 pr-10 font-space-grotesk text-sm sm:text-base font-light leading-relaxed text-white/80 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
