import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "../../src/components/layout/screen";
import { AppText } from "../../src/components/ui/app-text";
import { Card } from "../../src/components/ui/card";
import { EmptyState } from "../../src/components/ui/empty-state";
import { Icon } from "../../src/components/ui/icon";
import { Reveal } from "../../src/components/ui/reveal";
import { SectionHeader } from "../../src/components/ui/section-header";
import { screenContent } from "../../src/constants/screen-content";
import { useCart } from "../../src/features/cart/cart-context";
import { paymentOptions, paymentTitles } from "../../src/features/checkout/checkout-content";
import { useCheckout } from "../../src/features/checkout/checkout-context";
import { CheckoutFooter } from "../../src/features/checkout/components/checkout-footer";
import { CheckoutSteps } from "../../src/features/checkout/components/checkout-steps";
import { AddressCard } from "../../src/features/orders/components/address-card";
import { OrderSummaryCard } from "../../src/features/orders/components/order-summary-card";
import { useOrders, type OrderLine } from "../../src/features/orders/orders-context";
import { layout, spacing } from "../../theme";

const content = screenContent.checkout;

export default function CheckoutReviewScreen() {
  const router = useRouter();
  const cart = useCart();
  const checkout = useCheckout();
  const orders = useOrders();
  const { address, payment } = checkout;

  if (cart.lines.length === 0) {
    return (
      <Screen>
        <EmptyState
          icon="bag-outline"
          title={content.emptyTitle}
          description={content.emptyDescription}
          actionLabel={content.emptyAction}
          onAction={() => router.navigate("/categories")}
        />
      </Screen>
    );
  }

  if (!address || !payment) {
    const missingAddress = !address;
    return (
      <Screen>
        <EmptyState
          icon={missingAddress ? "location-outline" : "card-outline"}
          title={missingAddress ? content.needAddress : content.needPayment}
          description={content.reviewSubtitle}
          actionLabel={missingAddress ? content.missingAddressAction : content.missingPaymentAction}
          onAction={() => router.replace(missingAddress ? "/checkout/address" : "/checkout/payment")}
        />
      </Screen>
    );
  }

  const lines: OrderLine[] = cart.lines.map((l) => ({
    productId: l.productId,
    name: l.product.name,
    size: l.size,
    quantity: l.quantity,
    price: l.product.price,
  }));
  const paymentIcon = paymentOptions.find((o) => o.id === payment)?.icon ?? "card-outline";

  const placeOrder = () => {
    const id = orders.placeOrder({
      lines,
      subtotal: cart.subtotal,
      delivery: cart.delivery,
      total: cart.total,
      address,
      payment,
    });
    cart.clear();
    checkout.reset();
    router.replace({ pathname: "/orders/[id]", params: { id, placed: "1" } });
  };

  return (
    <Screen
      contentStyle={styles.content}
      footer={<CheckoutFooter title={content.placeOrder} icon="lock-closed-outline" onPress={placeOrder} />}
    >
      <CheckoutSteps current={2} />

      <Reveal order={1} style={styles.block}>
        <SectionHeader
          title={content.addressSection}
          actionLabel={content.edit}
          onAction={() => router.push("/checkout/address")}
        />
        <AddressCard address={address} />
      </Reveal>

      <Reveal order={2} style={styles.block}>
        <SectionHeader
          title={content.paymentSection}
          actionLabel={content.edit}
          onAction={() => router.push("/checkout/payment")}
        />
        <Card style={styles.payment}>
          <Icon name={paymentIcon} size={layout.iconSize.lg} />
          <AppText variant="productName">{paymentTitles[payment]}</AppText>
        </Card>
      </Reveal>

      <Reveal order={3} style={styles.block}>
        <SectionHeader title={content.itemsSection} />
        <OrderSummaryCard
          lines={lines}
          subtotal={cart.subtotal}
          delivery={cart.delivery}
          total={cart.total}
        />
      </Reveal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.lg,
  },
  block: {
    gap: spacing.md,
  },
  payment: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
});
