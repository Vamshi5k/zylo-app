import { useState, type ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedReaction,
  useAnimatedStyle,
  type SharedValue,
} from "react-native-reanimated";
import { useIsFocused } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scheduleOnRN } from "react-native-worklets";
import { colors, layout, spacing } from "../../../theme";

export type HeaderTone = "glass" | "default";

export const HEADER_FADE_DISTANCE = layout.home.marqueeHeight * 2;

type FloatingHeaderProps = {
  scrollY: SharedValue<number>;
  /** Height of the hero the header floats over; the header turns solid as it scrolls away. */
  heroHeight: number;
  left: (tone: HeaderTone) => ReactNode;
  right: (tone: HeaderTone) => ReactNode;
};

/**
 * Translucent over a hero, cross-fading to a solid bar once the hero has scrolled away.
 * Both layers share one layout, so a tap lands on the same action either way.
 */
export function FloatingHeader({ scrollY, heroHeight, left, right }: FloatingHeaderProps) {
  const insets = useSafeAreaInsets();
  const focused = useIsFocused();
  const [pastHero, setPastHero] = useState(false);
  const start = heroHeight - insets.top - HEADER_FADE_DISTANCE * 2;

  useAnimatedReaction(
    () => scrollY.value > start + HEADER_FADE_DISTANCE / 2,
    (past, previous) => {
      if (past !== previous) scheduleOnRN(setPastHero, past);
    },
  );

  const solid = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [start, start + HEADER_FADE_DISTANCE], [0, 1], Extrapolation.CLAMP),
  }));
  const overlay = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [start, start + HEADER_FADE_DISTANCE], [1, 0], Extrapolation.CLAMP),
  }));

  return (
    <View style={[styles.header, { paddingTop: insets.top }]} pointerEvents="box-none">
      {focused ? <StatusBar style={pastHero ? "dark" : "light"} /> : null}

      <Animated.View style={[styles.fill, styles.solidBg, solid]} pointerEvents="none" />

      <Animated.View
        style={[styles.fill, { paddingTop: insets.top }, overlay]}
        pointerEvents="box-none"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        <View style={styles.row}>
          {left("glass")}
          <View style={styles.actions}>{right("glass")}</View>
        </View>
      </Animated.View>

      <Animated.View style={solid} pointerEvents="box-none">
        <View style={styles.row}>
          {left("default")}
          <View style={styles.actions}>{right("default")}</View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  fill: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  solidBg: {
    backgroundColor: colors.background,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
    paddingHorizontal: spacing.screen,
    paddingVertical: spacing.sm,
  },
  actions: {
    flexDirection: "row",
    gap: spacing.sm,
  },
});
