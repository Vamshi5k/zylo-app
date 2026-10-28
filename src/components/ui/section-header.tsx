import { Pressable, StyleSheet, View } from "react-native";
import { colors, layout, spacing } from "../../../theme";
import { AppText } from "./app-text";
import { Icon } from "./icon";

type SectionHeaderProps = {
  title: string;
  description?: string;
  /** Small index/caption shown on the right, e.g. "01 / EDITS". */
  meta?: string;
  actionLabel?: string;
  onAction?: () => void;
};

/** Section title with optional description and a right-aligned meta label or action link. */
export function SectionHeader({ title, description, meta, actionLabel, onAction }: SectionHeaderProps) {
  return (
    <View style={styles.row}>
      <View style={styles.titles}>
        <AppText variant="title" accessibilityRole="header">
          {title}
        </AppText>
        {description ? (
          <AppText variant="caption" color="textSecondary">
            {description}
          </AppText>
        ) : null}
      </View>

      {actionLabel && onAction ? (
        <Pressable accessibilityRole="button" onPress={onAction} style={styles.action}>
          <AppText variant="label" color="textSecondary">
            {actionLabel}
          </AppText>
          <Icon name="arrow-forward" size={layout.iconSize.xs} color={colors.textSecondary} />
        </Pressable>
      ) : meta ? (
        <AppText variant="meta" color="textTertiary">
          {meta}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  titles: {
    flex: 1,
    gap: spacing.xs,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
});
