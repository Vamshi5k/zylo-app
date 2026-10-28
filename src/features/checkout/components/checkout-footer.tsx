import { StyleSheet, View } from "react-native";
import { AppButton } from "../../../components/ui/app-button";
import { AppText } from "../../../components/ui/app-text";
import { formatPrice } from "../../../utils/format";
import { spacing } from "../../../../theme";
import { useCart } from "../../cart/cart-context";
import { checkoutCopy } from "../checkout-content";

type CheckoutFooterProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  icon?: "arrow-forward" | "lock-closed-outline";
};

/** Sticky footer: the order total on the left, the primary action on the right. */
export function CheckoutFooter({ title, onPress, disabled, icon = "arrow-forward" }: CheckoutFooterProps) {
  const cart = useCart();

  return (
    <View style={styles.row}>
      <View>
        <AppText variant="label" color="textSecondary">
          {checkoutCopy.orderTotal}
        </AppText>
        <AppText variant="price">{formatPrice(cart.total)}</AppText>
      </View>
      <AppButton title={title} icon={icon} disabled={disabled} onPress={onPress} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.base,
  },
  button: {
    flex: 1,
  },
});
