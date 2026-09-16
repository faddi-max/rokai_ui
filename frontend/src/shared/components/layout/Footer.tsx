import { Link } from "react-router-dom";
import {
  CreditCard,
  BriefcaseBusiness,
  Camera,
  Globe2,
  LockKeyhole,
  Music2,
  Pin,
  Play,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { logo } from "@/assets";

type FooterLink = {
  label: string;
  href: string;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

type SecurityItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type SocialLink = {
  label: string;
  icon: LucideIcon;
};

const footerColumns: FooterColumn[] = [
  {
    title: "Products",
    links: [
      { label: "BJJ Training Gis", href: "/categories#catalog" },
      { label: "Competition Gis", href: "/categories#catalog" },
      { label: "Performance Rashguards", href: "/categories#catalog" },
      { label: "Fight & Grappling Shorts", href: "/categories#catalog" },
      { label: "MMA & Protective Gear", href: "/categories#catalog" },
      { label: "Academy Teamwear", href: "/categories#catalog" },
      { label: "Full Product Catalog", href: "/categories" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Combat Sports Brands", href: "/services#capabilities" },
      { label: "BJJ Academies & Dojos", href: "/programs#programs-catalog" },
      { label: "Academy Wholesale Club", href: "/programs#programs-catalog" },
      { label: "Private Label OEM", href: "/services#capabilities" },
      { label: "Brand Incubator", href: "/programs#programs-catalog" },
      { label: "Athlete Sponsorship", href: "/programs#programs-catalog" },
      { label: "Affiliate Program", href: "/programs#programs-catalog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "2026 Spec Sheets & Catalog", href: "/resources#downloads" },
      { label: "BJJ Gi Sizing Matrix", href: "/resources#sizing-matrix" },
      { label: "Vector Tech Pack Templates", href: "/resources#downloads" },
      { label: "IBJJF Compliance Guide", href: "/blogs" },
      { label: "Fabric Science & GSM", href: "/blogs" },
      { label: "Order Physical Swatches", href: "/contact#swatches" },
      { label: "All Technical Resources", href: "/resources" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Manufacturing", href: "/services" },
      { label: "AI Sizing Grading", href: "/services#capabilities" },
      { label: "Lab Testing Protocols", href: "/services" },
      { label: "Rokai Journal & Blogs", href: "/blogs" },
      { label: "Partnership Programs", href: "/programs" },
      { label: "Get a Production Quote", href: "/contact" },
      { label: "Factory Direct Contact", href: "/contact" },
    ],
  },
];

const socialLinks: SocialLink[] = [
  { label: "Facebook", icon: Globe2 },
  { label: "Instagram", icon: Camera },
  { label: "YouTube", icon: Play },
  { label: "LinkedIn", icon: BriefcaseBusiness },
  { label: "Pinterest", icon: Pin },
  { label: "TikTok", icon: Music2 },
];

const securityItems: SecurityItem[] = [
  {
    title: "Secure Website",
    description: "Your Data is Safe With Us.",
    icon: LockKeyhole,
  },
  {
    title: "SSL Encrypted",
    description: "Protected By SSL Encrypted.",
    icon: ShieldCheck,
  },
  {
    title: "Secure Payments",
    description: "Safe and Trusted Payments",
    icon: CreditCard,
  },
];

const PaymentMethods = () => (
  <div className="flex items-center gap-2" aria-label="Accepted payment methods">
    <span
      aria-label="Visa"
      className="flex h-7 w-11 items-center justify-center rounded border border-white/25 bg-white px-1 text-[11px] font-black italic tracking-[-0.08em] text-[#1434CB]"
    >
      VISA
    </span>
    <span
      aria-label="Mastercard"
      className="relative flex h-7 w-11 items-center justify-center overflow-hidden rounded border border-white/25 bg-white"
    >
      <span className="h-4 w-4 rounded-full bg-[#EB001B]" />
      <span className="-ml-1.5 h-4 w-4 rounded-full bg-[#F79E1B] opacity-90" />
    </span>
    <span
      aria-label="PayPal"
      className="flex h-7 w-11 items-center justify-center rounded border border-white/25 bg-white px-1 text-[10px] font-bold italic tracking-[-0.05em] text-[#003087]"
    >
      PayPal
    </span>
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1250px] border-t border-[#222] px-5 pb-8 pt-12 sm:px-8 md:pt-14 lg:px-0 lg:pt-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.35fr_repeat(4,1fr)] lg:gap-0">
          <div className="lg:pr-12">
            <Link to="/" className="inline-block">
              <img src={logo} alt="Rokai" className="h-auto w-[150px]" />
            </Link>
            <p className="mt-7 max-w-[390px] font-space-grotesk text-[17px] font-light leading-[23px] text-white">
              We specialize in custom BJJ apparel, jiu jitsu gear and private label manufacturing
              for academies, brands and athletes worldwide.
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {socialLinks.map(({ label, icon: Icon }) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  aria-label={label}
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-black transition-colors hover:bg-[#E51B24] hover:text-white"
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                </a>
              ))}
            </div>
          
          </div>

          {footerColumns.map((column) => (
            <nav
              key={column.title}
              aria-label={column.title}
              className="lg:border-l lg:border-[#222] lg:px-7 first:lg:pl-0"
            >
              <h2 className="font-space-grotesk text-[16px] font-bold leading-[20px] text-[#E51B24]">
                {column.title}
              </h2>
              <ul className="mt-5 flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="font-space-grotesk text-[14px] font-light leading-[18px] text-white transition-colors hover:text-[#E51B24]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 border-t border-[#222] pt-8 lg:mt-16">
          <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-4">
            <div className="flex flex-wrap items-start gap-x-5 gap-y-3 sm:gap-x-6">
              {securityItems.map(({ title, description, icon: Icon }) => (
                <div key={title} className="flex items-start gap-2.5">
                  <Icon className="mt-0.5 h-6 w-6 shrink-0 text-white" strokeWidth={1.5} />
                  <div>
                    <p className="font-space-grotesk text-[11px] font-bold leading-[14px] text-[#E51B24]">
                      {title}
                    </p>
                    <p className="mt-1 font-space-grotesk text-[10px] font-light leading-[14px] text-white">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <PaymentMethods />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-[#222] pt-6 font-space-grotesk text-[14px] font-light leading-[18px] text-white sm:flex-row sm:items-center sm:justify-between">
          <p>2026 ROKAI CORP. All Rights Reserved.</p>
          <nav aria-label="Legal" className="flex flex-wrap gap-4">
            <Link to="/contact" className="transition-colors hover:text-[#E51B24]">
              Privacy Policy
            </Link>
            <Link to="/contact" className="transition-colors hover:text-[#E51B24]">
              Terms of Manufacturing
            </Link>
            <Link to="/contact" className="transition-colors hover:text-[#E51B24]">
              Cookie Preferences
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
