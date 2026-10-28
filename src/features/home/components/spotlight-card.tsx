import { Pressable, StyleSheet, View } from "react-native";
import { AppButton } from "../../../components/ui/app-button";
import { AppText } from "../../../components/ui/app-text";
import { formatPrice } from "../../../utils/format";
import { colors, layout, radii, spacing } from "../../../../theme";
import { categoryTitles, type Product } from "../../catalog/catalog-data";
import { ProductVisual } from "../../catalog/components/product-visual";
import { WishlistButton } from "../../catalog/components/wishlist-button";
import { homeContent } from "../home-data";

type SpotlightCardProps = {
  product: Product;
  onPress: (product: Product) => void;
};

/** Single large product feature. */
export function SpotlightCard({ product, onPress }: SpotlightCardProps) {
  const price = formatPrice(product.price);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${product.name}, ${price}`}
      onPress={() => onPress(product)}
      style={styles.card}
    >
      <ProductVisual
        product={product}
        radius={radii.xl}
        style={{ aspectRatio: layout.home.spotlightAspectRatio }}
      >
        <View style={styles.badge}>
          <AppText variant="tag" color="white">
            {homeContent.spotlightBadge}
          </AppText>
        </View>
        <View style={styles.heart}>
          <WishlistButton product={product} compact />
        </View>
      </ProductVisual>

      <View style={styles.row}>
        <View style={styles.titles}>
          <AppText variant="overline" color="textSecondary">
            {categoryTitles[product.categoryId].toUpperCase()}
          </AppText>
          <AppText variant="title">{product.name}</AppText>
          <AppText variant="price">{price}</AppText>
        </View>
        <AppButton title={homeContent.spotlightCta} icon="arrow-forward" onPress={() => onPress(product)} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.base,
  },
  badge: {
    position: "absolute",
    top: spacing.base,
    left: spacing.base,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
  },
  heart: {
    position: "absolute",
    top: spacing.base,
    right: spacing.base,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  titles: {
    flex: 1,
    gap: spacing.xs,
  },
});
