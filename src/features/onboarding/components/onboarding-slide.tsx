import { StyleSheet, View } from "react-native";
import { AppText } from "../../../components/ui/app-text";
import { spacing } from "../../../../theme";
import type { OnboardingSlide as Slide } from "../onboarding-data";
import { OnboardingImage } from "./onboarding-image";

type OnboardingSlideProps = {
  slide: Slide;
  width: number;
  imageHeight: number;
};

export function OnboardingSlide({
  slide,
  width,
  imageHeight,
}: OnboardingSlideProps) {
  return (
    <View style={[styles.slide, { width }]}>
      <OnboardingImage slide={slide} height={imageHeight} />
      <View style={styles.copy}>
        <AppText variant="display" accessibilityRole="header">
          {slide.title}
        </AppText>
        <AppText variant="body" color="textSecondary">
          {slide.description}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    paddingHorizontal: spacing.screen,
  },
  copy: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
});
