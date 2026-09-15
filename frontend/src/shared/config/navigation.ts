export type NavLink = {
  label: string;
  href: string;
  hasDropdown?: boolean;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories", hasDropdown: true },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Programs", href: "/programs", hasDropdown: true },
  { label: "Contact", href: "/contact" },
  { label: "Blogs", href: "/blogs" },
  { label: "Resources", href: "/resources" },
];
