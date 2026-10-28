import type { ReactNode } from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { Image } from "expo-image";
import { colors, motion, radii } from "../../../../theme";
import type { Product } from "../catalog-data";

type ProductVisualProps = {
  product: Product;
  radius?: number;
  style?: StyleProp<ViewStyle>;
  /** Rendered above the artwork, e.g. a wishlist button. */
  children?: ReactNode;
};

/** Product artwork, cropped to fill whatever ratio the parent gives it. */
export function ProductVisual({ product, radius = radii.card, style, children }: ProductVisualProps) {
  return (
    <View style={[styles.tile, { backgroundColor: colors[product.tint], borderRadius: radius }, style]}>
      <Image
        source={product.image.source}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        transition={motion.duration.fast}
        accessible
        accessibilityLabel={product.image.label}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    overflow: "hidden",
  },
});
