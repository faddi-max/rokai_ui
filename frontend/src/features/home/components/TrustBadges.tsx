import { Fragment } from "react";
import { ArrowUpRight } from "lucide-react";
import SectionGlow from "@/shared/components/layout/SectionGlow";

const PRIMARY_CTA_HREF = "#quote";
const SECONDARY_CTA_HREF = "#sample";

// Non-numeric, verified capability statements — per SEO doc Table 1
// ("Hero Proof / Trust Metrics" explicitly warns against unsupported
// numerical claims like client counts or satisfaction percentages).
const trustStats = [
  { label: "Direct Manufacturer", description: "Factory-direct B2B production" },
  { label: "Custom Development", description: "From specification to approved sample" },
  { label: "Scalable Production", description: "Built for repeat and bulk orders" },
  { label: "Global Delivery", description: "Serving international buyers" },
];

const TrustBadges = () => {
  return (
    <SectionGlow className="relative w-full overflow-hidden pb-20 pt-20 sm:pb-24 sm:pt-24 lg:pb-28 lg:pt-24">
      <div className="relative z-10 mx-auto w-full max-w-[1250px] px-5 sm:px-8 lg:px-0">
        {/* --- CTA banner --- */}
        <div className="flex flex-col items-start gap-6 rounded-[12px] bg-white px-7 py-9 shadow-[0px_0px_12px_3px_rgba(230,57,70,0.28)] sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-12 lg:py-9">
          <div className="max-w-[600px]">
            <h2 className="font-space-grotesk text-[26px] font-bold uppercase leading-[1.1] tracking-[-0.01em] text-[#E63946] sm:text-[30px] lg:text-[34px]">
              Ready to build your next fightwear range?
            </h2>
            <p className="mt-3 font-space-grotesk text-[14px] font-light leading-[1.4] text-black/70 sm:text-[15px]">
              Share your product idea, specifications or existing tech pack. Our team can help
              you move from concept to approved sample and production.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <a
              href={PRIMARY_CTA_HREF}
              className="flex h-[48px] items-center gap-3 rounded-[6px] bg-[#E63946] px-5 font-space-grotesk text-[14px] font-medium uppercase tracking-[0.02em] text-white transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E63946]"
            >
              Request a Quote
              <ArrowUpRight size={14} aria-hidden />
            </a>
           <a 
              href={SECONDARY_CTA_HREF}
              className="flex h-[48px] items-center gap-3 rounded-[6px] border border-[#E63946] px-5 font-space-grotesk text-[14px] font-medium uppercase tracking-[0.02em] text-[#E63946] transition hover:bg-[#E63946]/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E63946]"
            >
              Request a Sample
              <ArrowUpRight size={14} aria-hidden />
            </a>
          </div>
        </div>

        {/* --- Trust / capability row --- */}
        <div className="mt-9 flex flex-col gap-6 lg:min-h-[116px] lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:px-12">
          {trustStats.map((stat, index) => (
            <Fragment key={stat.label}>
              {index > 0 && (
                <span
                  aria-hidden
                  className="h-px w-full bg-white/15 lg:h-[80px] lg:w-px lg:bg-white/25"
                />
              )}
              <div>
                <p className="font-space-grotesk text-[clamp(1rem,3vw,1.125rem)] font-bold uppercase leading-[1.2] text-[#E51B24]">
                  {stat.label}
                </p>
                <p className="mt-1 font-space-grotesk text-[clamp(0.8125rem,3vw,0.875rem)] font-normal leading-[1.3] text-white/70">
                  {stat.description}
                </p>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </SectionGlow>
  );
};

export default TrustBadges;