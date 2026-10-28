import { Pressable, StyleSheet, View } from "react-native";
import { colors, layout, spacing } from "../../../theme";
import { AppText } from "./app-text";
import { Icon, type IconName } from "./icon";

type ListRowProps = {
  icon: IconName;
  title: string;
  subtitle?: string;
  /** Right-aligned value, e.g. a count. */
  value?: string;
  onPress?: () => void;
};

/** Icon + title row with a chevron, used for menus. */
export function ListRow({ icon, title, subtitle, value, onPress }: ListRowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={styles.row}
    >
      <Icon name={icon} size={layout.iconSize.lg} />
      <View style={styles.text}>
        <AppText variant="productName">{title}</AppText>
        {subtitle ? (
          <AppText variant="caption" color="textSecondary">
            {subtitle}
          </AppText>
        ) : null}
      </View>
      {value ? (
        <AppText variant="caption" color="textSecondary">
          {value}
        </AppText>
      ) : null}
      <Icon name="chevron-forward" size={layout.iconSize.sm} color={colors.textTertiary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    minHeight: layout.controlHeight.input,
    paddingVertical: spacing.sm,
  },
  text: {
    flex: 1,
    gap: spacing.xxs,
  },
});
