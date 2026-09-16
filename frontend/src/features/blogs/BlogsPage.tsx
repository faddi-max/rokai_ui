import { useState } from "react";
import { ArrowUpRight, Calendar, Clock, BookOpen, Search, Mail } from "lucide-react";
import SectionEyebrow from "@/shared/components/ui/SectionEyebrow";
import Button from "@/shared/components/ui/Button";
import TrustBadgesSection from "@/shared/components/sections/TrustBadgesSection";
import CTASection from "@/shared/components/sections/CTASection";
import { useAsyncData } from "@/shared/hooks/useAsyncData";
import { blogsService } from "@/shared/api/services/blogsService";
import { DataLoader, GridSkeleton } from "@/shared/components/feedback";

const categories = [
  "All",
  "Technical Guides",
  "Academy Growth",
  "Material Science",
  "Industry Updates",
] as const;

export default function BlogsPage() {
  const { data: posts, loading, error, refetch } = useAsyncData(() =>
    blogsService.getBlogPosts()
  );

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const allPosts = posts || [];

  const filteredPosts = allPosts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = allPosts.find((p) => p.featured) || allPosts[0];

  return (
    <div className="bg-black text-white selection:bg-[#E51B24] selection:text-white">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-black pb-12 pt-8 lg:pb-16 lg:pt-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(229,27,36,0.2),transparent_65%)]" />

        <div className="relative mx-auto max-w-[1512px] px-6 text-center sm:px-10 lg:px-16">
          <SectionEyebrow label="TECHNICAL INSIGHTS & INDUSTRY INTELLIGENCE" />

          <h1 className="mt-6 font-space-grotesk text-[clamp(2.5rem,6vw,4.5rem)] font-bold uppercase leading-[1.05] text-white">
            ROKAI JOURNAL &
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #E51B24 0%, #690106 100%)",
              }}
            >
              COMBAT TEXTILE RESEARCH
            </span>
          </h1>

          <div className="mx-auto mt-4 h-[3px] w-20 bg-white" />

          <p className="mx-auto mt-6 max-w-2xl font-space-grotesk text-base leading-relaxed text-white/80 sm:text-lg">
            Engineering deep-dives, IBJJF compliance guidelines, fabric science,
            and pro shop growth strategies for coaches and apparel founders.
          </p>

          {/* Search & Category Filter Bar */}
          <div className="mx-auto mt-10 max-w-4xl">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-white/50" />
              <input
                type="text"
                placeholder="Search articles by topic, fabric, or keyword (e.g. IBJJF, Pearl Weave, Pro Shop)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-[#121212] py-3.5 pl-12 pr-4 font-space-grotesk text-sm text-white placeholder:text-white/40 focus:border-[#E51B24] focus:outline-none"
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4 py-2 font-space-grotesk text-xs font-bold uppercase tracking-wider transition-all ${
                    activeCategory === cat
                      ? "bg-[#E51B24] text-white shadow-lg shadow-[#E51B24]/30"
                      : "border border-white/15 bg-neutral-900 text-white/70 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Floating Trust Badges */}
      <TrustBadgesSection floating />

      {/* Main Articles Content with DataLoader */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-[1250px] px-6 sm:px-10 lg:px-0">
          <DataLoader
            loading={loading}
            error={error}
            data={posts}
            skeleton={<GridSkeleton count={6} columns={3} variant="resource" />}
            onRetry={refetch}
          >
            {() => (
              <>
                {/* Featured Story Showcase */}
                {activeCategory === "All" && searchQuery === "" && featuredPost && (
                  <div className="mb-14">
                    <div className="group relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-[#181818] to-black p-6 sm:p-10 lg:p-12 shadow-2xl transition-all duration-300 hover:border-[#E51B24]/60">
                      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-900">
                          <img
                            src={featuredPost.image}
                            alt={featuredPost.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <span className="absolute left-4 top-4 rounded-md bg-[#E51B24] px-3 py-1 font-space-grotesk text-xs font-bold uppercase tracking-wider text-white">
                            Featured Deep-Dive
                          </span>
                        </div>

                        <div className="flex flex-col justify-center">
                          <div className="flex items-center gap-3 font-space-grotesk text-xs text-white/60">
                            <span className="text-[#E51B24] font-semibold">{featuredPost.category}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {featuredPost.readTime}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              {featuredPost.date}
                            </span>
                          </div>

                          <h2 className="mt-4 font-space-grotesk text-2xl sm:text-3xl font-bold leading-tight text-white group-hover:text-[#E51B24] transition-colors">
                            {featuredPost.title}
                          </h2>

                          <p className="mt-4 font-space-grotesk text-sm sm:text-base leading-relaxed text-white/80">
                            {featuredPost.excerpt}
                          </p>

                          <div className="mt-6 flex items-center gap-3">
                            <img
                              src={featuredPost.author.avatar}
                              alt={featuredPost.author.name}
                              className="h-10 w-10 rounded-full border border-white/20 object-cover"
                            />
                            <div>
                              <p className="font-space-grotesk text-sm font-bold text-white">
                                {featuredPost.author.name}
                              </p>
                              <p className="text-xs text-white/60">{featuredPost.author.role}</p>
                            </div>
                          </div>

                          <div className="mt-8 flex flex-wrap gap-3">
                            <Button
                              href={`/contact?subject=${encodeURIComponent(featuredPost.title)}`}
                              icon={ArrowUpRight}
                              weight="medium"
                              size="14px"
                            >
                              Read Full Whitepaper
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Articles Grid */}
                <div className="mb-10 flex items-center justify-between">
                  <div>
                    <h3 className="font-space-grotesk text-xl sm:text-2xl font-bold text-white">
                      {activeCategory === "All" ? "All Research & Articles" : activeCategory}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/60 mt-1">
                      Showing {filteredPosts.length} published guides & articles
                    </p>
                  </div>
                </div>

                {filteredPosts.length === 0 ? (
                  <div className="rounded-2xl border border-white/10 bg-[#121212] p-12 text-center">
                    <BookOpen className="mx-auto h-12 w-12 text-white/30" />
                    <h4 className="mt-4 font-space-grotesk text-lg font-bold text-white">
                      No matching articles found
                    </h4>
                    <p className="mt-2 text-sm text-white/60">
                      Try searching for another keyword or selecting a different category filter.
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredPosts.map((post) => (
                      <article
                        key={post.id}
                        className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/15 bg-[#121212] p-6 transition-all duration-300 hover:border-[#E51B24] hover:bg-[#181818]"
                      >
                        <div>
                          <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-black">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <span className="absolute top-3 left-3 rounded bg-black/80 px-2.5 py-1 font-space-grotesk text-[11px] font-bold text-white backdrop-blur-md">
                              {post.category}
                            </span>
                          </div>

                          <div className="mt-4 flex items-center gap-2 font-space-grotesk text-xs text-white/50">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{post.readTime}</span>
                            <span>•</span>
                            <span>{post.date}</span>
                          </div>

                          <h4 className="mt-3 font-space-grotesk text-lg sm:text-xl font-bold leading-snug text-white group-hover:text-[#E51B24] transition-colors">
                            {post.title}
                          </h4>

                          <p className="mt-2.5 font-space-grotesk text-sm font-light leading-relaxed text-white/70 line-clamp-3">
                            {post.excerpt}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {post.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded bg-white/5 px-2 py-0.5 font-space-grotesk text-[11px] font-medium text-[#E51B24]"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={post.author.avatar}
                              alt={post.author.name}
                              className="h-8 w-8 rounded-full border border-white/20 object-cover"
                            />
                            <span className="font-space-grotesk text-xs font-medium text-white/80">
                              {post.author.name}
                            </span>
                          </div>

                          <a
                            href={`/contact?article=${encodeURIComponent(post.title)}`}
                            className="flex items-center gap-1 font-space-grotesk text-xs font-bold uppercase tracking-wider text-[#E51B24] hover:underline"
                          >
                            Read Guide
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </>
            )}
          </DataLoader>
        </div>
      </section>

      {/* Newsletter / Whitepaper Subscription Box */}
      <section className="py-16">
        <div className="mx-auto max-w-[1250px] px-6 sm:px-10 lg:px-0">
          <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-[#1a090a] via-black to-black p-8 sm:p-12 lg:p-16 text-center">
            <SectionEyebrow label="COMBAT APPAREL INTEL" />
            <h3 className="mt-4 font-space-grotesk text-2xl sm:text-4xl font-bold uppercase text-white">
              GET TEXTILE LAB REPORTS &<br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #E51B24 0%, #690106 100%)",
                }}
              >
                IBJJF COMPLIANCE UPDATES
              </span>
            </h3>
            <p className="mx-auto mt-4 max-w-xl font-space-grotesk text-sm sm:text-base text-white/80">
              Join 1,200+ academy owners, apparel brand founders, and head coaches
              who receive our monthly manufacturing bulletins. No spam, ever.
            </p>

            {subscribed ? (
              <div className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 font-space-grotesk text-sm font-bold text-white">
                <Mail className="h-5 w-5 text-[#E51B24]" />
                You are subscribed! Check your inbox for our 2026 Gi Sizing Whitepaper.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubscribed(true);
                }}
                className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  className="flex-1 rounded-lg border border-white/20 bg-black px-4 py-3 font-space-grotesk text-sm text-white placeholder:text-white/40 focus:border-[#E51B24] focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-[#E51B24] px-6 py-3 font-space-grotesk text-sm font-bold text-white transition-colors hover:bg-[#c9161e]"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <CTASection
        eyebrow="READY TO BUILD?"
        titleTop="PUT OUR TEXTILE SCIENCE"
        titleHighlight="INTO YOUR OWN GEAR"
        description="Schedule a technical consultation with our engineering team or request our complete physical fabric swatch book today."
        primaryCta={{
          label: "Start Custom Order",
          href: "/contact",
        }}
        secondaryCta={{
          label: "Request Swatches",
          href: "/contact#swatches",
        }}
      />
    </div>
  );
}
