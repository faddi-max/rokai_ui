import type { ReactNode, CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import AnimatedArrow from "@/shared/components/ui/AnimatedArrow";

const FONT_STACK: CSSProperties = {
  fontFamily:
    "'Space Grotesk', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
};

const GRADIENT_TEXT: CSSProperties = {
  backgroundImage: "linear-gradient(90deg, #E63946 0%, #690106 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  WebkitTextFillColor: "transparent",
};

function AccentDivider({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`block w-[36px] border-t-[0.92px] border-[#E63946] transition-all duration-300 ease-out group-hover:w-[64px] sm:w-[48.31px] sm:group-hover:w-[80px] ${className}`}
    />
  );
}

function ReadMoreButton({
  label = "Read More",
  onClick,
  className = "",
}: {
  label?: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={FONT_STACK}
      className={`flex h-[34px] w-[118px] items-center justify-center gap-[8px] rounded-[6px] bg-[#E63946] pb-1 pl-3 pr-3 pt-1 text-xs font-semibold text-white transition-all duration-300 motion-safe:hover:scale-[1.04] hover:bg-[#d32f3c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E63946] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111] motion-safe:active:scale-[0.97] sm:h-[37px] sm:w-[132px] sm:gap-[10px] sm:pl-[13px] sm:pr-[13px] sm:text-sm ${className}`}
    >
      <span className="leading-none">{label}</span>
      <AnimatedArrow icon={ArrowUpRight} className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" strokeWidth={2.5} />
    </button>
  );
}

function TagPill({
  label,
  tone = "outline",
}: {
  label: string;
  tone?: "outline" | "filled";
}) {
  const toneClasses =
    tone === "filled"
      ? "bg-[#E63946] text-white border border-[#E63946]"
      : "bg-transparent text-white border border-white/30";

  return (
    <span
      className={`inline-flex h-[22px] items-center whitespace-nowrap rounded-[4px] px-2 text-[9px] font-semibold uppercase tracking-wide sm:h-[24px] sm:px-2.5 sm:text-[10px] ${toneClasses}`}
    >
      {label}
    </span>
  );
}

export type BlogCardVariant = "category" | "article";

export interface BlogCardTag {
  label: string;
  tone?: "outline" | "filled";
}

export interface BlogCardProps {
  variant?: BlogCardVariant;
  image: string;
  imageAlt?: string;
  index?: string;
  title?: string;
  badgeLabel?: string;
  author?: string;
  tags?: BlogCardTag[];
  highlightTitle?: string;
  bodyTitle?: string;
  description?: string;
  buttonLabel?: string;
  onReadMore?: () => void;
  className?: string;
  children?: ReactNode;
}

export default function BlogCard({
  variant = "category",
  image,
  imageAlt = "",
  index = "01",
  title,
  badgeLabel,
  author = "BY",
  tags = [],
  highlightTitle,
  bodyTitle,
  description,
  buttonLabel = "Read More",
  onReadMore,
  className = "",
}: BlogCardProps) {
  if (variant === "article") {
    return (
      <article
        style={FONT_STACK}
        className={`group flex w-full max-w-[437px] flex-col overflow-hidden rounded-xl bg-white transition-all duration-300 motion-safe:hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/40 ${className}`}
      >
        <div className="relative h-[160px] w-full shrink-0 px-[8px] pt-[8px] sm:h-[190px] sm:px-[11px] sm:pt-[11px] md:h-[220px]">
          <div className="relative h-full w-full overflow-hidden rounded-t-[7px]">
            <img
              src={image}
              alt={imageAlt}
              className="h-full w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-110"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(221.8deg, rgba(255,255,255,0.56) -14.5%, rgba(0,0,0,0.56) 64.86%)",
              }}
            />
            {badgeLabel && (
              <span className="absolute bottom-2 left-3 text-[11px] font-semibold uppercase tracking-wide text-white sm:bottom-3 sm:left-4 sm:text-xs">
                {badgeLabel}
              </span>
            )}
          </div>
        </div>

        <div className="mx-2 mb-2 flex flex-1 flex-col bg-[#111111] px-4 pb-5 pt-4 sm:mx-3 sm:mb-3 sm:px-5 sm:pb-6 sm:pt-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-medium text-white sm:text-xs">{author}</span>
              <span className="h-px w-5 bg-[#E63946] sm:w-6" />
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {tags.map((t, i) => (
                  <TagPill key={`${t.label}-${i}`} label={t.label} tone={t.tone} />
                ))}
              </div>
            )}
          </div>

          <h3 className="mt-3 text-[16px] font-bold uppercase leading-[1.3] sm:text-[18px] md:text-[20px] md:leading-[1.25]">
            {highlightTitle && (
              <span style={GRADIENT_TEXT} className="bg-clip-text">
                {highlightTitle}{" "}
              </span>
            )}
            {bodyTitle && <span className="text-white">{bodyTitle}</span>}
          </h3>

          {description && (
            <p className="mt-3 text-[13px] leading-relaxed text-white/50 sm:text-sm">
              {description}
            </p>
          )}

          <AccentDivider className="mt-4" />

          <ReadMoreButton label={buttonLabel} onClick={onReadMore} className="mt-5" />
        </div>
      </article>
    );
  }

  return (
    <article
      style={FONT_STACK}
      className={`group flex min-h-[440px] w-full max-w-[437px] flex-col overflow-hidden rounded-xl bg-white transition-all duration-300 motion-safe:hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/40 sm:min-h-[520px] md:min-h-[596px] ${className}`}
    >
      <div className="relative h-[220px] w-full shrink-0 px-[8px] pt-[8px] sm:h-[280px] sm:px-[11px] sm:pt-[11px] md:h-[332px]">
        <div className="relative h-full w-full overflow-hidden rounded-t-[7px]">
          <img
            src={image}
            alt={imageAlt}
            className="h-full w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-110"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(221.8deg, rgba(255,255,255,0.56) -14.5%, rgba(0,0,0,0.56) 64.86%)",
            }}
          />
        </div>
      </div>

      <div className="mx-2 mb-2 flex flex-1 flex-col bg-[#111111] px-4 pb-6 pt-5 sm:mx-2.5 sm:mb-3 sm:px-6 sm:pb-8 sm:pt-6">
        <div className="flex items-center gap-3">
          <span className="text-xs text-white sm:text-sm">{index}</span>
          <span className="h-[0.92px] w-6 bg-[#E63946] sm:w-8" />
        </div>
        <h3 className="mt-3 whitespace-normal text-[24px] font-bold uppercase leading-[1.1] text-white sm:text-[28px] md:text-[32px] md:leading-[1.05]">
          {title}
        </h3>
        <AccentDivider className="mt-3" />

        <ReadMoreButton label={buttonLabel} onClick={onReadMore} className="mt-6 sm:mt-8 md:mt-10" />
      </div>
    </article>
  );
}