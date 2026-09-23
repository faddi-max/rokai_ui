import { useMemo } from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import type { BlogPost, BlogCategory } from "@/shared/types/blogs";

interface TocItem {
  id: string;
  label: string;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function highlightLastWords(el: Element, count = 2) {
  const text = el.textContent?.trim() || "";
  const words = text.split(/\s+/);
  if (words.length <= count) return;
  const lead = words.slice(0, words.length - count).join(" ");
  const accent = words.slice(words.length - count).join(" ");
  el.innerHTML = `${lead} <span class="text-[#E63946]">${accent}</span>`;
}

// Splits a stat/feature <li> into a short bold "label" + a muted "description".
// Priority: leading <strong>/<b> node → text before first colon → fallback: whole text as label only.
function splitStatItem(doc: Document, li: Element) {
  const firstEl = li.firstElementChild;

  if (firstEl && (firstEl.tagName === "STRONG" || firstEl.tagName === "B")) {
    const label = firstEl.textContent?.trim() || "";
    const rest = (li.textContent || "").replace(label, "").trim();
    li.innerHTML = "";
    const labelEl = doc.createElement("div");
    labelEl.setAttribute(
      "class",
      "mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#E63946]"
    );
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
    labelEl.setAttribute(
      "class",
      "mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#E63946]"
    );
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

function styleContent(html: string): { html: string; toc: TocItem[] } {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const toc: TocItem[] = [];
  const seen = new Map<string, number>();

  // Wrap tables so a wide table scrolls inside itself instead of pushing the page wider.
  doc.querySelectorAll("table").forEach((table) => {
    const wrapper = doc.createElement("div");
    wrapper.setAttribute("class", "table-wrap");
    table.parentNode?.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });

  // Guard every image so a broken/unreachable src shows a visible placeholder
  // instead of silently disappearing (helps spot bad URLs during dev).
  doc.querySelectorAll("img").forEach((img) => {
    img.setAttribute("loading", "lazy");
    const alt = img.getAttribute("alt") || "Image unavailable";
    img.setAttribute(
      "onerror",
      `this.onerror=null;this.src='data:image/svg+xml;utf8,` +
        `<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22450%22>` +
        `<rect width=%22100%25%22 height=%22100%25%22 fill=%22%23161616%22/>` +
        `<text x=%2250%25%22 y=%2250%25%22 fill=%22%23666%22 font-family=%22sans-serif%22 font-size=%2218%22 text-anchor=%22middle%22>Image unavailable</text>` +
        `</svg>';this.style.border='1px dashed rgba(255,255,255,0.15)';`
    );
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

    const eyebrow = doc.createElement("div");
    eyebrow.setAttribute(
      "class",
      "not-prose mb-3 mt-14 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E63946]"
    );
    eyebrow.innerHTML = `<span class="inline-block h-[2px] w-5 bg-[#E63946]"></span>${String(
      index + 1
    ).padStart(2, "0")}`;
    h2.parentNode?.insertBefore(eyebrow, h2);

    highlightLastWords(h2, 2);
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

  return { html: doc.body.innerHTML, toc };
}

interface BlogContentSectionProps {
  post: BlogPost;
  categories?: BlogCategory[];
}

export default function BlogContentSection({ post, categories = [] }: BlogContentSectionProps) {
  const { html: safeHtml, toc } = useMemo(() => {
    if (!post.content) return { html: "", toc: [] as TocItem[] };
    return styleContent(DOMPurify.sanitize(post.content));
  }, [post.content]);

  if (!post.content) return null;

  return (
    <section className="overflow-x-hidden bg-[#0a0a0a] px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          {toc.length > 0 && (
            <div className="mb-10">
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
                In this article
              </div>
              <nav className="flex flex-col gap-2 border-l border-white/10 pl-3">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="text-[13px] leading-snug text-white/55 transition-colors hover:text-[#E63946]"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          )}

          {categories.length > 0 && (
            <div>
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
                Explore categories
              </div>
              <nav className="flex flex-col gap-2">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    to={`/blogs/category/${c.slug}`}
                    className="text-[13px] text-white/55 transition-colors hover:text-[#E63946]"
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

      <div className="mx-auto mt-12 max-w-[1200px] border-t border-white/10 pt-6 lg:pl-[calc(220px+3rem)]">
        <Link to="/blogs" className="text-sm font-semibold text-[#E63946] underline">
          ← Back to all posts
        </Link>
      </div>

      <style>{`
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
          color: #E63946;
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
        .blog-article .table-wrap {
          margin: 1.5rem 0;
          overflow-x: auto;
        }
        .blog-article table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.85rem;
        }
        .blog-article table td,
        .blog-article table th {
          border: 1px solid rgba(255,255,255,0.1);
          padding: 0.65rem 0.9rem;
          color: rgba(255,255,255,0.6);
          text-align: left;
        }
        .blog-article table tr:first-child td {
          color: #ffffff;
          font-weight: 700;
        }
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
          font-weight: 800;
          font-size: 1.05rem;
          color: #E63946;
        }
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