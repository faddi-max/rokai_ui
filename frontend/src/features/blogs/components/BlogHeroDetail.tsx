import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { BlogPost } from "@/shared/types/blogs";
import { blogcatagory } from "@/assets";

interface BlogHeroDetailMeta {
  primaryTopic?: string;
  suitableFor?: string;
  contentType?: string;
  lastReviewed?: string;
  expertReviewed?: boolean;
  readsCount?: number;
  secondaryImage?: string;
}

interface BlogHeroDetailProps {
  post: BlogPost;
  meta?: BlogHeroDetailMeta;
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function splitTitle(title: string) {
  const words = title.trim().split(/\s+/);
  if (words.length <= 4) return { lead: title, accent: "" };
  const mid = Math.ceil(words.length / 2);
  return { lead: words.slice(0, mid).join(" "), accent: words.slice(mid).join(" ") };
}


function getReviewCacheKey(post: BlogPost) {
  const fingerprint = (post as unknown as { updatedAt?: string }).updatedAt || post.publishedAt || post.date || "";
  return `blog-last-reviewed:${post.slug}:${fingerprint}`;
}

function readOrSetCachedReviewDate(post: BlogPost): string {
  if (typeof window === "undefined") return new Date().toISOString().slice(0, 10);
  const key = getReviewCacheKey(post);
  try {
    const cached = window.localStorage.getItem(key);
    if (cached) return cached;
    const today = new Date().toISOString().slice(0, 10);
    window.localStorage.setItem(key, today);
    return today;
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

export default function BlogHeroDetail({ post, meta = {} }: BlogHeroDetailProps) {
  const {
    primaryTopic = post.badgeLabel || "—",
    suitableFor = "Athletes & academies",
    contentType = "Long-form guide",
    lastReviewed,
    expertReviewed = true,
    readsCount,
    secondaryImage,
  } = meta;

  const { lead, accent } = splitTitle(post.title);
  const dateLabel = formatDate(post.date);

  // If the caller passes an explicit `lastReviewed`, that wins. Otherwise
  // fall back to the cached/auto-generated review date for this post.
  const [cachedReviewDate, setCachedReviewDate] = useState<string>("");

  useEffect(() => {
    if (lastReviewed) return;
    setCachedReviewDate(readOrSetCachedReviewDate(post));
  }, [post.slug, (post as unknown as { updatedAt?: string }).updatedAt, post.publishedAt, post.date, lastReviewed]);

  const lastReviewedLabel = lastReviewed || formatDate(cachedReviewDate);

  // Order matters here: Expert reviewed now comes before read time.
  const metaItems = [
    <span key="author">
      By <span className="text-white/85">{post.author}</span>
    </span>,
    dateLabel && <span key="date">{dateLabel}</span>,
    expertReviewed && (
      <span key="reviewed" className="flex items-center gap-1 text-emerald-400">
        <CheckIcon /> Expert reviewed
      </span>
    ),
    post.readTime && <span key="read">{post.readTime}</span>,
    !!readsCount && (
      <span key="reads" className="flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
        {readsCount >= 1000 ? `${(readsCount / 1000).toFixed(1)}k` : readsCount} reads
      </span>
    ),
  ].filter(Boolean);

  return (
    <section className="bg-[#0a0a0a] text-white font-space-grotesk px-6 py-16 md:px-10 lg:px-6 ">
      <div className=" mx-20">
        <div className="mb-6 flex items-center gap-2">
          <span className="h-[2px] w-6 bg-[#E63946]" />
          <Link
            to={`/blogs/category/${post.categorySlug}`}
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-[#E63946]"
          >
            {post.badgeLabel || "Article"}
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_260px]">
          <div>
            <h1 className="text-[34px] font-extrabold uppercase leading-[1.08] tracking-tight md:text-[46px]">
              <span className="block text-white">{lead}</span>
              {accent && (
                <span className="relative block text-[#E63946]">
                  {accent}
                  <span className="absolute -bottom-1 left-0 h-[3px] w-16 bg-[#E63946]" />
                </span>
              )}
            </h1>

            <p className="mt-6 max-w-[520px] text-[15px] leading-relaxed text-white/60">
              {post.excerpt}
            </p>

            <div className="mt-8 h-px w-full max-w-[560px] bg-white/10" />

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-white/60">
              {metaItems.map((item, i) => (
                <span key={i} className="flex items-center gap-5">
                  {i > 0 && <Dot />}
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:pt-1">
            <Fact label="Primary topic" value={primaryTopic} />
            <Fact label="Suitable for" value={suitableFor} />
            <Fact label="Content type" value={contentType} />
            <Fact label="Last reviewed" value={lastReviewedLabel} />
          </div>
        </div>

        {secondaryImage ? (
          <div className="relative mt-10 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/10">
            <BannerPhoto src={post.image} />
            <BannerPhoto src={secondaryImage} dark />
            <CenterBadge />
          </div>
        ) : (
          <div className="relative mt-10 overflow-hidden rounded-2xl border border-white/10">
            <BannerPhoto src={post.image} tall />
          </div>
        )}
      </div>
    </section>
  );
}

function Fact({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wide text-white/40">{label}</div>
      <div className="mt-1 text-[13px] font-semibold text-white">{value}</div>
    </div>
  );
}

function BannerPhoto({ src, dark, tall }: { src?: string; dark?: boolean; tall?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden ${tall ? "h-[380px]" : "h-[320px]"} ${
        dark ? "bg-black" : "bg-white/5"
      }`}
    >
      <img
        src={src || blogcatagory}
        alt="Blog banner"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = blogcatagory;
        }}
        className="h-full w-full object-cover"
      />
      <span className="absolute bottom-3 left-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#E63946] text-[10px] font-bold text-white">
        R
      </span>
    </div>
  );
}

function CenterBadge() {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E63946] text-sm font-bold">
          R
        </span>
        <span className="text-lg font-bold tracking-wide">ROKAI</span>
      </div>
      <span className="mt-1 text-[10px] uppercase tracking-[0.25em] text-white/50">
        Built to become
      </span>
    </div>
  );
}

function Dot() {
  return <span className="h-1 w-1 rounded-full bg-white/30" />;
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M2.5 6.2 5 8.7 9.5 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}