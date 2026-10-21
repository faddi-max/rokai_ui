import { avatar1, avatar2, avatar3, avatar4, heroMain } from "@/assets";
import type {
  HeroBackground,
  HeroBackgroundVisual,
  HeroJoinRow,
} from "@/shared/types/hero";

/**
 * Figma hero layout shared by the home page and the categories page.
 * Keep it here so the two heroes cannot drift apart again.
 *
 * Figma frame is 1512px wide:
 *   - model image 601 x 901, top 9, left 783 (bottom edge runs behind the trust card)
 *   - hero is 910px tall; trust card sits at top 743 / bottom 905 (see HeroTrustBadges)
 */
export const MODEL_HERO_VISUAL: HeroBackgroundVisual = {
  type: "background",
  image: heroMain,
  imageAlt: "Custom hoodie manufactured by ROKAI, worn by a model",
  cutout: true,
  position: { width: 601, height: 901, top: 9, left: 783, opacity: 1 },
};

export const MODEL_HERO_BACKGROUND: HeroBackground = {
  // Hero is 910px tall on desktop so the model runs behind the full trust card.
  heightPx: 910,
  // No hero glows: the global site background image is the only backdrop.
  glows: [],
  // Inline min-height is 910 everywhere; drop it below lg so mobile isn't tall and empty.
  sectionClassName: "max-lg:!min-h-0",
};

/** Overlapping avatars + one line of copy, under the CTAs. */
export const HERO_JOIN_ROW: HeroJoinRow = {
  type: "join",
  avatars: [avatar1, avatar2, avatar3, avatar4],
  joinText: "Join 100+ academies and brands growing with ROKAI",
};
