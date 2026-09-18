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
  /** 8-digit hex (RRGGBBAA) or any valid CSS color. */
  color: string;
  blur: number;
}

export interface HeroBackground {
  sectionClassName?: string;
  /** Overrides the default two-blob glow. Omit to use the shared default. */
  glows?: HeroGlow[];
}

export interface HeroSubscribeCta {
  placeholder: string;
  buttonLabel: string;
  onSubmit?: (email: string) => void;
}

export interface HeroContent {
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
export interface BlogCategory {
  image: string;
  title: string;
}

export interface BlogPageData {
  hero: HeroContent;
  categories: BlogCategory[];
}