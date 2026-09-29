import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/shared/components/ui/Button";
import { InstagramIcon, FacebookIcon, LinkedinIcon, YoutubeIcon } from "@/shared/icons/socialmediaicons";
import type { LegalDocument } from "@/features/PrivacyPolicy/data/legalDocuments";

export type LegalContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export interface LegalSection {
  id: string;
  title: string;
  content: LegalContentBlock[];
}

export interface LegalPageLayoutProps {
  documents: LegalDocument[];
  activeSlug: string;
  onTabChange: (slug: string) => void;
  /** Background photo for the header, matching ContactHero's image-overlay treatment. */
  image?: string;
  imageAlt?: string;
  imageOpacity?: number;
}

const BG_COLOR = "#111111";
const CONTENT_BG = "#150B0C";

const GLOWS = [
  { width: 315, height: 315, top: 167, left: 688, color: "#E51B2487" },
  { width: 329, height: 329, top: 383, left: 919, color: "#E51B2487" },
];

const socialLinks = [
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: FacebookIcon, href: "#", label: "Facebook" },
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
  { icon: YoutubeIcon, href: "#", label: "YouTube" },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function LegalBlock({ block }: { block: LegalContentBlock }) {
  if (block.type === "list") {
    return (
      <ul className="flex flex-col gap-2.5">
        {block.items.map((entry) => (
          <li key={entry} className="flex items-start gap-2.5 font-space-grotesk text-[13px] leading-[21px] text-white/55 sm:text-[14px] sm:leading-[22px]">
            <span aria-hidden className="mt-[8px] size-[3px] shrink-0 rounded-full bg-[#E51B24]" />
            <span>{entry}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p className="font-space-grotesk text-[13px] leading-[21px] text-white/55 sm:text-[14px] sm:leading-[22px]">
      {block.text}
    </p>
  );
}

/**
 * One numbered section (01, 02…) with a title, optional intro paragraphs and
 * an optional bullet list. Hover state matches the Figma spec exactly:
 * width 760 / padding 18px 20px / border-left 2px #E63946 /
 * background #E639460E / rounded top-right + bottom-right 12px.
 * The border is transparent by default (not `border-l-0`) so the 2px hover
 * border never shifts the layout. Fades/slides up into view on scroll.
 */
function LegalSectionBlock({
  section,
  index,
  sectionRef,
}: {
  section: LegalSection;
  index: number;
  sectionRef: (el: HTMLElement | null) => void;
}) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.section
      id={section.id}
      ref={sectionRef}
      style={{ scrollMarginTop: "120px" }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group w-full max-w-[760px] rounded-tr-[12px] rounded-br-[12px] border-l-2 border-transparent py-[18px] pl-5 pr-5 -ml-5 transition-colors duration-300 hover:border-[#E63946] hover:bg-[#E639460E]"
    >
      <span className="font-space-grotesk text-[13px] font-bold leading-none text-[#E51B24]">
        {number}
      </span>

      <h2 className="mt-3 font-space-grotesk text-[19px] font-bold uppercase text-white sm:text-[21px]">
        {section.title}
      </h2>

      <div className="mt-3 flex flex-col gap-3">
        {section.content.map((block, i) => (
          <LegalBlock key={i} block={block} />
        ))}
      </div>
    </motion.section>
  );
}

export default function LegalPageLayout({
  documents,
  activeSlug,
  onTabChange,
  image,
  imageAlt = "Rokai combat sports apparel",
  imageOpacity = 0.28,
}: LegalPageLayoutProps) {
  const activeDoc = documents.find((d) => d.slug === activeSlug) ?? documents[0];
  const [activeId, setActiveId] = useState(activeDoc.sections[0]?.id ?? "");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    setActiveId(activeDoc.sections[0]?.id ?? "");
  }, [activeDoc.slug]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const topMost = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b));
          setActiveId(topMost.target.id);
        }
      },
      { rootMargin: "-100px 0px -70% 0px", threshold: 0 }
    );

    activeDoc.sections.forEach((section) => {
      const el = sectionRefs.current[section.id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeDoc]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative w-full" style={{ backgroundColor: CONTENT_BG }}>
      {/* --- Header — image-overlay hero, same treatment as ContactHero --- */}
      <section className="relative overflow-hidden" style={{ backgroundColor: BG_COLOR }}>
        <div className="pointer-events-none absolute inset-0">
          {image ? (
            <img src={image} alt={imageAlt} className="h-full w-full object-cover object-center" />
          ) : null}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: BG_COLOR, opacity: image ? 1 - imageOpacity : 1 }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `linear-gradient(180deg, rgba(17,17,17,0.35) 0%, rgba(17,17,17,0.55) 55%, ${CONTENT_BG} 100%)`,
            }}
          />

          <div className="relative hidden h-full max-w-[1512px] lg:block">
            {GLOWS.map((glow, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  width: glow.width,
                  height: glow.height,
                  top: glow.top,
                  left: glow.left,
                  backgroundColor: glow.color,
                  filter: "blur(500px)",
                }}
              />
            ))}
          </div>

          <div
            className="absolute -right-1/3 -top-1/4 h-[70vw] w-[70vw] max-h-[420px] max-w-[420px] rounded-full lg:hidden"
            style={{ backgroundColor: "#E51B2470", filter: "blur(120px)" }}
          />
        </div>

        <motion.div
          key={activeDoc.slug}
          variants={container}
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-5 flex min-h-[300px] flex-col justify-center gap-7 py-14 sm:mx-8 md:mx-10 lg:mx-[49px] lg:min-h-[420px] lg:py-20"
        >
          {/* Tab buttons — switch document, no navigation. Scale + flash on press. */}
          <motion.div variants={item} className="flex flex-wrap gap-3">
            {documents.map((doc) => {
              const isActive = doc.slug === activeDoc.slug;
              return (
                <motion.button
                  key={doc.slug}
                  type="button"
                  onClick={() => onTabChange(doc.slug)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className={`rounded-[6px] px-5 py-2.5 font-space-grotesk text-[13px] font-bold transition-colors duration-200 ${
                    isActive
                      ? "bg-[#E51B24] text-white"
                      : "border border-white/25 bg-transparent text-white hover:border-white/50"
                  }`}
                >
                  {doc.tabLabel}
                </motion.button>
              );
            })}
          </motion.div>

          <div className="flex max-w-[720px] flex-col gap-5">
            <motion.div variants={item} className="flex items-center gap-3">
              <span className="font-space-grotesk text-[13px] font-normal uppercase tracking-[0.08em] text-white/60">
                Rokai Policy Centre
              </span>
              <span aria-hidden className="h-px w-10 bg-[#E51B24]" />
            </motion.div>

            <motion.h1
              key={`${activeDoc.slug}-title`}
              variants={item}
              className="font-space-grotesk uppercase text-white"
              style={{
                fontWeight: 700,
                fontSize: "clamp(38px, 5.5vw, 80px)",
                lineHeight: "clamp(38px, 4.5vw, 60px)",
                letterSpacing: "0%",
              }}
            >
              <span className="text-white">{activeDoc.titleWhite} </span>
              <span className="text-[#E51B24]">{activeDoc.titleHighlight}</span>
            </motion.h1>

            {/* Two-segment underline mark, matching the Figma title accent */}
            <motion.div variants={item} className="flex items-center gap-2">
              <span className="h-[3px] w-12 bg-white" />
              <span className="h-[3px] w-3 bg-[#E51B24]" />
            </motion.div>

            {activeDoc.description && (
              <motion.p
                variants={item}
                className="max-w-[620px] font-space-grotesk text-[15px] font-normal leading-[1.6] text-white/75 sm:text-[16px]"
              >
                {activeDoc.description}
              </motion.p>
            )}

            {activeDoc.lastUpdated && (
              <motion.p variants={item} className="font-space-grotesk text-[12px] text-white/40">
                Last updated: {activeDoc.lastUpdated}
              </motion.p>
            )}
          </div>
        </motion.div>
      </section>

      {/* --- Sidebar + Content --- */}
      <div
        key={`${activeDoc.slug}-content`}
        className="relative z-10 mx-5 grid grid-cols-1 gap-10 py-14 sm:mx-8 md:mx-10 lg:mx-[49px] lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16 lg:py-16 lg:items-start"
      >
        <aside className="lg:sticky lg:top-[110px] lg:h-fit lg:self-start">
          <span className="mb-4 block font-space-grotesk text-[11px] font-bold uppercase tracking-[0.15em] text-[#E51B24]">
            On This Page
          </span>
          <nav className="flex flex-col gap-0.5 border-l border-white/10 pl-4">
            {activeDoc.sections.map((section) => {
              const isActive = activeId === section.id;
              return (
                <motion.a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => handleNavClick(e, section.id)}
                  whileTap={{ scale: 0.96, x: 2 }}
                  transition={{ duration: 0.15 }}
                  className={`relative py-1.5 font-space-grotesk text-[13px] leading-snug transition-colors duration-200 ${
                    isActive ? "font-bold text-[#E51B24]" : "text-white/50 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute -left-[17px] top-1/2 h-[16px] w-[2px] -translate-y-1/2 bg-[#E51B24]"
                    />
                  )}
                  {section.title}
                </motion.a>
              );
            })}
          </nav>
        </aside>

        <div className="flex flex-col">
          {activeDoc.sections.map((section, i) => (
            <LegalSectionBlock
              key={section.id}
              section={section}
              index={i}
              sectionRef={(el) => {
                sectionRefs.current[section.id] = el;
              }}
            />
          ))}
        </div>
      </div>

      {/* --- Footer bar: social icons (left) + CTA (right) --- */}
      <div className="mx-5 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pb-14 pt-8 sm:mx-8 md:mx-10 lg:mx-[49px]">
        <div className="flex items-center gap-2">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              aria-label={label}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-black transition-colors hover:bg-[#E51B24] hover:text-white"
            >
              <Icon size={16} />
            </motion.a>
          ))}
        </div>

        <motion.div whileTap={{ scale: 0.95 }} transition={{ duration: 0.15 }}>
          <Button
            href="/contact"
            variant="primary"
            icon={ArrowUpRight}
            weight="medium"
            size="12px"
            className="h-[38px] w-fit px-5"
          >
            Contact Us
          </Button>
        </motion.div>
      </div>
    </div>
  );
}