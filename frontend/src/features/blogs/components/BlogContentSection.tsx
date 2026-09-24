import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import type { BlogPost, BlogCategory } from "@/shared/types/blogs";
import { sanitizeImageUrl } from "@/shared/api/services/blogsService";
import { blogcatagory } from "@/assets";
// Reusing the *actual* homepage FAQ item for pixel-perfect parity instead of
// re-styling h4/p pairs. Adjust this path if FAQItem lives elsewhere.
import FAQItem from "@/features/home/components/FAQItem";

interface TocItem {
  id: string;
  label: string;
}

interface FaqEntry {
  question: string;
  answer: string;
}

// Brand accent — Figma dev mode, node 768-5997 ("In This Article" text style).
const ACCENT = "#E63946";

// Figma "Eyebrow / Label" type spec (same node): Space Grotesk, 700, 12px,
// line-height 18px, letter-spacing 2px, uppercase, accent red. Used for
// "In This Article", "Explore Categories", "Author", and the h2 section
// markers (e.g. "03 — DRYING") so they all stay pixel-identical.
const EYEBROW_CLASS =
  "font-space-grotesk text-[12px] font-bold uppercase leading-[18px] tracking-[2px] text-accent";

// DOM id used to mount the FAQ accordion inside the raw article HTML via a portal.
const FAQ_MOUNT_ID = "blog-content-faq-mount";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("");
}

// Strips stray "(H2)" / "(H3)" / "(H4)" labels that sometimes leak into
// heading text from the source content — not a styling issue, a data one.
function stripHeadingTag(text: string) {
  return text.replace(/\(H[1-6]\)\s*$/i, "").trim();
}

function highlightLastWords(el: Element, count = 2) {
  const text = el.textContent?.trim() || "";
  const words = text.split(/\s+/);
  if (words.length <= count) return;
  const lead = words.slice(0, words.length - count).join(" ");
  const accent = words.slice(words.length - count).join(" ");
  el.innerHTML = `${lead} <span class="text-accent">${accent}</span>`;
}

// Splits a stat/feature <li> into a short bold red "label" + a muted "description".
// Priority: leading <strong>/<b> node → text before first colon → fallback: whole text as label only.
function splitStatItem(doc: Document, li: Element) {
  const firstEl = li.firstElementChild;

  if (firstEl && (firstEl.tagName === "STRONG" || firstEl.tagName === "B")) {
    const label = firstEl.textContent?.trim() || "";
    const rest = (li.textContent || "").replace(label, "").trim();
    li.innerHTML = "";
    const labelEl = doc.createElement("div");
    labelEl.setAttribute("class", "mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-accent");
    labelEl.textContent = label;
    li.appendChild(labelEl);
    if (rest) {
      const descEl = doc.createElement("div");
      descEl.setAttribute("class", "text-[13px] leading-snug text-white/50");
      descEl.textContent = rest;
      li.appendChild(descEl);
    }
    return;
  }

  const raw = li.textContent?.trim() || "";
  const colonIndex = raw.indexOf(":");
  if (colonIndex > 0 && colonIndex < 30) {
    const label = raw.slice(0, colonIndex).trim();
    const rest = raw.slice(colonIndex + 1).trim();
    li.innerHTML = "";
    const labelEl = doc.createElement("div");
    labelEl.setAttribute("class", "mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-accent");
    labelEl.textContent = label;
    li.appendChild(labelEl);
    const descEl = doc.createElement("div");
    descEl.setAttribute("class", "text-[13px] leading-snug text-white/50");
    descEl.textContent = rest;
    li.appendChild(descEl);
    return;
  }

  // No natural split point — keep as a single muted line (still fits the grid look).
  li.setAttribute("class", `${li.getAttribute("class") || ""} text-white/55`.trim());
}

// Turns a single-<i> callout paragraph into a two-tier box: bold headline + muted subtext,
// when the source text has more than one sentence. Falls back to one bold line otherwise.
// Matches the solid white "quote" box style (e.g. "Your Gi works hard...").
function styleCallout(doc: Document, p: Element, italicEl: Element) {
  const text = italicEl.textContent?.trim() || "";
  const sentenceMatch = text.match(/^(.*?[.!?])\s*(.*)$/s);

  if (sentenceMatch && sentenceMatch[2]) {
    const [, headline, rest] = sentenceMatch;
    p.innerHTML = "";
    const headlineEl = doc.createElement("div");
    headlineEl.setAttribute("class", "text-[1.05rem] font-bold leading-tight text-[#0a0a0a]");
    headlineEl.textContent = headline;
    p.appendChild(headlineEl);
    const restEl = doc.createElement("div");
    restEl.setAttribute("class", "mt-1.5 text-[13px] font-medium leading-snug text-[#0a0a0a]/60");
    restEl.textContent = rest;
    p.appendChild(restEl);
  }
  // else: leave the single <i> line as-is; base .callout-box styling already bolds it.

  p.setAttribute("class", `${p.getAttribute("class") || ""} callout-box`.trim());
}

// Different posts label their FAQ section differently ("FAQ", "FAQs",
// "Frequently Asked Questions", "Common Questions", "Q&A"...) — match all of them.
const FAQ_HEADING_RE =
  /\b(faqs?|frequently\s+asked\s+questions?|common\s+questions?|questions?\s*(&|and)\s*answers?|q\s*&\s*a)\b/i;

// A question can be marked up as a real heading (h3/h4) OR as a plain
// paragraph that just starts with a number, e.g. "1. What does gi mean?" —
// content sources are inconsistent about this, so both are treated the same.
function isFaqQuestionNode(el: Element): boolean {
  if (el.tagName === "H3" || el.tagName === "H4") return true;
  if (el.tagName === "P") {
    const text = (el.textContent || "").trim();
    return /^\(?\d{1,2}[.)]\s+.+\?$/.test(text);
  }
  return false;
}

// Detects an FAQ section and pulls its question/answer pairs out of the flow
// into a data array, leaving a mount point behind so the real FAQItem
// accordion can be portaled in. Answers are normalized regardless of source
// formatting: a plain paragraph, multiple paragraphs, or a bullet list
// (flattened to "• point" lines) are all collected the same way, so every
// post ends up rendering through the identical accordion.
function extractFaqSection(doc: Document, h2: Element): FaqEntry[] {
  const items: FaqEntry[] = [];
  const toRemove: Element[] = [];
  let node = h2.nextElementSibling;

  while (node && node.tagName !== "H2") {
    if (isFaqQuestionNode(node)) {
      const question = stripHeadingTag(node.textContent || "");
      toRemove.push(node);

      const answerParts: string[] = [];
      let answerNode = node.nextElementSibling;
      while (answerNode && answerNode.tagName !== "H2" && !isFaqQuestionNode(answerNode)) {
        if (answerNode.tagName === "P") {
          const text = (answerNode.textContent || "").trim();
          if (text) answerParts.push(text);
        } else if (answerNode.tagName === "UL" || answerNode.tagName === "OL") {
          const points = Array.from(answerNode.querySelectorAll(":scope > li"))
            .map((li) => (li.textContent || "").trim())
            .filter(Boolean);
          if (points.length) answerParts.push(points.map((pt) => `• ${pt}`).join("\n"));
        }
        toRemove.push(answerNode);
        answerNode = answerNode.nextElementSibling;
      }

      if (question) items.push({ question, answer: answerParts.join("\n\n") });
      node = answerNode;
      continue;
    }
    node = node.nextElementSibling;
  }

  if (items.length) {
    toRemove.forEach((el) => el.remove());
    const mount = doc.createElement("div");
    mount.id = FAQ_MOUNT_ID;
    mount.setAttribute("class", "not-prose mt-6");
    h2.parentNode?.insertBefore(mount, h2.nextSibling);
  }

  return items;
}

function styleContent(html: string): { html: string; toc: TocItem[]; faqItems: FaqEntry[] } {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const toc: TocItem[] = [];
  const seen = new Map<string, number>();
  let faqItems: FaqEntry[] = [];

  // Strip stray "(H2)/(H3)/(H4)" artifacts from all heading text up front.
  doc.querySelectorAll("h2, h3, h4").forEach((el) => {
    const cleaned = stripHeadingTag(el.textContent || "");
    if (cleaned !== (el.textContent || "").trim()) el.textContent = cleaned;
  });

  // Wrap tables so a wide table scrolls inside itself instead of pushing the page wider.
  doc.querySelectorAll("table").forEach((table) => {
    const wrapper = doc.createElement("div");
    wrapper.setAttribute("class", "table-wrap");
    table.parentNode?.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });

  // Guard every image: normalize the src, and fall back to the local
  // category placeholder asset if it fails to load.
  doc.querySelectorAll("img").forEach((img) => {
    img.setAttribute("loading", "lazy");
    const rawSrc = img.getAttribute("src");
    if (rawSrc) {
      img.setAttribute("src", sanitizeImageUrl(rawSrc));
    }
    const alt = img.getAttribute("alt") || "Blog post image";
    img.setAttribute("onerror", `this.onerror=null;this.src='${blogcatagory}';`);
    img.setAttribute("alt", alt);
  });

  const h2s = Array.from(doc.querySelectorAll("h2"));
  h2s.forEach((h2, index) => {
    const label = h2.textContent?.trim() || "";
    if (!label) return;

    let id = slugify(label);
    const count = seen.get(id) ?? 0;
    seen.set(id, count + 1);
    if (count > 0) id = `${id}-${count}`;
    h2.id = id;
    h2.setAttribute("style", "scroll-margin-top: 6rem");
    toc.push({ id, label });

    // "03 — DRYING" style eyebrow, matching the reference pages' section markers.
    const eyebrow = doc.createElement("div");
    eyebrow.setAttribute(
      "class",
      `not-prose mb-3 mt-14 flex items-center gap-2 ${EYEBROW_CLASS}`
    );
    eyebrow.innerHTML = `<span class="inline-block h-[2px] w-5" style="background:${ACCENT}"></span>${String(
      index + 1
    ).padStart(2, "0")}`;
    h2.parentNode?.insertBefore(eyebrow, h2);

    highlightLastWords(h2, 2);

    // Only the first FAQ-labeled h2 is extracted — most posts have one.
    if (!faqItems.length && FAQ_HEADING_RE.test(label)) {
      faqItems = extractFaqSection(doc, h2);
    }
  });

  doc.querySelectorAll("ol").forEach((ol) => {
    ol.setAttribute("class", `${ol.getAttribute("class") || ""} step-list`.trim());
  });

  doc.querySelectorAll("ul").forEach((ul) => {
    const items = Array.from(ul.querySelectorAll(":scope > li"));
    const isStatRow =
      items.length >= 2 &&
      items.length <= 4 &&
      items.every((li) => (li.textContent?.trim().length || 0) <= 60);
    if (isStatRow) {
      ul.setAttribute("class", `${ul.getAttribute("class") || ""} stat-grid`.trim());
      items.forEach((li) => splitStatItem(doc, li));
    }
  });

  doc.querySelectorAll("p").forEach((p) => {
    const onlyChild = p.children.length === 1 ? p.children[0] : null;
    if (onlyChild && onlyChild.tagName === "I" && onlyChild.textContent?.trim()) {
      styleCallout(doc, p, onlyChild);
    }
  });

  return { html: doc.body.innerHTML, toc, faqItems };
}

interface BlogContentSectionProps {
  post: BlogPost;
  categories?: BlogCategory[];
}

export default function BlogContentSection({ post, categories = [] }: BlogContentSectionProps) {
  const { html: safeHtml, toc, faqItems } = useMemo(() => {
    if (!post.content) return { html: "", toc: [] as TocItem[], faqItems: [] as FaqEntry[] };
    return styleContent(DOMPurify.sanitize(post.content));
  }, [post.content]);

  // The FAQ mount div only exists in the DOM after dangerouslySetInnerHTML
  // has actually rendered, so grab it post-mount and portal the real
  // FAQItem accordion into it.
  const [faqMountEl, setFaqMountEl] = useState<HTMLElement | null>(null);
  const [activeFaq, setActiveFaq] = useState(0);

  useEffect(() => {
    setFaqMountEl(faqItems.length ? document.getElementById(FAQ_MOUNT_ID) : null);
    setActiveFaq(0);
  }, [safeHtml, faqItems.length]);

  if (!post.content) return null;


  const handleTocClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  };

  const authorName = post.author;
  const authorBio = (post as unknown as { author_bio?: string }).author_bio;

  return (
   <section className="bg-[#0a0a0a] px-6 py-16 md:px-10 lg:px-6">
      <div className=" grid grid-cols-1 gap-10 lg:grid-cols-[220px_minmax(0,1fr)] mx-5 lg:mx-20">
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          {toc.length > 0 && (
            <div className="mb-10">
              <div className={`${EYEBROW_CLASS} mb-3`}>In this article</div>
              <nav className="flex flex-col gap-2 border-l border-white/10 pl-3">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleTocClick(e, item.id)}
                    className="text-[13px] leading-snug text-white/55 transition-colors duration-300 hover:text-accent"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          )}

          {categories.length > 0 && (
            <div>
              <div className={`${EYEBROW_CLASS} mb-3`}>Explore categories</div>
              <nav className="flex flex-col gap-2">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    to={`/blogs/category/${c.slug}`}
                    className="text-[13px] text-white/55 transition-colors hover:text-accent"
                  >
                    {c.title}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </aside>

        <article
          className="blog-article min-w-0 max-w-none"
          dangerouslySetInnerHTML={{ __html: safeHtml }}
        />
      </div>

      {faqMountEl &&
        faqItems.length > 0 &&
        createPortal(
          <div className="flex flex-col divide-y divide-white/10 border-t border-white/10">
            {faqItems.map((faq, i) => (
              <FAQItem
                key={`${faq.question}-${i}`}
                faq={faq}
                index={i}
                isOpen={activeFaq === i}
                onToggle={() => setActiveFaq(activeFaq === i ? -1 : i)}
              />
            ))}
          </div>,
          faqMountEl
        )}

      {authorName && (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mx-auto mt-12 border-t border-white/10 pt-10 lg:pl-[calc(220px+2.5rem)]"
        >
          <div className={`${EYEBROW_CLASS} mb-4`}>Author</div>
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-black font-space-grotesk text-[15px] font-bold text-accent">
              {getInitials(authorName)}
            </div>
            <div>
              <div className="font-space-grotesk text-[17px] font-bold text-white">
                {authorName}
              </div>
              {authorBio && (
                <p className="mt-1 max-w-[560px] text-[13px] leading-relaxed text-white/55">
                  {authorBio}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}

      <style>{`
        .text-accent { color: ${ACCENT}; }

        .blog-article {
          font-family: inherit;
          color: rgba(255,255,255,0.6);
          line-height: 1.75;
        }
        .blog-article h2 {
          margin-top: 0;
          margin-bottom: 1rem;
          font-family: "Space Grotesk", sans-serif;
          font-weight: 700;
          font-size: 1.5rem;
          line-height: 1.25;
          text-transform: uppercase;
          color: #ffffff;
        }
        .blog-article h3 {
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          font-family: "Space Grotesk", sans-serif;
          font-weight: 700;
          font-size: 1.125rem;
          line-height: 1.35;
          color: #ffffff;
        }
        .blog-article p {
          margin: 1.1rem 0;
          font-size: 0.95rem;
          line-height: 1.75;
          color: rgba(255,255,255,0.6);
        }
        .blog-article ul:not(.stat-grid),
        .blog-article ol:not(.step-list) {
          margin: 1.1rem 0;
          padding-left: 1.25rem;
          list-style: disc;
        }
        .blog-article ul:not(.stat-grid) > li,
        .blog-article ol:not(.step-list) > li {
          margin: 0.4rem 0;
          color: rgba(255,255,255,0.6);
        }
        .blog-article a {
          color: ${ACCENT};
          text-decoration: none;
        }
        .blog-article a:hover {
          text-decoration: underline;
        }
        .blog-article strong {
          color: #ffffff;
          font-weight: 700;
        }
        .blog-article img {
          display: block;
          max-width: 100%;
          height: auto;
          margin: 1.5rem 0;
          border-radius: 0.75rem;
        }

        /* Comparison table — dark surface, bold uppercase header row with a
           red underline, hairline row dividers (matches the Apex/Kessho/Pro
           Protocol comparison block). */
        .blog-article .table-wrap {
          margin: 2rem 0;
          overflow-x: auto;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 0.5rem;
        }
        .blog-article table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.85rem;
          background: #111111;
        }
        .blog-article table td,
        .blog-article table th {
          padding: 0.85rem 1.1rem;
          text-align: left;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .blog-article table tr:last-child td {
          border-bottom: none;
        }
        .blog-article table tr:first-child td {
          color: #ffffff;
          font-family: "Space Grotesk", sans-serif;
          font-weight: 700;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          border-bottom: 2px solid ${ACCENT};
        }
        .blog-article table tr:not(:first-child) td:first-child {
          color: #ffffff;
          font-weight: 600;
        }
        .blog-article table tr:not(:first-child) td {
          color: rgba(255,255,255,0.55);
        }

        /* Numbered step list — large red counters (01, 02, 03…). */
        .blog-article .step-list {
          list-style: none;
          margin: 1.5rem 0;
          padding: 0;
          counter-reset: step;
        }
        .blog-article .step-list > li {
          counter-increment: step;
          position: relative;
          padding-left: 3rem;
          padding-bottom: 1.25rem;
          margin: 0;
        }
        .blog-article .step-list > li::before {
          content: counter(step, decimal-leading-zero);
          position: absolute;
          left: 0;
          top: -0.1rem;
          font-family: "Space Grotesk", sans-serif;
          font-weight: 800;
          font-size: 1.05rem;
          color: ${ACCENT};
        }

        /* Stat row — 2-4 short items split into a red micro-label + muted line,
           separated by hairline rules (matches FIT / FABRIC / HYGIENE). */
        .blog-article .stat-grid {
          list-style: none;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0;
          margin: 2rem 0;
          padding: 0;
          border-top: 1px solid rgba(255,255,255,0.1);
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        @media (min-width: 640px) {
          .blog-article .stat-grid {
            grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
            grid-auto-flow: column;
          }
        }
        .blog-article .stat-grid > li {
          min-width: 0;
          padding: 1rem 1.25rem;
          border-left: 1px solid rgba(255,255,255,0.1);
          border-top: 1px solid rgba(255,255,255,0.1);
          font-size: 0.8rem;
          color: rgba(255,255,255,0.55);
        }
        @media (min-width: 640px) {
          .blog-article .stat-grid > li {
            border-top: none;
          }
          .blog-article .stat-grid > li:first-child {
            border-left: none;
            padding-left: 0;
          }
        }

        /* Solid quote box — white bg, bold black text (e.g. "Your Gi works hard..."). */
        .blog-article .callout-box {
          background: #ffffff;
          color: #0a0a0a;
          font-weight: 700;
          font-size: 1.05rem;
          line-height: 1.4;
          padding: 1.25rem 1.5rem;
          border-radius: 0.75rem;
          margin: 2rem 0;
        }
        .blog-article .callout-box i {
          font-style: normal;
        }
      `}</style>
    </section>
  );
}