import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "../../../components/ui/app-text";
import { formatPrice } from "../../../utils/format";
import { spacing } from "../../../../theme";
import { categoryTitles, type Product } from "../catalog-data";
import { ProductVisual } from "./product-visual";
import { WishlistButton } from "./wishlist-button";

type ProductCardProps = {
  product: Product;
  onPress: (product: Product) => void;
};

/** Product tile with category, name, price and a wishlist toggle. */
export function ProductCard({ product, onPress }: ProductCardProps) {
  const price = formatPrice(product.price);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${product.name}, ${price}`}
      onPress={() => onPress(product)}
    >
      <ProductVisual product={product} style={[styles.visual, { aspectRatio: product.aspectRatio }]}>
        <View style={styles.heart}>
          <WishlistButton product={product} compact />
        </View>
      </ProductVisual>

      <AppText variant="overline" color="textSecondary" style={styles.category}>
        {categoryTitles[product.categoryId].toUpperCase()}
      </AppText>
      <AppText variant="productName">{product.name}</AppText>
      <AppText variant="price" style={styles.price}>
        {price}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  visual: {
    marginBottom: spacing.md,
  },
  heart: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.sm,
  },
  category: {
    marginBottom: spacing.xs,
  },
  price: {
    marginTop: spacing.sm,
  },
});
