import { StyleSheet, View } from "react-native";
import { AppText } from "../../../components/ui/app-text";
import { colors, layout, radii, spacing } from "../../../../theme";
import { orderSteps } from "../orders-content";
import type { Order } from "../orders-context";

/** Vertical progress through the order phases; later phases stay muted. */
export function OrderTimeline({ status }: { status: Order["status"] }) {
  const current = Math.max(0, orderSteps.findIndex((s) => s.status === status));

  return (
    <View accessible accessibilityLabel={`Order status: ${status}`}>
      {orderSteps.map((step, index) => {
        const reached = index <= current;
        const last = index === orderSteps.length - 1;
        return (
          <View key={step.status} style={styles.row}>
            <View style={styles.rail}>
              <View style={[styles.dot, reached && styles.dotOn]} />
              {last ? null : <View style={[styles.line, index < current && styles.lineOn]} />}
            </View>
            <View style={styles.text}>
              <AppText variant="productName" color={reached ? "text" : "textTertiary"}>
                {step.status}
              </AppText>
              <AppText variant="caption" color={reached ? "textSecondary" : "textTertiary"}>
                {step.description}
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
    gap: spacing.md,
  },
  rail: {
    alignItems: "center",
    width: layout.timeline.dotSize,
  },
  dot: {
    width: layout.timeline.dotSize,
    height: layout.timeline.dotSize,
    borderRadius: radii.pill,
    borderWidth: layout.borderWidth * 2,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  dotOn: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  line: {
    flex: 1,
    width: layout.timeline.lineWidth,
    minHeight: spacing.lg,
    backgroundColor: colors.border,
  },
  lineOn: {
    backgroundColor: colors.primary,
  },
  text: {
    flex: 1,
    gap: spacing.xxs,
    paddingBottom: spacing.lg,
  },
});
