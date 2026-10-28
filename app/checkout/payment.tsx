import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "../../src/components/layout/screen";
import { EmptyState } from "../../src/components/ui/empty-state";
import { OptionCard } from "../../src/components/ui/option-card";
import { Reveal } from "../../src/components/ui/reveal";
import { SectionHeader } from "../../src/components/ui/section-header";
import { screenContent } from "../../src/constants/screen-content";
import { useCart } from "../../src/features/cart/cart-context";
import { checkoutCopy, paymentOptions } from "../../src/features/checkout/checkout-content";
import { useCheckout } from "../../src/features/checkout/checkout-context";
import { CheckoutFooter } from "../../src/features/checkout/components/checkout-footer";
import { CheckoutSteps } from "../../src/features/checkout/components/checkout-steps";
import { OrderGlance } from "../../src/features/checkout/components/order-glance";
import { spacing } from "../../theme";

const content = screenContent.checkout;

export default function CheckoutPaymentScreen() {
  const router = useRouter();
  const cart = useCart();
  const checkout = useCheckout();

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

  if (!checkout.address) {
    return (
      <Screen>
        <EmptyState
          icon="location-outline"
          title={content.needAddress}
          description={content.addressSubtitle}
          actionLabel={content.missingAddressAction}
          onAction={() => router.replace("/checkout/address")}
        />
      </Screen>
    );
  }

  return (
    <Screen
      contentStyle={styles.content}
      footer={
        <CheckoutFooter
          title={content.reviewOrder}
          disabled={!checkout.payment}
          onPress={() => router.push("/checkout/review")}
        />
      }
    >
      <CheckoutSteps current={1} />

      <Reveal order={1}>
        <OrderGlance />
      </Reveal>

      <Reveal order={2} style={styles.methods}>
        <SectionHeader title={checkoutCopy.methodTitle} description={content.paymentSubtitle} />
        <View style={styles.list}>
          {paymentOptions.map((option) => (
            <OptionCard
              key={option.id}
              icon={option.icon}
              title={option.title}
              description={option.description}
              selected={checkout.payment === option.id}
              onPress={() => checkout.setPayment(option.id)}
            />
          ))}
        </View>
      </Reveal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.lg,
  },
  methods: {
    gap: spacing.base,
  },
  list: {
    gap: spacing.md,
  },
});
