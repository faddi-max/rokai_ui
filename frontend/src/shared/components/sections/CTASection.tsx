import { ArrowUpRight } from "lucide-react";
import Button from "@/shared/components/ui/Button";
import SectionEyebrow from "@/shared/components/ui/SectionEyebrow";
import type { CTASectionProps } from "@/shared/types/sections";

export default function CTASection({
  eyebrow,
  titleTop,
  titleHighlight,
  description,
  primaryCta,
  secondaryCta,
}: CTASectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-black py-20 lg:py-28">
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(229,27,36,0.22),transparent_70%)]" />

      <div className="relative mx-auto max-w-[1250px] rounded-3xl border border-white/15 bg-gradient-to-b from-[#141414] to-black px-6 py-16 text-center sm:px-12 sm:py-20 lg:px-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
          {eyebrow && <SectionEyebrow label={eyebrow} />}

          <h2 className="font-space-grotesk font-bold uppercase leading-tight text-white">
            <span
              className="block"
              style={{
                fontSize: "clamp(34px, 3.6vw + 12px, 64px)",
                lineHeight: "clamp(36px, 3.6vw + 12px, 66px)",
              }}
            >
              {titleTop}
            </span>
            <span
              className="block bg-clip-text font-light text-transparent"
              style={{
                fontSize: "clamp(30px, 3.2vw + 12px, 58px)",
                lineHeight: "clamp(32px, 3.2vw + 12px, 60px)",
                backgroundImage:
                  "linear-gradient(90deg, #E51B24 0%, #690106 100%)",
              }}
            >
              {titleHighlight}
            </span>
          </h2>

          <p className="max-w-xl font-space-grotesk text-base font-light leading-relaxed text-white/80 sm:text-lg">
            {description}
          </p>

          <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              href={primaryCta.href}
              variant="primary"
              icon={ArrowUpRight}
              weight="medium"
              size="15px"
              className="h-[50px] w-full px-8 sm:w-auto"
            >
              {primaryCta.label}
            </Button>

            {secondaryCta && (
              <Button
                href={secondaryCta.href}
                variant="outline"
                icon={ArrowUpRight}
                weight="medium"
                size="15px"
                className="h-[50px] w-full px-8 sm:w-auto"
              >
                {secondaryCta.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
