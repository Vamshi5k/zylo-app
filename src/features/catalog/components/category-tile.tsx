import { Pressable, StyleSheet } from "react-native";
import { AppText } from "../../../components/ui/app-text";
import { Icon } from "../../../components/ui/icon";
import { colors, layout, radii, spacing } from "../../../../theme";
import type { Category } from "../catalog-data";

type CategoryTileProps = {
  category: Category;
  onPress: (category: Category) => void;
};

export function CategoryTile({ category, onPress }: CategoryTileProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Shop ${category.title}`}
      onPress={() => onPress(category)}
      style={styles.tile}
    >
      <Icon name={category.icon} size={layout.iconSize.xl} />
      <AppText variant="productName">{category.title}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.base,
    borderRadius: radii.card,
    borderWidth: layout.borderWidth,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
});
