import { Pressable, StyleSheet, View } from "react-native";
import { AppButton } from "../../../components/ui/app-button";
import { AppText } from "../../../components/ui/app-text";
import { layout, spacing } from "../../../../theme";
import { onboardingContent } from "../onboarding-data";

type OnboardingActionsProps = {
  isLast: boolean;
  onNext: () => void;
  onFinish: () => void;
};

export function OnboardingSkip({ onSkip, visible }: { onSkip: () => void; visible: boolean }) {
  return (
    <View style={styles.skipSlot}>
      {visible ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Skip onboarding"
          hitSlop={spacing.sm}
          onPress={onSkip}
          style={styles.skip}
        >
          <AppText variant="fieldLabel" color="textSecondary">
            {onboardingContent.skip}
          </AppText>
        </Pressable>
      ) : null}
    </View>
  );
}

export function OnboardingActions({ isLast, onNext, onFinish }: OnboardingActionsProps) {
  return (
    <AppButton
      title={isLast ? onboardingContent.getStarted : onboardingContent.next}
      icon="arrow-forward"
      fullWidth
      onPress={isLast ? onFinish : onNext}
    />
  );
}

const styles = StyleSheet.create({
  skipSlot: {
    height: layout.controlHeight.iconButton,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingHorizontal: spacing.screen,
  },
  skip: {
    minHeight: layout.controlHeight.iconButton,
    justifyContent: "center",
    paddingHorizontal: spacing.sm,
  },
});
