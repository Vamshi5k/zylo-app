import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { motion } from "../../../theme";

type RevealProps = {
  /** Position in the screen's sequence; later items appear slightly later. */
  order?: number;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
};

/** Fade-and-rise entrance used to assemble screens section by section. */
export function Reveal({ order = 0, style, children }: RevealProps) {
  return (
    <Animated.View
      entering={FadeInDown.delay(order * motion.stagger).duration(motion.duration.slow)}
      style={style}
    >
      {children}
    </Animated.View>
  );
}
