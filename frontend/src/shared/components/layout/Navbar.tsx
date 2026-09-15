import { useState } from "react";
import { ChevronDown, ArrowUpRight, Menu, X } from "lucide-react";
import { navLinks } from "@/shared/config/navigation";
import Button from "@/shared/components/ui/Button";
import { logo } from "@/assets";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  return (
    <header className="bg-black w-full">
      <nav className="max-w-[1512px] mx-auto flex items-center justify-between px-6 md:px-10 lg:px-16 py-5">
        <a href="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="Rokai logo" className="w-30 h-15" />
        </a>

        <div className="hidden lg:flex items-center gap-10">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="flex items-center gap-1 font-space-grotesk font-bold text-[12px] text-white hover:text-[#E51B24] transition-colors"
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown size={14} />}
                </a>
              </li>
            ))}
          </ul>

          <Button
            href="#contact"
            icon={ArrowUpRight}
            weight="medium"
            size="13px"
            className="w-[145px] h-[31px]"
          >
            Get In Touch
          </Button>
        </div>

        <button
          className="lg:hidden text-white"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {isMobileOpen && (
        <div className="lg:hidden px-6 pb-6 flex flex-col gap-4 bg-black">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-space-grotesk font-bold text-[12px] text-white"
            >
              {link.label}
            </a>
          ))}
          <Button
            href="#contact"
            icon={ArrowUpRight}
            weight="medium"
            size="13px"
            className="w-[145px] h-[31px]"
          >
            Get In Touch
          </Button>
        </div>
      )}
    </header>
  );
}
