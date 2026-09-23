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
  type NavSubItem,
  type CategoryLink,
} from "@/shared/config/navigation";
import Button from "@/shared/components/ui/Button";
import { logo } from "@/assets";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [hoveredProgram, setHoveredProgram] = useState<NavSubItem | null>(
    null
  );
  const [hoveredCategory, setHoveredCategory] = useState<CategoryLink | null>(
    null
  );
  const [mobileActiveCategory, setMobileActiveCategory] =
    useState<CategoryLink | null>(null);

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

  const categoriesLink = navLinks.find(
    (link) => link.label === "Categories"
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
                (link.hasDropdown && link.dropdownItems?.length) ||
                  (link.categories?.length && link.label === "Categories")
              );

              const isDropdownOpen = activeDropdown === link.label;

              const isPrograms = link.label === "Programs";
              const isCategories = link.label === "Categories";

              return (
                <li
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => {
                    if (hasDropdown) {
                      setActiveDropdown(link.label);
                      // No default selection — image + submenu only
                      // appear once the user actually hovers a category.
                    }
                  }}
                  onMouseLeave={() => {
                    if (hasDropdown) {
                      setActiveDropdown(null);
                      setHoveredProgram(null);
                      setHoveredCategory(null);
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
                          {/* IMAGE PREVIEW — only visible while hovering a specific link */}
                          <div
                            className={`overflow-hidden rounded-[6px] transition-all duration-300 ease-out ${
                              hoveredProgram
                                ? "mb-[13px] h-[145px] opacity-100"
                                : "mb-0 h-0 opacity-0"
                            }`}
                          >
                            {hoveredProgram && (
                              <Link
                                to={hoveredProgram.href}
                                onClick={() =>
                                  setActiveDropdown(null)
                                }
                                className="group relative block h-[145px] w-full"
                              >
                                <img
                                  src={hoveredProgram.image}
                                  alt={hoveredProgram.label}
                                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                                <span className="absolute bottom-[14px] left-[15px] font-space-grotesk text-[13px] font-bold uppercase text-white">
                                  {hoveredProgram.label}
                                </span>
                              </Link>
                            )}
                          </div>

                          {/* PROGRAM LIST */}
                          <div>
                            {programsLink.dropdownItems?.map(
                              (program) => {
                                const isHovered =
                                  hoveredProgram?.label ===
                                  program.label;

                                return (
                                  <Link
                                    key={program.label}
                                    to={program.href}
                                    onClick={() =>
                                      setActiveDropdown(null)
                                    }
                                    onMouseEnter={() =>
                                      setHoveredProgram(program)
                                    }
                                    className={`group flex min-h-[59px] items-center justify-between rounded-[6px] px-[14px] py-[10px] transition-colors duration-200 ${
                                      isHovered
                                        ? "bg-[#EF3340]"
                                        : ""
                                    }`}
                                  >
                                    <span
                                      className={`max-w-[205px] font-space-grotesk leading-[18px] transition-all duration-200 ${
                                        isHovered
                                          ? "text-[15px] font-bold text-white"
                                          : "text-[13px] text-white/55"
                                      }`}
                                    >
                                      {program.label}
                                    </span>

                                    <ArrowRight
                                      size={15}
                                      strokeWidth={1.4}
                                      className={`shrink-0 transition-all duration-200 ${
                                        isHovered
                                          ? "translate-x-1 text-white"
                                          : "text-white/55"
                                      }`}
                                    />
                                  </Link>
                                );
                              }
                            )}
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

                  {/* CATEGORIES MEGA MENU — nothing shown until hover; image + submenu animate in */}
                  {isCategories &&
                    isDropdownOpen &&
                    categoriesLink?.categories && (
                      <div className="absolute left-0 top-full z-50 pt-[24px]">
                        <div
                          className={`flex overflow-hidden rounded-[14px] border border-white/[0.04] bg-[#130E0F] shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-[width] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            hoveredCategory ? "w-[650px]" : "w-[230px]"
                          }`}
                        >
                          {/* LEFT: image preview + category list */}
                          <div className="w-[230px] shrink-0 border-r border-white/[0.06] p-[13px]">
                            <div
                              className={`overflow-hidden rounded-[6px] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                hoveredCategory?.image
                                  ? "mb-[13px] h-[140px] scale-100 opacity-100"
                                  : "mb-0 h-0 scale-95 opacity-0"
                              }`}
                            >
                              {hoveredCategory?.image && (
                                <Link
                                  to={hoveredCategory.href}
                                  onClick={() => setActiveDropdown(null)}
                                  className="group relative block h-[140px] w-full"
                                >
                                  <img
                                    src={hoveredCategory.image}
                                    alt={hoveredCategory.label}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                                  />

                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                  <span className="absolute bottom-[12px] left-[13px] font-space-grotesk text-[12px] font-bold uppercase text-white">
                                    {hoveredCategory.label}
                                  </span>
                                </Link>
                              )}
                            </div>

                            <div>
                              {categoriesLink.categories.map((category) => {
                                const isHovered =
                                  hoveredCategory?.label === category.label;

                                return (
                                  <Link
                                    key={category.label}
                                    to={category.href}
                                    onClick={() => setActiveDropdown(null)}
                                    onMouseEnter={() =>
                                      setHoveredCategory(category)
                                    }
                                    className={`group flex min-h-[48px] items-center justify-between rounded-[6px] px-[12px] py-[8px] transition-all duration-200 ${
                                      isHovered
                                        ? "bg-[#EF3340]"
                                        : "bg-transparent"
                                    }`}
                                  >
                                    <span
                                      className={`max-w-[160px] font-space-grotesk leading-[18px] transition-all duration-200 ${
                                        isHovered
                                          ? "text-[14px] font-bold text-white"
                                          : "text-[13px] text-white/55"
                                      }`}
                                    >
                                      {category.label}
                                    </span>

                                    <ArrowRight
                                      size={14}
                                      strokeWidth={1.4}
                                      className={`shrink-0 transition-all duration-200 ${
                                        isHovered
                                          ? "translate-x-1 text-white"
                                          : "text-white/55"
                                      }`}
                                    />
                                  </Link>
                                );
                              })}
                            </div>

                            <Link
                              to="/categories"
                              onClick={() => setActiveDropdown(null)}
                              className="mt-[4px] block px-[12px] pb-[4px] pt-[11px] font-space-grotesk text-[14px] font-bold text-[#EF3340] transition-colors hover:text-[#ff5964]"
                            >
                              Explore all categories
                            </Link>
                          </div>

                          {/* RIGHT: grouped sub-items — fades/slides in once a category is hovered */}
                          <div
                            className={`w-[420px] shrink-0 p-[16px] transition-all duration-300 ease-out ${
                              hoveredCategory
                                ? "translate-x-0 opacity-100 delay-[80ms]"
                                : "pointer-events-none translate-x-2 opacity-0"
                            }`}
                          >
                            {hoveredCategory && (
                              <>
                                <div className="mb-[24px] flex items-center justify-between border-b border-white/[0.06] pb-[10px]">
                                  <span className="flex items-center gap-[8px] font-space-grotesk text-[13px] font-bold uppercase tracking-wide text-white">
                                    <span
                                      aria-hidden
                                      className="size-[6px] shrink-0 rotate-45 bg-[#E51B24]"
                                    />
                                    {hoveredCategory.label}
                                  </span>

                              
                                </div>

                                <div className="flex flex-col gap-[26px]">
                                  {hoveredCategory.groups.map((group) => (
                                    <div
                                      key={group.title}
                                      className="flex flex-col gap-[7px]"
                                      style={{
                                        width: 175.84,
                                        borderLeft: "1px solid #333333",
                                        paddingLeft: 14,
                                        paddingRight: 14,
                                      }}
                                    >
                                      <p className="font-space-grotesk text-[11px] font-bold uppercase leading-none text-[#EEEEEE]">
                                        {group.title}
                                      </p>

                                      {group.items.map((item) => (
                                        <Link
                                          key={item.label}
                                          to={item.href}
                                          onClick={() =>
                                            setActiveDropdown(null)
                                          }
                                          className="font-space-grotesk text-[12px] font-normal leading-none text-[#B5B5B5] transition-colors hover:text-[#E51B24]"
                                        >
                                          {item.label}
                                        </Link>
                                      ))}
                                    </div>
                                  ))}
                                </div>

                                {hoveredCategory.quickLinks?.length ? (
                                  <div className="mt-[26px] flex flex-col gap-[9px]">
                                    {hoveredCategory.quickLinks.map((quick) => (
                                      <Link
                                        key={quick.label}
                                        to={quick.href}
                                        onClick={() => setActiveDropdown(null)}
                                        className="font-space-grotesk text-[12px] font-bold leading-none text-[#EF3340] transition-colors hover:text-[#ff5964]"
                                      >
                                        {quick.label}
                                      </Link>
                                    ))}
                                  </div>
                                ) : null}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                  {/* NORMAL DESKTOP DROPDOWN */}
                  {hasDropdown &&
                    !isPrograms &&
                    !isCategories &&
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
                (link.hasDropdown && link.dropdownItems?.length) ||
                  (link.categories?.length && link.label === "Categories")
              );

              const isExpanded = mobileExpanded === link.label;

              const isPrograms = link.label === "Programs";
              const isCategories = link.label === "Categories";

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
                        onClick={() => {
                          const next = isExpanded ? null : link.label;
                          setMobileExpanded(next);

                          if (isCategories && !next) {
                            setMobileActiveCategory(null);
                          }
                          // No default category — tap one of the chips
                          // below to reveal its image + groups.
                        }}
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

                  {/* PROGRAMS MOBILE MENU — no hover on touch, so each item shows its own image inline */}
                  {isPrograms && isExpanded && (
                    <div className="mb-4 mt-2">
                      <div className="rounded-[10px] bg-[#130E0F] p-[10px]">
                        {link.dropdownItems?.map((program) => (
                          <Link
                            key={program.label}
                            to={program.href}
                            onClick={() =>
                              setIsMobileOpen(false)
                            }
                            className="mb-[8px] block overflow-hidden rounded-[6px] last:mb-0"
                          >
                            <div className="relative h-[120px] w-full">
                              <img
                                src={program.image}
                                alt={program.label}
                                className="h-full w-full object-contain"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                              <span className="absolute bottom-[10px] left-[12px] font-space-grotesk text-[13px] font-bold uppercase text-white">
                                {program.label}
                              </span>
                            </div>
                          </Link>
                        ))}

                        {/* EXPLORE */}
                        <Link
                          to="/programs"
                          onClick={() =>
                            setIsMobileOpen(false)
                          }
                          className="block px-[4px] pb-[5px] pt-[10px] font-space-grotesk text-[15px] font-bold text-[#EF3340]"
                        >
                          Explore all Programs
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* CATEGORIES MOBILE MENU — tap a category to switch the groups shown below */}
                  {isCategories && isExpanded && (
                    <div className="mb-4 mt-2">
                      <div className="rounded-[10px] bg-[#130E0F] p-[10px]">
                        <div className="mb-[8px] flex flex-wrap gap-[6px]">
                          {link.categories?.map((category) => {
                            const isActive =
                              mobileActiveCategory?.label ===
                              category.label;

                            return (
                              <button
                                key={category.label}
                                onClick={() =>
                                  setMobileActiveCategory(category)
                                }
                                className={`rounded-[6px] px-[10px] py-[6px] font-space-grotesk text-[12px] font-bold transition-all duration-200 ${
                                  isActive
                                    ? "bg-[#EF3340] text-white"
                                    : "bg-white/5 text-white/60"
                                }`}
                              >
                                {category.label}
                              </button>
                            );
                          })}
                        </div>

                        <div
                          className={`overflow-hidden transition-all duration-300 ease-out ${
                            mobileActiveCategory?.image
                              ? "mb-[10px] h-[110px] opacity-100"
                              : "mb-0 h-0 opacity-0"
                          }`}
                        >
                          {mobileActiveCategory?.image && (
                            <div className="relative h-[110px] w-full rounded-[6px] overflow-hidden">
                              <img
                                src={mobileActiveCategory.image}
                                alt={mobileActiveCategory.label}
                                className="h-full w-full object-contain"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                              <span className="absolute bottom-[10px] left-[12px] font-space-grotesk text-[12px] font-bold uppercase text-white">
                                {mobileActiveCategory.label}
                              </span>
                            </div>
                          )}
                        </div>

                        {mobileActiveCategory && (
                          <div className="flex flex-col gap-[20px] px-[2px] pb-[4px] transition-opacity duration-300 ease-out opacity-100">
                            {mobileActiveCategory.groups.map((group) => (
                              <div key={group.title} className="flex flex-col gap-[8px]">
                                <p className="font-space-grotesk text-[11px] font-bold uppercase leading-none text-[#EEEEEE]">
                                  {group.title}
                                </p>

                                {group.items.map((item) => (
                                  <Link
                                    key={item.label}
                                    to={item.href}
                                    onClick={() =>
                                      setIsMobileOpen(false)
                                    }
                                    className="font-space-grotesk text-[12px] font-normal leading-none text-[#B5B5B5]"
                                  >
                                    {item.label}
                                  </Link>
                                ))}
                              </div>
                            ))}

                            {mobileActiveCategory.quickLinks?.length ? (
                              <div className="flex flex-col gap-[4px] border-t border-white/10 pt-[8px]">
                                {mobileActiveCategory.quickLinks.map(
                                  (quick) => (
                                    <Link
                                      key={quick.label}
                                      to={quick.href}
                                      onClick={() =>
                                        setIsMobileOpen(false)
                                      }
                                      className="font-space-grotesk text-[12px] font-bold text-[#EF3340]"
                                    >
                                      {quick.label}
                                    </Link>
                                  )
                                )}
                              </div>
                            ) : null}
                          </div>
                        )}

                        <Link
                          to="/categories"
                          onClick={() => setIsMobileOpen(false)}
                          className="mt-[10px] block px-[2px] pb-[5px] pt-[6px] font-space-grotesk text-[15px] font-bold text-[#EF3340]"
                        >
                          Explore all categories
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* NORMAL MOBILE SUBMENU */}
                  {hasDropdown &&
                    !isPrograms &&
                    !isCategories &&
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