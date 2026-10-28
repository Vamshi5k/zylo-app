import { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Icon } from "../../../components/ui/icon";
import { colors, layout, motion, radii } from "../../../../theme";

const SIZE = layout.success.size;

/** Check mark that springs in with a ring that expands and fades. */
export function SuccessMark() {
  const reduceMotion = useReducedMotion();
  const scale = useSharedValue(reduceMotion ? 1 : 0.5);
  const ring = useSharedValue(reduceMotion ? 1 : 0);

  useEffect(() => {
    if (reduceMotion) return;
    scale.value = withSpring(1, { damping: 11, stiffness: 140 });
    ring.value = withDelay(120, withTiming(1, { duration: motion.duration.slow * 2, easing: Easing.out(Easing.cubic) }));
  }, [reduceMotion, scale, ring]);

  const markStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const ringStyle = useAnimatedStyle(() => ({
    opacity: reduceMotion ? 0 : 0.5 * (1 - ring.value),
    transform: [{ scale: 1 + ring.value * 0.9 }],
  }));

  return (
    <Animated.View style={styles.wrap} accessible accessibilityLabel="Success" importantForAccessibility="yes">
      <Animated.View style={[styles.ring, ringStyle]} />
      <Animated.View style={[styles.mark, markStyle]}>
        <Icon name="checkmark" size={layout.iconSize.xl * 1.6} color={colors.primary} />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: SIZE,
    height: SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  ring: {
    position: "absolute",
    width: SIZE,
    height: SIZE,
    borderRadius: radii.pill,
    borderWidth: layout.borderWidth * 2,
    borderColor: colors.white,
  },
  mark: {
    width: SIZE,
    height: SIZE,
    borderRadius: radii.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
});
