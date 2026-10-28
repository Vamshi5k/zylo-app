import { Pressable, StyleSheet } from "react-native";
import { colors, layout, radii, spacing } from "../../../theme";
import { AppText } from "./app-text";
import { Icon } from "./icon";

type SearchPillProps = {
  placeholder: string;
  onPress: () => void;
  showFilter?: boolean;
};

/** Tappable search field that opens the Search screen. */
export function SearchPill({ placeholder, onPress, showFilter = false }: SearchPillProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Search"
      onPress={onPress}
      style={styles.pill}
    >
      <Icon name="search-outline" size={layout.iconSize.md} color={colors.textSecondary} />
      <AppText variant="caption" color="textTertiary" style={styles.text}>
        {placeholder}
      </AppText>
      {showFilter ? <Icon name="options-outline" size={layout.iconSize.md} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    height: layout.controlHeight.input,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radii.pill,
    borderWidth: layout.borderWidth,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  text: {
    flex: 1,
  },
});
