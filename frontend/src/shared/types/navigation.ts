import type { LucideIcon } from "lucide-react";

export type NavLink = {
  label: string;
  href: string;
  hasDropdown?: boolean;
};

export type FooterColumn = {
  title: string;
  links: string[];
};

export type SecurityItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type SocialLink = {
  label: string;
  icon: LucideIcon;
};
