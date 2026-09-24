import { ArrowUpRight } from "lucide-react";

/**
 * Header
 * ------
 * Top navigation bar (matches the Figma nav strip above the hero). Sits
 * directly above <HeroTitle />, so HeroTitle's decorative glow shows through
 * behind it if the header background is left transparent (default) — pass
 * a solid background only if you want the nav visually separated.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface HeaderConfig {
  brandName: string; // "ROKAI"
  links: NavLink[];
  ctaLabel: string; // "Get In Touch"
  ctaHref: string;
  accentColor?: string;
  /** Set true for a solid #0A0A0A bar instead of a transparent one over the hero glow */
  solidBackground?: boolean;
}

interface HeaderProps {
  config: HeaderConfig;
  className?: string;
}

export default function Header({ config, className = "" }: HeaderProps) {
  const accent = config.accentColor || "#E63946";

  return (
    <header
      className={`relative z-20 w-full font-space-grotesk ${
        config.solidBackground ? "bg-[#0A0A0A]" : "bg-transparent"
      } ${className}`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-5 sm:px-8 lg:px-12">
        {/* LOGO */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-extrabold text-white"
            style={{ backgroundColor: accent }}
          >
            R
          </span>
          <span className="text-lg font-extrabold uppercase tracking-tight text-white">
            {config.brandName}
          </span>
        </a>

        {/* NAV LINKS */}
        <nav className="hidden items-center gap-7 md:flex">
          {config.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-medium uppercase tracking-wide text-white/70 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href={config.ctaHref}
          className="flex h-10 shrink-0 items-center gap-2 rounded-md px-4 text-xs font-bold uppercase tracking-wider text-white transition hover:opacity-90"
          style={{ backgroundColor: accent }}
        >
          {config.ctaLabel}
          <ArrowUpRight size={14} />
        </a>
      </div>
    </header>
  );
}

export { Header };

export const DEFAULT_HEADER_CONFIG: HeaderConfig = {
  brandName: "ROKAI",
  links: [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories" },
    { label: "Services", href: "/services" },
    { label: "Programs", href: "/programs" },
    { label: "Contact", href: "/contact" },
    { label: "Blogs", href: "/blogs" },
    { label: "Resources", href: "/resources" },
  ],
  ctaLabel: "Get In Touch",
  ctaHref: "/contact",
};
