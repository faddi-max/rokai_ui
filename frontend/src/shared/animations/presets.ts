export const motion = {
  duration: {
    fast: 0.2,
    hover: 0.35,
    normal: 0.45,
    slow: 0.7,
  },
  ease: {
    enter: "power3.out",
    exit: "power2.in",
    hover: "power2.out",
  },
  stagger: 0.08,
  rotation: {
    iconHover: 45,
    iconClick: 45,
  },
} as const;

/** A consistent initial state for elements that enter from below. */
export const revealUp = (distance = 24) => ({
  autoAlpha: 0,
  y: distance,
});

/** A consistent initial state for elements that enter from the left. */
export const revealLeft = (distance = 32) => ({
  autoAlpha: 0,
  x: -distance,
});

/** A consistent initial state for elements that enter from the right. */
export const revealRight = (distance = 32) => ({
  autoAlpha: 0,
  x: distance,
});

/** Shared final state for standard entrance animations. */
export const revealVisible = {
  autoAlpha: 1,
  x: 0,
  y: 0,
  duration: motion.duration.normal,
  ease: motion.ease.enter,
};
