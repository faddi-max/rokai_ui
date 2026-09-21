import { Fragment } from "react";
import { ArrowUpRight } from "lucide-react";
import SectionGlow from "@/shared/components/layout/SectionGlow";

const CTA_HREF = "#contact";

const trustStats = [
  { value: "250+", label: "Global Clients" },
  { value: "30+", label: "Countries Served" },
  { value: "10+ Years", label: "Industry Experience" },
  { value: "1000+", label: "Products Developed" },
  { value: "98%", label: "Client Satisfaction" },
];

const TrustBadges = () => {
  return (
    <SectionGlow className="relative w-full overflow-hidden pb-20 pt-20 sm:pb-24 sm:pt-24 lg:pb-28 lg:pt-24">
      <div className="relative z-10 mx-auto w-full max-w-[1250px] px-5 sm:px-8 lg:px-0">
        {/* --- CTA banner --- */}
        <div className="flex flex-col items-start justify-between gap-6 rounded-[12px] bg-white px-7 py-9 shadow-[0px_0px_12px_3px_rgba(230,57,70,0.28)] sm:px-10 lg:h-[153px] lg:flex-row lg:items-center lg:gap-10 lg:px-12 lg:py-0">
          <h2 className="max-w-[880px] font-space-grotesk text-[26px] font-bold uppercase leading-[1.1] tracking-[-0.01em] text-[#E63946] sm:text-[30px] lg:text-[34px]">
            Ready to build your next combat apparel collection?
          </h2>

          <a
            href={CTA_HREF}
            className="flex h-[48px] shrink-0 items-center gap-6 rounded-[6px] bg-[#E63946] px-5 font-space-grotesk text-[14px] font-medium text-white transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E63946]"
          >
            Get in Touch
            <ArrowUpRight size={14} aria-hidden />
          </a>
        </div>

        {/* --- Stats row --- */}
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
                <p className="font-space-grotesk text-[clamp(1.5rem,7vw,1.75rem)] font-bold leading-[1.15] text-[#E51B24]">
                  {stat.value}
                </p>
                <p className="mt-1 font-space-grotesk text-[clamp(0.9375rem,4vw,1.0625rem)] font-normal leading-[1.3] text-white">
                  {stat.label}
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