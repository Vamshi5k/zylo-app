import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "../../../components/ui/app-text";
import { Icon } from "../../../components/ui/icon";
import { colors, layout, spacing } from "../../../../theme";
import type { Category } from "../../catalog/catalog-data";
import { homeContent } from "../home-data";

type CategoryRowProps = {
  category: Category;
  index: number;
  pieceCount: number;
  onPress: (category: Category) => void;
};

/** Large typographic row: number, name, piece count and an arrow. */
export function CategoryRow({ category, index, pieceCount, onPress }: CategoryRowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${category.title}, ${homeContent.pieces(pieceCount)}`}
      onPress={() => onPress(category)}
      style={styles.row}
    >
      <AppText variant="meta" color="textTertiary" style={styles.index}>
        {String(index + 1).padStart(2, "0")}
      </AppText>
      <View style={styles.titles}>
        <AppText variant="display">{category.title}</AppText>
        <AppText variant="meta" color="textSecondary">
          {homeContent.pieces(pieceCount).toUpperCase()}
        </AppText>
      </View>
      <Icon name="arrow-forward" size={layout.iconSize.lg} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.base,
    minHeight: layout.home.categoryRowHeight,
    paddingVertical: spacing.md,
    borderBottomWidth: layout.borderWidth,
    borderBottomColor: colors.border,
  },
  index: {
    width: spacing.lg,
  },
  titles: {
    flex: 1,
    gap: spacing.xxs,
  },
});
