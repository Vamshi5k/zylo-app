import type { ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "../../../components/ui/app-text";
import { formatPrice } from "../../../utils/format";
import { layout, radii, spacing } from "../../../../theme";
import { categoryTitles, type Product } from "../catalog-data";
import { ProductVisual } from "./product-visual";
import { WishlistButton } from "./wishlist-button";

type ProductListRowProps = {
  product: Product;
  onPress: (product: Product) => void;
  /** Extra content under the price, e.g. a quick action. */
  footer?: ReactNode;
};

/** Single-column product row used by Explore's list view. */
export function ProductListRow({ product, onPress, footer }: ProductListRowProps) {
  const price = formatPrice(product.price);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${product.name}, ${price}`}
      onPress={() => onPress(product)}
      style={styles.row}
    >
      <ProductVisual product={product} radius={radii.md} style={styles.thumb} />
      <View style={styles.text}>
        <AppText variant="overline" color="textSecondary">
          {categoryTitles[product.categoryId].toUpperCase()}
        </AppText>
        <AppText variant="productName">{product.name}</AppText>
        <AppText variant="caption" color="textSecondary" numberOfLines={2}>
          {product.description}
        </AppText>
        <AppText variant="price" style={styles.price}>
          {price}
        </AppText>
        {footer}
      </View>
      <WishlistButton product={product} compact />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing.md,
  },
  thumb: {
    width: layout.explore.listThumbWidth,
    height: layout.explore.listThumbHeight,
  },
  text: {
    flex: 1,
    gap: spacing.xs,
  },
  price: {
    marginTop: spacing.xs,
  },
});
