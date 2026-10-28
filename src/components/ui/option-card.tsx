import { Pressable, StyleSheet, View } from "react-native";
import { colors, layout, radii, spacing } from "../../../theme";
import { AppText } from "./app-text";
import { Icon, type IconName } from "./icon";

type OptionCardProps = {
  icon: IconName;
  title: string;
  description: string;
  selected: boolean;
  onPress: () => void;
};

/** Selectable radio-style card, e.g. for payment methods. */
export function OptionCard({ icon, title, description, selected, onPress }: OptionCardProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityLabel={`${title}. ${description}`}
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.card, selected && styles.selected]}
    >
      <Icon name={icon} size={layout.iconSize.xl} />
      <View style={styles.text}>
        <AppText variant="productName">{title}</AppText>
        <AppText variant="caption" color="textSecondary">
          {description}
        </AppText>
      </View>
      <Icon
        name={selected ? "radio-button-on" : "radio-button-off"}
        size={layout.iconSize.md}
        color={selected ? colors.text : colors.textTertiary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.base,
    borderRadius: radii.card,
    borderWidth: layout.borderWidth,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  selected: {
    borderColor: colors.text,
  },
  text: {
    flex: 1,
    gap: spacing.xxs,
  },
});
