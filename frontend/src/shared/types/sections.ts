import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export type PageHeroProps = {
  eyebrow?: string;
  headingLine1: string;
  headingLine2?: string;
  headingLine3?: string;
  headingHighlight: string;
  description: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  avatars?: string[];
  joinText?: string;
  heroImage?: string;
  productCard?: {
    image: string;
    name: string;
    subtitle?: string;
  };
  estdText?: string;
};

export type SectionHeaderProps = {
  eyebrow?: string;
  titleTop: string;
  titleBottom: string;
  description?: string;
  actions?: ReactNode;
  align?: "between" | "center" | "left";
};

export type ContentCardData = {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  description: string;
  tags?: string[];
  badge?: string;
  ctaText?: string;
  ctaHref?: string;
  variant?: "light" | "dark" | "resource";
};

export type SplitMediaData = {
  eyebrow?: string;
  titleTop: string;
  titleBottom: string;
  headingHighlight?: string;
  description: string;
  secondaryDescription?: string;
  media: {
    src: string;
    alt?: string;
    isVideo?: boolean;
    videoUrl?: string;
  };
  mediaPosition?: "left" | "right";
  checklist?: string[];
  cta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
};

export type ProcessStep = {
  stepNumber: string;
  title: string;
  subtitle?: string;
  description: string;
  icon?: LucideIcon;
};

export type FAQItemData = {
  id: string;
  question: string;
  answer: string;
  category?: string;
};

export type TrustStat = {
  value: string;
  label: string;
};

export type CTASectionProps = {
  eyebrow?: string;
  titleTop: string;
  titleHighlight: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
};
