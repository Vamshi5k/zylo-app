import { StyleSheet, View } from "react-native";
import { AppText } from "../../../components/ui/app-text";
import { Icon } from "../../../components/ui/icon";
import { colors, layout, radii, spacing } from "../../../../theme";
import { checkoutSteps } from "../checkout-content";

type CheckoutStepsProps = {
  /** Zero-based index of the current step. */
  current: number;
};

/** Segmented progress bar with a numbered label under each segment. */
export function CheckoutSteps({ current }: CheckoutStepsProps) {
  return (
    <View
      style={styles.row}
      accessible
      accessibilityLabel={`Step ${current + 1} of ${checkoutSteps.length}: ${checkoutSteps[current]}`}
    >
      {checkoutSteps.map((label, index) => {
        const done = index < current;
        const active = index === current;
        return (
          <View key={label} style={styles.step}>
            <View style={[styles.segment, (done || active) && styles.segmentOn]} />
            <View style={styles.label}>
              {done ? (
                <Icon name="checkmark" size={layout.iconSize.xs} />
              ) : (
                <AppText variant="meta" color={active ? "text" : "textTertiary"}>
                  {String(index + 1).padStart(2, "0")}
                </AppText>
              )}
              <AppText variant="meta" color={active || done ? "text" : "textTertiary"}>
                {label.toUpperCase()}
              </AppText>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  step: {
    flex: 1,
    gap: spacing.sm,
  },
  segment: {
    height: layout.checkoutStep.segmentHeight,
    borderRadius: radii.pill,
    backgroundColor: colors.border,
  },
  segmentOn: {
    backgroundColor: colors.primary,
  },
  label: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
});
