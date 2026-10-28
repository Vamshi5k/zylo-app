import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Icon } from "../../../components/ui/icon";
import { colors, layout, motion, radii } from "../../../../theme";
import type { OnboardingSlide } from "../onboarding-data";

type OnboardingImageProps = {
  slide: OnboardingSlide;
  height: number;
};

/** Photo with a tinted placeholder while loading and an icon fallback if it can't load. */
export function OnboardingImage({ slide, height }: OnboardingImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <View
      style={[styles.frame, { height, backgroundColor: colors[slide.tint] }]}
    >
      {failed ? (
        <Icon
          name={slide.fallbackIcon}
          size={layout.iconSize.xl * 2}
          color={colors.textSecondary}
        />
      ) : (
        <Image
          source={slide.image.source}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={motion.duration.base}
          cachePolicy="memory-disk"
          accessible
          accessibilityLabel={slide.image.label}
          onError={() => setFailed(true)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    borderRadius: radii.xl,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
});
