import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import type { SharedValue } from "react-native-reanimated";
import { AppText } from "../../../components/ui/app-text";
import { ParallaxImage } from "../../../components/ui/parallax-image";
import type { ArtAsset } from "../../../constants/images";
import { colors, layout, spacing } from "../../../../theme";

type ExploreBannerProps = {
  scrollY: SharedValue<number>;
  width: number;
  height: number;
  image: ArtAsset;
  eyebrow: string;
  title: string;
  subtitle: string;
};

/** Full-bleed banner at the top of Explore; its artwork follows the selected collection. */
export function ExploreBanner({ scrollY, width, height, image, eyebrow, title, subtitle }: ExploreBannerProps) {
  return (
    <View style={{ width, height, overflow: "hidden" }}>
      <ParallaxImage source={image.source} label={image.label} scrollY={scrollY} height={height} />
      <LinearGradient colors={[colors.scrimSoft, colors.scrimClear]} style={styles.topScrim} pointerEvents="none" />
      <LinearGradient colors={[colors.scrimClear, colors.scrim]} style={styles.bottomScrim} pointerEvents="none" />
      <View style={styles.copy}>
        <AppText variant="eyebrow" color="white">
          {eyebrow}
        </AppText>
        <AppText variant="hero" color="white" accessibilityRole="header">
          {title}
        </AppText>
        <AppText variant="body" color="whiteMuted">
          {subtitle}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topScrim: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: layout.home.marqueeHeight * 4,
  },
  bottomScrim: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "70%",
  },
  copy: {
    position: "absolute",
    left: spacing.screen,
    right: spacing.screen,
    bottom: spacing.lg,
    gap: spacing.sm,
  },
});
