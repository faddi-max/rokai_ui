import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { ChevronDown, ArrowUpRight, Menu, X, ArrowRight } from "lucide-react";
import { navLinks, type NavLink as NavLinkType } from "@/shared/config/navigation";
import Button from "@/shared/components/ui/Button";
import { logo } from "@/assets";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  // Handle outside click to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          <img src={logo} alt="Rokai logo" className="h-9 w-auto sm:h-11" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-10 lg:flex">
          <ul className="flex items-center gap-7">
            {navLinks.map((link: NavLinkType) => {
              const hasDropdown = Boolean(link.hasDropdown && link.dropdownItems?.length);
              const isDropdownOpen = activeDropdown === link.label;

              return (
                <li
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => hasDropdown && setActiveDropdown(link.label)}
                  onMouseLeave={() => hasDropdown && setActiveDropdown(null)}
                >
                  <div className="flex items-center">
                    <NavLink
                      to={link.href}
                      className={({ isActive }) =>
                        `flex items-center gap-1 font-space-grotesk text-[13px] font-bold tracking-wide transition-colors py-2 ${
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
                          className={`transition-transform duration-200 opacity-70 ${
                            isDropdownOpen ? "rotate-180 text-[#E51B24]" : ""
                          }`}
                        />
                      )}
                    </NavLink>
                  </div>

                  {/* Desktop Dropdown Flyout Card */}
                  {hasDropdown && isDropdownOpen && (
                    <div className="absolute left-0 top-full pt-2 w-[340px] animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="rounded-2xl border border-white/15 bg-[#121212] p-3 shadow-2xl backdrop-blur-xl">
                        <div className="px-3 py-2 border-b border-white/10 mb-2">
                          <Link
                            to={link.href}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center justify-between font-space-grotesk text-xs font-bold uppercase tracking-wider text-[#E51B24] hover:underline"
                          >
                            <span>Explore All {link.label}</span>
                            <ArrowRight size={13} />
                          </Link>
                        </div>
                        <ul className="flex flex-col gap-1">
                          {link.dropdownItems?.map((subItem) => (
                            <li key={subItem.label}>
                              <Link
                                to={subItem.href}
                                onClick={() => setActiveDropdown(null)}
                                className="group flex flex-col rounded-xl p-2.5 transition-colors hover:bg-white/5"
                              >
                                <span className="font-space-grotesk text-sm font-bold text-white group-hover:text-[#E51B24] transition-colors">
                                  {subItem.label}
                                </span>
                                <span className="text-[11px] text-white/50 leading-relaxed mt-0.5">
                                  {subItem.description}
                                </span>
                              </Link>
                            </li>
                          ))}
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

        {/* Mobile Hamburger Toggle */}
        <button
          className="text-white lg:hidden p-1.5 focus:outline-none focus:ring-2 focus:ring-[#E51B24] rounded-md"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Navigation Drawer */}
      {isMobileOpen && (
        <div className="flex max-h-[85vh] flex-col gap-4 overflow-y-auto border-t border-white/10 bg-[#111111] px-6 pb-6 pt-2 animate-in fade-in slide-in-from-top-2 duration-200 lg:hidden">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const hasDropdown = Boolean(link.hasDropdown && link.dropdownItems?.length);
              const isExpanded = mobileExpanded === link.label;

              return (
                <li key={link.label} className="border-b border-white/5 pb-1">
                  <div className="flex items-center justify-between">
                    <NavLink
                      to={link.href}
                      onClick={() => setIsMobileOpen(false)}
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
                          setMobileExpanded(isExpanded ? null : link.label)
                        }
                        aria-label={`Expand ${link.label}`}
                        className="p-2 text-white/70 hover:text-white"
                      >
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${
                            isExpanded ? "rotate-180 text-[#E51B24]" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Mobile Submenu accordion */}
                  {hasDropdown && isExpanded && (
                    <div className="mb-2 ml-3 flex flex-col gap-1.5 border-l-2 border-[#E51B24]/40 pl-3 pt-1">
                      {link.dropdownItems?.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.href}
                          onClick={() => setIsMobileOpen(false)}
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
