import { Pressable, StyleSheet } from "react-native";
import { colors, layout, radii, spacing } from "../../../theme";
import { AppText } from "./app-text";

type StatTileProps = {
  value: number;
  label: string;
  onPress: () => void;
};

/** Large number with a caption; tappable. */
export function StatTile({ value, label, onPress }: StatTileProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${value} ${label.toLowerCase()}`}
      onPress={onPress}
      style={styles.tile}
    >
      <AppText variant="display">{String(value).padStart(2, "0")}</AppText>
      <AppText variant="label" color="textSecondary">
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    gap: spacing.xs,
    padding: spacing.base,
    borderRadius: radii.card,
    borderWidth: layout.borderWidth,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
});
