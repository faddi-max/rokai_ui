import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ChevronDown,
  ArrowUpRight,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import {
  navLinks,
  type NavLink as NavLinkType,
} from "@/shared/config/navigation";
import Button from "@/shared/components/ui/Button";
import { logo } from "@/assets";
import { affiliateProgramhero } from "@/assets";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const programsLink = navLinks.find(
    (link) => link.label === "Programs"
  );

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-50 w-full bg-[#111111] shadow-[-6px_-8px_17px_0px_#F6F6F6]"
    >
      <nav className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-2.5 px-3 py-2.5">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2"
          onClick={() => {
            setIsMobileOpen(false);
            setActiveDropdown(null);
          }}
        >
          <img
            src={logo}
            alt="Rokai logo"
            className="h-9 w-auto sm:h-11"
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-10 lg:flex">
          <ul className="flex items-center gap-7">
            {navLinks.map((link: NavLinkType) => {
              const hasDropdown = Boolean(
                link.hasDropdown && link.dropdownItems?.length
              );

              const isDropdownOpen =
                activeDropdown === link.label;

              const isPrograms = link.label === "Programs";

              return (
                <li
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => {
                    if (hasDropdown) {
                      setActiveDropdown(link.label);
                    }
                  }}
                  onMouseLeave={() => {
                    if (hasDropdown) {
                      setActiveDropdown(null);
                    }
                  }}
                >
                  <div className="flex items-center">
                    <NavLink
                      to={link.href}
                      className={({ isActive }) =>
                        `flex items-center gap-1 py-2 font-space-grotesk text-[13px] font-bold tracking-wide transition-colors ${
                          isActive
                            ? "text-[#E51B24]"
                            : "text-white hover:text-[#E51B24]"
                        }`
                      }
                    >
                      {link.label}

                      {hasDropdown && (
                        <ChevronDown
                          size={14}
                          className={`opacity-70 transition-transform duration-200 ${
                            isDropdownOpen
                              ? "rotate-180 text-[#E51B24]"
                              : ""
                          }`}
                        />
                      )}
                    </NavLink>
                  </div>

                  {/* PROGRAMS SPECIAL DROPDOWN */}
                  {isPrograms &&
                    isDropdownOpen &&
                    programsLink && (
                      <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-[24px]">
                        <div className="w-[292px] rounded-[14px] border border-white/[0.04] bg-[#130E0F] p-[13px] shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
                          {/* FEATURED IMAGE */}
                          <Link
                            to="/programs#affiliate"
                            onClick={() =>
                              setActiveDropdown(null)
                            }
                            className="group relative block h-[145px] w-full overflow-hidden rounded-[6px]"
                          >
                            <img
                              src={affiliateProgramhero}
                              alt="BJJ Apparel Affiliate Program"
                              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                            <span className="absolute bottom-[14px] left-[15px] font-space-grotesk text-[13px] font-bold uppercase text-white">
                              Affiliate Program
                            </span>
                          </Link>

                          {/* FEATURED PROGRAM */}
                          <Link
                            to="/programs#affiliate"
                            onClick={() =>
                              setActiveDropdown(null)
                            }
                            className="mt-[16px] flex h-[48px] items-center justify-between rounded-[6px] bg-[#EF3340] px-[14px] transition-colors hover:bg-[#f23d49]"
                          >
                            <span className="font-playfair text-[14px] text-white">
                              BJJ Apparel Affiliate Program
                            </span>

                            <ArrowRight
                              size={16}
                              strokeWidth={1.5}
                              className="text-white"
                            />
                          </Link>

                          {/* OTHER PROGRAMS */}
                          <div className="mt-[7px]">
                            {programsLink.dropdownItems
                              ?.slice(1)
                              .map((program) => (
                                <Link
                                  key={program.label}
                                  to={program.href}
                                  onClick={() =>
                                    setActiveDropdown(null)
                                  }
                                  className="group flex min-h-[59px] items-center justify-between px-[14px] py-[10px]"
                                >
                                  <span className="max-w-[205px] font-space-grotesk text-[13px] leading-[18px] text-white/55 transition-colors group-hover:text-white">
                                    {program.label}
                                  </span>

                                  <ArrowRight
                                    size={15}
                                    strokeWidth={1.4}
                                    className="shrink-0 text-white/55 transition-all duration-200 group-hover:translate-x-1 group-hover:text-white"
                                  />
                                </Link>
                              ))}
                          </div>

                          {/* EXPLORE ALL */}
                          <Link
                            to="/programs"
                            onClick={() =>
                              setActiveDropdown(null)
                            }
                            className="mt-[4px] block px-[14px] pb-[4px] pt-[11px] font-space-grotesk text-[15px] font-bold text-[#EF3340] transition-colors hover:text-[#ff5964]"
                          >
                            Explore all Programs
                          </Link>
                        </div>
                      </div>
                    )}

                  {/* NORMAL DESKTOP DROPDOWN */}
                  {hasDropdown &&
                    !isPrograms &&
                    isDropdownOpen && (
                      <div className="absolute left-0 top-full w-[340px] pt-2">
                        <div className="rounded-2xl border border-white/15 bg-[#121212] p-3 shadow-2xl backdrop-blur-xl">
                          <div className="mb-2 border-b border-white/10 px-3 py-2">
                            <Link
                              to={link.href}
                              onClick={() =>
                                setActiveDropdown(null)
                              }
                              className="flex items-center justify-between font-space-grotesk text-xs font-bold uppercase tracking-wider text-[#E51B24] hover:underline"
                            >
                              <span>
                                Explore All {link.label}
                              </span>

                              <ArrowRight size={13} />
                            </Link>
                          </div>

                          <ul className="flex flex-col gap-1">
                            {link.dropdownItems?.map(
                              (subItem) => (
                                <li key={subItem.label}>
                                  <Link
                                    to={subItem.href}
                                    onClick={() =>
                                      setActiveDropdown(null)
                                    }
                                    className="group flex flex-col rounded-xl p-2.5 transition-colors hover:bg-white/5"
                                  >
                                    <span className="font-space-grotesk text-sm font-bold text-white transition-colors group-hover:text-[#E51B24]">
                                      {subItem.label}
                                    </span>

                                    <span className="mt-0.5 text-[11px] leading-relaxed text-white/50">
                                      {subItem.description}
                                    </span>
                                  </Link>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    )}
                </li>
              );
            })}
          </ul>

          <Button
            href="/contact"
            icon={ArrowUpRight}
            weight="medium"
            size="13px"
            className="h-[34px] px-5"
          >
            Get In Touch
          </Button>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="rounded-md p-1.5 text-white focus:outline-none focus:ring-2 focus:ring-[#E51B24] lg:hidden"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* MOBILE NAVIGATION */}
      {isMobileOpen && (
        <div className="flex max-h-[85vh] flex-col gap-4 overflow-y-auto border-t border-white/10 bg-[#111111] px-6 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const hasDropdown = Boolean(
                link.hasDropdown &&
                  link.dropdownItems?.length
              );

              const isExpanded =
                mobileExpanded === link.label;

              const isPrograms = link.label === "Programs";

              return (
                <li
                  key={link.label}
                  className="border-b border-white/5 pb-1"
                >
                  <div className="flex items-center justify-between">
                    <NavLink
                      to={link.href}
                      onClick={() => {
                        if (!hasDropdown) {
                          setIsMobileOpen(false);
                        }
                      }}
                      className={({ isActive }) =>
                        `py-2 font-space-grotesk text-[15px] font-bold transition-colors ${
                          isActive
                            ? "text-[#E51B24]"
                            : "text-white hover:text-[#E51B24]"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>

                    {hasDropdown && (
                      <button
                        onClick={() =>
                          setMobileExpanded(
                            isExpanded ? null : link.label
                          )
                        }
                        aria-label={`Expand ${link.label}`}
                        className="p-2 text-white/70 hover:text-white"
                      >
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${
                            isExpanded
                              ? "rotate-180 text-[#E51B24]"
                              : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* PROGRAMS MOBILE MENU */}
                  {isPrograms && isExpanded && (
                    <div className="mb-4 mt-2">
                      <div className="rounded-[10px] bg-[#130E0F] p-[10px]">
                        {/* IMAGE */}
                        <Link
                          to="/programs#affiliate"
                          onClick={() =>
                            setIsMobileOpen(false)
                          }
                          className="relative block h-[145px] overflow-hidden rounded-[6px]"
                        >
                          <img
                            src={affiliateProgramhero}
                            alt="BJJ Apparel Affiliate Program"
                            className="h-full w-full object-contain"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                          <span className="absolute bottom-[13px] left-[14px] font-space-grotesk text-[13px] font-bold uppercase text-white">
                            Affiliate Program
                          </span>
                        </Link>

                        {/* ACTIVE ITEM */}
                        <Link
                          to="/programs#affiliate"
                          onClick={() =>
                            setIsMobileOpen(false)
                          }
                          className="mt-[16px] flex min-h-[48px] items-center justify-between rounded-[6px] bg-[#EF3340] px-[14px]"
                        >
                          <span className="font-playfair text-[14px] text-white">
                            BJJ Apparel Affiliate Program
                          </span>

                          <ArrowRight
                            size={16}
                            strokeWidth={1.5}
                          />
                        </Link>

                        {/* OTHER ITEMS */}
                        {link.dropdownItems
                          ?.slice(1)
                          .map((program) => (
                            <Link
                              key={program.label}
                              to={program.href}
                              onClick={() =>
                                setIsMobileOpen(false)
                              }
                              className="flex min-h-[59px] items-center justify-between px-[14px] py-[10px]"
                            >
                              <span className="max-w-[205px] font-space-grotesk text-[13px] leading-[18px] text-white/55">
                                {program.label}
                              </span>

                              <ArrowRight
                                size={15}
                                strokeWidth={1.4}
                                className="shrink-0 text-white/55"
                              />
                            </Link>
                          ))}

                        {/* EXPLORE */}
                        <Link
                          to="/programs"
                          onClick={() =>
                            setIsMobileOpen(false)
                          }
                          className="block px-[14px] pb-[5px] pt-[10px] font-space-grotesk text-[15px] font-bold text-[#EF3340]"
                        >
                          Explore all Programs
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* NORMAL MOBILE SUBMENU */}
                  {hasDropdown &&
                    !isPrograms &&
                    isExpanded && (
                      <div className="mb-2 ml-3 flex flex-col gap-1.5 border-l-2 border-[#E51B24]/40 pl-3 pt-1">
                        {link.dropdownItems?.map((sub) => (
                          <Link
                            key={sub.label}
                            to={sub.href}
                            onClick={() =>
                              setIsMobileOpen(false)
                            }
                            className="py-1 font-space-grotesk text-xs text-white/80 hover:text-[#E51B24]"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                </li>
              );
            })}
          </ul>

          <div className="pt-2">
            <Button
              href="/contact"
              icon={ArrowUpRight}
              weight="medium"
              size="14px"
              className="h-[42px] w-full"
              onClick={() => setIsMobileOpen(false)}
            >
              Get In Touch
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}