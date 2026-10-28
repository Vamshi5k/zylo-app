import { motion } from "../../../theme";

/** Timing for the branded splash, built from shared motion tokens. */
export const splashTiming = {
  wordmarkDuration: motion.duration.slow,
  taglineDelay: motion.duration.base,
  taglineDuration: motion.duration.slow,
  /** How long the finished composition stays on screen before exiting. */
  hold: 1200,
  exitDuration: motion.duration.base,
} as const;
