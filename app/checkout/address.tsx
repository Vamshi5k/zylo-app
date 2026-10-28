import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "../../src/components/layout/screen";
import { AppButton } from "../../src/components/ui/app-button";
import { AppText } from "../../src/components/ui/app-text";
import { Card } from "../../src/components/ui/card";
import { EmptyState } from "../../src/components/ui/empty-state";
import { FormField } from "../../src/components/ui/form-field";
import { Reveal } from "../../src/components/ui/reveal";
import { screenContent } from "../../src/constants/screen-content";
import { useCart } from "../../src/features/cart/cart-context";
import { addressFields, checkoutCopy } from "../../src/features/checkout/checkout-content";
import { useCheckout } from "../../src/features/checkout/checkout-context";
import { CheckoutSteps } from "../../src/features/checkout/components/checkout-steps";
import { OrderGlance } from "../../src/features/checkout/components/order-glance";
import type { AddressValues } from "../../src/features/checkout/checkout-types";
import { spacing } from "../../theme";

const content = screenContent.checkout;

export default function CheckoutAddressScreen() {
  const router = useRouter();
  const cart = useCart();
  const checkout = useCheckout();

  const { control, handleSubmit, setFocus } = useForm<AddressValues>({
    defaultValues: checkout.address ?? { fullName: "", phone: "", line1: "", city: "", pincode: "" },
    mode: "onTouched",
  });

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

  const onSubmit = (values: AddressValues) => {
    checkout.setAddress(values);
    router.push("/checkout/payment");
  };

  /** Renders one configured field and wires the keyboard's Next/Done key. */
  const field = (name: keyof AddressValues & string) => {
    const index = addressFields.findIndex((f) => f.name === name);
    const config = addressFields[index];
    const next = addressFields[index + 1];
    return (
      <FormField
        control={control}
        returnKeyType={next ? "next" : "done"}
        submitBehavior={next ? "submit" : "blurAndSubmit"}
        onSubmitEditing={() => (next ? setFocus(next.name) : void handleSubmit(onSubmit)())}
        {...config}
      />
    );
  };

  return (
    <Screen contentStyle={styles.content}>
      <CheckoutSteps current={0} />

      <Reveal order={1}>
        <OrderGlance />
      </Reveal>

      <Reveal order={2}>
        <Card style={styles.card}>
          <AppText variant="label" color="textSecondary">
            {checkoutCopy.contactTitle.toUpperCase()}
          </AppText>
          {field("fullName")}
          {field("phone")}
        </Card>
      </Reveal>

      <Reveal order={3}>
        <Card style={styles.card}>
          <AppText variant="label" color="textSecondary">
            {checkoutCopy.deliveryTitle.toUpperCase()}
          </AppText>
          {field("line1")}
          <View style={styles.pair}>
            <View style={styles.half}>{field("city")}</View>
            <View style={styles.half}>{field("pincode")}</View>
          </View>
        </Card>
      </Reveal>

      <AppButton
        title={content.continueToPayment}
        icon="arrow-forward"
        fullWidth
        onPress={handleSubmit(onSubmit)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.lg,
  },
  card: {
    gap: spacing.base,
    padding: spacing.lg,
  },
  pair: {
    flexDirection: "row",
    gap: spacing.md,
  },
  half: {
    flex: 1,
  },
});
