import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { colors, layout, motion, spacing } from "../../../theme";
import { AppText } from "./app-text";

type MarqueeProps = {
  text: string;
};

/** Endlessly scrolling text strip; static when the user has Reduce Motion on. */
export function Marquee({ text }: MarqueeProps) {
  const reduceMotion = useReducedMotion();
  const [width, setWidth] = useState(0);
  const x = useSharedValue(0);

  useEffect(() => {
    if (reduceMotion || width === 0) return;
    x.value = 0;
    x.value = withRepeat(
      withTiming(-width, { duration: width * motion.marqueeSpeed, easing: Easing.linear }),
      -1,
      false,
    );
    return () => cancelAnimation(x);
  }, [width, reduceMotion, x]);

  const style = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }] }));

  return (
    <View style={styles.strip} accessible accessibilityLabel={text}>
      <Animated.View style={[styles.row, style]} importantForAccessibility="no-hide-descendants">
        <View style={styles.copy} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
          <AppText variant="label" numberOfLines={1}>
            {text}
          </AppText>
        </View>
        {reduceMotion ? null : (
          <View style={styles.copy}>
            <AppText variant="label" numberOfLines={1}>
              {text}
            </AppText>
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  strip: {
    height: layout.home.marqueeHeight,
    overflow: "hidden",
    justifyContent: "center",
    borderTopWidth: layout.borderWidth,
    borderBottomWidth: layout.borderWidth,
    borderColor: colors.border,
  },
  row: {
    position: "absolute",
    left: 0,
    flexDirection: "row",
  },
  copy: {
    paddingRight: spacing.lg,
    flexShrink: 0,
  },
});
