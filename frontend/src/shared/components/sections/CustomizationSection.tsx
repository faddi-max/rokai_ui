import { useEffect, useRef, useState } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import SectionGlow from "@/shared/components/layout/SectionGlow";

import {
  customizationCategories,
  customizationFilters,
  customizationSliderItems,
  type CustomizationCallout,
  type CustomizationCategory,
  type CustomizationFilter,
  type CustomizationFilterItem,
  type CustomizationSliderItem,
} from "@/features/services/BespokeCustomizationPage/data/customization.data";

interface CustomizationSectionProps {
  categories?: CustomizationCategory[];
  filters?: CustomizationFilterItem[];

  /** Top slider buttons. Each one scrolls to the category with `targetId`. */
  sliderItems?: CustomizationSliderItem[];

  eyebrow?: string;
  titleWhite?: string;
  titleRed?: string;

  /** Click on a product stage to log x/y in % (paste into the data file). */
  debug?: boolean;
}

const arrowBtn =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-10 sm:w-10";

const anchorId = (id: string) => `customization-${id}`;

/* -------------------------------------------------------------------------- */
/*  Sticks + labels (all positioned in % of the stage box)                    */
/* -------------------------------------------------------------------------- */

function CalloutLines({ callouts }: { callouts: CustomizationCallout[] }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
    >
      {callouts.map((c) => (
        <line
          key={c.label + c.sublabel}
          x1={c.dot.x}
          y1={c.dot.y}
          x2={c.target.x}
          y2={c.target.y}
          stroke="#E51B24"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

function CalloutMarker({ callout }: { callout: CustomizationCallout }) {
  const isLeft = callout.side === "left";

  return (
    <>
      <span
        aria-hidden
        className="absolute size-[9px] rounded-full bg-[#E51B24] shadow-[0_0_0_4px_rgba(229,27,36,0.25)]"
        style={{
          left: `${callout.dot.x}%`,
          top: `${callout.dot.y}%`,
          transform: "translate(-50%, -50%)",
        }}
      />

      <div
        className={`absolute w-max ${
          isLeft ? "pr-4 text-right" : "pl-4 text-left"
        }`}
        style={{
          left: `${callout.dot.x}%`,
          top: `${callout.dot.y}%`,
          transform: `translate(${isLeft ? "-100%" : "0"}, -50%)`,
        }}
      >
        <p className="font-space-grotesk text-[12px] font-medium leading-[14px] text-white xl:text-[13px]">
          {callout.label}
        </p>

        <p className="mt-0.5 font-space-grotesk text-[10px] font-light leading-[12px] text-white/50">
          {callout.sublabel}
        </p>
      </div>

      <span
        aria-hidden
        className="absolute size-[6px] rounded-full border border-[#E51B24] bg-black"
        style={{
          left: `${callout.target.x}%`,
          top: `${callout.target.y}%`,
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  One category block: title, product + sticks, filters, options             */
/* -------------------------------------------------------------------------- */

function CategoryBlock({
  category,
  filters,
  debug,
}: {
  category: CustomizationCategory;
  filters: CustomizationFilterItem[];
  debug: boolean;
}) {
  const [filter, setFilter] = useState<CustomizationFilter>("all");
  const [picked, setPicked] = useState<string | null>(null);

  const stageRef = useRef<HTMLDivElement>(null);

  const options =
    filter === "all"
      ? category.options
      : category.options.filter((o) => o.filter === filter);

  const pick = (e: React.MouseEvent) => {
    const box = stageRef.current;

    if (!box) return;

    const r = box.getBoundingClientRect();

    const x =
      Math.round(((e.clientX - r.left) / r.width) * 1000) / 10;

    const y =
      Math.round(((e.clientY - r.top) / r.height) * 1000) / 10;

    const value = `{ x: ${x}, y: ${y} }`;

    console.log(category.id, value);

    setPicked(value);
  };

  return (
    <section
      id={anchorId(category.id)}
      aria-label={`${category.titleWhite} ${category.titleRed}`}
      className="scroll-mt-28 border-t border-white/10 pt-12 first:border-t-0 first:pt-0 lg:pt-16"
    >
      <p className="font-space-grotesk text-[10px] font-medium uppercase tracking-[0.15em] text-white/40">
        {category.categoryLabel}
      </p>

      <motion.h3
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mt-4 text-center font-space-grotesk uppercase"
      >
        <span className="block text-[26px] font-bold leading-[1.1] text-white sm:text-[34px] lg:text-[40px]">
          {category.titleWhite}
        </span>

        <span className="block text-[22px] font-light leading-[1.1] text-[#E51B24] sm:text-[28px] lg:text-[34px]">
          {category.titleRed}
        </span>
      </motion.h3>

      {/* Product stage: size = Figma width + Figma ratio */}
      <div className="mt-10 flex w-full justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative"
          style={{
            width: `min(100%, ${category.width}px)`,
            aspectRatio: category.aspectRatio,
          }}
        >
          {/* every % below is relative to THIS box */}
          <div ref={stageRef} className="absolute inset-0">
            <img
              src={category.image}
              alt={category.imageAlt}
              loading="lazy"
              className="h-full w-full"
              style={{
                objectFit: category.objectFit ?? "contain",
                objectPosition: category.objectPosition ?? "50% 50%",
              }}
            />

            {category.guides && (
              <svg
                aria-hidden
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible xl:block"
              >
                {category.guides.map((g, i) => (
                  <line
                    key={i}
                    x1={g.x1}
                    y1={g.y1}
                    x2={g.x2}
                    y2={g.y2}
                    stroke="#3B82F6"
                    strokeWidth={1}
                    strokeDasharray="4 4"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </svg>
            )}

            {/* labels need side space, so they show from xl up */}
            <div className="hidden xl:block">
              <CalloutLines callouts={category.callouts} />

              {category.callouts.map((c) => (
                <CalloutMarker
                  key={c.label + c.sublabel}
                  callout={c}
                />
              ))}
            </div>

            {debug && (
              <div
                onClick={pick}
                className="absolute -inset-x-[70%] -inset-y-[3%] z-10 cursor-crosshair outline outline-1 outline-dashed outline-white/20"
              />
            )}
          </div>

          {debug && picked && (
            <span className="absolute bottom-1 left-1 z-20 rounded-[3px] bg-black/80 px-2 py-1 font-mono text-[11px] text-white">
              {picked}
            </span>
          )}
        </motion.div>
      </div>

      {/* Legend for screens where sticks are hidden */}
      <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3 xl:hidden">
        {category.callouts.map((c) => (
          <li
            key={c.label + c.sublabel}
            className="flex items-start gap-2"
          >
            <span
              aria-hidden
              className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#E51B24]"
            />

            <span className="font-space-grotesk text-[12px] leading-[15px] text-white">
              {c.label}

              <span className="block text-[10px] font-light text-white/50">
                {c.sublabel}
              </span>
            </span>
          </li>
        ))}
      </ul>

      {/* Filter tabs (per category) */}
      <div className="mt-12 flex flex-wrap gap-2 lg:mt-14">
        {filters.map((f) => {
          const isActive = f.id === filter;

          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`rounded-[3px] px-3 py-1.5 font-space-grotesk text-[10px] font-bold uppercase tracking-wide transition-colors duration-200 ${
                isActive
                  ? "bg-[#E51B24] text-white"
                  : "border border-white/10 bg-[#111111] text-white/60 hover:border-white/30 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Options grid */}
      <motion.div
        key={category.id + filter}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        {options.map((o) => (
          <article
            key={o.id}
            className="group flex min-h-[86px] flex-col justify-between rounded-[4px] border border-white/10 bg-[#111111] px-4 py-3.5 transition-colors duration-300 hover:border-[#E51B24]/60"
          >
            <div>
              <h4 className="font-space-grotesk text-[13px] font-bold text-white transition-colors duration-300 group-hover:text-[#E51B24]">
                {o.title}
              </h4>

              <p className="mt-1 font-space-grotesk text-[11px] font-light leading-[15px] text-white/50">
                {o.description}
              </p>
            </div>

            <p className="mt-3 border-t border-white/5 pt-2 font-space-grotesk text-[9px] font-medium uppercase tracking-wide text-[#E51B24]">
              {o.tag}
            </p>
          </article>
        ))}
      </motion.div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section: header + top slider + all category blocks                        */
/* -------------------------------------------------------------------------- */

export default function CustomizationSection({
  categories = customizationCategories,
  filters = customizationFilters,
  sliderItems = customizationSliderItems,
  eyebrow = "Select a category",
  titleWhite = "Explore",
  titleRed = "Custom Categories",
  debug = false,
}: CustomizationSectionProps) {
  const [activeKey, setActiveKey] = useState(sliderItems[0]?.key ?? "");

  const trackRef = useRef<HTMLDivElement>(null);

  /* Keep the active button visible inside the horizontal slider */
  useEffect(() => {
    const el = trackRef.current?.querySelector<HTMLElement>(
      `[data-key="${activeKey}"]`
    );

    el?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeKey]);

  /*
   * Smooth scroll happens ONLY when a category button is clicked.
   * Normal page scrolling does not change the active button.
   */
  const goTo = (item: CustomizationSliderItem) => {
    const el = document.getElementById(anchorId(item.targetId));

    if (!el) return;

    setActiveKey(item.key);

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const slideBy = (d: 1 | -1) => {
    const track = trackRef.current;

    if (!track) return;

    track.scrollBy({
      left: d * track.clientWidth * 0.6,
      behavior: "smooth",
    });
  };

  return (
    <SectionGlow className="relative overflow-hidden">
      <div className="mx-auto w-full max-w-[1180px] px-5 py-14 sm:px-8 lg:px-[30px] lg:py-20">
        {/* Header + slider arrows */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-4">
              <span className="font-space-grotesk text-[10px] font-medium uppercase tracking-[0.15em] text-white/50">
                {eyebrow}
              </span>

              <span
                aria-hidden
                className="h-px w-8 bg-[#E51B24]"
              />
            </div>

            <h2 className="mt-3 font-space-grotesk text-[28px] font-bold uppercase leading-[1.05] sm:text-[36px] lg:text-[44px]">
              <span className="block text-white">
                {titleWhite}
              </span>

              <span className="block text-[#E51B24]">
                {titleRed}
              </span>
            </h2>
          </div>

          {/* <div className="flex gap-2">
            <button
              type="button"
              aria-label="Slide left"
              onClick={() => slideBy(-1)}
              className={arrowBtn}
            >
              <ChevronLeft size={16} />
            </button>

            <button
              type="button"
              aria-label="Slide right"
              onClick={() => slideBy(1)}
              className={arrowBtn}
            >
              <ChevronRight size={16} />
            </button>
          </div> */}
        </div>

        {/* Slider: click = smooth scroll to that category */}
        <nav
          ref={trackRef}
          aria-label="Customization categories"
          className="mt-6 flex gap-2 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {sliderItems.map((item, i) => {
            const isActive = item.key === activeKey;

            return (
              <a
                key={item.key}
                href={`#${anchorId(item.targetId)}`}
                data-key={item.key}
                aria-current={isActive ? "true" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  goTo(item);
                }}
                className={`flex shrink-0 items-center gap-2.5 rounded-[3px] border px-4 py-2.5 font-space-grotesk text-[10px] font-bold uppercase tracking-wide transition-colors duration-200 sm:text-[11px] ${
                  isActive
                    ? "border-[#E51B24] bg-[#E51B24] text-white"
                    : "border-white/10 bg-[#111111] text-white/70 hover:border-[#E51B24]/60 hover:text-white"
                }`}
              >
                <span
                  className={
                    isActive
                      ? "text-white/70"
                      : "text-[#E51B24]"
                  }
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {item.label}
              </a>
            );
          })}
        </nav>

        {/* All categories, one after another */}
        <div className="mt-14 flex flex-col gap-12 lg:mt-16 lg:gap-16">
          {categories.map((c) => (
            <CategoryBlock
              key={c.id}
              category={c}
              filters={filters}
              debug={debug}
            />
          ))}
        </div>
      </div>
    </SectionGlow>
  );
}