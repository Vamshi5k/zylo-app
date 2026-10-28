import { StyleSheet, View } from "react-native";
import { AppText } from "../../../components/ui/app-text";
import { colors, layout, radii } from "../../../../theme";
import type { Product } from "../../catalog/catalog-data";
import { ProductVisual } from "../../catalog/components/product-visual";

type StackedThumbsProps = {
  products: readonly Product[];
};

const { size, overlap, max } = layout.stackedThumb;

/** Overlapping product thumbnails with a "+N" chip for the remainder. */
export function StackedThumbs({ products }: StackedThumbsProps) {
  const shown = products.slice(0, max);
  const extra = products.length - shown.length;
  const count = shown.length + (extra > 0 ? 1 : 0);

  return (
    <View style={{ width: size + (count - 1) * (size - overlap), height: size }}>
      {shown.map((product, i) => (
        <View key={product.id} style={[styles.item, { left: i * (size - overlap) }]}>
          <ProductVisual product={product} radius={radii.md} style={styles.thumb} />
        </View>
      ))}
      {extra > 0 ? (
        <View style={[styles.item, styles.more, { left: shown.length * (size - overlap) }]}>
          <AppText variant="meta">+{extra}</AppText>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    position: "absolute",
    top: 0,
    width: size,
    height: size,
    borderRadius: radii.md,
    borderWidth: layout.borderWidth * 2,
    borderColor: colors.surface,
    overflow: "hidden",
  },
  thumb: {
    width: "100%",
    height: "100%",
  },
  more: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceMuted,
  },
});
