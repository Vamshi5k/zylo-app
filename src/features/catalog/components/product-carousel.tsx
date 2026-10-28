import { ScrollView, StyleSheet, View } from "react-native";
import { layout, spacing } from "../../../../theme";
import type { Product } from "../catalog-data";
import { ProductCard } from "./product-card";

type ProductCarouselProps = {
  products: readonly Product[];
  onPressProduct: (product: Product) => void;
};

/** Edge-to-edge horizontal row of product cards. */
export function ProductCarousel({ products, onPressProduct }: ProductCarouselProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.list}>
      {products.map((product) => (
        <View key={product.id} style={styles.card}>
          <ProductCard product={product} onPress={onPressProduct} />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.md,
    paddingHorizontal: spacing.screen,
  },
  card: {
    width: layout.productDetail.relatedCardWidth,
  },
});
