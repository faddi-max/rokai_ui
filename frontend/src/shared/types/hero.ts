export interface HeroHeadingLine {
  text: string;
  highlight?: boolean;
}

export interface HeroCta {
  label: string;
  href: string;
}

export interface HeroJoinRow {
  type: "join";
  avatars: string[];
  joinText: string;
}

export interface HeroBadge {
  value: string;
  label: string;
}

export interface HeroBadgeRow {
  type: "badges";
  badges: HeroBadge[];
}

export type HeroSecondaryRow = HeroJoinRow | HeroBadgeRow;

export interface HeroModelVisual {
  type: "model";
  image: string;
  imageAlt: string;
  productCard: {
    image: string;
    imageAlt: string;
    name: string;
  };
  caption?: string;
}

export interface HeroImageVisual {
  type: "image";
  image: string;
  imageAlt: string;
}

/** Positioned in px against the unpadded 1512px hero frame, same coordinate space as HeroGlow. */
export interface HeroImagePosition {
  width: number;
  height: number;
  top: number;
  left: number;
  opacity?: number;
  angle?: number;
}

/** Full-bleed background photo, positioned like the glows (used by the blog hero). */
export interface HeroBackgroundVisual {
  type: "background";
  image: string;
  imageAlt: string;
  position: HeroImagePosition;
}

export type HeroVisual = HeroModelVisual | HeroImageVisual | HeroBackgroundVisual;

/** One blurred glow shape, in px, positioned against the unpadded 1512px hero frame. */
export interface HeroGlow {
  width: number;
  height: number;
  top: number;
  left: number;
 
  color: string;
  blur: number;
}

export interface HeroBackground {
  sectionClassName?: string;
  bgColor?: string;  
  heightPx?: number;   
  glows?: HeroGlow[];
  /** Optional gradient or color overlay rendered over a background hero image. */
  imageOverlay?: string;
}
export interface HeroSubscribeCta {
  placeholder: string;
  buttonLabel: string;
  onSubmit?: (email: string) => void;
}
export interface HeroFloatingBadge {
  value: string;
  label: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}

export interface HeroContent {
   eyebrow?: string;
  headingLines: HeroHeadingLine[];
  description: string;
  /** Omit both when using `subscribe` instead. */
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  secondaryRow?: HeroSecondaryRow;
  visual: HeroVisual;
  background?: HeroBackground;
  /** Renders an email input + button in place of primaryCta/secondaryCta. */
  subscribe?: HeroSubscribeCta;
}
export type { BlogCategory } from "./blogs";

export interface BlogPageData {
  hero: HeroContent;
  categories: import("./blogs").BlogCategory[];
}
export interface HeroModelVisual {
  type: "model";
  image: string;
  imageAlt: string;
  productCard: {
    image: string;
    imageAlt: string;
    name: string;
  };
  caption?: string;
  floatingBadges?: HeroFloatingBadge[];
}

export interface HeroImageVisual {
  type: "image";
  image: string;
  imageAlt: string;
  floatingBadges?: HeroFloatingBadge[];
}
/** Small uppercase tag row under the CTA buttons, e.g. "Custom Branding | Low MOQ Options". */
export type HeroFeatureTags = string[];

/** Floating accent card overlaid on the hero image (e.g. "YOUR BRAND."). */
export interface HeroBrandCardPosition {
  width: number;
  height: number;
  top: number;
  left: number;
  angle?: number;
  opacity?: number;
  borderRadius?: number;
}

export interface HeroBrandCard {
  title: string;
  subtitle: string;
  bgColor?: string;
  position: HeroBrandCardPosition;
}

// Add these two optional fields to HeroContent:
export interface HeroContent {
  eyebrow?: string;
  headingLines: HeroHeadingLine[];
  description: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  secondaryRow?: HeroSecondaryRow;
  visual: HeroVisual;
  background?: HeroBackground;
  subscribe?: HeroSubscribeCta;
  /** NEW — small tag row below the CTA buttons */
  featureTags?: HeroFeatureTags;
  /** NEW — floating accent card over the visual (background/image type) */
  brandCard?: HeroBrandCard;
}
