import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "../../components/ui/app-text";
import { brand } from "../../constants/brand";
import { colors, motion, spacing } from "../../../theme";
import { splashTiming } from "./splash-config";

type AnimatedSplashProps = {
  /** Called once the splash has fully faded out and can be unmounted. */
  onFinish: () => void;
};

const easing = Easing.out(Easing.cubic);

/**
 * Branded in-app splash. It matches the native splash background, so the
 * hand-off from the native screen is seamless.
 */
export function AnimatedSplash({ onFinish }: AnimatedSplashProps) {
  const reduceMotion = useReducedMotion();

  const wordmark = useSharedValue(reduceMotion ? 1 : 0);
  const tagline = useSharedValue(reduceMotion ? 1 : 0);
  const overlay = useSharedValue(1);

  useEffect(() => {
    if (!reduceMotion) {
      wordmark.value = withTiming(1, {
        duration: splashTiming.wordmarkDuration,
        easing,
      });
      tagline.value = withDelay(
        splashTiming.taglineDelay,
        withTiming(1, { duration: splashTiming.taglineDuration, easing }),
      );
    }

    const exit = setTimeout(() => {
      overlay.value = withTiming(0, { duration: splashTiming.exitDuration });
    }, splashTiming.hold + splashTiming.taglineDelay + splashTiming.taglineDuration);

    const finish = setTimeout(
      onFinish,
      splashTiming.hold +
        splashTiming.taglineDelay +
        splashTiming.taglineDuration +
        splashTiming.exitDuration,
    );

    return () => {
      clearTimeout(exit);
      clearTimeout(finish);
    };
  }, [reduceMotion, onFinish, wordmark, tagline, overlay]);

  const overlayStyle = useAnimatedStyle(() => ({ opacity: overlay.value }));

  const wordmarkStyle = useAnimatedStyle(() => ({
    opacity: wordmark.value,
    transform: [
      { translateY: (1 - wordmark.value) * motion.distance.enter },
      {
        scale:
          motion.scale.enter + (1 - motion.scale.enter) * wordmark.value,
      },
    ],
  }));

  const taglineStyle = useAnimatedStyle(() => ({
    opacity: tagline.value,
    transform: [{ translateY: (1 - tagline.value) * motion.distance.enter }],
  }));

  return (
    <Animated.View
      style={[StyleSheet.absoluteFill, styles.overlay, overlayStyle]}
      accessible
      accessibilityLabel={`${brand.name}. ${brand.tagline}`}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <Animated.View style={wordmarkStyle}>
            <AppText variant="wordmark">{brand.name}</AppText>
          </Animated.View>
          <Animated.View style={taglineStyle}>
            <AppText
              variant="brandCaption"
              color="textSecondary"
              style={styles.tagline}
            >
              {brand.tagline}
            </AppText>
          </Animated.View>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.screen,
  },
  tagline: {
    marginTop: spacing.md,
  },
});
