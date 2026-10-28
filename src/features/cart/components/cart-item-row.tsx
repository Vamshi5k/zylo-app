import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "../../../components/ui/app-text";
import { IconButton } from "../../../components/ui/icon-button";
import { QuantityStepper } from "../../../components/ui/quantity-stepper";
import { commerce } from "../../../constants/commerce";
import { screenContent } from "../../../constants/screen-content";
import { formatPrice } from "../../../utils/format";
import { layout, radii, spacing } from "../../../../theme";
import { categoryTitles } from "../../catalog/catalog-data";
import { ProductVisual } from "../../catalog/components/product-visual";
import { useWishlist } from "../../wishlist/wishlist-context";
import type { DetailedCartLine } from "../cart-context";

const content = screenContent.cart;

type CartItemRowProps = {
  line: DetailedCartLine;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
  onOpen: () => void;
};

export function CartItemRow({ line, onQuantityChange, onRemove, onOpen }: CartItemRowProps) {
  const { product } = line;
  const wishlist = useWishlist();
  const saved = wishlist.has(product.id);

  const moveToWishlist = () => {
    if (!saved) wishlist.toggle(product.id);
    onRemove();
  };

  return (
    <View style={styles.row}>
      <Pressable accessibilityRole="button" accessibilityLabel={`Open ${product.name}`} onPress={onOpen}>
        <ProductVisual product={product} radius={radii.md} style={styles.thumb} />
      </Pressable>

      <View style={styles.details}>
        <View style={styles.top}>
          <Pressable onPress={onOpen} style={styles.titles}>
            <AppText variant="overline" color="textSecondary">
              {categoryTitles[product.categoryId].toUpperCase()}
            </AppText>
            <AppText variant="productName">{product.name}</AppText>
            <AppText variant="caption" color="textSecondary">
              Size {line.size} · {formatPrice(product.price)}
            </AppText>
          </Pressable>
          <IconButton
            icon="trash-outline"
            label={`Remove ${product.name} from bag`}
            size={layout.stepper.buttonSize}
            onPress={onRemove}
          />
        </View>

        <View style={styles.bottom}>
          <QuantityStepper value={line.quantity} max={commerce.maxQuantity} onChange={onQuantityChange} />
          <AppText variant="price">{formatPrice(line.lineTotal)}</AppText>
        </View>

        <Pressable accessibilityRole="button" onPress={moveToWishlist} hitSlop={spacing.sm}>
          <AppText variant="label" color="textSecondary">
            {saved ? content.savedToWishlist : content.moveToWishlist}
          </AppText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing.base,
  },
  thumb: {
    width: layout.explore.listThumbWidth,
    height: layout.explore.listThumbHeight,
  },
  details: {
    flex: 1,
    justifyContent: "space-between",
    gap: spacing.md,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  titles: {
    flex: 1,
    gap: spacing.xxs,
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
