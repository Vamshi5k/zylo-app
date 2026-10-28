import { StyleSheet, View } from "react-native";
import { AppText } from "../../../components/ui/app-text";
import { colors, radii, spacing } from "../../../../theme";
import type { Order } from "../orders-context";

export function StatusBadge({ status }: { status: Order["status"] }) {
  return (
    <View style={styles.badge}>
      <AppText variant="tag">{status.toUpperCase()}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceMuted,
  },
});
