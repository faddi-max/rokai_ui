import { ArrowUpRight } from "lucide-react";
import Button from "@/shared/components/ui/Button";
import SectionEyebrow from "@/shared/components/ui/SectionEyebrow";
import type { PageHeroProps } from "@/shared/types/sections";

export default function PageHero({
  eyebrow,
  headingLine1,
  headingLine2,
  headingLine3,
  headingHighlight,
  description,
  primaryCta = { label: "Get Your Free Assessment", href: "/contact" },
  secondaryCta = { label: "Get a Quote", href: "/contact#quote" },
  avatars = [],
  joinText,
  heroImage,
  productCard,
  estdText = "ESTD 2019",
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-black pb-12 pt-6 lg:pb-16 lg:pt-10">
      {/* Background Subtle Radial Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_60%_35%,rgba(180,20,25,0.25),transparent_65%)]" />

      <div className="relative mx-auto grid max-w-[1512px] items-center gap-10 px-6 sm:px-10 lg:grid-cols-2 lg:gap-12 lg:px-16">
        {/* Left Column: Headings & CTAs */}
        <div className="flex min-w-0 flex-col gap-6">
          {eyebrow && <SectionEyebrow label={eyebrow} />}

          <h1 className="font-space-grotesk text-[clamp(2.25rem,7vw,4.25rem)] font-bold uppercase leading-[1.02] text-white">
            {headingLine1}
            {headingLine2 && (
              <>
                <br />
                {headingLine2}
              </>
            )}
            {headingLine3 && (
              <>
                <br />
                {headingLine3}
              </>
            )}
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #E51B24 0%, #690106 100%)",
              }}
            >
              {headingHighlight}
            </span>
          </h1>

          <div className="h-[3px] w-16 bg-white" />

          <p className="max-w-xl font-space-grotesk text-base leading-relaxed text-white/80 sm:text-lg">
            {description}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            {primaryCta && (
              <Button
                href={primaryCta.href}
                variant="outline"
                icon={ArrowUpRight}
                className="h-[46px] w-full px-6 sm:w-auto text-[14px]"
              >
                {primaryCta.label}
              </Button>
            )}
            {secondaryCta && (
              <Button
                href={secondaryCta.href}
                icon={ArrowUpRight}
                className="h-[46px] w-full px-6 sm:w-auto text-[14px]"
              >
                {secondaryCta.label}
              </Button>
            )}
          </div>

          {/* Social Proof Avatars */}
          {avatars.length > 0 && (
            <div className="mt-2 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <div className="flex shrink-0 -space-x-3">
                {avatars.map((avatar, index) => (
                  <img
                    key={index}
                    src={avatar}
                    alt="Community member"
                    className="h-10 w-10 rounded-full border-2 border-black object-cover"
                  />
                ))}
              </div>
              {joinText && (
                <p className="font-space-grotesk text-sm text-white/80">
                  {joinText}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Hero Visual & Floating Badges */}
        {heroImage && (
          <div className="relative flex w-full items-end justify-center lg:justify-end">
            <div className="relative z-10 w-full max-w-[340px] sm:max-w-[440px] lg:max-w-[480px]">
              <img
                src={heroImage}
                alt="ROKAI featured apparel"
                className="h-auto w-full object-contain"
              />

              {/* Floating Product Card */}
              {productCard && (
                <div className="absolute -top-3 right-0 flex w-[120px] flex-col rounded-lg bg-white p-3 shadow-xl sm:-top-4 sm:-right-8 sm:w-[140px] lg:-right-12">
                  <img
                    src={productCard.image}
                    alt={productCard.name}
                    className="h-[90px] w-full rounded object-contain object-top sm:h-[110px]"
                  />
                  <p className="mt-2 text-center font-space-grotesk text-[11px] font-bold uppercase leading-tight text-black sm:text-[12px]">
                    {productCard.name}
                  </p>
                  {productCard.subtitle && (
                    <span className="text-[10px] text-black/60 text-center">
                      {productCard.subtitle}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* ESTD Badge */}
            {estdText && (
              <div className="relative z-10 mb-12 hidden flex-col items-start gap-2 lg:flex lg:ml-6">
                <span className="whitespace-nowrap font-space-grotesk text-[18px] font-bold tracking-[0.2em] text-white">
                  {estdText}
                </span>
                <div className="h-[8px] w-[50px] bg-white" />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
