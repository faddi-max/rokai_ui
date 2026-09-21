import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import { partnershipImage } from "@/assets"; // add this asset (see notes)

/* -------------------------------------------------------------------------- */
/*  Types — shape is API-ready: pass `pageData.partnership` straight in       */
/* -------------------------------------------------------------------------- */

export interface PartnershipSectionProps {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  callout?: string;
  paragraphs?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  image?: string;
  imageAlt?: string;
}

/* -------------------------------------------------------------------------- */
/*  Default content (used until the backend supplies data)                    */
/* -------------------------------------------------------------------------- */

const DEFAULTS: Required<PartnershipSectionProps> = {
  eyebrow: "More than an ambassador program",
  title: "A PARTNERSHIP",
  highlight: "NOT A TRANSACTION.",
  callout: "This is a partnership, not a transaction.",
  paragraphs: [
    "We identify individuals who truly represent the essence of Brazilian Jiu-Jitsu—not just through titles, but through their mindset, consistency, and presence within their local BJJ scene and the community. This includes fighters who bring intensity, discipline, and purpose every time they step on the mats, coaches who shape the next generation and carry the responsibility of leadership, competitors who consistently test themselves under pressure and represent the art on every stage, and rising athletes who show hunger, potential, and the drive to evolve beyond limits.",
    "The ROKAI Ambassador Program is built around these individuals—not those chasing attention, but those already putting in the work, building their path, and representing something greater than themselves.",
  ],
  ctaLabel: "Initiate Request",
  ctaHref: "#apply", // → Ambassador page form
  image: partnershipImage,
  imageAlt: "Brazilian Jiu-Jitsu coach addressing a group of athletes in black gis",
};

const HEADLINE_RED = "#C0252F"; // headline accent (deeper than the #E63946 UI accent)

/* -------------------------------------------------------------------------- */
/*  Small reusable pieces                                                     */
/* -------------------------------------------------------------------------- */

function Eyebrow({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-[10px]">
      <span className="font-space-grotesk text-[16px] font-normal leading-[20px] text-[#b5b5b5]">
        {text}
      </span>
      <span aria-hidden className="h-px w-[52px] bg-[#E63946]" />
    </div>
  );
}

function PartnershipHeading({ title, highlight }: { title: string; highlight: string }) {
  return (
    <h2 className="mt-[21px] font-space-grotesk text-[38px] font-bold uppercase leading-[1.27] tracking-[-0.5px] sm:text-[46px] lg:text-[52px]">
      <span className="block text-white">{title}</span>
      <span className="block" style={{ color: HEADLINE_RED }}>
        {highlight}
      </span>
    </h2>
  );
}

function PartnershipCopy({
  callout,
  paragraphs,
  ctaLabel,
  ctaHref,
}: Pick<Required<PartnershipSectionProps>, "callout" | "paragraphs" | "ctaLabel" | "ctaHref">) {
  return (
    <div className="flex w-full flex-col gap-[14px] border-l-2 border-[#E63946] pl-[19px] lg:w-[624px]">
      {/* White callout bar */}
      <div className="flex min-h-[44px] items-center bg-white px-[18px] py-2">
        <span className="font-space-grotesk text-[12px] font-bold leading-[16px] text-[#0d0d0d]">
          {callout}
        </span>
      </div>

      {paragraphs.map((text) => (
        <p
          key={text.slice(0, 32)}
          className="font-space-grotesk text-[15px] font-normal leading-[25px] tracking-normal text-[#d9d9d9]"
        >
          {text}
        </p>
      ))}

      {/* CTA — instant (0ms) navigation to the Ambassador form */}
      <a
        href={ctaHref}
        className="flex h-[37px] w-[165px] items-center justify-between gap-[10px] rounded-[6px] bg-[#E63946] px-[13px] py-1 font-space-grotesk text-[12px] font-medium text-white transition-none [scroll-behavior:auto] hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {ctaLabel}
        <ArrowUpRight size={14} aria-hidden />
      </a>
    </div>
  );
}

function PartnershipImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="aspect-[582/565] w-full overflow-hidden rounded-[14px] bg-[#00000024] lg:w-[582px]">
      <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function PartnershipSection(props: PartnershipSectionProps) {
  const c = { ...DEFAULTS, ...props };

  return (
    <SectionGlow className="relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-[1440px] px-5 pb-20 pt-14 sm:px-8 md:px-10 lg:pb-[100px] lg:pl-[49px] lg:pr-[105px] lg:pt-[56px]"
      >
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-[80px]">
          {/* Left column: header + copy */}
          <div className="flex w-full flex-col lg:w-[624px] lg:shrink-0">
            <Eyebrow text={c.eyebrow} />
            <PartnershipHeading title={c.title} highlight={c.highlight} />

            <div className="mt-10 lg:mt-[68px]">
              <PartnershipCopy
                callout={c.callout}
                paragraphs={c.paragraphs}
                ctaLabel={c.ctaLabel}
                ctaHref={c.ctaHref}
              />
            </div>
          </div>

          {/* Right column: image (top edge sits 158px below the eyebrow on desktop) */}
          <div className="w-full lg:mt-[158px] lg:w-[582px] lg:shrink-0">
            <PartnershipImage src={c.image} alt={c.imageAlt} />
          </div>
        </div>
      </motion.div>
    </SectionGlow>
  );
}