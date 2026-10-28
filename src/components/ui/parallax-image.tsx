import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  type SharedValue,
} from "react-native-reanimated";
import type { ComponentProps } from "react";
import { motion } from "../../../theme";

type ParallaxImageProps = {
  source: ComponentProps<typeof Image>["source"];
  label: string;
  /** Vertical scroll offset of the screen; the image drifts slower than the content. */
  scrollY: SharedValue<number>;
  /** Height of the frame the image fills. */
  height: number;
  /** Magnifies the artwork, e.g. for detail views. */
  zoom?: number;
  /** Focal point of the zoom, 0..1 from the top-left. */
  focus?: { x: number; y: number };
};

/** Fills its parent, shifts for parallax while scrolling and stretches when overscrolled. */
export function ParallaxImage({
  source,
  label,
  scrollY,
  height,
  zoom = 1,
  focus = { x: 0.5, y: 0.5 },
}: ParallaxImageProps) {
  const style = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(scrollY.value, [0, height], [0, height * motion.parallax], Extrapolation.CLAMP) },
      { scale: interpolate(scrollY.value, [-height, 0], [1.6, 1], Extrapolation.CLAMP) },
    ],
  }));

  return (
    <Animated.View style={[StyleSheet.absoluteFill, style]}>
      <Image
        source={source}
        style={[
          StyleSheet.absoluteFill,
          { transform: [{ scale: zoom }], transformOrigin: `${focus.x * 100}% ${focus.y * 100}%` },
        ]}
        contentFit="cover"
        transition={motion.duration.base}
        accessible
        accessibilityLabel={label}
      />
    </Animated.View>
  );
}
