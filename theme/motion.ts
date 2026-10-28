/** Durations (ms) and distances shared by animated components. */
export const motion = {
  duration: {
    fast: 200,
    base: 400,
    slow: 700,
  },
  stagger: 90,
  /** Milliseconds per pixel for the looping marquee. */
  marqueeSpeed: 38,
  parallax: 0.45,
  distance: {
    enter: 12,
  },
  scale: {
    enter: 0.96,
  },
} as const;
