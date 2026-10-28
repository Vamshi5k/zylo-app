import { StyleSheet, View } from "react-native";
import { layout, spacing } from "../../../../theme";
import type { Product } from "../catalog-data";
import { ProductCard } from "./product-card";

type ProductGridProps = {
  products: readonly Product[];
  onPressProduct: (product: Product) => void;
};

/** Two-column staggered grid; the second column is offset for an editorial feel. */
export function ProductGrid({ products, onPressProduct }: ProductGridProps) {
  const columns: [Product[], Product[]] = [[], []];
  products.forEach((product, i) => columns[i % 2].push(product));

  return (
    <View style={styles.grid}>
      {columns.map((column, columnIndex) => (
        <View
          key={columnIndex}
          style={[styles.column, columnIndex === 1 && styles.offset]}
        >
          {column.map((product) => (
            <ProductCard key={product.id} product={product} onPress={onPressProduct} />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    gap: spacing.md,
  },
  column: {
    flex: 1,
    gap: spacing.lg,
  },
  offset: {
    marginTop: layout.home.staggerOffset,
  },
});
