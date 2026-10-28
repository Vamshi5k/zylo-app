import { StyleSheet, View } from "react-native";
import { AppText } from "../../../components/ui/app-text";
import { Card } from "../../../components/ui/card";
import { formatPrice } from "../../../utils/format";
import { spacing } from "../../../../theme";
import { useCart } from "../../cart/cart-context";
import { StackedThumbs } from "../../orders/components/stacked-thumbs";
import { checkoutCopy } from "../checkout-content";

/** Compact "your order" strip shown at the top of the address and payment steps. */
export function OrderGlance() {
  const cart = useCart();

  return (
    <Card style={styles.card}>
      <StackedThumbs products={cart.lines.map((l) => l.product)} />
      <View style={styles.text}>
        <AppText variant="productName">{checkoutCopy.summaryTitle}</AppText>
        <AppText variant="caption" color="textSecondary">
          {checkoutCopy.itemsLine(cart.count)}
        </AppText>
      </View>
      <AppText variant="price">{formatPrice(cart.total)}</AppText>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  text: {
    flex: 1,
    gap: spacing.xxs,
  },
});
